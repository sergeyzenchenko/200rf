const fs = require('fs');

fs.readFile('targets.txt', 'utf8', (err, targets_raw) => {
  if (err) throw err;
  
  const inject = targets_raw.split("\n").map(f => f.trim()).join('`,`');

  fs.readFile('flood.js.template', 'utf8', (err, js) => {
    if (err) throw err;
    
    const content = js.replace('<INJECT_LIST_OF_URLS_HERE>', inject);
    fs.mkdir('build', { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.writeFile('build/flood.js', content, (err) => {
      if (err) throw err;
    });
  });
});