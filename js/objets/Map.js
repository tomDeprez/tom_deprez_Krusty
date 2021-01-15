class Map {
    chemingImage;
    nomMap;
    tblObjetAreaCarre;
    constructor(chemingImage, nomMap, tblObjetAreaCarre) {
        this.chemingImage = chemingImage;
        this.nomMap = nomMap;
        this.tblObjetAreaCarre = tblObjetAreaCarre;
    }
    setTblObjetAreaCarre() {
        return this.tblObjetAreaCarre;
    }
    getNomMape() {
        return this.nomMap;
    }
    setNomMape(nom) {
        this.nomMap = nom;
    }
    getChemingImage() {
        return this.chemingImage;
    }
    addElementArrayArea(element) {
        this.tblObjetAreaCarre.push(element);
    }
    getElementArrayAreaCarre() {
        return this.tblObjetAreaCarre;
    }
    getAreaById(id) {
        var back = false;
        this.tblObjetAreaCarre.forEach(element => {
            if (element.getId() == id) {
                back = element;
            }
        });
        return back;
    }
}