const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const { ppid } = require('process');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'This is a secret',
    cookie: {},
    resave: false,
    saveUninitiated: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`You are now running on PORT ${PORT}`));
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');