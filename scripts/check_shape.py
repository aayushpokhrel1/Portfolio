#!/usr/bin/env python3
"""Check the site's shape rules, mechanically.

A convention nobody can verify drifts straight back, which is why this file exists instead
of a paragraph asking you to count by eye. Run it after editing any page:

    python scripts/check_shape.py

Rules, all of them from CLAUDE.md:
  work.html   8 entries, each a 33 to 48 word lead, exactly 4 points, 6 tags
  index.html  13 cards, each one line of 12 to 24 words with at least one measured figure
  notes.html  13 field logs, each 2 paragraphs and 3 tags, no project twice in a row
  all pages   every tag closed, every internal anchor resolving, no em or en dashes
"""
import html
import io
import os
import re
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ("index.html", "work.html", "notes.html")
VOID = {"img", "br", "hr", "meta", "link", "input", "source", "path", "circle", "rect", "use"}

fail = []


def bad(page, msg):
    fail.append("%s: %s" % (page, msg))


def text(fragment):
    return html.unescape(re.sub(r"<[^>]+>", "", fragment))


def words(fragment):
    return len(text(fragment).split())


class Balance(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_startendtag(self, tag, attrs):
        # `<meta />` closes itself. The default implementation calls both handlers,
        # which made every self-closed void tag look like a stray close tag.
        pass

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        elif tag in self.stack:
            self.errors.append("</%s> closed out of order" % tag)
            del self.stack[self.stack.index(tag):]
        else:
            self.errors.append("stray </%s>" % tag)


src = {}
for page in PAGES:
    path = os.path.join(ROOT, page)
    if not os.path.exists(path):
        bad(page, "missing")
        continue
    src[page] = io.open(path, encoding="utf-8").read()

    p = Balance()
    p.feed(src[page])
    for e in p.errors:
        bad(page, e)
    if p.stack:
        bad(page, "unclosed tags: %s" % ", ".join(p.stack))

    # Aayush's standing rule: no em or en dashes in anything written for him.
    for dash in ("–", "—"):
        if dash in src[page]:
            i = src[page].index(dash)
            bad(page, "dash %r near: %s" % (dash, src[page][max(0, i - 50):i + 30].strip()))

if not src:
    print("no pages found")
    sys.exit(1)

# ---- work.html: 8 entries, 33 to 48 word lead, exactly 4 points, 6 tags ----
if "work.html" in src:
    w = src["work.html"]
    w = w[w.index('<section id="work"'):]
    entries = list(re.finditer(
        r'<span class="project-num">(\d+)</span>.*?<h3 class="project-title">(.*?)</h3>(.*?)'
        r'(?=<div class="project"|<div class="also">)', w, re.S))
    if len(entries) != 8:
        bad("work.html", "expected 8 full entries, found %d" % len(entries))
    for m in entries:
        num, title, body = m.group(1), text(m.group(2)).strip(), m.group(3)
        lead = re.search(r'<p class="project-desc">(.*?)</p>', body, re.S)
        if not lead:
            bad("work.html", "%s %s: no lead" % (num, title))
            continue
        n = words(lead.group(1))
        if not 33 <= n <= 48:
            bad("work.html", "%s %s: lead is %d words, must be 33 to 48" % (num, title, n))
        points = len(re.findall(r"<li>", body))
        if points != 4:
            bad("work.html", "%s %s: %d points, must be exactly 4" % (num, title, points))
        tags = re.search(r'project-tags">(.*?)</div>', body, re.S)
        count = len(re.findall(r"<span>", tags.group(1))) if tags else 0
        if count != 6:
            bad("work.html", "%s %s: %d tags, must be 6" % (num, title, count))
    if len(re.findall(r'class="also-item"', w)) != 5:
        bad("work.html", "expected 5 Also entries")

# ---- index.html: 13 cards, 12 to 24 word line, a figure on every one ----
if "index.html" in src:
    i = src["index.html"]
    cards = list(re.finditer(
        r'<h3 class="card-title"><a href="work\.html#([a-z0-9-]+)">(.*?)</a>.*?'
        r'<p class="card-line">(.*?)</p>\s*<p class="card-fig">(.*?)</p>', i, re.S))
    if len(cards) != 13:
        bad("index.html", "expected 13 cards, found %d" % len(cards))
    for m in cards:
        name, line, fig = text(m.group(2)).strip(), m.group(3), m.group(4)
        n = words(line)
        if not 12 <= n <= 24:
            bad("index.html", "%s: card line is %d words, must be 12 to 24" % (name, n))
        if not text(fig).strip():
            bad("index.html", "%s: no measured figure, which is what a card is for" % name)
    rows = len(re.findall(r'class="log-project"', i))
    if rows != 13:
        bad("index.html", "expected 13 field log titles, found %d" % rows)

# ---- notes.html: 13 logs, 2 paragraphs, 3 tags, no project twice in a row ----
if "notes.html" in src:
    n = src["notes.html"]
    logs = re.findall(r'<article class="note" id="(.*?)">(.*?)</article>', n, re.S)
    if len(logs) != 13:
        bad("notes.html", "expected 13 field logs, found %d" % len(logs))
    projects = []
    for slug, body in logs:
        meta = re.search(r"<span>Field log · (.*?)</span>", body)
        projects.append(meta.group(1) if meta else "?")
        title = re.search(r'note-title">(.*?)</h3>', body)
        label = text(title.group(1)).strip() if title else slug
        paras = len(re.findall(r"<p>", body))
        if paras != 2:
            bad("notes.html", "%s: %d paragraphs, must be 2" % (label, paras))
        tags = re.search(r'note-tags">(.*?)</div>', body, re.S)
        count = len(re.findall(r"<span>", tags.group(1))) if tags else 0
        if count != 3:
            bad("notes.html", "%s: %d tags, must be 3" % (label, count))
    for a, b in zip(projects, projects[1:]):
        if a == b:
            bad("notes.html", "%s appears twice in a row; interleave the logs" % a)

# ---- every internal anchor resolves ----
for page, body in src.items():
    for m in re.finditer(r'href="(index|work|notes)\.html#([a-z0-9-]+)"', body):
        target = "%s.html" % m.group(1)
        if target not in src:
            bad(page, "link to missing page %s" % target)
        elif ('id="%s"' % m.group(2)) not in src[target]:
            bad(page, "anchor #%s does not exist in %s" % (m.group(2), target))

if fail:
    print("FAIL (%d)" % len(fail))
    for f in fail:
        print("  " + f)
    sys.exit(1)

print("OK: 8 entries, 13 cards, 13 logs, every anchor resolving, no stray dashes")
