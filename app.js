var db =  firebase.database(); //create reference to database

var ref = db.ref('compositions'); //target in the database

ref.once ('value', receivedData, notReceivedData); //read the data in the db, and callback functions

piecesHTML = document.querySelector('.list-compositions'); //for where we will put our data later

function receivedData(data) {
    //we received the data; proceed with parsing it

    var values = data.val(); //the data itself

    

    let pieces = values.map(function(piece) {

        var movements = ''; 

        
        // if (piece.movements.length == 1) {
        //     for (var i = 0; i < piece.movements.length; i++) {
        //         movements += `<ul class="movements">
        //         <li>${JSON.stringify(piece.movements[i]['movement']).replace(/['"]+/g, '')}</li>
        //     </ul>
        // </div>`
        //     }
        //       return `<div class="piece">
        //         <h1 class="title">${piece.title}, Op. ${piece.op}</h1>
        //         <p class="instrumentation">${piece.instrumentation}</p>
        //         <p class="year">${piece.year}</p>
        //         <p class="duration">About ${piece.approxDuration} min</p>
        //         ${movements}`;
        // }

        //add "no." as in "op. 53 no. 1"
        if (piece.op == "TBD" | piece.op == "posthumous") {
            for (var i = 0; i < piece.movements.length; i++) {
                movements += `<ul class="movements">
                <li>${JSON.stringify(piece.movements[i]['movementNumber'])}. ${JSON.stringify(piece.movements[i]['movement']).replace(/['"]+/g, '')}</li>`
            }
            
            return  `<div class="piece">
                        <h1 class="title">${piece.title}</h1>
                        <p class="instrumentation">${piece.instrumentation}</p>
                        <p class="year">${piece.year}</p>
                        <p class="duration">About ${piece.approxDuration} min</p>

                    <ul class="movements">
                        ${movements}
                    </ul>
                    </div>`;
        }

        
        for (var i = 0; i < piece.movements.length; i++) {
            movements += `
            <li>${JSON.stringify(piece.movements[i]['movementNumber'])}. ${JSON.stringify(piece.movements[i]['movement']).replace(/['"]+/g, '')}</li>`
        }

          return    `<div class="piece">
                        <h1 class="title">${piece.title}, Op. ${piece.op}</h1>
                        <p class="instrumentation">${piece.instrumentation}</p>
                        <p class="year">${piece.year}</p>
                        <p class="duration">About ${piece.approxDuration} min</p>

                        <ul class="movements">
                            ${movements}
                        </ul>
                    </div>`;
            })
    
     pieces = pieces.join("");
     piecesHTML.innerHTML = pieces;
}

function notReceivedData(error) {
    console.log('Error!');
    console.log(error)
}