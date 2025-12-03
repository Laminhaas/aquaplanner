document.addEventListener('DOMContentLoaded', function() {

    const localStorageKeys = {
        registros: 'aquaRegistros', 
        AGUA_ECONOMIZADA: 'aquaWaterEconomizada', 
        ENERGIA_ECONOMIZADA: 'aquaEnergyEconomizada',
        RANK_POSICAO: 'aquaRankPosition'
    };

    const META_DIARIA_LITROS = 120; 

    const DEFAULT_VALUES = {
        agua: 1500,     
        energia: 0.026, 
        rank: 10        
    };
   
    const KWH_POR_LITRO = 0.000017; 
   
    function getValue(key, defaultValue) {
        const raw = localStorage.getItem(key);
        if (raw === null) return defaultValue;

        const n = Number(raw);
        return isNaN(n) ? defaultValue : n;
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

    function calcularImpactoAgua(registros) {
        if (registros.length === 0) return 0;

        const consumoPorDia = {};
        let totalConsumo = 0;

        registros.forEach(registro => {
            const dataStr = registro.timestamp.split('T')[0];
            totalConsumo += registro.litros;
            if (!consumoPorDia[dataStr]) {
                consumoPorDia[dataStr] = 0;
            }
            consumoPorDia[dataStr] += registro.litros;
        });

        const diasRegistrados = Object.keys(consumoPorDia).length;
        
        if (diasRegistrados === 0) return 0;

        const mediaDiaria = totalConsumo / diasRegistrados;
        
     
        let economiaDiaria = META_DIARIA_LITROS - mediaDiaria;

        if (economiaDiaria <= 0) {
            return 0;
        }

        const economiaTotal = Math.round(economiaDiaria * diasRegistrados);
        
        return economiaTotal;
    }

    function calcularImpactoEnergia(aguaEconomizada) {
    
        const energiaTotal = aguaEconomizada * KWH_POR_LITRO;
        return energiaTotal;
    }
    
    function simularRanking(aguaEconomizada) {
        if (aguaEconomizada > 5000) return 1;
        if (aguaEconomizada > 2000) return 3;
        if (aguaEconomizada > 500) return 5;
        if (aguaEconomizada > 100) return 8;
        return DEFAULT_VALUES.rank;
    }


    function atualizarImpactoNaTela(registros) {
        const aguaCalculada = calcularImpactoAgua(registros);
        const energiaCalculada = calcularImpactoEnergia(aguaCalculada);
        const rankingCalculado = simularRanking(aguaCalculada);

     
        const agua = getValue(localStorageKeys.AGUA_ECONOMIZADA, DEFAULT_VALUES.agua);
        const energia = getValue(localStorageKeys.ENERGIA_ECONOMIZADA, DEFAULT_VALUES.energia);
        const ranking = getValue(localStorageKeys.RANK_POSICAO, DEFAULT_VALUES.rank);
        
      
        const finalAgua = registros.length > 0 ? aguaCalculada : agua;
        const finalEnergia = registros.length > 0 ? energiaCalculada : energia;
        const finalRanking = registros.length > 0 ? rankingCalculado : ranking;

      
        document.getElementById('consumo-agua-valor').textContent = finalAgua.toLocaleString('pt-BR');
      
        document.getElementById('consumo-energia-valor').textContent = finalEnergia.toFixed(3).replace('.', ','); 
        
      
        document.getElementById('ranking-posicao-valor').textContent = `${finalRanking}º`;

      
        if (registros.length > 0) {
            localStorage.setItem(localStorageKeys.AGUA_ECONOMIZADA, finalAgua);
            localStorage.setItem(localStorageKeys.ENERGIA_ECONOMIZADA, finalEnergia);
            localStorage.setItem(localStorageKeys.RANK_POSICAO, finalRanking);
        }
    }

    const registrosBrutos = carregarRegistrosUsuario();
    atualizarImpactoNaTela(registrosBrutos);

});
