---
layout: default
title:  "PowerShell"
category: Computer Languages
---

# PowerShell
PowerShell is a command line interpreter originally built for Windows
but is available for all systems. Its best advantage over bash is
its focus on structured data manipulation. It follows a Verb-Noun syntax
which can make remembering commands easier as well.

## Hello World
```powershell
Write-Output "Hello, World!"
```

## Help
```powershell
# get examples for Command-Name
Get-Help -Name Command-Name -Examples

# discover powershell cmdlets
Get-Command
```

## Aliases
PowerShell has many aliases that map to familiar bash commands. It
is definitely helpful to use aliases because the command syntax
tends to be a lot to type, however I think it's important to know
the underlying command format and not rely on aliases to get by.

## Common Tasks
```powershell
# list aliases
Get-Alias

# list available cmdlets
Get-Command

# change directory
Set-Location path/

# list files
Get-ChildItem
Get-ChildItem *.txt
Get-ChildItem -Recurse
Get-ChildItem -Recurse -Filter *.txt

# print file contents
Get-Content file1.txt, file2.txt

# search for text in a file
Get-ChildItem | Select-String -Pattern pattern

# create a file with some text
New-Item -Path file.txt -Value "text"

# move a file
Move-Item src.txt dest.txt

# delete a file
Remove-Item file.txt

# create a directory
New-Item -ItemType Directory dirname

# delete a directory
Remove-Item dirname
Remove-Item dirname -Recurse

# clear screen
Clear-Host

# search the output of a command
Command | Out-String -Stream | Select-String pattern
```
