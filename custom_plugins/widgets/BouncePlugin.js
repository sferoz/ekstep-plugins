Plugin.extend({
    _type: 'bounce',
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
        imageData.w = 10;
        imageData.h = 10;
        imageData.stretch = false;
        imageData.x = 0;
        imageData.y = 0;
        imageData.asset = data.asset;
        console.log(imageData);
        var image = PluginManager.invoke('image', imageData, this, this._stage, this._theme);

        // Calculate the bounds
        var top = image._self.y;
        var left = image._self.x;
        var right = (dims.w - dims.x);
        var bottom = (dims.h - dims.y);

        // 1 = fastest (500 ms), 0.1 = slowest (5000 ms)
        var duration = this.calculateDuration(data.speed);

        createjs.Ticker.setFPS(60);

        var tween1 = createjs.Tween.get(image._self, {loop:false})
                .to({x: right }, duration, createjs.Ease.quadOut)
                .addEventListener("change", this.handleChange);

        var tween2 = createjs.Tween.get(image._self, {loop:false})
                .to({y: bottom }, duration, createjs.Ease.bounceOut)
                .call(this.handleComplete)
                .addEventListener("change", this.handleChange);
    },
    handleChange: function(event) {
        Renderer.update = true;
    },
    handleComplete: function(tween) {
        var image = tween._target;
        console.log("Done");
    },
    calculateDuration: function(speed) {
        speed = ((speed > 5) ? 5 : speed);
        speed = ((speed < 0.1) ? 0.1 : speed);
        var duration = (2000 / speed);
        return duration;
    }
});
