# QR-Generator


This script generates QR Code .pngs based off provided data in .csv format

This version generates highly styled QR codes. Based off [qr-code-styling](https://qr-code-styling.com/) . All design features shown there can be implemented here. For complex designs I would recommend using that website to generate design settings, scrolling to the bottom of the page allows you to export to JSON. 

For basic black and white QR codes using ```qrcode``` module, please see ```plain-codes``` branch of this repo.

## Usage

Ensure you have node.js installed on your machine. [Install here](https://nodejs.org/en/download/) 



1. Add data ```.csv``` file to ```/input``` folder. refer to input data section for details ( example data linking to google can be found here : ```input/template/example.csv``` copy this into ```input/``` for quick start test)
2. Click on the ``app_install`` file relevant to your operating system
3. Click on the ```app_run``` file relevant to your operating system
5. Retrieve your QR Codes from ```/output/[csv-file-name-date]/```



Optional:

* Update any render settings / designs in ```/design/``` refer to render settings & design section of readme for more info

  


## Input Data Format

All input files must be in ```.csv``` format, have a descriptive and unique name and follow the below data structure;

| id          | url               |
| ----------- | ----------------- |
| unique_name | www.your-link.com |

For spreadsheet template in excel format see ```input/template/example.xlsx```

For spreadsheet template in .csv format see ```input/template/example.csv```

## Output Data Format

Each time you run the script, a folder in ```/output```will be generated per ```.csv``` file provided in ```/input``` . Each of these output directories will be named based off their respective input .csv  file + current date time. 

example;

* you have two files in ```/input``` ;  ```social-links.csv``` and ```personal.csv``` 

* The script will generate two new directories every time the script is run. 
* These directories will be ```/output/social-links_DATE_TIME``` and ```/output/personal_DATE_TIME```
* Your QR Codes are exported into these directories

## Render Settings & design 

[you can design here and export out settings as JSON - script will accept these params](https://qr-code-styling.com/)

Default Design Settings can be configured via ```/design/render-options.json```

Any logos or assets to embed in the QR codes should also be placed in here, the filename of the image should then be added to the ```.json``` file.

To have individual design settings files for each .csv in input file, create a ```settings-file.json``` file with a matching name. 

Example : 

* I have a input file called ```social.csv```
* I want all the QR codes from this file to be red and have a instagram logo in the middle
* Add the Instagram logo file to ```/designs/instagram.png```
* Add a new settings file to ```/designs``` called ``social.json``
  * this file will have ```dotsOptions.color = "#F00"```
  * ```image = "instagram.png"```



## Dependencies

Node.js 

Modules;

* ```bluebird```
* ```neat-csv```
* [qr-code-styling](https://www.npmjs.com/package/@ckho/qr-code-styling)
* ```canvas```

