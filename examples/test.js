const parseQstring = require('../lib/parseQstring');
let qs = 'at>=123456<=789,at>123456789,tid==00895485acb,tid>=null,at<233456789,hid~=\A01**1223++300\\03+++,at!=200,hid!=B01122330003,pid==,cid!=00,ppd>,value==138,,mail==abc_1554+da==ddkl@163.com';
// let qs = ',tid==,tid>=,at>15,,tid<=,tid~=5,';
// let qs = 'td==Undefined';
// let qs ='module==,type==,created>=,created<=';
let tt = parseQstring(qs);
console.log(JSON.stringify(tt));