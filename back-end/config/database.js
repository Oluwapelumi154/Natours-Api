const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });
const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/environment.js`)[env];
const db = {};
const rootDir = path.join(__dirname, '../src');
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
let subDirs = [];
const dirToExclude = ['migration', 'seeders', 'config', 'auth'];
fs.readdirSync(rootDir).forEach((dir) => {
  const isDir = fs.statSync(path.join(`${rootDir}/${dir}`)).isDirectory();
  if (isDir) {
    subDirs.push(dir);
  } else {
    return;
  }
});
if (subDirs.length > 0) {
  dirToExclude.forEach((dir) => {
    subDirs = subDirs.filter((el) => el !== dir);
  });
}
let files = [];
const dirPath = [];
subDirs.forEach((dir) => {
  const file = fs.readdirSync(path.join(rootDir, dir, 'model'));
  dirPath.push(`${dir}/model`);
  if (file.length > 0) {
    files = files.concat(file);
  }
});
files
  .filter((file) => file.slice(-8) === 'model.js')
  .forEach((file, i) => {
    const model = require(path.join(rootDir, dirPath[i], file))(
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
