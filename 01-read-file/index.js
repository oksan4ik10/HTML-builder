const fs = require('fs');
const path = require('path');
const rr = fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

rr.on('readable', () => {
  let data = rr.read();
  if (data != null) console.log(data);
});
