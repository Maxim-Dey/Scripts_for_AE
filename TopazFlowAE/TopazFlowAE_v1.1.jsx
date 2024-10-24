////////////////////////////////////
//////////GLOBAL VARIABLE///////////
////////////////////////////////////
var model_sel_interp = 0; 
var factor_slow = 0; 
var sens = 10;
var rem_dup_fr = false;
var model_sel_enhan = 0;
var factor_upsc = 0;
var rec_origin_d = 20;
var add_nois = 1;
var bg = true;
var create_mas = true;
var use_simple_chok = true;
var prec = true;
var twix = true;
var settingsFile = new File(Folder.temp.fsName + "/TopazFlowAE_Settings.json"); // Save in system folder
//var settingsFile = new File(Folder($.fileName).parent.fsName + "/TopazFlowAE_Resource/TopazFlowAE_Settings.json");
var model_selection_for_interpolatifor_array = ["Apollo","Aion","ApolloFast","ChronosFast","Chronos"];
var factor_slowmo_array = ["None","x2","x3","x4","x6","x8","x10","x12","x14","x16"]; 
var model_selection_for_enhance_array = ["Proteus","Iris","Artemis"];
// var model_selection_for_enhance_array = ["Proteus","Iris","Nyx","Artemis","Themis","DioneRobust","DioneRobustDehalo"];
var factor_upscale_array = ["None","x2 Upscale","x4 Upscale"];

