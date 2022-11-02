const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rr = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const rl = readline.createInterface({ input, output });

let res = ''
console.log('Add text or exit: ');
rl.on('line', (input) => {

  if (input === "exit") rl.close();
  if (input !== "exit") res += input;

});



process.on('exit', () => {
  rr.write(res)
  output.write('Удачи в изучении Node.js!')
});