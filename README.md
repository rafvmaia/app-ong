# 📲 App ONG – Cadastro de Usuários da Ação Social do Sopão
Este aplicativo foi desenvolvido para auxiliar no cadastro, atualização e gestão dos usuários atendidos pela ação social de distribuição de alimentos coordenada por Ana Soares, na comunidade da Imbiribeira. A solução substitui o uso de papéis, garantindo mais organização, segurança e agilidade.

## ✅ Objetivo
Desenvolver um aplicativo mobile com backend integrado a banco de dados PostgreSQL para melhorar o controle dos atendimentos e facilitar o trabalho dos responsáveis pelo projeto social.

## 🛠️ Tecnologias Utilizadas
### Frontend (App)
- React Native
- Expo
- Axios
### Backend
- Node.js
- Express
- pg (PostgreSQL driver)
- Dotenv
### Banco de Dados
- PostgreSQL (Render)
- pgAdmin (gerenciamento local)

## 🔧 Funcionalidades
- Cadastro de usuários
- Listagem de usuários cadastrados
- Edição de dados
- Mudança de Status do Usuário 
- Integração entre app e backend via API
- Treinamento e manual de uso para os responsáveis

## 🌐 Backend em Produção
O backend do projeto está hospedado na Render e pode ser acessado em:  
https://app-ong.onrender.com

## 🧪 Como rodar localmente
### 1. Clone o repositório
```bash
git clone https://github.com/rafvmaia/app-ong.git
cd app-ong
```

### 2. Instale as dependências
Para o backend:
```bash
cd sopas-ong-backend
npm install
```
Para o app:
```bash
cd app
npm install
```

### 3. Crie um arquivo .env no backend
```env
DB_HOST=dpg-cvqis0muk2gs73dkte40-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=bd_sopao
DB_USER=bd_sopao_user
DB_PASSWORD=sua_senha_aqui
DATABASE_URL=postgres://bd_sopao_user:sua_senha_aqui@dpg-cvqis0muk2gs73dkte40-a.oregon-postgres.render.com:5432/bd_sopao
```

### 4. Inicie o backend
```bash
node src/server.js
```

### 5. Inicie o app mobile
```bash
npx expo start
```

## 📸 Evidência
O repositório serve como documentação completa do projeto, contendo:
- Código-fonte do backend e frontend
- Estrutura do banco de dados
- Histórico de desenvolvimento (commits)
- Configurações e arquivos de ambiente

## 📅 Etapas do Projeto
- Levantamento de requisitos com os responsáveis (Ana e Danielle)
- Modelagem do banco de dados PostgreSQL
- Desenvolvimento da API com Node.js + Express
- Criação do app mobile com React Native
- Testes com dados reais
- Treinamento dos usuários
- Coleta de feedback e entrega final

## 🤝 Contato
Desenvolvido por Rafael Valença  
GitHub: https://github.com/rafvmaia
