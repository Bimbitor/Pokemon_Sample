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
let interval

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

let objectPlayerPet;

let map = document.getElementById('map')
let sectionMap = document.getElementById('map-section')
let mapHeight
let mapWidth = window.innerWidth - 20

mapHeight = mapWidth * 600 / 800

map.width = mapWidth
map.height = mapHeight

let canvas = map.getContext('2d')

let mapBackground = new Image()
mapBackground.src = './assets/mokemap.png'

let jugadorId = null
let selectedPlayerPet;
let selectedEnemyPet;
let selectedPlayerAttack;
let selectedEnemyAttack;
let mokeponOption;
let attackOption;
let playerPetLives = 5;
let enemyPetLives = 5;
let pets = [];
let pet;


class Mokepon {
    constructor(name, image, lives, avatar) {
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.attacks = []
        this.width = 40;
        this.height = 40;
        this.x = aleatory(0, map.width - this.width)
        this.y = aleatory(0, map.height - this.height)
        this.mapImage = new Image()
        this.mapImage.src = avatar
        this.velocidadX = 0
        this.velocidadY = 0
    }

    printPet(){
        canvas.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", 5, './assets/hipodoge.png')
let capipepo = new Mokepon("Capipepo", "assets/mokepons_mokepon_capipepo_attack.png", 5, './assets/capipepo.png')
let ratigueya = new Mokepon("Ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", 5, './assets/ratigueya.png')

let hipodogeEnemy = new Mokepon("Hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", 5, './assets/hipodoge.png')
let capipepoEnemy = new Mokepon("Capipepo", "assets/mokepons_mokepon_capipepo_attack.png", 5, './assets/capipepo.png')
let ratigueyaEnemy = new Mokepon("Ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", 5, './assets/ratigueya.png')

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

hipodogeEnemy.attacks.push(
    { name: "Water 💧", id: "button-Water" },
    { name: "Water 💧", id: "button-Water" },
    { name: "Water 💧", id: "button-Water" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" }
)

capipepoEnemy.attacks.push(
    { name: "Fire 🔥", id: "button-Fire" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Ground 🌱", id: "button-Ground" },
    { name: "Water 💧", id: "button-Water" }
)

ratigueyaEnemy.attacks.push(
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

    joinGame()
    PetButton.addEventListener('click', selectPlayerPet);
    restartButton.addEventListener('click', restartGame);
    sectionSelectAttack.style.display = 'none';
    sectionMap.style.display = 'none';
    sectiomRestart.style.display = 'none';
}

function joinGame() {
    fetch("http://localhost:8080/join")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function (response){
                        console.log(response)
                        jugadorId = response
                    })
            }
        })
}

function selectPlayerPet(){

    sectionSelectPet.style.display = 'none';
    sectionMap.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanNamePlayerPet.innerHTML = inputHipodoge.id;
        selectedPlayerPet = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanNamePlayerPet.innerHTML = inputCapipepo.id;
        selectedPlayerPet = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanNamePlayerPet.innerHTML = inputRatigueya.id;
        selectedPlayerPet = inputRatigueya.id
    } else {
        selectPlayerPet();
    }

    sendPetBackend(selectedPlayerPet)

    generateMap();
    printCanva();

    extractPlayerAttacks(selectedPlayerPet);
}

function sendPetBackend(selectedPlayerPet) {
    fetch(`http://localhost:8080/pet/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pet: selectedPlayerPet
        })
    })
}

function generateMap() {
    
    objectPlayerPet = getPetObject(selectedPlayerPet)
    window.addEventListener('keydown', movePet)

    window.addEventListener('keyup', moveStop)
}

function printCanva() {
    canvas.clearRect(0, 0, map.width, map.height)
    objectPlayerPet.x += objectPlayerPet.velocidadX
    objectPlayerPet.y += objectPlayerPet.velocidadY
    canvas.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height,
        )
        objectPlayerPet.printPet()
        hipodogeEnemy.printPet()
        capipepoEnemy.printPet()
        ratigueyaEnemy.printPet()
        if (objectPlayerPet.velocidadX !== 0 || objectPlayerPet.velocidadY !== 0) {
            checkCollision(hipodogeEnemy)
            checkCollision(capipepoEnemy)
            checkCollision(ratigueyaEnemy)
            
        }
        
    }
    
function getPetObject (petRequest){
    for (let i = 0; i < pets.length; i++) {
        if (petRequest == pets[i].name) {
            return pets[i];
        }
    }
}

function movePet(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            break
    }
}

function moveUp() {
    objectPlayerPet.velocidadY = -5;
    printCanva()
}

function moveDown() {
    objectPlayerPet.velocidadY = 5;
    printCanva()
}

function moveRight() {
    objectPlayerPet.velocidadX = 5;
    printCanva()
}

function moveLeft() {
    objectPlayerPet.velocidadX = -5;
    printCanva()
}

function moveStop() {
    objectPlayerPet.velocidadX = 0;
    objectPlayerPet.velocidadY = 0;
    printCanva()
}

function checkCollision(enemigo){
    const upPlayerPet = objectPlayerPet.y
    const downPlayerPet = objectPlayerPet.y + objectPlayerPet.height
    const rightPlayerPet = objectPlayerPet.x + objectPlayerPet.width
    const leftPlayerPet = objectPlayerPet.x
    
    const upEnemyPet = enemigo.y
    const downEnemyPet = enemigo.y + enemigo.height
    const rightEnemyPet = enemigo.x + enemigo.width
    const leftEnemyPet = enemigo.x

    if (
        upPlayerPet < upEnemyPet ||
        downPlayerPet > downEnemyPet ||
        rightPlayerPet < rightEnemyPet ||
        leftPlayerPet > leftEnemyPet
    ) {
        return
    }

    sectionMap.style.display = 'none'
    sectionSelectAttack.style.display = 'flex';

    
    selectEnemyPet(enemigo);
}

function extractPlayerAttacks(selectedPlayerPet){
    let attacks;
    for (let i = 0; i < pets.length; i++) {
        if (selectedPlayerPet === pets[i].name) {
            attacks = pets[i].attacks;
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

function selectEnemyPet(enemigo){
    spanNameEnemyPet.innerHTML = enemigo.name;
    selectedEnemyPet = enemigo.name;

    extractEnemyAttacks(selectedEnemyPet)
    attackSequence();
}

function extractEnemyAttacks(selectedEnemyPet){ 

    for (let i = 0; i < pets.length; i++) {
        if (selectedEnemyPet === pets[i].name) {
            enemyPetAttacks = pets[i].attacks;
            console.log(enemyPetAttacks)
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
        combat()
    } else {
        compare = usedEnemyAttacksIndexes.find(value => value == aleatoryEnemyAttack);
        if (compare == undefined) {
            usedEnemyAttacksIndexes.push(aleatoryEnemyAttack)
            enemyAttacks.push(enemyPetAttacks[aleatoryEnemyAttack].name);
            selectedEnemyAttack = enemyPetAttacks[aleatoryEnemyAttack].name;
            console.log(usedEnemyAttacksIndexes)
            combat()
        }else{
            enemyAttack()
        }
    }    
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

    sectiomRestart.style.display = 'inline'
}


function aleatory(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function restartGame(){
    location.reload();
}





window.addEventListener('load', startGame)




