Component({
    properties: {
        maxFileNumber: {
            type: Number,
            value: 9
        },
        btnName: {
            type: String,
            value: "添加照片"
        },
        items: {
            type: Array,
            value: []
        },
        closeBtnColor: {
            type: String,
            value: "#666666"
        }
    },
    methods: {
        addImg: function() {
            var e = this, t = this.data.maxFileNumber - this.data.items.length;
            if (t < 1) return !1;
            wx.showLoading({
                title: ""
            }), wx.chooseImage({
                count: t,
                sizeType: [ "compressed" ],
                success: function(t) {
                    e.setData({
                        items: e.data.items.concat(t.tempFilePaths)
                    }), e.triggerEvent("change", e.data.items), wx.hideLoading();
                },
                fail: function() {
                    wx.hideLoading();
                }
            });
        },
        removeImg: function(t) {
            var e = t.currentTarget.id.replace("grace-items-img-", "");
            this.data.items.splice(e, 1), this.setData({
                items: this.data.items
            }), this.triggerEvent("change", this.data.items);
        },
        showImgs: function(t) {
            var e = t.currentTarget.dataset.imgurl;
            console.log(this.data.items), wx.previewImage({
                urls: this.data.items,
                current: e
            });
        }
    }
});