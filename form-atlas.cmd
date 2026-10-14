@echo off
rem FORM / Atlas dev server control.
rem   Double-click for the menu, or run:  form-atlas.cmd start | stop | restart | status
setlocal EnableExtensions
cd /d "%~dp0"
set "PORT=5188"
set "URL=http://localhost:%PORT%/"
set "WINTITLE=FORM Atlas dev server :%PORT%"

if /i "%~1"=="start"   goto cli_start
if /i "%~1"=="stop"    goto cli_stop
if /i "%~1"=="restart" goto cli_restart
if /i "%~1"=="status"  goto cli_status
if not "%~1"=="" (
  echo Usage: %~nx0 [start^|stop^|restart^|status]
  exit /b 2
)

:menu
title FORM / Atlas - service control
cls
echo.
echo   FORM / Atlas  -  dev server control
echo   -----------------------------------
call :status
echo.
echo     [1] Start
echo     [2] Stop
echo     [3] Restart
echo     [4] Open in browser
echo     [0] Exit
echo.
choice /c 12340 /n /m "  Press a key: "
if errorlevel 5 goto :eof
if errorlevel 4 goto menu_open
if errorlevel 3 goto menu_restart
if errorlevel 2 goto menu_stop
if errorlevel 1 goto menu_start
goto menu

:menu_start
call :start
goto menu_pause
:menu_stop
call :stop
goto menu_pause
:menu_restart
call :stop
call :start
goto menu_pause
:menu_open
call :findpid
if not defined PID (
  echo   Server is not running. Start it first.
  goto menu_pause
)
start "" "%URL%"
goto menu
:menu_pause
echo.
pause
goto menu

:cli_start
call :start
exit /b %ERRORLEVEL%
:cli_stop
call :stop
exit /b %ERRORLEVEL%
:cli_restart
call :stop
call :start
exit /b %ERRORLEVEL%
:cli_status
call :status
exit /b 0

rem ---------------------------------------------------------------- routines

:start
call :findpid
if defined PID (
  echo   Already running on %URL%  [PID %PID%]
  exit /b 0
)
where npm >nul 2>&1
if errorlevel 1 (
  echo   npm was not found. Install Node.js 20.19+ or 22.12+ and try again.
  exit /b 1
)
if not exist "node_modules\" (
  echo   Installing dependencies...
  call npm ci --no-audit --no-fund
  if errorlevel 1 (
    echo   Dependency install failed.
    exit /b 1
  )
)
echo   Starting dev server on port %PORT%...
start "%WINTITLE%" /min cmd /c "npm run dev"
rem Wait up to ~30 seconds for the port to open.
for /l %%i in (1,1,30) do (
  call :findpid
  if defined PID goto start_ok
  call :sleep 1
)
echo   Server did not start within 30 seconds. Check the "%WINTITLE%" window.
exit /b 1
:start_ok
echo   Running on %URL%  [PID %PID%]
exit /b 0

:stop
call :findpid
if not defined PID (
  echo   Server is not running.
  exit /b 0
)
echo   Stopping server [PID %PID%]...
for /l %%i in (1,1,10) do (
  call :findpid
  if not defined PID goto stop_ok
  call :killpid
  call :sleep 1
)
echo   Could not stop the process on port %PORT%.
exit /b 1
:stop_ok
rem Close the minimised launcher window if it is still open.
taskkill /FI "WINDOWTITLE eq %WINTITLE%*" /T /F >nul 2>&1
echo   Stopped.
exit /b 0

:killpid
if defined PID taskkill /PID %PID% /T /F >nul 2>&1
exit /b 0

:status
call :findpid
if defined PID (
  echo   Status: RUNNING on %URL%  [PID %PID%]
) else (
  echo   Status: STOPPED  ^(port %PORT%^)
)
exit /b 0

:findpid
set "PID="
for /f "tokens=5" %%p in ('netstat -ano -p tcp ^| findstr /r /c:":%PORT% .*LISTENING"') do if not defined PID set "PID=%%p"
if defined PID exit /b 0
for /f "tokens=5" %%p in ('netstat -ano -p tcpv6 ^| findstr /r /c:":%PORT% .*LISTENING"') do if not defined PID set "PID=%%p"
exit /b 0

:sleep
rem ping-based delay works even when stdin is redirected (timeout does not).
set /a "_n=%~1+1"
ping -n %_n% 127.0.0.1 >nul
exit /b 0
