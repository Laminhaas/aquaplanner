const listaCadastro = JSON.parse(localStorage.getItem("usuarioCadastrado") || "[]");

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('form');
    const btnEntrar = document.querySelector("button[type='submit']");

    function adicionarCorBorda(elemento, cor) {
        elemento.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';
        elemento.style.border = `2px solid ${cor}`;
        elemento.style.boxShadow = `0 0 5px ${cor}66`;
    }

    //remover cor da borda
    function removerCorBorda(elemento) {
        elemento.style.border = '';
        elemento.style.boxShadow = '';
    }

    btnEntrar.addEventListener('click', (event) => {
        // Impede o envio automático do form
        event.preventDefault();

        // CAPTURAR VALORES DAS CONSTANTES
        const nomeInput = document.getElementById('nomeCompleto');
        const emailInput = document.getElementById('inserirEmail');
        const repetirEmailInput = document.getElementById('repetirEmail');
        const telefoneInput = document.getElementById('inserirNumero');
        const estadoInput = document.getElementById('estadoUsuario');
        const senhaInput = document.getElementById('inserirSenha');
        const repetirSenhaInput = document.getElementById('repetirSenha');

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const repetirEmail = repetirEmailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const estado = estadoInput.value.trim();
        const senha = senhaInput.value.trim();
        const repetirSenha = repetirSenhaInput.value.trim();

        let mensagensErro = [];

        // Limpa bordas antes de revalidar
        [nomeInput, emailInput, repetirEmailInput, telefoneInput, estadoInput, senhaInput, repetirSenhaInput]
            .forEach(removerCorBorda);

        // VALIDAÇÕES!!!
        if (!nome || !email || !repetirEmail || !telefone || !estado || !senha || !repetirSenha) {
            mensagensErro.push("Todos os campos são obrigatórios.");
            if (!nome) adicionarCorBorda(nomeInput, 'red');
            if (!email) adicionarCorBorda(emailInput, 'red');
            if (!repetirEmail) adicionarCorBorda(repetirEmailInput, 'red');
            if (!telefone) adicionarCorBorda(telefoneInput, 'red');
            if (!estado) adicionarCorBorda(estadoInput, 'red');
            if (!senha) adicionarCorBorda(senhaInput, 'red');
            if (!repetirSenha) adicionarCorBorda(repetirSenhaInput, 'red');
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailValido.test(email)) {
            mensagensErro.push("Por favor, digite um e-mail válido.");
            adicionarCorBorda(emailInput, 'red');
        }

        if (email && repetirEmail && email !== repetirEmail) {
            mensagensErro.push("Os e-mails não coincidem.");
            adicionarCorBorda(emailInput, 'red');
            adicionarCorBorda(repetirEmailInput, 'red');
        }

        if (senha && senha.length < 6) {
            mensagensErro.push("A senha deve ter pelo menos 6 caracteres.");
            adicionarCorBorda(senhaInput, 'red');
        }

        if (senha && repetirSenha && senha !== repetirSenha) {
            mensagensErro.push("As senhas não se coincidem.");
            adicionarCorBorda(senhaInput, 'red');
            adicionarCorBorda(repetirSenhaInput, 'red');
        }

        const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        
        if (senha && !senhaForte.test(senha)) {
            mensagensErro.push("A senha deve conter letras maiúsculas, minúsculas, números e símbolos.");
            adicionarCorBorda(senhaInput, 'red');
        }

        // Exibir mensagens de erro ou sucesso
        const divErros = document.querySelector(".error");
        
        if (mensagensErro.length > 0) {
            divErros.innerHTML = mensagensErro
                .map((msg) => `<p style="color:red; font-size:15px;">${msg}</p>`)
                .join("");
            return;
        } else {
            divErros.innerHTML = "";
        }

        //bordas verdes com animação
        [nomeInput, emailInput, repetirEmailInput, telefoneInput, estadoInput, senhaInput, repetirSenhaInput]
            .forEach(el => adicionarCorBorda(el, 'green'));

        // LocalStorage
        const dadosUsuario = {
            nomeCompleto: nome,
            email,
            repetirEmail,
            telefone,
            estadoUsuario,
            senha,
            repetirSenha,
        };

        listaCadastro.push(dadosUsuario);

        localStorage.setItem("usuarioCadastrado", JSON.stringify(listaCadastro));

        divErros.innerHTML = `<p style="color:green; font-weight:bold;">Cadastro finalizado com sucesso!</p>`;
        window.location.href = "dashboard.html"

        // Limpar o formulário
        form.reset();
    });
});
