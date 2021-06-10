var db =  firebase.database(); //create reference to database
var ref = db.ref('compositions'); //target in the database
ref.once ('value', receivedData, notReceivedData); //read the data in the db, and callback functions

piecesHTML = document.querySelector('.piece__container'); //for where we will put our data later

function receivedData(data) { 

        var values = data.val(); //the data itself

        function passBtnText() { //closure for passing in button text
            
            buttonID = this.id;
            text = this.textContent; //we bind the button text to this function and need to use 'this'

            currentPiecesInstrumentation = $(this).parent().attr('id');
            let pieces = values.map(function(piece) { //go through each object one by one and create the HTML dynamically
            
            function createTitleQuery(title) {
                return "Medtner " + title.replace(/\s/g, '+').toLowerCase();
            }

            function displayPieces() {
                
                var movements = "";
                var youtubeQuery = createTitleQuery(piece.queryTitle);

                for (let i = 0; i < piece.movements.length; i++) {
                    if (piece.movements[i].movementNumber == "") {
                        break;
                    }
                    else {
                    movements += `<div>${piece.movements[i].movementNumber}. ${piece.movements[i].movement}</div>`;
                    }
                }

                if (piece.op == "" | piece.op == "posthumous" | piece.op == undefined) {
                    
                    return  `<div class="piece">
                            <div class="piece__content">
                            <a href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                            <h1 class="piece__title">${piece.title}</h1>
                            <p class="piece__instrumentation">${piece.instrumentation}</p>
                            <p class="piece__year">${piece.year}</p>
                            <p class="piece__duration">About ${piece.approxDuration} min</p>   
                            ${movements}
                            </a>
                            </div>
                            
                            </div> 
                            `;
                }
                    
                if (piece.hasOwnProperty('no')){
                    return  `<div class="piece">
                        <div class="piece__content">
                        <a href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                        <h2 class="piece__op">Op. ${piece.op}, No. ${piece.no}</h1>
                        <h1 class="piece__title">${piece.title}</h1>
                        <p class="piece__instrumentation">${piece.instrumentation}</p>
                        <p class="piece__year">${piece.year}</p>
                        <p class="piece__duration">About ${piece.approxDuration} min</p>   
                        ${movements}
                        </a>
                        </div>
                        
                        </div>
                        `;     
                }

                return  `<div class="piece">
                        
                        <div class="piece__content">
                        <a href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                        <h2 class="piece__op">Op. ${piece.op}</h1>
                        <h1 class="piece__title">${piece.title}</h1>
                        <p class="piece__instrumentation">${piece.instrumentation}</p>
                        <p class="piece__year">${piece.year}</p>
                        <p class="piece__duration">About ${piece.approxDuration} min</p>   
                        ${movements}
                        </a>
                        </div>
                        
                        </div>
                        `;       
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
                if (buttonID == "miscPiano-btn" && piece.misc) {
                    return displayPieces(piece);
                }

                for (let i = 0; i < piece.movements.length; i++) {
                    if (piece.movements[i].movement.includes(text) && piece.instrumentation.includes(currentPiecesInstrumentation)) {
                        return displayPieces(piece);
                    }
                }

                if ((piece.title.includes(text)) && piece.instrumentation.includes(currentPiecesInstrumentation)) {
                    return displayPieces(piece);
                    }
                }

                if (piece.instrumentation.includes(text.toLowerCase())) {
                    return displayPieces(piece);
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