// EXECUÇÃO
// 1º passo: criar arquivo .gitignore
// 2º passo: Fazer push num repo novo do github

const express = require('express');
const { nanoid } = require('nanoid')
const app = express()
const port = 3001
app.use(express.json())

const urls = []

function construirUrlCurta(req, res) {
  // Desempacotamento | Objeto
  const { url } = req.body
  
  const id = nanoid(5)

  const novaUrl = {
    id,
    url,
    criadoEm: new Date(),
    visitas: 0
  }

  urls.push(novaUrl)

  const resposta = {
    url,
    urlCurta: gerarLink(req, id)
  }

  res.status(201).json(resposta)
}

function gerarLink(req, id) {
  return `${req.protocol}://${req.get("host")}/${id}`
          // http        ://  localhost:3001  / ImQfd
}

function redirecionarUrlOriginal(req, res) {
  const { id } = req.params
  res.send(`ID do link curto: ${id}`)
  
  // Construir restante da função
  // Todos os links curtos são salvos no array chamado "urls"
  // Com posse do ID, deve-se procurar no array o objeto com ID correspondente
  // Caso encontre, redirecionar para a URL original
}

app.post("/urls", construirUrlCurta)
app.get("/:id", redirecionarUrlOriginal)

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})