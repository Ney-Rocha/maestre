(function () {

    module.exports = function () {

        var _               = require('underscore');
        var s               = require("underscore.string");
        var moment          = require('moment');
        var contagemPf      = require('./contagemPf');
        var functions       = {};

        functions.contarTabela = function(info, callback) {
            
            //Ordenacao das colunas
            var fields = '';
            var groupBy = '';

            _.each(info.tableOrder, function(item) {


                switch(item) {
                    case 'Quantidade':
                        fields += 'SUM([Quantidade]) as [Quantidade],';
                        break;
                    case 'Sexo':
                        fields += "case sexo when 'M' then 'Masculino' when 'F' then 'Feminino' else 'Indefinido' end as 'Sexo',";
                        break;
                    case 'Estado Civil':
                        fields += "case [estado civil] when 'C' then 'Casado' when 'D' then 'Divórciado' when 'O' then 'Outros' when 'S' then 'Solteiro' when 'U' then 'União Estável' when 'V' then 'Viúvo' ELSE '' END AS 'Estado Civil',";
                        break;
                     case 'Escolaridade':
                        fields += "case escolaridade when '1' then 'Quarta Série Ensino Fundamental' when '2' then 'Fundamental' when '3' then 'Médio' when '4' then 'Técnico/Habilitação' when '5' then 'Técnico/Qualificação' when '6' then 'Técnico/Especialização' when '7' then 'Superior Bacharelado' when '8' then 'Superior Tecnólogo' when '9' then 'Superior Licenciatura Curta' when '10' then 'Superior Licenciatura Plena' when '11' then 'Curso Seqüencial Formação Específica' when '12' then 'Curso Seqüencial Complementação Estudos' when '13' then 'Pós-Graduação Lato Sensu Especialização' when '14' then 'Pós-Graduação Lato Sensu Residência Médica' when '15' then 'Mestrado' when '16' then 'Doutorado' when '17' then 'Pós-Doutorado' else '-' end as 'Escolaridade',";
                        break;
                    default:
                        fields += '[' + item + '],';
                }

                if (item != 'Quantidade') {
                    groupBy += '[' + item + '],';
                }


            });

            // var groupBy = _.reject(ordemCamposTabela, function(field){ return field == '[Quantidade]'; });

            fields = fields.substring(0, fields.length -1);
            groupBy = groupBy.substring(0, groupBy.length -1);
            
            console.log('');
            console.log(fields);
            console.log('');
            console.log(groupBy);

            //Idade
            var filtroIdade = '';
            if (info.idadeDe.length > 0 && info.idadeAte.length > 0) {
                var idadeDe = moment().subtract(info.idadeDe, 'years').format('YYYYMMDD')
                var idadeAte = moment().subtract(info.idadeAte, 'years').format('YYYYMMDD')
                filtroIdade = ' nascimento between ' + idadeAte + ' and ' + idadeDe;
            }

            // Sexo
            var filtroSexo = ''
            if ( (info.chkMasc == 'true') || (info.chkFem == 'true') || (info.chkInd == 'true') ) {
                filtroSexo = ' sexo in (';
                filtroSexo += (info.chkMasc === 'true') ? '\'M\',' : '';
                filtroSexo += (info.chkFem === 'true') ? '\'F\',' : '';
                filtroSexo += (info.chkInd === 'true') ? '\'I\',' : '';
                filtroSexo = filtroSexo.substring(0, filtroSexo.length -1);
                filtroSexo += ') ';
            }

            //Estado Civil
            var filtroEstadoCivil = '';
            if (info.selEstCiv.length > 0) {
                
                filtroEstadoCivil = ' [estado civil] in ( ';
                
                _.each(info.selEstCiv, function(item) {
                    filtroEstadoCivil += "'" + item + "',";
                });
                
                filtroEstadoCivil = filtroEstadoCivil.substring(0, filtroEstadoCivil.length -1);
                filtroEstadoCivil += ' ) ';
            }

            //Escolaridade
            var filtroEscolaridade = '';
            if (info.selEscol.length > 0) {
                
                filtroEscolaridade = ' escolaridade in ( ';
                
                _.each(info.selEscol, function(item) {
                    filtroEscolaridade += "'" + item + "',";
                });
                
                filtroEscolaridade = filtroEscolaridade.substring(0, filtroEscolaridade.length -1);
                filtroEscolaridade += ' ) ';
            }

            //CBO
            var filtroCBO = '';
            if (info.selCbo.length > 0) {
                
                filtroCBO = ' cbo in ( ';
                
                _.each(info.selCbo, function(item) {
                    filtroCBO += "'" + item + "',";
                });
                
                filtroCBO = filtroCBO.substring(0, filtroCBO.length -1);
                filtroCBO += ' ) ';
            }

            //Cidades
            var filtroCidades = '';
            var c = '';
            var e = '';
            var ufs = [];
            if (info.selCidades.length > 0) {
                
                filtroCidades = ' ( ';

                _.each(info.selCidades, function(item) {
                    c = s.strRight(item, '|');
                    e = s.strLeft(item, '|');
                    ufs.push(e);
                    filtroCidades += "(uf = '" + e + "' and cidade = '" + c + "') or ";
                });
                
                filtroCidades = filtroCidades.substring(0, filtroCidades.length -3);
                filtroCidades += ' ) ';

                ufs = _.difference(info.selUf, _.uniq(ufs));
            }

            //UFs
            var filtroUFs = '';
            if (ufs.length > 0) {
                
                filtroUFs = ' uf in ( ';
                
                _.each(ufs, function(uf) {
                    filtroUFs += "'" + uf + "',";
                });
                
                filtroUFs = filtroUFs.substring(0, filtroUFs.length -1);
                filtroUFs += ' ) ';
            }


            var query = 'select ' + fields + ' from count_pf2 where 1=1 ' ;

            if (filtroSexo.length > 0) query += ' and ' + filtroSexo;
            if (filtroIdade.length > 0) query += ' and ' + filtroIdade;
            if (filtroEstadoCivil.length > 0) query += ' and ' + filtroEstadoCivil;
            if (filtroEscolaridade.length > 0) query += ' and ' + filtroEscolaridade;
            if (filtroCBO.length > 0) query += ' and ' + filtroCBO;
            if (filtroCidades.length > 0) query += ' and ' + filtroCidades;
            if (filtroUFs.length > 0) query += ' or ' + filtroUFs; 

            query += ' group by ' + groupBy;

            //return callback(null, query);

            console.log(query);

            contagemPf.Tabela(query, function (err, results) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            });
            

        };

        return functions;
    };

})();
