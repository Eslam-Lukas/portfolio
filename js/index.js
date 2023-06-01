//projects section
let api = `https://api.github.com/users/Eslam-Lukas/repos`;
let projects = document.getElementById('projects');
let proCont = document.getElementById('projects-container');
let res = [],
	allVal = [];

async function text(opj) {
	if (opj.name !== 'portfolio' || opj.name !== 'bike-plus' ) {
		let keys = await langfun(opj);
		let name = opj.name,
			desc = opj.description,
			file = opj.html_url,
			deploy = `https://eslam-lukas.github.io/${opj.name}/`;
		return (res = [name, desc, file, deploy, keys]);
	}
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
	await keys.forEach((e, i) => {
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
	filesLink.setAttribute('target', '_blank');
	deployLink.setAttribute('href', deploy);
	deployLink.setAttribute('target', '_blank');
	img.setAttribute(
		'src',
		'./css/sass/media/favpng_computer-programming-programming-language-clip-art.png',
	);
	await dataVal();
	//append text
	append(name, document.createTextNode(pName));
	append(desc, document.createTextNode(`description : ${pDesc}`));
	append(filesLink, document.createTextNode('files'));
	append(deployLink, document.createTextNode('demo'));
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
//footer sect
document.getElementById('year').textContent = new Date().getUTCFullYear();
/// global function
function append(par, ...ele) {
	ele.forEach((e) => par.appendChild(e));
}
function activeTogglerClick(arr, cls = 'active', eve = 'click') {
	arr.forEach(
		(e) => {
			e.addEventListener(eve, () => {
				arr.forEach((ele) => {
					ele.classList.remove(cls);
				});
				e.classList.add(cls);
			});
		},
		//
	);
}
function activeToggler(arr, curId, atr = 'id', cls = 'active') {
	arr.forEach((ele) => {
		ele.id === 'landing'
			? ''
			: ele.getAttribute(atr) === curId
			? ele.classList.add(cls)
			: ele.classList.remove(cls);
	});
}

//nav bar sect /*** ***/
let pages = document.getElementById('pages'),
	social = document.getElementById('social');
if (document.body.clientWidth >= 767) {
} else {
}
// //[1]pages
let theme = document.querySelectorAll('#pages .theme > span'),
	links = document.querySelectorAll('#pages .links li');
// [1]theme
theme.forEach((e) => {
	e.addEventListener('click', () => {
		theme.forEach((ele) => {
			ele.classList.toggle('active');
		});
		if (e.classList.contains('light')) {
			e.parentElement.style.transform = `rotateY(-180deg)`;
			document.body.style.cssText = `
			--M-T-color: #8443df;
			--M-back: #302828;
			--full-white: black; 
			--full-black: white;
			--shadow: #707070;
			`;
		} else {
			e.parentElement.style.transform = ` rotateY(-360deg) `;
			document.body.style.cssText = ``;
		}
	});
});
// [2] scrool
let allContainer = document.querySelectorAll('section .container'),
	allSects = document.querySelectorAll('section'),
	idref;
links.forEach((e) => {
	e.addEventListener('click', () => {
		activeTogglerClick(links);
		let sectId = e.getAttribute('data-sect'),
			sect = document.getElementById(sectId);
		window.scrollTo({
			top: sect.offsetTop,
			behavior: 'smooth',
		});
		idref = sectId;
		activeToggler(allSects, idref);
	});
});
window.onscroll = () => {
	allSects.forEach((e) => {
		if (window.scrollY >= e.offsetTop - 300) {
			idref = e.id;
			activeToggler(links, idref, 'data-sect');
			activeToggler(allSects, idref);
			overLayRemove(allSects);
		}
	});
};
// [3]fade in
allSects.forEach((e) => {
	if (!e.classList.contains('active')) {
		let left = document.createElement('span'),
			right = document.createElement('span'),
			width = Math.random() * 100;
		left.classList.add('over-lay', 'left');
		right.classList.add('over-lay', 'right');
		left.style.width = `${width}%`;
		right.style.width = `${100 - width}%`;
		e.style.position = 'relative';
		append(e, left, right);
	}
});
function overLayRemove(arr) {
	arr.forEach((e) => {
		e.classList.contains('active')
			? document
					.querySelectorAll(`#${e.id} > .over-lay`)
					.forEach((e) => (e.style.cssText = `width:0px;`))
			: document
					.querySelectorAll(`#${e.id} > .over-lay`)
					.forEach((e) => (e.style.cssText = ``));
	});
}
//[4] next sect
let arrow = document.getElementById('arrow');
arrow.addEventListener('click', () => {
	let ind;
	links.forEach((e, i) => (e.classList.contains('active') ? (ind = i) : ''));
	links.length - 1 > ind ? links[ind + 1].click() : links[0].click();
});
// // [2]social /*** ***/
let socialAcc = document.querySelectorAll('#social >.icons > span');
socialAcc.forEach((e) => {
	e.addEventListener('click', () => {
		if (e.firstElementChild.id === 'facebook') {
			window.open('https://www.facebook.com/theviper.strikes.3');
		} else if (e.firstElementChild.id === 'github') {
			window.open('https://github.com/Eslam-Lukas');
		} else if (e.firstElementChild.id === 'instagram') {
			window.open('https://instagram.com/eslam_seif29');
		} else if (e.firstElementChild.id === 'twitter') {
			window.open('https://twitter.com/Eslam_Seif29');
		} else if (e.firstElementChild.id === 'linkedin') {
			window.open('https://www.linkedin.com/in/eslam-seif-21588524b');
		} else if (e.firstElementChild.id === 'google') {
			window.open('https://theviperstrikes29@gmail.com');
		} else if (e.firstElementChild.id === 'windows') {
			window.open('https://join.skype.com/invite/GJyAkKa1pwUf');
		}
	});
});
//skills
let skillCard = document.querySelectorAll('#skills > .container > .card');
skillCard.forEach((e) => {
	let skillProg = e.lastElementChild,
		skillWidth = e.lastElementChild.lastElementChild;
	append(
		skillProg,
		document.createTextNode(skillProg.getAttribute('data-width')),
	);
	e.addEventListener('mouseenter', () => {
		skillProg.style.cssText = `
		z-index: 1;
		background: transparent;
		`;
		skillWidth.style.cssText = `
		width:100%;
		z-index: -1;
		background: linear-gradient(to right ,var(--nav-B-color, #8443df)
		${skillProg.getAttribute('data-width')} ,
		var(--overlay, rgba(120, 114, 114, 0.6705882353)) 
		calc(100% -  ${skillProg.getAttribute('data-width')})
		);
		`;
	});
	e.addEventListener('mouseleave', () => {
		skillWidth.style.cssText = ``;
		skillProg.style.cssText = ``;
	});
});
//form
let form = document.getElementById('form'),
	inp = document.querySelectorAll('.inp > .inp-form'),
	inpAfter = document.querySelectorAll('.after'),
	email = document.getElementById('email'),
	phone = document.getElementById('phone'),
	emailRegExp = /\w+@\w+.\w+/gi,
	phoneRegExp = /(\+0)?(\d{11})/g;
form.addEventListener('submit', (e) => {
	if (emailRegExp.test(email.value) && phoneRegExp.test(phone.value)) {
		return true;
	} else {
		e.preventDefault();
	}
	if (!emailRegExp.test(email.value)) {
		email.style.border = '1px solid red';
	}
	if (!phoneRegExp.test(phone.value)) {
		phone.style.border = '1px solid red';
	}

	form.setAttribute('action', 'mailto:theviperstrikes29@gmail.com');
	form.setAttribute('enctype', 'text/plain');
});
inp.forEach((e) => {
	e.addEventListener('input', () => {
		let width = `${(e.value.length / e.getAttribute('maxlength')) * 100}% `;
		e.nextElementSibling.style.width = width;
		e.nextElementSibling.style.maxWidth = '100%';
		email.style.border = 'none';
		phone.style.border = 'none';
	});
});
let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
	inp.forEach(
		(e) => ((e.value = ''), (e.nextElementSibling.style.width = '0%')),
	);
});
