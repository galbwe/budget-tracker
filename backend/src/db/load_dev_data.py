#! python3
import os
import csv
import openpyxl
import psycopg2

print(__name__)

from ..utils.find_files import find_files

# find all csvs in data folder
dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data'))
csvs = find_files(dir, 'csv')
# read data from each csv

# find all xlsx files in data folder
xlsxs = find_files(dir, 'xlsx')
# read data from each xlsx

# write data to database
