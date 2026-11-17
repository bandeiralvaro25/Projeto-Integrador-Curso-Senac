const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// ADICIONE ESTA LINHA PARA LIBERTAR A PASTA DE IMAGENS NA PORTA 3000:
app.use('/images', express.static(path.join(__dirname, 'images')));

// Resto do código do servidor...
// Conectar ao banco de dados SQLite real (banco.db)
const db = new sqlite3.Database('./banco.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite com sucesso.');
    }
});

// Criar a tabela de ingressos caso ela não exista
db.run(`
    CREATE TABLE IF NOT EXISTS ingressos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        horario TEXT,
        tipo TEXT,
        data TEXT NOT NULL,
        cinema TEXT,
        lugares INTEGER
    )
`);

// Listar ingressos do banco de dados
app.get('/api/eventos', (req, res) => {
    db.all(`SELECT * FROM ingressos`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao buscar ingressos no banco de dados.' });
        }
        res.json(rows);
    });
});

// Criar (Comprar) ingresso e salvar no banco de dados
app.post('/api/eventos', (req, res) => {
    const { nome, horario, tipo, data, cinema, lugares } = req.body;

    if (!nome || !data) {
        return res.status(400).json({ erro: 'Nome do filme e data são obrigatórios.' });
    }

    const query = `INSERT INTO ingressos (nome, horario, tipo, data, cinema, lugares) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [nome, horario, tipo, data, cinema, lugares], function (err) {
        if (err) {
            console.error('Erro ao inserir ingresso:', err);
            return res.status(500).json({ erro: 'Erro ao salvar ingresso no banco de dados.' });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            horario,
            tipo,
            data,
            cinema,
            lugares
        });
    });
});

// Atualizar ingresso no banco de dados
app.put('/api/eventos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, horario, tipo, data, cinema, lugares } = req.body;

    const query = `
        UPDATE ingressos 
        SET nome = ?, horario = ?, tipo = ?, data = ?, cinema = ?, lugares = ?
        WHERE id = ?
    `;

    db.run(query, [nome, horario, tipo, data, cinema, lugares, id], function (err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao atualizar o ingresso.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: 'Ingresso não encontrado.' });
        }
        res.json({ mensagem: 'Ingresso atualizado com sucesso.', id });
    });
});

// Excluir ingresso do banco de dados
app.delete('/api/eventos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const query = `DELETE FROM ingressos WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao excluir o ingresso.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: 'Ingresso não encontrado.' });
        }
        res.json({ mensagem: 'Ingresso removido com sucesso.' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'compra.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em: http://localhost:${PORT}`);
});