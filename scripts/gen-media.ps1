Add-Type -AssemblyName System.Drawing
$base = "C:\DEV\ilkerneslihanoglu\public\img"

function Get-JpegEncoder {
  [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
}
$jpegEnc = Get-JpegEncoder

function Resize-Image {
  param([string]$path, [int]$w, [int]$h, [bool]$pixel, [bool]$jpeg, [int]$quality = 82, [string]$bg = $null)
  $src = [System.Drawing.Image]::FromFile($path)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  if ($bg) { $g.Clear([System.Drawing.ColorTranslator]::FromHtml($bg)) }
  if ($pixel) {
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  } else {
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  }
  $g.DrawImage($src, 0, 0, $w, $h)
  $ms = New-Object System.IO.MemoryStream
  if ($jpeg) {
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($ms, $jpegEnc, $ep)
    $mime = "image/jpeg"
  } else {
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $mime = "image/png"
  }
  $b64 = [System.Convert]::ToBase64String($ms.ToArray())
  $g.Dispose(); $bmp.Dispose(); $src.Dispose(); $ms.Dispose()
  return "data:$mime;base64,$b64"
}

$cupsScreens = @("main-menu","in-game","win-panel","pause-menu","settings")
$cupsLevels  = @("rainbow","apple","watermelon","palm","mountain","candle")
$megaItems   = @("dihh-sword","chilli-bean","gold-poker-chip","poker-chip","joe-mama","settings-icon")
$megaFrames  = @("epic-stat-frame","legendary-frame","menu-frame")
$stickButtons = @("play","pause","restart")

$out = New-Object System.Text.StringBuilder
[void]$out.AppendLine("/* Auto-generated downscaled, base64-embedded media. Regenerate with scripts/gen-media.ps1 */")
[void]$out.AppendLine("const MEDIA = {")

function Emit-Group {
  param([string]$key, [string[]]$names, [string]$dir, [scriptblock]$encode)
  [void]$out.AppendLine("  ${key}: [")
  foreach ($n in $names) {
    $p = Join-Path $base "$dir\$n.png"
    $uri = & $encode $p
    [void]$out.AppendLine("    `"$uri`",")
  }
  [void]$out.AppendLine("  ],")
}

Emit-Group "cupsScreens" $cupsScreens "crazy-cups\screens" { param($p) Resize-Image $p 520 1131 $false $true 80 }
Emit-Group "cupsLevels"  $cupsLevels  "crazy-cups\levels"  { param($p) Resize-Image $p 360 360 $false $true 86 "#ffffff" }
Emit-Group "megaItems"    $megaItems    "megakill\items"        { param($p) Resize-Image $p 192 192 $true $false }
Emit-Group "megaFrames"   $megaFrames   "megakill\frames"       { param($p) Resize-Image $p 480 480 $true $false }
Emit-Group "stickButtons" $stickButtons "stick-sort\buttons"    { param($p) Resize-Image $p 256 256 $false $false }

[void]$out.AppendLine("};")
[System.IO.File]::WriteAllText("C:\DEV\ilkerneslihanoglu\scripts\media.js", $out.ToString())
$bytes = (Get-Item "C:\DEV\ilkerneslihanoglu\scripts\media.js").Length
"media.js written: {0:N0} bytes (~{1:N2} MB)" -f $bytes, ($bytes/1MB)
