# Trivia-Game-2
## Overview 
- This is a Rock and Roll theme trivia game! You will have 20 seconds to answer each question. The program will count how many questions you got correct, incorrect and unanswered. If answered incorrectly, the program will display the correct answer and then move on to the next question. When you reach the end of the game, the program will display the results and you can click "Restart" to play again. 

## Challenges
- The app dynamically renders the page via js. I began by setting up the questions. To do this, I created an array of objects. The array named questions and each object had properties of question, answers, and correct answer. I repeated this process for all the questions in the game. 
- Now that I had the basics down, I needed to create the functionality of the game.
    - The game is an object that has many properties and methods. Properties consist of questions, currentQuestion, correct, incorrect, unanswered, and counter. Most properties had a value of 0, so I was able to increment the value by one as the game proceeded. The counter was set to 20 which decremented by one. 
    - From there I created the methods which where: countdown, loadQuestion, nextQuestion, timeUp, results, click, answeredCorrectly, and answeredIncorrectly.
        - **countdown** This function is straight forward, it is the counter function for the game. To do this we grab the counter variable declared before (game.counter) and set it to decrement by one with the --. We need to display the counter for the user so I took the id from the html where we wanted to display it, used the .html method and called game.counter. I also made a conditional that says if the game counter is less than or equal to zero then run the function timeUp().
        - **loadQuestion** This function loads the question. When the question is loaded we setInterval on the timer for one second intervals. We prepend the timer and then append the question and the questions possible answered. To append the answers we run a for loop over the questions of the games currentQuestion of the length of the answers. Then wrap each possible answer in a button and append it to the html document. 
        ```javascript
        loadQuestion: function () {
        timer = setInterval(game.countdown, 1000)
        $(".wrapper").prepend("<h3> Time Remaining : <span id='counter'> 20 </span> Seconds </h3>");
        $(".wrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $(".wrapper").append("<button class='answers' id='button-" + i + "' data-name='" + questions[game.currentQuestion].answers[i] + "'>" + questions[game.currentQuestion].answers[i] + "</button><br><br><br>");
            } 
         }
        ```
        - **nextQuestion** Next question resets the game counter to 20 seconds, loads the timer to the html document, increments the currentQuestion so js knows where the program is, so it knows when to stop. nextQuestion also calls the previous function loadQuestion().
        - **timeUp** Times up! If you run out of time to answer a question, this function with increment the amount of unanswered questions, clear the timer, and display text saying 'Out of Time' so the user knows they ran out of time. This function will also display the correct answer and then check to see if that question was the last question. If it was the last question the program will run the results function, else it will run nextQuestion.
        ```javascript
        timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $(".wrapper").html("<h2 id='all-done'>Out of Time!</h2>")
        $(".wrapper").append("<h3> The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>")
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 1000 * 2);
        } else {
            setTimeout(game.nextQuestion, 1000 * 2);
          }
       }
        ```
        - **results** This is the final page of the program and js will display all the correct, incorrect, and unanswered questions. There will also be a 'Restart' button that will allow the user to play again. 
        - **click** Our click function checks to see that in the event that if the button's data-name that was clicked equals the current questions answer then it will run the function answeredCorrectly, else it will run answeredIncorrectly().
        ```javascript 
        click: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
           }
        }
        ```
        - **answeredCorrectly** This function will clear the timer, increment the correct value by one, and display to the user that they answered the question correctly. This function will then check to see if the currentQuestion is equal to the length of the questions array. If true, run results(), else run nextQuestion().
        ```javascript
        answeredCorrectly: function () {
        clearInterval(timer);
        game.correct++;
        $(".wrapper").html("<h2> You Answered Correctly! </h2><hr>");
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 1000 * 2);
        } else {
            setTimeout(game.nextQuestion, 1000 * 2);
          }
       }
        ```
        -**answeredIncorrectly** This function is almost identical to the previous function except increments incorrect value by one, informs the user they answered incorrectly, and then displays the correct answer. Then it has the same condition statement to see if that question was the last one of the array. 
## Achievments
- Overall this app is a good built to understand functions and how to pass functions between other functions. It also is a great lesson to understand how to dynamically render html with just javascript and jQuery. 

## Link

https://allen138.github.io/Trivia-Game-2/