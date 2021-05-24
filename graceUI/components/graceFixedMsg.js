Component({
    properties: {
        msg: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#008CFF"
        },
        width: {
            type: Number,
            value: 300
        },
        bottom: {
            type: Number,
            value: 80
        },
        show: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        tapme: function() {
            this.triggerEvent("tapme");
        }
    }
});