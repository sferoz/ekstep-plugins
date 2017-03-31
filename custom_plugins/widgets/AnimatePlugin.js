Plugin.extend({
    _type: 'animate',
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

        // Calculate the bounds
        var top = image._self.y;
        var left = image._self.x;
        var right = (dims.w - dims.x);
        var bottom = (dims.h - dims.y);

        // Animation starting and ending points, depending upon the direction
        var bounds = this.calculateBounds(data.direction, top, left, bottom, right);

        // 1 = fastest (500 ms), 0.1 = slowest (5000 ms)
        var duration = this.calculateDuration(data.speed);

        createjs.Ticker.setFPS(60);
        var tween = createjs.Tween.get(image._self, {loop:false})
                .to({x: bounds.from_x, y: bounds.from_y }, 0, createjs.Ease.bounceOut)
                .to({x: bounds.to_x,   y: bounds.to_y   }, duration, createjs.Ease.bounceOut)
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
    calculateBounds: function(direction, top, left, bottom, right) {

        var bounds = {};

        // Animation starting and ending points, depending upon the direction
        if (direction == "down") {
            bounds.from_x = left;
            bounds.from_y = top;
            bounds.to_x = left;
            bounds.to_y = bottom;
        }
        else if (direction == "right") {
            bounds.from_x = left;
            bounds.from_y = top;
            bounds.to_x = right;
            bounds.to_y = top;
        }
        else if (direction == "up") {
            bounds.to_x = left;
            bounds.to_y = top;
            bounds.from_x = left;
            bounds.from_y = bottom;
        }
        else if (direction == "left") {
            bounds.to_x = left;
            bounds.to_y = top;
            bounds.from_x = right;
            bounds.from_y = top;
        }

        return bounds;
    },
    calculateDuration: function(speed) {
        speed = ((speed > 5) ? 5 : speed);
        speed = ((speed < 0.1) ? 0.1 : speed);
        var duration = (2000 / speed);
        return duration;
    }
});