////////////////////////////////////
///////////GUI FUNCTION/////////////
////////////////////////////////////
function main_ui(thisObj) {   
    function childScript(thisObj) {
        // TOPAZ FLOW AFTER EFFECTS GROUP
        var TopazFlowAE = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Panel", undefined);
        scriptWindow = TopazFlowAE; 
        TopazFlowAE.orientation = "column"; 
        TopazFlowAE.alignChildren = ["center","top"]; 
        TopazFlowAE.spacing = 10; 
        TopazFlowAE.margins = 10; 
        
        // SETTINGS GROUP
        var reset = TopazFlowAE.add("button", undefined, undefined, {name: "reset"}); 
        reset.text = "RESET SETTINGS"; 
        reset.preferredSize.height = 40; 
        reset.alignment = ["fill","top"]; 

        var settings = TopazFlowAE.add("group", undefined, {name: "settings"}); 
        settings.orientation = "row"; 
        settings.alignChildren = ["left","fill"]; 
        
        // AI SETTINGS GROUP
        var ai_settings = settings.add("panel", undefined, undefined, {name: "ai_settings"}); 
        ai_settings.text = "AI Settings"; 
        ai_settings.orientation = "column"; 
        ai_settings.alignChildren = ["left","top"]; 
        ai_settings.spacing = 10; 
        ai_settings.margins = 20; 
       
        // INTERPOLATION GROUP
        var interpolation = ai_settings.add("panel", undefined, undefined, {name: "interpolation"}); 
        interpolation.text = "Interpolation (Slowmo)"; 
        interpolation.orientation = "column"; 
        interpolation.alignChildren = ["left","top"]; 
        interpolation.alignment = ["fill","top"]; 
        interpolation.spacing = 10; 
        interpolation.margins = 20; 

        var model_sel_interpolation = interpolation.add("dropdownlist", undefined, undefined, {name: "model_sel_interpolation", items: model_selection_for_interpolatifor_array}); 
        model_sel_interpolation.alignment = ["fill","top"]; 

        var factor_slowmo = interpolation.add("dropdownlist", undefined, undefined, {name: "factor_slowmo", items: factor_slowmo_array});
        factor_slowmo.alignment = ["fill","top"]; 

        var remove_duplicates_frame = interpolation.add("checkbox", undefined, undefined, {name: "create_mask"});
        remove_duplicates_frame.text = "Remove Duplicates Frames";

        var value = interpolation.add("statictext", undefined, undefined, {name: "value"}); 
        value.alignment = ["fill", "top"]; value.text = "Sensitivity: 10"; 

        var sensitivity = interpolation.add("slider", undefined, undefined, undefined, undefined, {name: "sensitivity"}); 
        sensitivity.alignment = ["fill","top"]; 
        sensitivity.minvalue = 0; 
        sensitivity.maxvalue = 100;
       
        // ENHANCE GROUP
        var enhance = ai_settings.add("panel", undefined, undefined, {name: "enhance"}); 
        enhance.text = "Enhance (Upscale)"; 
        enhance.orientation = "column"; 
        enhance.alignChildren = ["left","top"]; 
        enhance.alignment = ["fill","top"]; 
        enhance.spacing = 10; 
        enhance.margins = 20;

        var model_sel_enhance = enhance.add("dropdownlist", undefined, undefined, {name: "model_sel_enhance", items: model_selection_for_enhance_array}); 
        model_sel_enhance.alignment = ["fill","top"];

        var factor_upscale = enhance.add("dropdownlist", undefined, undefined, {name: "factor_upscale", items: factor_upscale_array}); 
        factor_upscale.alignment = ["fill","top"];

        var value_1 = enhance.add("statictext", undefined, undefined, {name: "value_1"}); 
        value_1.alignment = ["fill", "top"]; 
        value_1.preferredSize = [150, 20]; 
        value_1.text = "Recover Original Details: 20";  

        var rec_origin_det = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "rec_origin_det"}); 
        rec_origin_det.alignment = ["fill","top"]; 
        rec_origin_det.minvalue = 0; 
        rec_origin_det.maxvalue = 100; 

        var value_2 = enhance.add("statictext", undefined, undefined, {name: "value_2"}); 
        value_2.alignment = ["fill", "top"]; 
        value_2.text = "Add Noise: " + add_nois; 

        var add_noise = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "add_noise"}); 
        add_noise.alignment = ["fill","top"]; 
        add_noise.minvalue = 0; 
        add_noise.maxvalue = 10; 
       
        // BACKGROUND GROUP
        var background = ai_settings.add("panel", undefined, undefined, {name: "background"}); 
        background.text = "Background for AI control"; 
        background.orientation = "row"; 
        background.alignChildren = ["left","top"]; 
        background.alignment = ["fill","top"];
        background.spacing = 10;
        background.margins = 20; 

        var white = background.add("radiobutton", undefined, undefined, {name: "white"}); 
        white.text = "White";

        var gray = background.add("radiobutton", undefined, undefined, {name: "gray"}); 
        gray.text = "Gray"; 

        var black = background.add("radiobutton", undefined, undefined, {name: "black"}); 
        black.text = "Black"; 
       
        // RENDER SETTINGS GROUP
        var render_settings = settings.add("panel", undefined, undefined, {name: "render_settings"}); 
        render_settings.text = "Render Settings"; 
        render_settings.orientation = "column"; 
        render_settings.alignChildren = ["left","top"]; 
        render_settings.spacing = 10; 
        render_settings.margins = 20; 

        var create_mask = render_settings.add("checkbox", undefined, undefined, {name: "create_mask"}); 
        create_mask.text = "Save Alpha Channel"; 

        var use_simple_choker = render_settings.add("checkbox", undefined, undefined, {name: "use_simple_choker"}); 
        use_simple_choker.text = "Use Simple Choker"; 
        
        // FINAL COLLECT GROUP
        var finalCollect = render_settings.add("panel", undefined, undefined, {name: "finalCollect"}); 
        finalCollect.text = "Final Collect"; 
        finalCollect.orientation = "column"; 
        finalCollect.alignChildren = ["left","top"]; 
        finalCollect.alignment = ["fill","top"]; 
        finalCollect.spacing = 10; 
        finalCollect.margins = 20; 

        var precomp = finalCollect.add("radiobutton", undefined, undefined, {name: "precomp"}); 
        precomp.text = "Pre-Composition"; 

        var appleProRes = finalCollect.add("radiobutton", undefined, undefined, {name: "Apple ProRes 4444"}); 
        appleProRes.text = "Apple ProRes 4444";

        var pngsequence = finalCollect.add("radiobutton", undefined, undefined, {name: "PNG Sequence"}); 
        pngsequence.text = "PNG Sequence"; 
       
        // EFFECT FOR TIME CONTROL GROUP
        var effectForTimeControl = render_settings.add("panel", undefined, undefined, {name: "effectForTimeControl"}); 
        effectForTimeControl.text = "Effect for time control"; 
        effectForTimeControl.orientation = "column"; 
        effectForTimeControl.alignChildren = ["left","top"]; 
        effectForTimeControl.alignment = ["fill","top"]; 
        effectForTimeControl.spacing = 10; 
        effectForTimeControl.margins = 20; 

        var twixtor = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "twixtor"}); 
        twixtor.text = "Tiwixtor"; 

        var timewarp = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "timewarp"}); 
        timewarp.text = "Timewarp"; 
        timewarp.margins = 125; 

        var warning1 = effectForTimeControl.add("statictext", undefined, undefined, {name: "warning1"}); 
        warning1.alignment = ["fill", "top"]; 
        warning1.text = "If Twixtor isn't installed,";

        var warning2 = effectForTimeControl.add("statictext", undefined, undefined, {name: "warning1"}); 
        warning2.alignment = ["fill", "top"]; 
        warning2.text = "TimeWrap is the default.";
        
        // INTERACTIVE FUNCTION
        reset.onClick = function() {resetSettings();}
        sensitivity.onChanging = function() {value.text = "Sensitivity: " + Math.round(sensitivity.value);}
        rec_origin_det.onChanging = function() {value_1.text = "Recover Original Details: " + Math.round(rec_origin_det.value);}
        add_noise.onChanging = function() {value_2.text = "Add Noise: " + Math.round(add_noise.value);}
        create_mask.onClick = function() {if (!create_mask.value) {use_simple_choker.enabled = false;} else {use_simple_choker.enabled = true;}}
        precomp.onClick = function() {twixtor.enabled = true; timewarp.enabled = true;}
        pngsequence.onClick = function() {twixtor.enabled = false; timewarp.enabled = false;}
        appleProRes.onClick = function() {twixtor.enabled = false; timewarp.enabled = false;}
        factor_slowmo.onChange = function() {
            if (factor_slowmo.selection && factor_slowmo.selection.text === "None") {
                remove_duplicates_frame.enabled = false;
                sensitivity.enabled = false;
            } else {
                remove_duplicates_frame.enabled = true;
                sensitivity.enabled = true;
            }
        }
        factor_upscale.onChange = function() {
            if (factor_upscale.selection && factor_upscale.selection.text !== "None") {
                add_noise.enabled = true;
                rec_origin_det.enabled = true;
            } else {
                add_noise.enabled = false;
                rec_origin_det.enabled = false;
            }
        }

        // CONTROL SETTINGS FUNCTION
        function saveSettings() {
            // SAVE SETTINGS
            try {
                params = {
                    model_sel_interpolation: model_sel_interpolation.selection.index,
                    factor_slowmo: factor_slowmo.selection.index,
                    sensitivity: Math.round(sensitivity.value),
                    remove_dublic: remove_duplicates_frame.value,
                    model_sel_enhance: model_sel_enhance.selection.index,
                    factor_upscale: factor_upscale.selection.index,
                    rec_origin_det: Math.round(rec_origin_det.value),
                    add_noise: Math.round(add_noise.value),
                    bg: black.value ? "black" : (gray.value ? "gray" : "white"),
                    create_mask: create_mask.value,
                    use_simple_choker: use_simple_choker.value,
                    finalCollect: precomp.value ? "precomp" : (appleProRes.value ? "prores" : "pngseq"),
                    effectForTimeControl: twixtor.value ? "twixtor" : "timewarp"
                };
                settingsFile.open("w");
                settingsFile.write(JSON.stringify(params));
                settingsFile.close();
            } catch (e) {/*alert(e);*/}
            return params;
        }
            
        // LOAD SETTINGS FUNCTION
        function loadSettings() {
            var params = null;
            if (settingsFile.exists) {
                try {
                    settingsFile.open("r");
                    params = JSON.parse(settingsFile.read());
                    settingsFile.close();
                } catch (e) {/*alert(e);*/}
            }
            return params;
        }

        // RESET SETTINGS
        function resetSettings() {
            if (settingsFile.exists) {settingsFile.remove();}
            model_sel_interpolation.selection = model_sel_interp; 
            factor_slowmo.selection = factor_slow; 
            sensitivity.value = sens;
            value.text = "Sensitivity: " + sens;
            remove_duplicates_frame.value = rem_dup_fr;
            model_sel_enhance.selection = model_sel_enhan;
            factor_upscale.selection = factor_upsc;
            rec_origin_det.value = rec_origin_d;
            value_1.text = "Recover Original Details: " + rec_origin_d;
            add_noise.value = add_nois;
            value_2.text = "Add Noise: " + add_nois;
            black.value = bg;
            create_mask.value = create_mas;
            use_simple_choker.value =  use_simple_chok;
            precomp.value = prec;
            twixtor.value = twix;
            if (precomp.value) {twixtor.enabled = true; timewarp.enabled = true;}
        } 
            
        // LOAD SETTINGS
        var loadedSettings = loadSettings();
        if (loadedSettings) {
            model_sel_interpolation.selection = loadedSettings.model_sel_interpolation || model_sel_interp;
            factor_slowmo.selection = loadedSettings.factor_slowmo || factor_slow;
            sensitivity.value = loadedSettings.sensitivity || sens;
            value.text = "Sensitivity: " + sensitivity.value;
            remove_duplicates_frame.value = loadedSettings.remove_dublic || rem_dup_fr;
            model_sel_enhance.selection = loadedSettings.model_sel_enhance || model_sel_enhan;
            factor_upscale.selection = loadedSettings.factor_upscale || factor_upsc;
            rec_origin_det.value = loadedSettings.rec_origin_det || rec_origin_d;
            value_1.text = "Recover Original Details: " + rec_origin_det.value;
            add_noise.value = loadedSettings.add_noise || add_nois;
            value_2.text = "Add Noise: " + add_noise.value;
            black.value = loadedSettings.bg === "black";
            gray.value = loadedSettings.bg === "gray";
            white.value = loadedSettings.bg === "white";
            create_mask.value = loadedSettings.create_mask;
            use_simple_choker.value = loadedSettings.use_simple_choker;
            if (!create_mask.value) {use_simple_choker.enabled = false;}
            precomp.value = loadedSettings.finalCollect === "precomp";
            appleProRes.value = loadedSettings.finalCollect === "prores";
            pngsequence.value = loadedSettings.finalCollect === "pngseq";
            twixtor.value = loadedSettings.effectForTimeControl === "twixtor";
            timewarp.value = loadedSettings.effectForTimeControl === "timewarp";
            if (appleProRes.value) {twixtor.enabled = false; timewarp.enabled = false;}
            if (pngsequence.value) {twixtor.enabled = false; timewarp.enabled = false;}
        } else {resetSettings();}
            
        // RENDER BUTTON ON CLICK
        var render = TopazFlowAE.add("button", undefined, undefined, {name: "render"}); 
        render.text = "RENDER"; render.preferredSize.height = 40; render.alignment = ["fill","top"]; 
        render.onClick = function() {
                var p = saveSettings(); 
                try {start_render(p);} catch (e) {alert(e);}
            }
        
        // SHOW SCRIPT
        TopazFlowAE.layout.layout(true);
        return TopazFlowAE;   
    }

    var myChildScript = childScript(thisObj);
    if (myChildScript != null && myChildScript instanceof Window) {myChildScript.center(); myChildScript.show();}
}

