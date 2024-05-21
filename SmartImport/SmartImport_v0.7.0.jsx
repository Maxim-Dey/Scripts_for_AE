// Global variable
var allFileTypes = "All Supported Formats:*.aac;*.m4a;*.aif;*.aiff;*.mp3;*.mpeg;*.mpg;*.mpa;*.mpe;*.wav;*.ai;*.eps;*.ps;*.pdf;*.psd;*.bmp;*.rle;*.dib;*.tif;*.crw;*.nef;*.raf;*.orf;*.mrw;*.dcr;*.mos;*.raw;*.pef;*.srf;*.dng;*.x3f;*.cr2;*.erf;*.cin;*.dpx;*.gif;*.rla;*.rpf;*.img;*.ei;*.iff;*.tdi;*.jpg;*.jpe;*.heif;*.ma;*.exr;*.pcx;*.png;*.hdr;*.rgbe;*.xyze;*.sgi;*.bw;*.rgb;*.pic;*.tga;*.vda;*.icb;*.vst;*.crm;*.mxf;*.swf;*.flv;*.f4v;*.m2ts;*.mp4;*.m4v;*.mov;*.avi;*.wmv;*.wma;*.3gp;*.3g2;*.amc;*.json;*.mgjson;*.jsx;*.csv;*.tsv;*.txt";
var sequenceFileTypes = "Static Image Formats:*.ai;*.eps;*.ps;*.pdf;*.psd;*.bmp;*.rle;*.dib;*.tif;*.crw;*.nef;*.raf;*.orf;*.mrw;*.dcr;*.mos;*.raw;*.pef;*.srf;*.dng;*.x3f;*.cr2;*.erf;*.cin;*.dpx;*.gif;*.rla;*.rpf;*.img;*.ei;*.iff;*.tdi;*.jpg;*.jpe;*.heif;*.exr;*.pcx;*.png;*.hdr;*.rgbe;*.xyze;*.sgi;*.bw;*.rgb;*.pic;*.tga;*.vda;*.icb;*.vst";
var nameAssetsFolder = "/Assets";
var iconFolder = '/SmartImport_Resources';
var sequencePattern = /(.*?)(\d+)(.*?)(\.\w+)$/;
var messError = "If you are seeing this message, it means that the name of your file or file sequence cannot be processed by the script to be later imported into the project. Unfortunately, I have not found a way to circumvent some very strange issues related to Extended Script ¯\_(ツ)_/¯. Therefore, the script will terminate the selected operation. To ensure the import works correctly, you can change the names by simplifying their content. Do not use special characters or long names. Simplify the text in the file name as much as possible.";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// Creates an UI
function main(thisObj){
    function childScript(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Panel", undefined);
            myPanel.alignChildren = ["fill","fill"];
            myPanel.orientation = "row";
        
        var butt_1 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_1.png', {name: "IMPORT FILES IN THE PROJECT"}); 
            butt_1.helpTip = "IMPORT FILES IN THE PROJECT"; 
            butt_1.addEventListener("mouseover", function(){butt_1.image = (new File($.fileName)).path + iconFolder + '/butt_11.png';})
            butt_1.addEventListener("mouseout", function(){butt_1.image = (new File($.fileName)).path + iconFolder + '/butt_1.png';})
            butt_1.addEventListener("click", function(){importFilesInProject();});

        var butt_2 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_2.png', {name: "IMPORT A SEQUENCE IN THE PROJECT"}); 
            butt_2.helpTip = "IMPORT A SEQUENCE IN THE PROJECT"; 
            butt_2.addEventListener("mouseover", function(){butt_2.image = (new File($.fileName)).path + iconFolder + '/butt_22.png';})
            butt_2.addEventListener("mouseout", function(){butt_2.image = (new File($.fileName)).path + iconFolder + '/butt_2.png';})
            butt_2.addEventListener("click", function(){importSequenceInProject();});

        var butt_3 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_3.png', {name: "REPLACE THE ITEM IN THE PROJECT WITH A FILE"}); 
            butt_3.helpTip = "REPLACE THE ITEM IN THE PROJECT WITH A FILE"; 
            butt_3.addEventListener("mouseover", function(){butt_3.image = (new File($.fileName)).path + iconFolder + '/butt_33.png';})
            butt_3.addEventListener("mouseout", function(){butt_3.image = (new File($.fileName)).path + iconFolder + '/butt_3.png';})
            butt_3.addEventListener("click", function(){replicesItemWithFile();});

        var butt_4 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_4.png', {name: "REPLACE THE ITEM IN THE PROJECT WITH A SEQUENCE"}); 
            butt_4.helpTip = "REPLACE THE ITEM IN THE PROJECT WITH A SEQUENCE"; 
            butt_4.addEventListener("mouseover", function(){butt_4.image = (new File($.fileName)).path + iconFolder + '/butt_44.png';})
            butt_4.addEventListener("mouseout", function(){butt_4.image = (new File($.fileName)).path + iconFolder + '/butt_4.png';})
            butt_4.addEventListener("click", function(){replicesItemWithSequence();});

        var butt_5 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_5.png', {name: "REPLACE A SOURCE WITH A NEW FILE FOR THE SELECTED LAYER"}); 
            butt_5.helpTip = "REPLACE THE SOURCE WITH A NEW FILE FOR THE SELECTED LAYER"; 
            butt_5.addEventListener("mouseover", function(){butt_5.image = (new File($.fileName)).path + iconFolder + '/butt_55.png';})
            butt_5.addEventListener("mouseout", function(){butt_5.image = (new File($.fileName)).path + iconFolder + '/butt_5.png';})
            butt_5.addEventListener("click", function(){replicesSourceFile();});

        var butt_6 = myPanel.add("image", [0, 0, 50, 50], (new File($.fileName)).path + iconFolder + '/butt_6.png', {name: "REPLACE A SOURCE WITH A NEW SEQUENCE FOR THE SELECTED LAYER"}); 
            butt_6.helpTip = "REPLACE THE SOURCE WITH A NEW SEQUENCE FOR THE SELECTED LAYER"; 
            butt_6.addEventListener("mouseover", function(){butt_6.image = (new File($.fileName)).path + iconFolder + '/butt_66.png';})
            butt_6.addEventListener("mouseout", function(){butt_6.image = (new File($.fileName)).path + iconFolder + '/butt_6.png';})
            butt_6.addEventListener("click", function(){repliceSourceSequence();});

        myPanel.layout.layout(true);
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function () { 
            this.orientation = this.size.width > this.size.height ? "row" : "column"
            this.layout.resize(); 
        }
        return myPanel;
    }

    var myChildScript = childScript(thisObj);
    if(myChildScript != null && myChildScript instanceof Window) {
        myChildScript.center();
        myChildScript.show();
    }
}

