@echo off
set "TARGET=\\wsl$\Ubuntu\home\qpay\Risclens\app\(public)\soc-2\for\[slug]"
if exist "%TARGET%" (
    echo Deleting %TARGET%
    rmdir /s /q "%TARGET%"
) else (
    echo %TARGET% not found
)
