'use strict';

// after finishing almost all of the page: OH LORD, I JUST REALIZED I DIDN'T WRITE THIS LIKE THE EXAMPLE SHOWN IN CLASS (╯°□°）╯︵ ┻━┻
//there was an attempt ¯\_(ツ)_/¯

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
            setTimeout(() => {
                $(DOMs.title)
                    .css('color', colors[random])
                    .append(letter);
            }, 200);
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
            "Type 'help();' in Developer Console for Commands!",
            'If you can’t outplay them, outwork them  *hint hint* ;)',
            'Thank You Mario! But our princess is in another castle!',
            'This is your fault. I’m going to kill you. And all the cake is gone. You don’t even care, do you?',
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
    displayNumOnClick: (dom, val, card) => {
        let getVal = $(dom).click(e => {
            e.preventDefault();
            console.log(`${val}`);
            $(card).text(`This has a ${val}`);
            // $(card).show();

            setTimeout(() => {
                $(card).hide();
            }, 300);

            var i = 0;
            let delay = 42;
            let msg = `Congrats! You win! \n
            Current Score: Wins: ${values.wins + 1}
            Losses: ${values.losses} `;
            function winMsg() {
                if (i < msg.length) {
                    $('#winner').append(msg.charAt(i));
                    i++;
                    setTimeout(winMsg, delay);
                }
            }

            let value = (values.current_value += val);
            $('#current_value').html(`<h2>${value}</h2>`);

            //conditions for win or lose
            if (value > values.goal) {
                values.losses++;
                DOMs.losses.text(values.losses);
                fx.gameReset();
            } else if (value === values.goal) {
                value = 0;
                values.wins++;
                DOMs.wins.text(values.wins);
                winMsg();
                setTimeout(() => {
                    $('#winner').hide();
                }, 7000);
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

let testing = {
    add: (key, val) => {
        switch (key) {
            case 'wins':
                values.wins += val;
                DOMs.wins.text(values.wins);
                break;
            case 'losses':
                values.losses += val;
                DOMs.losses.text(values.losses);
                break;
            case 'goal':
                values.goal += val;
                DOMs.goal.text(values.goal);
                break;
            case 'score':
                values.current_value += val;
                DOMs.currentValue.text(values.current_value);
                break;

            default:
                console.log(`Can't find that key`);
                break;
        }
        return `added ${val} to ${key}`;
    },
    set: (key, val) => {
        switch (key) {
            case 'wins':
                values.wins = val;
                DOMs.wins.text(values.wins);
                break;
            case 'losses':
                values.losses = val;
                DOMs.losses.text(values.losses);
                break;
            case 'goal':
                values.goal = val;
                DOMs.goal.text(values.goal);
                break;
            case 'score':
                values.current_value = val;
                DOMs.currentValue.text(values.current_value);
                break;

            default:
                console.log(`Can't find that key`);
                break;
        }
        return `${key} set with ${val}`;
    },
    showValues: card => {
        switch (card) {
            case 'red':
                $('#red-val-card').show();
                break;
            case 'blue':
                $('#blue-val-card').show();
                break;
            case 'yellow':
                $('#yellow-val-card').show();
                break;
            case 'green':
                $('#green-val-card').show();
                break;

            default:
                $('.crystalValCard ').show();
                break;
        }
        return `Showing ${card ? card : 'all'}`;
    }
};

let help = _ => {
    console.log(`
    ***********************************************************************
                                    COMMANDS
    -----------------------------------------------------------------------
    * testing.add(wins, losses, goal, current_score | value)
        Adds stated value to the key. Key must be in 'quotations'
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    * testing.set(wins, losses, goal, current_score | value)
        Sets the stated value to the key. Key must be in 'quotations'
    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    * testing.showValues(red, blue, yellow, green, EMPTY to show all)
        Shows the card under the button, revealing the value.
            **NOTE: THE BUTTON MUST BE CLICKED ATLEAST ONCE!**
    hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    ------------------------------------------------------------------------
                                        END
    ************************************************************************
    `);
    return `Winning is good, but most importantly, have fun! It's a journey, not a race :)`;
};

//this is a shorthand version of $(document).ready
$(function() {
    fx.appInit();
    window.setTimeout(fx.randomQuotes, 2000);
    fx.playMusic();

    //gets the values of keys
    // for (let perc in values.percentages) {
    //     console.log(values.percentages[perc]);
    // }

    let red_value = fx.randomNum(1, 12);
    let blue_value = fx.randomNum(1, 12);
    let yellow_value = fx.randomNum(1, 12);
    let green_value = fx.randomNum(1, 12);

    fx.displayNumOnClick(DOMs.red, red_value, '#red-val-card');
    fx.displayNumOnClick(DOMs.blue, blue_value, '#blue-val-card');
    fx.displayNumOnClick(DOMs.yellow, yellow_value, '#yellow-val-card');
    fx.displayNumOnClick(DOMs.green, green_value, '#green-val-card');

    // i may have bitten more than I can chew.. see fx.displayNumOnClick
});

/* 
ToDo:
* Display color_values to DOM -done
* Update current_value -done
* OPTIONAL - add audio - done
* Work on scores -done
*  Wins
* Losses
* implement win or lose logic -done

*/
