const PetButton = document.getElementById('button-pet');
const restartButton = document.getElementById('restart-button');
const sectionSelectAttack = document.getElementById('select_attack');
const sectiomRestart = document.getElementById('restart');
let FireButton;
let VoltButton;
let GroundButton;
let WaterButton;
let attacksOptionsButtons = [];
let playerAttacks = [];
let enemyAttacks = [];

let enemyPetAttacks;
let usedEnemyAttacksIndexes = []

let comp
let round = 0;

const sectionSelectPet = document.getElementById('select_pet');
let  inputHipodoge;
let  inputCapipepo;
let  inputRatigueya;
const spanNamePlayerPet = document.getElementById('pet-name-player');

const spanNameEnemyPet = document.getElementById('pet-name-enemy');

const spanPlayerLives = document.getElementById('player-pet-lives');
const spanEnemyLives = document.getElementById('enemy-pet-lives');

const resultMessage = document.getElementById('result');
const playerAttacksList = document.getElementById('player-attacks-list');
const enemyAttacksList = document.getElementById('enemy-attacks-list');

const messageSection = document.getElementById('result')

const cardscontainer = document.getElementById('cards-container');

const attacksOptionsContainer = document.getElementById('attack-options-container');


let selectedPlayerPet;
let selectedEnemyPet;
let selectedPlayerAttack;
let selectedEnemyAttack;
let mokeponOption;
let attackOption;
let playerPetLives = 5;
let enemyPetLives = 5;
let pets = []


class Mokepon {
    constructor(name, image, lives) {
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.attacks = []
    }

    
}

let hipodoge = new Mokepon("Hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", 5)

hipodoge.attacks.push(
    { name: "Water 💧", id: "button-Water" },
    { name: "Water 💧", id: "button-Water" },
    { name: "Water 💧", id: "button-Water" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" }
)

capipepo.attacks.push(
    { name: "Fire 🔥", id: "button-Fire" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Water 💧", id: "button-Water" }
)

ratigueya.attacks.push(
    { name: "Fire 🔥", id: "button-Fire" },
    { name: "Fire 🔥", id: "button-Fire" },
    { name: "Volt ⚡", id: "button-Volt" },
    { name: "Volt ⚡", id: "button-Volt" },
    { name: "Volt ⚡", id: "button-Volt" }
)


pets.push(hipodoge,capipepo,ratigueya);


function startGame(){

    pets.forEach((mokepon) => {
        mokeponOption = `
        <input type="radio" name="pets" id=${mokepon.name}>
            <label for=${mokepon.name}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.image} alt=${mokepon.name}>
            </label>
        `

    cardscontainer.innerHTML += mokeponOption;

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
    })

    PetButton.addEventListener('click', selectPlayerPet);
    restartButton.addEventListener('click', restartGame);
    sectionSelectAttack.style.display = 'none';
    sectiomRestart.style.display = 'none';
}

function selectPlayerPet (){

    sectionSelectPet.style.display = 'none';
    sectionSelectAttack.style.display = 'flex';

    if (Hipodoge.checked) {
        spanNamePlayerPet.innerHTML = inputHipodoge.id;
        selectedPlayerPet = inputHipodoge.id
    } else if (Capipepo.checked) {
        spanNamePlayerPet.innerHTML = inputCapipepo.id;
        selectedPlayerPet = inputCapipepo.id
    } else if (Ratigueya.checked) {
        spanNamePlayerPet.innerHTML = inputRatigueya.id;
        selectedPlayerPet = inputRatigueya.id
    } else {
        alert("Please, select a pet")
    }

    extractPlayerAttacks(selectedPlayerPet);
    selectEnemyPet();
}

function extractPlayerAttacks(selectedPlayerPet){
    let attacks;
    for (let i = 0; i < pets.length; i++) {
        if (selectedPlayerPet === pets[i].name) {
            attacks = pets[i].attacks;
        } else {

        }
        
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {

    attacks.forEach((attack) => {

        attackOption = `
        <button class="attack-button button-class-listener" id=${attack.id}>${attack.name}</button>
        `
        attacksOptionsContainer.innerHTML += attackOption;
    })
    
    FireButton = document.getElementById('button-Fire');
    VoltButton = document.getElementById('button-Volt');
    GroundButton = document.getElementById('button-Ground');
    WaterButton = document.getElementById('button-Water');
    
    attacksOptionsButtons = document.querySelectorAll('.button-class-listener');
}

function selectEnemyPet(){
    let aleatoryEnemyPet = aleatory(0, pets.length - 1);
    spanNameEnemyPet.innerHTML = pets[aleatoryEnemyPet].name;
    selectedEnemyPet = pets[aleatoryEnemyPet].name;

    extractEnemyAttacks(selectedEnemyPet)
    attackSequence();
}


function extractEnemyAttacks(selectedEnemyPet){

    for (let i = 0; i < pets.length; i++) {
        if (selectedEnemyPet === pets[i].name) {
            enemyPetAttacks = pets[i].attacks;
        }
    }
}

function attackSequence(){
    attacksOptionsButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            if (e.target.textContent == "Fire 🔥") {
                selectedPlayerAttack = "Fire 🔥";
                playerAttacks.push("Fire 🔥")
                console.log(playerAttacks);
                button.disabled = true;
            } else if (e.target.textContent == "Volt ⚡") {
                selectedPlayerAttack = "Volt ⚡";
                playerAttacks.push("Volt ⚡")
                console.log(playerAttacks);
                button.disabled = true;
            } else if (e.target.textContent == "Ground 🌱") {
                selectedPlayerAttack = "Ground 🌱";
                playerAttacks.push("Ground 🌱")
                console.log(playerAttacks);
                button.disabled = true;
            } else if (e.target.textContent == "Water 💧") {
                selectedPlayerAttack = "Water 💧";
                playerAttacks.push("Water 💧")
                console.log(playerAttacks);
                button.disabled = true;
            } else {
                
            }

            enemyAttack();
        })
    })
}

