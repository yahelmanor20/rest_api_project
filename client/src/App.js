import { useEffect, useState } from "react";
import ConspiracyCard from "./components/ConspiracyCard/ConspiracyCard.js";
import CreateConspiracyForm from "./components/CreateConspiracyForm/CreateConspiracyForm.js";
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
      <header className="header">
        <h1>הקונספירטור</h1>
        <p>
        תתעוררו כבשים! 🐑 &#60;---- אתם
        </p>
      </header>
      <button className="primary-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
        {!showCreateForm?"+ קונספירציה חדשה":"סגור"}        
      </button> 
      {
      showCreateForm && (
      <CreateConspiracyForm onConspiracyCreated={fetchConspiracies}/>
      )}
      <br/>

      <SortBar onSortUpdate={fetchConspiracies} currentSort={sort}/>

      {conspiracies.map((conspiracy) => (
        <ConspiracyCard key={conspiracy.id} conspiracy={conspiracy} onConspiracyUpdated={fetchConspiracies} />
      ))}
    </div>
  );
}

export default App;