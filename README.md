E-commerce Minimalista (MVP) – React + FakeStoreAPI

Este projeto é um protótipo de e-commerce minimalista desenvolvido como MVP para apresentação a investidores. A aplicação consome dados da FakeStoreAPI para simular produtos, autenticação e operações administrativas, servindo como prova de conceito enquanto o back-end oficial não existe.

O objetivo principal é demonstrar domínio das práticas modernas do ecossistema React, incluindo componentização, integração com APIs, roteamento, gerenciamento de estado e usabilidade.

📌 Objetivos do Projeto

Criar um e-commerce funcional utilizando React.

Consumir dados da FakeStoreAPI para simular:

Listagem de produtos

Detalhes de produto

Login

Carrinho

Área administrativa com CRUD

Demonstrar boas práticas de design, responsividade e arquitetura front-end.

Entregar um MVP pronto para testes, apresentação e iterações futuras.

✨ Funcionalidades
Área do usuário

Listagem de produtos.

Filtro por categorias.

Página de detalhes.

Carrinho com itens adicionados e removidos.

Login simulado via FakeStoreAPI.

Área administrativa

Acesso restrito para usuários logados.

CRUD de produtos (simulado no front-end).

Interface simples e funcional para testes de fluxo.

🛠️ Tecnologias Utilizadas

React

React Router

Context API / Zustand / Redux (dependendo da implementação)

FakeStoreAPI

Axios / Fetch API

CSS Modules / Styled Components / Tailwind

Vite / Create React App

📂 Estrutura do Projeto (exemplo)
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── context/
 ├── hooks/
 ├── App.jsx
 └── main.jsx

▶️ Como Executar
# Clone o repositório
git clone git@github.com:Marcoz-VS/Trabalho_React.git

# Entre na pasta do projeto
cd trabalho_final

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev


Acesse no navegador:

http://localhost:5173

📡 API Utilizada

FakeStoreAPI
Documentação: https://fakestoreapi.com

Endpoints relevantes:

/products

/products/:id

/checkout

/login

/cart

/panel-administrador

🚀 Resultado Esperado

Interface minimalista e responsiva.

Componentização clara.

Estado e lógica bem organizados.

Fluxo completo de compra simulado.

Área administrativa funcionando após login.

📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e demonstração.
