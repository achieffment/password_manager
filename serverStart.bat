@echo OFF
@%cd%\assets\php-8.1.7-Win32-vs16-x64\php.exe -r "$file = fopen('startTime.txt', 'w+'); fwrite($file, time()); fclose($file);"
@explorer http://localhost:3000
@%cd%\assets\php-8.1.7-Win32-vs16-x64\php.exe -S localhost:3000