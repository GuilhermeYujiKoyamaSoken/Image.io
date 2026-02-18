# 📸 Image.io

Sistema de repositório de imagens com upload, visualização, edição de metadados e download.

Projeto full-stack desenvolvido com **Spring Boot**, **PostgreSQL**, **React** e **Docker**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Maven

### Frontend
- React / Next.js
- TypeScript
- TailwindCSS

### Infraestrutura
- Docker
- Docker Compose
- PgAdmin

---

## 🏗 Arquitetura

O projeto é composto por:

- `imageioapi` → API REST (Spring Boot)
- `image.io` → Frontend React
- `PostgreSQL` → Banco de dados
- `PgAdmin` → Interface para gerenciamento do banco

Os serviços são orquestrados via **Docker Compose**.

---

## ▶️ Como executar o projeto

### 📋 Pré-requisitos

- Docker
- Docker Compose

---

### 🔧 Passo a passo

1️⃣ Clone o repositório:

git clone https://github.com/seu-usuario/imageio.git


2️⃣ Entre na pasta do projeto:

cd imageio

docker compose up --build


4️⃣ Aguarde os containers iniciarem.

---

## 🌐 Acessos

- Frontend → http://localhost:3000  
- Backend → http://localhost:8080  
- PgAdmin → http://localhost:15432  

---

## 🗄 Banco de Dados

O PostgreSQL roda em container Docker com volume nomeado para persistência.

### Credenciais padrão:

- Host: `db`
- Porta: `5432`
- Database: `image.io`
- Usuário: `postgres`
- Senha: `postgres`

⚠️ Os dados são persistidos via volume nomeado do Docker.

Para resetar o banco:

docker compose down -v

---

## ⏰ Timezone

As datas são armazenadas em **UTC** no backend (Instant) e convertidas automaticamente
para o fuso horário do usuário no frontend.

Isso garante consistência global e adaptação automática ao horário do cliente.

---

## 📂 Estrutura do Projeto

imageio/
├── imageioapi/ # Backend Spring Boot

├── image.io/ # Frontend React

├── docker-compose.yml

└── README.md

---

## 🧪 Funcionalidades

- Upload de imagens
- Visualização em modal (Lightbox)
- Download de imagem
- Edição de nome e tags
- Exclusão de imagem
- Conversão automática de timezone
- Persistência via Docker volume

---

## 🔐 Autenticação

A API utiliza JWT para autenticação.

A chave pode ser configurada via variável de ambiente:

JWT_SECRET

---

## 🛠 Modo Desenvolvimento (opcional)

Caso deseje rodar sem Docker:

### Backend

cd imageioapi
mvn spring-boot:run

### Frontend

cd image.io
npm install
npm run dev

---

## 📌 Observações

- Não versionar pastas como `node_modules`, `target`, `build` ou dados de banco.
- O banco de dados não é armazenado na pasta do projeto.
- Recomenda-se utilizar volume nomeado para evitar corrupção de dados.

---

## 👨‍💻 Autor

Desenvolvido por Guilherme Yuji Koyama
