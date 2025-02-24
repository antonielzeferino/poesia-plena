# Poesia Plena  

Poesia Plena é uma plataforma online de poesia livre, criada para apaixonados por poesia que desejam explorar, compartilhar e interagir com versos e sentimentos.  

## Sobre o Projeto  

Este projeto foi desenvolvido com o objetivo de aprofundar conhecimentos na criação de sistemas com interface intuitiva e banco de dados integrado, permitindo uma experiência fluida e interativa para os usuários.  

O projeto está online e pode ser acessado em: [poesia-plena.vercel.app](https://poesia-plena.vercel.app)  

## Tecnologias Utilizadas  

- **Next.js 15** – Framework React para aplicações web modernas e performáticas.  
- **TypeScript** – Tipagem estática para maior segurança e manutenção do código.  
- **Prisma ORM** – Gerenciamento eficiente e seguro do banco de dados.  
- **Next Auth** – Solução de autenticação flexível e segura para gerenciamento de usuários.  
- **PostgreSQL** – Banco de dados robusto para armazenamento das informações.  

## Funcionalidades  

- Cadastro e autenticação de usuários.  
- Publicação e organização de poesias.  
- Opção de curtir, salvar e compartilhar poesias.  
- Interface responsiva e intuitiva.  

## Rotas da API  

A API do Poesia Plena possui as seguintes rotas:  

### **Autenticação (`/api/auth`)**  
- **`POST /api/auth/signup`** – Cria uma nova conta de usuário.  
- **`POST /api/auth/signin`** – Autentica um usuário e retorna um token de acesso.  

### **Curtidas (`/api/likes`)**  
- **`POST /api/likes`** – Adiciona uma curtida a um poema.  
- **`DELETE /api/likes`** – Remove uma curtida de um poema.  

### **Poemas (`/api/poems`)**  
- **`GET /api/poems`** – Retorna uma lista de poemas publicados.  
- **`POST /api/poems`** – Publica um novo poema.  
- **`GET /api/poems/:id`** – Retorna os detalhes de um poema específico.  
- **`DELETE /api/poems/:id`** – Exclui um poema do usuário autenticado.  

### **Usuários (`/api/user`)**  
- **`GET /api/user/:id`** – Obtém as informações de um usuário específico.  
- **`GET /api/user/me`** – Retorna os dados do usuário autenticado.  

## Como Rodar o Projeto  

1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/poesia-plena.git
   ```
2. Acesse o diretório do projeto:  
   ```bash
   cd poesia-plena
   ```
3. Instale as dependências:  
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env.local`:  
   ```
   DATABASE_URL=seu_banco_de_dados_aqui
   NEXTAUTH_URL=sua_url_aqui
   NEXTAUTH_SECRET=seu_segredo_aqui
   ```
5. Execute o servidor de desenvolvimento:  
   ```bash
   npm run dev
   ```
O projeto estará disponível em `http://localhost:3000/`.  

## Contribuição  

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests.  

## Licença  

Este projeto é de código aberto sob a licença MIT.  

---

Acesse o projeto online em: [poesia-plena.vercel.app](https://poesia-plena.vercel.app) 💙  