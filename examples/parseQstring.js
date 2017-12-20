const parseQstring = require('../parseQstring');
let qs = 'at>1508717995100,tid==008098022c9b,at<1508724704042,hid~=A01122330003,at!=200,hid!=B01122330003,pid==,cid!=00,ppd>';
let tt = parseQstring(qs);
console.log(JSON.stringify(tt)); //{"tid":{"$eq":"008098022c9b"},"at":{"$gt":1508717995100,"$lt":1508724704042,"$ne":200},"hid":{"$regex":"A01122330003","$ne":"B01122330003"}}