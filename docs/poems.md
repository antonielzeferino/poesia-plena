# 📜 Poemas  

Esta rota permite buscar, criar e gerenciar poemas na plataforma **Poesia Plena**.  

## 📌 Rotas  

### ➤ Buscar Poemas  
**Rota:** `GET /api/poems`  

#### 📥 Parâmetros de Consulta (Query Params)  
- `search` _(string, opcional)_ – Filtra por título, conteúdo, categoria ou tag  
- `sort` _(string, opcional, padrão: "recent")_  
  - `"recent"` → Ordena pelos mais recentes  
  - `"oldest"` → Ordena pelos mais antigos  
  - `"popular"` → Ordena pelos mais curtidos  
- `page` _(number, opcional, padrão: 1)_ – Página da paginação  
- `limit` _(number, opcional, padrão: 10)_ – Número de itens por página  

#### 📤 Resposta  
- **200 OK** – Retorna a lista de poemas filtrados e paginados, incluindo autor, curtidas, categorias, tags e comentários  
  ```json
  {
    "poems": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Título do Poema",
        "content": "Conteúdo do poema...",
        "author": { "username": "autor_exemplo" },
        "likesCount": 25,
        "categories": ["Romance", "Drama"],
        "tags": ["Poesia", "Sentimentos"],
        "commentsCount": 3,
        "createdAt": "2024-03-01T12:00:00.000Z"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
  ```
- **500 Internal Server Error** – Erro ao buscar poemas  
  ```json
  { "error": "Erro ao buscar poemas" }
  ```

---

### ➤ Criar Poema  
**Rota:** `POST /api/poems`  

#### 📥 Entrada  
Envia um JSON com os seguintes campos:  
- `title` _(string, obrigatório)_ – Título do poema  
- `content` _(string, obrigatório)_ – Conteúdo do poema  
- `authorId` _(string, obrigatório)_ – ID do autor  
- `categories` _(array de strings, opcional)_ – Categorias associadas ao poema  
- `tags` _(array de strings, opcional)_ – Tags associadas ao poema  

Exemplo:  
```json
{
  "title": "A Chuva e o Vento",
  "content": "O vento sopra forte, levando memórias...",
  "authorId": "clb8j7h5a0001z5s1kd8m9p7y",
  "categories": ["Natureza", "Melancolia"],
  "tags": ["Noite", "Reflexão"]
}
```

#### 📤 Saída  
- **201 Created** – Poema criado com sucesso  
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "A Chuva e o Vento",
    "content": "O vento sopra forte, levando memórias...",
    "author": { "username": "autor_exemplo" },
    "categories": ["Natureza", "Melancolia"],
    "tags": ["Noite", "Reflexão"],
    "likesCount": 0,
    "savedByCount": 0,
    "commentsCount": 0,
    "createdAt": "2024-03-01T12:00:00.000Z"
  }
  ```
- **500 Internal Server Error** – Erro ao criar o poema  
  ```json
  { "message": "Erro ao criar o poema" }
  ```

    - [Início](../README.md)  