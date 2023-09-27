const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment')
const {validationResult} = require('express-validator')

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        return res.render('moviesAdd')  
    },
    create: function (req, res) {
        const errors = validationResult(req)
        if(errors.isEmpty()){
            const {title, rating, release_date, awards, length} = req.body
            db.Movie.create({
                title: title.trim(),
                rating, 
                release_date,
                awards,
                length
            })
                .then(movie => {
                    console.log(movie)
                    return res.redirect('/movies')
                })
        }else{
             return res.render('moviesAdd',{
                errors : errors.mapped(),
                old: req.body
             })
        }

    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                console.log(moment(movie.release_date).format('YYYY-MM-DD')) //moment es una dependencia que te ayuda a convertir una fecha de base de datos con formato HTML
                return res.render('moviesEdit',{
                    Movie: movie,
                    moment
                })
            })
            .catch(error => console.log(error))

    },
    update: function (req,res) {
        // TODO
        const {title, rating, release_date, awards, length} = req.body
        db.Movie.update(
            {
                title: title.trim(),
                rating, 
                release_date,
                awards,
                length
            },
            {
                where:{
                    id: req.params.id
                }
            }
        )
            .then(response => {
                console.log(response)
                db.Movie.findByPk(req.params.id)
                    .then(movie => {
                        return res.render('moviesDetail',{
                            movie
                        })
                    })
            }).catch(error => console.log(error))
       
    },
    delete: function (req, res) {
            db.Movie.findByPk(req.params.id)
                .then(movie => {
                    return res.render('moviesDelete',{
                            Movie: movie
                    })
                })
    },
    destroy: function (req, res) {
            db.Movie.destroy({
                where : {
                    id : req.params.id
                }
            }).then(movie => {
                console.log(movie)
                return res.redirect('/movies')
            })
    }

}

module.exports = moviesController;