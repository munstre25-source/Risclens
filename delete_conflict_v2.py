import shutil
import os

# Use the full UNC path
path = r'\\wsl$\Ubuntu\home\qpay\Risclens\app\(public)\soc-2\for\[slug]'
if os.path.exists(path):
    shutil.rmtree(path)
    print(f"Deleted {path}")
else:
    # Try relative path too
    path_rel = 'app/(public)/soc-2/for/[slug]'
    if os.path.exists(path_rel):
        shutil.rmtree(path_rel)
        print(f"Deleted {path_rel}")
    else:
        print(f"Could not find path {path} or {path_rel}")
