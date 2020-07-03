const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/listsuper-app'));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/listsuper-app/index.html');
});

app.listen(process.env.PORT || 8080);