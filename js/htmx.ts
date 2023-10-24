'use strict';
export default {}
export class HTMX {
    constructor() {}
    /**
     * 
     * @param t 
     * @param c 
     * @param p 
     * @returns 
     */
    before(t:string, c:any, ...p:any[]) {
        const $t:any = Helpers.getTarget(t)
        $t.addEventListener("htmx:beforeRequest", (evt:any)=>{
            c(evt,p)
        });
        
        return this
    }
    /**
     * 
     * @param t 
     * @param c 
     * @param p 
     * @returns 
     */
    after(t:string, c:any, ...p:any[]) {
        const $t:any = Helpers.getTarget(t)
        $t.addEventListener("htmx:afterRequest", (evt:any)=>{
            c(evt, p)
        });
        
        return this
    }
    /**
     * 
     * @param t 
     * @param p 
     * @returns 
     */
    config(t:string, ...p:any[]) {
        const $t:any = Helpers.getTarget(t);
        $t.addEventListener("htmx:configRequest", (evt:any)=>{
            for(let i=0;i<p.length;i++){
                evt.detail.parameters[p[i]] = evt.detail.target.getAttribute("data-" + p[i])
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
    hide(t:string, c:any, ...p:any[]){
        this.before(t, (evt:any)=>{
            evt.detail.target.addClass("hide")
            if(typeof c === "function") c(evt,...p)
        })
        return this
    }
    /**
     * 
     * @param t 
     * @param c 
     * @param p 
     * @returns 
     */
    show(t:string, c:any, ...p:any[]) {
        this.after(t, (evt:any)=>{
            evt.detail.target.removeClass("hide")
            if(typeof c === "function") c(evt,...p)
        })
        return this
    }
    /**
     * 
     * @param evt 
     * @param key 
     * @param detail 
     * @returns 
     */
    static getData(evt:any, key:string, detail:boolean = true)
    {
        if(detail) return evt.detail.target.dataset?.[key]
        return evt.target.dataset?.[key]
    }
    /**
     * 
     * @param evt 
     * @param key 
     * @param val 
     * @param detail 
     */
    static setData(evt:any, key:string, val:any, detail:boolean = true)
    {
        if(detail) evt.detail.target.dataset[key] = val
        else evt.target.dataset[key] = val
    }
}
export class Helpers
{
    /**
     * 
     * @param s 
     * @returns boolean
     */
    static isID(s:string)
    {
        const regex = /^#([a-zA-Z_$][a-zA-Z\d_$]*)$/;
        return regex.test(s);
    }
    /**
     * 
     * @param t 
     * @returns 
     */
    static getNode(t:string)
    {
        if(Helpers.isID(t)){
            return document.querySelector(t)
        }else{
            return document.querySelectorAll(t)
        }
    }
    /**
     * 
     * @param t 
     * @returns 
     */
    static getTarget(t:string)
    {
        return (t == null || t === undefined ? document : Helpers.getNode(t))
    }
    /**
     * 
     * @param s 
     * @returns 
     */
    static ToBool(s:any)
    {
        switch(s){
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
declare global {
    interface HTMLElement {
        hasClass(c: string): boolean;
        addClass(c: string): void;
        removeClass(c: string): void;
    }
}

HTMLElement.prototype.hasClass = function(c) {
        if (this.classList) {
                return this.classList.contains(c);
        }
        return !!this.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
}
HTMLElement.prototype.addClass = function(c) {
    if (this.classList) {
        this.classList.add(c);
    }else{
        if (!this.hasClass(c)) {
            this.className += c;
        }
    }
}
HTMLElement.prototype.removeClass = function(c) {
    if (this.classList) {
        this.classList.remove(c);
    }else{
        if (this.hasClass(c)) {
            var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
            this.className=this.className.replace(reg, ' ');
        }
    }
}
