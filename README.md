# 📽 Cinema MKS 📽

<summary><h3>Propósito</h3></summary>
Projeto feito durante o processo seletivo da <a href="[https://www.mkssistemas.com.br/)">MKS Sistemas</a> e tem como objetivo avaliar habilidades técnicas atravez da construção de uma API CRUD para um sistema de filme usando das ferramentas TypeScript, Nest.js, TypeORM, Swagger, Docker, Redis e PostgreSQL, e utilizando da autenticação JWT para obrigar o usuário estar autenticado ao consumir o CRUD.

<summary><h3>Sobre</h3></summary>
Um sistema de catalogo de filmes onde a API deve: Retornar todos os filmes disponiveis, armazenar o filme que o usuário enviou na request, permitir que seja feita a alteração de um filme e também a remoção do mesmo. Também foi implementado o sistema de cadastro e login de usuário para que cada usuário possa criar sua conta e realizar as request, por isso, somente o usuário logado consegue consumir o CRUD de filmes.

<summary><h3>Tecnologias utilizadas e nivel de experiência</h3></summary>
  Projeto feito com base na arquitetura <i>Model-Service-Controller</i>.
  </br></br>
  
   <table>
    <tr>
      <td>
        <ul>
          <li>Typescript - 0 de experiência anterior.</li>
          <li>NestJs - 0 de experiência anterior.</li>
          <li>TypeOrm - 0 de experiência anterior.</li>
          <li>Swagger - experiência academica de 1 ano.</li>
          <li>Docker - experiência profissional e acadêmica de 1 ano</li>
          <li>Redis - 0 de experiência anterior.</li>
          <li>PostgresSQL - 6 meses de experiência acadêmica.</li>
          <li>Render (Deploy) - 0 de experiência anterior.</li>
        </ul>
      </td>
    </tr>
  </table>

  <details>
  <summary><h3>Funcionamento usuario</h3></summary>
  
  #### `POST /api/v1/usuario` (Cadastro de usuário):
  Espera que no body da requisição venha os dados do usuário e os insere na tabela `usuario_model` do banco de dados.</br>
  <details>
  <summary><b>Exemplo</b></summary>

  ```json
    {
      "userName": "leandrocotrim",
      "password": "senha123",
      "id": 1,
      "online": false
    }
  ```
  </details>
  
  #### `POST /api/v1/usuario/login` (Realiza o login do usuário):
  Espera que no body da requisição venha os dados do usuário, verifica se condizem com um usuário do banco e retorna um `token JWT` de acesso, que também é armazenado no redis.</br>
  
  <details>
  <summary><b>Exemplo</b></summary>

  ```json
  {
    "online": true,
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMTE3NTY4NH0.eHw5vARTyqJQwAXiMboR-Ni9KUDg36cn6U6QFXB42dM"
  }
  ```
  </details>

  #### `POST /api/v1/usuario/logout` (Realiza o logout do usuário):
  Espera que no header da requisição venha user_id e x-acess-token , verifica se condizem com um usuário do banco e realiza o logout definindo o status online para false e o valor armazenado no redis em branco.</br>
  
  <details>
  <summary><b>Exemplo de entrada</b></summary>

  ```json
    {
      "user_id": 1,
      "x-acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMTE0MjQwM30.XyXoimPmbOJaSRF06dgQa_2PXmcvylbA6RwnJfyYFLQ"
    }
  ```
  </details>
  
  #### `GET /api/v1/usuario` (Retorna todos os usuarios e seus status):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `x-acess-token`, junto com o id do usuário também em um header na chave `user_id`</br>
  
  <details>
  <summary><b>Exemplo de retorno</b></summary>
  
  ```json
  [
    {
      "userName": "leandrocotrim",
      "password": "senha123",
      "online": true
    },
    {
      "userName": "gabrielcotrim",
      "password": "senha321",
      "online": true
    }...
   ]
   ```
   </details>
  
  #### `PUT /api/v1/usuario/:id/` (Altera o usuário):
  Essa requisição espera conter o user_id e token gerado no `login` em seu header na chave e também um body contendo os novos dados`x-acess-token`</br>
  
  Altera o usuário especificado na URL da requisição, para o novo body informado. </br>
  
  <details>  
  <summary><b>Exemplo de retorno da URL `/api/v1/usuario/1`</b></summary>
  
   ```json
    {
      "userName": "loginNovo",
      "password": "senhaNova"
    }
  ```
  </details>
  
  #### `DELETE /api/v1/usuario/:id` (Remove o usuario):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `x-acess-token`</br>
  Remove o usuario especificado pela URL. </br>
  
  <details>
  <summary><b>Exemplo de retorno da URL `/api/v1/usuario/1`</b></summary>
  
  ```json
  {
    "data": "O usuario com o id 2 foi deletado com sucesso!"
  }
  ```
  </details>
  </details>
  <details>
  <summary><h3>Funcionamento filme</h3></summary>
  
  #### `POST /api/v1/filme` (Cadastro de filme):
  Espera que no body da requisição venha os dados do filme e os insere na tabela `filme_model` do banco de dados. Também espera conter o token gerado no `login` em seu header na chave `x-acess-token`, junto com o id do usuário também em um header na chave `user_id`</br>
  <details>
  <summary><b>Exemplo de retorno</b></summary>

  ```json
    {
      "nome": "Homem-Aranha 4",
      "genero": "Super-heroi",
      "lancamento": 2025,
      "duracao": "02:19",
      "id": 4
    }
  ```
  </details>
  
  #### `GET /api/v1/filme` (Retorna todos os filmes e seus status):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `x-acess-token`, junto com o id do usuário também em um header na chave `user_id`</br>
  
  <details>
  <summary><b>Exemplo de retorno</b></summary>
  
  ```json
  "data": [
      {
        "id": 2,
        "nome": "Homem-Aranha 3",
        "genero": "Super-heroi",
        "lancamento": 2007,
        "duracao": "02:19"
      },
      {
        "id": 3,
        "nome": "Xmen",
        "genero": "Super-heroi",
        "lancamento": 2007,
        "duracao": "02:19"
      },
      {
        "id": 4,
        "nome": "Homem-Aranha 4",
        "genero": "Super-heroi",
        "lancamento": 2025,
        "duracao": "02:19"
      }
    ]
   ```
   </details>
  
  #### `PUT /api/v1/filme/:id/` (Altera o filme):
  Essa requisição espera conter o user_id e token gerado no `login` em seu header na chave e também um body contendo os novos dados`x-acess-token`</br>
  
  Altera o filme especificado na URL da requisição, para o novo body informado. </br>
  
  <details>  
  <summary><b>Exemplo de retorno da URL `/api/v1/filme/1`</b></summary>
  
   ```json
    {
      "id": 2,
      "nome": "Homem-Aranha 3",
      "genero": "Super-heroi",
      "lancamento": 2007,
      "duracao": "02:19"
    }
  ```
  </details>
  
  #### `DELETE /api/v1/filme/:id` (Remove o filme):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `x-acess-token`</br>
  Remove o filme especificado pela URL. </br>
  
  <details>
  <summary><b>Exemplo de retorno da URL `/api/v1/filme/1`</b></summary>
  
  ```json
  {
    "data": "O filme com o id 4 foi deletado com sucesso!"
  }
  ```
  </details>
  </details>

  
  
  <summary><h3>☁ Deploy ☁</h3></summary></br>
