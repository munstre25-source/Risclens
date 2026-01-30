import argparse
import csv
import os
import time
import urllib.request
import xml.etree.ElementTree as ET

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def load_credentials(creds_path: str, token_path: str):
    creds = None
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(creds_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, "w") as f:
            f.write(creds.to_json())
    return creds


def fetch_xml(url: str) -> str:
    with urllib.request.urlopen(url) as resp:
        return resp.read().decode("utf-8")


def parse_sitemap_urls(xml_text: str):
    root = ET.fromstring(xml_text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    if root.tag.endswith("sitemapindex"):
        locs = [loc.text for loc in root.findall("sm:sitemap/sm:loc", ns)]
        return ("index", locs)
    if root.tag.endswith("urlset"):
        locs = [loc.text for loc in root.findall("sm:url/sm:loc", ns)]
        return ("urlset", locs)
    return ("unknown", [])


def extract_urls_from_sitemap(sitemap_url: str):
    kind, locs = parse_sitemap_urls(fetch_xml(sitemap_url))
    if kind == "urlset":
        return locs
    if kind == "index":
        urls = []
        for loc in locs:
            _, child_locs = parse_sitemap_urls(fetch_xml(loc))
            urls.extend(child_locs)
        return urls
    return []


def load_processed(out_path: str):
    processed = set()
    if not os.path.exists(out_path):
        return processed
    with open(out_path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            u = row.get("url")
            if u:
                processed.add(u)
    return processed


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", required=True)
    parser.add_argument("--sitemap", required=True)
    parser.add_argument("--creds", default="credentials.json")
    parser.add_argument("--token", default="token.json")
    parser.add_argument("--out", default="gsc_url_inspection.csv")
    parser.add_argument("--max", type=int, default=0)
    parser.add_argument("--sleep", type=float, default=0.2)
    args = parser.parse_args()

    creds = load_credentials(args.creds, args.token)
    service = build("searchconsole", "v1", credentials=creds)

    urls = extract_urls_from_sitemap(args.sitemap)
    if args.max and args.max > 0:
        urls = urls[: args.max]

    processed = load_processed(args.out)
    write_header = not os.path.exists(args.out)

    with open(args.out, "a", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "url",
                "verdict",
                "coverageState",
                "indexingState",
                "pageFetchState",
                "robotsTxtState",
                "lastCrawlTime",
                "googleCanonical",
                "userCanonical",
                "referringUrls",
            ],
        )
        if write_header:
            writer.writeheader()

        for i, url in enumerate(urls, 1):
            if url in processed:
                continue
            body = {"inspectionUrl": url, "siteUrl": args.site}
            try:
                result = service.urlInspection().index().inspect(body=body).execute()
                idx = result.get("inspectionResult", {}).get("indexStatusResult", {})
                row = {
                    "url": url,
                    "verdict": idx.get("verdict"),
                    "coverageState": idx.get("coverageState"),
                    "indexingState": idx.get("indexingState"),
                    "pageFetchState": idx.get("pageFetchState"),
                    "robotsTxtState": idx.get("robotsTxtState"),
                    "lastCrawlTime": idx.get("lastCrawlTime"),
                    "googleCanonical": idx.get("googleCanonical"),
                    "userCanonical": idx.get("userCanonical"),
                    "referringUrls": ",".join(idx.get("referringUrls", []) or []),
                }
                writer.writerow(row)
                f.flush()
            except Exception as e:
                writer.writerow({"url": url, "verdict": f"ERROR: {e}"})
                f.flush()
            time.sleep(args.sleep)


if __name__ == "__main__":
    main()
