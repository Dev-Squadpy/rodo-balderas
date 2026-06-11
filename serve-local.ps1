param(
  [int]$Port = 4173
)

$Root = (Resolve-Path $PSScriptRoot).Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "text/javascript; charset=utf-8"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".jfif" = "image/jpeg"
  ".png" = "image/png"
  ".webp" = "image/webp"
}

Write-Host "Rodo site running at http://localhost:$Port"

while ($true) {
  $client = $listener.AcceptTcpClient()

  try {
    $stream = $client.GetStream()
    $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
    $requestLine = $reader.ReadLine()

    while (($line = $reader.ReadLine()) -ne $null -and $line -ne "") {}

    $target = "/"

    if ($requestLine -match "^[A-Z]+\s+([^\s]+)") {
      $target = $Matches[1]
    }

    $pathOnly = ($target -split "\?")[0].TrimStart("/")
    $pathOnly = [Uri]::UnescapeDataString($pathOnly)

    if ([string]::IsNullOrWhiteSpace($pathOnly)) {
      $pathOnly = "index.html"
    }

    $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $pathOnly))

    if (-not $fullPath.StartsWith($Root) -or -not [System.IO.File]::Exists($fullPath)) {
      $fullPath = [System.IO.Path]::Combine($Root, "index.html")
    }

    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $ext = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
    $contentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
    $headers = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)

    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($bytes, 0, $bytes.Length)
  } catch {
    try {
      $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("Server error")
      $headers = "HTTP/1.1 500 Internal Server Error`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($errorBytes.Length)`r`nConnection: close`r`n`r`n"
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($errorBytes, 0, $errorBytes.Length)
    } catch {}
  } finally {
    $client.Close()
  }
}