Atualmente estou utilizando a plataforma Render para realizar o deploy da aplicação e os bancos, é possível acessar o deploy realizado neste link: https://cinme-mks.onrender.com/api/v1/swagger

  <summary><h3>Como rodar localmente 👨‍💻</h3></summary></br>
  
  ⚠️ Necessário Docker e Docker-Compose ⚠️

1) Clone o repositório

```bash
$ git clone https://github.com/leandroSalesCotrim/crud-mks.git
```

2) Entre na pasta raíz do projeto

```bash
$ cd crud-mks
```

3) Instale as dependencias

```bash
$ npm install
```

4) Crie um arquivo `.env` contendo o conteudo abaixo
```bash
POSTGRES_DB=mksCinema
POSTGRES_USER=mksUser
POSTGRES_PASSWORD=mksPassword


POSTGRES_HOST=nest-postgres
REDIS_HOST=nest-redis

JWT_SECRET=segredoSecreto
```

5) Suba os containers já configurado com a aplicação e bancos

```bash
$ docker-compose up
```

  ⚠️ Extra ⚠️

Caso queira modificar a aplicação e ir realizando testes você pode executar apenas os comandos abaixo

1) Liste os container para visualizar o id dos container dos bancos redis e postgres
```bash
$ docker ps -a
```

2) Inicie o container do postgres
```bash
$ docker start id_do_container_postgres
```

4) Inicie o container do redis
```bash
$ docker start id_do_container_redis
```

5)Altere as varivaveis do arquivo .env para utilizar o localhost
```bash
REDIS_HOST=localhost
POSTGRES_HOST=localhost
```

6)Incie a aplicação localmente
```bash
$ npm run start:dev
```
