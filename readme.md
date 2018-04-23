- CRUD
- Create = POST
- Read = GET
- Update = PUT
- Delete = DELETE

- npm init
- npm install --save express
- Apresentar o GET, e como enviar o arquivo da nossa pasta
- Temos que reiniciar sempre o server?
- npm install --save-dev nodemon
- Adicionar o novo script no package.json
```
"scripts": {
    "dev": "nodemon server.js"
  },
```
- npm run dev
- Vamos fazer o post
- Mas, esse dado de retorno não faz sentido. Como ler o POST/Request.body?
- npm install --save body-parser
- O post agora pode ser lido com request.body
- E agora, onde salvaremos os dados?
- npm install --save mongodb
- Onde vamos armazenar nossos dados? mlab.com
- O Create/Post
Houve post?
Como retornar os dados?
- O Get/Read
Como renderizar os resultados com template engines (Jade, Pug, Nunjucks, Embedded JavaScript )
Vamos utilizar o Embedded Javascript (EJS)
npm install --save ejs
