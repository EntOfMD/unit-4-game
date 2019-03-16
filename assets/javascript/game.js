'use strict';

//it's too damn organized, DRY DRY DRY!!!

//values that updates
let values = {
    wins: 0,
    losses: 0,
    current_value: 0,
    titleArr: [],
    goal: 0
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
    }
};

//this is a shorthand version of $(document).ready
//shit goes down from here on, top part is preparing for the fight~~
$(function() {
    fx.appInit();
    // $(DOMs.red).click
    let red_value = values.goal / 4;
    let blue_value = values.goal / 5;
    let yellow_value = values.goal / 6;
    let green_value = Math.floor(yellow_value / 2) + 1 * 5;

    $(DOMs.red).click(function(e) {
        e.preventDefault();

        console.log(red_value);
    });
    $(DOMs.blue).click(function(e) {
        e.preventDefault();
        console.log(blue_value);
    });
    $(DOMs.yellow).click(function(e) {
        e.preventDefault();
        console.log(yellow_value);
    });
    $(DOMs.green).click(function(e) {
        e.preventDefault();
        console.log(green_value);
    });
});
