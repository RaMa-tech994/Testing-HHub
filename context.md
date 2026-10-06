# Projekto kontekstas

## Kas pakeista
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
- Kalendorius sukurtas kaip UI komponentas `src/components/Calendar.jsx`, o stiliai laikomi `src/components/Calendar.css`.
- Duomenų saugojimo ir užduočių modelio keisti nereikėjo, nes atlikimo terminas jau saugomas užduotyje.
- Pradinis `context.md` failas projekte neegzistavo; šis failas sukurtas kaip projekto konteksto užrašas.

## Žinomos problemos
- Kalendoriaus savaitės dienų antraštės pateikiamos trumpiniais.
- Užduotys be atlikimo termino kalendoriuje nerodomos.

## Galimi tolesni darbai
- Pridėti kalendoriaus užduočių filtravimą pagal atsakingą asmenį, statusą ar prioritetą.
- Įvertinti, ar reikia savaitės arba dienos kalendoriaus vaizdo.
