# Math I Can Do plugins

This repository contains sample plugins for the desktop edition of [the Math I Can Do editor](https://www.mathicando.com). As plugins are still considered an experimental feature, these samples may change rapidly as the editor evolves, and there is a chance that old versions of the plugins will need to be updated when the editor is updated in order to keep working.

## What’s included?

The following sample plugins are currently provided:

[Add New Math Palettes](blob/main/AddNewMathPalettes.micd-plugin)  
Registers some custom math object palettes. The first adds child-friendly animal variables. The second adds a palette to insert [SI units](https://en.wikipedia.org/wiki/International_System_of_Units). After running the plugin, the new palettes can be added to the editor by choosing the **View/Customize Panels** menu item.

[Copy SVG Image](blob/main/CopySVGImage.micd-plugin)  
Adds a menu item to the **Plugin** menu that copies the current selection or document to the clipboard as an SVG image.

[Node Monitor](blob/main/NodeMonitor.micd-plugin)  
When chosen from the **Plugin** menu, this opens a small pop-up window that displays information about the content under the caret that is useful for developers working with the [Walker](https://www.mathicando.com/api/docs/classes/micd.walker.html) or [semantic object](https://www.mathicando.com/api/docs/semantic-objects.html) APIs.

## Installing the plugins

Open the editor, then choose **Plugin/Manage Plugins** from the app menu. In the window that opens, choose the **+** button, then use the file chooser to select one of the plugin file (`.micd-plugin`).

Once installed, you can close the manager window.

Installed plugins will be listed under the **Plugin** menu; choose the relevant menu item to activate the plugin.

Some plugins only need to run once, like those that register new math object palettes, but most plugins act like new app commands to be selected as needed.

## Writing plugins

Plugins are plain UTF-8 encoded JavaScript files. The top of each file includes a block of metadata stored as a [template string literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). (It must be readable without executing any code, so it cannot contain any `${expressions}`.)

The metadata block has two parts: a list of key-value property pairs, one per line, followed by a longer description. The property pairs are separated from the description by a blank line. All values are optional, except for `name`. Example:

```
`
    name: Name of the plugin
    version: 1.0.0
    credits: A. Responsible Person
    link: https://somewebsite.somewhere

    A longer description of the plugin, that might be shown to the user.
    The description block can contain a few basic HTML elements, such as <strong>
    and <em>.
`
```

The app will run the plugin from its original script file where possible. Once installed, you can develop your plugin by editing the source file, saving it, and activating the plugin in the app by selecting its menu item.

## License information

The sample plugins are MIT licensed. This does not include the type information, which is used with permission. It may be used or distributed without modifications.