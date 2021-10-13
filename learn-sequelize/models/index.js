const Sequelize = require('sequelize');
const User =require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db= {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.User=User;
db.Comment=Comment;

//연결 객체를 init 모델이랑 mysql을 연결
User.init(sequelize);
Comment.init(sequelize);
 
module.exports = db; 