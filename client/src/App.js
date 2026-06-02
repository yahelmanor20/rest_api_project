import { useEffect, useState } from "react";
import ConspiracyCard from "./components/ConspiracyCard";
import CreateConspiracyForm from "./components/CreateConspiracyForm";

function App() {
  const [conspiracies, setConspiracies] = useState([]);

  const fetchConspiracies = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/conspiracies"
      );

      const data = await response.json();
      setConspiracies(data);
    }
   catch (error) {
     console.error(error);
    }
  };

  useEffect(() => {
    fetchConspiracies();
  }, []);

  return (
    <>
      <CreateConspiracyForm
        onConspiracyCreated={fetchConspiracies}
    />
      {conspiracies.map((conspiracy) => (
        <ConspiracyCard key={conspiracy.id} conspiracy={conspiracy} />
      ))}
    </>
  );
}

export default App;