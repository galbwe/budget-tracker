#! python3
import os
import psycopg2 as pg

from ..utils.find_files import find_files
from ..utils.parsers.read_csv import read_csv
from ..utils.parsers.read_xlsx import read_xlsx
from ..utils.parsers.sort_columns import sort_columns
from .operations import db_exists, create_db, table_exists, create_table, count_records, insert

# find all csvs in data folder
dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data'))
csvs = find_files(dir, 'csv')
# read data from each csv
data = []
expected_headers = ('amount', 'date', 'description')
for csv in csvs:
    parsed_csv = read_csv(csv, floats=['amount'], dates=['date'])
    headers = parsed_csv[0]
    assert list(expected_headers) == list(sorted(headers))
    sorted_data = sort_columns(parsed_csv[1:], headers)
    data.extend(sorted_data)

# find all xlsx files in data folder
xlsxs = find_files(dir, 'xlsx')
for xlsx in xlsxs:
    parsed_xlsx = read_xlsx(xlsx, floats=['amount'], dates=['date'])
    headers = parsed_xlsx[0]
    assert list(expected_headers) == list(sorted(headers))
    sorted_data = sort_columns(parsed_xlsx[1:], headers)
    data.extend(sorted_data)

# write data to database
dsn = 'host=localhost port=5433 connect_timeout=10 user=postgres password=postgres'
con = pg.connect(dsn)
dbname = 'budget_tracker'
# if database already exists and contains data, abort
if not db_exists(con, dbname):
    create_db(con, dbname)
con.close()
dsn = dsn + f' dbname={dbname}'
con = pg.connect(dsn)
table = 'expenses'
if not table_exists(con, table):
    create_table(con, table);
if count_records(con, table) == 0:
    insert(con, table, data)
