# Simple-Proxy

Um proxy condicional leve para desenvolvimento e produção, roteando requisições de **frontend** e **API** de forma transparente. Suporta **HTTP e HTTPS**, logs em tempo real e é ideal para projetos em **React, Node** ou qualquer **SPA** que faça chamadas de API.

> ⚠️ Atenção: Crie um arquivo `.env` com base no `.env.example` antes de rodar o projeto.

---

## Funcionalidades

- Encaminha requisições para a **API** com base na URL configurada.
- Encaminha todas as demais requisições para o **frontend**.
- Logs detalhados em tempo real de todas as requisições.
- Suporte a **HTTPS** com certificados do Let’s Encrypt.
- Configuração simples e flexível via arquivo `.env`.
