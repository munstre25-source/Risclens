import os
import shutil

# This script attempts to delete the conflicting directory using various path formats
paths_to_try = [
    r"app/(public)/soc-2/for/[slug]",
    r"\\wsl$\Ubuntu\home\qpay\Risclens\app\(public)\soc-2\for\[slug]",
    r"//wsl$/Ubuntu/home/qpay/Risclens/app/(public)/soc-2/for/[slug]",
    os.path.join(os.getcwd(), "app", "(public)", "soc-2", "for", "[slug]")
]

for path in paths_to_try:
    try:
        if os.path.exists(path):
            print(f"Attempting to delete: {path}")
            shutil.rmtree(path)
            print(f"Successfully deleted: {path}")
            break
        else:
            print(f"Path not found: {path}")
    except Exception as e:
        print(f"Failed to delete {path}: {e}")
