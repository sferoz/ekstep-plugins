Plugin.extend({
    _type: 'rotate',
    _isContainer: true,
    _render: true,
    initPlugin: function(data) {

        // Init self container
        var dims = this.relativeDims();
        this._self = new createjs.Container();
        this._self.x = dims.x;
        this._self.y = dims.y;

        // Init the image asset
        var imageData = {};
        imageData.w = 100;
        imageData.h = 100;
        imageData.stretch = false;
        imageData.x = 0;
        imageData.y = 0;
        imageData.asset = data.asset;
        var image = PluginManager.invoke('image', imageData, this, this._stage, this._theme);

        // Calculate the center of rotation
        var bounds = image._self.getBounds();
        var regx = bounds.width / 2;
        var regy = bounds.height / 2;
        image._self.regX = regx;
        image._self.regY = regy;
        image._self.x = bounds.width * image._self.scaleX / 2;
        image._self.y = bounds.height * image._self.scaleY / 2;

        // 1 = fastest (500 ms), 0.1 = slowest (5000 ms)
        var duration = this.calculateDuration(data.speed);

        createjs.Ticker.setFPS(60);
        var tween = createjs.Tween.get(image._self, {loop:true})
                .to({rotation: 360}, duration)
                .call(this.handleComplete)
                .addEventListener("change", this.handleChange);
    },
    handleChange: function(event) {
        Renderer.update = true;
    },
    handleComplete: function(tween) {
        var image = tween._target;
    },
    calculateDuration: function(speed) {
        speed = ((speed > 5) ? 5 : speed);
        speed = ((speed < 0.1) ? 0.1 : speed);
        var duration = (2000 / speed);
        return duration;
    }
});
