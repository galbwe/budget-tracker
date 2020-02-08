import csv
from datetime import datetime

def read_csv(file, floats=None, dates=None):
    '''Reads a csv file to a list of tuples
    The first row of the spreadsheet is assumed to contain headers
    The floats argument gives a list of column names that are of the float datatype
    The dates argument gives a list of column names that are of the datetime datatype
        dates are assumed to be specified in the format d/m/yyyy
    '''
    with open(file) as f:
        reader = csv.reader(f)
        headers = next(reader)
        float_columns = None
        if floats:
            float_columns = [i for i, head in enumerate(headers) if head in floats]
        date_columns = None
        if dates:
            date_columns = [i for i, head in enumerate(headers) if head in dates]
        result = [tuple(headers)]
        for row in reader:
            parsed_row = []
            for i, e in enumerate(row):
                if i in float_columns:
                    parsed_row.append(float(e))
                elif i in date_columns:
                    parsed_row.append(datetime.strptime(e, '%m/%d/%Y'))
                else:
                    parsed_row.append(e)
            result.append(tuple(parsed_row))
        return result


# if __name__ == '__main__':
#     # test
#     file = '../../db/data/dev-data.csv'
#     data = read_csv(file, floats=['amount'], dates=['date'])
#     print(data)
