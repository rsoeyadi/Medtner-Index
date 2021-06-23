var db = firebase.database(); //create reference to database
var ref = db.ref('compositions'); //target in the database
pieceQueryHTML = document.querySelector('.pieceQueryNumber'); //for where we will put our data later
piecesHTML = document.querySelector('.piece__container'); //for where we will put our data later
buttonClicked = document.getElementsByClassName('button')[0];

ref.once('value', receivedData, notReceivedData); //read the data in the db, and callback functions

function createPieceQueryNumber(number) {
    switch(buttonClicked.id) {
        case 'allMusic-btn':
            if (number == 1) {
                return `<div id="total-found">${number} work by Medtner found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} total works by Medtner found since ${savedDate}</div>`
            break;
        case 'allPiano-btn':
            if (number == 1) {
                return `<div id="total-found">${number} solo piano work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} total solo piano works found since ${savedDate}</div>`
            break;
        case 'fairy-btn':
            if (number == 1) {
                return `<div id="total-found">${number} Fairy Tale work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} Fairy Tale works found since ${savedDate}</div>`
            break;
        case 'forg-btn':
            if (number == 1) {
                return `<div id="total-found">${number} set of Forgotten Melodies found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} Forgotten Melodies found since ${savedDate}</div>`
            break;
        case 'pianoConc-btn':
            if (number == 1) {
                return `<div id="total-found">${number} piano concerto found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} piano concerto works found since ${savedDate}</div>`
            break;
        case 'pianoSon-btn':
            if (number == 1) {
                return `<div id="total-found">${number} solo piano sonata found since ${savedDate}</div>`
                break;
            }

            else if (savedDate >= 1907) {
                return `<div id="total-found">${number} solo piano sonatas found since ${savedDate}</div>`
                break;
            }   

            return `<div id="total-found">${number} solo piano sonatas (or ${number + 2} total because of Op. 11, Sonaten-Triade) found since ${savedDate}</div>`
            break;
        case 'miscPiano-btn':
            if (number == 1) {
                return `<div id="total-found">${number} miscellaneous solo piano work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} miscellaneous solo piano works found since ${savedDate}</div>`
            break;
        case 'allViolin-btn':
            if (number == 1) {
                return `<div id="total-found">${number} violin work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} total violin works found since ${savedDate}</div>`
            break;
        case 'canzonas-btn':
            if (number == 1) {
                return `<div id="total-found">${number} violin canzona work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} violin canzona works found since ${savedDate}</div>`
            break;
        case 'nocturnes-btn':
            if (number == 1) {
                return `<div id="total-found">${number} set of violin nocturnes found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} sets of violin nocturnes found since ${savedDate}</div>`
            break;
        case 'violinSon-btn':
            if (number == 1) {
                return `<div id="total-found">${number} violin sonata found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} violin sonatas found since ${savedDate}</div>`
            break;
        case 'allVoice-btn':
            if (number == 1) {
                return `<div id="total-found">${number} vocal work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} total vocal works found since ${savedDate}</div>`
            break;
        case 'fet-btn':
            if (number == 1) {
                return `<div id="total-found">${number} vocal work with text by Fet found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} vocal works with text by Fet found since ${savedDate}</div>`
            break;
        case 'goethe-btn':
            if (number == 1) {
                return `<div id="total-found">${number} vocal work with text by Goethe found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} vocal works with text by Goethe found since ${savedDate}</div>`
            break;
        case 'pushkin-btn':
            if (number == 1) {
                return `<div id="total-found">${number} vocal work with text by Pushkin found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} vocal works with text by Pushkin found since ${savedDate}</div>`
            break;
        case 'vocalSon-btn':
            return `<div id="total-found">${number} vocal sonata found since ${savedDate}</div>`
            break;
        case 'vocalSuite-btn':
            return `<div id="total-found">${number} vocal suite found since ${savedDate}</div>`
            break;
        case 'tyutchev-btn':
            if (number == 1) {
                return `<div id="total-found">${number} vocal work with text by Tyutchev found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} vocal works with text by Tyutchev found since ${savedDate}</div>`
            break;
        case 'allChamber-btn':
            if (number == 1) {
                return `<div id="total-found">${number} chamber work found since ${savedDate}</div>`
                break;
            }
            return `<div id="total-found">${number} chamber works found since ${savedDate}</div>`
            break;
        case 'quintet-btn':
            return `<div id="total-found">${number} piano quintet found since ${savedDate}</div>`
            break;
        case 'twoPiano-btn':
            return `<div id="total-found">${number} two piano work found since ${savedDate}</div>`
            break;
        default:
          // code block
      }
    
}

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

    if (piece.approxDuration == "TBD" && (parseDates(piece.year, savedDate) == 0)) {
        
        return `<div class="piece">
                <div class="piece__content accordionGroup">
                    <h2 class="piece__op">Op. ${piece.op}</h2>
                    
                    <div href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                    <p class="piece__title">${piece.title}</p>
                    <p class="piece__instrumentation">${piece.instrumentation}</p>
                    <p class="piece__year">${piece.year}</p>
                    ${movements}
                    </div>
                </div>
            </div>`;
    }

    if ((piece.op == "" | piece.op == "posthumous" | piece.op == undefined) && parseDates(piece.year, savedDate) == 0) {
        return `<div class="piece">
                    <div class="piece__content accordionGroup">
                        <h2 class="piece__title">${piece.title}</p>
                            
                        </h2>
                        <div>
                        <p>No Opus Number</p>
                        <p class="piece__instrumentation">${piece.instrumentation}</p>
                        <p class="piece__year">${piece.year}</p>
                        <p class="piece__duration">About ${piece.approxDuration}</p>   
                        ${movements}
                        </div>
                     </div>
                </div>`;
    }

    if ((piece.hasOwnProperty('no') && parseDates(piece.year, savedDate) == 0)) {

        return `<div class="piece">
                    <div class="piece__content accordionGroup">
                        <h2 class="piece__op">Op. ${piece.op}, No. ${piece.no}</h2>
                        
                        <div>
                            <p class="piece__title">${piece.title}</p>
                            <p class="piece__instrumentation">${piece.instrumentation}</p>
                            <p class="piece__year">${piece.year}</p>
                            <p class="piece__duration">About ${piece.approxDuration}</p>   
                            ${movements}
                        </div>
                    </div>  
                </div>`;
    }

    if (parseDates(piece.year, savedDate) == 0) {
        return `<div class="piece">
                <div class="piece__content accordionGroup">
                    <h2 class="piece__op">Op. ${piece.op}</h2>
                    
                    <div href="http://www.youtube.com/results?search_query=${youtubeQuery}&oq=${youtubeQuery}" target="_blank">
                    <p class="piece__title">${piece.title}</p>
                    <p class="piece__instrumentation">${piece.instrumentation}</p>
                    <p class="piece__year">${piece.year}</p>
                    <p class="piece__duration">About ${piece.approxDuration}</p>   
                    ${movements}
                    </div>
                </div>
            </div>`;
    }

    
}

function receivedData(data) {

    var values = data.val(); //the data itself

    var totalFound = document.getElementById('#total-found');

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

        var pieceCounter = $(".piece__container").find(".piece").length ;
        pieceQueryHTML.innerHTML = createPieceQueryNumber(pieceCounter);
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
