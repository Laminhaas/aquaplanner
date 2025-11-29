document.addEventListener('DOMContentLoaded', () => {
const KEYS = {
AGUA_ECONOMIZADA: 'aquaWaterEconomizada',
ENERGIA_ECONOMIZADA: 'aquaEnergyEconomizada',
RANK_POSICAO: 'aquaRankPosition'
};
const DEFAULT_VALUES = {
agua: 1500,
energia: 0.026, 
rank: 10 
};
function getValue(key, defaultValue) 
{
const raw = localStorage.getItem(key);
if (raw === null) 
return defaultValue;

const n = Number(raw);
return isNaN(n) ? defaultValue : n;
}
function atualizarImpactoNaTela() {
const agua = getValue(KEYS.AGUA_ECONOMIZADA, DEFAULT_VALUES.agua);
const energia = getValue(KEYS.ENERGIA_ECONOMIZADA, DEFAULT_VALUES.energia);
const ranking = getValue(KEYS.RANK_POSICAO, DEFAULT_VALUES.rank);

document.getElementById('consumo-agua-valor')?.textContent = agua.toLocaleString('pt-BR');
document.getElementById('consumo-energia-valor')?.textContent = energia.toFixed(3).replace('.', ','); 
document.getElementById('ranking-posicao-valor')?.textContent = `${ranking}º`;
}
atualizarImpactoNaTela();

});
