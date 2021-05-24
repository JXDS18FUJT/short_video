Component({
    properties: {},
    data: {
        recShow: !1,
        recTxt: "请点击绿色按钮开始录音",
        inputMsg: "",
        recorderManager: null,
        recing: !1,
        tmpVoice: null,
        voiceLen: 0
    },
    created: function() {
        var a = this;
        this.setData({
            recorderManager: wx.getRecorderManager()
        }), this.data.recorderManager.onStop(function(e) {
            var t = Math.round(e.duration / 1e3);
            a.setData({
                tmpVoice: e.tempFilePath,
                voiceLen: t
            }), a.setData({
                recTxt: "待发送录音 : " + t + " 秒"
            });
        }), this.data.recorderManager.onError(function() {
            wx.showToast({
                title: "录音失败",
                icon: "none"
            }), a.setData({
                recing: !1
            });
        });
    },
    methods: {
        rec: function() {
            this.data.recing ? (this.data.recorderManager.stop(), this.setData({
                recing: !1
            })) : (this.data.recorderManager.start({
                duration: 6e4,
                format: "mp3"
            }), this.setData({
                recing: !0,
                voiceLen: 0,
                recTxt: "... 正在录音 ..."
            }));
        },
        sendVoiceMsg: function() {
            this.data.voiceLen < 1 ? wx.showToast({
                title: "请先录制一段语音",
                icon: "none"
            }) : (this.triggerEvent("sendVoiceMsg", [ this.data.tmpVoice, this.data.voiceLen ]), 
            this.setData({
                voiceLen: 0,
                recShow: !1
            }));
        },
        showRec: function() {
            this.setData({
                recShow: !0
            });
        },
        closeRec: function() {
            this.setData({
                recShow: !1
            });
        },
        sendTextMsg: function(e) {
            var t = e.detail.value;
            if (t.length < 1) return !1;
            this.setData({
                inputMsg: ""
            }), this.triggerEvent("sendTextMsg", t);
        },
        chooseImg: function() {
            var t = this;
            wx.showLoading({}), wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    t.triggerEvent("sendImgMsg", e.tempFilePaths[0]);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        }
    }
});