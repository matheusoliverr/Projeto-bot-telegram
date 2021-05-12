const Question = require("../models/Question")

module.exports = {
    async findOptions(id){
        try {
            const results = await Question.findOptions(id)
        
            return results.rows[0].selected_options

        } catch (error) {
            console.error(error);
        }
        
    }
}
