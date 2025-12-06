document.addEventListener('DOMContentLoaded', function() {

    const localStorageKeys = {
        diario: 'consumo_diario_fallback', 
        semanal: 'consumo_semanal_fallback',
        mensal: 'consumo_mensal_fallback',
        registros: 'aquaRegistros' 
    };

    
    const META_DIARIA_LITROS = 120; 
    const elementoMetaValor = document.querySelector('.goal-value'); 


    const dadosDiarioPadrao = [65, 59, 80, 81, 56, 55, 40, 70, 60];
    const dadosSemanalPadrao = [450, 500, 480, 510, 475, 520, 300, 490, 440, 200];
    const dadosMensalPadrao = [2200, 1850, 2000, 1950, 3000, 2050, 2000, 1900, 1980, 2050, 2150, 1800];
    

    function obterDadosDoLocalStorage(chave, dadosPadrao) {
        const dadosSalvos = localStorage.getItem(chave);
        if (dadosSalvos) {
            try {
                return JSON.parse(dadosSalvos);
            } catch (e) {
                console.error(`Erro ao analisar dados do localStorage (${chave}). Usando padrão.`, e);
                return dadosPadrao;
            }
        }
        return dadosPadrao;
    }

    function salvarDadosIniciais() {
        if (!localStorage.getItem(localStorageKeys.diario)) {
            localStorage.setItem(localStorageKeys.diario, JSON.stringify(dadosDiarioPadrao));
            localStorage.setItem(localStorageKeys.semanal, JSON.stringify(dadosSemanalPadrao));
            localStorage.setItem(localStorageKeys.mensal, JSON.stringify(dadosMensalPadrao));
        }
    }
    
    
    function carregarRegistrosUsuario() {
        const dadosSalvos = localStorage.getItem(localStorageKeys.registros);
        if (dadosSalvos) {
            try {
                const registros = JSON.parse(dadosSalvos);
                
                return registros.map(registro => ({
               
                    timestamp: registro.timestamp || (registro.data ? `${registro.data}T00:00:00` : null),
                    litros: Number(registro.litros),
                    tipo: registro.tipo
                })).filter(r => r.timestamp && !isNaN(r.litros));
            
            } catch (e) {
                console.error("Erro ao carregar registros do usuário.", e);
                return []; 
            }
        }
        return [];
    }
    
    function processarDadosMensaisParaGrafico(registros) {
        const consumoPorMes = new Array(12).fill(0); 

        registros.forEach(registro => {
            const dataRegistro = new Date(registro.timestamp); 
            const mes = dataRegistro.getMonth(); 
            const litros = registro.litros;
            
            if (!isNaN(litros) && mes >= 0 && mes <= 11) {
                consumoPorMes[mes] += litros;
            }
        });
        return consumoPorMes;
    }
    
    function processarDadosDiariosParaGrafico(registros) {
        const consumoPorDia = {};
        
        registros.forEach(registro => {
            const dataStr = registro.timestamp.split('T')[0]; 
            const litros = registro.litros;
            
            if (consumoPorDia[dataStr]) {
                consumoPorDia[dataStr] += litros;
            } else {
                consumoPorDia[dataStr] = litros;
            }
        });

        const datasOrdenadas = Object.keys(consumoPorDia).sort().reverse();
        const ultimos9Dias = datasOrdenadas.slice(0, 9).reverse(); 

        const labels = ultimos9Dias.map(dataStr => {
            const dataParts = dataStr.split('-');
            return `${dataParts[2]}/${dataParts[1]}`; 
        });
        
        const data = ultimos9Dias.map(dataStr => consumoPorDia[dataStr]);

        return { labels, data };
    }
    
  
    function processarDadosSemanaisParaGrafico(registros) {
      
        const registrosOrdenados = [...registros].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        if (registrosOrdenados.length === 0) {
            return [];
        }
        
        const semanas = [];
        let consumoSemanalAtual = 0;
        
       
        let dataInicio = new Date(registrosOrdenados[0].timestamp);
        dataInicio.setHours(0, 0, 0, 0);

        let finalDaSemana = new Date(dataInicio);
        finalDaSemana.setDate(finalDaSemana.getDate() + 6); 

        registrosOrdenados.forEach(registro => {
            const dataRegistro = new Date(registro.timestamp);
            const litros = registro.litros;
            
          
            if (dataRegistro <= finalDaSemana) {
                consumoSemanalAtual += litros;
            } else {
               
                semanas.push(consumoSemanalAtual);
                
              
                dataInicio = new Date(finalDaSemana);
                dataInicio.setDate(dataInicio.getDate() + 1);
                
            
                finalDaSemana = new Date(dataInicio);
                finalDaSemana.setDate(finalDaSemana.getDate() + 6);
            
                consumoSemanalAtual = litros;
            }
        });

       
        if (consumoSemanalAtual > 0 || semanas.length === 0) {
            semanas.push(consumoSemanalAtual);
        }
        
        return semanas.slice(-10); 
    }
    
    
    function calcularConsumoDiaMaisRecente(registros) {
        if (registros.length === 0) {
            return 0;
        }

        const registrosOrdenados = [...registros].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        if (registrosOrdenados.length === 0) {
            return 0;
        }

        const dataMaisRecenteStr = registrosOrdenados[0].timestamp.split('T')[0]; 

        let consumoTotal = 0;

        registrosOrdenados.forEach(registro => {
            if (registro.timestamp.startsWith(dataMaisRecenteStr)) {
                consumoTotal += registro.litros;
            }
        });

        return consumoTotal;
    }

    function atualizarCardMeta(consumo, meta) {
        const goalCard = document.querySelector('.goal-card .goal-content');
        if (!goalCard) return;

        if (elementoMetaValor) {
            elementoMetaValor.textContent = `${meta} L`;
        }

        let statusClass = 'status-ok';
        let statusMensagem = `Consumo Real: ${consumo} L`;

        if (consumo > meta) {
            statusClass = 'status-excedido';
            statusMensagem = `Consumo Excedido! (${consumo} L)`;
        } else if (consumo > meta * 0.90) { 
            statusClass = 'status-atencao';
        }

        let statusElement = document.getElementById('goal-status');
        if (!statusElement) {
            statusElement = document.createElement('p');
            statusElement.id = 'goal-status';
            goalCard.appendChild(statusElement);
        }
        
        statusElement.textContent = statusMensagem;
        
        statusElement.classList.remove('status-ok', 'status-atencao', 'status-excedido');
        statusElement.classList.add(statusClass);
    }


    salvarDadosIniciais();

    const registrosBrutos = carregarRegistrosUsuario();

    const dadosDiariosProcessadosObj = processarDadosDiariosParaGrafico(registrosBrutos);
    const dadosMensaisProcessados = processarDadosMensaisParaGrafico(registrosBrutos);
   
    const dadosSemanaisProcessados = processarDadosSemanaisParaGrafico(registrosBrutos);
    
    const consumoHoje = calcularConsumoDiaMaisRecente(registrosBrutos);
    atualizarCardMeta(consumoHoje, META_DIARIA_LITROS);
    
    const dadosConsumoDiario = (dadosDiariosProcessadosObj.data.length > 0)
        ? dadosDiariosProcessadosObj.data 
        : obterDadosDoLocalStorage(localStorageKeys.diario, dadosDiarioPadrao);
        
    const labelsDiarios = (dadosDiariosProcessadosObj.labels.length > 0)
        ? dadosDiariosProcessadosObj.labels
        : ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7', 'Dia 8', 'Dia 9'];

   
    const dadosConsumoSemanal = (dadosSemanaisProcessados.some(v => v > 0)) 
        ? dadosSemanaisProcessados 
        : obterDadosDoLocalStorage(localStorageKeys.semanal, dadosSemanalPadrao);
    
    const dadosConsumoMensal = (dadosMensaisProcessados.some(v => v > 0)) 
        ? dadosMensaisProcessados 
        : obterDadosDoLocalStorage(localStorageKeys.mensal, dadosMensalPadrao);
        
   
    const labelsSemanais = Array.from({length: dadosConsumoSemanal.length}, (_, i) => `Semana ${i + 1}`);
   
    function showChartFromHash() {

        let hash = window.location.hash;

        document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active');
        });

        document.querySelectorAll('.submenu li').forEach(li => {
            li.classList.remove('active-submenu');
        });
       
        document.querySelectorAll('.has-submenu').forEach(item => {
             item.classList.remove('active');
        });

        if (!hash || hash === '#') {
            document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
                wrapper.classList.add('active');
            });

        } else {

            try {
                const activeChart = document.querySelector(hash);
                if (activeChart) {
                    activeChart.classList.add('active');
                }

              
                const activeLink = document.querySelector(`.submenu a[href*="${hash}"]`); 
                if (activeLink) {
                    activeLink.closest('li').classList.add('active-submenu');
                  
                    activeLink.closest('.has-submenu').classList.add('active'); 
                }
            } catch (e) {
                console.error("Gráfico não encontrado:", hash);
            }
        }
    }

    const corGrafico = '#004a9e';
    const corBorda = '#004a9e';
    const opcoesPadrao = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Consumo (Litros)' }
            },
            
        },
        plugins: {
            legend: { display: false }
        }
    };

    const ctxDiario = document.getElementById('graficoDiario');
    if (ctxDiario) {
        new Chart(ctxDiario, {
            type: 'bar',
            data: {
                labels: labelsDiarios, 
                datasets: [{
                    label: 'Consumo (Litros)',
                    data: dadosConsumoDiario,
                    backgroundColor: corGrafico,
                    borderColor: corBorda,
                    borderWidth: 1
                }]
            },
            options: opcoesPadrao
        });
    }

    const ctxSemanal = document.getElementById('graficoSemanal');
    if (ctxSemanal) {
        new Chart(ctxSemanal, {
            type: 'bar',
            data: {
             
                labels: labelsSemanais,
                datasets: [{
                    label: 'Consumo (Litros)',
                    data: dadosConsumoSemanal,
                    backgroundColor: corGrafico,
                    borderColor: corBorda,
                    borderWidth: 1
                }]
            },
            options: opcoesPadrao
        });
    }

    const ctxMensal = document.getElementById('graficoMensal');
    if (ctxMensal) {
        new Chart(ctxMensal, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Consumo (Litros)',
                    data: dadosConsumoMensal,
                    backgroundColor: corGrafico,
                    borderColor: corBorda,
                    borderWidth: 1
                }]
            },
            options: opcoesPadrao
        });
    }

    showChartFromHash();
    window.addEventListener('hashchange', showChartFromHash);
    

    const itemGraficos = document.querySelector('.side-nav li.has-submenu');

    if (itemGraficos) {
        const linkToggle = itemGraficos.querySelector('a');

        linkToggle.addEventListener('click', (e) => {
         
            if (linkToggle.getAttribute('href') === '#graficos-toggle' || linkToggle.getAttribute('href') === '#') {
                e.preventDefault(); 
            }
         
            itemGraficos.classList.toggle('active');
        });
    }

    
});
