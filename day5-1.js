

let arr = [1,2,3,4];

const x = arr[0]++,y = arr[0];

const fs = require('fs');

const instructions = 
	fs.readFileSync('inputs/day5input.txt')
	.toString()
	.split('\r\n');

let i = 0,nSteps = 0;

for (
	i = 0, nSteps = 0; 
	i >= 0 && i < instructions.length;
	i += instructions[i]++,++nSteps
);

console.log('result: ',nSteps);