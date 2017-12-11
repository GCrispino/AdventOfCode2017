const fs = require('fs');


const getInputMatrix = path => 
	 fs.readFileSync(path)
		.toString()
		.split('\r\n')
		.map(row => row.split('\t').map(x => parseInt(x)));



const getChecksum = matrix => 
	//maps each row to row with two values: lower and higher
	matrix.map(
		row => row.reduce((prevValue,curElement,i) => {
			let [lower,higher] = prevValue;
			
			if (curElement < lower)
				lower = curElement;
			if (curElement > higher)
				higher = curElement;

			return [lower,higher];
		},[row[0],row[0]])
	)
	//maps each row to the difference between the higher and the lower values
	.map(row => row[1] - row[0])
	//reduce it to the sum of every difference
	.reduce((prev,rowDifference) => rowDifference + prev,0);

const inputMatrix = getInputMatrix('inputs/day2input.txt');
const result = getChecksum(inputMatrix);

console.log('result: ',result);
