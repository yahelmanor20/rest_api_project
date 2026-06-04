import { useEffect, useState } from "react";
import ConspiracyCard from "./components/ConspiracyCard/ConspiracyCard.js";
import CreateConspiracyForm from "./components/CreateConspiracyForm";
import SortBar from "./components/sortBar.js";
import "./app.css"

function App() {
  const [conspiracies, setConspiracies] = useState([]);
  const [sort, onSort] = useState("date");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchConspiracies = async (sortOption=sort) => {
    try {
      const response = await fetch(
        `http://localhost:5000/conspiracies?sort=${sortOption}`
      );
      const data = await response.json();
      setConspiracies(data);
      onSort(sortOption);
    }
   catch (error) {
     console.error(error);
    }
  };

  useEffect(() => {
    fetchConspiracies();
  }, []);

  return (
    <div className="app">
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        + קונספירציה חדשה
      </button> 
      {
      showCreateForm && (
      <CreateConspiracyForm onConspiracyCreated={fetchConspiracies}/>
      )}
  
    
      {conspiracies.map((conspiracy) => (
        <ConspiracyCard key={conspiracy.id} conspiracy={conspiracy} onConspiracyUpdated={fetchConspiracies} />
      ))}
      
      <SortBar onSortUpdate={fetchConspiracies}/>
    </div>
  );
}

export default App;