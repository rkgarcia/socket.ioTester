exports.description = 'Connect to socket.io Server.';

exports.usage = '--url WebSocketURL [--events EventList] [--sslNOVerify]';
exports.options = {
    url: {
        noName: false,
        description: 'URL http[s]://host[:port][/namespace]\n\t\t example: https://localhost:8090/myNamespace or https://localhost:8090/'
    },
    events:{
        noName: true,
        description: 'Add listeners to events comma separated'
    },
    sslNOVerify:{
        noName: true,
        description: 'Ignore Certify validation'
    }
};

exports.invoke = function (options, shell) {
    if ( options.url || options.u ) {
        if ( options.sslNOVerify ) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        var io = require('socket.io-client');
        var socket = io.connect(options.url);
        socket.on('connect',function(){
            console.log("Connected!");
        })
        .on('anything',function(data){
            console.log(data);
        })
        .on('error',function(err){
            console.log("Error connecting " + options.url);
        });
        
        if ( options.events ) {
            var eventos = options.events.split(',');
            eventos.forEach( function( event, index , arrayS ){
                socket.on( event , function(data){
                    console.log("\n::: Event detected " + event + " ::: in " + options.url + " :::\n");
                    console.log(data);
                });
            });
        }
    }
};