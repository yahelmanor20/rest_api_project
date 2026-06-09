<div dir="rtl">



# ✅ דף תשובות – מדריך ההכנה למבחן "הקונספירטור"

תשובות מלאות לשאלות שב-[EXAM_PREP.md](EXAM_PREP.md). מספור התשובות תואם למספור השאלות.
נסה תמיד **קודם לענות לבד**, ורק אז להציץ כאן.

---

## חלק א' – REST API ו-HTTP

**1.** REST (Representational State Transfer) הוא סגנון ארכיטקטורי לבניית API מעל HTTP.
הרעיון: כל "משאב" (resource) — למשל קונספירציה — מיוצג בכתובת (URL), ופועלים עליו
באמצעות שיטות HTTP סטנדרטיות. השרת הוא **stateless** (לא זוכר מצב בין בקשות).
לעומת דרכים אחרות (כמו RPC או WebSockets), REST פשוט, מבוסס על מוסכמות ברורות,
ועובד מצוין עם תקשורת לקוח-שרת מבוססת בקשה-תגובה.

**2.** שיטות ה-HTTP בפרויקט:
- `GET` – **קריאת** מידע (לא משנה את המסד). דוגמה: `GET /conspiracies`.
- `POST` – **יצירת** משאב חדש או הפעלת פעולה. דוגמה: `POST /conspiracies`.
- `PATCH` – **עדכון חלקי** של משאב קיים. דוגמה: `PATCH /conspiracies/:id`.
- `DELETE` – **מחיקת** משאב. דוגמה: `DELETE /conspiracies/:id`.

ההבדל בין `PATCH` ל-`PUT`: `PUT` מחליף את **כל** המשאב, `PATCH` מעדכן רק את
**השדות שנשלחו**. בקוד שלך `updateConspiracy` בודק כל שדה בנפרד (`if (req.body.text != null)`),
ולכן הוא מתנהג כמו `PATCH` אמיתי.

**3.** `POST /conspiracies` **יוצר** קונספירציה חדשה (שולח גוף בקשה עם הטקסט) ומחזיר `201`.
`GET /conspiracies` **מחזיר את הרשימה** של כל הקונספירציות הקיימות, בלי לשנות דבר.

**4.** קודי סטטוס:
- `200 OK` – הצלחה רגילה (למשל החזרת רשימה / לייק מוצלח).
- `201 Created` – נוצר משאב חדש בהצלחה. החזרנו אותו ביצירה כי זה מדויק יותר מ-`200`
  ומאותת ללקוח שנוצר משהו חדש.
- `400 Bad Request` – הבקשה לא תקינה (למשל חסר טקסט בתגובה).
- `404 Not Found` – המשאב לא נמצא (למשל `findById` החזיר `null`).
- `500 Internal Server Error` – שגיאה בלתי צפויה בשרת (למשל נפילה של המסד).

**5.**
- `req.params` – פרמטרים בנתיב עצמו. דוגמה: `req.params.id` ב-`DELETE /conspiracies/:id`.
- `req.query` – פרמטרים אחרי `?` ב-URL. דוגמה: `req.query.sort` ב-`GET /conspiracies?sort=likes`.
- `req.body` – גוף הבקשה (JSON שנשלח). דוגמה: `req.body.text` ביצירת קונספירציה.

**6.** ה-header `Content-Type: application/json` אומר לשרת שגוף הבקשה הוא JSON,
כדי ש-`express.json()` ידע לפענח אותו ל-`req.body`. בלעדיו השרת לא יידע לפרש את הגוף נכון.

**7.** CORS (Cross-Origin Resource Sharing) הוא מנגנון אבטחה בדפדפן שחוסם בקשות
בין מקורות שונים (origins). ה-Frontend רץ על `localhost:3000` וה-Backend על `localhost:5000` —
שני מקורות שונים. בלי `app.use(cors())` הדפדפן היה **חוסם** את ה-`fetch` ומחזיר שגיאת CORS.

