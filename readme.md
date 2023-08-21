# Passo a passo para testar o projeto



## COM NPM

1. Clonar o projeto em uma pasta com o comando git clone https://github.com/marcmlh/API_PlenoSabor.git

2. Abrir o terminal no caminho da pasta do projeto e rodar o comando "npm i" para instalar as dependências do projeto.

3. Instalar o programa Docker Desktop para conseguir rodar o projeto pelos containers docker.
   https://www.docker.com/products/docker-desktop/

4. No mesmo terminal rodar o comando docker compose up -d  para subir os containers da api e do postgres database para o docker

5. No mesmo terminal rodar o comando "npm run migration:run" para que as tabelas sejam criadas no banco de dados.

6. A Api estará rodando na porta 3333. É possível acessar a documentação e realizar as chamadas por http://localhost:3333/docs



## COM YARN

1. Clonar o projeto em uma pasta com o comando git clone https://github.com/marcmlh/API_PlenoSabor.git

2. Abrir o terminal no caminho da pasta do projeto e rodar o comando "yarn" para instalar as dependências do projeto.

3. Instalar o programa Docker Desktop para conseguir rodar o projeto pelos containers docker.
   https://www.docker.com/products/docker-desktop/

4. No mesmo terminal rodar o comando docker compose up -d  para subir os containers da api e do postgres database para o docker

5. No mesmo terminal rodar o comando "yarn migration:run" para que as tabelas sejam criadas no banco de dados.

6. A Api estará rodando na porta 3333. É possível acessar a documentação e realizar as chamadas com o swagger por http://localhost:3333/docs




# Rodando os testes

## Testes unitários (Service)

npm run test 

 ou

yarn test


## Testes End to End (Controller -> Service -> Repositório -> Database)

npm run test:e2e

 ou

yarn test:e2e



## Testes com coverage

npm run test:coverage

 ou

yarn test:coverage

para checar o coverage dos testes entrar na pasta do projeto na pasta coverage e abrir o arquivo index.html. Neste arquivo é possível checar a porcentagem de cobertura de testes no código.
     API_PlenoSabor/coverage/index.html