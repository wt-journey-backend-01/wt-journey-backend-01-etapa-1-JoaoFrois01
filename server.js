const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contatos.html'));
    
});

app.use(express.urlencoded({ extended: true }));
app.post('/contato', (req, res) => {

    var nome = req.body.nome;
    var email = req.body.email;
    var titulo = req.body.titulo;
    var mensagem = req.body.mensagem;
     res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Mensagem Recebida</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <div class="container">
        <h2 class="msg">MENSAGEM RECEBIDA !!!</h2>
        <p>Querido cliente <strong>${nome}</strong>, muito obrigado pela mensagem enviada.</p>
        <br>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Titulo:</strong> ${titulo}</p>
        <br>
        <p><strong>Mensagem:</strong>${mensagem}</p>
        <br>
        <a href="/" class="btn ancora">Home</a>
      </div>
    </body>
    </html>
  `);
});


app.get('/sugestao', (req, res) => {
    var nome = req.query.nome;
    var ingredientes = req.query.ingredientes;
     res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Sugestão Recebida</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <div class="container">
        <h2 class="msg">SUGESTÃO RECEBIDA !!!</h2>
        <p>Obrigado por mandar a sugestão abaixo: </p>
        <br>
         <p><strong>Sugestão de lanche:</strong> ${nome}.</p>
         <p><strong>Ingredientes: </strong>${ingredientes}.</p>
        <br><br>
        <a href="/" class="btn ancora">Home</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/lanches', (req, res) => {
    res.json([
        {
            "id": 1,
            "nome": "DevBurger Clássico",
            "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
        },
        {
            "id": 2,
            "nome": "Burger de Bacon",
            "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
        },
        {
            "id": 3,
            "nome": "Commit Veggie",
            "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
        }

    ]);
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada :(');
});