document.getElementById('fetchCatFactButton').addEventListener('click', () => {
    const apiURL = 'https://catfact.ninja/fact';

    fetchCatFact(apiURL);
});

async function fetchCatFact(apiURL) {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const outputDiv = document.getElementById('output');

        if (data && data.fact) {
            outputDiv.innerHTML = `<p>${data.fact}</p>`;
        } else {
            outputDiv.innerHTML = `<p>Não foi possível encontrar um fato sobre gatos.</p>`;
        }

    } catch (error) {
        console.error('Erro ao buscar o fato aleatório sobre gatos:', error);
        document.getElementById('output').textContent = `Erro ao buscar o fato: ${error.message}`;
    }
}