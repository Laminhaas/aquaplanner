//MENU RESPONSIVO
const menuToggle = document.getElementById('menu-toggle');
const topNav = document.querySelector('.top-nav');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    topNav.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// DADOS DASHBOARD
document.addEventListener('DOMContentLoaded', () => {
    atualizarDicaDiaria();
    
    // verificar se é o primeiro acesso ou se acabou de registrar uma conta
    const firstTimeKey = 'primeiroAcesso';
    const hasAccount = localStorage.getItem('usuarioLogado');
    
    // Se for primeiro acesso OU o usuário acabou de criar conta, zerar os cards
    if (localStorage.getItem(firstTimeKey) === 'true' || !hasAccount) {
        resetDashboardCards();
        localStorage.removeItem(firstTimeKey); // Remove a flag após zerar
    } else {
        // Inicializar dashboard com dados reais
        initDashboardComDadosReais();
    }
});

function atualizarDicaDiaria() {
    const dicasDiarias = [
        "Reaproveite água da chuva.",
        "Feche a torneira ao escovar os dentes.",
        "Verifique vazamentos regularmente.",
        "Use a máquina de lavar na capacidade máxima.",
        "Reaproveite a água do cozimento para outras receitas.",
        "Opte por descargas econômicas.",
        "Lave o carro com balde, não com mangueira.",
        "Evite banhos longos.",
        "Use água externa para uso doméstico",
        "Instale redutores de vazão nas torneiras.",
        "Conserte vazamentos imediatamente.",
        "Use balde para lavar calçadas, não mangueira.",
        "Regue plantas no início da manhã ou final da tarde.",
        "Colete água da chuva para limpeza.",
        "Não use a descarga como lixeira.",
        "Use aeradores nas torneiras.",
        "Lave frutas e vegetais em uma bacia.",
        "Ensaboe toda a louça antes de enxaguar.",
        "Desligue o chuveiro ao se ensaboar.",
        "Reutilize a água do aquário para plantas.",
        "Use vassoura para limpar áreas externas.",
        "Reduza o tempo de banho em 1 minuto.",
        "Mantenha a torneira fechada ao lavar o rosto.",
        "Use apenas a água necessária para cozinhar.",
        "Descongele alimentos na geladeira, não com água corrente."
    ];
    
    const indiceDica = Math.floor(Math.random() * dicasDiarias.length);
    const dicaDoDia = dicasDiarias[indiceDica];
    
    // Atualizar o elemento no DOM
    const dicasDiariasElement = document.getElementById("dicasDiarias");
    if (dicasDiariasElement) {
        dicasDiariasElement.textContent = dicaDoDia;
        dicasDiariasElement.style.color = "yellow";
    }
    
    // Salvar a dica do dia no localStorage para referência (opcional)
    localStorage.setItem('dicaDoDia', dicaDoDia);
    localStorage.setItem('indiceDicaDoDia', indiceDica.toString());
}

    function resetDashboardCards() {
    
     // zerar os valores dos cards
    const mesRecenteElement = document.getElementById("mesRecente");
    const percElement = document.getElementById("porcentagem");
    const consumoMedioElement = document.getElementById("consumoMedio");
    
    if (mesRecenteElement) mesRecenteElement.textContent = "0 L";
    if (percElement) {
        percElement.textContent = "0.0%";
        percElement.style.color = "yellow";
    }
    if (consumoMedioElement) consumoMedioElement.textContent = "0 L";
    
    // Resetar títulos
    const cardTitle = document.getElementById("cardTitle");
    const cardTitle2 = document.getElementById("cardTitle2");
    
    if (cardTitle) cardTitle.textContent = "Aguardando dados...";
    if (cardTitle2) cardTitle2.textContent = "Registre seu consumo";
}

