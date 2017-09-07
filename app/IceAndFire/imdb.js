var _ = require('lodash');
var R = require('ramda');
var rp = require('request-promise');
var cheerio = require('cheerio');
var Agent = require('socks5-http-client/lib/Agent');
var fs = require('fs');
var resolve = require('path').resolve;

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const jsonPath = path => resolve(__dirname, '../database/json', path);

exports.getIMDbCharacter = async () => {
	const options = {
		uri: 'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
		// agentClass: Agent,
		// agentOptions: {
		// 	socksHost: 'localhost',
		// 	socksPort: 1080,
		// },
		transform: body => cheerio.load(body),
	};
	
	var $ = await rp(options);
	var photos = [];
	
	console.log('getIMDbCharacter start up');
	$('table.cast_list tr.odd, table.cast_list tr.even').each(function() {
		let playedBy = $(this).find('td.itemprop span.itemprop');
		playedBy = playedBy.text();
		
		let nmId = $(this).find('td.itemprop a');
		nmId = nmId.attr('href');
		
		let character = $(this).find('td.character a');
		
		let name = character.text();
		let chId = character.attr('href');
		
		const data = {
			playedBy,
			nmId,
			name,
			chId,
		};
		
		photos.push(data);
	});
	// console.log('getIMDbCharacter get Data', photos.length);
	const fn = R.compose(
		R.map(photo => {
			const reg1 = /\/name\/(.*?)\/\?ref/;
			const reg2 = /\/character\/(.*?)\/\?ref/;
			
			const match1 = photo.nmId.match(reg1);
			const match2 = photo.chId.match(reg2);
			
			photo.nmId = match1[1];
			photo.chId = match2[1];
			
			return photo;
		}),
		R.filter(photo => photo.playedBy && photo.name && photo.nmId && photo.chId)
	);
	
	// fs.writeFileSync('../database/originData.json', JSON.stringify(photos));
	photos = fn(photos);
	// console.log('getIMDbCharacter filter data', photos.length);
	return photos;
};

exports.getIMDbImages = async url => {
	const options = {
		uri: url,
		// agentClass: Agent,
		// agentOptions: {
		// 	socksHost: 'localhost',
		// 	socksPort: 1080, // 本地 VPN 的端口，这里用的 shadowsocks
		// },
		transform: body => cheerio.load(body),
	};
	
	const $ = await rp(options);
	
	let images = [];
	
	$('div.media_index_thumb_list a img').each(function() {
		var src = $(this).attr('src');
		
		if (src) {
			src = src.split('_v1').shift();
			src += '_v1.jpg';
			images.push(src);
		}
	});
	
	return images;
};
(async() => {
	let result = await exports.getIMDbCharacter();
	fs.writeFileSync('../database/baseData.json', JSON.stringify(result));
	
})();

