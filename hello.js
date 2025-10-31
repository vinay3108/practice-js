let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};


function multiplyNumeric(obj) {
  for(key in obj){
    if(typeof obj[key]=='number'){
      obj[key]=obj[key]*2;
    }
  }
  return obj;
}

console.log(multiplyNumeric(menu));