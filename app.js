// Variáveis globais
let contadorSorteios = 0;

// Funcionalidade do toggle "Não repetir número"
const toggleCheckbox = document.getElementById('naoRepetir');

// Adiciona evento de mudança ao checkbox
toggleCheckbox.addEventListener('change', function() {
    console.log('Toggle "Não repetir número":', this.checked ? 'ATIVADO' : 'DESATIVADO');
});

// Função para sortear números
function sortearNumeros() {
    const quantidade = parseInt(document.getElementById('numeros').value);
    const minimo = parseInt(document.getElementById('de').value);
    const maximo = parseInt(document.getElementById('ate').value);
    const naoRepetir = document.getElementById('naoRepetir').checked;
    
    // Validações básicas
    if (minimo >= maximo) {
        alert('O valor "De" deve ser menor que "Até"');
        return;
    }
    
    if (naoRepetir && quantidade > (maximo - minimo + 1)) {
        alert('Não é possível sortear essa quantidade sem repetição no intervalo especificado');
        return;
    }
    
    const numerosSorteados = [];
    
    if (naoRepetir) {
        // Sorteia sem repetição
        const numerosDisponiveis = [];
        for (let i = minimo; i <= maximo; i++) {
            numerosDisponiveis.push(i);
        }
        
        for (let i = 0; i < quantidade; i++) {
            const indiceAleatorio = Math.floor(Math.random() * numerosDisponiveis.length);
            numerosSorteados.push(numerosDisponiveis[indiceAleatorio]);
            numerosDisponiveis.splice(indiceAleatorio, 1);
        }
    } else {
        // Sorteia com possível repetição
        for (let i = 0; i < quantidade; i++) {
            const numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
            numerosSorteados.push(numeroAleatorio);
        }
    }
    
    // Exibe o resultado na tela
    mostrarResultado(numerosSorteados);
}

// Função para mostrar o resultado e esconder o formulário
function mostrarResultado(numeros) {
    contadorSorteios++;
    
    // Esconde a seção do formulário
    document.getElementById('form').style.display = 'none';
    
    // Mostra a seção de resultado
    document.getElementById('resultado').style.display = 'flex';
    
    // Atualiza o contador de resultados
    document.querySelector('.resultado-info').textContent = `${contadorSorteios}º RESULTADO`;
    
    // Limpa os números anteriores
    const containerNumeros = document.getElementById('numerosSorteados');
    containerNumeros.innerHTML = '';
    
    // Adiciona cada número sorteado
    numeros.forEach(numero => {
        const divNumero = document.createElement('div');
        divNumero.className = 'numero-sorteado sora-display-medium';
        divNumero.textContent = numero;
        containerNumeros.appendChild(divNumero);
    });
}

// Função para sortear novamente (voltar ao formulário)
function sortearNovamente() {
    // Esconde a seção de resultado
    document.getElementById('resultado').style.display = 'none';
    
    // Mostra a seção do formulário
    document.getElementById('form').style.display = 'flex';
}

// Adiciona evento ao botão de sortear quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const botaoSortear = document.querySelector('.sortear-button');
    if (botaoSortear) {
        botaoSortear.addEventListener('click', function(e) {
            e.preventDefault();
            sortearNumeros();
        });
    }
});
