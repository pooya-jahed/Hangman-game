let secretWord;
let result = "";

// FETCH DATA FROM DICTIONARY
fetch("/all.json")
  .then((response) => response.json())
  .then((json) => (secretWord = json));

setTimeout(() => {
  // ---------------
  const scoreNumberClassN = document.querySelector(".scoreN");
  const headerClassN = document.querySelector(".header");
  let secretWordA = "";
  let dictionary = [];
  let Underlines = [];

  let clicked = [];
  let mistakes = -1;
  let score = 0;
  let inputWordClassN = document.querySelector(".clue-word");

  // ------------function get random word from dictionary--------------
  function getRandomItem() {
    dictionary = secretWord.filter(
      (item) => item.length > 2 && item.length < 8
    );
    let random = Math.trunc(Math.random() * dictionary.length);

    secretWordA = dictionary[random].toString();
    console.log(secretWordA);

    // event listener for get mouse and key clicked

    document.addEventListener("keydown", keyboardHandler);
    document.getElementById("keys").addEventListener("click", mouseHandler);
    // ---------------
    // ---------------
    // ---------------
    // ---------------
  }

  // --------------replace underlines for define word length--------------------//
  function insertUnderlines() {
    // split word to letter  and convert each letter to one array item

    let splittedWord = secretWordA.split("");
    console.log(splittedWord);
    // look if user click on right letter or not
    let hiddenMap = splittedWord.map((letter) =>
      clicked.indexOf(letter) >= 0 ? letter : "_"
    );
    result = hiddenMap.join("");
    console.log(result);
    inputWordClassN.innerHTML = `<P>${result}</P>`;

    console.log(Underlines);
    console.log(secretWordA);
    console.log(hiddenMap);
  }
  // ------------------------------------------
  function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    if (secretWordA.indexOf(letter) >= 0) {
      insertUnderlines();
      changeScore();
      IfWon();
      document.querySelector(`.${letter}`).style = "background-Color:green";
    } else if (secretWordA.indexOf(letter) === -1) {
      mistakes++;
      IfLost();

      console.log(letter);
      document.querySelector(`.${letter}`).style = "background-Color:red";
      imageChanger();
    }
  }

  // ----------------------------------
  // ------------------------------------------
  //  function for  change picture src address for each wrong answer
  function imageChanger() {
    const hangmanImgClassN = document.querySelector(".hangman-img");
    const img0 = "/img/0.png";

    const img1 = "/img/1.png";
    const img2 = "/img/2.png";
    const img3 = "/img/3.png";
    const img4 = "/img/4.png";
    const img5 = "/img/5.png";
    const img6 = "/img/6.png";
    const hangmanImages = [img0, img1, img2, img3, img4, img5, img6];

    hangmanImgClassN.src = hangmanImages[mistakes];
  }

  // _________mouseHandler function--------
  function mouseHandler(event) {
    letterHandler(event.target.textContent);
    console.log(event.target.textContent);
  }
  // _________keyboardHandler function--------
  function keyboardHandler(event) {
    event.keyCode >= 65 && event.keyCode <= 90 && event.keyCode > 48
      ? letterHandler(event.key.toUpperCase())
      : alert(`you type  ${event.key}  ,
     ----please type right letter----`);
  }

  function changeScore() {
    let scoreN = Math.round(100 / secretWordA.length);
    console.log(scoreN);

    score += scoreN;
    scoreNumberClassN.textContent = score;
  }
  function IfWon() {
    if (secretWordA === result) {
      scoreNumberClassN.textContent = 100;
      headerClassN.innerHTML = "YOU WIN";

      headerClassN.style =
        "color:green;letter-Spacing:20px;justify-Content:center;align-Items:center;margin-Top:60px";
      document.querySelector(".keys").remove();
      document.querySelector(".hangman-img").src = "";
      document.querySelector(".clue-word").style = "color:green";
    }
  }
  function IfLost() {
    if (mistakes === 6 || mistakes > 6) {
      document.getElementById("keys").remove();
      headerClassN.innerHTML = "GAME OVER";
      headerClassN.style = "color:red;";

      document.querySelector(".hangman-img").src = "/img/6.png";
      document.querySelector(
        ".clue-word"
      ).textContent = `Random word is: ${secretWordA}`;
      headerClassN.style =
        "color:red;letter-Spacing:20px;justify-Content:center;margin-Top:60px";
      document.querySelector(".clue-word").style = "color:red";
    }
  }
  getRandomItem();
  insertUnderlines();
}, 305);
