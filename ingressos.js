document.addEventListener('DOMContentLoaded', () => {
    carregarIngressos();

    const formEditar = document.getElementById('formEditarEvento');
    if (formEditar) {
        formEditar.addEventListener('submit', salvarEdicao);
    }

    const buscarInput = document.getElementById('buscarInput');
    if (buscarInput) {
        buscarInput.addEventListener('input', filtrarIngressos);
    }
});

let ingressosCache = [];

// Carrega os ingressos do servidor
async function carregarIngressos() {
    try {
        const resposta = await fetch('/api/eventos');
        ingressosCache = await resposta.json();
        renderizarTabela(ingressosCache);
    } catch (erro) {
        console.error('Erro ao buscar ingressos:', erro);
    }
}

// Renderiza a tabela de ingressos na página
function renderizarTabela(lista = []) {
    const tabelaBody = document.getElementById('tabelaEventos');
    const totalIngressosElem = document.getElementById('totalEventos');

    if (!tabelaBody) return;

    tabelaBody.innerHTML = '';
    if (totalIngressosElem) {
        totalIngressosElem.textContent = lista.length;
    }

    if (lista.length === 0) {
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-message">Nenhum ingresso encontrado.</td>
            </tr>
        `;
        return;
    }

    lista.forEach(ingresso => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ingresso.id}</td>
            <td>${ingresso.nome || '-'}</td>
            <td>${ingresso.horario || '-'}</td>
            <td>${ingresso.tipo || '-'}</td>
            <td>${ingresso.data || '-'}</td>
            <td>${ingresso.cinema || '-'}</td>
            <td>${ingresso.lugares || '-'}</td>
            <td>
                <button type="button" class="btn-edit" onclick="abrirModalEditar(${ingresso.id})">Editar</button>
                <button type="button" class="btn-delete" onclick="excluirIngresso(${ingresso.id})">Excluir</button>
            </td>
        `;
        tabelaBody.appendChild(tr);
    });
}

// Valida a antecedência mínima (uma semana / 7 dias) e abre o modal de edição
function abrirModalEditar(id) {
    const ingresso = ingressosCache.find(item => item.id === id);
    if (!ingresso) return;

    // Converte a data do ingresso (formato 'AAAA-MM-DD') para um objeto Date
    const dataIngresso = new Date(ingresso.data + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias

    // Calcula a diferença em dias
    const diferencaTempo = dataIngresso.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaTempo / (1000 * 3600 * 24));

    // Exige pelo menos 7 dias (uma semana) de antecedência
    if (diferencaDias < 7) {
        alert('Para editar seus ingressos, é necessário uma semana de antecedência, obrigado pela compreensão.');
        return; // Impede que o modal abra se faltarem menos de 7 dias
    }

    // Preenche os campos do modal com os dados atuais
    document.getElementById('editId').value = ingresso.id;
    document.getElementById('editNome').value = ingresso.nome || '';
    document.getElementById('editHorario').value = ingresso.horario || '';
    document.getElementById('editTipo').value = ingresso.tipo || '';
    document.getElementById('editData').value = ingresso.data || '';
    document.getElementById('editCinema').value = ingresso.cinema || '';
    document.getElementById('editLugares').value = ingresso.lugares || '';

    // Abre o modal
    const modal = document.getElementById('modalEditar');
    if (modal) modal.style.display = 'flex';
}

// Fecha o modal de edição
function fecharModal() {
    const modal = document.getElementById('modalEditar');
    if (modal) modal.style.display = 'none';
}

// Salva as alterações feitas no ingresso
async function salvarEdicao(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const ingressoAtualizado = {
        nome: document.getElementById('editNome').value,
        horario: document.getElementById('editHorario').value,
        tipo: document.getElementById('editTipo').value,
        data: document.getElementById('editData').value,
        cinema: document.getElementById('editCinema').value,
        lugares: document.getElementById('editLugares').value
    };

    try {
        const resposta = await fetch(`/api/eventos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ingressoAtualizado)
        });

        if (resposta.ok) {
            fecharModal();
            carregarIngressos();
        }
    } catch (erro) {
        console.error('Erro ao salvar edição:', erro);
    }
}

// Exclui um ingresso com confirmação
async function excluirIngresso(id) {
    if (confirm('Tem certeza de que deseja excluir este ingresso?')) {
        try {
            const resposta = await fetch(`/api/eventos/${id}`, { method: 'DELETE' });
            if (resposta.ok) {
                carregarIngressos();
            } else {
                console.error('Erro ao excluir o ingresso no servidor.');
            }
        } catch (erro) {
            console.error('Erro ao conectar com o servidor para excluir:', erro);
        }
    }
}

// Filtra os ingressos na busca por nome ou cinema
function filtrarIngressos() {
    const termo = document.getElementById('buscarInput').value.toLowerCase();
    const filtrados = ingressosCache.filter(item => 
        (item.nome && item.nome.toLowerCase().includes(termo)) || 
        (item.cinema && item.cinema.toLowerCase().includes(termo))
    );
    renderizarTabela(filtrados);
}