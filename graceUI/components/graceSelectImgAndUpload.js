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
        },
        uploadServerUrl: {
            type: String,
            value: ""
        },
        progressSize: {
            type: Number,
            value: 1
        },
        progressColor: {
            type: String,
            value: "#27BD81"
        },
        progressBGColor: {
            type: String,
            value: "#F8F8F8"
        }
    },
    data: {
        imgLists: [],
        updatting: !1
    },
    methods: {
        addImg: function() {
            var i = this, t = this.data.maxFileNumber - this.data.imgLists.length;
            if (t < 1) return !1;
            wx.showLoading({
                title: ""
            }), wx.chooseImage({
                count: t,
                sizeType: [ "compressed" ],
                success: function(t) {
                    for (var s = 0; s < t.tempFilePaths.length; s++) i.data.imgLists.push({
                        url: t.tempFilePaths[s],
                        progress: 0,
                        error: !1
                    });
                    i.setData({
                        imgLists: i.data.imgLists
                    }), i.triggerEvent("change", i.data.imgLists), wx.hideLoading();
                },
                complete: function() {
                    wx.hideLoading();
                },
                fail: function() {
                    wx.hideLoading();
                }
            });
        },
        removeImg: function(t) {
            var s = t.currentTarget.id.replace("grace-items-img-", "");
            this.data.imgLists.splice(s, 1), this.setData({
                imgLists: this.data.imgLists
            }), this.triggerEvent("change", this.data.imgLists);
        },
        showImgs: function(t) {
            for (var s = t.currentTarget.dataset.imgurl, i = [], a = 0; a < this.data.imgLists.length; a++) i.push(this.data.imgLists[a].url);
            wx.previewImage({
                urls: i,
                current: s
            });
        },
        upload: function(t) {
            this.data.updatting || (this.data.updatting = !0, t || (t = 0), wx.showLoading({
                title: "图片上传中"
            }), this.uploadBase(t));
        },
        retry: function(t) {
            var s = t.currentTarget.dataset.index;
            this.upload(s);
        },
        uploadBase: function(s) {
            var i = this;
            if (s > this.data.imgLists.length - 1) return wx.hideLoading(), this.setData({
                updatting: !1
            }), void this.triggerEvent("uploaded", this.data.imgLists);
            "" != this.data.uploadServerUrl ? 1 <= this.data.imgLists[s].progress ? this.uploadBase(s + 1) : (this.data.imgLists[s].error = !1, 
            this.setData({
                imgLists: this.data.imgLists
            }), wx.uploadFile({
                url: this.data.uploadServerUrl,
                filePath: this.data.imgLists[s].url,
                name: "img",
                success: function(t) {
                    "ok" != (t = JSON.parse(t.data)).status ? (wx.showToast({
                        title: "上传失败 : " + t.data,
                        icon: "none"
                    }), i.error(s)) : (i.data.imgLists[s].url = t.data, i.data.imgLists[s].progress = 100, 
                    i.setData({
                        imgLists: i.data.imgLists
                    }), i.uploadBase(s + 1));
                },
                fail: function(t) {
                    wx.showToast({
                        title: "上传失败，请点击图片重试",
                        icon: "none"
                    }), i.error(s);
                }
            }).onProgressUpdate(function(t) {
                0 < t.progress && (i.data.imgLists[s].progress = t.progress, i.setData({
                    imgLists: i.data.imgLists
                }));
            })) : wx.showToast({
                title: "请设置上传服务器地址",
                icon: "none"
            });
        },
        error: function(t) {
            var s = this;
            setTimeout(function() {
                s.data.updatting = !1, s.data.imgLists[t].progress = 0, s.data.imgLists[t].error = !0, 
                s.triggerEvent("uploaderror"), s.setData({
                    imgLists: s.data.imgLists,
                    updatting: !1
                });
            }, 500);
        },
        setItems: function(t) {
            for (var s = 0; s < t.length; s++) this.data.imgLists.push({
                url: t[s],
                progress: 100,
                error: !1
            }), this.setData({
                imgLists: this.data.imgLists
            });
            this.triggerEvent("change", this.data.imgLists);
        },
        clearAllImgs: function() {
            this.setData({
                imgLists: []
            });
        }
    }
});