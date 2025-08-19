const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json()); // parses application/json
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const {routes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use('/admin', routes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
