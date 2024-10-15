import React, { useState, useEffect } from 'react';
import './App.css'


const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {

    const [catImg, setCatImg] = useState(null);
    const [attr, setAttr] = useState({
        name: "",
        temperament: "",
        description: "",
        origin: "",
        life_span: "",
        weight: "",
        affection_level: "",
        dog_friendly: "",
        energy_level: "",
        intelligence: "",
        hypoallergenic: ""
      });
    const [bannedAttrs, setBannedAttrs] = useState([]);


    const isBanned = (cat) => {
      return bannedAttrs.includes(cat.name);
  };

    const addToBanList = (attribute) => {
      if (!bannedAttrs.includes(attribute)) {
          setBannedAttrs((prev) => [...prev, attribute]);
      }
    };

    const remFromBanList = (attribute) => {
      setBannedAttrs((prev) => prev.filter(attr => attr !== attribute));
    };

    const callAPI = async () => {
      const query = `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${API_KEY}`
      try{
        const response = await fetch(query);
        const json = await response.json();
        console.log("HI");
        console.log('API response:', json);
        if (json == null) {
          alert("Oops! Something went wrong with that query, let's try again!")
        } else {
          let cat = json[0].breeds[0]
          if (isBanned(cat)) {
            callAPI(); 
          } else {
            setCatImg(json[0].url);
            setAttr({
              name: cat.name || "N/A",
              temperament: cat.temperament || "N/A",
              description: cat.description || "N/A",
              origin: cat.origin || "N/A",
              life_span: cat.life_span || "N/A",
              weight: cat.weight || "N/A",
              affection_level: cat.affection_level || "N/A",
              dog_friendly: cat.dog_friendly || "N/A",
              energy_level: cat.energy_level || "N/A",
              intelligence: cat.intelligence || "N/A",
              hypoallergenic: cat.hypoallergenic
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    return (
        <div className="whole-page">
           <h1>Are you looking for a new feline friend but are unsure where to start?</h1>
            <h3> Use this cat API! If there is any breed you dont think matches with your home, tap on the breed to filter it out.</h3>
            {catImg ? (<img className="catImg" src={catImg} alt="cat"/>):(<div></div>)}
            <div className="attributes-container">
                <h2>Attributes</h2>
                <div className="container" onClick={() => addToBanList(attr.name)}>
                    <strong>Breed:</strong> {attr.name}
                </div>
                <p><strong>Temperament:</strong> {attr.temperament}</p>
                <p><strong>Description:</strong> {attr.description}</p>
                <p><strong>Origin:</strong> {attr.origin}</p>
                <p><strong>Life Span:</strong> {attr.life_span}</p>
                <p><strong>Weight:</strong> {attr.weight.imperial}</p>
                <p><strong>Affection Level:</strong> {attr.affection_level}</p>
                <p><strong>Dog Friendly:</strong> {attr.dog_friendly}</p>
                <p><strong>Energy Level:</strong> {attr.energy_level}</p>
                <p><strong>Intelligence:</strong> {attr.intelligence}</p>
                <p><strong>Hypoallergenic:</strong> {attr.hypoallergenic === 1 ? "Yes" : attr.hypoallergenic === 0 ? "No" : "N/A"}</p>
                <button className="button" onClick={callAPI}>Fetch a New Cat!</button>
            </div>
            <div className="banned-attributes">
                <h2>Banned Attributes</h2>
                <ul>
                    {bannedAttrs.map((attr, index) => (
                        <li key={index} onClick={() => remFromBanList(attr)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {attr}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
