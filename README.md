# QR-Generator


This script generates QR Code .pngs based off provided data in .csv format



## Usage

Ensure you have node.js installed on your machine. [Install here](https://nodejs.org/en/download/) 



1. Add data ```.csv``` file to ```/input``` folder. refer to input data section for details
2. Click on the ``app_install`` file relevant to your operating system
3. Click on the ```app_run``` file relevant to your operating system
5. Retrieve your QR Codes from ```/output/[csv-file-name-date]/```



Optional:

* Update any render settings / designs in ```/design/render-options.json```


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

## Render Settings & design 

[you can design here and export out settings as JSON - script will accept these params](https://qr-code-styling.com/)

Default Design Settings can be configured via ```/design/render-options.json```

Any logos or assets to embed in the QRCode should also be placed in here, the filename of the image should then be added to the options.json file.



## Dependencies

Node.js 

Modules;

* ```bluebird```
* ```neat-csv```
* https://www.npmjs.com/package/@ckho/qr-code-styling](qr-code-styling)
* ```canvas```

