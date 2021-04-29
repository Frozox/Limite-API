@echo off
if not exist .\config.json (
    copy .\config.dev.json .\config.json
)