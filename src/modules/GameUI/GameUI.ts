import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";
import resultMap from "./components/common/modal/resultMap";

/* types */
import ruleType from "../../types/ruleType";
import { stateType } from "../StateHandler/StateHandler";
import { resultMapType } from "./components/common/modal/resultMap";

/* constants */
import dictionary, { dictionaryType } from "../../constants/dictionary";
import StateHandler from "../StateHandler/StateHandler";

/* enums */
import { gameNames } from "../../constants/gameNames";
import { gameImages } from "./components/app/gameArea/playerContainer/playerImageContainer";
import { statCalcModes } from "../../constants/statCalcModes";
import { userNames } from "../../constants/userNames";
import { directions } from "../../constants/directions";
import { themas } from "../../constants/themas";
import modalNames from "./constants/modalNames";

/* style */
import "../../style/reset.css";
import "../../style/style.css";

export type GameUIType = {
  rules: ruleType[];
  stateHandler: StateHandler;
};

export default class GameUI {
  // private settings: Element;

  private stateHandler: StateHandler;
  private state: stateType;
  private app: Element;
  private modals: Element[];
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
  private flashlight: HTMLElement;

  private userChoice: number;
  private opponentChoice: number;
  private gameButtons: HTMLButtonElement[];

  private mouseX: number = 0;
  private mouseY: number = 0;

  private isUIFreezed: boolean = false;

  public setStatCalcMode: (mode: statCalcModes) => void = () => {
    throw new Error("The setStatCalcMode is not defined");
  };

  public setStatGameMode: (mode: gameNames) => void = () => {
    throw new Error("The setStatGameMode is not defined");
  };

  public setChoice: (isUserCoiceSet: boolean) => void = () => {
    throw new Error("The setChoice is not defined");
  };
  public changeChoice: (user: userNames, direction: directions) => number =
    () => {
      throw new Error("The choiceChange is not defined");
    };

  public setGameMode: () => void = () => {
    throw new Error("The setGameMode is not defined");
  };

  public setLanguage: (lang: string) => void = () => {
    throw new Error("The setLanguage is not defined");
  };
  private static instance: GameUI;

  public static getInstance({ rules, stateHandler }: GameUIType): GameUI {
    if (!this.instance) {
      this.instance = new GameUI({ rules, stateHandler });
    }
    return this.instance;
  }

  private constructor({ rules, stateHandler }: GameUIType) {
    this.userChoice = 0;
    this.opponentChoice = 0;

    this.stateHandler = stateHandler;
    this.state = stateHandler.state;

    this.createUI({ rules });

    this.app = document.querySelector("#rps-ui") as Element;
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
    this.flashlight = document.querySelector("#flashlight") as HTMLElement;

    this.initialize({ rules, lang: this.state.language });
  }

  private createUI = ({ rules }: { rules: ruleType[] }) => {
    domelemjs(loaderScreenMap);
    domelemjs(settingsMap);
    domelemjs(appMap({ rules }));
  };

  // TODO: at initialization must the scores and the statistics table also set
  public updateStaisticsTable = (tableDate: (number | string)[][]) => {
    // statisticTableMap(tableDate)
    const { modalBody: statModalBody } = this.getModal(modalNames.STAT);

    if (statModalBody) {
      const tableContainer = statModalBody.querySelector("#table-container");
      if (tableContainer) {
        tableContainer.innerHTML = "";

        domelemjs({
          tag: "table",
          attrs: { class: "statistics-table" },
          parent: tableContainer,
          children: tableDate.map((row) => {
            return {
              tag: "tr",
              children: row.map((cell) => {
                return { tag: "td", text: cell };
              }),
            };
          }),
        });
      }
    }
  };

  public updateScore(userName: userNames, score: number): void {
    if (userName === userNames.USER) {
      this.userWins.textContent = score.toString();
    } else if (userName === userNames.OPPONENT) {
      this.opponentWins.textContent = score.toString();
    }
  }

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

