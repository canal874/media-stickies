# Media Stickies
A desktop gadget platform written by Electron.
You can write or paste any HTML on you desktop as a gadget.

This looks like sticky notes but accepts any HTML and can have a transparent background.

# Run

Just type 'npm start' on the project root directory.

# Build installer

Type 'npm run make' and you can find a installer which name is media-stickies-x.x.x.Setup.exe under out\make\squirrels.windows\x64\ (if you use Windows).

# Options

Set environment variables to change runtime options.

(Linux shell) VARIABLE_NAME=VALUE npm start

(Windows command prompt) set VARIABLE_NAME=VALUE & npm start

(Windows PowerShell）$env:VARIABLE_NAME="VALUE"; npm start

## Variables

### NODE_EXTRA_MODULE_PATH;

PATH to extra modules

Default value is modules_ext

### NODE_CARDDIR

PATH to the place where cards are saved.

Default value is ./cards