import gameType from "./constants/games";
import dictionaty from "./constants/dictionary";

class Game {
  constructor() {
    this.baseURL = window.location.origin;

    this.localhosts = ["localhost", "127.0.0.1"];

    this.developerMode = this.checkRunsLocal();

    console.log("Developer mode: " + this.developerMode);

    this.rules = gameType.find(game=>game.name === "Classic").rules;

    this.appSettings = {
      thema: localStorage.getItem("thema") || "ligth",
      language: localStorage.getItem("language") || "hu",
      playerNames: ["player", "computer"],
      imageLoaded: 0,
      statisticMode: localStorage.getItem("statisctics") || "values",
    };

    console.log(this.appSettings.language);

    this.gameInProgress = false;

    this.dictionary = dictionaty;

    this.statistics = {};

    this.userChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.userChoice = this.rules[this.userChoiceIndex];
    this.computerChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.computerChoice = this.rules[this.computerChoiceIndex];
    this.computerRollLength = 15;

    this.popupTimeout = 3;

    this.getDomELements();

    this.initialize();
  }

  checkRunsLocal() {
    const hostedLocal= this.localhosts.find(host=> this.baseURL.indexOf(host) > -1);
    return !!hostedLocal;
  }

  getDomELements() {
    const appElements = [
      { name: "app", id: "app" },
      { name: "menu", id: "menu" },
      { name: "settings", id: "settings" },
      { name: "loaderScreen", id: "loader-screen" },
      { name: "favicon", id: "favicon" },
      { name: "startButton", class: ".start.button" },
      { name: "nextButton", class: ".next.button" },
      { name: "prevButton", class: ".prev.button" },
      { name: "rulesButton", class: ".rules.button" },
      { name: "statButton", class: ".statistics.button" },
      { name: "langButton", class: ".language.button" },
      { name: "licensingButton", class: ".licensing.button" },
      { name: "statisticsButton", class: ".statistics.button" },
      { name: "settingsButton", class: ".settings.button" },
      { name: "lightdark", class: ".lightdark.button" },
      { name: "rulesModal", class: ".rules.modal" },
      { name: "resultModal", class: ".result.modal" },
      { name: "languageModal", class: ".language.modal" },
      { name: "statisticsModal", class: ".statistics.modal" },
      { name: "licensingModal", class: ".licensing.modal" },
      { name: "allModals", class: ".modal" },
      { name: "allCloseButtons", classes: ".closeButton" },
      { name: "statisticsClose", class: ".statistics.closeButton" },
      { name: "rulesClose", class: ".rules.closeButton" },
      { name: "languageClose", class: ".language.closeButton" },
      { name: "resultClose", class: ".result.closeButton" },
      { name: "licensingClose", class: ".licensing.closeButton" },
      { name: "resultClose", class: ".result.closeButton" },
      { name: "statisticsTable", class: "#statistics-table" },
      { name: "statisticsInput", id: "statistics-input" },
      {name: resultContainer, class: ".result-container"},
    {name: "resultCounter", class: ".counter"},
    {name: "langChange", classes: ".language-button",},
    {name: "playerName", class: "#player-name"},
    {name: "computerName", class: "#computer-name"},
    {name: "computerWins", class: ".computer-wins"},
    {name: "userWins", class: ".user-wins"},
    {name: "mainTitle", class: "#main-title"},
    {name: "playerImages", classes: ".images.player",},
      {name: "computerImages", classes: ".images.computer",}

    ];

    this.app = document.getElementById("app");
    this.menu = document.getElementById("menu");
    this.settings = document.getElementById("settings");
    this.loaderScreen = document.getElementById("loader-screen");
    this.favicon = document.getElementById("favicon");

    //buttons
    this.startButton = document.querySelector(".start.button");
    this.nextButton = document.querySelector(".next.button");
    this.prevButton = document.querySelector(".prev.button");
    this.rulesButton = document.querySelector(".rules.button");
    this.statButton = document.querySelector(".statistics.button");
    this.langButton = document.querySelector(".language.button");
    this.licensingButton = document.querySelector(".licensing.button");
    this.statisticsButton = document.querySelector(".statistics.button");
    this.settingsButton = document.querySelector(".settings.button");
    this.lightdark = document.querySelector(".lightdark.button");

    //modals
    this.rulesModal = document.querySelector(".rules.modal");
    this.resultModal = document.querySelector(".result.modal");
    this.languageModal = document.querySelector(".language.modal");
    this.statisticsModal = document.querySelector(".statistics.modal");
    this.licensingModal = document.querySelector(".licensing.modal");
    this.allModals = Array.from(document.querySelectorAll(".modal"));

    //modal close buttons
    this.allCloseButtons = Array.from(
      document.querySelectorAll(".closeButton")
    );
    this.statisticsClose = document.querySelector(".statistics.closeButton");
    this.rulesClose = document.querySelector(".rules.closeButton");
    this.languageClose = document.querySelector(".language.closeButton");
    this.resultClose = document.querySelector(".result.closeButton");
    this.licensingClose = document.querySelector(".licensing.closeButton");
    this.resultClose = document.querySelector(".result.closeButton");

    //statistics table
    this.statisticsTable = document.querySelector(".table-container");
    this.statisticsInput = document.querySelector("#statistics-input");

    //result modal content
    this.resultContainer = document.querySelector(".result-container");
    this.resultCounter = document.querySelector(".counter");

    //language changers
    this.langChange = Array.from(document.querySelectorAll(".language-button"));

    //scoreboard
    this.playerName = document.querySelector("#player-name");
    this.computerName = document.querySelector("#computer-name");
    this.computerWins = document.querySelector(".computer-wins");
    this.userWins = document.querySelector(".user-wins");

    //main title
    this.mainTitle = document.querySelector("#main-title");

    //threw icons
    this.playerImages = Array.from(document.querySelectorAll(".images.player"));
    this.computerImages = Array.from(
      document.querySelectorAll(".images.computer")
    );
  }

