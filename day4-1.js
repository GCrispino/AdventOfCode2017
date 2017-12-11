const fs = require('fs');


const getInput = path => 
	 fs.readFileSync(path)
		.toString()
		.split('\r\n')
		.map(row => row.split(' '));


const isPassphraseValid = passphraseArr => {
//	passphraseArr.forEach((word,i) => {
	for (let i = 0;i < passphraseArr.length - 1;++i){
		const word = passphraseArr[i];
		for (let k = i + 1;k < passphraseArr.length;++k){
			if (word === passphraseArr[k])
				return 0;
		}

	}
	return 1;
//	});
};

const input = getInput('./day4input.txt');


const res = input.map(isPassphraseValid).reduce((prev,acc) => prev + acc,0);

console.log(res);
