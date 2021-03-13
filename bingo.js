/*
Name: Claire Mytelka
Directory ID (NOT numeric one): cmytelka
*/

//Each time you refresh the page, these are called
updateBingo();
changeColor();
changeFont();
changeSize();
var countClicks = 0;

//Called when Update button is clicked, creates the bingo table of random values
function updateBingo() {
  callList.innerHTML = "";
  var boardSize = Number(bingoSize.value);
  if (boardSize < 4 || boardSize > 21) {
    //Checks whether the Size value is appropriate
    alert(
      "Size must be greater than or equal to 4 and smaller than or equal to 21."
    );
    return;
  }

  var table = "<table>";
  table += "<tr>";
  var array = new Array(boardSize);

  for (var i = 0; i < array.length; i += 1) {
    array[i] = Number(randomNumber(1, boardSize)); //Filling array with random values
    table += "<td id='cell" + i + "'>" + array[i] + "</td>";
  }

  table += "</tr>";
  table += "</table>";
  bingoSpace.innerHTML = table;
}

//Changes text color when radio buttons are clicked
function changeColor() {
  if (redFont.checked) {
    bingoSpace.style.color = "red";
  }
  if (greenFont.checked) {
    bingoSpace.style.color = "green";
  }
  if (blueFont.checked) {
    bingoSpace.style.color = "blue";
  }
}

//Changes font when drop-down menu value is changed
function changeFont() {
  if (arial.selected) {
    bingoSpace.style.fontFamily = "Arial";
  }
  if (times.selected) {
    bingoSpace.style.fontFamily = "Times New Roman";
  }
  if (courier.selected) {
    bingoSpace.style.fontFamily = "Courier New";
  }
}

//Changes font size when drop-down menu value is changed
function changeSize() {
  if (ten.selected) {
    bingoSpace.style.fontSize = "10px";
  }
  if (twenty.selected) {
    bingoSpace.style.fontSize = "20px";
  }
  if (thirty.selected) {
    bingoSpace.style.fontSize = "30px";
  }
}

//Called when call button is clicked
//Calls random numbers and checks if any match the bingo numbers
//If they match, background turns blue
//If 5 in a row, backgrounds turn magenta
function callButton() {
  countClicks += 1;
  var boardSize = Number(bingoSize.value);
  var call = randomNumber(1, boardSize);
  var randomColor =
    "rgb(" +
    randomNumber(0, 255) +
    "," +
    randomNumber(0, 255) +
    "," +
    randomNumber(0, 255) +
    ")";
  var space =
    "<span style='color: " + randomColor + ";'>" + call + " " + "</span>";

  callList.innerHTML += space;

  var blue = new Array(boardSize);

  for (var i = 0; i < boardSize; i += 1) {
    var cellId = "cell" + i;
    var check = document.getElementById(cellId).innerHTML;
    if (Number(check) === call) {
      document.getElementById(cellId).style.backgroundColor = "blue";
      updateBlue(blue, boardSize);
      //console.log(blue);
      for (var j = 0; j < blue.length - 4; j += 1) {
        if (
          blue[j] === "blue" &&
          blue[j + 1] === "blue" &&
          blue[j + 2] === "blue" &&
          blue[j + 3] === "blue" &&
          blue[j + 4] === "blue"
        ) {
          document.getElementById("cell" + j).style.backgroundColor = "magenta";
          document.getElementById("cell" + (j + 1)).style.backgroundColor =
            "magenta";
          document.getElementById("cell" + (j + 2)).style.backgroundColor =
            "magenta";
          document.getElementById("cell" + (j + 3)).style.backgroundColor =
            "magenta";
          document.getElementById("cell" + (j + 4)).style.backgroundColor =
            "magenta";
          nCalls.innerHTML = countClicks + " Calls";
          document.getElementById("update").style.display = "none";
          document.getElementById("call").style.display = "none";
          document.getElementById("reset").style.display = "none";
          display();
          break;
        }
      }
    }
  }
}

//Creates an array the same size as boardSize and assigns value "blue" for matched values
function updateBlue(blue, boardSize) {
  for (var i = 0; i < boardSize; i += 1) {
    var cellId = "cell" + i;
    if (document.getElementById(cellId).style.backgroundColor === "blue") {
      blue[i] = "blue";
    }
  }
  return blue;
}

//Pause for 1.5 seconds before bingo image shown
function display() {
  setTimeout(bingo, 1500);
}

//Bingo image shown where buttons were
function bingo() {
  document.getElementById("box").innerHTML +=
    "<img src='bingo.svg' width='300px' height='100px'>";
}

//Called when reset button is clicked, returns board to default settings
function resetButton() {
  bingoSize.value = "10";
  redFont.checked = true;
  arial.selected = true;
  twenty.selected = true;
  updateBingo();
  changeFont();
  changeColor();
  changeSize();
  callList.innerHTML = "";
  nCalls.innerHTML = "Calls";
}

function randomNumber(low, high) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
