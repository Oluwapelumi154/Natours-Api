const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });
const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/environment.js`)[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const rootDir = path.join(__dirname, '../components');
const dirs = fs.readdirSync(rootDir, 'utf-8');
const subDir = dirs.filter((dir) =>
  fs.statSync(path.join(rootDir, dir), 'rs').isDirectory()
);
const filePaths = [];
subDir.forEach((dir) => {
  const direc = fs.readdirSync(path.join(rootDir, dir), 'utf-8')[1];
  const modelsDir = fs.readdirSync(path.join(rootDir, dir, direc), 'utf-8');
  modelsDir.forEach((file) => {
    if (file.slice(-8) === 'model.js') {
      filePaths.push(`/${dir}/model/${file}`);
    }
  });
});

filePaths.forEach((file) => {
  const model = require(path.join(rootDir, file))(
    sequelize,
    Sequelize.DataTypes
  );
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
