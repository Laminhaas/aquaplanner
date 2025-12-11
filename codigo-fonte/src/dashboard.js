//MENU RESPONSIVO
const menuToggle = document.getElementById('menu-toggle');
const topNav = document.querySelector('.top-nav');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    topNav.classList.toggle('active');
    sidebar.classList.toggle('active');
    
});

    //DADOS DASHBOARD
document.addEventListener('DOMContentLoaded', () => {

    const consumoMensal = [
        480, 510, 450, 430, 470, 520, 495, 460, 440, 490, 505, 475, 600,
    ];

    const consumoSemanal = [
        120, 135, 110, 140, 150, 130, 125,
    ];

    const consumoAnual = [
        470, 490, 440, 495, 510, 520, 465, 455, 480, 500, 505, 495,
    ];

    const dicasDiarias = [
        "Reaproveite água da chuva.",
        "Feche a torneira ao escovar os dentes.",
        "Verifique vazamentos regularmente.",
        "Use a máquina de lavar na capacidade máxima.",
        "Reaproveite a água do cozimento para outras receitas.",
        "Opte por descargas econômicas.",
        "Lave o carro com balde, não com mangueira.",
        "Evite banhos longos.",
        "Use água externa para uso doméstico"
    ];

    const modos = ["semana", "mes", "ano"];
    const modoAtual = modos[Math.floor(Math.random() * modos.length)];

    let consumoAtual = 0;
    let consumoAnterior = 0;
    let consumoMedio = 0;

    if (modoAtual === "mes") {
        consumoAtual = consumoMensal[Math.floor(Math.random() * consumoMensal.length)];
        consumoAnterior = consumoMensal[Math.floor(Math.random() * consumoMensal.length)];
        consumoMedio = Math.round(consumoMensal.reduce((a, b) => a + b, 0) / consumoMensal.length);

    } else if (modoAtual === "semana") {
        consumoAtual = consumoSemanal[Math.floor(Math.random() * consumoSemanal.length)];
        consumoAnterior = consumoSemanal[Math.floor(Math.random() * consumoSemanal.length)];
        consumoMedio = Math.round(consumoSemanal.reduce((a, b) => a + b, 0) / consumoSemanal.length);

    } else if (modoAtual === "ano") {
        consumoAtual = consumoAnual[Math.floor(Math.random() * consumoAnual.length)];
        consumoAnterior = consumoAnual[Math.floor(Math.random() * consumoAnual.length)];
        consumoMedio = Math.round(consumoAnual.reduce((a, b) => a + b, 0) / consumoAnual.length);
    }

    let porcentagem = 0.0; // se consumoAnterior for 0 -> porcentagem = 0.0

    if (consumoAnterior !== 0) {
        porcentagem = (((consumoAtual - consumoAnterior) / consumoAnterior) * 100);
    }

    const porcentagemFormatada = `${porcentagem.toFixed(1)}%`;

    // elementos no DOM
    const mesRecenteElement = document.getElementById("mesRecente");
    const percElement = document.getElementById("porcentagem");
    const consumoMedioElement = document.getElementById("consumoMedio");
    const dicasDiariasElement = document.getElementById("dicasDiarias");

    const dicasAleatorias = dicasDiarias[Math.floor(Math.random() * dicasDiarias.length)];

    // atualização dos cards
    mesRecenteElement.textContent = `${consumoAtual} L`;

    percElement.textContent = porcentagemFormatada;
    percElement.style.color = 
        consumoAnterior === 0 
        ? "yellow" : porcentagem >= 0 
        ? "green" 
        : "red";

    consumoMedioElement.textContent = `${consumoMedio} L`;

    dicasDiariasElement.textContent = dicasAleatorias;
    dicasDiariasElement.style.color = "yellow";

    console.log("Modo de exibição:", modoAtual);

  const cardTitle = document.getElementById("cardTitle");
  const cardTitle2 = document.getElementById("cardTitle2");

    //titulo primeiro card
    if (modoAtual === "mes"){
        cardTitle.textContent = "No mês atual";
    }

    else if (modoAtual === "semana"){
        cardTitle.textContent = "Na semana";
    }

    else if (modoAtual === "ano"){
        cardTitle.textContent = "No ano";
    }

    //titulos cardTitle2

    if (modoAtual === "mes"){
        cardTitle2.textContent = "em relação ao mês anterior";
    }

    else if (modoAtual === "semana"){
        cardTitle2.textContent = "em relação à semana anterior";
    }

    else if (modoAtual === "ano"){
        cardTitle2.textContent = "em relação ao ano anterior";
    }
});