////////////////////////////////////
//////////////BACKEND///////////////
////////////////////////////////////
function start_render(p) {
    // Save project
    app.project.save();

    // Checks the selecred Items
    if (!app.project.selection[0]) {alert("Please select one Item."); return;} 

    // Duplicates the selected Items into a separate array and removes the selection
    var selectedItemsPaths = [];
    for (y = 0; app.project.selection.length > y; y++) {selectedItemsPaths.push(app.project.selection[y]);}
    for (x = 0; app.project.selection.length > x; x++) {app.project.selection[x].selected = false;}

    // Checks the correctness of further work of Topaz Video AI
    if (p.factor_slowmo == 0 && p.factor_upscale == 0) {
        if (p.model_sel_enhance != 4) {
            alert("Select a multiplier for Interpolation or Upscale"); return;
        }
    }
    for (e = 0; app.effects.length > e; e++) {
        if (app.effects[e].displayName === "Frame Interpolation ") {
            var check_int = true; break;
        } else {
            var check_int = false;
        }
    }
    for (e = 0; app.effects.length > e; e++) {
        if (app.effects[e].displayName === "Enhance ") {
            var check_ups = true; break;
        } else {
            var check_ups = false;
        }
    }
    if (!check_int && !check_ups) {
        alert("No effects installed Topaz Video AI"); return;
    } else if (check_int && !check_ups) {
        if (!confirm("Only effect for Interpolation is set. Continue?")) {return;}
    } else if (!check_int && check_ups) {
        if (!confirm("Only effect for Upscale is set. Continue?")) {return;}
    }

    // Calls the function to check\create templates for rendering
    try {
        addRenderSettings("MOV");
        addRenderSettings("PNG");
    } catch (error) {
        var exportTemplate = ((new File($.fileName)).path) + "/TopazFlowAE_Resource/" + "TopazFlowAE_Templates.aep";
        alert("Template at:\n" + exportTemplate + "\nnot found");
        return;
    }

    // Checks whether the project is saved or not
    if (!app.project.file) {
        alert("Please save the project before using this script."); return;
    } else {
        var assetsFolder = new Folder(app.project.file.path + "/Assets"); 
        if (!assetsFolder.exists) {assetsFolder.create();}
    }

    // Expand the incomig attribute into variables
    // For Interpolation
    var model_sel_interpolation = p.model_sel_interpolation + 1;
    var sel_slowmo = p.factor_slowmo == 0 ? p.factor_slowmo + 1 : p.factor_slowmo + 2;
    var factor_slowmo;
    switch (p.factor_slowmo) {
        case 0: factor_slowmo = 1; break;
        case 1: factor_slowmo = 2; break;
        case 2: factor_slowmo = 3; break;
        case 3: factor_slowmo = 4; break;
        case 4: factor_slowmo = 6; break;
        case 5: factor_slowmo = 8; break;
        case 6: factor_slowmo = 10; break;
        case 7: factor_slowmo = 12; break;
        case 8: factor_slowmo = 14; break;
        case 9: factor_slowmo = 16; break;
    }
    var sensitivity = p.sensitivity;
    var remove_dublic = p.remove_dublic;
    // For Upscale 
    var model_sel_enhance;
    switch (p.model_sel_enhance) {
        case 0: model_sel_enhance = 2; break;
        case 1: model_sel_enhance = 3; break;
        case 2: model_sel_enhance = 5; break;
    }
    var sel_upscale = p.factor_upscale + 1;
    var factor_upscale;
    switch (p.factor_upscale) {
        case 0: factor_upscale = 1; break;
        case 1: factor_upscale = 2; break;
        case 2: factor_upscale = 4; break;
    }
    var rec_origin_det = p.rec_origin_det;
    var add_noise = p.add_noise;
    // For Rendering
    var bg = p.bg;
    var create_mask = p.create_mask;
    var use_simple_choker = p.use_simple_choker;
    var finalCollect = p.finalCollect;
    var effectForTimeControl = p.effectForTimeControl;

    // Items processing by Topaz Video AI
    for (i = 0; selectedItemsPaths.length > i; i++) {
        // Reset parameters
        var topazDone = true;
        if(beauty_topaz_upscl) {beauty_topaz_upscl = false;}
        if(mask_topaz_upscl) {mask_topaz_upscl = false;}
        if(beauty_topaz_interp) {beauty_topaz_interp = false;}
        if(mask_topaz_interp) {mask_topaz_interp = false;}

        // Filtering the Items
        var oneItem = selectedItemsPaths[i];
        if (!oneItem instanceof FootageItem || !oneItem.file || oneItem.frameRate == 0) {continue;}

        // Create Folder for Item
        var itemFolder = app.project.items.addFolder(oneItem.name);
        itemFolder.parentFolder = oneItem.parentFolder;
        oneItem.parentFolder = itemFolder;

        // Create Beauty Pass
        var comp_b = app.project.items.addComp("B_" + oneItem.name, oneItem.width, oneItem.height, oneItem.pixelAspect, oneItem.duration, oneItem.frameRate);
        comp_b.parentFolder = itemFolder;
        var layer_b = comp_b.layers.add(oneItem);
        layer_b.timeRemapEnabled = true;
        layer_b.outPoint = comp_b.duration;
        add_shape(comp_b, bg, false, "BG");
        var beauty = renderComp(comp_b, assetsFolder, "png");

        // Create Mask Pass
        if (create_mask) {
            var comp_m = app.project.items.addComp("M_" + oneItem.name, oneItem.width, oneItem.height, oneItem.pixelAspect, oneItem.duration, oneItem.frameRate);
            comp_m.parentFolder = itemFolder;
            var layer_m = comp_m.layers.add(oneItem);
            layer_m.property("Effects").addProperty("ADBE Fill").property("Color").setValue([1, 1, 1]);
            layer_m.timeRemapEnabled = true;
            layer_m.outPoint = comp_m.duration;
            add_shape(comp_m, "black", false, "BG");
            var mask = renderComp(comp_m, assetsFolder, "mov");
        }
        
        // Create Beauty from Topaz Interpolation and Upscale Renders 
        if (factor_slowmo > 1 && check_int && topazDone) {
            var comp_b_interpolation = createForTopazInterpolation(beauty, itemFolder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic);
            do {
                // Rendering failed
                if (beauty_topaz_interp) {
                    topazDone = topazF(beauty_topaz_interp.name, "Interpolation"); 
                    cleaner(beauty_topaz_interp);
                    if (!topazDone) {break;}
                }
                // Rendering by Topaz Video AI
                if (finalCollect === "precomp") {
                    if (factor_upscale == 1) {
                        var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "mov");
                    } else {
                        var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "png");
                    }
                } else if (finalCollect === "prores") {
                    if (factor_upscale == 1 && !create_mask) {
                        var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "mov");
                    } else if (factor_upscale == 1 && create_mask) {
                        var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "png");
                    } else if (factor_upscale > 1) {
                        var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "png");
                    }    
                } else if (finalCollect === "pngseq")  {
                    var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "png");
                }
            } while (beauty_topaz_interp.duration != beauty.duration*factor_slowmo);

            if (factor_upscale > 1 && check_ups && topazDone) {
                var comp_b_upscale = createForTopazUpscale(beauty_topaz_interp, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                do {
                    // Rendering failed
                    if (beauty_topaz_upscl) {
                        topazDone = topazF(beauty_topaz_upscl.name, "Upscale");
                        cleaner(beauty_topaz_upscl);
                        if (!topazDone) {break;}
                    }
                    // Rendering by Topaz Video AI
                    if (finalCollect === "precomp") {
                        var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");
                    } else if (finalCollect === "prores") { 
                        if (!create_mask) {
                            var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");
                        } else {
                            var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");
                        }
                    } else if (finalCollect === "pngseq") {
                        var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");
                    }
                } while (beauty_topaz_upscl.duration != beauty_topaz_interp.duration);
            } 
        } else if (factor_upscale > 1 && check_ups && topazDone) {
            var comp_b_upscale = createForTopazUpscale(beauty, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
            do {
                // Rendering failed
                if (beauty_topaz_upscl) {
                    topazDone = topazF(beauty_topaz_upscl.name, "Upscale");
                    cleaner(beauty_topaz_upscl);
                    if (!topazDone) {break;}
                }
                // Rendering by Topaz Video AI
                if (finalCollect === "precomp") {
                    var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");
                } else if (finalCollect === "prores") { 
                    if (!create_mask) {
                        var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");
                    } else {
                        var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");
                    }
                } else if (finalCollect === "pngseq") {
                    var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");
                }
            } while (beauty_topaz_upscl.duration != beauty.duration);
        } 

        // Create Mask from Topaz Interpolation and Upscale Renders
        if (create_mask && topazDone) {
            if (factor_slowmo > 1 && check_int && topazDone) {
                var comp_m_interpolation = createForTopazInterpolation(mask, itemFolder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic);
                do {
                    // Rendering failed
                    if (mask_topaz_interp) {
                        topazDone = topazF(mask_topaz_interp.name, "Interpolation");
                        cleaner(mask_topaz_interp);
                        if (!topazDone) {break;}
                    }
                    // Rendering by Topaz Video AI
                    var mask_topaz_interp = renderComp(comp_m_interpolation, assetsFolder, "mov");
                } while (mask_topaz_interp.duration != mask.duration*factor_slowmo);

                if (factor_upscale > 1 && check_ups && topazDone) {
                    var comp_m_upscale = createForTopazUpscale(mask_topaz_interp, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                    do {
                        // Rendering failed
                        if (mask_topaz_upscl) {
                            topazDone = topazF(mask_topaz_upscl.name, "Upscale");
                            cleaner(mask_topaz_upscl);
                            if (!topazDone) {break;}
                        }
                        // Rendering by Topaz Video AI
                        var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "mov");                       
                    } while (mask_topaz_upscl.duration != mask_topaz_interp.duration);
                }
            } else if (factor_upscale > 1 && check_ups && topazDone) {
                var comp_m_upscale = createForTopazUpscale(mask, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                do {
                    // Rendering failed
                    if (mask_topaz_upscl) {
                        topazDone = topazF(mask_topaz_upscl.name, "Upscale");
                        cleaner(mask_topaz_upscl);
                        if (!topazDone) {break;}
                    }
                    // Rendering by Topaz Video AI
                    var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "mov");                       
                } while (mask_topaz_upscl.duration != mask.duration);
            }
        }
        
        // Removal intermediate Items
        if(comp_b) {cleaner(comp_b);}
        if(comp_m) {cleaner(comp_m);}
        if(beauty) {cleaner(beauty);}
        if(mask) {cleaner(mask);}
        if(comp_b_interpolation) {cleaner(comp_b_interpolation);}
        if(comp_b_upscale) {cleaner(comp_b_upscale);}
        if(comp_m_interpolation) {cleaner(comp_m_interpolation);}
        if(comp_m_upscale) {cleaner(comp_m_upscale);}
        if(beauty_topaz_upscl) {if(beauty_topaz_interp) {cleaner(beauty_topaz_interp);}}
        if(mask_topaz_upscl) {if(mask_topaz_interp) {cleaner(mask_topaz_interp);}}
        if (!topazDone) {
            if(beauty_topaz_interp) {cleaner(beauty_topaz_interp);}
            if(mask_topaz_interp) {cleaner(mask_topaz_interp);}
            oneItem.parentFolder = itemFolder.parentFolder; itemFolder.remove(); 
            continue;
        }
        
        // Creates the prefix name
        if (beauty_topaz_upscl) {
            if (model_sel_enhance <= 3) {var indexEnhance = 2} else {var indexEnhance = 3}
            if (factor_slowmo > 1) {
                var prefixName = model_selection_for_enhance_array[model_sel_enhance - indexEnhance] + "X" + factor_upscale + "_" + model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
            } else {
                var prefixName = model_selection_for_enhance_array[model_sel_enhance - indexEnhance] + "X" + factor_upscale + "_";
            }
            beauty_topaz_upscl.name = "TopazAI_B_" + prefixName + oneItem.name;
            if (mask_topaz_upscl) {mask_topaz_upscl.name = "TopazAI_M_" + prefixName + oneItem.name;}
        } else if (beauty_topaz_interp) {
            var prefixName = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
            beauty_topaz_interp.name = "TopazAI_B_" + prefixName + oneItem.name;
            if (mask_topaz_interp) {mask_topaz_interp.name = "TopazAI_M_" + prefixName + oneItem.name;}
        }
        
        // Final collect if need prores.mov or sequence.png WITHOUT alfa channel
        if ((finalCollect === "prores" || finalCollect === "pngseq") && !create_mask) {continue;}

        // Final collect if need pre-composition
        if (beauty_topaz_upscl) {
            var compFinal = finalCollectRender(beauty_topaz_upscl, mask_topaz_upscl, oneItem, use_simple_choker, effectForTimeControl, finalCollect, factor_slowmo);
        } else if (beauty_topaz_interp) {
            var compFinal = finalCollectRender(beauty_topaz_interp, mask_topaz_interp, oneItem, use_simple_choker, effectForTimeControl, finalCollect, factor_slowmo);
        } 

        // Final collect if need prores.mov or sequence.png WITH alfa channel
        if (finalCollect !== "precomp" && create_mask) { 
            if (finalCollect === "prores") {var movFinal = renderComp(compFinal.comp, assetsFolder, "mov");}
            if (finalCollect === "pngseq") {var pngFinal = renderComp(compFinal.comp, assetsFolder, "png");}
             // Removal intermediate Items
            cleaner(compFinal.comp);
            if(compFinal.beauty) {cleaner(compFinal.beauty);}
            if(compFinal.mask) {cleaner(compFinal.mask);}
            if(compFinal.folder) {cleaner(compFinal.folder);}
        }
    }
}

