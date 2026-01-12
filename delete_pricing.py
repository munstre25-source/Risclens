import shutil
import os

path = 'app/pricing'
if os.path.exists(path):
    shutil.rmtree(path)
    print(f'Deleted {path}')
else:
    print(f'{path} not found')
