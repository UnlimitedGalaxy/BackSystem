var _ = require('lodash');
var R = require('ramda');
var rp = require('request-promise');
var cheerio = require('cheerio');
var Agent = require('socks5-http-client/lib/Agent');
var fs = require('fs');
var resolve = require('path').resolve;
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
var _allCharacters = [];

var getAllCharacters = async (page = 1) => {
	var res = await rp(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`);
	var body = JSON.parse(res);
	
	_allCharacters = _.union(_allCharacters, body);
	// console.log('result', body);
	if (body.length < 50) {
		console.log(_allCharacters.length);
		fs.writeFileSync('../database/allCharacters.json', JSON.stringify(_allCharacters, null, 2), 'utf8');
		return;
	} else {
		await sleep(1000);
		console.log(page);
		page++;
		getAllCharacters(page);
	}
};

getAllCharacters();