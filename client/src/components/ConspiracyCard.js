import { useState } from "react";

function ConspiracyCard({ conspiracy }) {
  const [likes, setLikes] = useState(conspiracy.likes);
  const [disLikes, setDisLikes] = useState(conspiracy.disLikes);

  const handleLike = async () => {
    conspiracy.likes += 1;
    try {
      const response = await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}/like`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to like conspiracy');
      }
      setLikes(conspiracy.likes);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDislike = async () => {
    conspiracy.disLikes += 1;
    try {
      const response = await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}/disLike`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to dislike conspiracy');
      }
      setDisLikes(conspiracy.disLikes);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h3>{conspiracy.text}</h3>

      <p>
        <button onClick={handleLike}>👍 {likes}</button> | <button onClick={handleDislike}>👎 {disLikes}</button>
      </p>
      <h4>תגובות</h4>

      {conspiracy.comments.map((comment, index) => (
      <div key={index}>
        <strong>{comment.author}</strong>: {comment.text}
      </div>
      ))}
    </div>
  );
}

export default ConspiracyCard;