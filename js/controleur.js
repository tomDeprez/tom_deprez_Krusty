

var map = new Map("img/Krusty_Le_Clown.webp", 'map de Krusty Le Clown', []);// map créé en dur
var left = false;
var toppom = false;
var bottom = false;
var right = false;

// les types sont différencié avec un id
// 0 => Carré
// 1 => Cercle
// pour appeler une fonction test il faut utiliser le nom de la fonction + test
// voici les noms de méthode test :
// testMap();
// testArea(id); // id de l'area

$(document).ready(function () {
    // document.getElementById("img").src = map.getChemingImage();
    document.getElementById("nom").value = map.getNomMape();
});


//Pour créer une area il faut appeler cette méthode elle va créer l'area avec le champ type choisi
// vous pourez choisir l'action après création de l'area
function creerArea(e) { // créer une area sur la map
    e.preventDefault();
    var myForm = document.getElementById('map');
    creer = true;
    if (isNaN(document.getElementById("id").value)) {
        alert("id est faux !!");
        creer = false;
    }
    document.getElementById("id").value = map.getElementArrayAreaCarre().length;
    document.getElementById("action").value = "";
    formData = new FormData(myForm);
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == formData.get('id')) {
            alert("id déjà utilisé !!");
            creer = false;
        }
    });
    if (creer) {
        if (formData.get("type") == "0") { // carré

            var point1 = new Point(formData.get('id'), formData.get('id'));
            var point2 = new Point(50, 50);
            tblPoint = [
                point1,
                point2
            ];
            var areaCarre = new AreaCarre(formData.get('id'), formData.get('type'), formData.get('action'), tblPoint);
            map.addElementArrayArea(areaCarre);
            var parsed = parseInt(document.getElementById("id").value);
            // document.getElementById("id").value = parsed + 1;
            printPos(areaCarre);
            returnPointForm(areaCarre);
            console.log(map.setTblObjetAreaCarre());
            if (document.getElementById("afficher").innerHTML == "Cacher") {
                document.getElementById("afficher").innerHTML = "Afficher";
            } else {
                document.getElementById("afficher").innerHTML = "Cacher";
            }
            viewPos(e);
            if (document.getElementById("graviter").innerHTML == "Fixe") {
                document.getElementById("graviter").innerHTML = "Graviter";
            } else {
                document.getElementById("graviter").innerHTML = "Fixe";
            }
            graviter(e);
        } else if (formData.get("type") == "1") { // cercle
            var point1 = new Point(50, 50);
            tblPoint = [
                point1
            ];
            var areaCircle = new AreaCircle(formData.get('id'), formData.get('type'), formData.get('action'), tblPoint, 20);
            map.addElementArrayArea(areaCircle);
            var parsed = parseInt(document.getElementById("id").value);
            // document.getElementById("id").value = parsed + 1;
            printPos(areaCircle);
            returnPointForm(areaCircle);
            console.log(map.setTblObjetAreaCarre());
            if (document.getElementById("afficher").innerHTML == "Cacher") {
                document.getElementById("afficher").innerHTML = "Afficher";
            } else {
                document.getElementById("afficher").innerHTML = "Cacher";
            }
            viewPos(e);
            if (document.getElementById("graviter").innerHTML == "Fixe") {
                document.getElementById("graviter").innerHTML = "Graviter";
            } else {
                document.getElementById("graviter").innerHTML = "Fixe";
            }
            graviter(e);
        }

    }
}

// Afficher les éléments
function printPos(area) {
    if (document.getElementById(area.getId()) != null) { 
        document.getElementById(area.getId()).remove();
    }
    var element = document.getElementById("mapArea").innerHTML;
    if (area.getTypeAire() == "0") {
        document.getElementById("mapArea").innerHTML = "<area shape='rect' id="
            + area.getId() + " title='Yellow' 'https://mozilla.org' coords='"
            + area.getCoordonnees()[0].getX() + ","
            + area.getCoordonnees()[0].getY() + ","
            + (parseInt(area.getCoordonnees()[1].getX())) + ","
            + (parseInt(area.getCoordonnees()[1].getY())) + "' alt='Computer' href=''>" + element;// href sera modifiable après la création
    } else if (area.getTypeAire() == "1") {
        document.getElementById("mapArea").innerHTML = "<area shape='circle' id="
            + area.getId() + " title='Yellow' 'https://mozilla.org' coords='"
            + area.getCoordonnees()[0].getX() + ","
            + area.getCoordonnees()[0].getY() + ","
            + (parseInt(area.getRayon())) + "' alt='Computer' href=''>" + element;// href sera modifiable après la création
    }
}

