const express = require("express");  
const path = require('path')
const app=express();

app.set('port',process.env.PORT || 3000); //서버에 속성을 심는다

//미들웨어
app.use("/about",(req,res,next)=>{
    //함수가 미들웨어를 use에 장착
    console.log('모든 요청에 실행하고 싶어욧');
    next();
},(req,res,next)=>{
    //함수가 미들웨어를 use에 장착 여러게 실행가능
    console.log('모든 요청에 실행하고 싶어욧2');
    next();
},(req,res,next)=>{
    //함수가 미들웨어를 use에 장착
    console.log('모든 요청에 실행하고 싶어욧3');
    next();
},(req,res,next)=>{
    //함수가 미들웨어를 use에 장착
    throw new Error("에러생성")
})

//Router
//http 메서드 url 
app.get('/',(rea,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
});

app.post('/',(rea,res)=>{
    res.send("hello express")
});

//와일드카드
//변수처럼 사용가능

app.get('/category/javas',(req,res)=>{
    res.send(`hello javas`)
});

app.get('/category/:name',(req,res)=>{
    res.send(`hello ${req.params.name}`)
});


app.get('/about',(rea,res)=>{
    res.send("hello express")
});

//에스터리스크
//모든  get 요청을 다 처리하겟다
app.get('/*',(req,res)=>{
    res.send(`hello everybody`)
});

//마지막에 에러 미들웨어 사용
//에러 미들웨아는 파라미터를 4개를 사용해야한다
//next를 무조건 무조건 넣어야된다
app.use((err,req,res,next)=>{
console.error(err);
res.send('에러가 낫다, 이유는 비밀입니다')
})


app.listen(app.get('port'),()=>{
    console.log('익스프레스 서버 실행')
}); 