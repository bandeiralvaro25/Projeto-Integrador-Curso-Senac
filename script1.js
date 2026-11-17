document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', adicionarIngresso);
    }
});

async function adicionarIngresso(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const form = event.target; // Captura o formulário submetido

    const novoIngresso = {
        nome: document.getElementById('nome').value,
        horario: document.getElementById('horario').value,
        tipo: document.getElementById('tipo').value,
        data: document.getElementById('data').value,
        cinema: document.getElementById('cinema').value,
        lugares: document.getElementById('lugares').value
    };

    try {
        const resposta = await fetch('/api/eventos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoIngresso)
        });

        if (resposta.ok) {
            form.reset();
            const mensagem = document.getElementById('mensagem');
            if (mensagem) {
                mensagem.textContent = 'Ingresso comprado com sucesso!';
                setTimeout(() => { mensagem.textContent = ''; }, 3000);
            }
        } else {
            // Mostra o erro detalhado enviado pelo servidor no console
            const erroServidor = await resposta.json();
            console.error('Erro detalhado do servidor:', erroServidor);
        }
    } catch (erro) {
        console.error('Erro ao ligar ao servidor:', erro);
    }
}