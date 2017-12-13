const fs = require('fs');

const getBankMostBlocks = 
	banks => banks.reduce((prev,blocks) => (blocks > prev) ? blocks : prev,banks[0]);

const input = fs.readFileSync('inputs/day6input.txt')
		.toString()
		.split('\t')
		.map(x => parseInt(x,10));

while (true) {
	const curBankVal = getBankMostBlocks(input);

	for (let i = curBankVal;i > 0;--i){

	} 
}

console.log(getBankMostBlocks(input));
