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


$('head').append($('<link type="text/css" rel="stylesheet" href="/custom/nbtoc.css" />'));

$('body').append($('<div id="toc" class="hidden" />'));

Jupyter.toolbar.add_buttons_group([{'label':'Table of Contents', 'icon':'fa-list','callback':table_of_contents}])