  initializeImages() {
    const images = Array.from(document.querySelectorAll(".loader-image"));
    this.imageCount = images.length;
    images.forEach((image) => this.asynImageLoader(image));
  }

  asynImageLoader(img) {
    const fileName = img.dataset.filename;

    const url = `${this.baseURL}/${
      this.developerMode ? "" : "RockPaperScissors/"
    }${fileName}`;

    fetch(url).then((response) =>
      response.blob().then((blob) => {
        img.src = URL.createObjectURL(blob);
        img.alt = `image: ${fileName.split(".")[0]}`;
        img.classList.remove("loader-image");
        const loaded = img.addEventListener(
          "load",
          () => {
            this.appSettings.imageLoaded++;
            if (this.appSettings.imageLoaded === this.imageCount) {
              this.app.classList.remove("off");
              this.loaderScreen.classList.add("off");
              this.loaderScreen.addEventListener("transitionend", () =>
                this.loaderScreen.remove()
              );
            }
          },
          { once: true }
        );
      })
    );
  }

  initTitleChange() {
    setInterval(() => {
      const choice =
        this.rules[Math.floor(Math.random() * this.rules.length)];

      const choiceName = this.getTranslation(choice.value);
      document.title =
        choiceName[0].toUpperCase() + choiceName.substring(1) + "!";

      this.favicon.href = `./media/${choice.value}.png`;
    }, 1000);
  }

  setScores() {
    const results = {};
    Object.keys(this.statistics).forEach((player) => {
      results[player] = Object.keys(this.statistics[player]).reduce(
        (sum, threw) => sum + +this.statistics[player][threw],
        0
      );
    });
    this.computerWins.innerHTML = results.computer;
    this.userWins.innerHTML = results.player;
  }

