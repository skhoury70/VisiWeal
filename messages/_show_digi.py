import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

digi = data['insights']['articleContents']['digital-transformation-mena-strategy-ceo-guide-2025']
# Show sections 5-11 in detail
for i in range(5, 12):
    s = digi['sections'][i]
    print("=== DIGI Section %d ===" % i)
    print("  keys: %s" % list(s.keys()))
    if 'heading' in s:
        print("  heading: [%s]" % s['heading'])
    if 'content' in s:
        print("  CONTENT (repr):")
        print(repr(s['content']))
    print()
