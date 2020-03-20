const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || "3000";

const authorized = require('./routes/middleware/auth');

const registrationRouter = require('./routes/api/registration');
const loginRouter = require('./routes/api/login');
const noteRouter = require('./routes/api/note');
const profileRouter = require('./routes/api/profile');

app.use(express.json());
app.use(cors());

app.use('/api', registrationRouter);
app.use('/api', loginRouter);

app.use(authorized);
app.use('/api', noteRouter);
app.use('/api', profileRouter);


app.listen(PORT, () => {
    console.log(`Listening to requests on http://localhost:${PORT}`);
  });