# „Apžvalga“ puslapio MVP planas (užduotis Codex)

**Branch:** `New page - Apzvalga` (visi 5 žingsniai viename branch'e, po vieną commit'ą kiekvienam žingsniui)
**Projektas:** TASKSLIST, React 19 + Vite, frontend-only, sąsaja lietuvių kalba.

## 0. Prieš pradedant
1. Perskaityk `Agents.md` ir `context.md`, laikykis ten aprašytų taisyklių.
2. Perskaityk `src/constants.js`, `src/utils/taskHelpers.js` (`getTaskStats`), `src/hooks/useTasks.js`, `src/hooks/usePeople.js`, `src/App.jsx`, `src/components/StatsCards.jsx`, `src/components/Calendar.jsx` ir `Calendar.css`.
3. **Neišsigalvok konstantų.** Tikslias statuso ir prioriteto reikšmes (Nepradėta, Vykdoma, Atlikta, Pavėluota; Aukštas, Vidutinis, Žemas) paimk iš `constants.js`.
4. Apibrėžimą „užduotis vėluoja“ paimk iš `getTaskStats`, kad Apžvalgos skaičiai sutaptų su kortelėmis „Užduotys“ vaizde. Jei ten vėlavimas skaičiuojamas iš `dueDate` ir statuso, naudok tą pačią logiką (geriausia – išsikelti bendrą funkciją ir naudoti abiejose vietose).

## Ribos (kas NEįeina)
- Jokių naujų bibliotekų ir router'io.
- Jokių grafikų ir sąrašo „Reikia dėmesio“.
- Nekeisti užduoties modelio, `taskRepository` ir duomenų saugojimo.
- Kortelių paspaudimas su filtrų perjungimu į „Užduotys“ – ne šio MVP dalis.

## Bendros taisyklės
- Datas lyginti kaip `YYYY-MM-DD` eilutes. Šiandienos datą gauti pagal vietinį laiką (`getFullYear/getMonth/getDate`), **ne** per `toISOString()` (laiko juostos klaida).
- Savaitė: pirmadienis–sekmadienis (kaip kalendoriuje), apima šiandieną.
- „Aktyvi“ užduotis = statusas ne „Atlikta“.
- Pagalbinės funkcijos gryni (be React), priima `today` kaip pasirenkamą parametrą, kad būtų lengva patikrinti.
- Stilius: naudoti esamus CSS kintamuosius iš `src/index.css` ir kortelių stilių iš `StatsCards`. Komponentų stiliai – atskiruose `.css` failuose šalia komponento.
- Visi tekstai lietuviškai. Po kiekvieno žingsnio turi praeiti `npm run lint` ir `npm run build`.

---

## Žingsnis 1. Karkasas ir skaičiavimo funkcijos
**Tikslas:** trečias vaizdas „Apžvalga“ ir visa logika paruošta.

Ką daryti:
1. `src/utils/overviewHelpers.js` – eksportuoti:
   - `getTodayString()` → `YYYY-MM-DD` (vietinis laikas)
   - `getWeekRange(today)` → `{ start, end }` (pirmadienis–sekmadienis)
   - `getOverdueTasks(tasks, today)`
   - `getDueToday(tasks, today)` (aktyvios, `dueDate === today`)
   - `getDueThisWeek(tasks, today)` (aktyvios, `dueDate` savaitės ribose)
   - `getCompletionRate(tasks)` → sveikas skaičius 0–100, 0 jei užduočių nėra
   - `getWithoutDueDate(tasks)` ir `getWithoutAssignee(tasks)` (tik aktyvios; be atsakingo = nėra `assigneeId` arba asmuo nerastas tarp `people`)
   - `getWorkloadByPerson(tasks, people)` → `[{ id, name, active, done, overdue }]`, gale eilutė „Nepriskirta“ (id `null`)
   - `getUpcomingTasks(tasks, today, limit = 5)` (aktyvios su `dueDate >= today`, rūšiuota didėjimo tvarka)
2. `src/components/Overview.jsx` + `Overview.css`: komponentas `Overview({ tasks, people, onTaskClick })`, kol kas tik antraštė „Apžvalga“ ir tuščias tinklelis.
3. `App.jsx`: pridėti trečią mygtuką „Apžvalga“ į esamą vaizdų perjungimą (po „Kalendorius“), tuo pačiu stiliumi. Perduoti `tasks`, `people` ir tą patį callback'ą, kuris kalendoriuje atidaro redagavimo langą.

Priėmimo kriterijus: puslapis atsidaro, kiti du vaizdai veikia kaip anksčiau, funkcijos grąžina teisingus rezultatus (patikrink laikinu skriptu ar `console.log`, laikino kodo nekomituok).

Commit: `feat(overview): add overview view and helper functions`

