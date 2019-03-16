let values = {
  wins: 0,
  losses: 0,
  current_value: 0,
  gameName: []
};
let DOMs = {
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

let fx = {
  changeTitle: () => {
    let title = DOMs.title[0].innerText;
    for (let i = 0; i < title.length; i++) {
      //try to change the color of each letter
    }
    console.log(title);
  }
};

//this is a shorthand version of $(document).ready
$(function() {
  fx.changeTitle();
});
