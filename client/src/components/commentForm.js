import { useState } from "react";

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
    <div>
        <button onClick={() =>setShowAddComment(!ShowAddComment)}>{!ShowAddComment?"הגב":"סגור"}</button>
        
        {
          ShowAddComment &&
        <div>
          <input
            type="text"
            placeholder="שם"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
            <br />
          <input
            type="text"
            placeholder="תגובה"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
            <br />
          <button onClick={handleCommentSubmit}>שלח</button>
      </div>
        }
    </div>
  );
}

export default CommentForm;