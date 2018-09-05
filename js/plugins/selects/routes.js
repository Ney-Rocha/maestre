(function (routes) {

    var express         = require("express");
    var router          = express.Router();

    routes.init = function (app) {

        var contagemPfController = require("./contagemPfController")(app);

        //--------------------------------------------------------------------------------------
        // Rotas API
        //--------------------------------------------------------------------------------------

        router.route('/contagem/pf/tabela/')
            
            .post(function(req, res) {

                // var idade           = req.body.idade;
                // var sexo            = req.body.sexo;
                // var estadoCivil     = req.body.estadoCivil;
                // var escolaridade    = req.body.escolaridade;
                // var estados         = req.body.estados;
                // var cidades         = req.body.cidades;
                // var bairros         = req.body.bairros;
                // var ordemTabela     = req.body.ordemTabela;

                contagemPfController.contarTabela(req.body, function (err, content) {
                    if (err) {
                        res.send(err.toString());
                    } else {
                        res.json(content);
                    }
                });
            
            });


        // Injetando rotas no middleware
        //--------------------------------------------------------------------------------------

        app.use('/api', router);


    }

})(module.exports);


