Plugin.extend({
    _type: 'supernav',
    _isContainer: false,
    _render: false,
    initPlugin: function(data) {

        var dims = this.relativeDims();
        var div = document.getElementById(data.id);
        if (div) {
            jQuery("#" + data.id).remove();
        }

        div = document.createElement('div');
        div.id = data.id;
        div.style.width = dims.w + 'px';
        div.style.height = dims.h + 'px';
        div.style.top = dims.y + 'px';
        div.style.left = dims.x + 'px';

        div.style.position = 'absolute';

        var instance = this;
        var parentDiv = document.getElementById(Renderer.divIds.gameArea);
        parentDiv.insertBefore(div, parentDiv.childNodes[0]);

        // URL of the next image
        var nextasset = Renderer.theme.getAsset(data.nextasset);

        var imgtag = document.createElement('img');
        imgtag.src = nextasset;
        imgtag.style = 'max-width:100%;max-height:100%';
        imgtag.onclick = this.callback;
        div.insertBefore(imgtag, div.childNodes[0]);

        // var imgtag = "<img src=" + nextasset + " style='max-width:100%;max-height:100%'/>";
        // //nextasset.style = 'max-width:100%;max-height:100%';
        // var html = imgtag;//nextasset;
        // jQuery("#" + data.id).append(html);

        console.log(Renderer.theme.getMedia(data.nextasset));

        this._div = div;
        this._self = new createjs.DOMElement(div);

        this._render = true;
    },

    callback: function() {
        console.log("called");
    }
});

