require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const citiesRouter = require('./routes/cities');
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cities', citiesRouter);

if (process.env.NODE_ENV === 'production') {
	const buildPath = path.join(__dirname, '../frontend/dist');
	app.use(express.static(buildPath));

	app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});
});
