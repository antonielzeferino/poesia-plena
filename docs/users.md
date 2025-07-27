# 👤 Usuário Autenticado  

Esta rota retorna informações detalhadas do usuário autenticado.  

---

## 📌 Rota  

### ➤ Obter Dados do Usuário Autenticado  
**Rota:** `GET /api/user`  

#### 🔑 Autenticação  
- Necessário estar autenticado via **NextAuth**.  

#### 📤 Resposta  
- **200 OK** – Retorna os dados do usuário autenticado  
  ```json
  {
    "id": "clb8j7h5a0001z5s1kd8m9p7y",
    "username": "autor_exemplo",
    "name": "Autor Exemplo",
    "bio": "Escrevendo versos desde sempre.",
    "poems": [
      { "id": "1", "title": "Meu primeiro poema", "createdAt": "2024-02-10T12:00:00.000Z" }
    ],
    "likes": [
      { "id": "2", "poemId": "5", "poemTitle": "A vida em versos" }
    ],
    "savedPoems": [
      { "id": "3", "poemId": "8", "poemTitle": "Sonhos distantes" }
    ],
    "comments": [
      { "id": "4", "content": "Belo poema!", "poemId": "1" }
    ],
    "following": [
      { "id": "10", "username": "poeta_amigo", "name": "Poeta Amigo" }
    ],
    "followers": [
      { "id": "11", "username": "leitora_fiel", "name": "Leitora Fiel" }
    ],
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
  ```
- **401 Unauthorized** – Usuário não autenticado  
  ```json
  { "error": "Não autenticado" }
  ```
- **404 Not Found** – Usuário não encontrado  
  ```json
  { "error": "Usuário não encontrado" }
  ```
- **500 Internal Server Error** – Erro inesperado  
  ```json
  { "error": "Erro ao buscar usuário" }
  ```

---

# ⚙️ Configurações do Usuário  

### ➤ Obter Dados Detalhados do Usuário  
**Rota:** `GET /api/user/config`  

#### 🔑 Autenticação  
- Necessário estar autenticado via **NextAuth**.  

#### 📤 Resposta  
- **200 OK** – Retorna todas as informações do usuário, incluindo postagens, interações e conexões.  
- **401 Unauthorized** – Usuário não autenticado.  
- **404 Not Found** – Usuário não encontrado.  
- **500 Internal Server Error** – Erro ao buscar usuário.  

  - [Início](../README.md)  