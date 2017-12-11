const fs = require('fs');


const getInputMatrix = path => 
	 fs.readFileSync(path)
		.toString()
		.split('\r\n')
		.map(row => row.split('\t').map(x => parseInt(x)));

const getRowDivisorAndDividend = row => {

	for (let i = 0;i < row.length - 1;++i){
		for (let j = i + 1;j < row.length;++j){
			if (row[i] % row[j] === 0)
				return [row[i],row[j]];
			else if (row[j] % row[i] === 0)
				return [row[j],row[i]];
		}
	}
				
	return [row[0],row[1]];
};

const getChecksum = matrix => 
	//maps each row to row with two values: lower and higher
	matrix.map(
		getRowDivisorAndDividend
	)
	//maps each row to the difference between the higher and the lower values
	.map(row => row[0] / row[1])
	//reduce it to the sum of every difference
	.reduce((prev,rowDifference) => rowDifference + prev,0);

const inputMatrix = getInputMatrix('inputs/day2input.txt');
const result = getChecksum(inputMatrix);

console.log('result: ',result);