  nextThrew() {
    this.userChoiceIndex++;
    if (this.userChoiceIndex > this.rules.length - 1) {
      this.userChoiceIndex = 0;
    }
    this.userChoice = this.rules[this.userChoiceIndex];
    this.setUserChoiceImage();
  }

  prevThrew() {
    this.userChoiceIndex--;
    if (this.userChoiceIndex < 0) {
      this.userChoiceIndex = this.rules.length - 1;
    }
    this.userChoice = this.rules[this.userChoiceIndex];
    this.setUserChoiceImage();
  }

  startGame() {
    if (
      this.allModals.reduce(
        (acc, curr) => curr.classList.contains("show") + acc,
        0
      ) === 0 &&
      this.gameInProgress === false
    ) {
      this.gameInProgress = true;
      for (let i = 0; i < this.computerRollLength; i++) {
        setTimeout(() => {
          this.computerChoiceIndex = Math.floor(
            Math.random() * this.rules.length
          );
          this.computerChoice = this.rules[this.computerChoiceIndex];
          this.setComputerChoiceImage();
          if (i === 0) {
            this.gameInProgress = false;
            this.determineWinner();
            this.initializeStatistics();
            this.showResult();
          }
        }, 10 * (this.computerRollLength + 1 - i) * (this.computerRollLength + 1 - i));
      }
    }
  }

  themeChange() {
    const changeDark = [
      this.app.parentElement,
      this.app,
      this.rulesModal,
      this.resultModal,
      this.languageModal,
      this.licensingModal,
      this.statisticsModal,
      this.settings,
      this.statisticsInput,
    ];
    changeDark.forEach((elem) => elem.classList.toggle("dark"));
    localStorage.setItem(
      "darkmode",
      this.app.parentElement.classList.contains("dark")
    );

    Array.from(this.lightdark.children).forEach((icon) => {
      icon.classList.toggle("on");
      icon.classList.toggle("off");
    });
  }

  showMenu() {
    this.settings.classList.toggle("out");
  }

  initButton(button, cb) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  initializeButtons() {
    const buttonActions = [
      { button: this.nextButton, action: this.nextThrew.bind(this) },
      { button: this.prevButton, action: this.prevThrew.bind(this) },
      { button: this.startButton, action: this.startGame.bind(this) },
      { button: this.settingsButton, action: this.showMenu.bind(this) },
      { button: this.lightdark, action: this.themeChange.bind(this) },
    ];

    buttonActions.forEach(({ button, action }) =>
      this.initButton(button, action)
    );
  }

  initModal(activator, modal) {
    this.makeArray(activator).forEach((elem) => {
      elem.addEventListener("click", () => {
        const modalShowed = modal.classList.contains("show");
        this.closeAllModals();
        modalShowed
          ? modal.classList.remove("show")
          : modal.classList.add("show");
      });
    });
  }

  closeAllModals() {
    this.allModals.forEach((modal) => modal.classList.remove("show"));
  }

  initCloseButtons() {
    this.allCloseButtons.forEach((button) =>
      button.addEventListener("click", () => this.closeAllModals())
    );
  }

  initializeModals() {
    const modalMaps = [
      {
        activator: [this.rulesButton],
        modal: this.rulesModal,
      },
      {
        activator: [this.langButton],
        modal: this.languageModal,
      },
      {
        activator: [this.licensingButton],
        modal: this.licensingModal,
      },
      {
        activator: [this.statisticsButton],
        modal: this.statisticsModal,
      },
    ];

    this.initCloseButtons();

    modalMaps.forEach(({ activator, modal }) => {
      this.initModal(activator, modal);
    });

    this.langChange.forEach((lc) => {
      lc.addEventListener("click", (e) => {
        this.appSettings.language = lc.dataset.lang;
        this.updateLang();
      });
    });
  }

  makeArray(arr) {
    if (Array.isArray(arr)) {
      return arr;
    } else {
      return [arr];
    }
  }

  setUserChoiceImage() {
    this.setHidden(this.playerImages, this.userChoice);
  }

