var morgan = require('morgan');
var express = require('express');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

// use the dishRouter module
var dishRouter = require('./dishRouter');
dishRouter(function (err, dishRouter) {console.log(dishRouter.dishRouter);
  if (err) {
    console.log(err);
  } else {
    app.use('/dishes', dishRouter.dishRouter());
  }
});

// use the promoRouter module
var promoRouter = require('./promoRouter');
promoRouter(function (err, promotionRouter) {
  if (err) {
    console.log(err);
  } else {
    app.use('/promotions', promotionRouter.promoRouter());
  }
});

// use the leaderRouter module
var leaderRouter = require('./leaderRouter');
leaderRouter(function (err, leadershipRouter) {
  if (err) {
    console.log(err);
  } else {
    app.use('/leadership', leadershipRouter.leadershipRouter());
  }
});

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
