var simple = require('./simple.txt');
var inquirer = require('inquirer');
var correct = 0;
var wrong = 0;
var x = 0
var fs = require('fs');
// constructor function //

function FlashCard(front, back) {
    this.front = front;
    this.back = back;
}

FlashCard.prototype.displayBack = function() {
    console.log('Sorry, the answer is:', this.back);
}


function cardGenerator(simple, x) {
    fs.readFile(simple, "utf8", function(error, data) {
        var jsonContent = JSON.parse(data);

        if (x < jsonContent.length) {


            var flashCard = new FlashCard(jsonContent[x].front, jsonContent[x].back);
            var frontCard = flashCard.front;
            inquirer.prompt([{
                name: "question",
                message: frontCard,
                validate: function(value) {

                    if (value.length > 0) {
                        return true;
                    }
                    return 'please try !!!';
                }

            }]).then(function(answers) {

                if (answers.question.toLowerCase() === flashCard.back.toLowerCase()) {
                    console.log('Correct!');
                    correct++;
                    x++;
                    cardGenerator(simple, x);
                } else {
                    flashCard.displayBack();
                    wrong++;
                    x++;
                    cardGenerator(simple, x);
                }

            })

        } else {
            console.log('The result is' + '\n correct: ' + correct + '\n wrong: ' + wrong);
            correct = 0;
            wrong = 0;
        }

    });
}
cardGenerator('simple.txt', x)
