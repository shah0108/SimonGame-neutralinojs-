#  Simon Game — Neutralino.js Desktop App

A modern desktop implementation of the classic **Simon Memory Game**, built using:

- **HTML, CSS, JavaScript (Frontend)**
- **Neutralino.js (Backend-less Desktop Runtime)**
- **Local JSON storage for High Scores & Leaderboard**
- **Login/Logout system using localStorage**
- **Custom Neutralino Extension for Cursor Control**

A lightweight desktop game with persistent scores, fullscreen gameplay, and native-like UI interactions — all without Electron-style heavy runtimes.

---

#  Features

### Core Gameplay
- Classic Simon game rules  
- Random sequence generation  
- Button animations and sound  
- Game over feedback  
- Smooth restart flow  

### User System
- Login / logout using `localStorage`  
- User-specific high scores  
- Persistent saved data  

### High Score
- High score stored in `highscore.json`  

### Native App Features via Neutralino
- Fullscreen toggle  
- ESC to exit fullscreen  
- Exit application button  
- Custom extension for cursor (loading → normal)

---


---

#  How the Game Works

1. Press any key to start  
2. Game shows a random color  
3. Player repeats the sequence  
4. Sequence grows each level  
5. Wrong input → Game Over  
6. High score updates  
7. Leaderboard updated automatically  

---

# How to Run (Neutralino.js)

### 1️⃣ Install Neutralino CLI

```npm install -g @neutralinojs/neu```

### 2️⃣ Navigate to the project directory

```cd your-project-folder```

### 3️⃣ Start the desktop app

neu run

---

# 📌 Neutralino.js APIs Used

This project uses several Neutralino APIs for native functionality.

---

## 1️⃣ Initialization
### `Neutralino.init()`
Initializes the Neutralino environment.

---

## 2️⃣ Filesystem APIs

Used for high score and leaderboard storage.

### `Neutralino.filesystem.readFile(path)`
Read JSON data from files.

### `Neutralino.filesystem.writeFile(path, data)`
Write updated JSON data.

---

## 3️⃣ Window APIs

Used for fullscreen behavior.

### `Neutralino.window.isFullScreen()`
Check fullscreen status.

### `Neutralino.window.setFullScreen(true)`
Enter fullscreen mode.

### `Neutralino.window.exitFullScreen()`
Exit fullscreen mode.

---

## 4️⃣ App API

### `Neutralino.app.exit()`
Close the desktop application.

---

## 5️⃣ Extensions API

Used for the custom cursor extension.

### `Neutralino.extensions.dispatch(extension, message)`
Communicates with the extension to:
- Show wait cursor  
- Reset cursor  

---

# 📊 High Score Logic

### High Scores (per user)
Stored in `highscore.json`:
```json
{
  "krish": 12,
  "nidhi": 7
}
```

###**Login System**

Username saved in localStorage

High score tracked per user

Logout clears user data

Contribution Guidelines

Fork the repo

Create a new branch

Make changes

Commit with meaningful messages

###**Create a Pull Request**

###**License**

This project is open-source and free to use.
