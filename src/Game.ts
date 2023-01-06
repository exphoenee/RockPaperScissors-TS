/* utils */

/* constants */
import games from "./constants/games";
import dictionaty from "./constants/dictionary";
import appElements, { appElementType } from "./constants/appElements";

/* tpyes */
import ruleType from "./constants/games";
import statisticsType from "./types/statistics.type";
import elemType, { singleElemType, multiElemType } from "./types/elemType";

class Game {
  private appSettings: {
    baseURL: string;
    developerMode: boolean;
    thema: string;
    language: string;
    playerNames: string[];
    imageLoaded: number;
    imageCount: number;
    popupTimeout: number;
    statisticMode: string;
  };
  private rules: any; //TODO: find out the type (typeof ruleType)[];
  private localhosts: string[];
  private playing: string;
  private gameInProgress: boolean;
  private dictionary: Object;
  private statistics: statisticsType;
  private userChoiceIndex: number;
  private userChoice: any; //TODO: find the type
  private computerChoiceIndex: number;
  private computerChoice: any; //TODO: find the type
  private computerRollLength: number;
  private elem: elemType;
  rulesDescription: string;
  private modalMap: {
    activator: HTMLButtonElement[];
    modal: Element;
  }[];

  constructor() {
    this.localhosts = ["localhost", "127.0.0.1"];
    this.playing = "Classic";
    this.rules =
      games.find((game) => game.name === this.playing)?.rules || games[0].rules;

    this.elem = { single: [{}], multi: [{}] }; //initilaized later
    this.modalMap = []; //initilaized later

    this.appSettings = {
      baseURL: window.location.origin,
      developerMode: true,
      thema: localStorage.getItem("thema") || "ligth",
      language: localStorage.getItem("language") || "hu",
      playerNames: ["player", "computer"],
      imageLoaded: 0,
      imageCount: 0,
      popupTimeout: 3,
      statisticMode: localStorage.getItem("statisctics") || "values",
    };

    /* texts */
    this.dictionary = dictionaty;

    /* generated texts */
    this.rulesDescription = "";

    /* Game state */
    this.gameInProgress = false;
    this.statistics = { player: {}, computer: {} };
    this.userChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.userChoice = this.rules[this.userChoiceIndex];
    this.computerChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.computerChoice = this.rules[this.computerChoiceIndex];
    this.computerRollLength = 15;

    this.initialize();
  }

  private checkRunsLocal() {
    const hostedLocally = this.localhosts.find(
      (host) => this.appSettings.baseURL.indexOf(host) > -1
    );
    this.appSettings.developerMode = !!hostedLocally;
  }

  private getDomELements() {
    this.elem = appElements.reduce((acc: elemType, el: appElementType) => {
      if (el.id) {
        const elem = document.getElementById(el.id);
        if (elem) {
          acc.single = { ...acc.single, [el.name]: elem };
          acc.single[el.name as keyof appElementType] = elem;
        } else throw new Error(`Element ${el.name} is missing!`);
      } else if (el.class) {
        const elem = document.querySelector(el.class);
        if (elem) {
          acc.single = { ...acc.single, [el.name]: elem };
          acc.single[el.name as keyof appElementType] = elem;
        } else throw new Error(`Element ${el.name} is missing!`);
      } else if (el.classes) {
        const elems = Array.from(document.querySelectorAll(el.classes));
        if (elems) {
          acc.multi = { ...acc.multi, [el.name]: elems };
          acc.multi[el.name as keyof appElementType] = elems;
        } else throw new Error(`Element ${el.name} is missing!`);
      } else {
        console.error(el.name, "is missing!");
      }
      return acc;
    }, {} as elemType);
  }

  private initializeImages() {
    const images: HTMLImageElement[] = Array.from(
      document.querySelectorAll(".loader-image") as NodeListOf<HTMLImageElement>
    );
    const loaderImage = document.getElementById(
      "#loader-image"
    ) as HTMLImageElement;
    this.appSettings.imageCount = images.length;
    images.forEach((image: HTMLImageElement) => {
      image.src = loaderImage?.src || "";
      this.asynImageLoader(image);
    });
  }

