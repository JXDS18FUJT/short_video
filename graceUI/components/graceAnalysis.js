Component({
    properties: {
        article: {
            type: Array,
            value: new Array()
        }
    },
    methods: {
        showImgs: function(e) {
            for (var t = e.currentTarget.dataset.url, r = [], a = this.data.article, n = 0; n < a.length; n++) "img" == a[n].type && r.push(a[n].content);
            wx.previewImage({
                urls: r,
                current: t
            });
        }
    }
});