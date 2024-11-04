const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `https://default-blackbird-rporaxgmail-coms-organization-e6504-0.blackbird-relay.a8r.io/wildlsightapi`;


app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
});
