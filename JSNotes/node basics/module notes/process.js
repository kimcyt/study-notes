/////////////child process

//spawned child process
const {spawn} = require('child_process');
//spawn a new process that will execute the pwd command.
const child = spawn('pwd');
//The result of executing the spawn function (the child object above) is a ChildProcess instance
//we can register handlers for events on this child obj

/////////////events
//child events that parent can listen to:
// 1. exit: when the child exits, in function(exit code, signal) signal is the signal used to
// terminate the child. is null when it exits normally.
// 2. disconnect: emitted when the parent process manually calls the child.disconnect()
// 3. error: emitted if the process could not be spawned or killed
// 4. close: emitted when the stdio streams of the child get closed. When multiple children
//share the same stdio streams, one child exiting doesnt mean the streams are closed
// 5. message: the most important, emitted when the child process uses the process.send()
//to send messages, child can also listen to this event

//////////streams as emitters
//every child process gets the three standard streams: child.stdin, child.stdout, child.stderr
//for child processes, stdout/stderr are readable while stdin is writable, the readables can listen
//to "data" events.

child.stdout.on('data', (data) => {
    //data is the output of the command the child executed
    console.log(`child stdout:\n${data}`); //log to the main process stdout
});

child.stderr.on('data', (data) => {
    //if there is error executing the command, it triggers this function
    console.error(`child stderr:\n${data}`); //log to the main process stderr
});

//stdin is writable, can use it to send a command some input
process.stdin.pipe(child.stdin); //must be readable.pipe(writable)
//process.stdin is a readable stream and child.stdin is writable
//user input will be piped to input to child process




////////////////////exec function
//differs from spawn: create a shell to execute the command;
//pass the whole output of the command to a callback function instead of using stream
const { exec } = require('child_process');
//The exec function is a good choice if you need to use the shell
//syntax and if the size of the data expected from the command is small.
exec('find . -type f | wc -l', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
});

//the biggest difference between exec() and execFile() is that the latter does not create a shell



/////////////fork
//The fork function is a variation of the spawn function for
// spawning node processes. The biggest difference between spawn and
// fork is that a communication channel is established to the child
// process when using fork, so we can use the send function on the forked
// process along with the global process object itself to exchange messages
// between the parent and forked processes.

//The parent file, parent.js:
const { fork } = require('child_process');//which will execute the file with the node command
const forked = fork('child.js', {silent: false, //if silent is false(by default), the child stdio are from the parent, the main
// process sees the output, otherwise it pipes to child.stdio
                                 execArgv: process.execArgv //to keep the child and the parent to run in the same execution environment
                                 });

forked.on('message', (msg) => {
    console.log('Message from child', msg);
});
forked.send({ hello: 'world' });

//The child file, child.js:
process.on('message', (msg) => {
    console.log('Message from parent:', msg);
});
let counter = 0;
setInterval(() => {
    process.send({ counter: counter++ }); //emit message event
}, 1000);



//when there are some blocking operation in the main process, fork()can be useful
//in terms of creating a child process for the operation and maintaining the
// communication with the parent process.

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    };
    return sum;
};

process.on('message', (msg) => {
    const sum = longComputation();
    process.send(sum);
});
//Now, instead of doing the long operation in the main process event
//loop, we can fork the compute.js file and communicate messages between the
// server and the forked process.

const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/compute') {
        const compute = fork('compute.js'); //fork a child
        compute.send('start');
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
        });
    } else {
        res.end('Ok')
    }
});

server.listen(3000);