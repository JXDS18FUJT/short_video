module.exports = {
    info: function() {
        try {
            var e = wx.getSystemInfoSync();
            return e.rpx2px = e.windowWidth / 750, e.model = e.model.replace(" ", ""), -1 != e.model.indexOf("iPhoneX") || -1 != e.model.indexOf("iPhone X") ? (e.iphonexbottomheightrpx = 50, 
            e.iphonexbottomheightpx = 50 * e.rpx2px) : (e.iphonexbottomheightrpx = 0, e.iphonexbottomheightpx = 0), 
            e;
        } catch (e) {
            return null;
        }
    }
};