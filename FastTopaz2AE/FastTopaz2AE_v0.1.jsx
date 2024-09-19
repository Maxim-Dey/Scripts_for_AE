// FASTTOPAZ2AE
// ============
var FastTopaz2AE = new Window("dialog"); 
    FastTopaz2AE.text = "FastTopaz2AE"; 
    FastTopaz2AE.orientation = "column"; 
    FastTopaz2AE.alignChildren = ["center","top"]; 
    FastTopaz2AE.spacing = 10; 
    FastTopaz2AE.margins = 10; 

// SETTINGS
// ========
var settings = FastTopaz2AE.add("group", undefined, {name: "settings"}); 
    settings.orientation = "row"; 
    settings.alignChildren = ["left","fill"]; 
    settings.spacing = 10; 
    settings.margins = 10; 

// AI_SETTINGS
// ===========
var ai_settings = settings.add("panel", undefined, undefined, {name: "ai_settings"}); 
    ai_settings.text = "AI Settings"; 
    ai_settings.orientation = "column"; 
    ai_settings.alignChildren = ["left","top"]; 
    ai_settings.spacing = 10; 
    ai_settings.margins = 20; 

// INTERPOLATION
// =============
var interpolation = ai_settings.add("panel", undefined, undefined, {name: "interpolation"}); 
    interpolation.text = "Interpolation (Slowmo):"; 
    interpolation.orientation = "column"; 
    interpolation.alignChildren = ["left","top"]; 
    interpolation.spacing = 10; 
    interpolation.margins = 20; 
    interpolation.alignment = ["fill","top"]; 

var model_selection_for_interpolatifor_array = ["None","-","Apollo","Aion","Apollo Fast","Chronos Fast","Chronos"]; 
var model_selection_for_interpolatifor = interpolation.add("dropdownlist", undefined, undefined, {name: "model_selection_for_interpolatifor", items: model_selection_for_interpolatifor_array}); 
    model_selection_for_interpolatifor.selection = 0; 

var selection_slowmo_array = ["Original","-","x2","x3","x4","x6"]; 
var selection_slowmo = interpolation.add("dropdownlist", undefined, undefined, {name: "selection_slowmo", items: selection_slowmo_array}); 
    selection_slowmo.selection = 0; 

var value = interpolation.add("statictext", undefined, undefined, {name: "value"}); 
    value.text = "Sensitivity: 10"; 

var sensitivity = interpolation.add("slider", undefined, undefined, undefined, undefined, {name: "sensitivity"}); 
    sensitivity.minvalue = 0; 
    sensitivity.maxvalue = 100; 
    sensitivity.value = 50; 
    sensitivity.alignment = ["fill","top"]; 

// ENHANCE
// =======
var enhance = ai_settings.add("panel", undefined, undefined, {name: "enhance"}); 
    enhance.text = "Enhance (Upscale):"; 
    enhance.orientation = "column"; 
    enhance.alignChildren = ["left","top"]; 
    enhance.spacing = 10; 
    enhance.margins = 20; 
    enhance.alignment = ["fill","top"]; 

var model_selection_for_enhance_array = ["None","-","Proteus","Iris","Nyx","Artemis","Themis","Dione Robust","Dione Robust Dehalo"]; 
var model_selection_for_enhance = enhance.add("dropdownlist", undefined, undefined, {name: "model_selection_for_enhance", items: model_selection_for_enhance_array}); 
    model_selection_for_enhance.selection = 0; 

var selection_upscale_array = ["Original","-","x2","x4"]; 
var selection_upscale = enhance.add("dropdownlist", undefined, undefined, {name: "selection_upscale", items: selection_upscale_array}); 
    selection_upscale.selection = 0; 

var value_1 = enhance.add("statictext", undefined, undefined, {name: "value_1"}); 
    value_1.text = "Recover Original Details: 20"; 

