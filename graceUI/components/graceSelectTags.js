Array.prototype.indexOf = function(t) {
    for (var a = 0; a < this.length; a++) if (this[a] == t) return a;
    return -1;
}, Component({
    properties: {
        itemWidth: {
            type: String,
            value: "200rpx"
        },
        type: {
            type: String,
            value: ""
        },
        items: {
            type: Array,
            value: []
        },
        fontSize: {
            type: String,
            value: "26rpx"
        },
        selectedColor: {
            type: String,
            value: "#3688FF"
        }
    },
    data: {
        tagsData: []
    },
    ready: function() {
        this.setData({
            tagsData: this.data.items
        });
    },
    methods: {
        graceSelectChange: function(t) {
            if (t.currentTarget && (t = t.currentTarget.dataset.index), "radio" == this.data.type) {
                for (var a = 0; a < this.data.tagsData.length; a++) this.data.tagsData[a].checked = !1;
                this.data.tagsData[t].checked = !0, this.setData({
                    tagsData: this.data.tagsData
                }), this.triggerEvent("change", this.data.tagsData[t].value);
            } else {
                this.data.tagsData[t].checked ? this.data.tagsData[t].checked = !1 : this.data.tagsData[t].checked = !0, 
                this.setData({
                    tagsData: this.data.tagsData
                });
                var e = [];
                for (a = 0; a < this.data.tagsData.length; a++) this.data.tagsData[a].checked && e.push(this.data.tagsData[a].value);
                this.triggerEvent("change", e);
            }
        }
    }
});