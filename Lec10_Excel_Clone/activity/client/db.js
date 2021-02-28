let sheetsDB = [];

function initDB(){
    let newDB = [];
    for(let i=0 ; i<100 ; i++){
        let row = [];
        for(let j=0 ; j<26 ; j++){
            let address = String.fromCharCode(65+j) + (i+1); 
            let cellObject = {
                name:address,
                value:"",
                formula:"",
                childrens:[],
                parents:[]
            }
            row.push(cellObject);
        }
        newDB.push(row);
    }
    sheetsDB.push(newDB);
}
initDB();

let db = sheetsDB[0];



