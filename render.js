var fs = require("fs");
const json2html = require('node-json2html');

let transform = {'<>':'figure','class':'card','html':
[{'<>':'h2','class':'card_name','html':'${productName}'},
{'<>':'p', 'class':"card__detail",'html':
[{"<>":'span', 'class':"emoji-left",'text':'🖥'}],
'text':'${screen}'},
{'<>':'p', 'class':"card__detail",'html':
[{"<>":'span', 'class':"emoji-left",'text':'🧮'}],
'text':'${cpu}'},
{'<>':'div','class':'card_footer','html':
[{'<>':'p','class':'card_price','html':'$${price}'},
{'<>':'a','href':'laptop.html','class':'card_link', 'text':'Check it out', 'html':
[{'<>': 'span', 'class':"emoji-right", 'text':'👉'}]}
]
}
]};
    
let data = fs.readFileSync('./data/data.json');
    

function view(templateName, res) {
	let html = json2html.transform(JSON.parse(data),transform);	
	var fileContent = fs.readFileSync('./view/' + templateName + '.html', 'utf8');
	res.write(fileContent);
	res.write(html);
	res.end();
}

module.exports.view = view;