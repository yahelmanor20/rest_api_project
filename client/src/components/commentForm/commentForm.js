import { useState } from "react";
import "./commentForm.css";

function CommentForm({ conspiracyId, onCommentAdded }) {
  const [ShowAddComment, setShowAddComment] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleCommentSubmit = async () => {
        try {
            if (!text.trim()) {
                alert("אנא הזן טקסט לתגובה לפני השליחה.");
                return;
            }
            const response = await fetch(
                `http://localhost:5000/conspiracies/${conspiracyId}/comment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        author: author,
                        text: text
                    })
                });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }    
            await onCommentAdded();
            setAuthor("");
            setText("");

        } catch (error) { 
            console.error(error);
        }
}

  return (
    <div className="comment-form">
        <button className="comment-form__toggle" onClick={() =>setShowAddComment(!ShowAddComment)}>{!ShowAddComment?"הגב":"סגור"}</button>

        {
          ShowAddComment &&
        <div className="comment-form__box">
          <input
            className="comment-form__input"
            type="text"
            placeholder="שם (אופציונלי)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="comment-form__input"
            type="text"
            placeholder="כתוב תגובה..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="comment-form__submit" onClick={handleCommentSubmit}>שלח</button>
      </div>
        }
    </div>
  );
}

export default CommentForm;