function FoodItem(name, cals) {
    this.name = name;
    this.cals = cals;
}

function Foods() {
    this.foodItems = [];
}

Foods.prototype.loadDefault = function() {
    let defaultFoodNames = ["jabłko","chleb","ser","jajko"],
        defaultCalsCount = [50,100,200,75],
        itemsCount = defaultFoodNames.length;

        for (let i=0 ; i<itemsCount ; i++) {
        this.foodItems[i] = new FoodItem(defaultFoodNames[i],defaultCalsCount[i]);
    }
}

Foods.prototype.loadFoodItems = function() {
    let numberOfStoredItems = parseInt(localStorage.getItem('food-amount'));

    if ( numberOfStoredItems > 0 ) {
        for ( let i=0 ; i<numberOfStoredItems ; i++) {
            let foodName = localStorage.getItem(`food-${i}-name`),
                foodCals = parseInt(localStorage.getItem(`food-${i}-cals`));

            this.foodItems[i] = new FoodItem(foodName,foodCals);
        }
    } else {
        this.loadDefault();
    }

    return this.foodItems;
}

Foods.prototype.addFoodItem = function(name,cals) {
    this.foodItems.push(new FoodItem(name,cals));

    this.foodItems;
}

Foods.prototype.deleteFoodItems = function(foodsToDelete) {
    let amountForDeletion = foodsToDelete.length;
    foodsToDelete.sort(function(a,b){return b-a});

    for ( i=0 ; i<amountForDeletion ; i++ ) {
        this.foodItems.splice(foodsToDelete[i],1);
    }
    return this.foodItems;
}


Foods.prototype.saveFoodItems = function() {
    let numberOfItems = this.foodItems.length;

    for ( let i=0 ; i<numberOfItems ; i++ ) {
        localStorage.setItem(`food-${i}-name`,this.foodItems[i].name);
        localStorage.setItem(`food-${i}-cals`,this.foodItems[i].cals);
    }

    localStorage.setItem('food-amount',numberOfItems);
    return this.foodItems;
}

function Cals() {
    this.target = 2000;
    this.targetSet = false;
}

Cals.prototype.eatenCals = function(date) {
    let result = 0;

    if ( localStorage.getItem(`calsConsumed-${date}`) != null ) {
        result = parseInt(localStorage.getItem(`calsConsumed-${date}`));
    }
    return result;
}

Cals.prototype.addEatenCals = function(date,cals) {
    let result = 0,
        eatenCals = 0;

    if ( localStorage.getItem(`calsConsumed-${date}`) != null ) {
        eatenCals = parseInt(localStorage.getItem(`calsConsumed-${date}`));
    }

    eatenCals = eatenCals + cals;
    localStorage.setItem(`calsConsumed-${date}`,eatenCals);
    return eatenCals;
}

Cals.prototype.loadStoredTarget = function() {
    let result = 2000;

    if ( localStorage.targetCals == undefined ) {
        console.log("No targets Cals stored, set to default 2000.")
        this.targetSet = false;
    } else {
        result = parseInt(localStorage.targetCals);
        this.targetSet = true; 
    }
    this.target = result;
    return result;
}

Cals.prototype.setTarget = function(newTarget) {
    localStorage.targetCals = newTarget;
    this.target = newTarget;
    this.targetSet = true;
    return newTarget;
}

var foods = new Foods();
var calsCounter = new Cals();
foods.loadFoodItems();
calsCounter.loadStoredTarget();