const parseQstring = require('../lib/parseQstring');
let qs = 'at>15,tid==01,at<200,hid~=A04,at!=101,hid!=A01,pid==,cid!=00,ppd>';
let tt = parseQstring(qs);
console.log(JSON.stringify(tt)); //{"tid":{"$eq":"008098022c9b"},"at":{"$gt":1508717995100,"$lt":1508724704042,"$ne":200},"hid":{"$regex":"A01122330003","$ne":"B01122330003"}}