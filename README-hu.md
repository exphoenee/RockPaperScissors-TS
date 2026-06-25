# Kő, Papír, Olló, Gyík, Spock — TypeScript

> 🇬🇧 English description: [README.md](README.md)

**🌐 Élő demó: [bozzayviktor.hu/rpsls](https://bozzayviktor.hu/rpsls/)**

Böngészős Kő-Papír-Olló játék (és annak kibővített *Gyík–Spock* változata) **TypeScript**-ben, saját, deklaratív DOM-réteggel. Játssz a számítógép ellen, kövesd a győzelmeidet helyi, perzisztens statisztikával, válts nyelvet és témát — minden kliensoldalon, backend nélkül.

## Funkciók

- 🎮 **Két játékmód**
  - **Klasszikus** — Kő, Papír, Olló
  - **Big Bang Theory** — Kő, Papír, Olló, Gyík, Spock
- 🤖 **Egyjátékos** mód a gép ellen, pörgő választás-animációval
- 📊 **Helyi statisztika** — játékosonkénti és dobásonkénti győzelem-követés aggregált táblázattal, `localStorage`-ben tárolva
- 🌍 **Többnyelvű felület** — angol, német, magyar
- 🎨 **Témák** — világos, sötét és „zseblámpa" mód
- 💾 **Obfuszkált állapot-perzisztencia** — a játékállapot a `localStorage`-ben tárolódik (obfuszkálva, *nem* titkosítva), és betöltéskor sémaellenőrzésen megy át
- ⚡ **Nulla futásidejű függőség** a deklaratív DOM-építéshez használt [`domelemjs`](https://github.com/exphoenee/DOMelemJS)-en kívül

## Technológiai stack

| Terület | Eszköz |
|---------|--------|
| Nyelv | TypeScript |
| Build / dev szerver | [Vite](https://vitejs.dev/) |
| Tesztek | [Vitest](https://vitest.dev/) |
| DOM renderelés | [domelemjs](https://github.com/exphoenee/DOMelemJS) |
| CI | GitHub Actions |

## Első lépések

### Előfeltételek

- Node.js 20+
- npm

### Telepítés és futtatás

```bash
npm install      # függőségek telepítése
npm run dev      # Vite dev szerver indítása
```

Ezután nyisd meg a terminálban kiírt URL-t (alapértelmezés: `http://localhost:5173`).

### Elérhető parancsok

| Parancs | Leírás |
|---------|--------|
| `npm run dev` | Fejlesztői szerver indítása HMR-rel |
| `npm run build` | Típusellenőrzés (`tsc`) és produkciós build a `dist/` mappába |
| `npm run preview` | A produkciós build helyi előnézete |
| `npm test` | Egységtesztek futtatása Vitest-tel |

## Projektstruktúra

```
src/
├── main.ts                     # Belépési pont — elindítja a GameControllert
├── constants/                  # Enumok és statikus adatok (játékok, nyelvek, témák, szótár…)
├── types/                      # Megosztott TypeScript típusok
├── utils/                      # Kis segédfüggvények (enum-ellenőrzés, first-value, típusőrök)
└── modules/
    ├── GameController.ts        # Összehangolja a UI-t, az állapotot és a statisztikát; játéklogika
    ├── GameUI/                  # Nézeti réteg — deklaratív DOM „map" komponensek
    │   ├── GameUI.ts            # Singleton nézet-vezérlő
    │   └── components/          # appMap, modálok, beállítások, gameArea, közös elemek…
    ├── StateHandler/            # localStorage perzisztencia + sémaellenőrzés
    └── StatisticsHandler/       # Játékonkénti / játékosonkénti győzelem-aggregáció
```

### Architektúra dióhéjban

- A **`GameController`** tartalmazza a játéklogikát (győztes kiértékelése, gépi lépés), és összeköti a többi modult.
- A **`GameUI`** egy singleton nézeti réteg, amely kis, deklaratív *map* objektumokból épül fel; ezek a DOM-fát tükrözik, és `domelemjs`-en keresztül renderelődnek. A vezérlő callbackjei a `bindHandlers(...)` metóduson keresztül kötődnek be.
- A **`StateHandler`** a `localStorage`-be menti az állapotot (obfuszkálva), betöltéskor ellenőrzi a szerkezetét, és érvénytelen állapot esetén az alapértelmezettre esik vissza.
- A **`StatisticsHandler`** rögzít minden győzelmet, és aggregált statisztikai táblázatot állít elő.

## Tesztelés

```bash
npm test
```

Az egységtesztek a moduljuk mellett, `__tests__/` mappában találhatók (pl. `StatisticsHandler.spec.ts`), és a pontszám-aggregáció logikáját fedik le.

## Folyamatos integráció (CI)

A `main` ágra érkező minden push és pull request lefuttatja a [CI workflow](.github/workflows/ci.yml)-t: telepítés → típusellenőrzés → teszt → build, a produkciós `dist/` artifactként feltöltve.

## Licenc

[MIT licenc](LICENSE.md) alatt kiadva.

## Szerző

**Bozzay Viktor** — [webforsol.hu](https://www.webforsol.hu)
