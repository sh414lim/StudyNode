// worker_threads
// 노드에서 멀티 스레드 방식으로 작업할 수 있음
const{ isMainThread,Worker, parentPort  } =require('worker_threads');

if(isMainThread){ //메인 스레드
const wokrer=new Worker(__filename);
wokrer.on('message',(value)=>console.log('워커로부터',value));
wokrer.on('exit',()=>console.log('워커끝~'))
wokrer.postMessage('ping');
}else{ // 워커스레드
parentPort.on('message',(value)=>{
    console.log('부모로부터',value);
    parentPort.postMessage('pong')
    parentPort.close()
})
}