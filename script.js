// Pegando os elementos principais do HTML
const botaoSimular = document.getElementById('simular');
const time1Select = document.getElementById('time1');
const time2Select = document.getElementById('time2');
const placar = document.getElementById('placar');
const escudo1 = document.getElementById('escudo1');
const escudo2 = document.getElementById('escudo2');

// Função para retornar o caminho da imagem do escudo com base no nome do time
function getCaminhoEscudo(time) {
    switch (time) {
        case 'Real Madrid':
            return 'img/RealMadrid.jpg';
        case 'Chelsea':
            return 'img/Chelsea.jpg';
        case 'Fluminense':
            return 'img/Fluminense.jpg';
        case 'PSG':
            return 'img/PSG.jpg';
        default:
            return '';
    }
}

// Função para soltar o confete de comemoração
function soltarConfete() {
    confetti({
        particleCount: 150,    // Número de partículas
        spread: 70,            // Espalhamento lateral
        origin: { y: 0.6 }     // Posição de onde o confete começa (um pouco mais abaixo)
    });
}

// Função principal que executa quando o botão for clicado
botaoSimular.addEventListener('click', function() {
    // Pegando os times selecionados
    const time1 = time1Select.value;
    const time2 = time2Select.value;

    // Verificar se o usuário escolheu dois times diferentes
    if (time1 === time2) {
        placar.textContent = "Escolha dois times diferentes!";
        placar.style.backgroundColor = "#FF4C4C"; // Cor vermelha para sinalizar erro
        placar.classList.remove('show'); // Remove o efeito de vitória
        escudo1.src = ''; // Remove escudo
        escudo2.src = '';
        return; // Sai da função, não continua
    }

    // Gerar placares aleatórios (de 0 a 5 gols para cada time)
    const golsTime1 = Math.floor(Math.random() * 6);
    const golsTime2 = Math.floor(Math.random() * 6);

    // Montar o resultado em formato de texto
    const resultado = `${time1} ${golsTime1} x ${golsTime2} ${time2}`;

    // Mostrar o resultado no elemento de placar
    placar.textContent = resultado;

    // Definir os escudos dos times com base na escolha
    escudo1.src = getCaminhoEscudo(time1);
    escudo1.alt = `Escudo do ${time1}`;

    escudo2.src = getCaminhoEscudo(time2);
    escudo2.alt = `Escudo do ${time2}`;

    // Definir a cor de fundo do resultado de acordo com o placar
    if (golsTime1 > golsTime2) {
        placar.style.backgroundColor = '#4CAF50'; // Verde: Time 1 venceu
        soltarConfete(); // Soltar confete só se houver vencedor
    } else if (golsTime1 < golsTime2) {
        placar.style.backgroundColor = '#2196F3'; // Azul: Time 2 venceu
        soltarConfete(); // Confete também
    } else {
        placar.style.backgroundColor = '#9E9E9E'; // Cinza: Empate
    }

    // Ativa o efeito visual da classe .show no CSS
    placar.classList.add('show');
});
