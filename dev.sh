docker compose down -v
docker compose up db -d
sleep 5
npm run dev || true
docker compose down -v

