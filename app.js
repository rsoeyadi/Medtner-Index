var db =  firebase.database(); //create reference to database
var ref = db.ref('compositions'); //target in the database
ref.once ('value', receivedData, notReceivedData); //read the data in the db, and callback functions

piecesHTML = document.querySelector('.list-compositions'); //for where we will put our data later

function receivedData(data) { 

        var values = data.val(); //the data itself

        function passBtnText() { //closure for passing in button text
            
            buttonID = this.id;
            text = this.textContent; //we bind the button text to this function and need to use 'this'

            let pieces = values.map(function(piece) { //go through each object one by one and create the HTML dynamically
            

            function displayPieces(object) {

                    return  `<div class="piece">
                            <h1 class="title">${piece.title}, Op. ${piece.op}</h1>
                            <p class="instrumentation">${piece.instrumentation}</p>
                            <p class="year">${piece.year}</p>
                            <p class="duration">About ${piece.approxDuration} min</p>   
                            </div>`;
                            
                }

            //'all' buttons

            if (buttonID == "allMusic-btn") {
                        return displayPieces(piece);
                }
            
            if (buttonID == "allPiano-btn" | buttonID == "allViolin-btn" | buttonID == "allVoice-btn") {
                if (buttonID == "allPiano-btn") {
                    for (var i = 0; i < piece.movements.length; i++) {
                        if (piece.instrumentation === "solo piano") {
                            return displayPieces(piece);
                        }
                    }
                } 

            else if (buttonID == "allViolin-btn")  {
                for (var i = 0; i < piece.movements.length; i++) {
                    if (piece.instrumentation === "violin and piano") {
                        return displayPieces(piece);
                    }
                }
            } 
            
            else if (buttonID == "allVoice-btn") {
                for (var i = 0; i < piece.movements.length; i++) {
                    if (piece.instrumentation === "voice and piano") {
                        return displayPieces(piece);
                        }
                    }
                } 
            }
            
            else {
                if (piece.title.includes(text)) {
                    return displayPieces(piece);
                    }
                }
        })
                    
            pieces = pieces.join(""); //put the HTML all together (get rid of the commas separating the HTML)
            piecesHTML.innerHTML = pieces;

        }
    
    /* this is where we actually hook up the buttons to the filter */

    btns = document.getElementsByTagName('button'); //grab the buttons

    for (var i = 0; i < btns.length; i++) { //loop through and bind each button and call the closure
        btns[i].addEventListener('click', passBtnText.bind(btns[i]));
    }

}

function notReceivedData(error) {
    console.log('Error!');
    console.log(error)
}