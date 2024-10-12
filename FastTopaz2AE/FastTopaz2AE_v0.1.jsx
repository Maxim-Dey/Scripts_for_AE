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
var greate_mas = true;
var use_simple_chok = true;
var prec = true;
var twix = true;
//var settingsFile = new File(Folder.temp.fsName + "/fastTopazSettings.json"); // Save in system folder
var settingsFile = new File(Folder($.fileName).parent.fsName + "/FastTopaz2AE_Resource/fastTopazSettings.json");
var model_selection_for_interpolatifor_array = ["Apollo","Aion","ApolloFast","ChronosFast","Chronos"];
var factor_slowmo_array = ["None","x1","x2","x3","x4","x6","x8","x10","x12","x14","x16"]; 
var model_selection_for_enhance_array = ["Proteus","Iris","Nyx","Artemis","Themis","DioneRobust","DioneRobustDehalo"];
var factor_upscale_array = ["None","x2 Upscale","x4 Upscale"];

////////////////////////////////////
///////////GUI FUNCTION/////////////
////////////////////////////////////
function main_ui(thisObj) {   
    function childScript(thisObj) {
        // FASTTOPAZ2AE GROUP
        var FastTopaz2AE = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Panel", undefined);
        scriptWindow = FastTopaz2AE; FastTopaz2AE.orientation = "column"; FastTopaz2AE.alignChildren = ["center","top"]; FastTopaz2AE.spacing = 10; FastTopaz2AE.margins = 10; 
        
        // SETTINGS GROUP
        var reset = FastTopaz2AE.add("button", undefined, undefined, {name: "reset"}); 
        reset.text = "RESET SETTINGS"; reset.preferredSize.height = 40; reset.alignment = ["fill","top"]; 
        var settings = FastTopaz2AE.add("group", undefined, {name: "settings"}); 
        settings.orientation = "row"; settings.alignChildren = ["left","fill"]; 
        
        // AI SETTINGS GROUP
        var ai_settings = settings.add("panel", undefined, undefined, {name: "ai_settings"}); 
        ai_settings.text = "AI Settings"; ai_settings.orientation = "column"; ai_settings.alignChildren = ["left","top"]; ai_settings.spacing = 10; ai_settings.margins = 20; 
       
        // INTERPOLATION GROUP
        var interpolation = ai_settings.add("panel", undefined, undefined, {name: "interpolation"}); 
        interpolation.text = "Interpolation (Slowmo)"; interpolation.orientation = "column"; interpolation.alignChildren = ["left","top"]; interpolation.alignment = ["fill","top"]; interpolation.spacing = 10; interpolation.margins = 20; 
        var model_sel_interpolation = interpolation.add("dropdownlist", undefined, undefined, {name: "model_sel_interpolation", items: model_selection_for_interpolatifor_array}); 
        model_sel_interpolation.alignment = ["fill","top"]; 
        var factor_slowmo = interpolation.add("dropdownlist", undefined, undefined, {name: "factor_slowmo", items: factor_slowmo_array});
        factor_slowmo.alignment = ["fill","top"]; 
        var remove_duplicates_frame = interpolation.add("checkbox", undefined, undefined, {name: "greate_mask"});
        remove_duplicates_frame.text = "Remove Duplicates Frames";
        var value = interpolation.add("statictext", undefined, undefined, {name: "value"}); 
        value.alignment = ["fill", "top"]; value.text = "Sensitivity: 10"; 
        var sensitivity = interpolation.add("slider", undefined, undefined, undefined, undefined, {name: "sensitivity"}); 
        sensitivity.alignment = ["fill","top"]; sensitivity.minvalue = 0; sensitivity.maxvalue = 100;
       
        // ENHANCE GROUP
        var enhance = ai_settings.add("panel", undefined, undefined, {name: "enhance"}); 
        enhance.text = "Enhance (Upscale)"; enhance.orientation = "column"; enhance.alignChildren = ["left","top"]; enhance.alignment = ["fill","top"]; enhance.spacing = 10; enhance.margins = 20;
        var model_sel_enhance = enhance.add("dropdownlist", undefined, undefined, {name: "model_sel_enhance", items: model_selection_for_enhance_array}); 
        model_sel_enhance.alignment = ["fill","top"];
        var factor_upscale = enhance.add("dropdownlist", undefined, undefined, {name: "factor_upscale", items: factor_upscale_array}); 
        factor_upscale.alignment = ["fill","top"];
        var value_1 = enhance.add("statictext", undefined, undefined, {name: "value_1"}); 
        value_1.alignment = ["fill", "top"]; value_1.preferredSize = [150, 20]; value_1.text = "Recover Original Details: 20";    
        var rec_origin_det = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "rec_origin_det"}); 
        rec_origin_det.alignment = ["fill","top"]; rec_origin_det.minvalue = 0; rec_origin_det.maxvalue = 100; 
        var value_2 = enhance.add("statictext", undefined, undefined, {name: "value_2"}); 
        value_2.alignment = ["fill", "top"]; value_2.text = "Add Noise: " + add_nois; 
        var add_noise = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "add_noise"}); 
        add_noise.alignment = ["fill","top"]; add_noise.minvalue = 0; add_noise.maxvalue = 10; 
       
        // BACKGROUND GROUP
        var background = ai_settings.add("panel", undefined, undefined, {name: "background"}); 
        background.text = "Background"; background.orientation = "row"; background.alignChildren = ["left","top"]; background.alignment = ["fill","top"];background.spacing = 10; background.margins = 20; 
        var white = background.add("radiobutton", undefined, undefined, {name: "white"}); 
        white.text = "White"; 
        var gray = background.add("radiobutton", undefined, undefined, {name: "gray"}); 
        gray.text = "Gray"; 
        var black = background.add("radiobutton", undefined, undefined, {name: "black"}); 
        black.text = "Black"; 
       
        // RENDER SETTINGS GROUP
        var render_settings = settings.add("panel", undefined, undefined, {name: "render_settings"}); 
        render_settings.text = "Render Settings"; render_settings.orientation = "column"; render_settings.alignChildren = ["left","top"]; render_settings.spacing = 10; render_settings.margins = 20; 
        var greate_mask = render_settings.add("checkbox", undefined, undefined, {name: "greate_mask"}); 
        greate_mask.text = "Save Alpha Channel"; 
        var use_simple_choker = render_settings.add("checkbox", undefined, undefined, {name: "use_simple_choker"}); 
        use_simple_choker.text = "Use Simple Choker"; 
        
        // FINAL COLLECT GROUP
        var finalCollect = render_settings.add("panel", undefined, undefined, {name: "finalCollect"}); 
        finalCollect.text = "Final Collect"; finalCollect.orientation = "column"; finalCollect.alignChildren = ["left","top"]; finalCollect.alignment = ["fill","top"]; finalCollect.spacing = 10; finalCollect.margins = 20; 
        var precomp = finalCollect.add("radiobutton", undefined, undefined, {name: "precomp"}); 
        precomp.text = "Pre-Composition"; 
        var quicktimeAnimation = finalCollect.add("radiobutton", undefined, undefined, {name: "Quicktime Animation"}); 
        quicktimeAnimation.text = "Quicktime Animation"; 
        var pngsequence = finalCollect.add("radiobutton", undefined, undefined, {name: "PNG Sequence"}); 
        pngsequence.text = "PNG Sequence"; 
       
        // EFFECT FOR TIME CONTROL GROUP
        var effectForTimeControl = render_settings.add("panel", undefined, undefined, {name: "effectForTimeControl"}); 
        effectForTimeControl.text = "Effect for time control"; effectForTimeControl.orientation = "column"; effectForTimeControl.alignChildren = ["left","top"]; effectForTimeControl.alignment = ["fill","top"]; effectForTimeControl.spacing = 10; effectForTimeControl.margins = 20; 
        var twixtor = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "twixtor"}); 
        twixtor.text = "Tiwixtor"; 
        var timewarp = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "timewarp"}); 
        timewarp.text = "Timewarp"; timewarp.margins = 125; 
        var warning1 = effectForTimeControl.add("statictext", undefined, undefined, {name: "warning1"}); 
        warning1.alignment = ["fill", "top"]; warning1.text = "If Twixtor isn't installed,";
        var warning2 = effectForTimeControl.add("statictext", undefined, undefined, {name: "warning1"}); 
        warning2.alignment = ["fill", "top"]; warning2.text = "TimeWrap is the default.";
        
        // INTERACTIVE FUNCTION
        reset.onClick = function() {resetSettings();}
        sensitivity.onChanging = function() {value.text = "Sensitivity: " + Math.round(sensitivity.value);}
        rec_origin_det.onChanging = function() {value_1.text = "Recover Original Details: " + Math.round(rec_origin_det.value);}
        add_noise.onChanging = function() {value_2.text = "Add Noise: " + Math.round(add_noise.value);}
        factor_slowmo.onChange = function() {if (factor_slowmo.selection && factor_slowmo.selection.text === "None") {sensitivity.enabled = false;} else {sensitivity.enabled = true;}}
        greate_mask.onClick = function() {if (!greate_mask.value) {use_simple_choker.enabled = false;} else {use_simple_choker.enabled = true;}}
        precomp.onClick = function() {twixtor.enabled = true; timewarp.enabled = true;}
        pngsequence.onClick = function() {twixtor.enabled = false; timewarp.enabled = false;}
        quicktimeAnimation.onClick = function() {twixtor.enabled = false; timewarp.enabled = false;}
        model_sel_enhance.onChange = function() {
            if (model_sel_enhance.selection && model_sel_enhance.selection.text === "Nyx") {
                factor_upscale.removeAll();
                factor_upscale.add("item", "None");
                factor_upscale.add("item", "x2 Upscale");
                factor_upscale.selection = 0; 
            } else if (model_sel_enhance.selection && factor_upscale.items.length == 2) {
                factor_upscale.removeAll();
                factor_upscale.add("item", "None");
                factor_upscale.add("item", "x2 Upscale");
                factor_upscale.add("item", "x4 Upscale");
                factor_upscale.selection = 0;
            }
            if (model_sel_enhance.selection && model_sel_enhance.selection.text === "Themis") {
                factor_upscale.enabled = false;
                add_noise.enabled = false;
                rec_origin_det.enabled = false;
            } else if ((model_sel_enhance.selection && model_sel_enhance.selection.text !== "Themis") && factor_upscale.selection.text === "None") {
                factor_upscale.enabled = true;
                add_noise.enabled = false;
                rec_origin_det.enabled = false;
            } else if ((model_sel_enhance.selection && model_sel_enhance.selection.text !== "Themis") && factor_upscale.selection.text !== "None") {
                factor_upscale.enabled = true;
                add_noise.enabled = true;
                rec_origin_det.enabled = true;
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
                    greate_mask: greate_mask.value,
                    use_simple_choker: use_simple_choker.value,
                    finalCollect: precomp.value ? "precomp" : (quicktimeAnimation.value ? "quicktime" : "pngseq"),
                    effectForTimeControl: twixtor.value ? "twixtor" : "timewarp"
                };
                settingsFile.open("w");
                settingsFile.write(JSON.stringify(params));
                settingsFile.close();
            } catch (e) {/*alert("Ошибка при сохранении настроек: " + e.toString());*/}
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
                } catch (e) {/*alert("Ошибка при загрузке настроек: " + e.toString());*/}
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
            greate_mask.value = greate_mas;
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
            greate_mask.value = loadedSettings.greate_mask;
            use_simple_choker.value = loadedSettings.use_simple_choker;
            if (!greate_mask.value) {use_simple_choker.enabled = false;}
            precomp.value = loadedSettings.finalCollect === "precomp";
            quicktimeAnimation.value = loadedSettings.finalCollect === "quicktime";
            pngsequence.value = loadedSettings.finalCollect === "pngseq";
            twixtor.value = loadedSettings.effectForTimeControl === "twixtor";
            timewarp.value = loadedSettings.effectForTimeControl === "timewarp";
            if (quicktimeAnimation.value) {twixtor.enabled = false; timewarp.enabled = false;}
            if (pngsequence.value) {twixtor.enabled = false; timewarp.enabled = false;}
        } else {resetSettings();}
            
        // RENDER BUTTON ON CLICK
        var render = FastTopaz2AE.add("button", undefined, undefined, {name: "render"}); 
        render.text = "RENDER"; render.preferredSize.height = 40; render.alignment = ["fill","top"]; 
        render.onClick = function() {
                var p = saveSettings(); 
                try {start_render(p);} catch (error) {alert(error);}
            }
        
        // SHOW SCRIPT
        FastTopaz2AE.layout.layout(true);
        return FastTopaz2AE;   
    }

    var myChildScript = childScript(thisObj);
    if(myChildScript != null && myChildScript instanceof Window) {myChildScript.center();myChildScript.show();}
}

