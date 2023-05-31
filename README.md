<p align="center">
  <a href="https://angular.io" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/240px-Angular_full_color_logo.svg.png" width="200" alt="Angular Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

<p>
  Esta feature foi desenvolvida para a resolução parcial de um problema que faz o uso da estratégia Omnichannel e a partir do problema dado, a feature desejada para o início resolução foi a criação de clientes com os dados necessários para que o cliente possa fazer bom proveito da estratégia.
</p>


# Frontend
<p>
  O meio utilizado para fazer uso da feature foi uma aplicação Web desenvolvida utilizando Angular, por ser uma das ferramentas que mais utilizo no meu dia a dia.
  No entanto, a feature pode ser utilizada por qualquer plataforma ou framework.
</p>

## Tecnologias usadas
* Angular 14+
* PrimeNG

## Instalação
<p> 
  Para instalação do Frontend, será necessário que você tenha instaldo o <a href="https://nodejs.org/en">Node.js</a>.
  Você pode acessar o guia de instalação a partir do link. 
</p>
<p>
  Depois disso, basta instalar as dependências da aplicação com o seguinte comando:
</p>

 ``` bash
 $ npm install
 ```

## Executando a aplicação
<p>
  Agora que todas as configurações estão feitas, basta executar a aplicação com o seguinte comando:
</p>

```bash
$ npm run start
```


# Backend
<p>
  A feature foi desenvolvida utilizando <a href="https://nestjs.com">Nest.js</a> que é um framework Backend que utiliza como biblioteca principal o <a href="https://expressjs.com/pt-br/">Express.js</a>.
</p>

## Tecnologias usadas
* Nest.js
* Postgres
* Prisma.js
* Docker
* Postman

## Instalação
<p> 
  Para instalação do Backend, será necessário que você tenha instaldo o <a href="https://nodejs.org/en">Node.js</a>.
  Você pode acessar o guia de instalação a partir do link. 
  <br />Além disso, você também deve instalar o Postgres e conectar a aplicação com o banco a partir de uma URL de conexão que deve ser colocada no arquivo ´.env´, dentro deste arquivo deve está algo semelhante a isto:
</p>

``` bash
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=public"
# Coloque seu usuário, senha, e banco de dados que deve ser conectar.
```

<p> 
  Caso não queira instalar nenhum banco e tenha o <a href="https://www.docker.com">Docker</a> instalado na sua máquina, pode subir um container com o banco que não haverá problema algum.
  <br />Guia para instalar o Postgres com Docker:  <a href="https://felixgilioli.medium.com/como-rodar-um-banco-de-dados-postgres-com-docker-6aecf67995e1">Como rodar o Postgres com Docker</a>
</p>

<p>
  Depois disso, basta instalar as dependências da aplicação com o seguinte comando:
</p>

 ``` bash
$ npm install
 ```
 
 <p>
  Com o banco configurado e dependências instaldas, abra o terminal na raíz do projeto e digite os seguintes comandos:
 </p>
 
``` bash
# Gera a tipagem dos modelos que estão no `prisma.schema`
$ npx prisma generate

# Gera automaticamente as tabelas/entidades necessárias que estão no `prisma.schema`
$ npx prisma migrate dev

# Caso o comando acima não gere o resultado esperado, use o seguinte comando:
$ npx prisma db push
```

## Executando a aplicação
<p>
  Agora que todas as configurações estão feitas, basta executar a aplicação com o seguinte comando:
</p>

```bash
# Desenvolvimento
$ npm run start:dev

# Produção
$ npm run start:prod
```
