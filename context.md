# Projekto kontekstas

## Kas pakeista
- Įgyvendintas Apžvalgos 4 žingsnis: pridėtas artimiausių penkių aktyvių terminų sąrašas su datos, pavadinimo, atsakingo asmens ir prioriteto ženklelio informacija; eilutės atveria redagavimo langą.
- Įgyvendintas Apžvalgos 3 žingsnis: pridėta komandos apkrovos lentelė su aktyviomis, atliktomis ir vėluojančiomis užduotimis pagal asmenį.
- Įgyvendintas Apžvalgos 2 žingsnis: pridėtos šešios rodiklių kortelės, kurios perskaičiuojamos pasikeitus užduotims arba atsakingiems asmenims.
- Įgyvendintas Apžvalgos 1 žingsnis: pridėtas trečias vaizdas ir grynos suvestinės pagalbinės funkcijos.
- Užduočių sąraše atlikimo terminas rodomas vieną kartą – paliktas redaguojamas datos laukas, pašalintas jo dubliuojantis tekstinis atvaizdavimas.
- Pašalinta „Kritinis“ prioriteto kategorija iš pasirinkimų ir statistikos. Seniau išsaugotos kritinės užduotys dabar įkeliamos kaip „Aukštas“ prioritetas.
- Puslapio „Užduotys“ antraštėje sukeista mygtukų tvarka: „Nauja užduotis“ dabar rodoma prieš „Atsakingi asmenys“.
- Pakeistas pagrindinis puslapio fonas iš melsvo į pilką (`src/index.css`).
- Pataisytas `Calendar` importas: komponentas eksportuojamas kaip numatytasis, todėl `App.jsx` dabar jį importuoja teisingai.
- Suderintas kalendoriaus užduoties paspaudimo callback'as su komponento `onTaskClick` savybe, kad paspaudus užduotį atsidarytų redagavimo langas.
- Pridėtas pagrindinis vaizdų perjungimas tarp „Užduotys“ ir „Kalendorius“.
- Sukurtas kalendoriaus vaizdas su mėnesio navigacija, dienų pasirinkimu ir pasirinktos dienos užduočių sąrašu.
- Kalendorius naudoja esamą užduočių `dueDate` lauką. Paspaudus užduotį atveriamas redagavimo langas.
- Kuriant užduotį iš kalendoriaus, pasirinkta diena iš anksto įrašoma kaip atlikimo terminas.

## Sprendimai
- Naujos bibliotekos nepridėtos.
- Apžvalgos vėlavimo skaičiavimas naudoja esamą `isTaskOverdue` funkciją, tą pačią kaip `getTaskStats`; užbaigtumo būsena imama iš `STATUSES` konstantos.
- Kalendorius sukurtas kaip UI komponentas `src/components/Calendar.jsx`, o stiliai laikomi `src/components/Calendar.css`.
- Duomenų saugojimo ir užduočių modelio keisti nereikėjo, nes atlikimo terminas jau saugomas užduotyje.
- Pradinis `context.md` failas projekte neegzistavo; šis failas sukurtas kaip projekto konteksto užrašas.

## Žinomos problemos
- Kalendoriaus savaitės dienų antraštės pateikiamos trumpiniais.
- Užduotys be atlikimo termino kalendoriuje nerodomos.

## Galimi tolesni darbai
- Pridėti kalendoriaus užduočių filtravimą pagal atsakingą asmenį, statusą ar prioritetą.
- Įvertinti, ar reikia savaitės arba dienos kalendoriaus vaizdo.

## Planuojama: puslapis „Apžvalga“ (branch: `New-page-Apzvalga`)
- Trečias pagrindinis vaizdas šalia „Užduotys“ ir „Kalendorius“; naudoja esamus užduočių laukus, modelio keisti nereikia. Be naujų bibliotekų, be grafikų ir be sąrašo „Reikia dėmesio“.
- Išsamus planas Codex: `overview-mvp-plan.md`.
- 5 žingsniai (po vieną commit'ą); 1–4 žingsniai užbaigti:
  1. Vaizdo karkasas ir `utils/overviewHelpers.js` — atlikta.
  2. Šešios rodiklių kortelės — atlikta.
  3. Komandos apkrovos lentelė — atlikta.
  4. „Artimiausi terminai“ (5 įrašai, paspaudus atsidaro redagavimas) — atlikta.
  5. Kalendoriaus legendos ir antraštės sutvarkymas, responsyvumas, `lint` ir `build`, `context.md` atnaujinimas.
- Kitas žingsnis: atlikti galutinį stiliaus ir responsyvumo sutvarkymą.
