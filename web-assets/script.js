/*jshint browser:true*/

window.onload = function () {
    "use strict";
    var selector = document.getElementById("selector");
    selector.onchange = selectTutotial;

    var elements = document.getElementsByClassName("source-title");
    elements = [].slice.call(elements);
    elements.forEach(function (elem) {
        elem.onclick = sourceTitleClicked;
    });
};

function sourceTitleClicked() {
    "use strict";
    var classList = this.nextElementSibling.classList;
    if (classList.contains("hidden")) {
        classList.remove("hidden");
    } else {
        classList.add("hidden");
    }
}

function selectTutotial() {
    "use strict";
    
    var allTutorials;
    var tutorial;
    var i;

    if (this.value === "__all__") {
        allTutorials = document.getElementsByClassName("tutorial");
        for (i = 0; i < allTutorials.length; i += 1) {
            allTutorials[i].className = "tutorial";
        }
        return;
    }

    tutorial = document.getElementById(this.value);
    if (!tutorial) {
        return;
    }

    allTutorials = document.getElementsByClassName("tutorial");
    for (i = 0; i < allTutorials.length; i += 1) {
        allTutorials[i].className = "tutorial hidden";
    }

    tutorial.className = "tutorial";
}
