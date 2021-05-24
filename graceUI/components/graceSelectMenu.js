function defineReactive(e, t, n, r) {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return n;
        },
        set: function(e) {
            e !== n && (r && r(e), n = e);
        }
    });
}

function watch(n, r) {
    Object.keys(r).forEach(function(t) {
        defineReactive(n.data, t, n.data[t], function(e) {
            r[t].call(n, e);
        });
    });
}

Component({
    properties: {
        items: {
            type: Array,
            value: []
        },
        show: {
            type: Boolean,
            value: !1
        },
        height: {
            type: Number,
            value: 300
        },
        color: {
            type: String,
            value: "#333333"
        },
        activeColor: {
            type: String,
            value: "#3688FF"
        },
        selectIndex: {
            type: Number,
            value: 0
        },
        currentIndex: {
            type: Number,
            value: 0
        },
        padding: {
            type: String,
            value: "0 20rpx"
        }
    },
    data: {
        top: 0
    },
    ready: function() {
        this.currentIndex = this.selectIndex, watch(this, {
            selectIndex: function(e) {
                this.setData({
                    currentIndex: e
                });
            }
        });
    },
    methods: {
        showMenu: function() {
            var t = this;
            wx.createSelectorQuery().in(this).select("#menuMain").fields({
                rect: !0
            }, function(e) {
                t.setData({
                    top: e.top
                });
            }).exec(), this.triggerEvent("showMenu");
        },
        close: function() {
            this.triggerEvent("close");
        },
        select: function(e) {
            var t = Number(e.currentTarget.dataset.index);
            this.setData({
                currentIndex: t
            }), this.triggerEvent("select", t), this.close();
        }
    }
});