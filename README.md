# Devlinks-api

O Sistema devlinks-api é uma API RESTful que oferece funcionalidades para criar e gerenciar contas de usuário, autenticar usuários e armazenar links de plataforma em um banco de dados seguro. A API é projetada para fornecer um sistema eficiente e seguro para que os usuários registrem suas informações e mantenham uma lista de links de plataformas online.

## Documentação da API

#### Autentica um usuário

```http
  POST https://devlinks-api-deploy.onrender.com/auth
```

| Parâmetro  | Tipo     | Descrição                           |
| :--------- | :------- | :---------------------------------- |
| `email`    | `string` | **Obrigatório**. O email do usuário |
| `password` | `string` | **Obrigatório**. A senha do usuário |

#### Criar um usuário

```http
  POST https://devlinks-api-deploy.onrender.com/user
```

| Parâmetro  | Tipo     | Descrição                             |
| :--------- | :------- | :------------------------------------ |
| `email`    | `string` | **Obrigatório**. O email a ser criado |
| `password` | `string` | **Obrigatório**. A senha a ser criada |

#### Atualizar usuário

```http
  PUT https://devlinks-api-deploy.onrender.com/user
```

| Parâmetro   | Tipo     | Descrição                      |
| :---------- | :------- | :----------------------------- |
| `email`     | `string` | **Opcional**. Novo email       |
| `image`     | `string` | **Opcional**. Imagem do perfil |
| `firstName` | `string` | **Opcional**. Primeiro nome    |
| `lastName`  | `string` | **Opcional**. Ultimo nome      |

#### Salvar links de plataforma

```http
  POST https://devlinks-api-deploy.onrender.com/link
```

| Parâmetro | Tipo    | Descrição                                          |
| :-------- | :------ | :------------------------------------------------- |
| `links`   | `array` | **Obrigatório**. Salvar os links no banco de dados |
