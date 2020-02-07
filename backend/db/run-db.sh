#! /bin/bash
docker run --name budget-tracker-postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
