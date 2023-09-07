const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8000;

app.use( cors() );
app.use( express.json() );

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.json( {requestData: {username, password} } );
});

app.listen(PORT, () => {
    console.log(`server is running successfully on PORT ${PORT}` )
});