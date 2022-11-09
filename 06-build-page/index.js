const fs = require('fs');
const path = require('path');
const process = require('process');

let dataHTML, objHTML = {}, styleRes = [];;

const bundleCSS = () => {


  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {

    files.forEach((file) => {
      if (file.isDirectory()) return
      if (path.extname(file.name) !== ".css") return

      const rr = fs.ReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      rr.on('readable', () => {
        let data = rr.read();
        if (data != null) styleRes.push(data);
      });

    })


  })

}
bundleCSS()

const bundleHTML = () => {
  const rr = fs.ReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  rr.on('readable', () => {
    let data = rr.read();
    if (data !== null) dataHTML = data
  });

  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach((file) => {
        const rr = fs.ReadStream(path.join(__dirname, 'components', file.name), 'utf-8');

        rr.on('readable', () => {
          const fileName = `{{${file.name.split('.')[0]}}}`

          let data = rr.read();
          if (data !== null) objHTML[fileName] = data

        });
      })
    }
  })

}
bundleHTML()

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err
})

const pathFile = (file, pathFrom = ['assets'], pathTo = ['project-dist', 'assets']) => {
  console.log(...pathFrom);


  let test;
  try {
    test = !file.isDirectory()
  }
  catch {
    test = false
  }
  if (test) {
    fs.copyFile(path.join(__dirname, ...pathFrom, file.name), path.join(__dirname, ...pathTo, file.name), (err) => { if (err) throw err })
    return
  }
  else {
    if (file) {
      if (pathFrom.length === 2) {
        pathFrom = pathFrom.slice(0, 1)
        pathTo = pathTo.slice(0, 2);
      }
      pathFrom.push(file.name);
      pathTo.push(file.name);
    }
    fs.mkdir(path.join(__dirname, ...pathTo), { recursive: true }, (err) => {
      if (err) throw err;
    })

    fs.readdir(path.join(__dirname, ...pathFrom), { withFileTypes: true }, (err, files) => {

      files.forEach((file) => {


        return pathFile(file, pathFrom, pathTo)
      })
    })
  }
}

pathFile()




const rwHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');
const rwCSS = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8');
process.on('exit', () => {
  for (const iterator in objHTML) {
    dataHTML = dataHTML.replace(iterator, objHTML[iterator])
  }
  rwCSS.write(styleRes.join('\n'))
  rwHTML.write(dataHTML)
});

