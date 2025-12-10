# Shopping List App

A modern, premium-styled shopping list application built with React and Node.js.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Glassmorphism layout).
- **Backend**: Node.js, Express.
- **Data**: Simple file-based persistence (`server/data.json`).

## Prerequisites
- Node.js installed on your machine.

## How to Run

Test
1.  **Start the Backend Server**:
    Open a terminal and run:
    ```bash
    cd server
    npm install  # (Only first time)
    npm run start
    ```
    The server will run on `http://localhost:5000`.

2.  **Start the Frontend Client**:
    Open a *new* terminal and run:
    ```bash
    cd client
    npm install  # (Only first time)
    npm run dev
    ```
    The client will run on `http://localhost:5173`.

3.  Open your browser and navigate to `http://localhost:5173`.

## Features
- Add items to your list.
- Mark items as completed (strikethrough).
- Delete items.
- Data persists across server restarts (saved to JSON).
