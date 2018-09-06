const {spawn} = require('child_process')
const path = require('path')

async function pexec(command, option) {

	console.log(`===== Executing: [${command}] under path: [${option.cwd}]`);

	return new Promise((resolve, reject) => {
		let sp = spawn(command, option);

		sp.stdout.on('data', (data) => {
			process.stdout.write(data)
		});

		sp.stderr.on('data', (data) => {
			process.stderr.write(data)
		});

		sp.on('close', (code) => {
			let message = `child process exited with code ${code}`
			console.log(message);
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(message));
				process.exit(-1);
			}
		});
	})
}

function cwd(basePath, relativePath) {
	return {cwd: path.join(__dirname, basePath, relativePath), shell: true};
}

exports.pexec = pexec;
exports.cwd = cwd;
