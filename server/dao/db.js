const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maoyan', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we're connected!");
});

require("./models/movieModule");
require("./models/usersModel");