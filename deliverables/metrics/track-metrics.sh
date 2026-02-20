#!/usr/bin/env bash
# track-metrics.sh — Capture daily metrics snapshot for mixaroo-lite
# Usage: ./track-metrics.sh [output_dir]
set -euo pipefail
OUTPUT_DIR="${1:-deliverables/metrics/snapshots}"
mkdir -p "$OUTPUT_DIR"
python3 "$(dirname "$0")/track-metrics.py" "$OUTPUT_DIR"
