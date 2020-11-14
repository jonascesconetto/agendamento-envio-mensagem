var dbUser = 'postgres';
var dbPass = 'postgres';
var dbHost = (process.env.NODE_ENV === 'production') ? 'db' : 'localhost';
var dbPort = '5432';
var dbName = 'comunicacao';
var schemas = ['public', 'pl_comunicacao'];
var connectionString = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

var rootAPI = '/app/api';

module.exports = {dbUser, dbPass, dbHost, dbPort, dbName, connectionString, schemas, rootAPI};
