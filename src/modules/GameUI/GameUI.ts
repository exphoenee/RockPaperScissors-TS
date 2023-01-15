import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import gameType from "../../types/game.type";
import ruleType from "../../types/rule.type";

/* constants */
import dictionary, { dictionaryType } from "../../constants/dictionary";
import games from "../../constants/games";

/* utils */
import getThema from "../../utils/getThema";
import setThema from "../../utils/setThema";
import setLang from "../../utils/setLang";
import setStatMode from "../../utils/setStatMode";
import setGameMode from "../../utils/setGameMode";
import getGameMode from "../../utils/getGameMode";
import getLang from "../../utils/getLang";

/* enums */
import themas from "./constants/themas";

export type GameUIType = {
  user?: string;
  opponent?: string;
};

export default class GameUI {
  // private settings: Element;

  private app: Element;
  private user?: string;
  private opponent?: string;
  private modals: HTMLElement[];
  private loaderScreen: Element;
  private modalButtons: HTMLElement[];
  private closeButtons: HTMLElement[];
  private settings: Element;
  private settingsButton: Element;
  private languageButtons: Element[];
  private favicon: HTMLLinkElement;
  private statisticsMode: HTMLSelectElement;
  private gameMode: HTMLSelectElement;
  private userNameElem: Element;
  private opponentNameElem: Element;
  private opponentWins: Element;
  private userWins: Element;
  private mainTitle: Element;
  private startButton: Element;
  private nextButton: Element;
  private prevButton: Element;
  private themaButton: Element;
  private statisticsTable: Element;
  private resultContainer: Element;
  private userImages: HTMLImageElement[];
  private opponentImages: HTMLImageElement[];
  private dictionary: Element[];
  private themable: Element[];
  private selects: HTMLSelectElement[];

  private rules: gameType;
  private lang: string;
  private playing: string;
  private userChoice: number;
  private opponentChoice: number;
  private freezeUI: boolean = false;

  constructor() {
    this.playing = getGameMode();

    this.rules =
      games.find((game) => game.name === this.playing)?.rules || games[0].rules;

    console.log(this.rules);

    this.lang = getLang();

    this.userChoice = 0;
    this.opponentChoice = 0;

    this.creaeUI();

    this.app = document.querySelector("#app") as Element;
    this.modals = Array.from(document.querySelectorAll(".modal"));
    this.modalButtons = Array.from(document.querySelectorAll(".modal-button"));
    this.closeButtons = Array.from(document.querySelectorAll(".close-button"));
    this.loaderScreen = document.querySelector("#loader-screen") as Element;
    this.settings = document.querySelector("#settings") as Element;
    this.settingsButton = document.querySelector(".settings.button") as Element;
    this.languageButtons = Array.from(
      document.querySelectorAll(".language-button")
    );
    this.favicon = document.querySelector("#favicon") as HTMLLinkElement;
    this.statisticsMode = document.querySelector(
      "#statistics-mode"
    ) as HTMLSelectElement;
    this.gameMode = document.querySelector("#game-mode") as HTMLSelectElement;
    this.userNameElem = document.querySelector("#user-name") as Element;
    this.opponentNameElem = document.querySelector("#opponent-name") as Element;
    this.userWins = document.querySelector("#user-wins") as Element;
    this.opponentWins = document.querySelector("#opponent-wins") as Element;
    this.mainTitle = document.querySelector("#main-title") as Element;
    this.startButton = document.querySelector("#start-button") as Element;
    this.nextButton = document.querySelector("#next-button") as Element;
    this.prevButton = document.querySelector("#prev-button") as Element;
    this.themaButton = document.querySelector("#thema-button") as Element;
    this.statisticsTable = document.querySelector(
      "#statistics-table"
    ) as Element;
    this.resultContainer = document.querySelector(
      "#result-container"
    ) as Element;
    this.userImages = Array.from(
      document.querySelectorAll(".image.user")
    ) as HTMLImageElement[];
    this.opponentImages = Array.from(
      document.querySelectorAll(".image.opponent")
    ) as HTMLImageElement[];
    this.dictionary = Array.from(
      document.querySelectorAll("[data-dictionary]")
    ) as Element[];
    this.selects = Array.from(
      document.querySelectorAll("select")
    ) as HTMLSelectElement[];
    this.themable = [
      ...Array.from(document.querySelectorAll("[data-themable]")),
      document.body,
      this.app,
      ...this.modals,
      ...this.selects,
      this.settings as HTMLElement,
    ] as Element[];

    this.initialize();
  }

  private creaeUI = () => {
    domelemjs(loaderScreenMap);
    domelemjs(settingsMap);
    domelemjs(appMap());
  };

  public setUserWins(value: number) {
    this.userWins.textContent = String(value);
  }

  public setOpponentWins(value: number) {
    this.opponentWins.textContent = String(value);
  }

  public setUserName(name: string) {
    this.userNameElem.textContent = name;
  }

  public setOpponentName(name: string) {
    this.opponentNameElem.textContent = name;
  }

  private initialize = () => {
    this.initSettings();
    this.initModals();
    this.initLangButtons();
    this.initTheming();
    this.initStatistics();
    this.initGameButtons();
    this.initTitleChange();
    this.initPlayersChoices();
    this.initPlayersName();
    this.initScores();
    window.onload = () => this.loaderScreen.remove();
  };

  private initPlayersChoices() {
    this.stepImage("user", this.userChoice);
    this.stepImage("opponent", this.opponentChoice);
  }

  private initScores() {
    this.setUserWins(0);
    this.setOpponentWins(0);
  }

  private initPlayersName() {
    this.setUserName("You");
    this.setOpponentName("Computer");
  }