  private asynImageLoader(img: HTMLImageElement) {
    const fileName = img.dataset.filename;

    const url = `${this.appSettings.baseURL}/${
      this.appSettings.developerMode ? "" : "RockPaperScissors/"
    }${fileName}`;

    fileName &&
      fetch(url).then((response) =>
        response.blob().then((blob) => {
          img.src = URL.createObjectURL(blob);
          img.alt = `image: ${fileName.split(".")[0]}`;
          img.classList.remove("loader-image");
          img.addEventListener(
            "load",
            () => {
              this.appSettings.imageLoaded++;
              if (
                this.appSettings.imageLoaded === this.appSettings.imageCount
              ) {
                this.elem.single.app.classList.remove("off");
                this.elem.single.loaderScreen.classList.add("off");
                this.elem.single.loaderScreen.addEventListener(
                  "transitionend",
                  () =>
                    this.elem.single.loaderScreen instanceof Element &&
                    this.elem.single.loaderScreen.remove()
                );
              }
            },
            { once: true }
          );
        })
      );
  }

  private initTitleChange() {
    setInterval(() => {
      const choice = this.rules[Math.floor(Math.random() * this.rules.length)];

      const choiceName = this.getTranslation(choice.value);
      document.title =
        choiceName[0].toUpperCase() + choiceName.substring(1) + "!";

      this.elem.single.favicon.href = `./media/${choice.value}.png`;
    }, 1000);
  }

