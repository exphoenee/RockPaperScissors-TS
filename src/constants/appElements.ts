export type appElementType = {
  name: string;
  id?: string;
  class?: string;
  classes?: string;
};

const appElements: appElementType[] = [
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
  { name: "themaButton", class: ".thema.button" },
  { name: "rulesModal", class: ".rules.modal" },
  { name: "resultModal", class: ".result.modal" },
  { name: "languageModal", class: ".language.modal" },
  { name: "statisticsModal", class: ".statistics.modal" },
  { name: "licensingModal", class: ".licensing.modal" },
  { name: "statisticsClose", class: ".statistics.closeButton" },
  { name: "rulesClose", class: ".rules.closeButton" },
  { name: "languageClose", class: ".language.closeButton" },
  { name: "resultClose", class: ".result.closeButton" },
  { name: "licensingClose", class: ".licensing.closeButton" },
  { name: "resultClose", class: ".result.closeButton" },
  { name: "statisticsTable", class: ".table-container" },
  { name: "statisticsInput", id: "statistics-input" },
  { name: "resultContainer", class: ".result-container" },
  { name: "resultCounter", class: ".counter" },
  { name: "playerName", id: "player-name" },
  { name: "opponentName", id: "computer-name" },
  { name: "opponentWins", class: ".computer-wins" },
  { name: "userWins", class: ".user-wins" },
  { name: "mainTitle", class: "#main-title" },
  { name: "allModals", classes: ".modal" },
  { name: "langChange", classes: ".language-button" },
  { name: "allCloseButtons", classes: ".closeButton" },
  { name: "playerImages", classes: ".images.player" },
  { name: "computerImages", classes: ".images.computer" },
];

export default appElements;
