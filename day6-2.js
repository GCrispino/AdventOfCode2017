const fs = require('fs');

const getBankMostBlocks = 
	banks => banks.reduce((prev,blocks,index) => (blocks > banks[prev]) ? index : prev,0);

const containsBank = (input,bankList) => 
	bankList.reduce((prev,bank,i) => {
		if (prev[0]) return prev;

		const contains = bank.every((x, k) => bank.length === input.length && x === input[k]);

		if (contains) return [true,i];
		else return [false,null];
	},[false,null]);

const input = fs.readFileSync('inputs/day6input.txt')
		.toString()
		.split('\t')
		.map(x => parseInt(x,10));

const bankList = [];

let continueLoop = true,final_i;
while (continueLoop) {
	const curBank = getBankMostBlocks(input);
	let curBankVal = input[curBank];

	input[curBank] = 0;
	for (let i = curBank + 1 < input.length ? curBank + 1 : 0; curBankVal > 0; --curBankVal,i = ++i < input.length ? i : 0)
		++input[i];

	const containsResult = containsBank(input, bankList),
		contains = containsResult[0],
		index = containsResult[1];

	continueLoop = !contains;
	final_i = index;

	if (!continueLoop) break;

	bankList.push(input.slice());
	
}

console.log('final result: ',bankList.length - final_i);

