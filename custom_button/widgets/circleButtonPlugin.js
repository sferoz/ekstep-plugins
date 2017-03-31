Plugin.extend({
	_type: 'circle',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
        this._self = new createjs.Shape();
        var dims = this.relativeDims();
        this._self.x = dims.x + dims.w/2;
        this._self.y = dims.y + dims.h/2;
        this._self.graphics.beginFill("#ff0000").dc(0, 0, dims.w, dims.w, dims.w/2);
        console.log("circle", dims);
        
        if(data.hitArea) {
            var hit = new createjs.Shape();
            hit.graphics.beginFill("#000").dc(0, 0, dims.w);
            this._self.hitArea = hit;
        }
    },
    changeColor: function(data){
        var dims = this.relativeDims();
        this._self.graphics.beginFill(data.color).dc(0, 0, dims.w, dims.w, dims.w/2);
        this.update();
    }
});
