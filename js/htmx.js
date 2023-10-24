'use strict';
export default {};
export class HTMX {
    constructor() { }
    /**
     *
     * @param t
     * @param c
     * @param p
     * @returns
     */
    before(t, c, ...p) {
        const $t = Helpers.getTarget(t);
        $t.addEventListener("htmx:beforeRequest", (evt) => {
            c(evt, p);
        });
        return this;
    }
    /**
     *
     * @param t
     * @param c
     * @param p
     * @returns
     */
    after(t, c, ...p) {
        const $t = Helpers.getTarget(t);
        $t.addEventListener("htmx:afterRequest", (evt) => {
            c(evt, p);
        });
        return this;
    }
    /**
     *
     * @param t
     * @param p
     * @returns
     */
    config(t, ...p) {
        const $t = Helpers.getTarget(t);
        $t.addEventListener("htmx:configRequest", (evt) => {
            for (let i = 0; i < p.length; i++) {
                evt.detail.parameters[p[i]] = evt.detail.target.getAttribute("data-" + p[i]);
            }
        });
        return this;
    }
    /**
     *
     * @param t
     * @param c
     * @param p
     * @returns
     */
    hide(t, c, ...p) {
        this.before(t, (evt) => {
            evt.detail.target.addClass("hide");
            if (typeof c === "function")
                c(evt, ...p);
        });
        return this;
    }
    /**
     *
     * @param t
     * @param c
     * @param p
     * @returns
     */
    show(t, c, ...p) {
        this.after(t, (evt) => {
            evt.detail.target.removeClass("hide");
            if (typeof c === "function")
                c(evt, ...p);
        });
        return this;
    }
    /**
     *
     * @param evt
     * @param key
     * @param detail
     * @returns
     */
    static getData(evt, key, detail = true) {
        var _a, _b;
        if (detail)
            return (_a = evt.detail.target.dataset) === null || _a === void 0 ? void 0 : _a[key];
        return (_b = evt.target.dataset) === null || _b === void 0 ? void 0 : _b[key];
    }
    /**
     *
     * @param evt
     * @param key
     * @param val
     * @param detail
     */
    static setData(evt, key, val, detail = true) {
        if (detail)
            evt.detail.target.dataset[key] = val;
        else
            evt.target.dataset[key] = val;
    }
}
export class Helpers {
    /**
     *
     * @param s
     * @returns boolean
     */
    static isID(s) {
        const regex = /^#([a-zA-Z_$][a-zA-Z\d_$]*)$/;
        return regex.test(s);
    }
    /**
     *
     * @param t
     * @returns
     */
    static getNode(t) {
        if (Helpers.isID(t)) {
            return document.querySelector(t);
        }
        else {
            return document.querySelectorAll(t);
        }
    }
    /**
     *
     * @param t
     * @returns
     */
    static getTarget(t) {
        return (t == null || t === undefined ? document : Helpers.getNode(t));
    }
    /**
     *
     * @param s
     * @returns
     */
    static ToBool(s) {
        switch (s) {
            case true:
            case "TRUE":
            case "true":
            case "yes":
            case "1":
                return true;
            default:
                return false;
        }
    }
}
HTMLElement.prototype.hasClass = function (c) {
    if (this.classList) {
        return this.classList.contains(c);
    }
    return !!this.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
};
HTMLElement.prototype.addClass = function (c) {
    if (this.classList) {
        this.classList.add(c);
    }
    else {
        if (!this.hasClass(c)) {
            this.className += c;
        }
    }
};
HTMLElement.prototype.removeClass = function (c) {
    if (this.classList) {
        this.classList.remove(c);
    }
    else {
        if (this.hasClass(c)) {
            var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
            this.className = this.className.replace(reg, ' ');
        }
    }
};
//# sourceMappingURL=htmx.js.map