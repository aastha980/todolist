/**
 * Created by aastha on 21/7/17.
 */
const sequelize = require("sequelize");

const db = new sequelize({
    host: 'localhost',
    username: 'someuser',
    password:'somepass',
    dialect: 'mysql',
    database: 'somedatabases'
});

var dbTable = db.define('todolist',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task : sequelize.DataTypes.STRING,
    done : sequelize.DataTypes.BOOLEAN,
    index : {
        type: sequelize.DataTypes.INTEGER,
        // autoIncrement: true
    }
});
db.sync().then(function () {
    console.log("Database is ready !");
});

module.exports = dbTable;