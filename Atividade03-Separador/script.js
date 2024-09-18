function separar() {
    // Limpa o resultado anterior
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // Pega a palavra digitada
    const palavra = document.getElementById('palavra').value;

    // Para cada letra da palavra, cria uma div com estilo e exibe
    for (let letra of palavra) {
        const letraDiv = document.createElement('div');
        letraDiv.classList.add('letra');
        letraDiv.textContent = letra;
        resultadoDiv.appendChild(letraDiv);
    }
}
