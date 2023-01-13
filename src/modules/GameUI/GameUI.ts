import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import elemType from "../../types/elem.type";

/* constants */
import dictionary, { dictionaryType } from "../../constants/dictionary";
import appStates from "../../constants/appStates";
import games from "../../constants/games";

/* utils */
import getState from "../../utils/getState";
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
  private userName: Element;
  private opponentName: Element;
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

  private rules: any; // TODO add type here
  private lang: string;
  private playing: string;

  constructor(props?: GameUIType) {
    this.app = {} as Element;
    this.user = props?.user || "user";
    this.opponent = props?.opponent || "opponent";
    this.modals = [] as HTMLElement[];
    this.modalButtons = [] as HTMLElement[];
    this.closeButtons = [] as HTMLElement[];
    this.loaderScreen = {} as Element;
    this.settings = {} as Element;
    this.settingsButton = {} as Element;
    this.languageButtons = [] as Element[];
    this.favicon = {} as HTMLLinkElement;
    this.statisticsMode = {} as HTMLSelectElement;
    this.gameMode = {} as HTMLSelectElement;
    this.userName = {} as Element;
    this.opponentName = {} as Element;
    this.opponentWins = {} as Element;
    this.userWins = {} as Element;
    this.mainTitle = {} as Element;
    this.startButton = {} as Element;
    this.nextButton = {} as Element;
    this.prevButton = {} as Element;
    this.themaButton = {} as Element;
    this.themable = [] as Element[];
    this.statisticsTable = {} as Element;
    this.resultContainer = {} as Element;
    this.userImages = [] as HTMLImageElement[];
    this.opponentImages = [] as HTMLImageElement[];
    this.dictionary = [{} as Element];
    this.selects = [] as HTMLSelectElement[];

    this.playing = getGameMode();

    this.rules =
      games.find((game) => game.name === this.playing)?.rules || games[0].rules;

    this.lang = getLang();

    this.creaeUI();
    this.getDomELements();
    this.initialize();
    window.onload = () => this.loaderScreen.remove();
  }

  private creaeUI = () => {
    domelemjs(loaderScreenMap);
    domelemjs(settingsMap);
    domelemjs(appMap({ user: this.user, opponent: this.opponent }));
  };

  private getDomELements() {
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
    this.userName = document.querySelector("#user-name") as Element;
    this.opponentName = document.querySelector("#opponent-name") as Element;
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
      document.querySelectorAll(".image-container.user")
    ) as HTMLImageElement[];
    this.opponentImages = Array.from(
      document.querySelectorAll(".image-container.opponent")
    ) as HTMLImageElement[];
    this.dictionary = Array.from(
      document.querySelectorAll("[data-dictionary]")
    ) as Element[];
    this.themable = Array.from(
      document.querySelectorAll("[data-themable]")
    ) as Element[];
    this.selects = Array.from(
      document.querySelectorAll("select")
    ) as HTMLSelectElement[];
    this.themable.push(
      document.body,
      this.app,
      ...this.modals,
      ...this.selects,
      this.settings as HTMLElement
    );
  }

  private initialize = () => {
    this.initSettings();
    this.initModals();
    this.initLangButtons();
    this.initTheming();
    this.initStatistics();
    this.initGameButtons();
    this.initTitleChange();
  };

  /* Fancy title and favicon change */
  private initTitleChange() {
    setInterval(() => {
      const choice = this.rules[Math.floor(Math.random() * this.rules.length)];

      const choiceName =
        dictionary[this.lang as keyof dictionaryType][choice.value];

      document.title =
        choiceName[0].toUpperCase() + choiceName.substring(1) + "!";

      fetch(window.location.href + "/media/" + choice.image)
        .then((res) => res.blob())
        .then((blob) => {
          this.favicon.href = URL.createObjectURL(blob);
        });
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

  /* Language */
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
      const newThema = themas[newThemaId[0]] as string;

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
    console.log("gameStarted");
  };

  private stepImage = (direction: "next" | "prev") => {
    console.log(direction);
  };

  private initGameButtons = () => {
    this.startButton.addEventListener("click", () => {
      this.startGame();
    });

    this.nextButton.addEventListener("click", () => {
      this.stepImage("next");
    });

    this.prevButton.addEventListener("click", () => {
      this.stepImage("prev");
    });
  };
}
