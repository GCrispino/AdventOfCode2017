const fs = require('fs');

const getBankMostBlocks = 
	banks => banks.reduce((prev,blocks,index) => (blocks > banks[prev]) ? index : prev,0);

const containsBank = (input,bankList) => 
	bankList.reduce((prev,bank,i) => {
		if (prev)
			return prev;

		return bank.every((x, k) => bank.length === input.length && x === input[k]);
	},false);

const input = fs.readFileSync('inputs/day6input.txt')
		.toString()
		.split('\t')
		.map(x => parseInt(x,10));

const bankList = [];

let continueLoop = true;
while (continueLoop) {
	const curBank = getBankMostBlocks(input);
	let curBankVal = input[curBank];

	input[curBank] = 0;
	for (let i = curBank + 1 < input.length ? curBank + 1 : 0; curBankVal > 0; --curBankVal,i = ++i < input.length ? i : 0)
		++input[i];

	continueLoop = !containsBank(input,bankList);

	if (!continueLoop) break;

	bankList.push(input.slice());
	
}

console.log('result: ' + (bankList.length + 1));

