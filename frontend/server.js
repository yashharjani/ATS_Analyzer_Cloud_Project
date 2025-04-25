const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Configuration endpoint to expose API Gateway URLs
app.get('/config', (req, res) => {
  res.json({
    uploadApiGateway: process.env.REACT_APP_API_URL || 'https://uwuof4hps1.execute-api.us-east-1.amazonaws.com/prod',
    resultsApiGateway: process.env.REACT_APP_API_URL || 'https://uwuof4hps1.execute-api.us-east-1.amazonaws.com/prod'
  });
});

// SPA routing for all other routes
app.all('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});