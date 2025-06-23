// Définitions des formes géométriques et leurs définitions
const definitions = [
    {
        nom: "Polygone",
        definition: "Une surface dont tous les côtés sont droits"
    },
    {
        nom: "Quadrilatère",
        definition: "Un polygone à 4 côtés"
    },
    {
        nom: "Parallélogramme",
        definition: "Un quadrilatère qui a 2 paires de côtés parallèles"
    },
    {
        nom: "Trapèze",
        definition: "Un quadrilatère qui a 1 paire de côtés parallèles"
    },
    {
        nom: "Rectangle",
        definition: "Un quadrilatère qui a 4 angles droits"
    },
    {
        nom: "Carré",
        definition: "Un quadrilatère qui a 4 côtés isométriques et 4 angles droits"
    },
    {
        nom: "Triangle",
        definition: "Un polygone à 3 côtés"
    }
];

// Éléments du DOM
const questionElement = document.getElementById('question');
const shapeElement = document.getElementById('shape');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Variables du jeu
let score = 0;
let currentQuestion = null;
let questions = [];
let canAnswer = true;

// Initialisation du jeu
function initGame() {
    score = 0;
    scoreElement.textContent = score;
    questions = [...definitions];
    nextQuestion();
}

// Affiche une nouvelle question
function nextQuestion() {
    // Réinitialiser l'interface
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    canAnswer = true;
    
    // Mélanger les questions si nécessaire
    if (questions.length === 0) {
        questions = [...definitions];
    }
    
    // Choisir une question aléatoire
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions.splice(randomIndex, 1)[0];
    
    // Afficher la question
    shapeElement.textContent = currentQuestion.nom;
    
    // Générer les options de réponse
    generateOptions();
}

// Génère les options de réponse
function generateOptions() {
    optionsContainer.innerHTML = '';
    
    // Créer un tableau avec toutes les définitions sauf la bonne
    let wrongOptions = definitions
        .filter(def => def.nom !== currentQuestion.nom)
        .map(def => def.definition);
    
    // Mélanger les mauvaises réponses
    wrongOptions = shuffleArray(wrongOptions);
    
    // Prendre 3 mauvaises réponses
    const selectedWrongOptions = wrongOptions.slice(0, 3);
    
    // Créer un tableau avec toutes les options
    const allOptions = [
        currentQuestion.definition,
        ...selectedWrongOptions
    ];
    
    // Mélanger les options
    const shuffledOptions = shuffleArray(allOptions);
    
    // Créer les boutons d'options
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });
}

// Gère la sélection d'une option
function selectOption(button, selectedOption) {
    if (!canAnswer) return;
    
    canAnswer = false;
    
    // Vérifier si la réponse est correcte
    const isCorrect = selectedOption === currentQuestion.definition;
    
    // Mettre à jour le score
    if (isCorrect) {
        score++;
        scoreElement.textContent = score;
        feedbackElement.textContent = 'Bonne réponse !';
        feedbackElement.style.color = '#28a745';
        button.classList.add('correct');
    } else {
        feedbackElement.textContent = `Incorrect. La bonne réponse était : ${currentQuestion.definition}`;
        feedbackElement.style.color = '#dc3545';
        button.classList.add('incorrect');
        
        // Mettre en évidence la bonne réponse
        const options = document.querySelectorAll('.option');
        options.forEach(opt => {
            if (opt.textContent === currentQuestion.definition) {
                opt.classList.add('correct');
            }
        });
    }
    
    // Afficher le bouton suivant
    nextButton.style.display = 'block';
}

// Mélange un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Événements
nextButton.addEventListener('click', nextQuestion);

// Démarrer le jeu
initGame();
