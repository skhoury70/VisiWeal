import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ma = data['insights']['articleContents']['mena-ma-boom-2026']
print("=== M&A sections with non-content keys ===")
for i, s in enumerate(ma['sections']):
    keys = list(s.keys())
    if keys != ['content']:
        print("Section %d: keys=%s" % (i, keys))
        if 'heading' in s:
            print("  heading: %s" % s['heading'][:80])
        if 'subheading' in s:
            print("  subheading: %s" % s['subheading'][:80])

print()

# Also check what the article page does with heading/subheading
# Let me look at the page component
