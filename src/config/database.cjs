const pg = require('pg');

module.exports = {
    dialect: 'postgres',
    dialectModule: pg, 
    url: 'postgresql://postgres:vpAWjUyYMUnEgJLxlDtxaFSDhXWfjgXT@viaduct.proxy.rlwy.net:21657/railway',
    define: {
        timespamps: true,
        underscored: true,
        underscoreAll: true,
    },
}


// host: 'localhost',
// username: 'postgres',
// password: 'teste99',
// database: 'acpbm-site',