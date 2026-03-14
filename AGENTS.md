# Cafe Loma UG - Website

Dieses Dokument enthält alle wichtigen Informationen für AI-Coding-Agenten, die an diesem Projekt arbeiten.

---

## Projektübersicht

**Cafe Loma UG** ist eine moderne, DSGVO-konforme Website für eine Premium-Tagesbar in Wesel, Deutschland. Die Website ist als statische HTML/CSS/JavaScript-Seite aufgebaut und wird auf Netlify gehostet.

**Haupteigenschaften:**
- Reine HTML5/CSS3/Vanilla-JavaScript-Lösung (keine Frameworks, keine Build-Tools)
- DSGVO-konformer Cookie-Banner mit Opt-in/Opt-out
- Kontaktformular mit Web3Forms-Integration (API-Key erforderlich)
- Responsive Design mit mobilem Menü (Breakpoint: 768px)
- Barrierefreiheit (ARIA-Labels, semantisches HTML, Tastaturnavigation)
- Deutsche Sprache (`lang="de"`)
- Keine externen Abhängigkeiten oder CDNs (DSGVO-konform)

---

## Technologie-Stack

| Komponente | Technologie |
|------------|-------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Server (lokal) | Node.js HTTP-Server (`server.js`) |
| Hosting | Netlify (Static Hosting) |
| Formular-Service | Web3Forms (https://web3forms.com/) |
| Schriftarten | System Font Stack (Inter als Fallback, keine externen Requests) |

**Keine Build-Tools**: Dies ist ein reines Static-Site-Projekt ohne Build-Prozess, Bundler oder Package Manager.

---

## Projektstruktur

```
cafe-loma/
├── index.html              # Startseite (Hauptseite)
├── impressum.html          # Impressum (gesetzlich vorgeschrieben)
├── datenschutz.html        # Datenschutzerklärung (DSGVO)
├── _redirects              # Netlify Redirect-Konfiguration
├── _headers                # Netlify Security Headers
├── server.js               # Lokaler Entwicklungsserver (Node.js)
├── README.md               # Benutzerdokumentation (Deutsch)
├── AGENTS.md               # Diese Datei
├── css/
│   ├── variables.css       # Design-System (Farben, Typografie, Spacing)
│   ├── base.css            # CSS Reset & Basis-Styles
│   ├── components.css      # UI-Komponenten (Buttons, Formulare, Cards)
│   ├── layout.css          # Layout & Navigation
│   ├── pages.css           # Seiten-spezifische Styles
│   └── cookie-banner.css   # Cookie-Banner Styles
├── js/
│   ├── main.js             # Haupt-JavaScript (Header, Mobile Menu, Scroll)
│   ├── cookie-banner.js    # DSGVO Cookie-Consent Management
│   └── form-handler.js     # Web3Forms Integration
├── fonts/                  # Lokale Schriftarten (optional, aktuell leer)
└── images/                 # Bilder
    ├── hero.jpg            # Hero-Hintergrundbild
    ├── about.jpg           # Über-uns Bild
    ├── logo.jpeg           # Logo
    ├── gallery-1.jpg       # Galerie-Bilder
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    ├── gallery-4.jpg
    └── gallery-5.jpg
```

---

## Lokale Entwicklung

### Voraussetzungen
- Node.js (für den lokalen Server)

### Server starten

```bash
node server.js
```

Der Server läuft auf einem zufällig verfügbaren Port (Port 0 = automatische Zuweisung). Die Konsole zeigt die tatsächliche URL an, z.B.:
```
Server running at http://localhost:56234/
Press Ctrl+C to stop
```

Der Server ist ein einfacher Node.js HTTP-Server, der:
- MIME-Typen korrekt setzt (HTML, CSS, JS, Bilder)
- Statische Dateien aus dem Projekt-Root ausliefert
- 404-Fehlerseiten zurückgibt

### Alternative (ohne Node.js)

Da es sich um statische Dateien handelt, kann die Website auch direkt im Browser geöffnet werden:
```
# Einfach die HTML-Datei im Browser öffnen
file:///pfad/zum/projekt/index.html
```

---

## CSS-Architektur (ITCSS)

Die CSS-Dateien sind nach dem **ITCSS**-Prinzip (Inverted Triangle CSS) organisiert:

### 1. variables.css
Design-Tokens und CSS-Custom-Properties:
- **Farben**: `--color-primary: #00502b` (Grün), Graustufen-Skala
- **Typografie**: Inter Font Stack, Schriftgrößen von `xs` bis `6xl`
- **Spacing**: Scale von 1 (4px) bis 32 (128px)
- **Shadows**, **Transitions**, **Z-Index**, **Border-Radius**

### 2. base.css
- CSS Reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- Globale Styles für `html`, `body`, Typografie
- Fokus-Styles für Barrierefreiheit (`:focus-visible`)
- Utility-Klasse `.sr-only` für Screenreader

### 3. components.css
Wiederverwendbare UI-Komponenten:
- `.btn` - Buttons (Primary, Secondary, White, Large)
- `.form-group`, `.form-input`, `.form-textarea` - Formularelemente
- `.section-header`, `.section-label`, `.section-title` - Abschnitts-Header
- `.card`, `.info-card` - Karten-Komponenten
- `.alert` - Status-Meldungen (Success, Error)

### 4. layout.css
- `.container` - Maximale Breite 1280px
- `.header` - Fixierte Navigation mit Scroll-Effekt (`.header--scrolled`)
- `.nav`, `.nav__links` - Navigation mit Mobile-Menü (Hamburger)
- `.footer` - Footer-Grid (4 Spalten auf Desktop)
- `.section` - Seitenabschnitte (Standard, Alt, Dark)
- Grid-Utilities (`.grid--2`, `.grid--3`, `.grid--4`)
- Spacing-Utilities (`.mt-*`, `.mb-*`)

### 5. pages.css
Seiten-spezifische Styles:
- `.hero` - Hero-Bereich mit Vollbild-Hintergrund
- `.about` - Über-uns Abschnitt (2-Spalten-Layout)
- `.features` - Feature-Grid (3 Spalten)
- `.feature` - Einzelne Feature-Karte
- `.gallery` - Bildergalerie (CSS Grid mit verschiedenen Größen)
- `.contact` - Kontaktseite mit Formular
- `.legal-page` - Impressum/Datenschutz Styles

### 6. cookie-banner.css
DSGVO-konformer Cookie-Banner (fixed position bottom)

---

## JavaScript-Module

Alle JS-Dateien verwenden das **IIFE-Pattern** (Immediately Invoked Function Expression) mit `'use strict'`.

### main.js
Kernfunktionalitäten:
- `initHeader()` - Scroll-Effekt für Header (fügt `.header--scrolled` hinzu)
- `initMobileMenu()` - Mobiles Menü (Hamburger-Icon, Toggle, Click-outside)
- `initSmoothScroll()` - Sanftes Scrollen für Anker-Links (mit Header-Offset)
- `initScrollAnimations()` - Intersection Observer für Scroll-Animationen
- Utilities: `debounce()`, `throttle()`

**Globales Objekt**: `window.CafeLoma`

### cookie-banner.js
DSGVO-konformes Cookie-Management:
- Cookie-Name: `cafe_loma_cookie_consent`
- Speicherung: Cookies + localStorage (Fallback)
- Gültigkeit: 365 Tage
- Events: `cookiesAccepted`, `cookiesDeclined`
- Banner wird mit 1s Verzögerung eingeblendet

**Globales Objekt**: `window.CookieBanner`
**Methoden**: `init()`, `hasConsent()`, `wasAccepted()`, `wasDeclined()`, `resetConsent()`

### form-handler.js
Web3Forms-Integration für Kontaktformular:
- Endpoint: `https://api.web3forms.com/submit`
- Validierung: Pflichtfelder, E-Mail-Format
- Zustände: Loading, Success, Error
- Honeypot-Feld (`botcheck`) für Spam-Schutz
- Automatisches Zurücksetzen nach 5 Sekunden bei Erfolg

**Globales Objekt**: `window.FormHandler`

---

## Web3Forms Konfiguration

Das Kontaktformular erfordert einen Web3Forms Access Key.

**Aktueller Platzhalter in `index.html` (Zeile 369):**
```html
<input type="hidden" name="access_key" value="HIER_DEIN_WEB3FORMS_KEY_EINFÜGEN">
```

**Schritte zur Aktivierung:**
1. Registrierung auf https://web3forms.com/
2. E-Mail-Verifizierung
3. Access Key kopieren (Format: `c4f5d8e1-...`)
4. Platzhalter in `index.html` ersetzen

**Formularfelder:**
- `name` (Pflichtfeld)
- `email` (Pflichtfeld, Validierung)
- `subject_line` (optional)
- `message` (Pflichtfeld)

---

## DSGVO / Datenschutz

Die Website ist DSGVO-konform:

1. **Cookie-Banner**: Einwilligung erforderlich vor Aktivierung von Cookies
2. **Keine externen Schriftarten**: System Font Stack statt Google Fonts
3. **Keine Tracking-Scripts**: Kein Google Analytics ohne Einwilligung
4. **Datenschutzerklärung**: Vollständige Seite (`datenschutz.html`)
5. **Impressum**: Vollständige Angaben (`impressum.html`)

**Content Security Policy** (in `_headers`):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com; form-action 'self' https://api.web3forms.com;
```

---

## Deployment

### Netlify Deployment

1. **ZIP-Datei erstellen**: Alle Dateien im Projekt-Root auswählen (nicht den Ordner selbst!)
2. **Bei Netlify hochladen**: Drag & Drop auf netlify.com
3. **Fertig**: Website ist sofort live

### Konfigurationsdateien

**_headers** - Security Headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
- Content-Security-Policy
- Cache-Control für statische Assets (CSS/JS: 1 Jahr, Bilder: 30 Tage)

**_redirects** - Routing:
```
/*    /index.html   404
```

---

## Code-Stil Guidelines

### HTML
- Semantische Tags (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- ARIA-Labels für Barrierefreiheit (`role`, `aria-label`, `aria-expanded`, `aria-controls`)
- BEM-Klassenbenennung (Block__Element--Modifier)
- Keine Inline-Styles (außer bei dynamischen Farbänderungen)
- Deutsche Sprache für alle Inhalte
- Kommentare mit `<!-- ============================================ -->`

### CSS
- CSS-Custom-Properties für alle Werte (keine hartkodierten Werte)
- BEM-Naming (Block__Element--Modifier)
- Mobile-first Responsive Design (Breakpoints: 640px, 768px, 1024px)
- Kommentare mit `/* ------------------------------------------ */`
- Keine `!important` (außer in Utilities)

### JavaScript
- IIFE-Pattern mit `'use strict'`
- Event-Listener mit `{ passive: true }` für Scroll-Events
- Feature-Detection (z.B. `if ('IntersectionObserver' in window)`)
- Keine Abhängigkeiten zu externen Libraries
- Globale API-Objekte: `window.CafeLoma`, `window.CookieBanner`, `window.FormHandler`

---

## Bilder und Assets

### Aktuelle Bilder im Projekt
- `images/hero.jpg` - Hero-Hintergrund (Vollbild)
- `images/about.jpg` - Über-uns Bereich (4:5 Verhältnis)
- `images/logo.jpeg` - Logo (Nav & Footer)
- `images/gallery-1.jpg` bis `gallery-5.jpg` - Galerie-Bilder

### Empfohlene Bildgrößen
- **Hero**: 1920x1080px
- **About**: 800x1000px (4:5 Verhältnis)
- **Galerie**: 800x800px (1:1 Verhältnis)
- **Logo**: 200x50px empfohlen
- **Maximale Dateigröße**: 500KB pro Bild

### Bildformate
- **Fotos**: JPG (optimiert)
- **Grafiken mit Transparenz**: PNG
- **Icons**: Inline SVG

### Bildoptimierung
Bilder sollten vor dem Hinzufügen optimiert werden:
- https://squoosh.app/ (Web-Optimierung)
- Lazy Loading: `loading="lazy"` (außer Hero: `loading="eager"`)

---

## Wichtige Dateipfade

| Beschreibung | Pfad |
|--------------|------|
| Startseite | `index.html` |
| Impressum | `impressum.html` |
| Datenschutz | `datenschutz.html` |
| Haupt-CSS | `css/variables.css`, `css/base.css`, `css/components.css`, `css/layout.css`, `css/pages.css`, `css/cookie-banner.css` |
| Haupt-JS | `js/main.js`, `js/cookie-banner.js`, `js/form-handler.js` |
| Bilder | `images/`, `images/gallery/` |

---

## Kontaktinformationen (im Projekt)

**Cafe Loma UG**
- Adresse: Lomberstrasse 2, 46483 Wesel
- Inhaber: Kamyar Behzad Tapuk
- Telefon: 0163 4258550
- E-Mail: info@lomatagesbar.de
- Geschäftsführer-E-Mail: K.behzad@lomatagesbar.de

---

## Browser-Support

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Änderungshistorie

| Datum | Änderung |
|-------|----------|
| 2026-02-23 | Initiale Erstellung |
| 2026-03-14 | Überarbeitung nach Code-Analyse (aktuelle Version) |

---

*Diese Datei wurde für AI-Coding-Agenten erstellt. Bei Änderungen an der Projektstruktur oder wichtigen Konfigurationen sollte diese Datei aktualisiert werden.*
