var readline = require('readline'),
io = require('socket.io');
shotgun = require('shotgun'),shell = new shotgun.Shell(),
contextStorage = {};

var rl = readline.createInterface({input:process.stdin, output:process.stdout,terminal:false});
console.log("\n\Interactive Socket.io client for testing purposes\n");
rl.setPrompt("$ ");

shell.setContextStorage(contextStorage)
    .onContextChanged(function (context) {
        if (context.passive)
            rl.setPrompt(context.passive.msg + " $ ");
        else
            rl.setPrompt("$ ");
    })
    .onData(function (data) {
        if (data.clearDisplay) console.log('\u001B[2J\u001B[0;0f');
        if (data.line)
            console[data.line.type](data.line.text);
        if (data.exit) {
            rl.close();
            process.exit();
        }
    });

rl.on('line', function (cmdStr) {
    shell.execute(cmdStr);
    rl.prompt();
});

rl.prompt();