function ConspiracyCard({ conspiracy }) {
  return (
    <div>
      <h3>{conspiracy.text}</h3>

      <p>
        👍 {conspiracy.likes} | 👎 {conspiracy.disLikes}
      </p>
    </div>
  );
}

export default ConspiracyCard;