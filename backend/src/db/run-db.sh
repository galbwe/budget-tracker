#! /bin/bash
docker run --name budget-tracker-postgres -e POSTGRES_PASSWORD=postgres -d -p 5433:5432 postgres
sleep 5
cd ../..
python -m src.db.load_dev_data.py
cd src/db
