module.exports = {
    get: function(t, n, o) {
        wx.request({
            url: t,
            data: n,
            method: "GET",
            dataType: "json",
            success: function(t) {
                o(t.data);
            },
            fail: function() {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            }
        });
    },
    post: function(t, n, o, e, a) {
        switch (o) {
          case "form":
            var s = {
                "content-type": "application/x-www-form-urlencoded"
            };
            break;

          case "json":
            s = {
                "content-type": "application/json"
            };
            break;

          default:
            s = {
                "content-type": "application/json"
            };
        }
        for (var c in e) s[c] = e[c];
        wx.request({
            url: t,
            data: n,
            method: "POST",
            dataType: "json",
            header: s,
            success: function(t) {
                a(t.data);
            },
            fail: function() {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            }
        });
    }
};