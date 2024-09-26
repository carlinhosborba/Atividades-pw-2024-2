document.getElementById('fetchRandomVerseButton').addEventListener('click', () => {
    const apiURL = `https://bible-api.com/?random=verse`;

    fetchRandomVerse(apiURL);
});

async function fetchRandomVerse(apiURL) {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`Eroo HTTP! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        const outputDiv = document.getElementById('output');

        const reference = data.reference;
        const verses = data.verses[0];
        const bookName = verses.book_name;
        const chapter = verses.chapter;
        const verseNumber = verses.verse;
        const verseText = verses.text;

        outputDiv.innerHTML = `
            <h2>${bookName} ${chapter}:${verseNumber}</h2>
            <p>${verseText.trim()}</p>
        `;    
    
    } catch (error) {
        console.error('Erro ao buscar o versículo aleatório:', error);
        document.getElementById('output').textContent = `Erro ao buscar o versículo: ${error.message}`;
    }
}