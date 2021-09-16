# QR-Generator


This script generates QR Code .pngs based off provided data in .csv format



## Usage

1. Add data ```.csv``` file to ```/input``` folder
2. [ TBD how to update design settings ]
3. [ TBD on how to install modules -  can I create an easy .exe? ]
4. [ TBD how to run script - can I create an easy .exe? ]
5. Retrieve your QR Codes from ```/output/[csv-file-name-date]/```



## Input Data Format

All input files must be in ```.csv``` format and follow the below data structure;

| id          | url               |
| ----------- | ----------------- |
| unique_name | www.your-link.com |

For spreadsheet template in excel format see ```input/template/example.xlsx```

For spreadsheet template in .csv format see ```input/template/example.csv```

## Output Data Format

Each time you run the script, a folder in ```/output```will be generated per ```.csv``` file provided in ```/input``` . Each of these output directories will be named based off their respective input file + current date time. 

example;

you have two files in ```/input``` ;  ```social-links.csv``` and ```personal.csv``` 

The script will generate two new directories every time the script is run. These directories will be ```/output/social-links_DATE_TIME``` and ```/output/personal_DATE_TIME```

Your QR Codes are exported into these directories



## Directory 





## Dependencies

Node.js 

Modules;

* ```bluebird```
* ```neat-csv```
* ```qrcode```

