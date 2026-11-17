# 🎬 Take Um — Sistema de Gestão de Cinema

O **Take Um** é uma aplicação web completa voltada para a experiência cinematográfica, oferecendo desde a compra de bilhetes e exploração de filmes em cartaz até um painel administrativo robusto para o gerenciamento de cinemas, preços, filmes e contas de utilizadores.

---

## Tecnologias Utilizadas

* **Linguagens e Estrutura:**
  * **HTML5:** Estruturação semântica das páginas web (formulários, tabelas, modais e barras de navegação).
  * **CSS3:** Estilização avançada com variáveis, animações personalizadas (`@keyframes` para o fundo em movimento), flexbox, grid layouts e tags `<style>` embutidas por página.
  * **JavaScript (ES6+):** Manipulação dinâmica do DOM, gestão de eventos, abertura e fecho de modais de edição e exclusão, além de tratamento de rotas.

* **APIs e Recursos Nativos do Browser:**
  * **Session Storage / Local Storage:** Simulação e controlo de sessões ativas de utilizadores e verificação de privilégios de administrador.
  * **Clipboard API:** Suporte a interações de cópia e colagem de dados e links diretamente na interface.

* **Identidade Visual e Ativos:**
  * **Google Fonts / Ícones SVG:** Gráficos vetoriais otimizados para os botões de autenticação (como o logotipo do Google).
  * **Design System Próprio:** Paleta de cores temática baseada em tons de vinho (`#810000`), fundo creme (`#fcf6ec`) com texturas integradas (`background-image` e gradientes semitransparentes).
---

## Estrutura de Páginas do Projeto

* **`index.html`** (Criar Conta): Página inicial de cadastro com validação de formulários, opções de login unificadas e botão de autenticação via Google.
* **`login.html`**: Página de acesso ao sistema com tratamento de rotas e prevenção de loops indevidos de redirecionamento.
* **`filmes.html`**: Vitrine interativa de filmes em cartaz e futuros lançamentos.
* **`compra.html`**: Fluxo de escolha de sessões, cinemas e assentos.
* **`ingressos.html`**: Gestão dos bilhetes adquiridos pelo utilizador.
* **`cinematch.html`**: Funcionalidade interativa para recomendação de filmes.
* **`passaporte.html`**: Sistema de recompensas e passaporte digital do cinéfilo.
* **`admin.html`**: Painel de Controle do Administrador contendo abas para:
  * *Gerir Filmes* (Adição e categorização de cartazes).
  * *Gerir Cinemas* (Cadastro de locais e endereços).
  * *Gerir Preços & Ingressos* (Ajuste de valores para inteira, meia-entrada e taxas VIP).
  * *Gerir Contas* (Tabela de utilizadores cadastrados com suporte a **modal de edição** de dados — Nome, E-mail, Senha, CPF, Telefone, Perfil — e exclusão de registos).

---

## Identidade Visual & Padrão de Estilo

* **Cor Primária / Destaque:** Vinho (`#810000`).
* **Fundo:** Tom creme (`#fcf6ec`) combinado com uma imagem de fundo fixa (`background-attachment: fixed`), sem duplicações (`no-repeat` e `cover`), aplicando uma camada de gradiente semitransparente (`0.88`) para assegurar legibilidade e conforto visual.
* **Componentes:** Botões de autenticação e submissão perfeitamente unificados (altura fixa de 48px, larguras e paddings padronizados).

---

