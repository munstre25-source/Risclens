@echo off
set "TARGET=\\wsl$\Ubuntu\home\qpay\Risclens\app\pricing"
if exist "%TARGET%" (
    echo Deleting %TARGET%
    rmdir /s /q "%TARGET%"
) else (
    echo %TARGET% not found
)
