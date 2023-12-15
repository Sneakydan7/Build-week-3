# CRUD PROJECT

## Descrizione del progetto Build-week3 - For Developers

Questo progetto è generato con json-server, json-server-auth, concurrently e angular jwt.abs. Seguire i passaggi

1- installare con npm i: json-server, json-server-auth, concurrently, @auth0/angular-jwt

2- modificare il package json inserendo le seguenti righe:
"backend": "json-server-auth --watch db.json --port 4201",
"fullstack": "concurrently "npm run backend" "npm run start"" e modificando la riga del comando npm start aggiungendo alla fine il parametro -o per avviare anche l'apertura dell'applicazione nel browser

3-creare a livello di sistema (allo stesso livello del package.json) un file db.json con all'interno il seguente oggetto:
{"user": []}

4-aprire il progetto con un IDE di sviluppo e lanciare il comando npm i per installare tutte le dipendenze dei node-modules

5-per lanciare il progetto in dev server utilizzare il comando npm run fullstack (o npx run fullstack nel caso in cui l'iDE non riconoscesse il comando per avviare json server auth)

## Descrizione del progetto Build-week

Questo progetto consiste nel creare un'applicazione CRUD per gestire API REST, è stata creata una pagina per la visualizzazione dei portfolio dei vari utenti.

L'app è composta dai seguenti components:

1-Pagina di login e register
-----1 Possibilità di registrazione tramite authoring

2-HomePage
-----1-Visualizzazione dei post di ogni utente
-----2-SideBar con possibilità di modifica/personalizzazione utente

3-View
-----1-Possibilità di aggiungere, modificare i post dell'utente

Il progetto è completamente responsive in tutte le modalità.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
