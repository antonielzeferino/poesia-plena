# ❤️ API de Likes  

Esta rota permite que os usuários curtam e descurtam poemas na plataforma.  

---

## 📌 Rotas  

### ➤ Obter Status do Like e Total de Likes  
**Rota:** `GET /api/like?poemId={poemId}`  

#### 🔑 Autenticação  
- Opcional. Se autenticado, retorna se o usuário já curtiu o poema.  

#### 🔹 Parâmetros  
| Nome    | Tipo   | Obrigatório | Descrição |
|---------|--------|-------------|-------------|
| `poemId` | `string` | ✅ Sim | ID do poema a ser consultado |

#### 📤 Respostas  
- **200 OK** – Retorna status do like e total de curtidas.  
  ```json
  {
    "liked": true,
    "totalLikes": 5
  }
  ```
- **400 Bad Request** – `poemId` não foi enviado.  
  ```json
  { "error": "O ID do poema é obrigatório" }
  ```
- **500 Internal Server Error** – Erro inesperado.  
  ```json
  { "error": "Erro ao buscar likes" }
  ```

---

### ➤ Curtir ou Descurtir um Poema  
**Rota:** `POST /api/like`  

#### 🔑 Autenticação  
- **Necessário estar autenticado via NextAuth.**  

#### 🔹 Corpo da Requisição (`JSON`)  
| Nome    | Tipo   | Obrigatório | Descrição |
|---------|--------|-------------|-------------|
| `poemId` | `string` | ✅ Sim | ID do poema a ser curtido/descurtido |
| `liked` | `boolean` | ✅ Sim | `true` para curtir, `false` para remover o like |

#### 📤 Respostas  
- **200 OK** – Like adicionado.  
  ```json
  {
    "id": "clb9x7h6a0011z5s1kd8m9q8z",
    "userId": "clb8j7h5a0001z5s1kd8m9p7y",
    "poemId": "5"
  }
  ```
- **200 OK** – Like removido.  
  ```json
  { "message": "Like removido" }
  ```
- **400 Bad Request** – Parâmetros ausentes ou inválidos.  
  ```json
  { "error": "Dados inválidos" }
  ```
- **500 Internal Server Error** – Erro inesperado.  
  ```json
  { "error": "Erro ao processar o like" }
  ```

---

## 🚀 Observações  
- Cada usuário pode curtir ou descurtir um poema apenas uma vez.  
- O `GET` pode ser usado por usuários não autenticados, mas o `POST` exige login.  
- O sistema previne duplicação de curtidas ao garantir que cada usuário só pode ter um like por poema.  

  - [Início](../README.md)  