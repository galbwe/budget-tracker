#!/bin/bash
docker container stop budget_tracker_db \
&& docker container rm budget_tracker_db
