/**
 * @author lxl
 * @version v1.0.12
 * 等于类型 符号: 等于(==) 不等于(!=)
 * 范围 符号: 大于(>) 小于(<) 不小于(>=) 不大于(<=)
 * 模糊 符号: 像(~=)
 * eg:  
 *      let qs = 'at>123456789,tid==00895485acb,tid>=null,at<233456789,hid~=A01**1223++300\\03+++,at!=200,hid!=B01122330003,pid==,cid!=00,ppd>,value==138,,mail==abc_1554+da==ddkl@163.com';
 *      return: {
                    at:{
                        $gt: 123456789,
                        $lt: 233456789,
                        $ne: 200
                    },
                    tid:{
                        $eq: '00895485acb'
                    },
                    hid:{
                        $regex: '/A01\\*\\*1223\\+\\+300\\\\03\\+\\+\\+/gi'
                    }
                }
 */

/**
 * @param {String} queryString 以透号分割的key, value字符串
 * @param {<Object> | <boolean>} options 默认为boolean值为true, 为Object时则指定key的字符型数字强制转为数值型数字, 如{ at: true }, 则会对key为at的值能转为数值型强制转换
 * @return {JSON} conditions
 */
function parseQstring(queryString, options = true) {
    if(!queryString) return {};
    /** 暂时只支持的mongo支持的逻辑计算符号集 */
    const mongoObj = {
        '==': '$eq',
        '!=': '$ne',
        '>=': '$gte',
        '<=': '$lte',
        '>': '$gt',
        '<': '$lt',
        '~=':'$regex'
    };
    const conditions = {};
    const queryStringArr = queryString.split(','); //[ 'tid==00895485acb', 'at>123456789', 'at<233456789', 'at!=200', 'hid~=A01122330003', 'hid!=B01122330003' ]
    let key = ''; //变量名
    let temObj = {}; //铺助对象, 用于构造参数对象, 如{ "tid":{"$eq":"00895485acb"} }
    for (let qs of queryStringArr) {
        if (!qs) continue;

        const logiclOperator = (/[==|!=|>=|<=|>|<|~=]{1,2}/).exec(qs)[0]; // 此处用正则取出逻辑操作符号
        if (!logiclOperator) continue;

        let logiclOperatorIndex = qs.indexOf(logiclOperator);
        key = qs.substring(0, logiclOperatorIndex);
        let value = qs.substring(logiclOperatorIndex + logiclOperator.length);
        if(!key || key.toLowerCase() === 'undefined' || key.toLowerCase() === 'null') continue;
        if (!value || value.toLowerCase() === 'undefined' || value.toLowerCase() === 'null') continue;

        if (logiclOperator === '~=') { // 针对模糊查找时对value作转义字符处理
            value = new RegExp(makeQueryStringAllRegExp(value), 'gi');
        }

        if (typeof options === 'boolean' && options) { // 此处决定是否将字符型数字转为数值型数字
            value = isNaN(Number(value)) ? value : Number(value);
        } else if (typeof options === 'object') {
            if (options[key]) value = isNaN(Number(value)) ? value : Number(value);
        }

        if (conditions[key]) {
            conditions[key][mongoObj[logiclOperator]] = value;  //conditions存在属性时，追加属性
        } else {
            temObj[mongoObj[logiclOperator]] = value;               //conditions不存在属性时，直接给str赋属性
            conditions[key] = temObj;
            temObj = {};                                            //conditions不存在属性时，赋空对象给str以重新赋属性
        }
    }
   
    return conditions;     //{"tid":{"$eq":"00895485acb"},"at":{"$gt":"123456789","$lt":"233456789","$ne":"200"},"hid":{"$regex":"/A01\\*\\*1223\\+\\+300\\\\03\\+\\+\\+/gi","$ne":"B01122330003"}}
};

/**
 * 将字符串中的特殊作转义处理
 * @param {String} str
 */
function makeQueryStringAllRegExp(str) {
    const fbsArr = ['\\\\', '\\$', '\\(', '\\)', '\\*', '\\+', '\\.', '\\[', '\\]', '\\?', '\\^', '\\{', '\\}', '\\|'];
    for (let item of fbsArr) {
        const instead = RegExp(item, 'g');
        str = str.replace(instead, item);
    }
    return str;
};

module.exports = parseQstring;