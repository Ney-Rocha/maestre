(function () {

    var sql         = require('node-sqlserver-unofficial');
    var config      = require('../config'); 

    module.exports = {

        Tabela: function(query, callback) {
            
            sql.query(config.sqlDatabase, query, function (err, results) {
                
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }

            });

        }

    }
})();

