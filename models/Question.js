const db = require("../db")

module.exports = {
    findQuestion(key, validator){

        try {
            return db.query(`
                SELECT * FROM questions
                WHERE 
                1=1
                AND
                (questions.key = $1)
                AND
                (questions.validator = $2)
            `  , [key, validator])
        } catch (error) {
            console.error(error);
        }

        
    },
    findOptions(id){
        try {
            return db.query(`
                SELECT question_id, ARRAY_AGG(title) AS selected_options FROM question_options
                LEFT JOIN options ON(question_options.option_id = options.id)
                WHERE question_options.question_id = ${id}
                GROUP BY question_id
            `)
        } catch (error) {
            console.error(error);
        }
        
    }
}