---

## חלק ב' – Express

**8.** `app` הוא אובייקט האפליקציה הראשי (השרת כולו). `router` הוא "מיני-אפליקציה"
שמרכזת קבוצת מסלולים קשורים. פיצלנו את ה-routes לקובץ נפרד כדי לשמור על קוד מסודר
ומופרד לפי אחריות (כל הקשור לקונספירציות במקום אחד), ולחבר אותו ב-`app.use("/conspiracies", router)`.

**9.** Middleware היא פונקציה שרצה **באמצע** מסלול הבקשה, עם גישה ל-`req`, `res`, ו-`next`.
היא יכולה לבדוק, לשנות או לעצור את הבקשה. `next()` מעבירה את השליטה ל-middleware הבא
(או ל-controller הסופי). אם לא קוראים ל-`next()` ולא שולחים תגובה — הבקשה "נתקעת".

**10.** ב-`router.post("/:id/like", getConspiracy, likeConspiracy)` יש שתי פונקציות:
- `getConspiracy` רצה **ראשונה** כ-middleware: מוצאת את הקונספירציה לפי ה-`id`,
  ואם נמצאה — שומרת אותה ב-`res.conspiracy` וקוראת ל-`next()`. אם לא — מחזירה `404`.
- `likeConspiracy` רצה **אחריה**, משתמשת ב-`res.conspiracy` המוכן, מגדילה לייק ושומרת.

זו תבנית של **שיתוף לוגיקה**: במקום לחפש את הקונספירציה מחדש בכל פונקציה, עושים זאת פעם אחת.

**11.** `express.json()` הוא middleware שמפענח גוף בקשה מסוג JSON וממלא את `req.body`.
בלעדיו `req.body` היה `undefined`, ולא היינו יכולים לקרוא את `req.body.text`.

**12.** Express בודק מסלולים **לפי הסדר**. אם `router.get('/:id')` היה מופיע לפני מסלול
ספציפי כמו `/count`, אז `:id` היה "בולע" גם את `count` (חושב שזה id בשם "count").
לכן מסלולים ספציפיים צריכים לבוא **לפני** מסלולים עם פרמטרים גנריים.

---

## חלק ג' – Mongoose ו-MongoDB

