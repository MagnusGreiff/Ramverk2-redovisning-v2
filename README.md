[![Build Status](https://travis-ci.org/MagnusGreiff/Ramverk2-redovisning-v2.svg?branch=master)](https://travis-ci.org/MagnusGreiff/Ramverk2-redovisning-v2)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/MagnusGreiff/Ramverk2-redovisning-v2/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/MagnusGreiff/Ramverk2-redovisning-v2/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/MagnusGreiff/Ramverk2-redovisning-v2/badges/build.png?b=master)](https://scrutinizer-ci.com/g/MagnusGreiff/Ramverk2-redovisning-v2/build-status/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/a793a4f71d74dde35489/maintainability)](https://codeclimate.com/github/MagnusGreiff/Ramverk2-redovisning-v2/maintainability)

# Me-sidan

## Tekniker
Jag valde att använda mig utav Express som server och sedan Electron som klient/frontend. Jag använder mig utan Mongodb som min databas.

## Starta up me-sidan

Det första man måste göra för att starta me-sidan är att ladda ner koden. Det kan man göra med följande kommand: `git clone https://github.com/MagnusGreiff/Ramverk2-redovisning-v2.git`.

När koden väl är nedladdad måste man installa alla dependencies genom att köra kommandot `npm run install`.

Du har du allt som behövs för att starta upp me-sidan. För att starta den behöver du köra följande kommando: `npm run start`. Med det kommandot startas express servern, databasen och klienten.

## Portar och dsn
Följande alternativ för portar och dsn finns:
* 3000 (standarn port)
* DBWEBB_PORT (alternativ till standard porten)
* mongodb://localhost:27017/redovisa (standard dsn)
* DBWEBB_DSN (alternativ till standard dsn)

Man kan konfigurera portarna genom att lägga till följande rader i sin .bash_profil: `export DBWEBB_PORT=1337` och `export DBWEBB_DSN=mongodb://localhost:27017/something`.

## Tester
### Klient:
Här går det bara att köra testerna utan docker. Det är för att man inte kan köra en electron app i en docker container.
Kommandot för attt köra testerna är `npm run test`.
### Server:
Här finns möjligheten att köra testerna både i en docker container och utan.
För att köra testera i en docker container använder du följande kommando: `npm run test1`, `npm run test2` och `npm run test3`.
För att köra testerna utan en docker container så finns följande kommando: `npm run test`.
För att se kodtäckning kör kommandot `npm run test-nyc`.
