const {odd,even} = require('./var');
// require => 노드에서 제공 하는 함수


function checkOddEven(number){
    if(number % 2){
        return odd;

    }else{
        return even;
    }
}
//한가지만 빼고 싶으면 module.exports

module.exports={
    checkOddEven,
}