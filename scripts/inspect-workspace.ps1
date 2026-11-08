<#
.SYNOPSIS
  Read-only safe workspace discovery for Basma Moussa; optional clone to empty path.
.DESCRIPTION
  No resets, no cleaning, no checkout switching, no stashes, no remote mutation.
  Designed for an agent to use even when a preferred local path is missing.
#>
[CmdletBinding()]
param(
  [string]$PreferredPath = 'D:\Basma-Moussa',
  [switch]$AllowClone
)
$ErrorActionPreference='Stop'
$repository='https://github.com/daynightae-cmyk/Basma-Moussa.git'
if(-not (Get-Command git -ErrorAction SilentlyContinue)){
  Write-Host 'MODE: NO_LOCAL_GIT. Use authorized cloud GitHub tools; never pretend local verification.'
  exit 0
}
function Is-BasmaRepo([string]$path){
  if(-not $path -or -not (Test-Path -LiteralPath $path -PathType Container)){return $false}
  $remote=(& git -C $path remote get-url origin 2>$null | Out-String).Trim()
  if($LASTEXITCODE -ne 0){return $false}
  return ($remote -match '(?i)daynightae-cmyk[/\\]Basma-Moussa(?:\.git)?$')
}
$candidates=@($env:BASMA_REPO, $PreferredPath, (Get-Location).Path, 'D:\KNOUX-Workspace\Basma-Moussa')
$target=$null
foreach($candidate in $candidates){
  if(Is-BasmaRepo $candidate){$target=$candidate;break}
}
if(-not $target -and $AllowClone){
  if(Test-Path -LiteralPath $PreferredPath){
    Write-Host "EXISTING_PATH_NOT_BASMA: $PreferredPath -- DO NOT OVERWRITE."
  } else {
    $parent=Split-Path -Parent $PreferredPath
    if($parent -and (Test-Path -LiteralPath $parent)){
      Write-Host "SAFE_CLONE: $repository into $PreferredPath"
      & git clone $repository $PreferredPath
      if($LASTEXITCODE -eq 0 -and (Is-BasmaRepo $PreferredPath)){$target=$PreferredPath}
    } else {
      Write-Host "PREFERRED_PARENT_UNAVAILABLE: $parent -- use existing authorized workspace."
    }
  }
}
if(-not $target){
  Write-Host 'MODE: LOCAL_NOT_FOUND. If GitHub available, use remote/cloud workflow; do not block project work.'
  exit 0
}
Write-Host "MODE: LOCAL_REPOSITORY_FOUND"
Write-Host "PATH: $target"
& git -C $target status -sb
& git -C $target rev-parse HEAD
& git -C $target remote -v
& git -C $target branch -avv
& git -C $target worktree list --porcelain
& git -C $target stash list
Write-Host 'NEXT: Read README and docs/DEEPSEEK_PRODUCTION_MISSION.md. Preserve dirty/unmerged work. Do not auto-reset.'
