Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        background: {
            type: String,
            value: "rgba(0, 0, 0, 0.5)"
        },
        borderRadius: {
            type: String,
            value: "0rpx"
        },
        zIndex: {
            type: Number,
            value: 9
        }
    },
    data: {
        isIpx: !1
    },
    methods: {
        closeDialog: function() {
            this.triggerEvent("closeDialog");
        },
        stopFun: function() {}
    },
    options: {
        multipleSlots: !0
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                -1 != e.model.search("iPhone X") && t.setData({
                    isIpx: !0
                });
            }
        });
    }
});