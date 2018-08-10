/*
模板引擎就是基于模板配合数据构造出字符串输出的一个组件.模板引擎最常见的输出就是输出网页，
也就是HTML文本。当然，也可以输出任意格式的文本，比如Text，XML，Markdown等等。
*/
function examResult (data) {
    return `${data.name}同学一年级期末考试语文${data.chinese}分，
    数学${data.math}分，位于年级第${data.ranking}名。`
}

examResult({
    name: '小明',
    chinese: 78,
    math: 87,
    ranking: 999
});
/*
该模板引擎把模板字符串里面对应的变量替换以后，就可以得到以下输出：
小明同学一年级期末考试语文78分，数学87分，位于年级第999名。
 */


