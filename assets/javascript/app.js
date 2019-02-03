//
//------------------------TRIVIA GAME -----------------------------------//
//
// create an array with multiple questions, possible answers, and the correct answer. 
var questions = [{
    question: "What was the Beatles first album?",
    answers: ["The Beatles", "Please Please Me", "Revolver", "Rubber Soul", "Abbey Road"],
    correctAnswer: "Please Please Me",
}, {
    question: "Who is the lead guitar player in Metallica?",
    answers: ["James Hetfield", "Tom Brady", "Dimebag Darrel", "Kirk Hammett", "Jimmy Page"],
    correctAnswer: "Kirk Hammett",
}, {
    question: "Who is the drummer from Led Zeppelin?",
    answers: ["Ron Paul", "Neil Peart", "John Bonham", "Dave Grohl", "Mitch Mitchell"],
    correctAnswer: "John Bonham",
}, {
    question: "What year was The Doors self title album 'The Doors' released?",
    answers: ["1967", "1968", "1969", "1970", "1971"],
    correctAnswer: "1967",
}, {
    question: "What is the best-selling rock album of all time?",
    answers: ["Eagles-Hotel California", "AC/DC-Back In Black", "Led Zeppelin-IV", "Nirvana-Nevermind"],
    correctAnswer: "Eagles-Hotel California",
}, {
    question: "How many records did Nirvana's 'Nevermind' sell in America by 1999?",
    answers: ["5 Million", "8 Million", "2 Million", "100,000", "10 Million"],
    correctAnswer: "10 Million",
}, {
    question: "Who is the baby on the front of the album 'Nevermind'?",
    answers: ["Keith Richards", "Matt Damon", "Robert Plant", "Spencer Elden", "Ron Burgundy"],
    correctAnswer: "Spencer Elden",
}, {
    question: "Where was AC/DC formed?",
    answers: ["Russia", "Mexico", "Canada", "United States", "Australia"],
    correctAnswer: "Australia",
}, {
    question: "Which artist/group was inducted to the Rock N' Roll Hall of Fame in 1994?",
    answers: ["Metallica", "Aerosmith", "Buddy Guy", "Elton John", "Led Zeppelin"],
    correctAnswer: "Elton John",
}, {
    question: "Which artist/group has NOT been inducted to the Rock N' Roll Hall of Fame?",
    answers: ["Al Green", "Aerosmith", "Foo Fighters", "Frank Zappa", "Tupac Shakur"],
    correctAnswer: "Foo Fighters",
}];

// start button 
$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
});

var game = {
    questions,
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    counter: 20,

    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000)
        $(".wrapper").prepend("<h3> Time Remaining : <span id='counter'> 20 </span> Seconds </h3>");
        $(".wrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $(".wrapper").append("<button class='answers' id='button-" + i + "' data-name='" + questions[game.currentQuestion].answers[i] + "'>" + questions[game.currentQuestion].answers[i] + "</button><br><br><br>");
        }
    },
    nextQuestion: function () {
        $(".popUp").remove();
        game.counter = 20;
        $("#timer").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $(".wrapper").html("<h2 class='popUp' id='all-done'>Out of Time!</h2>")
        $(".wrapper").append("<h3 class='popUp'> The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>")
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 1000 * 2);
        } else {
            setTimeout(game.nextQuestion, 1000 * 2);
        }
    },
    results: function () {
        clearInterval(timer);
        $(".wrapper").html("<h2> You Finished!! </h2>");
        $(".wrapper").append("<h3> Correct: " + game.correct + "</h3>");
        $(".wrapper").append("<h3> Incorrect: " + game.incorrect + "</h3>");
        $(".wrapper").append("<h3> Unanswered: " + game.unanswered + "</h3>");
        $(".wrapper").append("<button id='restart'> Restart </button>");
        $("#restart").on("click", function () {
            window.location.reload(false);
        })
    },
    click: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        game.correct++;
        $(".wrapper").html("<h2 class='popUp'> You Answered Correctly! </h2>");
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 1000 * 2);
        } else {
            setTimeout(game.nextQuestion, 1000 * 2);
        }
    },
    answeredIncorrectly: function () {
        clearInterval(timer);
        game.incorrect++;
        $(".wrapper").html("<h2 class='popUp'> You answered Incorrectly! </h2>");
        $(".wrapper").append("<h3 class='popUp'> The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 1000 * 2);
        } else {
            setTimeout(game.nextQuestion, 1000 * 2);
        }
    },

};
$(document).on("click", ".answers", function (e) {
    game.click(e);
})