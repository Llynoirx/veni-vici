import React, { useState, useEffect } from 'react';
import './App.css'
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {

    const [catImg, setCatImg] = useState(null);

    const callAPI = async () => {
      const query = `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`
      try{
        const response = await fetch(query);
        const json = await response.json();
        if (json[0].url == null) {
          alert("Oops! Something went wrong with that query, let's try again!")
        } else {
          setCatImg(json[0].url);
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
            </div>
            <button onClick={callAPI}>Fetch a New Cat!</button>
        </div>
    );
};

export default App;
