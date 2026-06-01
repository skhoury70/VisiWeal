import json

with open('D:/visiweal/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

ma = data['insights']['articleContents']['mena-ma-boom-2026']

# Section 7 - Expert Perspectives - check if it uses > or just quotes
s7 = ma['sections'][7]
c = s7['content']
print("=== Section 7 (Expert Perspectives) FULL repr ===")
print(repr(c))

# Section 6 - Advisor's Perspective full content
print("\n=== Section 6 (Advisor's Perspective) FULL repr ===")
s6 = ma['sections'][6]
print(repr(s6['content']))
