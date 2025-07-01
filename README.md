# Lenawei GDS Command Pro (Full Simulation Mode)

## 🔥 Overview

Lenawei GDS Simulator is a fully interactive and browser-based simulation tool designed for training in Global Distribution Systems (GDS) like Galileo, Amadeus, and Sabre. It offers students and travel professionals a user-friendly environment to practice ticketing, visa processing, seat selection, quote generation, and macro automation.

---

## 🚀 Features

| Feature            | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| GDS Selection      | Choose between Galileo, Amadeus, or Sabre systems             |
| Secure Login       | Password-protected access using `lenawei gds`                 |
| Gender Interaction | Gender-specific popups for flirty/funny feedback during login |
| Command Console    | Type and run simulated GDS commands                           |
| Saved Macros       | Save frequently used commands using `/macro` system           |
| Seat Map           | Clickable mock seat layout (S1–S30) to simulate bookings      |
| Responsive Design  | Fully mobile-friendly, dark-themed UI                         |
| Keyboard Support   | Press Enter key to login and run commands                     |

---

## 🔑 Login Instructions

* Password: `lenawei gds`
* On login, you will be asked: "Are you a 👨 or 👩?"

  * Based on your answer, you get humorous, friendly pop-up interactions.
* Incorrect passwords also trigger humorous alerts.

---

## 🔢 Command Simulator

### Examples of supported commands:

* `.TKT ISSUE` ➔ Simulates ticketing
* `.TKT VOID` ➔ Voids a ticket
* `.TKT REISSUE` ➔ Reissues a ticket
* `/QUOTE NBO-MSA 3D2N` ➔ Generates tour package estimate
* `/macro` ➔ Macro system commands (see below)

---

## 🧱 Macro Commands

| Command               | Function                           |
| --------------------- | ---------------------------------- |
| `/macro name command` | Saves a command under a macro name |
| `/macro list`         | Lists all saved macros             |
| `/macro del name`     | Deletes a saved macro by name      |
| `/macro name`         | Runs the saved macro               |

### Example:

```bash
/macro visa .VISA APPLY KENYA->DUBAI
/macro list
/macro visa
```

---

## 🚫 Wrong Password Response

A pop-up shows:

> "⛔ Wrong password. Don't try hacking Lenawei 😆"

---

## 🚗 Seat Selection Module

* Layout: `S1` to `S30`
* Click a seat to toggle selection (turns green)
* For demonstration only (no backend bookings)

---

## 🚧 Technologies Used

* HTML5 + CSS3 (Custom dark styling)
* JavaScript (Vanilla)
* LocalStorage API for macro persistence
* Responsive UI + animations for popups

---

## 📊 Future Features (Planned)

* Real GDS API integration
* Export quotes and session logs
* User profiles and scores
* Collaborative team bookings
* Session saving and login history

---

## 📁 How to Run

1. Save the HTML code in a file (e.g., `index.html`)
2. Open it in any browser (Chrome, Edge, Firefox)
3. Use password: `lenawei gds`
4. Follow the UI instructions

---

## 👑 Project Maintainer

**Lucas Bell**
Visionary behind Lenawei Safaris & Training Tools
Instagram: [@LeBellHaus](https://instagram.com/LeBellHaus)

---

## ✨ License

This simulator is built for educational and internal Lenawei Safaris use only. Not for public distribution without permission.