function enemyAttack(){

    
    let aleatoryEnemyAttack = aleatory(0, enemyPetAttacks.length -1);
    if (usedEnemyAttacksIndexes.length == 0) {
        usedEnemyAttacksIndexes.push(aleatoryEnemyAttack)
        enemyAttacks.push(enemyPetAttacks[aleatoryEnemyAttack].name);
        selectedEnemyAttack = enemyPetAttacks[aleatoryEnemyAttack].name;
    } else {
        compare = usedEnemyAttacksIndexes.find(value => value == aleatoryEnemyAttack);
        if (compare == undefined) {
            usedEnemyAttacksIndexes.push(aleatoryEnemyAttack)
            enemyAttacks.push(enemyPetAttacks[aleatoryEnemyAttack].name);
            selectedEnemyAttack = enemyPetAttacks[aleatoryEnemyAttack].name;
            console.log(usedEnemyAttacksIndexes)
        }else{
            enemyAttack()
        }
    }
    console.log(enemyAttacks)
    combat()
    
}

function combat(){

    if (selectedPlayerAttack == selectedEnemyAttack) {
        createResultMessage("Tie")
    }else if (selectedPlayerAttack == "Fire 🔥" && selectedEnemyAttack == "Ground 🌱"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Water 💧" && selectedEnemyAttack == "Volt ⚡"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Water 💧" && selectedEnemyAttack == "Fire 🔥"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Ground 🌱" && selectedEnemyAttack == "Water 💧"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Ground 🌱" && selectedEnemyAttack == "Volt ⚡"){
        enemyPetLives--;
        createResultMessage("Won")
    }else if (selectedPlayerAttack == "Volt ⚡" && selectedEnemyAttack == "Fire 🔥"){
        enemyPetLives--;
        createResultMessage("Won")
    }else{
        playerPetLives--;
        createResultMessage("Lose")
        
    }

    spanEnemyLives.innerHTML = enemyPetLives.toString()
    spanPlayerLives.innerHTML = playerPetLives.toString()
    round ++;

    checkAttacks()

}

function checkAttacks() {
    if (round == 5) {
        checkLives()
    }
}

function checkLives() {
    if (playerPetLives == enemyPetLives) {
        createFinalMessage("Tie");
    } else if(playerPetLives > enemyPetLives){
        createFinalMessage("Won");
    } else {
        createFinalMessage("Lose");
    }
}

function createResultMessage(result){

    currentPlayerAttack = document.createElement('p')
    currentEnemyAttack = document.createElement('p')

    currentPlayerAttack.innerHTML = selectedPlayerAttack;
    currentEnemyAttack.innerHTML = selectedEnemyAttack;
    resultMessage.innerHTML = 'You ' + result;

    playerAttacksList.appendChild(currentPlayerAttack)
    enemyAttacksList.appendChild(currentEnemyAttack)

}

function createFinalMessage(result){
    messageSection.innerHTML = 'Your have ' + result + '!!!';

    FireButton.disabled = true;
    VoltButton.disabled = true;
    GroundButton.disabled = true;
    WaterButton.disabled = true;

    sectiomRestart.style.display = 'inline'
}


function aleatory(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function restartGame(){
    location.reload();
}



window.addEventListener('load', startGame)




