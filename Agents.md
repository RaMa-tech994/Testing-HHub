# AI taisyklės – TASKSLIST

Asmeninė užduočių valdymo aplikacija (tik frontend). Prieš darydamas pakeitimus perskaityk `context.md`.

## Stack
- React 19 + Vite 8, JavaScript (`.jsx`), ESLint.
- Be mano sutikimo nepridėk naujų bibliotekų.
- Stiliai: grynas CSS (`index.css`, `App.css`, `Calendar.css`). Jokių CSS framework'ų.

## Struktūra
- `src/components/` – tik UI komponentai.
- `src/hooks/` – būsena ir verslo logika (`useTasks`, `usePeople`, `useToast`).
- `src/services/` – duomenų saugojimas (`taskRepository`). Komponentai ir hook'ai nekreipiasi į `localStorage` tiesiogiai.
- `src/utils/` – grynos pagalbinės funkcijos (pvz., `getTaskStats`).
- `src/constants.js` – statusai, prioritetai ir kitos konstantos. Nekartok jų kode kaip tekstų.

## Kodas
- Kintamųjų, funkcijų ir failų pavadinimai – anglų kalba.
- Visas vartotojui matomas tekstas – lietuvių kalba.
- Komponentai: funkciniai, vienas komponentas – vienas failas, `PascalCase.jsx`.
- Validacijos klaidas mesk kaip `Error` su lietuvišku tekstu; kviečiantis komponentas jas pagauna ir rodo (`Toast` arba forma).
- Datas rodyk formatu `DD.MM.YYYY`.

## Darbo būdas
- Keisk tik tai, ko prašau. Nerefaktorink nesusijusio kodo.
- Prieš keisdamas, perskaityk susijusius failus, nespėliok.
- Nelieski `dist/`, `node_modules/`, `package-lock.json`.
- Po pakeitimų paleisk `npm run lint` ir pataisyk klaidas.
- Jei užduotis neaiški arba reikia architektūrinio sprendimo, paklausk, o ne spėliok.

## context.md
- Pokalbio pabaigoje pateik atnaujintą `context.md` turinį: kas pakeista, nauji sprendimai, žinomos problemos, planai.
