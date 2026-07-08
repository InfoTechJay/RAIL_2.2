param(
  [switch]$SkipSeed
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Sqlite = Join-Path $Root "tools\sqlite\sqlite3.exe"
$Database = Join-Path $Root "prisma\dev.db"
$SqlFile = Join-Path $Root "prisma\sqlite-init.sql"

if (-not (Test-Path -LiteralPath $Sqlite)) {
  throw "SQLite CLI not found at $Sqlite"
}

Push-Location $Root
try {
  if (Test-Path -LiteralPath $Database) {
    Remove-Item -LiteralPath $Database -Force
  }

  $migrationSql = & pnpm exec prisma migrate diff --from-empty --to-schema-datamodel prisma\schema.prisma --script
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to generate SQLite schema SQL."
  }

  Set-Content -LiteralPath $SqlFile -Value $migrationSql -Encoding utf8
  Get-Content -LiteralPath $SqlFile -Raw | & $Sqlite $Database
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to initialize SQLite database."
  }

  & pnpm exec prisma generate
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to generate Prisma Client."
  }

  if (-not $SkipSeed) {
    & pnpm prisma:seed
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to seed SQLite database."
    }
  }
} finally {
  Pop-Location
}
