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
  { name: "statisticsInput", id: "statistics-input" },
  { name: "userName", id: "user-name" },
  { name: "opponentName", id: "opponent-name" },
  { name: "opponentWins", class: ".opponent-wins" },
  { name: "mainTitle", id: "main-title" },
  { name: "startButton", class: ".start.button" },
  { name: "nextButton", class: ".next.button" },
  { name: "prevButton", class: ".prev.button" },
  { name: "themaButton", class: ".thema.button" },
  { name: "rulesModal", class: ".rules.modal" },
  { name: "resultModal", class: ".result.modal" },
  { name: "languageModal", class: ".language.modal" },
  { name: "statisticsModal", class: ".statistics.modal" },
  { name: "licensingModal", class: ".licensing.modal" },
  { name: "statisticsTable", class: ".table-container" },
  { name: "resultContainer", class: ".result-container" },
  { name: "userWins", class: ".user-wins" },
  { name: "resultCounter", class: ".counter" },
  { name: "allModals", classes: ".modal" },
  { name: "allCloseButtons", classes: ".close-button" },
  { name: "user", classes: ".images.user" },
  { name: "opponentImages", classes: ".images.opponent" },
];

export default appElements;
