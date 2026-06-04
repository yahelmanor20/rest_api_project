import { useState } from "react";
import "./CreateConspiracyForm.css"
function CreateConspiracyForm({ onConspiracyCreated }) {
    const [name, setName] = useState("");
    const handleSubmit = async () => {
      try {
        if (!name.trim()) {
          alert("אנא הזן קונספירציה לפני הפרסום.");
          return;
        }
        const response = await fetch(
        "http://localhost:5000/conspiracies",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            text: name,
            }),
        }
        );

        const data = await response.json();
        setName("");
        await onConspiracyCreated();
        console.log(data);
        
      } catch (error) { 
        console.error(error);
    }
    }
    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:5000/conspiracies", {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete conspiracy')
            }

            setName("");
            await onConspiracyCreated();
        } catch (error) { 
            console.error(error);
        }
    }
    const handleGenerate = async () => {
        try {
            const response = await fetch("http://localhost:5000/conspiracies/generate", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error('Failed to generate conspiracy')
            }
            const data = await response.json();
            setName(data.text);
            await onConspiracyCreated();
        } catch (error) { 
            console.error(error);
        }
    }

  return (
    <div>
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="כתוב קונספירציה..."
        rows={6}
        className="conspiracy-textarea"
      />
        <br />
      <div className="actionsSubmit">
        <button onClick={handleSubmit}>פרסם</button>
        <button onClick={handleDelete}>מחק קונספירציה</button>
        <button onClick={handleGenerate}>צור קונספירציה אוטומטית</button>
      </div>
    </div>
  );
}

export default CreateConspiracyForm;