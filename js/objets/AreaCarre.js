class AreaCarre {
    id;
    typeAire;
    action;
    tblObjetPoint;
    gravity;
    vitesse;
    constructor(id, typeAire, action, tblObjetPoint) {
        this.id = id;
        this.typeAire = typeAire;
        this.action = action;
        this.tblObjetPoint = tblObjetPoint;
        this.gravity = 0.1;
        this.vitesse = 20;
    }
    getCoordonnees() {
        return this.tblObjetPoint;
    }
    setCoordonnees(integer, number) {
        this.tblObjetPoint[number] = integer;
    }
    testAfficheObjetDansConsole() {
        console.log(this);
    }
    getId() {
        return this.id;
    }
    getAction() {
        return this.action;
    }
    setAction(action) {
        this.action = action;
    }
    getGravity() {
        return this.gravity;
    }
    setGravity(gravity) {
        this.gravity = gravity;
    }
    getVitesse() {
        return this.vitesse;
    }
    setVitesse(vitesse) {
        this.vitesse = vitesse;
    }
    getTypeAire() {
        return this.typeAire;
    }
}