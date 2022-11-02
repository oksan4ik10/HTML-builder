const fs = require('fs');
const path = require('path');
const { stat } = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isDirectory()) return
      stat(path.join(__dirname, 'secret-folder', file.name),
        (err, item) => {
          let name = file.name.split(".")
          let extension = path.extname(file.name).slice(1)
          console.log(name.slice(0, name.length - 1).join('.'), '-', extension, '-', (item.size / 1024), 'kb')
        }
      )


    })
  }
})