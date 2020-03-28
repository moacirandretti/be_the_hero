connection = require('../database/migrations/connection')

module.exports = {

    async index(request, response){
        //Numero total de casos. Obs [count] para retornar o valor da posição 0 do array
        const [count] = await connection('incidents').count()
        console.log(count)

        //Criando paginação para exibição dos casos
        const {page=1} = request.query

        //Buscando todos os registros no DB e retornando 5 de cada vez
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*',
         'ongs.name', 
         'ongs.email', 
         'ongs.whatsapp', 
         'ongs.city', 
         'ongs.uf')

        response.header('X-Total-Count', count['count(*)'])
    
        return response.json(incidents)
    },


    async create(request, response){
        const {title, description, value} = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
    return response.json({id})    
    },

    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incidents = await connection('incidents').where('id', id).select('ong_id').first()

        if (incidents.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted!"  })
        }

        await connection('incidents').where('id', id).delete()
        return response.status(204).send()


    }
}