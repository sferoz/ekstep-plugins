Plugin.extend({
    _type: 'line',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {

        this._self = new createjs.Shape();
        var graphics = this._self.graphics;
        var dims = this.relativeDims();

        var color = (data.stroke ? data.stroke : '#000000');
        var strokeWidth = (data['stroke-width'] ? data['stroke-width'] : 1);
        var opacity = (data.opacity ? data.opacity : 0);
        var dash = (data['stroke-dash'] ? data['stroke-dash'] : 'solid');

        //this._self.alpha = opacity;
        graphics.beginStroke(color);
        graphics.setStrokeStyle(strokeWidth);

        if (dash == 'dotted') {
            graphics.setStrokeDash([strokeWidth*1,strokeWidth*2]);
        }
        else if (dash == 'dashed') {
            graphics.setStrokeDash([strokeWidth*7,strokeWidth*3]);
        }
        else {
            graphics.setStrokeDash();
        }

        graphics.moveTo(dims.x, dims.y).lineTo(dims.w + dims.x, dims.y + dims.h);
    },
    drawBorder : function() {
    }
});
