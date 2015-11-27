window.onload = function () {
    "use strict";
    var selector = document.getElementById("selector");
    selector.onchange = selectTutotial;
};

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
