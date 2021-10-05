const http=require('http');
const fs = require('fs').promises;

const server=http.createServer(async(req,res) => {
try{
    res.writeHead(200,{'Content-Type' :'text/html; charset=utf-8'})
    const data=await fs.readFile('./server2.html');
    res.end(data)
}catch(error){
console.error(err);
es.writeHead(200,{'Content-Type' :'text/plain; charset=utf-8'})
res.end(data)
}
})

//listen 을 하는 경우에는 포트(터미널) 하나를 잡아먹는다
.listen(8080,()=>{
    server.on('listening',()=>{
        console.log('8080포트 서버 대기')
    })
    server.on('error',(error)=>{
        console.error(error);
    })
});