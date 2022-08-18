const pg = require('pg');
const { Client } = require('ssh2');
const fs = require('fs');

const pgHost = 'localhost'; // remote hostname/ip
const pgPort = 5432;
const proxyPort = 9090;
let ready = false;

const c = new Client();

const proxy = require('net').createServer((sock) => {
	if (!ready) { return sock.destroy(); }
	c.forwardOut(sock.remoteAddress, sock.remotePort, pgHost, pgPort,
		(err, stream: any) => {
			if (err) { return sock.destroy(); }
			sock.pipe(stream);
			stream.pipe(sock);
		});
});

proxy.listen(proxyPort, '127.0.0.1');

c.connect({
	host: '192.168.1.1',
	port: 22,
	username: 'ubuntu',
	privateKey: fs.readFileSync('./ssh_keys/my_key')
});
c.on('connect', () => {
	console.log('Connection :: connect');
});
c.on('ready', () => {
	ready = true;
	const conString = `postgres://user:password@127.0.0.1:${proxyPort}/postgres`;
	const client = new pg.Client(conString);
	client.connect((err) => {
		// ....
	});
});
