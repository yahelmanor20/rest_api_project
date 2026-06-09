<div dir="rtl">

# 📝 מדריך הכנה למבחן – פרויקט "הקונספירטור"

מדריך זה מבוסס על הקוד האמיתי בפרויקט. מומלץ לעבור על כל שאלה ולנסות לענות בעל-פה,
ואז לוודא מול הקוד. בסוף יש משימות תכנות מעשיות ושאלות "מלכודת" עדינות.

---

## חלק א' – REST API ו-HTTP (מושגי יסוד)

1. מה זה REST API? מה ההבדל בין REST לבין דרכים אחרות לתקשורת בין שרת ללקוח?
2. הסבר על שיטות ה-HTTP בפרויקט שלך ומתי משתמשים בכל אחת:
   `GET`, `POST`, `PATCH`, `DELETE`. מה ההבדל בין `PATCH` ל-`PUT`?
3. מה ההבדל בין `POST /conspiracies` לבין `GET /conspiracies`?
4. מה המשמעות של קודי הסטטוס הבאים, ואיפה הם מופיעים בקוד שלך?
   `200`, `201`, `400`, `404`, `500`.
   - למה ביצירת קונספירציה החזרת `201` ולא `200`? ([conspiracyController.js:53](contorollers/conspiracyController.js#L53))
5. מה זה `req.params`, `req.query`, ו-`req.body`? תן דוגמה לכל אחד מהקוד שלך.
   - רמז: `req.params.id` במחיקה, `req.query.sort` במיון, `req.body.text` ביצירה.
6. מה תפקיד ה-header `Content-Type: application/json` בבקשות מה-Frontend?
7. מה זה CORS ולמה היה צריך את `app.use(cors())` ב-[server.js](server.js#L13)?
   מה היה קורה בלעדיו?

---

## חלק ב' – Express (השרת)

8. מה ההבדל בין `app` לבין `router`? למה פיצלת את ה-routes לקובץ נפרד
   ([conspiracyRouter.js](routes/conspiracyRouter.js))?
9. מה זה Middleware ב-Express? מה תפקיד הפרמטר `next`?
10. הסבר את השורה הבאה — למה יש שתי פונקציות?
    ```js
    router.post("/:id/like", Contoroller.getConspiracy, Contoroller.likeConspiracy);
    ```
    - מה עושה `getConspiracy` ומה היא מעבירה הלאה דרך `res.conspiracy`?
11. מה עושה `app.use(express.json())` ב-[server.js:14](server.js#L14)?
    מה היה קורה ל-`req.body` בלעדיו?
12. למה הסדר של ה-routes חשוב? מה היה קורה אם `router.get('/:id')`
    היה מופיע **לפני** route ספציפי יותר?

---

## חלק ג' – Mongoose ו-MongoDB

13. מה זה Schema ומה זה Model ב-Mongoose? הצבע עליהם ב-[models/conspiracy.js](models/conspiracy.js).
14. הסבר את ההגדרות בסכמה: `required`, `default`, `immutable`.
    - למה השדה `createAT` מוגדר כ-`immutable`?
15. איך מוגדר מערך של אובייקטים בסכמה (שדה ה-`comments`)?
16. הסבר את הפונקציות הבאות של Mongoose ואיפה הן בקוד:
    `find()`, `findById()`, `save()`, `deleteOne()`, `findOneAndDelete()`, `sort()`.
17. מה ההבדל בין `Conspiracy.find()` (על המודל) לבין `res.conspiracy.save()` (על מסמך)?
18. איך מתבצע המיון לפי תאריך / לייקים? ([conspiracyController.js:24-28](contorollers/conspiracyController.js#L24-L28))
    מה המשמעות של `{ likes: -1 }` מול `{ createAT: 1 }`?
19. מה זה `_id` במונגו? מי מייצר אותו?

---

## חלק ד' – הלוגיקה ב-Controllers

20. עבור על מסלול בקשה מלא: מה קורה מרגע שלוחצים 👍 בדפדפן ועד שהמסד מתעדכן?
    (Frontend → fetch → route → middleware → controller → save → response → refetch)
21. למה רוב הפונקציות מוגדרות `async` ומשתמשות ב-`await`? מה היה קורה בלי `await` על `save()`?
22. למה כל פעולה עטופה ב-`try / catch`? מה מוחזר ללקוח כשיש שגיאה?
23. הסבר את `req.body.likes ?? 0` ב-[createNewConspiracy](contorollers/conspiracyController.js#L48).
    מה עושה האופרטור `??` ומה ההבדל בינו לבין `||`?
24. מה עושה `addComment` אם לא נשלח טקסט תגובה? ([conspiracyController.js:79](contorollers/conspiracyController.js#L79))
25. הסבר את `generateConspiracyController` — **שים לב:** האם הקונספירציה
    שנוצרת אוטומטית נשמרת במסד? ([conspiracyController.js:93-104](contorollers/conspiracyController.js#L93-L104))

---

## חלק ה' – שירות הג'נרטור (Generator Service)

26. הסבר איך עובדת `randomItem` ב-[conspiracyGenerator.js:6](services/conspiracyGenerator.js#L6).
    מה עושה `Math.floor(Math.random() * arr.length)`?
27. למה ה-`templates` הם מערך של **פונקציות** ולא מחרוזות?
28. למה הוצאת את הג'נרטור לקובץ `services/` נפרד ולא כתבת אותו בתוך ה-controller?
    (רמז: "Separation of concerns")

---

## חלק ו' – React (Frontend)

29. מה עושה `useState`? תן 3 דוגמאות מהקוד (`conspiracies`, `sort`, `showCreateForm`).
30. מה עושה `useEffect` עם מערך תלויות ריק `[]` ב-[App.js:26](client/src/App.js#L26)?
    מתי הוא רץ?
31. מה זה "props"? איך `App` מעביר מידע ופונקציות ל-`ConspiracyCard`?
32. הסבר את התבנית של "הרמת state למעלה" (lifting state up):
    למה `fetchConspiracies` נמצא ב-`App` ומועבר לילדים כ-prop?
33. מה עושה `conspiracies.map(...)` ב-[App.js:50](client/src/App.js#L50)?
    למה React דורש `key` בכל איבר?
34. הסבר רינדור מותנה (conditional rendering): `showCreateForm && (...)` ו-`showComments ? ... : ...`.
35. מה ההבדל בין עדכון אופטימי (`conspiracy.likes += 1`) לבין `fetchConspiracies()`
    שמתבצע אחריו ב-[ConspiracyCard.js:15-16](client/src/components/ConspiracyCard/ConspiracyCard.js#L15-L16)?
36. למה ה-`fetch` עטוף ב-`async/await` ולמה צריך שתי קריאות `await` (אחת ל-`fetch` ואחת ל-`.json()`)?

---

## חלק ז' – משימות תכנות מעשיות (Live Coding)

נסה לבצע כל אחת מאלה לבד. אלו תוספות ריאליסטיות שמורה עשוי לבקש:

1. **Endpoint חדש:** הוסף `GET /conspiracies/count` שמחזיר את מספר הקונספירציות הכולל.
2. **שדה חדש:** הוסף לסכמה שדה `category` (מחרוזת) והצג אותו בכרטיסייה.
3. **מיון נוסף:** הוסף אפשרות מיון לפי מספר תגובות (`comments.length`).
4. **ולידציה:** מנע יצירת קונספירציה עם טקסט קצר מ-10 תווים, והחזר `400` עם הודעה.
5. **מחיקת תגובה:** הוסף `DELETE /conspiracies/:id/comment/:commentId`.
6. **כפתור Frontend:** הוסף כפתור "מחק" בכרטיסייה שקורא ל-`DELETE /conspiracies/:id`.
7. **חיפוש:** הוסף תמיכה ב-`GET /conspiracies?search=מילה` שמסנן לפי טקסט.

---

## חלק ח' – שאלות "מלכודת" עדינות בקוד שלך 🕵️

אלו נקודות שבהן הקוד עובד (או כמעט) בזכות התנהגות לא-מובנת-מאליה. הבן אותן לעומק:

1. **רגישות לאותיות גדולות/קטנות במסלולים:** ב-Frontend אתה קורא ל-`/disLike`
   (עם L גדולה) אבל ב-router הוגדר `/dislike`. למה זה בכל זאת עובד?
   (רמז: ברירת המחדל של Express היא routing שאינו case-sensitive.)
2. **המפתח ב-`map`:** ב-[App.js:51](client/src/App.js#L51) אתה משתמש ב-`key={conspiracy.id}`,
   אבל בכל שאר המקומות אתה משתמש ב-`conspiracy._id`. האם `id` (וירטואלי) באמת מגיע
   ב-JSON מהשרת? מה הסיכון אם הוא `undefined`?
3. **`generate` לא שומר:** המסלול `POST /conspiracies/generate` מחזיר טקסט אבל
   **לא שומר** במסד. מתי בכל זאת נשמרת קונספירציה אוטומטית? (כשהמשתמש לוחץ "פרסם" אחר כך.)
4. **שם השדה `createAT`:** שים לב שזה לא `createdAt` הסטנדרטי. איפה זה עלול לבלבל?
5. **`deletePopConspiracies`:** `DELETE /conspiracies` (בלי id) מוחק את הקונספירציה
   ה**אחרונה שנוצרה** (`sort: {createAT: -1}`). הסבר מתי משתמשים בזה ולמה זה מסוכן.
6. **משתני סביבה:** מה היה קורה אם קובץ `.env` חסר? אילו ערכים יהיו ל-`process.env.PORT`
   ו-`process.env.DATABASE_URL`? ([server.js](server.js))

---

## טיפים אחרונים לקראת המבחן

- היה מסוגל **לצייר את הזרימה**: דפדפן → `fetch` → Express → Router → Middleware → Controller → Mongoose → MongoDB → חזרה.
- תרגל **להריץ את הפרויקט מאפס** לפי ה-README (כולל יצירת `.env`).
- היה מוכן **להוסיף endpoint חדש בזמן אמת** — זו המשימה הכי נפוצה במבחנים כאלה.
- דע **להסביר כל שורה** ב-`server.js`, בסכמה, ובקונטרולר אחד לפחות.

בהצלחה! 🍀

</div>
