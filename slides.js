


// Object that manages serving of slides
function slide_serving_manager () {
    // Use self in callback methods
    var self = this;

    this.notebook_path = Jupyter.notebook.notebook_path;
    
    this.keep_alive = false;
    this.debug_mode = false;
    this.interrupt_delay = 500;
    
/*    this.toggle_keep_alive = function () {
        if (self.keep_alive) {
            self.checkbox_keep_alive.removeClass('fa-check-square-o').addClass('fa-square-o');
        } else {
            self.checkbox_keep_alive.removeClass('fa-square-o').addClass('fa-check-square-o');
        }
        self.keep_alive = !self.keep_alive;         
    };
*/
    this.toggle_checkbox = function (checkbox, state) {
        if (state) {
            checkbox.removeClass('fa-check-square-o').addClass('fa-square-o');
        } else {
            checkbox.removeClass('fa-square-o').addClass('fa-check-square-o');
        }
    };
    
    this.toggle_keep_alive = function () {
        self.toggle_checkbox(self.checkbox_keep_alive, self.keep_alive);
        self.keep_alive = !self.keep_alive;
    };
    
    this.toggle_debug_mode = function () {
        self.toggle_checkbox(self.checkbox_debug_mode, self.debug_mode);
        self.debug_mode = !self.debug_mode;
    }
    
    
    this.stop_serve = function () {
        Jupyter.notebook.kernel.interrupt();
        self.btn_serve_slides.children().removeClass('text-danger');
        self.btn_serve_slides.unbind();
        self.btn_serve_slides.click(start_serve);
    };
    
    this.complete_serve = function (cell) {
        if (self.keep_alive) {
            self.btn_serve_slides.children().addClass('text-danger');
            self.btn_serve_slides.unbind();
            self.btn_serve_slides.click(stop_serve);
        } else {
            var try_interrupt = function () {
                if (cell.output_area.outputs.length != 0 && cell.output_area.outputs[0].text.search('stop') != -1)
                        setTimeout(function (){Jupyter.notebook.kernel.interrupt();}, self.interrupt_delay);
                else
                    setTimeout(try_interrupt, self.interrupt_delay);
            }
            setTimeout(try_interrupt, self.interrupt_delay);
        }
    };
    
    // TODO: Use Jupyter.notebook.kernel.execute() instead?
    
    this.start_serve = function () {
        var code = '!jupyter-nbconvert --to slides --post serve  "' + self.notebook_path + '"';
//        if(self.debug_mode) {
            Jupyter.notebook.save_notebook();
            var tmp_cell = Jupyter.notebook.insert_cell_at_index('code', 0);
            tmp_cell.set_text(code);
            tmp_cell.execute();
            if (!self.debug_mode) {
                var index = Jupyter.notebook.find_cell_index(tmp_cell);
                if (index != null)
                    Jupyter.notebook.delete_cell(index);
            }
            self.complete_serve(tmp_cell);
//        } else {
//            Jupyter.notebook.kernel.execute(code, function (cell) {console.log(cell);}); 
//        }
    };

    Jupyter.toolbar.add_buttons_group([
        {id : 'btn_serve_slides',label : 'Serve Slides', icon : 'fa-desktop fa-fw', callback:this.start_serve},
        {icon : 'fa-caret-down', label : 'Serve Slides', id : 'btn_serve_slides_dropdown', callback:function (){}}
          ], 'grp_serve_slides');

    
    this.btn_serve_slides = $('#btn_serve_slides');
    this.checkbox_keep_alive = $('<i/>').addClass('fa fa-fw fa-square-o');
    this.checkbox_debug_mode = $('<i/>').addClass('fa fa-fw fa-square-o');
    
    this.menu_keep_alive = $('<li/>');
    this.menu_keep_alive.append($('<a href="#"/>').append(this.checkbox_keep_alive).append('Keep reveal.js server alive'));
    this.menu_keep_alive.click(this.toggle_keep_alive);
    
    this.menu_debug_mode = $('<li/>');
    this.menu_debug_mode.append($('<a href="#"/>').append(this.checkbox_debug_mode).append('Debug Mode'));
    this.menu_debug_mode.click(this.toggle_debug_mode);
    

    $('#btn_serve_slides_dropdown').addClass('dropdown-toggle').attr('data-toggle', 'dropdown');    
    $('#grp_serve_slides').append($('<ul/>').addClass('dropdown-menu').append(this.menu_keep_alive).append(this.menu_debug_mode));
    
}

slide_serving_manager();


