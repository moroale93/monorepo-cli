const { exec } = require("child_process");

module.exports = (command) => {
  console.log(command)
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
          reject(error.message);
          return;
      }
      console.log(stdout, stderr)
      resolve(stdout, stderr);
    });
  });
};