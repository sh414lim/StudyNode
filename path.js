//포괄적인 경로 지정을 위해 path 사용 
const path= require('path');

console.log(path.join(__dirname,".."))



//윈도우 리눅스
// C:\user\zerocho

//mac
// /user/zerocho

//경로를 합쳐준다
// path.join(__dirname,'var.js');

// \node\lecture\var.js
// posix 맥 리눅스