// Dialog window FOR SELECTING ACTIONS WITH THE FILES
function dialogWindow(variant) {

    var choice = "No choice"; 

    // Window
    var dialog = new Window("dialog", undefined, undefined, {closeButton: false, borderless: true}); 
        dialog.graphics.backgroundColor = dialog.graphics.newBrush(dialog.graphics.BrushType.SOLID_COLOR, [0.549, 0.549, 0.549]);
        dialog.orientation = "column"; 
        dialog.alignChildren = ["center","top"]; 
        dialog.spacing = 10; 
        dialog.margins = 16;

    // Headline
    if (variant === "cut_past") {
        var headline = dialog.add("image", [0, 0, 410, 58], (new File($.fileName)).path + iconFolder + '/Headline_1.png', {name: "Headline"}); 
    } else if (variant === "delete") {
        var headline = dialog.add("image", [0, 0, 410, 58], (new File($.fileName)).path + iconFolder + '/Headline_2.png', {name: "Headline"}); 
    }

    // Group for button
    var group1 = dialog.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["center","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

    // Buttons
    if (variant === "cut_past") {
        
        var leftButt_1 = group1.add("image", [0, 0, 200, 100], (new File($.fileName)).path + iconFolder + '/cut_1.png', {name: "Left Button"}); 
            leftButt_1.addEventListener("mouseover", function(){leftButt_1.image = (new File($.fileName)).path + iconFolder + '/cut_2.png';})
            leftButt_1.addEventListener("mouseout", function(){leftButt_1.image = (new File($.fileName)).path + iconFolder + '/cut_1.png';})
            leftButt_1.addEventListener("click", function() {choice = "CUT"; dialog.close();});

        var rigthButt_2 = group1.add("image", [0, 0, 200, 100], (new File($.fileName)).path + iconFolder + '/copy_1.png', {name: "Right Button"}); 
            rigthButt_2.addEventListener("mouseover", function(){rigthButt_2.image = (new File($.fileName)).path + iconFolder + '/copy_2.png';})
            rigthButt_2.addEventListener("mouseout", function(){rigthButt_2.image = (new File($.fileName)).path + iconFolder + '/copy_1.png';})
            rigthButt_2.addEventListener("click", function() {dialog.close();});

    } else if (variant === "delete") {

        var leftButt_1 = group1.add("image", [0, 0, 200, 100], (new File($.fileName)).path + iconFolder + '/delete_1.png', {name: "Left Button"}); 
            leftButt_1.addEventListener("mouseover", function(){leftButt_1.image = (new File($.fileName)).path + iconFolder + '/delete_2.png';})
            leftButt_1.addEventListener("mouseout", function(){leftButt_1.image = (new File($.fileName)).path + iconFolder + '/delete_1.png';})
            leftButt_1.addEventListener("click", function() {choice = "DELETE"; dialog.close();});

        var rigthButt_2 = group1.add("image", [0, 0, 200, 100], (new File($.fileName)).path + iconFolder + '/not_delete_1.png', {name: "Right Button"}); 
            rigthButt_2.addEventListener("mouseover", function(){rigthButt_2.image = (new File($.fileName)).path + iconFolder + '/not_delete_2.png';})
            rigthButt_2.addEventListener("mouseout", function(){rigthButt_2.image = (new File($.fileName)).path + iconFolder + '/not_delete_1.png';})
            rigthButt_2.addEventListener("click", function() {dialog.close();});

    }

    dialog.show();

    return choice;

}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//IMPORT FILES IN THE PROJECT - DONE
function importFilesInProject() {
    try {
        if (!checkSaveProject()) return;
        if (!(files = File.openDialog("IMPORT FILES IN THE PROJECT", allFileTypes, true))) return;
        var choice1 = dialogWindow("cut_past");
        var assetsFolder = createAssetsFolder();
    
        app.beginUndoGroup("IMPORT FILES IN THE PROJECT");
            for (var i = files.length - 1; i >= 0; i--) {
                var file = files[i];
                var newFile = createNameFile(file, assetsFolder);
                if (!copyFile(file, newFile.fsName)) return;
                deselectItems();
                try {
                    var importOptions = new ImportOptions(newFile);
                    app.project.importFile(importOptions);
                    if (choice1 === "CUT") {file.remove();}
                } catch (error) {
                    alert(messError);
                    newFile.remove();
                }
            }
        app.endUndoGroup();
    } catch (error) {
        alert(error);
    }
}

// IMPORT A SEQUENCE IN THE PROJECT - DONE
function importSequenceInProject() {
    try {
        if (!checkSaveProject()) return;
        if (!(file = File.openDialog("IMPORT A SEQUENCE IN THE PROJECT", sequenceFileTypes, false))) return; 
        var choice1 = dialogWindow("cut_past");
        var assetsFolder = createAssetsFolder();
        var uniqueFolder = generateUniqueName(assetsFolder, 10, "folder");
        uniqueFolder.create();
        var newFiles = copySequence(file, uniqueFolder);
        if (!newFiles) return;
    
        app.beginUndoGroup("IMPORT A SEQUENCE IN THE PROJECT");
            deselectItems();
            try {
                var importOptions = new ImportOptions(newFiles[0]);
                importOptions.sequence = true;
                app.project.importFile(importOptions);
                if (choice1 === "CUT") {deletesSelectSequence(file);}
            } catch (error) {
                alert(messError);
                badFilesDelete(uniqueFolder);
            }
        app.endUndoGroup();
    } catch (error) {
        alert(error);
    }
}

// REPLACE THE ITEM IN THE PROJECT WITH A FILE
function replicesItemWithFile() {
    try {
        if (!checkSaveProject()) return;
        if (!checkQuantityConditionsItem()) return;
        if (!(file = File.openDialog("REPLACE THE ITEM IN THE PROJECT WITH A FILE", allFileTypes, false))) return;
        var choice1 = dialogWindow("cut_past");
        var choice2 = dialogWindow("delete");
        var assetsFolder = createAssetsFolder();
        var newFile = createNameFile(file, assetsFolder);
        if (!copyFile(file, newFile.fsName)) return;
    
        app.beginUndoGroup("REPLACE THE ITEM IN THE PROJECT WITH A FILE");
            var oldItem = app.project.selection[0];
            var oldFile = app.project.selection[0].file;
            var checkSeq = checkSequence(oldItem, oldFile);
            try {
                oldItem.replace(newFile);
                if (choice1 === "CUT") {file.remove();}
                deleteOldFiles(choice2, checkSeq, oldFile);
            } catch (error) {
                alert(messError);
                newFile.remove();
            }
        app.endUndoGroup();
    } catch (error) {
        alert(error);
    }
}

// REPLACE THE ITEM IN THE PROJECT WITH A SEQUENCE
function replicesItemWithSequence() {
    try {
        if (!checkSaveProject()) return;
        if (!checkQuantityConditionsItem()) return;
        if (!(file = File.openDialog("REPLACE THE ITEM IN THE PROJECT WITH A SEQUENCE", sequenceFileTypes, false))) return;
        var choice1 = dialogWindow("cut_past");
        var choice2 = dialogWindow("delete");
        var assetsFolder = createAssetsFolder();
        var uniqueFolder = generateUniqueName(assetsFolder, 10, "folder");
        uniqueFolder.create();
        var newFiles = copySequence(file, uniqueFolder);
        if (!newFiles) return;
    
        app.beginUndoGroup("REPLACE THE ITEM IN THE PROJECT WITH A SEQUENCE");
            var oldItem = app.project.selection[0];
            var oldFile = app.project.selection[0].file;
            try {
                oldItem.replaceWithSequence(newFiles[0], false);
                var checkSeq = checkSequence(oldItem, oldFile);
                if (choice1 === "CUT") {deletesSelectSequence(file);}
                deleteOldFiles(choice2, checkSeq, oldFile);
            } catch(error) {
                alert(messError);
                badFilesDelete(uniqueFolder);
            }
        app.endUndoGroup();
    } catch (error) {
        alert(error);
    }
}

// REPLACE A SOURCE WITH A NEW FILE FOR THE SELECTED LAYER
function replicesSourceFile() { 
    try {
        if (!checkSaveProject()) return;
        if (!mainChekLayer()) return;
        if (!(file = File.openDialog("REPLACE A SOURCE WITH A NEW FILE FOR THE SELECTED LAYER", allFileTypes, false))) return;
        var choice1 = dialogWindow("cut_past");
        var assetsFolder = createAssetsFolder();        
        var newFile = createNameFile(file, assetsFolder);
        if (!copyFile(file, newFile.fsName)) return;
    
        app.beginUndoGroup("REPLACE A SOURCE WITH A NEW FILE FOR THE SELECTED LAYER");
            deselectItems();
            try {
                var importOptions = new ImportOptions(newFile);
                var newFootage = app.project.importFile(importOptions);
                app.project.activeItem.selectedLayers[0].replaceSource(newFootage, true);
                if (choice1 === "CUT") {file.remove();}
            } catch(error) {
                alert(messError);
                newFile.remove();
            } 
        app.endUndoGroup();  
    } catch (error) {
        alert(error);
    }
}

// REPLACE A SOURCE WITH A NEW SEQUENCE FOR THE SELECTED LAYER
function repliceSourceSequence() {
    try {
        if (!checkSaveProject()) return;
        if (!mainChekLayer()) return;
        if (!(file = File.openDialog("REPLACE A SOURCE WITH A NEW SEQUENCE FOR THE SELECTED LAYER", sequenceFileTypes, false))) return; 
        var choice1 = dialogWindow("cut_past");
        var assetsFolder = createAssetsFolder();
        var uniqueFolder = generateUniqueName(assetsFolder, 10, "folder");
        uniqueFolder.create();
        var newFiles = copySequence(file, uniqueFolder);
        if (!newFiles) return;
    
        app.beginUndoGroup("REPLACE A SOURCE WITH A NEW SEQUENCE FOR THE SELECTED LAYER");
            try {
                var importOptions = new ImportOptions(newFiles[0]);
                importOptions.sequence = true;
                deselectItems();
                var newFootage = app.project.importFile(importOptions);
                app.project.activeItem.selectedLayers[0].replaceSource(newFootage, true);
                if (choice1 === "CUT") {deletesSelectSequence(file);}
            } catch (error) {
                alert(messError);
                badFilesDelete(uniqueFolder);
            }
        app.endUndoGroup();
    } catch (error) {
        alert(error);
    }
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// SUPPORT FUNCTIONS
// Checks if the project is saved
function checkSaveProject() {
    if (!app.project.file) {alert("Please save the project before using this script."); return false;} else {return true;}
}

// Checks if Timeline is active, how many layers are selected and if the layer is a FootageItem
function mainChekLayer() {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {alert("Please select a composition."); return false; }
    var selLayers = comp.selectedLayers;
    if (selLayers.length != 1 || !(selLayers[0] instanceof AVLayer)) {alert("Please select one footage layer."); return false;}
    var layer = selLayers[0];
    if (!layer.source || layer.source.mainSource instanceof SolidSource) {alert("The selected layer is not a footage layer."); return false;}
    return true;
}

// Checks quantities and conditions for an item
function checkQuantityConditionsItem() {
    var sel = app.project.selection;
    if (sel.length != 1) {alert("Please select one Item."); return false;}
    if (!(app.project.selection[0] instanceof FootageItem) && !app.project.selection[0].file) {alert("This Item cannot be replaced"); return false;}
    return true;
}

// Gets the path to the project and creates an «Assets» folder if it does not exist
function createAssetsFolder() {
    var assetsFolder = new Folder(app.project.file.path + nameAssetsFolder);
    if (!assetsFolder.exists) {assetsFolder.create();}
    return assetsFolder;
} 

// Creates a name for the copied file
function createNameFile(file, assetsFolder) {
    var newFileName = file.name;
    var newFile = new File(assetsFolder.fsName + "/" + newFileName);
    var increment = 0;
    while (newFile.exists) {
        increment++;
        newFileName = file.name.replace(/(\.[^\.]+)$/, "_copy" + increment + "$1");
        newFile = new File(assetsFolder.fsName + "/" + newFileName);
    }
    return newFile;
}

// Copies a file
function copyFile(file, name) {
    var copyResult = file.copy(name);
    if (!copyResult) {alert("Copying the file failed. Possible reasons:\n - Incorrect name\n - Operating system limitation\n - ¯\_(ツ)_/¯"); return false;}
    return true;
}

// Copying the sequence
function copySequence(file, uniqueFolder) {
    var copiedFiles = [];
    var fileDecode = File.decode(file.name);
    var match = fileDecode.match(sequencePattern);
    var sequenceFiles = file.parent.getFiles(match[1] + "*" + match[match.length-1]);
    for (var i = sequenceFiles.length - 1; i >= 0; i--) {
        var seq = sequenceFiles[i];
        var targetFile = new File(uniqueFolder.fsName + "/" + seq.name);
        var copyResult = seq.copy(targetFile.fsName);
        if (!copyResult) {alert("Copying the sequence failed. Possible reasons:\n - Incorrect name\n - Operating system limitation\n - ¯\_(ツ)_/¯"); return false;}
        copiedFiles.unshift(targetFile);
    }
    return copiedFiles;
}

// Deletes bad files after copy
function badFilesDelete(uniqueFolder) {
    var badFiles = uniqueFolder.getFiles();
    for (var i = badFiles.length - 1; i >= 0; i--) {badFiles[i].remove();}
    uniqueFolder.remove();
}

// Removing the source of an item
function deleteOldFiles(choice2, checkSeq, file) {
    if (choice2 === "DELETE") {
        app.purge(PurgeTarget.ALL_MEMORY_CACHES);
        if (!checkSeq) {
            file.remove();
        } else if (checkSeq) {
            var fileDecode = File.decode(file.name);
            var match = fileDecode.match(sequencePattern);
            var sequenceFiles = file.parent.getFiles(match[1] + "*" + match[match.length-1]);
            for (var i = sequenceFiles.length - 1; i >= 0; i--) {sequenceFiles[i].remove();}
            var checkFolder = file.parent.getFiles();
            if (checkFolder.length === 0) {file.parent.remove();}
        }
    }
}

// Deletes select sequence
function deletesSelectSequence(file) {
    var fileDecode = File.decode(file.name);
    var match = fileDecode.match(sequencePattern);
    var sequenceFiles = file.parent.getFiles(match[1] + "*" + match[match.length-1]);
    for (var i = sequenceFiles.length - 1; i >= 0; i--) {sequenceFiles[i].remove();}
}

// Generates a random name for folder
function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {result += characters.charAt(Math.floor(Math.random() * charactersLength));}
    return result;
}

// Ensures the folder name is unique
function generateUniqueName(assetsFolder, length) {
    do {var uniqueName = new Folder(assetsFolder.fsName + "/" + generateRandomString(length));} while (uniqueName.exists);
    return uniqueName;
}

// Checks that an element is a sequence
function checkSequence(item, file) {
    var supportedFormats = /\.(ai|eps|ps|pdf|psd|bmp|rle|dib|tif|crw|nef|raf|orf|mrw|dcr|mos|raw|pef|srf|dng|x3f|cr2|erf|cin|dpx|gif|rla|rpf|img|ei|iff|tdi|jpg|jpe|heif|exr|pcx|png|hdr|rgbe|xyze|sgi|bw|rgb|pic|tga|vda|icb|vst)$/i;
    var match = file.name.match(/(.*?)(\.\w+)$/);
    if (match[match.length-1].match(supportedFormats) && !item.mainSource.isStill) {return true;} else {return false;}
}

// Deselects all items in the project using reverse iteration
function deselectItems() {
    var sel = app.project.selection;
    for (var j = sel.length - 1; j >= 0; j--) {sel[j].selected = false;}
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
main(this);