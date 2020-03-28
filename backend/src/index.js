const express = require('express')
const routes = require('./routes')
const cors = require('cors')


const app = express()
app.use(cors())

/** 
 * Essa linha faz com que o React entenda que estamos fazendo o envio no formato JSON
 */
app.use(express.json())
app.use(routes)

/** 
 * 
 * Métodos HTTP
 * GET: Buscar/Listar informação no back-end
 * POST: Criar alguma informação no back-end
 * PUT: Alterar alguma coisa no back-end
 * DELETE: Deletar alguma informação no back-end
 */

 /**
  * Query params: Parâmetros enviados pelo ponto de interrogação
  * Route params: Usado para identificar recursos e é apenas um valor /users/1
  *  
  */


app.listen(3333)