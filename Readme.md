[TOC]

## About

```
Just change a query string to a mongo's match object
```

## Installation

```
$ npm install parseqstring
```

## Example

```
const parseQstring = require('parseqstring');

let qs = 'at>15,tid==01,at<200,hid~=A04,at!=101,hid!=A01,pid==,cid!=00,ppd>';

let result = parseQstring(qs, { at: true });

//{"at":{"$gt":15,"$lt":200,"$ne":101},"tid":{"$eq":"01"},"hid":{"$regex":"A04","$ne":"A01"},"cid":{"$ne":"00"}}

```