console.log(this) //전역객체
console.log(this === module.exports);

function a(){
    console.log(this === global)
}
a(); 