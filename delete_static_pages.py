import os
import shutil

paths_to_delete = [
    'app/(public)/ai-governance/page.tsx',
    'app/(public)/ai-governance/vendor-risk-questionnaire',
    'app/(public)/ai-governance/vendor-audit-template',
    'app/(public)/ai-governance/risk-classifier',
    'app/(public)/ai-compliance/compare/soc-2-vs-iso-42001',
    'app/(public)/ai-compliance/stack/aws-bedrock',
    'app/(public)/ai-compliance/stack/azure-openai',
    'app/(public)/ai-compliance/stack/google-vertex-ai'
]

for path in paths_to_delete:
    full_path = os.path.join(os.getcwd(), path)
    if os.path.exists(full_path):
        if os.path.isfile(full_path):
            os.remove(full_path)
            print(f"Deleted file: {path}")
        else:
            shutil.rmtree(full_path)
            print(f"Deleted directory: {path}")
    else:
        print(f"Path not found: {path}")
