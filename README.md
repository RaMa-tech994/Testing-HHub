# React + Vite

# Tasks management

Asmeniniam naudojimui skirta užduočių valdymo sistema, padedanti stebėti užduotis pagal jų atlikimo terminus ir prioritetus.

## Apie projektą

**Tasks management** – frontend užduočių valdymo aplikacija, skirta asmeniniam naudojimui.

Pagrindinis tikslas – vienoje vietoje kurti, redaguoti ir filtruoti užduotis, atsižvelgiant į jų atlikimo terminus ir prioritetus.

Šiuo metu pagrindinis aplikacijos puslapis yra Dashboard su užduočių lentele.

## Esamas funkcionalumas

* Užduočių kūrimas.
* Užduočių redagavimas.
* Užduočių filtravimas.

## Planuojama

### Kalendorius

Planuojama pridėti atskirą Kalendoriaus puslapį, kuriame būtų galima matyti, kokias užduotis reikia atlikti konkrečiomis dienomis.

Pagrindiniai principai:

* Dashboard lieka pagrindiniu užduočių valdymo įrankiu.
* Kalendorius yra papildomas užduočių peržiūros būdas.
* Kalendorius naudoja tą patį užduočių duomenų šaltinį.
* Pasirinkus dieną, rodomos tos dienos užduotys.

### Dizaino taisyklės

Planuojama apibrėžti bendras dizaino taisykles, kad visi puslapiai atrodytų nuosekliai.

## Technologijos

* Vite
* React
* Frontend aplikacija
* Autentifikacija nenaudojama.

## Paleidimas lokaliai

```bash
npm install
npm run dev
```

Atidaryk terminale pateiktą vietinį adresą.

## Dokumentacija

* `README.md` – projekto pristatymas ir paleidimo instrukcijos.
* `context.md` – išsamus projekto kontekstas, architektūra, funkcionalumas ir pakeitimų istorija.

## Darbo principai

* Išsaugoti esamą Dashboard funkcionalumą.
* Prieš keičiant kodą patikrinti esamą projekto struktūrą.
* Nedubliuoti užduočių duomenų Kalendoriuje.
* Neįdiegti naujų bibliotekų be pagrindimo.
* Prieš didesnius pakeitimus sukurti atsarginę kopiją arba Git commit.

## Projekto būsena

| Sritis               | Būsena            |
| -------------------- | ----------------- |
| Dashboard            | Esamas            |
| Užduočių kūrimas     | Įgyvendinta       |
| Užduočių redagavimas | Įgyvendinta       |
| Užduočių filtravimas | Įgyvendinta       |
| Kalendorius          | Planuojamas       |
| Dizaino taisyklės    | Planuojamos       |
| Backend              | Nežinoma          |
| Duomenų saugojimas   | Reikia patikrinti |

