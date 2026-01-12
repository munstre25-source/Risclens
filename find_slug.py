import os
for root, dirs, files in os.walk('app'):
    for d in dirs:
        if 'slug' in d.lower():
            print(os.path.join(root, d))
