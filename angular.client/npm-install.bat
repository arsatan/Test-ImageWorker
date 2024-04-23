@echo off
cd .\node_modules
if not exist .package-lock.json (npm install) else (echo ===== npm modules already installed =====)
cd ..
exit
