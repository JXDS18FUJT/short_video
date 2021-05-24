Component({
    properties: {
        msgs: {
            type: Array,
            value: []
        },
        userid: {
            type: String,
            value: "-1"
        }
    },
    data: {
        player: null,
        playIndex: -1
    },
    created: function() {
        var e = this;
        this.setData({
            player: wx.getBackgroundAudioManager()
        }), this.data.player.onPlay(function() {}), this.data.player.onEnded(function() {
            var a = e.data.playIndex;
            e.setData({
                playIndex: -1
            });
            for (var t = a + 1; t < e.data.msgs.length; t++) if (3 == e.data.msgs[t].ctype) {
                e.playNow(e.data.msgs[t].msg, t);
                break;
            }
        });
    },
    methods: {
        playVoice: function(a) {
            var t = a.currentTarget.dataset.voice, e = a.currentTarget.dataset.index;
            if (-1 == this.data.playIndex) return this.playNow(t, e);
            var s = this;
            this.data.playIndex == e ? wx.getBackgroundAudioPlayerState({
                success: function(a) {
                    switch (a.status) {
                      case 0:
                        s.data.player.play();
                        break;

                      case 1:
                        s.data.player.pause();
                        break;

                      default:
                        s.data.player.play();
                    }
                }
            }) : (this.data.player.stop(), this.playNow(t, e));
        },
        playNow: function(a, t) {
            return this.setData({
                playIndex: t
            }), this.data.player.src = a, this.data.player.title = "graceUI", this.data.player.play(), 
            !0;
        },
        showImgs: function(a) {
            for (var t = [], e = "", s = a.currentTarget.dataset.index, r = 0; r < this.data.msgs.length; r++) 2 == this.data.msgs[r].ctype && (t.push(this.data.msgs[r].msg), 
            s == r && (e = this.data.msgs[r].msg));
            wx.previewImage({
                urls: t,
                current: e
            });
        }
    }
});