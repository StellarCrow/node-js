const express = require('express');
const app = express();
const PORT = process.env.PORT || "3000";


const registrationRouter = require('./routes/api/registration');
const loginRouter = require('./routes/api/login');
const noteRouter = require('./routes/api/note');
const profileRouter = require('./routes/api/profile');

app.use(express.json());

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', noteRouter);
app.use('/api', profileRouter);


app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`);
  });