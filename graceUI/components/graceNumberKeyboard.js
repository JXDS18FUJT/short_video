Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        doneBtnName: {
            type: String,
            value: "完成"
        },
        isPoint: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        inputNow: function(e) {
            var t = e.currentTarget.dataset.keynumber;
            this.triggerEvent("keyboardInput", t);
        },
        deleteNow: function() {
            this.triggerEvent("keyboardDelete");
        },
        done: function() {
            this.triggerEvent("keyboardDone");
        }
    }
});