////////////////////////////////////
//////////////BACKEND///////////////
////////////////////////////////////
function start_render(p) {
    app.project.save();
    // Проверяет выделенные Items
    if (!app.project.selection[0]) {alert("Please select one Item."); return;} 

    // дублирует информацию о выбранных Items в отдельный массив и снимает выделение
    var selectedItemsPaths = [];
    for (y = 0; app.project.selection.length > y; y++) {selectedItemsPaths.push(app.project.selection[y]);}
    for (x = 0; app.project.selection.length > x; x++) {app.project.selection[x].selected = false;}

    // Проверяет корректность дальнейшей работы с эффектами Topaz
    if (p.factor_slowmo == 0 && p.factor_upscale == 0) {alert("Select a multiplier for Interpolation or Upscale"); return;}
    var comp_check = app.project.items.addComp("Check_" + selectedItemsPaths[0].name, selectedItemsPaths[0].width, selectedItemsPaths[0].height, selectedItemsPaths[0].pixelAspect, selectedItemsPaths[0].duration, selectedItemsPaths[0].frameRate);
    var layer_check = comp_check.layers.add(selectedItemsPaths[0]);
    try {layer_check.property("Effects").addProperty("Frame Interpolation "); check_int = true;} catch (error) {var check_int = false;}
    try {layer_check.property("Effects").addProperty("Enhance "); check_ups = true;} catch (error) {var check_ups = false;}
    comp_check.remove();
    if (!check_int && !check_ups) {alert("No effects installed Topaz Video AI"); return;
    } else if (check_int && !check_ups) {var result = confirm("Only effect for Interpolation is set. Continue?"); if (!result) {return;}
    } else if (!check_int && check_ups) {var result = confirm("Only effect for Upscale is set. Continue?"); if (!result) {return;}}

    // Вызывает функцию проверки/создания шаблонов для рендеринга
    addRenderSettings("MOV");
    addRenderSettings("PNG");

    // Проверка сохранён проект или нет
    if (!app.project.file) {alert("Please save the project before using this script."); return;
    } else {var assetsFolder = new Folder(app.project.file.path + "/Assets"); if (!assetsFolder.exists) {assetsFolder.create();}}

    // Разворачивает входящий атрибут в переменные
    // For Interpolation
    var model_sel_interpolation = p.model_sel_interpolation + 1;
    var sel_slowmo = p.factor_slowmo + 1;
    var factor_slowmo;
    switch (p.factor_slowmo) {
        case 0: factor_slowmo = 1; break;
        case 1: factor_slowmo = 1; break;
        case 2: factor_slowmo = 2; break;
        case 3: factor_slowmo = 3; break;
        case 4: factor_slowmo = 4; break;
        case 5: factor_slowmo = 6; break;
        case 6: factor_slowmo = 8; break;
        case 7: factor_slowmo = 10; break;
        case 8: factor_slowmo = 12; break;
        case 9: factor_slowmo = 14; break;
        case 10: factor_slowmo = 16; break;
    }
    var sensitivity = p.sensitivity;
    var remove_dublic = p.remove_dublic;
    // For Upscale 
    var model_sel_enhance = p.model_sel_enhance + 2;
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
    var greate_mask = p.greate_mask;
    var use_simple_choker = p.use_simple_choker;
    var finalCollect = p.finalCollect;
    var effectForTimeControl = p.effectForTimeControl;

    // Обарботка Items
    for (i = 0; selectedItemsPaths.length > i; i++) {
        var topazDone = true;
        if(beauty_topaz_upscl) {beauty_topaz_upscl = false;}
        if(mask_topaz_upscl) {mask_topaz_upscl = false;}
        if(beauty_topaz_interp) {beauty_topaz_interp = false;}
        if(mask_topaz_interp) {mask_topaz_interp = false;}

        app.purge(PurgeTarget.ALL_MEMORY_CACHES);
        // Отсеивание неподходящих Items. Проблема с определением файла
        var oneItem = selectedItemsPaths[i];
        if (!(oneItem instanceof FootageItem) && !oneItem.file && !oneItem.frameRate) {continue;}

        // Create Folder for Item
        var itemFolder = app.project.items.addFolder(oneItem.name);
        itemFolder.parentFolder = oneItem.parentFolder;
        oneItem.parentFolder = itemFolder;

        // Create Beauty 
        var comp_b = app.project.items.addComp("B_" + oneItem.name, oneItem.width, oneItem.height, oneItem.pixelAspect, oneItem.duration, oneItem.frameRate);
        comp_b.parentFolder = itemFolder;
        var layer_b = comp_b.layers.add(oneItem);
        layer_b.timeRemapEnabled = true;
        layer_b.outPoint = comp_b.duration;
        add_shape(comp_b, bg, false, "BG");
        var beauty = renderComp(comp_b, assetsFolder, "png");
        app.purge(PurgeTarget.ALL_MEMORY_CACHES);

        // Create Mask
        if (greate_mask) {
            var comp_m = app.project.items.addComp("M_" + oneItem.name, oneItem.width, oneItem.height, oneItem.pixelAspect, oneItem.duration, oneItem.frameRate);
            comp_m.parentFolder = itemFolder;
            var layer_m = comp_m.layers.add(oneItem);
            layer_m.property("Effects").addProperty("ADBE Fill").property("Color").setValue([1, 1, 1]);
            layer_m.timeRemapEnabled = true;
            layer_m.outPoint = comp_m.duration;
            add_shape(comp_m, "black", false, "BG");
            var mask = renderComp(comp_m, assetsFolder, "png");
            app.purge(PurgeTarget.ALL_MEMORY_CACHES);
        }

        // Create Beauty from Topaz Interpolation and Upscale Renders 
        if (sel_slowmo > 1 && check_int && topazDone) {
            var comp_b_interpolation = createForTopazInterpolation(beauty, itemFolder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic);
            do {
                if (beauty_topaz_interp) {
                    topazDone = topazF(beauty_topaz_interp.name, "Interpolation"); 
                    cleaner(beauty_topaz_interp);
                    if (!topazDone) {break;}
                }
                if (finalCollect === "precomp") {var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "mov");}
                else {var beauty_topaz_interp = renderComp(comp_b_interpolation, assetsFolder, "png");}      
                app.purge(PurgeTarget.ALL_MEMORY_CACHES);
            } while (beauty_topaz_interp.duration != beauty.duration*factor_slowmo);

            if (model_sel_enhance > 1 && check_ups && topazDone) {
                var comp_b_upscale = createForTopazUpscale(beauty_topaz_interp, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                do {
                    if (beauty_topaz_upscl) {
                        topazDone = topazF(beauty_topaz_upscl.name, "Upscale");
                        cleaner(beauty_topaz_upscl);
                        if (!topazDone) {break;}
                    }
                    if (finalCollect === "precomp") {var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");}
                    else {var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");}
                    app.purge(PurgeTarget.ALL_MEMORY_CACHES); 
                } while (beauty_topaz_upscl.duration != beauty_topaz_interp.duration);
            } 
        } else {
            if (model_sel_enhance > 1 && check_ups && topazDone) {
                var comp_b_upscale = createForTopazUpscale(beauty, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                do {
                    if (beauty_topaz_upscl) {
                        topazDone = topazF(beauty_topaz_upscl.name, "Upscale");
                        cleaner(beauty_topaz_upscl);
                        if (!topazDone) {break;}
                    }
                    if (finalCollect === "precomp") {var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "mov");}
                    else {var beauty_topaz_upscl = renderComp(comp_b_upscale, assetsFolder, "png");}
                    app.purge(PurgeTarget.ALL_MEMORY_CACHES); 
                } while (beauty_topaz_upscl.duration != beauty.duration);
            } 
        }

        // Create Mask from Topaz Interpolation and Upscale Renders
        if (greate_mask && topazDone) {
            if (sel_slowmo > 1 && check_int && topazDone) {
                var comp_m_interpolation = createForTopazInterpolation(mask, itemFolder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic);
                do {
                    if (mask_topaz_interp) {
                        topazDone = topazF(mask_topaz_interp.name, "Interpolation");
                        cleaner(mask_topaz_interp);
                        if (!topazDone) {break;}
                    }
                    if (finalCollect === "precomp") {var mask_topaz_interp = renderComp(comp_m_interpolation, assetsFolder, "mov");}
                    else {var mask_topaz_interp = renderComp(comp_m_interpolation, assetsFolder, "png");}
                    app.purge(PurgeTarget.ALL_MEMORY_CACHES);
                } while (mask_topaz_interp.duration != mask.duration*factor_slowmo);

                if (model_sel_enhance > 1 && check_ups && topazDone) {
                    var comp_m_upscale = createForTopazUpscale(mask_topaz_interp, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                    do {
                        if (mask_topaz_upscl) {
                            topazDone = topazF(mask_topaz_upscl.name, "Upscale");
                            cleaner(mask_topaz_upscl);
                            if (!topazDone) {break;}
                        }
                        if (finalCollect === "precomp") {var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "mov");}
                        else {var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "png");}                        
                        app.purge(PurgeTarget.ALL_MEMORY_CACHES); 
                    } while (mask_topaz_upscl.duration != mask_topaz_interp.duration);
                }
            } else {
                if (model_sel_enhance > 1 && check_ups && topazDone) {
                    var comp_m_upscale = createForTopazUpscale(mask, itemFolder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise);
                    do {   
                        if (mask_topaz_upscl) {
                            topazDone = topazF(mask_topaz_upscl.name, "Upscale");
                            cleaner(mask_topaz_upscl);
                            if (!topazDone) {break;}
                        }
                        if (finalCollect === "precomp") {var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "mov");}
                        else {var mask_topaz_upscl = renderComp(comp_m_upscale, assetsFolder, "png");}                        
                        app.purge(PurgeTarget.ALL_MEMORY_CACHES); 
                    } while (mask_topaz_upscl.duration != mask.duration);
                }
            }
        }
        
        // Items for clean
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
        if (!topazDone) {oneItem.parentFolder = itemFolder.parentFolder; itemFolder.remove(); continue;}

        // Final collect if need composition
        if (finalCollect === "precomp" && !greate_mask) {
            if (beauty_topaz_upscl) {
                var prefixName = model_selection_for_enhance_array[model_sel_enhance-1] + "X" + factor_slowmo + "_" + model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_upscl, greate_mask, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } else if (beauty_topaz_interp) {
                var prefixName = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_interp, greate_mask, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } 
        }

        if (finalCollect === "precomp" && greate_mask) {
            if (beauty_topaz_upscl) {
                var prefixName = model_selection_for_enhance_array[model_sel_enhance-1] + "X" + factor_slowmo + "_" + model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_upscl, mask_topaz_upscl, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } else if (beauty_topaz_interp) {
                var prefixName = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_interp, mask_topaz_interp, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } 
        }

        // Final collect if need movie
        if (finalCollect === "quicktime" && !greate_mask) {continue;}
        if (finalCollect === "pngseq" && !greate_mask) {continue;}
        if (finalCollect !== "precomp" && greate_mask) {
            if (beauty_topaz_upscl) {
                var prefixName = model_selection_for_enhance_array[model_sel_enhance-2] + "X" + factor_slowmo + "_" + model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_upscl, mask_topaz_upscl, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } else if (beauty_topaz_interp) {
                var prefixName = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
                var compFinal = finalCollectRender(beauty_topaz_interp, mask_topaz_interp, oneItem, use_simple_choker, effectForTimeControl, finalCollect, prefixName);
            } 
            if (finalCollect === "quicktime") {var movFinal = renderComp(compFinal.comp, assetsFolder, "mov");}
            if (finalCollect === "pngseq") {var pngFinal = renderComp(compFinal.comp, assetsFolder, "png");}
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
function finalCollectRender(beauty, mask, oneItem, choker, warp, finalCollect, prefixName) {
    if (finalCollect === "precomp") {
        var newFolder = app.project.items.addFolder("Hidden Assets");
        newFolder.parentFolder = oneItem.parentFolder;
    }
    var comp = app.project.items.addComp("TopazAI_" + prefixName + oneItem.name, beauty.width, beauty.height, beauty.pixelAspect, beauty.duration, beauty.frameRate);
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
    var layer_a = add_shape(comp, "gray", true, "EFFECTS");
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
    if (choker && mask) {layer_a.property("Effects").addProperty("ADBE Simple Choker").property("Choke Matte").setValue(2);}
    return {comp: comp, newFolder: newFolder, beauty: beauty, mask: mask};
}

// Функция создания вспомогательного шейпа
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

// Функция отправления прекомпозиции на рендер
function renderComp(comp, assetsFolder, type) { 
    // Создаем уникальную папку Assets для сохранения промежуточных файлов
    var uniqueFolder = generateUniqueName(assetsFolder, 10);
    // Добавляем композицию в очередь рендеринга
    var renderQueueItem = app.project.renderQueue.items.add(comp);
    if (type === "mov") {
        // Применяем шаблоны для рендеринга
        renderQueueItem.applyTemplate("Topaz MOV");
        renderQueueItem.outputModule(1).applyTemplate("Topaz MOV");
        renderQueueItem.outputModule(1).file = new File(uniqueFolder.fsName + "/" + comp.name);
    }
    if (type === "png") {
        // Применяем шаблоны для рендеринга
        renderQueueItem.applyTemplate("Topaz PNG");
        renderQueueItem.outputModule(1).applyTemplate("Topaz PNG");
        renderQueueItem.outputModule(1).file = new File(uniqueFolder.fsName + "/" + comp.name + "_[#####]");
    }
    // Запускаем рендеринг
    comp.openInViewer();
    app.activeViewer.views[0].options.zoom = 0.25;
    $.sleep(500);
    app.project.renderQueue.render();
    $.sleep(500);
    // Импортируем результат в проект
    var files = uniqueFolder.getFiles();
    var importOptions = new ImportOptions(files[0]);
    if (type === "png") {
        importOptions.sequence = true;
    }
    var importedItem = app.project.importFile(importOptions);
    importedItem.parentFolder = comp.parentFolder;
    return importedItem;
}

// Функция подготовки прекомпозиций для Topaz Interpolation рендеринга 
function createForTopazInterpolation(incoming, folder, factor_slowmo, sel_slowmo, model_sel_interpolation, sensitivity, remove_dublic) {
    var prefixName = model_selection_for_interpolatifor_array[model_sel_interpolation-1] + "X" + factor_slowmo + "_";
    var comp_render = app.project.items.addComp(prefixName + incoming.name, incoming.width, incoming.height, incoming.pixelAspect, incoming.duration*factor_slowmo, incoming.frameRate);
    comp_render.parentFolder = folder;
    var layer = comp_render.layers.add(incoming);
    layer.timeRemapEnabled = true;
    layer.outPoint = comp_render.duration;
    // Add Interpolation
    var interpol = layer.property("Effects").addProperty("Frame Interpolation ");
    interpol.property("Slowmo").setValue(sel_slowmo);
    interpol.property("Model").setValue(model_sel_interpolation);;
    interpol.property("Sensitivity").setValue(sensitivity);
    if (remove_dublic) {interpol.property("Remove Duplicates Frames").setValue(1);}
    return comp_render;
}

// Функция подготовки прекомпозиций для Topaz Upscale рендеринга 
function createForTopazUpscale(incoming, folder, factor_upscale, sel_upscale, model_sel_enhance, rec_origin_det, add_noise) {
    var prefixName = model_selection_for_enhance_array[model_sel_enhance-2] + "X" + factor_upscale + "_";
    var comp_render = app.project.items.addComp(prefixName + incoming.name, incoming.width*factor_upscale, incoming.height*factor_upscale, incoming.pixelAspect, incoming.duration, incoming.frameRate);
    comp_render.parentFolder = folder;
    var layer = comp_render.layers.add(incoming);
    layer.timeRemapEnabled = true;
    layer.outPoint = comp_render.duration;
    // Add Upscale
    var upscal = layer.property("Effects").addProperty("Enhance ");
    upscal.property("AI Model").setValue(model_sel_enhance);
    if (model_sel_enhance != 6) {
        upscal.property("Output Resolution").setValue(sel_upscale);
        upscal.property("Add Noise").setValue(add_noise);
        if (model_sel_enhance != 7 || model_sel_enhance != 8) {upscal.property("Recover Original Details").setValue(rec_origin_det);}
    }
    return comp_render;
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
        var exportTemplate = ((new File($.fileName)).path) + "/FastTopaz2AE_Resource/" + "FastTopaz2AE_Resource.aep";
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
        try {for (var i = files.length - 1; i >= 0; i--) {files[i].remove();}} catch (e) {}
        if (folder.getFiles().length == 0) {try {folder.remove();} catch (e) {}}
    }
}

//////////////
main_ui(this);
//////////////