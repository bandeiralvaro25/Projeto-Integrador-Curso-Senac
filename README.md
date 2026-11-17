🎬 Take Um — Sistema de Gestão de Cinema
O Take Um e uma aplicacao web completa voltada para a experiencia cinematografica, oferecendo desde a compra de bilhetes e exploracao de filmes em cartaz ate um painel administrativo robusto para o gerenciamento de cinemas, precos, filmes e contas de utilizadores.

🛠️ Tecnologias Utilizadas
Linguagens e Estrutura:

HTML5: Estruturacao semantica das paginas web (formularios, tabelas, modais e barras de navegacao).

CSS3: Estilizacao avancada com variaveis, animacoes personalizadas (@keyframes para o fundo em movimento), flexbox, grid layouts e tags <style> embutidas por pagina.

JavaScript (ES6+): Manipulacao dinamica do DOM, gestao de eventos, abertura e fecho de modais de edicao e exclusao, alem de tratamento de rotas.

APIs e Recursos Nativos do Browser:

Session Storage / Local Storage: Simulacao e controlo de sessoes ativas de utilizadores e verificacao de privilegios de administrador.

Clipboard API: Suporte a iteracoes de copia e colagem de dados e links diretamente na interface.

Identidade Visual e Ativos:

Google Fonts / Icones SVG: Graficos vetoriais otimizados para os botoes de autenticacao (como o logotipo do Google).

Design System Proprio: Paleta de cores tematica baseada em tons de vinho (#810000), fundo creme (#fcf6ec) com texturas integradas (background-image, cover, no-repeat, background-attachment: fixed e gradientes semitransparentes).

📁 Estrutura de Paginas do Projeto
index.html (Criar Conta): Pagina inicial de cadastro com validacao de formularios, opcoes de login unificadas e botao de autenticacao via Google.

login.html: Pagina de acesso ao sistema com tratamento de rotas e prevencao de loops indevidos de redirecionamento.

filmes.html: Vitrine interativa de filmes em cartaz e futuros lancamentos.

compra.html: Fluxo de escolha de sessoes, cinemas e assentos.

ingressos.html: Gestao dos bilhetes adquiridos pelo utilizador.

cinematch.html: Funcionalidade interativa para recomendacao de filmes.

passaporte.html: Sistema de recompensas e passaporte digital do cinefilo.

admin.html: Painel de Controle do Administrador contendo abas para:

Gerir Filmes (Adicao e categorizacao de cartazes).

Gerir Cinemas (Cadastro de locais e enderecos).

Gerir Precos & Ingressos (Ajuste de valores para inteira, meia-entrada e taxas VIP).

Gerir Contas (Tabela de utilizadores cadastrados com suporte a modal de edicao flutuante de dados — Nome, E-mail, Senha, CPF, Telefone, Perfil — e exclusao de registos).