import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check M&A for ## and ** markers in content
ma = data['insights']['articleContents']['mena-ma-boom-2026']
for i, s in enumerate(ma['sections']):
    if 'content' not in s:
        continue
    c = s['content']
    if '##' in c or '**' in c:
        print("M&A Section %d has markers!" % i)

# Check Digital for ## markers
digi = data['insights']['articleContents']['digital-transformation-mena-strategy-ceo-guide-2025']
for i, s in enumerate(digi['sections']):
    if 'content' not in s:
        continue
    c = s['content']
    if '##' in c:
        print("DIGI Section %d has ## markers!" % i)

# Show the exact Additional Resources from M&A
print("\n=== M&A Section 13 (Additional Resources) FULL CONTENT ===")
print(repr(ma['sections'][13]['content']))

print("\n=== DIGI Section 11 (Additional Resources) FULL CONTENT ===")
print(repr(digi['sections'][11]['content']))
