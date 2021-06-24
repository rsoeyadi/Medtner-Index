var genreDivs = document.querySelectorAll('.button-set');

function hideOtherBtnMenus() {
    for (var i = 0; i < genreDivs.length; i++) {
        genreDivs[i].classList.add('hidden');
    }
}

function addHiddenClass() {
    hideOtherBtnMenus();

    /* check if all the sets of buttons (ul) have the hidden class, meaning that they're all already hidden */
    if ($("ul").length == $("ul.hidden").length) {
        this.classList.add('hidden');
    }

    else {
        this.classList.remove('hidden');
    }

}

window.addEventListener('load', (event) => {

    for (i = 0; i < genreDivs.length; i++) {
        let currentDivParent = genreDivs[i].parentElement;
        console.log(currentDivParent);
        currentDivParent.addEventListener("click", addHiddenClass.bind(genreDivs[i]));
    }
  });