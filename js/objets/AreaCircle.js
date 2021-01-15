class AreaCircle {
    id;
    typeAire;
    action;
    tblObjetPoint;
    gravity;
    vitesse;
    rayon;
    constructor(id, typeAire, action, tblObjetPoint, rayon) {
        this.id = id;
        this.typeAire = typeAire;
        this.action = action;
        this.tblObjetPoint = tblObjetPoint;
        this.gravity = 0.1;
        this.vitesse = 20;
        this.rayon = rayon;
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
    getVitesse() {
        return this.vitesse;
    }
    getTypeAire() {
        return this.typeAire;
    }
    getRayon() {
        return this.rayon;
    }
    setRayon(rayon) {
        this.rayon = rayon;
    }
}