  setComputerChoiceImage() {
    this.setHidden(this.computerImages, this.computerChoice);
  }

  setHidden(images, choiced) {
    images.forEach((img) => img.classList.add("hidden"));
    images
      .filter((img) => img.id === choiced.value)[0]
      .classList.remove("hidden");
  }

  //Get user's choice
  getUserChoice(userInputStr) {
    const userChoiceObj = this.getChoice(userInputStr);
    this.userChoice =
      this.rules
        .map((item) => item.name === userChoiceObj.name)
        .reduce((acc, curr) => (acc += +curr)) > 0
        ? userChoiceObj
        : alert(this.dictionary[this.appSettings.language].error);
  }

  //Get computer's choice
  getComputerChoice() {
    this.computerChoice =
      this.rules[Math.floor(Math.random() * this.rules.length)];
  }

  //Compare & determine the winner
  determineWinner() {
    let playerWins = null;
    this.result = this.getTranslation("resultTie");
    if (this.userChoice.beats.includes(this.computerChoice.value)) {
      playerWins = true;
      this.result = this.getTranslation("resultPlayerWon");
    }
    if (this.computerChoice.beats.includes(this.userChoice.value)) {
      playerWins = false;
      this.result = this.getTranslation("resultComputerWon");
    }
    this.setScores();
    this.calculateStatistics(playerWins);
  }

  calculateStatistics(playerWins) {
    let winner, looser;
    if (playerWins === true) {
      winner = this.userChoice.value;
      looser = this.computerChoice.value;
      this.statistics["player"][winner] = this.statistics["player"][winner] + 1;
    }
    if (playerWins === false) {
      winner = this.computerChoice.value;
      looser = this.userChoice.value;
      this.statistics["computer"][winner] =
        this.statistics["computer"][winner] + 1;
    }
    this.updateStatistics();
    this.createStatistics();
  }

  initStatisticsMode() {
    this.statisticsInput.addEventListener("change", (e) => {
      e.preventDefault();
      this.appSettings.statisticMode = this.statisticsInput.value;
      this.createStatistics();
    });
  }

  createStatistics() {
    const header = [
      "wins",
      ...this.appSettings.playerNames.map((pn) => pn + "Name"),
      "summary",
    ];

    const allGame = +this.computerWins.innerHTML + +this.userWins.innerHTML;

    const table = `<table><thead>
      <tr>${header
        .map((col, index) => `<th>${this.getTranslation(col)}</th>`)
        .join("")}</tr>
      </thead><tbody>
      ${Object.keys(this.statistics["player"])
        .map((threw) => {
          return `
            <tr>
              <td class="player-cell">${this.getTranslation(threw)}</td>
              <td class="player-cell" style="text-align:center">${
                this.appSettings.statisticMode === "values"
                  ? +this.statistics["player"][threw]
                  : (
                      (+this.statistics["player"][threw] / allGame) *
                      100
                    ).toFixed(1) + "%"
              }</td>
              <td class="computer-cell" style="text-align:center">${
                this.appSettings.statisticMode === "values"
                  ? +this.statistics["computer"][threw]
                  : (
                      (+this.statistics["computer"][threw] / allGame) *
                      100
                    ).toFixed(1) + "%"
              }</td>
              <td class="summary-cell" style="text-align:center">${
                this.appSettings.statisticMode === "values"
                  ? +this.statistics["computer"][threw] +
                    +this.statistics["computer"][threw]
                  : (
                      ((+this.statistics["player"][threw] +
                        +this.statistics["computer"][threw]) /
                        allGame) *
                      100
                    ).toFixed(1) + "%"
              }</td>
            </tr>`;
        })
        .join("")}
        <tfoot>
          <tr>${[
            this.getTranslation("summary"),
            this.appSettings.statisticMode === "values"
              ? +this.userWins.innerHTML
              : ((+this.userWins.innerHTML / allGame) * 100).toFixed(1) + "%",
            this.appSettings.statisticMode === "values"
              ? +this.computerWins.innerHTML
              : ((+this.computerWins.innerHTML / allGame) * 100).toFixed(1) +
                "%",
            this.appSettings.statisticMode === "values"
              ? +this.computerWins.innerHTML + +this.userWins.innerHTML
              : "100%",
          ]
            .map((footer) => `<th>${footer}</th>`)
            .join("")}</tr>
        </tfoot>
      </tbody></table>`;

    this.statisticsTable.innerHTML = table;
  }

