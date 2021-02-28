let childToBeDeleted = "B2";
let childrens = ["A1" , "B2" , "C2" , "X2"];


let filteredChildrens = childrens.filter(  function(child){
    return child != childToBeDeleted;
})

console.log(filteredChildrens);