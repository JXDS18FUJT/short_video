Component({
    properties: {
        value: {
            type: Number,
            value: 0
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        maxNum: {
            type: Number,
            value: 20
        },
        minNum: {
            type: Number,
            value: 1
        },
        index: {
            type: String,
            value: 0
        },
        datas: {
            type: String,
            value: ""
        },
        btnSize: {
            type: String,
            value: "60rpx"
        },
        btnFontSize: {
            type: String,
            value: "36rpx"
        },
        btnColr: {
            type: String,
            value: "#666666"
        },
        inputHeight: {
            type: String,
            value: "30rpx"
        },
        inputFontSize: {
            type: String,
            value: "26rpx"
        },
        inputColor: {
            type: String,
            value: "#333333"
        },
        inputBG: {
            type: String,
            value: "#F6F7F8"
        },
        inputPadding: {
            type: String,
            value: "10rpx"
        },
        inputBorderRadius: {
            type: String,
            value: "8rpx"
        },
        width: {
            type: String,
            value: "200rpx"
        }
    },
    data: {},
    methods: {
        add: function() {
            var t = this.data.value + 1;
            t > this.data.maxNum || (this.setData({
                value: t
            }), this.numberChangeDo(t));
        },
        reduce: function() {
            var t = this.data.value - 1;
            t < this.data.minNum || (this.setData({
                value: t
            }), this.numberChangeDo(t));
        },
        blur: function(t) {
            var a = t.detail.value;
            a > this.data.maxNum && (a = this.data.maxNum), a < this.data.minNum && (a = this.data.minNum), 
            this.setData({
                value: a
            }), this.numberChangeDo(a);
        },
        numberChangeDo: function(t) {
            this.triggerEvent("change", [ t, this.data.index, this.data.datas ]);
        }
    }
});