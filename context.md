# Projekto kontekstas

## Kas pakeista
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
