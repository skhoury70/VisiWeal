import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cfo = data['insights']['articleContents']['fractional-cfo-mena-sme-guide-2025']
print("=== CFO ARTICLE ===")
print("Total sections:", len(cfo['sections']))
for i, s in enumerate(cfo['sections']):
    keys = list(s.keys())
    print("Section %d: keys=%s" % (i, keys))
    if 'heading' in s:
        print("  heading: [%s]" % s['heading'])
    if 'subheading' in s:
        print("  subheading: [%s]" % s['subheading'])
    if 'content' in s:
        c = s['content']
        print("  content length: %d" % len(c))
        print("  HEAD: %s" % c[:150])
        print("  TAIL: ...%s" % c[-100:])
    print()
