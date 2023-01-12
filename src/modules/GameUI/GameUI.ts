import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import elemType from "../../types/elem.type";

/* constants */
import dictionary from "../../constants/dictionary";
import appStates from "../../constants/appStates";

/* utils */
import getState from "../../utils/getState";
import getThema from "../../utils/getThema";
import setThema from "../../utils/setThema";
import setLang from "../../utils/setLang";
import setStatMode from "../../utils/setStatMode";
import setGameMode from "../../utils/setGameMode";
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
  private favicon: Element;
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
    this.favicon = {} as Element;
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
    this.favicon = document.querySelector("#favicon") as Element;
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
  };

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
        this.modals.forEach((modal) => modal.classList.remove("show"));
        this.modals
          .filter(
            (modal) => modal.id === (elem.getAttribute("data-target") as string)
          )[0]
          .classList.toggle("show");
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
      .map((threw: ruleType) => this.getTranslation(threw.value))
      .join(", ");
  }

  private updateLang = () => {
    const lang = getState(appStates.LANG);
    this.dictionary.forEach((elem) => {
      const key = elem.getAttribute("data-dictionary") as string;
      elem.innerHTML = dictionary[lang][key];
      console.log(dictionary[lang][key]);
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
      elem.classList.toggle("on");
      elem.classList.toggle("off");
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
