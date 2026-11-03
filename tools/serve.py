#!/usr/bin/env python3
"""Local preview server. No dependencies.

  python3 tools/serve.py 8088
"""
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent.parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format, *args):
        sys.stderr.write("%s\n" % (format % args))


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8088
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"Protolabas → http://{host}:{port}/  (root: {ROOT})")
    ThreadingHTTPServer((host, port), Handler).serve_forever()
