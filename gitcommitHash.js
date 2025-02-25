const { exec } = require('child_process')

const gitCommand = 'git rev-parse HEAD'

const asyncProcess = async () => {
  try {
	const { stdout, stderr } = await execPromise('git rev-parse HEAD', { cwd: process.cwd() });

	
	if (stderr) {
		console.error(`stderr: ${stderr}`);
		return null;
	}
	// 去除输出中的换行符并返回
	const latestCommitHash = stdout.trim();
	console.log(`最新的Git提交哈希值是: ${latestCommitHash}`);
	return latestCommitHash;
  }
  catch(e) {
    throw e
  }
}

asyncProcess()
