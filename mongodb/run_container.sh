#!/bin/bash
docker container run -d \
 --name budget_tracker_db \
 --network budget-tracker \
 --hostname budget-tracker \
 -p 27017:27017 \
 -v budget_tracker_mongo_volume:/data/db \
 mongo:latest
