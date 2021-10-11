const express = require("express");  
const path = require('path')
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const session=require('express-session');

const app=express();

//
//배포시 combined
//개발시 dev
//미들웨어 순서 중요 ->모건 무조건 실행->거의 모든 미들웨어는 내부적으로 next 를 실행한다
app.use(morgan('dev'));
// app.use('요청경로',express.static('실제경로'))
app.use(express.static(path.join(__dirname,'public'))) //정적 파일을 보내줌.파일이 실제 경로 안에 존재하면 다음 미들웨어를 호출한다
app.use(cookieParser('password'));
app.use(session(
{
    resave:false,
    saveUninitialized:false,
    secret:"marko",
    cookie:{
        httpOnly:true, //세션안에서는 쿠키를 무조건 설정해야하고 httponly를 true로 설정을해야 js로 공격을 당하지 않는다
    },
    name:'connect.sid'
}
));
app.use(express.json());
app.use(express.urlencoded({extenided:true}));


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
    // throw new Error("에러생성")ex
})

//Router
//http 메서드 url 
app.get('/',(rea,res)=>{
    req.session.id = 'hello' // 그 사용자에 대한 세션이됨 .요청을 보낸 사람만 id가 헬로가 된다 ->개인의 저장공간
     // res.sendFile(path.join(__dirname,'./index.html'))
    req.cookies // {mycookie:'test}
        req.signedCookies; //쿠키 암호화(서명)
    res.cookie('name',encodeURIComponent(name),{
        expires:new Date(),
        httpOnly:true,
        path:'/',
    })
    //쿠키 삭제
    res.clearCookie('name',encodeURIComponent(name),{
        httpOnly:true,
        path:'/',
    })
     //express 버전
    res.setHeader('Content-Type','text/html')
    res.status(200).send('안녕하세요')

    //api 서버 생성 할때 자주 사용(음답)
    // res.json({hello:'marko'});
},(req,res,next)=>{
    try{
        console.log("에러 발생")
    }catch{
        //next함수한에 넣어주면 바로 에러처리 메소드로 넘어간다
        // next(error)
    }
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

app.use((req,res,next)=>{
    // res.send("404 에러 주소가 확인 되지 않는다")
    res.status(404).send('404입니다')
})

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