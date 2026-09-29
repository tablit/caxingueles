#!/usr/bin/env bash
# Constrói o site duas vezes (teste, com fixtures; produção) e confere o HTML gerado.
set -uo pipefail
cd "$(dirname "$0")/.."

T=".verificacao/teste"
P=".verificacao/producao"
rm -rf .verificacao

hugo --quiet --panicOnWarning -e test -D -d "$T" || { echo "FALHA: build de teste"; exit 1; }
hugo --quiet --panicOnWarning -d "$P" || { echo "FALHA: build de produção"; exit 1; }

falhas=0
ok()         { echo "ok    $1"; }
falha()      { echo "FALHA $1"; falhas=$((falhas + 1)); }
tem()        { if [ -f "$1/$2" ] && grep -qF -- "$3" "$1/$2"; then ok "$1/$2 contém: $3"; else falha "$1/$2 deveria conter: $3"; fi; }
nao_tem()    { if [ -f "$1/$2" ] && ! grep -qF -- "$3" "$1/$2"; then ok "$1/$2 não contém: $3"; else falha "$1/$2 não deveria conter (ou não existe): $3"; fi; }
existe()     { if [ -f "$1/$2" ]; then ok "existe: $1/$2"; else falha "deveria existir: $1/$2"; fi; }
nao_existe() { if [ ! -e "$1/$2" ]; then ok "não existe: $1/$2"; else falha "não deveria existir: $1/$2"; fi; }

for arquivo in scripts/verificacoes/*.sh; do
  echo "== $arquivo"
  # shellcheck source=/dev/null
  source "$arquivo"
done

echo
if [ "$falhas" -eq 0 ]; then echo "Tudo certo."; else echo "$falhas falha(s)."; exit 1; fi
