# Image.io

Sistema de repositório de imagens com upload, edição de metadados e visualização.
Desenvolvido com Spring Boot, PostgreSQL, React e Docker.

## 🚀 Tecnologias

- Java 21
- Spring Boot
- PostgreSQL
- React / Next.js
- Docker
- Docker Compose

- ## ▶️ Como rodar o projeto

### Pré-requisitos

- Docker
- Docker Compose

### Passo a passo

1. Clone o repositório:

git clone https://github.com/seu-usuario/imageio.git

2. Entre na pasta do projeto:

cd imageio

3. Suba os containers:

docker compose up --build

4. Acesse:

Frontend: http://localhost:3000  
Backend: http://localhost:8080  
PgAdmin: http://localhost:15432

## 🗄 Banco de Dados

O PostgreSQL roda em container Docker.

As credenciais padrão são:

- Host: db
- Porta: 5432
- Database: image.io
- Usuário: postgres
- Senha: postgres

Os dados são persistidos via volume nomeado do Docker.

## ⏰ Timezone

As datas são armazenadas em UTC no backend e convertidas automaticamente
para o fuso horário do usuário no frontend.

## 📂 Estrutura

imageio/
 ├── imageioapi (Spring Boot)
 ├── image.io (Frontend React)
 ├── docker-compose.yml
