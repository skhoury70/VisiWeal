import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ma = data['insights']['articleContents']['mena-ma-boom-2026']
print("=== FULL M&A SECTIONS ===\n")
for i, s in enumerate(ma['sections']):
    if 'heading' in s:
        print("--- Section %d: heading=[%s]" % (i, s['heading']))
    else:
        print("--- Section %d: (no heading)" % i)
    if 'subheading' in s:
        print("    subheading=[%s]" % s['subheading'])
    if 'content' in s:
        print("    content=[%s]" % s['content'][:200])
    print()
