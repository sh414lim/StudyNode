const express = require("express");  
const path = require('path')
const app=express();

app.set('port',process.env.PORT || 3000); //서버에 속성을 심는다

//http 메서드 url 
app.get('/',(rea,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
});

app.post('/',(rea,res)=>{
    res.send("hello express")
});
app.get('/',(rea,res)=>{
    res.send("hello express")
});


app.listen(app.get('port'),()=>{
    console.log('익스프레스 서버 실행')
});