document.addEventListener("DOMContentLoaded", () => {
const botaoRegistrar = document.querySelector("button[type='submit']");
botaoRegistrar.addEventListener("click", (event) => {
event.preventDefault();
const data = document.getElementById('data').value;
const litros = document.getElementById('litros').value;
const tipo = document.getElementById('tipoConsumo').value;

if (!data || !litros || tipo === "selecione") 
{
alert("Por favor, preencha todos os campos.");
return;
}

console.log("Dados:", data, litros, tipo);

const registro = {
data: data,
litros: Number(litros),
};
const localStorageKey = "aquaRegistros"; 

let registros = JSON.parse(localStorage.getItem(localStorageKey)) || [];
registros.push(registro);
localStorage.setItem(localStorageKey, JSON.stringify(registros));

alert("Consumo Registrado");

const form = document.getElementById('ConsumoForm');
form.reset();
        
});
});
