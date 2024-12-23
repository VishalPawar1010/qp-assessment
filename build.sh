# optional prune cmd
# docker system prune -a --volumes
docker compose down -v
docker compose up --build || true
docker compose down -v
