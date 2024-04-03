require('dotenv/config');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const citiesRouter = require('./routes/cities');
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cities', citiesRouter);

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});
});
