var graceLazyWinHeight = 500, graceLazyTimer = null;

module.exports = {
    load: function(t, i) {
        null != graceLazyTimer && clearTimeout(graceLazyTimer), graceLazyTimer = setTimeout(function() {
            wx.getSystemInfo({
                success: function(e) {
                    graceLazyWinHeight = e.windowHeight, wx.createSelectorQuery().selectAll(".grace-img-lazy").fields({
                        rect: !0
                    }, function(e) {
                        for (var a = 0; a < e.length && e[a].bottom <= graceLazyWinHeight + t; a++) i.data.isShow[a] = !0;
                        i.setData({
                            isShow: i.data.isShow
                        });
                    }).exec();
                }
            });
        }, 100);
    }
};