//Mise à jours des objets 
function update(e) {
    e.preventDefault();
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == document.getElementById("id").value) {
            pos = element;
        }
    });
    if (pos != null) {
        area = map.getAreaById(document.getElementById("id").value);
        document.getElementById("action").value = area.getAction();
        document.getElementById("type").value = area.getTypeAire();
        if (area.getTypeAire() == "0") {
            area.getCoordonnees()[0].setX(document.getElementById("x1").value);
            area.getCoordonnees()[0].setY(document.getElementById("y1").value);
            area.getCoordonnees()[1].setX(document.getElementById("x2").value);
            area.getCoordonnees()[1].setY(document.getElementById("y2").value);
        } else if (area.getTypeAire() == "1") {
            area.getCoordonnees()[0].setX(document.getElementById("x1").value);
            area.getCoordonnees()[0].setY(document.getElementById("y1").value);
            area.setRayon(document.getElementById("Rayon").value);
        }
        printPos(area);
        if (document.getElementById("afficher").innerHTML == "Cacher") {
            document.getElementById("afficher").innerHTML = "Afficher";
        } else {
            document.getElementById("afficher").innerHTML = "Cacher";
        }
        viewPos(e);
    } else {
        alert("id introuvable !");
    }
}

// afficher les éléments pour voir leurs emplacements. 
function viewPos(e) {
    e.preventDefault();
    document.getElementById("view").innerHTML = "";
    if (document.getElementById("afficher").innerHTML == "Cacher") {
        document.getElementById("afficher").innerHTML = "Afficher";
    } else {
        document.getElementById("afficher").innerHTML = "Cacher";
        var total = [];
        map.setTblObjetAreaCarre().forEach(element => {
            var cor = [];
            cor.push(element.getId());
            element.getCoordonnees().forEach(elementNext => {
                cor.push(elementNext.getX());
                cor.push(elementNext.getY());
            });
            total.push(cor);
        });
        total.forEach(element => {
            var c = document.getElementById("view").innerHTML;
            area = map.getAreaById(element[0]);
            if (area.getTypeAire() == "0") {
                var x1 = parseInt(element[1]);
                var y1 = parseInt(element[2]);
                var x2 = parseInt(element[3]);
                var y2 = parseInt(element[4]);
                if (x1 < x2 && y1 < y2) {
                    x1 = element[1];
                    y1 = element[2];
                    x2 = (parseInt(element[3]) - parseInt(element[1]));
                    y2 = (parseInt(element[4]) - parseInt(element[2]));
                }
                else if (x1 > x2 && y1 > y2) {
                    x1 = element[3];
                    y1 = element[4];
                    x2 = (parseInt(element[1]) - parseInt(element[3]));
                    y2 = (parseInt(element[2]) - parseInt(element[4]));
                }
                else if (x1 < x2 && y1 > y2) {
                    x1 = element[1];
                    y1 = element[4];
                    x2 = (parseInt(element[3]) - parseInt(element[1]));
                    y2 = (parseInt(element[2]) - parseInt(element[4]));
                }
                else if (x1 > x2 && y1 < y2) {
                    x1 = element[3];
                    y1 = element[2];
                    x2 = (parseInt(element[1]) - parseInt(element[3]));
                    y2 = (parseInt(element[4]) - parseInt(element[2]));
                } else if (x1 == x2 && y1 == y2) {
                    x1 = element[3];
                    y1 = element[2];
                    x2 = (parseInt(element[1]) - parseInt(element[3]));
                    y2 = (parseInt(element[4]) - parseInt(element[2]));
                }
                document.getElementById("view").innerHTML = "<button class='view' onclick='selectElement(" + element[0] + ")' style='border: solid; left: " + x1 + //x(1)
                    "px; top: " + y1 + //y(1)
                    "px; width: " + x2 +  //x(2)
                    "px; height: " + y2 + //y(2)
                    "px; position: absolute;'></button>" + c;
            } else if (area.getTypeAire() == "1") {
                var x = parseInt(element[1]) - parseInt(area.getRayon());
                var y = parseInt(element[2]) - parseInt(area.getRayon());
                var width = parseInt(area.getRayon()) * 2;
                var height = parseInt(area.getRayon()) * 2;
                var border = parseInt(area.getRayon());
                document.getElementById("view").innerHTML = "<button class='view' onclick='selectElement(" + element[0] + ")' style='border: solid; left: " + x + //x(1)
                    "px; top: " + y + //y(1)
                    "px; width: " + width +
                    "px; height: " + height +
                    "px; border-radius: " + border +
                    "px; position: absolute;'></button>" + c;
            }


        });
    }
}
// function fun ne fonctionne pas encore pour les cercle
function graviter(e) {
    if (document.getElementById("graviter").innerHTML == "Fixe") {
        document.getElementById("graviter").innerHTML = "Graviter";
    } else {
        document.getElementById("graviter").innerHTML = "Fixe";
        lunchGraviter(e);
    }
}
// activer la function de graviter sur l'objet choisi 
async function lunchGraviter(e) {
    areaCarre = map.getAreaById(document.getElementById("id").value);
    if (document.getElementById("graviter").innerHTML == "Fixe") {
        var total = [];
        var ok = true;
        map.setTblObjetAreaCarre().forEach(element => {
            var cor = [];
            if (element != areaCarre) {
                cor.push(element.getId());
                element.getCoordonnees().forEach(elementNext => {
                    cor.push(elementNext.getX());
                    cor.push(elementNext.getY());
                });
                total.push(cor);
            }
        });
        total.forEach(element => {
            var x1 = parseInt(element[1]);
            var y1 = parseInt(element[2]);
            var x2 = parseInt(element[3]);
            var y2 = parseInt(element[4]);
            if (y1 == areaCarre.getCoordonnees()[1].getY()) {
                if (x1 < areaCarre.getCoordonnees()[1].getX() && x2 > areaCarre.getCoordonnees()[1].getX() || x1 < areaCarre.getCoordonnees()[0].getX() && x2 > areaCarre.getCoordonnees()[0].getX()) {
                    ok = false;
                }
            }
        });
        if (!ok) {
            areaCarre.setGravity(0.1);
            areaCarre.setVitesse(20);
        }
        if ((parseInt(areaCarre.getCoordonnees()[0].getY()) < 450 || parseInt(areaCarre.getCoordonnees()[1].getY()) < 500) && ok) {
            areaCarre.setGravity(parseFloat(areaCarre.getGravity()) + parseFloat(Math.log(parseFloat(areaCarre.getVitesse()))));

            areaCarre.setVitesse(parseInt(areaCarre.getGravity()) - (parseInt(Math.log(parseInt(areaCarre.getVitesse()))) / 10));

            console.log(parseInt(Math.log(areaCarre.getVitesse())));
            areaCarre.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value));
            areaCarre.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value) + parseInt(parseInt(Math.log(areaCarre.getVitesse())) / 3));
            areaCarre.getCoordonnees()[1].setX(parseInt(document.getElementById("x2").value));
            areaCarre.getCoordonnees()[1].setY(parseInt(document.getElementById("y2").value) + parseInt(parseInt(Math.log(areaCarre.getVitesse())) / 3));
            document.getElementById("x1").value = areaCarre.getCoordonnees()[0].getX();
            document.getElementById("y1").value = areaCarre.getCoordonnees()[0].getY();
            document.getElementById("x2").value = areaCarre.getCoordonnees()[1].getX();
            document.getElementById("y2").value = areaCarre.getCoordonnees()[1].getY();
            printPos(areaCarre);
            if (document.getElementById("afficher").innerHTML == "Cacher") {
                document.getElementById("afficher").innerHTML = "Afficher";
            } else {
                document.getElementById("afficher").innerHTML = "Cacher";
            }
            viewPos(e);
            // console.log(areaCarre.getGravity());
        }
    }
    else {
        areaCarre.setGravity(0.1);
        areaCarre.setVitesse(20);
    }
    setTimeout(() => lunchGraviter(e), 0);
}


