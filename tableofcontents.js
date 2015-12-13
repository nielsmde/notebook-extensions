
function toggle_toc() {
    var toc = document.getElementById('toc');
    if (toc.classList.contains('hidden'))
        toc.classList.remove('hidden');
    else 
        toc.classList.add('hidden');
}


function anchor_to_toc_item (index, anchor) {
    var heading = $(anchor).parent().clone();
    heading.children().last().remove();
    heading.removeAttr('id');
    var item = $(anchor).clone();
    item.html('')
    item.removeClass('anchor-link');
    item.append(heading);
    return item[0];
}

function place_toc() {
    var htop = $('#header').height() + 5;
    $('#toc').css('top', htop + 'px');
}

function translate_toc() {
    var hright = ($('#notebook').width() - $('#notebook-container').width())/2;
    var toc = $('#toc');
    var translate = toc.width() - hright + 35;
    toc.css('transform', 'translate(' + translate + 'px)')    
    if (hright < toc.width()) {
        console.log('if-branch');
        if (translate > toc.width() - 10)
            translate = toc.width() - 10;

        toc.hover(
            function () {toc.css('transform', 'translate(0)')},
            function () {toc.css('transform', 'translate(' + translate + 'px)')}
        );
    } else {
        toc.unbind('mouseenter');
        toc.unbind('mouseleave');
    }
}

function toc() {
    var anchors = $('a.anchor-link');
    var items = anchors.map(anchor_to_toc_item);
    var toc = $('#toc');
    toc.children().remove();
    toc.append(items);
    
    place_toc();
    toggle_toc();
    translate_toc();
    
    $(window).resize(function () {
        place_toc();
        toc.css('transition', 'all 0s');
        translate_toc();
        toc.css('transition', '');
    });
}


$('head').append($('<link type="text/css" rel="stylesheet" href="/custom/tableofcontents.css" />'));

$('body').append($('<div id="toc" class="hidden" />'));

Jupyter.toolbar.add_buttons_group([{'label':'Table of Contents', 'icon':'fa-list','callback':toc}])

