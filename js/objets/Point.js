class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getCoordonnees() {
        return x + "|" + y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    testAfficheObjetDansConsole() {
        console.log(this);
    }
}