var recoverOriginalDetails = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "recoverOriginalDetails"}); 
    recoverOriginalDetails.minvalue = 0; 
    recoverOriginalDetails.maxvalue = 100; 
    recoverOriginalDetails.value = 50; 
    recoverOriginalDetails.alignment = ["fill","top"]; 

var value_2 = enhance.add("statictext", undefined, undefined, {name: "value_2"}); 
    value_2.text = "Add Noise: 0"; 

var add_noise = enhance.add("slider", undefined, undefined, undefined, undefined, {name: "add_noise"}); 
    add_noise.minvalue = 0; 
    add_noise.maxvalue = 100; 
    add_noise.value = 50; 
    add_noise.alignment = ["fill","top"]; 

// RENDER_SETTINGS
// ===============
var render_settings = settings.add("panel", undefined, undefined, {name: "render_settings"}); 
    render_settings.text = "Render Settings"; 
    render_settings.orientation = "column"; 
    render_settings.alignChildren = ["left","top"]; 
    render_settings.spacing = 10; 
    render_settings.margins = 20; 

var greate_mask = render_settings.add("checkbox", undefined, undefined, {name: "greate_mask"}); 
    greate_mask.text = "Create Mask"; 
    greate_mask.value = true; 

var useSimpleChoker = render_settings.add("checkbox", undefined, undefined, {name: "useSimpleChoker"}); 
    useSimpleChoker.text = "Use Simple Choker"; 
    useSimpleChoker.value = true; 

// EFFECTFORTIMECONTROL
// ====================
var effectForTimeControl = render_settings.add("panel", undefined, undefined, {name: "effectForTimeControl"}); 
    effectForTimeControl.text = "Effect for time control:"; 
    effectForTimeControl.orientation = "column"; 
    effectForTimeControl.alignChildren = ["left","top"]; 
    effectForTimeControl.spacing = 10; 
    effectForTimeControl.margins = 20; 
    effectForTimeControl.alignment = ["fill","top"]; 

var twixtor = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "twixtor"}); 
    twixtor.text = "Tiwixtor"; 
    twixtor.value = true; 

var timewarp = effectForTimeControl.add("radiobutton", undefined, undefined, {name: "timewarp"}); 
    timewarp.text = "Timewarp"; 

// FINALCOLLECT
// ============
var finalCollect = render_settings.add("panel", undefined, undefined, {name: "finalCollect"}); 
    finalCollect.text = "Final Collect:"; 
    finalCollect.orientation = "column"; 
    finalCollect.alignChildren = ["left","top"]; 
    finalCollect.spacing = 10; 
    finalCollect.margins = 20; 
    finalCollect.alignment = ["fill","top"]; 

var precomp = finalCollect.add("radiobutton", undefined, undefined, {name: "precomp"}); 
    precomp.text = "Pre-Composition"; 
    precomp.value = true; 

var AppleProRes = finalCollect.add("radiobutton", undefined, undefined, {name: "AppleProRes"}); 
    AppleProRes.text = "Apple ProRes 4444"; 

// BACKGROUND
// ==========
var background = render_settings.add("panel", undefined, undefined, {name: "background"}); 
    background.text = "Background"; 
    background.orientation = "column"; 
    background.alignChildren = ["left","top"]; 
    background.spacing = 10; 
    background.margins = 15; 
    background.alignment = ["fill","top"]; 

var white = background.add("radiobutton", undefined, undefined, {name: "white"}); 
    white.text = "White"; 
    white.value = true; 

var gray = background.add("radiobutton", undefined, undefined, {name: "gray"}); 
    gray.text = "Gray"; 

var black = background.add("radiobutton", undefined, undefined, {name: "black"}); 
    black.text = "Black"; 

// FASTTOPAZ2AE
// ============
var render = FastTopaz2AE.add("button", undefined, undefined, {name: "render"}); 
    render.text = "RENDER"; 
    render.preferredSize.height = 40; 
    render.alignment = ["fill","top"]; 

FastTopaz2AE.show();