function initDashboardComDadosReais() {
    // Carregar registros do localStorage
    const localStorageKey = "aquaRegistros";
    let registros = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    if (registros.length === 0) {
        resetDashboardCards();
        return;
    }

    // Processar registros para calcular métricas
    const metricas = calcularMetricasDashboard(registros);
    
    //DOM
    const mesRecenteElement = document.getElementById("mesRecente");
    const percElement = document.getElementById("porcentagem");
    const consumoMedioElement = document.getElementById("consumoMedio");
    const cardTitle = document.getElementById("cardTitle");
    const cardTitle2 = document.getElementById("cardTitle2");

    //CARD 1: Média de consumo mensal, semanal e diário
    if (mesRecenteElement) {
        mesRecenteElement.textContent = `${metricas.mediaDiaria} L/dia`;
    }
    
    // Atualizar título baseado no tipo de consumo mais recente
    const tipoRecente = metricas.tipoRecente || "diário";
    if (cardTitle) {
        if (tipoRecente === "mensal") {
            cardTitle.textContent = "Média Mensal";
            if (mesRecenteElement) mesRecenteElement.textContent = `${metricas.mediaMensal} L/mês`;
        } else if (tipoRecente === "semanal" || tipoRecente === "semestral") {
            cardTitle.textContent = "Média Semanal";
            if (mesRecenteElement) mesRecenteElement.textContent = `${metricas.mediaSemanal} L/semana`;
        } else {
            cardTitle.textContent = "Média Diária";
        }
    }

    //CARD 2: Comparativo real entre períodos
    if (percElement) {
        percElement.textContent = metricas.variacaoFormatada;
        percElement.style.color = metricas.corVariacao;
    }

    if (cardTitle2) {
        if (tipoRecente === "mensal") {
            cardTitle2.textContent = "em relação ao mês anterior";
        } else if (tipoRecente === "semanal" || tipoRecente === "semestral") {
            cardTitle2.textContent = "em relação à semana anterior";
        } else {
            cardTitle2.textContent = "em relação ao dia anterior";
        }
    }

    //CARD 3: Consumo médio e verificação de meta
    const metaDiaria = 120; // Meta diária em litros
    const consumoHoje = calcularConsumoHoje(registros);
    const diferencaMeta = metaDiaria - consumoHoje;
    
    if (consumoMedioElement) {
        if (diferencaMeta >= 0) {
            consumoMedioElement.textContent = `${diferencaMeta} L disponíveis`;
            consumoMedioElement.style.color = "green";
        } else {
            consumoMedioElement.textContent = `${Math.abs(diferencaMeta)} L excedidos`;
            consumoMedioElement.style.color = "red";
            // Mostrar alerta de meta excedida
            mostrarAlertaMetaExcedida(Math.abs(diferencaMeta));
        }
    }
}
    function calcularMetricasDashboard(registros) {
    // Organizar registros por tipo e data
    const registrosPorTipo = {
        diario: [],
        semanal: [],
        mensal: []
    };

    // Separar registros por tipo
    registros.forEach(registro => {
        const tipo = registro.tipo === "semestral" ? "semanal" : registro.tipo;
        if (registrosPorTipo[tipo]) {
            registrosPorTipo[tipo].push({
                ...registro,
                data: new Date(registro.data)
            });
        }
    });

    // Calcular médias
    const medias = {
        mediaDiaria: 0,
        mediaSemanal: 0,
        mediaMensal: 0,
        tipoRecente: "diario"
    };

    // Média diária (soma todos os registros diários e divide pelo número de dias)
    if (registrosPorTipo.diario.length > 0) {
        const totalDiario = registrosPorTipo.diario.reduce((sum, reg) => sum + reg.litros, 0);
        const diasUnicos = new Set(registrosPorTipo.diario.map(r => r.data.toDateString())).size;
        medias.mediaDiaria = Math.round(totalDiario / Math.max(diasUnicos, 1));
        medias.tipoRecente = "diario";
    }

    // Média semanal
    if (registrosPorTipo.semanal.length > 0) {
        const totalSemanal = registrosPorTipo.semanal.reduce((sum, reg) => sum + reg.litros, 0);
        medias.mediaSemanal = Math.round(totalSemanal / Math.max(registrosPorTipo.semanal.length, 1));
        medias.tipoRecente = "semanal";
    }

    // Média mensal
    if (registrosPorTipo.mensal.length > 0) {
        const totalMensal = registrosPorTipo.mensal.reduce((sum, reg) => sum + reg.litros, 0);
        medias.mediaMensal = Math.round(totalMensal / Math.max(registrosPorTipo.mensal.length, 1));
        medias.tipoRecente = "mensal";
    }

    // Calcular variação (comparativo com período anterior)
    let variacao = 0;
    let corVariacao = "yellow";

    if (registros.length >= 2) {
        // Ordenar por data (mais recente primeiro)
        registros.sort((a, b) => new Date(b.data) - new Date(a.data));
        
        const ultimo = registros[0].litros;
        const penultimo = registros[1].litros;
        
        if (penultimo !== 0) {
            variacao = ((ultimo - penultimo) / penultimo) * 100;
        }
        
        corVariacao = variacao > 0 ? "red" : variacao < 0 ? "green" : "yellow";
    }

    return {
        ...medias,
        variacaoFormatada: `${variacao.toFixed(1)}%`,
        corVariacao
    };
}

function calcularConsumoHoje(registros) {
    const hoje = new Date().toISOString().split('T')[0];
    return registros
        .filter(reg => reg.data === hoje)
        .reduce((sum, reg) => sum + reg.litros, 0);
}

function mostrarAlertaMetaExcedida(excesso) {
    // Verificar se já existe um alerta
    let alerta = document.getElementById('alerta-meta-excedida');
    
    if (!alerta) {
        alerta = document.createElement('div');
        alerta.id = 'alerta-meta-excedida';
        alerta.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff4444, #cc0000);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 350px;
            border-left: 5px solid #ffcc00;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        alerta.innerHTML = `
            <div class="conteudo-alerta" style="padding-right: 25px;">
                <strong style="font-size: 16px;">⚠️ Meta Diária Excedida!</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px;">
                    Sua meta de 120L foi excedida em <strong>${excesso}L</strong>.
                </p>
            </div>
            <button id="fechar-alerta" style="
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button> `;
        
        document.body.appendChild(alerta);
        
        //evento para fechar o alerta
        document.getElementById('fechar-alerta').addEventListener('click', () => {
            alerta.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (alerta.parentNode) {
                    alerta.remove();
                }
            }, 300);
        });
        
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => {
                    if (alerta.parentNode) {
                        alerta.remove();
                    }
                }, 500);
            }
        }, 10000);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
};