  setScores() {
    const results: statisticsType = { player: {}, computer: {} };
    Object.keys(this.statistics).forEach((player) => {
      results[player as keyof statisticsType] = Object.keys(
        this.statistics[player as keyof statisticsType]
      ).reduce(
        (sum: number, threw: Object) =>
          sum +
          +this.statistics[player as keyof statisticsType]?.[
            threw as keyof Object
          ],
        0
      );
    });
    this.elem.single.computerWins.innerHTML = results.computer;
    this.elem.single.userWins.innerHTML = results.player;
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
      this.elem.multi.allModals.every(
        (curr: Element) => !curr.classList.contains("show")
      ) &&
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

  changeThema() {
    const changeDark = [
      this.elem.single.app.parentElement,
      this.elem.single.app,
      this.elem.single.rulesModal,
      this.elem.single.resultModal,
      this.elem.single.languageModal,
      this.elem.single.licensingModal,
      this.elem.single.statisticsModal,
      this.elem.single.settings,
      this.elem.single.statisticsInput,
    ];

    changeDark.forEach((elem) => elem.classList.toggle("dark"));
    localStorage.setItem(
      "darkmode",
      this.elem.single.app.parentElement.classList.contains("dark")
    );

    Array.from(this.elem.single.themaButton.children as NodeListOf<Element>).forEach(
      (icon: Element) => {
        icon?.classList?.toggle("on");
        icon?.classList?.toggle("off");
      }
    );
  }

  showMenu() {
    this.elem.single.settings.classList.toggle("out");
  }

  initButton(button: HTMLButtonElement, cb: () => void) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  initializeButtons() {
    const buttonActions = [
      { button: this.elem.single.nextButton, action: this.nextThrew.bind(this) },
      { button: this.elem.single.prevButton, action: this.prevThrew.bind(this) },
      { button: this.elem.single.startButton, action: this.startGame.bind(this) },
      { button: this.elem.single.settingsButton, action: this.showMenu.bind(this) },
      { button: this.elem.single.themaButton, action: this.changeThema.bind(this) },
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
    this.elem.multi.allModals.forEach((modal: Element) =>
      modal.classList.remove("show")
    );
  }

  initCloseButtons() {
    this.elem.multi.allCloseButtons.forEach((button: HTMLButtonElement) =>
      button.addEventListener("click", () => this.closeAllModals())
    );
  }

  initializeModals() {
    /* Modal initialization */
    this.modalMap = [
      {
        activator: [this.elem.single.rulesButton],
        modal: this.elem.single.rulesModal,
      },
      {
        activator: [this.elem.single.langButton],
        modal: this.elem.single.languageModal,
      },
      {
        activator: [this.elem.single.licensingButton],
        modal: this.elem.single.licensingModal,
      },
      {
        activator: [this.elem.single.statisticsButton],
        modal: this.elem.single.statisticsModal,
      },
    ];

    this.initCloseButtons();

    this.modalMap.forEach(({ activator, modal }) => {
      this.initModal(activator, modal);
    });

    this.elem.multi.langChange.forEach((lc) => {
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
    this.setHidden(this.elem.multi.playerImages, this.userChoice);
  }

  setComputerChoiceImage() {
    this.setHidden(this.elem.multi.computerImages, this.computerChoice);
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
    this.elem.single.statisticsInput.addEventListener("change", (e) => {
      e.preventDefault();
      this.appSettings.statisticMode = this.elem.single.statisticsInput.value;
      this.createStatistics();
    });
  }

  createStatistics() {
    const header = [
      "wins",
      ...this.appSettings.playerNames.map((pn) => pn + "Name"),
      "summary",
    ];

    const allGame =
      +this.elem.single.computerWins.innerHTML + +this.elem.single.userWins.innerHTML;

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
              ? +this.elem.single.userWins.innerHTML
              : ((+this.elem.single.userWins.innerHTML / allGame) * 100).toFixed(1) +
                "%",
            this.appSettings.statisticMode === "values"
              ? +this.elem.single.computerWins.innerHTML
              : ((+this.elem.single.computerWins.innerHTML / allGame) * 100).toFixed(
                  1
                ) + "%",
            this.appSettings.statisticMode === "values"
              ? +this.elem.single.computerWins.innerHTML +
                +this.elem.single.userWins.innerHTML
              : "100%",
          ]
            .map((footer) => `<th>${footer}</th>`)
            .join("")}</tr>
        </tfoot>
      </tbody></table>`;

    this.elem.single.statisticsTable.innerHTML = table;
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
    this.elem.single.rulesModal.querySelector(".rules-text").innerHTML =
      this.rulesDescription;
  }

  showResult() {
    this.elem.single.resultContainer.innerHTML = `
    <h2>${this.result}</h2>
    <p>${this.getTranslation("youThrew")} ${this.getTranslation(
      this.userChoice.value + "T"
    )}</p>
    <p>${this.getTranslation("CPUThrew")} ${this.getTranslation(
      this.computerChoice.value + "T"
    )}</p>`;
    this.elem.single.resultModal.classList.add("show");
    for (let i = this.appSettings.popupTimeout; i >= 0; i--) {
      setTimeout(() => {
        if (i === 0) {
          this.elem.single.resultCounter.innerHTML =
            this.getTranslation("popupClosing");
          this.elem.single.resultModal.classList.remove("show");
        } else {
          this.elem.single.resultCounter.innerHTML = `${this.getTranslation(
            "popupClosingIn"
          )} <span style="width:1.2rem;display:inline-block;">${i}</span> ${this.getTranslation(
            "popupTimeout"
          )}...`;
        }
      }, (this.appSettings.popupTimeout - i) * 3000);
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
    this.elem.single.playerName.innerHTML = this.getTranslation("playerName");
    this.elem.single.computerName.innerHTML = this.getTranslation("computerName");
    this.elem.single.mainTitle.innerHTML = this.getTitle();
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

  initilizeThema() {
    if (this.appSettings.thema === "true") {
      this.changeThema();
    }
  }

  initialize() {
    window.onload = () => {
      this.initializeImages();
      /* DOM elements */
      this.getDomELements();

      this.checkRunsLocal();
      this.initilizeThema();
      this.initializeButtons();
      this.initializeModals();

      this.updateLang();
      this.initTitleChange();

      this.initializeStatistics();
      this.setUserChoiceImage();
      this.setComputerChoiceImage();
      this.initStatisticsMode();
    };
  }
}

export default Game;
