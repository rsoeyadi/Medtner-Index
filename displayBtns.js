var genreDivs = document.querySelectorAll('.button-set');

function addHiddenClass() {
    for (var i = 0; i < genreDivs.length; i++) {
        genreDivs[i].classList.add('hidden');
    }
    if (this.classList.contains('hidden')) {
        this.classList.remove('hidden');
    }

    else {
        this.classList.add('hidden');

    }
}

window.addEventListener('load', (event) => {

    for (i = 0; i < genreDivs.length; i++) {
        let currentDivParent = genreDivs[i].parentElement;
        currentDivParent.style.cursor = 'pointer';
        
        currentDivParent.onclick = addHiddenClass.bind(genreDivs[i]);
    }
  });