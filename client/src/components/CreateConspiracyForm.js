import { useState } from "react";

function CreateConspiracyForm({ onConspiracyCreated }) {
    const [name, setName] = useState("");
    const handleSubmit = async () => {
    try {
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
            const response = await fetch(
                "http://localhost:5000/conspiracies",
                {
                method: "DELETE",
                headers: {
                    
                },
                body: JSON.stringify({
                   
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

  return (
    <div>
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="כתוב קונספירציה..."
      />
        <br />
      <button onClick={handleSubmit}>פרסם</button>
      <button onClick={handleDelete}>מחק קונספירציה</button>
    </div>
  );
}

export default CreateConspiracyForm;