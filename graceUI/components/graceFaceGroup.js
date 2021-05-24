Component({
    properties: {
        items: {
            type: Array,
            value: []
        },
        size: {
            type: Number,
            value: 80
        },
        space: {
            type: Number,
            value: 60
        },
        borderWidth: {
            type: Number,
            value: 4
        },
        borderColor: {
            type: String,
            value: "#F5F5F5"
        },
        isAddBtn: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        addBtnClick: function() {
            this.triggerEvent("addBtnClicked");
        }
    }
});