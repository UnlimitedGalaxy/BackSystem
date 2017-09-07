var _ = require('lodash');
var R = require('ramda');
var resolve = require('path').resolve;
var fs = require('fs');

const characters = require('../database/allCharacters.json');
const IMDbData = require( '../database/baseData.json');

const findNameInAPI = (item) => {
	return _.find(characters, {
		name: item.name,
	});
};

const findPlayedByInAPI = (item) => {
	return _.find(characters, i => {
		return i.playedBy.includes(item.playedBy);
	});
};

let validata = R.filter(
	i => findNameInAPI(i) && findPlayedByInAPI(i)
);

const IMDb = validata(IMDbData);
console.log(IMDb.length);
fs.writeFileSync('../database/wikiCharacter.json', JSON.stringify(IMDb, null, 2));

