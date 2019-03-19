'use strict';

// after finishing almost all of the page: OH LORD, I JUST REALIZED I DIDN'T WRITE THIS LIKE THE EXAMPLE SHOWN IN CLASS :o  (╯°□°）╯︵ ┻━┻   ¯\_(ツ)_/¯

//values that updates
let values = {
    wins: 0,
    losses: 0,
    current_value: 0,
    titleArr: [],
    goal: 0,
    rIndex: 0,
    prevGen: []
};

//DOM iDs
let DOMs = {
    //Title
    game_name: 'Crystal  Collector',

    //paragraphs
    title: $('#game-title'),
    midP: $('#motiWords'),

    //scores
    wins: $('#wins_ui'),
    losses: $('#losses_ui'),
    goal: $('#total_score'),
    currentValue: $('#current_value'),

    //crystals
    red: $('#red_btn'),
    blue: $('#blue_btn'),
    yellow: $('#yellow_btn'),
    green: $('#green_btn'),

    //these are the cards to show value of the button, WHICH ONLY SHOWS ONCE IN THE BEGINNING
    cards: {
        red: $('#red-val-card'),
        blue: $('#blue-val-card'),
        yellow: $('#yellow-val-card'),
        green: $('#green-val-card')
    }
};

//functions
var fx = {
    //setting the DOMs
    appInit: () => {
        fx.changeRandomColor(); //changes color
        fx.playerStartGoal(); //sets random goal
        console.log(`Current Goal to beat: ${fx.playerStartGoal()}`);
        DOMs.wins.html(values.wins); //sets wins
        DOMs.losses.html(values.losses); //sets losses
        //not supposed to show values until user clicks the crystal
        if (values.current_value === 0) {
            DOMs.currentValue
                .addClass('small')
                .append('Click a crystal to start');
        } else {
            DOMs.currentValue.append(values.current_value);
        }
        //this is the same as above's if statement, but using ternary operator
        // condition ? true : else
        values.goal === 0
            ? DOMs.goal.addClass('small').append('Click a crystal to start')
            : DOMs.goal.append(values.goal);
    },
    //stores each letter individually, so we can manipulate it later
    getTitle: () => {
        for (let i = 0; i < DOMs.game_name.length; i++) {
            values.titleArr.push(DOMs.game_name[i]);
        }
    },
    //I wanted to change color of individual letter, but that'll do pig, that'll do.
    //This is too much work to change color lol, i could've done it without all of this looping...
    changeRandomColor: () => {
        fx.getTitle();
        var colors = ['#8e0000', '#0866cc', '#d6cf04', '#0fc100']; //red, blue, yellow, green
        let random = fx.randomNum(0, colors.length);

        switch (random) {
            case 0:
                console.log(`Title color: red`);
                break;

            case 1:
                console.log(`Title color: blue`);
                break;

            case 2:
                console.log(`Title color: yellow`);
                break;

            case 3:
                console.log(`Title color: green`);
                break;

            case 4:
                values.titleArr.forEach(p => {
                    $(DOMs.title).addClass('text-muted');
                });
            default:
                console.log(random);
                break;
        }

        values.titleArr.map(letter => {
            $(DOMs.title)
                .css('color', colors[random])
                .append(letter);
        });
    },

    randomNum: (min, max) => {
        let generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        values.prevGen.pop(generatedNumber);
        if (values.prevGen[values.rIndex - 1] === generatedNumber) {
            generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            values.prevGen.pop(generatedNumber);
            values.rIndex++;
            return generatedNumber;
        }
    },

    playerStartGoal: () => {
        // values.goal = fx.randomNum(19, 120);
        let goal = fx.randomNum(19, 120);
        values.goal = goal;
        return goal;
    },
    randomQuotes: () => {
        let quotes = [
            'Stay a while, and listen!',
            'Thank You Mario! But our princess is in another castle!',
            'This is your fault. I’m going to kill you. And all the cake is gone. You don’t even care, do you?',
            'If you can’t outplay them, outwork them  *hint hint* ;)',
            'Champions keep playing until they get it right',
            'When life gives you lemons, don’t make lemonade! Make life take the lemons back! Get mad! I don’t want your damn lemons! What am I supposed to do with these? Demand to see life’s manager',
            'It’s super effective!',
            'FINISH HIM!!',
            'HADOUKEN!',
            'Wakka wakka wakka',
            'It’s time to kick ass and chew bubble gum…and I’m all outa gum',
            'A hero need not speak. When he is gone, the world will speak for him',
            'Play around! If you can win legit, try typing ;)'
        ];

        let qIndex = 0;

        //a 'for loop' wouldn't be the best option for this specific, maybe it is
        for (let i = 0; i < quotes.length; i++) {
            //setInterval wouldn't work because it's sent right then and there, and the loop doesn't stop for ANYONE!
            //instead, this sets out a delay for each quote after loop iteration
            window.setTimeout(() => {
                $(DOMs.midP).text(quotes[qIndex]);
                qIndex++;
            }, i * 10000);
            qIndex = 0;
        }
    },
    displayNumOnClick: (dom, val) => {
        var i = 0;
        let msg = `Congrats! You win!
        Current Score: ${values.wins} `;
        let speed = 50;
        function winMsg() {
            if (i < msg.length) {
                $('#winner').text += msg.charAt(i);
                i++;
                setTimeout(winMsg, speed);
            }
        }
        let getVal = $(dom).click(e => {
            e.preventDefault();
            console.log(`${val}`);
            let value = (values.current_value += val);
            $('#current_value').html(`<h2>${value}</h2>`);

            //conditions for win or lose
            if (value > values.goal) {
                winMsg();
                values.losses++;
                DOMs.losses.text(values.losses);
                fx.gameReset();
            } else if (value === values.goal) {
                winMsg();
                values.wins++;
                DOMs.wins.text(values.wins);
                fx.gameReset();
            }
            return value;
        });
        return getVal;
    },
    playMusic: () => {
        let audio = document.createElement('audio');
        audio.setAttribute('src', './assets/ArexBeat.ogg');
        let audPlay = audio.play();

        if (audPlay !== undefined) {
            audPlay
                .then(_ => {
                    audPlay;
                })
                .catch(error => {
                    console.log(`ERROR PLAYING THE JAMS: ${error}`);
                });
        } else {
            audio.pause();
        }
    },

    gameReset: _ => {
        values.current_value = 0;
        $('#current_value').text('0');
        $('#total_score').text(fx.playerStartGoal());
    }
};

//this is a shorthand version of $(document).ready
//shit goes down from here on, top part is preparing for the fight~~
$(function() {
    fx.appInit();
    window.setTimeout(fx.randomQuotes, 2000);

    //gets the values of keys
    // for (let perc in values.percentages) {
    //     console.log(values.percentages[perc]);
    // }

    let red_value = fx.randomNum(1, 12);
    let blue_value = fx.randomNum(1, 12);
    let yellow_value = fx.randomNum(1, 12);
    let green_value = fx.randomNum(1, 12);

    fx.displayNumOnClick(DOMs.red, red_value);
    fx.displayNumOnClick(DOMs.blue, blue_value);
    fx.displayNumOnClick(DOMs.yellow, yellow_value);
    fx.displayNumOnClick(DOMs.green, green_value);

    // i may have bitten more than I can chew.. see fx.displayNumOnClick
});

/* 
ToDo:
* Display color_values to DOM
* Update current_value
* OPTIONAL - add audio
* Work on scores
*  Wins
* Losses
* implement win or lose logic

*/
