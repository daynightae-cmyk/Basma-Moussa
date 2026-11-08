"""Asset/content QA for the documentation-phase Basma Moussa repository.

This does NOT verify a running web app, production media endpoints, or a deployment.
"""
from pathlib import Path
import json
import sys
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
errors = []
count = 0

def require(condition: bool, message: str) -> None:
    global count
    count += 1
    if condition:
        print("PASS", message)
    else:
        print("FAIL", message)
        errors.append(message)

def load_json(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))

assets = load_json("content/media-assets.json")
programs = load_json("content/programs.json")
sources = load_json("content/official-sources.json")
require(assets.get("assetCount") == 14 and len(assets["assets"]) == 14, "14 source-verified image records")
require(len(programs.get("programs", [])) == 4, "4 genuine in-development program concepts")
require(all(p.get("status") == "concept" and not p.get("episodeIds") for p in programs["programs"]), "no fabricated published episodes")
require(all(item.get("verifiedAsWebsiteEntryPoint") and not item.get("apiVerified") for item in sources["sources"]), "official sites not falsely labelled APIs")

seen = set()
for asset in assets["assets"]:
    src = asset.get("src", "")
    require(src.startswith(("/media/", "/brand/")) and ".." not in src and src not in seen, f"safe unique URL {src}")
    seen.add(src)
    filename = ROOT / "public" / src.lstrip("/")
    if not filename.is_file():
        require(False, f"image exists {src}")
        continue
    try:
        with Image.open(filename) as image:
            shape = image.size
            image.verify()
        require(shape == (asset["width"], asset["height"]), f"valid image dimensions {src}")
    except Exception as exc:
        require(False, f"image decode failed {src}: {exc}")
    alt = asset.get("alt", {})
    require(bool(alt.get("ar")) and bool(alt.get("en")), f"AR/EN alt {src}")

master = ROOT / "public/brand/basma-logo-master.png"
icon = ROOT / "public/brand/basma-icon-circle.png"
with Image.open(master) as image:
    require(image.mode == "RGBA" and image.getpixel((0, 0))[3] == 0, "approved master transparent-edge logo")
with Image.open(icon) as image:
    require(image.mode == "RGBA" and image.size == (512, 512) and image.getpixel((0, 0))[3] == 0, "circular icon actual 512px RGBA")

for doc in [
    "docs/DEEPSEEK_PRODUCTION_MISSION.md",
    "docs/PRODUCTION_ASSET_MAP.md",
    "docs/MEDIA_WORLD_INTERACTIONS.md",
    "docs/REAL_CONTENT_SOURCES.md",
    "docs/AGENT_EXECUTION_RUNBOOK.md",
    "docs/EDITORIAL_GUARDRAILS.md",
]:
    require((ROOT / doc).is_file(), f"required document {doc}")

print(f"CHECKS: {count}, FAILURES: {len(errors)}")
if errors:
    sys.exit(1)
