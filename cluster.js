//cluster -> 기본적으로 싱글 스레드인 노드가 CPU코어를 모두 사용할 수 있게 해주는 모듈

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; //cpu 갯수만큼 서버가 동시에 띄어진다

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork();
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
      process.exit(1); //서버 종료
      console.error(1)  //에러표시
    }, 1000);
  }).listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}