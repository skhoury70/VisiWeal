import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ma = data['insights']['articleContents']['mena-ma-boom-2026']
print("=== M&A ARTICLE ===")
print("Total sections:", len(ma['sections']))
for i, s in enumerate(ma['sections']):
    if 'content' not in s:
        print("Section %d: keys=%s, title=[%s]" % (i, list(s.keys()), s.get('title','')[:60]))
        continue
    c = s['content']
    first_line = c.split('\n')[0]
    print("Section %d: starts with [%s]" % (i, first_line[:80]))
    print("  length: %d chars" % len(c))
    nl2 = c.count('\n\n')
    print("  double-newlines:", nl2)
    print("  HEAD: %s" % c[:200])
    print("  TAIL: ...%s" % c[-150:])
    print()

print("\n\n=====================\n\n")

digi = data['insights']['articleContents']['digital-transformation-mena-strategy-ceo-guide-2025']
print("=== DIGITAL ARTICLE ===")
print("Total sections:", len(digi['sections']))
for i, s in enumerate(digi['sections']):
    c = s['content']
    first_line = c.split('\n')[0]
    print("Section %d: starts with [%s]" % (i, first_line[:80]))
    print("  length: %d chars" % len(c))
    print("  HEAD: %s" % c[:200])
    print("  TAIL: ...%s" % c[-150:])
    print()
