
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('temp_content.txt', 'w', encoding='utf-8') as f2:
    f2.write(content)

print('File saved successfully!')
