DB_EXISTS = '''
    SELECT exists(
        SELECT datname
        FROM pg_catalog.pg_database
        WHERE lower(datname) = lower('{dbname}')
    );
'''

CREATE_DB = '''
    CREATE DATABASE {dbname};
'''

TABLE_EXISTS = '''
    SELECT exists(
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE'
        AND table_name='{table}'
    );
'''

CREATE_TABLE = '''
    CREATE TABLE {table} (
        id serial PRIMARY KEY,
        amount money,
        date date,
        description varchar(500)
    )
'''

COUNT_RECORDS = '''
    SELECT count(*) FROM {table};
'''

INSERT = '''
    INSERT INTO {table} (amount, date, description)
    VALUES (%s, %s, %s);
'''

def db_exists(con, dbname):
    sql = DB_EXISTS.format(dbname=dbname)
    with con.cursor() as cur:
        cur.execute(sql)
        rows = cur.fetchall()
    con.commit()
    return rows[0][0]

def create_db(con, dbname):
    sql = CREATE_DB.format(dbname=dbname)
    con.autocommit = True
    cur = con.cursor()
    try:
        cur.execute(sql)
    except Exception as e:
        cur.close()
        raise e

def table_exists(con, table):
    sql = TABLE_EXISTS.format(table=table)
    with con.cursor() as cur:
        cur.execute(sql)
        rows = cur.fetchall()
    con.commit()
    return rows[0][0]

def create_table(con, table):
    sql = CREATE_TABLE.format(table=table)
    with con.cursor() as cur:
        cur.execute(sql)
    con.commit()

def count_records(con, table):
    sql = COUNT_RECORDS.format(table=table)
    with con.cursor() as cur:
        cur.execute(sql)
        rows = cur.fetchall()
    con.commit()
    return rows[0][0]

def insert(con, table, data):
    sql = INSERT.format(table=table)
    with con.cursor() as cur:
        for row in data:
            cur.execute(sql, row)
    con.commit()

# if __name__ == '__main__':
#     # test
#     import psycopg2 as pg
#     dsn = 'host=localhost port=5433 connect_timeout=10 user=postgres password=postgres'
#     con = pg.connect(dsn)
#     dbname = 'test'
#     print(db_exists(con, dbname))
#     # con.autocommit = True
#     create_db(con, dbname)
#     print(db_exists(con, dbname))
