const domains = [
  "stripe.com", "vanta.com", "drata.com", "secureframe.com", "laika.com", "vGS.io", "clerk.dev", "auth0.com", "okta.com", "slack.com",
  "zoom.us", "notion.so", "airtable.com", "figma.com", "linear.app", "postman.com", "vercel.com", "netlify.com", "supabase.com", "planetscale.com",
  "hashicorp.com", "datadoghq.com", "sentry.io", "logdna.com", "newrelic.com", "pagerduty.com", "atlassian.com", "github.com", "gitlab.com", "bitbucket.org",
  "circleci.com", "travis-ci.com", "jenkins.io", "docker.com", "kubernetes.io", "aws.amazon.com", "google.com", "microsoft.com", "apple.com", "meta.com",
  "netflix.com", "spotify.com", "uber.com", "lyft.com", "airbnb.com", "door_dash.com", "instacart.com", "robinhood.com", "coinbase.com", "kraken.com",
  "binance.com", "block.xyz", "square.com", "shopify.com", "magento.com", "bigcommerce.com", "wix.com", "squarespace.com", "wordpress.com", "hubspot.com",
  "salesforce.com", "zendesk.com", "intercom.com", "drift.com", "gong.io", "chorus.ai", "outreach.io", "salesloft.com", "zoominfo.com", "apollo.io",
  "clearbit.com", "segment.com", "amplitude.com", "mixpanel.com", "heap.io", "pendo.io", "fullstory.com", "hotjar.com", "optimizely.com", "vwo.com",
  "launchdarkly.com", "split.io", "statsig.com", "snowflake.com", "databricks.com", "confluent.io", "mongodb.com", "redis.io", "elastic.co", "algolia.com",
  "meilisearch.com", "pinecone.io", "weaviate.io", "milvus.io", "chromadb.com", "langchain.com", "openai.com", "anthropic.com", "cohere.ai", "huggingface.co",
  "replicate.com", "banana.dev", "runpod.io", "lambdalabs.com", "coreweave.com", "nvidia.com", "amd.com", "intel.com", "arm.com", "tsmc.com",
  "asml.com", "appliedmaterials.com", "lamresearch.com", "kla.com", "teradyne.com", "advantest.com", "cypress.com", "nxp.com", "st.com", "ti.com",
  "analog.com", "microchip.com", "onsemi.com", "skyworks.com", "qorvo.com", "broadcom.com", "marvell.com", "qualcomm.com", "mediatek.com", "realtek.com",
  "synopsys.com", "cadence.com", "ansys.com", "autodesk.com", "adobe.com", "intuit.com", "servicenow.com", "workday.com", "oracle.com", "sap.com",
  "ibm.com", "accenture.com", "deloitte.com", "pwc.com", "ey.com", "kpmg.com", "mckinsey.com", "bcg.com", "bain.com", "goldmansachs.com",
  "jpmorganchase.com", "morganstanley.com", "citi.com", "bankofamerica.com", "wellsfargo.com", "hsbc.com", "barclays.com", "bnpparibas.com", "societegenerale.com", "deutsche-bank.de",
  "ubs.com", "credit-suisse.com", "nomura.com", "mizuhobank.com", "smbc.co.jp", "mufg.jp", "standardchartered.com", "santander.com", "bbva.com", "itau.com.br",
  "bradesco.com.br", "bancodobrasil.com.br", "caixa.gov.br", "btgpactual.com", "nubank.com.br", "inter.co", "c6bank.com.br", "neon.com.br", "pagseguro.uol.com.br", "stone.com.br",
  "mercadopago.com.br", "ebanx.com", "dlocal.com", "rapyd.net", "checkout.com", "adyen.com", "klarna.com", "afterpay.com", "affirm.com", "chime.com",
  "revolut.com", "monzo.com", "starlingbank.com", "n26.com", "bunq.com", "qonto.com", "tide.co", "soldo.com", "pleo.io", "spendesk.com",
  "ramp.com", "brex.com", "divvy.com", "navan.com", "tripactions.com", "travelperk.com", "hopper.com", "kayak.com", "expedia.com", "booking.com",
  "agoda.com", "trivago.com", "skyscanner.net", "tripadvisor.com", "yelp.com", "zillow.com", "redfin.com", "realtor.com", "compass.com", "opendoor.com",
  "offerpad.com", "houzz.com", "wayfair.com", "overstock.com", "etsy.com", "ebay.com", "wish.com", "aliexpress.com", "temu.com", "shein.com",
  "zalando.com", "asos.com", "farfetch.com", "net-a-porter.com", "matchesfashion.com", "revolve.com", "thredup.com", "poshmark.com", "realreal.com", "stockx.com",
  "goat.com", "grailed.com", "depop.com", "vinted.com", "mercari.com", "letgo.com", "offerup.com", "craigslist.org", "nextdoor.com", "reddit.com",
  "twitter.com", "x.com", "instagram.com", "tiktok.com", "snapchat.com", "pinterest.com", "linkedin.com", "discord.com", "telegram.org", "whatsapp.com",
  "messenger.com", "signal.org", "threema.ch", "wickr.com", "wire.com", "element.io", "matrix.org", "jitsi.org", "zoom.com", "webex.com",
  "gotomeeting.com", "bluejeans.com", "around.co", "gather.town", "spatial.io", "roblox.com", "minecraft.net", "fortnite.com", "pubg.com", "valorant.com",
  "leagueoflegends.com", "dota2.com", "counter-strike.net", "overwatch.blizzard.com", "diablo.blizzard.com", "worldofwarcraft.com", "hearthstone.blizzard.com", "starcraft2.com", "warcraft3.com", "blizzard.com",
  "activision.com", "ea.com", "ubisoft.com", "take2games.com", "rockstargames.com", "2k.com", "zynga.com", "playtika.com", "supercell.com", "king.com",
  "rovio.com", "mojang.com", "bungie.net", "epicgames.com", "unity.com", "unrealengine.com", "cryengine.com", "godotengine.org", "gamemaker.io", "construct.net",
  "stencyl.com", "rpgmakerweb.com", "renpy.org", "twineery.org", "itch.io", "steampowered.com", "gog.com", "humblebundle.com", "fanatical.com", "greenmangaming.com",
  "gamersgate.com", "direct2drive.com", "origin.com", "uplay.com", "battlenet.com", "xbox.com", "playstation.com", "nintendo.com", "sega.com", "capcom.com",
  "square-enix.com", "bandainamco.com", "konami.com", "koeitecmo.co.jp", "atlus.com", "platinumgames.com", "fromsoftware.jp", "naughtydog.com", "insomniac.games", "santamonicastudio.com",
  "guerrilla-games.com", "suckerpunch.com", "bendstudio.com", "polyphony.co.jp", "media-molecule.com", "housemarque.com", "bluepointgames.com", "firesprite.com", "nixxes.com", "valvesoftware.com",
  "idsoftware.com", "bethesda.net", "arkane-studios.com", "machinegames.com", "tango-gameworks.com", "zenimax.com", "obsidian.net", "inXile-entertainment.com", "ninja-theory.com", "playground-games.com",
  "rare.co.uk", "thecoalitionstudio.com", "343industries.com", "turn10studios.com", "mojang.com", "doublefine.com", "compulsiongames.com", "undeadlabs.com", "worldsedgetudio.com", "toddhoward.com",
  "bioware.com", "respawn.com", "dice.se", "criteriongames.com", "ghostgames.com", "visceral-games.com", "maxis.com", "popcap.com", "bioware.com", "mythic-entertainment.com",
  "westwood.com", "bullfrog.co.uk", "origin-systems.com", "lucasarts.com", "sierra.com", "interplay.com", "infogrames.com", "psygnosis.com", "acclaim.com", "thq.com",
  "midway.com", "atari.com", "commodore.com", "amiga.com", "sinclair.co.uk", "amstrad.com", "tandy.com", "kaypro.com", "osborne.com", "altair.com",
  "apple2.org", "ibm-pc.com", "next.com", "be.com", "palm.com", "handspring.com", "blackberry.com", "nokia.com", "motorola.com", "ericsson.com",
  "siemens.com", "alcatel-lucent.com", "nortel.com", "cisco.com", "juniper.net", "arista.com", "f5.com", "citrix.com", "vmware.com", "nutanix.com",
  "purestorage.com", "netapp.com", "emc.com", "dell.com", "hp.com", "hpe.com", "lenovo.com", "asus.com", "acer.com", "msi.com", "gigabyte.com",
  "evga.com", "corsair.com", "razer.com", "logitech.com", "steelseries.com", "hyperx.com", "turtlebeach.com", "zowie.benq.com", "finalmouse.com", "gloriousgaming.com",
  "keychron.com", "duckychannel.com.tw", "varmilo.com", "leopold.co.kr", "filco.co.jp", "realforce.co.jp", "hhkb.io", "drop.com", "novelkeys.com", "cannonkeys.com",
  "omnitype.com", "dixiemech.com", "thekey.company", "kbdfans.com", "kprepublic.com", "banggood.com", "aliexpress.com", "taobao.com", "jd.com", "tmall.com",
  "suning.com", "pinduoduo.com", "meituan.com", "ele.me", "didi.com", "ctrip.com", "qunar.com", "tuniu.com", "mafengwo.cn", "xiaohongshu.com",
  "zhihu.com", "douban.com", "bilibili.com", "iqiyi.com", "youku.com", "v.qq.com", "sohu.com", "sina.com.cn", "163.com", "baidu.com",
  "alipay.com", "wechat.com", "qq.com", "tiktok.com", "douyin.com", "kuaishou.com", "bytedance.com", "antgroup.com", "tencent.com", "alibaba.com",
  "xiaomi.com", "huawei.com", "zte.com.cn", "lenovo.com", "haier.com", "midea.com", "gree.com.cn", "tcl.com", "hisense.com", "skyworth.com",
  "konka.com", "changhong.com.cn", "meizu.com", "oppo.com", "vivo.com", "realme.com", "oneplus.com", "iqoo.com", "pico-interactive.com", "nreal.ai",
  "rokid.com", "shadow.tech", "geforce-now.com", "stadia.google.com", "luna.amazon.com", "xcloud.xbox.com", "psnow.com", "vortex.gg", "shadow.com", "paperspace.com",
  "linode.com", "digitalocean.com", "vultr.com", "hetzner.com", "ovhcloud.com", "scality.com", "min.io", "ceph.io", "gluster.org", "openstack.org",
  "cloudstack.apache.org", "proxmox.com", "xenproject.org", "kvm.org", "qemu.org", "virtualbox.org", "vagrantup.com", "packer.io", "terraform.io", "ansible.com",
  "chef.io", "puppet.com", "saltstack.com", "terraform.io", "pulumi.com", "crossplane.io", "argoproj.github.io", "fluxcd.io", "tekton.dev", "spinnaker.io",
  "drone.io", "harness.io", "circleci.com", "travis-ci.com", "github.com", "gitlab.com", "bitbucket.org", "sourceforce.net", "savannah.gnu.org", "launchpad.net",
  "osdn.net", "gitee.com", "coding.net", "gitkraken.com", "sourcetreeapp.com", "tower.com", "fork.dev", "sublimemerge.com", "beyondcompare.com", "araxis.com",
  "kaleidoscope.app", "diffmerge.com", "meldmerge.org", "kdiff3.sourceforge.net", "p4merge.com", "vim.org", "neovim.io", "emacs.org", "vscode.com", "sublimetext.com",
  "atom.io", "brackets.io", "lighttable.com", "jetbrains.com", "intellij.com", "webstorm.com", "pycharm.com", "clion.com", "goland.com", "phpstorm.com",
  "rubymine.com", "rider.com", "appcode.com", "datalore.com", "datagrip.com", "upsource.com", "teamcity.com", "youtrack.com", "space.com", "fleet.com",
  "zed.dev", "lapce.dev", "pulsar-edit.dev", "nova.app", "coda.io", "panic.com", "transmit.app", "prompt.app", "nova.app", "sequel-ace.com",
  "tableplus.com", "postico.app", "dbvis.com", "dbeaver.io", "navicat.com", "pgadmin.org", "mysql.com", "postgresql.org", "sqlite.org", "mariadb.org",
  "mongodb.com", "redis.io", "cassandra.apache.org", "neo4j.com", "elasticsearch.co", "solr.apache.org", "influxdata.com", "timescale.com", "cockroachlabs.com", "yugabyte.com",
  "scylladb.com", "clickhouse.com", "druid.apache.org", "pinot.apache.org", "presto.io", "trino.io", "spark.apache.org", "flink.apache.org", "beam.apache.org", "kafka.apache.org",
  "pulsar.apache.org", "rabbitmq.com", "zeromq.org", "nats.io", "mqtt.org", "grpc.io", "protobuf.dev", "thrift.apache.org", "avro.apache.org", "parquet.apache.org",
  "orc.apache.org", "arrow.apache.org", "pandas.pydata.org", "numpy.org", "scipy.org", "matplotlib.org", "seaborn.pydata.org", "plotly.com", "bokeh.org", "streamlit.io",
  "gradio.app", "dash.plotly.com", "shiny.posit.co", "rstudio.com", "jupyter.org", "anaconda.com", "google.colab", "kaggle.com", "wandb.ai", "neptune.ai",
  "mlflow.org", "kubeflow.org", "zenml.io", "bentoml.org", "seldon.io", "ray.io", "dask.org", "tensorflow.org", "pytorch.org", "jax.readthedocs.io",
  "keras.io", "scikit-learn.org", "xgboost.ai", "lightgbm.readthedocs.io", "catboost.ai", "spacy.io", "nltk.org", "gensim.org", "huggingface.co", "openai.com",
  "anthropic.com", "cohere.ai", "stability.ai", "midjourney.com", "runwayml.com", "descript.com", "jasper.ai", "copy.ai", "writesonic.com", "anyword.com",
  "grammarly.com", "hemingwayapp.com", "pro-writing-aid.com", "quillbot.com", "wordtune.com", "deepl.com", "google.translate", "bing.translate", "papago.naver.com", "yandex.translate"
];

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!ADMIN_SECRET) {
  console.error("ADMIN_SECRET environment variable is required");
  process.exit(1);
}
const BATCH_SIZE = 5;

async function processBatch(batch) {
  console.log(`Processing batch of ${batch.length} at ${APP_URL}...`);
  try {
    const response = await fetch(`${APP_URL}/api/admin/intelligence/directory/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ADMIN_SECRET}`
      },
      body: JSON.stringify({
        companies: batch.map(d => ({ domain: d }))
      })
    });
    const result = await response.json();
    console.log(`Batch finished. Success: ${result.success}`);
    if (result.results) {
        result.results.forEach(r => {
            console.log(`- ${r.domain}: ${r.success ? 'OK' : 'FAIL (' + JSON.stringify(r.error) + ')'}`);
        });
    }
  } catch (error) {
    console.error("Batch failed:", error);
  }
}

async function run() {
  for (let i = 0; i < domains.length; i += BATCH_SIZE) {
    const batch = domains.slice(i, i + BATCH_SIZE);
    await processBatch(batch);
    // Add a small delay between batches to avoid overloading the AI or server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log("All batches completed!");
}

run();