///////////////////////////////////
////////SUPPORT FUNCTIONS//////////
///////////////////////////////////

// Final collect function
function finalCollectRender(beauty, mask, oneItem, choker, warp, finalCollect, factor_slowmo) {
    if (finalCollect === "precomp") {
        var newFolder = app.project.items.addFolder("Hidden Assets");
        newFolder.parentFolder = oneItem.parentFolder;
    }
    var comp = app.project.items.addComp(beauty.name, beauty.width, beauty.height, beauty.pixelAspect, beauty.duration, beauty.frameRate);
    comp.parentFolder = oneItem.parentFolder;
    var layer_b = comp.layers.add(beauty);
    layer_b.timeRemapEnabled = true;
    layer_b.outPoint = comp.duration + 10;
    if (newFolder) {beauty.parentFolder = newFolder;}
    if (mask) {
        var layer_m = comp.layers.add(mask);
        layer_m.timeRemapEnabled = true;
        layer_m.outPoint = comp.duration + 10;
        var lum = layer_m.property("Effects").addProperty("Lumetri Color");
        lum.property("Whites").setValue(150);
        lum.property("Blacks").setValue(-150); 
        layer_b.setTrackMatte(layer_m, TrackMatteType.LUMA);
        if (newFolder) {mask.parentFolder = newFolder;}
    }
    if (factor_slowmo != 1 || (choker && mask)) {var layer_a = add_shape(comp, "gray", true, "EFFECTS");}
    if (factor_slowmo != 1 && layer_a) {
        if (warp === "twixtor" && finalCollect === "precomp") {
            try {
                var twix = layer_a.property("Effects").addProperty("Twixtor"); 
                twix.property("Motion Sensitivity").setValue(100); 
                // twix.property("Use GPU").setValue(3); // This doesn't work. ¯\_(ツ)_/¯     
            } catch (error) {
                //if Twixtor is not install
                //alert("Twixtor is not install. Will be used Timewarp");
                layer_a.property("Effects").addProperty("Timewarp").property("Speed").setValue(100);
            }
        } else if (warp === "timewarp" && finalCollect === "precomp") {
            layer_a.property("Effects").addProperty("Timewarp").property("Speed").setValue(100);
        }
    }
    if (choker && mask && layer_a) {layer_a.property("Effects").addProperty("ADBE Simple Choker").property("Choke Matte").setValue(2);}

    return {comp: comp, newFolder: newFolder, beauty: beauty, mask: mask};
}

