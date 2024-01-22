var currentQuestion = 0;
var score = 0;
var username = "";

var questions = [
    {
        question: "Hvem er smartest?",
        options: ["Benjamin i 6 klasse", "Vetle i 6 klasse", "Jonathan i 6 klasse", "Pippi Langstrømpe"],
        correctAnswer: "Pippi Langstrømpe"
    },
    {
        question: "Hvorfor har Oscar i 6 klasse brukt 500 kr på fifa??",
        options: ["Fordi han liker Tuva romantisk", "Fordi han har hår", "Fordi Anders er en lærer", "Saturn"],
        correctAnswer: "Fordi Anders er en lærer"
    },
    {
        question: "Hvem er den høyeste personen på hele skolen??",
        options: ["Flåklypa", "Marcus", "Alexander Stensrød Fugl", "Hippopotamus"],
        correctAnswer: "Flåklypa"
    },
    {
        question: "如果你能讀懂這個，你就是一頭驢?",
        options: ["香蕉", "Python", "Jon martin", "Det kommer bedre spørsmål i fremtiden jeg lover pls ikke slå meg"],
        correctAnswer: "香蕉"
    },
    {
        question: "HvOrDaN sIeR dU sTeVnEmØtE PÅ ENGELSK?????",
        options: ["香蕉", "stevnemøte", "Date", "Krigs protokollen"],
        correctAnswer: "Date"
    }
    // Add more questions as needed
];

function loadQuestion() {
    var questionContainer = document.getElementById("question-container");
    var optionsHTML = "";

    var currentQ = questions[currentQuestion];
    questionContainer.innerHTML = "<p>" + currentQ.question + "</p>";

    for (var i = 0; i < currentQ.options.length; i++) {
        optionsHTML += '<button onclick="checkAnswer(\'' + currentQ.options[i] + '\')">' + currentQ.options[i] + '</button>';
    }

    questionContainer.innerHTML += optionsHTML;
}

function checkAnswer(answer) {
    var currentQ = questions[currentQuestion];
    if (answer === currentQ.correctAnswer) {
        score += 100;
    }

    document.getElementById("score").innerHTML = "Score: " + score;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        // When the quiz is completed, send the score to the server
        sendScore();
    }
}

function sendScore() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "score.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Prompt the user for a username
    username = prompt("Quiz ferdig! Skriv inn brukernavnet du vil ha her:", "Anonymous");

    // Send the score and username to the server
    var data = "score=" + score + "&username=" + encodeURIComponent(username);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            // Display the updated leaderboard
            loadLeaderboard();
        }
    };

    xhr.send(data);
}

function loadLeaderboard() {
    var leaderboardContainer = document.getElementById("leaderboard-container");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "score.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            leaderboardContainer.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}

// Load the first question when the page loads
window.onload = function () {
    loadQuestion();
    loadLeaderboard();
};
