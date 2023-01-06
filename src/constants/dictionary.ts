export type dictionaryType = {
  en: {
    [key: string]: string;
  };
  de: {
    [key: string]: string;
  };
  hu: {
    [key: string]: string;
  };
};

const dictionary: dictionaryType = {
  en: {
    rock: "rock",
    paper: "paper",
    scissors: "scissors",
    lizard: "lizard",
    spock: "Spock",
    paperT: "paper",
    scissorsT: "scissors",
    lizardT: "lizard",
    spockT: "Spock",
    gameRules: "Game rules",
    rulesDesc:
      'Use the arrows to set your threw,<br />then click to "check" to start the game!',
    beats: "beats",
    and: "and",
    popupInstruction: "Click the popup to close it!",
    youThrew: "You threw",
    CPUThrew: "CPU threw",
    popupClosing: "Closing popup...",
    popupClosingIn: "Closing in",
    popupTimeout: "seconds",
    resultTie: "It's a tie!",
    resultPlayerWon: "You won!",
    resultOpponentWon: "Computer wins!",
    opponentName: "Computer",
    playerName: "Player",
    summary: "Summary",
    threws: "Threws",
    wins: "wins",
    error: "Error! You must select a valid option!",
  },
  de: {
    rock: "Stein",
    paper: "Papier",
    scissors: "Schere",
    lizard: "Echse",
    spock: "Spock",
    gameRules: "Spielregeln",
    paperT: "Papier",
    scissorsT: "Schere",
    lizardT: "Echse",
    spockT: "Spock",
    rulesDesc:
      'Benutze die Pfeile, um deinen Wurf einzustellen, <br /> dann klicke auf "Häkchen", um das Spiel zu starten!',
    beats: "schlägt",
    and: "und",
    popupInstruction: "Klick auf das Popup-Fenster, um zu schließen!",
    youThrew: "Du hast geworfen",
    CPUThrew: "Der Computer hat geworfen",
    popupClosing: "Das Popup wird geschlossen!",
    popupClosingIn: "Schließt in",
    popupTimeout: "Sekunden",
    resultTie: "Unentschieden!",
    resultPlayerWon: "Du hast gewonnen!",
    resultOpponentWon: "Der Computer hat gewonnen!",
    OpponentName: "Komputer",
    playerName: "Spieler",
    summary: "Insgesammt",
    threws: "geworfen",
    wins: "Gewinnt",
    error: "Fehler! Du musst eine gültige Option auswählen!",
  },
  hu: {
    rock: "kő",
    paper: "papír",
    scissors: "olló",
    lizard: "gyík",
    spock: "Spock",
    rockT: "követ",
    paperT: "papírt",
    scissorsT: "ollót",
    lizardT: "gyíkot",
    spockT: "Spockot",
    gameRules: "Játékszabályok",
    rulesDesc:
      'A nyilakkal a válaszd ki amit mutatni akarsz,<br />majd kattintson a "pipa" gombra a játék indításához!',
    beats: "üti",
    and: "és",
    popupInstruction: "Kattints a felugró ablakra a bezáráshoz!",
    youThrew: "Te mutattál",
    CPUThrew: "A CPU mutatott",
    popupClosing: "A felugró ablak bezárása...",
    popupClosingIn: "Bezáródik",
    popupTimeout: "másodperc múlva",
    resultTie: "Döntetlen!",
    resultPlayerWon: "Nyertél!",
    resultOpponentWon: "A CPU nyert!",
    OpponentName: "Számítógép",
    playerName: "Játékos",
    summary: "Összesen",
    threws: "Mutatott",
    wins: "Nyert",
    error: "Hiba! Érvénytelen választás!",
  },
};

export default dictionary;
