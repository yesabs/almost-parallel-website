$fontSrc = "S:\Shared drives\00_STUDIO_ASSETS\_STUDIO_FONT_Adelle_Sans\Adelle Sans"
$fontDst = "$PSScriptRoot\public\fonts"

New-Item -ItemType Directory -Force -Path $fontDst | Out-Null

Copy-Item "$fontSrc\Adelle Sans Book.otf" "$fontDst\AdelleSans-Book.otf" -Force
Copy-Item "$fontSrc\Adelle Sans Bold.otf" "$fontDst\AdelleSans-Bold.otf" -Force
Copy-Item "$fontSrc\Adelle Sans Semibold.otf" "$fontDst\AdelleSans-Semibold.otf" -Force
Copy-Item "$fontSrc\Adelle Sans Light.otf" "$fontDst\AdelleSans-Light.otf" -Force

Write-Host "Fonts copied to $fontDst"