// Auxiliary shape creation function
function add_shape(comp, color, adjustment, n) {
    var shape = comp.layers.addShape();
    shape.property("Transform").property("Position").expression = "[thisComp.width, thisComp.height]/2;";
    shape.property("Contents").addProperty("ADBE Vector Shape - Rect").property("Size").expression = "[thisComp.width*thisComp.pixelAspect, thisComp.height];";
    if (color === "white") {
        shape.property("Contents").addProperty("ADBE Vector Graphic - Fill").property("Color").setValue([1, 1, 1]);
    } else if (color === "gray") {
        shape.property("Contents").addProperty("ADBE Vector Graphic - Fill").property("Color").setValue([0.5, 0.5, 0.5]);
    } else if (color === "black") {
        shape.property("Contents").addProperty("ADBE Vector Graphic - Fill").property("Color").setValue([0, 0, 0]);
    }
    if (!adjustment) {shape.moveToEnd();} else {shape.adjustmentLayer = true;}
    shape.outPoint = comp.duration + 10;
    shape.name = n;
    return shape;
}

// Render composition
function renderComp(comp, assetsFolder, type) { 
    var uniqueFolder = generateUniqueName(assetsFolder, 10);
    var renderQueueItem = app.project.renderQueue.items.add(comp);
    if (type === "mov") {
        renderQueueItem.applyTemplate("Topaz MOV");
        renderQueueItem.outputModule(1).applyTemplate("Topaz MOV");
        renderQueueItem.outputModule(1).file = new File(uniqueFolder.fsName + "/" + comp.name);
    }
    if (type === "png") {
        renderQueueItem.applyTemplate("Topaz PNG");
        renderQueueItem.outputModule(1).applyTemplate("Topaz PNG");
        renderQueueItem.outputModule(1).file = new File(uniqueFolder.fsName + "/" + comp.name + "_[#####]");
    }
    
    app.purge(PurgeTarget.ALL_MEMORY_CACHES);
    comp.openInViewer();
    app.activeViewer.views[0].options.zoom = 0.25;
    //$.sleep(500);
    app.project.renderQueue.render();
    //$.sleep(500);
    app.purge(PurgeTarget.ALL_MEMORY_CACHES);

    var files = uniqueFolder.getFiles();
    var importOptions = new ImportOptions(files[0]);
    if (type === "png") {importOptions.sequence = true;}
    var importedItem = app.project.importFile(importOptions);
    importedItem.parentFolder = comp.parentFolder;
    if (type === "png") {importedItem.mainSource.conformFrameRate = comp.frameRate;}
    return importedItem;
}

