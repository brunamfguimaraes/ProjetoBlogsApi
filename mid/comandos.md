# Configurando o Sequelizer
***instalar Sequelize**
Para começar, vamos iniciar uma aplicação node.js e intalar o sequelize:

 - mkdir app-with-sequelize && cd app-with-sequelize
 - npm init -y
 - npm install sequelize
 -
 - npm install --save sequelize
 - npm install sequelize-cli
 - npm install mysql2

## iniciando o sequelize
depois  que instalamos o CLI, precisamos iniciar um projeto com sequelize. para isto, vamos executtar o seguinte comando dentro da pasta raiz:

- npx sequelize-cli init

config/config.json

{
  "development": {
    "username": "root",
    "password": "",
    "database": "orm_example",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

  // No resto do arquivo você vai encontrar as convenções para conectar o Sequelize em outros ambientes
}
Nota: se necessario, troque o user e a senha do exemplo pelos seus
vamos entender melhor as informações que estamos passando:

### Criando Banco de dados usando CLI do sequelize
Agora que iniciamos uma aplicação do sequelize, podemos criar o banco de dados ORM_EXEMPLE que nomeamos no arquivo config.json  atraves deste comando

-  npx sequelize db:create
-  mysql -u root -p    para entar no MySQL
-  show databases;     para verivicar a criação do banco de dados, tem que ter ponto virgula ao final


Para criar um model, usamos o seguinte comando no cli (nao execute o comando abaixo, ele é apenas um template de como criar um model):

 npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string
  O paramentro `--name` se refere ao nome das colunas e os tipos de dados que ela contém
  o paramentro `--atributes` se refere ao nome das colunas e os tipos de dados que ela contem

- npx sequelize model:generate --name User --attributes fullName:string

## faça amudança no model por funcão
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};

module.exports = User;


### O model fica responsável apenas por representar a estrutura do banco de dados
### Com o Sequelize, essa lógica se centraliza nos controllers ou services

### Com a migration criada, basta executarmos pelo CLI:
- npx sequelize db:migrate
### Caso queira reverter uma migration:
-  npx sequelize db:migrate:undo

### Se você quiser criar uma outra migration para adicionar a coluna phone na sua tabela Users , você pode criar um novo arquivo com o comando:
-  npx sequelize migration:generate --name add-column-phone-table-users

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
### enato criamos nosso codigo
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Users', 'phone_num', {
     type: Sequelize.STRING,
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone_num');
  }
};
## Em seguida rodamos o comando para executar a nossa nova migration:
-  npx sequelize db:migrate

###  E alteramos o model user.js para incluir a nova coluna phone :
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  // aqui inserimos o datatype da coluna criada
  phone_num: DataTypes.STRING,
  });

  return User;
}
### Primeiramente vamos precisar executar pelo CLI a criação de um novo seed:
-  npx sequelize seed:generate --name users

  'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        email: 'leo@test.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'JEduardo',
        email: 'edu@test.com',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

- npx sequelize db:seed:all
- para reverter
-  npx sequelize db:seed:undo:all

},
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
           field: 'created_at', // a coluna será criada no banco com este nome
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
           field: 'updated_at', // a coluna será criada no banco com este nome
//       }


# Podemos, entrar na pasta src e executar estes comandos, que teremos êxito,
 mas caso fosse uma aplicação maior, com mais camadas, aumentaríamos a complexidade de subir e configurar a aplicação. É neste momento que entra em cena o .sequelizerc . É um arquivo de configuração, que podemos utilizar caso desejamos substituir o caminho padrão das pastas migrations , models , seeders ou config . Dessa forma, podemos construir um código com uma arquitetura mais organizada.
Para configurar este arquivo, primeiramente crie um arquivo com o nome .sequelizerc na raiz da aplicação com o seguinte conteúdo:

const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'config.json'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};

Vamos entender melhor as informações que tem neste arquivo:
path : É um módulo interno do Node que nos fornece alguns utilitários para trabalharmos com caminhos de arquivos e diretórios;
config : Caminho para o arquivo de configuração;
models-path : Caminho para o diretório de models ;
seeders-path : Caminho para o diretório de seeders ;
migrations-path : Caminho para o diretório de migrations .
