'use strict';
//values that updates
let values = {
    wins: 0,
    losses: 0,
    current_value: 0,
    titleArr: [],
    goal: 0,

    percentages: {
        red: 0.25,
        blue: 0.125,
        yellow: 0.0625,
        green: 0.45
    }
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
    green: $('#green_btn')
};

//functions
var fx = {
    //setting the DOMs
    appInit: () => {
        fx.changeRandomColor(); //changes color
        fx.playerStartGoal(); //sets random goal
        console.log(`Current Goal to beat: ${fx.playerStartGoal()}`);
        DOMs.wins.append(values.wins); //sets wins
        DOMs.losses.append(values.losses); //sets losses
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
        let random = fx.randomNum(colors.length);

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

    randomNum: p => {
        let generatedNumber = Math.floor(Math.random() * p);

        return generatedNumber;
    },

    playerStartGoal: () => {
        let goal = fx.randomNum(100);
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
        for (let i = 0; i < quotes.length; i++) {
            window.setTimeout(() => {
                $(DOMs.midP).text(quotes[qIndex]);
                console.log(quotes[qIndex]);
                qIndex++;
            }, i * 10000);
            qIndex = 0;
        }
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

    let red_value = values.goal * values.percentages.red;
    let blue_value = values.goal * values.percentages.blue;
    let yellow_value = values.goal * values.percentages.yellow;
    let green_value = values.goal * values.percentages.green;

    $(DOMs.red).click(function(e) {
        e.preventDefault();
        DOMs.currentValue.innerHTML += red_value.toFixed(2);
        console.log(`${red_value.toFixed(2)}`);
    });
    $(DOMs.blue).click(function(e) {
        e.preventDefault();
        console.log(blue_value.toFixed(2));
    });
    $(DOMs.yellow).click(function(e) {
        e.preventDefault();
        console.log(yellow_value.toFixed(2));
    });
    $(DOMs.green).click(function(e) {
        e.preventDefault();
        console.log(green_value.toFixed(2));
    });
});
