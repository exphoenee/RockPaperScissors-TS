import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import ruleType from "../../types/ruleType";

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
import options from "./constants/themas";
import { gameNames } from "../../types/gameType";
import imageMap from "./components/common/imageMap";
import { gameImages } from "./components/app/gameArea/playerContainer/playerImageContainer";

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
  private startButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  private prevButton: HTMLButtonElement;
  private themaButton: HTMLButtonElement;
  private gameModeButton: HTMLButtonElement;
  private statisticsTable: Element;
  private resultContainer: Element;
  private userImages: HTMLImageElement[];
  private opponentImages: HTMLImageElement[];
  private imageContainer: HTMLElement[];
  private dictionary: Element[];
  private themable: Element[];
  private selects: HTMLSelectElement[];

  private rules: ruleType[];
  private userChoice: number;
  private opponentChoice: number;
  private gameButtons: HTMLButtonElement[];

  private isUIFreezed: boolean = false;

  constructor() {
    this.rules = this.getRules();

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
    this.startButton = document.querySelector(
      "#start-button"
    ) as HTMLButtonElement;
    this.nextButton = document.querySelector(
      "#next-button"
    ) as HTMLButtonElement;
    this.prevButton = document.querySelector(
      "#prev-button"
    ) as HTMLButtonElement;
    this.themaButton = document.querySelector(
      "#thema-button"
    ) as HTMLButtonElement;
    this.gameModeButton = document.querySelector(
      "#gamemode-button"
    ) as HTMLButtonElement;
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
    this.imageContainer = Array.from(
      document.querySelectorAll(".image-container")
    ) as HTMLElement[];
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
    this.gameButtons = [
      this.nextButton,
      this.prevButton,
      this.startButton,
    ] as HTMLButtonElement[];

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
    this.initGameMode();
    this.initStatistics();
    this.initGameButtons();
    this.initTitleChange();
    this.initPlayersChoices();
    this.initPlayersName();
    this.initScores();
    window.onload = () => this.loaderScreen.remove();
  };

  private getRules() {
    return (
      games.find((game) => game.name === getGameMode())?.rules || games[0].rules
    );
  }

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

      if (choice?.value) {
        const choiceName =
          dictionary[getLang() as keyof dictionaryType][choice.value as string];

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
    const lang = getLang();
    const rules = this.getRules();

    return rules
      .map(
        (threw: ruleType) =>
          dictionary[lang as keyof typeof dictionary][threw.value]
      )
      .join(", ");
  }

  private updateTitle = () => {
    this.mainTitle.innerHTML = this.generateTitle();
  };

  private updateLang = () => {
    const otherElse = (elem: HTMLElement) => {
      const key = elem.getAttribute("data-dictionary") as string;
      elem.innerHTML = dictionary[getLang() as keyof typeof dictionary][key];
      console.log(dictionary[getLang() as keyof typeof dictionary][key]);
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

    const themaNames = Object.values(options).filter(
      (name) => name !== newThema
    );

    this.themable.forEach((elem) => {
      themaNames.forEach((name) => elem.classList.remove(name));
      elem.classList.add(newThema);
    });
  }

  // TODO: Refactor this
  private initTheming = () => {
    this.setUIThema(getThema());

    this.themaButton.addEventListener("click", () => {
      const thema = getThema();
      const themaDate = Object.entries(options);
      const nrOfTemas = themaDate.length;

      const themaIndex = themaDate.findIndex(([_, value]) => value === thema);
      const newThemaId = themaDate[(themaIndex + 1) % nrOfTemas];
      const newThema: string = options[
        newThemaId[0] as keyof typeof options
      ] as string;

      console.log(newThema);

      this.setUIThema(newThema);
    });
  };

  /* gameMode */

  changeGameMode(newGameMode: string) {
    setGameMode(newGameMode);

    Array.from(this.gameModeButton.children).forEach((elem) => {
      ["on", "off"].forEach((className) => elem.classList.toggle(className));
    });

    this.imageContainer.forEach((userContainer) => {
      const user = userContainer.getAttribute("data-user") as string;

      userContainer.innerHTML = "";

      gameImages().map(({ alt, fileName }, i) => {
        return imageMap({
          className: [i > 0 ? "hidden" : "showen", user, "image"].join(" "),
          alt,
          fileName,
          id: alt,
          parent: userContainer,
        });
      });
      user === "user" &&
        ((this.userImages = Array.from(
          userContainer.children as HTMLCollectionOf<HTMLImageElement>
        )) as HTMLImageElement[]);
      user === "opponent" &&
        ((this.opponentImages = Array.from(
          userContainer.children as HTMLCollectionOf<HTMLImageElement>
        )) as HTMLImageElement[]);

      console.log(this.userImages);
    });

    this.updateTitle();
  }

  private initGameMode = () => {
    this.gameModeButton.addEventListener("click", () => {
      const gamemode = getGameMode();
      const gameDate = Object.entries(gameNames);
      const nrOfgameModes = gameDate.length;

      const gameModeIndex = gameDate.findIndex(
        ([_, value]) => value === gamemode
      );
      const newGameModeId = gameDate[(gameModeIndex + 1) % nrOfgameModes];
      const newGameMode: string = gameNames[
        newGameModeId[0] as keyof typeof gameNames
      ] as string;

      this.changeGameMode(newGameMode);
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
  private freezeUI = () => {
    this.isUIFreezed = true;
    this.gameButtons.forEach((elem) => {
      elem.classList.add("disabled");
      elem.disabled = true;
    });
  };

  private unfreezeUICore = () => {
    this.isUIFreezed = false;
    this.gameButtons.forEach((elem) => {
      elem.classList.remove("disabled");
      elem.disabled = false;
    });
  };

  private unfreezeUI = () => {
    const to = setTimeout(() => {
      this.unfreezeUICore();
      clearTimeout(to);
    }, 500);
  };

  private startGame = () => {
    this.freezeUI();

    const possibilties = this.rules.length;
    const choosen = Math.floor(Math.random() * possibilties);
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
    anim.push(choosen);

    let delay = 200;
    for (let i = 0; i < anim.length; i++) {
      const to = setTimeout(() => {
        this.stepImage("opponent", anim[i]);
        i === anim.length - 1 && this.unfreezeUI();
        clearTimeout(to);
      }, delay);
      delay *= 1.15;
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
    const allImages = games.length;

    return direction === "next"
      ? (index + 1) % allImages
      : (index - 1 + allImages) % allImages;
  };

  private initGameButtons = () => {
    this.startButton.addEventListener(
      "click",
      () => !this.isUIFreezed && this.startGame()
    );

    this.nextButton.addEventListener(
      "click",
      () =>
        !this.isUIFreezed &&
        this.stepImage("user", this.calculateIndex(this.userChoice, "next"))
    );

    this.prevButton.addEventListener(
      "click",
      () =>
        !this.isUIFreezed &&
        this.stepImage("user", this.calculateIndex(this.userChoice, "prev"))
    );
  };
}