  getTranslation(string) {
    return this.dictionary[this.appSettings.language][string];
  }

  getChoice(userChoice) {
    return this.rules[
      Object.keys(this.rules).filter(
        (c) => this.rules[c].value === userChoice.toLowerCase()
      )[0]
    ];
  }

  generateRules() {
    console.log(this.settings);
    this.rulesDescription = `
    <h2>${this.getTranslation("gameRules")}:</h2>
    <p>${this.getTranslation("rulesDesc")}</p>
    ${this.rules
      .map(
        (c) =>
          `<p>${this.getTranslation(c.value)} ${this.getTranslation(
            "beats"
          )} ${c.beats
            .map((b) => this.getTranslation(b + "T"))
            .join(` ${this.getTranslation("and")} `)}.</p>`
      )
      .join("")}
    <p style="color: red">${this.getTranslation("popupInstruction")}</p>`;
    this.rulesModal.querySelector(".rules-text").innerHTML = this.rulesDescription;
  }

  showResult() {
    this.resultContainer.innerHTML = `
    <h2>${this.result}</h2>
    <p>${this.getTranslation("youThrew")} ${this.getTranslation(
      this.userChoice.value + "T"
    )}</p>
    <p>${this.getTranslation("CPUThrew")} ${this.getTranslation(
      this.computerChoice.value + "T"
    )}</p>`;
    this.resultModal.classList.add("show");
    for (let i = this.popupTimeout; i >= 0; i--) {
      setTimeout(() => {
        if (i === 0) {
          this.resultCounter.innerHTML = this.getTranslation("popupClosing");
          this.resultModal.classList.remove("show");
        } else {
          this.resultCounter.innerHTML = `${this.getTranslation(
            "popupClosingIn"
          )} <span style="width:1.2rem;display:inline-block;">${i}</span> ${this.getTranslation(
            "popupTimeout"
          )}...`;
        }
      }, (this.popupTimeout - i) * 3000);
    }
  }

  getTitle() {
    return this.rules
      .map((threw) => this.getTranslation(threw.value))
      .join(", ");
  }

  updateLang() {
    this.generateRules();
    this.createStatistics();
    this.playerName.innerHTML = this.getTranslation("playerName");
    this.computerName.innerHTML = this.getTranslation("computerName");
    this.mainTitle.innerHTML = this.getTitle();
    document.documentElement.setAttribute("lang", this.appSettings.language);
    localStorage.setItem("language", this.appSettings.language);
  }

  initializeStatistics() {
    const oldStat = localStorage.getItem("statistics");
    oldStat
      ? (this.statistics = JSON.parse(oldStat))
      : this.appSettings.playerNames.forEach((player) => {
          this.statistics[player] = {};
          this.rules.forEach((item) => {
            this.statistics[player][item.value] = 0;
          });
        });

    this.setScores();
  }

  updateStatistics() {
    localStorage.setItem("statistics", JSON.stringify(this.statistics));
  }

  initilizeTheme() {
    if (this.appSettings.thema === "true") {
      this.themeChange();
    }
  }

  initialize() {
    this.initializeImages();
    window.onload = () => {
      this.initilizeTheme();
      this.initializeStatistics();
      this.initializeButtons();
      this.initializeModals();
      this.setUserChoiceImage();
      this.setComputerChoiceImage();
      this.updateLang();
      // this.initTitleChange();
      // this.initStatisticsMode();
    };
  }
}

export default Game;