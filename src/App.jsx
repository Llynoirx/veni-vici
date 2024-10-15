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
          setCatImg(json[0].url);
          
          let cat = json[0].breeds[0]
          setAttr({
            breed: cat.name || "N/A",
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
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    return (
        <div className="whole-page">
           <h1>Explore the Cat API!</h1>
            {catImg ? (<img className="catImg" src={catImg} alt="cat"/>):(<div></div>)}
            <div>
              <h2>Attributes</h2>
              <p>Breed: {attr.breed}</p>
              <p>Temperament: {attr.temperament}</p>
              <p>Description: {attr.description}</p>
              <p>Origin: {attr.origin}</p>
              <p>Life Span: {attr.life_span}</p>
              <p>Weight: {attr.weight.imperial}</p>
              <p>Affection Level: {attr.affection_level}</p>
              <p>Dog Friendly: {attr.dog_friendly}</p>
              <p>Energy Level: {attr.energy_level}</p>
              <p>Intelligence: {attr.intelligence}</p>
              <p>Hypoallergenic: {attr.hypoallergenic === 1 ? "Yes" : 
                  attr.hypoallergenic === 0 ? "No" : 
                  "N/A"}</p>
            </div>
            <button onClick={callAPI}>Fetch a New Cat!</button>
        </div>
    );
};

export default App;
