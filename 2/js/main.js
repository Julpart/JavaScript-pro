'use strict'
class Hamburger {
    constructor(check) {
        if (check != 'NotAbstract') {
            throw new Error(`Выбирите тип гамбургера`);
        }
    }

    addSalad() {
        if (this.supp >= this.sups) return 'Невозможно добавить больше добавок';
        this.supp++;
        this.cost += 20;
        this.cals += 5;
    };
    addCheese() {
        if (this.supp >= this.sups) return 'Невозможно добавить больше добавок';
        this.supp++;
        this.cost += 10;
        this.cals += 20;
    };
    addPotato() {
        if (this.supp >= this.sups) return 'Невозможно добавить больше добавок';
        this.supp++;
        this.cost += 15;
        this.cals += 10;
    };
    addSpices() {
        if (this.spices) return 'Специи уже добавлены';
        this.spices = true;
        this.cost += 15;
    };
    addMayo() {
        if (this.mayo) return 'Мазик на месте';
        this.mayo = true;
        this.cost += 20;
        this.cals += 5;
    };
    sumCost() { return this.cost; }
    sumCals() { return this.cals; };
}

class BigHamburger extends Hamburger {

    constructor() {
        super('NotAbstract');
        this.cost = 100;
        this.cals = 40;
        this.sups = 2;//Большой гамбургер может вместить две добавки. !!! не разобрался как сделать эту переменную коснтантой
        this.supp = 0;
        this.mayo = false;
        this.spices = false;
    }

}
class SmallHamburger extends Hamburger {

    constructor() {
        super('NotAbstract');
        this.cost = 50;
        this.cals = 20;
        this.sups = 1;//Маленький гамбургер может вместить одну добавку.
        this.supp = 0;
        this.mayo = false;
        this.spices = false;
    }

}