// Ensures the folder name is unique
function generateUniqueName(assetsFolder, length) {
    do {var uniqueName = new Folder(assetsFolder.fsName + "/" + generateRandomString(length));} while (uniqueName.exists);
    uniqueName.create();
    return uniqueName;
}

// Generates a random name for folder
function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {result += characters.charAt(Math.floor(Math.random() * charactersLength));}
    return result;
}

// Creates the composition for Topaz Interpolation 
function createForTopazInterpolation(incoming, folder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic) {
    var comp_render = app.project.items.addComp(incoming.name, incoming.width, incoming.height, incoming.pixelAspect, incoming.duration*factor_slowmo, incoming.frameRate);
    comp_render.name = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_" + comp_render.name;
    comp_render.parentFolder = folder;
    var layer = comp_render.layers.add(incoming);
    layer.timeRemapEnabled = true;
    layer.outPoint = comp_render.duration;
    // Add interpolation
    var interpol = layer.property("Effects").addProperty("Frame Interpolation ");
    interpol.property("Slowmo").setValue(sel_slowmo);
    interpol.property("Model").setValue(model_sel_interpolation);;
    interpol.property("Sensitivity").setValue(sensitivity);
    if (remove_dublic) {interpol.property("Remove Duplicates Frames").setValue(1);}
    return comp_render;
}

