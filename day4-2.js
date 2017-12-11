const fs = require('fs');


const getInput = path => 
	 fs.readFileSync(path)
		.toString()
		.split('\r\n')
		.map(row => row.split(' '));

const getCharCount = word => {
	const objResult = {};

	[].forEach.call(word,c => {
		if (typeof(objResult[c]) === 'undefined')
			objResult[c] = 1;
		else
			++objResult[c];
	});

	return objResult;
};

const isAnagram = (word1,word2) => {
	if (word1.length !== word2.length)
		return false;

	const charCount1 = getCharCount(word1),
	      charCount2 = getCharCount(word2);

	
	for (key of Object.keys(charCount1))
		if (charCount1[key] !== charCount2[key])
			return false;

	return true;
};

const isPassphraseValid = passphraseArr => {
	for (let i = 0;i < passphraseArr.length - 1;++i){
		const word = passphraseArr[i];
		for (let k = i + 1;k < passphraseArr.length;++k){
			if (isAnagram(word,passphraseArr[k]))
				return 0;
		}

	}

	return 1;
};

const input = getInput('./day4input.txt');



const res = input.map(isPassphraseValid).reduce((prev,acc) => prev + acc,0);

console.log(res);
