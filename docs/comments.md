### **Comentários (GET e POST)**

### 📌 **Rotas**

#### ➤ Obter Comentários de um Poema  
**Rota:** `GET /api/comments`  

#### 🔑 **Autenticação**
- Necessário estar autenticado para acessar a lista de comentários.

#### 🔹 **Parâmetros**
- **`poemId`** (query string): ID do poema que você deseja ver os comentários.

#### 📤 **Respostas**  
- **200 OK** – Lista de comentários do poema.  
  ```json
  {
    "comments": [
      {
        "content": "Comentário de exemplo",
        "user": { "username": "usuario1" },
        "createdAt": "2025-03-05T15:30:00Z"
      },
      {
        "content": "Outro comentário",
        "user": { "username": "usuario2" },
        "createdAt": "2025-03-06T10:00:00Z"
      }
    ]
  }
  ```

- **400 Bad Request** – Caso o `poemId` não seja informado na query.  
  ```json
  { "error": "Poema não especificado", "userId": "user-12345" }
  ```

- **401 Unauthorized** – Caso o usuário não esteja autenticado.  
  ```json
  { "error": "Não autorizado" }
  ```

- **500 Internal Server Error** – Se ocorrer um erro ao buscar os comentários.  
  ```json
  { "error": "Erro ao buscar comentários" }
  ```

---

#### ➤ Criar um Novo Comentário  
**Rota:** `POST /api/comments`  

#### 🔑 **Autenticação**
- Necessário estar autenticado para criar um comentário.

#### 🔹 **Corpo da Requisição (`JSON`)**
| Nome     | Tipo   | Obrigatório | Descrição              |
|----------|--------|-------------|------------------------|
| `poemId` | `string` | ✅ Sim      | ID do poema ao qual o comentário será adicionado |
| `content`| `string` | ✅ Sim      | Conteúdo do comentário  |

#### 📤 **Respostas**  
- **201 Created** – Comentário criado com sucesso.  
  ```json
  {
    "id": "comment-id-123",
    "content": "Novo comentário!",
    "poemId": "poem-id-456",
    "user": { "username": "usuario1" },
    "createdAt": "2025-03-05T15:30:00Z"
  }
  ```

- **400 Bad Request** – Se os parâmetros `poemId` ou `content` não forem fornecidos.  
  ```json
  { "error": "PoemId e conteúdo são obrigatórios" }
  ```

- **401 Unauthorized** – Caso o usuário não esteja autenticado.  
  ```json
  { "error": "Não autorizado" }
  ```

- **500 Internal Server Error** – Se ocorrer um erro ao criar o comentário.  
  ```json
  { "error": "Erro ao criar comentário" }
  ```

---

## 🚀 Observações
- O **GET** só funciona se o `poemId` for passado como parâmetro de consulta.  
- O **POST** exige que o usuário esteja autenticado via **NextAuth** e forneça tanto o `poemId` quanto o conteúdo do comentário.  
- Os comentários são sempre retornados na ordem mais recente (por data de criação).