import shutil
import os

path = 'app/(public)/soc-2/for/[slug]'
if os.path.exists(path):
    shutil.rmtree(path)
    print(f"Deleted {path}")
else:
    print(f"Path {path} does not exist")