// Creates the composition for Topaz Upscale 
function createForTopazUpscale(incoming, folder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise) {
    var comp_render = app.project.items.addComp(incoming.name, incoming.width*factor_upscale, incoming.height*factor_upscale, incoming.pixelAspect, incoming.duration, incoming.frameRate);
    if (model_sel_enhance <= 3) {var index = 2} else {var index = 3}
    comp_render.name = model_selection_for_enhance_array[model_sel_enhance - index] + "X" + factor_upscale + "_" + comp_render.name;
    comp_render.parentFolder = folder;
    var layer = comp_render.layers.add(incoming);
    layer.timeRemapEnabled = true;
    layer.outPoint = comp_render.duration;
    // Add Upscale
    var upscal = layer.property("Effects").addProperty("Enhance ");
    upscal.property("AI Model").setValue(model_sel_enhance);
    upscal.property("Output Resolution").setValue(sel_upscale);
    upscal.property("Add Noise").setValue(add_noise);
    upscal.property("Recover Original Details").setValue(rec_origin_det);
    return comp_render;
}

// Функция проверки/создания шаблонов рендеринга
function addRenderSettings(typeTemplate) {
    for (var i = app.project.renderQueue.numItems; i > 0; i--) {app.project.renderQueue.item(i).remove();}
    var templateBasename = "Topaz " + typeTemplate;
    var renderTemplate = false;
    var outputTemplate = false;
    var queue = app.project.renderQueue;
    var tempComp = app.project.items.addComp('check_templates', 100.0, 100.0, 10.0, 10.0, 10.0);
    var rqi_tempComp = queue.items.add(tempComp);
    for (var i = 0; i < rqi_tempComp.templates.length; i++) {
        if (rqi_tempComp.templates[i] === templateBasename) {
            renderTemplate = rqi_tempComp.templates[i];
            break;
        }
    }
    for (var i = 0; i < rqi_tempComp.outputModules[1].templates.length; i++) {
        if (rqi_tempComp.outputModules[1].templates[i] === templateBasename) {
            outputTemplate = rqi_tempComp.outputModules[1].templates[i];
            break;
        }
    }
    rqi_tempComp.remove();
    tempComp.remove();
    if (!renderTemplate || !outputTemplate) {
        var exportTemplate = ((new File($.fileName)).path) + "/TopazFlowAE_Resource/" + "TopazFlowAE_Templates.aep";
        var sourceTemplate = app.project.importFile(new ImportOptions(File(exportTemplate)));
        for (var i = 0; i < queue.items.length; i++) {
            var item = queue.item(i + 1);
            if (item.comp.name === typeTemplate) {
                if (!renderTemplate) {
                    renderTemplate = templateBasename ;
                    item.saveAsTemplate(renderTemplate);
                }
                if (!outputTemplate) {
                    outputTemplate = templateBasename;
                    item.outputModules[1].saveAsTemplate(outputTemplate);
                }
                sourceTemplate.remove();
                break;
            }
        }
    }
}

//Topaz Failed
function topazF(incoming, what) {
    return confirm("Attempt to " + what + " " + incoming + " failed.\n\n\nWould you like to try again?");
}

// Cleaner
function cleaner(incoming) {
    if (incoming instanceof CompItem) {incoming.remove();} else if (incoming instanceof FootageItem) {
        var path = incoming.file;
        var folder = path.parent;
        var files = folder.getFiles();
        incoming.remove()
        try {for (var i = files.length - 1; i >= 0; i--) {files[i].remove();}} catch(e) {}
        if (folder.getFiles().length == 0) {try {folder.remove();} catch(e) {}}
    }
}

//////////////
main_ui(this);
//////////////