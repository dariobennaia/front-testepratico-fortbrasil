# Front teste prático - (FortBrasil)

- [Demonstração](#Demonstração)
- [Especificações](#Especificações)
- [Descrição](#descri%c3%a7%c3%a3o)
- [Rodando o projeto (desenvolvimento)](#rodando-o-projeto-desenvolvimento)
  - [Localmente (node + yarn)](#localmente-node--yarn)
  - [No Docker (docker-compose)](#no-docker-docker-compose)

## Demonstração

Link do projeto rodando em uma VPS - [Teste Prático](http://157.245.249.89:8000)

OBS: **Lembre-se de ativar a localização para usar o sistema de forma completa, caso contrário baixe o projeto em sua maquina e execute localmente.**

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
$ yarn start
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