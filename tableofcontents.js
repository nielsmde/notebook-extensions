function get_toc_items(cell) {
    var anchors = cell.element.find('a');
    var items = [];
    for (var i = 0;i<anchors.length; i++ ){
        var a = anchors[i];
        var h = a.parentElement;
        if (h.tagName[0] != 'H') continue;
        var item = document.createElement(h.tagName);
        var link = document.createElement('a');
        link.text = h.childNodes[0].textContent;
        link.href = a.href;
        item.appendChild(link);
        items.push(item);
    }
    return items;
}

function toggle_toc() {
    var toc = document.getElementById('toc');
    if (toc.classList.contains('hidden')) toc.classList.remove('hidden');
    else toc.classList.add('hidden');
}

function table_of_contents() {
    var cells = Jupyter.notebook.get_cells();
    var toc = document.getElementById('toc');
    toc.innerHTML = '';
    
    for(var i=0; i<cells.length; i++){
        var cell = cells[i];
        if(cell.cell_type == 'markdown'){               
            var items = get_toc_items(cell);
            for (var j=0; j<items.length; j++) toc.appendChild(items[j]);
        }
    }
    var htop = $('#header').height() + 5;
    var hright = $('#toc').width();
    toc.setAttribute('style', 'top:'+htop+'px');
    toggle_toc();
}


var toc_style = document.createElement('style');
toc_style.innerHTML = '#toc { \
position: fixed; z-index:9999; \
background:white;padding:10px; min-width:150px;\
box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2); ;right:100px; transition:all 2s 2s;transform: translate(100%);}\
#toc.hidden {display:none;} #toc:hover {right:5px;transform: translate(0);transition:all 0.3s;} \
#toc a {color:black;} \
#toc h1,h2,h3,h4,h5,h6 {font-size:1em;margin:0.5em} #toc h1 {font-weight:bold;} \
#toc h2 {padding-left:1em} #toc h3 {padding-left:1.5em} #toc h4 {padding-left:2em} #toc h5 {padding-left:2.5em} #toc h6 {padding-left:3em} '

document.head.appendChild(toc_style);

/*
var toc_style = document.createElement('link');
toc_style.type = 'text/css';
toc_style.rel = 'stylesheet';
toc_style.href='static/custom/nbtoc.css';
document.head.appendChild(toc_style);
*/
var toc = document.createElement('div');
toc.id = 'toc';
toc.setAttribute('class','hidden');
document.body.appendChild(toc);

Jupyter.toolbar.add_buttons_group([{'label':'Table of Contents', 'icon':'fa-list','callback':table_of_contents}])
