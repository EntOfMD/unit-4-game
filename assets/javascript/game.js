//values that updates
let values = {
    wins: 0,
    losses: 0,
    current_value: 0,
    gameName: [],
    titleArr: []
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
    totalScore: $('#total_score'),
    currentValue: $('#current_value'),

    //crystals
    red: $('#red_crystal'),
    blue: $('#blue_crystal'),
    yellow: $('#yellow_crystal'),
    green: $('#green_crystal')
};

//functions
var fx = {
    //stores each letter individually, so we can manipulate it later
    getTitle: () => {
        for (let i = 0; i < DOMs.game_name.length; i++) {
            //try to change the color of each letter
            values.titleArr.push(DOMs.game_name[i]);
            console.log(`Pushed letter ${values.titleArr[i]}`);
        }
    },
    //I wanted to change color of individual letter, but that'll do pig, that'll do.
    //This is too much work to change color lol, i could've done it without all of this looping...
    changeRandomColor: () => {
        fx.getTitle();
        var colors = ['#8e0000', '#0866cc', '#d6cf04', '#0fc100']; //red, blue, yellow, green
        values.titleArr.map(letter => {
            let random = Math.floor(Math.random() * colors.length);
            if (random == random) {
                Math.floor(Math.random() * colors.length);
            }
            $('#game-title')
                .css('color', colors[random])
                .append(letter);
        });
    }
};

//this is a shorthand version of $(document).ready
//shit goes down from here on, top part is preparing for the fight~~
$(function() {
    fx.changeRandomColor();
});