## Žingsnis 2. Rodiklių kortelės
**Tikslas:** šešios kortelės viršuje.

Ką daryti:
1. `src/components/OverviewStatCards.jsx` (arba esamo `StatsCards` stiliaus perpanaudojimas), 6 kortelės šia tvarka: **Vėluoja**, **Šiandien**, **Šią savaitę**, **Atlikta (%)**, **Be termino**, **Be atsakingo**.
2. „Vėluoja“ > 0 – raudonas akcentas; = 0 – neutralus ar žalias.
3. Skaičiai iš žingsnio 1 funkcijų, perskaičiuojami kiekvieną kartą keičiantis `tasks` (naudoti `useMemo`).

Priėmimo kriterijus: skaičiai sutampa su „Užduotys“ vaizdu; kai užduočių nėra, rodomi nuliai be klaidų.

Commit: `feat(overview): add summary stat cards`

## Žingsnis 3. Komandos apkrovos lentelė
**Tikslas:** matyti, kas kiek turi darbo.

Ką daryti:
1. `src/components/WorkloadTable.jsx`: stulpeliai **Asmuo | Aktyvios | Atliktos | Vėluoja**, duomenys iš `getWorkloadByPerson`.
2. Rūšiuoti pagal aktyvių skaičių mažėjančia tvarka, „Nepriskirta“ visada paskutinė.
3. Rodyti visus asmenis, net jei jie neturi užduočių (su nuliais). Eilutę „Nepriskirta“ rodyti tik jei tokių užduočių yra.
4. Vėluojančių skaičius > 0 – paryškintas raudonai.
5. Tuščia būsena: „Dar nėra atsakingų asmenų ar užduočių.“

Priėmimo kriterijus: ištrynus asmenį jo užduotys atsiranda eilutėje „Nepriskirta“ (naudoja esamą `unassignPerson` logiką).

Commit: `feat(overview): add team workload table`

## Žingsnis 4. Artimiausi terminai
**Tikslas:** sąrašas to, kas artimiausiai laukia.

Ką daryti:
1. `src/components/UpcomingTasks.jsx`: 5 artimiausios aktyvios užduotys (iš `getUpcomingTasks`), kiekviena eilutė: data, pavadinimas, atsakingas asmuo, prioriteto `Badge` (naudoti esamą `Badge`).
2. Eilutės paspaudimas iškviečia `onTaskClick(task)` – atsidaro tas pats redagavimo langas kaip kalendoriuje.
3. Eilutės turi būti pasiekiamos klaviatūra (`button` arba `role="button"` + `tabIndex`).
4. Tuščia būsena: „Artimiausių terminų nėra.“

Priėmimo kriterijus: paspaudus užduotį atsidaro redagavimas, išsaugojus sąrašas ir kortelės atsinaujina.

Commit: `feat(overview): add upcoming deadlines list`

## Žingsnis 5. Sutvarkymas ir patikra
**Tikslas:** vienodas stilius ir stabilus build.

Ką daryti:
1. Kalendoriaus pataisymai (`Calendar.jsx`/`Calendar.css`): prioritetų legenda („Aukštas prioritetas, Vidutinis, Žemas“) turi turėti tarpus ir stilių; antraštės elementai („Šiandien“, ‹, ›, mėnuo) išlygiuoti vienoje eilutėje ir stilizuoti kaip kiti mygtukai. Žinomos problemos dalis, tik stilius, logikos nekeisti.
2. Apžvalgos išdėstymas: ≥1024 px – 6 kortelės vienoje eilutėje, po jomis apkrova ir terminai; <768 px – kortelės po 2 stulpelius, bloktai vienas po kitu. Be horizontalaus slinkimo (lentelė gali slinkti savo konteineryje).
3. Pereiti per visus vaizdus ranka: tuščias projektas, 1–2 užduotys, užduotys be termino ir be asmens, atlikta užduotis su praeities terminu (neturi skaitytis kaip vėluojanti).
4. `npm run lint` ir `npm run build` be klaidų ir įspėjimų.
5. Atnaujinti `context.md`: skyriai „Kas pakeista“, „Sprendimai“, „Žinomos problemos“ (pašalinti išspręstas), „Galimi tolesni darbai“ (pridėti: kortelių nuorodos į filtrus, grafikai, atliktų dinamika su `completedAt`).

Commit: `chore(overview): polish layout, fix calendar legend, update context`

---

## Galutinis Definition of Done
- Trys vaizdai veikia, Apžvalgoje yra 6 kortelės, apkrovos lentelė ir 5 artimiausi terminai.
- Nėra naujų priklausomybių, `package.json` nepakeistas.
- Skaičiai Apžvalgoje sutampa su „Užduotys“ vaizdu.
- 5 commit'ai viename branch'e, `lint` ir `build` švarūs.
