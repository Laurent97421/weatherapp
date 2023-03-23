var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://Laurent:Jabami4738329@cluster0.rjey0hh.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options)
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
    })
    .catch((err: any) => {
        console.log('Erreur de connexion à la base de données :', err);
    });