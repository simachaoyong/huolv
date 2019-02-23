var express = require('express');
var router = express.Router();
let {
    insert,
    find,
    del,
    update
} = require("../lib/mongod.js");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// 得到数据渲染页面
router.get('/findData', async(req, res, next)=>{
    // 数据库能连接成功
    // res.send('respond with a resource');
    let {j_id,num}=req.query;
    console.log(j_id,num);
	if(j_id){
		let data=await find("jiaoyisuo",
        {j_id});
        // 数据库中的j_id必须为字符串
		res.send(data);
	}else{
        let data=await find("jiaoyisuo",{});
        // 这里得到的是一个数组，返回对应的段数给前端
        data=data.slice(0,num);
        console.log(data);
		res.send(data);
	}
});
// 页码数据
router.get('/listData', async(req, res, next)=>{
    // 每个页面截取10个数据，默认是1页面
    let {j_id,num,pagecurrent}=req.query;
    if(j_id){
        let data=await find("jiaoyisuo",
		{j_id});
		res.send(data);
    }else{
        // data得到的是所有的数据
        let data=await find("jiaoyisuo",{});
        var pageArr=[];
        let pageNum=Math.ceil(data.length/num);
        if(!pageNum){
            pageArr=[1];
        }else{
            // 页码最好用一个数组
            for(var i=1;i<=pageNum;i++){
                pageArr.push(i);
            }
        }
        // 将数据截取成对应的段
        data=data.slice((pagecurrent-1)*num,num*pagecurrent)
		res.send({
            pageArr,
            data,
        });
    }
});
module.exports = router;

