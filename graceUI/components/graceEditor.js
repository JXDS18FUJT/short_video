var systemInfo = require("../jsTools/systemInfo.js");

Component({
    data: {
        article: {
            title: "",
            contents: []
        },
        ipxHeight: 0
    },
    ready: function() {
        var t = systemInfo.info();
        this.setData({
            ipxHeight: t.iphonexbottomheightrpx + "rpx"
        });
    },
    methods: {
        titleInput: function(t) {
            this.data.article.title = t.detail.value, this.setData({
                article: this.data.article
            });
        },
        graceEditorAddItem: function(t) {
            var i = this, r = t.currentTarget.dataset.type;
            "img" == r ? wx.chooseImage({
                success: function(t) {
                    for (var e = t.tempFilePaths, a = 0; a < e.length; a++) i.data.article.contents.push({
                        type: r,
                        content: e[a]
                    });
                    i.setData({
                        article: i.data.article
                    }), i.returnArt();
                }
            }) : (this.data.article.contents.push({
                type: r,
                content: ""
            }), this.setData({
                article: this.data.article
            }));
        },
        graceEditorInput: function(t) {
            var e = t.currentTarget.dataset.index, a = t.detail.value;
            "" == a ? this.data.article.contents.splice(e, 1) : this.data.article.contents[e].content = a, 
            this.setData({
                article: this.data.article
            }), this.returnArt();
        },
        deleteItem: function(t) {
            var e = this, a = t.currentTarget.dataset.index;
            wx.showModal({
                title: "提示",
                content: "确定要删除项目吗?",
                success: function(t) {
                    t.confirm && (e.data.article.contents.splice(a, 1), e.setData({
                        article: e.data.article
                    }), e.returnArt());
                }
            });
        },
        returnArt: function() {
            this.triggerEvent("change", this.data.article);
        },
        setError: function(t) {
            this.data.article.contents[t].error = !0, this.data.article.contents.splice(t, 1, this.data.article.contents[t]), 
            this.setData({
                article: this.data.article
            });
        },
        setDefault: function(t) {
            this.setData({
                article: t
            }), this.returnArt();
        }
    }
});