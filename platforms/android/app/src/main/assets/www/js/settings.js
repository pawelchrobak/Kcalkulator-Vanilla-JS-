var targetCalsInput = document.getElementById("input-target-cals"),
    targetCalsButton = document.getElementById("button-target-cals"),
    targetCalsLabel = document.getElementById("label-target-cals"),
    targetCals,
    numberOfFoods = foods.foodItems.length,
    editorTable = document.getElementById("editor-table"),
    foodsToDelete = [],
    editorSubmitButton = document.getElementById("editor-submit-button"),
    newItemName = document.getElementById("input-new-item-name"),
    newItemCals = document.getElementById("input-new-item-cals"),
    newItemSubmit = document.getElementById("button-new-item"),
    date = new Date(),
    fullDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;


var tempFoods = new Foods();
tempFoods.loadFoodItems();

// USTAWIENIA AKTUALNEGO LIMITU KALORII

if ( calsCounter.targetSet === true ) {
    targetCalsLabel.innerText = "Planowane kalorie:"
    targetCalsInput.value = calsCounter.target;
    targetCalsButton.innerText = "Zmień"
}

targetCalsButton.addEventListener("click", () => {
    calsCounter.setTarget(parseInt(targetCalsInput.value));
    targetCalsLabel.innerText = "Planowane kalorie:"
    targetCalsButton.innerText = "Zapisano";
});

// EDYTOR POSIŁKÓW

function addRowToFoodTable(foodId) {
    let row = document.createElement('tr');
    row.setAttribute('data-food-id',foodId);

    row.innerHTML = `<td><input type='text' data-type='name' value='${foods.foodItems[foodId].name}'></td><td><input type='text' data-type='cals' value='${foods.foodItems[foodId].cals}'></td><td><button type='button' value='delete'>Usuń</button></td>`;
    editorTable.appendChild(row);
}

for ( let i=0 ; i < numberOfFoods ; i++ ) {
    addRowToFoodTable(i);
}

editorTable.addEventListener('click', () => {
    if ( event.target.nodeName == 'BUTTON' && event.target.value == 'delete' ) {
        let rowToDelete = event.target.parentElement.parentElement;

        foodsToDelete.push(parseInt(rowToDelete.dataset.foodId));
        rowToDelete.remove();
    }
});

editorTable.addEventListener('change', () => {
    let foodToEdit = event.target.parentElement.parentElement.dataset.foodId;

    if ( event.target.nodeName == 'INPUT' && event.target.dataset.type == 'name' ) {
        foods.foodItems[foodToEdit].name = event.target.value;
    } else if ( event.target.nodeName == 'INPUT' && event.target.dataset.type == 'cals' ) {
        foods.foodItems[foodToEdit].cals = parseInt(event.target.value);
    }
});

newItemSubmit.addEventListener('click', () => {
    let name = newItemName.value,
        cals = parseInt(newItemCals.value);

    if ( cals >= 0 ) {
        foods.addFoodItem(name,cals);
        addRowToFoodTable(foods.foodItems.length-1);
        newItemName.value = '';
        newItemCals.value = '';
    } else {
        alert("Niepoprawna wartość kalorii!");
    }
});

editorSubmitButton.addEventListener('click', () => {
    foods.deleteFoodItems(foodsToDelete);
    foods.saveFoodItems();
});

