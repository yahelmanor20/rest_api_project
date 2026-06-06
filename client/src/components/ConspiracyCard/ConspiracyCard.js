import { useState } from "react";
import CommentForm from "../commentForm/commentForm";
import "./ConspiracyCard.css"

function ConspiracyCard({ conspiracy , onConspiracyUpdated}) {
  const [showComments, setShowComments] = useState(false);
  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}/like`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to like conspiracy');
      }
      conspiracy.likes += 1;
      onConspiracyUpdated();
    } catch (error) {
      console.error(error);
    }
  }
  const handleDislike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}/disLike`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to dislike conspiracy');
      }
      conspiracy.disLikes += 1;
      onConspiracyUpdated();  
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="conspiracy-card">
      <h3>{conspiracy.text}</h3>

      <p className="actions">
        <button onClick={handleLike} >👍 {conspiracy.likes}</button> | <button onClick={handleDislike}>👎 {conspiracy.disLikes}</button>
      </p>
      <button className="comments_button" onClick={() => setShowComments(!showComments)}>
        {showComments? "הסתר תגובות": `הצג תגובות (${conspiracy.comments.length})`}
      </button>
      <br/>
      {
        showComments &&
        <div className="comments">
        {conspiracy.comments.length === 0
          ? <p className="comments__empty">אין עדיין תגובות. היו הראשונים להגיב!</p>
          : conspiracy.comments.map((comment, index) => (
              <div key={index} className="comment-bubble">
                <span className="comment-bubble__author">{comment.author || "אנונימי"}</span>
                <span className="comment-bubble__text">{comment.text}</span>
              </div>
            ))
        }
        <CommentForm conspiracyId={conspiracy._id} onCommentAdded={onConspiracyUpdated} />
        </div>
      }
    </div>
  );
}

export default ConspiracyCard;