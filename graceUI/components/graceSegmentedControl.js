Component({
    properties: {
        items: {
            type: Array,
            value: new Array()
        },
        height: {
            type: String,
            value: "60rpx"
        },
        bgColor: {
            type: String,
            default: "#F8F8F8"
        },
        color: {
            type: String,
            value: "#3688FF"
        },
        fontSize: {
            type: String,
            value: "26rpx"
        },
        current: {
            type: Number,
            value: 0
        }
    },
    methods: {
        changeSC: function(e) {
            this.triggerEvent("change", Number(e.currentTarget.dataset.index));
        }
    }
});