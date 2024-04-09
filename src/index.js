const express = require('express');
const path = require('path');
const exphbss = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Inicializaciones
const app = express();
require('./database');

//CONFIGURACIONES
//Dando valor al puerto, si existe que lo tome si no se le asigna 3000
app.set('port', process.env.PORT || 3000);
//Se establece las vistas diciendo a node donde esta la carpeta views, dentro se une los directorios
app.set('views',path.join(__dirname,'views'));
//motor de vistas predeterminadas
app.engine('.hbs',exphbss.engine({
    defaultLayout:'main',//archivo principal
    layoutsDir: path.join(app.get('views'),'layouts'), //Carpeta de layouts
    partialsDir: path.join(app.get('views'),'partials'), //Para llamar archivo en cada momento
    extname: '.hbs' //extensión de esos archivos
}));
app.set('view engine','.hbs'); //llamando al motor de las vistas que seria exphbss

//Funciones
app.use(express.urlencoded({extended: false}));//para cuando un form me da dato pueda entenderlo, el extended es para evitar imagenes
app.use(methodOverride('_method'));//lls formularios puedan enviar otro tipo de metodos no solo get y post, se le pone un input oculto
app.use(session({ //guardar los datos de una sesion
    secret: 'mysecretapp', //palabra clave
    resave: true,
    saveUninitialized: true
}));

//Variables Globales

//Rutas
app.use(require('./routes/index'));//rutas del servidor 
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public'))); //le asignamos la carpeta de los archivos estaticos

//INICIAR SERVIDOR
//Llamamos al puerto ya asignado anterioirmente en configuraciones
app.listen(app.get('port'),() =>{
    console.log('Server on port', app.get('port'));
});