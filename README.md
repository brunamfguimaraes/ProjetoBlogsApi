
projeto Blogs API T10B Antonio Arieiro

ORM E O SEQUELADOOOO

createTable === Criar a tabela com os dados da migration ex await seila.createTable('narguileira,{ id:{asada:false, name:{blablablabla}}')


//fez cagada na migration ?? Sem problemas dropa esse trem
npx sequelize-cli db:migrate:undo

criou tudo certinho e ta pronto pra enviar??Entao roda ai
 

aaaa olha as migrations do projeto ai oh ->

//users ->
Criando as migrations :  npx sequelize-cli model:create --name users --attributes displayName:string,email:string,password:string,image:string  

//Categories ->
npx  sequelize-cli model:create --name categories --attributes name:string

//Post categories  ->
Fiz na mão pra exercitar esse trem rodei o 
npx sequelize-cli migration:generate --name post-categories pra criar a migration e la dentro estruturei
criei a tabela PostsCategories do requsiito e deixei ela como PK em referecia ao Id da BlogPosts e a CategoryId tbm é PK com relação a Chave Id da Categories

se quiser fazer o bagui na mão faz assim oh
npx sequelize-cli migration:generate --name create-column userSEila
vai la na migration do userSeila e acrescente os campos ex. vai ta la o exports e a func async vai la coloca um return queryInterface.addColumn() <- ai coloca a tabela que quer adicionar o campo e quais campos quer adicionar.

//BlogPosts
title -> string, content string->, userId -> INTEGER references -> table 'Users' key Id, published e update -> Dates

pronto criou as migrations go pra controllers

montando o crud de sempre so que agr cada parte do codigo com sua '''''FUNÇÃO''''' famoso quem chamou que se vire.
