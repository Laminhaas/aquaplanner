function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

document.getElementById('enviar').addEventListener('click', function(e) {
    e.preventDefault();

    // Essa parte é pra pegar o q foi escrito no campo do email colocar toda a string em minúsculo pra padronizar a leitura pelo programa
    const emailDigitado = document.getElementById('email').value.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email === emailDigitado);
 
    if (emailDigitado === "") {
        alert("Por favor, preenchar seu e-mail!");
        return;
    }

    if (!user) {
        alert("E-mail não consta no sistema. Tente novamente!");
        return;
    }
    // Agora indo pra parte do EmailJS
    emailjs.send("service_b8uyw55", "template_hhrysau", {
        to_email: user.email,
        senha: user.senha
    })
    .then(() => {
        alert("E-mail enviado com sucesso!");
    })
    .catch((err) => {
        console.error(err);
        alert("Erro ao enviar o e=mail.");
    });
});

document.getElementById('cancelar').addEventListener('click', function () {
    window.location.href = "index.HTML";
});
