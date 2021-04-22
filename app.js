const express = require('express');
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded);

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", port)
});