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


const getNumberOfSteps = ([x1,y1],[x2,y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);

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

	let curValue =  2,
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

			matrix[startingPoint[0] + i][startingPoint[1] + j] = curValue++;
		}

		if (WHAT_TO_INCREMENT[0] !== 0)
			++nCurrentRows;
		if (WHAT_TO_INCREMENT[1] !== 0)
			++nCurrentColumns;

		curCommand_i = ++curCommand_i === commands.length ? 0: curCommand_i;
	}


	return {
		matrix,
		nSteps: getNumberOfSteps(
				startingPoint,
				[startingPoint[0] + i,startingPoint[1] + j])
	};
};


//===========================================================================================
const input = parseInt(process.argv[2]);

if (typeof(input) === 'undefined' || isNaN(input))
	throw 'Wrong argument passed!';

const {matrix,nSteps} = buildMatrix(process.argv[2]);

//console.table('result matrix: ',matrix);

console.log('result: ',nSteps);
