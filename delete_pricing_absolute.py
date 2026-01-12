import shutil
import os

path = '/home/qpay/Risclens/app/pricing'
if os.path.exists(path):
    shutil.rmtree(path)
    print(f"Deleted {path}")
else:
    print(f"Path {path} does not exist")
