const Question = require("../models/Question")
const User = require("../models/User")

module.exports = {
    async findQuestion(key, validator){
        try {
            const results = await Question.findQuestion(key, validator)
        
            return results.rows[0]

        } catch (error) {
            console.error(error);
        }
        
    },
    async insertValue(value, type){
        try {
            await User.createData(value, type)
        } catch (error) {
            console.error(error);
        }
    }
}
