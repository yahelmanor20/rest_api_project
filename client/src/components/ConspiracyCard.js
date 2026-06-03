import { useState } from "react";
import CommentForm from "./commentForm";
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
    <div>
      <h3>{conspiracy.text}</h3>

      <p>
        <button onClick={handleLike}>👍 {conspiracy.likes}</button> | <button onClick={handleDislike}>👎 {conspiracy.disLikes}</button>
      </p>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments? "הסתר תגובות": `הצג תגובות (${conspiracy.comments.length})`}
      </button>
      {
        showComments &&
        <div>
        {conspiracy.comments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.author}:</strong> {comment.text}
          </div>
        ))}
        <CommentForm conspiracyId={conspiracy._id} onCommentAdded={onConspiracyUpdated} />
        </div>
      }
    </div>
  );
}

export default ConspiracyCard;