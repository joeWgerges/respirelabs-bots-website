import os
import re

with open('../readme.md', 'r') as f:
    content = f.read()

# Find all blocks starting with /en/ or /de/ followed by .md
matches = re.finditer(r'^(/(?:en|de)/[\w-]+\.md)\n(---.*?---)\n(.*?)(?=\n^/|\Z)', content, re.MULTILINE | re.DOTALL)

for match in matches:
    path = match.group(1)
    frontmatter = match.group(2)
    body = match.group(3)
    
    # Add layout and lang to frontmatter
    lang = path.split('/')[1]
    layout_str = f'layout: "../../layouts/MarkdownLayout.astro"\nlang: "{lang}"\n'
    new_frontmatter = frontmatter.replace('---\n', f'---\n{layout_str}', 1)
    
    file_content = f"{new_frontmatter}\n{body.strip()}\n"
    
    # Write to src/pages
    src_path = f"src/pages{path}"
    os.makedirs(os.path.dirname(src_path), exist_ok=True)
    with open(src_path, 'w') as f:
        f.write(file_content)
        
    # Write to public
    public_path = f"public{path}"
    os.makedirs(os.path.dirname(public_path), exist_ok=True)
    with open(public_path, 'w') as f:
        f.write(file_content)

# Process blog posts
blog_matches = re.finditer(r'^(/(?:en|de)/blog/[\w-]+\.md)\n(---.*?---)\n(.*?)(?=\n^/|\Z)', content, re.MULTILINE | re.DOTALL)
for match in blog_matches:
    path = match.group(1)
    frontmatter = match.group(2)
    body = match.group(3)
    
    lang = path.split('/')[1]
    layout_str = f'layout: "../../../layouts/MarkdownLayout.astro"\nlang: "{lang}"\n'
    new_frontmatter = frontmatter.replace('---\n', f'---\n{layout_str}', 1)
    
    file_content = f"{new_frontmatter}\n{body.strip()}\n"
    
    # Write to src/pages
    src_path = f"src/pages{path}"
    os.makedirs(os.path.dirname(src_path), exist_ok=True)
    with open(src_path, 'w') as f:
        f.write(file_content)
        
    # Write to public
    public_path = f"public{path}"
    os.makedirs(os.path.dirname(public_path), exist_ok=True)
    with open(public_path, 'w') as f:
        f.write(file_content)

# Legal pages
legal_matches = re.finditer(r'^(/(?:en|de)/(?:privacy|datenschutz|impressum)\.md)\n(---.*?---)\n(.*?)(?=\n^/|\Z)', content, re.MULTILINE | re.DOTALL)
for match in legal_matches:
    path = match.group(1)
    frontmatter = match.group(2)
    body = match.group(3)
    
    lang = path.split('/')[1]
    layout_str = f'layout: "../../layouts/MarkdownLayout.astro"\nlang: "{lang}"\n'
    new_frontmatter = frontmatter.replace('---\n', f'---\n{layout_str}', 1)
    
    file_content = f"{new_frontmatter}\n{body.strip()}\n"
    
    src_path = f"src/pages{path}"
    os.makedirs(os.path.dirname(src_path), exist_ok=True)
    with open(src_path, 'w') as f:
        f.write(file_content)
        
    public_path = f"public{path}"
    os.makedirs(os.path.dirname(public_path), exist_ok=True)
    with open(public_path, 'w') as f:
        f.write(file_content)

print("Generated pages!")
