var express = require('express');
var router = express.Router();
let {
  insert,
  find,
  del,
  update
} = require("../lib/mongod.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 插入数据
router.post('/insertuser',async(req, res, next)=>{
  let {user,phone}=req.body;
  let data=await insert('usermessage',[{user,phone}]);
  console.log(data);
  res.send({
    status:'success',
  });
})
//评论的相关内容
router.post('/insertcomment',async(req, res, next)=>{
  let {j_id,user,conent}=req.body;
  if(j_id && user && conent){
    // 传三个数据的时候是插入数据
    let insertdata=await insert('comment',[{
      j_id,user,conent
    }]);
    console.log(insertdata);
    res.send({
      status:'success',
    })
  }else if(j_id){
    // 传一个j_id的时候是拿
    let finddata=await find('comment',{j_id});
    res.send(finddata.reverse());
  }
});
// 收集用户发送的模拟开户数据
router.post('/monikaihu',async(req, res, next)=>{
  let {jiaoyisuo,user,phone}=req.body;
  if(jiaoyisuo&&user&&phone){
    let insertdata=await insert('monikaihu',[{jiaoyisuo,user,phone}]);
    res.send({
      status:'success',
    })
  }else{
    res.send({
      status:'fail',
    })
  }
});
// 收集用户提交的兑换信息
router.post('/fanyongdt',async(req, res, next)=>{
  let {user,phone,shenqing,kaihupt,pingtaizh}=req.body;
  if(user&&phone&&shenqing&&kaihupt&&pingtaizh){
    let insertdata=await insert('fanyongdt',[{user,phone,shenqing,kaihupt,pingtaizh}]);
    res.send({
      status:'success',
    })
  }else{
    res.send({
      status:'fail',
    })
  }
});
module.exports = router;
