

var db =  firebase.database(); //create reference to database

var ref = db.ref('compositions'); //target in the database

ref.once ('value', receivedData, notReceivedData); //read the data in the db, and callback functions

piecesHTML = document.querySelector('.list-compositions'); //for where we will put our data later


function receivedData(data) {
    //we received the data; proceed with parsing it

    var values = data.val(); //the data itself

    let pieces = values.map(function(piece) {


        for (var i = 0; i < piece.movements.length; i++) {
            if (piece.movements[i]['movement'].includes("Piano Sonata")) {
                return `<div class="piece">
                <h1 class="title">${piece.title}, Op. ${piece.op}</h1>
                <p class="instrumentation">${piece.instrumentation}</p>
                <p class="year">${piece.year}</p>
                <p class="duration">About ${piece.approxDuration} min</p>

               
            </div>`;
            }
        }

        if (piece.title.includes("Piano Sonata")) {
        return    `<div class="piece">
                        <h1 class="title">${piece.title}, Op. ${piece.op}</h1>
                        <p class="instrumentation">${piece.instrumentation}</p>
                        <p class="year">${piece.year}</p>
                        <p class="duration">About ${piece.approxDuration} min</p>   
                    </div>`;
        }
            })
    
     pieces = pieces.join("");
     piecesHTML.innerHTML = pieces;
}

function notReceivedData(error) {
    console.log('Error!');
    console.log(error)
}