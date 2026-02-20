#!/usr/bin/env python3
"""Capture daily metrics snapshot for mixaroo-lite."""
import json, sys, os
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import URLError

GITHUB_REPO = "schoolofai/mixaroo-lite"
NPM_PACKAGE = "mixaroo-lite"

def fetch_json(url):
    try:
        req = Request(url, headers={"User-Agent": "mixaroo-metrics/1.0"})
        with urlopen(req, timeout=10) as r:
            return json.loads(r.read())
    except Exception:
        return {}

def main():
    output_dir = sys.argv[1] if len(sys.argv) > 1 else "deliverables/metrics/snapshots"
    os.makedirs(output_dir, exist_ok=True)
    
    now = datetime.now(timezone.utc)
    date = now.strftime("%Y-%m-%d")
    
    print(f"📊 Capturing metrics for {date}...")
    
    # GitHub
    print("  → GitHub...")
    gh = fetch_json(f"https://api.github.com/repos/{GITHUB_REPO}")
    
    # npm downloads
    print("  → npm...")
    npm_d = fetch_json(f"https://api.npmjs.org/downloads/point/last-day/{NPM_PACKAGE}")
    npm_w = fetch_json(f"https://api.npmjs.org/downloads/point/last-week/{NPM_PACKAGE}")
    npm_m = fetch_json(f"https://api.npmjs.org/downloads/point/last-month/{NPM_PACKAGE}")
    
    # Hacker News
    print("  → Hacker News...")
    hn = fetch_json(f"https://hn.algolia.com/api/v1/search?query={NPM_PACKAGE}&tags=story")
    
    snapshot = {
        "date": date,
        "timestamp": now.isoformat(),
        "github": {
            "stars": gh.get("stargazers_count", 0),
            "forks": gh.get("forks_count", 0),
            "open_issues": gh.get("open_issues_count", 0),
            "watchers": gh.get("subscribers_count", 0),
        },
        "npm": {
            "daily_downloads": npm_d.get("downloads", 0),
            "weekly_downloads": npm_w.get("downloads", 0),
            "monthly_downloads": npm_m.get("downloads", 0),
        },
        "hackernews": {
            "posts": hn.get("nbHits", 0),
        },
    }
    
    outfile = os.path.join(output_dir, f"{date}.json")
    with open(outfile, "w") as f:
        json.dump(snapshot, f, indent=2)
    
    g = snapshot["github"]
    n = snapshot["npm"]
    h = snapshot["hackernews"]
    
    print(f"✅ Snapshot saved to {outfile}\n")
    print("--- Quick Summary ---")
    print(f"GitHub: ⭐ {g['stars']} stars | 🍴 {g['forks']} forks | 🐛 {g['open_issues']} issues")
    print(f"npm:    📦 {n['daily_downloads']}/day | {n['weekly_downloads']}/week | {n['monthly_downloads']}/month")
    print(f"HN:     📰 {h['posts']} posts")

if __name__ == "__main__":
    main()
