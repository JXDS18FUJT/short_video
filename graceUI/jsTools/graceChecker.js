module.exports = {
    error: "",
    check: function(r, e) {
        for (var t = 0; t < e.length; t++) {
            if (!e[t].checkType) return !0;
            if (!e[t].name) return !0;
            if (!e[t].errorMsg) return !0;
            if (!r[e[t].name] || "" == r[e[t].name]) return this.error = e[t].errorMsg, !1;
            switch ("string" == typeof r[e[t].name] && (r[e[t].name] = r[e[t].name].replace(/\s/g, "")), 
            e[t].checkType) {
              case "string":
                if (!new RegExp("^.{" + e[t].checkRule + "}$").test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "int":
                var s = e[t].checkRule.split(",");
                if (e.length < 2 ? (s[0] = Number(s[0]) - 1, s[1] = "") : (s[0] = Number(s[0]) - 1, 
                s[1] = Number(s[1]) - 1), !new RegExp("^(-[1-9]|[1-9])[0-9]{" + s[0] + "," + s[1] + "}$").test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "between":
                if (!this.isNumber(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                if ((n = e[t].checkRule.split(","))[0] = Number(n[0]), n[1] = Number(n[1]), r[e[t].name] > n[1] || r[e[t].name] < n[0]) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "betweenD":
                if (!/^-?\d+$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                if ((n = e[t].checkRule.split(","))[0] = Number(n[0]), n[1] = Number(n[1]), r[e[t].name] > n[1] || r[e[t].name] < n[0]) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "betweenF":
                var n;
                if (!/^-?[0-9][0-9]?.+[0-9]+$/.test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                if ((n = e[t].checkRule.split(","))[0] = Number(n[0]), n[1] = Number(n[1]), r[e[t].name] > n[1] || r[e[t].name] < n[0]) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "same":
                if (r[e[t].name] != e[t].checkRule) return this.error = e[t].errorMsg, !1;
                break;

              case "notsame":
                if (r[e[t].name] == e[t].checkRule) return this.error = e[t].errorMsg, !1;
                break;

              case "email":
                if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "phoneno":
                if (!/^1[0-9]{10,10}$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                break;

              case "zipcode":
                if (!/^[0-9]{6}$/.test(r[e[t].name])) return this.error = e[t].errorMsg, !1;
                break;

              case "reg":
                if (!new RegExp(e[t].checkRule).test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "in":
                if (-1 == e[t].checkRule.indexOf(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "notnull":
                if (null == r[e[t].name] || r[e[t].name].length < 1) return this.error = e[t].errorMsg, 
                !1;
                break;

              case "samewith":
                if (r[e[t].name] != r[e[t].checkRule]) return this.error = e[t].errorMsg, !1;
                break;

              case "numbers":
                if (!new RegExp("^[0-9]{" + e[t].checkRule + "}$").test(r[e[t].name])) return this.error = e[t].errorMsg, 
                !1;
            }
        }
        return !0;
    },
    isNumber: function(r) {
        return NaN != (r = Number(r));
    }
};