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
