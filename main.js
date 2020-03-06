const electron = require('electron');
const url = require('url');
const path = require('path');

const {app,BrowserWindow,Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready.
app.on('ready',function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html into windows 
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));    
    // Quit app when closed
    mainWindow.on('closed',function(){
        app.quit();
    })


    // Build menu for template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


// Handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title:'Add Shopping List Item'
    });
    // Load html into windows 
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));    
    // Garbage collection handle
    addWindow.on('close',function(){
        addWindow = null;
    })
}
// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Quit',
                accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]


// If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                accelerator:process.platform == 'darwin' ? 'Command+' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            // {
            //     role:'reload'
            // }
        ]
    });
}