- CRUD
- Create = POST
- Read = GET
- Update = PUT
- Delete = DELETE

## Como iniciar?
```
npm init
npm install --save express
```

## O GET
O GET é o método comum. Ao acessar uma rota, geralmente, acessamos ela via método GET.

Temos que reiniciar sempre o server?
npm install --save-dev nodemon
Adicionar o novo script no package.json
```
"scripts": {
    "dev": "nodemon server.js"
  },
```
e depois
```
npm run dev
```
Vamos fazer o post
Mas, esse dado de retorno não faz sentido. Como ler o POST/Request.body?
```
npm install --save body-parser
```
O post agora pode ser lido com request.body
E agora, onde salvaremos os dados?
npm install --save mongodb
Onde vamos armazenar nossos dados? mlab.com
## O Create/Post
Houve post?
Como retornar os dados?
## O Get/Read
Como renderizar os resultados com template engines (Jade, Pug, Nunjucks, Embedded JavaScript )
Vamos utilizar o Embedded Javascript (EJS)
```
npm install --save ejs
```
---
### Sobre o PUT e DELETE
Sobre os métodos PUT e DELETE, nós não vamos utiliza-los neste projetinho, por questões de simplificar, mas utilizado geralmente para updates

## O Put/Update
Faremos o update utilizando o método POST, enviando o nome do objeto do qual queremos marcar como lido. Poderíamos altera-lo dinamicamente, ou de qualquer outra forma.
## O Delete 
Faremos o delete utilizando o métood POST, enviado o nome do objeto do qual queremos remover. Localizaremos o objeto através do título da nota.