# Steps to run the project



## WITH NPM

1. Clone the project in a folder with the command git clone https://github.com/marcmlh/API_PlenoSabor.git

2. Open the terminal in the path of the project folder and run the command "npm i" to install all the dependencies

3. Install Docker Desktop program to be able to run the project within containers inside docker
    https://www.docker.com/products/docker-desktop/

4. In the same terminal run the command docker compose up -d to run the api and postgres database container in docker

5. In the same terminal run the command "npm run migration:run" for all tables to be created in the database.

6. The Api will be running at port 3333. It's possible to access the documentation and make api calls in swagger. http://localhost:3333/docs



## WITH YARN

1. Clone the project in a folder with the command git clone https://github.com/marcmlh/API_PlenoSabor.git

2. Open the terminal in the path of the project folder and run the command "yarn" to install all the dependencies

3. Install Docker Desktop program to be able to run the project within containers inside docker
    https://www.docker.com/products/docker-desktop/

4. In the same terminal run the command docker compose up -d to run the api and postgres database container in docker

5. In the same terminal run the command "npm run migration:run" for all tables to be created in the database.

6. The Api will be running at port 3333. It's possible to access the documentation and make api calls in swagger. http://localhost:3333/docs




# Running tests

## Unit tests (Service)

npm run test 

 or

yarn test


## End to End tests (Controller -> Service -> Repository -> Database)

npm run test:e2e

 ou

yarn test:e2e



## Tests with coverage

npm run test:coverage

 ou

yarn test:coverage

to check tests coverage you should go to the projects folder, coverage folder and open the html doccument called index.html. In this file it's possible to check the percentage of code coverage with tests.
    API_PlenoSabor/coverage/index.html