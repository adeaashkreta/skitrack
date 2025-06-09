#!/usr/bin/env bash
BASE="http://localhost:3000"

echo "🛠  Running backend smoke tests…"
echo

# 1) Weather search (valid resort)
echo "1) GET /api/weather/search?resort=Zermatt"
curl -s -w "\n→ HTTP %{http_code}\n\n" \
  "$BASE/api/weather/search?resort=Zermatt"

# 2) Weather search (invalid resort)
echo "2) GET /api/weather/search?resort=NoSuchResort"
curl -s -w "\n→ HTTP %{http_code}\n\n" \
  "$BASE/api/weather/search?resort=NoSuchResort"

# 3) Resorts list WITH lat/lon (required)
#    Here we use Zermatt’s coords: lat=46.0207, lon=7.7491
echo "3) GET /api/resorts?lat=46.0207&lon=7.7491"
curl -s -w "\n→ HTTP %{http_code}\n\n" \
  "$BASE/api/resorts?lat=46.0207&lon=7.7491"

# 4) (Optional) Any other real endpoint you have —
#    for example, if you have /api/someOther, test it here.

echo "✅ Smoke tests complete."
