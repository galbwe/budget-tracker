from glob import glob

def find_files(dir, ext):
    ''' Find all files in a given directory with the given file extension.
    '''
    if dir[-1] == '/':
        dir = data_dir[:-1]
    files = glob(dir + f'/*.{ext}')
    return files
