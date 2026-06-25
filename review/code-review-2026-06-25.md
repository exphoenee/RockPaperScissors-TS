# Kódreview – RockPaperScissors-TS

**Dátum:** 2026-06-25
**Reviewer:** Claude (Opus 4.8)
**Hatókör:** teljes `src/` (≈2540 sor TS), build-konfiguráció, függőségek
**Branch:** `main`

---

## Összefoglaló

A projekt egy jól tagolt, moduláris kő-papír-olló játék (Controller / UI / State / Statistics szétválasztás, deklaratív DOM-leíró „map" komponensek). Az architektúra alapvetően egészséges, de jelenleg **nem fordul le típushelyesen** (`tsc` 28 hibát jelez), és több **futásidejű hibát** is okozott a `domelemjs` v2-re frissítés. A legtöbb probléma típusbiztonsági lazaság (`as` castok elrejtik a valódi típushibákat), nem pedig logikai hiba.

**Állapot:** 🟢 **JAVÍTVA** – `tsc` 0 hiba, `vitest` zöld, `npm run build` sikeres (`dist/` legenerálva). A korábbi 28 `tsc` hiba mind elhárítva.

> **Frissítés (2026-06-25):** Az összes 🔴 blokkoló és a build-et érintő 🟠/🟡 pont javítva. A megmaradt 🟠/🟡 pontok (titkosítás-átnevezés, singleton-szemantika, enum-használat, tesztlefedettség) tervezési jellegűek, a build nem múlik rajtuk.

| Súlyosság | Darab | Terület | Állapot |
|-----------|-------|---------|---------|
| 🔴 Blokkoló | 4 | build-config, hiányzó modul, típushibák | ✅ mind javítva |
| 🟠 Fontos | 6 | típusbiztonság, „titkosítás", singleton | ✅ 3 javítva, 3 megfontolandó |
| 🟡 Javasolt | 7 | dead code, console.log, formázás, tesztek | ✅ 4 javítva, 3 megfontolandó |

---

## 🔴 Blokkoló problémák

### 1. `tsconfig.json` – eltávolított `moduleResolution` ✅ JAVÍTVA
A TypeScript 6 eltávolította a `node10` (`"Node"`) feloldási stratégiát. Vite-projektnél a helyes érték `"bundler"`, ami a `package.json` `exports` mezőt is helyesen kezeli (ez kell a `domelemjs` named exportjához).
**Javítva:** `"moduleResolution": "Node"` → `"bundler"`.

### 2. Hiányzó modul: `gameResultType` ✅ JAVÍTVA
[StatisticsHandler.ts:8](../src/modules/StatisticsHandler/StatisticsHandler.ts#L8)
**Javítva:** a nem létező `gameResultType` és a nem használt `threwStatisticsType` importok törölve.
```ts
import { gameResultType } from "../../types/gameResultType"; // a fájl nem létezik
```
A `src/types/gameResultType.ts` nincs meg → `TS2307`. Ráadásul a `gameResultType` és a `threwStatisticsType` import **nincs is használva**. → Töröld az importokat (vagy hozd létre a hiányzó típust, ha kell).

### 3. `StatisticsHandler` típushibák (16 db) ✅ JAVÍTVA
**Javítva:** a getter típusa `userStatisticsType[] | null` lett (41. és 108. sor) → a 16 követő hiba megszűnt.

A két fő getter rosszul van típusozva — a `statistics` egy **tömb** (`userStatisticsType[]`), de a kód `userStatisticsType | null`-ként kezeli:

[StatisticsHandler.ts:41](../src/modules/StatisticsHandler/StatisticsHandler.ts#L41) és [:108](../src/modules/StatisticsHandler/StatisticsHandler.ts#L108)
```ts
const gameStatistics: userStatisticsType | null =   // ❌ valójában userStatisticsType[]
  this.getGameStatistics(gameName)?.statistics || null;
```
Emiatt a `.reduce` / `.find` „nem létezik" hibákat dob, és a callback-paraméterek `implicit any`-k lesznek. **Javítás:** a típus legyen `userStatisticsType[] | null`. Ez egyetlen sor két helyen, és a többi 14 követő hiba magától megszűnik.

### 4. Konstruktor hibás cast ✅ JAVÍTVA
**Javítva:** a paraméter `gameStatisticsType[]` lett, a felesleges `as` cast törölve.

[StatisticsHandler.ts:14-16](../src/modules/StatisticsHandler/StatisticsHandler.ts#L14-L16)
```ts
constructor(statistics?: gameStatisticsType) {        // ❌ egyetlen objektum
  if (statistics) this.statistics = statistics as gameStatisticsType; // mező típusa tömb
}
```
A `statistics` mező `gameStatisticsType[]`, a paraméter viszont egyetlen `gameStatisticsType`. A `as` cast elnyomja a hibát, de a valóságban tömböt várunk. **Javítás:** a paraméter legyen `gameStatisticsType[]`, és a cast törölhető.

---

## 🟠 Fontos problémák

### 5. `domelemjs` v2 breaking change – `children` normalizálás ✅ JAVÍTVA
A v2 már **nem** csomagolja tömbbé az egyetlen gyermeket (`for...of` közvetlenül az `children`-en) → `e is not iterable`. Több helyen egyetlen objektum/elem volt átadva. Javított fájlok:
`buttonMap.ts`, `headerMap.ts`, `vsImageContainer.ts`, `rulesModal.ts`, `licensingModal.ts`, `statisticsModal.ts`, `modalBodyMap.ts`, `generateResultBody.ts`.

> **Megfontolandó:** mivel a `domelemjs` a te könyvtárad (exphoenee/DOMelemJS), érdemes a könyvtárban visszaállítani a `children` normalizálását — akkor a jövőben egyetlen gyermek átadása sem törne el, és ez a breaking change visszafelé kompatibilissé válna.

### 6. `imageMap` rossz visszatérési típus ✅ JAVÍTVA
[imageMap.ts:21,36](../src/modules/GameUI/components/common/imageMap.ts#L36)
A `createDOMElem` `HTMLElement`-et ad vissza, de a kód `img.src`-t ír (`TS2339`). Emellett az `attrs` objektumban `id`/`dataset` lehet `undefined`, amit a v2 szigorúbb `AttrsInput` típusa nem enged.
**Javítva:** `as HTMLImageElement` cast + az `id`/`dataset` feltételes spread-del (`...(id && { id })`), így nincs `undefined` érték az `attrs`-ban. Ugyanez a minta a `buttonMap.ts`-ben is.

### 7. A „titkosítás" valójában obfuszkáció, és félrevezető ⏳ RÉSZBEN
[StateHandler.ts:132-146](../src/modules/StateHandler/StateHandler.ts#L132-L146)
A `secretKey = 512` karaktereltolás triviálisan visszafejthető, és nem nyújt biztonságot — ha ez szándékos játék-állapot „rejtés", jó, de érdemes átnevezni (`obfuscate`/`deobfuscate`), nehogy biztonsági garanciának tűnjön.
**Megjegyzés:** a „dupla szerializálás" valójában **teherviselő** — az `encodeState` a JSON quote-jait (char 34) `Ǟ`-ra kódolja, a `decodeState` `replaceAll("Ǟ","")`-je pedig pont a wrapper-quote-ot távolítja el. A megváltoztatása törné a már elmentett állapotokat, ezért **szándékosan érintetlen**. Az átnevezés (`encrypt`→`obfuscate`) tervezési döntés — **megfontolandó**.

### 8. `GameUI` singleton dobós minta ⏳ MEGFONTOLANDÓ
[GameUI.ts:109-115](../src/modules/GameUI/GameUI.ts#L109-L115)
A `getInstance` **kivételt dob**, ha már létezik példány, ahelyett hogy a meglévőt adná vissza — ez nem a szokásos singleton-szemantika és könnyen váratlan crasht okoz (pl. hot reload, teszt). Javasolt: ha létezik, add vissza a meglévőt.

### 9. Publikus, felülírható callback-mezők (törékeny csatolás) ⏳ MEGFONTOLANDÓ
[GameController.ts:76-82](../src/modules/GameController.ts#L76-L82)
A `GameController` futásidőben írja a `gameUI.setChoice`, `changeChoice`, `setGameMode` stb. publikus mezőit. Ez működik, de típus- és életciklus-szempontból törékeny (a default impl. `throw`-ol, amíg be nem kötik). Tisztább lenne a callbackeket konstruktor-paraméterként vagy egy `bindHandlers({...})` metódussal átadni.

### 10. Spec típushiba – a tesztek nem fordulnak ✅ JAVÍTVA
[StatisticsHandler.spec.ts:13](../src/modules/StatisticsHandler/__tests__/StatisticsHandler.spec.ts#L13)
**Javítva:** az `addScore` `timeDate` mezője opcionális lett (`timeDate?: string | false`), így a teszt fordul és lefut (`vitest run` → 1 passed).

---

## 🟡 Javasolt fejlesztések

### 11. Felhasználatlan változók (`noUnusedLocals` be van kapcsolva) ✅ JAVÍTVA
- [GameUI.ts:65-76](../src/modules/GameUI/GameUI.ts#L65) – `statisticsTable`, `resultContainer`, `userChoice`, `opponentChoice` mezők és értékadásaik törölve.
- [menuButtonsMap.ts:3](../src/modules/GameUI/components/settings/components/menuButtonsMap.ts#L3) – `flashlight` import törölve.
- `StatisticsHandler.ts` – `threwStatisticsType`, `gameResultType` import törölve; a `statisticMode` paraméter `_statisticMode`-ra átnevezve (signature megmarad).

### 12. Otthagyott debug / dead code ✅ RÉSZBEN
- [StateHandler.ts:37](../src/modules/StateHandler/StateHandler.ts#L37) – `console.log(this.state)` **törölve**.
- ⏳ [imageMap.ts](../src/modules/GameUI/components/common/imageMap.ts) és `loaderImageMap.ts` – kikommentezett `class` sorok (kozmetikai, megmaradt).

### 13. Magyar nyelvű / odavetett TODO kommentek ⏳ MEGFONTOLANDÓ
- [StatisticsHandler.ts:19](../src/modules/StatisticsHandler/StatisticsHandler.ts#L19) – „itt ne csak így bebeszkodva legyen"
- [StatisticsHandler.ts:39](../src/modules/StatisticsHandler/StatisticsHandler.ts#L39) – „add here the enums not the strings"
Érdemes egységes (angol) kommentstílusra váltani és a TODO-kat issue-ba emelni.

### 14. „Stringly-typed" enumok ⏳ MEGFONTOLANDÓ
Több helyen string literálok mennek enum helyett (`gameName = "Classic"`, `statisticMode = "value"` default a [StatisticsHandler.ts:40](../src/modules/StatisticsHandler/StatisticsHandler.ts#L40)-ben). A `gameNames` / `statCalcModes` enumok használata kiküszöbölné a `toUpperCase()`-es összehasonlítgatást ([:35](../src/modules/StatisticsHandler/StatisticsHandler.ts#L35), [:53](../src/modules/StatisticsHandler/StatisticsHandler.ts#L53)).

### 15. Behúzási hibák ⏳ MEGFONTOLANDÓ
[GameController.ts:99](../src/modules/GameController.ts#L99) és [:239](../src/modules/GameController.ts#L239) – elcsúszott indentálás. Egy Prettier-futás rendbe tenné; megfontolandó pre-commit hook.

### 16. Tesztlefedettség ⏳ MEGFONTOLANDÓ
Mindössze egy spec fájl van (`StatisticsHandler`), és az sem fordul. A `StateHandler` kódolás/dekódolás (round-trip), a `GameController.evaluateGame` győztes-logika és a `getTable` aggregáció jó, tiszta egységteszt-jelöltek.

### 17. Függőség-verziók ellenőrzése
[package.json](../package.json): `typescript ^6.0.3`, `vite ^8.1.0`, `vitest ^4.1.9` – szokatlanul magas major verziók. Ha ezek szándékosak, jó; ha nem, érdemes ellenőrizni, hogy nem egy elgépelt/jövőbeli verzió került-e be (a `tsc` viselkedés ezzel konzisztens, de a CI-reprodukálhatóság miatt érdemes lockolni).

---

## Pozitívumok 👍

- Tiszta réteg-szeparáció: `GameController` (logika) ↔ `GameUI` (nézet) ↔ `StateHandler` (perzisztencia) ↔ `StatisticsHandler` (statisztika).
- Deklaratív, újrafelhasználható DOM-„map" komponensek, jól tükrözik a DOM-fát.
- `getChoice` védő index-ellenőrzéssel ([GameController.ts:252](../src/modules/GameController.ts#L252)).
- `StateHandler.checkState` séma-validáció a localStorage visszatöltésekor – jó defenzív minta.
- Enum- és konstans-alapú konfiguráció (`gameNames`, `directions`, `themas` stb.).

---

## Javasolt sorrend a kijavításhoz

1. **Build helyreállítása** (🔴): hiányzó import törlése (#2), `StatisticsHandler` típusok (#3, #4), `imageMap` cast (#6) → ezekkel a `tsc` zöldre vált.
2. **Tesztek** (#10) javítása, hogy a `vitest` fusson.
3. **Takarítás** (🟡): unused vars, `console.log`, formázás (Prettier).
4. **Megfontolás**: `domelemjs` könyvtár `children`-normalizálásának visszaállítása (#5), singleton-szemantika (#8).

> A 🔴 #1 (`tsconfig`) és a #5 (`domelemjs children`) ebben a session-ben már javítva lett.
