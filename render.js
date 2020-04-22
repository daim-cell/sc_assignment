var fs = require("fs");
const json2html = require('node-json2html');

let trans={
	'<>':'div', 'class':'cards-container', 'html': function(){
        return( json2html.transform(JSON.parse(data),transform) );
}};

let transform = {'<>':'figure','class':'card','html':
[{'<>':'div', 'class':'card__hero', 'html' :
[{'<>': 'img', 'src':'data/img/${image}','class':'laptop_img'}]},
{'<>':'h2','class':'card__name','html':'${productName}'},
{'<>':'p', 'class':"card__detail",'html':
[{"<>":'span', 'class':"emoji-left",'text':'🖥'}],
'text':'${screen}'},
{'<>':'p', 'class':"card__detail",'html':
[{"<>":'span', 'class':"emoji-left",'text':'🧮'}],
'text':'${cpu}'},
{'<>':'div','class':'card__footer','html':
[{'<>':'p','class':'card__price','html':'$${price}'},
{'<>':'a','href':'/?id=${id}','class':'card__link', 'text':'Check it out', 'html':
[{'<>': 'span', 'class':"emoji-right", 'text':'👉'}]}
]
}
]};
    
let data = fs.readFileSync('./view/data/data.json');
    

function view(templateName, res) {
	let html = json2html.transform({},trans);	
	var fileContent = fs.readFileSync('./view/' + templateName + '.html', 'utf8');
	res.write(fileContent);
	res.write(html);
	res.end();
}

module.exports.view = view;