  private initialize = ({
    rules,
    lang,
  }: {
    rules: ruleType[];
    lang: string;
  }) => {
    this.initSettings();
    this.initModals();
    this.initLangButtons();
    this.initTheming();
    this.initGameMode();
    this.initStatistics();
    this.initGameButtons();
    this.initTitleChange({ rules, lang });
    this.initPlayersChoices();
    this.initPlayersName();
    this.initScores();
    this.initFlaslight();
    window.onload = () => this.loaderScreen.remove();
  };

  private initFlaslight() {
    if (this.stateHandler.getThema() === themas.LIGHT) {
      this.flashlight.classList.add("off");
    }

    const isTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    const getMousePosition = (e: MouseEvent | TouchEvent) => {
      this.mouseX = !isTouchDevice()
        ? e instanceof MouseEvent
          ? e.pageX
          : e.touches[0].pageX
        : 0;
      this.mouseY = !isTouchDevice()
        ? e instanceof MouseEvent
          ? e.pageY
          : e.touches[0].pageY
        : 0;
      this.flashlight.style.setProperty("--Xpos", `${this.mouseX}px`);
      this.flashlight.style.setProperty("--Ypos", `${this.mouseY}px`);
    };

    document.addEventListener("mousemove", (e) => getMousePosition(e));
    document.addEventListener("touchmove", getMousePosition);
  }

  private initPlayersChoices() {
    // this.stepImage(userNames.USER this.userChoice);
    // this.stepImage(userNames.OPPONENT, this.opponentChoice);
  }

  private initScores() {
    this.setUserWins(0);
    this.setOpponentWins(0);
  }

  private initPlayersName() {
    this.setUserName("?");
    this.setOpponentName("?");
  }

  /* Fancy title and favicon change */
  private initTitleChange({
    rules,
    lang,
  }: {
    rules: ruleType[];
    lang: string;
  }) {
    setInterval(() => {
      const choice: ruleType = rules[Math.floor(Math.random() * rules.length)];

      if (choice?.value) {
        const choiceName =
          dictionary[lang as keyof dictionaryType][choice.value as string];

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
  private generateTitle({ rules, lang }: { rules: ruleType[]; lang: string }) {
    return rules
      .map(
        (threw: ruleType) =>
          dictionary[lang as keyof typeof dictionary][threw.value]
      )
      .join(", ");
  }

  private updateTitle = ({
    rules,
    lang,
  }: {
    rules: ruleType[];
    lang: string;
  }) => {
    this.mainTitle.innerHTML = this.generateTitle({ rules, lang });
  };

  public updateLang = ({
    rules,
    lang,
  }: {
    rules: ruleType[];
    lang: string;
  }) => {
    const otherElse = (elem: HTMLElement) => {
      const key = elem.getAttribute("data-dictionary") as string;
      elem.innerHTML = dictionary[lang as keyof typeof dictionary][key];
    };

    this.dictionary.forEach((elem) => {
      elem.id === "main-title"
        ? this.updateTitle({ rules, lang })
        : otherElse(elem as HTMLElement);
    });
  };

  /* Language settings */
  private initLangButtons = () => {
    this.languageButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        const lang = elem.getAttribute("data-lang") as string;
        this.setLanguage(lang);
      });
    });
  };

  /* Theming */
  private setUIThema(newThema: string) {
    this.stateHandler.setThema(newThema as themas);

    Array.from(this.themaButton.children).forEach((elem) => {
      if (elem.classList.contains(`${newThema}-img`)) {
        elem.classList.remove("off");
        elem.classList.add("on");
      } else {
        elem.classList.remove("on");
        elem.classList.add("off");
      }
    });

    const themaNames = Object.values(themas).filter(
      (name) => name !== newThema
    );

    this.themable.forEach((elem) => {
      themaNames.forEach((name) => elem.classList.remove(name));
      elem.classList.add(newThema);
    });

    newThema === "flashlight"
      ? this.flashlight.classList.remove("off")
      : this.flashlight.classList.add("off");
  }

