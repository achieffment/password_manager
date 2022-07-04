currentPath = chr(34) & createobject("Scripting.FileSystemObject").GetFolder(".").Path + "\serverStart.bat" & chr(34)

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run currentPath, 0
Set WshShell = Nothing

Rem 10 minutes
WScript.Sleep 600000
Rem 2 minute
Rem WScript.Sleep 120000
Rem test
Rem WScript.Sleep 1000

Rem Dim oShell : Set oShell = CreateObject("WScript.Shell")
Rem oShell.Run "taskkill /f /im php.exe"

myDate = time()
Rem myDate = DateAdd("n", 10, myDate)
myDate = Mid(myDate, 1, 5)
Rem MsgBox myDate, 0, "Now date"

Set objWMIService = GetObject("winmgmts:" _
& "{impersonationLevel=impersonate}!\\" _
& "." & "\root\cimv2")

Set colProcess = objWMIService.ExecQuery _
("Select * from Win32_Process Where Name = " & "'php.exe'")
For Each objProcess in colProcess
    Rem dtmStartTime = objProcess.CreationDate
    Rem strReturn = Mid(dtmStartTime, 9,2)
    Rem strReturn = strReturn & ":" & Mid(dtmStartTime, 11,2)
    Rem strReturn = strReturn & ":" & Mid(dtmStartTime, 13,2)
    Rem MsgBox strReturn, 0, "Start date"
    Rem if (strReturn = myDate) then
    Rem     objProcess.Terminate()
    Rem elseif (myDate < strReturn) then
    Rem     objProcess.Terminate()
    Rem End If

    dtmStartTime = objProcess.CreationDate
    startTimeHours = Mid(dtmStartTime, 9, 2)
    startTimeMinutes = Mid(dtmStartTime, 11, 2)

    endTimeHours = startTimeHours
    endTimeMinutes = startTimeMinutes + 10
    if (endTimeMinutes >= 60) then
	endTimeHours = endTimeHours + 1
        endTimeMinutes = endTimeMinutes - 60
    End If
    if (endTimeHours >= 24) then
	endTimeHours = endTimeHours - 24
    End If
    endTime = endTimeHours & ":" & endTimeMinutes

    Rem MsgBox myDate, 0, "Now date"
    Rem MsgBox endTime, 0, "End date"
    if (endTime <= myDate) then
        Rem MsgBox "I closed object", 0, "Closing"
        objProcess.Terminate()
    End If

Next