// Déplacer l'élément sélectionné vers la gauche
function leftPos(e) {
    e.preventDefault();
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == document.getElementById("id").value) {
            pos = element;
        }
    });
    if (pos != null) {
        if (left) {
            left = false;
        } else {
            left = true;
            leftLunch(e);
        }
    } else {
        alert("id introuvable !");
        left = false;
        return;
    }
}
function leftLunch(e) { // activer le mouvement fluide.
    if (left) {
        area = map.getAreaById(document.getElementById("id").value);
        if (area.getTypeAire() == "0") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value) - 1);
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value));
            area.getCoordonnees()[1].setX(parseInt(document.getElementById("x2").value) - 1);
            area.getCoordonnees()[1].setY(parseInt(document.getElementById("y2").value));
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
            document.getElementById("x2").value = area.getCoordonnees()[1].getX();
            document.getElementById("y2").value = area.getCoordonnees()[1].getY();
        } else if (area.getTypeAire() == "1") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value) - 1);
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value));
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        }
        printPos(area);
        if (document.getElementById("afficher").innerHTML == "Cacher") {
            document.getElementById("afficher").innerHTML = "Afficher";
        } else {
            document.getElementById("afficher").innerHTML = "Cacher";
        }
        viewPos(e);
        setTimeout(() => leftLunch(e), 10);
    } else {
        return;
    }
}
// Déplacer l'élément sélectionné vers le haut
function topPos(e) {
    e.preventDefault();
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == document.getElementById("id").value) {
            pos = element;
        }
    });
    if (pos != null) {
        if (toppom) {
            toppom = false;
        } else {
            toppom = true;
            topLunch(e);
        }
    } else {
        alert("id introuvable !");
        toppom = false;
        return;
    }
}
function topLunch(e) { // activer le mouvement fluide.
    if (toppom) {
        area = map.getAreaById(document.getElementById("id").value);

        if (area.getTypeAire() == "0") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value));
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value) - 1);
            area.getCoordonnees()[1].setX(parseInt(document.getElementById("x2").value));
            area.getCoordonnees()[1].setY(parseInt(document.getElementById("y2").value) - 1);
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
            document.getElementById("x2").value = area.getCoordonnees()[1].getX();
            document.getElementById("y2").value = area.getCoordonnees()[1].getY();
        } else if (area.getTypeAire() == "1") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value));
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value) - 1);
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        }
        printPos(area);
        if (document.getElementById("afficher").innerHTML == "Cacher") {
            document.getElementById("afficher").innerHTML = "Afficher";
        } else {
            document.getElementById("afficher").innerHTML = "Cacher";
        }
        viewPos(e);
        setTimeout(() => topLunch(e), 10);
    } else {
        return;
    }
}
// Déplacer l'élément sélectionné vers le bas
function botPos(e) {
    e.preventDefault();
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == document.getElementById("id").value) {
            pos = element;
        }
    });
    if (pos != null) {
        if (bottom) {
            bottom = false;
        } else {
            bottom = true;
            botLunch(e);
        }
    } else {
        alert("id introuvable !");
        bottom = false;
        return;
    }
}
function botLunch(e) { // activer le mouvement fluide.
    if (bottom) {
        area = map.getAreaById(document.getElementById("id").value);


        if (area.getTypeAire() == "0") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value));
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value) + 1);
            area.getCoordonnees()[1].setX(parseInt(document.getElementById("x2").value));
            area.getCoordonnees()[1].setY(parseInt(document.getElementById("y2").value) + 1);
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
            document.getElementById("x2").value = area.getCoordonnees()[1].getX();
            document.getElementById("y2").value = area.getCoordonnees()[1].getY();
        } else if (area.getTypeAire() == "1") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value));
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value) + 1);
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        }

        printPos(area);
        if (document.getElementById("afficher").innerHTML == "Cacher") {
            document.getElementById("afficher").innerHTML = "Afficher";
        } else {
            document.getElementById("afficher").innerHTML = "Cacher";
        }
        viewPos(e);
        setTimeout(() => botLunch(e), 10);
    } else {
        return;
    }
}
// Déplacer l'élément sélectionné vers la droite
function rightPos(e) {
    e.preventDefault();
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == document.getElementById("id").value) {
            pos = element;
        }
    });
    if (pos != null) {
        if (right) {
            right = false;
        } else {
            right = true;
            rightLunch(e);
        }
    } else {
        alert("id introuvable !");
        right = false;
        return;
    }
}
function rightLunch(e) { // activer le mouvement fluide.
    if (right) {
        area = map.getAreaById(document.getElementById("id").value);
        if (area.getTypeAire() == "0") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value) + 1);
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value));
            area.getCoordonnees()[1].setX(parseInt(document.getElementById("x2").value) + 1);
            area.getCoordonnees()[1].setY(parseInt(document.getElementById("y2").value));
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
            document.getElementById("x2").value = area.getCoordonnees()[1].getX();
            document.getElementById("y2").value = area.getCoordonnees()[1].getY();
        } else if (area.getTypeAire() == "1") {
            area.getCoordonnees()[0].setX(parseInt(document.getElementById("x1").value) + 1);
            area.getCoordonnees()[0].setY(parseInt(document.getElementById("y1").value));
            document.getElementById("x1").value = area.getCoordonnees()[0].getX();
            document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        }
        printPos(area);
        if (document.getElementById("afficher").innerHTML == "Cacher") {
            document.getElementById("afficher").innerHTML = "Afficher";
        } else {
            document.getElementById("afficher").innerHTML = "Cacher";
        }
        viewPos(e);
        setTimeout(() => rightLunch(e), 10);
    } else {
        return;
    }
}

