
var fs = require("fs");
const json2html = require('node-json2html');



let transform = {'<>':'figure','class':'laptop','html':
[{'<>':'p','class':'laptop__price','html':'$${price}'},
{'<>':'a', 'class':"laptop__back", 'href':'/','text':'Back','html':
[{"<>":'span', 'class':"emoji-left",'text':'👈'}],
},
{'<>':'div', 'class':'laptop__hero', 'html' :
[{'<>': 'img', 'src':'data/img/${image}','class':'laptop_img'}]},
{'<>':'h2','class':'laptop__name','text':'${productName}'},
{'<>':'div', 'class':"laptop__details",'html':
[{'<>':'p', 'html': [{"<>":'span', 'class':"emoji-left",'text':'🖥'}],
'text':'${screen}'},
{'<>':'p', 'html': [{"<>":'span', 'class':"emoji-left",'text':'🧮'}],
'text':'${cpu}'},
{'<>':'p', 'html': [{"<>":'span', 'class':"emoji-left",'text':'💾'}],
'text':'${storage}'},
{'<>':'p', 'html': [{"<>":'span', 'class':"emoji-left",'text':'📦'}],
'text':'${ram}'}
]},
{'<>':'p','class':'laptop__description','html': '${description}'},
{'<>':'p','class':'laptop__source', 'text':'Source','html':
[{'<>':'a','href':'https://www.techradar.com/news/mobile-computing/laptops/best-laptops-1304361','text':'https://www.techradar.com/news/mobile-computing/laptops/best-laptops-1304361'}]},
{'<>':'a', 'class':'laptop__link','href':'#','html': [{"<>":'span', 'class':"emoji-right",'text':'🥳 😍'}],
'text':'Buy now for ${price}'}
]}

function view(templateName, res, id) {
	let data = fs.readFileSync('./view/data/data.json');
	data = JSON.parse(data);
	data=data[id];
	console.log(data,id);
	let html = json2html.transform(data,transform);	
	var fileContent = fs.readFileSync('./view/' + templateName + '.html', 'utf8');
	res.write(fileContent);
	res.write(html);
	res.end();
}

module.exports.view = view;