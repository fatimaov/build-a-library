# 📚 Media Library CLI App

A command-line media library application built in JavaScript, designed to manage books, movies, and CDs through an interactive menu-driven interface.

This project started as a **JavaScript classes exercise from Codecademy** (*Build a Library*) and evolved into a **fully navigable CLI application** with input validation, clear control flow, and a strong focus on user experience.


## 🧠 Project Origin

The original exercise goal was:

> Build a library system using a parent `Media` class and three subclasses: `Book`, `Movie`, and `CD`.

Books-‘N-Stuff (a fictional library) needed help modernizing their system, replacing index cards with a structured, object-oriented solution.

From that base, this project was expanded into:
- a complete CLI app
- with menus, navigation, and user-friendly prompts
- focused on real execution flow, not just class structure



## 🎥 Demo

[![Watch the demo](./Build-a-library_Demo_.gif)](./Build-a-library_Demo_.gif)


*(You can also run the app locally to explore the full flow.)*


## ✨ Key Concepts Practiced

This project goes beyond basic class syntax and focuses on **how an application actually runs**:

- JavaScript **classes & inheritance**
- **Encapsulation** with getters and internal state
- **Control flow & call stack reasoning**
- Function responsibility and execution ownership
- **Scope management** (global vs local variables)
- Helper functions and modular logic
- Early exits using `return`
- `do…while` loops for reliable input handling


## 🧭 App Features

- Manage three media types:
  - 📖 Books
  - 🎬 Movies
  - 💿 CDs
- Display items by media type
- Add new items with guided prompts
- Remove existing items
- Toggle checked-out state
- Add and view ratings
- Display average rating with a visual star-like representation
- Fully menu-driven navigation



## 🛡️ Input Validation & Navigation

- **All user input is validated**
  - Empty inputs
  - Invalid numbers
  - Out-of-range indices
- Safe escape options:
  - Pressing **Enter** lets the user go back or exit
- The user can freely navigate:
  - forward and backward between menus
  - without breaking the app flow

Special care was taken to avoid control-flow bugs and ensure functions return control correctly.


## 🎯 Focus on UX (for a CLI App)

Even though this is a terminal application, UX was a priority:

- Clear menus and banners
- Consistent naming and prompts
- Predictable navigation
- Visual separators and feedback
- Readable tables for output

The goal was to make the app intuitive **without needing instructions**.


## ⚠️ Limitations

This application is a **demonstration project** focused on JavaScript logic, control flow, and CLI interaction.

- All data is stored **in memory** within the JavaScript file.
- There is **no persistent database**.
- Any changes (adding, editing, or removing items) exist only while the app is running.
- When the app exits, all data is reset to the initial seeded state.

The goal of this project is to showcase application flow, input validation, and object-oriented design — not long-term data storage.


## 🚀 Future Improvements / Ideas

The following features were intentionally left out of the current scope but represent potential future enhancements:

- Filter items when displaying lists
- User database with:
  - borrowed items
  - active loans
  - maximum borrowing limits per media type
- Checked-out state enhancements:
  - assign a user (existing or new)
  - calculate return dates based on a loan period
- View detailed information for checked-out items



## 🧪 How to Run the App

### Requirements
- **Node.js**

### Steps
```bash
npm install
node app.js