import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {

    const callAPI = async () => {
      const query = "https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}"
      const response = await fetch(query);
      const json = await response.json();
      try{
        if (json.url == null) {
          alert("Oops! Something went wrong with that query, let's try again!")
        } else {
          setCatImg(json.url);
          setAttributes([]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    }

    return (
        <div>
           
        </div>
    );
};

export default App;
