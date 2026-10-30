# Validates every content/YYYY-MM-DD.json against CONTENT_GUIDE.md rules
# and rebuilds content/index.json (which the Archive tab reads).
# Usage: powershell -ExecutionPolicy Bypass -File tools/build-index.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$contentDir = Join-Path $root 'content'
$interests = 'investing','economics','canadian-finance','running','weightlifting','recipe','music','guitar','philosophy','book','chess'
$broad = 'psychology','history','science','health','nutrition','technology','art-design','literature','geography','language','productivity','relationships','thinkers','mental-models','business','wildcard'
$topics = $interests + $broad
$icons = 'chart','globe','maple','shoe','barbell','leaf','headphones','pick','column','book','knight','spark','coin','house','scale','note','target','bowl','timer','brain',
  'hourglass','flask','heart','apple','chip','palette','quill','compass','speech','people','bulb','briefcase'
# Card body length. If FEEDBACK.md changes the target length, update these and CONTENT_GUIDE.md together.
$minWords = 100
$maxWords = 150
# Variety rules apply from the day the broad-pool approach started.
$varietyFrom = '2026-10-30'

$errors = @()
$warnings = @()
$days = @()
$ids = @{}

$files = Get-ChildItem $contentDir -Filter '*.json' | Where-Object { $_.Name -match '^\d{4}-\d{2}-\d{2}\.json$' } | Sort-Object Name
foreach ($f in $files) {
  $date = $f.BaseName
  try { $d = Get-Content $f.FullName -Raw -Encoding UTF8 | ConvertFrom-Json }
  catch { $errors += "${date}: invalid JSON - $($_.Exception.Message)"; continue }

  if ($d.date -ne $date) { $errors += "${date}: 'date' field is '$($d.date)'" }
  if (@($d.cards).Count -ne 6) { $errors += "${date}: expected 6 cards, found $(@($d.cards).Count)" }
  if (@($d.quiz).Count -ne 6) { $errors += "${date}: expected 6 quiz questions, found $(@($d.quiz).Count)" }

  $seenTopics = @{}
  $i = 0
  foreach ($c in $d.cards) {
    $i++
    $where = "${date} card $i"
    foreach ($k in 'id','topic','title','body','example','takeaway') { if (-not $c.$k) { $errors += "${where}: missing '$k'" } }
    if ($c.id -ne "$date-$i") { $errors += "${where}: id should be '$date-$i'" }
    if ($ids.ContainsKey($c.id)) { $errors += "${where}: duplicate id $($c.id)" } else { $ids[$c.id] = $true }
    if ($topics -notcontains $c.topic) { $errors += "${where}: unknown topic '$($c.topic)'" }
    if ($seenTopics.ContainsKey($c.topic)) { $errors += "${where}: topic '$($c.topic)' repeated in one day" }
    $seenTopics[$c.topic] = $true
    if ($c.icon -and $icons -notcontains $c.icon) { $errors += "${where}: unknown icon '$($c.icon)'" }
    $words = @($c.body -split '\s+' | Where-Object { $_ }).Count
    if ($words -lt $minWords -or $words -gt $maxWords) { $warnings += "${where}: body is $words words (target $minWords-$maxWords)" }
  }

  $q = 0
  foreach ($x in $d.quiz) {
    $q++
    $where = "${date} question $q"
    if (@($x.options).Count -ne 4) { $errors += "${where}: needs exactly 4 options" }
    if ($x.answer -isnot [int] -or $x.answer -lt 0 -or $x.answer -gt 3) { $errors += "${where}: answer must be 0-3" }
    if (-not $x.question -or -not $x.explanation) { $errors += "${where}: missing question or explanation" }
    if ($x.review -and -not $x.reviewOf) { $errors += "${where}: review question needs 'reviewOf'" }
  }

  $days += [ordered]@{ date = $date; topics = @($d.cards | ForEach-Object { $_.topic }); titles = @($d.cards | ForEach-Object { $_.title }) }
}

# Second pass: review questions must point at an existing, earlier card.
foreach ($f in $files) {
  $d = Get-Content $f.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($x in $d.quiz) {
    if ($x.reviewOf -and -not $ids.ContainsKey($x.reviewOf)) { $errors += "$($f.BaseName): reviewOf '$($x.reviewOf)' not found" }
    if ($x.reviewOf -and $x.reviewOf -ge $f.BaseName) { $errors += "$($f.BaseName): reviewOf '$($x.reviewOf)' is not from an earlier day" }
  }
}

# Variety: no topic on back-to-back days, no near-identical mixes within a week,
# and interests at roughly 40% of each day (2-3 of 6 cards).
for ($a = 0; $a -lt $days.Count; $a++) {
  $da = $days[$a]
  if ($da.date -lt $varietyFrom) { continue }
  $n = @($da.topics | Where-Object { $interests -contains $_ }).Count
  if ($n -lt 2 -or $n -gt 3) { $warnings += "$($da.date): $n interest cards (target 2-3)" }
  for ($b = [Math]::Max(0, $a - 6); $b -lt $a; $b++) {
    $db = $days[$b]
    $gap = ([datetime]$da.date - [datetime]$db.date).Days
    if ($gap -gt 6) { continue }
    $shared = @($da.topics | Where-Object { $db.topics -contains $_ })
    if ($gap -eq 1 -and $shared.Count) { $warnings += "$($da.date): repeats $($shared -join ', ') from the day before" }
    elseif ($shared.Count -ge 4) { $warnings += "$($da.date): shares $($shared.Count) topics with $($db.date) (max 3 within a week)" }
  }
}

$warnings | ForEach-Object { Write-Host "WARN  $_" -ForegroundColor Yellow }
if ($errors.Count) {
  $errors | ForEach-Object { Write-Host "ERROR $_" -ForegroundColor Red }
  Write-Host "index.json NOT written ($($errors.Count) errors)." -ForegroundColor Red
  exit 1
}

$json = [ordered]@{ days = $days } | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText((Join-Path $contentDir 'index.json'), $json + "`n", (New-Object System.Text.UTF8Encoding $false))
Write-Host "OK: $($files.Count) days validated, content/index.json rebuilt." -ForegroundColor Green
