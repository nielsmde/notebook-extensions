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

There is a basic installation script, that can work. Use it like

    ./INSTALL all

to install all extensions.
To install only some, extension names can be given:

    ./INSTALL slides tableofcontents

### Manual Installation

The installation is similar for all extensions, just replace `slides` with the name of the extension which should be installed.

1.  Copy the extension file to your Jupyter custom directory:
    
    ```
    cp slides.js ~/.jupyter/custom
    ```
    
2.  Add one line of code to the file `~/.jupyter/custom/custom.js`:

    ```    
    require(['{extension}']);
    ```

### Profile directories

The above steps assumed no Jupyter profile is used.
To install the extensions for a profile, the path of the Jupyter configuration directory changes:

    ~/.jupyter/custom --> ~/.jupyter/{profile}/static/custom
    
Where `{profile}` is the name of the profile which is used.
 

