var msgBox = document.getElementById("msg-box"),
    calsInfo = document.getElementById("cals-set"),
    date = new Date(),
    fullDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    calsEaten = document.getElementById("eaten-cals"),
    calsTarget = document.getElementById("target-cals"),
    numberOfFoods = foods.foodItems.length,
    eatenItemSelector = document.getElementById("eaten-item-selector"),
    eatenItemButton = document.getElementById("eaten-item-button"),
    overEatAlert = document.createElement('p');

function updateCalsCounter() {
    let target = calsCounter.target,
        eaten = calsCounter.eatenCals(fullDate);
    calsEaten.innerText = eaten;
    calsTarget.innerText = target;
    
    if (eaten>target) {
        overEatAlert.classList.add('msg-alert-important');
        overEatAlert.innerText = "WOAH, ZWOLNIJ GRUBASIE!";
        msgBox.appendChild(overEatAlert);
    }
}

if (localStorage.firstRun == undefined) {
    let msg = document.createElement('p');
    msg.innerHTML = "Wygląda na to, że to twoje pierwsze uruchomienie aplikacji. Nie zapomnij ustawić planowanej liczby kalorii w <a href=settings.html>ustawieniach</a>. Aplikacja domyślnie przyjmuje 2000 kcal.";
    msgBox.appendChild(msg);
    localStorage.firstRun = 'false';
} else if (localStorage.firstRun == 'false' && calsCounter.targetSet == false) {
    msgBox.innerHTML = "Nie podałeś planowanej liczby kalorii - przyjęto 2000 kcal. Przejdź do <a href=settings.html>ustawień</a> by to zmienić."
}

for( let i = 0  ; i < numberOfFoods ; i++ ){
    let listItem = document.createElement("option");
    listItem.setAttribute('value',foods.foodItems[i].cals);
    listItem.innerText = `${foods.foodItems[i].name} - ${foods.foodItems[i].cals} kcal`;
    eatenItemSelector.appendChild(listItem);
}

eatenItemButton.addEventListener("click", () => {
    let cals = parseInt(eatenItemSelector.value);
    calsCounter.addEatenCals(fullDate,cals);
    updateCalsCounter();
});

updateCalsCounter();