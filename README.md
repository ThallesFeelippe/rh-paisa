# RH PAISA - Mural & Dashboard Administrativo

Este projeto é um ecossistema digital para a Usina Paisa, integrando controle de RH, mural de notícias e KPIs de sustentabilidade.

## 🚀 Guia de Configuração (Codespace / Local)

Se você acabou de baixar o projeto ou está abrindo no **GitHub Codespace**, siga estes passos para que tudo funcione:

### 1. Instalar Dependências
O código precisa baixar os pacotes necessários (Node.js/Next.js).
```bash
npm install
```

### 2. Sincronizar o Banco de Dados
Como o banco de dados (`dev.db`) não vai para o GitHub por segurança, você precisa criar um novo no seu ambiente atual:
```bash
npx prisma db push
npx prisma generate
```

### 3. Rodar o Site
```bash
npm run dev
```

---

## 🛠️ Tecnologias
- **Framework**: Next.js 14 (App Router)
- **Banco de Dados**: SQLite com Prisma ORM
- **Estilo**: Tailwind CSS (Industrial Design)
- **Autenticação**: Cookies assinados (Custom Auth)

---

## ⚠️ Observação sobre Imagens e Dados
Como o arquivo de banco de dados (`.db`) e a pasta de imagens (`public/uploads`) estão no `.gitignore`, eles começam vazios em um novo ambiente. Você precisará:
1. Criar um usuário admin pelo `npx prisma studio`.
2. Reenviar as fotos das notícias pelo dashboard.
