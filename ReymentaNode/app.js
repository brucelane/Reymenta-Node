//var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var shada = require('./shader');

var RainingOnYourScreen = {
	title: 'RainingOnYourScreen',
	url: 'https://www.shadertoy.com/view/4dXSzB',
	frag: 'void main(void){vec2 uv = iZoom * gl_TexCoord[0].st;uv.x -= iRenderXY.x;uv.y -= iRenderXY.y;vec3 raintex = texture2D(iChannel1, vec2(uv.x * 2.0, uv.y * 0.1 + iGlobalTime * 0.125)).rgb / 8.0;vec2 where = (uv.xy - raintex.xy);vec3 texchur1 = texture2D(iChannel2, vec2(where.x, where.y)).rgb;gl_FragColor = vec4(texchur1, 1.0);}'
};

var s = shada(RainingOnYourScreen);

s.triggerCreate();

console.log(s.getInformation());

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//http.createServer(app).listen(1337);
module.exports = app;
