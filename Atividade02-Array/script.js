// Array para armazenar os valores
const valores = [];

// Função para adicionar valor ao vetor
function adicionarValor() {
    const valorInput = document.getElementById('valorInput');
    const valor = parseFloat(valorInput.value);

    if (!isNaN(valor)) {
        valores.push(valor);
        valorInput.value = ''; // Limpa o input
        atualizarExibicao();
    } else {
        alert('Por favor, insira um valor numérico válido.');
    }
}

// Função para atualizar a exibição dos valores e da média
function atualizarExibicao() {
    const valoresLista = document.getElementById('valoresLista');
    const mediaValor = document.getElementById('mediaValor');

    // Atualiza a lista de valores
    valoresLista.textContent = valores.length > 0 ? valores.join(', ') : 'Nenhum valor adicionado ainda.';

    // Calcula e exibe a média
    const soma = valores.reduce((acc, valor) => acc + valor, 0);
    const media = valores.length > 0 ? soma / valores.length : 0;
    mediaValor.textContent = media.toFixed(2);
}
