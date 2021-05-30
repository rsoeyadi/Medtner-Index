var db =  firebase.database(); //create reference to database

var ref = db.ref('compositions'); //target in the database

ref.on('value', receivedData, notReceivedData); //read the data in the db, and callback functions

piecesHTML = document.querySelector('.list-compositions'); //for where we will put our data later

function receivedData(data) {
    //we received the data; proceed with parsing it

    var values = data.val(); //the data itself

    let pieces = values.map(function(piece) {
        return `<h4 class="title">${piece.title + ', ' + "Op. " + piece.op}</h1>`
    })
    
    pieces = pieces.join("");
    piecesHTML.innerHTML = pieces;
}

function notReceivedData(error) {
    console.log('Error!');
    console.log(error)
}