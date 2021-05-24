module.exports = {
    random: function(r, t) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * r + 1, 10);

          case 2:
            return parseInt(Math.random() * (t - r + 1) + r, 10);

          default:
            return 0;
        }
    },
    uuid: function(r, t) {
        var n, e, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), o = [];
        if (t = t || a.length, r) for (n = 0; n < r; n++) o[n] = a[0 | Math.random() * t]; else for (o[8] = o[13] = o[18] = o[23] = "-", 
        o[14] = "4", n = 0; n < 36; n++) o[n] || (e = 0 | 16 * Math.random(), o[n] = a[19 == n ? 3 & e | 8 : e]);
        return o.join("");
    }
};