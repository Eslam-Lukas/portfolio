const accessToken =
		'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0',
	headers = {
		Authorization: `Token ${accessToken}`,
	};
let api = `https://api.github.com/users/Eslam-Lukas/repos`;
let projects = document.getElementById('projects');
let proCont = document.getElementById('projects-container');
let res = [],
	allVal = [];

async function text(opj) {
	let keys = await langfun(opj);
	let name = opj.name,
		desc = opj.description,
		file = opj.html_url,
		deploy = `https://eslam-lukas.github.io/${opj.name}/`;

	return (res = [name, desc, file, deploy, keys]);
}

async function projectForm(ele) {
	let card = document.createElement('div'),
		imgHolder = document.createElement('div'),
		img = document.createElement('img'),
		textHolder = document.createElement('div'),
		name = document.createElement('h2'),
		desc = document.createElement('p'),
		lang = document.createElement('p'),
		linksHolder = document.createElement('div'),
		filesLink = document.createElement('a'),
		deployLink = document.createElement('a');
	let [pName, pDesc, file, deploy, keys] = await text(ele);
	let langs = await keys.forEach((e, i) => {
		let span = document.createElement('span'),
			text = document.createTextNode(e);
		span.classList.add(`lang`, `lang-${i + 1}`);
		return append(span, text), append(lang, span);
	});
	await langVal(ele);
	//classes
	card.classList.add('card');
	imgHolder.classList.add('img-holder');
	textHolder.classList.add('text-holder');
	linksHolder.classList.add('links-holder');
	name.classList.add('title');
	desc.classList.add('desc');
	lang.classList.add('langs');
	filesLink.classList.add('link', 'btn');
	deployLink.classList.add('link', 'btn');
	// calc attr
	filesLink.setAttribute('href', file);
	deployLink.setAttribute('href', deploy);
	img.setAttribute(
		'src',
		'../css/sass/media/favpng_computer-programming-programming-language-clip-art.png',
	);
	await dataVal();
	//append text
	append(name, document.createTextNode(pName));
	append(desc, document.createTextNode(`description : ${pDesc}`));
	append(filesLink, document.createTextNode('files'));
	append(deployLink, document.createTextNode('deploy'));
	//append ele
	append(imgHolder, img);
	append(linksHolder, filesLink, deployLink);
	append(textHolder, name, desc, lang);
	append(card, imgHolder, textHolder, linksHolder);
	append(proCont, card);
}
async function langfun(e) {
	let key = [];
	const langs = await fetch(e.languages_url)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => console.error(error));
	key = Object.keys(langs);

	return key;
}
async function langVal(e) {
	let fullVal = {};

	const langVal = await fetch(e.languages_url)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => console.error(error));
	fullVal = Object.values(langVal).reduce((e, c) => (e += +c), 0);
	allVal.push(...Object.values(langVal));
}

async function dataVal() {
	let spanProg = document.querySelectorAll(
			'.card > .text-holder > .langs > span',
		),
		spanParent = document.querySelectorAll('.card > .text-holder > .langs ');

	spanProg.forEach((e, i) => {
		e.setAttribute('data-count', allVal[i]);
	});
	spanParent.forEach((e) => {
		let mri = [],
			tot = 0;

		e.childNodes.forEach((ele) => {
			mri.push(ele.getAttribute('data-count'));
		});
		mri.reduce((pre, cur) => {
			return (tot = parseInt(pre) + parseInt(cur));
		}, 0);
		e.childNodes.forEach((ele) => {
			progEle = document.createElement('span');
			progEle.className = 'progress';
			progEle.setAttribute(
				'data-val',
				`${parseFloat((ele.getAttribute('data-count') / tot) * 100).toFixed(
					2,
				)}%`,
			);
			ele.setAttribute(
				'data-val',
				`${parseFloat((ele.getAttribute('data-count') / tot) * 100).toFixed(
					2,
				)} %`,
			);
			append(ele, progEle);
		});
	});
}
async function creatPro() {
	const data = await fetch(api)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => console.error(error));
	if (data.length !== 0) {
		data.forEach((e) => {
			projectForm(e);
		});
	} else {
		return document.createElement('h1').appendChild('loading');
	}
}
creatPro();
function append(par, ...ele) {
	ele.forEach((e) => par.appendChild(e));
}
