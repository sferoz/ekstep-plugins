Plugin.extend({
    _type: 'quiz',
    _isContainer: true,
    _render: true,
    initPlugin: function(data) {

        // Init self container
        var dims = this.relativeDims();
        this._self = new createjs.Container();
        this._self.x = dims.x;
        this._self.y = dims.y;

        // Init the item controller
        this.initController(data);

        // Invoke the embed plugin to start rendering the templates
        this.invokeTemplate(data);

        //OverlayManager.showGoodJobFb(true);
    },

    invokeTemplate: function(data) {
        var embedData = {};
        embedData.w = 100;
        embedData.h = 100;
        embedData.x = 0;
        embedData.y = 0;
        embedData.template = "item";
        embedData["var-item"] = "item";
        PluginManager.invoke('embed', embedData, this, this._stage, this._theme);
    },

    initController: function(data) {

        var controllerName = "item";
        var assessmentid = (this._stage._id + "_assessment");
        var stageController = this._theme._controllerMap[assessmentid];

        // Check if the controller is already initialized, if yes, skip the init
        var initialized = (stageController != undefined);
        if (!initialized) {
            var controllerData = {};
            controllerData.__cdata = data.data.__cdata;
            controllerData.type = "items";
            controllerData.name = assessmentid;
            controllerData.id = assessmentid;

            this._theme.addController(controllerData);
            stageController = this._theme._controllerMap[assessmentid];
        }

        if (stageController) {
            this._stage._stageControllerName = controllerName;
            this._stage._stageController = stageController;
            this._stage._stageController.next();
        }
    }
});
