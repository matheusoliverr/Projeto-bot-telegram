const db = require("../db")

module.exports = {
    createData(value, type){

        return db.query(`
            INSERT INTO user_data (
                value,
                type
            ) VALUES ($1, $2)
            RETURNING id
        `, [value, type])
    }
}