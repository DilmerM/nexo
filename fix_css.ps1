$f = "c:\Users\Dilmer\Desktop\Nexo\css\animations.css"
$a = [System.IO.File]::ReadAllLines($f)

Write-Host "Total lines before: $($a.Length)"
Write-Host "Line 531: $($a[530])"
Write-Host "Line 532: $($a[531])"
Write-Host "Line 533: $($a[532])"

$insert = @(
    '.elementor-element-af80ada .cz_main_image img {',
    '    margin: 0 auto !important;',
    '    display: block !important;',
    '}',
    '',
    '/* Texto en cards de Servicios para PYMES - aparece al hover */',
    '.cz_grid_details > div {',
    '    opacity: 0;',
    '    visibility: hidden;',
    '    transition: opacity 0.3s ease, visibility 0.3s ease;',
    '}',
    '',
    '.cz_grid_link:hover .cz_grid_details > div {',
    '    opacity: 1;',
    '    visibility: visible;',
    '}'
)

# Keep lines 1-530 (index 0-529), insert new block, then lines 534+ (index 533+)
$out = $a[0..529] + $insert + $a[533..($a.Length - 1)]

[System.IO.File]::WriteAllLines($f, $out)
Write-Host "Done. Total lines after: $($out.Length)"
