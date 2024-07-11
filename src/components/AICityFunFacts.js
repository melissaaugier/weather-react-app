import React, { useState, useEffect } from 'react';

const apiKey = process.env.REACT_APP_KEY_GOOGLE_AI_GEMINI; 
const apiUrlBase = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;


const AICityFunFacts = ({ city }) => {
  const [facts, setFacts] = useState('');

  const fetchFacts = async () => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Write two sentences that describes fun facts about ${city}. The paragraph should not exceed 250 characters.`,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(apiUrlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch facts');
      }

      const data = await response.json();
      setFacts(data.candidates[0].content.parts[0].text); // Get the entire paragraph
    } catch (error) {
      console.error('Error fetching facts:', error);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, [city]); // Refetch on city change

  return (
    <div className='container'>
      { (facts && city) && 
        <div>
          <h2>{city}</h2>
          <p className='font-size-xxs'>{facts}</p>
        </div>
      }
    </div>
  );
};

export default AICityFunFacts;
