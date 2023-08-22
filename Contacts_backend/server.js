const express = require("express");
const dbConnection=require('./config/dbConnects')
const app = express();

const dotenv = require("dotenv").config();
dbConnection();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/contacts',require('./routes/contactsRouter'))
app.use('/api/users',require('./routes/usersRoutes'))


app.listen(port, () => {
  console.log(`Port is listnening to  ${port}`);
});
