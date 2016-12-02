$(document).ready(function() {
  var turn;
  var turns;

  function createBoard() {
    var board = document.createElement('TABLE');
    board.innerHTML =
      '<tr id="row1">' +
      ' <td class="square"></td>' +
      ' <td class="square v"></td>' +
      ' <td class="square"></td>' +
      '</tr>' +
      '<tr id="row2">' +
      '  <td class="square h"></td>' +
      '  <td class="square v h"></td>' +
      '  <td class="square h"></td>' +
      '</tr>' +
      '<tr id="row3">' +
      '   <td class="square"></td>' +
      '   <td class="square v"></td>' +
      '   <td class="square"></td>' +
      '</tr>';
    board.id = "board";
    $('#container').append(board);
  }

  function gameOver(winner) {
    $('td').off();
    $('#clear').show();

  }

  function checkScore(play) {
    var win = [];
    var arr = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
      [2, 4, 6]
    ];
    $('#board td').each(function(value) {
      if ($(this).text() !== '') {
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].length; j++) {
            if (value === arr[i][j]) {
              arr[i][j] = $(this).text();
            }
          }
        }
      }
    });
    for (var i = 0; i < arr.length; i++) {
      if (!!arr[i].reduce(function(a, b) {
          return (a === b) ? a : NaN;
        })) {
        winnerDisplay(turn)
        gameOver();
        //break;
        return;
      }
    }
    if (turns === 9) {
      winnerDisplay('draw')
      gameOver();
      return;
    }
    turn = (turn === 'x') ? 'o' : 'x';
    console.log('e')
    window.setTimeout(play, 1000);
    //console.log(arr)
    return;
  }

  function computersTurn() {
    //console.log(turn)
    var usedSpaces = [];
    var availableSpaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var selector = '';
    $('td').off();
    $('#board td').each(function(value) {
      //console.log($(this).text(),value)
      if ($(this).text() !== '') {

        usedSpaces.push($(this).text());

        var index = availableSpaces.indexOf(value)
        availableSpaces.splice(index, 1)
      }
    });
    var computerMove = Math.floor(Math.random() * (availableSpaces.length - 1) + 0);
    //console.log(computerMove,availableSpaces)
    $('#board td').each(function(value) {
      if (value === availableSpaces[computerMove]) {
        $(this).text(turn);
      }
    });
    turns++;
    checkScore(playGame1);

    //playGame1(turn);
  }

  function startGame() {
    turns = 0;
    //make turn random TODO
    return turn = 'x';
  }

  function winnerDisplay(winner) {
    var display = document.createElement('DIV');
    display.id = "display";

    display.innerHTML = "";
    if (winner === "draw") {
      display.innerHTML += "It was a draw.";
    } else {
      display.innerHTML += "The winner is " + winner + '</br>';
    }
    display.innerHTML += "<button id='newGame'>New Game?</button>";

    $('#container').append(display);

    $('#newGame').click(function() {
      $('#board').remove();
      $('#play').show();
      $('#display').remove();
      $('#clear').addClass('hidden');
    });
  }

  function playGame1() {
    // console.log(turn)
    $('td').click(function() {

      if ($(this).text() === '') {
        $(this).text(turn);

        turns++;
        checkScore(computersTurn);
      }
    });
  }

  function playGame2() {
    $('td').click(function() {
      turns++;
      if ($(this).text() === '') {
        $(this).text(turn);
        checkScore(turn);
      }
    });
  }

  $('#play1').click(function() {
    $('#play').hide();
    $('#clear').removeClass('hidden');

    createBoard();
    turn = startGame();
    playGame1();
  });

  $('#play2').click(function() {
    $('#play').hide();
    $('#clear').removeClass('hidden');

    createBoard();
    turn = startGame();
    playGame2();
  });

  $('#clear').click(function() {
    $('#board').remove();
    $('#play').show();
    $('#display').remove();
    $('#clear').addClass('hidden');
  });
})