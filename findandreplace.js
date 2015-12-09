
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function toggle_find_and_replace() {
    var far_div = document.getElementById('find_and_replace');
    if(far_div.classList.contains('hidden')) far_div.classList.remove('hidden');
    else far_div.classList.add('hidden');
}

function find_and_replace(form) {
    var find_value = form.find.value;
    var replace_value = form.replace.value;
    if(find_value.length > 0) {
        var cell = Jupyter.notebook.get_selected_cell();
        var text = cell.get_text()
        cell.set_text(text.replaceAll(find_value, replace_value));
    }
}

function get_keyboard_focus() {
    if(Jupyter.keyboard_manager.enabled) Jupyter.keyboard_manager.disable();
}



function init_find_and_replace(){
    var far_style = document.createElement('style');
    far_style.innerHTML = '#find_and_replace { \
    position: fixed; z-index:9999; \
    background:white;padding:10px;  \
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2); bottom:5px;transition:all 2s 2s;transform: translate(100%);}'
    document.head.appendChild(far_style);

    var far_div = document.createElement('div');
    far_div.id = 'find_and_replace';
    far_div.classList.add('hidden');
    far_div.setAttribute('onfocus', 'alert()');
    var far = document.createElement('form');
    //far.action = 'javascript:find_and_replace(this.form);';
    far_div.appendChild(far);
    document.getElementById('notebook-container').appendChild(far_div);
    
    var find_field = document.createElement('input');
    find_field.type = 'text';
    find_field.name = 'find';
    find_field.setAttribute('onfocus', "get_keyboard_focus();");
    find_field.setAttribute('onblur', "Jupyter.keyboard_manager.enable();");
    var replace_field = document.createElement('input');
    replace_field.type = 'text';
    replace_field.name = 'replace';
    replace_field.setAttribute('onfocus', "get_keyboard_focus();");
    replace_field.setAttribute('onblur', "Jupyter.keyboard_manager.enable();");
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'replace all in cell';
    button.setAttribute('onClick','find_and_replace(this.form)');
    
    far.appendChild(document.createTextNode('Find:'));
    far.appendChild(find_field);
//    far.appendChild(document.createElement('br'));
    far.appendChild(document.createTextNode('Replace:'));
    far.appendChild(replace_field);
    far.appendChild(button);
    
}



init_find_and_replace();

Jupyter.toolbar.add_buttons_group([{'label':'Find and replace', 'icon':'fa-search', 'callback':toggle_find_and_replace}]);

