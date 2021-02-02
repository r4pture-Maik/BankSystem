let express = require('express');
let bankRoute = require('./routes/BankRoute');
let app = express();
app.use("/banks", bankRoute)


app.listen(3001)