from functools import partial

def sort_row(row, column_map):
    return tuple([row[i] for i in column_map])

def sort_columns(data, headers):
    print('-'*50)
    print(headers)
    print('-'*50)
    sorted_headers = sorted(headers)
    print(sorted_headers)
    print('-'*50)
    column_map = [headers.index(v) for v in sorted_headers]
    print(column_map)
    print('-'*50)
    sorted_data = map(partial(sort_row, column_map=column_map), data)
    return list(sorted_data)