  /* Fancy title and favicon change */
  private initTitleChange() {
    setInterval(() => {
      const choice: ruleType =
        this.rules[Math.floor(Math.random() * this.rules.length)];

      console.log(choice instanceof ruleType);

      console.log(choice);

      if (choice?.value) {
        const choiceName =
          dictionary[this.lang as keyof dictionaryType][choice.value as string];

        document.title =
          choiceName[0].toUpperCase() + choiceName.substring(1) + "!";

        fetch(window.location.href + "/media/" + choice.image)
          .then((res) => res.blob())
          .then((blob) => {
            this.favicon.href = URL.createObjectURL(blob);
          });
      }
    }, 1000);
  }

  /* Settings menu */
  private toggleMenuOpen = () => {
    this.settings.classList.toggle("closed");
  };

  private initSettings = () => {
    this.settingsButton.addEventListener("click", () => {
      this.toggleMenuOpen();
    });
  };

  /* Modals */
  private initModals = () => {
    this.modalButtons.forEach((elem) =>
      elem.addEventListener("click", () => {
        this.modals.forEach((modal) => {
          modal.id === (elem.getAttribute("data-target") as string)
            ? modal.classList.toggle("show")
            : modal.classList.remove("show");
        });
      })
    );

    this.closeButtons.forEach((elem) =>
      elem.addEventListener("click", () =>
        this.modals.forEach((modal) => modal.classList.remove("show"))
      )
    );
  };

  /* Language update */
  private generateTitle() {
    return this.rules
      .map(
        (threw: ruleType) =>
          dictionary[this.lang as keyof typeof dictionary][threw.value]
      )
      .join(", ");
  }

  private updateTitle = () => {
    this.mainTitle.innerHTML = this.generateTitle();
  };

  private updateLang = () => {
    const otherElse = (elem: HTMLElement) => {
      const key = elem.getAttribute("data-dictionary") as string;
      elem.innerHTML = dictionary[this.lang as keyof typeof dictionary][key];
      console.log(dictionary[this.lang as keyof typeof dictionary][key]);
    };

    this.dictionary.forEach((elem) => {
      elem.id === "main-title"
        ? this.updateTitle()
        : otherElse(elem as HTMLElement);
    });
  };

  /* Language settings */
  private initLangButtons = () => {
    this.languageButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        console.log(elem);
        const lang = elem.getAttribute("data-lang") as string;
        setLang(lang);
        this.updateLang();
      });
    });
  };

  /* Theming */
  private setUIThema(newThema: string) {
    setThema(newThema);

    Array.from(this.themaButton.children).forEach((elem) => {
      ["on", "off"].forEach((className) => elem.classList.toggle(className));
    });

    const themaNames = Object.values(themas).filter(
      (name) => name !== newThema
    );

    this.themable.forEach((elem) => {
      themaNames.forEach((name) => elem.classList.remove(name));
      elem.classList.add(newThema);
    });
  }

  private initTheming = () => {
    this.setUIThema(getThema());

    this.themaButton.addEventListener("click", () => {
      const thema = getThema();
      const themaDate = Object.entries(themas);
      const nrOfTemas = themaDate.length;

      const themaIndex = themaDate.findIndex(([_, value]) => value === thema);
      const newThemaId = themaDate[(themaIndex + 1) % nrOfTemas];
      const newThema: string = themas[
        newThemaId[0] as keyof typeof themas
      ] as string;

      this.setUIThema(newThema);
    });
  };

  /* Statistics */
  private initStatistics = () => {
    this.statisticsMode.addEventListener("change", () => {
      setStatMode(this.statisticsMode.value);
    });

    this.gameMode.addEventListener("change", () => {
      setGameMode(this.gameMode.value);
    });
  };

  /* Game */
  private startGame = () => {
    const possibilties = this.rules.length;
    const choose = Math.floor(Math.random() * possibilties);
    const animSteps = Math.floor(Math.random() * 7) + 8;

    let anim = new Array(animSteps).fill(0);
    let prevNumber = -1;
    for (let i = 0; i < animSteps; i++) {
      let nextNumber = Math.floor(Math.random() * possibilties);
      while (nextNumber === prevNumber) {
        nextNumber = Math.floor(Math.random() * possibilties);
      }
      prevNumber = nextNumber;
      anim[i] = nextNumber;
    }
    anim.push(choose);

    let delay = 200;
    for (let i = 0; i < anim.length; i++) {
      console.log(delay);
      setTimeout(() => this.stepImage("opponent", anim[i]), delay);
      delay *= 1.3;
    }
  };

  private stepImage = (user: "user" | "opponent", next: number) => {
    const images = user === "user" ? this.userImages : this.opponentImages;
    const current = this.userChoice;

    images[current].classList.add("hidden");
    images[current].classList.remove("showen");
    images[next].classList.add("showen");
    images[next].classList.remove("hidden");

    this.userChoice = next;
  };

  private calculateIndex = (index: number, direction: "next" | "prev") => {
    const allImages = this.rules.length;

    return direction === "next"
      ? (index + 1) % allImages
      : (index - 1 + allImages) % allImages;
  };

  private initGameButtons = () => {
    this.startButton.addEventListener(
      "click",
      () => !this.freezeUI && this.startGame()
    );

    this.nextButton.addEventListener(
      "click",
      () =>
        !this.freezeUI &&
        this.stepImage("user", this.calculateIndex(this.userChoice, "next"))
    );

    this.prevButton.addEventListener(
      "click",
      () =>
        !this.freezeUI &&
        this.stepImage("user", this.calculateIndex(this.userChoice, "prev"))
    );
  };
}
