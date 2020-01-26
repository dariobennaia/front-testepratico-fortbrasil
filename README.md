# Front teste prátio - (FortBrasil)

- [Especificações](#Especificações)
- [Descrição](#descri%c3%a7%c3%a3o)
- [Rodando o projeto (desenvolvimento)](#rodando-o-projeto-desenvolvimento)
  - [Localmente (node + yarn)](#localmente-node--yarn)
  - [No Docker (docker-compose)](#no-docker-docker-compose)
  
## Especificações

Especificações do projeto

- Node >= 12
- Docker >= 18
- yarn >= 1.21.1

## Descrição

Este é o Front End da aplicação para gerênciamento da aplicação de Lojas.
  
## Rodando o projeto (desenvolvimento)

1. Crie um arquivo [.env](https://www.npmjs.com/package/dotenv) para rodar o
projeto, consulte o `.env-example` para observar quais variáveis podem precisar
ser especificadas.

### Localmente (node + yarn)

2. Crie um .env com as variáveis de ambiente se baseando no arquivo `.env-example`.

3. Siga o procedimento abaixo

```bash
# instalação das dependencias
$ yarn install

# modo "watch" (hot reloading)
$ yarn run dev
```

### No Docker (docker-compose)

Para rodar com o docker-compose será necessário ter ele e o docker instalados
localmente. Instruções de como fazê-lo podem ser encontradas na documentação
oficial do Docker.

- [Docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

```bash
# faça o build
$ docker-compose build

# suba o contêiner
$ docker-compose up -d
```