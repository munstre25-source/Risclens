import shutil
import os

paths = [
    'app/(public)/[framework]/[decision]',
    'app/(public)/soc-2/[decision]',
    'app/(public)/iso-27001/[decision]',
    'app/(public)/pci-dss/[decision]'
]

for p in paths:
    full_path = os.path.join(os.getcwd(), p.replace('/', os.sep))
    if os.path.exists(full_path):
        print(f"Deleting {full_path}")
        shutil.rmtree(full_path)
    else:
        print(f"Path not found: {full_path}")
