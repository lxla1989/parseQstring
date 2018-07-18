const parseQstring = require('../lib/parseQstring');
let qs = 'at>15,tid==,tid>=,tid<=,at<200,hid~=A04,at!=101,hid!=A01,pid==,cid!=00,undefined==1,at==Undefined';
// let qs = ',tid==,tid>=,at>15,,tid<=,tid~=5,';
// let qs = 'td==Undefined';
let tt = parseQstring(qs);
console.log(JSON.stringify(tt));