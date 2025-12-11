let botao = document.getElementById('btnLogar');

botao.addEventListener('click', function () {
    
    const pegaUsuario = document.getElementById('login').value.trim().toLowerCase();
    const pegaSenha = document.getElementById('senha').value;
    
    // Aqui é arrega usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarioCadastrado') || '[]');
    
    // E aqui pra procura usuário
    const usuarioEncontrado = usuarios.find(u => 
        u.email === pegaUsuario && u.senha === pegaSenha
    );

    if (usuarioEncontrado) {
        alert('Login realizado!');
        window.location.href = "dashboard.html";
    } else {
        alert('Email ou senha incorretos.');
    }
});
