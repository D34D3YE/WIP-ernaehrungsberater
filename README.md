# Ernährungsberater

Ein einfacher, aber umfangreich erweiterter Webserver + Frontend zur Berechnung von Ernährungsempfehlungen, BMI und Makronährstoffverteilung. Enthält einen Admin-Bereich zum Verwalten von Nährstoffen und Altersbereichen.

## Inhaltsverzeichnis

1. [Über das Projekt](#über-das-projekt)  
2. [Funktionen](#funktionen)  
3. [Voraussetzungen](#voraussetzungen)  
4. [Installation](#installation)  
5. [Benutzung](#benutzung)  
6. [Admin-Bereich](#admin-bereich)  
7. [Projektstruktur](#projektstruktur)  
8. [Mitwirken](#mitwirken)  
9. [Lizenz](#lizenz)

---

## Über das Projekt

Dieses Projekt berechnet den täglichen Kalorienbedarf, den BMI sowie altersabhängige Nährstoffempfehlungen. Zudem können über den Admin-Bereich eigene Nährstoffdaten hinzugefügt oder bearbeitet werden.  
Ziel ist es, eine möglichst flexible Ernährungs- und Nährstoffberatung zu ermöglichen, die für unterschiedliche Altersgruppen, Ziele (Abnehmen/Zunehmen) und Aktivitätslevel funktioniert.

---

## Funktionen

- **Nutzer-Eingaben**: Alter, Geschlecht, Gewicht, Größe, Aktivitätslevel, Ziel (Abnehmen, Halten, Zunehmen) und Anzahl Mahlzeiten pro Tag  
- **Berechnungen**:
  - **BMI** mit farblicher Kennzeichnung (Normalgewicht = Grün, sonst Rot)  
  - **Kalorienbedarf** basierend auf Mifflin-St. Jeor und ausgewähltem Aktivitätslevel  
  - **Makronährstoffverteilung** (Protein, Kohlenhydrate, Fett)  
  - **Mahlzeitenaufteilung** (Teilt den Gesamtbedarf auf mehrere Mahlzeiten auf)  
  - **Altersbasierte Nährstoffempfehlungen** (aus einer JSON-Datei)  
- **Admin-Bereich**:
  - Login (mit Demo-Passwort – sollte in Produktion durch ein echtes Auth-Verfahren ersetzt werden)  
  - Hinzufügen, Bearbeiten und Löschen von Nährstoffen (Altersbereich, Menge, Einheit)  
  - Speichern in einer JSON-Datei (keine Datenbank nötig)  
- **Express.js-Server** mit statischem Frontend  
- **REST-API** für GET/POST von Nährstoffen (`/api/nutrients`)

---

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 14 oder höher)  
- [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)  
- (Optional) Ein Git-Client für Versionierung

---

## Installation

1. **Repository klonen** oder ZIP herunterladen:
   ```bash
   git clone https://github.com/<DEIN_BENUTZERNAME>/<REPOSITORY_NAME>.git


1. [Über das Projekt](#über-das-projekt)  
2. [Funktionen](#funktionen)  
3. [Voraussetzungen](#voraussetzungen)  
4. [Installation](#installation)  
5. [Benutzung](#benutzung)  
6. [Admin-Bereich](#admin-bereich)  
7. [Projektstruktur](#projektstruktur)  
8. [Mitwirken](#mitwirken)  
9. [Lizenz](#lizenz)

---

## Über das Projekt

Dieses Projekt berechnet den täglichen Kalorienbedarf, den BMI sowie altersabhängige Nährstoffempfehlungen. Zudem können über den Admin-Bereich eigene Nährstoffdaten hinzugefügt oder bearbeitet werden.  
Ziel ist es, eine möglichst flexible Ernährungs- und Nährstoffberatung zu ermöglichen, die für unterschiedliche Altersgruppen, Ziele (Abnehmen/Zunehmen) und Aktivitätslevel funktioniert.

---

## Funktionen

- **Nutzer-Eingaben**: Alter, Geschlecht, Gewicht, Größe, Aktivitätslevel, Ziel (Abnehmen, Halten, Zunehmen) und Anzahl Mahlzeiten pro Tag  
- **Berechnungen**:
  - **BMI** mit farblicher Kennzeichnung (Normalgewicht = Grün, sonst Rot)  
  - **Kalorienbedarf** basierend auf Mifflin-St. Jeor und ausgewähltem Aktivitätslevel  
  - **Makronährstoffverteilung** (Protein, Kohlenhydrate, Fett)  
  - **Mahlzeitenaufteilung** (Teilt den Gesamtbedarf auf mehrere Mahlzeiten auf)  
  - **Altersbasierte Nährstoffempfehlungen** (aus einer JSON-Datei)  
- **Admin-Bereich**:
  - Login (mit Demo-Passwort – sollte in Produktion durch ein echtes Auth-Verfahren ersetzt werden)  
  - Hinzufügen, Bearbeiten und Löschen von Nährstoffen (Altersbereich, Menge, Einheit)  
  - Speichern in einer JSON-Datei (keine Datenbank nötig)  
- **Express.js-Server** mit statischem Frontend  
- **REST-API** für GET/POST von Nährstoffen (`/api/nutrients`)

---

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 14 oder höher)  
- [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)  
- (Optional) Ein Git-Client für Versionierung

---

## Installation

1. **Repository klonen** oder ZIP herunterladen:
   ```bash
   git clone https://github.com/<DEIN_BENUTZERNAME>/<REPOSITORY_NAME>.git
