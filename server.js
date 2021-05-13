const cors = require('cors');
const express = require('express');

const search = require('./search.js')
const hands = require('./hands.js')
// const history = require('./history.js')

const app = express();
const port = 8888;

// apply our application level middleware
app.use(cors());
app.use(express.json());


app.use('/search', search);
app.use('/hands', hands);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// const cors = require('cors');
// const express = require('express');


