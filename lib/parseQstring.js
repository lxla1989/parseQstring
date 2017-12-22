/**
 * @author lxl
 * @version v1.0
 * 等于类型 符号: 等于(==) 不等于(!=)
 * 范围 符号: 大于(>) 小于(<) 不小于(>=) 不大于(<=)
 * 模糊 符号: 像(~=)
 * 
 * eg:  
 *      let qs = ''at>1508717995100,tid==008098022c9b,at<1508724704042,hid~=A01122330003,at!=200,hid!=B01122330003';
 *      return: {
                    at:{
                        $gt: 1508717995100,
                        $lt: 1508724704042
                    },
                    tid:{
                        $eq: '008098022c9b'
                    },
                    hid:{
                        $regex: 'A01122330003'
                    }
                }
 */
module.exports = function (qs) {
    let filterArr = ['==', '!=', '>=', '<=', '>', '<', '~='];
    let mongoArr = ['$eq', '$ne', '$gte', '$lte', '$gt', '$lt', '$regex'];
    let conditions = {};
    qs = qs.split(',');           //[ 'tid==008098022c9b', 'at>1508717995100', 'at<1508724704042', 'at!=200', 'hid~=A01122330003', 'hid!=B01122330003' ]
    let vName = '';               //变量名
    let str = {};                 //构造参数对象，如{ "tid":{"$eq":"008098022c9b"} }
    for(let i=0; i<qs.length; i++){ //tid==008098022c9b,at>1508717995100,at<1508724704042,hid~=A01122330003,hid!=B01122330003,at!=200
        filterArr.forEach(function (fe, fi) {
            if (qs[i].match(new RegExp(fe))) {
                vName = qs[i].split(fe)[0];
                if(conditions.hasOwnProperty(vName)){
                    conditions[vName][mongoArr[fi]] = qs[i].split(fe)[1];   //conditions存在属性时，追加属性
                }else{
                    str[mongoArr[fi]] = qs[i].split(fe)[1];                 //conditions不存在属性时，直接给str赋属性
                    if(str[mongoArr[fi]] != "") conditions[vName] = str;
                    str = {};                                               //conditions不存在属性时，赋空对象给str以重新赋属性
                }
            }
        });
    }
   
    return conditions;     //{"tid":{"$eq":"008098022c9b"},"at":{"$gt":"1508717995100","$lt":"1508724704042","$ne":"200"},"hid":{"$regex":"A01122330003","$ne":"B01122330003"}}
};