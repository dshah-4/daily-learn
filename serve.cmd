@echo off
rem Double-click (or run "serve") to preview Daily Learn at http://localhost:8080
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\serve.ps1" %*
