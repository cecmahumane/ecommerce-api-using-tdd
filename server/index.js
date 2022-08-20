const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json())

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});