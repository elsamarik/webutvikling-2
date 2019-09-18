//Databasene for inneholdet til spørsmålene
var myQuestions = [{
        question: "Hva heter kongen i Norge?",
        answers: {
            a: 'Haakon',
            b: 'Harald',
            c: 'Olav'
        },
        correctAnswer: 'b'
    },
    {
        question: "Hva er hovedstaden i Norge?",
        answers: {
            a: 'Stockholm',
            b: 'Bergen',
            c: 'Oslo'
        },
        correctAnswer: 'c'
    },
    {
        question: "Hvem er Erna Solberg?",
        answers: {
            a: 'Finansminister',
            b: 'President',
            c: 'Statminister'
        },
        correctAnswer: 'c'
    },
    {
        question: "Hvem er Jens Stoltenberg?",
        answers: {
            a: 'Tidligere finansminister',
            b: 'Tidligere statsminister',
            c: 'Tidligere konge'
        },
        numCorrect: 'b'
    }

];

//Henter elementer fra html. 
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

QuizMaker(myQuestions, quizContainer, resultsContainer, submitButton);

function QuizMaker(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;
        for (var i = 0; i < questions.length; i++) {
            answers = [];
            for (letter in questions[i].answers) {
                answers.push(
                    '<label>' +
                    '<input type="radio" name="question' + i + '" value="' + letter + '">' +
                    letter + ': ' +
                    questions[i].answers[letter] +
                    '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>' +
                '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {

        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        for (var i = 0; i < questions.length; i++) {

            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            if (userAnswer === questions[i].correctAnswer) {
                numCorrect++;

                answerContainers[i].style.color = 'lightgreen';
            } else {
                answerContainers[i].style.color = 'red';
            }
        }


        resultsContainer.innerHTML = 'Du fikk ' + numCorrect + ' av ' + questions.length + ' riktige';
    }


    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }

}