**13.** **Schema** מגדיר את **המבנה** של המסמך — אילו שדות יש, מאיזה סוג ועם אילו חוקים.
**Model** הוא ה"מחלקה" שנוצרת מהסכמה (`mongoose.model("Conspiracy", schema)`), ודרכה
מבצעים פעולות על המסד (`find`, `save` וכו'). הסכמה = התבנית, המודל = הכלי לעבוד מולה.

**14.**
- `required: true` – השדה חובה; ניסיון לשמור בלעדיו ייכשל.
- `default` – ערך ברירת מחדל אם לא סופק (למשל `likes` מתחיל ב-0).
- `immutable: true` – השדה לא ניתן לשינוי אחרי היצירה. `createAT` מוגדר כך כדי
  שתאריך היצירה לא ישתנה לעולם.

**15.** מערך של אובייקטים מוגדר עם סוגריים מרובעים שבתוכם אובייקט שמתאר כל פריט:
```js
comments: [ { author: String, text: String, createAT: {...} } ]
```
כל תגובה היא תת-מסמך עם שדות משלה.

**16.**
- `find()` – מחזיר **רשימה** של מסמכים התואמים לתנאי (בלי תנאי = הכול).
- `findById(id)` – מחזיר מסמך **בודד** לפי ה-`_id` שלו.
- `save()` – שומר מסמך (חדש או קיים) במסד.
- `deleteOne()` – מוחק מסמך בודד.
- `findOneAndDelete()` – מוצא מסמך אחד לפי תנאי ומוחק אותו בפעולה אחת.
- `sort()` – ממיין את תוצאות השאילתה.

**17.** `Conspiracy.find()` נקרא על ה**מודל** ופועל על כל האוסף (collection).
`res.conspiracy.save()` נקרא על **מסמך בודד** (instance) ושומר רק אותו.

**18.** המיון:
```js
if (req.query.sort === 'date')  query = query.sort({ createAT: 1 });   // עולה: מהישן לחדש
else if (req.query.sort==='likes') query = query.sort({ likes: -1 });  // יורד: הכי הרבה לייקים קודם
```
`1` = סדר עולה, `-1` = סדר יורד.

**19.** `_id` הוא מזהה ייחודי שמונגו מייצר **אוטומטית** לכל מסמך (מסוג ObjectId).
הוא מבטיח שלכל קונספירציה יש מזהה חד-ערכי.

---

## חלק ד' – Controllers

**20.** מסלול לחיצה על 👍:
1. המשתמש לוחץ → `handleLike` ב-`ConspiracyCard` שולח `POST /conspiracies/:id/like`.
2. Express מפנה ל-route המתאים.
3. ה-middleware `getConspiracy` מוצא את הקונספירציה ושם ב-`res.conspiracy`.
4. `likeConspiracy` מגדיל `likes` ב-1 וקורא ל-`save()`.
5. השרת מחזיר את המסמך המעודכן כ-JSON.
6. ה-Frontend קורא ל-`fetchConspiracies()` כדי לרענן את הרשימה.

**21.** הפעולות `async` כי גישה למסד היא **אסינכרונית** (לוקחת זמן). `await` ממתין
שהפעולה תסתיים לפני שממשיכים. בלי `await` על `save()`, הקוד היה ממשיך מיד —
ייתכן שהיינו מחזירים תגובה **לפני** שהשמירה הסתיימה, או מפספסים שגיאות.

**22.** `try/catch` תופס שגיאות (למשל נפילת מסד) ומונע קריסה של השרת. כשיש שגיאה
מחזירים קוד מתאים (`400`/`500`) עם הודעת שגיאה ב-JSON, כך שהלקוח מקבל תשובה ברורה.

**23.** `req.body.likes ?? 0` — אם `req.body.likes` הוא `null` או `undefined`, השתמש ב-0.
האופרטור `??` (nullish coalescing) מחזיר את צד ימין **רק** כש-שמאל הוא `null`/`undefined`.
ההבדל מ-`||`: `||` היה מחליף גם ערכים "נפילים" אחרים — למשל `0` עצמו או מחרוזת ריקה.
כאן זה חשוב: אם שולחים `likes: 0`, עם `??` נשמר 0, אבל עם `||` היה נדרס ב-0 ממילא
(זהה כאן), אך עבור ערכים כמו מספר תקין הלוגיקה נכונה רק עם `??`.

**24.** אם לא נשלח טקסט, `addComment` מחזיר מיד `400` עם ההודעה
`'Comment text is required'` ולא מוסיף תגובה ריקה.

**25.** **לא!** `generateConspiracyController` יוצר אובייקט `Conspiracy` חדש בזיכרון
אבל **לא קורא ל-`save()`** — הוא רק מחזיר את הטקסט. הקונספירציה תישמר רק אם המשתמש
ילחץ אחר כך על "פרסם" (שמפעיל `POST /conspiracies` שכן שומר).

---

## חלק ה' – שירות הג'נרטור

**26.** `randomItem(arr)` מחזיר איבר אקראי ממערך:
`Math.random()` מחזיר מספר בין 0 ל-1, כפל ב-`arr.length` נותן טווח `[0, length)`,
ו-`Math.floor` מעגל כלפי מטה לאינדקס שלם תקין.

**27.** ה-`templates` הם **פונקציות** כי כל תבנית צריכה לקבל ערכים (person, event וכו')
ולהרכיב מהם משפט. פונקציה מאפשרת "למלא את החללים" בכל קריאה עם ערכים אקראיים שונים.

**28.** הוצאת הג'נרטור ל-`services/` נפרד היא **Separation of Concerns** — הפרדת אחריות.
ה-controller אחראי על תקשורת HTTP, ולא צריך להכיר את הלוגיקה של בניית המשפטים.
זה גם מאפשר לבדוק ולשנות את הג'נרטור בנפרד ולעשות בו שימוש חוזר.

---

## חלק ו' – React

**29.** `useState` יוצר משתנה מצב שגורם לרינדור מחדש כשמשתנה. דוגמאות:
- `conspiracies` – רשימת הקונספירציות מהשרת.
- `sort` – אפשרות המיון הנוכחית.
- `showCreateForm` – האם טופס היצירה פתוח (true/false).

**30.** `useEffect(fn, [])` עם מערך תלויות **ריק** רץ **פעם אחת בלבד**, מיד אחרי
הרינדור הראשון של הקומפוננטה. כאן הוא טוען את הקונספירציות הראשוניות מהשרת.

**31.** Props הם נתונים שקומפוננטת אב מעבירה לילד. `App` מעביר ל-`ConspiracyCard`
את `conspiracy` (הנתון) ואת `onConspiracyUpdated` (פונקציה לרענון), דרך תכונות ב-JSX.

**32.** "הרמת state למעלה": ה-state והפונקציה `fetchConspiracies` נמצאים ב-`App`
כי כמה קומפוננטות צריכות לרענן את אותה רשימה. מחזיקים את ה-state ברכיב האב המשותף
ומעבירים פונקציות לילדים, כך שכולם עובדים על אותו מקור אמת אחד.

**33.** `conspiracies.map(...)` יוצר רכיב `ConspiracyCard` לכל קונספירציה ברשימה.
React דורש `key` ייחודי בכל איבר כדי לזהות ביעילות אילו פריטים השתנו/נוספו/נמחקו
ולעדכן את ה-DOM בצורה אופטימלית.

**34.** רינדור מותנה:
- `showCreateForm && (<Form/>)` — מציג את הטופס **רק אם** `showCreateForm` הוא true.
- `showComments ? "הסתר" : "הצג"` — בוחר טקסט לפי תנאי (אופרטור טרנארי).

**35.** עדכון אופטימי (`conspiracy.likes += 1`) משנה את המסך **מיד** כדי שיהיה רספונסיבי,
בלי לחכות לשרת. `fetchConspiracies()` שאחריו מביא את הנתונים **האמיתיים** מהשרת
ומסנכרן, כך שאם משהו נכשל — המצב יתוקן.

**36.** `fetch` הוא אסינכרוני ומחזיר Promise, לכן צריך `await`. צריך **שני** await:
הראשון (`await fetch(...)`) ממתין לתשובת הרשת (headers/status), והשני (`await response.json()`)
ממתין לפענוח גוף התשובה ל-JSON — גם זה פעולה אסינכרונית.

---

## חלק ז' – פתרונות למשימות המעשיות

**1. `GET /conspiracies/count`:**
```js
// router (לפני '/:id'!)
router.get('/count', Contoroller.getCount);
// controller
const getCount = async (req, res) => {
  try {
    const count = await Conspiracy.countDocuments();
    res.json({ count });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
```

**2. שדה `category`:**
```js
// schema
category: { type: String, default: "כללי" }
// ConspiracyCard.js
<p className="category">{conspiracy.category}</p>
```

**3. מיון לפי מספר תגובות:** מכיוון ש-`comments.length` אינו שדה רגיל,
אפשר למיין ידנית אחרי השליפה:
```js
if (req.query.sort === 'comments') {
  const all = await Conspiracy.find();
  return res.json(all.sort((a, b) => b.comments.length - a.comments.length));
}
```

**4. ולידציית אורך:**
```js
const createNewConspiracy = async (req, res) => {
  if (!req.body.text || req.body.text.trim().length < 10) {
    return res.status(400).json({ message: "הטקסט חייב להכיל לפחות 10 תווים" });
  }
  // ... המשך כרגיל
};
```

**5. `DELETE /conspiracies/:id/comment/:commentId`:**
```js
router.delete('/:id/comment/:commentId', Contoroller.getConspiracy, Contoroller.deleteComment);

const deleteComment = async (req, res) => {
  res.conspiracy.comments = res.conspiracy.comments.filter(
    c => c._id.toString() !== req.params.commentId
  );
  try {
    await res.conspiracy.save();
    res.json(res.conspiracy);
  } catch (error) { res.status(400).json({ message: error.message }); }
};
```

**6. כפתור מחיקה ב-Frontend:**
```jsx
const handleDelete = async () => {
  await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}`, { method: 'DELETE' });
  onConspiracyUpdated();
};
// ב-JSX:
<button onClick={handleDelete}>🗑️ מחק</button>
```

**7. חיפוש בטקסט:**
```js
const getAllConspiracies = async (req, res) => {
  const filter = req.query.search
    ? { text: { $regex: req.query.search, $options: 'i' } }
    : {};
  const results = await Conspiracy.find(filter);
  res.json(results);
};
```
`$regex` מחפש לפי תבנית, `$options: 'i'` = ללא רגישות לאותיות גדולות/קטנות.

---

## חלק ח' – פתרונות לשאלות ה"מלכודת"

**1. רגישות אותיות במסלול:** Express, כברירת מחדל, **לא** רגיש לאותיות גדולות/קטנות
בנתיבים (`case sensitive routing` כבוי). לכן `/disLike` מתאים ל-`/dislike`.
**אבל** זה שביר — אם המורה היה מדליק `app.set('case sensitive routing', true)`,
הכפתור היה נשבר. הפתרון הנכון: לאחד את האיות בין הפרונט לראוטר.

**2. המפתח ב-`map`:** Mongoose יוצר getter וירטואלי בשם `id` (מחרוזת של `_id`),
אבל ב-JSON שמוחזר מהשרת **וירטואלים לא נכללים כברירת מחדל** — אז `conspiracy.id`
ב-React הוא ככל הנראה `undefined`. התוצאה: כל המפתחות זהים (`undefined`), מה שגורם
לאזהרת React ולבעיות בעדכון הרשימה. **התיקון:** להשתמש ב-`key={conspiracy._id}`.

**3. `generate` לא שומר:** המסלול רק מחזיר טקסט מוצע. הקונספירציה נשמרת רק כשהמשתמש
לוחץ "פרסם", שמפעיל `POST /conspiracies` (`createNewConspiracy`) — שם יש `save()`.
זו החלטת עיצוב הגיונית: נותנים למשתמש להציץ/לערוך לפני שמירה.

**4. השדה `createAT`:** זה איות לא-סטנדרטי (הנפוץ הוא `createdAt`). זה עובד כל עוד
משתמשים באותו שם בכל מקום (סכמה + מיון), אבל עלול לבלבל מי שמצפה ל-`createdAt`,
ולשבור קוד אם מישהו ימיין בטעות לפי `createdAt`.

**5. `deletePopConspiracies`:** `DELETE /conspiracies` (בלי id) מוחק את הקונספירציה
האחרונה שנוצרה (`findOneAndDelete({}, {sort:{createAT:-1}})`). זה מסוכן כי מחיקה
ללא מזהה ספציפי עלולה למחוק את הפריט הלא-נכון בטעות — עדיף תמיד למחוק לפי `id` מפורש.

**6. `.env` חסר:** בלי הקובץ, `process.env.PORT` ו-`process.env.DATABASE_URL` יהיו
`undefined`. התוצאה: `mongoose.connect(undefined)` ייכשל, ו-`app.listen(undefined)`
יפתח את השרת על פורט אקראי. לכן הקובץ קריטי להרצה.

</div>
