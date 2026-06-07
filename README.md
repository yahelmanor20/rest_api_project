# הקונספירטור - Project Summary

## Overview

מערכת "הקונספירטור" היא אפליקציית Full Stack המאפשרת למשתמשים ליצור, לפרסם ולנהל תיאוריות קונספירציה.

### Technologies

#### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

#### Frontend

* React (Create React App)

#### Communication

* REST API

---

# התקנה והרצה (Getting Started)

## דרישות מקדימות (Prerequisites)

* [Node.js](https://nodejs.org/) (גרסה 18 ומעלה)
* [MongoDB](https://www.mongodb.com/) – מקומי או חשבון [MongoDB Atlas](https://www.mongodb.com/atlas)
* npm (מותקן יחד עם Node.js)

## 1. שכפול הפרויקט (Clone)

```bash
git clone <repository-url>
cd rest_api_project
```

## 2. הגדרת משתני סביבה (.env)

צרו קובץ בשם `.env` בתיקיית השורש של הפרויקט עם התוכן הבא:

```env
DATABASE_URL=mongodb://localhost/conspiratordb
PORT=5000
```

> `DATABASE_URL` – כתובת ההתחברות ל-MongoDB (מקומי או Atlas).
> `PORT` – הפורט שעליו ירוץ שרת ה-Backend.
>
> ⚠️ הקובץ `.env` אינו עולה ל-git (הוא מופיע ב-`.gitignore`) כי הוא מכיל מידע רגיש.

## 3. התקנת התלויות (Install dependencies)

יש להתקין תלויות גם ל-Backend וגם ל-Frontend:

```bash
# Backend (בתיקיית השורש)
npm install

# Frontend
cd client
npm install
cd ..
```

## 4. הרצת הפרויקט (Run)

### אפשרות א' – הרצת שני השרתים יחד (מומלץ)

מתיקיית השורש, פקודה אחת שמריצה גם את ה-Backend וגם את ה-Frontend (באמצעות `concurrently`):

```bash
npm run dev
```

### אפשרות ב' – הרצה ידנית בשני טרמינלים נפרדים

```bash
# טרמינל 1 – Backend (שרת ה-API)
npm run devStart
```

```bash
# טרמינל 2 – Frontend (אפליקציית React)
cd client
npm start
```

* ה-Backend ירוץ על `http://localhost:5000` (לפי ה-`PORT` שהגדרתם).
* ה-Frontend ייפתח אוטומטית בדפדפן בכתובת `http://localhost:3000`.

---

# Backend Architecture

## Folder Structure

```text
server/
├── controllers/
├── routes/
├── models/
├── services/
├── data/
├── server.js
```

## Model

### Conspiracy

```javascript
{
  text: String,
  likes: Number,
  dislikes: Number,
  createdAt: Date,
  comments: [
    {
      author: String,
      text: String,
      createdAt: Date
    }
  ]
}
```

---

# API Endpoints

## Get all conspiracies

```http
GET /conspiracies
```

Returns all published conspiracies.

---

## Create conspiracy

```http
POST /conspiracies
```

Body:

```json
{
  "text": "גל גדות שולטת באילומינטי"
}
```



## Like conspiracy

```http
POST /conspiracies/:id/like
```

---

## Dislike conspiracy

```http
POST /conspiracies/:id/dislike
```

---

## Add comment

```http
POST /conspiracies/:id/comments
```

Body:

```json
{
  "author": "User",
  "text": "Interesting theory"
}
```

---

# Conspiracy Generator

## Data Sources

Located in:

```text
data/
├── people.js
├── events.js
├── organizations.js
├── mechanisms.js
```

Examples:

### People

* עומר אדם
* גל גדות
* נועה קירל

### Events

* הקורונה
* הנחיתה על הירח

### Organizations

* האילומינטי
* הלטאות

### Mechanisms

* תדרי רדיו סודיים
* מסרים נסתרים בטיקטוק

---

## Generator Service

Location:

```text
services/conspiracyGenerator.js
```

Responsibilities:

* Select random values from data arrays
* Select random template
* Generate complete conspiracy sentence

Example output:

> האילומינטי גייסו את גל גדות כדי לשלוט בהתחממות כדור הארץ באמצעות מסרים נסתרים בטיקטוק.

---

# Frontend Architecture

## Folder Structure

```text
src/
├── components/
│   ├── ConspiracyCard.js
│   ├── CreateConspiracyForm.js
│   ├── ConspiracyList.js
│   └── SortBar.js
│
├── services/
│   └── api.js
│
├── App.js
└── index.js
```

---

# Current Progress

## Completed

### Backend

* MongoDB connection
* Express server
* Conspiracy model
* Controllers
* Routes
* Generator service
* REST API implementation

### Frontend

* React application setup
* Backend connectivity
* Fetching conspiracies from server
* Rendering conspiracy list

---

# React State Management

## App Component

Responsibilities:

* Hold conspiracies state
* Fetch data from backend
* Pass data to child components
* Hosting all the frontend components
Example flow:

```text
App
 ├── CreateConspiracyForm
 └── ConspiracyCard
```

---

# Fetch Flow

```text
React App
      ↓
GET /conspiracies
      ↓
Express
      ↓
MongoDB
      ↓
Response
      ↓
setConspiracies()
      ↓
Render UI
```

---

# Manual Conspiracy Creation

## CreateConspiracyForm

Features:

* Textarea input
* Submit button
* POST request to backend
* Automatic list refresh

Flow:

```text
User Input
      ↓
POST /conspiracies
      ↓
MongoDB Save
      ↓
fetchConspiracies()
      ↓
UI Refresh
```

---

# Development Notes

Key architectural decisions:

* Separation of concerns
* Controllers handle business logic
* Routes handle API routing
* Services contain reusable logic
* React App owns global state
* Child components remain focused and reusable
