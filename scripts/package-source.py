from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent.parent
(root / 'public').mkdir(exist_ok=True)
with ZipFile(root / 'public' / 'form-atlas-source.zip', 'w', ZIP_DEFLATED) as z:
    for rel in ['src', 'scripts', 'README.md', 'package.json', 'package-lock.json', 'index.html', '.gitignore', 'form-atlas.cmd']:
        p = root / rel
        for f in ([p] if p.is_file() else sorted(p.rglob('*'))):
            if f.is_file(): z.write(f, str(Path('form-atlas') / f.relative_to(root)))
print('Source package written: public/form-atlas-source.zip')
