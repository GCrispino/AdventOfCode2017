require('console.table');

const RIGHT = 0,
      UP = 1,
      LEFT = 2,
      DOWN = 3;


const getNRows = input => {
	let i = 1,sum = 0;

	while(sum < input)
		sum += 2* i++;

	
	return i - 1;
};

const getNColumns = input => {
	const sqrt = Math.sqrt(input);
	
	return sqrt % 1 === 0 ? Math.floor(sqrt) : Math.floor(sqrt) + 1;
};


const getSumNeighbors = (matrix,i,j) => {

	let sum = 0;

	for (let k = i - 1;k <= i + 1;++k){
		if (typeof(matrix[k]) === 'undefined')
			continue;
		for (let l = j - 1;l <= j + 1;++l)
			if (typeof(matrix[k][l]) !== 'undefined' && !(k === i && l === j))
				sum += matrix[k][l];
	}

	return sum;

};

const buildMatrix = input => {
	const nRows = getNRows(input),
	      nColumns = getNColumns(input);

	const matrix = Array(nRows).fill(0).map(row => new Array(nColumns).fill(0));

	const startingPoint = [
		Math.floor(nRows / 2),
		Math.floor((nColumns - 1) / 2)
	];

	matrix[startingPoint[0]][startingPoint[1]] = 1;

	const commands = [RIGHT,UP,LEFT,DOWN];

	let curValue =  1,
	    curCommand_i = 0,
	    i = 0,j = 0,
	    nCurrentRows = 1,
	    nCurrentColumns = 1,
	    WHAT_TO_INCREMENT = [0,0], //first position for row, second for column
	    nOfIterationsInnerLoop = null;

	while(curValue <= input){
		const command = commands[curCommand_i];
	
		switch(command){
			case UP:
				WHAT_TO_INCREMENT[0] = -1;
				WHAT_TO_INCREMENT[1] = 0;
				nIterations = nCurrentRows;
				break;
			case DOWN:
				WHAT_TO_INCREMENT[0] = 1;
				WHAT_TO_INCREMENT[1] = 0;
				nIterations = nCurrentRows;
				break;
			case RIGHT:
				WHAT_TO_INCREMENT[0] = 0;
				WHAT_TO_INCREMENT[1] = 1;
				nIterations = nCurrentColumns;
				break;
			case LEFT:
				WHAT_TO_INCREMENT[0] = 0;
				WHAT_TO_INCREMENT[1] = -1;
				nIterations = nCurrentColumns;
				break;
		} 


		for (let k = 0;k < nIterations && curValue <= input;++k){
			
			i += WHAT_TO_INCREMENT[0];
			j += WHAT_TO_INCREMENT[1];

			const index_i = startingPoint[0] + i,
			      index_j = startingPoint[1] + j;

			curValue = getSumNeighbors(matrix,index_i,index_j);

			matrix[index_i][index_j] = curValue;
		}

		if (WHAT_TO_INCREMENT[0] !== 0)
			++nCurrentRows;
		if (WHAT_TO_INCREMENT[1] !== 0)
			++nCurrentColumns;

		curCommand_i = ++curCommand_i === commands.length ? 0: curCommand_i;
	}


	return {
		matrix,
		curValue
	};
};


//===========================================================================================
const input = parseInt(process.argv[2]);

if (typeof(input) === 'undefined' || isNaN(input))
	throw 'Wrong argument passed!';

const {matrix,curValue} = buildMatrix(process.argv[2]);

//console.table('result matrix: ',matrix);

console.log('result: ',curValue);
