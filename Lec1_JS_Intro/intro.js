// C++ => cout<<"Hello World !"<<endl;
// Java => System.out.println("Hello World !!"); => .class => execute

// Livescript => Javascript => java

// top to down
// left to right

// console.log("Hello World !!");


// data types => int , char , float , String , boolean , double , long , short , long long

// data types => Number , Boolean , String , undefined , null 

// Variable declaration
// datatype variablename = value;
// int a = 10; 

// ES6 syntax =>
// let ya const

// let keyword => block scoped // reassignment is possible
// const keyword => block scoped // reassignment is not possible
// const pi = 3.14;
// pi = 15; // this is not allowed as it is const
// console.log(pi);


// let a = 10;
if(true){
   const a = 20;
    if(true){
        if(true){

        }
    }
    // console.log("inside if block!!");
    // console.log(a);
}


let a; // by default takes up undefined 
// console.log(a);


let b = true;
let c = "Hey i am a string !!";

// arrays / objects => address copy

// 1d , 2d , 3d

// array define = 2k
let names = ["penny" ,"sheldon" , "leonard" , 23 , false , undefined ,  [ "steve" , "tony" , "natasha" ] ];
// let dupNames = names;

// push , pop , unshift , shift , splice
// console.log(names[1]);
// console.log(names.pop());
// console.log(names);


// objects => key values pairs

// let obj = new Object();

let obj = {
    "name":"steve",
    "skills" : ["martial arts" , "taekwondo" , "boxing"],
    "movies" : ["captain america" , "civil war" , "infinity war"],
    "place" : "Queens,New York"
};
// keys => unique
// values => duplicate

// dot notation => literal check
// console.log(obj.place);
// console.log(obj.skills);
let key = "name";
// console.log(obj.key);
// bracket notation
console.log(obj["name"]);





