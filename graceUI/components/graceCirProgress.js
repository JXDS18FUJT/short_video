function defineReactive(t, e, a, i) {
    Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return a;
        },
        set: function(t) {
            t !== a && (i && i(t), a = t);
        }
    });
}

function watch(a, i) {
    Object.keys(i).forEach(function(e) {
        defineReactive(a.data, e, a.data[e], function(t) {
            i[e].call(a, t);
        });
    });
}

Component({
    properties: {
        width: {
            type: Number,
            value: 200
        },
        lineWidth: {
            type: Number,
            value: 10
        },
        bgColor: {
            type: String,
            value: "#F1F1F1"
        },
        progressColor: {
            type: String,
            value: "#00C777"
        },
        fontColor: {
            type: String,
            value: "#00C777"
        },
        value: {
            type: Number,
            value: 1
        },
        fontSize: {
            type: Number,
            value: 30
        },
        speed: {
            type: Number,
            value: 20
        }
    },
    data: {
        ctx: null
    },
    ready: function() {
        var e = this, a = {};
        a.center = this.data.width / 2, a.lineWidth = this.data.lineWidth, a.r = this.data.width / 2 - a.lineWidth / 2, 
        a.lineWidth2 = a.lineWidth - 2, this.setData({
            ctx: wx.createCanvasContext("canvasArc", this)
        }), this.drawAnimate(this.ctx, a, this.data.value), watch(this, {
            value: function(t) {
                e.drawAnimate(e.ctx, a, t);
            }
        });
    },
    methods: {
        drawAnimate: function(t, e, a) {
            var i = this, n = 0;
            if (i.data.value > a) for (var r = i.data.value; a <= r; r--) !function(t) {
                setTimeout(function() {
                    i.draw(i.data.ctx, e, t);
                }, n);
            }(r), n += i.data.speed; else for (r = i.data.value; r <= a; r++) !function(t) {
                setTimeout(function() {
                    i.draw(i.data.ctx, e, t);
                }, n);
            }(r), n += i.data.speed;
        },
        draw: function(t, e, a) {
            a < 0 && (a = 0), 100 < a && (a = 100), t.setLineWidth(e.lineWidth), t.setStrokeStyle(this.data.bgColor), 
            t.setLineCap("round"), t.beginPath(), t.arc(e.center, e.center, e.r, 0, 2 * Math.PI, !1), 
            t.stroke(), t.setLineWidth(e.lineWidth2), t.setStrokeStyle(this.data.progressColor), 
            t.setLineCap("round"), t.beginPath(), a /= 100, t.arc(e.center, e.center, e.r, 0 * Math.PI, 2 * a * Math.PI, !1), 
            t.stroke(), t.setFillStyle(this.data.fontColor), t.setFontSize(this.data.fontSize), 
            t.setTextAlign("center"), t.setTextBaseline("middle"), t.fillText(Math.round(100 * a) + "%", e.center, e.center), 
            t.draw();
        }
    }
});