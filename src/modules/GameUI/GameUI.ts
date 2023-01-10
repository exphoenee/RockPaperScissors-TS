import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import elemType from "../../types/elem.type";

/* constants */
import appElements, { appElementType } from "../../constants/appElements";

export type GameUIType = {
  user?: string;
  opponent?: string;
};

export default class GameUI {
  // public settings: Element;

  public elem: elemType;
  public user?: string;
  public opponent?: string;
  public modal: HTMLElement[];
  public loaderScreen: Element;
  public modalButtons: HTMLElement[];
  public settings: Element;
  public favicon: Element;
  public statisticsMode: Element;
  public gameMode: Element;
  public userName: Element;
  public opponentName: Element;
  public opponentWins: Element;
  public userWins: Element;
  public mainTitle: Element;
  public startButton: Element;
  public nextButton: Element;
  public prevButton: Element;
  public themaButton: Element;
  public statisticsTable: Element;
  public resultContainer: Element;
  public userImages: HTMLImageElement[];
  public opponentImages: HTMLImageElement[];

  constructor(props?: GameUIType) {
    this.user = props?.user || "user";
    this.opponent = props?.opponent || "opponent";
    this.elem = {} as elemType;
    this.modal = [] as HTMLElement[];
    this.loaderScreen = {} as Element;
    this.modalButtons = [] as HTMLElement[];
    this.settings = {} as Element;
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

    this.creaeUI();
    this.getDomELements();
    window.onload = () => this.loaderScreen.remove();
  }

  private creaeUI = () => {
    domelemjs(loaderScreenMap);
    domelemjs(settingsMap);
    domelemjs(appMap({ user: this.user, opponent: this.opponent }));
  };

  private getDomELements() {
    this.modal = Array.from(document.querySelectorAll(".modal"));
    this.modalButtons = Array.from(document.querySelectorAll(".modal-button"));
    this.loaderScreen = document.querySelector("#loader-screen") as Element;
    this.settings = document.querySelector("#settings") as Element;
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

    console.log(this.loaderScreen);
  }
}
