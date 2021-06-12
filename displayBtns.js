var genreDivs = document.querySelectorAll('.button-set');

function hideOtherBtnMenus() {
    for (var i = 0; i < genreDivs.length; i++) {
        genreDivs[i].classList.add('hidden');
    }
}

var number = 1;

function addHiddenClass() {
    hideOtherBtnMenus();

    if (number % 2 != 0) {
        this.classList.remove('hidden');
        number += 1;
    }

    else {
        this.classList.add('hidden');
        number += 1;
    }

}

window.addEventListener('load', (event) => {

    for (i = 0; i < genreDivs.length; i++) {
        let currentDivParent = genreDivs[i].parentElement;
        console.log(currentDivParent);
        currentDivParent.addEventListener("click", addHiddenClass.bind(genreDivs[i]));
    }
  });