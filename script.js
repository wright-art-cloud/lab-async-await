// script.js

// Attach event listener to the search form
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // stop page reload

  const word = document.getElementById('search-input').value.trim();
  if (word) {
    console.log('Searching for:', word); 
    fetchWordData(word);
  } else {
    alert('Please enter a word to search.');
  }
});

function fetchWordData(word) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      console.log('Fetch response:', response);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      return response.json();
    })
    .then(data => {
      console.log("API data:", data);
      displayWordData(data[0]); // pass first result
    })
    .catch(error => {
      console.error('Error fetching word:', error);
      resultsDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

function displayWordData(wordData) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  const word = wordData.word;
  const phonetic = wordData.phonetics[0]?.text || "N/A";

  const heading = document.createElement('h2');
  heading.textContent = word;

  const pronunciation = document.createElement('p');
  pronunciation.textContent = `Pronunciation: ${phonetic}`;

  resultsDiv.appendChild(heading);
  resultsDiv.appendChild(pronunciation);

  wordData.meanings.forEach(meaning => {
    const partOfSpeech = document.createElement('h3');
    partOfSpeech.textContent = meaning.partOfSpeech;
    resultsDiv.appendChild(partOfSpeech);

    meaning.definitions.forEach(def => {
      const defPara = document.createElement('p');
      defPara.textContent = `Definition: ${def.definition}`;
      resultsDiv.appendChild(defPara);

      if (def.example) {
        const examplePara = document.createElement('p');
        examplePara.textContent = `Example: ${def.example}`;
        resultsDiv.appendChild(examplePara);
      }

      if (def.synonyms && def.synonyms.length > 0) {
        const synonymsPara = document.createElement('p');
        synonymsPara.textContent = `Synonyms: ${def.synonyms.join(', ')}`;
        resultsDiv.appendChild(synonymsPara);
      }
    });
  });

  // --- Saved words list ---
  const postList = document.getElementById('post-list');

  // Check if word already exists
  let existing = Array.from(postList.children).find(li => li.textContent === word);
  if (!existing) {
    const li = document.createElement('li');
    li.textContent = word;

    // Allow clicking to re-search
    li.addEventListener('click', () => {
      fetchWordData(word);
    });

    postList.appendChild(li);
  }
}