function selectElement(id) { // Éléments sélectionnés pour afficher dans le formulaire des infos
    pos = null;
    map.setTblObjetAreaCarre().forEach(element => {
        if (element.id == id) {
            pos = element;
        }
    });
    if (pos != null) {
        document.getElementById("id").value = pos.getId();
        document.getElementById("action").value = pos.getAction();
        document.getElementById("type").value = pos.getTypeAire();
        returnFormPoint();
        if (pos.getTypeAire() == "0") {
            document.getElementById("x1").value = pos.getCoordonnees()[0].getX();
            document.getElementById("y1").value = pos.getCoordonnees()[0].getY();
            document.getElementById("x2").value = pos.getCoordonnees()[1].getX();
            document.getElementById("y2").value = pos.getCoordonnees()[1].getY();
        }
        else if (pos.getTypeAire() == "1") {
            document.getElementById("x1").value = pos.getCoordonnees()[0].getX();
            document.getElementById("y1").value = pos.getCoordonnees()[0].getY();
            document.getElementById("Rayon").value = pos.getRayon();
        }
    } else {
        alert("élément introuvable !");
    }
}

function returnPointForm(area) { // retourne les informations de l'objet dans le formulaire
    if (area.getTypeAire() == "0") {
        document.getElementById("x1").value = area.getCoordonnees()[0].getX();
        document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        document.getElementById("x2").value = area.getCoordonnees()[1].getX();
        document.getElementById("y2").value = area.getCoordonnees()[1].getY();
    } else if (area.getTypeAire() == "1") {
        document.getElementById("x1").value = area.getCoordonnees()[0].getX();
        document.getElementById("y1").value = area.getCoordonnees()[0].getY();
        document.getElementById("Rayon").value = area.getRayon();
    }
}




