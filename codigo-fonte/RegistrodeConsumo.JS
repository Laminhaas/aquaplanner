document.addEventListener("DOMContentLoaded", () => {
    const botaoRegistrar = document.querySelector("button[type='submit']");
    const form = document.getElementById('ConsumoForm');

    botaoRegistrar.addEventListener("click", (event) => {
        event.preventDefault();
        
        const data = document.getElementById('data').value;
        const litrosInput = document.getElementById('litros').value; 
        const tipo = document.getElementById('tipoConsumo').value;

       
        if (!data || !litrosInput || tipo === "selecione") {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        
        
        const litrosValor = parseInt(litrosInput);

        if (isNaN(litrosValor) || litrosValor < 0) {
            alert("Por favor, insira um valor válido e positivo para Litros.");
            return;
        }

        console.log("Dados:", data, litrosValor, tipo);

    
        const registro = {
            data: data,
            litros: litrosValor, 
            tipo: tipo
        };

        const localStorageKey = "aquaRegistros";

        let registros = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        registros.push(registro);
        localStorage.setItem(localStorageKey, JSON.stringify(registros));

        alert("Consumo Registrado!");

        form.reset();
    });
});

