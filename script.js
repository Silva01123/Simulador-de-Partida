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

// Atualiza os escudos assim que os times forem escolhidos (dinamicamente)
function atualizarEscudos() {
    const time1 = time1Select.value;
    const time2 = time2Select.value;

    escudo1.src = getCaminhoEscudo(time1);
    escudo1.alt = `Escudo do ${time1}`;

    escudo2.src = getCaminhoEscudo(time2);
    escudo2.alt = `Escudo do ${time2}`;
}

// Adiciona os escudos imediatamente ao trocar a seleção
time1Select.addEventListener('change', atualizarEscudos);
time2Select.addEventListener('change', atualizarEscudos);

// Função para soltar o confete de comemoração
function soltarConfete() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Função principal que executa quando o botão for clicado
botaoSimular.addEventListener('click', function () {
    const time1 = time1Select.value;
    const time2 = time2Select.value;

    atualizarEscudos(); // Garante que escudos estejam certos

    if (time1 === time2) {
        placar.textContent = "Escolha dois times diferentes!";
        placar.style.backgroundColor = "#FF4C4C";
        placar.classList.remove('show');
        return;
    }

    const golsTime1 = Math.floor(Math.random() * 6);
    const golsTime2 = Math.floor(Math.random() * 6);

    const resultado = `${time1} ${golsTime1} x ${golsTime2} ${time2}`;
    placar.textContent = resultado;

    if (golsTime1 > golsTime2) {
        placar.style.backgroundColor = '#4CAF50';
        soltarConfete();
    } else if (golsTime1 < golsTime2) {
        placar.style.backgroundColor = '#2196F3';
        soltarConfete();
    } else {
        placar.style.backgroundColor = '#9E9E9E';
    }

    placar.classList.add('show');
});
