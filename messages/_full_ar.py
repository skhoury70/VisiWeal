import json

with open('D:/visiweal/messages/ar.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check Arabic sections for M&A and Digital to compare with English
for slug in ['mena-ma-boom-2026', 'digital-transformation-mena-strategy-ceo-guide-2025']:
    art = data['insights']['articleContents'][slug]
    print("=== ARABIC %s ===" % slug)
    for i, s in enumerate(art['sections']):
        keys = list(s.keys())
        print("Section %d: keys=%s" % (i, keys))
        if 'heading' in s:
            print("  heading: [%s]" % s['heading'])
        if 'subheading' in s:
            print("  subheading: [%s]" % s['subheading'])
        if 'content' in s:
            print("  content starts: %s" % s['content'][:80])
    print()
