var app = getApp();

Component({
    data: {
        selected: 0,
        color: "rgba(255,255,255,0.7)",
        selectedColor: "#FFF",
        isIndex: !0,
        list: []
    },
    ready: function() {
        var s = this, t = app.util.url("entry/wxapp/api", {
            m: "dk_vbest",
            k: "menu"
        });
        wx.request({
            url: t,
            method: "GET",
            success: function(t) {
                var e = app.crypt.Decrypt(t.data.data.data, t.data.data.key), a = JSON.parse(e);
                s.setData({
                    list: a.menu
                });
            }
        });
    },
    methods: {
        switchTab: function(t) {
            wx.switchTab({
                url: t.currentTarget.dataset.path
            }), this.data.selected = t.currentTarget.dataset.index, this.setData({
                selected: this.data.selected
            });
        }
    }
});