///
// Ces fonctions sont des fonctions onChange
// le but est de modifier les objets discrètement pour pas que cela ne soit gênant pour l'utilisateur.
///

function updateView() { // quand l'utilisateur modifie l'id dans le champ id, maj visuel des autres champs
    selectElement(document.getElementById("id").value);
}

function changeName() {// le nom de la map change quand l'utilisateur le change.
    map.setNomMape(document.getElementById("nom").value);
    console.log(map.getNomMape());
}
function addAction() { // l'utilisateur ajoute une action pour l'élément choisi.
    area = map.getAreaById(document.getElementById("id").value);
    area.setAction(document.getElementById("action").value);
    document.getElementById(area.getId()).href=document.getElementById("action").value;
}
function returnFormPoint() { // retourner le bon formulaire (cercle, carré etc...).

    if (document.getElementById("type").value == 0) {
        document.getElementById("form-point").innerHTML = "<div class='col-12'>" +
            "<h3>Point 1:</h3>" +
            "</div>" +
            "<div class='col-12'>" +
            "<label for='x'>X :</label>" +
            "<input id='x1' type='text' name='x' placeholder='x' />" +
            "<label for='y'>Y :</label>" +
            " <input id='y1' type='text' name='y' placeholder='y' />" +
            "</div>" +
            "<div class='col-12'>" +
            "<h3>Point 2:</h3>" +
            "</div>" +
            "<div class='col-12'>" +
            "<label for='x'>X :</label>" +
            "<input id='x2' type='text' name='x' placeholder='x' />" +
            "<label for='y'>Y :</label>" +
            "<input id='y2' type='text' name='y' placeholder='y' />" +
            "</div>";
    } else if (document.getElementById("type").value == 1) {
        document.getElementById("form-point").innerHTML = "<div class='col-12'>" +
            "<h3>Point 1:</h3>" +
            "</div>" +
            "<div class='col-12'>" +
            "<label for='x'>X :</label>" +
            "<input id='x1' type='text' name='x' placeholder='x' />" +
            "<label for='y'>Y :</label>" +
            " <input id='y1' type='text' name='y' placeholder='y' />" +
            "</div>" +
            "<div class='col-12'>" +
            "<h3>Rayon :</h3>" +
            "</div>" +
            "<div class='col-12'>" +
            "<label for='Rayon'>Rayon :</label>" +
            "<input id='Rayon' type='text' name='Rayon' placeholder='x' />" +
            "</div>";
    }
}