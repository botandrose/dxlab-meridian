const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
const isProduction = process.env.ENV === 'production' ? true : false;
const appFolder = isProduction ? 'build' : 'src';

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + `/${appFolder}/index.html`));
});

app.use(express.static(appFolder));

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});

if (process.env.ENV === 'development') {
  const browserSync = require('browser-sync');
  browserSync({
    server: 'src',
    files: ['src/**.*'],
    open: false
  });
}
