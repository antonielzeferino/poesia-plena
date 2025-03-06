# 🔑 Autenticação  

A autenticação no **Poesia Plena** é feita com **NextAuth.js** para login  

## 📌 Rotas  

### ➤ Criar Conta (Signup)  
**Rota:** `POST /api/auth/signup`  

#### 📥 Entrada  
Envia um JSON com os seguintes campos:  
- `username` _(string, obrigatório)_ – Nome de usuário único  
- `password` _(string, obrigatório)_ – Senha do usuário  

Exemplo:  
```json
{
  "username": "usuario_exemplo",
  "password": "senha_segura"
}
```

#### 📤 Saída  
- **201 Created** – Usuário registrado com sucesso  
  ```json
  { "message": "Usuário registrado com sucesso!" }
  ```
- **400 Bad Request** – Usuário já existe ou dados inválidos  
  ```json
  { "message": "Usuário já está em uso" }
  ```
- **500 Internal Server Error** – Erro ao processar a solicitação  
  ```json
  { "message": "Erro ao criar usuário. Tente novamente." }
  ```

---

### ➤ Login (Signin)  
**Rota:** `POST /api/auth/signin`  

#### 📥 Entrada  
Envia um JSON com os seguintes campos:  
- `username` _(string, obrigatório)_ – Nome de usuário  
- `password` _(string, obrigatório)_ – Senha do usuário  

Exemplo:  
```json
{
  "username": "usuario_exemplo",
  "password": "senha_segura"
}
```

#### 📤 Saída  
- **200 OK** – Autenticação bem-sucedida  
  ```json
  { "token": "jwt_token_aqui" }
  ```
- **401 Unauthorized** – Credenciais inválidas  
  ```json
  { "message": "Usuário ou senha incorretos" }
  ```  