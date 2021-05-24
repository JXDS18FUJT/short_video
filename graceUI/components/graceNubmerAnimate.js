Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        stepNumber: {
            type: Number,
            value: 50
        },
        timer: {
            type: Number,
            value: 800
        },
        keepInt: {
            type: Boolean,
            value: !1
        },
        fontSize: {
            type: String,
            value: "28rpx"
        },
        color: {
            type: String,
            value: "#333333"
        },
        lineHeight: {
            type: String,
            value: "50rpx"
        },
        fontWeight: {
            type: String,
            value: "400"
        }
    },
    data: {
        numAnimate: 0,
        intervalId: null
    },
    ready: function() {
        var a = this;
        console.log(this.data.num);
        var t = this.data.timer / this.data.stepNumber, e = Math.floor(this.data.num / this.data.stepNumber * 100) / 100;
        this.data.intervalId = setInterval(function() {
            if (0 <= a.data.num) {
                if (a.data.numAnimate >= a.data.num) return a.setData({
                    numAnimate: a.data.num
                }), void clearInterval(a.data.intervalId);
            } else if (a.data.numAnimate <= a.data.num) return a.setData({
                numAnimate: a.data.num
            }), void clearInterval(a.data.intervalId);
            var t = a.data.numAnimate + e;
            a.setData({
                numAnimate: a.data.keepInt ? parseInt(t) : Math.floor(100 * t) / 100
            });
        }, t);
    }
});