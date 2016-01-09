var http = require('http');
var url = require('url');

function handleRequest(port) {
    http.createServer(function(request, response) {
        if (request.method != 'POST') {
            var object = url.parse(request.url, true)
            object.path = object.path.slice(1);
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            switch(object.path[0]) {
                case 'J':
                case 'F':
                case 'M':
                case 'A':
                case 'S':
                case 'O':
                case 'N':
                case 'D':
                    console.log(object.path.replace(/%20/g, ' '));
                    object.path = object.path.replace(/%20/g, ' ');
                    var jo = {};
                    jo.unix = parseInt(Date.parse(object.path));
                    jo.natural = object.path;
                    response.end(JSON.stringify(jo));
                    break;
                default:
                    console.log(object.path);
                    var date = new Date(parseInt(object.path));
                    var jo = {};
                    jo.unix = parseInt(object.path);
                    jo.natural = monthNames[date.getMonth()] + ' ' + date.getDate() + ", " + (date.getYear() + 1900);
                    response.end(JSON.stringify(jo));
                    break;
            }
        }

    }).listen(port)
    console.log('Listening on port ' + port);
}

handleRequest(8080)