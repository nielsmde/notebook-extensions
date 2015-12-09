# Collection of Jupyter Notebook extensions

This repository contains a collection of several JavaScript extensions for the [Jupyter Notebook](http://jupyter.org/).
All the extensions are experimental and do only work with recent versions of Jupyter, especially older versions of the IPython Notebook will not work since the internal APIs got renamed.

## Extensions

### Table of contents

File: `tableofcontents.js`

This is a simple extension for Jupyter notebooks, that adds a list of all markdown headers.
The list can be used to navigate through the notebook via the provided anchor links.

Note that the table of contents is only rebuild when it is opened or closed, so after adding new headings it has to be reopen.

### Slides

File: `slides.js`

Requires: `nbconvert`

Convert the notebook to a slide-show and serve it locally with nbconvert.
This is done by executing a shell command in the notebook, which may be a **security issue.**

Two options are accessible through the drop-down menu:

1.  **Stay alive**: By default, the notebook will be interrupted after the presentation was loaded. 
    It is then only usable in the browser window it was loaded.
    If the slides should be loaded in another window, the server needs to stay alive.
    Before using the notebook again, the kernel has to be interrupted manually, by clicking either the slides button or the notebooks interrupt button.
2.  **Debug Mode**: Show the notebook cell the shell command is running in and thereby see its output.

### Find and replace

File: `findandreplace.js`

Adds functionality to search and replace strings in the notebook cells.

## Installation

Locate your Jupyter custom directory, when you didn't create a new profile it is something like `~/.jupyter/custom`
If you have a profile, for example `profile_default`, the custom directory should be here: `~/.jupyter/profile_default/static/custom`.

Copy the extension file `jnb-toc.js` to `custom` and add the following line in the file `custom/custom.js`:

    require(['custom/jnb-toc']);
 

