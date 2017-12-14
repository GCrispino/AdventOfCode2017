const fs = require('fs');


const input = 
	fs.readFileSync('day7input.txt')
	.toString()
	.split('\r\n')
	.map(entry => {
    return entry;
  });


console.log(input);