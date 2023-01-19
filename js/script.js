let selectedPlayerAttack;
let selectedEnemyAttack;
let playerPetLives = 3;
let enemyPetLives = 3;
let attacks = ["Fire", "Volt", "Ground", "Water"];


function selectPlayerPet (){

    let sectionSelectPet = document.getElementById('select_pet')
    sectionSelectPet.style.display = 'none'

    let sectionSelectAttack = document.getElementById('select_attack')
    sectionSelectAttack.style.display = 'flex'

    let Hipodoge = document.getElementById('Hipodoge')
    let Capipepo = document.getElementById('Capipepo')
    let Ratigueya = document.getElementById('Ratigueya')
    let spanNamePlayerPet = document.getElementById('pet-name-player')
    

    if (Hipodoge.checked) {
        spanNamePlayerPet.innerHTML = "Hipodoge"
    } else if (Capipepo.checked) {
        spanNamePlayerPet.innerHTML = "Capipepo"
    } else if (Ratigueya.checked) {
        spanNamePlayerPet.innerHTML = "Ratigueya"
    }

    selectEnemyPet();
}


function selectEnemyPet(){
    let aleatoryAttack = aleatory(1,3);
    let spanNameEnemyPet = document.getElementById('pet-name-enemy')

    if (aleatoryAttack == 1) {
        spanNameEnemyPet.innerHTML = "Hipodoge"
    } else if (aleatoryAttack == 2) {
        spanNameEnemyPet.innerHTML = "Capipepo"
    } else if (aleatoryAttack == 3) {
        spanNameEnemyPet.innerHTML = "Ratigueya"
    } else {

    }

}

function fireAttack() {
    selectedPlayerAttack = "Fire";
    enemyAttack();
}

function voltAttack() {
    selectedPlayerAttack = "Volt";
    enemyAttack();
}

function groundAttack() {
    selectedPlayerAttack = "Ground";
    enemyAttack();
}

function waterAttack() {
    selectedPlayerAttack = "Water";
    enemyAttack();
}

function enemyAttack(){
    aleatoryEnemyAttack = Math.floor(Math.random() * attacks.length);
    selectedEnemyAttack = attacks[aleatoryEnemyAttack];
    combatResult()
    
}

function combatResult(){

    let spanPlayerLives = document.getElementById('player-pet-lives')
    let spanEnemyLives = document.getElementById('enemy-pet-lives')

    if (selectedPlayerAttack == selectedEnemyAttack) {
        createResultMessage("Tie")
    }else if (selectedPlayerAttack == "Fire" && selectedEnemyAttack == "Ground"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Water" && selectedEnemyAttack == "Volt"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Water" && selectedEnemyAttack == "Fire"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Ground" && selectedEnemyAttack == "Water"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Ground" && selectedEnemyAttack == "Volt"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Volt" && selectedEnemyAttack == "Fire"){
        enemyPetLives--;
        createResultMessage("Won")
    }else{
        playerPetLives--;
        createResultMessage("Lose")
        
    }

    

    spanEnemyLives.innerHTML = enemyPetLives.toString()
    spanPlayerLives.innerHTML = playerPetLives.toString()

    checkLives()

}

function checkLives() {
    if (playerPetLives == 0) {
        createFinalMessage("Lose");
    } else if(enemyPetLives == 0){
        createFinalMessage("Won");
    }
}

function createResultMessage(result){
    let resultMessage = document.getElementById('result');
    let playerAttacksList = document.getElementById('player-attacks-list');
    let enemyAttacksList = document.getElementById('enemy-attacks-list');

    currentPlayerAttack = document.createElement('p')
    currentEnemyAttack = document.createElement('p')

    currentPlayerAttack.innerHTML = selectedPlayerAttack;
    currentEnemyAttack.innerHTML = selectedEnemyAttack;
    resultMessage.innerHTML = 'You ' + result;

    playerAttacksList.appendChild(currentPlayerAttack)
    enemyAttacksList.appendChild(currentEnemyAttack)

}

function createFinalMessage(result){
    let messageSection = document.getElementById('result')
    messageSection.innerHTML = 'Your have ' + result + '!!!';

    let FireButton = document.getElementById('button-Fire')
    FireButton.disabled = true;
    let VoltButton = document.getElementById('button-Volt')
    VoltButton.disabled = true;
    let GroundButton = document.getElementById('button-Ground')
    GroundButton.disabled = true;
    let WaterButton = document.getElementById('button-Water')
    WaterButton.disabled = true;

    let sectiomRestart = document.getElementById('restart')
    sectiomRestart.style.display = 'inline'
}


function aleatory(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function restartGame(){
    location.reload();
}

function startGame(){

    let PetButton = document.getElementById('button-pet').addEventListener('click', selectPlayerPet)

    let restartButton = document.getElementById('restart-button').addEventListener('click', restartGame)
    
    let sectionSelectAttack = document.getElementById('select_attack')
    sectionSelectAttack.style.display = 'none'
    let sectiomRestart = document.getElementById('restart')
    sectiomRestart.style.display = 'none'

    let FireButton = document.getElementById('button-Fire').addEventListener('click', fireAttack)
    let VoltButton = document.getElementById('button-Volt').addEventListener('click', voltAttack)
    let GroundButton = document.getElementById('button-Ground').addEventListener('click', groundAttack)
    let WaterButton = document.getElementById('button-Water').addEventListener('click', waterAttack)
}


window.addEventListener('load', startGame)




