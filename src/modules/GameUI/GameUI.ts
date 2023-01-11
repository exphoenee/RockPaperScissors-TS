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
import setLang from "../../utils/setLang";

export type GameUIType = {
  user?: string;
  opponent?: string;
};

export default class GameUI {
  // private settings: Element;

  private elem: elemType;
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
  private statisticsMode: Element;
  private gameMode: Element;
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

  constructor(props?: GameUIType) {
    this.user = props?.user || "user";
    this.opponent = props?.opponent || "opponent";
    this.elem = {} as elemType;
    this.modals = [] as HTMLElement[];
    this.modalButtons = [] as HTMLElement[];
    this.closeButtons = [] as HTMLElement[];
    this.loaderScreen = {} as Element;
    this.settings = {} as Element;
    this.settingsButton = {} as Element;
    this.languageButtons = [] as Element[];
    this.favicon = {} as Element;
    this.statisticsMode = {} as Element;
    this.gameMode = {} as Element;
    this.userName = {} as Element;
    this.opponentName = {} as Element;
    this.opponentWins = {} as Element;
    this.userWins = {} as Element;
    this.mainTitle = {} as Element;
    this.startButton = {} as Element;
    this.nextButton = {} as Element;
    this.prevButton = {} as Element;
    this.themaButton = {} as Element;
    this.statisticsTable = {} as Element;
    this.resultContainer = {} as Element;
    this.userImages = [] as HTMLImageElement[];
    this.opponentImages = [] as HTMLImageElement[];
    this.dictionary = [{} as Element];

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
    this.statisticsMode = document.querySelector("#statistics-mode") as Element;
    this.gameMode = document.querySelector("#game-mode") as Element;
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
  }

  private initialize = () => {
    this.initSettings();
    this.initModals();
    this.initLangButtons();
  };

  private toggleMenuOpen = () => {
    this.settings.classList.toggle("closed");
  };

  private initSettings = () => {
    this.settingsButton.addEventListener("click", () => {
      this.toggleMenuOpen();
    });
  };

  private initModals = () => {
    this.modalButtons.forEach((elem) =>
      elem.addEventListener("click", () =>
        this.modals
          .filter(
            (modal) => modal.id === (elem.getAttribute("data-target") as string)
          )[0]
          .classList.toggle("show")
      )
    );
    this.closeButtons.forEach((elem) =>
      elem.addEventListener("click", () =>
        this.modals.forEach((modal) => modal.classList.remove("show"))
      )
    );
  };

  updateLang = () => {
    const lang = getState(appStates.LANG);
    this.dictionary.forEach((elem) => {
      const key = elem.getAttribute("data-dictionary") as string;
      elem.innerHTML = dictionary[lang][key];
      console.log(dictionary[lang][key]);
    });
  };

  initLangButtons = () => {
    this.languageButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        console.log(elem);
        const lang = elem.getAttribute("data-lang") as string;
        setLang(lang);
        this.updateLang();
      });
    });
  };
}
