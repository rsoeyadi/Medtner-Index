var db = firebase.database(); //create reference to database
var ref = db.ref('compositions'); //target in the database

piecesHTML = document.querySelector('.piece__container'); //for where we will put our data later
buttonClicked = document.getElementsByClassName('button')[0];

ref.once('value', receivedData, notReceivedData); //read the data in the db, and callback functions

function createTitleQuery(title) {
    return "Medtner " + title.replace(/\s/g, '+').toLowerCase();
}

function displayPieces(piece) {

    var movements = '<div class=""><h4 class="piece__movements">Movements</h4><div class="piece__movements">';
    var youtubeQuery = createTitleQuery(piece.queryTitle);

    for (let i = 0; i < piece.movements.length; i++) {
        if (piece.movements[i].movementNumber == "") {
            movements = '';
            break;
        } else {
            movements += `<p class="piece__movements">${piece.movements[i].movementNumber}. ${piece.movements[i].movement}</p>`;
        }
    }

    movements += "</div></div>"

    if ((piece.op == "" | piece.op == "posthumous" | piece.op == undefined) && parseDates(piece.year, savedDate) == 0) {
        return `<div class="piece">
                    <div class="piece__content accordionGroup">
                        <h1 class="piece__title">${piece.title}, Op. ${piece.op}
                            
                        </h1>
                        <div>
                        <p class="piece__instrumentation">${piece.instrumentation}</p>
                        <p class="piece__year">${piece.year}</p>
                        <p class="piece__duration">About ${piece.approxDuration} min</p>   
                        ${movements}
                        </div>
                     </div>
                </div>`;
    }

    if ((piece.hasOwnProperty('no') && parseDates(piece.year, savedDate) == 0)) {

        return `<div class="piece">
                    <div class="piece__content accordionGroup">
                        <p class="piece__title">${piece.title}, Op. ${piece.op}, No. ${piece.no}</p>

                        
                            
                        
                        
                    <div>
                            
                            <p class="piece__instrumentation">${piece.instrumentation}</p>
                            <p class="piece__year">${piece.year}</p>
                            <p class="piece__duration">About ${piece.approxDuration} min</p>   
                            ${movements}
                        </div>
                    </div>  
                </div>`;
    }

    if (parseDates(piece.year, savedDate) == 0) {
        return `<div class="piece">
                <div class="piece__content accordionGroup">
                    <h2 class="piece__title">${piece.title}, Op. ${piece.op}</h2>
                    
                    <div href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                    <p class="piece__instrumentation">${piece.instrumentation}</p>
                    <p class="piece__year">${piece.year}</p>
                    <p class="piece__duration">About ${piece.approxDuration} min</p>   
                    ${movements}
                    </div>
                </div>
            </div>`;
    }
}

function receivedData(data) {

    var values = data.val(); //the data itself

    function passBtnText() { //closure for passing in button text
        buttonClicked = this;
        buttonID = this.id;
        text = this.textContent; //we bind the button text to this function and need to use 'this'

        currentPiecesInstrumentation = $(this).parent().parent().parent().attr('id').replace(/\-/g, ' ');

        let pieces = values.map(function(piece) { //go through each object one by one and create the HTML dynamically
            var chamberMusic = ["two pianos", "piano quintet"];
            //'all' buttons
            if (buttonID == "allMusic-btn") {
                for (var i = 0; i < genreDivs.length; i++) {
                    genreDivs[i].classList.add('hidden');
                }
                return displayPieces(piece);
            }

            if (buttonID == "allPiano-btn" | buttonID == "allViolin-btn" | buttonID == "allVoice-btn" | buttonID == "allChamber-btn") {
                if (buttonID == "allPiano-btn") {
                    if (piece.instrumentation === "solo piano") {
                        return displayPieces(piece);
                    }
                } else if (buttonID == "allViolin-btn") {
                    if (piece.instrumentation === "violin and piano") {
                        return displayPieces(piece);
                    }
                } else if (buttonID == "allVoice-btn") {
                    if (piece.instrumentation === "voice and piano") {
                        return displayPieces(piece);
                    }
                } else if (buttonID == "allChamber-btn") {
                    for (var i = 0; i < chamberMusic.length; i++) {
                        if (piece.instrumentation == chamberMusic[i]) {
                            return displayPieces(piece);
                        }
                    }
                }

            } else {

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

        /* after HTML is displayed, add accordion */
        $(".accordionGroup").accordion({
            "active": false,
            "animate": true,
            "collapsible": true
        });
    }

    /* this is where we actually hook up the buttons to the filter */

    btns = document.getElementsByClassName('button'); //grab the buttons

    for (var i = 0; i < btns.length; i++) { //loop through and bind each button and call the closure
        btns[i].addEventListener('click', passBtnText.bind(btns[i]));

    }

}

function notReceivedData(error) {
    console.log('Error!');
    console.log(error)
}