  // TODO: Refactor this
  private initTheming = () => {
    const thema: themas = this.stateHandler.getThema();
    this.setUIThema(thema);

    this.themaButton.addEventListener("click", () => {
      const thema = this.stateHandler.getThema();
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

  /* gameMode */
  changeGameMode({ rules, lang }: { rules: ruleType[]; lang: string }) {
    Array.from(this.gameModeButton.children).forEach((elem) => {
      ["on", "off"].forEach((className) => elem.classList.toggle(className));
    });

    this.imageContainer.forEach((userContainer: HTMLElement) => {
      userContainer.classList.add("disabled");
      userContainer.addEventListener("transitionend", () =>
        userContainer.classList.remove("disabled")
      );

      const user = userContainer.getAttribute("data-user") as string;

      Array.from(userContainer.children).forEach((elem) => {
        elem.remove();
      });

      gameImages({ user, rules, parent: userContainer });

      user === userNames.USER &&
        ((this.userImages = Array.from(
          userContainer.children as HTMLCollectionOf<HTMLImageElement>
        )) as HTMLImageElement[]);
      user === userNames.OPPONENT &&
        ((this.opponentImages = Array.from(
          userContainer.children as HTMLCollectionOf<HTMLImageElement>
        )) as HTMLImageElement[]);
    });

    this.updateTitle({ rules, lang });
  }

  private initGameMode = () => {
    this.gameModeButton.addEventListener("click", () => this.setGameMode());
  };

  /* Statistics */
  private initStatistics = () => {
    this.statisticsMode.addEventListener("change", () => {
      this.setStatCalcMode(this.statisticsMode.value as statCalcModes);
    });

    this.gameMode.addEventListener("change", () => {
      this.setStatGameMode(this.gameMode.value as gameNames);
    });
  };

  /* Game */
  private unfreezeUICore = () => {
    this.isUIFreezed = false;
    this.gameButtons.forEach((elem) => {
      elem.classList.remove("disabled");
      elem.disabled = false;
    });
  };

  public unfreezeUI = () => {
    const to = setTimeout(() => {
      this.unfreezeUICore();
      clearTimeout(to);
    }, 500);
  };

  public freezeUI = () => {
    this.isUIFreezed = true;
    this.gameButtons.forEach((elem) => {
      elem.classList.add("disabled");
      elem.disabled = true;
    });
  };

  private getModal = (modalName: modalNames) => {
    const modal = this.modals.find((elem) => elem.id === modalName);
    const modalBody = modal?.querySelector(".modal-body");
    const modalHeader = modal?.querySelector(".modal-header");
    const modalFooter = modal?.querySelector(".modal-footer");
    return { modal, modalHeader, modalBody, modalFooter };
  };

  public showResult = (resultInfo: resultMapType) => {
    const { modal: resultModal, modalBody } = this.getModal(modalNames.RESULT);

    if (modalBody) {
      modalBody.innerHTML = resultMap(resultInfo);
      resultModal?.classList.add("show");
    }
  };

  public startComputerAnimation = (
    {
      choosen,
      rules,
    }: {
      choosen: number;
      rules: ruleType[];
    },
    callBack: () => void
  ) => {
    const possibilties = rules.length;
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
        this.setImage(userNames.OPPONENT, anim[i]);
        clearTimeout(to);
        if (i === anim.length - 1) {
          setTimeout(() => {
            callBack();
          }, 750);
        }
      }, delay);
      delay *= 1.15;
    }
  };

  private stepImage = (user: userNames, direction: directions) => {
    const newChoice = this.changeChoice(user, direction);
    this.setImage(user, newChoice);
  };

  private setImage = (user: userNames, index: number) => {
    const images =
      user === userNames.USER ? this.userImages : this.opponentImages;

    const changeClass = (elem: HTMLElement, action: "set" | "unset") => {
      elem.classList.add(action === "set" ? "showen" : "hidden");
      elem.classList.remove(action === "set" ? "hidden" : "showen");
    };

    images.forEach((elem, i) =>
      i === index ? changeClass(elem, "set") : changeClass(elem, "unset")
    );
  };

  /* GAME buttons */
  private initGameButtons = () => {
    this.startButton.addEventListener(
      "click",
      () => !this.isUIFreezed && this.setChoice(true)
    );

    this.nextButton.addEventListener(
      "click",
      () => !this.isUIFreezed && this.stepImage(userNames.USER, directions.NEXT)
    );

    this.prevButton.addEventListener(
      "click",
      () => !this.isUIFreezed && this.stepImage(userNames.USER, directions.PREV)
    );
  };
}
