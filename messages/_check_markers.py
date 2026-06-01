import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

digi = data['insights']['articleContents']['digital-transformation-mena-strategy-ceo-guide-2025']
for i, s in enumerate(digi['sections']):
    c = s.get('content', '')
    if '###' in c or '#Insight' in c:
        print("Section %d has ### markers:" % i)
        for line in c.split('\n'):
            if '#' in line:
                print("  [%s]" % line.strip())

# Also check for bold markers
for i, s in enumerate(digi['sections']):
    c = s.get('content', '')
    if '**' in c:
        print("Section %d has **bold** markers" % i)
        for line in c.split('\n'):
            if '**' in line:
                print("  [%s]" % line.strip())
