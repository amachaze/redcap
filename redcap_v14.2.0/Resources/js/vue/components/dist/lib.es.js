var Ny = Object.defineProperty;
var Dy = (e, t, n) => t in e ? Ny(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pe = (e, t, n) => (Dy(e, typeof t != "symbol" ? t + "" : t, n), n), au = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Lo = (e, t, n) => (au(e, t, "read from private field"), n ? n.call(e) : t.get(e)), pr = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, iu = (e, t, n, s) => (au(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n);
var bh = (e, t, n) => (au(e, t, "access private method"), n);
function zs(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let o = 0; o < s.length; o++)
    n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const bt = {}.NODE_ENV !== "production" ? Object.freeze({}) : {}, Tr = {}.NODE_ENV !== "production" ? Object.freeze([]) : [], qt = () => {
}, bm = () => !1, Ay = /^on[^a-z]/, Wr = (e) => Ay.test(e), Al = (e) => e.startsWith("onUpdate:"), ht = Object.assign, Zd = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ry = Object.prototype.hasOwnProperty, Qe = (e, t) => Ry.call(e, t), ge = Array.isArray, Jo = (e) => Gr(e) === "[object Map]", rr = (e) => Gr(e) === "[object Set]", wh = (e) => Gr(e) === "[object Date]", Iy = (e) => Gr(e) === "[object RegExp]", Ie = (e) => typeof e == "function", xt = (e) => typeof e == "string", Qa = (e) => typeof e == "symbol", at = (e) => e !== null && typeof e == "object", dc = (e) => at(e) && Ie(e.then) && Ie(e.catch), wm = Object.prototype.toString, Gr = (e) => wm.call(e), qd = (e) => Gr(e).slice(8, -1), Em = (e) => Gr(e) === "[object Object]", ef = (e) => xt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ta = /* @__PURE__ */ zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Py = /* @__PURE__ */ zs(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), fc = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, My = /-(\w)/g, Nn = fc((e) => e.replace(My, (t, n) => n ? n.toUpperCase() : "")), Ly = /\B([A-Z])/g, kn = fc(
  (e) => e.replace(Ly, "-$1").toLowerCase()
), Co = fc(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), Rs = fc(
  (e) => e ? `on${Co(e)}` : ""
), Mr = (e, t) => !Object.is(e, t), po = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Rl = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Il = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Pl = (e) => {
  const t = xt(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Eh;
const Ml = () => Eh || (Eh = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), Vy = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console", Fy = /* @__PURE__ */ zs(Vy);
function ps(e) {
  if (ge(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = xt(s) ? By(s) : ps(s);
      if (o)
        for (const a in o)
          t[a] = o[a];
    }
    return t;
  } else {
    if (xt(e))
      return e;
    if (at(e))
      return e;
  }
}
const Uy = /;(?![^(]*\))/g, jy = /:([^]+)/, Hy = /\/\*[^]*?\*\//g;
function By(e) {
  const t = {};
  return e.replace(Hy, "").split(Uy).forEach((n) => {
    if (n) {
      const s = n.split(jy);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ne(e) {
  let t = "";
  if (xt(e))
    t = e;
  else if (ge(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ne(e[n]);
      s && (t += s + " ");
    }
  else if (at(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function yn(e) {
  if (!e)
    return null;
  let { class: t, style: n } = e;
  return t && !xt(t) && (e.class = Ne(t)), n && (e.style = ps(n)), e;
}
const Yy = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Wy = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Gy = /* @__PURE__ */ zs(Yy), zy = /* @__PURE__ */ zs(Wy), Ky = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Jy = /* @__PURE__ */ zs(Ky);
function Sm(e) {
  return !!e || e === "";
}
function Xy(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = Oo(e[s], t[s]);
  return n;
}
function Oo(e, t) {
  if (e === t)
    return !0;
  let n = wh(e), s = wh(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Qa(e), s = Qa(t), n || s)
    return e === t;
  if (n = ge(e), s = ge(t), n || s)
    return n && s ? Xy(e, t) : !1;
  if (n = at(e), s = at(t), n || s) {
    if (!n || !s)
      return !1;
    const o = Object.keys(e).length, a = Object.keys(t).length;
    if (o !== a)
      return !1;
    for (const r in e) {
      const i = e.hasOwnProperty(r), l = t.hasOwnProperty(r);
      if (i && !l || !i && l || !Oo(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function hc(e, t) {
  return e.findIndex((n) => Oo(n, t));
}
const j = (e) => xt(e) ? e : e == null ? "" : ge(e) || at(e) && (e.toString === wm || !Ie(e.toString)) ? JSON.stringify(e, xm, 2) : String(e), xm = (e, t) => t && t.__v_isRef ? xm(e, t.value) : Jo(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, o]) => (n[`${s} =>`] = o, n), {})
} : rr(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : at(t) && !ge(t) && !Em(t) ? String(t) : t;
function Ll(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Mn;
class tf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Mn, !t && Mn && (this.index = (Mn.scopes || (Mn.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Mn;
      try {
        return Mn = this, t();
      } finally {
        Mn = n;
      }
    } else
      ({}).NODE_ENV !== "production" && Ll("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Mn = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Mn = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Qy(e) {
  return new tf(e);
}
function $m(e, t = Mn) {
  t && t.active && t.effects.push(e);
}
function Cm() {
  return Mn;
}
function Zy(e) {
  Mn ? Mn.cleanups.push(e) : {}.NODE_ENV !== "production" && Ll(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
const Za = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Om = (e) => (e.w & ko) > 0, km = (e) => (e.n & ko) > 0, qy = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ko;
}, eb = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      Om(o) && !km(o) ? o.delete(e) : t[n++] = o, o.w &= ~ko, o.n &= ~ko;
    }
    t.length = n;
  }
}, Vl = /* @__PURE__ */ new WeakMap();
let ba = 0, ko = 1;
const Ju = 30;
let gn;
const Xo = Symbol({}.NODE_ENV !== "production" ? "iterate" : ""), Xu = Symbol({}.NODE_ENV !== "production" ? "Map key iterate" : "");
class vi {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, $m(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = gn, n = bo;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = gn, gn = this, bo = !0, ko = 1 << ++ba, ba <= Ju ? qy(this) : Sh(this), this.fn();
    } finally {
      ba <= Ju && eb(this), ko = 1 << --ba, gn = this.parent, bo = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    gn === this ? this.deferStop = !0 : this.active && (Sh(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Sh(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
function tb(e, t) {
  e.effect && (e = e.effect.fn);
  const n = new vi(e);
  t && (ht(n, t), t.scope && $m(n, t.scope)), (!t || !t.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function nb(e) {
  e.effect.stop();
}
let bo = !0;
const Tm = [];
function ar() {
  Tm.push(bo), bo = !1;
}
function ir() {
  const e = Tm.pop();
  bo = e === void 0 ? !0 : e;
}
function en(e, t, n) {
  if (bo && gn) {
    let s = Vl.get(e);
    s || Vl.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || s.set(n, o = Za());
    const a = {}.NODE_ENV !== "production" ? { effect: gn, target: e, type: t, key: n } : void 0;
    Qu(o, a);
  }
}
function Qu(e, t) {
  let n = !1;
  ba <= Ju ? km(e) || (e.n |= ko, n = !Om(e)) : n = !e.has(gn), n && (e.add(gn), gn.deps.push(e), {}.NODE_ENV !== "production" && gn.onTrack && gn.onTrack(
    ht(
      {
        effect: gn
      },
      t
    )
  ));
}
function vs(e, t, n, s, o, a) {
  const r = Vl.get(e);
  if (!r)
    return;
  let i = [];
  if (t === "clear")
    i = [...r.values()];
  else if (n === "length" && ge(e)) {
    const c = Number(s);
    r.forEach((f, d) => {
      (d === "length" || d >= c) && i.push(f);
    });
  } else
    switch (n !== void 0 && i.push(r.get(n)), t) {
      case "add":
        ge(e) ? ef(n) && i.push(r.get("length")) : (i.push(r.get(Xo)), Jo(e) && i.push(r.get(Xu)));
        break;
      case "delete":
        ge(e) || (i.push(r.get(Xo)), Jo(e) && i.push(r.get(Xu)));
        break;
      case "set":
        Jo(e) && i.push(r.get(Xo));
        break;
    }
  const l = {}.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: o, oldTarget: a } : void 0;
  if (i.length === 1)
    i[0] && ({}.NODE_ENV !== "production" ? $r(i[0], l) : $r(i[0]));
  else {
    const c = [];
    for (const f of i)
      f && c.push(...f);
    ({}).NODE_ENV !== "production" ? $r(Za(c), l) : $r(Za(c));
  }
}
function $r(e, t) {
  const n = ge(e) ? e : [...e];
  for (const s of n)
    s.computed && xh(s, t);
  for (const s of n)
    s.computed || xh(s, t);
}
function xh(e, t) {
  (e !== gn || e.allowRecurse) && ({}.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(ht({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
function sb(e, t) {
  var n;
  return (n = Vl.get(e)) == null ? void 0 : n.get(t);
}
const ob = /* @__PURE__ */ zs("__proto__,__v_isRef,__isVue"), Nm = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qa)
), rb = /* @__PURE__ */ pc(), ab = /* @__PURE__ */ pc(!1, !0), ib = /* @__PURE__ */ pc(!0), lb = /* @__PURE__ */ pc(!0, !0), $h = /* @__PURE__ */ cb();
function cb() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = Ue(this);
      for (let a = 0, r = this.length; a < r; a++)
        en(s, "get", a + "");
      const o = s[t](...n);
      return o === -1 || o === !1 ? s[t](...n.map(Ue)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ar();
      const s = Ue(this)[t].apply(this, n);
      return ir(), s;
    };
  }), e;
}
function ub(e) {
  const t = Ue(this);
  return en(t, "has", e), t.hasOwnProperty(e);
}
function pc(e = !1, t = !1) {
  return function(s, o, a) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && a === (e ? t ? Vm : Lm : t ? Mm : Pm).get(s))
      return s;
    const r = ge(s);
    if (!e) {
      if (r && Qe($h, o))
        return Reflect.get($h, o, a);
      if (o === "hasOwnProperty")
        return ub;
    }
    const i = Reflect.get(s, o, a);
    return (Qa(o) ? Nm.has(o) : ob(o)) || (e || en(s, "get", o), t) ? i : Vt(i) ? r && ef(o) ? i : i.value : at(i) ? e ? of(i) : wt(i) : i;
  };
}
const db = /* @__PURE__ */ Dm(), fb = /* @__PURE__ */ Dm(!0);
function Dm(e = !1) {
  return function(n, s, o, a) {
    let r = n[s];
    if (Bs(r) && Vt(r) && !Vt(o))
      return !1;
    if (!e && (!qa(o) && !Bs(o) && (r = Ue(r), o = Ue(o)), !ge(n) && Vt(r) && !Vt(o)))
      return r.value = o, !0;
    const i = ge(n) && ef(s) ? Number(s) < n.length : Qe(n, s), l = Reflect.set(n, s, o, a);
    return n === Ue(a) && (i ? Mr(o, r) && vs(n, "set", s, o, r) : vs(n, "add", s, o)), l;
  };
}
function hb(e, t) {
  const n = Qe(e, t), s = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && vs(e, "delete", t, void 0, s), o;
}
function pb(e, t) {
  const n = Reflect.has(e, t);
  return (!Qa(t) || !Nm.has(t)) && en(e, "has", t), n;
}
function mb(e) {
  return en(e, "iterate", ge(e) ? "length" : Xo), Reflect.ownKeys(e);
}
const Am = {
  get: rb,
  set: db,
  deleteProperty: hb,
  has: pb,
  ownKeys: mb
}, Rm = {
  get: ib,
  set(e, t) {
    return {}.NODE_ENV !== "production" && Ll(
      `Set operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  },
  deleteProperty(e, t) {
    return {}.NODE_ENV !== "production" && Ll(
      `Delete operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  }
}, _b = /* @__PURE__ */ ht(
  {},
  Am,
  {
    get: ab,
    set: fb
  }
), vb = /* @__PURE__ */ ht(
  {},
  Rm,
  {
    get: lb
  }
), nf = (e) => e, mc = (e) => Reflect.getPrototypeOf(e);
function zi(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = Ue(e), a = Ue(t);
  n || (t !== a && en(o, "get", t), en(o, "get", a));
  const { has: r } = mc(o), i = s ? nf : n ? af : ti;
  if (r.call(o, t))
    return i(e.get(t));
  if (r.call(o, a))
    return i(e.get(a));
  e !== o && e.get(t);
}
function Ki(e, t = !1) {
  const n = this.__v_raw, s = Ue(n), o = Ue(e);
  return t || (e !== o && en(s, "has", e), en(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function Ji(e, t = !1) {
  return e = e.__v_raw, !t && en(Ue(e), "iterate", Xo), Reflect.get(e, "size", e);
}
function Ch(e) {
  e = Ue(e);
  const t = Ue(this);
  return mc(t).has.call(t, e) || (t.add(e), vs(t, "add", e, e)), this;
}
function Oh(e, t) {
  t = Ue(t);
  const n = Ue(this), { has: s, get: o } = mc(n);
  let a = s.call(n, e);
  a ? {}.NODE_ENV !== "production" && Im(n, s, e) : (e = Ue(e), a = s.call(n, e));
  const r = o.call(n, e);
  return n.set(e, t), a ? Mr(t, r) && vs(n, "set", e, t, r) : vs(n, "add", e, t), this;
}
function kh(e) {
  const t = Ue(this), { has: n, get: s } = mc(t);
  let o = n.call(t, e);
  o ? {}.NODE_ENV !== "production" && Im(t, n, e) : (e = Ue(e), o = n.call(t, e));
  const a = s ? s.call(t, e) : void 0, r = t.delete(e);
  return o && vs(t, "delete", e, void 0, a), r;
}
function Th() {
  const e = Ue(this), t = e.size !== 0, n = {}.NODE_ENV !== "production" ? Jo(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && vs(e, "clear", void 0, void 0, n), s;
}
function Xi(e, t) {
  return function(s, o) {
    const a = this, r = a.__v_raw, i = Ue(r), l = t ? nf : e ? af : ti;
    return !e && en(i, "iterate", Xo), r.forEach((c, f) => s.call(o, l(c), l(f), a));
  };
}
function Qi(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, a = Ue(o), r = Jo(a), i = e === "entries" || e === Symbol.iterator && r, l = e === "keys" && r, c = o[e](...s), f = n ? nf : t ? af : ti;
    return !t && en(
      a,
      "iterate",
      l ? Xu : Xo
    ), {
      // iterator protocol
      next() {
        const { value: d, done: h } = c.next();
        return h ? { value: d, done: h } : {
          value: i ? [f(d[0]), f(d[1])] : f(d),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function no(e) {
  return function(...t) {
    if ({}.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${Co(e)} operation ${n}failed: target is readonly.`,
        Ue(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function gb() {
  const e = {
    get(a) {
      return zi(this, a);
    },
    get size() {
      return Ji(this);
    },
    has: Ki,
    add: Ch,
    set: Oh,
    delete: kh,
    clear: Th,
    forEach: Xi(!1, !1)
  }, t = {
    get(a) {
      return zi(this, a, !1, !0);
    },
    get size() {
      return Ji(this);
    },
    has: Ki,
    add: Ch,
    set: Oh,
    delete: kh,
    clear: Th,
    forEach: Xi(!1, !0)
  }, n = {
    get(a) {
      return zi(this, a, !0);
    },
    get size() {
      return Ji(this, !0);
    },
    has(a) {
      return Ki.call(this, a, !0);
    },
    add: no("add"),
    set: no("set"),
    delete: no("delete"),
    clear: no("clear"),
    forEach: Xi(!0, !1)
  }, s = {
    get(a) {
      return zi(this, a, !0, !0);
    },
    get size() {
      return Ji(this, !0);
    },
    has(a) {
      return Ki.call(this, a, !0);
    },
    add: no("add"),
    set: no("set"),
    delete: no("delete"),
    clear: no("clear"),
    forEach: Xi(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    e[a] = Qi(
      a,
      !1,
      !1
    ), n[a] = Qi(
      a,
      !0,
      !1
    ), t[a] = Qi(
      a,
      !1,
      !0
    ), s[a] = Qi(
      a,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  yb,
  bb,
  wb,
  Eb
] = /* @__PURE__ */ gb();
function _c(e, t) {
  const n = t ? e ? Eb : wb : e ? bb : yb;
  return (s, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    Qe(n, o) && o in s ? n : s,
    o,
    a
  );
}
const Sb = {
  get: /* @__PURE__ */ _c(!1, !1)
}, xb = {
  get: /* @__PURE__ */ _c(!1, !0)
}, $b = {
  get: /* @__PURE__ */ _c(!0, !1)
}, Cb = {
  get: /* @__PURE__ */ _c(!0, !0)
};
function Im(e, t, n) {
  const s = Ue(n);
  if (s !== n && t.call(e, s)) {
    const o = qd(e);
    console.warn(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pm = /* @__PURE__ */ new WeakMap(), Mm = /* @__PURE__ */ new WeakMap(), Lm = /* @__PURE__ */ new WeakMap(), Vm = /* @__PURE__ */ new WeakMap();
function Ob(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function kb(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ob(qd(e));
}
function wt(e) {
  return Bs(e) ? e : vc(
    e,
    !1,
    Am,
    Sb,
    Pm
  );
}
function sf(e) {
  return vc(
    e,
    !1,
    _b,
    xb,
    Mm
  );
}
function of(e) {
  return vc(
    e,
    !0,
    Rm,
    $b,
    Lm
  );
}
function Cr(e) {
  return vc(
    e,
    !0,
    vb,
    Cb,
    Vm
  );
}
function vc(e, t, n, s, o) {
  if (!at(e))
    return {}.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = o.get(e);
  if (a)
    return a;
  const r = kb(e);
  if (r === 0)
    return e;
  const i = new Proxy(
    e,
    r === 2 ? s : n
  );
  return o.set(e, i), i;
}
function wo(e) {
  return Bs(e) ? wo(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Bs(e) {
  return !!(e && e.__v_isReadonly);
}
function qa(e) {
  return !!(e && e.__v_isShallow);
}
function ei(e) {
  return wo(e) || Bs(e);
}
function Ue(e) {
  const t = e && e.__v_raw;
  return t ? Ue(t) : e;
}
function rf(e) {
  return Rl(e, "__v_skip", !0), e;
}
const ti = (e) => at(e) ? wt(e) : e, af = (e) => at(e) ? of(e) : e;
function lf(e) {
  bo && gn && (e = Ue(e), {}.NODE_ENV !== "production" ? Qu(e.dep || (e.dep = Za()), {
    target: e,
    type: "get",
    key: "value"
  }) : Qu(e.dep || (e.dep = Za())));
}
function gc(e, t) {
  e = Ue(e);
  const n = e.dep;
  n && ({}.NODE_ENV !== "production" ? $r(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : $r(n));
}
function Vt(e) {
  return !!(e && e.__v_isRef === !0);
}
function te(e) {
  return Um(e, !1);
}
function Fm(e) {
  return Um(e, !0);
}
function Um(e, t) {
  return Vt(e) ? e : new Tb(e, t);
}
class Tb {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : Ue(t), this._value = n ? t : ti(t);
  }
  get value() {
    return lf(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || qa(t) || Bs(t);
    t = n ? t : Ue(t), Mr(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ti(t), gc(this, t));
  }
}
function Nb(e) {
  gc(e, {}.NODE_ENV !== "production" ? e.value : void 0);
}
function G(e) {
  return Vt(e) ? e.value : e;
}
function Db(e) {
  return Ie(e) ? e() : G(e);
}
const Ab = {
  get: (e, t, n) => G(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return Vt(o) && !Vt(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function cf(e) {
  return wo(e) ? e : new Proxy(e, Ab);
}
class Rb {
  constructor(t) {
    this.dep = void 0, this.__v_isRef = !0;
    const { get: n, set: s } = t(
      () => lf(this),
      () => gc(this)
    );
    this._get = n, this._set = s;
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Ib(e) {
  return new Rb(e);
}
function $t(e) {
  ({}).NODE_ENV !== "production" && !ei(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = ge(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = jm(e, n);
  return t;
}
class Pb {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return sb(Ue(this._object), this._key);
  }
}
class Mb {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function Lb(e, t, n) {
  return Vt(e) ? e : Ie(e) ? new Mb(e) : at(e) && arguments.length > 1 ? jm(e, t, n) : te(e);
}
function jm(e, t, n) {
  const s = e[t];
  return Vt(s) ? s : new Pb(
    e,
    t,
    n
  );
}
class Vb {
  constructor(t, n, s, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new vi(t, () => {
      this._dirty || (this._dirty = !0, gc(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = s;
  }
  get value() {
    const t = Ue(this);
    return lf(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Fb(e, t, n = !1) {
  let s, o;
  const a = Ie(e);
  a ? (s = e, o = {}.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : qt) : (s = e.get, o = e.set);
  const r = new Vb(s, o, a || !o, n);
  return {}.NODE_ENV !== "production" && t && !n && (r.effect.onTrack = t.onTrack, r.effect.onTrigger = t.onTrigger), r;
}
const Qo = [];
function Na(e) {
  Qo.push(e);
}
function Da() {
  Qo.pop();
}
function X(e, ...t) {
  if ({}.NODE_ENV === "production")
    return;
  ar();
  const n = Qo.length ? Qo[Qo.length - 1].component : null, s = n && n.appContext.config.warnHandler, o = Ub();
  if (s)
    ms(
      s,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        o.map(
          ({ vnode: a }) => `at <${kc(n, a.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const a = [`[Vue warn]: ${e}`, ...t];
    o.length && a.push(`
`, ...jb(o)), console.warn(...a);
  }
  ir();
}
function Ub() {
  let e = Qo[Qo.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function jb(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Hb(n));
  }), t;
}
function Hb({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, o = ` at <${kc(
    e.component,
    e.type,
    s
  )}`, a = ">" + n;
  return e.props ? [o, ...Bb(e.props), a] : [o + a];
}
function Bb(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Hm(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Hm(e, t, n) {
  return xt(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Vt(t) ? (t = Hm(e, Ue(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : Ie(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Ue(t), n ? t : [`${e}=`, t]);
}
function uf(e, t) {
  ({}).NODE_ENV !== "production" && e !== void 0 && (typeof e != "number" ? X(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && X(`${t} is NaN - the duration expression might be incorrect.`));
}
const df = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function ms(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (a) {
    lr(a, t, n);
  }
  return o;
}
function Vn(e, t, n, s) {
  if (Ie(e)) {
    const a = ms(e, t, n, s);
    return a && dc(a) && a.catch((r) => {
      lr(r, t, n);
    }), a;
  }
  const o = [];
  for (let a = 0; a < e.length; a++)
    o.push(Vn(e[a], t, n, s));
  return o;
}
function lr(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let a = t.parent;
    const r = t.proxy, i = {}.NODE_ENV !== "production" ? df[n] : n;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let f = 0; f < c.length; f++)
          if (c[f](e, r, i) === !1)
            return;
      }
      a = a.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      ms(
        l,
        null,
        10,
        [e, r, i]
      );
      return;
    }
  }
  Yb(e, n, o, s);
}
function Yb(e, t, n, s = !0) {
  if ({}.NODE_ENV !== "production") {
    const o = df[t];
    if (n && Na(n), X(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Da(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ni = !1, Zu = !1;
const on = [];
let ds = 0;
const Nr = [];
let is = null, lo = 0;
const Bm = /* @__PURE__ */ Promise.resolve();
let ff = null;
const Wb = 100;
function yc(e) {
  const t = ff || Bm;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Gb(e) {
  let t = ds + 1, n = on.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    si(on[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function gi(e) {
  (!on.length || !on.includes(
    e,
    ni && e.allowRecurse ? ds + 1 : ds
  )) && (e.id == null ? on.push(e) : on.splice(Gb(e.id), 0, e), Ym());
}
function Ym() {
  !ni && !Zu && (Zu = !0, ff = Bm.then(Wm));
}
function zb(e) {
  const t = on.indexOf(e);
  t > ds && on.splice(t, 1);
}
function bc(e) {
  ge(e) ? Nr.push(...e) : (!is || !is.includes(
    e,
    e.allowRecurse ? lo + 1 : lo
  )) && Nr.push(e), Ym();
}
function Nh(e, t = ni ? ds + 1 : 0) {
  for ({}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < on.length; t++) {
    const n = on[t];
    if (n && n.pre) {
      if ({}.NODE_ENV !== "production" && hf(e, n))
        continue;
      on.splice(t, 1), t--, n();
    }
  }
}
function Fl(e) {
  if (Nr.length) {
    const t = [...new Set(Nr)];
    if (Nr.length = 0, is) {
      is.push(...t);
      return;
    }
    for (is = t, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), is.sort((n, s) => si(n) - si(s)), lo = 0; lo < is.length; lo++)
      ({}).NODE_ENV !== "production" && hf(e, is[lo]) || is[lo]();
    is = null, lo = 0;
  }
}
const si = (e) => e.id == null ? 1 / 0 : e.id, Kb = (e, t) => {
  const n = si(e) - si(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Wm(e) {
  Zu = !1, ni = !0, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), on.sort(Kb);
  const t = {}.NODE_ENV !== "production" ? (n) => hf(e, n) : qt;
  try {
    for (ds = 0; ds < on.length; ds++) {
      const n = on[ds];
      if (n && n.active !== !1) {
        if ({}.NODE_ENV !== "production" && t(n))
          continue;
        ms(n, null, 14);
      }
    }
  } finally {
    ds = 0, on.length = 0, Fl(e), ni = !1, ff = null, (on.length || Nr.length) && Wm(e);
  }
}
function hf(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Wb) {
      const s = t.ownerInstance, o = s && li(s.type);
      return X(
        `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let Eo = !1;
const Er = /* @__PURE__ */ new Set();
({}).NODE_ENV !== "production" && (Ml().__VUE_HMR_RUNTIME__ = {
  createRecord: lu(Gm),
  rerender: lu(Qb),
  reload: lu(Zb)
});
const nr = /* @__PURE__ */ new Map();
function Jb(e) {
  const t = e.type.__hmrId;
  let n = nr.get(t);
  n || (Gm(t, e.type), n = nr.get(t)), n.instances.add(e);
}
function Xb(e) {
  nr.get(e.type.__hmrId).instances.delete(e);
}
function Gm(e, t) {
  return nr.has(e) ? !1 : (nr.set(e, {
    initialDef: Aa(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Aa(e) {
  return L_(e) ? e.__vccOpts : e;
}
function Qb(e, t) {
  const n = nr.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Aa(s.type).render = t), s.renderCache = [], Eo = !0, s.update(), Eo = !1;
  }));
}
function Zb(e, t) {
  const n = nr.get(e);
  if (!n)
    return;
  t = Aa(t), Dh(n.initialDef, t);
  const s = [...n.instances];
  for (const o of s) {
    const a = Aa(o.type);
    Er.has(a) || (a !== n.initialDef && Dh(a, t), Er.add(a)), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (Er.add(a), o.ceReload(t.styles), Er.delete(a)) : o.parent ? gi(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  bc(() => {
    for (const o of s)
      Er.delete(
        Aa(o.type)
      );
  });
}
function Dh(e, t) {
  ht(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function lu(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let es, wa = [], qu = !1;
function yi(e, ...t) {
  es ? es.emit(e, ...t) : qu || wa.push({ event: e, args: t });
}
function pf(e, t) {
  var n, s;
  es = e, es ? (es.enabled = !0, wa.forEach(({ event: o, args: a }) => es.emit(o, ...a)), wa = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((a) => {
    pf(a, t);
  }), setTimeout(() => {
    es || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, qu = !0, wa = []);
  }, 3e3)) : (qu = !0, wa = []);
}
function qb(e, t) {
  yi("app:init", e, t, {
    Fragment: ne,
    Text: To,
    Comment: Ht,
    Static: So
  });
}
function e1(e) {
  yi("app:unmount", e);
}
const ed = /* @__PURE__ */ mf(
  "component:added"
  /* COMPONENT_ADDED */
), zm = /* @__PURE__ */ mf(
  "component:updated"
  /* COMPONENT_UPDATED */
), t1 = /* @__PURE__ */ mf(
  "component:removed"
  /* COMPONENT_REMOVED */
), n1 = (e) => {
  es && typeof es.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !es.cleanupBuffer(e) && t1(e);
};
function mf(e) {
  return (t) => {
    yi(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const s1 = /* @__PURE__ */ Km(
  "perf:start"
  /* PERFORMANCE_START */
), o1 = /* @__PURE__ */ Km(
  "perf:end"
  /* PERFORMANCE_END */
);
function Km(e) {
  return (t, n, s) => {
    yi(e, t.appContext.app, t.uid, t, n, s);
  };
}
function r1(e, t, n) {
  yi(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
function a1(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || bt;
  if ({}.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [d]
    } = e;
    if (f)
      if (!(t in f))
        (!d || !(Rs(t) in d)) && X(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Rs(t)}" prop.`
        );
      else {
        const h = f[t];
        Ie(h) && (h(...n) || X(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = n;
  const a = t.startsWith("update:"), r = a && t.slice(7);
  if (r && r in s) {
    const f = `${r === "modelValue" ? "model" : r}Modifiers`, { number: d, trim: h } = s[f] || bt;
    h && (o = n.map((p) => xt(p) ? p.trim() : p)), d && (o = n.map(Il));
  }
  if ({}.NODE_ENV !== "production" && r1(e, t, o), {}.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && s[Rs(f)] && X(
      `Event "${f}" is emitted in component ${kc(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${kn(t)}" instead of "${t}".`
    );
  }
  let i, l = s[i = Rs(t)] || // also try camelCase event handler (#2249)
  s[i = Rs(Nn(t))];
  !l && a && (l = s[i = Rs(kn(t))]), l && Vn(
    l,
    e,
    6,
    o
  );
  const c = s[i + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[i])
      return;
    e.emitted[i] = !0, Vn(
      c,
      e,
      6,
      o
    );
  }
}
function Jm(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const a = e.emits;
  let r = {}, i = !1;
  if (!Ie(e)) {
    const l = (c) => {
      const f = Jm(c, t, !0);
      f && (i = !0, ht(r, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !a && !i ? (at(e) && s.set(e, null), null) : (ge(a) ? a.forEach((l) => r[l] = null) : ht(r, a), at(e) && s.set(e, r), r);
}
function wc(e, t) {
  return !e || !Wr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Qe(e, t[0].toLowerCase() + t.slice(1)) || Qe(e, kn(t)) || Qe(e, t));
}
let jt = null, Ec = null;
function oi(e) {
  const t = jt;
  return jt = e, Ec = e && e.type.__scopeId || null, t;
}
function Ze(e) {
  Ec = e;
}
function qe() {
  Ec = null;
}
const i1 = (e) => K;
function K(e, t = jt, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && ld(-1);
    const a = oi(t);
    let r;
    try {
      r = e(...o);
    } finally {
      oi(a), s._d && ld(1);
    }
    return {}.NODE_ENV !== "production" && zm(t), r;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
let td = !1;
function Ul() {
  td = !0;
}
function _l(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: a,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: c,
    render: f,
    renderCache: d,
    data: h,
    setupState: p,
    ctx: m,
    inheritAttrs: _
  } = e;
  let y, g;
  const v = oi(e);
  ({}).NODE_ENV !== "production" && (td = !1);
  try {
    if (n.shapeFlag & 4) {
      const $ = o || s;
      y = On(
        f.call(
          $,
          $,
          d,
          a,
          p,
          h,
          m
        )
      ), g = l;
    } else {
      const $ = t;
      ({}).NODE_ENV !== "production" && l === a && Ul(), y = On(
        $.length > 1 ? $(
          a,
          {}.NODE_ENV !== "production" ? {
            get attrs() {
              return Ul(), l;
            },
            slots: i,
            emit: c
          } : { attrs: l, slots: i, emit: c }
        ) : $(
          a,
          null
          /* we know it doesn't need it */
        )
      ), g = t.props ? l : c1(l);
    }
  } catch ($) {
    Ma.length = 0, lr($, e, 1), y = T(Ht);
  }
  let S = y, w;
  if ({}.NODE_ENV !== "production" && y.patchFlag > 0 && y.patchFlag & 2048 && ([S, w] = l1(y)), g && _ !== !1) {
    const $ = Object.keys(g), { shapeFlag: C } = S;
    if ($.length) {
      if (C & 7)
        r && $.some(Al) && (g = u1(
          g,
          r
        )), S = Gn(S, g);
      else if ({}.NODE_ENV !== "production" && !td && S.type !== Ht) {
        const N = Object.keys(l), A = [], D = [];
        for (let F = 0, H = N.length; F < H; F++) {
          const P = N[F];
          Wr(P) ? Al(P) || A.push(P[2].toLowerCase() + P.slice(3)) : D.push(P);
        }
        D.length && X(
          `Extraneous non-props attributes (${D.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), A.length && X(
          `Extraneous non-emits event listeners (${A.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && ({}.NODE_ENV !== "production" && !Ah(S) && X(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), S = Gn(S), S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs), n.transition && ({}.NODE_ENV !== "production" && !Ah(S) && X(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), S.transition = n.transition), {}.NODE_ENV !== "production" && w ? w(S) : y = S, oi(v), y;
}
const l1 = (e) => {
  const t = e.children, n = e.dynamicChildren, s = _f(t);
  if (!s)
    return [e, void 0];
  const o = t.indexOf(s), a = n ? n.indexOf(s) : -1, r = (i) => {
    t[o] = i, n && (a > -1 ? n[a] = i : i.patchFlag > 0 && (e.dynamicChildren = [...n, i]));
  };
  return [On(s), r];
};
function _f(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    if (Ys(s)) {
      if (s.type !== Ht || s.children === "v-if") {
        if (t)
          return;
        t = s;
      }
    } else
      return;
  }
  return t;
}
const c1 = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Wr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, u1 = (e, t) => {
  const n = {};
  for (const s in e)
    (!Al(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
}, Ah = (e) => e.shapeFlag & 7 || e.type === Ht;
function d1(e, t, n) {
  const { props: s, children: o, component: a } = e, { props: r, children: i, patchFlag: l } = t, c = a.emitsOptions;
  if ({}.NODE_ENV !== "production" && (o || i) && Eo || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? Rh(s, r, c) : !!r;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        const h = f[d];
        if (r[h] !== s[h] && !wc(c, h))
          return !0;
      }
    }
  } else
    return (o || i) && (!i || !i.$stable) ? !0 : s === r ? !1 : s ? r ? Rh(s, r, c) : !0 : !!r;
  return !1;
}
function Rh(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    if (t[a] !== e[a] && !wc(n, a))
      return !0;
  }
  return !1;
}
function vf({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Xm = (e) => e.__isSuspense, f1 = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, n, s, o, a, r, i, l, c) {
    e == null ? p1(
      t,
      n,
      s,
      o,
      a,
      r,
      i,
      l,
      c
    ) : m1(
      e,
      t,
      n,
      s,
      o,
      r,
      i,
      l,
      c
    );
  },
  hydrate: _1,
  create: gf,
  normalize: v1
}, h1 = f1;
function ri(e, t) {
  const n = e.props && e.props[t];
  Ie(n) && n();
}
function p1(e, t, n, s, o, a, r, i, l) {
  const {
    p: c,
    o: { createElement: f }
  } = l, d = f("div"), h = e.suspense = gf(
    e,
    o,
    s,
    t,
    d,
    n,
    a,
    r,
    i,
    l
  );
  c(
    null,
    h.pendingBranch = e.ssContent,
    d,
    null,
    s,
    h,
    a,
    r
  ), h.deps > 0 ? (ri(e, "onPending"), ri(e, "onFallback"), c(
    null,
    e.ssFallback,
    t,
    n,
    s,
    null,
    // fallback tree will not have suspense context
    a,
    r
  ), Dr(h, e.ssFallback)) : h.resolve(!1, !0);
}
function m1(e, t, n, s, o, a, r, i, { p: l, um: c, o: { createElement: f } }) {
  const d = t.suspense = e.suspense;
  d.vnode = t, t.el = e.el;
  const h = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: _, isInFallback: y, isHydrating: g } = d;
  if (_)
    d.pendingBranch = h, ts(h, _) ? (l(
      _,
      h,
      d.hiddenContainer,
      null,
      o,
      d,
      a,
      r,
      i
    ), d.deps <= 0 ? d.resolve() : y && (l(
      m,
      p,
      n,
      s,
      o,
      null,
      // fallback tree will not have suspense context
      a,
      r,
      i
    ), Dr(d, p))) : (d.pendingId++, g ? (d.isHydrating = !1, d.activeBranch = _) : c(_, o, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = f("div"), y ? (l(
      null,
      h,
      d.hiddenContainer,
      null,
      o,
      d,
      a,
      r,
      i
    ), d.deps <= 0 ? d.resolve() : (l(
      m,
      p,
      n,
      s,
      o,
      null,
      // fallback tree will not have suspense context
      a,
      r,
      i
    ), Dr(d, p))) : m && ts(h, m) ? (l(
      m,
      h,
      n,
      s,
      o,
      d,
      a,
      r,
      i
    ), d.resolve(!0)) : (l(
      null,
      h,
      d.hiddenContainer,
      null,
      o,
      d,
      a,
      r,
      i
    ), d.deps <= 0 && d.resolve()));
  else if (m && ts(h, m))
    l(
      m,
      h,
      n,
      s,
      o,
      d,
      a,
      r,
      i
    ), Dr(d, h);
  else if (ri(t, "onPending"), d.pendingBranch = h, d.pendingId++, l(
    null,
    h,
    d.hiddenContainer,
    null,
    o,
    d,
    a,
    r,
    i
  ), d.deps <= 0)
    d.resolve();
  else {
    const { timeout: v, pendingId: S } = d;
    v > 0 ? setTimeout(() => {
      d.pendingId === S && d.fallback(p);
    }, v) : v === 0 && d.fallback(p);
  }
}
let Ih = !1;
function gf(e, t, n, s, o, a, r, i, l, c, f = !1) {
  ({}).NODE_ENV !== "production" && !Ih && (Ih = !0, console[console.info ? "info" : "log"](
    "<Suspense> is an experimental feature and its API will likely change."
  ));
  const {
    p: d,
    m: h,
    um: p,
    n: m,
    o: { parentNode: _, remove: y }
  } = c;
  let g;
  const v = g1(e);
  v && t != null && t.pendingBranch && (g = t.pendingId, t.deps++);
  const S = e.props ? Pl(e.props.timeout) : void 0;
  ({}).NODE_ENV !== "production" && uf(S, "Suspense timeout");
  const w = {
    vnode: e,
    parent: t,
    parentComponent: n,
    isSVG: r,
    container: s,
    hiddenContainer: o,
    anchor: a,
    deps: 0,
    pendingId: 0,
    timeout: typeof S == "number" ? S : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !0,
    isHydrating: f,
    isUnmounted: !1,
    effects: [],
    resolve($ = !1, C = !1) {
      if ({}.NODE_ENV !== "production") {
        if (!$ && !w.pendingBranch)
          throw new Error(
            "suspense.resolve() is called without a pending branch."
          );
        if (w.isUnmounted)
          throw new Error(
            "suspense.resolve() is called on an already unmounted suspense boundary."
          );
      }
      const {
        vnode: N,
        activeBranch: A,
        pendingBranch: D,
        pendingId: F,
        effects: H,
        parentComponent: P,
        container: I
      } = w;
      if (w.isHydrating)
        w.isHydrating = !1;
      else if (!$) {
        const Y = A && D.transition && D.transition.mode === "out-in";
        Y && (A.transition.afterLeave = () => {
          F === w.pendingId && h(D, I, z, 0);
        });
        let { anchor: z } = w;
        A && (z = m(A), p(A, P, w, !0)), Y || h(D, I, z, 0);
      }
      Dr(w, D), w.pendingBranch = null, w.isInFallback = !1;
      let V = w.parent, q = !1;
      for (; V; ) {
        if (V.pendingBranch) {
          V.effects.push(...H), q = !0;
          break;
        }
        V = V.parent;
      }
      q || bc(H), w.effects = [], v && t && t.pendingBranch && g === t.pendingId && (t.deps--, t.deps === 0 && !C && t.resolve()), ri(N, "onResolve");
    },
    fallback($) {
      if (!w.pendingBranch)
        return;
      const { vnode: C, activeBranch: N, parentComponent: A, container: D, isSVG: F } = w;
      ri(C, "onFallback");
      const H = m(N), P = () => {
        w.isInFallback && (d(
          null,
          $,
          D,
          H,
          A,
          null,
          // fallback tree will not have suspense context
          F,
          i,
          l
        ), Dr(w, $));
      }, I = $.transition && $.transition.mode === "out-in";
      I && (N.transition.afterLeave = P), w.isInFallback = !0, p(
        N,
        A,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), I || P();
    },
    move($, C, N) {
      w.activeBranch && h(w.activeBranch, $, C, N), w.container = $;
    },
    next() {
      return w.activeBranch && m(w.activeBranch);
    },
    registerDep($, C) {
      const N = !!w.pendingBranch;
      N && w.deps++;
      const A = $.vnode.el;
      $.asyncDep.catch((D) => {
        lr(D, $, 0);
      }).then((D) => {
        if ($.isUnmounted || w.isUnmounted || w.pendingId !== $.suspenseId)
          return;
        $.asyncResolved = !0;
        const { vnode: F } = $;
        ({}).NODE_ENV !== "production" && Na(F), dd($, D, !1), A && (F.el = A);
        const H = !A && $.subTree.el;
        C(
          $,
          F,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          _(A || $.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          A ? null : m($.subTree),
          w,
          r,
          l
        ), H && y(H), vf($, F.el), {}.NODE_ENV !== "production" && Da(), N && --w.deps === 0 && w.resolve();
      });
    },
    unmount($, C) {
      w.isUnmounted = !0, w.activeBranch && p(
        w.activeBranch,
        n,
        $,
        C
      ), w.pendingBranch && p(
        w.pendingBranch,
        n,
        $,
        C
      );
    }
  };
  return w;
}
function _1(e, t, n, s, o, a, r, i, l) {
  const c = t.suspense = gf(
    t,
    s,
    n,
    e.parentNode,
    document.createElement("div"),
    null,
    o,
    a,
    r,
    i,
    !0
    /* hydrating */
  ), f = l(
    e,
    c.pendingBranch = t.ssContent,
    n,
    c,
    a,
    r
  );
  return c.deps === 0 && c.resolve(!1, !0), f;
}
function v1(e) {
  const { shapeFlag: t, children: n } = e, s = t & 32;
  e.ssContent = Ph(
    s ? n.default : n
  ), e.ssFallback = s ? Ph(n.fallback) : T(Ht);
}
function Ph(e) {
  let t;
  if (Ie(e)) {
    const n = or && e._c;
    n && (e._d = !1, b()), e = e(), n && (e._d = !0, t = Tn, O_());
  }
  if (ge(e)) {
    const n = _f(e);
    ({}).NODE_ENV !== "production" && !n && X("<Suspense> slots expect a single root node."), e = n;
  }
  return e = On(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)), e;
}
function Qm(e, t) {
  t && t.pendingBranch ? ge(e) ? t.effects.push(...e) : t.effects.push(e) : bc(e);
}
function Dr(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: s } = e, o = n.el = t.el;
  s && s.subTree === n && (s.vnode.el = o, vf(s, o));
}
function g1(e) {
  var t;
  return ((t = e.props) == null ? void 0 : t.suspensible) != null && e.props.suspensible !== !1;
}
function tn(e, t) {
  return bi(e, null, t);
}
function Zm(e, t) {
  return bi(
    e,
    null,
    {}.NODE_ENV !== "production" ? ht({}, t, { flush: "post" }) : { flush: "post" }
  );
}
function y1(e, t) {
  return bi(
    e,
    null,
    {}.NODE_ENV !== "production" ? ht({}, t, { flush: "sync" }) : { flush: "sync" }
  );
}
const Zi = {};
function Xt(e, t, n) {
  return {}.NODE_ENV !== "production" && !Ie(t) && X(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), bi(e, t, n);
}
function bi(e, t, { immediate: n, deep: s, flush: o, onTrack: a, onTrigger: r } = bt) {
  var i;
  ({}).NODE_ENV !== "production" && !t && (n !== void 0 && X(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && X(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = ($) => {
    X(
      "Invalid watch source: ",
      $,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, c = Cm() === ((i = Ut) == null ? void 0 : i.scope) ? Ut : null;
  let f, d = !1, h = !1;
  if (Vt(e) ? (f = () => e.value, d = qa(e)) : wo(e) ? (f = () => e, s = !0) : ge(e) ? (h = !0, d = e.some(($) => wo($) || qa($)), f = () => e.map(($) => {
    if (Vt($))
      return $.value;
    if (wo($))
      return Go($);
    if (Ie($))
      return ms($, c, 2);
    ({}).NODE_ENV !== "production" && l($);
  })) : Ie(e) ? t ? f = () => ms(e, c, 2) : f = () => {
    if (!(c && c.isUnmounted))
      return p && p(), Vn(
        e,
        c,
        3,
        [m]
      );
  } : (f = qt, {}.NODE_ENV !== "production" && l(e)), t && s) {
    const $ = f;
    f = () => Go($());
  }
  let p, m = ($) => {
    p = S.onStop = () => {
      ms($, c, 4);
    };
  }, _;
  if (Vr)
    if (m = qt, t ? n && Vn(t, c, 3, [
      f(),
      h ? [] : void 0,
      m
    ]) : f(), o === "sync") {
      const $ = F_();
      _ = $.__watcherHandles || ($.__watcherHandles = []);
    } else
      return qt;
  let y = h ? new Array(e.length).fill(Zi) : Zi;
  const g = () => {
    if (S.active)
      if (t) {
        const $ = S.run();
        (s || d || (h ? $.some(
          (C, N) => Mr(C, y[N])
        ) : Mr($, y))) && (p && p(), Vn(t, c, 3, [
          $,
          // pass undefined as the old value when it's changed for the first time
          y === Zi ? void 0 : h && y[0] === Zi ? [] : y,
          m
        ]), y = $);
      } else
        S.run();
  };
  g.allowRecurse = !!t;
  let v;
  o === "sync" ? v = g : o === "post" ? v = () => Zt(g, c && c.suspense) : (g.pre = !0, c && (g.id = c.uid), v = () => gi(g));
  const S = new vi(f, v);
  ({}).NODE_ENV !== "production" && (S.onTrack = a, S.onTrigger = r), t ? n ? g() : y = S.run() : o === "post" ? Zt(
    S.run.bind(S),
    c && c.suspense
  ) : S.run();
  const w = () => {
    S.stop(), c && c.scope && Zd(c.scope.effects, S);
  };
  return _ && _.push(w), w;
}
function b1(e, t, n) {
  const s = this.proxy, o = xt(e) ? e.includes(".") ? qm(s, e) : () => s[e] : e.bind(s, s);
  let a;
  Ie(t) ? a = t : (a = t.handler, n = t);
  const r = Ut;
  No(this);
  const i = bi(o, a.bind(s), n);
  return r ? No(r) : xo(), i;
}
function qm(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
function Go(e, t) {
  if (!at(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Vt(e))
    Go(e.value, t);
  else if (ge(e))
    for (let n = 0; n < e.length; n++)
      Go(e[n], t);
  else if (rr(e) || Jo(e))
    e.forEach((n) => {
      Go(n, t);
    });
  else if (Em(e))
    for (const n in e)
      Go(e[n], t);
  return e;
}
function e_(e) {
  Py(e) && X("Do not use built-in directive ids as custom directive id: " + e);
}
function L(e, t) {
  const n = jt;
  if (n === null)
    return {}.NODE_ENV !== "production" && X("withDirectives can only be used inside render functions."), e;
  const s = Oc(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let a = 0; a < t.length; a++) {
    let [r, i, l, c = bt] = t[a];
    r && (Ie(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Go(i), o.push({
      dir: r,
      instance: s,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function cs(e, t, n, s) {
  const o = e.dirs, a = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    a && (i.oldValue = a[r].value);
    let l = i.dir[s];
    l && (ar(), Vn(l, n, 8, [
      e.el,
      i,
      e,
      t
    ]), ir());
  }
}
function yf() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return dn(() => {
    e.isMounted = !0;
  }), wi(() => {
    e.isUnmounting = !0;
  }), e;
}
const Hn = [Function, Array], bf = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Hn,
  onEnter: Hn,
  onAfterEnter: Hn,
  onEnterCancelled: Hn,
  // leave
  onBeforeLeave: Hn,
  onLeave: Hn,
  onAfterLeave: Hn,
  onLeaveCancelled: Hn,
  // appear
  onBeforeAppear: Hn,
  onAppear: Hn,
  onAfterAppear: Hn,
  onAppearCancelled: Hn
}, w1 = {
  name: "BaseTransition",
  props: bf,
  setup(e, { slots: t }) {
    const n = An(), s = yf();
    let o;
    return () => {
      const a = t.default && Sc(t.default(), !0);
      if (!a || !a.length)
        return;
      let r = a[0];
      if (a.length > 1) {
        let _ = !1;
        for (const y of a)
          if (y.type !== Ht) {
            if ({}.NODE_ENV !== "production" && _) {
              X(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            if (r = y, _ = !0, {}.NODE_ENV === "production")
              break;
          }
      }
      const i = Ue(e), { mode: l } = i;
      if ({}.NODE_ENV !== "production" && l && l !== "in-out" && l !== "out-in" && l !== "default" && X(`invalid <transition> mode: ${l}`), s.isLeaving)
        return cu(r);
      const c = Mh(r);
      if (!c)
        return cu(r);
      const f = Lr(
        c,
        i,
        s,
        n
      );
      sr(c, f);
      const d = n.subTree, h = d && Mh(d);
      let p = !1;
      const { getTransitionKey: m } = c.type;
      if (m) {
        const _ = m();
        o === void 0 ? o = _ : _ !== o && (o = _, p = !0);
      }
      if (h && h.type !== Ht && (!ts(c, h) || p)) {
        const _ = Lr(
          h,
          i,
          s,
          n
        );
        if (sr(h, _), l === "out-in")
          return s.isLeaving = !0, _.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, cu(r);
        l === "in-out" && c.type !== Ht && (_.delayLeave = (y, g, v) => {
          const S = n_(
            s,
            h
          );
          S[String(h.key)] = h, y._leaveCb = () => {
            g(), y._leaveCb = void 0, delete f.delayedLeave;
          }, f.delayedLeave = v;
        });
      }
      return r;
    };
  }
}, t_ = w1;
function n_(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function Lr(e, t, n, s) {
  const {
    appear: o,
    mode: a,
    persisted: r = !1,
    onBeforeEnter: i,
    onEnter: l,
    onAfterEnter: c,
    onEnterCancelled: f,
    onBeforeLeave: d,
    onLeave: h,
    onAfterLeave: p,
    onLeaveCancelled: m,
    onBeforeAppear: _,
    onAppear: y,
    onAfterAppear: g,
    onAppearCancelled: v
  } = t, S = String(e.key), w = n_(n, e), $ = (A, D) => {
    A && Vn(
      A,
      s,
      9,
      D
    );
  }, C = (A, D) => {
    const F = D[1];
    $(A, D), ge(A) ? A.every((H) => H.length <= 1) && F() : A.length <= 1 && F();
  }, N = {
    mode: a,
    persisted: r,
    beforeEnter(A) {
      let D = i;
      if (!n.isMounted)
        if (o)
          D = _ || i;
        else
          return;
      A._leaveCb && A._leaveCb(
        !0
        /* cancelled */
      );
      const F = w[S];
      F && ts(e, F) && F.el._leaveCb && F.el._leaveCb(), $(D, [A]);
    },
    enter(A) {
      let D = l, F = c, H = f;
      if (!n.isMounted)
        if (o)
          D = y || l, F = g || c, H = v || f;
        else
          return;
      let P = !1;
      const I = A._enterCb = (V) => {
        P || (P = !0, V ? $(H, [A]) : $(F, [A]), N.delayedLeave && N.delayedLeave(), A._enterCb = void 0);
      };
      D ? C(D, [A, I]) : I();
    },
    leave(A, D) {
      const F = String(e.key);
      if (A._enterCb && A._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return D();
      $(d, [A]);
      let H = !1;
      const P = A._leaveCb = (I) => {
        H || (H = !0, D(), I ? $(m, [A]) : $(p, [A]), A._leaveCb = void 0, w[F] === e && delete w[F]);
      };
      w[F] = e, h ? C(h, [A, P]) : P();
    },
    clone(A) {
      return Lr(A, t, n, s);
    }
  };
  return N;
}
function cu(e) {
  if (zr(e))
    return e = Gn(e), e.children = null, e;
}
function Mh(e) {
  return zr(e) ? e.children ? e.children[0] : void 0 : e;
}
function sr(e, t) {
  e.shapeFlag & 6 && e.component ? sr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Sc(e, t = !1, n) {
  let s = [], o = 0;
  for (let a = 0; a < e.length; a++) {
    let r = e[a];
    const i = n == null ? r.key : String(n) + String(r.key != null ? r.key : a);
    r.type === ne ? (r.patchFlag & 128 && o++, s = s.concat(
      Sc(r.children, t, i)
    )) : (t || r.type !== Ht) && s.push(i != null ? Gn(r, { key: i }) : r);
  }
  if (o > 1)
    for (let a = 0; a < s.length; a++)
      s[a].patchFlag = -2;
  return s;
}
function un(e, t) {
  return Ie(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => ht({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const Zo = (e) => !!e.type.__asyncLoader;
function E1(e) {
  Ie(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: o = 200,
    timeout: a,
    // undefined = never times out
    suspensible: r = !0,
    onError: i
  } = e;
  let l = null, c, f = 0;
  const d = () => (f++, l = null, h()), h = () => {
    let p;
    return l || (p = l = t().catch((m) => {
      if (m = m instanceof Error ? m : new Error(String(m)), i)
        return new Promise((_, y) => {
          i(m, () => _(d()), () => y(m), f + 1);
        });
      throw m;
    }).then((m) => {
      if (p !== l && l)
        return l;
      if ({}.NODE_ENV !== "production" && !m && X(
        "Async component loader resolved to undefined. If you are using retry(), make sure to return its return value."
      ), m && (m.__esModule || m[Symbol.toStringTag] === "Module") && (m = m.default), {}.NODE_ENV !== "production" && m && !at(m) && !Ie(m))
        throw new Error(`Invalid async component load result: ${m}`);
      return c = m, m;
    }));
  };
  return un({
    name: "AsyncComponentWrapper",
    __asyncLoader: h,
    get __asyncResolved() {
      return c;
    },
    setup() {
      const p = Ut;
      if (c)
        return () => uu(c, p);
      const m = (v) => {
        l = null, lr(
          v,
          p,
          13,
          !s
          /* do not throw in dev if user provided error component */
        );
      };
      if (r && p.suspense || Vr)
        return h().then((v) => () => uu(v, p)).catch((v) => (m(v), () => s ? T(s, {
          error: v
        }) : null));
      const _ = te(!1), y = te(), g = te(!!o);
      return o && setTimeout(() => {
        g.value = !1;
      }, o), a != null && setTimeout(() => {
        if (!_.value && !y.value) {
          const v = new Error(
            `Async component timed out after ${a}ms.`
          );
          m(v), y.value = v;
        }
      }, a), h().then(() => {
        _.value = !0, p.parent && zr(p.parent.vnode) && gi(p.parent.update);
      }).catch((v) => {
        m(v), y.value = v;
      }), () => {
        if (_.value && c)
          return uu(c, p);
        if (y.value && s)
          return T(s, {
            error: y.value
          });
        if (n && !g.value)
          return T(n);
      };
    }
  });
}
function uu(e, t) {
  const { ref: n, props: s, children: o, ce: a } = t.vnode, r = T(e, s, o);
  return r.ref = n, r.ce = a, delete t.vnode.ce, r;
}
const zr = (e) => e.type.__isKeepAlive, S1 = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: !0,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(e, { slots: t }) {
    const n = An(), s = n.ctx;
    if (!s.renderer)
      return () => {
        const v = t.default && t.default();
        return v && v.length === 1 ? v[0] : v;
      };
    const o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
    let r = null;
    ({}).NODE_ENV !== "production" && (n.__v_cache = o);
    const i = n.suspense, {
      renderer: {
        p: l,
        m: c,
        um: f,
        o: { createElement: d }
      }
    } = s, h = d("div");
    s.activate = (v, S, w, $, C) => {
      const N = v.component;
      c(v, S, w, 0, i), l(
        N.vnode,
        v,
        S,
        w,
        N,
        i,
        $,
        v.slotScopeIds,
        C
      ), Zt(() => {
        N.isDeactivated = !1, N.a && po(N.a);
        const A = v.props && v.props.onVnodeMounted;
        A && $n(A, N.parent, v);
      }, i), {}.NODE_ENV !== "production" && ed(N);
    }, s.deactivate = (v) => {
      const S = v.component;
      c(v, h, null, 1, i), Zt(() => {
        S.da && po(S.da);
        const w = v.props && v.props.onVnodeUnmounted;
        w && $n(w, S.parent, v), S.isDeactivated = !0;
      }, i), {}.NODE_ENV !== "production" && ed(S);
    };
    function p(v) {
      du(v), f(v, n, i, !0);
    }
    function m(v) {
      o.forEach((S, w) => {
        const $ = li(S.type);
        $ && (!v || !v($)) && _(w);
      });
    }
    function _(v) {
      const S = o.get(v);
      !r || !ts(S, r) ? p(S) : r && du(r), o.delete(v), a.delete(v);
    }
    Xt(
      () => [e.include, e.exclude],
      ([v, S]) => {
        v && m((w) => Ea(v, w)), S && m((w) => !Ea(S, w));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: !0 }
    );
    let y = null;
    const g = () => {
      y != null && o.set(y, fu(n.subTree));
    };
    return dn(g), $c(g), wi(() => {
      o.forEach((v) => {
        const { subTree: S, suspense: w } = n, $ = fu(S);
        if (v.type === $.type && v.key === $.key) {
          du($);
          const C = $.component.da;
          C && Zt(C, w);
          return;
        }
        p(v);
      });
    }), () => {
      if (y = null, !t.default)
        return null;
      const v = t.default(), S = v[0];
      if (v.length > 1)
        return {}.NODE_ENV !== "production" && X("KeepAlive should contain exactly one component child."), r = null, v;
      if (!Ys(S) || !(S.shapeFlag & 4) && !(S.shapeFlag & 128))
        return r = null, S;
      let w = fu(S);
      const $ = w.type, C = li(
        Zo(w) ? w.type.__asyncResolved || {} : $
      ), { include: N, exclude: A, max: D } = e;
      if (N && (!C || !Ea(N, C)) || A && C && Ea(A, C))
        return r = w, S;
      const F = w.key == null ? $ : w.key, H = o.get(F);
      return w.el && (w = Gn(w), S.shapeFlag & 128 && (S.ssContent = w)), y = F, H ? (w.el = H.el, w.component = H.component, w.transition && sr(w, w.transition), w.shapeFlag |= 512, a.delete(F), a.add(F)) : (a.add(F), D && a.size > parseInt(D, 10) && _(a.values().next().value)), w.shapeFlag |= 256, r = w, Xm(S.type) ? S : w;
    };
  }
}, x1 = S1;
function Ea(e, t) {
  return ge(e) ? e.some((n) => Ea(n, t)) : xt(e) ? e.split(",").includes(t) : Iy(e) ? e.test(t) : !1;
}
function s_(e, t) {
  r_(e, "a", t);
}
function o_(e, t) {
  r_(e, "da", t);
}
function r_(e, t, n = Ut) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (xc(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      zr(o.parent.vnode) && $1(s, t, n, o), o = o.parent;
  }
}
function $1(e, t, n, s) {
  const o = xc(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Kr(() => {
    Zd(s[t], o);
  }, n);
}
function du(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function fu(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function xc(e, t, n = Ut, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...r) => {
      if (n.isUnmounted)
        return;
      ar(), No(n);
      const i = Vn(t, n, e, r);
      return xo(), ir(), i;
    });
    return s ? o.unshift(a) : o.push(a), a;
  } else if ({}.NODE_ENV !== "production") {
    const o = Rs(df[e].replace(/ hook$/, ""));
    X(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ks = (e) => (t, n = Ut) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Vr || e === "sp") && xc(e, (...s) => t(...s), n)
), wf = Ks("bm"), dn = Ks("m"), a_ = Ks("bu"), $c = Ks("u"), wi = Ks("bum"), Kr = Ks("um"), i_ = Ks("sp"), l_ = Ks(
  "rtg"
), c_ = Ks(
  "rtc"
);
function u_(e, t = Ut) {
  xc("ec", e, t);
}
const jl = "components", C1 = "directives";
function Te(e, t) {
  return Ef(jl, e, !0, t) || e;
}
const d_ = Symbol.for("v-ndc");
function O1(e) {
  return xt(e) ? Ef(jl, e, !1) || e : e || d_;
}
function Jr(e) {
  return Ef(C1, e);
}
function Ef(e, t, n = !0, s = !1) {
  const o = jt || Ut;
  if (o) {
    const a = o.type;
    if (e === jl) {
      const i = li(
        a,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (i && (i === t || i === Nn(t) || i === Co(Nn(t))))
        return a;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      Lh(o[e] || a[e], t) || // global registration
      Lh(o.appContext[e], t)
    );
    if (!r && s)
      return a;
    if ({}.NODE_ENV !== "production" && n && !r) {
      const i = e === jl ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      X(`Failed to resolve ${e.slice(0, -1)}: ${t}${i}`);
    }
    return r;
  } else
    ({}).NODE_ENV !== "production" && X(
      `resolve${Co(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Lh(e, t) {
  return e && (e[t] || e[Nn(t)] || e[Co(Nn(t))]);
}
function Ae(e, t, n, s) {
  let o;
  const a = n && n[s];
  if (ge(e) || xt(e)) {
    o = new Array(e.length);
    for (let r = 0, i = e.length; r < i; r++)
      o[r] = t(e[r], r, void 0, a && a[r]);
  } else if (typeof e == "number") {
    ({}).NODE_ENV !== "production" && !Number.isInteger(e) && X(`The v-for range expect an integer value but got ${e}.`), o = new Array(e);
    for (let r = 0; r < e; r++)
      o[r] = t(r + 1, r, void 0, a && a[r]);
  } else if (at(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (r, i) => t(r, i, void 0, a && a[i])
      );
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let i = 0, l = r.length; i < l; i++) {
        const c = r[i];
        o[i] = t(e[c], c, i, a && a[i]);
      }
    }
  else
    o = [];
  return n && (n[s] = o), o;
}
function k1(e, t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (ge(s))
      for (let o = 0; o < s.length; o++)
        e[s[o].name] = s[o].fn;
    else
      s && (e[s.name] = s.key ? (...o) => {
        const a = s.fn(...o);
        return a && (a.key = s.key), a;
      } : s.fn);
  }
  return e;
}
function we(e, t, n = {}, s, o) {
  if (jt.isCE || jt.parent && Zo(jt.parent) && jt.parent.isCE)
    return t !== "default" && (n.name = t), T("slot", n, s && s());
  let a = e[t];
  ({}).NODE_ENV !== "production" && a && a.length > 1 && (X(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), a = () => []), a && a._c && (a._d = !1), b();
  const r = a && f_(a(n)), i = Ce(
    ne,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      r && r.key || `_${t}`
    },
    r || (s ? s() : []),
    r && e._ === 1 ? 64 : -2
  );
  return !o && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]), a && a._c && (a._d = !0), i;
}
function f_(e) {
  return e.some((t) => Ys(t) ? !(t.type === Ht || t.type === ne && !f_(t.children)) : !0) ? e : null;
}
function T1(e, t) {
  const n = {};
  if ({}.NODE_ENV !== "production" && !at(e))
    return X("v-on with no argument expects an object value."), n;
  for (const s in e)
    n[t && /[A-Z]/.test(s) ? `on:${s}` : Rs(s)] = e[s];
  return n;
}
const nd = (e) => e ? R_(e) ? Oc(e) || e.proxy : nd(e.parent) : null, qo = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ht(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => ({}).NODE_ENV !== "production" ? Cr(e.props) : e.props,
    $attrs: (e) => ({}).NODE_ENV !== "production" ? Cr(e.attrs) : e.attrs,
    $slots: (e) => ({}).NODE_ENV !== "production" ? Cr(e.slots) : e.slots,
    $refs: (e) => ({}).NODE_ENV !== "production" ? Cr(e.refs) : e.refs,
    $parent: (e) => nd(e.parent),
    $root: (e) => nd(e.root),
    $emit: (e) => e.emit,
    $options: (e) => xf(e),
    $forceUpdate: (e) => e.f || (e.f = () => gi(e.update)),
    $nextTick: (e) => e.n || (e.n = yc.bind(e.proxy)),
    $watch: (e) => b1.bind(e)
  })
), Sf = (e) => e === "_" || e === "$", hu = (e, t) => e !== bt && !e.__isScriptSetup && Qe(e, t), Ra = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: o, props: a, accessCache: r, type: i, appContext: l } = e;
    if ({}.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let c;
    if (t[0] !== "$") {
      const p = r[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return a[t];
        }
      else {
        if (hu(s, t))
          return r[t] = 1, s[t];
        if (o !== bt && Qe(o, t))
          return r[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && Qe(c, t)
        )
          return r[t] = 3, a[t];
        if (n !== bt && Qe(n, t))
          return r[t] = 4, n[t];
        sd && (r[t] = 0);
      }
    }
    const f = qo[t];
    let d, h;
    if (f)
      return t === "$attrs" ? (en(e, "get", t), {}.NODE_ENV !== "production" && Ul()) : {}.NODE_ENV !== "production" && t === "$slots" && en(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (d = i.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== bt && Qe(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      h = l.config.globalProperties, Qe(h, t)
    )
      return h[t];
    ({}).NODE_ENV !== "production" && jt && (!xt(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== bt && Sf(t[0]) && Qe(o, t) ? X(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === jt && X(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: a } = e;
    return hu(o, t) ? (o[t] = n, !0) : {}.NODE_ENV !== "production" && o.__isScriptSetup && Qe(o, t) ? (X(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== bt && Qe(s, t) ? (s[t] = n, !0) : Qe(e.props, t) ? ({}.NODE_ENV !== "production" && X(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? ({}.NODE_ENV !== "production" && X(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : ({}.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(a, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : a[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: a }
  }, r) {
    let i;
    return !!n[r] || e !== bt && Qe(e, r) || hu(t, r) || (i = a[0]) && Qe(i, r) || Qe(s, r) || Qe(qo, r) || Qe(o.config.globalProperties, r);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Qe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
({}).NODE_ENV !== "production" && (Ra.ownKeys = (e) => (X(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
const N1 = /* @__PURE__ */ ht(
  {},
  Ra,
  {
    get(e, t) {
      if (t !== Symbol.unscopables)
        return Ra.get(e, t, e);
    },
    has(e, t) {
      const n = t[0] !== "_" && !Fy(t);
      return {}.NODE_ENV !== "production" && !n && Ra.has(e, t) && X(
        `Property ${JSON.stringify(
          t
        )} should not start with _ which is a reserved prefix for Vue internals.`
      ), n;
    }
  }
);
function D1(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(qo).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => qo[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: qt
    });
  }), t;
}
function A1(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((s) => {
    Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s],
      set: qt
    });
  });
}
function R1(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(Ue(n)).forEach((s) => {
    if (!n.__isScriptSetup) {
      if (Sf(s[0])) {
        X(
          `setup() return property ${JSON.stringify(
            s
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, s, {
        enumerable: !0,
        configurable: !0,
        get: () => n[s],
        set: qt
      });
    }
  });
}
const cr = (e) => X(
  `${e}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`
);
function I1() {
  return {}.NODE_ENV !== "production" && cr("defineProps"), null;
}
function P1() {
  return {}.NODE_ENV !== "production" && cr("defineEmits"), null;
}
function M1(e) {
  ({}).NODE_ENV !== "production" && cr("defineExpose");
}
function L1(e) {
  ({}).NODE_ENV !== "production" && cr("defineOptions");
}
function V1() {
  return {}.NODE_ENV !== "production" && cr("defineSlots"), null;
}
function F1() {
  ({}).NODE_ENV !== "production" && cr("defineModel");
}
function U1(e, t) {
  return {}.NODE_ENV !== "production" && cr("withDefaults"), null;
}
function h_() {
  return p_().slots;
}
function j1() {
  return p_().attrs;
}
function H1(e, t, n) {
  const s = An();
  if ({}.NODE_ENV !== "production" && !s)
    return X("useModel() called without active instance."), te();
  if ({}.NODE_ENV !== "production" && !s.propsOptions[0][t])
    return X(`useModel() called with prop "${t}" which is not declared.`), te();
  if (n && n.local) {
    const o = te(e[t]);
    return Xt(
      () => e[t],
      (a) => o.value = a
    ), Xt(o, (a) => {
      a !== e[t] && s.emit(`update:${t}`, a);
    }), o;
  } else
    return {
      __v_isRef: !0,
      get value() {
        return e[t];
      },
      set value(o) {
        s.emit(`update:${t}`, o);
      }
    };
}
function p_() {
  const e = An();
  return {}.NODE_ENV !== "production" && !e && X("useContext() called without active instance."), e.setupContext || (e.setupContext = M_(e));
}
function ai(e) {
  return ge(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function B1(e, t) {
  const n = ai(e);
  for (const s in t) {
    if (s.startsWith("__skip"))
      continue;
    let o = n[s];
    o ? ge(o) || Ie(o) ? o = n[s] = { type: o, default: t[s] } : o.default = t[s] : o === null ? o = n[s] = { default: t[s] } : {}.NODE_ENV !== "production" && X(`props default key "${s}" has no corresponding declaration.`), o && t[`__skip_${s}`] && (o.skipFactory = !0);
  }
  return n;
}
function Y1(e, t) {
  return !e || !t ? e || t : ge(e) && ge(t) ? e.concat(t) : ht({}, ai(e), ai(t));
}
function W1(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || Object.defineProperty(n, s, {
      enumerable: !0,
      get: () => e[s]
    });
  return n;
}
function G1(e) {
  const t = An();
  ({}).NODE_ENV !== "production" && !t && X(
    "withAsyncContext called without active current instance. This is likely a bug."
  );
  let n = e();
  return xo(), dc(n) && (n = n.catch((s) => {
    throw No(t), s;
  })), [n, () => No(t)];
}
function z1() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? X(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let sd = !0;
function K1(e) {
  const t = xf(e), n = e.proxy, s = e.ctx;
  sd = !1, t.beforeCreate && Vh(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: a,
    methods: r,
    watch: i,
    provide: l,
    inject: c,
    // lifecycle
    created: f,
    beforeMount: d,
    mounted: h,
    beforeUpdate: p,
    updated: m,
    activated: _,
    deactivated: y,
    beforeDestroy: g,
    beforeUnmount: v,
    destroyed: S,
    unmounted: w,
    render: $,
    renderTracked: C,
    renderTriggered: N,
    errorCaptured: A,
    serverPrefetch: D,
    // public API
    expose: F,
    inheritAttrs: H,
    // assets
    components: P,
    directives: I,
    filters: V
  } = t, q = {}.NODE_ENV !== "production" ? z1() : null;
  if ({}.NODE_ENV !== "production") {
    const [z] = e.propsOptions;
    if (z)
      for (const re in z)
        q("Props", re);
  }
  if (c && J1(c, s, q), r)
    for (const z in r) {
      const re = r[z];
      Ie(re) ? ({}.NODE_ENV !== "production" ? Object.defineProperty(s, z, {
        value: re.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : s[z] = re.bind(n), {}.NODE_ENV !== "production" && q("Methods", z)) : {}.NODE_ENV !== "production" && X(
        `Method "${z}" has type "${typeof re}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    ({}).NODE_ENV !== "production" && !Ie(o) && X(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const z = o.call(n, n);
    if ({}.NODE_ENV !== "production" && dc(z) && X(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !at(z))
      ({}).NODE_ENV !== "production" && X("data() should return an object.");
    else if (e.data = wt(z), {}.NODE_ENV !== "production")
      for (const re in z)
        q("Data", re), Sf(re[0]) || Object.defineProperty(s, re, {
          configurable: !0,
          enumerable: !0,
          get: () => z[re],
          set: qt
        });
  }
  if (sd = !0, a)
    for (const z in a) {
      const re = a[z], Be = Ie(re) ? re.bind(n, n) : Ie(re.get) ? re.get.bind(n, n) : qt;
      ({}).NODE_ENV !== "production" && Be === qt && X(`Computed property "${z}" has no getter.`);
      const pt = !Ie(re) && Ie(re.set) ? re.set.bind(n) : {}.NODE_ENV !== "production" ? () => {
        X(
          `Write operation failed: computed property "${z}" is readonly.`
        );
      } : qt, et = k({
        get: Be,
        set: pt
      });
      Object.defineProperty(s, z, {
        enumerable: !0,
        configurable: !0,
        get: () => et.value,
        set: (tt) => et.value = tt
      }), {}.NODE_ENV !== "production" && q("Computed", z);
    }
  if (i)
    for (const z in i)
      m_(i[z], s, n, z);
  if (l) {
    const z = Ie(l) ? l.call(n) : l;
    Reflect.ownKeys(z).forEach((re) => {
      Ia(re, z[re]);
    });
  }
  f && Vh(f, e, "c");
  function Y(z, re) {
    ge(re) ? re.forEach((Be) => z(Be.bind(n))) : re && z(re.bind(n));
  }
  if (Y(wf, d), Y(dn, h), Y(a_, p), Y($c, m), Y(s_, _), Y(o_, y), Y(u_, A), Y(c_, C), Y(l_, N), Y(wi, v), Y(Kr, w), Y(i_, D), ge(F))
    if (F.length) {
      const z = e.exposed || (e.exposed = {});
      F.forEach((re) => {
        Object.defineProperty(z, re, {
          get: () => n[re],
          set: (Be) => n[re] = Be
        });
      });
    } else
      e.exposed || (e.exposed = {});
  $ && e.render === qt && (e.render = $), H != null && (e.inheritAttrs = H), P && (e.components = P), I && (e.directives = I);
}
function J1(e, t, n = qt) {
  ge(e) && (e = od(e));
  for (const s in e) {
    const o = e[s];
    let a;
    at(o) ? "default" in o ? a = ln(
      o.from || s,
      o.default,
      !0
      /* treat default function as factory */
    ) : a = ln(o.from || s) : a = ln(o), Vt(a) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (r) => a.value = r
    }) : t[s] = a, {}.NODE_ENV !== "production" && n("Inject", s);
  }
}
function Vh(e, t, n) {
  Vn(
    ge(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function m_(e, t, n, s) {
  const o = s.includes(".") ? qm(n, s) : () => n[s];
  if (xt(e)) {
    const a = t[e];
    Ie(a) ? Xt(o, a) : {}.NODE_ENV !== "production" && X(`Invalid watch handler specified by key "${e}"`, a);
  } else if (Ie(e))
    Xt(o, e.bind(n));
  else if (at(e))
    if (ge(e))
      e.forEach((a) => m_(a, t, n, s));
    else {
      const a = Ie(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ie(a) ? Xt(o, a, e) : {}.NODE_ENV !== "production" && X(`Invalid watch handler specified by key "${e.handler}"`, a);
    }
  else
    ({}).NODE_ENV !== "production" && X(`Invalid watch option: "${s}"`, e);
}
function xf(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: a,
    config: { optionMergeStrategies: r }
  } = e.appContext, i = a.get(t);
  let l;
  return i ? l = i : !o.length && !n && !s ? l = t : (l = {}, o.length && o.forEach(
    (c) => Hl(l, c, r, !0)
  ), Hl(l, t, r)), at(t) && a.set(t, l), l;
}
function Hl(e, t, n, s = !1) {
  const { mixins: o, extends: a } = t;
  a && Hl(e, a, n, !0), o && o.forEach(
    (r) => Hl(e, r, n, !0)
  );
  for (const r in t)
    if (s && r === "expose")
      ({}).NODE_ENV !== "production" && X(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const i = X1[r] || n && n[r];
      e[r] = i ? i(e[r], t[r]) : t[r];
    }
  return e;
}
const X1 = {
  data: Fh,
  props: Uh,
  emits: Uh,
  // objects
  methods: Sa,
  computed: Sa,
  // lifecycle
  beforeCreate: mn,
  created: mn,
  beforeMount: mn,
  mounted: mn,
  beforeUpdate: mn,
  updated: mn,
  beforeDestroy: mn,
  beforeUnmount: mn,
  destroyed: mn,
  unmounted: mn,
  activated: mn,
  deactivated: mn,
  errorCaptured: mn,
  serverPrefetch: mn,
  // assets
  components: Sa,
  directives: Sa,
  // watch
  watch: Z1,
  // provide / inject
  provide: Fh,
  inject: Q1
};
function Fh(e, t) {
  return t ? e ? function() {
    return ht(
      Ie(e) ? e.call(this, this) : e,
      Ie(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Q1(e, t) {
  return Sa(od(e), od(t));
}
function od(e) {
  if (ge(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function mn(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Sa(e, t) {
  return e ? ht(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Uh(e, t) {
  return e ? ge(e) && ge(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ht(
    /* @__PURE__ */ Object.create(null),
    ai(e),
    ai(t ?? {})
  ) : t;
}
function Z1(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ht(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = mn(e[s], t[s]);
  return n;
}
function __() {
  return {
    app: null,
    config: {
      isNativeTag: bm,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let q1 = 0;
function e0(e, t) {
  return function(s, o = null) {
    Ie(s) || (s = ht({}, s)), o != null && !at(o) && ({}.NODE_ENV !== "production" && X("root props passed to app.mount() must be an object."), o = null);
    const a = __();
    ({}).NODE_ENV !== "production" && Object.defineProperty(a.config, "unwrapInjectedRef", {
      get() {
        return !0;
      },
      set() {
        X(
          "app.config.unwrapInjectedRef has been deprecated. 3.3 now alawys unwraps injected refs in Options API."
        );
      }
    });
    const r = /* @__PURE__ */ new Set();
    let i = !1;
    const l = a.app = {
      _uid: q1++,
      _component: s,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: hd,
      get config() {
        return a.config;
      },
      set config(c) {
        ({}).NODE_ENV !== "production" && X(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(c, ...f) {
        return r.has(c) ? {}.NODE_ENV !== "production" && X("Plugin has already been applied to target app.") : c && Ie(c.install) ? (r.add(c), c.install(l, ...f)) : Ie(c) ? (r.add(c), c(l, ...f)) : {}.NODE_ENV !== "production" && X(
          'A plugin must either be a function or an object with an "install" function.'
        ), l;
      },
      mixin(c) {
        return a.mixins.includes(c) ? {}.NODE_ENV !== "production" && X(
          "Mixin has already been applied to target app" + (c.name ? `: ${c.name}` : "")
        ) : a.mixins.push(c), l;
      },
      component(c, f) {
        return {}.NODE_ENV !== "production" && ud(c, a.config), f ? ({}.NODE_ENV !== "production" && a.components[c] && X(`Component "${c}" has already been registered in target app.`), a.components[c] = f, l) : a.components[c];
      },
      directive(c, f) {
        return {}.NODE_ENV !== "production" && e_(c), f ? ({}.NODE_ENV !== "production" && a.directives[c] && X(`Directive "${c}" has already been registered in target app.`), a.directives[c] = f, l) : a.directives[c];
      },
      mount(c, f, d) {
        if (i)
          ({}).NODE_ENV !== "production" && X(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          ({}).NODE_ENV !== "production" && c.__vue_app__ && X(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const h = T(
            s,
            o
          );
          return h.appContext = a, {}.NODE_ENV !== "production" && (a.reload = () => {
            e(Gn(h), c, d);
          }), f && t ? t(h, c) : e(h, c, d), i = !0, l._container = c, c.__vue_app__ = l, {}.NODE_ENV !== "production" && (l._instance = h.component, qb(l, hd)), Oc(h.component) || h.component.proxy;
        }
      },
      unmount() {
        i ? (e(null, l._container), {}.NODE_ENV !== "production" && (l._instance = null, e1(l)), delete l._container.__vue_app__) : {}.NODE_ENV !== "production" && X("Cannot unmount an app that is not mounted.");
      },
      provide(c, f) {
        return {}.NODE_ENV !== "production" && c in a.provides && X(
          `App already provides property with key "${String(c)}". It will be overwritten with the new value.`
        ), a.provides[c] = f, l;
      },
      runWithContext(c) {
        ii = l;
        try {
          return c();
        } finally {
          ii = null;
        }
      }
    };
    return l;
  };
}
let ii = null;
function Ia(e, t) {
  if (!Ut)
    ({}).NODE_ENV !== "production" && X("provide() can only be used inside setup().");
  else {
    let n = Ut.provides;
    const s = Ut.parent && Ut.parent.provides;
    s === n && (n = Ut.provides = Object.create(s)), n[e] = t;
  }
}
function ln(e, t, n = !1) {
  const s = Ut || jt;
  if (s || ii) {
    const o = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : ii._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && Ie(t) ? t.call(s && s.proxy) : t;
    ({}).NODE_ENV !== "production" && X(`injection "${String(e)}" not found.`);
  } else
    ({}).NODE_ENV !== "production" && X("inject() can only be used inside setup() or functional components.");
}
function t0() {
  return !!(Ut || jt || ii);
}
function n0(e, t, n, s = !1) {
  const o = {}, a = {};
  Rl(a, Cc, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), v_(e, t, o, a);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  ({}).NODE_ENV !== "production" && y_(t || {}, o, e), n ? e.props = s ? o : sf(o) : e.type.props ? e.props = o : e.props = a, e.attrs = a;
}
function s0(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function o0(e, t, n, s) {
  const {
    props: o,
    attrs: a,
    vnode: { patchFlag: r }
  } = e, i = Ue(o), [l] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !({}.NODE_ENV !== "production" && s0(e)) && (s || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        let h = f[d];
        if (wc(e.emitsOptions, h))
          continue;
        const p = t[h];
        if (l)
          if (Qe(a, h))
            p !== a[h] && (a[h] = p, c = !0);
          else {
            const m = Nn(h);
            o[m] = rd(
              l,
              i,
              m,
              p,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          p !== a[h] && (a[h] = p, c = !0);
      }
    }
  } else {
    v_(e, t, o, a) && (c = !0);
    let f;
    for (const d in i)
      (!t || // for camelCase
      !Qe(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = kn(d)) === d || !Qe(t, f))) && (l ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[d] = rd(
        l,
        i,
        d,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[d]);
    if (a !== i)
      for (const d in a)
        (!t || !Qe(t, d)) && (delete a[d], c = !0);
  }
  c && vs(e, "set", "$attrs"), {}.NODE_ENV !== "production" && y_(t || {}, o, e);
}
function v_(e, t, n, s) {
  const [o, a] = e.propsOptions;
  let r = !1, i;
  if (t)
    for (let l in t) {
      if (Ta(l))
        continue;
      const c = t[l];
      let f;
      o && Qe(o, f = Nn(l)) ? !a || !a.includes(f) ? n[f] = c : (i || (i = {}))[f] = c : wc(e.emitsOptions, l) || (!(l in s) || c !== s[l]) && (s[l] = c, r = !0);
    }
  if (a) {
    const l = Ue(n), c = i || bt;
    for (let f = 0; f < a.length; f++) {
      const d = a[f];
      n[d] = rd(
        o,
        l,
        d,
        c[d],
        e,
        !Qe(c, d)
      );
    }
  }
  return r;
}
function rd(e, t, n, s, o, a) {
  const r = e[n];
  if (r != null) {
    const i = Qe(r, "default");
    if (i && s === void 0) {
      const l = r.default;
      if (r.type !== Function && !r.skipFactory && Ie(l)) {
        const { propsDefaults: c } = o;
        n in c ? s = c[n] : (No(o), s = c[n] = l.call(
          null,
          t
        ), xo());
      } else
        s = l;
    }
    r[
      0
      /* shouldCast */
    ] && (a && !i ? s = !1 : r[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === kn(n)) && (s = !0));
  }
  return s;
}
function g_(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const a = e.props, r = {}, i = [];
  let l = !1;
  if (!Ie(e)) {
    const f = (d) => {
      l = !0;
      const [h, p] = g_(d, t, !0);
      ht(r, h), p && i.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!a && !l)
    return at(e) && s.set(e, Tr), Tr;
  if (ge(a))
    for (let f = 0; f < a.length; f++) {
      ({}).NODE_ENV !== "production" && !xt(a[f]) && X("props must be strings when using array syntax.", a[f]);
      const d = Nn(a[f]);
      jh(d) && (r[d] = bt);
    }
  else if (a) {
    ({}).NODE_ENV !== "production" && !at(a) && X("invalid props options", a);
    for (const f in a) {
      const d = Nn(f);
      if (jh(d)) {
        const h = a[f], p = r[d] = ge(h) || Ie(h) ? { type: h } : ht({}, h);
        if (p) {
          const m = Bh(Boolean, p.type), _ = Bh(String, p.type);
          p[
            0
            /* shouldCast */
          ] = m > -1, p[
            1
            /* shouldCastTrue */
          ] = _ < 0 || m < _, (m > -1 || Qe(p, "default")) && i.push(d);
        }
      }
    }
  }
  const c = [r, i];
  return at(e) && s.set(e, c), c;
}
function jh(e) {
  return e[0] !== "$" ? !0 : ({}.NODE_ENV !== "production" && X(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ad(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Hh(e, t) {
  return ad(e) === ad(t);
}
function Bh(e, t) {
  return ge(t) ? t.findIndex((n) => Hh(n, e)) : Ie(t) && Hh(t, e) ? 0 : -1;
}
function y_(e, t, n) {
  const s = Ue(t), o = n.propsOptions[0];
  for (const a in o) {
    let r = o[a];
    r != null && r0(
      a,
      s[a],
      r,
      !Qe(e, a) && !Qe(e, kn(a))
    );
  }
}
function r0(e, t, n, s) {
  const { type: o, required: a, validator: r, skipCheck: i } = n;
  if (a && s) {
    X('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !a)) {
    if (o != null && o !== !0 && !i) {
      let l = !1;
      const c = ge(o) ? o : [o], f = [];
      for (let d = 0; d < c.length && !l; d++) {
        const { valid: h, expectedType: p } = i0(t, c[d]);
        f.push(p || ""), l = h;
      }
      if (!l) {
        X(l0(e, t, f));
        return;
      }
    }
    r && !r(t) && X('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const a0 = /* @__PURE__ */ zs(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function i0(e, t) {
  let n;
  const s = ad(t);
  if (a0(s)) {
    const o = typeof e;
    n = o === s.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else
    s === "Object" ? n = at(e) : s === "Array" ? n = ge(e) : s === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: s
  };
}
function l0(e, t, n) {
  let s = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Co).join(" | ")}`;
  const o = n[0], a = qd(t), r = Yh(t, o), i = Yh(t, a);
  return n.length === 1 && Wh(o) && !c0(o, a) && (s += ` with value ${r}`), s += `, got ${a} `, Wh(a) && (s += `with value ${i}.`), s;
}
function Yh(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Wh(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function c0(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const b_ = (e) => e[0] === "_" || e === "$stable", $f = (e) => ge(e) ? e.map(On) : [On(e)], u0 = (e, t, n) => {
  if (t._n)
    return t;
  const s = K((...o) => ({}.NODE_ENV !== "production" && Ut && X(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), $f(t(...o))), n);
  return s._c = !1, s;
}, w_ = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (b_(o))
      continue;
    const a = e[o];
    if (Ie(a))
      t[o] = u0(o, a, s);
    else if (a != null) {
      ({}).NODE_ENV !== "production" && X(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const r = $f(a);
      t[o] = () => r;
    }
  }
}, E_ = (e, t) => {
  ({}).NODE_ENV !== "production" && !zr(e.vnode) && X(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = $f(t);
  e.slots.default = () => n;
}, d0 = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = Ue(t), Rl(t, "_", n)) : w_(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && E_(e, t);
  Rl(e.slots, Cc, 1);
}, f0 = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let a = !0, r = bt;
  if (s.shapeFlag & 32) {
    const i = t._;
    i ? {}.NODE_ENV !== "production" && Eo ? (ht(o, t), vs(e, "set", "$slots")) : n && i === 1 ? a = !1 : (ht(o, t), !n && i === 1 && delete o._) : (a = !t.$stable, w_(t, o)), r = t;
  } else
    t && (E_(e, t), r = { default: 1 });
  if (a)
    for (const i in o)
      !b_(i) && !(i in r) && delete o[i];
};
function Bl(e, t, n, s, o = !1) {
  if (ge(e)) {
    e.forEach(
      (h, p) => Bl(
        h,
        t && (ge(t) ? t[p] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Zo(s) && !o)
    return;
  const a = s.shapeFlag & 4 ? Oc(s.component) || s.component.proxy : s.el, r = o ? null : a, { i, r: l } = e;
  if ({}.NODE_ENV !== "production" && !i) {
    X(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const c = t && t.r, f = i.refs === bt ? i.refs = {} : i.refs, d = i.setupState;
  if (c != null && c !== l && (xt(c) ? (f[c] = null, Qe(d, c) && (d[c] = null)) : Vt(c) && (c.value = null)), Ie(l))
    ms(l, i, 12, [r, f]);
  else {
    const h = xt(l), p = Vt(l);
    if (h || p) {
      const m = () => {
        if (e.f) {
          const _ = h ? Qe(d, l) ? d[l] : f[l] : l.value;
          o ? ge(_) && Zd(_, a) : ge(_) ? _.includes(a) || _.push(a) : h ? (f[l] = [a], Qe(d, l) && (d[l] = f[l])) : (l.value = [a], e.k && (f[e.k] = l.value));
        } else
          h ? (f[l] = r, Qe(d, l) && (d[l] = r)) : p ? (l.value = r, e.k && (f[e.k] = r)) : {}.NODE_ENV !== "production" && X("Invalid template ref type:", l, `(${typeof l})`);
      };
      r ? (m.id = -1, Zt(m, n)) : m();
    } else
      ({}).NODE_ENV !== "production" && X("Invalid template ref type:", l, `(${typeof l})`);
  }
}
let so = !1;
const qi = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject", ra = (e) => e.nodeType === 8;
function h0(e) {
  const {
    mt: t,
    p: n,
    o: {
      patchProp: s,
      createText: o,
      nextSibling: a,
      parentNode: r,
      remove: i,
      insert: l,
      createComment: c
    }
  } = e, f = (g, v) => {
    if (!v.hasChildNodes()) {
      ({}).NODE_ENV !== "production" && X(
        "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
      ), n(null, g, v), Fl(), v._vnode = g;
      return;
    }
    so = !1, d(v.firstChild, g, null, null, null), Fl(), v._vnode = g, so && console.error("Hydration completed but contains mismatches.");
  }, d = (g, v, S, w, $, C = !1) => {
    const N = ra(g) && g.data === "[", A = () => _(
      g,
      v,
      S,
      w,
      $,
      N
    ), { type: D, ref: F, shapeFlag: H, patchFlag: P } = v;
    let I = g.nodeType;
    v.el = g, P === -2 && (C = !1, v.dynamicChildren = null);
    let V = null;
    switch (D) {
      case To:
        I !== 3 ? v.children === "" ? (l(v.el = o(""), r(g), g), V = g) : V = A() : (g.data !== v.children && (so = !0, {}.NODE_ENV !== "production" && X(
          `Hydration text mismatch:
- Client: ${JSON.stringify(g.data)}
- Server: ${JSON.stringify(v.children)}`
        ), g.data = v.children), V = a(g));
        break;
      case Ht:
        I !== 8 || N ? V = A() : V = a(g);
        break;
      case So:
        if (N && (g = a(g), I = g.nodeType), I === 1 || I === 3) {
          V = g;
          const q = !v.children.length;
          for (let Y = 0; Y < v.staticCount; Y++)
            q && (v.children += V.nodeType === 1 ? V.outerHTML : V.data), Y === v.staticCount - 1 && (v.anchor = V), V = a(V);
          return N ? a(V) : V;
        } else
          A();
        break;
      case ne:
        N ? V = m(
          g,
          v,
          S,
          w,
          $,
          C
        ) : V = A();
        break;
      default:
        if (H & 1)
          I !== 1 || v.type.toLowerCase() !== g.tagName.toLowerCase() ? V = A() : V = h(
            g,
            v,
            S,
            w,
            $,
            C
          );
        else if (H & 6) {
          v.slotScopeIds = $;
          const q = r(g);
          if (t(
            v,
            q,
            null,
            S,
            w,
            qi(q),
            C
          ), V = N ? y(g) : a(g), V && ra(V) && V.data === "teleport end" && (V = a(V)), Zo(v)) {
            let Y;
            N ? (Y = T(ne), Y.anchor = V ? V.previousSibling : q.lastChild) : Y = g.nodeType === 3 ? ve("") : T("div"), Y.el = g, v.component.subTree = Y;
          }
        } else
          H & 64 ? I !== 8 ? V = A() : V = v.type.hydrate(
            g,
            v,
            S,
            w,
            $,
            C,
            e,
            p
          ) : H & 128 ? V = v.type.hydrate(
            g,
            v,
            S,
            w,
            qi(r(g)),
            $,
            C,
            e,
            d
          ) : {}.NODE_ENV !== "production" && X("Invalid HostVNode type:", D, `(${typeof D})`);
    }
    return F != null && Bl(F, null, w, v), V;
  }, h = (g, v, S, w, $, C) => {
    C = C || !!v.dynamicChildren;
    const { type: N, props: A, patchFlag: D, shapeFlag: F, dirs: H } = v, P = N === "input" && H || N === "option";
    if ({}.NODE_ENV !== "production" || P || D !== -1) {
      if (H && cs(v, null, S, "created"), A)
        if (P || !C || D & 48)
          for (const V in A)
            (P && V.endsWith("value") || Wr(V) && !Ta(V)) && s(
              g,
              V,
              null,
              A[V],
              !1,
              void 0,
              S
            );
        else
          A.onClick && s(
            g,
            "onClick",
            null,
            A.onClick,
            !1,
            void 0,
            S
          );
      let I;
      if ((I = A && A.onVnodeBeforeMount) && $n(I, S, v), H && cs(v, null, S, "beforeMount"), ((I = A && A.onVnodeMounted) || H) && Qm(() => {
        I && $n(I, S, v), H && cs(v, null, S, "mounted");
      }, w), F & 16 && // skip if element has innerHTML / textContent
      !(A && (A.innerHTML || A.textContent))) {
        let V = p(
          g.firstChild,
          v,
          g,
          S,
          w,
          $,
          C
        ), q = !1;
        for (; V; ) {
          so = !0, {}.NODE_ENV !== "production" && !q && (X(
            `Hydration children mismatch in <${v.type}>: server rendered element contains more child nodes than client vdom.`
          ), q = !0);
          const Y = V;
          V = V.nextSibling, i(Y);
        }
      } else
        F & 8 && g.textContent !== v.children && (so = !0, {}.NODE_ENV !== "production" && X(
          `Hydration text content mismatch in <${v.type}>:
- Client: ${g.textContent}
- Server: ${v.children}`
        ), g.textContent = v.children);
    }
    return g.nextSibling;
  }, p = (g, v, S, w, $, C, N) => {
    N = N || !!v.dynamicChildren;
    const A = v.children, D = A.length;
    let F = !1;
    for (let H = 0; H < D; H++) {
      const P = N ? A[H] : A[H] = On(A[H]);
      if (g)
        g = d(
          g,
          P,
          w,
          $,
          C,
          N
        );
      else {
        if (P.type === To && !P.children)
          continue;
        so = !0, {}.NODE_ENV !== "production" && !F && (X(
          `Hydration children mismatch in <${S.tagName.toLowerCase()}>: server rendered element contains fewer child nodes than client vdom.`
        ), F = !0), n(
          null,
          P,
          S,
          null,
          w,
          $,
          qi(S),
          C
        );
      }
    }
    return g;
  }, m = (g, v, S, w, $, C) => {
    const { slotScopeIds: N } = v;
    N && ($ = $ ? $.concat(N) : N);
    const A = r(g), D = p(
      a(g),
      v,
      A,
      S,
      w,
      $,
      C
    );
    return D && ra(D) && D.data === "]" ? a(v.anchor = D) : (so = !0, l(v.anchor = c("]"), A, D), D);
  }, _ = (g, v, S, w, $, C) => {
    if (so = !0, {}.NODE_ENV !== "production" && X(
      `Hydration node mismatch:
- Client vnode:`,
      v.type,
      `
- Server rendered DOM:`,
      g,
      g.nodeType === 3 ? "(text)" : ra(g) && g.data === "[" ? "(start of fragment)" : ""
    ), v.el = null, C) {
      const D = y(g);
      for (; ; ) {
        const F = a(g);
        if (F && F !== D)
          i(F);
        else
          break;
      }
    }
    const N = a(g), A = r(g);
    return i(g), n(
      null,
      v,
      A,
      N,
      S,
      w,
      qi(A),
      $
    ), N;
  }, y = (g) => {
    let v = 0;
    for (; g; )
      if (g = a(g), g && ra(g) && (g.data === "[" && v++, g.data === "]")) {
        if (v === 0)
          return a(g);
        v--;
      }
    return g;
  };
  return [f, d];
}
let aa, mo;
function Ts(e, t) {
  e.appContext.config.performance && Yl() && mo.mark(`vue-${t}-${e.uid}`), {}.NODE_ENV !== "production" && s1(e, t, Yl() ? mo.now() : Date.now());
}
function Ns(e, t) {
  if (e.appContext.config.performance && Yl()) {
    const n = `vue-${t}-${e.uid}`, s = n + ":end";
    mo.mark(s), mo.measure(
      `<${kc(e, e.type)}> ${t}`,
      n,
      s
    ), mo.clearMarks(n), mo.clearMarks(s);
  }
  ({}).NODE_ENV !== "production" && o1(e, t, Yl() ? mo.now() : Date.now());
}
function Yl() {
  return aa !== void 0 || (typeof window < "u" && window.performance ? (aa = !0, mo = window.performance) : aa = !1), aa;
}
function p0() {
  const e = [];
  if ({}.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Zt = Qm;
function S_(e) {
  return $_(e);
}
function x_(e) {
  return $_(e, h0);
}
function $_(e, t) {
  p0();
  const n = Ml();
  n.__VUE__ = !0, {}.NODE_ENV !== "production" && pf(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: s,
    remove: o,
    patchProp: a,
    createElement: r,
    createText: i,
    createComment: l,
    setText: c,
    setElementText: f,
    parentNode: d,
    nextSibling: h,
    setScopeId: p = qt,
    insertStaticContent: m
  } = e, _ = (x, O, U, Q = null, J = null, ie = null, he = !1, se = null, le = {}.NODE_ENV !== "production" && Eo ? !1 : !!O.dynamicChildren) => {
    if (x === O)
      return;
    x && !ts(x, O) && (Q = de(x), mt(x, J, ie, !0), x = null), O.patchFlag === -2 && (le = !1, O.dynamicChildren = null);
    const { type: ee, ref: xe, shapeFlag: ye } = O;
    switch (ee) {
      case To:
        y(x, O, U, Q);
        break;
      case Ht:
        g(x, O, U, Q);
        break;
      case So:
        x == null ? v(O, U, Q, he) : {}.NODE_ENV !== "production" && S(x, O, U, he);
        break;
      case ne:
        I(
          x,
          O,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le
        );
        break;
      default:
        ye & 1 ? C(
          x,
          O,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le
        ) : ye & 6 ? V(
          x,
          O,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le
        ) : ye & 64 || ye & 128 ? ee.process(
          x,
          O,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le,
          _e
        ) : {}.NODE_ENV !== "production" && X("Invalid VNode type:", ee, `(${typeof ee})`);
    }
    xe != null && J && Bl(xe, x && x.ref, ie, O || x, !O);
  }, y = (x, O, U, Q) => {
    if (x == null)
      s(
        O.el = i(O.children),
        U,
        Q
      );
    else {
      const J = O.el = x.el;
      O.children !== x.children && c(J, O.children);
    }
  }, g = (x, O, U, Q) => {
    x == null ? s(
      O.el = l(O.children || ""),
      U,
      Q
    ) : O.el = x.el;
  }, v = (x, O, U, Q) => {
    [x.el, x.anchor] = m(
      x.children,
      O,
      U,
      Q,
      x.el,
      x.anchor
    );
  }, S = (x, O, U, Q) => {
    if (O.children !== x.children) {
      const J = h(x.anchor);
      $(x), [O.el, O.anchor] = m(
        O.children,
        U,
        J,
        Q
      );
    } else
      O.el = x.el, O.anchor = x.anchor;
  }, w = ({ el: x, anchor: O }, U, Q) => {
    let J;
    for (; x && x !== O; )
      J = h(x), s(x, U, Q), x = J;
    s(O, U, Q);
  }, $ = ({ el: x, anchor: O }) => {
    let U;
    for (; x && x !== O; )
      U = h(x), o(x), x = U;
    o(O);
  }, C = (x, O, U, Q, J, ie, he, se, le) => {
    he = he || O.type === "svg", x == null ? N(
      O,
      U,
      Q,
      J,
      ie,
      he,
      se,
      le
    ) : F(
      x,
      O,
      J,
      ie,
      he,
      se,
      le
    );
  }, N = (x, O, U, Q, J, ie, he, se) => {
    let le, ee;
    const { type: xe, props: ye, shapeFlag: Oe, transition: Pe, dirs: We } = x;
    if (le = x.el = r(
      x.type,
      ie,
      ye && ye.is,
      ye
    ), Oe & 8 ? f(le, x.children) : Oe & 16 && D(
      x.children,
      le,
      null,
      Q,
      J,
      ie && xe !== "foreignObject",
      he,
      se
    ), We && cs(x, null, Q, "created"), A(le, x, x.scopeId, he, Q), ye) {
      for (const R in ye)
        R !== "value" && !Ta(R) && a(
          le,
          R,
          null,
          ye[R],
          ie,
          x.children,
          Q,
          J,
          B
        );
      "value" in ye && a(le, "value", null, ye.value), (ee = ye.onVnodeBeforeMount) && $n(ee, Q, x);
    }
    ({}).NODE_ENV !== "production" && (Object.defineProperty(le, "__vnode", {
      value: x,
      enumerable: !1
    }), Object.defineProperty(le, "__vueParentComponent", {
      value: Q,
      enumerable: !1
    })), We && cs(x, null, Q, "beforeMount");
    const ut = (!J || J && !J.pendingBranch) && Pe && !Pe.persisted;
    ut && Pe.beforeEnter(le), s(le, O, U), ((ee = ye && ye.onVnodeMounted) || ut || We) && Zt(() => {
      ee && $n(ee, Q, x), ut && Pe.enter(le), We && cs(x, null, Q, "mounted");
    }, J);
  }, A = (x, O, U, Q, J) => {
    if (U && p(x, U), Q)
      for (let ie = 0; ie < Q.length; ie++)
        p(x, Q[ie]);
    if (J) {
      let ie = J.subTree;
      if ({}.NODE_ENV !== "production" && ie.patchFlag > 0 && ie.patchFlag & 2048 && (ie = _f(ie.children) || ie), O === ie) {
        const he = J.vnode;
        A(
          x,
          he,
          he.scopeId,
          he.slotScopeIds,
          J.parent
        );
      }
    }
  }, D = (x, O, U, Q, J, ie, he, se, le = 0) => {
    for (let ee = le; ee < x.length; ee++) {
      const xe = x[ee] = se ? co(x[ee]) : On(x[ee]);
      _(
        null,
        xe,
        O,
        U,
        Q,
        J,
        ie,
        he,
        se
      );
    }
  }, F = (x, O, U, Q, J, ie, he) => {
    const se = O.el = x.el;
    let { patchFlag: le, dynamicChildren: ee, dirs: xe } = O;
    le |= x.patchFlag & 16;
    const ye = x.props || bt, Oe = O.props || bt;
    let Pe;
    U && Vo(U, !1), (Pe = Oe.onVnodeBeforeUpdate) && $n(Pe, U, O, x), xe && cs(O, x, U, "beforeUpdate"), U && Vo(U, !0), {}.NODE_ENV !== "production" && Eo && (le = 0, he = !1, ee = null);
    const We = J && O.type !== "foreignObject";
    if (ee ? (H(
      x.dynamicChildren,
      ee,
      se,
      U,
      Q,
      We,
      ie
    ), {}.NODE_ENV !== "production" && Pa(x, O)) : he || Be(
      x,
      O,
      se,
      null,
      U,
      Q,
      We,
      ie,
      !1
    ), le > 0) {
      if (le & 16)
        P(
          se,
          O,
          ye,
          Oe,
          U,
          Q,
          J
        );
      else if (le & 2 && ye.class !== Oe.class && a(se, "class", null, Oe.class, J), le & 4 && a(se, "style", ye.style, Oe.style, J), le & 8) {
        const ut = O.dynamicProps;
        for (let R = 0; R < ut.length; R++) {
          const M = ut[R], W = ye[M], oe = Oe[M];
          (oe !== W || M === "value") && a(
            se,
            M,
            W,
            oe,
            J,
            x.children,
            U,
            Q,
            B
          );
        }
      }
      le & 1 && x.children !== O.children && f(se, O.children);
    } else
      !he && ee == null && P(
        se,
        O,
        ye,
        Oe,
        U,
        Q,
        J
      );
    ((Pe = Oe.onVnodeUpdated) || xe) && Zt(() => {
      Pe && $n(Pe, U, O, x), xe && cs(O, x, U, "updated");
    }, Q);
  }, H = (x, O, U, Q, J, ie, he) => {
    for (let se = 0; se < O.length; se++) {
      const le = x[se], ee = O[se], xe = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        le.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (le.type === ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ts(le, ee) || // - In the case of a component, it could contain anything.
        le.shapeFlag & 70) ? d(le.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          U
        )
      );
      _(
        le,
        ee,
        xe,
        null,
        Q,
        J,
        ie,
        he,
        !0
      );
    }
  }, P = (x, O, U, Q, J, ie, he) => {
    if (U !== Q) {
      if (U !== bt)
        for (const se in U)
          !Ta(se) && !(se in Q) && a(
            x,
            se,
            U[se],
            null,
            he,
            O.children,
            J,
            ie,
            B
          );
      for (const se in Q) {
        if (Ta(se))
          continue;
        const le = Q[se], ee = U[se];
        le !== ee && se !== "value" && a(
          x,
          se,
          ee,
          le,
          he,
          O.children,
          J,
          ie,
          B
        );
      }
      "value" in Q && a(x, "value", U.value, Q.value);
    }
  }, I = (x, O, U, Q, J, ie, he, se, le) => {
    const ee = O.el = x ? x.el : i(""), xe = O.anchor = x ? x.anchor : i("");
    let { patchFlag: ye, dynamicChildren: Oe, slotScopeIds: Pe } = O;
    ({}).NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Eo || ye & 2048) && (ye = 0, le = !1, Oe = null), Pe && (se = se ? se.concat(Pe) : Pe), x == null ? (s(ee, U, Q), s(xe, U, Q), D(
      O.children,
      U,
      xe,
      J,
      ie,
      he,
      se,
      le
    )) : ye > 0 && ye & 64 && Oe && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    x.dynamicChildren ? (H(
      x.dynamicChildren,
      Oe,
      U,
      J,
      ie,
      he,
      se
    ), {}.NODE_ENV !== "production" ? Pa(x, O) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (O.key != null || J && O === J.subTree) && Pa(
        x,
        O,
        !0
        /* shallow */
      )
    )) : Be(
      x,
      O,
      U,
      xe,
      J,
      ie,
      he,
      se,
      le
    );
  }, V = (x, O, U, Q, J, ie, he, se, le) => {
    O.slotScopeIds = se, x == null ? O.shapeFlag & 512 ? J.ctx.activate(
      O,
      U,
      Q,
      he,
      le
    ) : q(
      O,
      U,
      Q,
      J,
      ie,
      he,
      le
    ) : Y(x, O, le);
  }, q = (x, O, U, Q, J, ie, he) => {
    const se = x.component = A_(
      x,
      Q,
      J
    );
    if ({}.NODE_ENV !== "production" && se.type.__hmrId && Jb(se), {}.NODE_ENV !== "production" && (Na(x), Ts(se, "mount")), zr(x) && (se.ctx.renderer = _e), {}.NODE_ENV !== "production" && Ts(se, "init"), I_(se), {}.NODE_ENV !== "production" && Ns(se, "init"), se.asyncDep) {
      if (J && J.registerDep(se, z), !x.el) {
        const le = se.subTree = T(Ht);
        g(null, le, O, U);
      }
      return;
    }
    z(
      se,
      x,
      O,
      U,
      J,
      ie,
      he
    ), {}.NODE_ENV !== "production" && (Da(), Ns(se, "mount"));
  }, Y = (x, O, U) => {
    const Q = O.component = x.component;
    if (d1(x, O, U))
      if (Q.asyncDep && !Q.asyncResolved) {
        ({}).NODE_ENV !== "production" && Na(O), re(Q, O, U), {}.NODE_ENV !== "production" && Da();
        return;
      } else
        Q.next = O, zb(Q.update), Q.update();
    else
      O.el = x.el, Q.vnode = O;
  }, z = (x, O, U, Q, J, ie, he) => {
    const se = () => {
      if (x.isMounted) {
        let { next: xe, bu: ye, u: Oe, parent: Pe, vnode: We } = x, ut = xe, R;
        ({}).NODE_ENV !== "production" && Na(xe || x.vnode), Vo(x, !1), xe ? (xe.el = We.el, re(x, xe, he)) : xe = We, ye && po(ye), (R = xe.props && xe.props.onVnodeBeforeUpdate) && $n(R, Pe, xe, We), Vo(x, !0), {}.NODE_ENV !== "production" && Ts(x, "render");
        const M = _l(x);
        ({}).NODE_ENV !== "production" && Ns(x, "render");
        const W = x.subTree;
        x.subTree = M, {}.NODE_ENV !== "production" && Ts(x, "patch"), _(
          W,
          M,
          // parent may have changed if it's in a teleport
          d(W.el),
          // anchor may have changed if it's in a fragment
          de(W),
          x,
          J,
          ie
        ), {}.NODE_ENV !== "production" && Ns(x, "patch"), xe.el = M.el, ut === null && vf(x, M.el), Oe && Zt(Oe, J), (R = xe.props && xe.props.onVnodeUpdated) && Zt(
          () => $n(R, Pe, xe, We),
          J
        ), {}.NODE_ENV !== "production" && zm(x), {}.NODE_ENV !== "production" && Da();
      } else {
        let xe;
        const { el: ye, props: Oe } = O, { bm: Pe, m: We, parent: ut } = x, R = Zo(O);
        if (Vo(x, !1), Pe && po(Pe), !R && (xe = Oe && Oe.onVnodeBeforeMount) && $n(xe, ut, O), Vo(x, !0), ye && ct) {
          const M = () => {
            ({}).NODE_ENV !== "production" && Ts(x, "render"), x.subTree = _l(x), {}.NODE_ENV !== "production" && Ns(x, "render"), {}.NODE_ENV !== "production" && Ts(x, "hydrate"), ct(
              ye,
              x.subTree,
              x,
              J,
              null
            ), {}.NODE_ENV !== "production" && Ns(x, "hydrate");
          };
          R ? O.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !x.isUnmounted && M()
          ) : M();
        } else {
          ({}).NODE_ENV !== "production" && Ts(x, "render");
          const M = x.subTree = _l(x);
          ({}).NODE_ENV !== "production" && Ns(x, "render"), {}.NODE_ENV !== "production" && Ts(x, "patch"), _(
            null,
            M,
            U,
            Q,
            x,
            J,
            ie
          ), {}.NODE_ENV !== "production" && Ns(x, "patch"), O.el = M.el;
        }
        if (We && Zt(We, J), !R && (xe = Oe && Oe.onVnodeMounted)) {
          const M = O;
          Zt(
            () => $n(xe, ut, M),
            J
          );
        }
        (O.shapeFlag & 256 || ut && Zo(ut.vnode) && ut.vnode.shapeFlag & 256) && x.a && Zt(x.a, J), x.isMounted = !0, {}.NODE_ENV !== "production" && ed(x), O = U = Q = null;
      }
    }, le = x.effect = new vi(
      se,
      () => gi(ee),
      x.scope
      // track it in component's effect scope
    ), ee = x.update = () => le.run();
    ee.id = x.uid, Vo(x, !0), {}.NODE_ENV !== "production" && (le.onTrack = x.rtc ? (xe) => po(x.rtc, xe) : void 0, le.onTrigger = x.rtg ? (xe) => po(x.rtg, xe) : void 0, ee.ownerInstance = x), ee();
  }, re = (x, O, U) => {
    O.component = x;
    const Q = x.vnode.props;
    x.vnode = O, x.next = null, o0(x, O.props, Q, U), f0(x, O.children, U), ar(), Nh(), ir();
  }, Be = (x, O, U, Q, J, ie, he, se, le = !1) => {
    const ee = x && x.children, xe = x ? x.shapeFlag : 0, ye = O.children, { patchFlag: Oe, shapeFlag: Pe } = O;
    if (Oe > 0) {
      if (Oe & 128) {
        et(
          ee,
          ye,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le
        );
        return;
      } else if (Oe & 256) {
        pt(
          ee,
          ye,
          U,
          Q,
          J,
          ie,
          he,
          se,
          le
        );
        return;
      }
    }
    Pe & 8 ? (xe & 16 && B(ee, J, ie), ye !== ee && f(U, ye)) : xe & 16 ? Pe & 16 ? et(
      ee,
      ye,
      U,
      Q,
      J,
      ie,
      he,
      se,
      le
    ) : B(ee, J, ie, !0) : (xe & 8 && f(U, ""), Pe & 16 && D(
      ye,
      U,
      Q,
      J,
      ie,
      he,
      se,
      le
    ));
  }, pt = (x, O, U, Q, J, ie, he, se, le) => {
    x = x || Tr, O = O || Tr;
    const ee = x.length, xe = O.length, ye = Math.min(ee, xe);
    let Oe;
    for (Oe = 0; Oe < ye; Oe++) {
      const Pe = O[Oe] = le ? co(O[Oe]) : On(O[Oe]);
      _(
        x[Oe],
        Pe,
        U,
        null,
        J,
        ie,
        he,
        se,
        le
      );
    }
    ee > xe ? B(
      x,
      J,
      ie,
      !0,
      !1,
      ye
    ) : D(
      O,
      U,
      Q,
      J,
      ie,
      he,
      se,
      le,
      ye
    );
  }, et = (x, O, U, Q, J, ie, he, se, le) => {
    let ee = 0;
    const xe = O.length;
    let ye = x.length - 1, Oe = xe - 1;
    for (; ee <= ye && ee <= Oe; ) {
      const Pe = x[ee], We = O[ee] = le ? co(O[ee]) : On(O[ee]);
      if (ts(Pe, We))
        _(
          Pe,
          We,
          U,
          null,
          J,
          ie,
          he,
          se,
          le
        );
      else
        break;
      ee++;
    }
    for (; ee <= ye && ee <= Oe; ) {
      const Pe = x[ye], We = O[Oe] = le ? co(O[Oe]) : On(O[Oe]);
      if (ts(Pe, We))
        _(
          Pe,
          We,
          U,
          null,
          J,
          ie,
          he,
          se,
          le
        );
      else
        break;
      ye--, Oe--;
    }
    if (ee > ye) {
      if (ee <= Oe) {
        const Pe = Oe + 1, We = Pe < xe ? O[Pe].el : Q;
        for (; ee <= Oe; )
          _(
            null,
            O[ee] = le ? co(O[ee]) : On(O[ee]),
            U,
            We,
            J,
            ie,
            he,
            se,
            le
          ), ee++;
      }
    } else if (ee > Oe)
      for (; ee <= ye; )
        mt(x[ee], J, ie, !0), ee++;
    else {
      const Pe = ee, We = ee, ut = /* @__PURE__ */ new Map();
      for (ee = We; ee <= Oe; ee++) {
        const Fe = O[ee] = le ? co(O[ee]) : On(O[ee]);
        Fe.key != null && ({}.NODE_ENV !== "production" && ut.has(Fe.key) && X(
          "Duplicate keys found during update:",
          JSON.stringify(Fe.key),
          "Make sure keys are unique."
        ), ut.set(Fe.key, ee));
      }
      let R, M = 0;
      const W = Oe - We + 1;
      let oe = !1, Ee = 0;
      const Re = new Array(W);
      for (ee = 0; ee < W; ee++)
        Re[ee] = 0;
      for (ee = Pe; ee <= ye; ee++) {
        const Fe = x[ee];
        if (M >= W) {
          mt(Fe, J, ie, !0);
          continue;
        }
        let _t;
        if (Fe.key != null)
          _t = ut.get(Fe.key);
        else
          for (R = We; R <= Oe; R++)
            if (Re[R - We] === 0 && ts(Fe, O[R])) {
              _t = R;
              break;
            }
        _t === void 0 ? mt(Fe, J, ie, !0) : (Re[_t - We] = ee + 1, _t >= Ee ? Ee = _t : oe = !0, _(
          Fe,
          O[_t],
          U,
          null,
          J,
          ie,
          he,
          se,
          le
        ), M++);
      }
      const je = oe ? m0(Re) : Tr;
      for (R = je.length - 1, ee = W - 1; ee >= 0; ee--) {
        const Fe = We + ee, _t = O[Fe], Le = Fe + 1 < xe ? O[Fe + 1].el : Q;
        Re[ee] === 0 ? _(
          null,
          _t,
          U,
          Le,
          J,
          ie,
          he,
          se,
          le
        ) : oe && (R < 0 || ee !== je[R] ? tt(_t, U, Le, 2) : R--);
      }
    }
  }, tt = (x, O, U, Q, J = null) => {
    const { el: ie, type: he, transition: se, children: le, shapeFlag: ee } = x;
    if (ee & 6) {
      tt(x.component.subTree, O, U, Q);
      return;
    }
    if (ee & 128) {
      x.suspense.move(O, U, Q);
      return;
    }
    if (ee & 64) {
      he.move(x, O, U, _e);
      return;
    }
    if (he === ne) {
      s(ie, O, U);
      for (let ye = 0; ye < le.length; ye++)
        tt(le[ye], O, U, Q);
      s(x.anchor, O, U);
      return;
    }
    if (he === So) {
      w(x, O, U);
      return;
    }
    if (Q !== 2 && ee & 1 && se)
      if (Q === 0)
        se.beforeEnter(ie), s(ie, O, U), Zt(() => se.enter(ie), J);
      else {
        const { leave: ye, delayLeave: Oe, afterLeave: Pe } = se, We = () => s(ie, O, U), ut = () => {
          ye(ie, () => {
            We(), Pe && Pe();
          });
        };
        Oe ? Oe(ie, We, ut) : ut();
      }
    else
      s(ie, O, U);
  }, mt = (x, O, U, Q = !1, J = !1) => {
    const {
      type: ie,
      props: he,
      ref: se,
      children: le,
      dynamicChildren: ee,
      shapeFlag: xe,
      patchFlag: ye,
      dirs: Oe
    } = x;
    if (se != null && Bl(se, null, U, x, !0), xe & 256) {
      O.ctx.deactivate(x);
      return;
    }
    const Pe = xe & 1 && Oe, We = !Zo(x);
    let ut;
    if (We && (ut = he && he.onVnodeBeforeUnmount) && $n(ut, O, x), xe & 6)
      lt(x.component, U, Q);
    else {
      if (xe & 128) {
        x.suspense.unmount(U, Q);
        return;
      }
      Pe && cs(x, null, O, "beforeUnmount"), xe & 64 ? x.type.remove(
        x,
        O,
        U,
        J,
        _e,
        Q
      ) : ee && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ie !== ne || ye > 0 && ye & 64) ? B(
        ee,
        O,
        U,
        !1,
        !0
      ) : (ie === ne && ye & 384 || !J && xe & 16) && B(le, O, U), Q && St(x);
    }
    (We && (ut = he && he.onVnodeUnmounted) || Pe) && Zt(() => {
      ut && $n(ut, O, x), Pe && cs(x, null, O, "unmounted");
    }, U);
  }, St = (x) => {
    const { type: O, el: U, anchor: Q, transition: J } = x;
    if (O === ne) {
      ({}).NODE_ENV !== "production" && x.patchFlag > 0 && x.patchFlag & 2048 && J && !J.persisted ? x.children.forEach((he) => {
        he.type === Ht ? o(he.el) : St(he);
      }) : Ot(U, Q);
      return;
    }
    if (O === So) {
      $(x);
      return;
    }
    const ie = () => {
      o(U), J && !J.persisted && J.afterLeave && J.afterLeave();
    };
    if (x.shapeFlag & 1 && J && !J.persisted) {
      const { leave: he, delayLeave: se } = J, le = () => he(U, ie);
      se ? se(x.el, ie, le) : le();
    } else
      ie();
  }, Ot = (x, O) => {
    let U;
    for (; x !== O; )
      U = h(x), o(x), x = U;
    o(O);
  }, lt = (x, O, U) => {
    ({}).NODE_ENV !== "production" && x.type.__hmrId && Xb(x);
    const { bum: Q, scope: J, update: ie, subTree: he, um: se } = x;
    Q && po(Q), J.stop(), ie && (ie.active = !1, mt(he, x, O, U)), se && Zt(se, O), Zt(() => {
      x.isUnmounted = !0;
    }, O), O && O.pendingBranch && !O.isUnmounted && x.asyncDep && !x.asyncResolved && x.suspenseId === O.pendingId && (O.deps--, O.deps === 0 && O.resolve()), {}.NODE_ENV !== "production" && n1(x);
  }, B = (x, O, U, Q = !1, J = !1, ie = 0) => {
    for (let he = ie; he < x.length; he++)
      mt(x[he], O, U, Q, J);
  }, de = (x) => x.shapeFlag & 6 ? de(x.component.subTree) : x.shapeFlag & 128 ? x.suspense.next() : h(x.anchor || x.el), ue = (x, O, U) => {
    x == null ? O._vnode && mt(O._vnode, null, null, !0) : _(O._vnode || null, x, O, null, null, null, U), Nh(), Fl(), O._vnode = x;
  }, _e = {
    p: _,
    um: mt,
    m: tt,
    r: St,
    mt: q,
    mc: D,
    pc: Be,
    pbc: H,
    n: de,
    o: e
  };
  let Ye, ct;
  return t && ([Ye, ct] = t(
    _e
  )), {
    render: ue,
    hydrate: Ye,
    createApp: e0(ue, Ye)
  };
}
function Vo({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Pa(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (ge(s) && ge(o))
    for (let a = 0; a < s.length; a++) {
      const r = s[a];
      let i = o[a];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = o[a] = co(o[a]), i.el = r.el), n || Pa(r, i)), i.type === To && (i.el = r.el), {}.NODE_ENV !== "production" && i.type === Ht && !i.el && (i.el = r.el);
    }
}
function m0(e) {
  const t = e.slice(), n = [0];
  let s, o, a, r, i;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const c = e[s];
    if (c !== 0) {
      if (o = n[n.length - 1], e[o] < c) {
        t[s] = o, n.push(s);
        continue;
      }
      for (a = 0, r = n.length - 1; a < r; )
        i = a + r >> 1, e[n[i]] < c ? a = i + 1 : r = i;
      c < e[n[a]] && (a > 0 && (t[s] = n[a - 1]), n[a] = s);
    }
  }
  for (a = n.length, r = n[a - 1]; a-- > 0; )
    n[a] = r, r = t[r];
  return n;
}
const _0 = (e) => e.__isTeleport, Ar = (e) => e && (e.disabled || e.disabled === ""), Gh = (e) => typeof SVGElement < "u" && e instanceof SVGElement, id = (e, t) => {
  const n = e && e.to;
  if (xt(n))
    if (t) {
      const s = t(n);
      return s || {}.NODE_ENV !== "production" && X(
        `Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
      ), s;
    } else
      return {}.NODE_ENV !== "production" && X(
        "Current renderer does not support string target for Teleports. (missing querySelector renderer option)"
      ), null;
  else
    return {}.NODE_ENV !== "production" && !n && !Ar(e) && X(`Invalid Teleport target: ${n}`), n;
}, v0 = {
  __isTeleport: !0,
  process(e, t, n, s, o, a, r, i, l, c) {
    const {
      mc: f,
      pc: d,
      pbc: h,
      o: { insert: p, querySelector: m, createText: _, createComment: y }
    } = c, g = Ar(t.props);
    let { shapeFlag: v, children: S, dynamicChildren: w } = t;
    if ({}.NODE_ENV !== "production" && Eo && (l = !1, w = null), e == null) {
      const $ = t.el = {}.NODE_ENV !== "production" ? y("teleport start") : _(""), C = t.anchor = {}.NODE_ENV !== "production" ? y("teleport end") : _("");
      p($, n, s), p(C, n, s);
      const N = t.target = id(t.props, m), A = t.targetAnchor = _("");
      N ? (p(A, N), r = r || Gh(N)) : {}.NODE_ENV !== "production" && !g && X("Invalid Teleport target on mount:", N, `(${typeof N})`);
      const D = (F, H) => {
        v & 16 && f(
          S,
          F,
          H,
          o,
          a,
          r,
          i,
          l
        );
      };
      g ? D(n, C) : N && D(N, A);
    } else {
      t.el = e.el;
      const $ = t.anchor = e.anchor, C = t.target = e.target, N = t.targetAnchor = e.targetAnchor, A = Ar(e.props), D = A ? n : C, F = A ? $ : N;
      if (r = r || Gh(C), w ? (h(
        e.dynamicChildren,
        w,
        D,
        o,
        a,
        r,
        i
      ), Pa(e, t, !0)) : l || d(
        e,
        t,
        D,
        F,
        o,
        a,
        r,
        i,
        !1
      ), g)
        A || el(
          t,
          n,
          $,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const H = t.target = id(
          t.props,
          m
        );
        H ? el(
          t,
          H,
          null,
          c,
          0
        ) : {}.NODE_ENV !== "production" && X(
          "Invalid Teleport target on update:",
          C,
          `(${typeof C})`
        );
      } else
        A && el(
          t,
          C,
          N,
          c,
          1
        );
    }
    C_(t);
  },
  remove(e, t, n, s, { um: o, o: { remove: a } }, r) {
    const { shapeFlag: i, children: l, anchor: c, targetAnchor: f, target: d, props: h } = e;
    if (d && a(f), (r || !Ar(h)) && (a(c), i & 16))
      for (let p = 0; p < l.length; p++) {
        const m = l[p];
        o(
          m,
          t,
          n,
          !0,
          !!m.dynamicChildren
        );
      }
  },
  move: el,
  hydrate: g0
};
function el(e, t, n, { o: { insert: s }, m: o }, a = 2) {
  a === 0 && s(e.targetAnchor, t, n);
  const { el: r, anchor: i, shapeFlag: l, children: c, props: f } = e, d = a === 2;
  if (d && s(r, t, n), (!d || Ar(f)) && l & 16)
    for (let h = 0; h < c.length; h++)
      o(
        c[h],
        t,
        n,
        2
      );
  d && s(i, t, n);
}
function g0(e, t, n, s, o, a, {
  o: { nextSibling: r, parentNode: i, querySelector: l }
}, c) {
  const f = t.target = id(
    t.props,
    l
  );
  if (f) {
    const d = f._lpa || f.firstChild;
    if (t.shapeFlag & 16)
      if (Ar(t.props))
        t.anchor = c(
          r(e),
          t,
          i(e),
          n,
          s,
          o,
          a
        ), t.targetAnchor = d;
      else {
        t.anchor = r(e);
        let h = d;
        for (; h; )
          if (h = r(h), h && h.nodeType === 8 && h.data === "teleport anchor") {
            t.targetAnchor = h, f._lpa = t.targetAnchor && r(t.targetAnchor);
            break;
          }
        c(
          d,
          t,
          f,
          n,
          s,
          o,
          a
        );
      }
    C_(t);
  }
  return t.anchor && r(t.anchor);
}
const Ei = v0;
function C_(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const ne = Symbol.for("v-fgt"), To = Symbol.for("v-txt"), Ht = Symbol.for("v-cmt"), So = Symbol.for("v-stc"), Ma = [];
let Tn = null;
function b(e = !1) {
  Ma.push(Tn = e ? null : []);
}
function O_() {
  Ma.pop(), Tn = Ma[Ma.length - 1] || null;
}
let or = 1;
function ld(e) {
  or += e;
}
function k_(e) {
  return e.dynamicChildren = or > 0 ? Tn || Tr : null, O_(), or > 0 && Tn && Tn.push(e), e;
}
function E(e, t, n, s, o, a) {
  return k_(
    u(
      e,
      t,
      n,
      s,
      o,
      a,
      !0
      /* isBlock */
    )
  );
}
function Ce(e, t, n, s, o) {
  return k_(
    T(
      e,
      t,
      n,
      s,
      o,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Ys(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ts(e, t) {
  return {}.NODE_ENV !== "production" && t.shapeFlag & 6 && Er.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
let cd;
function y0(e) {
  cd = e;
}
const b0 = (...e) => N_(
  ...cd ? cd(e, jt) : e
), Cc = "__vInternal", T_ = ({ key: e }) => e ?? null, vl = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? xt(e) || Vt(e) || Ie(e) ? { i: jt, r: e, k: t, f: !!n } : e : null);
function u(e, t = null, n = null, s = 0, o = null, a = e === ne ? 0 : 1, r = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && T_(t),
    ref: t && vl(t),
    scopeId: Ec,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: jt
  };
  return i ? (Of(l, n), a & 128 && e.normalize(l)) : n && (l.shapeFlag |= xt(n) ? 8 : 16), {}.NODE_ENV !== "production" && l.key !== l.key && X("VNode created with invalid key (NaN). VNode type:", l.type), or > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Tn && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Tn.push(l), l;
}
const T = {}.NODE_ENV !== "production" ? b0 : N_;
function N_(e, t = null, n = null, s = 0, o = null, a = !1) {
  if ((!e || e === d_) && ({}.NODE_ENV !== "production" && !e && X(`Invalid vnode type when creating vnode: ${e}.`), e = Ht), Ys(e)) {
    const i = Gn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Of(i, n), or > 0 && !a && Tn && (i.shapeFlag & 6 ? Tn[Tn.indexOf(e)] = i : Tn.push(i)), i.patchFlag |= -2, i;
  }
  if (L_(e) && (e = e.__vccOpts), t) {
    t = rn(t);
    let { class: i, style: l } = t;
    i && !xt(i) && (t.class = Ne(i)), at(l) && (ei(l) && !ge(l) && (l = ht({}, l)), t.style = ps(l));
  }
  const r = xt(e) ? 1 : Xm(e) ? 128 : _0(e) ? 64 : at(e) ? 4 : Ie(e) ? 2 : 0;
  return {}.NODE_ENV !== "production" && r & 4 && ei(e) && (e = Ue(e), X(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), u(
    e,
    t,
    n,
    s,
    o,
    r,
    a,
    !0
  );
}
function rn(e) {
  return e ? ei(e) || Cc in e ? ht({}, e) : e : null;
}
function Gn(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: a, children: r } = e, i = t ? Dn(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && T_(i),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? ge(o) ? o.concat(vl(t)) : [o, vl(t)] : vl(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: {}.NODE_ENV !== "production" && a === -1 && ge(r) ? r.map(D_) : r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ne ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Gn(e.ssContent),
    ssFallback: e.ssFallback && Gn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function D_(e) {
  const t = Gn(e);
  return ge(e.children) && (t.children = e.children.map(D_)), t;
}
function ve(e = " ", t = 0) {
  return T(To, null, e, t);
}
function Cf(e, t) {
  const n = T(So, null, e);
  return n.staticCount = t, n;
}
function me(e = "", t = !1) {
  return t ? (b(), Ce(Ht, null, e)) : T(Ht, null, e);
}
function On(e) {
  return e == null || typeof e == "boolean" ? T(Ht) : ge(e) ? T(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? co(e) : T(To, null, String(e));
}
function co(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Gn(e);
}
function Of(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (ge(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Of(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Cc in t) ? t._ctx = jt : o === 3 && jt && (jt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    Ie(t) ? (t = { default: t, _ctx: jt }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ve(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Dn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Ne([t.class, s.class]));
      else if (o === "style")
        t.style = ps([t.style, s.style]);
      else if (Wr(o)) {
        const a = t[o], r = s[o];
        r && a !== r && !(ge(a) && a.includes(r)) && (t[o] = a ? [].concat(a, r) : r);
      } else
        o !== "" && (t[o] = s[o]);
  }
  return t;
}
function $n(e, t, n, s = null) {
  Vn(e, t, 7, [
    n,
    s
  ]);
}
const w0 = __();
let E0 = 0;
function A_(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || w0, a = {
    uid: E0++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new tf(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: g_(s, o),
    emitsOptions: Jm(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: bt,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: bt,
    data: bt,
    props: bt,
    attrs: bt,
    slots: bt,
    refs: bt,
    setupState: bt,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return {}.NODE_ENV !== "production" ? a.ctx = D1(a) : a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = a1.bind(null, a), e.ce && e.ce(a), a;
}
let Ut = null;
const An = () => Ut || jt;
let kf, mr, zh = "__VUE_INSTANCE_SETTERS__";
(mr = Ml()[zh]) || (mr = Ml()[zh] = []), mr.push((e) => Ut = e), kf = (e) => {
  mr.length > 1 ? mr.forEach((t) => t(e)) : mr[0](e);
};
const No = (e) => {
  kf(e), e.scope.on();
}, xo = () => {
  Ut && Ut.scope.off(), kf(null);
}, S0 = /* @__PURE__ */ zs("slot,component");
function ud(e, t) {
  const n = t.isNativeTag || bm;
  (S0(e) || n(e)) && X(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function R_(e) {
  return e.vnode.shapeFlag & 4;
}
let Vr = !1;
function I_(e, t = !1) {
  Vr = t;
  const { props: n, children: s } = e.vnode, o = R_(e);
  n0(e, n, o, t), d0(e, s);
  const a = o ? x0(e, t) : void 0;
  return Vr = !1, a;
}
function x0(e, t) {
  var n;
  const s = e.type;
  if ({}.NODE_ENV !== "production") {
    if (s.name && ud(s.name, e.appContext.config), s.components) {
      const a = Object.keys(s.components);
      for (let r = 0; r < a.length; r++)
        ud(a[r], e.appContext.config);
    }
    if (s.directives) {
      const a = Object.keys(s.directives);
      for (let r = 0; r < a.length; r++)
        e_(a[r]);
    }
    s.compilerOptions && Tf() && X(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = rf(new Proxy(e.ctx, Ra)), {}.NODE_ENV !== "production" && A1(e);
  const { setup: o } = s;
  if (o) {
    const a = e.setupContext = o.length > 1 ? M_(e) : null;
    No(e), ar();
    const r = ms(
      o,
      e,
      0,
      [{}.NODE_ENV !== "production" ? Cr(e.props) : e.props, a]
    );
    if (ir(), xo(), dc(r)) {
      if (r.then(xo, xo), t)
        return r.then((i) => {
          dd(e, i, t);
        }).catch((i) => {
          lr(i, e, 0);
        });
      if (e.asyncDep = r, {}.NODE_ENV !== "production" && !e.suspense) {
        const i = (n = s.name) != null ? n : "Anonymous";
        X(
          `Component <${i}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      dd(e, r, t);
  } else
    P_(e, t);
}
function dd(e, t, n) {
  Ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : at(t) ? ({}.NODE_ENV !== "production" && Ys(t) && X(
    "setup() should not return VNodes directly - return a render function instead."
  ), {}.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = cf(t), {}.NODE_ENV !== "production" && R1(e)) : {}.NODE_ENV !== "production" && t !== void 0 && X(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), P_(e, n);
}
let La, fd;
function $0(e) {
  La = e, fd = (t) => {
    t.render._rc && (t.withProxy = new Proxy(t.ctx, N1));
  };
}
const Tf = () => !La;
function P_(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && La && !s.render) {
      const o = s.template || xf(e).template;
      if (o) {
        ({}).NODE_ENV !== "production" && Ts(e, "compile");
        const { isCustomElement: a, compilerOptions: r } = e.appContext.config, { delimiters: i, compilerOptions: l } = s, c = ht(
          ht(
            {
              isCustomElement: a,
              delimiters: i
            },
            r
          ),
          l
        );
        s.render = La(o, c), {}.NODE_ENV !== "production" && Ns(e, "compile");
      }
    }
    e.render = s.render || qt, fd && fd(e);
  }
  No(e), ar(), K1(e), ir(), xo(), {}.NODE_ENV !== "production" && !s.render && e.render === qt && !t && (!La && s.template ? X(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : X("Component is missing template or render function."));
}
function Kh(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {}.NODE_ENV !== "production" ? {
      get(t, n) {
        return Ul(), en(e, "get", "$attrs"), t[n];
      },
      set() {
        return X("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return X("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(t, n) {
        return en(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function C0(e) {
  return e.slotsProxy || (e.slotsProxy = new Proxy(e.slots, {
    get(t, n) {
      return en(e, "get", "$slots"), t[n];
    }
  }));
}
function M_(e) {
  const t = (n) => {
    if ({}.NODE_ENV !== "production" && (e.exposed && X("expose() should be called only once per setup()."), n != null)) {
      let s = typeof n;
      s === "object" && (ge(n) ? s = "array" : Vt(n) && (s = "ref")), s !== "object" && X(
        `expose() should be passed a plain object, received ${s}.`
      );
    }
    e.exposed = n || {};
  };
  return {}.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return Kh(e);
    },
    get slots() {
      return C0(e);
    },
    get emit() {
      return (n, ...s) => e.emit(n, ...s);
    },
    expose: t
  }) : {
    get attrs() {
      return Kh(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Oc(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(cf(rf(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in qo)
          return qo[n](e);
      },
      has(t, n) {
        return n in t || n in qo;
      }
    }));
}
const O0 = /(?:^|[-_])(\w)/g, k0 = (e) => e.replace(O0, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function li(e, t = !0) {
  return Ie(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function kc(e, t, n = !1) {
  let s = li(t);
  if (!s && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (s = o[1]);
  }
  if (!s && e && e.parent) {
    const o = (a) => {
      for (const r in a)
        if (a[r] === t)
          return r;
    };
    s = o(
      e.components || e.parent.type.components
    ) || o(e.appContext.components);
  }
  return s ? k0(s) : n ? "App" : "Anonymous";
}
function L_(e) {
  return Ie(e) && "__vccOpts" in e;
}
const k = (e, t) => Fb(e, t, Vr);
function Ms(e, t, n) {
  const s = arguments.length;
  return s === 2 ? at(t) && !ge(t) ? Ys(t) ? T(e, null, [t]) : T(e, t) : T(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Ys(n) && (n = [n]), T(e, t, n));
}
const V_ = Symbol.for("v-scx"), F_ = () => {
  {
    const e = ln(V_);
    return e || {}.NODE_ENV !== "production" && X(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function pu(e) {
  return !!(e && e.__v_isShallow);
}
function U_() {
  if ({}.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, o = {
    header(d) {
      return at(d) ? d.__isVue ? ["div", e, "VueInstance"] : Vt(d) ? [
        "div",
        {},
        ["span", e, f(d)],
        "<",
        i(d.value),
        ">"
      ] : wo(d) ? [
        "div",
        {},
        ["span", e, pu(d) ? "ShallowReactive" : "Reactive"],
        "<",
        i(d),
        `>${Bs(d) ? " (readonly)" : ""}`
      ] : Bs(d) ? [
        "div",
        {},
        ["span", e, pu(d) ? "ShallowReadonly" : "Readonly"],
        "<",
        i(d),
        ">"
      ] : null : null;
    },
    hasBody(d) {
      return d && d.__isVue;
    },
    body(d) {
      if (d && d.__isVue)
        return [
          "div",
          {},
          ...a(d.$)
        ];
    }
  };
  function a(d) {
    const h = [];
    d.type.props && d.props && h.push(r("props", Ue(d.props))), d.setupState !== bt && h.push(r("setup", d.setupState)), d.data !== bt && h.push(r("data", Ue(d.data)));
    const p = l(d, "computed");
    p && h.push(r("computed", p));
    const m = l(d, "inject");
    return m && h.push(r("injected", m)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: d }]
    ]), h;
  }
  function r(d, h) {
    return h = ht({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        d
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          i(h[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function i(d, h = !0) {
    return typeof d == "number" ? ["span", t, d] : typeof d == "string" ? ["span", n, JSON.stringify(d)] : typeof d == "boolean" ? ["span", s, d] : at(d) ? ["object", { object: h ? Ue(d) : d }] : ["span", n, String(d)];
  }
  function l(d, h) {
    const p = d.type;
    if (Ie(p))
      return;
    const m = {};
    for (const _ in d.ctx)
      c(p, _, h) && (m[_] = d.ctx[_]);
    return m;
  }
  function c(d, h, p) {
    const m = d[p];
    if (ge(m) && m.includes(h) || at(m) && h in m || d.extends && c(d.extends, h, p) || d.mixins && d.mixins.some((_) => c(_, h, p)))
      return !0;
  }
  function f(d) {
    return pu(d) ? "ShallowRef" : d.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
function T0(e, t, n, s) {
  const o = n[s];
  if (o && j_(o, e))
    return o;
  const a = t();
  return a.memo = e.slice(), n[s] = a;
}
function j_(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let s = 0; s < n.length; s++)
    if (Mr(n[s], t[s]))
      return !1;
  return or > 0 && Tn && Tn.push(e), !0;
}
const hd = "3.3.4", N0 = {
  createComponentInstance: A_,
  setupComponent: I_,
  renderComponentRoot: _l,
  setCurrentRenderingInstance: oi,
  isVNode: Ys,
  normalizeVNode: On
}, D0 = N0, A0 = null, R0 = null, I0 = "http://www.w3.org/2000/svg", Wo = typeof document < "u" ? document : null, Jh = Wo && /* @__PURE__ */ Wo.createElement("template"), P0 = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t ? Wo.createElementNS(I0, e) : Wo.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => Wo.createTextNode(e),
  createComment: (e) => Wo.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Wo.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, a) {
    const r = n ? n.previousSibling : t.lastChild;
    if (o && (o === a || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === a || !(o = o.nextSibling)); )
        ;
    else {
      Jh.innerHTML = s ? `<svg>${e}</svg>` : e;
      const i = Jh.content;
      if (s) {
        const l = i.firstChild;
        for (; l.firstChild; )
          i.appendChild(l.firstChild);
        i.removeChild(l);
      }
      t.insertBefore(i, n);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function M0(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function L0(e, t, n) {
  const s = e.style, o = xt(n);
  if (n && !o) {
    if (t && !xt(t))
      for (const a in t)
        n[a] == null && pd(s, a, "");
    for (const a in n)
      pd(s, a, n[a]);
  } else {
    const a = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = a);
  }
}
const V0 = /[^\\];\s*$/, Xh = /\s*!important$/;
function pd(e, t, n) {
  if (ge(n))
    n.forEach((s) => pd(e, t, s));
  else if (n == null && (n = ""), {}.NODE_ENV !== "production" && V0.test(n) && X(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = F0(e, t);
    Xh.test(n) ? e.setProperty(
      kn(s),
      n.replace(Xh, ""),
      "important"
    ) : e[s] = n;
  }
}
const Qh = ["Webkit", "Moz", "ms"], mu = {};
function F0(e, t) {
  const n = mu[t];
  if (n)
    return n;
  let s = Nn(t);
  if (s !== "filter" && s in e)
    return mu[t] = s;
  s = Co(s);
  for (let o = 0; o < Qh.length; o++) {
    const a = Qh[o] + s;
    if (a in e)
      return mu[t] = a;
  }
  return t;
}
const Zh = "http://www.w3.org/1999/xlink";
function U0(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Zh, t.slice(6, t.length)) : e.setAttributeNS(Zh, t, n);
  else {
    const a = Jy(t);
    n == null || a && !Sm(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : n);
  }
}
function j0(e, t, n, s, o, a, r) {
  if (t === "innerHTML" || t === "textContent") {
    s && r(s, o, a), e[t] = n ?? "";
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    e._value = n;
    const c = i === "OPTION" ? e.getAttribute("value") : e.value, f = n ?? "";
    c !== f && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = Sm(n) : n == null && c === "string" ? (n = "", l = !0) : c === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (c) {
    ({}).NODE_ENV !== "production" && !l && X(
      `Failed setting prop "${t}" on <${i.toLowerCase()}>: value ${n} is invalid.`,
      c
    );
  }
  l && e.removeAttribute(t);
}
function Ps(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function H0(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function B0(e, t, n, s, o = null) {
  const a = e._vei || (e._vei = {}), r = a[t];
  if (s && r)
    r.value = s;
  else {
    const [i, l] = Y0(t);
    if (s) {
      const c = a[t] = z0(s, o);
      Ps(e, i, c, l);
    } else
      r && (H0(e, i, r, l), a[t] = void 0);
  }
}
const qh = /(?:Once|Passive|Capture)$/;
function Y0(e) {
  let t;
  if (qh.test(e)) {
    t = {};
    let s;
    for (; s = e.match(qh); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : kn(e.slice(2)), t];
}
let _u = 0;
const W0 = /* @__PURE__ */ Promise.resolve(), G0 = () => _u || (W0.then(() => _u = 0), _u = Date.now());
function z0(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Vn(
      K0(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = G0(), n;
}
function K0(e, t) {
  if (ge(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (o) => !o._stopped && s && s(o));
  } else
    return t;
}
const ep = /^on[a-z]/, J0 = (e, t, n, s, o = !1, a, r, i, l) => {
  t === "class" ? M0(e, s, o) : t === "style" ? L0(e, n, s) : Wr(t) ? Al(t) || B0(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : X0(e, t, s, o)) ? j0(
    e,
    t,
    s,
    a,
    r,
    i,
    l
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), U0(e, t, s, o));
};
function X0(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && ep.test(t) && Ie(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ep.test(t) && xt(n) ? !1 : t in e;
}
function H_(e, t) {
  const n = un(e);
  class s extends Tc {
    constructor(a) {
      super(n, a, t);
    }
  }
  return s.def = n, s;
}
const Q0 = (e) => H_(e, tv), Z0 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Tc extends Z0 {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : ({}.NODE_ENV !== "production" && this.shadowRoot && X(
      "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
    ), this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, yc(() => {
      this._connected || (vd(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const o of s)
        this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, o = !1) => {
      const { props: a, styles: r } = s;
      let i;
      if (a && !ge(a))
        for (const l in a) {
          const c = a[l];
          (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = Pl(this._props[l])), (i || (i = /* @__PURE__ */ Object.create(null)))[Nn(l)] = !0);
        }
      this._numberProps = i, o && this._resolveProps(s), this._applyStyles(r), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = ge(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && s.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of s.map(Nn))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(a) {
          this._setProp(o, a);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Nn(t);
    this._numberProps && this._numberProps[s] && (n = Pl(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, o = !0) {
    n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), s && (n === !0 ? this.setAttribute(kn(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(kn(t), n + "") : n || this.removeAttribute(kn(t))));
  }
  _update() {
    vd(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = T(this._def, ht({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0, {}.NODE_ENV !== "production" && (n.ceReload = (a) => {
        this._styles && (this._styles.forEach((r) => this.shadowRoot.removeChild(r)), this._styles.length = 0), this._applyStyles(a), this._instance = null, this._update();
      });
      const s = (a, r) => {
        this.dispatchEvent(
          new CustomEvent(a, {
            detail: r
          })
        );
      };
      n.emit = (a, ...r) => {
        s(a, r), kn(a) !== a && s(kn(a), r);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Tc) {
          n.parent = o._instance, n.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s), {}.NODE_ENV !== "production" && (this._styles || (this._styles = [])).push(s);
    });
  }
}
function q0(e = "$style") {
  {
    const t = An();
    if (!t)
      return {}.NODE_ENV !== "production" && X("useCssModule must be called inside setup()"), bt;
    const n = t.type.__cssModules;
    if (!n)
      return {}.NODE_ENV !== "production" && X("Current instance does not have CSS modules injected."), bt;
    const s = n[e];
    return s || ({}.NODE_ENV !== "production" && X(`Current instance does not have CSS module named "${e}".`), bt);
  }
}
function ew(e) {
  const t = An();
  if (!t) {
    ({}).NODE_ENV !== "production" && X("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (o = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((a) => _d(a, o));
  }, s = () => {
    const o = e(t.proxy);
    md(t.subTree, o), n(o);
  };
  Zm(s), dn(() => {
    const o = new MutationObserver(s);
    o.observe(t.subTree.el.parentNode, { childList: !0 }), Kr(() => o.disconnect());
  });
}
function md(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      md(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    _d(e.el, t);
  else if (e.type === ne)
    e.children.forEach((n) => md(n, t));
  else if (e.type === So) {
    let { el: n, anchor: s } = e;
    for (; n && (_d(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function _d(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
const oo = "transition", ia = "animation", Nc = (e, { slots: t }) => Ms(t_, Y_(e), t);
Nc.displayName = "Transition";
const B_ = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, tw = Nc.props = /* @__PURE__ */ ht(
  {},
  bf,
  B_
), Fo = (e, t = []) => {
  ge(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, tp = (e) => e ? ge(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Y_(e) {
  const t = {};
  for (const P in e)
    P in B_ || (t[P] = e[P]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: o,
    enterFromClass: a = `${n}-enter-from`,
    enterActiveClass: r = `${n}-enter-active`,
    enterToClass: i = `${n}-enter-to`,
    appearFromClass: l = a,
    appearActiveClass: c = r,
    appearToClass: f = i,
    leaveFromClass: d = `${n}-leave-from`,
    leaveActiveClass: h = `${n}-leave-active`,
    leaveToClass: p = `${n}-leave-to`
  } = e, m = nw(o), _ = m && m[0], y = m && m[1], {
    onBeforeEnter: g,
    onEnter: v,
    onEnterCancelled: S,
    onLeave: w,
    onLeaveCancelled: $,
    onBeforeAppear: C = g,
    onAppear: N = v,
    onAppearCancelled: A = S
  } = t, D = (P, I, V) => {
    io(P, I ? f : i), io(P, I ? c : r), V && V();
  }, F = (P, I) => {
    P._isLeaving = !1, io(P, d), io(P, p), io(P, h), I && I();
  }, H = (P) => (I, V) => {
    const q = P ? N : v, Y = () => D(I, P, V);
    Fo(q, [I, Y]), np(() => {
      io(I, P ? l : a), Ds(I, P ? f : i), tp(q) || sp(I, s, _, Y);
    });
  };
  return ht(t, {
    onBeforeEnter(P) {
      Fo(g, [P]), Ds(P, a), Ds(P, r);
    },
    onBeforeAppear(P) {
      Fo(C, [P]), Ds(P, l), Ds(P, c);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(P, I) {
      P._isLeaving = !0;
      const V = () => F(P, I);
      Ds(P, d), G_(), Ds(P, h), np(() => {
        P._isLeaving && (io(P, d), Ds(P, p), tp(w) || sp(P, s, y, V));
      }), Fo(w, [P, V]);
    },
    onEnterCancelled(P) {
      D(P, !1), Fo(S, [P]);
    },
    onAppearCancelled(P) {
      D(P, !0), Fo(A, [P]);
    },
    onLeaveCancelled(P) {
      F(P), Fo($, [P]);
    }
  });
}
function nw(e) {
  if (e == null)
    return null;
  if (at(e))
    return [vu(e.enter), vu(e.leave)];
  {
    const t = vu(e);
    return [t, t];
  }
}
function vu(e) {
  const t = Pl(e);
  return {}.NODE_ENV !== "production" && uf(t, "<transition> explicit duration"), t;
}
function Ds(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function io(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function np(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let sw = 0;
function sp(e, t, n, s) {
  const o = e._endId = ++sw, a = () => {
    o === e._endId && s();
  };
  if (n)
    return setTimeout(a, n);
  const { type: r, timeout: i, propCount: l } = W_(e, t);
  if (!r)
    return s();
  const c = r + "end";
  let f = 0;
  const d = () => {
    e.removeEventListener(c, h), a();
  }, h = (p) => {
    p.target === e && ++f >= l && d();
  };
  setTimeout(() => {
    f < l && d();
  }, i + 1), e.addEventListener(c, h);
}
function W_(e, t) {
  const n = window.getComputedStyle(e), s = (m) => (n[m] || "").split(", "), o = s(`${oo}Delay`), a = s(`${oo}Duration`), r = op(o, a), i = s(`${ia}Delay`), l = s(`${ia}Duration`), c = op(i, l);
  let f = null, d = 0, h = 0;
  t === oo ? r > 0 && (f = oo, d = r, h = a.length) : t === ia ? c > 0 && (f = ia, d = c, h = l.length) : (d = Math.max(r, c), f = d > 0 ? r > c ? oo : ia : null, h = f ? f === oo ? a.length : l.length : 0);
  const p = f === oo && /\b(transform|all)(,|$)/.test(
    s(`${oo}Property`).toString()
  );
  return {
    type: f,
    timeout: d,
    propCount: h,
    hasTransform: p
  };
}
function op(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => rp(n) + rp(e[s])));
}
function rp(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function G_() {
  return document.body.offsetHeight;
}
const z_ = /* @__PURE__ */ new WeakMap(), K_ = /* @__PURE__ */ new WeakMap(), J_ = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ ht({}, tw, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = An(), s = yf();
    let o, a;
    return $c(() => {
      if (!o.length)
        return;
      const r = e.moveClass || `${e.name || "v"}-move`;
      if (!cw(
        o[0].el,
        n.vnode.el,
        r
      ))
        return;
      o.forEach(aw), o.forEach(iw);
      const i = o.filter(lw);
      G_(), i.forEach((l) => {
        const c = l.el, f = c.style;
        Ds(c, r), f.transform = f.webkitTransform = f.transitionDuration = "";
        const d = c._moveCb = (h) => {
          h && h.target !== c || (!h || /transform$/.test(h.propertyName)) && (c.removeEventListener("transitionend", d), c._moveCb = null, io(c, r));
        };
        c.addEventListener("transitionend", d);
      });
    }), () => {
      const r = Ue(e), i = Y_(r);
      let l = r.tag || ne;
      o = a, a = t.default ? Sc(t.default()) : [];
      for (let c = 0; c < a.length; c++) {
        const f = a[c];
        f.key != null ? sr(
          f,
          Lr(f, i, s, n)
        ) : {}.NODE_ENV !== "production" && X("<TransitionGroup> children must be keyed.");
      }
      if (o)
        for (let c = 0; c < o.length; c++) {
          const f = o[c];
          sr(
            f,
            Lr(f, i, s, n)
          ), z_.set(f, f.el.getBoundingClientRect());
        }
      return T(l, null, a);
    };
  }
}, ow = (e) => delete e.mode;
J_.props;
const rw = J_;
function aw(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function iw(e) {
  K_.set(e, e.el.getBoundingClientRect());
}
function lw(e) {
  const t = z_.get(e), n = K_.get(e), s = t.left - n.left, o = t.top - n.top;
  if (s || o) {
    const a = e.el.style;
    return a.transform = a.webkitTransform = `translate(${s}px,${o}px)`, a.transitionDuration = "0s", e;
  }
}
function cw(e, t, n) {
  const s = e.cloneNode();
  e._vtc && e._vtc.forEach((r) => {
    r.split(/\s+/).forEach((i) => i && s.classList.remove(i));
  }), n.split(/\s+/).forEach((r) => r && s.classList.add(r)), s.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(s);
  const { hasTransform: a } = W_(s);
  return o.removeChild(s), a;
}
const Do = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ge(t) ? (n) => po(t, n) : t;
};
function uw(e) {
  e.target.composing = !0;
}
function ap(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ke = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e._assign = Do(o);
    const a = s || o.props && o.props.type === "number";
    Ps(e, t ? "change" : "input", (r) => {
      if (r.target.composing)
        return;
      let i = e.value;
      n && (i = i.trim()), a && (i = Il(i)), e._assign(i);
    }), n && Ps(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ps(e, "compositionstart", uw), Ps(e, "compositionend", ap), Ps(e, "change", ap));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: o } }, a) {
    if (e._assign = Do(a), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (o || e.type === "number") && Il(e.value) === t))
      return;
    const r = t ?? "";
    e.value !== r && (e.value = r);
  }
}, Wt = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e._assign = Do(n), Ps(e, "change", () => {
      const s = e._modelValue, o = Fr(e), a = e.checked, r = e._assign;
      if (ge(s)) {
        const i = hc(s, o), l = i !== -1;
        if (a && !l)
          r(s.concat(o));
        else if (!a && l) {
          const c = [...s];
          c.splice(i, 1), r(c);
        }
      } else if (rr(s)) {
        const i = new Set(s);
        a ? i.add(o) : i.delete(o), r(i);
      } else
        r(X_(e, a));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: ip,
  beforeUpdate(e, t, n) {
    e._assign = Do(n), ip(e, t, n);
  }
};
function ip(e, { value: t, oldValue: n }, s) {
  e._modelValue = t, ge(t) ? e.checked = hc(t, s.props.value) > -1 : rr(t) ? e.checked = t.has(s.props.value) : t !== n && (e.checked = Oo(t, X_(e, !0)));
}
const Nf = {
  created(e, { value: t }, n) {
    e.checked = Oo(t, n.props.value), e._assign = Do(n), Ps(e, "change", () => {
      e._assign(Fr(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e._assign = Do(s), t !== n && (e.checked = Oo(t, s.props.value));
  }
}, vn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const o = rr(t);
    Ps(e, "change", () => {
      const a = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => n ? Il(Fr(r)) : Fr(r)
      );
      e._assign(
        e.multiple ? o ? new Set(a) : a : a[0]
      );
    }), e._assign = Do(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    lp(e, t);
  },
  beforeUpdate(e, t, n) {
    e._assign = Do(n);
  },
  updated(e, { value: t }) {
    lp(e, t);
  }
};
function lp(e, t) {
  const n = e.multiple;
  if (n && !ge(t) && !rr(t)) {
    ({}).NODE_ENV !== "production" && X(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let s = 0, o = e.options.length; s < o; s++) {
    const a = e.options[s], r = Fr(a);
    if (n)
      ge(t) ? a.selected = hc(t, r) > -1 : a.selected = t.has(r);
    else if (Oo(Fr(a), t)) {
      e.selectedIndex !== s && (e.selectedIndex = s);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function Fr(e) {
  return "_value" in e ? e._value : e.value;
}
function X_(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Df = {
  created(e, t, n) {
    tl(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    tl(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    tl(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    tl(e, t, n, s, "updated");
  }
};
function Q_(e, t) {
  switch (e) {
    case "SELECT":
      return vn;
    case "TEXTAREA":
      return Ke;
    default:
      switch (t) {
        case "checkbox":
          return Wt;
        case "radio":
          return Nf;
        default:
          return Ke;
      }
  }
}
function tl(e, t, n, s, o) {
  const r = Q_(
    e.tagName,
    n.props && n.props.type
  )[o];
  r && r(e, t, n, s);
}
function dw() {
  Ke.getSSRProps = ({ value: e }) => ({ value: e }), Nf.getSSRProps = ({ value: e }, t) => {
    if (t.props && Oo(t.props.value, e))
      return { checked: !0 };
  }, Wt.getSSRProps = ({ value: e }, t) => {
    if (ge(e)) {
      if (t.props && hc(e, t.props.value) > -1)
        return { checked: !0 };
    } else if (rr(e)) {
      if (t.props && e.has(t.props.value))
        return { checked: !0 };
    } else if (e)
      return { checked: !0 };
  }, Df.getSSRProps = (e, t) => {
    if (typeof t.type != "string")
      return;
    const n = Q_(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      t.type.toUpperCase(),
      t.props && t.props.type
    );
    if (n.getSSRProps)
      return n.getSSRProps(e, t);
  };
}
const fw = ["ctrl", "shift", "alt", "meta"], hw = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => fw.some((n) => e[`${n}Key`] && !t.includes(n))
}, kt = (e, t) => (n, ...s) => {
  for (let o = 0; o < t.length; o++) {
    const a = hw[t[o]];
    if (a && a(n, t))
      return;
  }
  return e(n, ...s);
}, pw = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Af = (e, t) => (n) => {
  if (!("key" in n))
    return;
  const s = kn(n.key);
  if (t.some((o) => o === s || pw[o] === s))
    return e(n);
}, Dc = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : la(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), la(e, !0), s.enter(e)) : s.leave(e, () => {
      la(e, !1);
    }) : la(e, t));
  },
  beforeUnmount(e, { value: t }) {
    la(e, t);
  }
};
function la(e, t) {
  e.style.display = t ? e._vod : "none";
}
function mw() {
  Dc.getSSRProps = ({ value: e }) => {
    if (!e)
      return { style: { display: "none" } };
  };
}
const Z_ = /* @__PURE__ */ ht({ patchProp: J0 }, P0);
let Va, cp = !1;
function q_() {
  return Va || (Va = S_(Z_));
}
function ev() {
  return Va = cp ? Va : x_(Z_), cp = !0, Va;
}
const vd = (...e) => {
  q_().render(...e);
}, tv = (...e) => {
  ev().hydrate(...e);
}, Un = (...e) => {
  const t = q_().createApp(...e);
  ({}).NODE_ENV !== "production" && (nv(t), sv(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const o = ov(s);
    if (!o)
      return;
    const a = t._component;
    !Ie(a) && !a.render && !a.template && (a.template = o.innerHTML), o.innerHTML = "";
    const r = n(o, !1, o instanceof SVGElement);
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
}, _w = (...e) => {
  const t = ev().createApp(...e);
  ({}).NODE_ENV !== "production" && (nv(t), sv(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const o = ov(s);
    if (o)
      return n(o, !0, o instanceof SVGElement);
  }, t;
};
function nv(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Gy(t) || zy(t),
    writable: !1
  });
}
function sv(e) {
  if (Tf()) {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        X(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, s = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return X(s), n;
      },
      set() {
        X(s);
      }
    });
  }
}
function ov(e) {
  if (xt(e)) {
    const t = document.querySelector(e);
    return {}.NODE_ENV !== "production" && !t && X(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return {}.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && X(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
let up = !1;
const vw = () => {
  up || (up = !0, dw(), mw());
};
function gw() {
  U_();
}
({}).NODE_ENV !== "production" && gw();
const yw = () => {
  ({}).NODE_ENV !== "production" && X(
    'Runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  );
}, bw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition: t_,
  BaseTransitionPropsValidators: bf,
  Comment: Ht,
  EffectScope: tf,
  Fragment: ne,
  KeepAlive: x1,
  ReactiveEffect: vi,
  Static: So,
  Suspense: h1,
  Teleport: Ei,
  Text: To,
  Transition: Nc,
  TransitionGroup: rw,
  VueElement: Tc,
  assertNumber: uf,
  callWithAsyncErrorHandling: Vn,
  callWithErrorHandling: ms,
  camelize: Nn,
  capitalize: Co,
  cloneVNode: Gn,
  compatUtils: R0,
  compile: yw,
  computed: k,
  createApp: Un,
  createBlock: Ce,
  createCommentVNode: me,
  createElementBlock: E,
  createElementVNode: u,
  createHydrationRenderer: x_,
  createPropsRestProxy: W1,
  createRenderer: S_,
  createSSRApp: _w,
  createSlots: k1,
  createStaticVNode: Cf,
  createTextVNode: ve,
  createVNode: T,
  customRef: Ib,
  defineAsyncComponent: E1,
  defineComponent: un,
  defineCustomElement: H_,
  defineEmits: P1,
  defineExpose: M1,
  defineModel: F1,
  defineOptions: L1,
  defineProps: I1,
  defineSSRCustomElement: Q0,
  defineSlots: V1,
  get devtools() {
    return es;
  },
  effect: tb,
  effectScope: Qy,
  getCurrentInstance: An,
  getCurrentScope: Cm,
  getTransitionRawChildren: Sc,
  guardReactiveProps: rn,
  h: Ms,
  handleError: lr,
  hasInjectionContext: t0,
  hydrate: tv,
  initCustomFormatter: U_,
  initDirectivesForSSR: vw,
  inject: ln,
  isMemoSame: j_,
  isProxy: ei,
  isReactive: wo,
  isReadonly: Bs,
  isRef: Vt,
  isRuntimeOnly: Tf,
  isShallow: qa,
  isVNode: Ys,
  markRaw: rf,
  mergeDefaults: B1,
  mergeModels: Y1,
  mergeProps: Dn,
  nextTick: yc,
  normalizeClass: Ne,
  normalizeProps: yn,
  normalizeStyle: ps,
  onActivated: s_,
  onBeforeMount: wf,
  onBeforeUnmount: wi,
  onBeforeUpdate: a_,
  onDeactivated: o_,
  onErrorCaptured: u_,
  onMounted: dn,
  onRenderTracked: c_,
  onRenderTriggered: l_,
  onScopeDispose: Zy,
  onServerPrefetch: i_,
  onUnmounted: Kr,
  onUpdated: $c,
  openBlock: b,
  popScopeId: qe,
  provide: Ia,
  proxyRefs: cf,
  pushScopeId: Ze,
  queuePostFlushCb: bc,
  reactive: wt,
  readonly: of,
  ref: te,
  registerRuntimeCompiler: $0,
  render: vd,
  renderList: Ae,
  renderSlot: we,
  resolveComponent: Te,
  resolveDirective: Jr,
  resolveDynamicComponent: O1,
  resolveFilter: A0,
  resolveTransitionHooks: Lr,
  setBlockTracking: ld,
  setDevtoolsHook: pf,
  setTransitionHooks: sr,
  shallowReactive: sf,
  shallowReadonly: Cr,
  shallowRef: Fm,
  ssrContextKey: V_,
  ssrUtils: D0,
  stop: nb,
  toDisplayString: j,
  toHandlerKey: Rs,
  toHandlers: T1,
  toRaw: Ue,
  toRef: Lb,
  toRefs: $t,
  toValue: Db,
  transformVNodeArgs: y0,
  triggerRef: Nb,
  unref: G,
  useAttrs: j1,
  useCssModule: q0,
  useCssVars: ew,
  useModel: H1,
  useSSRContext: F_,
  useSlots: h_,
  useTransitionState: yf,
  vModelCheckbox: Wt,
  vModelDynamic: Df,
  vModelRadio: Nf,
  vModelSelect: vn,
  vModelText: Ke,
  vShow: Dc,
  version: hd,
  warn: X,
  watch: Xt,
  watchEffect: tn,
  watchPostEffect: Zm,
  watchSyncEffect: y1,
  withAsyncContext: G1,
  withCtx: K,
  withDefaults: U1,
  withDirectives: L,
  withKeys: Af,
  withMemo: T0,
  withModifiers: kt,
  withScopeId: i1
}, Symbol.toStringTag, { value: "Module" }));
function ww() {
  return "10000000-1000-4000-8000-100000000000".replace(
    /[018]/g,
    (e) => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)
  );
}
const gd = {}, Bt = (e, t, n = !1) => {
  const s = ww();
  return n && (gd[s] = {}), () => {
    const a = ln("store");
    let r = n ? gd[s] : a;
    return typeof r[e] > "u" && (r[e] = t()), r[e];
  };
}, Io = () => {
  const e = {};
  return {
    install: (t) => {
      t.config.globalProperties.$store = e, t.provide("store", e), t.config.globalProperties.$sharedStore = e, t.provide("sharedStore", gd);
    }
  };
};
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var rv;
function ae() {
  return rv.apply(null, arguments);
}
function Ew(e) {
  rv = e;
}
function os(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function er(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function vt(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Rf(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (vt(e, t))
      return !1;
  return !0;
}
function xn(e) {
  return e === void 0;
}
function Ws(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function Si(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function av(e, t) {
  var n = [], s, o = e.length;
  for (s = 0; s < o; ++s)
    n.push(t(e[s], s));
  return n;
}
function vo(e, t) {
  for (var n in t)
    vt(t, n) && (e[n] = t[n]);
  return vt(t, "toString") && (e.toString = t.toString), vt(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function bs(e, t, n, s) {
  return Nv(e, t, n, s, !0).utc();
}
function Sw() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function ze(e) {
  return e._pf == null && (e._pf = Sw()), e._pf;
}
var yd;
Array.prototype.some ? yd = Array.prototype.some : yd = function(e) {
  var t = Object(this), n = t.length >>> 0, s;
  for (s = 0; s < n; s++)
    if (s in t && e.call(this, t[s], s, t))
      return !0;
  return !1;
};
function If(e) {
  if (e._isValid == null) {
    var t = ze(e), n = yd.call(t.parsedDateParts, function(o) {
      return o != null;
    }), s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
    if (e._strict && (s = s && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = s;
    else
      return s;
  }
  return e._isValid;
}
function Ac(e) {
  var t = bs(NaN);
  return e != null ? vo(ze(t), e) : ze(t).userInvalidated = !0, t;
}
var dp = ae.momentProperties = [], gu = !1;
function Pf(e, t) {
  var n, s, o, a = dp.length;
  if (xn(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), xn(t._i) || (e._i = t._i), xn(t._f) || (e._f = t._f), xn(t._l) || (e._l = t._l), xn(t._strict) || (e._strict = t._strict), xn(t._tzm) || (e._tzm = t._tzm), xn(t._isUTC) || (e._isUTC = t._isUTC), xn(t._offset) || (e._offset = t._offset), xn(t._pf) || (e._pf = ze(t)), xn(t._locale) || (e._locale = t._locale), a > 0)
    for (n = 0; n < a; n++)
      s = dp[n], o = t[s], xn(o) || (e[s] = o);
  return e;
}
function xi(e) {
  Pf(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), gu === !1 && (gu = !0, ae.updateOffset(this), gu = !1);
}
function rs(e) {
  return e instanceof xi || e != null && e._isAMomentObject != null;
}
function iv(e) {
  ae.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function Kn(e, t) {
  var n = !0;
  return vo(function() {
    if (ae.deprecationHandler != null && ae.deprecationHandler(null, e), n) {
      var s = [], o, a, r, i = arguments.length;
      for (a = 0; a < i; a++) {
        if (o = "", typeof arguments[a] == "object") {
          o += `
[` + a + "] ";
          for (r in arguments[0])
            vt(arguments[0], r) && (o += r + ": " + arguments[0][r] + ", ");
          o = o.slice(0, -2);
        } else
          o = arguments[a];
        s.push(o);
      }
      iv(
        e + `
Arguments: ` + Array.prototype.slice.call(s).join("") + `
` + new Error().stack
      ), n = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var fp = {};
function lv(e, t) {
  ae.deprecationHandler != null && ae.deprecationHandler(e, t), fp[e] || (iv(t), fp[e] = !0);
}
ae.suppressDeprecationWarnings = !1;
ae.deprecationHandler = null;
function ws(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function xw(e) {
  var t, n;
  for (n in e)
    vt(e, n) && (t = e[n], ws(t) ? this[n] = t : this["_" + n] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function bd(e, t) {
  var n = vo({}, e), s;
  for (s in t)
    vt(t, s) && (er(e[s]) && er(t[s]) ? (n[s] = {}, vo(n[s], e[s]), vo(n[s], t[s])) : t[s] != null ? n[s] = t[s] : delete n[s]);
  for (s in e)
    vt(e, s) && !vt(t, s) && er(e[s]) && (n[s] = vo({}, n[s]));
  return n;
}
function Mf(e) {
  e != null && this.set(e);
}
var wd;
Object.keys ? wd = Object.keys : wd = function(e) {
  var t, n = [];
  for (t in e)
    vt(e, t) && n.push(t);
  return n;
};
var $w = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Cw(e, t, n) {
  var s = this._calendar[e] || this._calendar.sameElse;
  return ws(s) ? s.call(t, n) : s;
}
function gs(e, t, n) {
  var s = "" + Math.abs(e), o = t - s.length, a = e >= 0;
  return (a ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, o)).toString().substr(1) + s;
}
var Lf = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, nl = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, yu = {}, Rr = {};
function De(e, t, n, s) {
  var o = s;
  typeof s == "string" && (o = function() {
    return this[s]();
  }), e && (Rr[e] = o), t && (Rr[t[0]] = function() {
    return gs(o.apply(this, arguments), t[1], t[2]);
  }), n && (Rr[n] = function() {
    return this.localeData().ordinal(
      o.apply(this, arguments),
      e
    );
  });
}
function Ow(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function kw(e) {
  var t = e.match(Lf), n, s;
  for (n = 0, s = t.length; n < s; n++)
    Rr[t[n]] ? t[n] = Rr[t[n]] : t[n] = Ow(t[n]);
  return function(o) {
    var a = "", r;
    for (r = 0; r < s; r++)
      a += ws(t[r]) ? t[r].call(o, e) : t[r];
    return a;
  };
}
function gl(e, t) {
  return e.isValid() ? (t = cv(t, e.localeData()), yu[t] = yu[t] || kw(t), yu[t](e)) : e.localeData().invalidDate();
}
function cv(e, t) {
  var n = 5;
  function s(o) {
    return t.longDateFormat(o) || o;
  }
  for (nl.lastIndex = 0; n >= 0 && nl.test(e); )
    e = e.replace(
      nl,
      s
    ), nl.lastIndex = 0, n -= 1;
  return e;
}
var Tw = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Nw(e) {
  var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
  return t || !n ? t : (this._longDateFormat[e] = n.match(Lf).map(function(s) {
    return s === "MMMM" || s === "MM" || s === "DD" || s === "dddd" ? s.slice(1) : s;
  }).join(""), this._longDateFormat[e]);
}
var Dw = "Invalid date";
function Aw() {
  return this._invalidDate;
}
var Rw = "%d", Iw = /\d{1,2}/;
function Pw(e) {
  return this._ordinal.replace("%d", e);
}
var Mw = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function Lw(e, t, n, s) {
  var o = this._relativeTime[n];
  return ws(o) ? o(e, t, n, s) : o.replace(/%d/i, e);
}
function Vw(e, t) {
  var n = this._relativeTime[e > 0 ? "future" : "past"];
  return ws(n) ? n(t) : n.replace(/%s/i, t);
}
var Fa = {};
function fn(e, t) {
  var n = e.toLowerCase();
  Fa[n] = Fa[n + "s"] = Fa[t] = e;
}
function Jn(e) {
  return typeof e == "string" ? Fa[e] || Fa[e.toLowerCase()] : void 0;
}
function Vf(e) {
  var t = {}, n, s;
  for (s in e)
    vt(e, s) && (n = Jn(s), n && (t[n] = e[s]));
  return t;
}
var uv = {};
function hn(e, t) {
  uv[e] = t;
}
function Fw(e) {
  var t = [], n;
  for (n in e)
    vt(e, n) && t.push({ unit: n, priority: uv[n] });
  return t.sort(function(s, o) {
    return s.priority - o.priority;
  }), t;
}
function Rc(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function Yn(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function Xe(e) {
  var t = +e, n = 0;
  return t !== 0 && isFinite(t) && (n = Yn(t)), n;
}
function Xr(e, t) {
  return function(n) {
    return n != null ? (dv(this, e, n), ae.updateOffset(this, t), this) : Wl(this, e);
  };
}
function Wl(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function dv(e, t, n) {
  e.isValid() && !isNaN(n) && (t === "FullYear" && Rc(e.year()) && e.month() === 1 && e.date() === 29 ? (n = Xe(n), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    n,
    e.month(),
    Fc(n, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
}
function Uw(e) {
  return e = Jn(e), ws(this[e]) ? this[e]() : this;
}
function jw(e, t) {
  if (typeof e == "object") {
    e = Vf(e);
    var n = Fw(e), s, o = n.length;
    for (s = 0; s < o; s++)
      this[n[s].unit](e[n[s].unit]);
  } else if (e = Jn(e), ws(this[e]))
    return this[e](t);
  return this;
}
var fv = /\d/, jn = /\d\d/, hv = /\d{3}/, Ff = /\d{4}/, Ic = /[+-]?\d{6}/, Nt = /\d\d?/, pv = /\d\d\d\d?/, mv = /\d\d\d\d\d\d?/, Pc = /\d{1,3}/, Uf = /\d{1,4}/, Mc = /[+-]?\d{1,6}/, Qr = /\d+/, Lc = /[+-]?\d+/, Hw = /Z|[+-]\d\d:?\d\d/gi, Vc = /Z|[+-]\d\d(?::?\d\d)?/gi, Bw = /[+-]?\d+(\.\d{1,3})?/, $i = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Gl;
Gl = {};
function be(e, t, n) {
  Gl[e] = ws(t) ? t : function(s, o) {
    return s && n ? n : t;
  };
}
function Yw(e, t) {
  return vt(Gl, e) ? Gl[e](t._strict, t._locale) : new RegExp(Ww(e));
}
function Ww(e) {
  return Ln(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, n, s, o, a) {
        return n || s || o || a;
      }
    )
  );
}
function Ln(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Ed = {};
function Et(e, t) {
  var n, s = t, o;
  for (typeof e == "string" && (e = [e]), Ws(t) && (s = function(a, r) {
    r[t] = Xe(a);
  }), o = e.length, n = 0; n < o; n++)
    Ed[e[n]] = s;
}
function Ci(e, t) {
  Et(e, function(n, s, o, a) {
    o._w = o._w || {}, t(n, o._w, o, a);
  });
}
function Gw(e, t, n) {
  t != null && vt(Ed, e) && Ed[e](t, n._a, n, e);
}
var cn = 0, Ls = 1, fs = 2, zt = 3, ns = 4, Vs = 5, zo = 6, zw = 7, Kw = 8;
function Jw(e, t) {
  return (e % t + t) % t;
}
var Ft;
Array.prototype.indexOf ? Ft = Array.prototype.indexOf : Ft = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function Fc(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var n = Jw(t, 12);
  return e += (t - n) / 12, n === 1 ? Rc(e) ? 29 : 28 : 31 - n % 7 % 2;
}
De("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
De("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
De("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
fn("month", "M");
hn("month", 8);
be("M", Nt);
be("MM", Nt, jn);
be("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
be("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
Et(["M", "MM"], function(e, t) {
  t[Ls] = Xe(e) - 1;
});
Et(["MMM", "MMMM"], function(e, t, n, s) {
  var o = n._locale.monthsParse(e, s, n._strict);
  o != null ? t[Ls] = o : ze(n).invalidMonth = e;
});
var Xw = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), _v = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), vv = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Qw = $i, Zw = $i;
function qw(e, t) {
  return e ? os(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || vv).test(t) ? "format" : "standalone"][e.month()] : os(this._months) ? this._months : this._months.standalone;
}
function eE(e, t) {
  return e ? os(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[vv.test(t) ? "format" : "standalone"][e.month()] : os(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function tE(e, t, n) {
  var s, o, a, r = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s)
      a = bs([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(
        a,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[s] = this.months(a, "").toLocaleLowerCase();
  return n ? t === "MMM" ? (o = Ft.call(this._shortMonthsParse, r), o !== -1 ? o : null) : (o = Ft.call(this._longMonthsParse, r), o !== -1 ? o : null) : t === "MMM" ? (o = Ft.call(this._shortMonthsParse, r), o !== -1 ? o : (o = Ft.call(this._longMonthsParse, r), o !== -1 ? o : null)) : (o = Ft.call(this._longMonthsParse, r), o !== -1 ? o : (o = Ft.call(this._shortMonthsParse, r), o !== -1 ? o : null));
}
function nE(e, t, n) {
  var s, o, a;
  if (this._monthsParseExact)
    return tE.call(this, e, t, n);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
    if (o = bs([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp(
      "^" + this.months(o, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[s] = new RegExp(
      "^" + this.monthsShort(o, "").replace(".", "") + "$",
      "i"
    )), !n && !this._monthsParse[s] && (a = "^" + this.months(o, "") + "|^" + this.monthsShort(o, ""), this._monthsParse[s] = new RegExp(a.replace(".", ""), "i")), n && t === "MMMM" && this._longMonthsParse[s].test(e))
      return s;
    if (n && t === "MMM" && this._shortMonthsParse[s].test(e))
      return s;
    if (!n && this._monthsParse[s].test(e))
      return s;
  }
}
function gv(e, t) {
  var n;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = Xe(t);
    else if (t = e.localeData().monthsParse(t), !Ws(t))
      return e;
  }
  return n = Math.min(e.date(), Fc(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e;
}
function yv(e) {
  return e != null ? (gv(this, e), ae.updateOffset(this, !0), this) : Wl(this, "Month");
}
function sE() {
  return Fc(this.year(), this.month());
}
function oE(e) {
  return this._monthsParseExact ? (vt(this, "_monthsRegex") || bv.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (vt(this, "_monthsShortRegex") || (this._monthsShortRegex = Qw), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function rE(e) {
  return this._monthsParseExact ? (vt(this, "_monthsRegex") || bv.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (vt(this, "_monthsRegex") || (this._monthsRegex = Zw), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function bv() {
  function e(r, i) {
    return i.length - r.length;
  }
  var t = [], n = [], s = [], o, a;
  for (o = 0; o < 12; o++)
    a = bs([2e3, o]), t.push(this.monthsShort(a, "")), n.push(this.months(a, "")), s.push(this.months(a, "")), s.push(this.monthsShort(a, ""));
  for (t.sort(e), n.sort(e), s.sort(e), o = 0; o < 12; o++)
    t[o] = Ln(t[o]), n[o] = Ln(n[o]);
  for (o = 0; o < 24; o++)
    s[o] = Ln(s[o]);
  this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
De("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? gs(e, 4) : "+" + e;
});
De(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
De(0, ["YYYY", 4], 0, "year");
De(0, ["YYYYY", 5], 0, "year");
De(0, ["YYYYYY", 6, !0], 0, "year");
fn("year", "y");
hn("year", 1);
be("Y", Lc);
be("YY", Nt, jn);
be("YYYY", Uf, Ff);
be("YYYYY", Mc, Ic);
be("YYYYYY", Mc, Ic);
Et(["YYYYY", "YYYYYY"], cn);
Et("YYYY", function(e, t) {
  t[cn] = e.length === 2 ? ae.parseTwoDigitYear(e) : Xe(e);
});
Et("YY", function(e, t) {
  t[cn] = ae.parseTwoDigitYear(e);
});
Et("Y", function(e, t) {
  t[cn] = parseInt(e, 10);
});
function Ua(e) {
  return Rc(e) ? 366 : 365;
}
ae.parseTwoDigitYear = function(e) {
  return Xe(e) + (Xe(e) > 68 ? 1900 : 2e3);
};
var wv = Xr("FullYear", !0);
function aE() {
  return Rc(this.year());
}
function iE(e, t, n, s, o, a, r) {
  var i;
  return e < 100 && e >= 0 ? (i = new Date(e + 400, t, n, s, o, a, r), isFinite(i.getFullYear()) && i.setFullYear(e)) : i = new Date(e, t, n, s, o, a, r), i;
}
function ci(e) {
  var t, n;
  return e < 100 && e >= 0 ? (n = Array.prototype.slice.call(arguments), n[0] = e + 400, t = new Date(Date.UTC.apply(null, n)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function zl(e, t, n) {
  var s = 7 + t - n, o = (7 + ci(e, 0, s).getUTCDay() - t) % 7;
  return -o + s - 1;
}
function Ev(e, t, n, s, o) {
  var a = (7 + n - s) % 7, r = zl(e, s, o), i = 1 + 7 * (t - 1) + a + r, l, c;
  return i <= 0 ? (l = e - 1, c = Ua(l) + i) : i > Ua(e) ? (l = e + 1, c = i - Ua(e)) : (l = e, c = i), {
    year: l,
    dayOfYear: c
  };
}
function ui(e, t, n) {
  var s = zl(e.year(), t, n), o = Math.floor((e.dayOfYear() - s - 1) / 7) + 1, a, r;
  return o < 1 ? (r = e.year() - 1, a = o + Us(r, t, n)) : o > Us(e.year(), t, n) ? (a = o - Us(e.year(), t, n), r = e.year() + 1) : (r = e.year(), a = o), {
    week: a,
    year: r
  };
}
function Us(e, t, n) {
  var s = zl(e, t, n), o = zl(e + 1, t, n);
  return (Ua(e) - s + o) / 7;
}
De("w", ["ww", 2], "wo", "week");
De("W", ["WW", 2], "Wo", "isoWeek");
fn("week", "w");
fn("isoWeek", "W");
hn("week", 5);
hn("isoWeek", 5);
be("w", Nt);
be("ww", Nt, jn);
be("W", Nt);
be("WW", Nt, jn);
Ci(
  ["w", "ww", "W", "WW"],
  function(e, t, n, s) {
    t[s.substr(0, 1)] = Xe(e);
  }
);
function lE(e) {
  return ui(e, this._week.dow, this._week.doy).week;
}
var cE = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function uE() {
  return this._week.dow;
}
function dE() {
  return this._week.doy;
}
function fE(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function hE(e) {
  var t = ui(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
De("d", 0, "do", "day");
De("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
De("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
De("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
De("e", 0, 0, "weekday");
De("E", 0, 0, "isoWeekday");
fn("day", "d");
fn("weekday", "e");
fn("isoWeekday", "E");
hn("day", 11);
hn("weekday", 11);
hn("isoWeekday", 11);
be("d", Nt);
be("e", Nt);
be("E", Nt);
be("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
be("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
be("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
Ci(["dd", "ddd", "dddd"], function(e, t, n, s) {
  var o = n._locale.weekdaysParse(e, s, n._strict);
  o != null ? t.d = o : ze(n).invalidWeekday = e;
});
Ci(["d", "e", "E"], function(e, t, n, s) {
  t[s] = Xe(e);
});
function pE(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function mE(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function jf(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var _E = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Sv = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), vE = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), gE = $i, yE = $i, bE = $i;
function wE(e, t) {
  var n = os(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? jf(n, this._week.dow) : e ? n[e.day()] : n;
}
function EE(e) {
  return e === !0 ? jf(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function SE(e) {
  return e === !0 ? jf(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function xE(e, t, n) {
  var s, o, a, r = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s)
      a = bs([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(
        a,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(
        a,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(a, "").toLocaleLowerCase();
  return n ? t === "dddd" ? (o = Ft.call(this._weekdaysParse, r), o !== -1 ? o : null) : t === "ddd" ? (o = Ft.call(this._shortWeekdaysParse, r), o !== -1 ? o : null) : (o = Ft.call(this._minWeekdaysParse, r), o !== -1 ? o : null) : t === "dddd" ? (o = Ft.call(this._weekdaysParse, r), o !== -1 || (o = Ft.call(this._shortWeekdaysParse, r), o !== -1) ? o : (o = Ft.call(this._minWeekdaysParse, r), o !== -1 ? o : null)) : t === "ddd" ? (o = Ft.call(this._shortWeekdaysParse, r), o !== -1 || (o = Ft.call(this._weekdaysParse, r), o !== -1) ? o : (o = Ft.call(this._minWeekdaysParse, r), o !== -1 ? o : null)) : (o = Ft.call(this._minWeekdaysParse, r), o !== -1 || (o = Ft.call(this._weekdaysParse, r), o !== -1) ? o : (o = Ft.call(this._shortWeekdaysParse, r), o !== -1 ? o : null));
}
function $E(e, t, n) {
  var s, o, a;
  if (this._weekdaysParseExact)
    return xE.call(this, e, t, n);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
    if (o = bs([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp(
      "^" + this.weekdays(o, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysShort(o, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[s] = new RegExp(
      "^" + this.weekdaysMin(o, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[s] || (a = "^" + this.weekdays(o, "") + "|^" + this.weekdaysShort(o, "") + "|^" + this.weekdaysMin(o, ""), this._weekdaysParse[s] = new RegExp(a.replace(".", ""), "i")), n && t === "dddd" && this._fullWeekdaysParse[s].test(e))
      return s;
    if (n && t === "ddd" && this._shortWeekdaysParse[s].test(e))
      return s;
    if (n && t === "dd" && this._minWeekdaysParse[s].test(e))
      return s;
    if (!n && this._weekdaysParse[s].test(e))
      return s;
  }
}
function CE(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = pE(e, this.localeData()), this.add(e - t, "d")) : t;
}
function OE(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function kE(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = mE(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function TE(e) {
  return this._weekdaysParseExact ? (vt(this, "_weekdaysRegex") || Hf.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (vt(this, "_weekdaysRegex") || (this._weekdaysRegex = gE), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function NE(e) {
  return this._weekdaysParseExact ? (vt(this, "_weekdaysRegex") || Hf.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (vt(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = yE), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function DE(e) {
  return this._weekdaysParseExact ? (vt(this, "_weekdaysRegex") || Hf.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (vt(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = bE), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function Hf() {
  function e(f, d) {
    return d.length - f.length;
  }
  var t = [], n = [], s = [], o = [], a, r, i, l, c;
  for (a = 0; a < 7; a++)
    r = bs([2e3, 1]).day(a), i = Ln(this.weekdaysMin(r, "")), l = Ln(this.weekdaysShort(r, "")), c = Ln(this.weekdays(r, "")), t.push(i), n.push(l), s.push(c), o.push(i), o.push(l), o.push(c);
  t.sort(e), n.sort(e), s.sort(e), o.sort(e), this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function Bf() {
  return this.hours() % 12 || 12;
}
function AE() {
  return this.hours() || 24;
}
De("H", ["HH", 2], 0, "hour");
De("h", ["hh", 2], 0, Bf);
De("k", ["kk", 2], 0, AE);
De("hmm", 0, 0, function() {
  return "" + Bf.apply(this) + gs(this.minutes(), 2);
});
De("hmmss", 0, 0, function() {
  return "" + Bf.apply(this) + gs(this.minutes(), 2) + gs(this.seconds(), 2);
});
De("Hmm", 0, 0, function() {
  return "" + this.hours() + gs(this.minutes(), 2);
});
De("Hmmss", 0, 0, function() {
  return "" + this.hours() + gs(this.minutes(), 2) + gs(this.seconds(), 2);
});
function xv(e, t) {
  De(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
xv("a", !0);
xv("A", !1);
fn("hour", "h");
hn("hour", 13);
function $v(e, t) {
  return t._meridiemParse;
}
be("a", $v);
be("A", $v);
be("H", Nt);
be("h", Nt);
be("k", Nt);
be("HH", Nt, jn);
be("hh", Nt, jn);
be("kk", Nt, jn);
be("hmm", pv);
be("hmmss", mv);
be("Hmm", pv);
be("Hmmss", mv);
Et(["H", "HH"], zt);
Et(["k", "kk"], function(e, t, n) {
  var s = Xe(e);
  t[zt] = s === 24 ? 0 : s;
});
Et(["a", "A"], function(e, t, n) {
  n._isPm = n._locale.isPM(e), n._meridiem = e;
});
Et(["h", "hh"], function(e, t, n) {
  t[zt] = Xe(e), ze(n).bigHour = !0;
});
Et("hmm", function(e, t, n) {
  var s = e.length - 2;
  t[zt] = Xe(e.substr(0, s)), t[ns] = Xe(e.substr(s)), ze(n).bigHour = !0;
});
Et("hmmss", function(e, t, n) {
  var s = e.length - 4, o = e.length - 2;
  t[zt] = Xe(e.substr(0, s)), t[ns] = Xe(e.substr(s, 2)), t[Vs] = Xe(e.substr(o)), ze(n).bigHour = !0;
});
Et("Hmm", function(e, t, n) {
  var s = e.length - 2;
  t[zt] = Xe(e.substr(0, s)), t[ns] = Xe(e.substr(s));
});
Et("Hmmss", function(e, t, n) {
  var s = e.length - 4, o = e.length - 2;
  t[zt] = Xe(e.substr(0, s)), t[ns] = Xe(e.substr(s, 2)), t[Vs] = Xe(e.substr(o));
});
function RE(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var IE = /[ap]\.?m?\.?/i, PE = Xr("Hours", !0);
function ME(e, t, n) {
  return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
var Cv = {
  calendar: $w,
  longDateFormat: Tw,
  invalidDate: Dw,
  ordinal: Rw,
  dayOfMonthOrdinalParse: Iw,
  relativeTime: Mw,
  months: Xw,
  monthsShort: _v,
  week: cE,
  weekdays: _E,
  weekdaysMin: vE,
  weekdaysShort: Sv,
  meridiemParse: IE
}, At = {}, ca = {}, di;
function LE(e, t) {
  var n, s = Math.min(e.length, t.length);
  for (n = 0; n < s; n += 1)
    if (e[n] !== t[n])
      return n;
  return s;
}
function hp(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function VE(e) {
  for (var t = 0, n, s, o, a; t < e.length; ) {
    for (a = hp(e[t]).split("-"), n = a.length, s = hp(e[t + 1]), s = s ? s.split("-") : null; n > 0; ) {
      if (o = Uc(a.slice(0, n).join("-")), o)
        return o;
      if (s && s.length >= n && LE(a, s) >= n - 1)
        break;
      n--;
    }
    t++;
  }
  return di;
}
function FE(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Uc(e) {
  var t = null, n;
  if (At[e] === void 0 && typeof module < "u" && module && module.exports && FE(e))
    try {
      t = di._abbr, n = require, n("./locale/" + e), $o(t);
    } catch {
      At[e] = null;
    }
  return At[e];
}
function $o(e, t) {
  var n;
  return e && (xn(t) ? n = Js(e) : n = Yf(e, t), n ? di = n : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), di._abbr;
}
function Yf(e, t) {
  if (t !== null) {
    var n, s = Cv;
    if (t.abbr = e, At[e] != null)
      lv(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), s = At[e]._config;
    else if (t.parentLocale != null)
      if (At[t.parentLocale] != null)
        s = At[t.parentLocale]._config;
      else if (n = Uc(t.parentLocale), n != null)
        s = n._config;
      else
        return ca[t.parentLocale] || (ca[t.parentLocale] = []), ca[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return At[e] = new Mf(bd(s, t)), ca[e] && ca[e].forEach(function(o) {
      Yf(o.name, o.config);
    }), $o(e), At[e];
  } else
    return delete At[e], null;
}
function UE(e, t) {
  if (t != null) {
    var n, s, o = Cv;
    At[e] != null && At[e].parentLocale != null ? At[e].set(bd(At[e]._config, t)) : (s = Uc(e), s != null && (o = s._config), t = bd(o, t), s == null && (t.abbr = e), n = new Mf(t), n.parentLocale = At[e], At[e] = n), $o(e);
  } else
    At[e] != null && (At[e].parentLocale != null ? (At[e] = At[e].parentLocale, e === $o() && $o(e)) : At[e] != null && delete At[e]);
  return At[e];
}
function Js(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return di;
  if (!os(e)) {
    if (t = Uc(e), t)
      return t;
    e = [e];
  }
  return VE(e);
}
function jE() {
  return wd(At);
}
function Wf(e) {
  var t, n = e._a;
  return n && ze(e).overflow === -2 && (t = n[Ls] < 0 || n[Ls] > 11 ? Ls : n[fs] < 1 || n[fs] > Fc(n[cn], n[Ls]) ? fs : n[zt] < 0 || n[zt] > 24 || n[zt] === 24 && (n[ns] !== 0 || n[Vs] !== 0 || n[zo] !== 0) ? zt : n[ns] < 0 || n[ns] > 59 ? ns : n[Vs] < 0 || n[Vs] > 59 ? Vs : n[zo] < 0 || n[zo] > 999 ? zo : -1, ze(e)._overflowDayOfYear && (t < cn || t > fs) && (t = fs), ze(e)._overflowWeeks && t === -1 && (t = zw), ze(e)._overflowWeekday && t === -1 && (t = Kw), ze(e).overflow = t), e;
}
var HE = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, BE = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, YE = /Z|[+-]\d\d(?::?\d\d)?/, sl = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], bu = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], WE = /^\/?Date\((-?\d+)/i, GE = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, zE = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Ov(e) {
  var t, n, s = e._i, o = HE.exec(s) || BE.exec(s), a, r, i, l, c = sl.length, f = bu.length;
  if (o) {
    for (ze(e).iso = !0, t = 0, n = c; t < n; t++)
      if (sl[t][1].exec(o[1])) {
        r = sl[t][0], a = sl[t][2] !== !1;
        break;
      }
    if (r == null) {
      e._isValid = !1;
      return;
    }
    if (o[3]) {
      for (t = 0, n = f; t < n; t++)
        if (bu[t][1].exec(o[3])) {
          i = (o[2] || " ") + bu[t][0];
          break;
        }
      if (i == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!a && i != null) {
      e._isValid = !1;
      return;
    }
    if (o[4])
      if (YE.exec(o[4]))
        l = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = r + (i || "") + (l || ""), zf(e);
  } else
    e._isValid = !1;
}
function KE(e, t, n, s, o, a) {
  var r = [
    JE(e),
    _v.indexOf(t),
    parseInt(n, 10),
    parseInt(s, 10),
    parseInt(o, 10)
  ];
  return a && r.push(parseInt(a, 10)), r;
}
function JE(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function XE(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function QE(e, t, n) {
  if (e) {
    var s = Sv.indexOf(e), o = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (s !== o)
      return ze(n).weekdayMismatch = !0, n._isValid = !1, !1;
  }
  return !0;
}
function ZE(e, t, n) {
  if (e)
    return zE[e];
  if (t)
    return 0;
  var s = parseInt(n, 10), o = s % 100, a = (s - o) / 100;
  return a * 60 + o;
}
function kv(e) {
  var t = GE.exec(XE(e._i)), n;
  if (t) {
    if (n = KE(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !QE(t[1], n, e))
      return;
    e._a = n, e._tzm = ZE(t[8], t[9], t[10]), e._d = ci.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), ze(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function qE(e) {
  var t = WE.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (Ov(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (kv(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : ae.createFromInputFallback(e);
}
ae.createFromInputFallback = Kn(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Sr(e, t, n) {
  return e ?? t ?? n;
}
function eS(e) {
  var t = new Date(ae.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function Gf(e) {
  var t, n, s = [], o, a, r;
  if (!e._d) {
    for (o = eS(e), e._w && e._a[fs] == null && e._a[Ls] == null && tS(e), e._dayOfYear != null && (r = Sr(e._a[cn], o[cn]), (e._dayOfYear > Ua(r) || e._dayOfYear === 0) && (ze(e)._overflowDayOfYear = !0), n = ci(r, 0, e._dayOfYear), e._a[Ls] = n.getUTCMonth(), e._a[fs] = n.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = s[t] = o[t];
    for (; t < 7; t++)
      e._a[t] = s[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[zt] === 24 && e._a[ns] === 0 && e._a[Vs] === 0 && e._a[zo] === 0 && (e._nextDay = !0, e._a[zt] = 0), e._d = (e._useUTC ? ci : iE).apply(
      null,
      s
    ), a = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[zt] = 24), e._w && typeof e._w.d < "u" && e._w.d !== a && (ze(e).weekdayMismatch = !0);
  }
}
function tS(e) {
  var t, n, s, o, a, r, i, l, c;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (a = 1, r = 4, n = Sr(
    t.GG,
    e._a[cn],
    ui(Tt(), 1, 4).year
  ), s = Sr(t.W, 1), o = Sr(t.E, 1), (o < 1 || o > 7) && (l = !0)) : (a = e._locale._week.dow, r = e._locale._week.doy, c = ui(Tt(), a, r), n = Sr(t.gg, e._a[cn], c.year), s = Sr(t.w, c.week), t.d != null ? (o = t.d, (o < 0 || o > 6) && (l = !0)) : t.e != null ? (o = t.e + a, (t.e < 0 || t.e > 6) && (l = !0)) : o = a), s < 1 || s > Us(n, a, r) ? ze(e)._overflowWeeks = !0 : l != null ? ze(e)._overflowWeekday = !0 : (i = Ev(n, s, o, a, r), e._a[cn] = i.year, e._dayOfYear = i.dayOfYear);
}
ae.ISO_8601 = function() {
};
ae.RFC_2822 = function() {
};
function zf(e) {
  if (e._f === ae.ISO_8601) {
    Ov(e);
    return;
  }
  if (e._f === ae.RFC_2822) {
    kv(e);
    return;
  }
  e._a = [], ze(e).empty = !0;
  var t = "" + e._i, n, s, o, a, r, i = t.length, l = 0, c, f;
  for (o = cv(e._f, e._locale).match(Lf) || [], f = o.length, n = 0; n < f; n++)
    a = o[n], s = (t.match(Yw(a, e)) || [])[0], s && (r = t.substr(0, t.indexOf(s)), r.length > 0 && ze(e).unusedInput.push(r), t = t.slice(
      t.indexOf(s) + s.length
    ), l += s.length), Rr[a] ? (s ? ze(e).empty = !1 : ze(e).unusedTokens.push(a), Gw(a, s, e)) : e._strict && !s && ze(e).unusedTokens.push(a);
  ze(e).charsLeftOver = i - l, t.length > 0 && ze(e).unusedInput.push(t), e._a[zt] <= 12 && ze(e).bigHour === !0 && e._a[zt] > 0 && (ze(e).bigHour = void 0), ze(e).parsedDateParts = e._a.slice(0), ze(e).meridiem = e._meridiem, e._a[zt] = nS(
    e._locale,
    e._a[zt],
    e._meridiem
  ), c = ze(e).era, c !== null && (e._a[cn] = e._locale.erasConvertYear(c, e._a[cn])), Gf(e), Wf(e);
}
function nS(e, t, n) {
  var s;
  return n == null ? t : e.meridiemHour != null ? e.meridiemHour(t, n) : (e.isPM != null && (s = e.isPM(n), s && t < 12 && (t += 12), !s && t === 12 && (t = 0)), t);
}
function sS(e) {
  var t, n, s, o, a, r, i = !1, l = e._f.length;
  if (l === 0) {
    ze(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (o = 0; o < l; o++)
    a = 0, r = !1, t = Pf({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[o], zf(t), If(t) && (r = !0), a += ze(t).charsLeftOver, a += ze(t).unusedTokens.length * 10, ze(t).score = a, i ? a < s && (s = a, n = t) : (s == null || a < s || r) && (s = a, n = t, r && (i = !0));
  vo(e, n || t);
}
function oS(e) {
  if (!e._d) {
    var t = Vf(e._i), n = t.day === void 0 ? t.date : t.day;
    e._a = av(
      [t.year, t.month, n, t.hour, t.minute, t.second, t.millisecond],
      function(s) {
        return s && parseInt(s, 10);
      }
    ), Gf(e);
  }
}
function rS(e) {
  var t = new xi(Wf(Tv(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Tv(e) {
  var t = e._i, n = e._f;
  return e._locale = e._locale || Js(e._l), t === null || n === void 0 && t === "" ? Ac({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), rs(t) ? new xi(Wf(t)) : (Si(t) ? e._d = t : os(n) ? sS(e) : n ? zf(e) : aS(e), If(e) || (e._d = null), e));
}
function aS(e) {
  var t = e._i;
  xn(t) ? e._d = new Date(ae.now()) : Si(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? qE(e) : os(t) ? (e._a = av(t.slice(0), function(n) {
    return parseInt(n, 10);
  }), Gf(e)) : er(t) ? oS(e) : Ws(t) ? e._d = new Date(t) : ae.createFromInputFallback(e);
}
function Nv(e, t, n, s, o) {
  var a = {};
  return (t === !0 || t === !1) && (s = t, t = void 0), (n === !0 || n === !1) && (s = n, n = void 0), (er(e) && Rf(e) || os(e) && e.length === 0) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = o, a._l = n, a._i = e, a._f = t, a._strict = s, rS(a);
}
function Tt(e, t, n, s) {
  return Nv(e, t, n, s, !1);
}
var iS = Kn(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = Tt.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : Ac();
  }
), lS = Kn(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = Tt.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : Ac();
  }
);
function Dv(e, t) {
  var n, s;
  if (t.length === 1 && os(t[0]) && (t = t[0]), !t.length)
    return Tt();
  for (n = t[0], s = 1; s < t.length; ++s)
    (!t[s].isValid() || t[s][e](n)) && (n = t[s]);
  return n;
}
function cS() {
  var e = [].slice.call(arguments, 0);
  return Dv("isBefore", e);
}
function uS() {
  var e = [].slice.call(arguments, 0);
  return Dv("isAfter", e);
}
var dS = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, ua = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function fS(e) {
  var t, n = !1, s, o = ua.length;
  for (t in e)
    if (vt(e, t) && !(Ft.call(ua, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (s = 0; s < o; ++s)
    if (e[ua[s]]) {
      if (n)
        return !1;
      parseFloat(e[ua[s]]) !== Xe(e[ua[s]]) && (n = !0);
    }
  return !0;
}
function hS() {
  return this._isValid;
}
function pS() {
  return as(NaN);
}
function jc(e) {
  var t = Vf(e), n = t.year || 0, s = t.quarter || 0, o = t.month || 0, a = t.week || t.isoWeek || 0, r = t.day || 0, i = t.hour || 0, l = t.minute || 0, c = t.second || 0, f = t.millisecond || 0;
  this._isValid = fS(t), this._milliseconds = +f + c * 1e3 + // 1000
  l * 6e4 + // 1000 * 60
  i * 1e3 * 60 * 60, this._days = +r + a * 7, this._months = +o + s * 3 + n * 12, this._data = {}, this._locale = Js(), this._bubble();
}
function yl(e) {
  return e instanceof jc;
}
function Sd(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function mS(e, t, n) {
  var s = Math.min(e.length, t.length), o = Math.abs(e.length - t.length), a = 0, r;
  for (r = 0; r < s; r++)
    (n && e[r] !== t[r] || !n && Xe(e[r]) !== Xe(t[r])) && a++;
  return a + o;
}
function Av(e, t) {
  De(e, 0, 0, function() {
    var n = this.utcOffset(), s = "+";
    return n < 0 && (n = -n, s = "-"), s + gs(~~(n / 60), 2) + t + gs(~~n % 60, 2);
  });
}
Av("Z", ":");
Av("ZZ", "");
be("Z", Vc);
be("ZZ", Vc);
Et(["Z", "ZZ"], function(e, t, n) {
  n._useUTC = !0, n._tzm = Kf(Vc, e);
});
var _S = /([\+\-]|\d\d)/gi;
function Kf(e, t) {
  var n = (t || "").match(e), s, o, a;
  return n === null ? null : (s = n[n.length - 1] || [], o = (s + "").match(_S) || ["-", 0, 0], a = +(o[1] * 60) + Xe(o[2]), a === 0 ? 0 : o[0] === "+" ? a : -a);
}
function Jf(e, t) {
  var n, s;
  return t._isUTC ? (n = t.clone(), s = (rs(e) || Si(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + s), ae.updateOffset(n, !1), n) : Tt(e).local();
}
function xd(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
ae.updateOffset = function() {
};
function vS(e, t, n) {
  var s = this._offset || 0, o;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = Kf(Vc, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !n && (e = e * 60);
    return !this._isUTC && t && (o = xd(this)), this._offset = e, this._isUTC = !0, o != null && this.add(o, "m"), s !== e && (!t || this._changeInProgress ? Pv(
      this,
      as(e - s, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, ae.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? s : xd(this);
}
function gS(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function yS(e) {
  return this.utcOffset(0, e);
}
function bS(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(xd(this), "m")), this;
}
function wS() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = Kf(Hw, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function ES(e) {
  return this.isValid() ? (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function SS() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function xS() {
  if (!xn(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Pf(e, this), e = Tv(e), e._a ? (t = e._isUTC ? bs(e._a) : Tt(e._a), this._isDSTShifted = this.isValid() && mS(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function $S() {
  return this.isValid() ? !this._isUTC : !1;
}
function CS() {
  return this.isValid() ? this._isUTC : !1;
}
function Rv() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var OS = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, kS = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function as(e, t) {
  var n = e, s = null, o, a, r;
  return yl(e) ? n = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : Ws(e) || !isNaN(+e) ? (n = {}, t ? n[t] = +e : n.milliseconds = +e) : (s = OS.exec(e)) ? (o = s[1] === "-" ? -1 : 1, n = {
    y: 0,
    d: Xe(s[fs]) * o,
    h: Xe(s[zt]) * o,
    m: Xe(s[ns]) * o,
    s: Xe(s[Vs]) * o,
    ms: Xe(Sd(s[zo] * 1e3)) * o
    // the millisecond decimal point is included in the match
  }) : (s = kS.exec(e)) ? (o = s[1] === "-" ? -1 : 1, n = {
    y: Uo(s[2], o),
    M: Uo(s[3], o),
    w: Uo(s[4], o),
    d: Uo(s[5], o),
    h: Uo(s[6], o),
    m: Uo(s[7], o),
    s: Uo(s[8], o)
  }) : n == null ? n = {} : typeof n == "object" && ("from" in n || "to" in n) && (r = TS(
    Tt(n.from),
    Tt(n.to)
  ), n = {}, n.ms = r.milliseconds, n.M = r.months), a = new jc(n), yl(e) && vt(e, "_locale") && (a._locale = e._locale), yl(e) && vt(e, "_isValid") && (a._isValid = e._isValid), a;
}
as.fn = jc.prototype;
as.invalid = pS;
function Uo(e, t) {
  var n = e && parseFloat(e.replace(",", "."));
  return (isNaN(n) ? 0 : n) * t;
}
function pp(e, t) {
  var n = {};
  return n.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n;
}
function TS(e, t) {
  var n;
  return e.isValid() && t.isValid() ? (t = Jf(t, e), e.isBefore(t) ? n = pp(e, t) : (n = pp(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : { milliseconds: 0, months: 0 };
}
function Iv(e, t) {
  return function(n, s) {
    var o, a;
    return s !== null && !isNaN(+s) && (lv(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), a = n, n = s, s = a), o = as(n, s), Pv(this, o, e), this;
  };
}
function Pv(e, t, n, s) {
  var o = t._milliseconds, a = Sd(t._days), r = Sd(t._months);
  e.isValid() && (s = s ?? !0, r && gv(e, Wl(e, "Month") + r * n), a && dv(e, "Date", Wl(e, "Date") + a * n), o && e._d.setTime(e._d.valueOf() + o * n), s && ae.updateOffset(e, a || r));
}
var NS = Iv(1, "add"), DS = Iv(-1, "subtract");
function Mv(e) {
  return typeof e == "string" || e instanceof String;
}
function AS(e) {
  return rs(e) || Si(e) || Mv(e) || Ws(e) || IS(e) || RS(e) || e === null || e === void 0;
}
function RS(e) {
  var t = er(e) && !Rf(e), n = !1, s = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], o, a, r = s.length;
  for (o = 0; o < r; o += 1)
    a = s[o], n = n || vt(e, a);
  return t && n;
}
function IS(e) {
  var t = os(e), n = !1;
  return t && (n = e.filter(function(s) {
    return !Ws(s) && Mv(e);
  }).length === 0), t && n;
}
function PS(e) {
  var t = er(e) && !Rf(e), n = !1, s = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], o, a;
  for (o = 0; o < s.length; o += 1)
    a = s[o], n = n || vt(e, a);
  return t && n;
}
function MS(e, t) {
  var n = e.diff(t, "days", !0);
  return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
}
function LS(e, t) {
  arguments.length === 1 && (arguments[0] ? AS(arguments[0]) ? (e = arguments[0], t = void 0) : PS(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var n = e || Tt(), s = Jf(n, this).startOf("day"), o = ae.calendarFormat(this, s) || "sameElse", a = t && (ws(t[o]) ? t[o].call(this, n) : t[o]);
  return this.format(
    a || this.localeData().calendar(o, this, Tt(n))
  );
}
function VS() {
  return new xi(this);
}
function FS(e, t) {
  var n = rs(e) ? e : Tt(e);
  return this.isValid() && n.isValid() ? (t = Jn(t) || "millisecond", t === "millisecond" ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function US(e, t) {
  var n = rs(e) ? e : Tt(e);
  return this.isValid() && n.isValid() ? (t = Jn(t) || "millisecond", t === "millisecond" ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf()) : !1;
}
function jS(e, t, n, s) {
  var o = rs(e) ? e : Tt(e), a = rs(t) ? t : Tt(t);
  return this.isValid() && o.isValid() && a.isValid() ? (s = s || "()", (s[0] === "(" ? this.isAfter(o, n) : !this.isBefore(o, n)) && (s[1] === ")" ? this.isBefore(a, n) : !this.isAfter(a, n))) : !1;
}
function HS(e, t) {
  var n = rs(e) ? e : Tt(e), s;
  return this.isValid() && n.isValid() ? (t = Jn(t) || "millisecond", t === "millisecond" ? this.valueOf() === n.valueOf() : (s = n.valueOf(), this.clone().startOf(t).valueOf() <= s && s <= this.clone().endOf(t).valueOf())) : !1;
}
function BS(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function YS(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function WS(e, t, n) {
  var s, o, a;
  if (!this.isValid())
    return NaN;
  if (s = Jf(e, this), !s.isValid())
    return NaN;
  switch (o = (s.utcOffset() - this.utcOffset()) * 6e4, t = Jn(t), t) {
    case "year":
      a = bl(this, s) / 12;
      break;
    case "month":
      a = bl(this, s);
      break;
    case "quarter":
      a = bl(this, s) / 3;
      break;
    case "second":
      a = (this - s) / 1e3;
      break;
    case "minute":
      a = (this - s) / 6e4;
      break;
    case "hour":
      a = (this - s) / 36e5;
      break;
    case "day":
      a = (this - s - o) / 864e5;
      break;
    case "week":
      a = (this - s - o) / 6048e5;
      break;
    default:
      a = this - s;
  }
  return n ? a : Yn(a);
}
function bl(e, t) {
  if (e.date() < t.date())
    return -bl(t, e);
  var n = (t.year() - e.year()) * 12 + (t.month() - e.month()), s = e.clone().add(n, "months"), o, a;
  return t - s < 0 ? (o = e.clone().add(n - 1, "months"), a = (t - s) / (s - o)) : (o = e.clone().add(n + 1, "months"), a = (t - s) / (o - s)), -(n + a) || 0;
}
ae.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
ae.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function GS() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function zS(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, n = t ? this.clone().utc() : this;
  return n.year() < 0 || n.year() > 9999 ? gl(
    n,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : ws(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", gl(n, "Z")) : gl(
    n,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function KS() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", n, s, o, a;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), n = "[" + e + '("]', s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", o = "-MM-DD[T]HH:mm:ss.SSS", a = t + '[")]', this.format(n + s + o + a);
}
function JS(e) {
  e || (e = this.isUtc() ? ae.defaultFormatUtc : ae.defaultFormat);
  var t = gl(this, e);
  return this.localeData().postformat(t);
}
function XS(e, t) {
  return this.isValid() && (rs(e) && e.isValid() || Tt(e).isValid()) ? as({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function QS(e) {
  return this.from(Tt(), e);
}
function ZS(e, t) {
  return this.isValid() && (rs(e) && e.isValid() || Tt(e).isValid()) ? as({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function qS(e) {
  return this.to(Tt(), e);
}
function Lv(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = Js(e), t != null && (this._locale = t), this);
}
var Vv = Kn(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function Fv() {
  return this._locale;
}
var Kl = 1e3, Ir = 60 * Kl, Jl = 60 * Ir, Uv = (365 * 400 + 97) * 24 * Jl;
function Pr(e, t) {
  return (e % t + t) % t;
}
function jv(e, t, n) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, n) - Uv : new Date(e, t, n).valueOf();
}
function Hv(e, t, n) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, n) - Uv : Date.UTC(e, t, n);
}
function ex(e) {
  var t, n;
  if (e = Jn(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (n = this._isUTC ? Hv : jv, e) {
    case "year":
      t = n(this.year(), 0, 1);
      break;
    case "quarter":
      t = n(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = n(this.year(), this.month(), 1);
      break;
    case "week":
      t = n(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = n(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = n(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= Pr(
        t + (this._isUTC ? 0 : this.utcOffset() * Ir),
        Jl
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Pr(t, Ir);
      break;
    case "second":
      t = this._d.valueOf(), t -= Pr(t, Kl);
      break;
  }
  return this._d.setTime(t), ae.updateOffset(this, !0), this;
}
function tx(e) {
  var t, n;
  if (e = Jn(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (n = this._isUTC ? Hv : jv, e) {
    case "year":
      t = n(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = n(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = n(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = n(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = n(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = n(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += Jl - Pr(
        t + (this._isUTC ? 0 : this.utcOffset() * Ir),
        Jl
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += Ir - Pr(t, Ir) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Kl - Pr(t, Kl) - 1;
      break;
  }
  return this._d.setTime(t), ae.updateOffset(this, !0), this;
}
function nx() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function sx() {
  return Math.floor(this.valueOf() / 1e3);
}
function ox() {
  return new Date(this.valueOf());
}
function rx() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function ax() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function ix() {
  return this.isValid() ? this.toISOString() : null;
}
function lx() {
  return If(this);
}
function cx() {
  return vo({}, ze(this));
}
function ux() {
  return ze(this).overflow;
}
function dx() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
De("N", 0, 0, "eraAbbr");
De("NN", 0, 0, "eraAbbr");
De("NNN", 0, 0, "eraAbbr");
De("NNNN", 0, 0, "eraName");
De("NNNNN", 0, 0, "eraNarrow");
De("y", ["y", 1], "yo", "eraYear");
De("y", ["yy", 2], 0, "eraYear");
De("y", ["yyy", 3], 0, "eraYear");
De("y", ["yyyy", 4], 0, "eraYear");
be("N", Xf);
be("NN", Xf);
be("NNN", Xf);
be("NNNN", Ex);
be("NNNNN", Sx);
Et(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, n, s) {
    var o = n._locale.erasParse(e, s, n._strict);
    o ? ze(n).era = o : ze(n).invalidEra = e;
  }
);
be("y", Qr);
be("yy", Qr);
be("yyy", Qr);
be("yyyy", Qr);
be("yo", xx);
Et(["y", "yy", "yyy", "yyyy"], cn);
Et(["yo"], function(e, t, n, s) {
  var o;
  n._locale._eraYearOrdinalRegex && (o = e.match(n._locale._eraYearOrdinalRegex)), n._locale.eraYearOrdinalParse ? t[cn] = n._locale.eraYearOrdinalParse(e, o) : t[cn] = parseInt(e, 10);
});
function fx(e, t) {
  var n, s, o, a = this._eras || Js("en")._eras;
  for (n = 0, s = a.length; n < s; ++n) {
    switch (typeof a[n].since) {
      case "string":
        o = ae(a[n].since).startOf("day"), a[n].since = o.valueOf();
        break;
    }
    switch (typeof a[n].until) {
      case "undefined":
        a[n].until = 1 / 0;
        break;
      case "string":
        o = ae(a[n].until).startOf("day").valueOf(), a[n].until = o.valueOf();
        break;
    }
  }
  return a;
}
function hx(e, t, n) {
  var s, o, a = this.eras(), r, i, l;
  for (e = e.toUpperCase(), s = 0, o = a.length; s < o; ++s)
    if (r = a[s].name.toUpperCase(), i = a[s].abbr.toUpperCase(), l = a[s].narrow.toUpperCase(), n)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (i === e)
            return a[s];
          break;
        case "NNNN":
          if (r === e)
            return a[s];
          break;
        case "NNNNN":
          if (l === e)
            return a[s];
          break;
      }
    else if ([r, i, l].indexOf(e) >= 0)
      return a[s];
}
function px(e, t) {
  var n = e.since <= e.until ? 1 : -1;
  return t === void 0 ? ae(e.since).year() : ae(e.since).year() + (t - e.offset) * n;
}
function mx() {
  var e, t, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return s[e].name;
  return "";
}
function _x() {
  var e, t, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return s[e].narrow;
  return "";
}
function vx() {
  var e, t, n, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), s[e].since <= n && n <= s[e].until || s[e].until <= n && n <= s[e].since)
      return s[e].abbr;
  return "";
}
function gx() {
  var e, t, n, s, o = this.localeData().eras();
  for (e = 0, t = o.length; e < t; ++e)
    if (n = o[e].since <= o[e].until ? 1 : -1, s = this.clone().startOf("day").valueOf(), o[e].since <= s && s <= o[e].until || o[e].until <= s && s <= o[e].since)
      return (this.year() - ae(o[e].since).year()) * n + o[e].offset;
  return this.year();
}
function yx(e) {
  return vt(this, "_erasNameRegex") || Qf.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function bx(e) {
  return vt(this, "_erasAbbrRegex") || Qf.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function wx(e) {
  return vt(this, "_erasNarrowRegex") || Qf.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function Xf(e, t) {
  return t.erasAbbrRegex(e);
}
function Ex(e, t) {
  return t.erasNameRegex(e);
}
function Sx(e, t) {
  return t.erasNarrowRegex(e);
}
function xx(e, t) {
  return t._eraYearOrdinalRegex || Qr;
}
function Qf() {
  var e = [], t = [], n = [], s = [], o, a, r = this.eras();
  for (o = 0, a = r.length; o < a; ++o)
    t.push(Ln(r[o].name)), e.push(Ln(r[o].abbr)), n.push(Ln(r[o].narrow)), s.push(Ln(r[o].name)), s.push(Ln(r[o].abbr)), s.push(Ln(r[o].narrow));
  this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  );
}
De(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
De(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function Hc(e, t) {
  De(0, [e, e.length], 0, t);
}
Hc("gggg", "weekYear");
Hc("ggggg", "weekYear");
Hc("GGGG", "isoWeekYear");
Hc("GGGGG", "isoWeekYear");
fn("weekYear", "gg");
fn("isoWeekYear", "GG");
hn("weekYear", 1);
hn("isoWeekYear", 1);
be("G", Lc);
be("g", Lc);
be("GG", Nt, jn);
be("gg", Nt, jn);
be("GGGG", Uf, Ff);
be("gggg", Uf, Ff);
be("GGGGG", Mc, Ic);
be("ggggg", Mc, Ic);
Ci(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, n, s) {
    t[s.substr(0, 2)] = Xe(e);
  }
);
Ci(["gg", "GG"], function(e, t, n, s) {
  t[s] = ae.parseTwoDigitYear(e);
});
function $x(e) {
  return Bv.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Cx(e) {
  return Bv.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Ox() {
  return Us(this.year(), 1, 4);
}
function kx() {
  return Us(this.isoWeekYear(), 1, 4);
}
function Tx() {
  var e = this.localeData()._week;
  return Us(this.year(), e.dow, e.doy);
}
function Nx() {
  var e = this.localeData()._week;
  return Us(this.weekYear(), e.dow, e.doy);
}
function Bv(e, t, n, s, o) {
  var a;
  return e == null ? ui(this, s, o).year : (a = Us(e, s, o), t > a && (t = a), Dx.call(this, e, t, n, s, o));
}
function Dx(e, t, n, s, o) {
  var a = Ev(e, t, n, s, o), r = ci(a.year, 0, a.dayOfYear);
  return this.year(r.getUTCFullYear()), this.month(r.getUTCMonth()), this.date(r.getUTCDate()), this;
}
De("Q", 0, "Qo", "quarter");
fn("quarter", "Q");
hn("quarter", 7);
be("Q", fv);
Et("Q", function(e, t) {
  t[Ls] = (Xe(e) - 1) * 3;
});
function Ax(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
De("D", ["DD", 2], "Do", "date");
fn("date", "D");
hn("date", 9);
be("D", Nt);
be("DD", Nt, jn);
be("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
Et(["D", "DD"], fs);
Et("Do", function(e, t) {
  t[fs] = Xe(e.match(Nt)[0]);
});
var Yv = Xr("Date", !0);
De("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
fn("dayOfYear", "DDD");
hn("dayOfYear", 4);
be("DDD", Pc);
be("DDDD", hv);
Et(["DDD", "DDDD"], function(e, t, n) {
  n._dayOfYear = Xe(e);
});
function Rx(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
De("m", ["mm", 2], 0, "minute");
fn("minute", "m");
hn("minute", 14);
be("m", Nt);
be("mm", Nt, jn);
Et(["m", "mm"], ns);
var Ix = Xr("Minutes", !1);
De("s", ["ss", 2], 0, "second");
fn("second", "s");
hn("second", 15);
be("s", Nt);
be("ss", Nt, jn);
Et(["s", "ss"], Vs);
var Px = Xr("Seconds", !1);
De("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
De(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
De(0, ["SSS", 3], 0, "millisecond");
De(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
De(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
De(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
De(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
De(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
De(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
fn("millisecond", "ms");
hn("millisecond", 16);
be("S", Pc, fv);
be("SS", Pc, jn);
be("SSS", Pc, hv);
var go, Wv;
for (go = "SSSS"; go.length <= 9; go += "S")
  be(go, Qr);
function Mx(e, t) {
  t[zo] = Xe(("0." + e) * 1e3);
}
for (go = "S"; go.length <= 9; go += "S")
  Et(go, Mx);
Wv = Xr("Milliseconds", !1);
De("z", 0, 0, "zoneAbbr");
De("zz", 0, 0, "zoneName");
function Lx() {
  return this._isUTC ? "UTC" : "";
}
function Vx() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var ce = xi.prototype;
ce.add = NS;
ce.calendar = LS;
ce.clone = VS;
ce.diff = WS;
ce.endOf = tx;
ce.format = JS;
ce.from = XS;
ce.fromNow = QS;
ce.to = ZS;
ce.toNow = qS;
ce.get = Uw;
ce.invalidAt = ux;
ce.isAfter = FS;
ce.isBefore = US;
ce.isBetween = jS;
ce.isSame = HS;
ce.isSameOrAfter = BS;
ce.isSameOrBefore = YS;
ce.isValid = lx;
ce.lang = Vv;
ce.locale = Lv;
ce.localeData = Fv;
ce.max = lS;
ce.min = iS;
ce.parsingFlags = cx;
ce.set = jw;
ce.startOf = ex;
ce.subtract = DS;
ce.toArray = rx;
ce.toObject = ax;
ce.toDate = ox;
ce.toISOString = zS;
ce.inspect = KS;
typeof Symbol < "u" && Symbol.for != null && (ce[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
ce.toJSON = ix;
ce.toString = GS;
ce.unix = sx;
ce.valueOf = nx;
ce.creationData = dx;
ce.eraName = mx;
ce.eraNarrow = _x;
ce.eraAbbr = vx;
ce.eraYear = gx;
ce.year = wv;
ce.isLeapYear = aE;
ce.weekYear = $x;
ce.isoWeekYear = Cx;
ce.quarter = ce.quarters = Ax;
ce.month = yv;
ce.daysInMonth = sE;
ce.week = ce.weeks = fE;
ce.isoWeek = ce.isoWeeks = hE;
ce.weeksInYear = Tx;
ce.weeksInWeekYear = Nx;
ce.isoWeeksInYear = Ox;
ce.isoWeeksInISOWeekYear = kx;
ce.date = Yv;
ce.day = ce.days = CE;
ce.weekday = OE;
ce.isoWeekday = kE;
ce.dayOfYear = Rx;
ce.hour = ce.hours = PE;
ce.minute = ce.minutes = Ix;
ce.second = ce.seconds = Px;
ce.millisecond = ce.milliseconds = Wv;
ce.utcOffset = vS;
ce.utc = yS;
ce.local = bS;
ce.parseZone = wS;
ce.hasAlignedHourOffset = ES;
ce.isDST = SS;
ce.isLocal = $S;
ce.isUtcOffset = CS;
ce.isUtc = Rv;
ce.isUTC = Rv;
ce.zoneAbbr = Lx;
ce.zoneName = Vx;
ce.dates = Kn(
  "dates accessor is deprecated. Use date instead.",
  Yv
);
ce.months = Kn(
  "months accessor is deprecated. Use month instead",
  yv
);
ce.years = Kn(
  "years accessor is deprecated. Use year instead",
  wv
);
ce.zone = Kn(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  gS
);
ce.isDSTShifted = Kn(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  xS
);
function Fx(e) {
  return Tt(e * 1e3);
}
function Ux() {
  return Tt.apply(null, arguments).parseZone();
}
function Gv(e) {
  return e;
}
var gt = Mf.prototype;
gt.calendar = Cw;
gt.longDateFormat = Nw;
gt.invalidDate = Aw;
gt.ordinal = Pw;
gt.preparse = Gv;
gt.postformat = Gv;
gt.relativeTime = Lw;
gt.pastFuture = Vw;
gt.set = xw;
gt.eras = fx;
gt.erasParse = hx;
gt.erasConvertYear = px;
gt.erasAbbrRegex = bx;
gt.erasNameRegex = yx;
gt.erasNarrowRegex = wx;
gt.months = qw;
gt.monthsShort = eE;
gt.monthsParse = nE;
gt.monthsRegex = rE;
gt.monthsShortRegex = oE;
gt.week = lE;
gt.firstDayOfYear = dE;
gt.firstDayOfWeek = uE;
gt.weekdays = wE;
gt.weekdaysMin = SE;
gt.weekdaysShort = EE;
gt.weekdaysParse = $E;
gt.weekdaysRegex = TE;
gt.weekdaysShortRegex = NE;
gt.weekdaysMinRegex = DE;
gt.isPM = RE;
gt.meridiem = ME;
function Xl(e, t, n, s) {
  var o = Js(), a = bs().set(s, t);
  return o[n](a, e);
}
function zv(e, t, n) {
  if (Ws(e) && (t = e, e = void 0), e = e || "", t != null)
    return Xl(e, t, n, "month");
  var s, o = [];
  for (s = 0; s < 12; s++)
    o[s] = Xl(e, s, n, "month");
  return o;
}
function Zf(e, t, n, s) {
  typeof e == "boolean" ? (Ws(t) && (n = t, t = void 0), t = t || "") : (t = e, n = t, e = !1, Ws(t) && (n = t, t = void 0), t = t || "");
  var o = Js(), a = e ? o._week.dow : 0, r, i = [];
  if (n != null)
    return Xl(t, (n + a) % 7, s, "day");
  for (r = 0; r < 7; r++)
    i[r] = Xl(t, (r + a) % 7, s, "day");
  return i;
}
function jx(e, t) {
  return zv(e, t, "months");
}
function Hx(e, t) {
  return zv(e, t, "monthsShort");
}
function Bx(e, t, n) {
  return Zf(e, t, n, "weekdays");
}
function Yx(e, t, n) {
  return Zf(e, t, n, "weekdaysShort");
}
function Wx(e, t, n) {
  return Zf(e, t, n, "weekdaysMin");
}
$o("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, n = Xe(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + n;
  }
});
ae.lang = Kn(
  "moment.lang is deprecated. Use moment.locale instead.",
  $o
);
ae.langData = Kn(
  "moment.langData is deprecated. Use moment.localeData instead.",
  Js
);
var Os = Math.abs;
function Gx() {
  var e = this._data;
  return this._milliseconds = Os(this._milliseconds), this._days = Os(this._days), this._months = Os(this._months), e.milliseconds = Os(e.milliseconds), e.seconds = Os(e.seconds), e.minutes = Os(e.minutes), e.hours = Os(e.hours), e.months = Os(e.months), e.years = Os(e.years), this;
}
function Kv(e, t, n, s) {
  var o = as(t, n);
  return e._milliseconds += s * o._milliseconds, e._days += s * o._days, e._months += s * o._months, e._bubble();
}
function zx(e, t) {
  return Kv(this, e, t, 1);
}
function Kx(e, t) {
  return Kv(this, e, t, -1);
}
function mp(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function Jx() {
  var e = this._milliseconds, t = this._days, n = this._months, s = this._data, o, a, r, i, l;
  return e >= 0 && t >= 0 && n >= 0 || e <= 0 && t <= 0 && n <= 0 || (e += mp($d(n) + t) * 864e5, t = 0, n = 0), s.milliseconds = e % 1e3, o = Yn(e / 1e3), s.seconds = o % 60, a = Yn(o / 60), s.minutes = a % 60, r = Yn(a / 60), s.hours = r % 24, t += Yn(r / 24), l = Yn(Jv(t)), n += l, t -= mp($d(l)), i = Yn(n / 12), n %= 12, s.days = t, s.months = n, s.years = i, this;
}
function Jv(e) {
  return e * 4800 / 146097;
}
function $d(e) {
  return e * 146097 / 4800;
}
function Xx(e) {
  if (!this.isValid())
    return NaN;
  var t, n, s = this._milliseconds;
  if (e = Jn(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + s / 864e5, n = this._months + Jv(t), e) {
      case "month":
        return n;
      case "quarter":
        return n / 3;
      case "year":
        return n / 12;
    }
  else
    switch (t = this._days + Math.round($d(this._months)), e) {
      case "week":
        return t / 7 + s / 6048e5;
      case "day":
        return t + s / 864e5;
      case "hour":
        return t * 24 + s / 36e5;
      case "minute":
        return t * 1440 + s / 6e4;
      case "second":
        return t * 86400 + s / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + s;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function Qx() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + Xe(this._months / 12) * 31536e6 : NaN;
}
function Xs(e) {
  return function() {
    return this.as(e);
  };
}
var Zx = Xs("ms"), qx = Xs("s"), e$ = Xs("m"), t$ = Xs("h"), n$ = Xs("d"), s$ = Xs("w"), o$ = Xs("M"), r$ = Xs("Q"), a$ = Xs("y");
function i$() {
  return as(this);
}
function l$(e) {
  return e = Jn(e), this.isValid() ? this[e + "s"]() : NaN;
}
function ur(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var c$ = ur("milliseconds"), u$ = ur("seconds"), d$ = ur("minutes"), f$ = ur("hours"), h$ = ur("days"), p$ = ur("months"), m$ = ur("years");
function _$() {
  return Yn(this.days() / 7);
}
var As = Math.round, Or = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function v$(e, t, n, s, o) {
  return o.relativeTime(t || 1, !!n, e, s);
}
function g$(e, t, n, s) {
  var o = as(e).abs(), a = As(o.as("s")), r = As(o.as("m")), i = As(o.as("h")), l = As(o.as("d")), c = As(o.as("M")), f = As(o.as("w")), d = As(o.as("y")), h = a <= n.ss && ["s", a] || a < n.s && ["ss", a] || r <= 1 && ["m"] || r < n.m && ["mm", r] || i <= 1 && ["h"] || i < n.h && ["hh", i] || l <= 1 && ["d"] || l < n.d && ["dd", l];
  return n.w != null && (h = h || f <= 1 && ["w"] || f < n.w && ["ww", f]), h = h || c <= 1 && ["M"] || c < n.M && ["MM", c] || d <= 1 && ["y"] || ["yy", d], h[2] = t, h[3] = +e > 0, h[4] = s, v$.apply(null, h);
}
function y$(e) {
  return e === void 0 ? As : typeof e == "function" ? (As = e, !0) : !1;
}
function b$(e, t) {
  return Or[e] === void 0 ? !1 : t === void 0 ? Or[e] : (Or[e] = t, e === "s" && (Or.ss = t - 1), !0);
}
function w$(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var n = !1, s = Or, o, a;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (n = e), typeof t == "object" && (s = Object.assign({}, Or, t), t.s != null && t.ss == null && (s.ss = t.s - 1)), o = this.localeData(), a = g$(this, !n, s, o), n && (a = o.pastFuture(+this, a)), o.postformat(a);
}
var wu = Math.abs;
function _r(e) {
  return (e > 0) - (e < 0) || +e;
}
function Bc() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = wu(this._milliseconds) / 1e3, t = wu(this._days), n = wu(this._months), s, o, a, r, i = this.asSeconds(), l, c, f, d;
  return i ? (s = Yn(e / 60), o = Yn(s / 60), e %= 60, s %= 60, a = Yn(n / 12), n %= 12, r = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = i < 0 ? "-" : "", c = _r(this._months) !== _r(i) ? "-" : "", f = _r(this._days) !== _r(i) ? "-" : "", d = _r(this._milliseconds) !== _r(i) ? "-" : "", l + "P" + (a ? c + a + "Y" : "") + (n ? c + n + "M" : "") + (t ? f + t + "D" : "") + (o || s || e ? "T" : "") + (o ? d + o + "H" : "") + (s ? d + s + "M" : "") + (e ? d + r + "S" : "")) : "P0D";
}
var it = jc.prototype;
it.isValid = hS;
it.abs = Gx;
it.add = zx;
it.subtract = Kx;
it.as = Xx;
it.asMilliseconds = Zx;
it.asSeconds = qx;
it.asMinutes = e$;
it.asHours = t$;
it.asDays = n$;
it.asWeeks = s$;
it.asMonths = o$;
it.asQuarters = r$;
it.asYears = a$;
it.valueOf = Qx;
it._bubble = Jx;
it.clone = i$;
it.get = l$;
it.milliseconds = c$;
it.seconds = u$;
it.minutes = d$;
it.hours = f$;
it.days = h$;
it.weeks = _$;
it.months = p$;
it.years = m$;
it.humanize = w$;
it.toISOString = Bc;
it.toString = Bc;
it.toJSON = Bc;
it.locale = Lv;
it.localeData = Fv;
it.toIsoString = Kn(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  Bc
);
it.lang = Vv;
De("X", 0, 0, "unix");
De("x", 0, 0, "valueOf");
be("x", Lc);
be("X", Bw);
Et("X", function(e, t, n) {
  n._d = new Date(parseFloat(e) * 1e3);
});
Et("x", function(e, t, n) {
  n._d = new Date(Xe(e));
});
//! moment.js
ae.version = "2.29.4";
Ew(Tt);
ae.fn = ce;
ae.min = cS;
ae.max = uS;
ae.now = dS;
ae.utc = bs;
ae.unix = Fx;
ae.months = jx;
ae.isDate = Si;
ae.locale = $o;
ae.invalid = Ac;
ae.duration = as;
ae.isMoment = rs;
ae.weekdays = Bx;
ae.parseZone = Ux;
ae.localeData = Js;
ae.isDuration = yl;
ae.monthsShort = Hx;
ae.weekdaysMin = Wx;
ae.defineLocale = Yf;
ae.updateLocale = UE;
ae.locales = jE;
ae.weekdaysShort = Yx;
ae.normalizeUnits = Jn;
ae.relativeTimeRounding = y$;
ae.relativeTimeThreshold = b$;
ae.calendarFormat = MS;
ae.prototype = ce;
ae.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
class E$ {
  constructor(t) {
    pe(this, "body");
    pe(this, "createdAt");
    pe(this, "expiration");
    pe(this, "from");
    pe(this, "id");
    pe(this, "lifespan");
    pe(this, "read");
    pe(this, "subject");
    pe(this, "summary");
    pe(this, "to");
    for (const [n, s] of Object.entries(t))
      n in this && (this[n] = s);
  }
  getReadable(t) {
    return console.log(t), ae(t).fromNow();
  }
  get readableCreatedAt() {
    return this.getReadable(this.createdAt);
  }
  get readableExpiration() {
    return this.getReadable(this.expiration);
  }
}
function Xv(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: S$ } = Object.prototype, { getPrototypeOf: qf } = Object, Yc = ((e) => (t) => {
  const n = S$.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Es = (e) => (e = e.toLowerCase(), (t) => Yc(t) === e), Wc = (e) => (t) => typeof t === e, { isArray: Zr } = Array, fi = Wc("undefined");
function x$(e) {
  return e !== null && !fi(e) && e.constructor !== null && !fi(e.constructor) && Wn(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Qv = Es("ArrayBuffer");
function $$(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Qv(e.buffer), t;
}
const C$ = Wc("string"), Wn = Wc("function"), Zv = Wc("number"), Gc = (e) => e !== null && typeof e == "object", O$ = (e) => e === !0 || e === !1, wl = (e) => {
  if (Yc(e) !== "object")
    return !1;
  const t = qf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, k$ = Es("Date"), T$ = Es("File"), N$ = Es("Blob"), D$ = Es("FileList"), A$ = (e) => Gc(e) && Wn(e.pipe), R$ = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Wn(e.append) && ((t = Yc(e)) === "formdata" || // detect form-data instance
  t === "object" && Wn(e.toString) && e.toString() === "[object FormData]"));
}, I$ = Es("URLSearchParams"), P$ = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Oi(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, o;
  if (typeof e != "object" && (e = [e]), Zr(e))
    for (s = 0, o = e.length; s < o; s++)
      t.call(null, e[s], s, e);
  else {
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e), r = a.length;
    let i;
    for (s = 0; s < r; s++)
      i = a[s], t.call(null, e[i], i, e);
  }
}
function qv(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, o;
  for (; s-- > 0; )
    if (o = n[s], t === o.toLowerCase())
      return o;
  return null;
}
const eg = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), tg = (e) => !fi(e) && e !== eg;
function Cd() {
  const { caseless: e } = tg(this) && this || {}, t = {}, n = (s, o) => {
    const a = e && qv(t, o) || o;
    wl(t[a]) && wl(s) ? t[a] = Cd(t[a], s) : wl(s) ? t[a] = Cd({}, s) : Zr(s) ? t[a] = s.slice() : t[a] = s;
  };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && Oi(arguments[s], n);
  return t;
}
const M$ = (e, t, n, { allOwnKeys: s } = {}) => (Oi(t, (o, a) => {
  n && Wn(o) ? e[a] = Xv(o, n) : e[a] = o;
}, { allOwnKeys: s }), e), L$ = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), V$ = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, F$ = (e, t, n, s) => {
  let o, a, r;
  const i = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      r = o[a], (!s || s(r, e, t)) && !i[r] && (t[r] = e[r], i[r] = !0);
    e = n !== !1 && qf(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, U$ = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, j$ = (e) => {
  if (!e)
    return null;
  if (Zr(e))
    return e;
  let t = e.length;
  if (!Zv(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, H$ = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && qf(Uint8Array)), B$ = (e, t) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = s.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, Y$ = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, W$ = Es("HTMLFormElement"), G$ = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, o) {
    return s.toUpperCase() + o;
  }
), _p = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), z$ = Es("RegExp"), ng = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Oi(n, (o, a) => {
    t(o, a, e) !== !1 && (s[a] = o);
  }), Object.defineProperties(e, s);
}, K$ = (e) => {
  ng(e, (t, n) => {
    if (Wn(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (Wn(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, J$ = (e, t) => {
  const n = {}, s = (o) => {
    o.forEach((a) => {
      n[a] = !0;
    });
  };
  return Zr(e) ? s(e) : s(String(e).split(t)), n;
}, X$ = () => {
}, Q$ = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Eu = "abcdefghijklmnopqrstuvwxyz", vp = "0123456789", sg = {
  DIGIT: vp,
  ALPHA: Eu,
  ALPHA_DIGIT: Eu + Eu.toUpperCase() + vp
}, Z$ = (e = 16, t = sg.ALPHA_DIGIT) => {
  let n = "";
  const { length: s } = t;
  for (; e--; )
    n += t[Math.random() * s | 0];
  return n;
};
function q$(e) {
  return !!(e && Wn(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const eC = (e) => {
  const t = new Array(10), n = (s, o) => {
    if (Gc(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        t[o] = s;
        const a = Zr(s) ? [] : {};
        return Oi(s, (r, i) => {
          const l = n(r, o + 1);
          !fi(l) && (a[i] = l);
        }), t[o] = void 0, a;
      }
    }
    return s;
  };
  return n(e, 0);
}, tC = Es("AsyncFunction"), nC = (e) => e && (Gc(e) || Wn(e)) && Wn(e.then) && Wn(e.catch), Z = {
  isArray: Zr,
  isArrayBuffer: Qv,
  isBuffer: x$,
  isFormData: R$,
  isArrayBufferView: $$,
  isString: C$,
  isNumber: Zv,
  isBoolean: O$,
  isObject: Gc,
  isPlainObject: wl,
  isUndefined: fi,
  isDate: k$,
  isFile: T$,
  isBlob: N$,
  isRegExp: z$,
  isFunction: Wn,
  isStream: A$,
  isURLSearchParams: I$,
  isTypedArray: H$,
  isFileList: D$,
  forEach: Oi,
  merge: Cd,
  extend: M$,
  trim: P$,
  stripBOM: L$,
  inherits: V$,
  toFlatObject: F$,
  kindOf: Yc,
  kindOfTest: Es,
  endsWith: U$,
  toArray: j$,
  forEachEntry: B$,
  matchAll: Y$,
  isHTMLForm: W$,
  hasOwnProperty: _p,
  hasOwnProp: _p,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ng,
  freezeMethods: K$,
  toObjectSet: J$,
  toCamelCase: G$,
  noop: X$,
  toFiniteNumber: Q$,
  findKey: qv,
  global: eg,
  isContextDefined: tg,
  ALPHABET: sg,
  generateString: Z$,
  isSpecCompliantForm: q$,
  toJSONObject: eC,
  isAsyncFn: tC,
  isThenable: nC
};
function ft(e, t, n, s, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), o && (this.response = o);
}
Z.inherits(ft, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: Z.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const og = ft.prototype, rg = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  rg[e] = { value: e };
});
Object.defineProperties(ft, rg);
Object.defineProperty(og, "isAxiosError", { value: !0 });
ft.from = (e, t, n, s, o, a) => {
  const r = Object.create(og);
  return Z.toFlatObject(e, r, function(l) {
    return l !== Error.prototype;
  }, (i) => i !== "isAxiosError"), ft.call(r, e.message, t, n, s, o), r.cause = e, r.name = e.name, a && Object.assign(r, a), r;
};
const sC = null;
function Od(e) {
  return Z.isPlainObject(e) || Z.isArray(e);
}
function ag(e) {
  return Z.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function gp(e, t, n) {
  return e ? e.concat(t).map(function(o, a) {
    return o = ag(o), !n && a ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function oC(e) {
  return Z.isArray(e) && !e.some(Od);
}
const rC = Z.toFlatObject(Z, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function zc(e, t, n) {
  if (!Z.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = Z.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(_, y) {
    return !Z.isUndefined(y[_]);
  });
  const s = n.metaTokens, o = n.visitor || f, a = n.dots, r = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && Z.isSpecCompliantForm(t);
  if (!Z.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null)
      return "";
    if (Z.isDate(m))
      return m.toISOString();
    if (!l && Z.isBlob(m))
      throw new ft("Blob is not supported. Use a Buffer instead.");
    return Z.isArrayBuffer(m) || Z.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function f(m, _, y) {
    let g = m;
    if (m && !y && typeof m == "object") {
      if (Z.endsWith(_, "{}"))
        _ = s ? _ : _.slice(0, -2), m = JSON.stringify(m);
      else if (Z.isArray(m) && oC(m) || (Z.isFileList(m) || Z.endsWith(_, "[]")) && (g = Z.toArray(m)))
        return _ = ag(_), g.forEach(function(S, w) {
          !(Z.isUndefined(S) || S === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? gp([_], w, a) : r === null ? _ : _ + "[]",
            c(S)
          );
        }), !1;
    }
    return Od(m) ? !0 : (t.append(gp(y, _, a), c(m)), !1);
  }
  const d = [], h = Object.assign(rC, {
    defaultVisitor: f,
    convertValue: c,
    isVisitable: Od
  });
  function p(m, _) {
    if (!Z.isUndefined(m)) {
      if (d.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + _.join("."));
      d.push(m), Z.forEach(m, function(g, v) {
        (!(Z.isUndefined(g) || g === null) && o.call(
          t,
          g,
          Z.isString(v) ? v.trim() : v,
          _,
          h
        )) === !0 && p(g, _ ? _.concat(v) : [v]);
      }), d.pop();
    }
  }
  if (!Z.isObject(e))
    throw new TypeError("data must be an object");
  return p(e), t;
}
function yp(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function eh(e, t) {
  this._pairs = [], e && zc(e, this, t);
}
const ig = eh.prototype;
ig.append = function(t, n) {
  this._pairs.push([t, n]);
};
ig.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, yp);
  } : yp;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function aC(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function lg(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || aC, o = n && n.serialize;
  let a;
  if (o ? a = o(t, n) : a = Z.isURLSearchParams(t) ? t.toString() : new eh(t, n).toString(s), a) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class iC {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    Z.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const bp = iC, cg = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, lC = typeof URLSearchParams < "u" ? URLSearchParams : eh, cC = typeof FormData < "u" ? FormData : null, uC = typeof Blob < "u" ? Blob : null, dC = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), fC = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), hs = {
  isBrowser: !0,
  classes: {
    URLSearchParams: lC,
    FormData: cC,
    Blob: uC
  },
  isStandardBrowserEnv: dC,
  isStandardBrowserWebWorkerEnv: fC,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function hC(e, t) {
  return zc(e, new hs.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, o, a) {
      return hs.isNode && Z.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function pC(e) {
  return Z.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function mC(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const o = n.length;
  let a;
  for (s = 0; s < o; s++)
    a = n[s], t[a] = e[a];
  return t;
}
function ug(e) {
  function t(n, s, o, a) {
    let r = n[a++];
    const i = Number.isFinite(+r), l = a >= n.length;
    return r = !r && Z.isArray(o) ? o.length : r, l ? (Z.hasOwnProp(o, r) ? o[r] = [o[r], s] : o[r] = s, !i) : ((!o[r] || !Z.isObject(o[r])) && (o[r] = []), t(n, s, o[r], a) && Z.isArray(o[r]) && (o[r] = mC(o[r])), !i);
  }
  if (Z.isFormData(e) && Z.isFunction(e.entries)) {
    const n = {};
    return Z.forEachEntry(e, (s, o) => {
      t(pC(s), o, n, 0);
    }), n;
  }
  return null;
}
const _C = {
  "Content-Type": void 0
};
function vC(e, t, n) {
  if (Z.isString(e))
    try {
      return (t || JSON.parse)(e), Z.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const Kc = {
  transitional: cg,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", o = s.indexOf("application/json") > -1, a = Z.isObject(t);
    if (a && Z.isHTMLForm(t) && (t = new FormData(t)), Z.isFormData(t))
      return o && o ? JSON.stringify(ug(t)) : t;
    if (Z.isArrayBuffer(t) || Z.isBuffer(t) || Z.isStream(t) || Z.isFile(t) || Z.isBlob(t))
      return t;
    if (Z.isArrayBufferView(t))
      return t.buffer;
    if (Z.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (a) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return hC(t, this.formSerializer).toString();
      if ((i = Z.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return zc(
          i ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return a || o ? (n.setContentType("application/json", !1), vC(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Kc.transitional, s = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (t && Z.isString(t) && (s && !this.responseType || o)) {
      const r = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (r)
          throw i.name === "SyntaxError" ? ft.from(i, ft.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: hs.classes.FormData,
    Blob: hs.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
Z.forEach(["delete", "get", "head"], function(t) {
  Kc.headers[t] = {};
});
Z.forEach(["post", "put", "patch"], function(t) {
  Kc.headers[t] = Z.merge(_C);
});
const th = Kc, gC = Z.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), yC = (e) => {
  const t = {};
  let n, s, o;
  return e && e.split(`
`).forEach(function(r) {
    o = r.indexOf(":"), n = r.substring(0, o).trim().toLowerCase(), s = r.substring(o + 1).trim(), !(!n || t[n] && gC[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, wp = Symbol("internals");
function da(e) {
  return e && String(e).trim().toLowerCase();
}
function El(e) {
  return e === !1 || e == null ? e : Z.isArray(e) ? e.map(El) : String(e);
}
function bC(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const wC = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Su(e, t, n, s, o) {
  if (Z.isFunction(s))
    return s.call(this, t, n);
  if (o && (t = n), !!Z.isString(t)) {
    if (Z.isString(s))
      return t.indexOf(s) !== -1;
    if (Z.isRegExp(s))
      return s.test(t);
  }
}
function EC(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function SC(e, t) {
  const n = Z.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(o, a, r) {
        return this[s].call(this, t, o, a, r);
      },
      configurable: !0
    });
  });
}
let Jc = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const o = this;
    function a(i, l, c) {
      const f = da(l);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const d = Z.findKey(o, f);
      (!d || o[d] === void 0 || c === !0 || c === void 0 && o[d] !== !1) && (o[d || l] = El(i));
    }
    const r = (i, l) => Z.forEach(i, (c, f) => a(c, f, l));
    return Z.isPlainObject(t) || t instanceof this.constructor ? r(t, n) : Z.isString(t) && (t = t.trim()) && !wC(t) ? r(yC(t), n) : t != null && a(n, t, s), this;
  }
  get(t, n) {
    if (t = da(t), t) {
      const s = Z.findKey(this, t);
      if (s) {
        const o = this[s];
        if (!n)
          return o;
        if (n === !0)
          return bC(o);
        if (Z.isFunction(n))
          return n.call(this, o, s);
        if (Z.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = da(t), t) {
      const s = Z.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || Su(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let o = !1;
    function a(r) {
      if (r = da(r), r) {
        const i = Z.findKey(s, r);
        i && (!n || Su(s, s[i], i, n)) && (delete s[i], o = !0);
      }
    }
    return Z.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, o = !1;
    for (; s--; ) {
      const a = n[s];
      (!t || Su(this, this[a], a, t, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, s = {};
    return Z.forEach(this, (o, a) => {
      const r = Z.findKey(s, a);
      if (r) {
        n[r] = El(o), delete n[a];
        return;
      }
      const i = t ? EC(a) : String(a).trim();
      i !== a && delete n[a], n[i] = El(o), s[i] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return Z.forEach(this, (s, o) => {
      s != null && s !== !1 && (n[o] = t && Z.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((o) => s.set(o)), s;
  }
  static accessor(t) {
    const s = (this[wp] = this[wp] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(r) {
      const i = da(r);
      s[i] || (SC(o, r), s[i] = !0);
    }
    return Z.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
Jc.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
Z.freezeMethods(Jc.prototype);
Z.freezeMethods(Jc);
const js = Jc;
function xu(e, t) {
  const n = this || th, s = t || n, o = js.from(s.headers);
  let a = s.data;
  return Z.forEach(e, function(i) {
    a = i.call(n, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function dg(e) {
  return !!(e && e.__CANCEL__);
}
function ki(e, t, n) {
  ft.call(this, e ?? "canceled", ft.ERR_CANCELED, t, n), this.name = "CanceledError";
}
Z.inherits(ki, ft, {
  __CANCEL__: !0
});
function xC(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new ft(
    "Request failed with status code " + n.status,
    [ft.ERR_BAD_REQUEST, ft.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const $C = hs.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, s, o, a, r, i) {
        const l = [];
        l.push(n + "=" + encodeURIComponent(s)), Z.isNumber(o) && l.push("expires=" + new Date(o).toGMTString()), Z.isString(a) && l.push("path=" + a), Z.isString(r) && l.push("domain=" + r), i === !0 && l.push("secure"), document.cookie = l.join("; ");
      },
      read: function(n) {
        const s = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return s ? decodeURIComponent(s[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function CC(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function OC(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function fg(e, t) {
  return e && !CC(t) ? OC(e, t) : t;
}
const kC = hs.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let s;
    function o(a) {
      let r = a;
      return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return s = o(window.location.href), function(r) {
      const i = Z.isString(r) ? o(r) : r;
      return i.protocol === s.protocol && i.host === s.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function TC(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function NC(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let o = 0, a = 0, r;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), f = s[a];
    r || (r = c), n[o] = l, s[o] = c;
    let d = a, h = 0;
    for (; d !== o; )
      h += n[d++], d = d % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), c - r < t)
      return;
    const p = f && c - f;
    return p ? Math.round(h * 1e3 / p) : void 0;
  };
}
function Ep(e, t) {
  let n = 0;
  const s = NC(50, 250);
  return (o) => {
    const a = o.loaded, r = o.lengthComputable ? o.total : void 0, i = a - n, l = s(i), c = a <= r;
    n = a;
    const f = {
      loaded: a,
      total: r,
      progress: r ? a / r : void 0,
      bytes: i,
      rate: l || void 0,
      estimated: l && r && c ? (r - a) / l : void 0,
      event: o
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const DC = typeof XMLHttpRequest < "u", AC = DC && function(e) {
  return new Promise(function(n, s) {
    let o = e.data;
    const a = js.from(e.headers).normalize(), r = e.responseType;
    let i;
    function l() {
      e.cancelToken && e.cancelToken.unsubscribe(i), e.signal && e.signal.removeEventListener("abort", i);
    }
    Z.isFormData(o) && (hs.isStandardBrowserEnv || hs.isStandardBrowserWebWorkerEnv ? a.setContentType(!1) : a.setContentType("multipart/form-data;", !1));
    let c = new XMLHttpRequest();
    if (e.auth) {
      const p = e.auth.username || "", m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      a.set("Authorization", "Basic " + btoa(p + ":" + m));
    }
    const f = fg(e.baseURL, e.url);
    c.open(e.method.toUpperCase(), lg(f, e.params, e.paramsSerializer), !0), c.timeout = e.timeout;
    function d() {
      if (!c)
        return;
      const p = js.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), _ = {
        data: !r || r === "text" || r === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: p,
        config: e,
        request: c
      };
      xC(function(g) {
        n(g), l();
      }, function(g) {
        s(g), l();
      }, _), c = null;
    }
    if ("onloadend" in c ? c.onloadend = d : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, c.onabort = function() {
      c && (s(new ft("Request aborted", ft.ECONNABORTED, e, c)), c = null);
    }, c.onerror = function() {
      s(new ft("Network Error", ft.ERR_NETWORK, e, c)), c = null;
    }, c.ontimeout = function() {
      let m = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const _ = e.transitional || cg;
      e.timeoutErrorMessage && (m = e.timeoutErrorMessage), s(new ft(
        m,
        _.clarifyTimeoutError ? ft.ETIMEDOUT : ft.ECONNABORTED,
        e,
        c
      )), c = null;
    }, hs.isStandardBrowserEnv) {
      const p = (e.withCredentials || kC(f)) && e.xsrfCookieName && $C.read(e.xsrfCookieName);
      p && a.set(e.xsrfHeaderName, p);
    }
    o === void 0 && a.setContentType(null), "setRequestHeader" in c && Z.forEach(a.toJSON(), function(m, _) {
      c.setRequestHeader(_, m);
    }), Z.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials), r && r !== "json" && (c.responseType = e.responseType), typeof e.onDownloadProgress == "function" && c.addEventListener("progress", Ep(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", Ep(e.onUploadProgress)), (e.cancelToken || e.signal) && (i = (p) => {
      c && (s(!p || p.type ? new ki(null, e, c) : p), c.abort(), c = null);
    }, e.cancelToken && e.cancelToken.subscribe(i), e.signal && (e.signal.aborted ? i() : e.signal.addEventListener("abort", i)));
    const h = TC(f);
    if (h && hs.protocols.indexOf(h) === -1) {
      s(new ft("Unsupported protocol " + h + ":", ft.ERR_BAD_REQUEST, e));
      return;
    }
    c.send(o || null);
  });
}, Sl = {
  http: sC,
  xhr: AC
};
Z.forEach(Sl, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const RC = {
  getAdapter: (e) => {
    e = Z.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, s;
    for (let o = 0; o < t && (n = e[o], !(s = Z.isString(n) ? Sl[n.toLowerCase()] : n)); o++)
      ;
    if (!s)
      throw s === !1 ? new ft(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        Z.hasOwnProp(Sl, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!Z.isFunction(s))
      throw new TypeError("adapter is not a function");
    return s;
  },
  adapters: Sl
};
function $u(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ki(null, e);
}
function Sp(e) {
  return $u(e), e.headers = js.from(e.headers), e.data = xu.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), RC.getAdapter(e.adapter || th.adapter)(e).then(function(s) {
    return $u(e), s.data = xu.call(
      e,
      e.transformResponse,
      s
    ), s.headers = js.from(s.headers), s;
  }, function(s) {
    return dg(s) || ($u(e), s && s.response && (s.response.data = xu.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = js.from(s.response.headers))), Promise.reject(s);
  });
}
const xp = (e) => e instanceof js ? e.toJSON() : e;
function Ur(e, t) {
  t = t || {};
  const n = {};
  function s(c, f, d) {
    return Z.isPlainObject(c) && Z.isPlainObject(f) ? Z.merge.call({ caseless: d }, c, f) : Z.isPlainObject(f) ? Z.merge({}, f) : Z.isArray(f) ? f.slice() : f;
  }
  function o(c, f, d) {
    if (Z.isUndefined(f)) {
      if (!Z.isUndefined(c))
        return s(void 0, c, d);
    } else
      return s(c, f, d);
  }
  function a(c, f) {
    if (!Z.isUndefined(f))
      return s(void 0, f);
  }
  function r(c, f) {
    if (Z.isUndefined(f)) {
      if (!Z.isUndefined(c))
        return s(void 0, c);
    } else
      return s(void 0, f);
  }
  function i(c, f, d) {
    if (d in t)
      return s(c, f);
    if (d in e)
      return s(void 0, c);
  }
  const l = {
    url: a,
    method: a,
    data: a,
    baseURL: r,
    transformRequest: r,
    transformResponse: r,
    paramsSerializer: r,
    timeout: r,
    timeoutMessage: r,
    withCredentials: r,
    adapter: r,
    responseType: r,
    xsrfCookieName: r,
    xsrfHeaderName: r,
    onUploadProgress: r,
    onDownloadProgress: r,
    decompress: r,
    maxContentLength: r,
    maxBodyLength: r,
    beforeRedirect: r,
    transport: r,
    httpAgent: r,
    httpsAgent: r,
    cancelToken: r,
    socketPath: r,
    responseEncoding: r,
    validateStatus: i,
    headers: (c, f) => o(xp(c), xp(f), !0)
  };
  return Z.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const d = l[f] || o, h = d(e[f], t[f], f);
    Z.isUndefined(h) && d !== i || (n[f] = h);
  }), n;
}
const hg = "1.4.0", nh = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  nh[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const $p = {};
nh.transitional = function(t, n, s) {
  function o(a, r) {
    return "[Axios v" + hg + "] Transitional option '" + a + "'" + r + (s ? ". " + s : "");
  }
  return (a, r, i) => {
    if (t === !1)
      throw new ft(
        o(r, " has been removed" + (n ? " in " + n : "")),
        ft.ERR_DEPRECATED
      );
    return n && !$p[r] && ($p[r] = !0, console.warn(
      o(
        r,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, r, i) : !0;
  };
};
function IC(e, t, n) {
  if (typeof e != "object")
    throw new ft("options must be an object", ft.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let o = s.length;
  for (; o-- > 0; ) {
    const a = s[o], r = t[a];
    if (r) {
      const i = e[a], l = i === void 0 || r(i, a, e);
      if (l !== !0)
        throw new ft("option " + a + " must be " + l, ft.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new ft("Unknown option " + a, ft.ERR_BAD_OPTION);
  }
}
const kd = {
  assertOptions: IC,
  validators: nh
}, ro = kd.validators;
let Ql = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new bp(),
      response: new bp()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ur(this.defaults, n);
    const { transitional: s, paramsSerializer: o, headers: a } = n;
    s !== void 0 && kd.assertOptions(s, {
      silentJSONParsing: ro.transitional(ro.boolean),
      forcedJSONParsing: ro.transitional(ro.boolean),
      clarifyTimeoutError: ro.transitional(ro.boolean)
    }, !1), o != null && (Z.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : kd.assertOptions(o, {
      encode: ro.function,
      serialize: ro.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let r;
    r = a && Z.merge(
      a.common,
      a[n.method]
    ), r && Z.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete a[m];
      }
    ), n.headers = js.concat(r, a);
    const i = [];
    let l = !0;
    this.interceptors.request.forEach(function(_) {
      typeof _.runWhen == "function" && _.runWhen(n) === !1 || (l = l && _.synchronous, i.unshift(_.fulfilled, _.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(_) {
      c.push(_.fulfilled, _.rejected);
    });
    let f, d = 0, h;
    if (!l) {
      const m = [Sp.bind(this), void 0];
      for (m.unshift.apply(m, i), m.push.apply(m, c), h = m.length, f = Promise.resolve(n); d < h; )
        f = f.then(m[d++], m[d++]);
      return f;
    }
    h = i.length;
    let p = n;
    for (d = 0; d < h; ) {
      const m = i[d++], _ = i[d++];
      try {
        p = m(p);
      } catch (y) {
        _.call(this, y);
        break;
      }
    }
    try {
      f = Sp.call(this, p);
    } catch (m) {
      return Promise.reject(m);
    }
    for (d = 0, h = c.length; d < h; )
      f = f.then(c[d++], c[d++]);
    return f;
  }
  getUri(t) {
    t = Ur(this.defaults, t);
    const n = fg(t.baseURL, t.url);
    return lg(n, t.params, t.paramsSerializer);
  }
};
Z.forEach(["delete", "get", "head", "options"], function(t) {
  Ql.prototype[t] = function(n, s) {
    return this.request(Ur(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
Z.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(a, r, i) {
      return this.request(Ur(i || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: r
      }));
    };
  }
  Ql.prototype[t] = n(), Ql.prototype[t + "Form"] = n(!0);
});
const xl = Ql;
let PC = class pg {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const s = this;
    this.promise.then((o) => {
      if (!s._listeners)
        return;
      let a = s._listeners.length;
      for (; a-- > 0; )
        s._listeners[a](o);
      s._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const r = new Promise((i) => {
        s.subscribe(i), a = i;
      }).then(o);
      return r.cancel = function() {
        s.unsubscribe(a);
      }, r;
    }, t(function(a, r, i) {
      s.reason || (s.reason = new ki(a, r, i), n(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new pg(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const MC = PC;
function LC(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function VC(e) {
  return Z.isObject(e) && e.isAxiosError === !0;
}
const Td = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Td).forEach(([e, t]) => {
  Td[t] = e;
});
const FC = Td;
function mg(e) {
  const t = new xl(e), n = Xv(xl.prototype.request, t);
  return Z.extend(n, xl.prototype, t, { allOwnKeys: !0 }), Z.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return mg(Ur(e, o));
  }, n;
}
const Kt = mg(th);
Kt.Axios = xl;
Kt.CanceledError = ki;
Kt.CancelToken = MC;
Kt.isCancel = dg;
Kt.VERSION = hg;
Kt.toFormData = zc;
Kt.AxiosError = ft;
Kt.Cancel = Kt.CanceledError;
Kt.all = function(t) {
  return Promise.all(t);
};
Kt.spread = LC;
Kt.isAxiosError = VC;
Kt.mergeConfig = Ur;
Kt.AxiosHeaders = js;
Kt.formToJSON = (e) => ug(Z.isHTMLForm(e) ? new FormData(e) : e);
Kt.HttpStatusCode = FC;
Kt.default = Kt;
const sh = Kt, {
  Axios: Az,
  AxiosError: UC,
  CanceledError: Rz,
  isCancel: Iz,
  CancelToken: Pz,
  VERSION: Mz,
  all: Lz,
  Cancel: Vz,
  isAxiosError: Fz,
  spread: Uz,
  toFormData: jz,
  AxiosHeaders: Hz,
  HttpStatusCode: Bz,
  formToJSON: Yz,
  mergeConfig: Wz
} = sh, Ti = () => {
  let e = "";
  return window.app_path_webroot_full ? e = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : e = `${location.protocol}//${location.host}/api`, e;
}, Ni = (e, t = [], n = {}) => {
  n = { ...{
    baseURL: e,
    timeout: 6e4
  }, ...n };
  const o = sh.create(n);
  o.interceptors.request.use(
    function(r) {
      const i = a(t);
      for (const [l, c] of Object.entries(i))
        r.params[l] = c;
      return r.headers = {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...r.headers
      }, r;
    },
    function(r) {
      return Promise.reject(r);
    }
  );
  function a(r = []) {
    let i = new URLSearchParams(location.search), l = {};
    for (let [c, f] of i.entries())
      r.includes(c) && (l[c] = f);
    return window.redcap_csrf_token && (l.redcap_csrf_token = window.redcap_csrf_token), l;
  }
  return o;
}, Gs = (e) => {
  var o, a, r, i, l;
  let t = "";
  const n = ["Something happened in setting up the request that triggered an Error"];
  if (e.response) {
    let c = `The request was made and the server responded with a status code ${e.response.status}`;
    (a = (o = e == null ? void 0 : e.response) == null ? void 0 : o.data) != null && a.message && (c += ` - ${(i = (r = e == null ? void 0 : e.response) == null ? void 0 : r.data) == null ? void 0 : i.message}`), n.push(c), t = (l = e == null ? void 0 : e.response) == null ? void 0 : l.data;
  } else
    e.request && (n.push("The request was made but no response was received"), t = e.request);
  return e.message && n.push(e.message), t && t !== "" && (typeof t == "string" || t instanceof String) && n.push(t), n.join(`
`);
}, Cp = Object.freeze({
  TOGGLE_READ: "toggle_read",
  DELETE: "delete",
  DELETE_SELECTED: "delete_selected",
  MARK_UNREAD_SELECTED: "mark_unread_selected",
  MARK_READ_SELECTED: "mark_read_selected"
}), jC = Ti(), Cu = Ni(jC, ["pid"]), Ou = [
  { label: "1 minute", value: 1e3 * 60 },
  // 1 minute
  { label: "5 minutes", value: 1e3 * 60 * 5 },
  { label: "10 minutes", value: 1e3 * 60 * 10 }
], HC = () => {
  let e = null;
  const t = wt({
    ready: !1,
    loading: !1,
    settings: {},
    list: [],
    //parcels
    active: null,
    // active parcel
    selected: [],
    // list of selected (checked) parcels
    refreshInterval: !1,
    findParcel(n) {
      return this.list.find((o) => o.id === n);
    },
    get unread() {
      let n = 0;
      for (const s of this.list)
        (s == null ? void 0 : s.read) === !1 && n++;
      return n;
    },
    reset() {
      this.active = null, this.selected = [];
    },
    async fetchList() {
      try {
        this.loading = !0, this.reset();
        const n = {
          route: "ParcelController:list"
        }, s = await Cu.get("", { params: n, method: "GET" }), {
          data: { data: o = [], metadata: a = {} }
        } = s;
        this.list = o.map((r) => new E$(r));
      } catch (n) {
        console.log("error fetching messages", n);
      } finally {
        this.loading = !1;
      }
    },
    async fetchSettings() {
      const n = {
        route: "ParcelController:settings"
      }, s = await Cu.get("", { params: n });
      this.settings = (s == null ? void 0 : s.data) ?? {};
    },
    async sendCommand(n, s = {}) {
      const o = {
        route: "ParcelController:command"
      }, a = { action: n, args: s };
      return await Cu.post("", a, { params: o });
    },
    /**
     * send commands, but use optimistic update
     *
     * @param {String} ID
     * @returns
     */
    async deleteParcel(n) {
      const s = (i) => {
        const l = this.list.indexOf(i);
        l >= 0 && this.list.splice(l, 1);
      }, o = (i) => {
        const l = this.selected.indexOf(i);
        l < 0 || this.selected.splice(l, 1);
      }, a = (i) => {
        r === this.active && (this.active = null);
      }, r = this.findParcel(n);
      if (r)
        return o(n), a(), s(r), this.sendCommand(Cp.DELETE, { id: n });
    },
    /**
     * send commands, but use optimistic update
     *
     * @param {String} ID
     * @param {Boolean} read
     * @returns
     */
    async markParcel(n, s) {
      const o = this.findParcel(n);
      return o && (o.read = s), this.sendCommand(Cp.TOGGLE_READ, { id: n, read: s });
    },
    /**
     * toggle active parcel
     * @param {Object} parcel
     */
    toggle(n) {
      this.active === n ? this.active = null : this.active = n;
    },
    async init() {
      if (!this.ready)
        return this.ready = !0, await this.fetchSettings(), await this.fetchList(), !0;
    }
  });
  return tn(() => {
    typeof t.refreshInterval == "number" && !isNaN(t.refreshInterval) ? (e && clearInterval(e), e = setInterval(() => {
      t.fetchList();
    }, t.refreshInterval)) : clearInterval(e);
  }), t;
}, qr = Bt("parcels", HC, !0);
const BC = { id: "post-master" }, YC = {
  __name: "App",
  setup(e) {
    const t = qr();
    return dn(() => t.init()), (n, s) => {
      const o = Te("router-view");
      return b(), E("div", BC, [
        T(o)
      ]);
    };
  }
};
const Se = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, _g = (e) => (Ze("data-v-74e3924a"), e = e(), qe(), e), WC = { class: "d-inline-block" }, GC = { class: "d-flex align-items-center" }, zC = { class: "position-relative" }, KC = ["href"], JC = {
  key: 0,
  class: "action"
}, XC = /* @__PURE__ */ _g(() => /* @__PURE__ */ u("i", { class: "fa-solid fa-spinner fa-spin fa-fw" }, null, -1)), QC = [
  XC
], ZC = /* @__PURE__ */ _g(() => /* @__PURE__ */ u("i", { class: "fas fa-sync-alt fa-fw" }, null, -1)), qC = [
  ZC
], eO = {
  key: 2,
  class: "badge bg-danger"
}, tO = {
  __name: "NotificationBadge",
  setup(e) {
    const t = qr(), n = k(() => t.loading), s = k(() => t.unread), o = k(() => {
      var r;
      return (r = t == null ? void 0 : t.settings) == null ? void 0 : r.indexURL;
    });
    dn(() => {
      var r;
      t.init(), t.refreshInterval = (r = Ou == null ? void 0 : Ou[0]) == null ? void 0 : r.value;
    }), Kr(() => t.refreshInterval = !1);
    function a() {
      t.fetchList();
    }
    return (r, i) => (b(), E("div", WC, [
      u("div", GC, [
        u("div", zC, [
          u("a", { href: o.value }, "Messages", 8, KC)
        ]),
        n.value ? (b(), E("span", JC, QC)) : (b(), E("span", {
          key: 1,
          class: "action",
          onClick: a
        }, qC)),
        s.value > 0 ? (b(), E("span", eO, j(s.value) + " unread", 1)) : me("", !0)
      ])
    ]));
  }
}, nO = /* @__PURE__ */ Se(tO, [["__scopeId", "data-v-74e3924a"]]);
function sO() {
  return vg().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function vg() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const oO = typeof Proxy == "function", rO = "devtools-plugin:setup", aO = "plugin:settings:set";
let vr, Nd;
function iO() {
  var e;
  return vr !== void 0 || (typeof window < "u" && window.performance ? (vr = !0, Nd = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (vr = !0, Nd = global.perf_hooks.performance) : vr = !1), vr;
}
function lO() {
  return iO() ? Nd.now() : Date.now();
}
class cO {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const r in t.settings) {
        const i = t.settings[r];
        s[r] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, s);
    try {
      const r = localStorage.getItem(o), i = JSON.parse(r);
      Object.assign(a, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(r) {
        try {
          localStorage.setItem(o, JSON.stringify(r));
        } catch {
        }
        a = r;
      },
      now() {
        return lO();
      }
    }, n && n.on(aO, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...l) => {
        this.onQueue.push({
          method: i,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...l) => (this.targetQueue.push({
        method: i,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[i](...l)) : (...l) => new Promise((c) => {
        this.targetQueue.push({
          method: i,
          args: l,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function uO(e, t) {
  const n = e, s = vg(), o = sO(), a = oO && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(rO, e, t);
  else {
    const r = a ? new cO(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: r
    }), r && t(r.proxiedTarget);
  }
}
/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Is = typeof window < "u";
function dO(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const yt = Object.assign;
function ku(e, t) {
  const n = {};
  for (const s in t) {
    const o = t[s];
    n[s] = Fn(o) ? o.map(e) : e(o);
  }
  return n;
}
const ja = () => {
}, Fn = Array.isArray;
function rt(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const fO = /\/$/, hO = (e) => e.replace(fO, "");
function Tu(e, t, n = "/") {
  let s, o = {}, a = "", r = "";
  const i = t.indexOf("#");
  let l = t.indexOf("?");
  return i < l && i >= 0 && (l = -1), l > -1 && (s = t.slice(0, l), a = t.slice(l + 1, i > -1 ? i : t.length), o = e(a)), i > -1 && (s = s || t.slice(0, i), r = t.slice(i, t.length)), s = _O(s ?? t, n), {
    fullPath: s + (a && "?") + a + r,
    path: s,
    query: o,
    hash: r
  };
}
function pO(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Op(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function kp(e, t, n) {
  const s = t.matched.length - 1, o = n.matched.length - 1;
  return s > -1 && s === o && Ao(t.matched[s], n.matched[o]) && gg(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Ao(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function gg(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!mO(e[n], t[n]))
      return !1;
  return !0;
}
function mO(e, t) {
  return Fn(e) ? Tp(e, t) : Fn(t) ? Tp(t, e) : e === t;
}
function Tp(e, t) {
  return Fn(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function _O(e, t) {
  if (e.startsWith("/"))
    return e;
  if ({}.NODE_ENV !== "production" && !t.startsWith("/"))
    return rt(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), s = e.split("/"), o = s[s.length - 1];
  (o === ".." || o === ".") && s.push("");
  let a = n.length - 1, r, i;
  for (r = 0; r < s.length; r++)
    if (i = s[r], i !== ".")
      if (i === "..")
        a > 1 && a--;
      else
        break;
  return n.slice(0, a).join("/") + "/" + s.slice(r - (r === s.length ? 1 : 0)).join("/");
}
var hi;
(function(e) {
  e.pop = "pop", e.push = "push";
})(hi || (hi = {}));
var Ha;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Ha || (Ha = {}));
function vO(e) {
  if (!e)
    if (Is) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), hO(e);
}
const gO = /^[^#]+#/;
function yO(e, t) {
  return e.replace(gO, "#") + t;
}
function bO(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const Xc = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function wO(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#");
    if ({}.NODE_ENV !== "production" && typeof e.el == "string" && (!s || !document.getElementById(e.el.slice(1))))
      try {
        const a = document.querySelector(e.el);
        if (s && a) {
          rt(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        rt(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      ({}).NODE_ENV !== "production" && rt(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = bO(o, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Np(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Dd = /* @__PURE__ */ new Map();
function EO(e, t) {
  Dd.set(e, t);
}
function SO(e) {
  const t = Dd.get(e);
  return Dd.delete(e), t;
}
let xO = () => location.protocol + "//" + location.host;
function yg(e, t) {
  const { pathname: n, search: s, hash: o } = t, a = e.indexOf("#");
  if (a > -1) {
    let i = o.includes(e.slice(a)) ? e.slice(a).length : 1, l = o.slice(i);
    return l[0] !== "/" && (l = "/" + l), Op(l, "");
  }
  return Op(n, e) + s + o;
}
function $O(e, t, n, s) {
  let o = [], a = [], r = null;
  const i = ({ state: h }) => {
    const p = yg(e, location), m = n.value, _ = t.value;
    let y = 0;
    if (h) {
      if (n.value = p, t.value = h, r && r === m) {
        r = null;
        return;
      }
      y = _ ? h.position - _.position : 0;
    } else
      s(p);
    o.forEach((g) => {
      g(n.value, m, {
        delta: y,
        type: hi.pop,
        direction: y ? y > 0 ? Ha.forward : Ha.back : Ha.unknown
      });
    });
  };
  function l() {
    r = n.value;
  }
  function c(h) {
    o.push(h);
    const p = () => {
      const m = o.indexOf(h);
      m > -1 && o.splice(m, 1);
    };
    return a.push(p), p;
  }
  function f() {
    const { history: h } = window;
    h.state && h.replaceState(yt({}, h.state, { scroll: Xc() }), "");
  }
  function d() {
    for (const h of a)
      h();
    a = [], window.removeEventListener("popstate", i), window.removeEventListener("beforeunload", f);
  }
  return window.addEventListener("popstate", i), window.addEventListener("beforeunload", f, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: c,
    destroy: d
  };
}
function Dp(e, t, n, s = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: o ? Xc() : null
  };
}
function CO(e) {
  const { history: t, location: n } = window, s = {
    value: yg(e, n)
  }, o = { value: t.state };
  o.value || a(s.value, {
    back: null,
    current: s.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function a(l, c, f) {
    const d = e.indexOf("#"), h = d > -1 ? (n.host && document.querySelector("base") ? e : e.slice(d)) + l : xO() + e + l;
    try {
      t[f ? "replaceState" : "pushState"](c, "", h), o.value = c;
    } catch (p) {
      ({}).NODE_ENV !== "production" ? rt("Error with push/replace State", p) : console.error(p), n[f ? "replace" : "assign"](h);
    }
  }
  function r(l, c) {
    const f = yt({}, t.state, Dp(
      o.value.back,
      // keep back and forward entries but override current position
      l,
      o.value.forward,
      !0
    ), c, { position: o.value.position });
    a(l, f, !0), s.value = l;
  }
  function i(l, c) {
    const f = yt(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      o.value,
      t.state,
      {
        forward: l,
        scroll: Xc()
      }
    );
    ({}).NODE_ENV !== "production" && !t.state && rt(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), a(f.current, f, !0);
    const d = yt({}, Dp(s.value, l, null), { position: f.position + 1 }, c);
    a(l, d, !1), s.value = l;
  }
  return {
    location: s,
    state: o,
    push: i,
    replace: r
  };
}
function OO(e) {
  e = vO(e);
  const t = CO(e), n = $O(e, t.state, t.location, t.replace);
  function s(a, r = !0) {
    r || n.pauseListeners(), history.go(a);
  }
  const o = yt({
    // it's overridden right after
    location: "",
    base: e,
    go: s,
    createHref: yO.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function Qc(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), {}.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && rt(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), OO(e);
}
function kO(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function bg(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const ao = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Ad = Symbol({}.NODE_ENV !== "production" ? "navigation failure" : "");
var Ap;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ap || (Ap = {}));
const TO = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${DO(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function jr(e, t) {
  return {}.NODE_ENV !== "production" ? yt(new Error(TO[e](t)), {
    type: e,
    [Ad]: !0
  }, t) : yt(new Error(), {
    type: e,
    [Ad]: !0
  }, t);
}
function ks(e, t) {
  return e instanceof Error && Ad in e && (t == null || !!(e.type & t));
}
const NO = ["params", "query", "hash"];
function DO(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of NO)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Rp = "[^/]+?", AO = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, RO = /[.+*?^${}()[\]/\\]/g;
function IO(e, t) {
  const n = yt({}, AO, t), s = [];
  let o = n.start ? "^" : "";
  const a = [];
  for (const c of e) {
    const f = c.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !c.length && (o += "/");
    for (let d = 0; d < c.length; d++) {
      const h = c[d];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        d || (o += "/"), o += h.value.replace(RO, "\\$&"), p += 40;
      else if (h.type === 1) {
        const { value: m, repeatable: _, optional: y, regexp: g } = h;
        a.push({
          name: m,
          repeatable: _,
          optional: y
        });
        const v = g || Rp;
        if (v !== Rp) {
          p += 10;
          try {
            new RegExp(`(${v})`);
          } catch (w) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${v}): ` + w.message);
          }
        }
        let S = _ ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
        d || (S = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        y && c.length < 2 ? `(?:/${S})` : "/" + S), y && (S += "?"), o += S, p += 20, y && (p += -8), _ && (p += -20), v === ".*" && (p += -50);
      }
      f.push(p);
    }
    s.push(f);
  }
  if (n.strict && n.end) {
    const c = s.length - 1;
    s[c][s[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && (o += "(?:/|$)");
  const r = new RegExp(o, n.sensitive ? "" : "i");
  function i(c) {
    const f = c.match(r), d = {};
    if (!f)
      return null;
    for (let h = 1; h < f.length; h++) {
      const p = f[h] || "", m = a[h - 1];
      d[m.name] = p && m.repeatable ? p.split("/") : p;
    }
    return d;
  }
  function l(c) {
    let f = "", d = !1;
    for (const h of e) {
      (!d || !f.endsWith("/")) && (f += "/"), d = !1;
      for (const p of h)
        if (p.type === 0)
          f += p.value;
        else if (p.type === 1) {
          const { value: m, repeatable: _, optional: y } = p, g = m in c ? c[m] : "";
          if (Fn(g) && !_)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const v = Fn(g) ? g.join("/") : g;
          if (!v)
            if (y)
              h.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : d = !0);
            else
              throw new Error(`Missing required param "${m}"`);
          f += v;
        }
    }
    return f || "/";
  }
  return {
    re: r,
    score: s,
    keys: a,
    parse: i,
    stringify: l
  };
}
function PO(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s)
      return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0;
}
function MO(e, t) {
  let n = 0;
  const s = e.score, o = t.score;
  for (; n < s.length && n < o.length; ) {
    const a = PO(s[n], o[n]);
    if (a)
      return a;
    n++;
  }
  if (Math.abs(o.length - s.length) === 1) {
    if (Ip(s))
      return 1;
    if (Ip(o))
      return -1;
  }
  return o.length - s.length;
}
function Ip(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const LO = {
  type: 0,
  value: ""
}, VO = /[a-zA-Z0-9_]/;
function FO(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[LO]];
  if (!e.startsWith("/"))
    throw new Error({}.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${c}": ${p}`);
  }
  let n = 0, s = n;
  const o = [];
  let a;
  function r() {
    a && o.push(a), a = [];
  }
  let i = 0, l, c = "", f = "";
  function d() {
    c && (n === 0 ? a.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (a.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), a.push({
      type: 1,
      value: c,
      regexp: f,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), c = "");
  }
  function h() {
    c += l;
  }
  for (; i < e.length; ) {
    if (l = e[i++], l === "\\" && n !== 2) {
      s = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && d(), r()) : l === ":" ? (d(), n = 1) : h();
        break;
      case 4:
        h(), n = s;
        break;
      case 1:
        l === "(" ? n = 2 : VO.test(l) ? h() : (d(), n = 0, l !== "*" && l !== "?" && l !== "+" && i--);
        break;
      case 2:
        l === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + l : n = 3 : f += l;
        break;
      case 3:
        d(), n = 0, l !== "*" && l !== "?" && l !== "+" && i--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), r(), o;
}
function UO(e, t, n) {
  const s = IO(FO(e.path), n);
  if ({}.NODE_ENV !== "production") {
    const a = /* @__PURE__ */ new Set();
    for (const r of s.keys)
      a.has(r.name) && rt(`Found duplicated params with name "${r.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), a.add(r.name);
  }
  const o = yt(s, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function jO(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Lp({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(f) {
    return s.get(f);
  }
  function a(f, d, h) {
    const p = !h, m = HO(f);
    ({}).NODE_ENV !== "production" && GO(m, d), m.aliasOf = h && h.record;
    const _ = Lp(t, f), y = [
      m
    ];
    if ("alias" in f) {
      const S = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const w of S)
        y.push(yt({}, m, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: h ? h.record.components : m.components,
          path: w,
          // we might be the child of an alias
          aliasOf: h ? h.record : m
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let g, v;
    for (const S of y) {
      const { path: w } = S;
      if (d && w[0] !== "/") {
        const $ = d.record.path, C = $[$.length - 1] === "/" ? "" : "/";
        S.path = d.record.path + (w && C + w);
      }
      if ({}.NODE_ENV !== "production" && S.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (g = UO(S, d, _), {}.NODE_ENV !== "production" && d && w[0] === "/" && zO(g, d), h ? (h.alias.push(g), {}.NODE_ENV !== "production" && WO(h, g)) : (v = v || g, v !== g && v.alias.push(g), p && f.name && !Mp(g) && r(f.name)), m.children) {
        const $ = m.children;
        for (let C = 0; C < $.length; C++)
          a($[C], g, h && h.children[C]);
      }
      h = h || g, (g.record.components && Object.keys(g.record.components).length || g.record.name || g.record.redirect) && l(g);
    }
    return v ? () => {
      r(v);
    } : ja;
  }
  function r(f) {
    if (bg(f)) {
      const d = s.get(f);
      d && (s.delete(f), n.splice(n.indexOf(d), 1), d.children.forEach(r), d.alias.forEach(r));
    } else {
      const d = n.indexOf(f);
      d > -1 && (n.splice(d, 1), f.record.name && s.delete(f.record.name), f.children.forEach(r), f.alias.forEach(r));
    }
  }
  function i() {
    return n;
  }
  function l(f) {
    let d = 0;
    for (; d < n.length && MO(f, n[d]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (f.record.path !== n[d].record.path || !wg(f, n[d])); )
      d++;
    n.splice(d, 0, f), f.record.name && !Mp(f) && s.set(f.record.name, f);
  }
  function c(f, d) {
    let h, p = {}, m, _;
    if ("name" in f && f.name) {
      if (h = s.get(f.name), !h)
        throw jr(1, {
          location: f
        });
      if ({}.NODE_ENV !== "production") {
        const v = Object.keys(f.params || {}).filter((S) => !h.keys.find((w) => w.name === S));
        v.length && rt(`Discarded invalid param(s) "${v.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = h.record.name, p = yt(
        // paramsFromLocation is a new object
        Pp(
          d.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          h.keys.filter((v) => !v.optional).map((v) => v.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        f.params && Pp(f.params, h.keys.map((v) => v.name))
      ), m = h.stringify(p);
    } else if ("path" in f)
      m = f.path, {}.NODE_ENV !== "production" && !m.startsWith("/") && rt(`The Matcher cannot resolve relative paths but received "${m}". Unless you directly called \`matcher.resolve("${m}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), h = n.find((v) => v.re.test(m)), h && (p = h.parse(m), _ = h.record.name);
    else {
      if (h = d.name ? s.get(d.name) : n.find((v) => v.re.test(d.path)), !h)
        throw jr(1, {
          location: f,
          currentLocation: d
        });
      _ = h.record.name, p = yt({}, d.params, f.params), m = h.stringify(p);
    }
    const y = [];
    let g = h;
    for (; g; )
      y.unshift(g.record), g = g.parent;
    return {
      name: _,
      path: m,
      params: p,
      matched: y,
      meta: YO(y)
    };
  }
  return e.forEach((f) => a(f)), { addRoute: a, resolve: c, removeRoute: r, getRoutes: i, getRecordMatcher: o };
}
function Pp(e, t) {
  const n = {};
  for (const s of t)
    s in e && (n[s] = e[s]);
  return n;
}
function HO(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: BO(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function BO(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const s in e.components)
      t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Mp(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function YO(e) {
  return e.reduce((t, n) => yt(t, n.meta), {});
}
function Lp(e, t) {
  const n = {};
  for (const s in e)
    n[s] = s in t ? t[s] : e[s];
  return n;
}
function Rd(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function WO(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Rd.bind(null, n)))
      return rt(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Rd.bind(null, n)))
      return rt(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function GO(e, t) {
  t && t.record.name && !e.name && !e.path && rt(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function zO(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Rd.bind(null, n)))
      return rt(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function wg(e, t) {
  return t.children.some((n) => n === e || wg(e, n));
}
const Eg = /#/g, KO = /&/g, JO = /\//g, XO = /=/g, QO = /\?/g, Sg = /\+/g, ZO = /%5B/g, qO = /%5D/g, xg = /%5E/g, ek = /%60/g, $g = /%7B/g, tk = /%7C/g, Cg = /%7D/g, nk = /%20/g;
function oh(e) {
  return encodeURI("" + e).replace(tk, "|").replace(ZO, "[").replace(qO, "]");
}
function sk(e) {
  return oh(e).replace($g, "{").replace(Cg, "}").replace(xg, "^");
}
function Id(e) {
  return oh(e).replace(Sg, "%2B").replace(nk, "+").replace(Eg, "%23").replace(KO, "%26").replace(ek, "`").replace($g, "{").replace(Cg, "}").replace(xg, "^");
}
function ok(e) {
  return Id(e).replace(XO, "%3D");
}
function rk(e) {
  return oh(e).replace(Eg, "%23").replace(QO, "%3F");
}
function ak(e) {
  return e == null ? "" : rk(e).replace(JO, "%2F");
}
function pi(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    ({}).NODE_ENV !== "production" && rt(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function ik(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < s.length; ++o) {
    const a = s[o].replace(Sg, " "), r = a.indexOf("="), i = pi(r < 0 ? a : a.slice(0, r)), l = r < 0 ? null : pi(a.slice(r + 1));
    if (i in t) {
      let c = t[i];
      Fn(c) || (c = t[i] = [c]), c.push(l);
    } else
      t[i] = l;
  }
  return t;
}
function Vp(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = ok(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Fn(s) ? s.map((a) => a && Id(a)) : [s && Id(s)]).forEach((a) => {
      a !== void 0 && (t += (t.length ? "&" : "") + n, a != null && (t += "=" + a));
    });
  }
  return t;
}
function lk(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = Fn(s) ? s.map((o) => o == null ? null : "" + o) : s == null ? s : "" + s);
  }
  return t;
}
const ck = Symbol({}.NODE_ENV !== "production" ? "router view location matched" : ""), Fp = Symbol({}.NODE_ENV !== "production" ? "router view depth" : ""), Zc = Symbol({}.NODE_ENV !== "production" ? "router" : ""), Og = Symbol({}.NODE_ENV !== "production" ? "route location" : ""), Pd = Symbol({}.NODE_ENV !== "production" ? "router view location" : "");
function fa() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const o = e.indexOf(s);
      o > -1 && e.splice(o, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function uo(e, t, n, s, o) {
  const a = s && // name is defined if record is because of the function overload
  (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
  return () => new Promise((r, i) => {
    const l = (d) => {
      d === !1 ? i(jr(4, {
        from: n,
        to: t
      })) : d instanceof Error ? i(d) : kO(d) ? i(jr(2, {
        from: t,
        to: d
      })) : (a && // since enterCallbackArray is truthy, both record and name also are
      s.enterCallbacks[o] === a && typeof d == "function" && a.push(d), r());
    }, c = e.call(s && s.instances[o], t, n, {}.NODE_ENV !== "production" ? uk(l, t, n) : l);
    let f = Promise.resolve(c);
    if (e.length < 3 && (f = f.then(l)), {}.NODE_ENV !== "production" && e.length > 2) {
      const d = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof c == "object" && "then" in c)
        f = f.then((h) => l._called ? h : (rt(d), Promise.reject(new Error("Invalid navigation guard"))));
      else if (c !== void 0 && !l._called) {
        rt(d), i(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((d) => i(d));
  });
}
function uk(e, t, n) {
  let s = 0;
  return function() {
    s++ === 1 && rt(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, s === 1 && e.apply(null, arguments);
  };
}
function Nu(e, t, n, s) {
  const o = [];
  for (const a of e) {
    ({}).NODE_ENV !== "production" && !a.components && !a.children.length && rt(`Record with path "${a.path}" is either missing a "component(s)" or "children" property.`);
    for (const r in a.components) {
      let i = a.components[r];
      if ({}.NODE_ENV !== "production") {
        if (!i || typeof i != "object" && typeof i != "function")
          throw rt(`Component "${r}" in record with path "${a.path}" is not a valid component. Received "${String(i)}".`), new Error("Invalid route component");
        if ("then" in i) {
          rt(`Component "${r}" in record with path "${a.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const l = i;
          i = () => l;
        } else
          i.__asyncLoader && // warn only once per component
          !i.__warnedDefineAsync && (i.__warnedDefineAsync = !0, rt(`Component "${r}" in record with path "${a.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !a.instances[r]))
        if (dk(i)) {
          const c = (i.__vccOpts || i)[t];
          c && o.push(uo(c, n, s, a, r));
        } else {
          let l = i();
          ({}).NODE_ENV !== "production" && !("catch" in l) && (rt(`Component "${r}" in record with path "${a.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l = Promise.resolve(l)), o.push(() => l.then((c) => {
            if (!c)
              return Promise.reject(new Error(`Couldn't resolve component "${r}" at "${a.path}"`));
            const f = dO(c) ? c.default : c;
            a.components[r] = f;
            const h = (f.__vccOpts || f)[t];
            return h && uo(h, n, s, a, r)();
          }));
        }
    }
  }
  return o;
}
function dk(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Md(e) {
  const t = ln(Zc), n = ln(Og), s = k(() => t.resolve(G(e.to))), o = k(() => {
    const { matched: l } = s.value, { length: c } = l, f = l[c - 1], d = n.matched;
    if (!f || !d.length)
      return -1;
    const h = d.findIndex(Ao.bind(null, f));
    if (h > -1)
      return h;
    const p = Up(l[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Up(f) === p && // avoid comparing the child with its parent
      d[d.length - 1].path !== p ? d.findIndex(Ao.bind(null, l[c - 2])) : h
    );
  }), a = k(() => o.value > -1 && pk(n.params, s.value.params)), r = k(() => o.value > -1 && o.value === n.matched.length - 1 && gg(n.params, s.value.params));
  function i(l = {}) {
    return hk(l) ? t[G(e.replace) ? "replace" : "push"](
      G(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(ja) : Promise.resolve();
  }
  if ({}.NODE_ENV !== "production" && Is) {
    const l = An();
    if (l) {
      const c = {
        route: s.value,
        isActive: a.value,
        isExactActive: r.value
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(c), tn(() => {
        c.route = s.value, c.isActive = a.value, c.isExactActive = r.value;
      }, { flush: "post" });
    }
  }
  return {
    route: s,
    href: k(() => s.value.href),
    isActive: a,
    isExactActive: r,
    navigate: i
  };
}
const fk = /* @__PURE__ */ un({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Md,
  setup(e, { slots: t }) {
    const n = wt(Md(e)), { options: s } = ln(Zc), o = k(() => ({
      [jp(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [jp(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const a = t.default && t.default(n);
      return e.custom ? a : Ms("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: o.value
      }, a);
    };
  }
}), mi = fk;
function hk(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function pk(e, t) {
  for (const n in t) {
    const s = t[n], o = e[n];
    if (typeof s == "string") {
      if (s !== o)
        return !1;
    } else if (!Fn(o) || o.length !== s.length || s.some((a, r) => a !== o[r]))
      return !1;
  }
  return !0;
}
function Up(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const jp = (e, t, n) => e ?? t ?? n, mk = /* @__PURE__ */ un({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    ({}).NODE_ENV !== "production" && vk();
    const s = ln(Pd), o = k(() => e.route || s.value), a = ln(Fp, 0), r = k(() => {
      let c = G(a);
      const { matched: f } = o.value;
      let d;
      for (; (d = f[c]) && !d.components; )
        c++;
      return c;
    }), i = k(() => o.value.matched[r.value]);
    Ia(Fp, k(() => r.value + 1)), Ia(ck, i), Ia(Pd, o);
    const l = te();
    return Xt(() => [l.value, i.value, e.name], ([c, f, d], [h, p, m]) => {
      f && (f.instances[d] = c, p && p !== f && c && c === h && (f.leaveGuards.size || (f.leaveGuards = p.leaveGuards), f.updateGuards.size || (f.updateGuards = p.updateGuards))), c && f && // if there is no instance but to and from are the same this might be
      // the first visit
      (!p || !Ao(f, p) || !h) && (f.enterCallbacks[d] || []).forEach((_) => _(c));
    }, { flush: "post" }), () => {
      const c = o.value, f = e.name, d = i.value, h = d && d.components[f];
      if (!h)
        return Hp(n.default, { Component: h, route: c });
      const p = d.props[f], m = p ? p === !0 ? c.params : typeof p == "function" ? p(c) : p : null, y = Ms(h, yt({}, m, t, {
        onVnodeUnmounted: (g) => {
          g.component.isUnmounted && (d.instances[f] = null);
        },
        ref: l
      }));
      if ({}.NODE_ENV !== "production" && Is && y.ref) {
        const g = {
          depth: r.value,
          name: d.name,
          path: d.path,
          meta: d.meta
        };
        (Fn(y.ref) ? y.ref.map((S) => S.i) : [y.ref.i]).forEach((S) => {
          S.__vrv_devtools = g;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Hp(n.default, { Component: y, route: c }) || y
      );
    };
  }
});
function Hp(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const _k = mk;
function vk() {
  const e = An(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const s = t === "KeepAlive" ? "keep-alive" : "transition";
    rt(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${s}>
    <component :is="Component" />
  </${s}>
</router-view>`);
  }
}
function ha(e, t) {
  const n = yt({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((s) => Ck(s, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function ol(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let gk = 0;
function yk(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const s = gk++;
  uO({
    id: "org.vuejs.router" + (s ? "." + s : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (o) => {
    typeof o.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.on.inspectComponent((f, d) => {
      f.instanceData && f.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: ha(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: f, componentInstance: d }) => {
      if (d.__vrv_devtools) {
        const h = d.__vrv_devtools;
        f.tags.push({
          label: (h.name ? `${h.name.toString()}: ` : "") + h.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: kg
        });
      }
      Fn(d.__vrl_devtools) && (d.__devtoolsApi = o, d.__vrl_devtools.forEach((h) => {
        let p = Dg, m = "";
        h.isExactActive ? (p = Ng, m = "This is exactly active") : h.isActive && (p = Tg, m = "This link is active"), f.tags.push({
          label: h.route.path,
          textColor: 0,
          tooltip: m,
          backgroundColor: p
        });
      }));
    }), Xt(t.currentRoute, () => {
      l(), o.notifyComponentUpdate(), o.sendInspectorTree(i), o.sendInspectorState(i);
    });
    const a = "router:navigations:" + s;
    o.addTimelineLayer({
      id: a,
      label: `Router${s ? " " + s : ""} Navigations`,
      color: 4237508
    }), t.onError((f, d) => {
      o.addTimelineEvent({
        layerId: a,
        event: {
          title: "Error during Navigation",
          subtitle: d.fullPath,
          logType: "error",
          time: o.now(),
          data: { error: f },
          groupId: d.meta.__navigationId
        }
      });
    });
    let r = 0;
    t.beforeEach((f, d) => {
      const h = {
        guard: ol("beforeEach"),
        from: ha(d, "Current Location during this navigation"),
        to: ha(f, "Target location")
      };
      Object.defineProperty(f.meta, "__navigationId", {
        value: r++
      }), o.addTimelineEvent({
        layerId: a,
        event: {
          time: o.now(),
          title: "Start of navigation",
          subtitle: f.fullPath,
          data: h,
          groupId: f.meta.__navigationId
        }
      });
    }), t.afterEach((f, d, h) => {
      const p = {
        guard: ol("afterEach")
      };
      h ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: h ? h.message : "",
          tooltip: "Navigation Failure",
          value: h
        }
      }, p.status = ol("❌")) : p.status = ol("✅"), p.from = ha(d, "Current Location during this navigation"), p.to = ha(f, "Target location"), o.addTimelineEvent({
        layerId: a,
        event: {
          title: "End of navigation",
          subtitle: f.fullPath,
          time: o.now(),
          data: p,
          logType: h ? "warning" : "default",
          groupId: f.meta.__navigationId
        }
      });
    });
    const i = "router-inspector:" + s;
    o.addInspector({
      id: i,
      label: "Routes" + (s ? " " + s : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!c)
        return;
      const f = c;
      let d = n.getRoutes().filter((h) => !h.parent);
      d.forEach(Ig), f.filter && (d = d.filter((h) => (
        // save matches state based on the payload
        Ld(h, f.filter.toLowerCase())
      ))), d.forEach((h) => Rg(h, t.currentRoute.value)), f.rootNodes = d.map(Ag);
    }
    let c;
    o.on.getInspectorTree((f) => {
      c = f, f.app === e && f.inspectorId === i && l();
    }), o.on.getInspectorState((f) => {
      if (f.app === e && f.inspectorId === i) {
        const h = n.getRoutes().find((p) => p.record.__vd_id === f.nodeId);
        h && (f.state = {
          options: wk(h)
        });
      }
    }), o.sendInspectorTree(i), o.sendInspectorState(i);
  });
}
function bk(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function wk(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((s) => `${s.name}${bk(s)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((s) => s.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((s) => s.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const kg = 15485081, Tg = 2450411, Ng = 8702998, Ek = 2282478, Dg = 16486972, Sk = 6710886;
function Ag(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Ek
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Dg
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: kg
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Ng
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Tg
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Sk
  });
  let s = n.__vd_id;
  return s == null && (s = String(xk++), n.__vd_id = s), {
    id: s,
    label: n.path,
    tags: t,
    children: e.children.map(Ag)
  };
}
let xk = 0;
const $k = /^\/(.*)\/([a-z]*)$/;
function Rg(e, t) {
  const n = t.matched.length && Ao(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((s) => Ao(s, e.record))), e.children.forEach((s) => Rg(s, t));
}
function Ig(e) {
  e.__vd_match = !1, e.children.forEach(Ig);
}
function Ld(e, t) {
  const n = String(e.re).match($k);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((r) => Ld(r, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), a = pi(o);
  return !t.startsWith("/") && (a.includes(t) || o.includes(t)) || a.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((r) => Ld(r, t));
}
function Ck(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || (n[s] = e[s]);
  return n;
}
function qc(e) {
  const t = jO(e.routes, e), n = e.parseQuery || ik, s = e.stringifyQuery || Vp, o = e.history;
  if ({}.NODE_ENV !== "production" && !o)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const a = fa(), r = fa(), i = fa(), l = Fm(ao);
  let c = ao;
  Is && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = ku.bind(null, (B) => "" + B), d = ku.bind(null, ak), h = (
    // @ts-expect-error: intentionally avoid the type check
    ku.bind(null, pi)
  );
  function p(B, de) {
    let ue, _e;
    return bg(B) ? (ue = t.getRecordMatcher(B), _e = de) : _e = B, t.addRoute(_e, ue);
  }
  function m(B) {
    const de = t.getRecordMatcher(B);
    de ? t.removeRoute(de) : {}.NODE_ENV !== "production" && rt(`Cannot remove non-existent route "${String(B)}"`);
  }
  function _() {
    return t.getRoutes().map((B) => B.record);
  }
  function y(B) {
    return !!t.getRecordMatcher(B);
  }
  function g(B, de) {
    if (de = yt({}, de || l.value), typeof B == "string") {
      const O = Tu(n, B, de.path), U = t.resolve({ path: O.path }, de), Q = o.createHref(O.fullPath);
      return {}.NODE_ENV !== "production" && (Q.startsWith("//") ? rt(`Location "${B}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : U.matched.length || rt(`No match found for location with path "${B}"`)), yt(O, U, {
        params: h(U.params),
        hash: pi(O.hash),
        redirectedFrom: void 0,
        href: Q
      });
    }
    let ue;
    if ("path" in B)
      ({}).NODE_ENV !== "production" && "params" in B && !("name" in B) && // @ts-expect-error: the type is never
      Object.keys(B.params).length && rt(`Path "${B.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), ue = yt({}, B, {
        path: Tu(n, B.path, de.path).path
      });
    else {
      const O = yt({}, B.params);
      for (const U in O)
        O[U] == null && delete O[U];
      ue = yt({}, B, {
        params: d(O)
      }), de.params = d(de.params);
    }
    const _e = t.resolve(ue, de), Ye = B.hash || "";
    ({}).NODE_ENV !== "production" && Ye && !Ye.startsWith("#") && rt(`A \`hash\` should always start with the character "#". Replace "${Ye}" with "#${Ye}".`), _e.params = f(h(_e.params));
    const ct = pO(s, yt({}, B, {
      hash: sk(Ye),
      path: _e.path
    })), x = o.createHref(ct);
    return {}.NODE_ENV !== "production" && (x.startsWith("//") ? rt(`Location "${B}" resolved to "${x}". A resolved location cannot start with multiple slashes.`) : _e.matched.length || rt(`No match found for location with path "${"path" in B ? B.path : B}"`)), yt({
      fullPath: ct,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: Ye,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        s === Vp ? lk(B.query) : B.query || {}
      )
    }, _e, {
      redirectedFrom: void 0,
      href: x
    });
  }
  function v(B) {
    return typeof B == "string" ? Tu(n, B, l.value.path) : yt({}, B);
  }
  function S(B, de) {
    if (c !== B)
      return jr(8, {
        from: de,
        to: B
      });
  }
  function w(B) {
    return N(B);
  }
  function $(B) {
    return w(yt(v(B), { replace: !0 }));
  }
  function C(B) {
    const de = B.matched[B.matched.length - 1];
    if (de && de.redirect) {
      const { redirect: ue } = de;
      let _e = typeof ue == "function" ? ue(B) : ue;
      if (typeof _e == "string" && (_e = _e.includes("?") || _e.includes("#") ? _e = v(_e) : (
        // force empty params
        { path: _e }
      ), _e.params = {}), {}.NODE_ENV !== "production" && !("path" in _e) && !("name" in _e))
        throw rt(`Invalid redirect found:
${JSON.stringify(_e, null, 2)}
 when navigating to "${B.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return yt({
        query: B.query,
        hash: B.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in _e ? {} : B.params
      }, _e);
    }
  }
  function N(B, de) {
    const ue = c = g(B), _e = l.value, Ye = B.state, ct = B.force, x = B.replace === !0, O = C(ue);
    if (O)
      return N(
        yt(v(O), {
          state: typeof O == "object" ? yt({}, Ye, O.state) : Ye,
          force: ct,
          replace: x
        }),
        // keep original redirectedFrom if it exists
        de || ue
      );
    const U = ue;
    U.redirectedFrom = de;
    let Q;
    return !ct && kp(s, _e, ue) && (Q = jr(16, { to: U, from: _e }), et(
      _e,
      _e,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Q ? Promise.resolve(Q) : F(U, _e)).catch((J) => ks(J) ? (
      // navigation redirects still mark the router as ready
      ks(
        J,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? J : pt(J)
    ) : (
      // reject any unknown error
      re(J, U, _e)
    )).then((J) => {
      if (J) {
        if (ks(
          J,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return {}.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          kp(s, g(J.to), U) && // and we have done it a couple of times
          de && // @ts-expect-error: added only in dev
          (de._count = de._count ? (
            // @ts-expect-error
            de._count + 1
          ) : 1) > 30 ? (rt(`Detected a possibly infinite redirection in a navigation guard when going from "${_e.fullPath}" to "${U.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : N(
            // keep options
            yt({
              // preserve an existing replacement but allow the redirect to override it
              replace: x
            }, v(J.to), {
              state: typeof J.to == "object" ? yt({}, Ye, J.to.state) : Ye,
              force: ct
            }),
            // preserve the original redirectedFrom if any
            de || U
          );
      } else
        J = P(U, _e, !0, x, Ye);
      return H(U, _e, J), J;
    });
  }
  function A(B, de) {
    const ue = S(B, de);
    return ue ? Promise.reject(ue) : Promise.resolve();
  }
  function D(B) {
    const de = St.values().next().value;
    return de && typeof de.runWithContext == "function" ? de.runWithContext(B) : B();
  }
  function F(B, de) {
    let ue;
    const [_e, Ye, ct] = Ok(B, de);
    ue = Nu(_e.reverse(), "beforeRouteLeave", B, de);
    for (const O of _e)
      O.leaveGuards.forEach((U) => {
        ue.push(uo(U, B, de));
      });
    const x = A.bind(null, B, de);
    return ue.push(x), lt(ue).then(() => {
      ue = [];
      for (const O of a.list())
        ue.push(uo(O, B, de));
      return ue.push(x), lt(ue);
    }).then(() => {
      ue = Nu(Ye, "beforeRouteUpdate", B, de);
      for (const O of Ye)
        O.updateGuards.forEach((U) => {
          ue.push(uo(U, B, de));
        });
      return ue.push(x), lt(ue);
    }).then(() => {
      ue = [];
      for (const O of ct)
        if (O.beforeEnter)
          if (Fn(O.beforeEnter))
            for (const U of O.beforeEnter)
              ue.push(uo(U, B, de));
          else
            ue.push(uo(O.beforeEnter, B, de));
      return ue.push(x), lt(ue);
    }).then(() => (B.matched.forEach((O) => O.enterCallbacks = {}), ue = Nu(ct, "beforeRouteEnter", B, de), ue.push(x), lt(ue))).then(() => {
      ue = [];
      for (const O of r.list())
        ue.push(uo(O, B, de));
      return ue.push(x), lt(ue);
    }).catch((O) => ks(
      O,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? O : Promise.reject(O));
  }
  function H(B, de, ue) {
    i.list().forEach((_e) => D(() => _e(B, de, ue)));
  }
  function P(B, de, ue, _e, Ye) {
    const ct = S(B, de);
    if (ct)
      return ct;
    const x = de === ao, O = Is ? history.state : {};
    ue && (_e || x ? o.replace(B.fullPath, yt({
      scroll: x && O && O.scroll
    }, Ye)) : o.push(B.fullPath, Ye)), l.value = B, et(B, de, ue, x), pt();
  }
  let I;
  function V() {
    I || (I = o.listen((B, de, ue) => {
      if (!Ot.listening)
        return;
      const _e = g(B), Ye = C(_e);
      if (Ye) {
        N(yt(Ye, { replace: !0 }), _e).catch(ja);
        return;
      }
      c = _e;
      const ct = l.value;
      Is && EO(Np(ct.fullPath, ue.delta), Xc()), F(_e, ct).catch((x) => ks(
        x,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? x : ks(
        x,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (N(
        x.to,
        _e
        // avoid an uncaught rejection, let push call triggerError
      ).then((O) => {
        ks(
          O,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !ue.delta && ue.type === hi.pop && o.go(-1, !1);
      }).catch(ja), Promise.reject()) : (ue.delta && o.go(-ue.delta, !1), re(x, _e, ct))).then((x) => {
        x = x || P(
          // after navigation, all matched components are resolved
          _e,
          ct,
          !1
        ), x && (ue.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !ks(
          x,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? o.go(-ue.delta, !1) : ue.type === hi.pop && ks(
          x,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && o.go(-1, !1)), H(_e, ct, x);
      }).catch(ja);
    }));
  }
  let q = fa(), Y = fa(), z;
  function re(B, de, ue) {
    pt(B);
    const _e = Y.list();
    return _e.length ? _e.forEach((Ye) => Ye(B, de, ue)) : ({}.NODE_ENV !== "production" && rt("uncaught error during route navigation:"), console.error(B)), Promise.reject(B);
  }
  function Be() {
    return z && l.value !== ao ? Promise.resolve() : new Promise((B, de) => {
      q.add([B, de]);
    });
  }
  function pt(B) {
    return z || (z = !B, V(), q.list().forEach(([de, ue]) => B ? ue(B) : de()), q.reset()), B;
  }
  function et(B, de, ue, _e) {
    const { scrollBehavior: Ye } = e;
    if (!Is || !Ye)
      return Promise.resolve();
    const ct = !ue && SO(Np(B.fullPath, 0)) || (_e || !ue) && history.state && history.state.scroll || null;
    return yc().then(() => Ye(B, de, ct)).then((x) => x && wO(x)).catch((x) => re(x, B, de));
  }
  const tt = (B) => o.go(B);
  let mt;
  const St = /* @__PURE__ */ new Set(), Ot = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: m,
    hasRoute: y,
    getRoutes: _,
    resolve: g,
    options: e,
    push: w,
    replace: $,
    go: tt,
    back: () => tt(-1),
    forward: () => tt(1),
    beforeEach: a.add,
    beforeResolve: r.add,
    afterEach: i.add,
    onError: Y.add,
    isReady: Be,
    install(B) {
      const de = this;
      B.component("RouterLink", mi), B.component("RouterView", _k), B.config.globalProperties.$router = de, Object.defineProperty(B.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => G(l)
      }), Is && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !mt && l.value === ao && (mt = !0, w(o.location).catch((Ye) => {
        ({}).NODE_ENV !== "production" && rt("Unexpected error when starting the router:", Ye);
      }));
      const ue = {};
      for (const Ye in ao)
        Object.defineProperty(ue, Ye, {
          get: () => l.value[Ye],
          enumerable: !0
        });
      B.provide(Zc, de), B.provide(Og, sf(ue)), B.provide(Pd, l);
      const _e = B.unmount;
      St.add(B), B.unmount = function() {
        St.delete(B), St.size < 1 && (c = ao, I && I(), I = null, l.value = ao, mt = !1, z = !1), _e();
      }, {}.NODE_ENV !== "production" && Is && yk(B, de, t);
    }
  };
  function lt(B) {
    return B.reduce((de, ue) => de.then(() => D(ue)), Promise.resolve());
  }
  return Ot;
}
function Ok(e, t) {
  const n = [], s = [], o = [], a = Math.max(t.matched.length, e.matched.length);
  for (let r = 0; r < a; r++) {
    const i = t.matched[r];
    i && (e.matched.find((c) => Ao(c, i)) ? s.push(i) : n.push(i));
    const l = e.matched[r];
    l && (t.matched.find((c) => Ao(c, l)) || o.push(l));
  }
  return [n, s, o];
}
function dr() {
  return ln(Zc);
}
const kk = {}, Tk = { id: "post-master" };
function Nk(e, t, n, s, o, a) {
  const r = Te("router-view");
  return b(), E("div", Tk, [
    T(r)
  ]);
}
const Dk = /* @__PURE__ */ Se(kk, [["render", Nk]]);
const Ak = {}, Rk = { class: "wrapper" }, Ik = { class: "detail" };
function Pk(e, t, n, s, o, a) {
  const r = Te("router-view");
  return b(), E("div", Rk, [
    u("aside", null, [
      T(r, { name: "Aside" })
    ]),
    u("main", null, [
      u("div", Ik, [
        T(r)
      ])
    ])
  ]);
}
const Mk = /* @__PURE__ */ Se(Ak, [["render", Pk], ["__scopeId", "data-v-ab93f54b"]]), Lk = {
  created() {
  }
}, Vk = /* @__PURE__ */ u("p", null, [
  /* @__PURE__ */ u("em", null, "Parcel"),
  /* @__PURE__ */ ve(" is a system designed to securely store and manage messages that could contain sensitive data such as protected health information (PHI).")
], -1), Fk = /* @__PURE__ */ u("p", null, "All messages are encrypted to ensure the confidentiality and integrity of the data.", -1), Uk = /* @__PURE__ */ u("p", null, "Additionally, the system includes a functionality that automatically deletes messages once they reach their expiration date. This ensures that PHI is only accessible to authorized individuals for the necessary duration, and that it is subsequently removed to maintain compliance with relevant regulations.", -1), jk = /* @__PURE__ */ u("p", null, "Overall, our messaging system provides a secure and efficient way to manage PHI while maintaining compliance with relevant regulations.", -1), Hk = [
  Vk,
  Fk,
  Uk,
  jk
];
function Bk(e, t, n, s, o, a) {
  return b(), E("div", null, Hk);
}
const Yk = /* @__PURE__ */ Se(Lk, [["render", Bk]]);
const Wk = (e) => (Ze("data-v-924c197f"), e = e(), qe(), e), Gk = ["onClick"], zk = /* @__PURE__ */ Wk(() => /* @__PURE__ */ u("i", { class: "fa-regular fa-trash-can fa-fw" }, null, -1)), Kk = [
  zk
], Jk = ["onClick", "title"], Xk = {
  __name: "ParcelToolbar",
  props: {
    read: { type: Boolean, default: !1 },
    parcelId: { type: String, default: null }
  },
  setup(e) {
    const t = e, n = qr(), s = k(() => t.read ? "fa-envelope" : "fa-envelope-open");
    function o() {
      if (!confirm("Are you sure you want to delete this item?"))
        return;
      const i = t.parcelId;
      n.deleteParcel(i);
    }
    function a() {
      const r = t.parcelId, i = !t.read;
      n.markParcel(r, i);
    }
    return (r, i) => (b(), E("ul", null, [
      u("li", {
        onClick: kt(o, ["stop"]),
        title: "delete"
      }, Kk, 8, Gk),
      u("li", {
        onClick: kt(a, ["stop"]),
        title: `mark as ${e.read ? "unread" : "read"}`
      }, [
        u("i", {
          class: Ne(["fa-regular fa-empty-set fa-fw", s.value])
        }, null, 2)
      ], 8, Jk)
    ]));
  }
}, Qk = /* @__PURE__ */ Se(Xk, [["__scopeId", "data-v-924c197f"]]), Zk = {
  __name: "DateTime",
  props: {
    value: { type: String, default: null }
  },
  setup(e) {
    const t = e, n = k(() => {
      const s = ae(), o = new Date(t.value);
      return s.isSame(o, "day") ? ae(o).format("LT") : ae(o).format("L");
    });
    return (s, o) => (b(), E("span", null, [
      ve(j(n.value), 1),
      we(s.$slots, "default")
    ]));
  }
};
const qk = { class: "pl-2 mr-2" }, eT = ["value"], tT = { class: "flex-fill" }, nT = {
  class: "d-block",
  "data-from": ""
}, sT = { class: "d-flex" }, oT = {
  class: "d-block",
  "data-subject": ""
}, rT = ["title"], aT = {
  class: "d-block",
  "data-summary": ""
}, iT = {
  __name: "ParcelListItem",
  props: {
    parcel: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = qr(), { parcel: s } = $t(t), o = k(() => {
      var i, l;
      return ((i = n.active) == null ? void 0 : i.id) === ((l = s.value) == null ? void 0 : l.id);
    }), a = k(() => {
      var i;
      return ((i = s.value) == null ? void 0 : i.read) === !0;
    }), r = k({
      get() {
        return n.selected.indexOf(s.value.id) >= 0;
      },
      set(i) {
        const l = s.value.id, f = [...n.selected].indexOf(l);
        if (i === !0) {
          if (f >= 0)
            return;
          n.selected.push(l);
        } else {
          if (f < 0)
            return;
          n.selected.splice(f, 1);
        }
      }
    });
    return (i, l) => (b(), E("main", {
      class: Ne(["d-flex align-items-center p-2", { active: o.value, read: a.value }])
    }, [
      u("aside", qk, [
        L(u("input", {
          type: "checkbox",
          "onUpdate:modelValue": l[0] || (l[0] = (c) => r.value = c),
          value: G(s).id,
          onClick: l[1] || (l[1] = kt(() => {
          }, ["stop"]))
        }, null, 8, eT), [
          [Wt, r.value]
        ])
      ]),
      u("article", tT, [
        u("span", nT, j(G(s).from), 1),
        u("span", sT, [
          u("span", oT, j(G(s).subject), 1),
          u("span", {
            class: "d-block ml-auto text-muted text-right",
            "data-created-at": "",
            title: G(s).createdAt
          }, [
            T(Zk, {
              value: G(s).createdAt
            }, null, 8, ["value"])
          ], 8, rT)
        ]),
        u("span", aT, j(G(s).summary), 1),
        T(Qk, {
          "data-toolbar": "",
          read: G(s).read,
          "parcel-id": G(s).id
        }, null, 8, ["read", "parcel-id"])
      ])
    ], 2));
  }
}, lT = /* @__PURE__ */ Se(iT, [["__scopeId", "data-v-9ab61b43"]]);
const cT = {}, rh = (e) => (Ze("data-v-7ca89b75"), e = e(), qe(), e), uT = { "data-wrapper": "" }, dT = /* @__PURE__ */ rh(() => /* @__PURE__ */ u("span", { class: "title" }, "Folder is empty", -1)), fT = /* @__PURE__ */ rh(() => /* @__PURE__ */ u("i", { class: "icon fa-regular fa-folder-open" }, null, -1)), hT = /* @__PURE__ */ rh(() => /* @__PURE__ */ u("span", { class: "description" }, "Nothing to select.", -1)), pT = [
  dT,
  fT,
  hT
];
function mT(e, t) {
  return b(), E("div", uT, pT);
}
const _T = /* @__PURE__ */ Se(cT, [["render", mT], ["__scopeId", "data-v-7ca89b75"]]);
const Pg = (e) => (Ze("data-v-41d31260"), e = e(), qe(), e), vT = { class: "d-flex align-items-center" }, gT = /* @__PURE__ */ Pg(() => /* @__PURE__ */ u("strong", null, "Inbox", -1)), yT = { class: "action" }, bT = {
  key: 0,
  class: "fa-solid fa-spinner fa-spin fa-fw"
}, wT = {
  key: 0,
  class: "badge bg-danger"
}, ET = { class: "toolbar d-flex" }, ST = { class: "ml-1 d-flex align-items-center justify-content-center" }, xT = ["indeterminate"], $T = {
  for: "select-all-checkbox",
  class: "m-0"
}, CT = { class: "ml-auto" }, OT = ["onClick"], kT = /* @__PURE__ */ Pg(() => /* @__PURE__ */ u("i", { class: "fa-regular fa-trash-can fa-fw" }, null, -1)), TT = [
  kT
], NT = ["onClick", "title"], DT = { class: "parcels-wrapper" }, AT = {
  __name: "ParcelList",
  setup(e) {
    const t = dr(), n = qr(), s = k(() => {
      const _ = [...n.selected];
      for (const y of n.list)
        if (_.includes(y.id) && y.read === !0)
          return !0;
      return !1;
    }), o = k(() => n.loading), a = k(() => n.list), r = k(() => n.unread), i = k(() => s.value ? "fa-envelope" : "fa-envelope-open"), l = k(() => {
      const _ = [...n.selected];
      if (_.length === 0)
        return !1;
      const y = n.list.map((g) => g.id);
      return _.length != y.length;
    }), c = k({
      get() {
        const _ = [...n.selected];
        if (_.length === 0)
          return !1;
        const y = n.list.map((g) => g.id);
        return _.length === y.length;
      },
      set(_) {
        _ === !1 ? n.selected = [] : n.selected = n.list.map((y) => y.id);
      }
    }), f = k(() => [...n.selected].length <= 0);
    async function d() {
      n.fetchList();
    }
    function h(_) {
      n.toggle(_), n.active === null ? t.push("/inbox") : t.push(`/inbox/${_.id}`);
    }
    function p() {
      const _ = [...n.selected], y = _.length;
      if (!(y < 1 || confirm(
        `Are you sure wyou want to delete ${y} element${y === 1 ? "" : "s"}`
      ) === !1)) {
        console.log("onDeleteClickedAll clicked");
        for (const v of _)
          n.deleteParcel(v);
      }
    }
    function m() {
      const _ = [...n.selected], y = !s.value;
      for (const g of _)
        n.markParcel(g, y);
    }
    return (_, y) => (b(), E(ne, null, [
      u("header", null, [
        u("div", vT, [
          gT,
          u("span", yT, [
            o.value ? (b(), E("i", bT)) : (b(), E("i", {
              key: 1,
              onClick: d,
              class: "fas fa-sync-alt fa-fw"
            }))
          ]),
          r.value > 0 ? (b(), E("span", wT, j(r.value) + " unread", 1)) : me("", !0)
        ]),
        u("div", ET, [
          u("div", ST, [
            L(u("input", {
              class: "mr-2",
              type: "checkbox",
              indeterminate: l.value,
              "onUpdate:modelValue": y[0] || (y[0] = (g) => c.value = g),
              id: "select-all-checkbox"
            }, null, 8, xT), [
              [Wt, c.value]
            ]),
            u("label", $T, j(c.value ? "deselect" : "select") + " all", 1)
          ]),
          u("div", CT, [
            u("ul", {
              class: Ne(["actions", { disabled: f.value }])
            }, [
              u("li", null, [
                u("span", {
                  class: "action",
                  onClick: kt(p, ["stop"]),
                  title: "delete"
                }, TT, 8, OT)
              ]),
              u("li", null, [
                u("span", {
                  class: "action",
                  onClick: kt(m, ["stop"]),
                  title: `mark all as ${s.value ? "unread" : "read"}`
                }, [
                  u("i", {
                    class: Ne(["fa-regular fa-empty-set fa-fw", i.value])
                  }, null, 2)
                ], 8, NT)
              ])
            ], 2)
          ])
        ])
      ]),
      u("div", DT, [
        a.value.length === 0 ? (b(), Ce(_T, {
          key: 0,
          class: "my-5"
        })) : (b(!0), E(ne, { key: 1 }, Ae(a.value, (g) => (b(), Ce(lT, {
          key: g.id,
          "data-parcel-item": "",
          parcel: g,
          onClick: kt((v) => h(g), ["stop"])
        }, null, 8, ["parcel", "onClick"]))), 128))
      ])
    ], 64));
  }
}, Bp = /* @__PURE__ */ Se(AT, [["__scopeId", "data-v-41d31260"]]);
const Di = (e) => (Ze("data-v-e9345d5e"), e = e(), qe(), e), RT = {
  key: 0,
  class: "parcel-detail"
}, IT = { class: "border-bottom p-2" }, PT = { class: "d-flex" }, MT = { class: "d-block text-bold" }, LT = /* @__PURE__ */ Di(() => /* @__PURE__ */ u("span", { class: "detail-label" }, "From:", -1)), VT = { class: "d-block" }, FT = /* @__PURE__ */ Di(() => /* @__PURE__ */ u("span", { class: "detail-label" }, "To:", -1)), UT = { class: "ml-auto text-right" }, jT = { class: "time" }, HT = ["title"], BT = ["title"], YT = /* @__PURE__ */ Di(() => /* @__PURE__ */ u("i", { class: "far fa-clock fa-fw" }, null, -1)), WT = [
  YT
], GT = ["title"], zT = ["title"], KT = /* @__PURE__ */ Di(() => /* @__PURE__ */ u("i", { class: "far fa-hourglass fa-fw" }, null, -1)), JT = [
  KT
], XT = { class: "d-block" }, QT = /* @__PURE__ */ Di(() => /* @__PURE__ */ u("span", { class: "detail-label" }, "Subject:", -1)), ZT = { class: "p-2" }, qT = ["innerHTML"], eN = { key: 1 }, tN = {
  __name: "ParcelDetail",
  props: {
    id: {
      type: String,
      default: null
    }
  },
  setup(e) {
    const t = e, n = qr(), s = dr(), o = k(() => n.list.find((f) => f.id === t.id));
    tn(() => {
      o.value && (n.active = o.value);
    });
    const a = k(() => n.active), r = k(() => "created at"), i = k(() => "expiration: date when the message will be automatically deleted"), l = k(() => {
      var h;
      const c = (h = o.value) == null ? void 0 : h.createdAt;
      if (!c)
        return "no date available";
      const f = ae(c).format("LT");
      return `${ae(c).format("L")}, ${f}`;
    });
    return Xt(
      o,
      (c) => {
        !c || c.read === !0 || n.markParcel(c.id, !0);
      },
      {
        immediate: !0
      }
    ), Xt(
      a,
      (c) => {
        c === null && s.push("/inbox");
      },
      {
        immediate: !1
      }
    ), (c, f) => o.value ? (b(), E("article", RT, [
      u("header", IT, [
        u("div", PT, [
          u("div", null, [
            u("span", MT, [
              LT,
              ve(j(o.value.from), 1)
            ]),
            u("span", VT, [
              FT,
              ve(j(o.value.to), 1)
            ])
          ]),
          u("div", UT, [
            u("div", jT, [
              u("small", {
                title: o.value.createdAt,
                class: "text-muted"
              }, "created " + j(l.value), 9, HT),
              u("small", {
                title: r.value,
                class: "text-muted"
              }, WT, 8, BT),
              u("small", {
                title: o.value.expiration,
                class: "text-muted"
              }, "expires " + j(o.value.readableExpiration), 9, GT),
              u("small", {
                title: i.value,
                class: "text-muted"
              }, JT, 8, zT)
            ])
          ])
        ]),
        u("span", XT, [
          QT,
          ve(j(o.value.subject), 1)
        ])
      ]),
      u("main", ZT, [
        u("span", {
          class: "d-block",
          innerHTML: o.value.body
        }, null, 8, qT)
      ])
    ])) : (b(), E("span", eN, "Parcel ID " + j(e.id) + " was not found", 1));
  }
}, nN = /* @__PURE__ */ Se(tN, [["__scopeId", "data-v-e9345d5e"]]);
const sN = {}, ah = (e) => (Ze("data-v-993fee03"), e = e(), qe(), e), oN = {
  "data-wrapper": "",
  class: "position-absolute top-50 start-50 translate-middle"
}, rN = /* @__PURE__ */ ah(() => /* @__PURE__ */ u("span", { class: "title" }, "No Conversation Selected", -1)), aN = /* @__PURE__ */ ah(() => /* @__PURE__ */ u("i", { class: "icon fas fa-inbox" }, null, -1)), iN = /* @__PURE__ */ ah(() => /* @__PURE__ */ u("span", { class: "description" }, "Select a conversation to read.", -1)), lN = [
  rN,
  aN,
  iN
];
function cN(e, t) {
  return b(), E("div", oN, lN);
}
const uN = /* @__PURE__ */ Se(sN, [["render", cN], ["__scopeId", "data-v-993fee03"]]), dN = [
  {
    path: "/",
    name: "home",
    component: Dk,
    redirect: "/inbox",
    children: [
      {
        path: "inbox",
        component: Mk,
        children: [
          {
            path: "",
            name: "inbox",
            components: {
              Aside: Bp,
              default: uN
            }
          },
          {
            path: ":id",
            name: "inbox-detail",
            components: {
              Aside: Bp,
              default: nN
            },
            props: { default: !0, Aside: !1 }
          }
        ]
      },
      { path: "/about", component: Yk }
    ]
  }
];
let Vd;
const fN = () => (Vd = qc({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: Qc(),
  routes: dN
}), Vd);
var hN = Object.defineProperty, pN = (e, t, n) => t in e ? hN(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ss = (e, t, n) => (pN(e, typeof t != "symbol" ? t + "" : t, n), n);
const mN = { class: "toast-header" }, _N = ["textContent"], vN = ["textContent"], gN = { class: "toast-body" }, yN = ["textContent"], bN = /* @__PURE__ */ un({
  __name: "Toast",
  props: {
    visible: { type: Boolean, default: !1 },
    title: { default: "" },
    subtitle: { default: "" },
    body: { default: "" },
    animation: { type: Boolean, default: !0 },
    autohide: { type: Boolean, default: !0 },
    delay: { default: 15e3 },
    variant: {}
  },
  emits: ["hide", "hidden", "show", "shown"],
  setup(e, { expose: t, emit: n }) {
    const s = e, { visible: o, animation: a, autohide: r, delay: i } = $t(s), l = te(), c = te();
    Xt(o, (C) => {
      y();
    }, { immediate: !0 });
    function f() {
      l.value.show();
    }
    function d() {
      l.value.hide();
    }
    function h() {
      l.value.dispose();
    }
    function p() {
      l.value.isShown();
    }
    function m() {
      l.value.getOrCreateInstance();
    }
    function _() {
      l.value.getInstance();
    }
    function y() {
      l.value && (o.value === !0 ? f() : d());
    }
    function g() {
      n("hide", l.value);
    }
    function v() {
      n("hidden", l.value);
    }
    function S() {
      n("show", l.value);
    }
    async function w() {
      n("shown", l.value);
    }
    const $ = { show: f, hide: d, dispose: h, isShown: p, getOrCreateInstance: m, getInstance: _ };
    return t({ ...$ }), dn(() => {
      c.value.addEventListener("hide.bs.toast", g), c.value.addEventListener("hidden.bs.toast", v), c.value.addEventListener("show.bs.toast", S), c.value.addEventListener("shown.bs.toast", w), l.value = new bootstrap.Toast(c.value, {
        animation: a.value,
        autohide: r.value,
        delay: i.value
      }), y();
    }), (C, N) => (b(), E("div", {
      ref_key: "toastRef",
      ref: c,
      class: Ne(["toast", [C.variant ? `text-bg-${C.variant}` : ""]]),
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true"
    }, [
      we(C.$slots, "header", yn(rn({ ...$ })), () => [
        u("div", mN, [
          we(C.$slots, "title", yn(rn({ ...$ })), () => [
            u("strong", {
              class: "me-auto",
              textContent: j(C.title)
            }, null, 8, _N)
          ], !0),
          we(C.$slots, "subtitle", yn(rn({ ...$ })), () => [
            u("small", {
              textContent: j(C.subtitle)
            }, null, 8, vN)
          ], !0),
          u("button", {
            type: "button",
            class: "btn-close",
            "aria-label": "Close",
            onClick: d
          })
        ])
      ], !0),
      we(C.$slots, "body", yn(rn({ ...$ })), () => [
        u("div", gN, [
          we(C.$slots, "default", yn(rn({ ...$ })), () => [
            u("span", {
              textContent: j(C.body)
            }, null, 8, yN)
          ], !0)
        ])
      ], !0)
    ], 2));
  }
}), Po = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Mg = /* @__PURE__ */ Po(bN, [["__scopeId", "data-v-c0cdbae8"]]);
function wN() {
  let e = (/* @__PURE__ */ new Date()).getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const n = (e + Math.random() * 16) % 16 | 0;
    return e = Math.floor(e / 16), (t == "x" ? n : n & 3 | 8).toString(16);
  });
}
const EN = { id: "toast-wrapper" };
let Yp;
const SN = /* @__PURE__ */ un({
  __name: "Toaster",
  setup(e, { expose: t }) {
    const n = {
      visible: !0,
      title: "",
      subtitle: "",
      body: "",
      animation: !0,
      autohide: !0,
      delay: 5e3,
      variant: void 0
    }, s = te(/* @__PURE__ */ new Map());
    Yp = (a, r = "top right") => {
      const i = wN(), l = { ...n, ...a, id: i };
      let c = s.value.get(r);
      c instanceof Set || (c = /* @__PURE__ */ new Set()), c.add(l), s.value.set(r, c);
    };
    function o(a, r) {
      const i = s.value.get(a);
      i == null || i.delete(r);
    }
    return t({ toast: Yp }), (a, r) => (b(), Ce(Ei, { to: "body" }, [
      u("div", EN, [
        (b(!0), E(ne, null, Ae(s.value, ([i, l]) => (b(), E("div", {
          key: i,
          class: Ne(["toast-group", `${i}`])
        }, [
          (b(!0), E(ne, null, Ae(l, (c, f) => (b(), Ce(Mg, Dn({
            key: c.id
          }, c, {
            onHidden: (d) => o(i, c)
          }), null, 16, ["onHidden"]))), 128))
        ], 2))), 128))
      ])
    ]));
  }
}), xN = /* @__PURE__ */ Po(SN, [["__scopeId", "data-v-786d1c50"]]);
var Ro = /* @__PURE__ */ ((e) => (e.SMALL = "sm", e.STANDARD = "", e.LARGE = "lg", e.EXTRA_LARGE = "xl", e))(Ro || {});
const Zl = (e, t = "") => {
  let n = e.toLowerCase();
  return !Object.values(Ro).includes(n) || n == "" ? "" : `${t}${n}`;
}, $N = ["onClick"], CN = { class: "modal-content" }, ON = { class: "modal-header" }, kN = ["innerHTML"], TN = { class: "modal-body" }, NN = ["innerHTML"], DN = { class: "modal-footer" }, AN = ["innerHTML"], RN = ["innerHTML"];
class xa {
  static addToStack(t) {
    t != null && this.modalStack.push(t);
  }
  static removeFromStack(t) {
    if (t == null)
      return;
    const n = this.modalStack.indexOf(t);
    n < 0 || this.modalStack.splice(n, 1);
  }
  static getLast() {
    const t = this.modalStack.length;
    if (t !== 0)
      return this.modalStack[t - 1];
  }
}
ss(xa, "modalStack", new Array());
const Lg = /* @__PURE__ */ un({
  __name: "Modal",
  props: {
    title: { default: "" },
    body: { default: "" },
    textCancel: { default: "Cancel" },
    textOk: { type: [String, Boolean], default: "Ok" },
    backdrop: { type: [Boolean, String], default: !0 },
    keyboard: { type: Boolean, default: !0 },
    focus: { type: Boolean, default: !0 },
    disableOutsideClick: { type: Boolean, default: !1 },
    okOnly: { type: Boolean, default: !1 },
    size: { default: Ro.STANDARD },
    btnSize: { default: Ro.SMALL },
    visible: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, {
      backdrop: s,
      keyboard: o,
      focus: a,
      disableOutsideClick: r,
      size: i,
      btnSize: l
    } = $t(n), c = k(() => Zl(i.value, "modal-")), f = k(() => Zl(l.value, "btn-")), d = te();
    let h;
    An();
    let p;
    function m() {
      return new Promise((C, N) => {
        const A = xa.getLast();
        A && A.hide(), xa.addToStack(h), h == null || h.show(), p = C;
      });
    }
    function _(C = !0) {
      xa.removeFromStack(h), h == null || h.hide();
      const N = xa.getLast();
      N && N.show(), typeof p == "function" && p(C);
    }
    function y() {
      h == null || h.toggle();
    }
    dn(() => {
      h = new bootstrap.Modal(d.value, {
        backdrop: s == null ? void 0 : s.value,
        keyboard: o.value,
        focus: a.value
      }), tn(() => {
        (n == null ? void 0 : n.visible) === !0 ? h == null || h.show() : h == null || h.hide();
      });
    });
    function g(C) {
      (s == null ? void 0 : s.value) !== "static" && _(!1);
    }
    function v() {
      _(!1);
    }
    function S() {
      _(!1);
    }
    function w() {
      _(!0);
    }
    t({
      modal: h,
      show: m,
      hide: _,
      toggle: y,
      onHeaderCloseClicked: v,
      onCancelClicked: S,
      onOkCLicked: w
    });
    const $ = { show: m, hide: _, toggle: y, modal: h };
    return (C, N) => (b(), E("div", Dn({
      ref_key: "modalElement",
      ref: d,
      class: "modal fade",
      tabindex: "-1"
    }, { ...C.$attrs }, {
      onClick: kt(g, ["self"])
    }), [
      u("div", {
        class: Ne(["modal-dialog", c.value])
      }, [
        u("div", CN, [
          u("div", ON, [
            we(C.$slots, "header", yn(rn({ ...$ })), () => [
              u("h5", {
                class: "modal-title",
                innerHTML: C.title
              }, null, 8, kN)
            ]),
            u("button", {
              type: "button",
              class: "btn-close",
              "aria-label": "Close",
              onClick: v
            })
          ]),
          u("div", TN, [
            we(C.$slots, "default", yn(rn({ ...$ })), () => [
              u("span", { innerHTML: C.body }, null, 8, NN)
            ])
          ]),
          u("div", DN, [
            we(C.$slots, "footer", yn(rn({ ...$ })), () => [
              C.okOnly ? me("", !0) : (b(), E("button", {
                key: 0,
                type: "button",
                class: Ne(["btn btn-secondary", f.value]),
                onClick: S
              }, [
                we(C.$slots, "button-cancel", yn(rn({ ...$ })), () => [
                  u("span", { innerHTML: C.textCancel }, null, 8, AN)
                ])
              ], 2)),
              u("button", {
                type: "button",
                class: Ne(["btn btn-primary", f.value]),
                onClick: w
              }, [
                we(C.$slots, "button-ok", yn(rn({ ...$ })), () => [
                  u("span", { innerHTML: C.textOk }, null, 8, RN)
                ])
              ], 2)
            ])
          ])
        ])
      ], 2)
    ], 16, $N));
  }
}), IN = /* @__PURE__ */ un({
  __name: "ModalManager",
  setup(e, { expose: t }) {
    const n = te(void 0), s = te({});
    function o(r = {}) {
      var i;
      return r.okOnly = !1, s.value = r, (i = n.value) == null ? void 0 : i.show();
    }
    function a(r = {}) {
      var i;
      return r.okOnly = !0, s.value = r, (i = n.value) == null ? void 0 : i.show();
    }
    return t({ confirm: o, alert: a }), (r, i) => (b(), Ce(Ei, { to: "body" }, [
      T(Lg, Dn({
        ref_key: "modalRef",
        ref: n
      }, { ...s.value }), null, 16)
    ]));
  }
}), PN = { "data-first": "" }, MN = ["disabled", "innerHTML"], LN = { "data-prev": "" }, VN = ["disabled", "innerHTML"], FN = { key: 0 }, UN = ["innerHTML"], jN = ["onClick"], HN = { "data-next": "" }, BN = ["disabled", "innerHTML"], YN = { "data-last": "" }, WN = ["disabled", "innerHTML"], GN = /* @__PURE__ */ un({
  __name: "Pagination",
  props: {
    modelValue: { default: 1 },
    perPage: { default: 5 },
    maxVisibleButtons: { default: 5 },
    totalItems: { default: 0 },
    hideEllipsis: { type: Boolean, default: !1 },
    hideGotoEndButtons: { type: Boolean, default: !1 },
    firstText: { default: "«" },
    prevText: { default: "‹" },
    nextText: { default: "›" },
    lastText: { default: "»" },
    ellipsisText: { default: "…" },
    size: { default: Ro.STANDARD }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e;
    function s(v, S = 0) {
      return [...Array(v).keys()].map((w) => w + S);
    }
    const { modelValue: o, maxVisibleButtons: a, hideEllipsis: r } = $t(n), i = Math.floor(a.value / 2), l = k(() => {
      let v = a.value, S = o.value <= i ? 1 : o.value - i;
      return o.value >= d.value - i && (S = d.value - v + 1), S < 1 && (S = 1), d.value < v && (v = d.value), s(v, S);
    }), c = k(() => o.value <= 1), f = k(() => o.value >= d.value), d = k(() => {
      const { perPage: v, totalItems: S } = n;
      return Math.ceil(S / v);
    });
    tn(() => {
      d.value > 0 && o.value > d.value && t("update:modelValue", d.value);
    });
    function h(v) {
      const S = a.value - 1;
      return !(r.value === !0 || v === 0 && o.value - i - 1 <= 0 || v === S && o.value + i >= d.value || v > 0 && v < S);
    }
    function p(v) {
      v < 1 && (v = 1), v > d.value && (v = d.value), t("update:modelValue", v);
    }
    function m() {
      t("update:modelValue", 1);
    }
    function _() {
      t("update:modelValue", d.value);
    }
    function y() {
      let v = o.value - 1;
      v < 1 && (v = 1), t("update:modelValue", v);
    }
    function g() {
      let v = o.value + 1;
      v > d.value && (v = d.value), t("update:modelValue", v);
    }
    return (v, S) => (b(), E("ul", {
      class: Ne(["pagination", v.size])
    }, [
      u("li", PN, [
        u("button", {
          class: "",
          disabled: c.value,
          innerHTML: v.firstText,
          onClick: m
        }, null, 8, MN)
      ]),
      u("li", LN, [
        u("button", {
          class: "",
          disabled: c.value,
          innerHTML: v.prevText,
          onClick: y
        }, null, 8, VN)
      ]),
      (b(!0), E(ne, null, Ae(l.value, (w, $) => (b(), E(ne, null, [
        h($) ? (b(), E("li", FN, [
          u("button", {
            disabled: "",
            class: "",
            innerHTML: v.ellipsisText
          }, null, 8, UN)
        ])) : (b(), E("li", {
          key: 1,
          "data-prev": "",
          class: Ne({ active: v.modelValue === w })
        }, [
          u("button", {
            class: "",
            onClick: (C) => p(w)
          }, j(w), 9, jN)
        ], 2))
      ], 64))), 256)),
      u("li", HN, [
        u("button", {
          class: "",
          disabled: f.value,
          innerHTML: v.nextText,
          onClick: g
        }, null, 8, BN)
      ]),
      u("li", YN, [
        u("button", {
          class: "",
          disabled: f.value,
          innerHTML: v.lastText,
          onClick: _
        }, null, 8, WN)
      ])
    ], 2));
  }
}), zN = /* @__PURE__ */ Po(GN, [["__scopeId", "data-v-2bfd7085"]]), KN = { class: "d-inline" }, JN = /* @__PURE__ */ u("span", null, "Per page: ", -1), XN = { class: "fw-bold" }, QN = /* @__PURE__ */ un({
  __name: "PageSizeDropdown",
  props: {
    options: { default: () => [25, 50, 100] },
    modelValue: { default: 50 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, { options: s } = $t(n), o = k({
      get: () => n.modelValue,
      set: (a) => t("update:modelValue", a)
    });
    return (a, r) => {
      const i = Te("b-dropdown-item"), l = Te("b-dropdown");
      return b(), Ce(l, Dn({
        variant: "outline-primary",
        size: "sm"
      }, { ...a.$attrs }), {
        button: K(() => [
          u("div", KN, [
            we(a.$slots, "default", { selected: o.value }, () => [
              JN,
              u("span", XN, j(o.value), 1)
            ])
          ])
        ]),
        default: K(() => [
          (b(!0), E(ne, null, Ae(G(s), (c, f) => (b(), Ce(i, {
            key: c,
            onClick: (d) => o.value = c,
            active: c === a.modelValue
          }, {
            default: K(() => [
              ve(j(c), 1)
            ]),
            _: 2
          }, 1032, ["onClick", "active"]))), 128))
        ]),
        _: 3
      }, 16);
    };
  }
}), ZN = ["value"], qN = /* @__PURE__ */ un({
  __name: "PageSizeSelect",
  props: {
    options: { default: () => [25, 50, 100] },
    modelValue: { default: 50 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, { options: s } = $t(n), o = k({
      get: () => n.modelValue,
      set: (a) => t("update:modelValue", a)
    });
    return (a, r) => L((b(), E("select", {
      "onUpdate:modelValue": r[0] || (r[0] = (i) => o.value = i)
    }, [
      (b(!0), E(ne, null, Ae(G(s), (i, l) => (b(), E("option", {
        key: i,
        value: i
      }, j(i), 9, ZN))), 128))
    ], 512)), [
      [vn, o.value]
    ]);
  }
});
var Bo = /* @__PURE__ */ ((e) => (e.ASC = "ASC", e.DESC = "DESC", e.IGNORE = "IGNORE", e))(Bo || {});
class eD {
  constructor(t, n = "ASC", s) {
    ss(this, "key"), ss(this, "direction"), ss(this, "sortFn"), this.key = t, this.direction = n, this.sortFn = s;
  }
}
const Wp = (e, t) => {
  const n = (i, l) => {
    let c = typeof i, f = typeof l;
    return c == "number" && c == f;
  }, s = (i, l) => i - l, o = (i, l) => (i = i ?? "", l = l ?? "", i.localeCompare(l)), a = (i, l) => n(i, l) ? s : o, r = [...t];
  return r.sort((i, l) => {
    let c = 0;
    for (let f of e) {
      let { key: d, direction: h, sortFn: p } = f, m = h === "ASC" ? 1 : -1, _ = i[d], y = l[d];
      if (p = typeof p == "function" ? p : a(_, y), c = p(_, y, i, l, t, f, m) * m, c !== 0)
        return c;
    }
    return c;
  }), r;
}, tD = ["onClick"], nD = { class: "th-wrapper" }, sD = {
  key: 0,
  "data-sort-indicator": ""
}, oD = { class: "sort-index" }, rD = { class: "sort-direction" }, aD = ["onMouseover"], iD = {
  key: 0,
  class: "p-5 text-muted font-italic"
}, lD = ["colspan"], cD = ["innerHTML"];
class Du {
  constructor(t = "", n = "", s = !1, o) {
    ss(this, "key"), ss(this, "label"), ss(this, "sortable"), ss(this, "sortFn"), this.key = t, this.label = n, this.sortable = s, this.sortFn = o;
  }
}
const uD = /* @__PURE__ */ un({
  __name: "Table",
  props: {
    fields: { default: () => [] },
    items: { default: () => [] },
    striped: { type: Boolean, default: !1 },
    hover: { type: Boolean, default: !0 },
    externalSort: { type: Boolean, default: !1 },
    showEmpty: { type: Boolean, default: !1 },
    emptyText: { default: "nothing to display" }
  },
  emits: ["sort", "onMouseOverCell"],
  setup(e, { emit: t }) {
    const n = e, s = (m) => {
      let _ = [];
      for (const y of m)
        _ = _.concat(Object.keys(y));
      return _ = _.filter((y, g) => _.indexOf(y) == g), _;
    }, o = te([]), { fields: a, items: r } = $t(n), i = k(() => {
      if (n.externalSort || o.value.length == 0)
        return n.items;
      const m = [...n.items];
      return Wp(o.value, m);
    }), l = k(() => {
      let m = a.value, _ = [];
      return m.length === 0 && (m = s([...r.value])), m.reduce((y, g, v) => {
        if (typeof g == "string")
          y.push(new Du(g, g));
        else if (g instanceof Du)
          y.push(g);
        else if (typeof g == "object") {
          const { key: S, label: w, sortable: $, sortFn: C } = g;
          y.push(new Du(S, w, $, C));
        }
        return y;
      }, _);
    });
    function c(m) {
      const _ = o.value.findIndex((y) => y.key === m.key);
      return _ < 0 ? "" : _ + 1;
    }
    function f(m) {
      const _ = o.value.findIndex((g) => g.key === m.key);
      if (_ < 0)
        return "fas fa-sort";
      const y = o.value[_];
      return y.direction === Bo.ASC ? "fas fa-sort-up" : y.direction === Bo.DESC ? "fas fa-sort-down" : "far fa-exclamation-triangle";
    }
    function d(m) {
      const { key: _ } = m, y = o.value.findIndex((g) => g.key === _);
      if (y < 0) {
        const g = new eD(_, Bo.ASC, m.sortFn);
        o.value.push(g);
      } else {
        const g = o.value[y], v = g.direction;
        v === Bo.ASC ? g.direction = Bo.DESC : v === Bo.DESC && o.value.splice(y, 1);
      }
      t("sort", o.value, Wp);
    }
    function h(m, _, y, g) {
      t("onMouseOverCell", m, _, y, g);
    }
    let p = te(null);
    return dn(() => {
      p.value = An();
    }), (m, _) => (b(), E("table", Dn({ ...m.$attrs }, {
      class: { striped: m.striped, hover: m.hover }
    }), [
      u("thead", null, [
        (b(!0), E(ne, null, Ae(l.value, (y) => (b(), E("th", {
          key: `thead-${y.key}`,
          class: Ne({ sortable: y.sortable }),
          onClick: (g) => y.sortable && d(y)
        }, [
          u("span", nD, [
            we(m.$slots, `head(${y.key})`, {
              field: y,
              data: G(p),
              value: y.label
            }, () => [
              ve(j(y.label), 1)
            ], !0),
            y.sortable ? (b(), E("span", sD, [
              u("span", oD, j(c(y)), 1),
              u("span", rD, [
                u("i", {
                  class: Ne(f(y))
                }, null, 2)
              ])
            ])) : me("", !0)
          ])
        ], 10, tD))), 128))
      ]),
      u("tbody", null, [
        (b(!0), E(ne, null, Ae(i.value, (y, g) => (b(), E(ne, {
          key: `trow-${(y == null ? void 0 : y.id) ?? g}`
        }, [
          we(m.$slots, "row", {
            item: y,
            index: g,
            colspan: l.value.length
          }, void 0, !0),
          u("tr", null, [
            (b(!0), E(ne, null, Ae(l.value, (v) => (b(), E("td", {
              key: `tcell-${v.key + ((y == null ? void 0 : y.id) ?? g)}`,
              class: Ne({ [`tcell-${v == null ? void 0 : v.key}`]: !0 }),
              onMouseover: (S) => h(S, y, g, v)
            }, [
              we(m.$slots, `cell(${v == null ? void 0 : v.key})`, {
                data: G(p),
                item: y,
                field: v,
                value: y[v == null ? void 0 : v.key]
              }, () => [
                ve(j(y[v == null ? void 0 : v.key]), 1)
              ], !0)
            ], 42, aD))), 128))
          ])
        ], 64))), 128))
      ]),
      u("tfoot", null, [
        we(m.$slots, "footer", { data: G(p) }, void 0, !0)
      ]),
      m.showEmpty && i.value.length === 0 ? (b(), E("tr", iD, [
        u("td", {
          colspan: l.value.length
        }, [
          we(m.$slots, "empty", {
            items: i.value,
            data: G(p),
            fields: l.value
          }, () => [
            u("span", { innerHTML: m.emptyText }, null, 8, cD)
          ], !0)
        ], 8, lD)
      ])) : me("", !0)
    ], 16));
  }
}), dD = /* @__PURE__ */ Po(uD, [["__scopeId", "data-v-b1e9b5de"]]);
var Vg = /* @__PURE__ */ ((e) => (e.PRIMARY = "primary", e.SECONDARY = "secondary", e.WARNING = "warning", e.DANGER = "danger", e.INFO = "info", e))(Vg || {});
const fD = { class: "d-inline-block position-relative" }, hD = ["disabled"], Gp = "data-prevent-close", pD = /* @__PURE__ */ un({
  __name: "Dropdown",
  props: {
    text: { default: "" },
    variant: { default: Vg.PRIMARY },
    right: { type: Boolean, default: !1 },
    top: { type: Boolean, default: !1 },
    centered: { type: Boolean },
    dropup: { type: Boolean },
    dropend: { type: Boolean },
    dropstart: { type: Boolean },
    menuEnd: { type: Boolean, default: !1 },
    size: { default: Ro.STANDARD },
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(), s = te(), { variant: o, centered: a, dropup: r, dropend: i, dropstart: l, menuEnd: c } = $t(t), f = te(!1), d = k(() => {
      const w = [];
      return o != null && o.value && w.push(`btn-${o.value}`), t.size && w.push(`btn-${t.size}`), w;
    }), h = k(() => {
      const w = [];
      return a != null && a.value && w.push("dropdown-center"), r != null && r.value && w.push("dropup"), l != null && l.value && w.push("dropstart"), !(l != null && l.value) && i != null && i.value && w.push("dropend"), w.length === 0 ? w.push("dropdown") : w.unshift("btn-group"), w;
    }), p = k(() => {
      const w = [];
      return f.value && w.push("show"), c.value && w.push("dropdown-menu-end"), w;
    });
    function m() {
      f.value = !0;
    }
    function _() {
      f.value = !1;
    }
    function y(w) {
      f.value ? _() : m();
    }
    function g(w) {
      const { target: $ } = w;
      $ != null && $.closest(`[${Gp}],[${Gp}=true]`) || _();
    }
    function v() {
      f.value && _();
    }
    const S = {
      show: f,
      disabled: t.disabled,
      buttonClasses: d,
      onButtonClicked: y,
      onMenuClicked: g,
      onClickOutside: v,
      open: m,
      close: _
    };
    return (w, $) => {
      const C = Jr("click-outside");
      return b(), E("div", {
        ref_key: "dropDownRef",
        ref: s,
        class: Ne(h.value)
      }, [
        L((b(), E("div", fD, [
          we(w.$slots, "header", yn(rn({ ...S })), () => [
            u("button", {
              class: Ne(["btn dropdown-toggle", d.value]),
              type: "button",
              "aria-expanded": "false",
              onClick: y,
              disabled: w.disabled
            }, [
              we(w.$slots, "button", yn(rn({ ...S })), () => [
                ve(j(w.text), 1)
              ], !0)
            ], 10, hD)
          ], !0),
          u("ul", {
            ref_key: "dropDownMenuRef",
            ref: n,
            class: Ne(["dropdown-menu", p.value]),
            onClick: g
          }, [
            we(w.$slots, "default", yn(rn({ ...S })), void 0, !0)
          ], 2)
        ])), [
          [C, v]
        ])
      ], 2);
    };
  }
}), mD = /* @__PURE__ */ Po(pD, [["__scopeId", "data-v-f9658383"]]), _D = ["data-prevent-close"], vD = /* @__PURE__ */ un({
  __name: "DropdownItem",
  props: {
    active: { type: Boolean },
    preventClose: { type: Boolean }
  },
  setup(e) {
    const t = e, { preventClose: n } = $t(t);
    return (s, o) => (b(), E("li", {
      "data-prevent-close": G(n) ? "" : null
    }, [
      u("span", {
        class: Ne(["dropdown-item", { active: s.active }]),
        role: "button",
        tabindex: "0"
      }, [
        we(s.$slots, "default")
      ], 2)
    ], 8, _D));
  }
}), gD = {}, yD = { "data-prevent-close": "" }, bD = { class: "dropdown-header" };
function wD(e, t) {
  return b(), E("li", yD, [
    u("h6", bD, [
      we(e.$slots, "default")
    ])
  ]);
}
const ED = /* @__PURE__ */ Po(gD, [["render", wD]]), SD = {}, xD = /* @__PURE__ */ u("hr", { class: "dropdown-divider" }, null, -1), $D = [
  xD
];
function CD(e, t) {
  return b(), E("li", null, $D);
}
const OD = /* @__PURE__ */ Po(SD, [["render", CD]]), kD = {
  mounted(e, t, n, s) {
    new bootstrap.Tooltip(e, {
      title: t.value,
      placement: t.arg,
      trigger: "hover"
    });
  }
}, TD = (e, t) => {
  function n(a, r) {
    for (; a !== null; ) {
      if (a === r)
        return !0;
      a = a.parentNode;
    }
    return !1;
  }
  const s = new AbortController();
  function o(a, r) {
    document.addEventListener("click", function(i) {
      const l = i.target;
      a && (n(l, a) || r());
    }, { signal: s.signal });
  }
  return o(e, t), s;
}, ND = {
  mounted(e, t, n, s) {
    const o = t.value;
    TD(e, o);
  }
};
class Fd {
  static add(t) {
    this.list.add(t), document.body.classList.add("drawer-open");
  }
  static delete(t) {
    this.list.delete(t), this.list.size === 0 && document.body.classList.remove("drawer-open");
  }
}
ss(Fd, "list", /* @__PURE__ */ new Set());
const DD = ["onClick"], AD = { class: "drawer-content" }, RD = { class: "drawer-header" }, ID = ["innerHTML"], PD = { class: "drawer-body" }, MD = ["innerHTML"], LD = { class: "drawer-footer" }, VD = ["innerHTML"], FD = ["innerHTML"], UD = /* @__PURE__ */ un({
  __name: "Drawer",
  props: {
    title: { default: "" },
    body: { default: "" },
    textCancel: { default: "Cancel" },
    textOk: { type: [String, Boolean], default: "Ok" },
    backdrop: { type: [Boolean, String], default: "static" },
    keyboard: { type: Boolean, default: !0 },
    focus: { type: Boolean, default: !0 },
    disableOutsideClick: { type: Boolean },
    okOnly: { type: Boolean, default: !1 },
    size: { default: Ro.STANDARD },
    btnSize: { default: Ro.SMALL },
    lazy: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, {
      backdrop: s,
      keyboard: o,
      focus: a,
      size: r,
      btnSize: i
    } = $t(n), l = k(() => Zl(r.value, "drawer-")), c = k(() => Zl(i.value, "btn-")), f = te(), d = te(!1), h = An();
    let p;
    async function m() {
      return d.value === !0 ? void 0 : new Promise((C, N) => {
        d.value = !0, p = C;
      });
    }
    function _(C = !0) {
      d.value = !1, typeof p == "function" && p(C);
    }
    function y() {
      d.value === !0 ? m() : _(!1);
    }
    function g(C) {
      (s == null ? void 0 : s.value) !== "static" && _(!1);
    }
    function v() {
      _(!1);
    }
    function S() {
      _(!1);
    }
    function w() {
      _(!0);
    }
    function $() {
      d.value === !0 ? Fd.add(h) : Fd.delete(h);
    }
    return t({
      show: m,
      hide: _,
      toggle: y
    }), (C, N) => (b(), Ce(Nc, {
      onBeforeEnter: $,
      onAfterLeave: $
    }, {
      default: K(() => [
        d.value ? (b(), E("div", Dn({
          key: 0,
          ref_key: "drawerElement",
          ref: f,
          class: "drawer",
          tabindex: "-1"
        }, { ...C.$attrs }, {
          onClick: kt(g, ["self"])
        }), [
          u("div", {
            class: Ne(["drawer-dialog", l.value])
          }, [
            u("div", AD, [
              u("div", RD, [
                we(C.$slots, "header", {}, () => [
                  u("h5", {
                    class: "drawer-title",
                    innerHTML: C.title
                  }, null, 8, ID)
                ], !0),
                u("button", {
                  type: "button",
                  class: "btn-close",
                  "aria-label": "Close",
                  onClick: v
                })
              ]),
              u("div", PD, [
                we(C.$slots, "default", {}, () => [
                  u("span", { innerHTML: C.body }, null, 8, MD)
                ], !0)
              ]),
              u("div", LD, [
                we(C.$slots, "footer", {}, () => [
                  C.okOnly ? me("", !0) : (b(), E("button", {
                    key: 0,
                    type: "button",
                    class: Ne(["ms-auto btn btn-secondary", c.value]),
                    onClick: S
                  }, [
                    we(C.$slots, "button-cancel", {}, () => [
                      u("span", { innerHTML: C.textCancel }, null, 8, VD)
                    ], !0)
                  ], 2)),
                  u("button", {
                    type: "button",
                    class: Ne(["btn btn-primary", c.value]),
                    onClick: w
                  }, [
                    we(C.$slots, "button-ok", {}, () => [
                      u("span", { innerHTML: C.textOk }, null, 8, FD)
                    ], !0)
                  ], 2)
                ], !0)
              ])
            ])
          ], 2)
        ], 16, DD)) : me("", !0)
      ]),
      _: 3
    }));
  }
}), jD = /* @__PURE__ */ Po(UD, [["__scopeId", "data-v-2e49e8cb"]]), Xn = "b", Fg = "$toaster", Ug = "$modalManager";
class jg {
  static getComponent() {
    if (!this.component) {
      const t = document.createElement("div");
      document.body.appendChild(t);
      const n = Un(IN).mount(t);
      this.component = n;
    }
    return this.component;
  }
}
ss(jg, "component");
class Hg {
  static getComponent() {
    if (!this.component) {
      const t = document.createElement("div");
      document.body.appendChild(t);
      const n = Un(xN).mount(t);
      this.component = n;
    }
    return this.component;
  }
}
ss(Hg, "component");
function Ss() {
  return ln(Fg);
}
function fr() {
  return ln(Ug);
}
function HD(e) {
  e.component(`${Xn}-drawer`, jD), e.component(`${Xn}-modal`, Lg), e.component(`${Xn}-pagination`, zN), e.component(`${Xn}-pagination-dropdown`, QN), e.component(`${Xn}-pagination-select`, qN), e.component(`${Xn}-dropdown`, mD), e.component(`${Xn}-dropdown-item`, vD), e.component(`${Xn}-dropdown-header`, ED), e.component(`${Xn}-dropdown-divider`, OD), e.component(`${Xn}-table`, dD), e.component(`${Xn}-toast`, Mg);
}
function BD(e) {
  e.directive("tooltip", kD), e.directive("click-outside", ND);
}
const Qs = {
  install(e) {
    HD(e), BD(e);
    const t = Hg.getComponent();
    e.provide(Fg, t);
    const n = jg.getComponent();
    e.provide(Ug, n);
  }
}, Gz = async (e) => {
  fN();
  const t = Un(YC);
  return t.use(Io()), t.use(Qs), t.use(Vd), t.mount(e), t;
}, zz = async (e) => {
  const t = Un(nO);
  return t.use(Io()), t.use(Qs), t.mount(e), t;
};
function Ai(e, t = 300) {
  let n;
  return function(...s) {
    n && clearTimeout(n);
    const o = this;
    n = setTimeout(() => {
      e.apply(o, s);
    }, t);
  };
}
function YD(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function Hr(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return !1;
    for (let o = 0; o < e.length; o++)
      if (!Hr(e[o], t[o]))
        return !1;
    return !0;
  }
  if (typeof e != "object" || typeof t != "object" || e == null || t == null)
    return e === t;
  const n = Object.keys(e), s = Object.keys(t);
  if (n.length !== s.length)
    return !1;
  for (const o of n)
    if (!s.includes(o) || !Hr(e[o], t[o]))
      return !1;
  return !0;
}
const Ba = (e, t = /* @__PURE__ */ new WeakMap()) => {
  if (e === null || typeof e != "object")
    return e;
  if (t.has(e))
    return t.get(e);
  let n;
  if (Array.isArray(e))
    n = [], t.set(e, n), e.forEach((s, o) => {
      n[o] = Ba(s, t);
    });
  else {
    n = e.constructor ? new e.constructor() : /* @__PURE__ */ Object.create(null), t.set(e, n);
    for (const s in e)
      s in e && (n[s] = Ba(e[s], t));
  }
  return n;
}, WD = () => "10000000-1000-4000-8000-100000000000".replace(
  /[018]/g,
  (e) => (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)
), GD = (e) => {
  if (typeof e == "string") {
    const t = e.toLowerCase();
    if (t === "true")
      return !0;
    if (t === "false" || t === "0")
      return !1;
  } else if (typeof e == "number")
    return e !== 0;
  return !!e;
}, Cn = Object.freeze({
  WAITING: "waiting",
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error",
  WARNING: "warning",
  CANCELED: "canceled"
});
var _i, lc, Yg;
class Bg {
  constructor(t = "") {
    pr(this, lc);
    pr(this, _i, void 0);
    iu(this, _i, t);
  }
  get defaultConfig() {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
      // add an abort signal
      // signal: abortController.signal,
    };
  }
  getFullURL(t) {
    return new URL(t, Lo(this, _i));
  }
  makeRequest(t) {
    const n = this.getFullURL(t);
    return (o) => {
      let a = bh(this, lc, Yg).call(this, n, this.defaultConfig, o);
      return new Promise((i, l) => {
        fetch(n, a).then(async (c) => {
          var h;
          const d = ((h = c.headers.get("content-type")) == null ? void 0 : h.includes("application/json")) ? await c.json() : null;
          if (!c.ok) {
            const p = d && d.message || c.status;
            return l(p);
          }
          i(d);
        }).catch((c) => {
          console.error("Error fetching data:", c), l(c);
        });
      });
    };
  }
  /**
   * use this function in a derived class to
   * override the global params
   * 
   * @param {Object} params 
   * @returns 
   */
  visitGlobalParams(t) {
    return t;
  }
  get globalQueryParams() {
    let t = new URLSearchParams(location.search), n = {};
    for (let [s, o] of t.entries())
      n[s] = o;
    return window.redcap_csrf_token && (n.redcap_csrf_token = window.redcap_csrf_token), n = this.visitGlobalParams(n), n;
  }
  async send(t, n) {
    return this.makeRequest(t)(n);
  }
}
_i = new WeakMap(), lc = new WeakSet(), Yg = function(t, n, s) {
  for (let [o, a] of Object.entries(s))
    switch (o) {
      case "data":
        if (a instanceof FormData) {
          let c = {};
          const f = a;
          for (let [d, h] of f.entries())
            d in c ? (Array.isArray(c[d]) || (c[d] = [c[d]]), c[d].push(h)) : c[d] = h;
          n.body = JSON.stringify(c);
        } else
          n.body = JSON.stringify(a);
        break;
      case "params":
        const i = { ...this.globalQueryParams, ...a }, l = t.searchParams;
        for (const [c, f] of Object.entries(i))
          l.set(c, f);
        break;
      default:
        n[o] = a;
        break;
    }
  return n;
};
var cc, ym;
let zD = (ym = class extends Bg {
  constructor() {
    super(...arguments);
    pr(this, cc, ["pid"]);
  }
  visitGlobalParams(n) {
    const s = {};
    for (const [o, a] of Object.entries(n))
      Lo(this, cc).includes(o) || (s[o] = a);
    return s;
  }
}, cc = new WeakMap(), ym), Ud = "";
window.app_path_webroot_full ? Ud = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : Ud = `${location.protocol}//${location.host}/api`;
const Au = new zD(Ud), Ya = wt({
  loading: !1,
  data: [],
  metadata: {},
  list: [],
  //
  async fetchMessages(e = 0, t = 0, n = "") {
    try {
      this.loading = !0;
      const s = {
        route: "QueueController:getList",
        page: e,
        perPage: t,
        query: n
      }, o = await Au.send("", { params: s, method: "GET" }), { data: a, metadata: r } = o;
      this.data = a, this.metadata = r;
    } catch (s) {
      console.log(s);
    } finally {
      this.loading = !1;
    }
  },
  async updatePriority(e, t) {
    try {
      const n = {
        route: "QueueController:setPriority"
      }, s = { ID: e, priority: t }, o = await Au.send("", { method: "POST", params: n, data: s }), { data: a } = o;
      return !0;
    } catch {
      return !1;
    } finally {
    }
  },
  async deleteMessage(e) {
    try {
      const t = {
        route: "QueueController:deleteMessage"
      }, n = { ID: e }, s = await Au.send("", { method: "DELETE", params: t, data: n }), { data: o } = s;
      return !0;
    } catch {
      return !1;
    } finally {
    }
  }
}), fo = Object.freeze({
  ASC: "ASC",
  DESC: "DESC",
  IGNORE: "IGNORE"
});
class KD {
  constructor(t, n = fo.ASC, s = null) {
    pe(this, "key");
    pe(this, "direction");
    pe(this, "sortFn");
    this.key = t, this.direction = n, this.sortFn = s;
  }
}
const zp = (e, t) => {
  const n = (i, l) => {
    let c = typeof i, f = typeof l;
    return c == "number" && c == f;
  }, s = (i, l) => i - l, o = (i, l) => (i = i ?? "", l = l ?? "", i.localeCompare(l)), a = (i, l) => n(i, l) ? s : o, r = [...t];
  return r.sort((i, l) => {
    let c = 0;
    for (let f of e) {
      let { key: d, direction: h, sortFn: p } = f, m = h === fo.ASC ? 1 : -1, _ = i[d], y = l[d];
      if (p = typeof p == "function" ? p : a(_, y), c = p(_, y, i, l, t, f, m) * m, c !== 0)
        return c;
    }
    return c;
  }), r;
};
class JD {
  constructor(t) {
    pe(this, "key", "");
    // age
    pe(this, "label", "");
    // Person age
    pe(this, "sortable", !1);
    // true
    /**
     * optional sorting logic for the field
     * a sort function accepts 2 parameters (a,b)
     * and follows the sorting rules
     */
    pe(this, "sortFn", null);
    typeof t == "string" ? (this.key = t, this.label = t) : (this.key = t == null ? void 0 : t.key, this.label = t == null ? void 0 : t.label, this.sortable = (t == null ? void 0 : t.sortable) || !1, this.sortFn = (t == null ? void 0 : t.sortFn) || null);
  }
}
const XD = (e) => {
  let t = [];
  for (const n of e)
    t = t.concat(Object.keys(n));
  return t = t.filter((n, s) => t.indexOf(n) == s), t;
}, QD = {
  emits: ["sort"],
  setup(e, t) {
    const n = te([]), s = k(() => {
      if (e.externalSort || n.value.length == 0)
        return e.items;
      const l = [...e.items];
      return zp(n.value, l);
    }), o = k(() => {
      let l = e.fields;
      return l.length === 0 && (l = XD([...e.items])), l.map((c) => new JD(c));
    });
    function a(l) {
      const c = n.value.findIndex((f) => f.key === l.key);
      return c < 0 ? "" : c + 1;
    }
    function r(l) {
      const c = n.value.findIndex((d) => d.key === l.key);
      if (c < 0)
        return "fas fa-sort";
      const f = n.value[c];
      return f.direction === fo.ASC ? "fas fa-sort-up" : f.direction === fo.DESC ? "fas fa-sort-down" : "far fa-exclamation-triangle";
    }
    function i(l) {
      const { key: c } = l, f = n.value.findIndex((d) => d.key === c);
      if (f < 0) {
        const d = new KD(c, fo.ASC, l.sortFn);
        n.value.push(d);
      } else {
        const d = n.value[f], h = d.direction;
        h === fo.ASC ? d.direction = fo.DESC : h === fo.DESC && n.value.splice(f, 1);
      }
      t.emit("sort", n.value, zp);
    }
    return {
      sorts: n,
      sortedItems: s,
      mapedFields: o,
      sortBy: i,
      sortIndex: a,
      sortIcon: r
    };
  },
  props: {
    fields: { type: Array, default: [] },
    items: { type: Array, default: [] },
    striped: { type: Boolean, default: !1 },
    hover: { type: Boolean, default: !0 },
    externalSort: { type: Boolean, default: !1 },
    // sort externally
    showEmpty: { type: Boolean, default: !1 },
    emptyText: { type: String, default: "nothing to display" }
  }
}, ZD = ["onClick"], qD = { class: "th-wrapper" }, e2 = {
  key: 0,
  "data-sort-indicator": ""
}, t2 = { class: "sort-index" }, n2 = { class: "sort-direction" }, s2 = {
  key: 0,
  class: "p-5 text-muted font-italic"
}, o2 = ["colspan"], r2 = ["innerHTML"];
function a2(e, t, n, s, o, a) {
  return b(), E("table", Dn({ ...e.$attrs }, {
    class: { striped: n.striped, hover: n.hover }
  }), [
    u("thead", null, [
      (b(!0), E(ne, null, Ae(s.mapedFields, (r) => (b(), E("th", {
        key: `thead-${r.key}`,
        class: Ne({ sortable: r.sortable }),
        onClick: (i) => r.sortable && s.sortBy(r)
      }, [
        u("span", qD, [
          we(e.$slots, `head(${r.key})`, {
            field: r,
            data: this,
            value: r.label
          }, () => [
            ve(j(r.label), 1)
          ], !0),
          r.sortable ? (b(), E("span", e2, [
            u("span", t2, j(s.sortIndex(r)), 1),
            u("span", n2, [
              u("i", {
                class: Ne(s.sortIcon(r))
              }, null, 2)
            ])
          ])) : me("", !0)
        ])
      ], 10, ZD))), 128))
    ]),
    u("tbody", null, [
      (b(!0), E(ne, null, Ae(s.sortedItems, (r, i) => (b(), E(ne, {
        key: `trow-${(r == null ? void 0 : r.id) ?? i}`
      }, [
        we(e.$slots, "row", {
          item: r,
          index: i,
          colspan: s.mapedFields.length
        }, void 0, !0),
        u("tr", null, [
          (b(!0), E(ne, null, Ae(s.mapedFields, (l) => (b(), E("td", {
            key: `tcell-${l.key + ((r == null ? void 0 : r.id) ?? i)}`,
            class: Ne({ [`tcell-${l.key}`]: !0 })
          }, [
            we(e.$slots, `cell(${l.key})`, {
              data: this,
              item: r,
              field: l,
              value: r[l.key]
            }, () => [
              ve(j(r[l.key]), 1)
            ], !0)
          ], 2))), 128))
        ])
      ], 64))), 128))
    ]),
    u("tfoot", null, [
      we(e.$slots, "footer", { data: this }, void 0, !0)
    ]),
    n.showEmpty && s.sortedItems.length === 0 ? (b(), E("tr", s2, [
      u("td", {
        colspan: s.mapedFields.length
      }, [
        we(e.$slots, "empty", {
          items: s.sortedItems,
          data: this,
          fields: s.mapedFields
        }, () => [
          u("span", { innerHTML: n.emptyText }, null, 8, r2)
        ], !0)
      ], 8, o2)
    ])) : me("", !0)
  ], 16);
}
const i2 = /* @__PURE__ */ Se(QD, [["render", a2], ["__scopeId", "data-v-697e347a"]]);
var Ko;
class l2 {
  constructor() {
    pe(this, "previousStyle");
    pr(this, Ko, void 0);
    iu(this, Ko, document.querySelector("body"));
  }
  applyStyle(t) {
    this.backupStyle();
    for (const [n, s] of Object.entries(t))
      Lo(this, Ko).style[n] = s;
  }
  backupStyle() {
    this.previousStyle = Lo(this, Ko).style;
  }
  restoreStyle() {
    this.previousStyle && (Lo(this, Ko).style = this.previousStyle);
  }
}
Ko = new WeakMap();
const Kp = new l2(), gr = Object.freeze({
  OK: 1,
  CANCEL: 0,
  ERROR: -1
}), pa = Object.freeze({
  small: "300px",
  default: "500px",
  large: "800px",
  extra: "1140px"
});
let ma, rl;
var Fs;
let Jp = (Fs = class {
  constructor(t, n) {
    this.props = t, this.context = n;
  }
  setup() {
    const t = this, n = this.props, s = this.context, { visible: o, size: a, modelValue: r } = $t(n), i = te(null), l = te(!1), c = te({}), f = k({
      get() {
        return r.value;
      },
      set(w) {
        s.emit("update:modelValue", w);
      }
    });
    Xt(
      o,
      function(w) {
        w === !0 ? d() : h();
      },
      { immediate: !0 }
    ), Xt(
      a,
      function(w) {
        let $ = (pa == null ? void 0 : pa[w]) ?? pa.Default;
        c.value["--modal-width"] = $;
      },
      { immediate: !0 }
    );
    async function d() {
      return l.value ? void 0 : (Fs.openModals.size === 0 && Kp.applyStyle({ overflow: "hidden" }), l.value = !0, await S(), Fs.openModals.add(t), s.emit("show", s), new Promise(($, C) => {
        ma = $, rl = C;
      }));
    }
    async function h(w = gr.CANCEL) {
      if (await S(!1), !!l.value && (l.value = !1, s.emit("hide", s, w), Fs.openModals.delete(t), Fs.openModals.size === 0 && Kp.restoreStyle(), !(!ma || !rl))) {
        switch (w) {
          case gr.OK:
            ma(!0);
            break;
          case gr.CANCEL:
            ma(!1);
            break;
          case gr.ERROR:
            rl(!0);
            break;
        }
        ma = rl = null;
      }
    }
    function p() {
      return l ? h() : d();
    }
    function m() {
      h(gr.CANCEL);
    }
    function _(w) {
      n.disableOutsideClick || m();
    }
    function y(w) {
      m();
    }
    function g(w) {
      m();
    }
    function v(w) {
      h(gr.OK);
    }
    function S(w = !0) {
      if (!i.value)
        return;
      const $ = i.value, C = $.querySelector("[data-content]");
      let N = {
        duration: 300,
        fill: "forwards",
        easing: "ease-in-out",
        direction: w ? "normal" : "reverse"
        // iterations: Infinity
      };
      const A = (I) => {
        let V = [
          { opacity: "0" },
          { opacity: "1" }
        ];
        return I.animate(V, N);
      }, D = (I) => {
        let V = [
          { transform: "translate(0, -25%)" },
          { transform: "translate(0, 0)" }
        ];
        return I.animate(V, N);
      }, F = A($), H = D(C);
      return Promise.all([F.finished, H.finished]);
    }
    return {
      root: i,
      isVisible: l,
      style: c,
      prompt: f,
      onBackdropClicked: _,
      onCloseClicked: y,
      onCancelClicked: g,
      onOkClicked: v,
      toggle: p,
      show: d,
      hide: h,
      cancel: m
    };
  }
  /**
   * export the props
   * @param {Function} visit optional function that can modify the default props
   * @returns 
   */
  static props(t = null) {
    const n = {
      visible: { type: Boolean, default: !1 },
      backdrop: { type: Boolean, default: !1 },
      disableOutsideClick: { type: Boolean, default: !1 },
      okOnly: { type: Boolean, default: !1 },
      okText: { type: String, default: "Ok" },
      cancelText: { type: String, default: "Cancel" },
      closeText: { type: String, default: "&times;" },
      title: { type: String, default: "" },
      body: { type: String, default: "" },
      size: { type: String, default: pa.Default },
      showPrompt: { type: Boolean, default: !1 },
      modelValue: { type: String, default: "" }
    };
    return typeof t == "function" && t(n), n;
  }
}, // TODO: keep track of open Modals
pe(Fs, "openModals", /* @__PURE__ */ new Set()), Fs);
const c2 = {
  emits: ["update:modelValue", "show", "hide"],
  setup(e, t) {
    return new Jp(e, t).setup();
  },
  props: Jp.props()
}, u2 = { "data-dialog": "" }, d2 = { "data-content": "" }, f2 = { "data-header": "" }, h2 = ["innerHTML"], p2 = { "data-body": "" }, m2 = ["innerHTML"], _2 = { "data-footer": "" }, v2 = ["innerHTML"], g2 = ["innerHTML"];
function y2(e, t, n, s, o, a) {
  return L((b(), E("div", {
    ref: "root",
    "data-modal": "",
    onClick: t[4] || (t[4] = kt((...r) => e.onBackdropClicked && e.onBackdropClicked(...r), ["self"])),
    style: ps(e.style)
  }, [
    u("div", u2, [
      u("div", d2, [
        u("div", f2, [
          e.isVisible ? we(e.$slots, "header", { key: 0 }, () => [
            u("div", { innerHTML: e.title }, null, 8, h2)
          ], !0) : me("", !0),
          u("div", null, [
            u("span", {
              "data-close": "",
              onClick: t[0] || (t[0] = (...r) => e.onCloseClicked && e.onCloseClicked(...r))
            }, "×")
          ])
        ]),
        u("div", p2, [
          e.isVisible ? we(e.$slots, "default", {
            key: 0,
            onOkClicked: e.onOkClicked
          }, () => [
            u("div", { innerHTML: e.body }, null, 8, m2)
          ], !0) : me("", !0),
          e.isVisible && e.showPrompt ? we(e.$slots, "secondary-prompt", { key: 1 }, () => [
            L(u("input", {
              class: "form-control mt-2",
              type: "text",
              "onUpdate:modelValue": t[1] || (t[1] = (r) => e.prompt = r)
            }, null, 512), [
              [Ke, e.prompt]
            ])
          ], !0) : me("", !0)
        ]),
        u("div", _2, [
          e.isVisible ? we(e.$slots, "footer", { key: 0 }, () => [
            we(e.$slots, "secondary-button", {}, () => [
              e.okOnly ? me("", !0) : (b(), E("button", {
                key: 0,
                class: "btn btn-sm btn-secondary",
                type: "button",
                "data-button-cancel": "",
                onClick: t[2] || (t[2] = (...r) => e.onCancelClicked && e.onCancelClicked(...r)),
                innerHTML: e.cancelText
              }, null, 8, v2))
            ], !0),
            we(e.$slots, "primary-button", {}, () => [
              u("button", {
                class: "btn btn-sm btn-primary",
                type: "button",
                "data-button-ok": "",
                onClick: t[3] || (t[3] = (...r) => e.onOkClicked && e.onOkClicked(...r)),
                innerHTML: e.okText
              }, null, 8, g2)
            ], !0)
          ], !0) : me("", !0)
        ])
      ])
    ])
  ], 4)), [
    [Dc, e.isVisible]
  ]);
}
const ih = /* @__PURE__ */ Se(c2, [["render", y2], ["__scopeId", "data-v-e2a18a08"]]);
const b2 = { "data-button": "" }, w2 = ["innerHTML"], E2 = {
  key: 0,
  "data-menu": ""
}, S2 = "prevent-close", x2 = {
  __name: "DropDown",
  props: {
    text: { type: String, default: "" },
    variant: { type: String, default: "primary" },
    right: { type: Boolean, default: !1 },
    top: { type: Boolean, default: !1 }
  },
  setup(e) {
    let t;
    const n = te(!1);
    function s(i) {
      console.log("onSlotClicked");
    }
    function o() {
      n.value = !0;
    }
    function a() {
      n.value = !1;
    }
    function r(i) {
      t && t.abort();
      const { currentTarget: l } = i;
      t = new AbortController(), n.value ? a() : o(), setTimeout(() => {
        document.addEventListener(
          "click",
          (c) => {
            const { target: f } = c;
            f != null && f.closest(
              `[${S2}]`
            ) || f === l || (a(), t.abort());
          },
          { signal: t.signal }
        );
      }, null);
    }
    return (i, l) => (b(), E("div", Dn({ "data-dropdown": "" }, { ...i.$attrs }, {
      class: { right: e.right, top: e.top }
    }), [
      u("div", b2, [
        u("button", {
          class: Ne(["btn btn-sm d-flex align-items-center", { [`btn-${e.variant}`]: !0 }]),
          type: "button",
          onClick: r
        }, [
          we(i.$slots, "button", { dropdown: this }, () => [
            u("span", { innerHTML: e.text }, null, 8, w2)
          ], !0),
          we(i.$slots, "caret", {}, () => [
            u("i", {
              class: Ne(["ms-auto fas fa-caret-right fa-fw", { "fa-rotate-90": n.value }])
            }, null, 2)
          ], !0)
        ], 2)
      ]),
      n.value ? (b(), E("div", E2, [
        we(i.$slots, "default", {
          onItemClick: s,
          dropdown: this
        }, void 0, !0)
      ])) : me("", !0)
    ], 16));
  }
}, eu = /* @__PURE__ */ Se(x2, [["__scopeId", "data-v-06f1c00e"]]);
const $2 = {
  emits: ["click"],
  setup(e, t) {
    function n() {
      t.emit("click", this);
    }
    return {
      onClick: n
    };
  }
};
function C2(e, t, n, s, o, a) {
  return b(), E("div", {
    "data-dropdown-item": "",
    onClick: t[0] || (t[0] = (...r) => s.onClick && s.onClick(...r))
  }, [
    we(e.$slots, "default", {}, void 0, !0)
  ]);
}
const Br = /* @__PURE__ */ Se($2, [["render", C2], ["__scopeId", "data-v-b223643c"]]);
const O2 = {
  setup(e, t) {
    return {};
  }
}, k2 = { "data-dropdown-divider": "" };
function T2(e, t, n, s, o, a) {
  return b(), E("hr", k2);
}
const N2 = /* @__PURE__ */ Se(O2, [["render", T2], ["__scopeId", "data-v-42e5e876"]]);
const D2 = { "data-first": "" }, A2 = ["disabled", "innerHTML"], R2 = { "data-prev": "" }, I2 = ["disabled", "innerHTML"], P2 = { key: 0 }, M2 = ["innerHTML"], L2 = ["onClick"], V2 = { "data-next": "" }, F2 = ["disabled", "innerHTML"], U2 = { "data-last": "" }, j2 = ["disabled", "innerHTML"], H2 = Object.freeze({
  SMALL: "sm",
  NORMAL: "",
  LARGE: "lg"
}), B2 = {
  __name: "PageSelection",
  props: {
    modelValue: { type: Number, default: 1 },
    perPage: { type: Number, default: 5 },
    maxVisibleButtons: { type: Number, default: 5 },
    totalItems: { type: Number, default: 0 },
    hideEllipsis: { type: Boolean, default: !1 },
    hideGotoEndButtons: { type: Boolean, default: !1 },
    firstText: { type: String, default: "«" },
    prevText: { type: String, default: "‹" },
    nextText: { type: String, default: "›" },
    lastText: { type: String, default: "»" },
    ellipsisText: { type: String, default: "…" },
    size: {
      type: String,
      default: "",
      validator(e) {
        return Object.values(H2).includes(e);
      }
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e;
    function s(v, S = 0) {
      return [...Array(v).keys()].map((w) => w + S);
    }
    const {
      modelValue: o,
      maxVisibleButtons: a,
      hideEllipsis: r
    } = $t(n), i = Math.floor(a.value / 2), l = k(() => {
      let v = a.value, S = o.value <= i ? 1 : o.value - i;
      return o.value >= d.value - i && (S = d.value - v + 1), S < 1 && (S = 1), d.value < v && (v = d.value), s(v, S);
    }), c = k(() => o.value <= 1), f = k(() => o.value >= d.value), d = k(() => {
      const { perPage: v, totalItems: S } = n;
      return Math.ceil(S / v);
    });
    function h(v) {
      const S = a.value - 1;
      return !(r.value === !0 || v === 0 && o.value - i - 1 <= 0 || v === S && o.value + i >= d.value || v > 0 && v < S);
    }
    function p(v) {
      v < 1 && (v = 1), v > d.value && (v = d.value), t("update:modelValue", v);
    }
    function m() {
      t("update:modelValue", 1);
    }
    function _() {
      t("update:modelValue", d.value);
    }
    function y() {
      let v = o.value - 1;
      v < 1 && (v = 1), t("update:modelValue", v);
    }
    function g() {
      let v = o.value + 1;
      v > d.value && (v = d.value), t("update:modelValue", v);
    }
    return (v, S) => (b(), E("ul", {
      class: Ne(["pagination", e.size])
    }, [
      u("li", D2, [
        u("button", {
          class: "",
          disabled: c.value,
          innerHTML: e.firstText,
          onClick: m
        }, null, 8, A2)
      ]),
      u("li", R2, [
        u("button", {
          class: "",
          disabled: c.value,
          innerHTML: e.prevText,
          onClick: y
        }, null, 8, I2)
      ]),
      (b(!0), E(ne, null, Ae(l.value, (w, $) => (b(), E(ne, { key: w }, [
        h($) ? (b(), E("li", P2, [
          u("button", {
            disabled: "",
            class: "",
            innerHTML: e.ellipsisText
          }, null, 8, M2)
        ])) : (b(), E("li", {
          key: 1,
          "data-prev": "",
          class: Ne({ active: e.modelValue === w })
        }, [
          u("button", {
            class: "",
            onClick: (C) => p(w)
          }, j(w), 9, L2)
        ], 2))
      ], 64))), 128)),
      u("li", V2, [
        u("button", {
          class: "",
          disabled: f.value,
          innerHTML: e.nextText,
          onClick: g
        }, null, 8, F2)
      ]),
      u("li", U2, [
        u("button", {
          class: "",
          disabled: f.value,
          innerHTML: e.lastText,
          onClick: _
        }, null, 8, j2)
      ])
    ], 2));
  }
}, jd = /* @__PURE__ */ Se(B2, [["__scopeId", "data-v-97a7daf0"]]), Y2 = "fas fa-refresh", W2 = {
  emits: ["click"],
  props: {
    loading: { type: Boolean, default: !1 },
    icon: { type: String, default: Y2 },
    text: { type: String, default: "" },
    callback: { type: Function, default: null }
  },
  setup(e, t) {
    const { text: n, icon: s, loading: o } = $t(e);
    function a() {
      t.emit("click", this);
    }
    return {
      text: n,
      icon: s,
      loading: o,
      onButtonClicked: a
    };
  }
}, G2 = ["disabled"], z2 = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, K2 = ["innerHTML"];
function J2(e, t, n, s, o, a) {
  return b(), E("div", null, [
    u("button", {
      disabled: s.loading,
      class: "btn btn-sm btn-primary",
      onClick: t[0] || (t[0] = (...r) => s.onButtonClicked && s.onButtonClicked(...r))
    }, [
      s.loading ? (b(), E("i", z2)) : (b(), E("i", {
        key: 1,
        class: Ne([s.icon, "fa-fw"])
      }, null, 2)),
      s.text ? (b(), E("span", {
        key: 2,
        class: "ml-2",
        innerHTML: s.text
      }, null, 8, K2)) : me("", !0)
    ], 8, G2)
  ]);
}
const Xp = /* @__PURE__ */ Se(W2, [["render", J2]]);
class us {
  static make(t) {
    const n = document.createElement("div");
    return document.body.appendChild(n), Un(ih, { ...t }).mount(n);
  }
  static async confirm(t) {
    const n = us.make(t);
    return us.show(n);
  }
  static async alert(t) {
    const n = us.make({ okOnly: !0, ...t });
    return us.show(n);
  }
  static async prompt(t) {
    const n = us.make({ showPrompt: !0, ...t });
    return us.show(n);
  }
  static async show(t) {
    const n = () => {
      const o = t.$el.parentNode;
      o.parentNode.removeChild(o);
    };
    return new Promise((o, a) => {
      setTimeout(async () => {
        const r = await t.show();
        o(r), n();
      }, 0);
    });
  }
}
const ea = (e) => (Ze("data-v-d13e7b0b"), e = e(), qe(), e), X2 = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("span", { class: "ms-2" }, "actions", -1)), Q2 = ["disabled"], Z2 = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("i", { class: "fas fa-pencil fa-fw" }, null, -1)), q2 = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("span", { class: "ms-2" }, "edit priority", -1)), eA = [
  Z2,
  q2
], tA = ["disabled"], nA = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1)), sA = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("span", { class: "ms-2" }, "delete", -1)), oA = [
  nA,
  sA
], rA = /* @__PURE__ */ ea(() => /* @__PURE__ */ u("p", { class: "alert alert-info" }, " Please note that priority will only be updated for messages with a 'waiting' stutus. ", -1)), aA = ["onKeyup"], iA = {
  __name: "Toolbar",
  props: {
    list: { type: Array, default: () => [] }
  },
  emits: ["onDelete"],
  setup(e, { emit: t }) {
    const n = e, s = te(""), o = te(null), { list: a } = $t(n), r = k(() => a.value.filter(
      ({ status: h }) => h === Cn.WAITING
    ).length == 0);
    async function i() {
      var h, p;
      const d = a.value.length;
      s.value = d === 1 ? (p = (h = a.value) == null ? void 0 : h[0]) == null ? void 0 : p.priority : "", await o.value.show(), a.value.forEach((m) => {
        l(m);
      });
    }
    async function l(d) {
      if (d.status !== Cn.WAITING || !Number.isInteger(s.value))
        return;
      const h = d.priority;
      let p = YD(s.value, 1, 100);
      if (isNaN(p))
        return;
      d.priority = p;
      const m = await Ya.updatePriority(d.id, p);
      return m || (d.priority = h), m;
    }
    const c = k(() => a.value.filter(
      ({ status: h }) => h !== Cn.PROCESSING
    ).length == 0);
    async function f() {
      const d = a.value.length === 1 ? "this item" : "these items";
      if (!await us.confirm({
        title: "Are you sure?",
        body: `Do you really want to delete ${d}? This action cannot be undone.`
      }))
        return;
      const p = a.value.filter(
        ({ status: _ }) => _ !== Cn.PROCESSING
      ), m = [];
      p.forEach(async (_) => {
        if (_.status === Cn.PROCESSING)
          return;
        const y = Ya.deleteMessage(_.id);
        m.push(y);
      }), await Promise.all(m), t("onDelete");
    }
    return (d, h) => {
      const p = Te("b-dropdown-item"), m = Te("b-dropdown"), _ = Te("b-modal");
      return b(), E(ne, null, [
        T(m, {
          variant: "outline-secondary",
          size: "sm"
        }, {
          button: K(({ show: y }) => [
            u("i", {
              class: Ne(["fas fa-cog fa-fw", { "fa-rotate-90": y }])
            }, null, 2),
            X2
          ]),
          default: K(() => [
            T(p, null, {
              default: K(() => [
                u("button", {
                  class: "d-flex align-items-center justify-content-between",
                  disabled: r.value,
                  onClick: i
                }, eA, 8, Q2)
              ]),
              _: 1
            }),
            T(p, null, {
              default: K(() => [
                u("button", {
                  class: "",
                  disabled: c.value,
                  onClick: f
                }, oA, 8, tA)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        T(_, {
          ref_key: "priorityModal",
          ref: o
        }, {
          header: K(() => [
            ve(" Modify priority ")
          ]),
          default: K(({ hide: y }) => [
            rA,
            L(u("input", {
              class: "form-control form-control-sm",
              "onUpdate:modelValue": h[0] || (h[0] = (g) => s.value = g),
              type: "number",
              onKeyup: Af((g) => y(!0), ["enter"])
            }, null, 40, aA), [
              [Ke, s.value]
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, lA = /* @__PURE__ */ Se(iA, [["__scopeId", "data-v-d13e7b0b"]]);
const Ri = (e) => (Ze("data-v-45cd4bf3"), e = e(), qe(), e), cA = { class: "my-2 d-flex justify-content-between align-items-center" }, uA = { class: "d-flex mb-2" }, dA = { class: "ms-auto me-2" }, fA = ["value"], hA = /* @__PURE__ */ Ri(() => /* @__PURE__ */ u("i", { class: "fas fa-list fa-fw" }, null, -1)), pA = /* @__PURE__ */ Ri(() => /* @__PURE__ */ u("span", { class: "ms-2" }, "visible statuses", -1)), mA = { class: "d-flex align-items-center justify-content-start" }, _A = ["id", "value"], vA = ["for"], gA = /* @__PURE__ */ Ri(() => /* @__PURE__ */ u("span", null, null, -1)), yA = { class: "custom-control custom-switch" }, bA = ["checked", "indeterminate"], wA = /* @__PURE__ */ Ri(() => /* @__PURE__ */ u("label", {
  class: "custom-control-label",
  for: "checkbox-select-all"
}, null, -1)), EA = ["innerHTML"], SA = ["title"], xA = ["value", "id"], $A = ["for"], CA = ["innerHTML"], OA = { class: "" }, kA = { class: "d-flex m-auto align-items-center" }, TA = ["title"], NA = {
  key: 0,
  class: "d-flex"
}, DA = ["innerHTML"], AA = { class: "d-flex align-items-center priority" }, RA = /* @__PURE__ */ Ri(() => /* @__PURE__ */ u("i", { class: "fas fa-arrow-circle-up" }, null, -1)), IA = [
  RA
], PA = ["innerHTML"], MA = { class: "my-2 d-flex justify-content-between align-items-center" }, LA = ["onKeyup"], VA = {
  __name: "MessagesTable",
  setup(e) {
    const t = [
      { key: "id", label: "", sortable: !1 },
      // { key: 'data', label: 'data', sortable: true },
      { key: "key", label: "KEY", sortable: !0 },
      { key: "status", label: "STATUS", sortable: !0, sortFn: (H, P, I, V, q, Y, z) => {
        const { status: re = "", priority: Be = 0 } = I, { status: pt = "", priority: et = 0 } = V, tt = re.localeCompare(pt);
        return tt === 0 ? Be - et : tt;
      } },
      { key: "description", label: "DESCRIPTION", sortable: !0 },
      // { key: 'priority', label: 'PRIORITY', sortable: true },
      { key: "message", label: "MESSAGE", sortable: !0 },
      { key: "created_at", label: "CREATED AT", sortable: !0 },
      { key: "started_at", label: "STARTED AT", sortable: !0 },
      { key: "completed_at", label: "COMPLETED AT", sortable: !0 }
    ], n = ["status", "key", "priority", "description", "message"];
    k(() => Ya.metadata);
    const s = te(!1), o = te(1), a = [25, 50, 100, 500], r = te(a[1]), i = te(""), l = te(null), c = te(Object.values(Cn)), f = te([]), d = k(() => {
      const H = h.value.length, P = f.value.length;
      return P === 0 ? !1 : P !== H;
    }), h = k(() => g.value), p = k(() => {
      const H = f.value.length, P = h.value.length;
      return !(H === 0 || H < P);
    });
    function m() {
      f.value.length === 0 || d.value === !0 ? f.value = h.value : f.value = [];
    }
    const _ = k(() => Ya.data), y = te([]), g = k(() => {
      f.value = [];
      let H = y.value;
      return H = H.filter((P) => c.value.includes(P.status)), i.value !== "" && (H = H.filter((P) => {
        for (const I of n)
          if (String(P == null ? void 0 : P[I]).match(i.value))
            return !0;
        return !1;
      })), H;
    }), v = k(() => g.value.length), S = k(() => {
      const H = (o.value - 1) * r.value, P = H + r.value;
      return g.value.slice(H, P);
    });
    function w(H, P) {
      H.length === 0 ? y.value = [..._.value] : y.value = P(H, _.value);
    }
    const $ = Ai((H) => {
      o.value = 1;
      const { value: P } = H.target;
      i.value = P;
    }, 300);
    async function C() {
      await Ya.fetchMessages();
    }
    function N(H) {
      let P = "";
      switch (H) {
        case Cn.WAITING:
          P = "fas fa-clock text-primary";
          break;
        case Cn.PROCESSING:
          P = "fas fa-spinner fa-spin text-muted";
          break;
        case Cn.COMPLETED:
          P = "fas fa-check-circle text-success";
          break;
        case Cn.WARNING:
          P = "fas fa-exclamation-triangle text-warning";
          break;
        case Cn.ERROR:
          P = "fas fa-times-circle text-danger";
          break;
        case Cn.CANCELED:
          P = "fas fa-ban text-secondary";
          break;
        default:
          P = "fas fa-check-circle text-secondary";
          break;
      }
      return P;
    }
    function A(H, P = 1, I = 100, V = 0.4) {
      return `hsl(${120 - (H - P) / (I - P) * 120} 100% 50% / ${V})`;
    }
    const D = te("");
    async function F() {
      try {
        return s.value = !0, await C(), o.value = 1, y.value = _.value, !0;
      } catch (H) {
        console.log(H);
      } finally {
        s.value = !1;
      }
    }
    return F(), (H, P) => {
      const I = Te("b-dropdown-item"), V = Te("b-dropdown");
      return b(), E(ne, null, [
        u("div", null, [
          u("div", cA, [
            T(jd, {
              totalItems: v.value,
              modelValue: o.value,
              "onUpdate:modelValue": P[0] || (P[0] = (q) => o.value = q),
              perPage: r.value,
              size: "sm"
            }, null, 8, ["totalItems", "modelValue", "perPage"]),
            T(V, {
              class: "ms-auto",
              variant: "outline-primary",
              size: "sm"
            }, {
              button: K(() => [
                u("span", null, "Per page " + j(r.value), 1)
              ]),
              default: K(() => [
                (b(), E(ne, null, Ae(a, (q, Y) => T(I, {
                  key: Y,
                  active: q === r.value,
                  onClick: (z) => r.value = q
                }, {
                  default: K(() => [
                    ve(j(q), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "onClick"])), 64))
              ]),
              _: 1
            }),
            T(Xp, {
              class: "ms-2",
              onClick: F,
              loading: s.value
            }, null, 8, ["loading"])
          ]),
          u("div", uA, [
            u("div", null, [
              T(lA, {
                list: f.value,
                onOnDelete: F
              }, null, 8, ["list"])
            ]),
            u("div", dA, [
              u("input", {
                class: "form-control form-control-sm",
                type: "search",
                value: i.value,
                onInput: P[1] || (P[1] = (...q) => G($) && G($)(...q)),
                placeholder: "filter..."
              }, null, 40, fA)
            ]),
            T(V, {
              variant: "outline-secondary",
              size: "sm"
            }, {
              button: K(() => [
                hA,
                pA
              ]),
              default: K(() => [
                (b(!0), E(ne, null, Ae(G(Cn), (q, Y) => (b(), Ce(I, {
                  key: Y,
                  "prevent-close": ""
                }, {
                  default: K(() => [
                    u("span", mA, [
                      u("span", null, [
                        L(u("input", {
                          class: "me-2",
                          type: "checkbox",
                          name: "",
                          id: `status-${q}`,
                          value: q,
                          "onUpdate:modelValue": P[2] || (P[2] = (z) => c.value = z)
                        }, null, 8, _A), [
                          [Wt, c.value]
                        ])
                      ]),
                      u("span", null, [
                        u("label", {
                          for: `status-${q}`,
                          class: "m-0"
                        }, [
                          u("i", {
                            class: Ne(N(q))
                          }, null, 2),
                          ve(" " + j(q), 1)
                        ], 8, vA)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024))), 128))
              ]),
              _: 1
            })
          ]),
          T(i2, {
            id: "messages-table",
            fields: t,
            items: S.value,
            onSort: w,
            "show-empty": "",
            externalSort: ""
          }, {
            "head(id)": K(({ data: q, field: Y, value: z }) => [
              gA,
              u("div", yA, [
                u("input", {
                  class: "custom-control-input",
                  type: "checkbox",
                  checked: p.value,
                  indeterminate: d.value,
                  onClickCapture: m,
                  id: "checkbox-select-all"
                }, null, 40, bA),
                wA
              ])
            ]),
            "head(priority)": K(({ data: q, field: Y, value: z }) => [
              u("span", { innerHTML: z }, null, 8, EA)
            ]),
            "cell(id)": K(({ data: q, item: Y, field: z, value: re }) => [
              u("div", {
                class: "custom-control custom-switch",
                title: Y.id
              }, [
                L(u("input", {
                  class: "custom-control-input",
                  type: "checkbox",
                  "onUpdate:modelValue": P[3] || (P[3] = (Be) => f.value = Be),
                  value: Y,
                  id: `checkbox-${Y.id}`
                }, null, 8, xA), [
                  [Wt, f.value]
                ]),
                u("label", {
                  class: "custom-control-label",
                  for: `checkbox-${Y.id}`
                }, null, 8, $A)
              ], 8, SA)
            ]),
            "cell(description)": K(({ data: q, item: Y, field: z, value: re }) => [
              u("span", { innerHTML: re }, null, 8, CA)
            ]),
            "cell(status)": K(({ data: q, item: Y, field: z, value: re }) => [
              u("span", OA, [
                u("span", kA, [
                  u("i", {
                    title: re,
                    class: Ne(["m-auto", N(re)])
                  }, null, 10, TA)
                ]),
                re == G(Cn).WAITING ? (b(), E("span", NA, [
                  u("span", {
                    class: "m-auto text-muted font-italic small text-nowrap",
                    innerHTML: `priority level ${Y.priority}`
                  }, null, 8, DA)
                ])) : me("", !0)
              ])
            ]),
            "cell(priority)": K(({ data: q, item: Y, field: z, value: re }) => [
              u("span", AA, [
                u("span", {
                  style: ps({ backgroundColor: A(re) }),
                  class: "d-flex align-items-center justify-content-center p-1 mr-1 rounded"
                }, IA, 4),
                u("span", {
                  innerHTML: re
                }, null, 8, PA)
              ])
            ]),
            _: 1
          }, 8, ["items"]),
          u("div", MA, [
            T(jd, {
              totalItems: v.value,
              modelValue: o.value,
              "onUpdate:modelValue": P[4] || (P[4] = (q) => o.value = q),
              perPage: r.value,
              size: "sm"
            }, null, 8, ["totalItems", "modelValue", "perPage"]),
            T(Xp, {
              class: "ms-auto",
              onClick: F,
              loading: s.value
            }, null, 8, ["loading"])
          ])
        ]),
        T(ih, {
          ref_key: "priorityModal",
          ref: l
        }, {
          header: K(() => [
            ve(" Modify priority ")
          ]),
          default: K(({ onOkClicked: q }) => [
            L(u("input", {
              class: "form-control form-control-sm",
              "onUpdate:modelValue": P[5] || (P[5] = (Y) => D.value = Y),
              type: "number",
              onKeyup: Af(q, ["enter"])
            }, null, 40, LA), [
              [Ke, D.value]
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, FA = /* @__PURE__ */ Se(VA, [["__scopeId", "data-v-45cd4bf3"]]), UA = {
  components: { MessagesTable: FA },
  setup() {
    return {};
  }
};
function jA(e, t, n, s, o, a) {
  const r = Te("MessagesTable");
  return b(), Ce(r);
}
const HA = /* @__PURE__ */ Se(UA, [["render", jA]]);
const Jz = (e) => {
  const t = Un(HA);
  return t.use(Qs), t.mount(e), t;
};
var uc;
class BA extends Bg {
  constructor() {
    super(...arguments);
    pr(this, uc, ["pid"]);
  }
  visitGlobalParams(n) {
    const s = {};
    for (const [o, a] of Object.entries(n))
      Lo(this, uc).includes(o) || (s[o] = a);
    return s;
  }
}
uc = new WeakMap();
let Hd = "";
window.app_path_webroot_full ? Hd = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : Hd = `${location.protocol}//${location.host}/api`;
const Ru = new BA(Hd), $l = {
  getSettings() {
    const e = {
      route: "EmailUsersController:getSettings"
    };
    return Ru.send("", { params: e, method: "GET" });
  },
  getUsers(e = 1, t = 100, n = "") {
    const s = {
      route: "EmailUsersController:getUsers",
      _page: e,
      _per_page: t,
      _query: n
    };
    return Ru.send("", { params: s, method: "GET" });
  },
  scheduleEmails(e) {
    const t = {
      route: "EmailUsersController:scheduleEmails"
    };
    return Ru.send("", { params: t, data: e, method: "POST" });
  }
}, Iu = {}, YA = () => wt({
  ui_ids: [],
  from: "",
  subject: "",
  message: "",
  sending: !1,
  errors(e) {
    var i;
    const t = {
      from: [],
      subject: [],
      message: [],
      to: []
    }, { from: n = "", subject: s = "", message: o = "" } = e, r = [...((i = Iu == null ? void 0 : Iu.users) == null ? void 0 : i.selectedUsers) ?? []];
    return n.trim() === "" && t.from.push("a 'from' email must be selected"), s.trim() === "" && t.subject.push("subject cannot be empty"), o.trim() === "" && t.message.push("message cannot be empty"), r.length == 0 && t.to.push("you must select at least 1 recipient"), t;
  }
}), WA = () => wt({
  lang: {},
  user: {
    username: null,
    emails: []
  },
  settings: [],
  variables: [],
  loadData(t) {
    const n = t.data;
    this.lang = n.lang, this.user = n.user, this.settings = n.settings ?? [], this.variables = n.variables ?? [];
  },
  translate(t) {
    var s;
    const n = (s = this.lang) == null ? void 0 : s[t];
    return n ?? (console.log(`error: could not find a translation for ${t}`), !1);
  }
});
class ql {
  constructor(t) {
    pe(this, "ui_id");
    pe(this, "username");
    pe(this, "user_firstname");
    pe(this, "user_lastname");
    pe(this, "user_email");
    pe(this, "user_suspended_time");
    pe(this, "user_lastactivity");
    pe(this, "table_based_user");
    pe(this, "has_api_token");
    pe(this, "is_project_owner");
    pe(this, "has_mobile_app_rights");
    pe(this, "cdis_user");
    pe(this, "online");
    t && (this.ui_id = t.ui_id ? parseInt(t.ui_id) : this.ui_id, this.username = t.username ?? this.username, this.user_firstname = t.user_firstname ?? this.user_firstname, this.user_lastname = t.user_lastname ?? this.user_lastname, this.user_email = t.user_email ?? this.user_email, this.user_suspended_time = t.user_suspended_time ? new Date(t.user_suspended_time) : this.user_suspended_time, this.user_lastactivity = t.user_lastactivity ? new Date(t.user_lastactivity) : this.user_lastactivity, this.table_based_user = Number(t.table_based_user) ?? this.table_based_user, this.has_api_token = Number(t.has_api_token) ?? this.has_api_token, this.is_project_owner = Number(t.is_project_owner) ?? this.is_project_owner, this.has_mobile_app_rights = Number(t.has_mobile_app_rights) ?? this.has_mobile_app_rights, this.cdis_user = Number(t.cdis_user) ?? this.cdis_user, this.online = Number(t.online) ?? this.online);
  }
  get isSuspended() {
    return typeof this.user_suspended_time < "u";
  }
  get isOnline() {
    return !!this.online;
  }
  get isActive() {
    return !!this.user_lastactivity;
  }
  get isNotActive() {
    return !this.isActive;
  }
  get isTableUser() {
    return !!this.table_based_user;
  }
  get isLdapUser() {
    return !this.table_based_user;
  }
  get isCdisUser() {
    return !!this.cdis_user;
  }
  get isProjectOwner() {
    return !!this.is_project_owner;
  }
  get hasAPIToken() {
    return !!this.has_api_token;
  }
  get hasMobileAppRights() {
    return !!this.has_mobile_app_rights;
  }
  get wasActivePastWeek() {
    return this.wasActiveInRange("weeks", 1);
  }
  get wasActivePastMonth() {
    return this.wasActiveInRange("months", 1);
  }
  get wasActivePast3Months() {
    return this.wasActiveInRange("months", 3);
  }
  get wasActivePast6Months() {
    return this.wasActiveInRange("months", 6);
  }
  get wasActivePast12Months() {
    return this.wasActiveInRange("months", 12);
  }
  get lastActivityInMilliseconds() {
    return this.user_lastactivity instanceof Date ? ql.getTotalMilliseconds(/* @__PURE__ */ new Date(), this.user_lastactivity) : 0;
  }
  wasActiveInRange(t, n) {
    try {
      const s = this.user_lastactivity;
      if (!(s instanceof Date))
        return !1;
      const o = /* @__PURE__ */ new Date(), a = ql.addToDate(o, -n, t);
      return s > a;
    } catch (s) {
      return console.log(`error checking activity for user ${this.username}`, s), !1;
    }
  }
  static getTotalMilliseconds(t, n) {
    if (!(t instanceof Date && !isNaN(t.getTime())) || !(n instanceof Date && !isNaN(n.getTime())))
      throw new Error("Invalid date parameters");
    return Math.abs(t - n);
  }
  static addToDate(t, n, s) {
    if (!(t instanceof Date && !isNaN(t.getTime())))
      return !1;
    const o = new Date(t.getTime());
    switch (s) {
      case "minutes":
        o.setMinutes(o.getMinutes() + n);
        break;
      case "hours":
        o.setHours(o.getHours() + n);
        break;
      case "days":
        o.setDate(o.getDate() + n);
        break;
      case "weeks":
        o.setDate(o.getDate() + n * 7);
        break;
      case "months":
        o.setMonth(o.getMonth() + n);
        break;
      case "years":
        o.setFullYear(o.getFullYear() + n);
        break;
      default:
        throw new Error(`Invalid date unit: ${s}`);
    }
    return o;
  }
}
function GA(e, t) {
  for (let n of e) {
    const s = String(n).match(t);
    if (s)
      return s;
  }
  return !1;
}
const st = {
  ACTIVE: "ACTIVE",
  NON_ACTIVE: "NON_ACTIVE",
  LOGGED_IN: "LOGGED_IN",
  API_TOKEN: "API_TOKEN",
  MOBILE_APP_RIGHTS: "MOBILE_APP_RIGHTS",
  PROJECT_OWNERS: "PROJECT_OWNERS",
  CDIS: "CDIS",
  TABLE_BASED: "TABLE_BASED",
  LDAP: "LDAP",
  INTERVAL_PAST_WEEK: "INTERVAL_PAST_WEEK",
  INTERVAL_PAST_MONTH: "INTERVAL_PAST_MONTH",
  INTERVAL_PAST_3_MONTHS: "INTERVAL_PAST_3_MONTHS",
  INTERVAL_PAST_6_MONTHS: "INTERVAL_PAST_6_MONTHS",
  INTERVAL_PAST_12_MONTHS: "INTERVAL_PAST_12_MONTHS"
}, Qp = /* @__PURE__ */ new Set([
  st.INTERVAL_PAST_WEEK,
  st.INTERVAL_PAST_MONTH,
  st.INTERVAL_PAST_3_MONTHS,
  st.INTERVAL_PAST_6_MONTHS,
  st.INTERVAL_PAST_12_MONTHS
]);
class ec {
  constructor(t = []) {
    pe(this, "MIN_PER_PAGE", 10);
    pe(this, "MAX_PER_PAGE", 1e3);
    pe(this, "_showSuspended", !1);
    pe(this, "_users", []);
    // original users as defined in the constructor
    pe(this, "_ids", []);
    pe(this, "_page", 1);
    pe(this, "_perPage", 25);
    pe(this, "_paginatedUsers", []);
    pe(this, "_valid_users", []);
    // not suspended
    pe(this, "_includedUsers", /* @__PURE__ */ new Set());
    // inclusion group (manually selected from list)
    pe(this, "_excludedUsers", /* @__PURE__ */ new Set());
    // exclusion group (manually selected from list)
    pe(this, "_selectedGroups", /* @__PURE__ */ new Set());
    // using sets since order is not important
    pe(this, "_selectedUsers", /* @__PURE__ */ new Set());
    // using sets since order is not important
    pe(this, "_selectedIDs", /* @__PURE__ */ new Set());
    // using sets since order is not important
    // filter users using a query
    pe(this, "_query", "");
    pe(this, "_filteredUsers", /* @__PURE__ */ new Set());
    // based on query
    pe(this, "_state", {});
    // this is the state that will be passed to a store
    pe(this, "_groups", /* @__PURE__ */ new Map());
    pe(this, "_groupsMetadata", {});
    this.setUsers(t);
  }
  initGroups() {
    for (const t of Object.values(st))
      this._groups.set(t, /* @__PURE__ */ new Set());
  }
  setUsers(t) {
    const n = (s) => {
      if (!s.isSuspended)
        for (const o of Object.values(st))
          ec.userBelongsToGroup(s, o) && (this._groups.has(o) || this._groups.set(o, /* @__PURE__ */ new Set()), this._groups.get(o).add(s));
    };
    this.initGroups(), this._users = [];
    for (const s of t) {
      const o = new ql(s);
      this._users.push(o), this._ids.push(o.ui_id), n(o), o.isSuspended || this._valid_users.push(o);
    }
  }
  includeUser(t) {
    this._ids.includes(t.ui_id) && this.select([t]);
  }
  excludeUser(t) {
    this.deselect([t]);
  }
  setPage(t) {
    t = parseInt(t), t < 1 && (t = 1), t > this.totalPages && (t = this.totalPages), this._page = t;
  }
  setPerPage(t) {
    t = parseInt(t), t < this.MIN_PER_PAGE && (console.warning(`minimum elements per page is ${this.MIN_PER_PAGE}`), t = this.MIN_PER_PAGE), t > this.MAX_PER_PAGE && (console.warning(`maximum elements per page is ${this.MAX_PER_PAGE}`), t = this.MAX_PER_PAGE), this._perPage = t, this.setPage(1);
  }
  setQuery(t) {
    this._query = t;
  }
  toggleGroup(t) {
    this._selectedGroups.has(t) ? this.deselectGroups([t]) : this.selectGroups([t]);
  }
  getGroup(t) {
    const n = this._groups.get(t);
    if (!n) {
      console.log(`The group ${t} does not exist`);
      return;
    }
    return n;
  }
  selectGroups(t) {
    const n = (s) => {
      for (const o of Qp)
        o != s && this._selectedGroups.delete(o);
    };
    for (const s of t)
      this.getGroup(s) && (this._selectedGroups.add(s), Qp.has(s) && n(s));
  }
  deselectGroups(t) {
    for (const n of t)
      this.getGroup(n) && this._selectedGroups.delete(n);
  }
  /**
   * check if a group has to be unselected
   * based on the current users selection
   * also set the metadata for the group
   */
  checkSelectedGroups() {
    for (const [t, n] of this._groups) {
      const s = new Set(
        [...n].filter((o) => this._selectedUsers.has(o))
      );
      this._groupsMetadata[t] = {
        total: n.size,
        selected: s.size
      };
    }
  }
  toggleSuspended() {
    this._showSuspended = !this._showSuspended;
  }
  select(t) {
    for (const n of t)
      this._selectedIDs.add(n.ui_id), this._selectedUsers.add(n);
  }
  deselect(t) {
    for (const n of t)
      this._selectedIDs.delete(n.ui_id), this._selectedUsers.delete(n);
  }
  selectAll(t) {
    t ? this.select(this._valid_users) : this.deselect(this._valid_users);
  }
  selectFiltered(t) {
    t ? this.select(this.filteredUsers) : this.deselect(this.filteredUsers);
  }
  /**
   * apply a filter to the users serve to the user
   * it could be including suspended users or not
   * @param {*} users
   */
  applyQuery(t) {
    let n = [];
    const s = (a, r) => {
      const i = [
        a.ui_id,
        a.username,
        `${a.user_firstname} ${a.user_lastname}`,
        a.user_email
      ], l = new RegExp(r, "gi");
      return GA(i, l) !== !1;
    }, o = this._query;
    if (o !== "")
      for (const a of t)
        s(a, o) && n.push(a);
    else
      n = t;
    return n;
  }
  /**
   * apply a filter to the users serve to the user
   * it could be including suspended users or not
   * @param {*} users
   */
  applyGroups(t) {
    if (this._selectedGroups.size === 0)
      return t;
    let n = /* @__PURE__ */ new Set();
    for (const [s, o] of this._groups)
      if (this._selectedGroups.has(s))
        for (const a of t)
          o.has(a) && n.add(a);
    return Array.from(n);
  }
  setPaginatedUsers() {
    let t = [];
    t = this.showSuspended ? [...this._users] : [...this._valid_users], t = this.applyGroups(t), t = this.applyQuery(t), this._filteredUsers = t;
    const n = this.totalFiltered, s = this._perPage * (this._page - 1);
    if (s >= n)
      return this._paginatedUsers = [];
    const o = s + this._perPage;
    return this._paginatedUsers = t.slice(s, o);
  }
  /**
   * - set the paginated users
   * - manually update the state
   */
  updateState() {
    this.setPaginatedUsers(), this.checkSelectedGroups(), this._state = {
      data: {
        users: this.paginatedUsers,
        groups: this.groups,
        selectedIDs: this.selectedIDs,
        selectedUsers: this.selectedUsers
      },
      metadata: this.metadata
    };
  }
  get metadata() {
    return {
      total: this.showSuspended ? this._users.length : this._valid_users.length,
      page: this.page,
      perPage: this.perPage,
      totalPages: this.totalPages,
      totalFiltered: this.totalFiltered,
      selectedTotal: this._selectedUsers.size,
      paginatedTotal: this._paginatedUsers.length,
      filteredTotal: this.filteredSelectedIDs.size,
      validTotal: this._valid_users.length,
      showSuspended: this.showSuspended,
      // data about each group
      groups: this.groupsMetadata,
      query: this._query,
      isFilterActive: this.isFilterActive
    };
  }
  get page() {
    return this._page;
  }
  get perPage() {
    return this._perPage;
  }
  get totalUsers() {
    return this.showSuspended ? this._users.length : this._valid_users.length;
  }
  get totalPages() {
    return Math.ceil(this.totalUsers / this._perPage);
  }
  get totalFiltered() {
    return this._filteredUsers.length;
  }
  get state() {
    return this._state;
  }
  get paginatedUsers() {
    return this._paginatedUsers;
  }
  get groups() {
    return Array.from(this._selectedGroups);
  }
  get selectedUsers() {
    return Array.from(this._selectedUsers);
  }
  get selectedIDs() {
    return Array.from(this._selectedIDs);
  }
  get filteredUsers() {
    return Array.from(this._filteredUsers);
  }
  get showSuspended() {
    return this._showSuspended;
  }
  get groupsMetadata() {
    return this._groupsMetadata;
  }
  // get the users that are selected in the current filter
  get filteredSelectedIDs() {
    const t = /* @__PURE__ */ new Set();
    for (const n of this._selectedUsers)
      this._filteredUsers.includes(n) && t.add(n.ui_id);
    return t;
  }
  get isFilterActive() {
    return this.groups.length > 0 || this._query !== "";
  }
  static userBelongsToGroup(t, n) {
    switch (n) {
      case st.ACTIVE:
        return t.isActive;
      case st.NON_ACTIVE:
        return t.isNotActive;
      case st.LOGGED_IN:
        return t.isOnline;
      case st.API_TOKEN:
        return t.hasAPIToken;
      case st.MOBILE_APP_RIGHTS:
        return t.hasMobileAppRights;
      case st.PROJECT_OWNERS:
        return t.isProjectOwner;
      case st.CDIS:
        return t.isCdisUser;
      case st.TABLE_BASED:
        return t.isTableUser;
      case st.LDAP:
        return t.isLdapUser;
      case st.INTERVAL_PAST_WEEK:
        return t.wasActivePastWeek;
      case st.INTERVAL_PAST_MONTH:
        return t.wasActivePastMonth;
      case st.INTERVAL_PAST_3_MONTHS:
        return t.wasActivePast3Months;
      case st.INTERVAL_PAST_6_MONTHS:
        return t.wasActivePast6Months;
      case st.INTERVAL_PAST_12_MONTHS:
        return t.wasActivePast12Months;
      default:
        return !1;
    }
  }
  serialize() {
    return JSON.stringify({
      ...this,
      __proto__: Object.getPrototypeOf(this)
    });
  }
  static deserialize(t) {
    const n = new ec([], []);
    let s = JSON.parse(t);
    return Object.setPrototypeOf(s, Object.getPrototypeOf(n)), s;
  }
  static fromJSON(t) {
    return new this(t.users, t.groups);
  }
}
const zA = () => {
  const e = wt({
    loading: !1,
    groups: [],
    users: [],
    selectedUsers: [],
    // IDs of selected users
    metadata: {},
    query: "",
    get filterDisabled() {
      return this.query == "" && this.groups.length == 0;
    },
    sync({ data: o, metadata: a }) {
      this.metadata = { ...a }, this.groups = [...o.groups], this.users = [...o.users], this.selectedUsers = [...o.selectedIDs], this.query = a.query ?? "";
    },
    loadData(o) {
      const { data: a } = o;
      n(a);
    },
    setQuery(o) {
    },
    async doAction(o, a = [], r = !0) {
      if (this.loading && r) {
        console.log(
          `cannot run ${o} because another process is running`
        );
        return;
      }
      try {
        this.loading = !0;
        const i = await s(o, a), { data: l, metadata: c } = i;
        r && this.sync({ data: l, metadata: c });
      } catch (i) {
        console.log(i);
      } finally {
        this.loading = !1;
      }
    }
  });
  let t = new ec();
  const n = (o) => {
    t.setUsers(o), t.updateState(), e.sync(t.state);
  }, s = (o, a = []) => new Promise((r, i) => {
    if (!t) {
      let f = "UsersManager service not available";
      return console.log(f), i(f);
    }
    let l = !1;
    switch (o) {
      case "includeUser":
        t.includeUser(...a);
        break;
      case "excludeUser":
        t.excludeUser(...a);
        break;
      case "toggleGroup":
        t.toggleGroup(...a);
        break;
      case "selectGroups":
        t.selectGroups(...a);
        break;
      case "deselectGroups":
        t.deselectGroups(...a);
        break;
      case "toggleSuspended":
        t.toggleSuspended(...a);
        break;
      case "selectAll":
        t.selectAll(...a);
        break;
      case "selectFiltered":
        t.selectFiltered(...a);
        break;
      case "setPage":
        t.setPage(...a);
        break;
      case "setPerPage":
        t.setPerPage(...a);
        break;
      case "setQuery":
        t.setPage(1), t.setQuery(...a);
        break;
      default:
        l = !0;
        break;
    }
    if (l === !0) {
      let f = `method ${o} not available`;
      return i(f);
    }
    t.updateState();
    let c = t.state;
    setTimeout(() => {
      r(c);
    }, 0);
  });
  return e;
}, lh = Bt("form", YA), Ii = Bt("settings", WA), Zs = Bt("users", zA);
const KA = {
  __name: "DynamicVariables",
  emits: ["variable-selected"],
  setup(e, { emit: t }) {
    const n = Ii(), s = k(() => n.variables);
    function o(a, r) {
      t("variable-selected", r), a();
    }
    return (a, r) => {
      const i = Te("b-dropdown-item"), l = Te("b-dropdown");
      return b(), Ce(l, {
        size: "sm",
        "data-prevent-close": "",
        variant: "outline-primary"
      }, {
        button: K(() => [
          ve("Insert a dynamic variable")
        ]),
        default: K(({ close: c }) => [
          (b(!0), E(ne, null, Ae(s.value, (f, d) => (b(), Ce(i, {
            key: `group-${f}`,
            class: "submenu"
          }, {
            default: K(() => [
              T(l, {
                size: "sm",
                variant: "transparent"
              }, {
                button: K(() => [
                  ve(j(d), 1)
                ]),
                default: K(() => [
                  (b(!0), E(ne, null, Ae(f, (h, p) => (b(), Ce(i, {
                    key: `${d}-${p}`,
                    onClick: (m) => o(c, p)
                  }, {
                    default: K(() => [
                      u("span", null, j(h), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))), 128))
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 1
      });
    };
  }
}, JA = /* @__PURE__ */ Se(KA, [["__scopeId", "data-v-e861dce1"]]);
const XA = { class: "border p-2" }, QA = {
  __name: "MessageTextArea",
  setup(e) {
    const t = lh(), n = te(), s = te(0);
    function o() {
      var d;
      s.value = ((d = n.value) == null ? void 0 : d.selectionStart) ?? 0;
    }
    const a = k({
      get() {
        return t.message;
      },
      set(d) {
        t.message = d;
      }
    });
    function r(d) {
      var p;
      const h = (p = d == null ? void 0 : d.target) == null ? void 0 : p.value;
      if (h == null)
        throw new Error("Error getting the message value");
      a.value = h;
    }
    function i(d, h, p) {
      return p < 0 ? h + d : p > d.length ? d + h : d.slice(0, p) + h + d.slice(p);
    }
    function l(d) {
      const h = `[${d}]`, p = c();
      if (p) {
        p == null || p.insertContent(h);
        const m = p.getContent();
        a.value = m;
      } else {
        const m = s.value, _ = (a == null ? void 0 : a.value) ?? "", y = i(
          _,
          h,
          m
        );
        a.value = y;
      }
    }
    const c = () => {
      var h;
      return (h = window == null ? void 0 : window.tinymce) == null ? void 0 : h.activeEditor;
    };
    let f = {};
    return dn(() => {
      typeof window.initTinyMCEglobal == "function" && window.initTinyMCEglobal("vue-mceditor", !1);
    }), Kr(() => {
      var d;
      (d = f == null ? void 0 : f.controller) == null || d.abort();
    }), (d, h) => (b(), E("div", null, [
      L(u("textarea", {
        ref_key: "textAreaRef",
        ref: n,
        name: "emailMessage",
        class: "x-form-textarea x-form-field vue-mceditor w-100",
        onInput: r,
        "onUpdate:modelValue": h[0] || (h[0] = (p) => a.value = p),
        onBlur: o
      }, null, 544), [
        [Ke, a.value]
      ]),
      u("div", XA, [
        T(JA, { onVariableSelected: l })
      ])
    ]));
  }
}, ZA = /* @__PURE__ */ Se(QA, [["__scopeId", "data-v-02443e91"]]);
const qA = { class: "email-attributes mb-2" }, eR = { class: "label" }, tR = { class: "label" }, nR = ["placeholder"], sR = { class: "label" }, oR = {
  __name: "ComposeEmailPanel",
  setup(e) {
    const t = lh(), n = Ii(), s = k(() => {
      var l;
      return ((l = n == null ? void 0 : n.user) == null ? void 0 : l.emails) || [];
    }), o = k({
      get() {
        return t.from;
      },
      set(l) {
        t.from = l;
      }
    }), a = k({
      get() {
        return t.subject;
      },
      set(l) {
        t.subject = l;
      }
    });
    k({
      get() {
        return t.message;
      },
      set(l) {
        t.message = l;
      }
    }), Xt(
      s,
      (l) => {
        l.length != 0 && (o.value = l[0]);
      },
      { immediate: !0 }
    );
    function r(l) {
      o.value = l;
    }
    function i() {
      typeof window.setUpAdditionalEmails == "function" && window.setUpAdditionalEmails();
    }
    return (l, c) => {
      var d, h;
      const f = Te("tt-text");
      return b(), E(ne, null, [
        u("div", qA, [
          u("div", null, [
            u("span", eR, [
              T(f, { tkey: "email_users_108" })
            ])
          ]),
          u("div", null, [
            T(G(eu), {
              "dropdown-email": "",
              variant: "outline-secondary"
            }, {
              button: K(() => [
                u("span", null, j(o.value), 1)
              ]),
              default: K(() => [
                (b(!0), E(ne, null, Ae(s.value, (p, m) => (b(), Ce(G(Br), {
                  key: m,
                  onClick: (_) => r(p),
                  active: p == o.value
                }, {
                  default: K(() => [
                    ve(j(p), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick", "active"]))), 128)),
                s.value.length < 3 ? (b(), E(ne, { key: 0 }, [
                  T(G(N2)),
                  T(G(Br), { onClick: i }, {
                    default: K(() => [
                      T(f, { tkey: "email_users_132" })
                    ]),
                    _: 1
                  })
                ], 64)) : me("", !0)
              ]),
              _: 1
            })
          ]),
          u("div", null, [
            u("span", tR, [
              T(f, { tkey: "email_users_109" })
            ])
          ]),
          u("input", {
            type: "text",
            class: "form-control",
            placeholder: `[${(h = (d = G(n)) == null ? void 0 : d.lang) == null ? void 0 : h.email_users_09}]`,
            disabled: ""
          }, null, 8, nR),
          u("div", null, [
            u("span", sR, [
              T(f, { tkey: "email_users_10" })
            ])
          ]),
          L(u("input", {
            type: "text",
            class: "form-control",
            "onUpdate:modelValue": c[0] || (c[0] = (p) => a.value = p)
          }, null, 512), [
            [Ke, a.value]
          ])
        ]),
        u("div", null, [
          T(ZA)
        ])
      ], 64);
    };
  }
}, rR = /* @__PURE__ */ Se(oR, [["__scopeId", "data-v-126f0c43"]]);
const aR = ["disabled"], iR = { class: "group-metadata" }, lR = {
  __name: "UsersButtonGroup",
  props: {
    group: { type: String }
  },
  setup(e) {
    const t = e, n = Zs(), { group: s } = $t(t), o = k(() => {
      var d;
      return (d = n.metadata.groups) == null ? void 0 : d[s.value];
    }), a = k(() => {
      var d;
      return (d = o.value) == null ? void 0 : d.total;
    }), r = k(() => {
      var d;
      return (d = o.value) == null ? void 0 : d.selected;
    }), i = k(() => {
      var d;
      return (((d = o.value) == null ? void 0 : d.total) ?? 0) <= 0;
    }), l = k(() => n.groups), c = k(() => {
      var d, h, p;
      return {
        active: l.value.includes(s.value),
        indeterminate: ((d = o.value) == null ? void 0 : d.selected) > 0 && ((h = o.value) == null ? void 0 : h.selected) != ((p = o.value) == null ? void 0 : p.total)
      };
    });
    function f() {
      n.doAction("toggleGroup", [s.value]);
    }
    return (d, h) => (b(), E("button", {
      class: Ne(["btn btn-sm btn-outline-primary", c.value]),
      disabled: i.value,
      onClick: f
    }, [
      we(d.$slots, "default", {}, void 0, !0),
      u("span", iR, [
        u("span", null, j(r.value), 1),
        ve("/ "),
        u("span", null, j(a.value), 1)
      ])
    ], 10, aR));
  }
}, wn = /* @__PURE__ */ Se(lR, [["__scopeId", "data-v-7b4fd981"]]);
const Pi = (e) => (Ze("data-v-cf5ff5f2"), e = e(), qe(), e), cR = { class: "border rounded p-2" }, uR = { class: "button-grid" }, dR = { class: "state" }, fR = { class: "button-group" }, hR = /* @__PURE__ */ Pi(() => /* @__PURE__ */ u("sup", null, " *", -1)), pR = /* @__PURE__ */ Pi(() => /* @__PURE__ */ u("sup", null, " *", -1)), mR = { class: "feature" }, _R = { class: "font-weight-bold" }, vR = { class: "button-group" }, gR = /* @__PURE__ */ Pi(() => /* @__PURE__ */ u("sup", null, "**", -1)), yR = { class: "auth-type" }, bR = { class: "font-weight-bold" }, wR = { class: "button-group" }, ER = { class: "activity" }, SR = { class: "font-weight-bold" }, xR = { class: "button-group" }, $R = { class: "mt-2 notes-descriptions font-italic small text-muted text-end" }, CR = /* @__PURE__ */ Pi(() => /* @__PURE__ */ u("span", null, "*", -1)), OR = /* @__PURE__ */ Pi(() => /* @__PURE__ */ u("span", null, "**", -1)), kR = {
  __name: "UsersButtonGroups",
  setup(e) {
    return (t, n) => {
      const s = Te("tt-text");
      return b(), E("div", cR, [
        u("h5", null, [
          T(s, { tkey: "email_users_103" })
        ]),
        u("div", uR, [
          u("div", dR, [
            u("div", fR, [
              T(wn, {
                group: G(st).ACTIVE
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_19" }),
                  hR
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).NON_ACTIVE
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_20" }),
                  pR
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).LOGGED_IN
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_34" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          u("div", mR, [
            u("span", _R, [
              T(s, { tkey: "email_users_104" }),
              ve(":")
            ]),
            u("div", vR, [
              T(wn, {
                group: G(st).API_TOKEN
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_116" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).MOBILE_APP_RIGHTS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_117" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).PROJECT_OWNERS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_118" }),
                  ve(),
                  gR
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).CDIS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_119" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          u("div", yR, [
            u("span", bR, [
              T(s, { tkey: "email_users_105" }),
              ve(":")
            ]),
            u("div", wR, [
              T(wn, {
                group: G(st).TABLE_BASED
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_31" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).LDAP
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_32" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          u("div", ER, [
            u("span", SR, [
              T(s, { tkey: "email_users_106" }),
              ve(":")
            ]),
            u("div", xR, [
              T(wn, {
                group: G(st).INTERVAL_PAST_WEEK
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_107" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).INTERVAL_PAST_MONTH
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_24" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).INTERVAL_PAST_3_MONTHS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_27" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).INTERVAL_PAST_6_MONTHS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_25" })
                ]),
                _: 1
              }, 8, ["group"]),
              T(wn, {
                group: G(st).INTERVAL_PAST_12_MONTHS
              }, {
                default: K(() => [
                  T(s, { tkey: "email_users_26" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ])
        ]),
        u("ul", $R, [
          u("li", null, [
            CR,
            ve(),
            T(s, { tkey: "email_users_30" })
          ]),
          u("li", null, [
            OR,
            ve(),
            T(s, { tkey: "email_users_102" })
          ])
        ])
      ]);
    };
  }
}, TR = /* @__PURE__ */ Se(kR, [["__scopeId", "data-v-cf5ff5f2"]]), NR = { class: "d-flex justify-content-start align-items-center small fst-italic" }, DR = { class: "font-weigth-bold" }, AR = /* @__PURE__ */ u("div", { class: "vr mx-2" }, null, -1), RR = { class: "font-weigth-bold" }, IR = {
  __name: "UsersMetadata",
  setup(e) {
    const t = Zs(), n = k(() => t.metadata);
    return (s, o) => {
      const a = Te("tt-text");
      return b(), E("div", NR, [
        u("span", null, [
          T(a, { tkey: "email_users_110" }),
          ve(" ("),
          T(a, { tkey: "email_users_133" }),
          ve("): "),
          u("span", DR, j(n.value.selectedTotal) + "/" + j(n.value.total), 1)
        ]),
        n.value.isFilterActive ? (b(), E(ne, { key: 0 }, [
          AR,
          u("span", null, [
            T(a, { tkey: "email_users_110" }),
            ve(" ("),
            T(a, { tkey: "email_users_134" }),
            ve("): "),
            u("span", RR, j(n.value.filteredTotal) + "/" + j(n.value.totalFiltered), 1)
          ])
        ], 64)) : me("", !0)
      ]);
    };
  }
};
const ch = (e) => (Ze("data-v-45b5c1e1"), e = e(), qe(), e), PR = { class: "table table-bordered table-striped my-2" }, MR = { class: "check-all-button-container d-flex flex-column justify-content-start align-items-start" }, LR = {
  key: 0,
  class: "form-check form-switch"
}, VR = ["indeterminate"], FR = /* @__PURE__ */ ch(() => /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "selectAllSwitch"
}, "Toggle All", -1)), UR = {
  key: 1,
  class: "form-check form-switch"
}, jR = ["indeterminate"], HR = /* @__PURE__ */ ch(() => /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "selectFilteredSwitch"
}, "Toggle Filtered", -1)), BR = ["onClick"], YR = { class: "form-check form-switch" }, WR = ["value", "checked", "disabled"], GR = {
  key: 0,
  class: "text-success ms-2"
}, zR = /* @__PURE__ */ ch(() => /* @__PURE__ */ u("i", { class: "fa-solid fa-circle fa-2xs" }, null, -1)), KR = [
  zR
], JR = {
  key: 0,
  class: "font-italic"
}, XR = { key: 1 }, QR = {
  __name: "UsersTable",
  setup(e) {
    const t = Zs(), n = k(() => t.users), s = k(() => t.metadata), o = k(() => t.selectedUsers), a = k(() => {
      var m, _;
      const h = ((m = s.value) == null ? void 0 : m.selectedTotal) ?? 0, p = ((_ = s.value) == null ? void 0 : _.validTotal) ?? 0;
      return h === 0 ? !1 : h != p;
    }), r = k(() => {
      var m, _;
      const h = ((m = s.value) == null ? void 0 : m.selectedTotal) ?? 0, p = ((_ = s.value) == null ? void 0 : _.totalFiltered) ?? 0;
      return h === 0 ? !1 : h != p;
    }), i = k({
      get() {
        return s.value.validTotal == s.value.selectedTotal;
      },
      set(h) {
        t.doAction("selectAll", [h]);
      }
    }), l = k({
      get() {
        return s.value.totalFiltered == s.value.selectedTotal;
      },
      set(h) {
        t.doAction("selectFiltered", [h]);
      }
    }), c = k(() => t.filterDisabled);
    function f(h) {
      return o.value.includes(h.ui_id);
    }
    function d(h) {
      if (h = Ue(h), h.isSuspended) {
        alert("this user is suspended and cannot be selected");
        return;
      }
      f(h) ? t.doAction("excludeUser", [h]) : t.doAction("includeUser", [h]);
    }
    return (h, p) => {
      const m = Te("tt-text");
      return b(), E("table", PR, [
        u("thead", null, [
          u("tr", null, [
            u("th", null, [
              u("div", MR, [
                c.value ? (b(), E("div", LR, [
                  L(u("input", {
                    class: "form-check-input",
                    id: "selectAllSwitch",
                    type: "checkbox",
                    value: !0,
                    "onUpdate:modelValue": p[0] || (p[0] = (_) => i.value = _),
                    disabled: !1,
                    indeterminate: a.value
                  }, null, 8, VR), [
                    [Wt, i.value]
                  ]),
                  FR
                ])) : (b(), E("div", UR, [
                  L(u("input", {
                    class: "form-check-input",
                    id: "selectFilteredSwitch",
                    type: "checkbox",
                    value: !0,
                    "onUpdate:modelValue": p[1] || (p[1] = (_) => l.value = _),
                    disabled: !1,
                    indeterminate: r.value
                  }, null, 8, jR), [
                    [Wt, l.value]
                  ]),
                  HR
                ]))
              ])
            ]),
            u("th", null, [
              T(m, { tkey: "email_users_120" })
            ]),
            u("th", null, [
              T(m, { tkey: "email_users_121" })
            ]),
            u("th", null, [
              T(m, { tkey: "email_users_122" })
            ])
          ])
        ]),
        u("tbody", null, [
          (b(!0), E(ne, null, Ae(n.value, (_, y) => (b(), E("tr", {
            key: `user-${y}`,
            class: Ne({ suspended: _.isSuspended }),
            onClick: (g) => d(_)
          }, [
            u("td", null, [
              u("div", YR, [
                u("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: _.ui_id,
                  checked: f(_),
                  disabled: _.isSuspended,
                  onClick: p[2] || (p[2] = kt(() => {
                  }, ["prevent"]))
                }, null, 8, WR)
              ])
            ]),
            u("td", null, [
              u("span", null, j(_.username), 1),
              _.isOnline == !0 ? (b(), E("span", GR, KR)) : me("", !0)
            ]),
            u("td", null, [
              u("span", null, j(`${_.user_firstname} ${_.user_lastname}`), 1)
            ]),
            u("td", null, [
              _.isSuspended ? (b(), E("span", JR, "user suspended")) : (b(), E("span", XR, j(_.user_email), 1))
            ])
          ], 10, BR))), 128))
        ])
      ]);
    };
  }
}, ZR = /* @__PURE__ */ Se(QR, [["__scopeId", "data-v-45b5c1e1"]]), qR = {
  __name: "UsersSearchField",
  setup(e) {
    const t = Zs(), s = function(a, r = 300) {
      let i = {};
      return (...l) => {
        i[a] && clearTimeout(i[a]), i[a] = setTimeout(() => {
          a.apply(this, l);
        }, r);
      };
    }((a) => {
      t.doAction("setQuery", [a]);
    }, 300), o = k({
      get() {
        return t.query;
      },
      set(a) {
        s(a);
      }
    });
    return (a, r) => (b(), E("div", null, [
      L(u("input", {
        type: "search",
        class: "form-control form-control-sm",
        placeholder: "Search...",
        "onUpdate:modelValue": r[0] || (r[0] = (i) => o.value = i)
      }, null, 512), [
        [Ke, o.value]
      ])
    ]));
  }
}, Zp = {
  __name: "UsersPagination",
  setup(e) {
    const t = Zs(), n = k({
      get() {
        return t.metadata.page;
      },
      set(a) {
        t.doAction("setPage", [a]);
      }
    }), s = k({
      get() {
        return t.metadata.perPage;
      },
      set(a) {
        t.doAction("setPerPage", [a]);
      }
    }), o = k({
      get() {
        return t.metadata.totalFiltered;
      },
      set(a) {
      }
    });
    return (a, r) => (b(), Ce(jd, {
      "per-page": s.value,
      "total-items": o.value,
      modelValue: n.value,
      "onUpdate:modelValue": r[0] || (r[0] = (i) => n.value = i),
      size: "sm"
    }, null, 8, ["per-page", "total-items", "modelValue"]));
  }
}, eI = { class: "text-nowrap" }, tI = {
  __name: "UsersPerPageDropdown",
  setup(e) {
    const t = Zs(), n = te([25, 50, 100, 500]), s = k({
      get() {
        return t.metadata.perPage;
      },
      set(o) {
        t.doAction("setPerPage", [o]);
      }
    });
    return (o, a) => {
      const r = Te("tt-text");
      return b(), Ce(G(eu), { variant: "outline-secondary" }, {
        button: K(() => [
          u("span", eI, [
            T(r, { tkey: "email_users_123" }),
            ve(": " + j(s.value), 1)
          ])
        ]),
        default: K(() => [
          (b(!0), E(ne, null, Ae(n.value, (i, l) => (b(), Ce(G(Br), {
            key: l,
            onClick: (c) => s.value = i,
            active: i == s.value
          }, {
            default: K(() => [
              u("span", null, j(i), 1)
            ]),
            _: 2
          }, 1032, ["onClick", "active"]))), 128))
        ]),
        _: 1
      });
    };
  }
};
const nI = { class: "text-nowrap" }, sI = ["disabled"], oI = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, rI = {
  key: 1,
  class: "fas fa-envelope fa-fw"
}, aI = { class: "ms-2" }, iI = { class: "font-weight-bold" }, lI = { class: "confirmation-data" }, cI = { class: "data-label" }, uI = { class: "data-value" }, dI = { class: "data-label" }, fI = { class: "data-value" }, hI = { class: "data-label" }, pI = { class: "data-value" }, mI = { class: "data-label" }, _I = { class: "card" }, vI = ["innerHTML"], gI = {
  __name: "SendEmailsButton",
  setup(e) {
    const t = Zs(), n = lh(), s = Ii(), o = (p) => s.translate(p), a = te(), r = k(() => {
      const p = n.from, m = n.subject, _ = n.message, y = [...t.selectedUsers];
      return { from: p, subject: m, message: _, ui_ids: y };
    }), i = k({
      get() {
        return n.sending;
      },
      set(p) {
        n.sending = p;
      }
    }), l = k(() => {
      const p = [], {
        from: m = "",
        subject: _ = "",
        message: y = "",
        ui_ids: g = []
      } = r.value;
      return m.trim() === "" && p.push("a 'from' email must be selected"), _.trim() === "" && p.push("subject cannot be empty"), y.trim() === "" && p.push("message cannot be empty"), g.length == 0 && p.push("you must select at least 1 recipient"), p;
    }), c = k(() => l.value.length > 0 || i.value);
    async function f() {
      await a.value.show() === !0 && d();
    }
    async function d() {
      var p, m;
      try {
        i.value = !0;
        const _ = { ...r.value };
        await $l.scheduleEmails(_);
        const y = o("email_users_127") || "Success", g = o("email_users_128") || "Emails scheduled. You can leave this page.", v = { title: y, body: g }, S = await us.alert(v);
        h();
      } catch (_) {
        const y = o("email_users_126") || "Error", g = ((m = (p = _ == null ? void 0 : _.response) == null ? void 0 : p.data) == null ? void 0 : m.message) || "There was an error scheduling your emails.";
        us.alert({ title: y, body: g });
      } finally {
        i.value = !1;
      }
    }
    async function h() {
      var p, m;
      n.subject = "", n.message = "", (m = (p = window == null ? void 0 : window.tinymce) == null ? void 0 : p.activeEditor) == null || m.setContent(""), await t.doAction("deselectGroups", [Object.values(st)]), await t.doAction("selectAll", [!1]);
    }
    return (p, m) => {
      const _ = Te("tt-text");
      return b(), E("div", null, [
        u("div", nI, [
          u("button", {
            type: "button",
            class: "btn btn-primary btn-sm",
            disabled: c.value,
            onClick: f
          }, [
            i.value ? (b(), E("i", oI)) : (b(), E("i", rI)),
            u("span", aI, [
              T(_, { tkey: "email_users_113" })
            ])
          ], 8, sI)
        ]),
        T(ih, {
          ref_key: "confirmationModal",
          ref: a,
          "ok-text": o("email_users_113")
        }, {
          header: K(() => [
            u("span", iI, [
              T(_, { tkey: "email_users_131" })
            ])
          ]),
          default: K(() => [
            u("div", lI, [
              u("span", cI, [
                T(_, { tkey: "email_users_108" })
              ]),
              u("span", uI, j(r.value.from), 1),
              u("span", dI, [
                T(_, { tkey: "email_users_109" })
              ]),
              u("span", fI, j(r.value.ui_ids.length) + " " + j(r.value.ui_ids.length == 1 ? "user" : "users"), 1),
              u("span", hI, [
                T(_, { tkey: "email_users_10" })
              ]),
              u("span", pI, j(r.value.subject), 1),
              u("span", mI, [
                T(_, { tkey: "email_users_114" })
              ]),
              u("div", _I, [
                u("span", {
                  class: "card-body p-1",
                  innerHTML: r.value.message
                }, null, 8, vI)
              ])
            ])
          ]),
          _: 1
        }, 8, ["ok-text"])
      ]);
    };
  }
}, qp = /* @__PURE__ */ Se(gI, [["__scopeId", "data-v-0a02f745"]]), yI = {
  class: "m-0",
  for: "show-suspended"
}, bI = ["checked", "onClick"], wI = {
  __name: "SuspendedUsersToggler",
  setup(e) {
    const t = Zs(), n = k(() => {
      var o;
      return ((o = t.metadata) == null ? void 0 : o.showSuspended) ?? !1;
    });
    function s() {
      t.doAction("toggleSuspended");
    }
    return (o, a) => {
      const r = Te("tt-text");
      return b(), E("div", null, [
        u("label", yI, [
          T(r, { tkey: "email_users_111" })
        ]),
        u("input", {
          class: "ms-2",
          id: "show-suspended",
          type: "checkbox",
          value: !0,
          checked: n.value,
          onClick: kt(s, ["prevent"])
        }, null, 8, bI)
      ]);
    };
  }
}, EI = { class: "d-flex my-2 align-items-center" }, SI = { class: "d-flex gap-2 align-items-center" }, xI = { class: "me-auto" }, $I = { class: "d-flex gap-2 align-items-center" }, CI = { class: "d-flex gap-2" }, OI = {
  __name: "UsersPanel",
  setup(e) {
    return (t, n) => (b(), E(ne, null, [
      T(TR),
      u("div", EI, [
        T(qp, { class: "ms-auto" })
      ]),
      u("div", SI, [
        u("div", xI, [
          T(Zp)
        ]),
        T(tI),
        T(qR)
      ]),
      u("div", $I, [
        T(wI, { class: "my-2" }),
        T(IR, { class: "ms-auto" })
      ]),
      T(ZR),
      u("div", CI, [
        T(Zp, { class: "me-auto" }),
        T(qp)
      ])
    ], 64));
  }
}, kI = {
  key: 0,
  class: "p-2"
}, TI = /* @__PURE__ */ u("i", { class: "fa fa-spinner fa-spin" }, null, -1), NI = { class: "ms-2" }, DI = { key: 1 }, AI = { class: "mt-2" }, RI = {
  __name: "App",
  setup(e) {
    const t = Ii(), n = Zs(), s = te(!1), o = te("");
    async function a() {
      const i = await $l.getUsers(0, 0);
      let { count: l = 0 } = (i == null ? void 0 : i.metadata) ?? {}, c = 1, f = 1e3, d = Math.ceil(l / f);
      const h = {
        data: []
      };
      for (; c != null; ) {
        o.value = `users (${c}/${d})`;
        const p = await $l.getUsers(c, f), { data: m, metadata: _ } = p;
        h.data = [...h.data, ...m];
        const { next_page: y } = _;
        c = y;
      }
      return h;
    }
    async function r() {
      try {
        s.value = !0, o.value = "settings";
        const l = await $l.getSettings();
        await t.loadData(l);
        const c = await a();
        await n.loadData(c);
      } catch (i) {
        console.log(i);
      } finally {
        s.value = !1;
      }
    }
    return wf(() => {
      r();
    }), (i, l) => s.value ? (b(), E("div", kI, [
      TI,
      u("span", NI, "Loading " + j(o.value), 1)
    ])) : (b(), E("div", DI, [
      T(rR),
      u("div", AI, [
        T(OI)
      ])
    ]));
  }
}, II = ["innerHTML"], PI = {
  __name: "LocalizedText",
  props: {
    tkey: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = Ii(), s = k(() => {
      const o = n.translate(t.tkey);
      return o || "-- no translation found --";
    });
    return (o, a) => (b(), E("span", { innerHTML: s.value }, null, 8, II));
  }
}, Xz = (e) => {
  const t = Un(RI);
  return t.use(Io()), t.use(Qs), t.component("tt-text", PI), t.mount(e), t;
};
let MI = Ti();
const Mo = Ni(MI, ["pid", "request_id"], { timeout: 0 }), LI = async () => {
  const e = {
    params: {
      route: "DataMartController:getSettings"
    }
  };
  return Mo.get("", e);
}, VI = async (e, t = 0, n = 10) => {
  if (typeof e != "string" && !(e instanceof String))
    return;
  const s = {
    params: {
      route: "DataMartController:searchMrns",
      query: e,
      start: t,
      limit: n
    }
  };
  return Mo.get("", s);
}, FI = async (e) => {
  var t = new FormData();
  t.append("files[]", e);
  const n = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    params: {
      route: "DataMartController:importRevision"
    }
  };
  return Mo.post("", t, n);
}, UI = async (e) => {
  const t = {
    params: {
      route: "DataMartController:deleteRevision"
    },
    data: {
      revision_id: e
    }
  };
  return Mo.delete("", t);
}, Wg = async (e, t, n = {}) => {
  n = {
    ...n,
    params: {
      route: "DataMartController:runRevision"
    }
  };
  const s = { revision_id: e, mrn: t };
  return Mo.post("", s, n);
}, jI = async (e, t, n = !1) => {
  const s = {
    params: {
      route: "DataMartController:scheduleRevision"
    }
  }, o = { revision_id: e, mrn_list: t, send_feedback: n };
  return Mo.post("", o, s);
}, HI = async (e, t, n, s, o = [], a = null) => {
  const r = {
    params: {
      route: "DataMartController:addRevision",
      request_id: a
    }
  }, i = {
    mrns: o,
    fields: e,
    date_min: t,
    date_max: n,
    date_range_categories: s,
    request_id: a
  };
  return Mo.post("", i, r);
}, BI = async (e) => {
  const t = {
    params: {
      route: "DataMartController:approveRevision"
    }
  }, n = { revision_id: e };
  return Mo.post("", n, t);
}, YI = () => new AbortController(), WI = () => {
  const e = Mi(), t = Li(), n = xs();
  return wt({
    ready: !1,
    // set to true after first time the settings are loaded
    loading: !1,
    error: null,
    async init() {
      try {
        this.loading = !0, await this.loadSettings(), this.ready = !0;
      } catch (o) {
        this.error = Gs(o);
      } finally {
        this.loading = !1;
      }
    },
    async loadSettings() {
      const o = (f, d) => {
        for (const [h, p] of Object.entries(f))
          h in d && (d[h] = p);
      }, a = await LI(), { app_settings: r, fhir_metadata: i, revisions: l, user: c } = a.data;
      o(r, t), t.fhirMetadata = i, o(c, e), n.setList(l);
    }
  });
}, GI = () => wt({
  id: "",
  can_create_revision: !1,
  can_repeat_revision: !1,
  can_use_datamart: !1,
  can_use_mapping_helper: !1,
  has_valid_access_token: !1,
  super_user: !1,
  user_email: "",
  user_firstname: "",
  user_lastname: "",
  username: "",
  get canCreateRevision() {
    return !!this.can_create_revision;
  },
  get canRepeatRevision() {
    return !!this.can_repeat_revision;
  },
  get canUseDatamart() {
    return !!this.can_use_datamart;
  },
  get hasValidAccessToken() {
    return !!this.has_valid_access_token;
  },
  get isSuperUser() {
    return !!this.super_user;
  },
  canRunRevision(e) {
    const { metadata: t } = e;
    if (!t)
      return !1;
    const {
      approved: n = !1,
      date: s = "",
      executed: o = !1,
      executed_at: a = "",
      id: r = "",
      request_id: i = null,
      request_status: l = null,
      total_fetchable_mrns: c = 0,
      total_non_fetched_mrns: f = 0,
      total_project_mrns: d = 0
    } = t;
    return !(c <= 0 || !n || !this.canRepeatRevision && o);
  }
});
async function* zI(e, t, n, s) {
  var a;
  e.totalMRNs = n.length;
  const o = (a = t == null ? void 0 : t.metadata) == null ? void 0 : a.id;
  for (const r of n) {
    e.currentMRN = r;
    const i = await Wg(o, e.currentMRN, {
      signal: s
    }), { data: l } = i;
    yield { data: l, mrn: e.currentMRN };
  }
}
async function* KI(e, t, n) {
  var o, a, r;
  if (e.totalMRNs = ((o = t == null ? void 0 : t.metadata) == null ? void 0 : o.total_fetchable_mrns) ?? 0, e.totalMRNs < 1)
    return;
  const s = (a = t == null ? void 0 : t.metadata) == null ? void 0 : a.id;
  do {
    const i = await Wg(s, e.currentMRN, {
      signal: n
    }), { data: l } = i;
    yield { data: l, mrn: e.currentMRN }, e.currentMRN = (r = l == null ? void 0 : l.metadata) == null ? void 0 : r.next_mrn;
  } while (e.currentMRN);
}
const em = () => ({
  processing: !1,
  abortController: null,
  aborted: !1,
  currentMRN: null,
  totalMRNs: 0,
  success: [],
  // successfully processed MRNs
  errors: {},
  // errors accumulator (MRN => errors)
  results: [],
  // response accumulator
  stats: {}
  // stats accumulator (category => total)
}), JI = () => wt({
  ...em(),
  processing: !1,
  get totalProcessed() {
    return this.results.length;
  },
  reset() {
    const e = em();
    for (const [t, n] of Object.entries(e))
      this[t] = n;
  },
  async run(e, t = []) {
    try {
      this.reset(), this.processing = !0, this.abortController = YI();
      const n = this.abortController.signal, s = (t == null ? void 0 : t.length) > 0 ? zI(this, e, t, n) : KI(this, e, n);
      for await (const { data: o, mrn: a } of s) {
        if (this.aborted)
          break;
        this.processResponse(a, o);
      }
    } catch (n) {
      return console.log(n), n;
    } finally {
      this.processing = !1;
    }
  },
  stop() {
    this.aborted = !0, this.abortController && this.abortController.abort();
  },
  async schedule(e, t = [], n = !1) {
    var o;
    const s = (o = e == null ? void 0 : e.metadata) == null ? void 0 : o.id;
    return jI(s, t, n);
  },
  /**
   * the first iteration of the datamart does not have an MRN
   * only process the response if we have an associated MRN
   */
  processResponse(e, t) {
    var o;
    if (!e)
      return;
    this.results.push(t);
    const n = ((o = t == null ? void 0 : t.metadata) == null ? void 0 : o.stats) ?? {};
    for (const [a, r] of Object.entries(n))
      a in this.stats || (this.stats[a] = 0), this.stats[a] += r;
    const s = (t == null ? void 0 : t.errors) ?? [];
    s.length > 0 ? this.errors[e] = s : this.success.push(this.currentMRN);
  }
}), XI = () => wt({
  ehr_system_name: "",
  lang: {},
  mapping_helper_url: "",
  project_id: 0,
  // standalone_authentication_flow: '',
  // standalone_launch_enabled: true,
  standalone_launch_url: "",
  user: {
    id: "",
    username: "",
    user_email: "",
    user_firstname: ""
  },
  date_range_categories: [],
  fhirMetadata: {}
}), QI = () => wt({
  list: [],
  selected: null,
  edited: null,
  get active() {
    return this.list.length === 0 ? null : this.list[0];
  },
  get approved() {
    return this.selected ? this.isApproved(this.selected) : !1;
  },
  setList(e) {
    const t = [...e].reverse();
    this.list = [...t], this.selected = this.list[0] ?? null;
  },
  getIndex(e) {
    var s;
    const t = this.list.indexOf(e);
    return (((s = this.list) == null ? void 0 : s.length) ?? 0) - t;
  },
  isApproved(e) {
    const t = e == null ? void 0 : e.metadata;
    return t == null || t.request_id, !!(t == null ? void 0 : t.approved);
  }
});
let Jt = class {
  constructor(t = {}) {
    pe(this, "name");
    pe(this, "parent", null);
    pe(this, "metadata");
    pe(this, "selected", !1);
    this.name = t == null ? void 0 : t.field, this.metadata = t;
  }
  setParent(t) {
    this.parent = t;
  }
};
function* Bd(e, t) {
  if (typeof t != "function")
    return;
  const n = t(e);
  for (const s of n)
    yield s, s instanceof Gt && (yield* Bd(s, t));
}
class Gt {
  constructor(t = "") {
    pe(this, "name");
    pe(this, "parent", null);
    pe(this, "children", []);
    pe(this, "query", "");
    pe(this, "_filtered", /* @__PURE__ */ new Set());
    pe(this, "_nodes", /* @__PURE__ */ new Set());
    // keep track of any node
    pe(this, "_containers", /* @__PURE__ */ new Set());
    // keep track of any container
    pe(this, "applyDateRange", !1);
    this.name = t;
  }
  get filtered() {
    return this.query === "" ? this.children : Array.from(this._filtered);
  }
  get totalFiltered() {
    let t = 0;
    for (const n of this.filtered)
      n instanceof Jt ? t++ : t += n.totalFiltered;
    return t;
  }
  get totalFilteredSelected() {
    let t = 0;
    for (const n of this.filtered)
      n instanceof Jt && n.selected ? t++ : n instanceof Gt && (t += n.totalFilteredSelected);
    return t;
  }
  get total() {
    let t = 0;
    for (const n of this.children)
      n instanceof Jt ? t++ : t += n.total;
    return t;
  }
  get totalSelected() {
    let t = 0;
    for (const n of this.children)
      n instanceof Jt && n.selected ? t++ : n instanceof Gt && (t += n.totalSelected);
    return t;
  }
  get nodes() {
    return Array.from(this._nodes);
  }
  get containers() {
    return Array.from(this._containers);
  }
  get filteredNodes() {
    let t = [];
    for (const n of this.filtered)
      n instanceof Jt ? t.push(n) : n instanceof Gt && (t = [...t, ...n.nodes]);
    return t;
  }
  get selectedNodes() {
    let t = [];
    const n = Bd(this, (s) => s.children);
    for (const s of n)
      s instanceof Jt && s.selected && t.push(s);
    return t;
  }
  get filteredSelectedNodes() {
    let t = [];
    const n = Bd(this, (s) => s.children);
    for (const s of n)
      s instanceof Jt && s.selected && t.push(s);
    return t;
  }
  filter(t) {
    this.query = t;
    const n = new RegExp(t, "ig");
    let s = [];
    for (const o of this.children)
      if (o instanceof Jt) {
        const a = /* @__PURE__ */ new Set([
          o.name,
          o.metadata.label,
          o.metadata.description
        ]);
        let r = !1;
        for (const i of Array.from(a))
          if (!(typeof i != "string" && !(i instanceof String)) && i.match(n) !== null) {
            r = !0;
            break;
          }
        if (!r)
          continue;
        s.push(o);
      } else
        o instanceof Gt && (o.filter(t), o.totalFiltered > 0 && s.push(o));
    this._filtered = /* @__PURE__ */ new Set([...s]);
  }
  /**
   * insert an object respecting some rules for proper position
   * @param {Array} array
   * @param {Node|Container} newItem
   * @returns {Array}
   */
  insertItem(t, n) {
    let s = 0;
    for (; s < t.length; ) {
      const o = t[s];
      if (n instanceof Jt && o instanceof Gt)
        break;
      if (n instanceof Gt && o instanceof Jt) {
        s++;
        continue;
      }
      if (n.name < o.name)
        break;
      s++;
    }
    return t.splice(s, 0, n), t;
  }
  /**
   * add a Node|Container to the children
   * @param {Node|Container} node
   */
  addNode(t) {
    t.setParent(this), this.addReferences(t);
    const n = this.insertItem([...this.children], t);
    this.children = n;
  }
  // add a reference to the node in the current instance and its parent container
  addReferences(t) {
    t instanceof Jt ? this._nodes.add(t) : t instanceof Gt && this._containers.add(t), this.parent && this.parent.addReferences(t);
  }
  getNode(t) {
    return this.children.find((s) => s.name === t);
  }
  getContainer(t) {
    return this.children.find(
      (s) => s instanceof Gt && s.name === t
    );
  }
  setParent(t) {
    this.parent = t;
  }
  contains(t) {
    let n = !1;
    for (const s of this.children) {
      if (s instanceof Jt && s.name === t)
        return n = !0, n;
      s instanceof Gt && (n = s.contains(t));
    }
    return n;
  }
  static fromList(t = [], n = {}, s = [], o = []) {
    const a = (i, l) => {
      let c = i.getContainer(l);
      return c || (c = new Gt(l), c.applyDateRange = o.includes(l), i.addNode(c), c);
    }, r = new Gt();
    for (const i of t) {
      const l = n[i];
      if (!l)
        continue;
      let c = r, { category: f = "", subcategory: d = "" } = l;
      f = f.trim(), d = d.trim(), f != "" && (c = a(
        c,
        f
      )), d != "" && (c = a(
        c,
        d
      ));
      const h = new Jt({ ...l });
      h.selected = s.includes(h.name), c.addNode(h);
    }
    return r;
  }
}
const tc = "YYYY-MM-DD", ZI = (e, t, n) => {
  const s = Object.keys(e);
  return s ? Object.keys(e).length === 0 ? [] : (t.includes("id") || t.unshift("id"), Gt.fromList(
    s,
    e,
    t,
    n
  )) : [];
};
function qI(e) {
  return [
    ...new Set(e.filter((t, n) => e.indexOf(t) !== n))
  ];
}
const Pu = (e, t) => {
  const n = (s) => JSON.stringify(s.sort());
  return !Array.isArray(e) || !Array.isArray(t) ? !1 : n(e) === n(t);
}, eP = () => {
  const e = Li(), t = wt({
    current: null,
    // reference to the current revision
    dateMin: "",
    dateMax: "",
    mrns: [],
    date_range_categories: [],
    node: null,
    setRevision(n) {
      const s = (n == null ? void 0 : n.fields) ?? [], o = ae((n == null ? void 0 : n.dateMin) ?? null), a = ae((n == null ? void 0 : n.dateMax) ?? null), r = o.isValid() ? o.format(tc) : "", i = a.isValid() ? a.format(tc) : "", l = Array.isArray(
        n == null ? void 0 : n.date_range_categories
      ) ? n.date_range_categories : [], c = (n == null ? void 0 : n.mrns) ?? [];
      this.current = {
        fields: s,
        dateMin: r,
        dateMax: i,
        mrns: c,
        date_range_categories: l
      };
    },
    get new() {
      var s, o, a, r, i, l, c;
      return {
        mrns: this.mrns,
        dateMin: this.dateMin,
        dateMax: this.dateMax,
        fields: (a = (o = (s = this.node) == null ? void 0 : s.nodes) == null ? void 0 : o.filter((f) => f.selected)) == null ? void 0 : a.map((f) => f.name),
        date_range_categories: (c = (l = (i = (r = this.node) == null ? void 0 : r.containers) == null ? void 0 : i.filter((f) => f.applyDateRange)) == null ? void 0 : l.filter((f) => f.totalSelected > 0)) == null ? void 0 : c.map((f) => f.name)
      };
    },
    get isUpdated() {
      const n = this.current, s = this.new, o = (n == null ? void 0 : n.fields) ?? [], a = (s == null ? void 0 : s.fields) ?? [], r = (s == null ? void 0 : s.mrns) ?? [], i = (s == null ? void 0 : s.mrns) ?? [];
      if (!Pu(o, a) || !Pu(r, i) || n.dateMin !== s.dateMin || n.dateMax !== s.dateMax)
        return !0;
      const l = n.date_range_categories ?? [], c = s.date_range_categories ?? [];
      return !Pu(
        l,
        c
      );
    },
    async submit() {
      try {
        const {
          dateMin: n,
          dateMax: s,
          fields: o,
          date_range_categories: a,
          mrns: r
        } = this.new;
        return await HI(
          o,
          n,
          s,
          a,
          r
        );
      } catch (n) {
        let s = "There was an error submitting the request";
        throw s += Gs(n), console.log(n, s), Error(s);
      }
    },
    validationErrors: [],
    validate() {
      var o, a;
      this.validationErrors = [];
      const n = this.new;
      (o = n == null ? void 0 : n.fields) != null && o.includes("id") || this.validationErrors.push(
        "the 'id' field must be included in every revision"
      ), ((a = n == null ? void 0 : n.fields) == null ? void 0 : a.length) < 2 && this.validationErrors.push(
        "please select at least 1 field beside 'id'"
      );
      const s = qI(n.mrns);
      return (s == null ? void 0 : s.length) > 0 && this.validationErrors.push(
        `duplicate MRNs found: ${s.join(", ")}`
      ), this.validationErrors;
    },
    get isValid() {
      var n;
      return ((n = this.validationErrors) == null ? void 0 : n.length) === 0;
    }
  });
  return tn(() => {
    const n = t == null ? void 0 : t.current, s = (n == null ? void 0 : n.fields) || [], o = (n == null ? void 0 : n.date_range_categories) || [], a = e == null ? void 0 : e.fhirMetadata;
    t.node = ZI(a, s, o), t.dateMin = n == null ? void 0 : n.dateMin, t.dateMax = n == null ? void 0 : n.dateMax;
  }), t;
}, ta = Bt("app", WI), Mi = Bt("user", GI), uh = Bt("process", JI), Li = Bt("settings", XI), xs = Bt("revisions", QI), Vi = Bt("revisionEditor", eP), tP = () => {
  const e = ta(), t = Mi(), n = uh(), s = Li(), o = xs(), a = Vi();
  return {
    app: e,
    user: t,
    process: n,
    settings: s,
    revisions: o,
    revisionEditor: a
  };
}, nP = {
  key: 0,
  class: "alert alert-danger"
}, sP = {
  key: 2,
  class: "alert alert-info my-2"
}, oP = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" }, null, -1), rP = /* @__PURE__ */ u("span", null, "Loading...", -1), aP = [
  oP,
  rP
], iP = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" }, null, -1), lP = /* @__PURE__ */ u("span", null, "Please wait...", -1), cP = {
  __name: "App",
  setup(e) {
    const t = ta(), n = te(), s = k(() => t == null ? void 0 : t.ready), o = k(() => t == null ? void 0 : t.loading), a = k(() => t == null ? void 0 : t.error);
    return dn(() => {
      t.init();
    }), (r, i) => {
      const l = Te("router-view"), c = Te("b-modal");
      return b(), E(ne, null, [
        a.value ? (b(), E("div", nP, [
          u("span", null, j(a.value), 1)
        ])) : me("", !0),
        s.value ? (b(), Ce(l, { key: 1 })) : me("", !0),
        o.value ? (b(), E("div", sP, aP)) : me("", !0),
        T(c, {
          ref_key: "loadingModalRef",
          ref: n,
          title: "Loading"
        }, {
          footer: K(() => []),
          default: K(() => [
            iP,
            lP
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, uP = {};
function dP(e, t) {
  const n = Te("router-view");
  return b(), E("div", null, [
    T(n)
  ]);
}
const fP = /* @__PURE__ */ Se(uP, [["render", dP]]), hP = { class: "d-block fw-bold" };
class al {
  constructor(t, n) {
    pe(this, "title", "");
    pe(this, "description", "");
    this.title = t, this.description = n;
  }
}
const pP = {
  __name: "RevisionWarning",
  props: {
    revision: { type: Object }
  },
  setup(e) {
    const t = e, n = xs(), s = Mi(), { revision: o } = $t(t), a = k(
      () => {
        var l, c;
        return ((c = (l = o.value) == null ? void 0 : l.metadata) == null ? void 0 : c.total_fetchable_mrns) ?? 0;
      }
    ), r = k(() => n.active), i = k(() => {
      var f;
      const l = o.value, c = [];
      if (((f = l == null ? void 0 : l.metadata) == null ? void 0 : f.approved) !== !0) {
        let d = new al(
          "This revision was not approved",
          "An administrator must approve this revision before it can be run."
        );
        c.push(d);
      }
      if (l === r.value && !(s != null && s.can_repeat_revision) && (l != null && l.metadata.executed)) {
        let d = new al(
          "This revision was already run",
          "You are allowed to run a revision only once."
        );
        c.push(d);
      }
      if (l !== r.value) {
        let d = new al(
          "This is not the active revision",
          "Only the most recent revision can be run."
        );
        c.push(d);
      }
      if (a.value < 1) {
        let d = new al(
          "No fetchable records in the project",
          "You can only run a revision if you have at least 1 fetchable record in your project."
        );
        c.push(d);
      }
      return c;
    });
    return (l, c) => (b(!0), E(ne, null, Ae(i.value, (f, d) => (b(), E("div", {
      key: d,
      class: "alert alert-warning mt-2"
    }, [
      u("span", hP, [
        u("span", null, j(f.title), 1)
      ]),
      u("span", null, j(f.description), 1)
    ]))), 128));
  }
}, mP = ["disabled"], _P = /* @__PURE__ */ u("i", { class: "fas fa-file-pen fa-fw me-1" }, null, -1), vP = /* @__PURE__ */ u("span", null, "Request a configuration change", -1), gP = [
  _P,
  vP
], yP = {
  __name: "RequestChangeButton",
  props: {
    revision: { type: Object, default: null }
  },
  setup(e) {
    const t = e, n = xs(), s = dr(), o = k(() => t.revision);
    function a() {
      n.edited = o.value.data, s.push({ name: "request-change" });
    }
    return (r, i) => (b(), E("div", null, [
      u("button", {
        class: "btn btn-sm btn-primary",
        onClick: a,
        disabled: !o.value
      }, gP, 8, mP)
    ]));
  }
}, bP = /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1), wP = /* @__PURE__ */ u("span", null, "Delete revision", -1), EP = [
  bP,
  wP
], SP = /* @__PURE__ */ u("span", null, "Are you sure you want to delete this item?", -1), xP = {
  __name: "DeleteRevisionButton",
  props: {
    revision: { type: Object, default: () => ({}) }
  },
  setup(e) {
    const t = e, n = ta(), s = Ss(), o = te();
    async function a() {
      var i, l;
      if (await o.value.show())
        try {
          const c = (l = (i = t == null ? void 0 : t.revision) == null ? void 0 : i.metadata) == null ? void 0 : l.id, f = await UI(c);
          s.toast({
            title: "Success",
            body: "the revision was deleted successfully"
          });
        } catch {
          s.toast({
            title: "Success",
            body: "there was an error deleting the revision - ".error
          });
        } finally {
          n.init();
        }
    }
    return (r, i) => {
      const l = Te("b-modal");
      return b(), E(ne, null, [
        u("button", {
          class: "btn btn-sm btn-danger",
          onClick: a
        }, EP),
        T(l, {
          ref_key: "dialogRef",
          ref: o
        }, {
          header: K(() => [
            ve("Confirm delete")
          ]),
          default: K(() => [
            SP
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, $P = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-1"
}, CP = {
  key: 1,
  class: "fas fa-circle-check fa-fw me-1"
}, OP = /* @__PURE__ */ u("span", null, "Approve", -1), kP = {
  __name: "ApproveRevisionButton",
  props: {
    revision: { type: Object, default: null }
  },
  setup(e) {
    const t = e, n = ta(), s = Ss(), o = te(!1), a = k(() => t.revision);
    async function r() {
      var l, c;
      const i = (c = (l = a.value) == null ? void 0 : l.metadata) == null ? void 0 : c.id;
      if (i)
        try {
          o.value = !0;
          const f = await BI(i);
          s.toast({ title: "success", body: "the revision was approved" }), await n.init();
        } catch {
          s.toast({
            title: "error",
            body: "the revision was not approved - ".error
          });
        } finally {
          o.value = !1;
        }
    }
    return (i, l) => (b(), E("div", null, [
      u("button", {
        class: "btn btn-sm btn-success",
        onClick: r
      }, [
        o.value ? (b(), E("i", $P)) : (b(), E("i", CP)),
        OP
      ])
    ]));
  }
}, TP = /* @__PURE__ */ u("i", { class: "fas fa-question-circle fa-fw" }, null, -1), NP = [
  TP
], Gg = {
  __name: "DisabledReasonButton",
  props: {
    node: { type: Jt, default: null }
  },
  setup(e) {
    const t = e, n = fr();
    function s() {
      var i;
      const o = t.node;
      if (!o)
        return;
      const a = ((i = o == null ? void 0 : o.metadata) == null ? void 0 : i.disabled_reason) ?? "disabled", r = "Mapping disabled";
      n.alert({ title: r, body: a });
    }
    return (o, a) => (b(), E("button", {
      type: "button",
      class: "ms-2 btn btn-sm text-warning",
      onClick: s
    }, NP));
  }
};
const DP = ["data-disabled"], AP = { class: "node-name fw-bold border-end pe-2 me-2" }, RP = { class: "node-label" }, IP = {
  key: 0,
  class: "ms-2 text-muted d-block"
}, PP = ["onClick"], MP = { class: "w-100" }, LP = ["onClick"], VP = {
  key: 0,
  class: "text-muted"
}, FP = {
  __name: "MetadataNode",
  props: {
    node: { type: [Gt, Jt], default: null }
  },
  setup(e) {
    const t = e, { node: n } = $t(t), s = te(!1);
    tn(() => {
      var l;
      ((l = n.value) == null ? void 0 : l.parent) === null && (s.value = !0);
    });
    function o(l) {
      return l instanceof Jt;
    }
    function a(l) {
      return l instanceof Gt;
    }
    function r() {
      var l;
      ((l = n.value) == null ? void 0 : l.parent) !== null && (s.value = !s.value);
    }
    function i(l) {
      var c, f, d, h;
      return ((f = (c = l == null ? void 0 : l.metadata) == null ? void 0 : c.description) == null ? void 0 : f.toUpperCase()) !== ((h = (d = l == null ? void 0 : l.metadata) == null ? void 0 : d.label) == null ? void 0 : h.toUpperCase());
    }
    return (l, c) => {
      var f, d, h, p, m, _, y, g, v, S;
      return o(G(n)) ? (b(), E("div", {
        key: 0,
        class: "node",
        "data-disabled": (d = (f = G(n)) == null ? void 0 : f.metadata) == null ? void 0 : d.disabled
      }, [
        u("span", AP, j((p = (h = G(n)) == null ? void 0 : h.metadata) == null ? void 0 : p.field), 1),
        u("span", RP, j((_ = (m = G(n)) == null ? void 0 : m.metadata) == null ? void 0 : _.label), 1),
        i(G(n)) ? (b(), E("small", IP, j((g = (y = G(n)) == null ? void 0 : y.metadata) == null ? void 0 : g.description), 1)) : me("", !0),
        (S = (v = G(n)) == null ? void 0 : v.metadata) != null && S.disabled ? (b(), Ce(Gg, {
          key: 1,
          node: G(n)
        }, null, 8, ["node"])) : me("", !0)
      ], 8, DP)) : a(G(n)) ? (b(), E("div", {
        key: 1,
        class: Ne(["node-container d-flex p-2", { "border rounded": G(n).parent !== null }])
      }, [
        G(n).parent !== null ? (b(), E("div", {
          key: 0,
          onClick: kt(r, ["stop"])
        }, [
          u("i", {
            class: Ne(["node-open-status fas fa-circle-chevron-right fa-fw", { "fa-rotate-90": s.value }])
          }, null, 2)
        ], 8, PP)) : me("", !0),
        u("div", MP, [
          u("div", null, [
            u("span", {
              class: "container-name d-block fw-bold",
              onClick: kt(r, ["stop"])
            }, j(G(n).name), 9, LP),
            G(n).parent !== null ? (b(), E("small", VP, j(`${G(n).total} field${G(n).total === 1 ? "" : "s"} `), 1)) : me("", !0)
          ]),
          s.value ? (b(!0), E(ne, { key: 0 }, Ae(G(n).children, (w, $) => (b(), Ce(zg, {
            key: `${$} ${w == null ? void 0 : w.name}`,
            node: w
          }, {
            "container-end": K(({ node: C }) => [
              we(l.$slots, "container-end", { node: C }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["node"]))), 128)) : me("", !0)
        ]),
        we(l.$slots, "container-end", { node: G(n) }, void 0, !0)
      ], 2)) : me("", !0);
    };
  }
}, zg = /* @__PURE__ */ Se(FP, [["__scopeId", "data-v-6f19fc27"]]), UP = { key: 0 }, jP = /* @__PURE__ */ u("span", { class: "fw-bold" }, " Created by: ", -1), HP = ["href"], BP = /* @__PURE__ */ u("span", { class: "fw-bold" }, "Creation date: ", -1), YP = /* @__PURE__ */ u("span", { class: "fw-bold" }, "Last executed: ", -1), WP = { key: 0 }, GP = {
  __name: "RevisionMetadata",
  props: {
    revision: { type: Object }
  },
  setup(e) {
    const t = e, { revision: n } = $t(t), s = k(() => {
      var i, l;
      return (l = (i = n.value) == null ? void 0 : i.metadata) == null ? void 0 : l.creator;
    }), o = k(
      () => {
        var i, l;
        return !!((l = (i = n.value) == null ? void 0 : i.metadata) != null && l.executed);
      }
    ), a = k(() => {
      var l, c;
      const i = ae((c = (l = n.value) == null ? void 0 : l.metadata) == null ? void 0 : c.executed_at);
      return i.isValid ? i.format("YYYY-MM-DD hh:mm:ss") : !1;
    }), r = k(() => {
      var l, c;
      const i = (c = (l = n.value) == null ? void 0 : l.metadata) == null ? void 0 : c.date;
      return i ? ae(i).fromNow() : "";
    });
    return (i, l) => (b(), E("div", yn(rn(i.$attrs)), [
      s.value ? (b(), E("div", UP, [
        jP,
        u("a", {
          href: `mailto:${s.value.user_email}`
        }, j(`${s.value.user_firstname} ${s.value.user_lastname}`), 9, HP)
      ])) : me("", !0),
      u("div", null, [
        BP,
        u("span", null, j(r.value), 1)
      ]),
      u("div", null, [
        YP,
        o.value && a.value ? (b(), E("span", WP, j(a.value), 1)) : (b(), E(ne, { key: 1 }, [
          ve(" never")
        ], 64))
      ])
    ], 16));
  }
};
const tu = (e) => (Ze("data-v-3fea025e"), e = e(), qe(), e), zP = { class: "card mt-2" }, KP = { class: "card-header d-flex" }, JP = { key: 1 }, XP = { class: "card-body" }, QP = /* @__PURE__ */ tu(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Date range: ", -1)), ZP = /* @__PURE__ */ tu(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Fields in EHR for which to pull data:", -1)), qP = {
  key: 0,
  class: "text-nowrap"
}, eM = /* @__PURE__ */ tu(() => /* @__PURE__ */ u("i", { class: "fas fa-clock fa-fw" }, null, -1)), tM = /* @__PURE__ */ tu(() => /* @__PURE__ */ u("span", null, "date range is applied", -1)), nM = [
  eM,
  tM
], sM = { class: "card-footer d-flex justify-content-end gap-2" }, oM = {
  __name: "RevisionDetails",
  props: {
    revision: { type: Object }
  },
  setup(e) {
    const t = e, n = Li(), { revision: s } = $t(t), o = k(() => n == null ? void 0 : n.fhirMetadata), a = k(() => {
      var d, h;
      const c = { min: null, max: null }, f = s.value;
      if (f) {
        let p = "MM-DD-YYYY", m = ae((d = f == null ? void 0 : f.data) == null ? void 0 : d.dateMin), _ = ae((h = f == null ? void 0 : f.data) == null ? void 0 : h.dateMax);
        m.isValid() && (c.min = m.format(p)), _.isValid() && (c.max = _.format(p));
      }
      return c;
    }), r = k(() => {
      const { min: c, max: f } = a.value;
      if (!c && !f)
        return "no date range specified (get all available data)";
      let d = "";
      return d += `from ${c || "----"}`, d += ` to ${f || "----"}`, d;
    }), i = k(() => {
      var f, d;
      const c = (d = (f = s.value) == null ? void 0 : f.data) == null ? void 0 : d.fields;
      if (c && Object.keys(o.value).length !== 0)
        return Gt.fromList(c, o.value);
    });
    function l(c) {
      var m;
      const { min: f, max: d } = a.value;
      if (!f && !d)
        return !1;
      const h = s.value, p = ((m = h == null ? void 0 : h.data) == null ? void 0 : m.date_range_categories) ?? [];
      return Array.isArray(p) ? p.includes(c) : !1;
    }
    return (c, f) => (b(), E("div", null, [
      u("div", zP, [
        u("section", KP, [
          G(s) ? (b(), Ce(GP, {
            key: 0,
            class: "fs-6",
            revision: G(s)
          }, null, 8, ["revision"])) : (b(), E("span", JP, "No revision selected"))
        ]),
        u("section", XP, [
          we(c.$slots, "body-start", {}, void 0, !0),
          u("div", null, [
            QP,
            u("span", null, j(r.value), 1)
          ]),
          ZP,
          T(zg, {
            node: i.value,
            class: "revision-fields border rounded"
          }, {
            "container-end": K(({ node: d }) => [
              l(d.name) ? (b(), E("div", qP, nM)) : me("", !0)
            ]),
            _: 1
          }, 8, ["node"]),
          we(c.$slots, "body-end", {}, void 0, !0)
        ]),
        u("section", sM, [
          we(c.$slots, "footer", {}, void 0, !0)
        ])
      ])
    ]));
  }
}, Kg = /* @__PURE__ */ Se(oM, [["__scopeId", "data-v-3fea025e"]]);
const rM = {
  __name: "SelectedRevisionDetails",
  setup(e) {
    const t = xs(), n = Mi(), s = k(() => t == null ? void 0 : t.selected);
    return (o, a) => (b(), Ce(Kg, { revision: s.value }, {
      "body-start": K(() => [
        T(pP, { revision: s.value }, null, 8, ["revision"])
      ]),
      footer: K(() => [
        s.value && G(n).isSuperUser ? (b(), Ce(xP, {
          key: 0,
          revision: s.value
        }, null, 8, ["revision"])) : me("", !0),
        G(t).isApproved(s.value) && (G(n).isSuperUser || G(n).can_create_revision) ? (b(), Ce(yP, {
          key: 1,
          revision: s.value
        }, null, 8, ["revision"])) : s.value && !G(t).isApproved(s.value) && G(n).isSuperUser ? (b(), Ce(kP, {
          key: 2,
          revision: s.value
        }, null, 8, ["revision"])) : me("", !0)
      ]),
      _: 1
    }, 8, ["revision"]));
  }
}, aM = /* @__PURE__ */ Se(rM, [["__scopeId", "data-v-6758a58d"]]);
const iM = { class: "progress-stacked" }, lM = ["aria-valuenow"], cM = { class: "progress-bar progress-bar-animated text-bg-primary" }, uM = ["aria-valuenow"], dM = { class: "progress-bar progress-bar-animated text-bg-warning" }, fM = ["aria-valuenow"], hM = { class: "progress-bar progress-bar-animated text-bg-danger" }, pM = {
  __name: "ProcessBar",
  props: {
    total: { type: Number, default: 0 },
    success: { type: Number, default: 0 },
    warnings: { type: Number, default: 0 },
    errors: { type: Number, default: 0 },
    text: { type: String, default: "" }
  },
  setup(e) {
    const t = e, { total: n, success: s, warnings: o, errors: a } = $t(t), r = k(() => n.value === 0 ? 0 : s.value / n.value * 100), i = k(() => n.value === 0 ? 0 : o.value / n.value * 100), l = k(() => n.value === 0 ? 0 : a.value / n.value * 100);
    return (c, f) => (b(), E("div", iM, [
      u("div", {
        class: "progress",
        role: "progressbar",
        "aria-valuenow": r.value,
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        style: ps(`width: ${r.value}%`)
      }, [
        u("div", cM, j(G(s)), 1)
      ], 12, lM),
      u("div", {
        class: "progress",
        role: "progressbar",
        "aria-valuenow": i.value,
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        style: ps(`width: ${i.value}%`)
      }, [
        u("div", dM, j(G(o)), 1)
      ], 12, uM),
      u("div", {
        class: "progress",
        role: "progressbar",
        "aria-valuenow": l.value,
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        style: ps(`width: ${l.value}%`)
      }, [
        u("div", hM, j(G(a)), 1)
      ], 12, fM)
    ]));
  }
}, mM = /* @__PURE__ */ Se(pM, [["__scopeId", "data-v-a05555ee"]]), Jg = (e) => (n, s, o = 300) => new Promise((r) => {
  let i = null;
  function l(c) {
    i || (i = c);
    const f = c - i, d = Math.min(f / o, 1), h = (s - n) * d, p = n + h;
    if (e(p, {
      startTime: i,
      timestamp: c,
      progress: f,
      percentage: d
    }), d < 1) {
      requestAnimationFrame(l);
      return;
    }
    r(!0);
  }
  requestAnimationFrame(l);
}), Xg = (e = [], { perPageOptions: t = null, limit: n = null, page: s = 1 }) => (t = t ?? [25, 50, 100, 250], {
  page: s ?? 1,
  limit: n ?? (t == null ? void 0 : t[0]) ?? 10,
  perPageOptions: [...t],
  get total() {
    return this.allItems.length ?? 0;
  },
  get totalPages() {
    var o;
    return this.limit === 0 ? 0 : Math.ceil(((o = this.allItems) == null ? void 0 : o.length) / this.limit);
  },
  get allItems() {
    return Array.isArray(e) ? [...e] : typeof e == "function" ? e() : [];
  },
  get items() {
    return this.allItems.slice(this.start, this.end);
  },
  get start() {
    const o = parseInt(this.page), a = parseInt(this.limit);
    return (o - 1) * a;
  },
  get end() {
    return this.limit * this.page;
  }
}), nu = () => {
  var s;
  const e = (o) => {
    const a = document.createElement("textarea");
    a.value = o, document.body.appendChild(a), a.select();
    try {
      return document.execCommand("copy"), !0;
    } finally {
      document.body.removeChild(a);
    }
  }, t = (o) => navigator.clipboard.writeText(o);
  let n = (s = navigator == null ? void 0 : navigator.clipboard) != null && s.writeText ? t : e;
  return {
    copy: (o) => new Promise((r, i) => {
      try {
        const l = n(o);
        l instanceof Promise ? l.then(() => {
          console.log(
            "Text copied to clipboard ✌🏼:",
            o
          ), r(o);
        }).catch((c) => {
          console.error("Failed to copy text:", c), i(c);
        }) : l === !0 && (console.log("Text copied to clipboard ✌🏼:", o), r(o));
      } catch (l) {
        console.error("Failed to copy text:", l), i(l);
      }
    })
  };
}, _M = {
  __name: "AnimatedCounter",
  props: {
    value: { type: Number, default: 0 },
    duration: { type: Number, default: 300 }
    //milliseconds
  },
  setup(e) {
    const t = e, n = te(!1), s = te(0), o = te(""), a = Jg((r) => {
      o.value = r;
    });
    return tn(async () => {
      const r = s.value, i = t.value;
      s.value = i, n.value = !0, await a(r, i, t.duration), n.value = !1;
    }), (r, i) => we(r.$slots, "default", {
      animating: n.value,
      text: o.value
    }, () => [
      u("span", {
        class: Ne({ animating: n.value })
      }, j(o.value), 3)
    ]);
  }
};
const Qg = (e) => (Ze("data-v-2ff39b12"), e = e(), qe(), e), vM = { class: "table table-striped table-hover table-bordered table-sm" }, gM = /* @__PURE__ */ Qg(() => /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", null, "Category"),
    /* @__PURE__ */ u("th", { class: "text-end" }, "Total")
  ])
], -1)), yM = { class: "text-end" }, bM = { key: 0 }, wM = /* @__PURE__ */ Qg(() => /* @__PURE__ */ u("td", {
  colspan: "2",
  class: "fst-italic"
}, "No updates", -1)), EM = [
  wM
], SM = {
  __name: "StatsTable",
  props: {
    stats: { type: Object, default: () => ({}) }
  },
  setup(e) {
    const t = e, { stats: n } = $t(t), s = k(() => Object.keys(n.value).length === 0);
    return (o, a) => (b(), E("table", vM, [
      gM,
      u("tbody", null, [
        (b(!0), E(ne, null, Ae(G(n), (r, i) => (b(), E("tr", {
          key: `stat-${i}`
        }, [
          u("td", null, j(i), 1),
          u("td", yM, [
            T(_M, { value: r }, {
              default: K(({ animating: l, text: c }) => [
                u("span", {
                  class: Ne(["counter", { animating: l }])
                }, j(parseInt(c)), 3)
              ]),
              _: 2
            }, 1032, ["value"])
          ])
        ]))), 128)),
        s.value ? (b(), E("tr", bM, EM)) : me("", !0)
      ])
    ]));
  }
}, xM = /* @__PURE__ */ Se(SM, [["__scopeId", "data-v-2ff39b12"]]), $M = { class: "my-2 table table-hover table-striped table-bordered" }, CM = /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", null, "MRN"),
    /* @__PURE__ */ u("th", null, "Error")
  ])
], -1), OM = { key: 0 }, kM = /* @__PURE__ */ u("td", {
  colspan: "2",
  class: "fst-italic"
}, "No errors", -1), TM = [
  kM
], NM = {
  __name: "ErrorsTable",
  props: {
    errors: { type: Array, default: () => [] }
  },
  setup(e) {
    const t = e, n = te(1), s = te(10), o = k(() => {
      const r = (n.value - 1) * s.value, i = r + s.value;
      return t.errors.slice(r, i);
    }), a = k(() => {
      var r;
      return ((r = t.errors) == null ? void 0 : r.length) === 0;
    });
    return (r, i) => {
      const l = Te("b-pagination");
      return b(), E(ne, null, [
        u("table", $M, [
          CM,
          u("tbody", null, [
            (b(!0), E(ne, null, Ae(o.value, (c, f) => (b(), E("tr", {
              key: `${c.mrn}-error-${f}`
            }, [
              u("td", null, j(c.mrn), 1),
              u("td", null, j(c.error.message), 1)
            ]))), 128)),
            a.value ? (b(), E("tr", OM, TM)) : me("", !0)
          ])
        ]),
        T(l, {
          modelValue: n.value,
          "onUpdate:modelValue": i[0] || (i[0] = (c) => n.value = c),
          totalItems: e.errors.length,
          perPage: s.value,
          size: "sm"
        }, null, 8, ["modelValue", "totalItems", "perPage"])
      ], 64);
    };
  }
};
class DM {
  constructor(t) {
    pe(this, "startTime", null);
    pe(this, "active", !1);
    pe(this, "elapsed", 0);
    pe(this, "callback", null);
    this.setCallback(t);
  }
  setCallback(t) {
    this.callback = t;
  }
  start() {
    this.active = !0, requestAnimationFrame(this.update.bind(this));
  }
  reset() {
    this.startTime = null, this.elapsed = 0;
  }
  update(t) {
    this.active != !1 && (this.startTime === null && (this.startTime = t), this.elapsed = t - this.startTime, typeof this.callback == "function" && this.callback(this.elapsed, this, { startTime: this.startTime }), requestAnimationFrame(this.update.bind(this)));
  }
  stop() {
    this.active = !1;
  }
}
const AM = (e) => (Ze("data-v-73bfd578"), e = e(), qe(), e), RM = { class: "stopwatch" }, IM = /* @__PURE__ */ AM(() => /* @__PURE__ */ u("i", { class: "fas fa-clock fa-fw me-1" }, null, -1)), PM = {
  __name: "StopWatchDisplay",
  props: {
    time: { type: Number, default: 0 }
  },
  setup(e) {
    const t = e, n = k(() => isNaN(t.time) ? void 0 : (t.time / 1e3).toFixed(2)), s = k(() => (ae(), ae(Date.now() + t.time).fromNow(!0)));
    return (o, a) => (b(), E("div", RM, [
      IM,
      u("span", null, "Elapsed time: " + j(n.value), 1),
      u("span", null, "(" + j(s.value) + ")", 1)
    ]));
  }
}, MM = /* @__PURE__ */ Se(PM, [["__scopeId", "data-v-73bfd578"]]);
const Rn = (e) => (Ze("data-v-bad9ac11"), e = e(), qe(), e), LM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, "Fetching Data", -1)), VM = { class: "my-2" }, FM = { class: "d-flex gap-2 justify-content-between" }, UM = { key: 0 }, jM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, [
  /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" })
], -1)), HM = { class: "text-muted" }, BM = { key: 1 }, YM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, [
  /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" })
], -1)), WM = [
  YM
], GM = { key: 0 }, zM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("i", { class: "fas fa-ban me-1 text-danger" }, null, -1)), KM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, "Cancelled", -1)), JM = [
  zM,
  KM
], XM = { key: 1 }, QM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("i", { class: "fas fa-check-circle me-1 text-success" }, null, -1)), ZM = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, "Completed", -1)), qM = [
  QM,
  ZM
], eL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("hr", null, null, -1)), tL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", { class: "d-block fs-4 mb-2" }, "Stats:", -1)), nL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", { class: "d-block fs-4 mb-2" }, "Errors:", -1)), sL = { class: "ms-auto" }, oL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("i", { class: "fas fa-ban me-1" }, null, -1)), rL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, "Cancel", -1)), aL = [
  oL,
  rL
], iL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("i", { class: "fas fa-times me-1" }, null, -1)), lL = /* @__PURE__ */ Rn(() => /* @__PURE__ */ u("span", null, "Close", -1)), cL = [
  iL,
  lL
], uL = {
  __name: "ProcessingDetails",
  setup(e) {
    const t = uh(), n = te(), s = k(() => t.processing), o = k(() => t.aborted), a = k(() => t.stats), r = k(() => {
      const y = [];
      for (const [g, v] of Object.entries(t.errors))
        for (const S of v)
          y.push({ mrn: g, error: S });
      return y;
    }), i = k(() => Object.keys(t.errors).length), l = k(() => {
      var y;
      return (y = t.success) == null ? void 0 : y.length;
    }), c = k(() => t.currentMRN), f = k(() => t.totalMRNs), d = k(() => t.totalProcessed), h = te(0), p = new DM((y) => h.value = y);
    tn(() => {
      s.value === !0 ? (p.reset(), p.start(), n.value.show()) : p.stop();
    });
    function m() {
      t.stop();
    }
    function _() {
      n.value.hide();
    }
    return (y, g) => {
      const v = Te("b-modal");
      return b(), Ce(v, {
        ref_key: "modalRef",
        ref: n,
        backdrop: "static",
        size: "lg"
      }, {
        header: K(() => [
          LM
        ]),
        footer: K(() => [
          u("div", sL, [
            s.value ? (b(), E("button", {
              key: 0,
              class: "btn btn-sm btn-secondary",
              onClick: m
            }, aL)) : (b(), E("button", {
              key: 1,
              class: "btn btn-sm btn-secondary",
              onClick: _
            }, cL))
          ])
        ]),
        default: K(() => [
          u("div", null, [
            u("div", VM, [
              T(mM, {
                total: f.value,
                errors: i.value,
                success: l.value
              }, null, 8, ["total", "errors", "success"])
            ]),
            u("div", FM, [
              s.value ? (b(), E(ne, { key: 0 }, [
                c.value ? (b(), E("div", UM, [
                  jM,
                  u("span", null, [
                    ve("Processing "),
                    u("strong", null, j(c.value), 1)
                  ]),
                  u("span", HM, " - " + j(d.value) + "/" + j(f.value), 1)
                ])) : (b(), E("div", BM, WM))
              ], 64)) : (b(), E(ne, { key: 1 }, [
                o.value ? (b(), E("div", GM, JM)) : (b(), E("div", XM, qM))
              ], 64)),
              T(MM, {
                time: h.value,
                class: "text-muted fw-lighter fst-italic"
              }, null, 8, ["time"])
            ]),
            eL,
            u("div", null, [
              tL,
              T(xM, { stats: a.value }, null, 8, ["stats"]),
              nL,
              T(NM, { errors: r.value }, null, 8, ["errors"])
            ])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
}, Zg = /* @__PURE__ */ Se(uL, [["__scopeId", "data-v-bad9ac11"]]), dL = /* @__PURE__ */ u("i", { class: "fa-solid fa-cloud-arrow-down fa-fw" }, null, -1), fL = /* @__PURE__ */ u("span", { class: "mx-1" }, "Fetch data", -1), hL = { class: "badge bg-primary" }, pL = { class: "form-check" }, mL = /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "fetch-background-checkbox"
}, [
  /* @__PURE__ */ u("i", { class: "fas fa-clock fa-fw me-1" }),
  /* @__PURE__ */ u("span", null, "Fetch in a background process")
], -1), _L = { class: "form-check" }, vL = ["disabled"], gL = /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "send-message-checkbox"
}, [
  /* @__PURE__ */ u("i", { class: "fas fa-envelope fa-fw me-1" }),
  /* @__PURE__ */ u("span", null, "Send me a message when completed")
], -1), yL = /* @__PURE__ */ u("i", { class: "fas fa-check fa-fw me-1" }, null, -1), bL = /* @__PURE__ */ u("span", null, "Confirm", -1), wL = [
  yL,
  bL
], EL = {
  key: 1,
  class: "btn btn-sm btn-outline-primary",
  disabled: ""
}, SL = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" }, null, -1), xL = /* @__PURE__ */ u("span", null, "Processing", -1), $L = [
  SL,
  xL
], qg = {
  __name: "FetchButton",
  props: {
    disabled: { type: Boolean, default: !1 },
    mrns: { type: Array, default: null }
  },
  emits: ["fetch-confirmed"],
  setup(e, { emit: t }) {
    const n = e, s = ta(), o = uh(), a = xs(), r = Mi(), i = fr(), l = Ss(), { mrns: c, disabled: f } = $t(n), d = k(() => a.selected === a.active), h = k(() => {
      var w, $;
      return ($ = (w = a == null ? void 0 : a.selected) == null ? void 0 : w.metadata) == null ? void 0 : $.approved;
    }), p = te(!1), m = te(!1), _ = k(() => o.processing), y = k(() => {
      var w, $;
      return (($ = (w = a == null ? void 0 : a.selected) == null ? void 0 : w.metadata) == null ? void 0 : $.total_fetchable_mrns) ?? 0;
    }), g = k(() => Array.isArray(c.value) ? c.value.length : y.value), v = k(() => f.value ? f.value : !d.value || !h.value || g.value === 0 || !r.canRunRevision(a.selected));
    tn(() => {
      p.value === !1 && (m.value = !1);
    });
    async function S() {
      var w, $, C;
      t("fetch-confirmed", {
        backgroundFetch: p.value,
        sendMessage: m.value
      });
      try {
        if (p.value) {
          const N = await o.schedule(a.selected, c.value, m.value), A = ((w = N == null ? void 0 : N.data) == null ? void 0 : w.message) ?? "the process was successfully scheduled";
          l.toast({ title: "Success", body: A });
        } else
          await o.run(a.selected, c.value);
      } catch (N) {
        let A = N;
        N instanceof UC && (A = ((C = ($ = N == null ? void 0 : N.response) == null ? void 0 : $.data) == null ? void 0 : C.message) ?? "unexpected error"), i.alert({ title: "Error", body: A });
      } finally {
        s.init();
      }
    }
    return (w, $) => {
      const C = Te("b-dropdown-item"), N = Te("b-dropdown-divider"), A = Te("b-dropdown");
      return _.value ? (b(), E("button", EL, $L)) : (b(), Ce(A, {
        key: 0,
        "menu-end": "",
        variant: "success",
        size: "sm",
        disabled: v.value
      }, {
        button: K(() => [
          dL,
          fL,
          u("span", hL, j(g.value) + " records", 1)
        ]),
        default: K(() => [
          T(C, { "data-prevent-close": "" }, {
            default: K(() => [
              u("div", pL, [
                L(u("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  "onUpdate:modelValue": $[0] || ($[0] = (D) => p.value = D),
                  id: "fetch-background-checkbox"
                }, null, 512), [
                  [Wt, p.value]
                ]),
                mL
              ])
            ]),
            _: 1
          }),
          T(C, { "data-prevent-close": "" }, {
            default: K(() => [
              u("div", _L, [
                L(u("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  "onUpdate:modelValue": $[1] || ($[1] = (D) => m.value = D),
                  id: "send-message-checkbox",
                  disabled: !p.value
                }, null, 8, vL), [
                  [Wt, m.value]
                ]),
                gL
              ])
            ]),
            _: 1
          }),
          T(N),
          T(C, null, {
            default: K(() => [
              u("div", { onClick: S }, wL)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled"]));
    };
  }
}, CL = /* @__PURE__ */ u("i", { class: "fa-solid fa-magnifying-glass fa-fw me-1" }, null, -1), OL = /* @__PURE__ */ u("span", null, "Select and fetch records...", -1), kL = [
  CL,
  OL
], TL = {
  __name: "SearchButton",
  setup(e) {
    const t = dr();
    function n() {
      t.push({ name: "search" });
    }
    return (s, o) => (b(), E("button", {
      class: "btn btn-sm btn-primary",
      onClick: n
    }, kL));
  }
};
const NL = ["title"], DL = { class: "fw-bold" }, AL = { class: "border-start ps-2 ms-auto" }, RL = {
  key: 0,
  class: "fas fa-check-circle text-success"
}, IL = {
  key: 1,
  class: "fas fa-ban text-danger"
}, PL = {
  __name: "RevisionsDropdown",
  setup(e) {
    ln("store");
    const t = xs(), n = k(() => t.selected), s = k(() => t.list ?? []);
    function o(a) {
      t.selected = a;
    }
    return (a, r) => (b(), Ce(eu, { variant: "outline-primary" }, {
      button: K(() => [
        u("span", null, [
          n.value ? (b(), E(ne, { key: 0 }, [
            ve(" Revision " + j(G(t).getIndex(n.value)), 1)
          ], 64)) : (b(), E(ne, { key: 1 }, [
            ve("-----")
          ], 64))
        ])
      ]),
      default: K(() => [
        (b(!0), E(ne, null, Ae(s.value, (i, l) => (b(), Ce(Br, {
          key: l,
          active: i === n.value,
          onClick: (c) => o(i)
        }, {
          default: K(() => {
            var c, f;
            return [
              u("div", {
                class: "d-flex gap-2",
                title: (c = i == null ? void 0 : i.metadata) == null ? void 0 : c.id
              }, [
                u("div", null, [
                  u("span", DL, "#" + j(G(t).getIndex(i)), 1)
                ]),
                u("span", null, "Revision date: " + j((f = i == null ? void 0 : i.metadata) == null ? void 0 : f.date), 1),
                u("div", AL, [
                  G(t).isApproved(i) ? (b(), E("i", RL)) : (b(), E("i", IL))
                ])
              ], 8, NL)
            ];
          }),
          _: 2
        }, 1032, ["active", "onClick"]))), 128))
      ]),
      _: 1
    }));
  }
}, ML = /* @__PURE__ */ Se(PL, [["__scopeId", "data-v-c994eccd"]]);
function LL(e, t = null) {
  const n = [], s = t || Object.keys(e[0]);
  n.push(s.join(","));
  for (const o of e) {
    const a = s.map((r) => `"${o[r] === null || o[r] === void 0 ? "" : String(o[r]).replace(/"/g, '""')}"`);
    n.push(a.join(","));
  }
  return n.join(`
`);
}
function Yd(e, t, n = null) {
  const s = LL(e, n);
  su(s, { fileName: t, fileType: "text/csv;charset=utf-8;" });
}
const su = (e, { fileName: t = "download.txt", fileType: n = "text/plain" }) => {
  const s = new Blob([e], { type: n }), o = URL.createObjectURL(s), a = document.createElement("a");
  a.href = o, a.download = t, a.click(), URL.revokeObjectURL(o);
};
function VL(e, t = ",", n = '"') {
  var s = e.split(`
`), o = [];
  function a(d) {
    let h = new RegExp(
      // Match the enclosure followed by anything until the next enclosure, or match non-separator characters
      `${n}([^${n}]*)${n}|[^${t}]+`,
      "g"
    );
    return d.match(h).map(
      (p) => (
        // Remove the enclosure characters if present
        p.startsWith(n) && p.endsWith(n) ? p.slice(1, p.length - 1) : p
      )
    );
  }
  for (var r = a(s[0]), i = 1; i < s.length; i++) {
    for (var l = {}, c = a(s[i]), f = 0; f < r.length; f++)
      l[r[f]] = c[f];
    o.push(l);
  }
  return o;
}
const Fi = (e) => (Ze("data-v-d4741007"), e = e(), qe(), e), FL = /* @__PURE__ */ Fi(() => /* @__PURE__ */ u("span", null, [
  /* @__PURE__ */ u("i", { class: "fas fa-cog fa-fw" })
], -1)), UL = /* @__PURE__ */ Fi(() => /* @__PURE__ */ u("i", { class: "fas fa-file-export fa-fw me-1" }, null, -1)), jL = /* @__PURE__ */ Fi(() => /* @__PURE__ */ u("span", null, "Export", -1)), HL = /* @__PURE__ */ Fi(() => /* @__PURE__ */ u("i", { class: "fas fa-file-import fa-fw me-1" }, null, -1)), BL = /* @__PURE__ */ Fi(() => /* @__PURE__ */ u("span", null, "Import", -1)), YL = {
  __name: "RevisionOptionsDropdown",
  setup(e) {
    const t = xs(), n = dr(), s = te(), o = k(() => t.selected);
    function a() {
      var c, f, d;
      const l = (f = (c = o.value) == null ? void 0 : c.metadata) == null ? void 0 : f.id;
      Yd([(d = o.value) == null ? void 0 : d.data], `revision-${l}.csv`);
    }
    function r() {
      s.value.click();
    }
    async function i() {
      const { files: l } = s.value;
      if (l.length === 0)
        return;
      const f = (await FI(l[0])).data;
      t.edited = f, n.push({ name: "request-change" });
    }
    return (l, c) => (b(), E("div", null, [
      T(eu, { variant: "outline-secondary" }, {
        button: K(() => [
          FL
        ]),
        default: K(() => [
          T(Br, { onClick: a }, {
            default: K(() => [
              UL,
              jL
            ]),
            _: 1
          }),
          T(Br, { onClick: r }, {
            default: K(() => [
              HL,
              BL
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      u("input", {
        type: "file",
        class: "d-none",
        ref_key: "fileRef",
        ref: s,
        onChange: i
      }, null, 544)
    ]));
  }
}, WL = /* @__PURE__ */ Se(YL, [["__scopeId", "data-v-d4741007"]]), GL = { class: "d-flex" }, zL = { class: "d-flex gap-2" }, KL = { class: "ms-auto d-flex gap-2" }, JL = {
  __name: "HomePage",
  setup(e) {
    return (t, n) => (b(), E("div", null, [
      u("div", GL, [
        u("div", zL, [
          u("div", null, [
            T(ML)
          ]),
          u("div", null, [
            T(WL)
          ])
        ]),
        u("div", KL, [
          T(TL),
          T(qg)
        ])
      ]),
      T(aM, { class: "mt-2" }),
      T(Zg)
    ]));
  }
};
const XL = {}, Ui = (e) => (Ze("data-v-e4a4b087"), e = e(), qe(), e), QL = { class: "error-wrapper" }, ZL = /* @__PURE__ */ Ui(() => /* @__PURE__ */ u("span", { class: "error-title" }, "Error 404", -1)), qL = /* @__PURE__ */ Ui(() => /* @__PURE__ */ u("span", { class: "error-description" }, "Sorry, we couldn't find this page.", -1)), eV = /* @__PURE__ */ Ui(() => /* @__PURE__ */ u("span", { class: "error-sub-description" }, "But dont worry, you can find plenty of other things on the homepage..", -1)), tV = { class: "mt-5" }, nV = /* @__PURE__ */ Ui(() => /* @__PURE__ */ u("i", { class: "fas fa-arrow-left fa-fw me-1" }, null, -1)), sV = /* @__PURE__ */ Ui(() => /* @__PURE__ */ u("span", null, "Back to Home", -1));
function oV(e, t) {
  const n = Te("router-link");
  return b(), E("div", QL, [
    we(e.$slots, "title", {}, () => [
      ZL
    ], !0),
    we(e.$slots, "description", {}, () => [
      qL
    ], !0),
    we(e.$slots, "subdescription", {}, () => [
      eV
    ], !0),
    u("div", tV, [
      T(n, {
        to: "/",
        class: "btn btn-sm btn-primary"
      }, {
        default: K(() => [
          nV,
          sV
        ]),
        _: 1
      })
    ])
  ]);
}
const dh = /* @__PURE__ */ Se(XL, [["render", oV], ["__scopeId", "data-v-e4a4b087"]]), rV = { class: "d-flex gap-2 align-items-center mb-2" }, aV = { key: 0 }, iV = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw" }, null, -1), lV = [
  iV
], cV = { class: "ms-auto" }, uV = { class: "table table-bordered table-striped table-hover" }, dV = /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", null, "MRN")
  ])
], -1), fV = {
  key: 0,
  class: "form-check form-switch"
}, hV = ["id", "value"], pV = ["for"], mV = { key: 0 }, _V = /* @__PURE__ */ u("td", null, "nothing to show", -1), vV = [
  _V
], gV = {
  __name: "MRNsResultsTable",
  props: {
    mrns: { type: Array, default: () => [] },
    selected: { type: Array, default: () => [] }
  },
  emits: ["update:mrns", "update:selected"],
  setup(e, { emit: t }) {
    const n = e, { mrns: s } = $t(n), o = te({
      page: 1,
      limit: 10,
      total: 0,
      get start() {
        const d = parseInt(this.page), h = parseInt(this.limit);
        return (d - 1) * h;
      }
    }), a = te(!1), r = k({
      get: () => n.selected,
      set: (d) => t("update:selected", d)
    });
    let i = te("");
    const l = k({
      get() {
        return i.value;
      },
      set(d) {
        o.value.page = 1, i.value = d, c(i.value);
      }
    });
    tn(() => {
      i.value === "" && t("update:mrns", []);
    }), Xt(
      () => o.value.page,
      (d) => {
        c(i.value);
      },
      { deep: !0 }
    );
    const c = Ai(async (d) => {
      await f(d);
    }, 300);
    async function f(d) {
      try {
        a.value = !0;
        const h = o.value;
        if (typeof d != "string" && !(d instanceof String))
          return;
        if (d === "") {
          t("update:mrns", []), h.total = 0;
          return;
        }
        const p = await VI(d, h == null ? void 0 : h.start, h == null ? void 0 : h.limit), { data: m } = p;
        t("update:mrns", m.list), h.total = m.total;
      } catch (h) {
        console.log(h);
      } finally {
        a.value = !1;
      }
    }
    return (d, h) => {
      const p = Te("b-pagination");
      return b(), E("div", null, [
        u("div", rV, [
          T(p, {
            modelValue: o.value.page,
            "onUpdate:modelValue": h[0] || (h[0] = (m) => o.value.page = m),
            totalItems: o.value.total,
            perPage: o.value.limit,
            size: "sm"
          }, null, 8, ["modelValue", "totalItems", "perPage"]),
          a.value ? (b(), E("div", aV, lV)) : me("", !0),
          u("div", cV, [
            L(u("input", {
              class: "form-control form-control-sm",
              type: "search",
              placeholder: "search...",
              "onUpdate:modelValue": h[1] || (h[1] = (m) => l.value = m)
            }, null, 512), [
              [Ke, l.value]
            ])
          ])
        ]),
        u("table", uV, [
          dV,
          u("tbody", null, [
            (b(!0), E(ne, null, Ae(G(s), (m) => (b(), E("tr", {
              key: m == null ? void 0 : m.mrn
            }, [
              u("td", null, [
                m.mrn ? (b(), E("div", fV, [
                  L(u("input", {
                    class: "form-check-input",
                    type: "checkbox",
                    id: `mrn-${m.mrn}`,
                    "onUpdate:modelValue": h[2] || (h[2] = (_) => r.value = _),
                    value: m.mrn
                  }, null, 8, hV), [
                    [Wt, r.value]
                  ]),
                  u("label", {
                    class: "form-check-label",
                    for: `mrn-${m.mrn}`
                  }, [
                    u("span", null, j(m.mrn), 1)
                  ], 8, pV)
                ])) : me("", !0)
              ])
            ]))), 128)),
            G(s).length ? me("", !0) : (b(), E("tr", mV, vV))
          ])
        ])
      ]);
    };
  }
}, yV = { class: "d-flex flex-column gap-2" }, bV = { class: "table table-bordered table-striped table-hover" }, wV = /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", null, "MRN")
  ])
], -1), EV = { class: "d-flex align-items-center" }, SV = { class: "ms-auto" }, xV = ["onClick"], $V = /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1), CV = [
  $V
], OV = { key: 0 }, kV = /* @__PURE__ */ u("td", null, "nothing to show", -1), TV = [
  kV
], NV = {
  __name: "SelectedMRNsTable",
  props: {
    mrns: { type: Array, default: () => [] }
  },
  emits: ["remove"],
  setup(e, { emit: t }) {
    const n = e, { mrns: s } = $t(n), o = te({});
    Xt(s, () => {
      var l;
      let r = ((l = o.value) == null ? void 0 : l.page) ?? 1;
      o.value = Xg(s.value, { perPageOptions: [10] });
      const { totalPages: i = 0 } = o.value;
      for (; i < r; )
        r--, o.value.page = r;
    });
    function a(r) {
      t("remove", r);
    }
    return (r, i) => {
      const l = Te("b-pagination");
      return b(), E("div", yV, [
        T(l, {
          modelValue: o.value.page,
          "onUpdate:modelValue": i[0] || (i[0] = (c) => o.value.page = c),
          totalItems: o.value.total,
          "per-page": o.value.limit,
          size: "sm"
        }, null, 8, ["modelValue", "totalItems", "per-page"]),
        u("table", bV, [
          wV,
          u("tbody", null, [
            (b(!0), E(ne, null, Ae(o.value.items, (c) => (b(), E("tr", { key: c }, [
              u("td", null, [
                u("div", EV, [
                  u("span", null, j(c), 1),
                  u("div", SV, [
                    u("button", {
                      class: "btn btn-sm",
                      onClick: (f) => a(c)
                    }, CV, 8, xV)
                  ])
                ])
              ])
            ]))), 128)),
            G(s).length ? me("", !0) : (b(), E("tr", OV, TV))
          ])
        ])
      ]);
    };
  }
};
const ji = (e) => (Ze("data-v-ce07b8da"), e = e(), qe(), e), DV = { class: "d-flex gap-2 mb-2" }, AV = /* @__PURE__ */ ji(() => /* @__PURE__ */ u("i", { class: "fas fa-chevron-left fa-fw me-1" }, null, -1)), RV = /* @__PURE__ */ ji(() => /* @__PURE__ */ u("span", null, "Back", -1)), IV = [
  AV,
  RV
], PV = { class: "ms-auto" }, MV = { class: "card" }, LV = /* @__PURE__ */ ji(() => /* @__PURE__ */ u("div", { class: "card-header border-bottom mb-2" }, [
  /* @__PURE__ */ u("span", { class: "fw-bold" }, "Select fetchable MRNs available in the project and fetch their data")
], -1)), VV = { class: "card-body" }, FV = { class: "mrn-results" }, UV = { class: "selected-mrns border-top pt-2" }, jV = { class: "d-flex" }, HV = { class: "mb-2 ms-auto" }, BV = { class: "d-flex align-items-center gap-2 ms-auto" }, YV = /* @__PURE__ */ ji(() => /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw me-1" }, null, -1)), WV = /* @__PURE__ */ ji(() => /* @__PURE__ */ u("span", null, "Clear selection", -1)), GV = [
  YV,
  WV
], zV = {
  __name: "SearchPage",
  setup(e) {
    const t = dr(), n = te([]), s = te([]);
    function o() {
      s.value = [];
    }
    function a() {
      t.push({ name: "home" });
    }
    function r() {
      o();
    }
    function i(l) {
      const c = s.value;
      if (!Array.isArray(c))
        return;
      const f = c.indexOf(l);
      f < 0 || (c.splice(f, 1), s.value = c);
    }
    return (l, c) => (b(), E(ne, null, [
      u("div", null, [
        u("div", DV, [
          u("div", null, [
            u("button", {
              class: "btn btn-sm btn-secondary",
              onClick: a
            }, IV)
          ]),
          u("div", PV, [
            T(qg, { mrns: s.value }, null, 8, ["mrns"])
          ])
        ]),
        u("div", MV, [
          LV,
          u("section", VV, [
            u("section", FV, [
              T(gV, {
                mrns: n.value,
                "onUpdate:mrns": c[0] || (c[0] = (f) => n.value = f),
                selected: s.value,
                "onUpdate:selected": c[1] || (c[1] = (f) => s.value = f)
              }, null, 8, ["mrns", "selected"])
            ]),
            u("section", UV, [
              u("div", jV, [
                u("div", HV, [
                  u("div", BV, [
                    u("span", null, [
                      ve("Total MRNs selected: "),
                      u("strong", null, j(s.value.length), 1)
                    ]),
                    u("button", {
                      class: "btn btn-sm btn-danger",
                      onClick: r
                    }, GV)
                  ])
                ])
              ]),
              T(NV, {
                mrns: s.value,
                "onUpdate:mrns": c[2] || (c[2] = (f) => s.value = f),
                onRemove: i
              }, null, 8, ["mrns"])
            ])
          ])
        ])
      ]),
      T(Zg)
    ], 64));
  }
}, KV = /* @__PURE__ */ Se(zV, [["__scopeId", "data-v-ce07b8da"]]);
const JV = (e) => (Ze("data-v-3dfb2b91"), e = e(), qe(), e), XV = ["data-disabled"], QV = { class: "form-check form-switch" }, ZV = ["id", "value", "disabled"], qV = ["for", "title"], eF = { class: "node-name fw-bold border-end me-2 pe-2" }, tF = { class: "node-label" }, nF = {
  key: 0,
  class: "text-muted d-block"
}, sF = ["onClick"], oF = { class: "w-100" }, rF = { class: "d-flex align-items-start" }, aF = ["onClick"], iF = {
  key: 0,
  class: "text-muted"
}, lF = {
  key: 0,
  class: "border-end pe-1 me-1"
}, cF = { class: "ms-auto d-flex flex-column gap-2" }, uF = { class: "d-flex" }, dF = ["textContent"], fF = {
  key: 0,
  class: "form-check form-switch"
}, hF = ["id", "checked", "disabled"], pF = ["for"], mF = /* @__PURE__ */ JV(() => /* @__PURE__ */ u("span", null, "apply date range", -1)), _F = [
  mF
], vF = {
  __name: "MetadataSelectionNode",
  props: {
    node: { type: [Gt, Jt], default: null },
    dateRange: { type: Object, default: null }
  },
  setup(e) {
    const t = e, n = Li(), { node: s, dateRange: o } = $t(t), a = k({
      get: () => {
        var y, g, v;
        const _ = (y = s.value) == null ? void 0 : y.parent;
        return _ ? ((v = (g = _ == null ? void 0 : _.nodes) == null ? void 0 : g.filter((S) => S.selected)) == null ? void 0 : v.map((S) => S.name)) ?? [] : [];
      },
      set: (_) => {
        s.value.selected = !s.value.selected;
      }
    });
    function r(_) {
      var g;
      const y = (g = _ == null ? void 0 : _.target) == null ? void 0 : g.checked;
      s.value.applyDateRange = y;
    }
    const i = te(!1);
    tn(() => {
      var _;
      ((_ = s.value) == null ? void 0 : _.parent) === null && (i.value = !0);
    });
    function l() {
      return s.value.totalFilteredSelected === s.value.totalFiltered;
    }
    function c() {
      return s.value instanceof Jt;
    }
    function f() {
      return s.value instanceof Gt;
    }
    function d() {
      var _;
      ((_ = s.value) == null ? void 0 : _.parent) !== null && (i.value = !i.value);
    }
    function h() {
      const _ = s.value.filteredNodes, y = !l();
      for (const g of _)
        g.selected = y;
    }
    function p() {
      var y, g, v, S;
      const _ = s.value;
      return ((g = (y = _ == null ? void 0 : _.metadata) == null ? void 0 : y.description) == null ? void 0 : g.toUpperCase()) !== ((S = (v = _ == null ? void 0 : _.metadata) == null ? void 0 : v.label) == null ? void 0 : S.toUpperCase());
    }
    function m() {
      var g;
      const _ = s.value;
      return ((g = n == null ? void 0 : n.date_range_categories) == null ? void 0 : g.find(
        (v) => v.name === _.name
      )) !== void 0;
    }
    return (_, y) => {
      var g, v, S, w, $, C, N, A, D, F, H, P, I, V, q;
      return c() ? (b(), E("div", {
        key: 0,
        class: "node d-flex gap-2",
        "data-disabled": (v = (g = G(s)) == null ? void 0 : g.metadata) == null ? void 0 : v.disabled
      }, [
        u("div", QV, [
          L((b(), E("input", {
            class: "form-check-input",
            type: "checkbox",
            role: "switch",
            id: G(s).name,
            "onUpdate:modelValue": y[0] || (y[0] = (Y) => a.value = Y),
            value: (S = G(s)) == null ? void 0 : S.name,
            disabled: (($ = (w = G(s)) == null ? void 0 : w.parent) == null ? void 0 : $.name) === "",
            key: `node-${G(s).name}`
          }, null, 8, ZV)), [
            [Wt, a.value]
          ]),
          u("label", {
            class: "form-check-label",
            for: G(s).name,
            title: (N = (C = G(s)) == null ? void 0 : C.metadata) == null ? void 0 : N.description
          }, [
            u("span", eF, j((D = (A = G(s)) == null ? void 0 : A.metadata) == null ? void 0 : D.field), 1),
            u("span", tF, j((H = (F = G(s)) == null ? void 0 : F.metadata) == null ? void 0 : H.label), 1),
            p() ? (b(), E("small", nF, j((I = (P = G(s)) == null ? void 0 : P.metadata) == null ? void 0 : I.description), 1)) : me("", !0)
          ], 8, qV),
          (q = (V = G(s)) == null ? void 0 : V.metadata) != null && q.disabled ? (b(), Ce(Gg, {
            key: 0,
            node: G(s)
          }, null, 8, ["node"])) : me("", !0)
        ])
      ], 8, XV)) : f() ? (b(), E("div", {
        key: 1,
        class: Ne(["node-container d-flex p-2", { "border rounded": G(s).parent !== null }])
      }, [
        G(s).parent !== null ? (b(), E("div", {
          key: 0,
          onClick: kt(d, ["stop"])
        }, [
          u("i", {
            class: Ne(["node-open-status fas fa-circle-chevron-right fa-fw", { "fa-rotate-90": i.value }])
          }, null, 2)
        ], 8, sF)) : me("", !0),
        u("div", oF, [
          u("div", null, [
            u("div", rF, [
              u("div", null, [
                u("span", {
                  class: "container-name fw-bold d-block",
                  onClick: kt(d, ["stop"])
                }, j(G(s).name), 9, aF),
                G(s).parent !== null ? (b(), E("small", iF, [
                  G(s).query ? (b(), E("span", lF, "showing " + j(G(s).totalFiltered) + "/" + j(G(s).total), 1)) : me("", !0),
                  u("span", null, j(G(s).totalFilteredSelected) + "/" + j(G(s).totalFiltered) + " " + j(`field${G(s).totalSelected === 1 ? "" : "s"} selected`), 1)
                ])) : me("", !0)
              ]),
              u("div", cF, [
                u("div", uF, [
                  G(s).parent !== null ? (b(), E("button", {
                    type: "button",
                    key: `toggle-${G(s).name}`,
                    class: Ne(["btn btn-sm ms-auto", {
                      "btn-success": l(),
                      "btn-outline-secondary": !l()
                    }]),
                    onClick: h
                  }, [
                    u("span", {
                      textContent: j(
                        G(s).totalFilteredSelected === G(s).totalFiltered ? "deselect all" : "select all"
                      )
                    }, null, 8, dF)
                  ], 2)) : me("", !0)
                ]),
                we(_.$slots, "container-header-end", { node: G(s) }, void 0, !0),
                m() ? (b(), E("div", fF, [
                  u("input", {
                    class: "form-check-input",
                    type: "checkbox",
                    id: `${G(s).name}-apply-date-range`,
                    checked: G(s).applyDateRange,
                    onChange: r,
                    disabled: !Object.keys(G(o)).length || G(s).totalSelected === 0
                  }, null, 40, hF),
                  u("label", {
                    class: "form-check-label",
                    for: `${G(s).name}-apply-date-range`
                  }, _F, 8, pF)
                ])) : me("", !0)
              ])
            ])
          ]),
          i.value ? (b(!0), E(ne, { key: 0 }, Ae(G(s).filtered, (Y) => (b(), Ce(ey, {
            key: `${Y == null ? void 0 : Y.name}`,
            node: Y,
            "date-range": G(o)
          }, null, 8, ["node", "date-range"]))), 128)) : me("", !0)
        ])
      ], 2)) : me("", !0);
    };
  }
}, ey = /* @__PURE__ */ Se(vF, [["__scopeId", "data-v-3dfb2b91"]]), gF = { class: "d-flex gap-2 align-items-center" }, yF = /* @__PURE__ */ u("label", { for: "start-date" }, "from", -1), bF = ["value", "max"], wF = /* @__PURE__ */ u("label", { for: "end-date" }, "to", -1), EF = ["value", "min"], tm = "YYYY-MM-DD", SF = {
  __name: "DateRange",
  props: {
    min: { type: String, default: "" },
    max: { type: String, default: "" }
  },
  emits: ["update:min", "update:max"],
  setup(e, { emit: t }) {
    const n = e, s = te(), o = te();
    function a(c) {
      return c === "" ? !0 : !!ae(c).isValid();
    }
    k(() => r(n.min, n.max));
    function r(c, f) {
      return !a(c) || !a(f) ? !1 : c === "" || f === "" ? !0 : !ae(c).isAfter(ae(f));
    }
    function i() {
      var h, p;
      let c = (h = s == null ? void 0 : s.value) == null ? void 0 : h.value;
      const f = ae(c);
      if (!f.isValid()) {
        t("update:min", "");
        return;
      }
      c = f.format(tm), t("update:min", c);
      const d = ae((p = o == null ? void 0 : o.value) == null ? void 0 : p.value);
      d.isValid() && d.isBefore(f) && t("update:max", c);
    }
    function l() {
      var h, p;
      let c = (h = o == null ? void 0 : o.value) == null ? void 0 : h.value;
      const f = ae(c);
      if (!f.isValid()) {
        t("update:max", "");
        return;
      }
      c = f.format(tm), t("update:max", c);
      const d = ae((p = s == null ? void 0 : s.value) == null ? void 0 : p.value);
      d.isValid() && d.isAfter(f) && t("update:min", c);
    }
    return (c, f) => (b(), E("div", gF, [
      yF,
      u("input", {
        ref_key: "minRef",
        ref: s,
        type: "date",
        id: "start-date",
        class: "form-control",
        value: e.min,
        onChange: i,
        max: e.max
      }, null, 40, bF),
      wF,
      u("input", {
        ref_key: "maxRef",
        ref: o,
        type: "date",
        id: "end-date",
        class: "form-control",
        value: e.max,
        onChange: l,
        min: e.min
      }, null, 40, EF)
    ]));
  }
}, xF = { class: "card" }, $F = { class: "card-header d-flex align-items-center" }, CF = /* @__PURE__ */ u("span", { class: "fs-5" }, "Source list", -1), OF = { class: "ms-auto" }, kF = { class: "card-body" }, TF = { class: "border rounded p-2" }, NF = /* @__PURE__ */ u("span", { class: "fw-bold d-block mb-2" }, "If pulling time-based data, select the range of time from which to pull data (optional)", -1), DF = { class: "border rounded p-2 mt-2" }, AF = { class: "card-footer" }, RF = { class: "d-flex gap-2 justify-content-end" }, ty = {
  __name: "RevisionEditor",
  props: {
    revision: { type: Object, default: null }
  },
  setup(e) {
    const t = e, n = Vi(), { revision: s } = $t(t), o = k({
      get: () => (n == null ? void 0 : n.dateMin) || "",
      set: (f) => n.dateMin = f
    }), a = k({
      get: () => (n == null ? void 0 : n.dateMax) || "",
      set: (f) => n.dateMax = f
    }), r = k(() => n == null ? void 0 : n.node), i = Ai((f) => {
      r.value.filter(f);
    }, 300), l = k(() => {
      const f = {}, d = ae(o.value), h = ae(a.value);
      return d.isValid() && (f.min = d.format(tc)), h.isValid() && (f.max = h.format(tc)), f;
    }), c = k({
      get: () => r.value.query,
      set: (f) => i(f)
    });
    return tn(() => {
      n.setRevision(s.value);
    }), (f, d) => (b(), E("div", xF, [
      u("div", $F, [
        CF,
        u("div", OF, [
          L(u("input", {
            class: "form-control",
            type: "search",
            "onUpdate:modelValue": d[0] || (d[0] = (h) => c.value = h),
            placeholder: "type to search..."
          }, null, 512), [
            [Ke, c.value]
          ])
        ])
      ]),
      u("div", kF, [
        u("div", TF, [
          NF,
          T(SF, {
            min: o.value,
            "onUpdate:min": d[1] || (d[1] = (h) => o.value = h),
            max: a.value,
            "onUpdate:max": d[2] || (d[2] = (h) => a.value = h)
          }, null, 8, ["min", "max"])
        ]),
        u("div", DF, [
          T(ey, {
            node: r.value,
            "date-range": l.value
          }, null, 8, ["node", "date-range"])
        ])
      ]),
      u("div", AF, [
        u("div", RF, [
          we(f.$slots, "buttons")
        ])
      ])
    ]));
  }
}, IF = /* @__PURE__ */ u("i", { class: "fas fa-chevron-left fa-fw" }, null, -1), PF = /* @__PURE__ */ u("span", null, "Back", -1), MF = [
  IF,
  PF
], LF = /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw" }, null, -1), VF = /* @__PURE__ */ u("span", null, "Cancel", -1), FF = [
  LF,
  VF
], UF = ["disabled"], jF = /* @__PURE__ */ u("i", { class: "fas fa-check-circle fa-fw" }, null, -1), HF = /* @__PURE__ */ u("span", null, "Submit", -1), BF = [
  jF,
  HF
], YF = {
  __name: "RequestChangePage",
  setup(e) {
    const t = Vi(), n = xs(), s = ta(), o = dr(), a = Ss(), r = k(() => {
      var d;
      return n.edited ?? ((d = n.selected) == null ? void 0 : d.data);
    }), i = k(() => t.isUpdated);
    function l() {
      o.push({ name: "home" });
    }
    function c() {
      l();
    }
    async function f() {
      try {
        const d = t.validate();
        if ((d == null ? void 0 : d.length) > 0)
          throw Error(d == null ? void 0 : d.join(`
`));
        const h = await t.submit();
        a.toast({ title: "Success", body: "Revision submitted" }), s.init(), l();
      } catch (d) {
        a.toast({
          title: "Error",
          body: d,
          autohide: !1
        });
      }
    }
    return (d, h) => (b(), E(ne, null, [
      u("div", { class: "mb-2" }, [
        u("button", {
          class: "btn btn-sm btn-secondary",
          onClick: c
        }, MF)
      ]),
      T(ty, { revision: r.value }, {
        buttons: K(() => [
          u("button", {
            class: "btn btn-sm btn-secondary",
            onClick: c
          }, FF),
          u("button", {
            class: "btn btn-sm btn-primary",
            onClick: f,
            disabled: !i.value
          }, BF, 8, UF)
        ]),
        _: 1
      }, 8, ["revision"])
    ], 64));
  }
}, WF = ["value"], GF = ["value"], zF = ["value"], KF = ["value"], JF = ["value"], XF = ["value"], QF = ["value"], ny = {
  __name: "RevisionForm",
  props: {
    revision: { type: Object },
    user_id: { type: String },
    request_id: { type: String }
  },
  setup(e) {
    const t = e, n = k(() => t == null ? void 0 : t.user_id), s = k(() => t == null ? void 0 : t.request_id), o = k(() => {
      var c;
      return (c = t == null ? void 0 : t.revision) == null ? void 0 : c.fields;
    }), a = k(() => {
      var c;
      return (c = t == null ? void 0 : t.revision) == null ? void 0 : c.dateMin;
    }), r = k(() => {
      var c;
      return (c = t == null ? void 0 : t.revision) == null ? void 0 : c.dateMax;
    }), i = k(
      () => {
        var c;
        return (c = t == null ? void 0 : t.revision) == null ? void 0 : c.date_range_categories;
      }
    ), l = k(() => {
      var c;
      return (c = t == null ? void 0 : t.revision) == null ? void 0 : c.mrns;
    });
    return (c, f) => (b(), E("div", null, [
      u("input", {
        type: "hidden",
        name: "datamart[user_id]",
        value: n.value
      }, null, 8, WF),
      u("input", {
        type: "hidden",
        name: "datamart[request_id]",
        value: s.value
      }, null, 8, GF),
      u("input", {
        type: "hidden",
        name: "datamart[daterange][min]",
        value: a.value
      }, null, 8, zF),
      u("input", {
        type: "hidden",
        name: "datamart[daterange][max]",
        value: r.value
      }, null, 8, KF),
      (b(!0), E(ne, null, Ae(i.value, (d, h) => (b(), E("input", {
        key: h,
        type: "hidden",
        name: "datamart[date_range_categories][]",
        value: d
      }, null, 8, JF))), 128)),
      (b(!0), E(ne, null, Ae(o.value, (d, h) => (b(), E("input", {
        key: h,
        type: "hidden",
        name: "datamart[fields][]",
        value: d
      }, null, 8, XF))), 128)),
      (b(!0), E(ne, null, Ae(l.value, (d, h) => (b(), E("input", {
        key: h,
        type: "hidden",
        name: "datamart[mrns][]",
        value: d
      }, null, 8, QF))), 128))
    ]));
  }
}, ZF = { class: "d-flex" }, qF = { class: "ms-auto text-muted" }, e4 = /* @__PURE__ */ u("span", null, "Total MRNs: ", -1), t4 = {
  __name: "MrnListEditor",
  setup(e) {
    const t = Vi(), n = (i) => i.split(`
`).filter((l) => l.trim() !== ""), s = Ai((i) => {
      o.value = i, t.mrns = n(i);
    }, 300), o = te(""), a = k({
      get: () => o.value,
      set: (i) => s(i)
    }), r = k(() => t.mrns.length);
    return (i, l) => (b(), E("div", null, [
      L(u("textarea", {
        class: "form-control",
        rows: "5",
        "onUpdate:modelValue": l[0] || (l[0] = (c) => a.value = c)
      }, null, 512), [
        [Ke, a.value]
      ]),
      u("div", ZF, [
        u("div", qF, [
          e4,
          u("span", null, j(r.value), 1)
        ])
      ])
    ]));
  }
}, n4 = { class: "card mt-2" }, s4 = /* @__PURE__ */ u("div", { class: "card-header" }, [
  /* @__PURE__ */ u("span", { class: "fs-5" }, "Enter medical record numbers of patients to import from the EHR (one per line, optional)")
], -1), o4 = { class: "card-body" }, r4 = { class: "card-footer" }, a4 = {
  key: 0,
  class: "alert alert-danger"
}, i4 = /* @__PURE__ */ u("span", null, "This revision is invalid", -1), l4 = {
  __name: "CreateProjectPage",
  setup(e) {
    const t = Vi(), n = k(() => t.isValid), s = k(() => t.validationErrors);
    return Xt(
      () => t == null ? void 0 : t.new,
      () => t.validate(),
      { immediate: !1, deep: !0 }
    ), (o, a) => {
      var r;
      return b(), E("div", null, [
        T(ny, {
          revision: (r = G(t)) == null ? void 0 : r.new
        }, null, 8, ["revision"]),
        T(ty),
        u("div", n4, [
          s4,
          u("div", o4, [
            T(t4)
          ]),
          u("div", r4, [
            n.value ? me("", !0) : (b(), E("div", a4, [
              i4,
              u("ul", null, [
                (b(!0), E(ne, null, Ae(s.value, (i, l) => (b(), E("li", { key: l }, [
                  u("span", null, j(i), 1)
                ]))), 128))
              ])
            ]))
          ])
        ])
      ]);
    };
  }
};
const sy = (e) => (Ze("data-v-9054ac40"), e = e(), qe(), e), c4 = { class: "mrn-list border p-2 rounded" }, u4 = /* @__PURE__ */ sy(() => /* @__PURE__ */ u("span", null, "Total MRNs: ", -1)), d4 = { class: "d-flex d-none" }, f4 = { class: "ms-auto text-muted" }, h4 = /* @__PURE__ */ sy(() => /* @__PURE__ */ u("span", null, "Total MRNs: ", -1)), p4 = {
  __name: "MrnList",
  props: {
    mrns: { type: Array, default: () => [] }
  },
  setup(e) {
    const t = e, n = k(() => {
      var s;
      return ((s = t == null ? void 0 : t.mrns) == null ? void 0 : s.length) ?? 0;
    });
    return (s, o) => (b(), E("div", c4, [
      u("details", null, [
        u("summary", null, [
          u4,
          u("span", null, j(n.value), 1)
        ]),
        u("ul", null, [
          (b(!0), E(ne, null, Ae(e.mrns, (a, r) => (b(), E("li", {
            key: `${r}-${a}`
          }, j(a), 1))), 128))
        ])
      ]),
      u("div", d4, [
        u("div", f4, [
          h4,
          u("span", null, j(n.value), 1)
        ])
      ])
    ]));
  }
}, m4 = /* @__PURE__ */ Se(p4, [["__scopeId", "data-v-9054ac40"]]), _4 = { class: "mt-2" }, v4 = /* @__PURE__ */ u("span", { class: "fw-bold" }, "MRNs", -1), g4 = {
  __name: "ReviewProjectPage",
  setup(e) {
    const t = xs(), n = k(() => t == null ? void 0 : t.selected), s = k(() => {
      var a, r, i;
      return (i = (r = (a = n.value) == null ? void 0 : a.metadata) == null ? void 0 : r.creator) == null ? void 0 : i.id;
    }), o = k(() => {
      var a, r;
      return (r = (a = n.value) == null ? void 0 : a.metadata) == null ? void 0 : r.request_id;
    });
    return (a, r) => {
      var i;
      return b(), E("div", null, [
        T(ny, {
          revision: (i = n.value) == null ? void 0 : i.data,
          user_id: s.value,
          request_id: o.value
        }, null, 8, ["revision", "user_id", "request_id"]),
        T(Kg, { revision: n.value }, {
          "body-end": K(() => {
            var l, c;
            return [
              u("div", _4, [
                v4,
                T(m4, {
                  mrns: (c = (l = n.value) == null ? void 0 : l.data) == null ? void 0 : c.mrns
                }, null, 8, ["mrns"])
              ])
            ];
          }),
          _: 1
        }, 8, ["revision"])
      ]);
    };
  }
};
const y4 = { class: "folder" }, b4 = {
  key: 0,
  class: "fas fa-chevron-down fa-fw"
}, w4 = {
  key: 1,
  class: "fas fa-chevron-right fa-fw"
}, E4 = { class: "children" }, S4 = {
  __name: "FolderNode",
  props: {
    data: { type: Object }
  },
  setup(e) {
    const t = te(!0);
    function n() {
      t.value = !t.value;
    }
    return (s, o) => (b(), E("div", y4, [
      u("div", {
        class: "header",
        onClick: n
      }, [
        u("span", null, [
          t.value ? (b(), E("i", b4)) : (b(), E("i", w4))
        ]),
        u("span", null, j(e.data.name) + " (" + j(e.data.children.length) + ")", 1)
      ]),
      u("div", E4, [
        t.value ? we(s.$slots, "default", { key: 0 }, void 0, !0) : me("", !0)
      ])
    ]));
  }
}, x4 = /* @__PURE__ */ Se(S4, [["__scopeId", "data-v-97dc6dd1"]]), $4 = { class: "file" }, C4 = { class: "text-muted" }, O4 = {
  __name: "FileNode",
  props: {
    data: { type: Object }
  },
  setup(e) {
    return (t, n) => (b(), E("div", $4, [
      u("small", C4, j(e.data.name) + " - " + j(e.data.size), 1)
    ]));
  }
}, oy = {
  __name: "FileExplorer",
  props: {
    data: { type: Object },
    parent: { type: Object, default: null }
  },
  setup(e) {
    return (t, n) => e.data.type === "folder" ? (b(), Ce(x4, {
      key: 0,
      data: e.data
    }, {
      default: K(() => [
        (b(!0), E(ne, null, Ae(e.data.children, (s, o) => (b(), Ce(oy, {
          key: `${o}-${s == null ? void 0 : s.name}`,
          data: s,
          parent: e.data
        }, null, 8, ["data", "parent"]))), 128))
      ]),
      _: 1
    }, 8, ["data"])) : e.data.type === "file" ? (b(), Ce(O4, {
      key: 1,
      data: e.data
    }, null, 8, ["data"])) : me("", !0);
  }
}, k4 = () => ({
  type: "folder",
  name: "/",
  children: [
    {
      type: "folder",
      name: "Folder1",
      children: [
        {
          type: "file",
          name: "File1.txt",
          size: "2KB"
        },
        {
          type: "file",
          name: "File2.txt",
          size: "3KB"
        }
      ]
    },
    {
      type: "folder",
      name: "Folder2",
      children: [
        {
          type: "folder",
          name: "SubFolder1",
          children: [
            {
              type: "file",
              name: "File3.txt",
              size: "4KB"
            }
          ]
        },
        {
          type: "file",
          name: "File4.txt",
          size: "1KB"
        }
      ]
    },
    {
      type: "file",
      name: "File5.txt",
      size: "5KB"
    }
  ]
}), T4 = { class: "p-5" }, N4 = {
  __name: "TestPage",
  setup(e) {
    return (t, n) => (b(), E("div", T4, [
      T(oy, {
        data: G(k4)()
      }, null, 8, ["data"])
    ]));
  }
}, D4 = [
  {
    path: "/",
    component: fP,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: JL },
      { path: "test", name: "test", component: N4 },
      {
        path: "request-change",
        name: "request-change",
        component: YF
      },
      {
        path: "create-project",
        name: "create-project",
        component: l4
      },
      {
        path: "review-project",
        name: "review-project",
        component: g4
      },
      { path: "search", name: "search", component: KV },
      { path: "/:pathMatch(.*)*", component: dh }
    ]
  }
];
let il;
const A4 = () => il || (il = qc({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: Qc(),
  routes: D4
}), il), Zz = (e) => {
  const t = Un(cP);
  t.use(Qs);
  const n = A4();
  t.use(n), t.use(Io()), t.mount(e);
  const s = t.runWithContext(() => tP());
  return { app: t, router: n, store: s };
}, R4 = Ti(), ry = Ni(R4, ["pid"]), I4 = (e = {}) => {
  const t = {
    route: "DataMartController:checkDesign",
    params: e
  };
  return ry.get("", { params: t });
}, ay = (e = {}) => {
  const t = {
    route: "DataMartController:fixDesign",
    params: e
  }, n = {};
  return ry.post("", n, { params: t });
}, _a = Object.freeze({
  READY: 0,
  PROCESSING: 2,
  PROCESSED: 3,
  ERROR: 4
});
class P4 {
  constructor(t = {}) {
    /* {
        params: {formName: "labs"}
        text: "Add this field to the `labs`instrument: \"labs_unit\""
        type: "ADD_FIELDS"
    } */
    pe(this, "_id", "");
    pe(this, "_description", "");
    pe(this, "_parameters", {});
    pe(this, "_status", _a.READY);
    pe(this, "_criticality", 0);
    pe(this, "_action_type", "");
    for (let [n, s] of Object.entries(t))
      `_${n}` in this && (this[n] = s);
  }
  get id() {
    return this._id;
  }
  set id(t) {
    this._id = t;
  }
  get description() {
    return this._description;
  }
  set description(t) {
    this._description = t;
  }
  get parameters() {
    return this._parameters;
  }
  set parameters(t) {
    this._parameters = t;
  }
  get action_type() {
    return this._action_type;
  }
  set action_type(t) {
    this._action_type = t;
  }
  get criticality() {
    return this._criticality;
  }
  set criticality(t) {
    this._criticality = parseInt(t);
  }
  get status() {
    return this._status;
  }
  set status(t) {
    t in Object.values(_a) ? this._status = t : this._status = _a.ERROR;
  }
  isReady() {
    return this.status === _a.READY;
  }
  resetStatus() {
    this.status = _a.READY;
  }
}
const Mu = (e, t) => ({ message: e, variant: t }), M4 = () => wt({
  ready: !1,
  commands: [],
  privileges: {
    design: !1
  },
  project_metadata: {
    draft_mode: !1,
    can_be_modified: !1,
    status: null
  },
  error: null,
  async init() {
    try {
      this.ready = !1, await this.checkDesign();
    } catch (t) {
      this.error = t;
    } finally {
      this.ready = !0;
    }
  },
  async checkDesign() {
    var t, n;
    try {
      const s = await I4(), o = ((t = s == null ? void 0 : s.data) == null ? void 0 : t.commands) ?? [], a = ((n = s == null ? void 0 : s.data) == null ? void 0 : n.settings) ?? {};
      this.commands = o.map((r) => new P4(r)), this.privileges = (a == null ? void 0 : a.privileges) ?? {}, this.project_metadata = (a == null ? void 0 : a.project_metadata) ?? {};
    } catch (s) {
      this.error = s;
    } finally {
      this.ready = !0;
    }
  },
  async fixDesign() {
    try {
      return await ay();
    } catch (t) {
      this.error = t;
    }
  },
  get canBeModified() {
    var t;
    return ((t = this.project_metadata) == null ? void 0 : t.can_be_modified) === !0;
  },
  get isDraftMode() {
    var t;
    return ((t = this.project_metadata) == null ? void 0 : t.draft_mode) === !0;
  },
  get isProjectStatusDevelopment() {
    var t;
    return ((t = this.project_metadata) == null ? void 0 : t.status) === "development";
  },
  get hasDesignPrivileges() {
    var t;
    return ((t = this.privileges) == null ? void 0 : t.design) === !0;
  },
  get warnings() {
    const t = [];
    if (this.hasDesignPrivileges) {
      if (this.isDraftMode) {
        let n = Mu(
          'Please remember that all changes made in "draft mode" must be committed',
          "warning"
        );
        t.push(n);
      }
      if (!this.isDraftMode && !this.isProjectStatusDevelopment) {
        let n = Mu(
          'To fix the design of this project, please enter "draft mode" or move the project to "development" status, then return to this page',
          "info"
        );
        t.push(n);
      }
    } else {
      let n = Mu(
        "To fix the design of this project, please ask your administrator to visit this page",
        "info"
      );
      t.push(n);
    }
    return t;
  }
}), L4 = () => wt({
  loading: !1,
  error: null,
  async fixDesign() {
    try {
      return this.loading = !0, await ay();
    } catch (t) {
      this.error = t;
    } finally {
      this.loading = !1;
    }
  }
}), fh = Bt("app", M4), V4 = Bt("fix-design", L4);
const hh = (e) => (Ze("data-v-2fe28a06"), e = e(), qe(), e), F4 = /* @__PURE__ */ hh(() => /* @__PURE__ */ u("p", { class: "alert alert-warning" }, " Please be aware that you may need to run this tool multiple times, depending on the extent of modifications required for your project. ", -1)), U4 = /* @__PURE__ */ hh(() => /* @__PURE__ */ u("p", null, "The following actions should be performed:", -1)), j4 = { class: "table-wrapper" }, H4 = { class: "table table-bordered table-striped table-hover" }, B4 = /* @__PURE__ */ hh(() => /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", { scope: "col" }, "#"),
    /* @__PURE__ */ u("th", { scope: "col" }, "description"),
    /* @__PURE__ */ u("th", { scope: "col" }, "criticality"),
    /* @__PURE__ */ u("th", { scope: "col" }, "action type")
  ])
], -1)), Y4 = ["data-id"], W4 = { class: "description" }, G4 = { class: "text-center" }, z4 = { class: "text-center" }, K4 = {
  __name: "ActionsList",
  props: {
    commands: { type: Array, default: () => [] }
  },
  setup(e) {
    function t(s) {
      switch (s) {
        case 1:
          return "info";
        case 2:
          return "primary";
        case 3:
          return "warning";
        case 4:
          return "danger";
        default:
          return "secondary";
      }
    }
    function n(s) {
      switch (s) {
        case "automatic_action":
          return ["fa-wand-magic-sparkles"];
        case "manual_action":
          return ["fa-user"];
        default:
          return ["fa-question-circle"];
      }
    }
    return (s, o) => (b(), E("div", null, [
      F4,
      U4,
      u("div", j4, [
        u("table", H4, [
          B4,
          u("tbody", null, [
            (b(!0), E(ne, null, Ae(e.commands, (a, r) => (b(), E("tr", {
              key: `${r}-${a == null ? void 0 : a.id}`,
              class: "command",
              "data-id": a.id
            }, [
              u("td", null, j(r + 1), 1),
              u("td", null, [
                u("span", W4, j(a.description), 1)
              ]),
              u("td", G4, [
                u("span", {
                  class: Ne(["badge", `bg-${t(
                    a.criticality
                  )}`])
                }, j(a.criticality), 3)
              ]),
              u("td", z4, [
                u("i", {
                  class: Ne([
                    "fas",
                    n(a.action_type)
                  ]),
                  "fixed-width": ""
                }, null, 2)
              ])
            ], 8, Y4))), 128))
          ])
        ])
      ])
    ]));
  }
}, J4 = /* @__PURE__ */ Se(K4, [["__scopeId", "data-v-2fe28a06"]]), X4 = { key: 0 }, Q4 = ["disabled"], Z4 = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-1"
}, q4 = {
  key: 1,
  class: "fas fa-wrench fa-fw me-1"
}, e8 = /* @__PURE__ */ u("span", null, "Fix design", -1), t8 = {
  __name: "ActionButton",
  emits: ["fix-success", "fix-error"],
  setup(e, { emit: t }) {
    const n = fh(), s = V4(), o = k(() => (s == null ? void 0 : s.loading) ?? !1);
    async function a() {
      var i, l;
      let r = "";
      try {
        const c = await s.fixDesign(), f = ((i = c == null ? void 0 : c.data) == null ? void 0 : i.success) ?? !1;
        r = ((l = c == null ? void 0 : c.data) == null ? void 0 : l.message) ?? "", t(f === !0 ? "fix-success" : "fix-error", r);
      } catch (c) {
        r = Gs(c), t("fix-error", r);
      }
    }
    return (r, i) => {
      var l;
      return (l = G(n)) != null && l.canBeModified ? (b(), E("div", X4, [
        u("button", {
          class: "btn btn-sm btn-success",
          onClick: a,
          disabled: o.value
        }, [
          o.value ? (b(), E("i", Z4)) : (b(), E("i", q4)),
          e8
        ], 8, Q4)
      ])) : me("", !0);
    };
  }
}, n8 = {
  class: "card",
  style: { width: "18rem" }
}, s8 = { class: "card-body" }, o8 = /* @__PURE__ */ u("h5", { class: "card-title" }, "Criticality levels", -1), r8 = {
  __name: "CriticalityLevelsLegend",
  setup(e) {
    function t(n) {
      switch (n) {
        case 1:
          return "info";
        case 2:
          return "primary";
        case 3:
          return "warning";
        case 4:
          return "danger";
        default:
          return "secondary";
      }
    }
    return (n, s) => (b(), E("div", n8, [
      u("div", s8, [
        o8,
        u("div", null, [
          u("section", null, [
            u("span", null, [
              u("span", {
                class: Ne(["badge", `bg-${t(1)}`])
              }, "1", 2),
              ve(": low")
            ])
          ]),
          u("section", null, [
            u("span", null, [
              u("span", {
                class: Ne(["badge", `bg-${t(2)}`])
              }, "2", 2),
              ve(": medium")
            ])
          ]),
          u("section", null, [
            u("span", null, [
              u("span", {
                class: Ne(["badge", `bg-${t(3)}`])
              }, "3", 2),
              ve(": high")
            ])
          ]),
          u("section", null, [
            u("span", null, [
              u("span", {
                class: Ne(["badge", `bg-${t(4)}`])
              }, "4", 2),
              ve(": critical")
            ])
          ])
        ])
      ])
    ]));
  }
}, a8 = {}, i8 = {
  class: "card",
  style: { width: "18rem" }
}, l8 = /* @__PURE__ */ Cf('<div class="card-body"><h5 class="card-title">Action Types</h5><div><section><div id="legend-action-automatic"><i class="fas fa-wand-magic-sparkles fa-fw"></i><span>: automatic</span></div></section><section><div id="legend-action-manual"><i class="fas fa-user fa-fw"></i><span>: manual</span></div></section></div></div>', 1), c8 = [
  l8
];
function u8(e, t) {
  return b(), E("div", i8, c8);
}
const d8 = /* @__PURE__ */ Se(a8, [["render", u8]]), f8 = /* @__PURE__ */ u("i", { class: "fas fa-info-circle fa-fw me-1" }, null, -1), h8 = {
  __name: "WarningsList",
  setup(e) {
    const t = fh(), n = k(() => t.warnings);
    return (s, o) => (b(), E("div", null, [
      (b(!0), E(ne, null, Ae(n.value, (a, r) => (b(), E("div", {
        key: r,
        class: Ne(["alert", `alert-${a == null ? void 0 : a.variant}`])
      }, [
        f8,
        u("span", null, j(a == null ? void 0 : a.message), 1)
      ], 2))), 128))
    ]));
  }
}, p8 = { key: 0 }, m8 = { class: "toast-container position-fixed top-0 end-0 p-3" }, _8 = /* @__PURE__ */ u("div", { class: "me-auto" }, [
  /* @__PURE__ */ u("span", { class: "d-block" }, "Design Health check")
], -1), v8 = /* @__PURE__ */ u("i", { class: "fas fa-check-to-slot fa-fw me-1" }, null, -1), g8 = /* @__PURE__ */ u("span", null, "All tests successful", -1), y8 = /* @__PURE__ */ u("div", { class: "me-auto" }, [
  /* @__PURE__ */ u("span", { class: "d-block" }, "Design mismatch")
], -1), b8 = /* @__PURE__ */ u("i", { class: "fas fa-circle-exclamation fa-fw me-1" }, null, -1), w8 = /* @__PURE__ */ u("span", null, "The design of this project could prevent the Data Mart feature from working as intended.", -1), E8 = { class: "mt-2 d-flex" }, S8 = ["onClick"], x8 = /* @__PURE__ */ u("i", { class: "fas fa-circle-info fa-fw me-1" }, null, -1), $8 = /* @__PURE__ */ u("span", null, "Learn more", -1), C8 = [
  x8,
  $8
], O8 = { class: "d-flex gap-2" }, k8 = ["onClick"], T8 = /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1), N8 = /* @__PURE__ */ u("span", null, "Close", -1), D8 = [
  T8,
  N8
], A8 = {
  __name: "App",
  setup(e) {
    const t = fh(), n = fr(), s = te(5e3), o = te(2e4), a = k(() => t == null ? void 0 : t.error), r = k(() => (t == null ? void 0 : t.ready) ?? !1), i = k(() => (t == null ? void 0 : t.commands) ?? []), l = te();
    function c() {
      var h;
      (h = l.value) == null || h.show();
    }
    async function f(h) {
      var p;
      (p = l.value) == null || p.hide(), await n.alert({ title: "Success", body: h }), t.init();
    }
    async function d(h) {
      var p;
      (p = l.value) == null || p.hide(), await n.alert({ title: "Error", body: h }), t.init();
    }
    return dn(() => {
      t.init();
    }), (h, p) => {
      var y;
      const m = Te("b-toast"), _ = Te("b-modal");
      return r.value ? (b(), E("div", p8, [
        u("div", m8, [
          a.value ? (b(), Ce(m, {
            key: 0,
            visible: "",
            autohide: !1,
            variant: "danger",
            title: "Design Health check error"
          }, {
            default: K(() => [
              ve(j(a.value), 1)
            ]),
            _: 1
          })) : ((y = i.value) == null ? void 0 : y.length) === 0 ? (b(), Ce(m, {
            key: 1,
            visible: "",
            delay: s.value,
            variant: "success"
          }, {
            title: K(() => [
              _8
            ]),
            default: K(() => [
              v8,
              g8
            ]),
            _: 1
          }, 8, ["delay"])) : (b(), Ce(m, {
            key: 2,
            visible: "",
            delay: o.value,
            variant: "warning"
          }, {
            title: K(() => [
              y8
            ]),
            default: K(({ hide: g }) => [
              b8,
              w8,
              u("div", E8, [
                u("button", {
                  class: "ms-auto btn btn-sm btn-secondary",
                  onClick: (v) => c(g())
                }, C8, 8, S8)
              ])
            ]),
            _: 1
          }, 8, ["delay"]))
        ]),
        T(_, {
          ref_key: "commandsModalRef",
          ref: l,
          size: "lg",
          title: "Design mismatch"
        }, {
          footer: K(({ hide: g }) => [
            T(t8, {
              onFixSuccess: f,
              onFixError: d
            }),
            u("button", {
              class: "btn btn-sm btn-secondary",
              onClick: g
            }, D8, 8, k8)
          ]),
          default: K(() => [
            u("div", null, [
              T(J4, { commands: i.value }, null, 8, ["commands"]),
              T(h8),
              u("div", O8, [
                T(r8),
                T(d8)
              ])
            ])
          ]),
          _: 1
        }, 512)
      ])) : me("", !0);
    };
  }
}, qz = (e) => {
  const t = Un(A8);
  return t.use(Qs), t.use(Io()), t.mount(e), { app: t };
}, iy = () => wt({
  counter: 123
}), R8 = Bt("test", iy), I8 = Bt("test", iy, !0), P8 = { class: "d-inline-block" }, Lu = {
  __name: "CounterViewer",
  props: {
    counter: { type: Number, default: 0 }
  },
  setup(e) {
    return (t, n) => (b(), E("div", P8, j(e.counter), 1));
  }
}, M8 = { class: "border rounded p-2 my-2" }, L8 = /* @__PURE__ */ u("span", { class: "fw-bold" }, "Store: ", -1), V8 = /* @__PURE__ */ u("span", { class: "fw-bold" }, "Injected Store: ", -1), F8 = /* @__PURE__ */ u("span", { class: "fw-bold" }, "Shared Store: ", -1), U8 = {
  __name: "App",
  setup(e) {
    const t = ln("store"), n = R8(), s = I8();
    function o() {
      console.log(t, "sasas"), console.log(n == null ? void 0 : n.counter), t.test.counter++;
    }
    function a() {
      s.counter++;
    }
    function r() {
      n.counter++;
    }
    return (i, l) => (b(), E("div", M8, [
      u("button", { onClick: o }, "increment store"),
      u("button", { onClick: a }, "increment shared"),
      u("button", { onClick: r }, "increment use"),
      u("div", null, [
        L8,
        T(Lu, {
          counter: G(n).counter
        }, null, 8, ["counter"])
      ]),
      u("div", null, [
        V8,
        T(Lu, {
          counter: G(t).test.counter
        }, null, 8, ["counter"])
      ]),
      u("div", null, [
        F8,
        T(Lu, {
          counter: G(s).counter
        }, null, 8, ["counter"])
      ]),
      u("pre", null, j(i.$store), 1)
    ]));
  }
}, eK = (e) => {
  const t = Un(U8);
  return t.use(Qs), t.use(Io()), t.mount(e), { app: t };
}, j8 = Ti(), ph = Ni(j8, ["pid"], { timeout: 0 }), H8 = (e, t = null, n = {}) => {
  const s = {
    route: "FhirMappingHelperController:getResource",
    mrn: e,
    fhir_category: t,
    params: n
  };
  return ph.get("", { params: s });
}, B8 = (e, t, n) => {
  const s = {
    route: "FhirMappingHelperController:getFhirRequest"
  }, o = {
    relative_url: t,
    options: n,
    method: e
  };
  return ph.post("", o, { params: s });
}, Y8 = (e = {}) => {
  const t = {
    route: "FhirMappingHelperController:getSettings",
    params: e
  };
  return ph.get("", { params: t });
}, W8 = (e, t) => {
  const n = wt({
    category: e,
    loading: !0,
    error: null,
    data: null,
    get total() {
      var o, a;
      return ((a = (o = this.data) == null ? void 0 : o.data) == null ? void 0 : a.length) ?? 0;
    }
  });
  return (async () => {
    try {
      const o = await t();
      n.data = (o == null ? void 0 : o.data) ?? [];
    } catch (o) {
      n.error = Gs(o);
    } finally {
      n.loading = !1;
    }
  })(), n;
}, G8 = [25, 50, 100, 250], ly = (e, t) => {
  if (e === null)
    return !1;
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") {
    const n = new RegExp(t, "i");
    return e.toString().match(n);
  }
  if (typeof e == "object") {
    for (const [n, s] of Object.entries(e))
      if (ly(s, t))
        return !0;
  }
  return !1;
}, z8 = (e, t, n = "") => {
  const s = e.visibleStatuses, o = [
    ({ data: r }) => ly(r, n),
    (r) => K8(r, s)
  ];
  return Xg(((r) => {
    let i = [...r];
    return i = i.filter((l) => {
      e.queryError = null;
      try {
        for (const c of o)
          if (!c(l))
            return !1;
        return !0;
      } catch (c) {
        return console.log(c), e.queryError = "Please use a valid regular expression", !1;
      }
    }), i;
  })(t), { perPageOptions: G8 });
}, K8 = (e, t) => {
  var s;
  if ((t == null ? void 0 : t.length) === 0)
    return !0;
  const n = (s = e == null ? void 0 : e.mapping_status) == null ? void 0 : s.status;
  return console.log(n), t.includes(n);
}, J8 = () => wt({
  mrn: null,
  dateFrom: null,
  dateTo: null,
  results: [],
  // all fetching processes
  rotate: !1,
  // rotate results
  active: null,
  pagination: null,
  query: "",
  queryError: null,
  visibleStatuses: [],
  get patient() {
    var n, s, o;
    const t = this.getProcessByCategory("Demographics");
    return (o = (s = (n = t == null ? void 0 : t.data) == null ? void 0 : n.data) == null ? void 0 : s[0]) == null ? void 0 : o.data;
  },
  get total() {
    let t = 0;
    for (const n of this.results)
      t += n.total;
    return t;
  },
  /**
   * overall loading state
   */
  get loading() {
    for (const t of this.results)
      if (t.loading)
        return !0;
    return !1;
  },
  /**
   * get a date range in a FHIR compatible format
   */
  get dateRange() {
    const t = (a) => {
      if (typeof a == "string" && a.trim() !== "" && (a = ae(a), !!a.isValid()))
        return a.format("YYYY-MM-DD");
    }, n = [], s = t(this.dateFrom), o = t(this.dateTo);
    return s && n.push(`ge${s}`), o && n.push(`le${o}`), n;
  },
  getProcessByCategory(t) {
    return this.results.find((s) => s.category === t);
  },
  async fetchAll(t, n = {}) {
    var r;
    (() => {
      this.active = null, this.results = [];
    })();
    let o = null;
    ((r = this.dateRange) == null ? void 0 : r.length) > 0 && (n.date = this.dateRange);
    const a = [];
    for (const i of t) {
      o = i;
      try {
        let l = {};
        const f = W8(o, () => l = H8(
          this.mrn,
          o,
          n
        ));
        this.results.push(f), a.push(l);
      } catch {
        console.log(`there was an error fetching ${o}`);
      }
    }
    return Promise.allSettled(a);
  },
  hasFilters() {
    var t, n;
    return ((t = this.query) == null ? void 0 : t.length) > 0 || ((n = this.visibleStatuses) == null ? void 0 : n.length) > 0;
  },
  removeFilters() {
    this.setQuery(""), this.queryError = null, this.setVisibleStatuses([]);
  },
  /**
   * set the active process
   * and update the pagination
   * @param {Object} process 
   */
  setActive(t) {
    this.active = t, this.removeFilters(), this.updatePagination();
  },
  /**
   * set the query
   * and update the pagination
   * @param {String} process 
   */
  setQuery(t) {
    this.query = t, this.updatePagination();
  },
  setVisibleStatuses(t) {
    this.visibleStatuses = t, this.updatePagination();
  },
  updatePagination() {
    var n, s;
    const t = ((s = (n = this.active) == null ? void 0 : n.data) == null ? void 0 : s.data) ?? [];
    this.pagination = wt(z8(this, t, this.query));
  }
}), X8 = () => wt({
  categories: [],
  selectedCategories: [],
  async fetchCategories() {
    const e = await Y8(), t = e == null ? void 0 : e.data, n = (t == null ? void 0 : t.available_categories) ?? [];
    return this.selectedCategories = this.categories = n, t;
  }
}), Q8 = (e) => typeof e == "string" || e instanceof String, nm = ["GET", "POST", "PUT", "DELETE"], Z8 = () => wt({
  loading: !1,
  response: null,
  relativeURL: "",
  methods: [...nm],
  method: nm[0],
  parameters: [],
  addParameter() {
    const e = wt({
      key: "",
      value: "",
      enabled: !0
    });
    this.parameters.push(e);
  },
  removeParameter(e) {
    const t = this.parameters.findIndex((n) => n === e);
    return t < 0 ? !1 : (this.parameters.splice(t, 1), !0);
  },
  async fetch() {
    var e, t;
    try {
      this.loading = !0, this.response = null;
      const n = this.parameters.filter(
        (a) => a.enabled
      ), s = {};
      for (const a of n) {
        const { key: r, value: i } = a;
        Q8(r) && (Array.isArray(s[r]) || (s[r] = []), s[r].push(i));
      }
      const o = await B8(
        this.method,
        this.relativeURL,
        s
      );
      this.response = (t = (e = o == null ? void 0 : o.data) == null ? void 0 : e.metadata) == null ? void 0 : t.payload;
    } catch (n) {
      this.response = Gs(n);
    } finally {
      this.loading = !1;
    }
  }
}), $s = Bt("search", J8), Hi = Bt("customRequest", Z8), cy = Bt("settings", X8), q8 = {
  key: 0,
  class: "alert alert-danger m-2"
}, e5 = { style: { "white-space": "pre" } }, t5 = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" }, null, -1), n5 = /* @__PURE__ */ u("span", null, "Loading...", -1), s5 = {
  __name: "App",
  setup(e) {
    const t = cy(), n = te(!1), s = te();
    return dn(async () => {
      try {
        s.value = null, n.value = !0, await t.fetchCategories();
      } catch (o) {
        s.value = Gs(o), console.log("There was an error loading the settings.", o);
      } finally {
        n.value = !1;
      }
    }), (o, a) => {
      const r = Te("router-view");
      return b(), E(ne, null, [
        s.value ? (b(), E("div", q8, [
          u("span", e5, j(s.value), 1)
        ])) : me("", !0),
        n.value ? (b(), E(ne, { key: 1 }, [
          t5,
          n5
        ], 64)) : s.value ? me("", !0) : (b(), Ce(r, { key: 2 }))
      ], 64);
    };
  }
};
const o5 = { class: "nav nav-tabs" }, r5 = {
  __name: "NavigationBar",
  setup(e) {
    const t = {
      props: { ...mi.props },
      setup(s, { slots: o }) {
        const { href: a, isExactActive: r } = Md(s);
        return () => Ms(
          mi,
          { ...s, custom: !0 },
          () => Ms(
            n,
            { active: r.value, href: a.value },
            () => o.default()
          )
        );
      }
    }, n = {
      props: {
        active: { type: Boolean },
        href: { type: String }
      },
      setup(s, { slots: o }) {
        return () => Ms(
          "li",
          {
            class: { "nav-item": !0 }
          },
          [
            Ms(
              "a",
              {
                class: { active: s.active, "nav-link": !0 },
                href: s.href
              },
              o.default()
            )
          ]
        );
      }
    };
    return (s, o) => (b(), E("ul", o5, [
      T(t, { to: { name: "home" } }, {
        default: K(() => [
          ve("Home")
        ]),
        _: 1
      }),
      T(t, { to: { name: "custom-request" } }, {
        default: K(() => [
          ve("Custom request")
        ]),
        _: 1
      })
    ]));
  }
}, a5 = /* @__PURE__ */ Se(r5, [["__scopeId", "data-v-55dc6340"]]), i5 = {
  __name: "MainLayout",
  setup(e) {
    return (t, n) => {
      const s = Te("router-view");
      return b(), E("div", null, [
        T(a5, { class: "mb-2" }),
        T(s)
      ]);
    };
  }
};
const l5 = ["data-key"], c5 = ["data-value"], u5 = {
  __name: "ValueViewer",
  props: {
    value: {}
  },
  setup(e) {
    const t = (n) => !isNaN(n);
    return (n, s) => e.value !== null && typeof e.value == "object" ? (b(!0), E(ne, { key: 0 }, Ae(e.value, (o, a) => (b(), E("div", {
      key: a,
      class: "table-cell value-wrapper"
    }, [
      t(a) ? me("", !0) : (b(), E("span", {
        key: 0,
        class: "cell-key text-muted me-2",
        "data-key": a
      }, j(`${a}:`), 9, l5)),
      T(Wd, { value: o }, null, 8, ["value"])
    ]))), 128)) : (b(), E("span", {
      key: 1,
      class: "cell-value",
      "data-value": e.value
    }, j(e.value), 9, c5));
  }
}, Wd = /* @__PURE__ */ Se(u5, [["__scopeId", "data-v-c303d1b6"]]);
const d5 = {
  __name: "TextMarker",
  props: {
    query: { type: String }
  },
  setup(e) {
    const t = e, n = te(null), o = (() => {
      const r = "data-marker-id";
      let i = 1;
      const l = /* @__PURE__ */ new Map(), c = () => {
        if (l.size > 0)
          for (const [y, { marked: g, text: v }] of l)
            g == null || g.replaceWith(v), l.delete(y);
      }, f = (y, g) => {
        i++, y.setAttribute(r, i), y.setAttribute("key", `${r}-${i}`), l.set(i, { marked: y, text: g });
      }, d = (y, g, v) => {
        const S = document.createElement("span"), w = document.createTextNode(y), $ = document.createElement("mark");
        $.textContent = g;
        const C = document.createTextNode(v);
        return S.appendChild(w), S.appendChild($), S.appendChild(C), S;
      }, h = (y, g = "") => {
        try {
          return new RegExp(y, g);
        } catch {
          return console.log("Invalid regular expression"), !1;
        }
      }, p = (y, g) => {
        var A, D, F;
        if (y.nodeValue === "")
          return;
        const v = h(
          `(?<before>.*?)(?<found>${g})(?<after>.*)`,
          "i"
        );
        if (!v)
          return;
        const S = y.nodeValue.match(v);
        if (!S || !S.groups || S.groups.found === "")
          return;
        const w = (A = S.groups) == null ? void 0 : A.before, $ = (D = S.groups) == null ? void 0 : D.found, C = (F = S.groups) == null ? void 0 : F.after, N = d(w, $, C);
        f(N, y), y.replaceWith(N);
      }, m = (y, g) => {
        for (let v of [...y.childNodes])
          v.nodeType === Node.TEXT_NODE ? p(v, g) : m(v, g);
      };
      return (y, g) => {
        c(), m(y, g);
      };
    })(n.value), a = h_();
    return tn(() => {
      a.default(), n.value && o(n.value, t.query);
    }), (r, i) => (b(), E("span", {
      ref_key: "rootEl",
      ref: n,
      key: `marker-${e.query}`
    }, [
      we(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}, sm = /* @__PURE__ */ Se(d5, [["__scopeId", "data-v-9c5e8ccc"]]), f5 = {
  key: 0,
  class: "badge rounded-pill text-bg-primary"
}, h5 = {
  key: 1,
  class: "badge rounded-pill text-bg-light"
}, p5 = {
  __name: "MappingStatus",
  props: {
    mapped: {
      type: Boolean
    }
  },
  setup(e) {
    return (t, n) => (b(), E("div", null, [
      e.mapped ? (b(), E("span", f5, "Mapped")) : (b(), E("span", h5, "Not Mapped"))
    ]));
  }
};
const m5 = (e) => (Ze("data-v-9175b4dd"), e = e(), qe(), e), _5 = { "data-table-wrapper": "" }, v5 = {
  key: 0,
  class: "rotated-entries border p-2"
}, g5 = ["data-key"], y5 = {
  key: 1,
  class: "table table-bordered table-striped table-hover"
}, b5 = /* @__PURE__ */ m5(() => /* @__PURE__ */ u("th", null, [
  /* @__PURE__ */ u("span", null, "Mapping status")
], -1)), w5 = ["data-status"], E5 = { class: "badge round-pill bg-primary" }, S5 = {
  key: 0,
  class: "text-muted fst-italic"
}, x5 = {
  __name: "ResourceEntriesTable",
  setup(e) {
    function t(c) {
      const f = /* @__PURE__ */ new Set();
      return c.forEach((d) => {
        Object.keys(d).forEach((h) => {
          f.add(h);
        });
      }), Array.from(f);
    }
    const n = $s(), s = k(() => n.pagination.items), o = k(() => n.rotate), a = k(() => s.value.map(({ data: c }) => c)), r = k(
      () => s.value.map(({ mapping_status: c }) => c ?? [])
    );
    function i(c) {
      var f;
      return (f = r.value) == null ? void 0 : f[c];
    }
    const l = k(() => t(a.value));
    return (c, f) => (b(), E("div", _5, [
      o.value ? (b(), E("div", v5, [
        (b(!0), E(ne, null, Ae(a.value, (d, h) => (b(), E("div", {
          key: `index-${h}`,
          class: "rotated-entry border mb-2"
        }, [
          (b(!0), E(ne, null, Ae(l.value, (p) => (b(), E("div", {
            key: `key-${p}`,
            class: "value-wrapper border-bottom p-2"
          }, [
            u("span", {
              class: "fw-bold me-2",
              "data-key": p
            }, j(p) + ":", 9, g5),
            T(sm, {
              query: G(n).query
            }, {
              default: K(() => [
                T(Wd, {
                  value: d[p]
                }, null, 8, ["value"])
              ]),
              _: 2
            }, 1032, ["query"])
          ]))), 128))
        ]))), 128))
      ])) : (b(), E("table", y5, [
        u("thead", null, [
          u("tr", null, [
            b5,
            (b(!0), E(ne, null, Ae(l.value, (d, h) => (b(), E("th", {
              key: `key-${h}`
            }, [
              u("span", null, j(d), 1)
            ]))), 128))
          ])
        ]),
        u("tbody", null, [
          (b(!0), E(ne, null, Ae(a.value, (d, h) => {
            var p, m, _;
            return b(), E("tr", {
              key: `index-${h}`
            }, [
              u("td", {
                "data-status": c.status = i(h)
              }, [
                u("span", E5, j((m = (p = c.status) == null ? void 0 : p.status) == null ? void 0 : m.toUpperCase()), 1),
                (_ = c.status) != null && _.reason ? (b(), E("small", S5, j(c.status.reason), 1)) : me("", !0)
              ], 8, w5),
              (b(!0), E(ne, null, Ae(l.value, (y, g) => {
                var v, S, w, $;
                return b(), E("td", {
                  key: `key-${g}-${y}`
                }, [
                  (S = (v = c.status) == null ? void 0 : v.mapped_fields) != null && S.length ? (b(), Ce(p5, {
                    key: 0,
                    mapped: ($ = (w = c.status) == null ? void 0 : w.mapped_fields) == null ? void 0 : $.includes(y)
                  }, null, 8, ["mapped"])) : me("", !0),
                  T(sm, {
                    query: G(n).query
                  }, {
                    default: K(() => [
                      T(Wd, {
                        value: d[y]
                      }, null, 8, ["value"])
                    ]),
                    _: 2
                  }, 1032, ["query"])
                ]);
              }), 128))
            ]);
          }), 128))
        ])
      ]))
    ]));
  }
}, $5 = /* @__PURE__ */ Se(x5, [["__scopeId", "data-v-9175b4dd"]]);
const uy = (e) => (Ze("data-v-9d00a646"), e = e(), qe(), e), C5 = { key: 0 }, O5 = { class: "text-nowrap d-flex align-items-center" }, k5 = { class: "me-2" }, T5 = { class: "ms-auto" }, N5 = { key: 0 }, D5 = /* @__PURE__ */ uy(() => /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw" }, null, -1)), A5 = [
  D5
], R5 = {
  key: 1,
  class: "badge bg-danger rounded-pill"
}, I5 = {
  key: 2,
  class: "badge bg-primary rounded-pill"
}, P5 = { class: "d-flex align-items-center" }, M5 = /* @__PURE__ */ uy(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Total", -1)), L5 = { class: "ms-auto" }, V5 = { class: "badge bg-primary rounded-pill" }, F5 = ["innerHTML"], U5 = {
  __name: "ResultsDropdown",
  emits: ["result-selected"],
  setup(e, { emit: t }) {
    const n = $s(), s = k(() => n.active), o = k(() => n.results), a = k(() => n.total), i = (() => {
      const c = te("errorModal"), f = te("");
      return { show: async (h) => {
        f.value = (h == null ? void 0 : h.message) || "there was an error fetching this resource", (typeof h == "string" || h instanceof String) && h.trim() !== "" && (f.value = h), c.value.show();
      }, ref: c, message: () => f.value };
    })();
    function l(c) {
      if (c != null && c.error) {
        i.show(c.error);
        return;
      }
      c != null && c.loading || n.setActive(c);
    }
    return (c, f) => {
      var _;
      const d = Te("b-dropdown-item"), h = Te("b-dropdown-divider"), p = Te("b-dropdown"), m = Te("b-modal");
      return b(), E(ne, null, [
        T(p, { size: "sm" }, {
          button: K(() => [
            s.value ? (b(), E(ne, { key: 1 }, [
              ve(j(s.value.category), 1)
            ], 64)) : (b(), E("span", C5, "Select a resource..."))
          ]),
          default: K(() => [
            (b(!0), E(ne, null, Ae(o.value, (y, g) => (b(), Ce(d, {
              key: g,
              active: s.value == y,
              onClick: (v) => l(y),
              disabled: y.loading
            }, {
              default: K(() => {
                var v, S;
                return [
                  u("div", O5, [
                    u("span", k5, j(y.category), 1),
                    u("span", T5, [
                      y.loading ? (b(), E("span", N5, A5)) : y != null && y.error ? (b(), E("span", R5, "error")) : (b(), E("span", I5, j((S = (v = y == null ? void 0 : y.data) == null ? void 0 : v.data) == null ? void 0 : S.length), 1))
                    ])
                  ])
                ];
              }),
              _: 2
            }, 1032, ["active", "onClick", "disabled"]))), 128)),
            T(h),
            T(d, null, {
              default: K(() => [
                u("span", P5, [
                  M5,
                  u("span", L5, [
                    u("span", V5, j(a.value), 1)
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        T(m, {
          ref: (_ = G(i)) == null ? void 0 : _.ref,
          size: "xl",
          class: "modal-error",
          "ok-only": ""
        }, {
          header: K(() => [
            ve("Error")
          ]),
          default: K(() => {
            var y;
            return [
              u("div", {
                innerHTML: (y = G(i)) == null ? void 0 : y.message()
              }, null, 8, F5)
            ];
          }),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, j5 = /* @__PURE__ */ Se(U5, [["__scopeId", "data-v-9d00a646"]]);
const H5 = (e) => (Ze("data-v-ba97d499"), e = e(), qe(), e), B5 = /* @__PURE__ */ H5(() => /* @__PURE__ */ u("span", null, "Rotate results", -1)), Y5 = {
  __name: "RotateResultsButton",
  setup(e) {
    const t = $s();
    function n() {
      t.rotate = !t.rotate;
    }
    return (s, o) => (b(), E("div", null, [
      u("button", {
        class: "btn btn-sm btn-secondary",
        onClick: n
      }, [
        u("i", {
          class: Ne(["fas fa-sync fa-fw me-1", { "fa-rotate-90": G(t).rotate }])
        }, null, 2),
        B5
      ])
    ]));
  }
}, W5 = /* @__PURE__ */ Se(Y5, [["__scopeId", "data-v-ba97d499"]]);
const G5 = (e) => (Ze("data-v-1ace0949"), e = e(), qe(), e), z5 = ["onClick"], K5 = { class: "" }, J5 = { class: "fw-bold" }, X5 = {
  key: 0,
  class: "fst-italic type-null"
}, Q5 = {
  key: 1,
  class: "type-boolean"
}, Z5 = {
  key: 2,
  class: "type-number"
}, q5 = {
  key: 3,
  class: "type-string"
}, e3 = /* @__PURE__ */ G5(() => /* @__PURE__ */ u("span", null, ",", -1)), t3 = {
  __name: "JsonTree",
  props: {
    json: { default: null },
    index: { type: Number, default: 0 }
  },
  setup(e) {
    const t = e, n = te(!1);
    function s(i) {
      return Array.isArray(i) ? "array" : typeof i == "object" && i !== null ? "object" : typeof i == "number" ? "number" : typeof i == "string" ? "string" : typeof i == "boolean" ? "boolean" : i === null ? "null" : "unknown";
    }
    const o = k(() => s(t.json)), a = k(() => {
      const i = {
        open: "",
        close: ""
      };
      return o.value === "array" ? (i.open = "[", i.close = "]") : o.value === "object" && (i.open = "{", i.close = "}"), i;
    });
    function r() {
      n.value = !n.value;
    }
    return (i, l) => (b(), E("span", {
      class: Ne({ collapsed: n.value })
    }, [
      o.value === "object" || o.value === "array" ? (b(), E("span", {
        key: 0,
        class: "indicator me-1",
        onClick: kt(r, ["stop"])
      }, null, 8, z5)) : me("", !0),
      u("span", null, j(a.value.open), 1),
      L(u("span", K5, [
        (b(!0), E(ne, null, Ae(e.json, (c, f) => (b(), E("div", {
          key: `${e.index}-el-${f}`,
          class: "ms-4"
        }, [
          u("span", J5, j(f) + ": ", 1),
          Array.isArray(c) ? (b(), Ce(nc, {
            key: 0,
            index: e.index + 1,
            json: c
          }, null, 8, ["index", "json"])) : typeof c == "object" && c !== null ? (b(), Ce(nc, {
            key: 1,
            index: e.index + 1,
            json: c
          }, null, 8, ["index", "json"])) : (b(), E(ne, { key: 2 }, [
            s(c) === "null" ? (b(), E("span", X5, "null")) : s(c) === "boolean" ? (b(), E("span", Q5, j(c), 1)) : s(c) === "number" ? (b(), E("span", Z5, j(c), 1)) : s(c) === "string" ? (b(), E("span", q5, '"' + j(c) + '"', 1)) : me("", !0),
            e3
          ], 64))
        ]))), 128))
      ], 512), [
        [Dc, !n.value]
      ]),
      u("span", null, j(a.value.close), 1)
    ], 2));
  }
}, nc = /* @__PURE__ */ Se(t3, [["__scopeId", "data-v-1ace0949"]]);
const hr = (e) => (Ze("data-v-a45f5ba7"), e = e(), qe(), e), n3 = ["disabled"], s3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("i", { class: "fas fa-code fa-fw me-1" }, null, -1)), o3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("span", null, "Show payload", -1)), r3 = [
  s3,
  o3
], a3 = { class: "tree-wrapper" }, i3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("i", { class: "fas fa-copy fa-fw me-1" }, null, -1)), l3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("span", null, "Copy", -1)), c3 = [
  i3,
  l3
], u3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("i", { class: "fas fa-file-arrow-down fa-fw me-1" }, null, -1)), d3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("span", null, "Download", -1)), f3 = [
  u3,
  d3
], h3 = /* @__PURE__ */ hr(() => /* @__PURE__ */ u("span", null, "Close", -1)), p3 = [
  h3
], m3 = {
  __name: "ShowCodeButton",
  setup(e) {
    const t = $s(), n = Ss(), s = nu(), o = te(), a = k(() => {
      var l, c, f;
      return (f = (c = (l = t.active) == null ? void 0 : l.data) == null ? void 0 : c.metadata) == null ? void 0 : f.payload;
    });
    function r() {
      if (!a.value)
        return;
      const l = JSON.stringify(a.value, null, "	");
      su(l, { filename: "download.json" });
    }
    async function i() {
      try {
        const l = JSON.stringify(a.value, null, 2);
        await s.copy(l), n.toast({ title: "Success", body: "Payload copied to clipboard" });
      } catch (l) {
        n.toast({
          title: "Error",
          body: `Payload NOT copied to clipboard - ${l}`
        });
      }
    }
    return (l, c) => {
      const f = Te("b-modal");
      return b(), E(ne, null, [
        u("div", null, [
          u("button", {
            class: "btn btn-sm btn-outline-secondary",
            onClick: c[0] || (c[0] = (d) => o.value.show()),
            disabled: !a.value
          }, r3, 8, n3)
        ]),
        T(f, {
          ref_key: "jsonModalRef",
          ref: o,
          size: "xl",
          "ok-only": "",
          title: "Payload"
        }, {
          footer: K(({}) => [
            u("div", { class: "d-flex gap-2" }, [
              u("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: i
              }, c3),
              u("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: r
              }, f3)
            ]),
            u("div", null, [
              u("button", {
                class: "btn btn-sm btn-secondary",
                onClick: c[1] || (c[1] = (d) => o.value.hide())
              }, p3)
            ])
          ]),
          default: K(() => [
            u("div", a3, [
              T(nc, { json: a.value }, null, 8, ["json"])
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, _3 = /* @__PURE__ */ Se(m3, [["__scopeId", "data-v-a45f5ba7"]]), v3 = { class: "d-flex align-items-center gap-2" }, g3 = ["title"], y3 = /* @__PURE__ */ u("i", { class: "fas fa-info-circle fa-fw" }, null, -1), b3 = [
  y3
], w3 = {
  __name: "QueryInput",
  setup(e) {
    const t = $s(), n = Ai((a) => {
      t.setQuery(a);
    }, 300), s = k(() => t.queryError), o = k({
      get: () => t.query,
      set: (a) => n(a)
    });
    return (a, r) => (b(), E("div", v3, [
      L(u("input", {
        class: "form-control form-control-sm",
        type: "search",
        name: "query",
        placeholder: "search...",
        "onUpdate:modelValue": r[0] || (r[0] = (i) => o.value = i)
      }, null, 512), [
        [Ke, o.value]
      ]),
      s.value ? (b(), E("span", {
        key: 0,
        title: s.value,
        class: "text-danger"
      }, b3, 8, g3)) : me("", !0)
    ]));
  }
}, E3 = {
  "data-prevent-close": "",
  class: "p-2"
}, S3 = ["id", "value"], x3 = ["for"], $3 = {
  __name: "MappingStatusSelect",
  setup(e) {
    const t = $s(), n = k(() => {
      var r, i;
      return ((i = (r = t.active) == null ? void 0 : r.data) == null ? void 0 : i.data) ?? [];
    }), s = k(
      () => n.value.map(({ mapping_status: r }) => r ?? [])
    ), o = k(() => {
      var i;
      const r = new Set(
        (i = s.value) == null ? void 0 : i.map(({ status: l }) => l)
      );
      return Array.from(r);
    }), a = k({
      get: () => t.visibleStatuses,
      set: (r) => {
        t.setVisibleStatuses([...r]);
      }
    });
    return (r, i) => {
      var c;
      const l = Te("b-dropdown");
      return b(), Ce(l, {
        size: "sm",
        disabled: ((c = o.value) == null ? void 0 : c.length) === 0,
        variant: "outline-primary"
      }, {
        button: K(() => [
          ve("Mapping status")
        ]),
        default: K(() => [
          u("div", E3, [
            (b(!0), E(ne, null, Ae(o.value, (f, d) => (b(), E("div", {
              key: d,
              class: "form-check form-switch"
            }, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                id: `status-${d}`,
                value: f,
                "onUpdate:modelValue": i[0] || (i[0] = (h) => a.value = h)
              }, null, 8, S3), [
                [Wt, a.value]
              ]),
              u("label", {
                class: "form-check-label",
                for: `status-${d}`
              }, j(f), 9, x3)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
}, C3 = { class: "d-flex flex-column border rounded p-2 gap-2" }, O3 = { class: "d-flex gap-2" }, k3 = { class: "d-flex gap-2" }, T3 = { class: "ms-auto" }, N3 = { class: "d-flex" }, D3 = { class: "d-flex gap-2 ms-auto" }, A3 = {
  __name: "ResultsToolbar",
  setup(e) {
    const t = $s(), n = k({
      get: () => {
        var r;
        return (r = t.pagination) == null ? void 0 : r.limit;
      },
      set: (r) => t.pagination.limit = r
    }), s = k({
      get: () => {
        var r;
        return (r = t.pagination) == null ? void 0 : r.page;
      },
      set: (r) => t.pagination.page = r
    }), o = k({
      get: () => {
        var r;
        return (r = t == null ? void 0 : t.pagination) == null ? void 0 : r.total;
      }
    }), a = k({
      get: () => {
        var r;
        return (r = t.pagination) == null ? void 0 : r.perPageOptions;
      }
    });
    return (r, i) => {
      const l = Te("b-pagination"), c = Te("b-pagination-dropdown");
      return b(), E("div", C3, [
        u("div", O3, [
          u("div", k3, [
            T(W5),
            T($3),
            T(w3)
          ]),
          u("div", T3, [
            T(_3)
          ])
        ]),
        u("div", N3, [
          T(j5),
          u("div", D3, [
            T(l, {
              size: "sm",
              perPage: n.value,
              totalItems: o.value,
              modelValue: s.value,
              "onUpdate:modelValue": i[0] || (i[0] = (f) => s.value = f)
            }, null, 8, ["perPage", "totalItems", "modelValue"]),
            T(c, {
              options: a.value,
              modelValue: n.value,
              "onUpdate:modelValue": i[1] || (i[1] = (f) => n.value = f)
            }, null, 8, ["options", "modelValue"])
          ])
        ])
      ]);
    };
  }
};
const R3 = (e) => (Ze("data-v-88ab4357"), e = e(), qe(), e), I3 = { "data-prevent-close": "" }, P3 = { class: "line-item px-2 text-nowrap border-bottom mb-2" }, M3 = ["indeterminate"], L3 = /* @__PURE__ */ R3(() => /* @__PURE__ */ u("label", {
  class: "form-label ms-2",
  for: "checkbox-all"
}, "All categories", -1)), V3 = ["value", "id"], F3 = ["for"], U3 = {
  __name: "CategoriesDropdown",
  props: {
    categories: { type: Array },
    selected: { type: Array },
    variant: { type: String, default: "light" }
  },
  emits: ["update:selected"],
  setup(e, { emit: t }) {
    const n = e, s = k(() => {
      var l, c;
      const r = ((l = n == null ? void 0 : n.selected) == null ? void 0 : l.length) ?? 0, i = ((c = n == null ? void 0 : n.categories) == null ? void 0 : c.length) ?? 0;
      return r === 0 ? !1 : r !== i;
    }), o = k({
      get() {
        var r, i;
        return ((r = n == null ? void 0 : n.selected) == null ? void 0 : r.length) === ((i = n == null ? void 0 : n.categories) == null ? void 0 : i.length);
      },
      set(r) {
        r ? t("update:selected", n.categories) : t("update:selected", []);
      }
    }), a = k({
      get: () => n.selected,
      set: (r) => {
        t("update:selected", r);
      }
    });
    return (r, i) => {
      const l = Te("b-dropdown");
      return b(), Ce(l, {
        variant: e.variant,
        size: "sm"
      }, {
        default: K(() => [
          u("div", I3, [
            u("div", P3, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                id: "checkbox-all",
                value: !0,
                "onUpdate:modelValue": i[0] || (i[0] = (c) => o.value = c),
                indeterminate: s.value
              }, null, 8, M3), [
                [Wt, o.value]
              ]),
              L3
            ]),
            (b(!0), E(ne, null, Ae(e.categories, (c) => (b(), E("div", {
              key: `${c}`,
              class: "line-item px-2 text-nowrap"
            }, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                value: c,
                id: `checkbox-${c}`,
                "onUpdate:modelValue": i[1] || (i[1] = (f) => a.value = f)
              }, null, 8, V3), [
                [Wt, a.value]
              ]),
              u("label", {
                class: "form-label ms-2",
                for: `checkbox-${c}`
              }, j(c), 9, F3)
            ]))), 128))
          ])
        ]),
        _: 1
      }, 8, ["variant"]);
    };
  }
}, j3 = /* @__PURE__ */ Se(U3, [["__scopeId", "data-v-88ab4357"]]), H3 = { class: "d-flex" }, B3 = { class: "d-flex border p-2 rounded flex-column gap-2" }, Y3 = { class: "d-flex align-items-center gap-2" }, W3 = /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "mrn"
}, "MRN", -1), G3 = /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "date-from"
}, "Date from", -1), z3 = /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "date-to"
}, "Date to", -1), K3 = { class: "d-flex" }, J3 = { class: "ms-auto" }, X3 = { class: "btn-group" }, Q3 = ["disabled"], Z3 = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-1"
}, q3 = {
  key: 1,
  class: "fas fa-cloud-arrow-down fa-fw me-1"
}, eU = /* @__PURE__ */ u("span", null, "Fetch", -1), tU = { class: "mx-1 fw-bold" }, nU = {
  __name: "SearchForm",
  setup(e) {
    const t = $s(), n = cy(), s = k(() => n.categories), o = k({
      get: () => n.selectedCategories,
      set: (f) => n.selectedCategories = f
    }), a = k({
      get: () => t.mrn,
      set: (f) => t.mrn = f
    }), r = k({
      get: () => t.dateFrom,
      set: (f) => t.dateFrom = f
    }), i = k({
      get: () => t.dateTo,
      set: (f) => t.dateTo = f
    }), l = () => {
      var d;
      if ((((d = t == null ? void 0 : t.results) == null ? void 0 : d.length) ?? 0) !== 0) {
        for (const h of t.results)
          if (!(h.error || h.total === 0)) {
            t.setActive(h);
            break;
          }
      }
    };
    async function c() {
      t.setActive(null), await t.fetchAll(o.value), t.active === null && l();
    }
    return (f, d) => {
      var h, p, m;
      return b(), E("div", H3, [
        u("div", B3, [
          u("div", Y3, [
            u("div", null, [
              W3,
              L(u("input", {
                class: "form-control form-control-sm",
                type: "text",
                id: "mrn",
                placeholder: "MRN",
                "onUpdate:modelValue": d[0] || (d[0] = (_) => a.value = _)
              }, null, 512), [
                [Ke, a.value]
              ])
            ]),
            u("div", null, [
              G3,
              L(u("input", {
                type: "date",
                class: "form-control form-control-sm",
                id: "date-from",
                placeholder: "date-from",
                "onUpdate:modelValue": d[1] || (d[1] = (_) => r.value = _)
              }, null, 512), [
                [Ke, r.value]
              ])
            ]),
            u("div", null, [
              z3,
              L(u("input", {
                type: "date",
                class: "form-control form-control-sm",
                id: "date-to",
                placeholder: "date-to",
                "onUpdate:modelValue": d[2] || (d[2] = (_) => i.value = _)
              }, null, 512), [
                [Ke, i.value]
              ])
            ])
          ]),
          u("div", K3, [
            u("div", J3, [
              u("div", X3, [
                u("button", {
                  class: "btn btn-sm btn-success",
                  onClick: c,
                  disabled: !a.value || G(t).loading || ((h = o.value) == null ? void 0 : h.length) === 0
                }, [
                  G(t).loading ? (b(), E("i", Z3)) : (b(), E("i", q3)),
                  eU,
                  u("span", tU, j(((p = o.value) == null ? void 0 : p.length) ?? 0), 1),
                  u("span", null, "resource" + j(((m = o.value) == null ? void 0 : m.length) === 1 ? "" : "s"), 1)
                ], 8, Q3),
                T(j3, {
                  categories: s.value,
                  selected: o.value,
                  "onUpdate:selected": d[3] || (d[3] = (_) => o.value = _),
                  variant: "success"
                }, null, 8, ["categories", "selected"])
              ])
            ])
          ])
        ])
      ]);
    };
  }
}, sU = {
  __name: "AnimatedCounter",
  props: {
    value: { type: Number, default: 0 },
    duration: { type: Number, default: 300 }
    //milliseconds
  },
  setup(e) {
    const t = e, n = te(!1), s = te(0), o = te(""), a = Jg((r) => {
      o.value = r;
    });
    return tn(async () => {
      const r = s.value, i = t.value;
      s.value = i, n.value = !0, await a(r, i, t.duration), n.value = !1;
    }), (r, i) => we(r.$slots, "default", {
      animating: n.value,
      text: o.value
    }, () => [
      u("span", {
        class: Ne({ animating: n.value })
      }, j(o.value), 3)
    ]);
  }
};
const na = (e) => (Ze("data-v-7fb4c91a"), e = e(), qe(), e), oU = {
  key: 0,
  class: "border rounded p-2"
}, rU = { class: "fw-bold fs-3" }, aU = { class: "d-block text-muted fst-italic total-entries" }, iU = { class: "d-flex align-items-center gap-2" }, lU = { class: "text-muted fst-italic" }, cU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "FHIR ID", -1)), uU = ["disabled"], dU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("i", { class: "fas fa-copy fa-fw" }, null, -1)), fU = [
  dU
], hU = { key: 0 }, pU = { class: "badge bg-warning" }, mU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Deceased:", -1)), _U = { class: "patient-details" }, vU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Gender", -1)), gU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "DOB", -1)), yU = /* @__PURE__ */ na(() => /* @__PURE__ */ u("span", { class: "fw-bold" }, "Age", -1)), bU = {
  __name: "PatientPreview",
  setup(e) {
    const t = $s(), n = Ss(), s = nu();
    function o(l) {
      const c = /* @__PURE__ */ new Date(), f = new Date(l), d = c.getFullYear() - f.getFullYear();
      return c.getMonth() < f.getMonth() || c.getMonth() === f.getMonth() && c.getDate() < f.getDate() ? d - 1 : d;
    }
    const a = k(() => t.total), r = k(() => t.patient);
    async function i(l) {
      try {
        await s.copy(l), n.toast({ title: "Success", body: "FHIR ID copied to clipboard" });
      } catch (c) {
        n.toast({
          title: "Error",
          body: `FHIR ID NOT copied to clipboard - ${c}`
        });
      }
    }
    return (l, c) => {
      var f, d, h, p, m, _, y, g, v;
      return r.value ? (b(), E("div", oU, [
        u("span", rU, j(`${(f = r.value) == null ? void 0 : f["name-given"]} ${(d = r.value) == null ? void 0 : d["name-family"]}`), 1),
        u("small", aU, [
          ve(" Total entries: "),
          T(sU, { value: a.value }, {
            default: K(({ animating: S, text: w }) => [
              u("span", {
                class: Ne(["counter", { animating: S }])
              }, j(parseInt(w)), 3)
            ]),
            _: 1
          }, 8, ["value"])
        ]),
        u("div", iU, [
          u("small", lU, [
            cU,
            ve(": " + j((h = r.value) == null ? void 0 : h.fhir_id), 1)
          ]),
          u("button", {
            class: "btn btn-sm btn-outline-primary",
            onClick: c[0] || (c[0] = (S) => {
              var w;
              return i((w = r.value) == null ? void 0 : w.fhir_id);
            }),
            disabled: !((p = r.value) != null && p.fhir_id)
          }, fU, 8, uU)
        ]),
        (m = r.value) != null && m.deceasedBoolean ? (b(), E("div", hU, [
          u("span", pU, [
            mU,
            u("span", null, j(G(ae)((_ = r.value) == null ? void 0 : _.deceasedDateTime).format("YYYY-MM-DD")), 1)
          ])
        ])) : me("", !0),
        u("div", _U, [
          u("div", null, [
            vU,
            ve(": " + j((y = r.value) == null ? void 0 : y.gender), 1)
          ]),
          u("div", null, [
            gU,
            ve(": " + j((g = r.value) == null ? void 0 : g.birthDate), 1)
          ]),
          u("div", null, [
            yU,
            ve(": " + j(o((v = r.value) == null ? void 0 : v.birthDate)), 1)
          ])
        ])
      ])) : me("", !0);
    };
  }
}, wU = /* @__PURE__ */ Se(bU, [["__scopeId", "data-v-7fb4c91a"]]), EU = { class: "d-flex gap-2" }, SU = {
  "data-results": "",
  class: "my-2"
}, xU = {
  key: 0,
  class: "alert alert-info"
}, $U = /* @__PURE__ */ u("small", null, "A filter has been applied to the entries", -1), CU = /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1), OU = /* @__PURE__ */ u("span", null, "Remove filter", -1), kU = [
  CU,
  OU
], TU = {
  key: 1,
  class: "border rounded p-2"
}, NU = /* @__PURE__ */ u("span", { class: "fst-italic" }, "no entries", -1), DU = [
  NU
], AU = {
  __name: "HomePage",
  setup(e) {
    const t = $s(), n = k(() => {
      var s;
      return ((s = t.pagination) == null ? void 0 : s.items) ?? [];
    });
    return (s, o) => {
      var r, i;
      const a = Te("router-view");
      return b(), E("div", null, [
        u("div", EU, [
          T(nU),
          T(wU, { class: "flex-grow-1" })
        ]),
        (i = (r = G(t)) == null ? void 0 : r.results) != null && i.length ? (b(), Ce(A3, {
          key: 0,
          class: "my-2"
        })) : me("", !0),
        u("div", SU, [
          G(t).hasFilters() > 0 ? (b(), E("div", xU, [
            $U,
            u("button", {
              class: "btn btn-sm btn-outline-secondary ms-2",
              onClick: o[0] || (o[0] = (l) => G(t).removeFilters())
            }, kU)
          ])) : me("", !0),
          n.value.length === 0 ? (b(), E("div", TU, DU)) : (b(), Ce($5, { key: 2 }))
        ]),
        T(a)
      ]);
    };
  }
}, RU = { class: "btn-group" }, IU = ["disabled"], PU = /* @__PURE__ */ u("i", { class: "fas fa-floppy-disk fa-fw me-1" }, null, -1), MU = /* @__PURE__ */ u("span", null, "Save request...", -1), LU = [
  PU,
  MU
], VU = ["onClick"], FU = /* @__PURE__ */ u("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), UU = [
  FU
], jU = { class: "fst-italic p-2 text-muted" }, HU = { key: 0 }, BU = /* @__PURE__ */ u("span", null, "Restore a request", -1), YU = { class: "d-flex align-items-center" }, WU = { class: "me-2" }, GU = { class: "ms-auto" }, zU = ["onClick"], KU = /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1), JU = [
  KU
], XU = ["disabled"], QU = /* @__PURE__ */ u("i", { class: "fas fa-database fa-fw me-1" }, null, -1), ZU = /* @__PURE__ */ u("span", null, "Save", -1), qU = [
  QU,
  ZU
], om = "__mapping_helper_requests", ej = {
  __name: "SavedRequestsDropdown",
  setup(e) {
    const t = Hi(), n = te([]), s = te(""), o = te(), a = k(() => {
      var h, p;
      return !(((h = t == null ? void 0 : t.relativeURL) == null ? void 0 : h.trim()) !== "" || ((p = t == null ? void 0 : t.parameters) == null ? void 0 : p.length) > 0);
    });
    function r() {
      const h = localStorage.getItem(om), p = JSON.parse(h) ?? [];
      n.value = p;
    }
    function i() {
      localStorage.setItem(om, JSON.stringify(Ue(n.value)));
    }
    function l() {
      const h = {
        name: s.value,
        method: t.method,
        relativeURL: t.relativeURL,
        parameters: t.parameters
      };
      n.value.push(h), i(), o.value.hide();
    }
    function c(h) {
      var m;
      const p = (m = n.value) == null ? void 0 : m.findIndex((_) => _ === h);
      p < 0 || (n.value.splice(p, 1), i());
    }
    function f() {
      s.value = "", o.value.show();
    }
    function d(h) {
      t.method = h == null ? void 0 : h.method, t.relativeURL = (h == null ? void 0 : h.relativeURL) ?? "", t.parameters = [...(h == null ? void 0 : h.parameters) ?? []];
    }
    return dn(() => r()), (h, p) => {
      const m = Te("b-dropdown-divider"), _ = Te("b-dropdown-item"), y = Te("b-dropdown"), g = Te("b-modal");
      return b(), E("div", null, [
        T(y, {
          variant: "success",
          size: "sm"
        }, {
          header: K(({ onButtonClicked: v }) => [
            u("div", RU, [
              u("button", {
                class: "btn btn-outline-info btn-sm",
                onClick: f,
                disabled: a.value
              }, LU, 8, IU),
              u("button", {
                type: "button",
                class: "btn btn-sm btn-outline-info dropdown-toggle dropdown-toggle-split",
                onClick: v
              }, UU, 8, VU)
            ])
          ]),
          default: K(() => {
            var v;
            return [
              u("div", jU, [
                ((v = n.value) == null ? void 0 : v.length) === 0 ? (b(), E("span", HU, "No saved requests")) : (b(), E(ne, { key: 1 }, [
                  BU,
                  T(m)
                ], 64))
              ]),
              (b(!0), E(ne, null, Ae(n.value, (S, w) => (b(), Ce(_, {
                key: w,
                onClick: ($) => d(S)
              }, {
                default: K(() => [
                  u("div", YU, [
                    u("span", WU, j(S.name), 1),
                    u("span", GU, [
                      u("button", {
                        class: "btn btn-sm btn-outline-danger",
                        onClick: kt(($) => c(S), ["stop"])
                      }, JU, 8, zU)
                    ])
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"]))), 128))
            ];
          }),
          _: 1
        }),
        T(g, {
          ref_key: "saveRequestModalRef",
          ref: o
        }, {
          header: K(() => [
            ve("Save request")
          ]),
          footer: K(() => [
            u("div", null, [
              u("button", {
                class: "btn btn-sm btn-primary",
                disabled: !s.value,
                onClick: l
              }, qU, 8, XU)
            ])
          ]),
          default: K(() => [
            u("div", null, [
              L(u("input", {
                class: "form-control form-control-sm",
                type: "text",
                id: "request-name",
                "onUpdate:modelValue": p[0] || (p[0] = (v) => s.value = v),
                placeholder: "Save as..."
              }, null, 512), [
                [Ke, s.value]
              ])
            ])
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
}, tj = { class: "d-flex" }, nj = /* @__PURE__ */ u("i", { class: "fas fa-circle-plus fa-fw me-1" }, null, -1), sj = /* @__PURE__ */ u("span", null, "Add query parameter", -1), oj = [
  nj,
  sj
], rj = { class: "d-flex gap-2 align-items-center ms-auto" }, aj = ["disabled"], ij = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-1"
}, lj = {
  key: 1,
  class: "fas fa-cloud-arrow-down fa-fw me-1"
}, cj = /* @__PURE__ */ u("span", null, "Fetch", -1), uj = {
  __name: "RequestToolbar",
  setup(e) {
    const t = Hi(), n = k(() => t.loading), s = k(() => t.relativeURL.trim() === "");
    function o() {
      t.fetch();
    }
    function a() {
      t.addParameter();
    }
    return (r, i) => (b(), E("div", tj, [
      u("div", null, [
        u("button", {
          class: "btn btn-sm btn-outline-success",
          onClick: a
        }, oj)
      ]),
      u("div", rj, [
        T(ej),
        u("button", {
          class: "btn btn-sm btn-outline-primary",
          onClick: o,
          disabled: s.value
        }, [
          n.value ? (b(), E("i", ij)) : (b(), E("i", lj)),
          cj
        ], 8, aj)
      ])
    ]));
  }
}, dj = { class: "table table-bordered table-striped table-hover" }, fj = /* @__PURE__ */ u("thead", null, [
  /* @__PURE__ */ u("tr", null, [
    /* @__PURE__ */ u("th", null, "Enabled"),
    /* @__PURE__ */ u("th", null, "Key"),
    /* @__PURE__ */ u("th", null, "Value"),
    /* @__PURE__ */ u("th", null, "Actions")
  ])
], -1), hj = { key: 0 }, pj = /* @__PURE__ */ u("td", { colspan: "4" }, [
  /* @__PURE__ */ u("span", { class: "fst-italic" }, "no entries")
], -1), mj = [
  pj
], _j = { class: "d-flex" }, vj = ["onUpdate:modelValue"], gj = ["onUpdate:modelValue"], yj = ["onUpdate:modelValue"], bj = { class: "d-flex gap-2" }, wj = ["onClick"], Ej = /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1), Sj = [
  Ej
], xj = {
  __name: "ParametersList",
  setup(e) {
    const t = Hi();
    function n(s) {
      t.removeParameter(s);
    }
    return (s, o) => {
      var a, r;
      return b(), E("table", dj, [
        fj,
        u("tbody", null, [
          ((r = (a = G(t)) == null ? void 0 : a.parameters) == null ? void 0 : r.length) === 0 ? (b(), E("tr", hj, mj)) : (b(!0), E(ne, { key: 1 }, Ae(G(t).parameters, (i, l) => (b(), E("tr", { key: l }, [
            u("td", null, [
              u("div", _j, [
                L(u("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  "onUpdate:modelValue": (c) => i.enabled = c,
                  name: "request-enabled"
                }, null, 8, vj), [
                  [Wt, i.enabled]
                ])
              ])
            ]),
            u("td", null, [
              L(u("input", {
                class: "form-control form-control-sm",
                type: "text",
                "onUpdate:modelValue": (c) => i.key = c,
                placeholder: "key",
                name: "request-key"
              }, null, 8, gj), [
                [Ke, i.key]
              ])
            ]),
            u("td", null, [
              L(u("input", {
                class: "form-control form-control-sm",
                type: "text",
                "onUpdate:modelValue": (c) => i.value = c,
                placeholder: "value",
                name: "request-value"
              }, null, 8, yj), [
                [Ke, i.value]
              ])
            ]),
            u("td", null, [
              u("div", bj, [
                u("button", {
                  class: "btn btn-sm btn-danger ms-auto",
                  onClick: (c) => n(i)
                }, Sj, 8, wj)
              ])
            ])
          ]))), 128))
        ])
      ]);
    };
  }
}, $j = {
  key: 0,
  class: "border rounded p-2"
}, Cj = /* @__PURE__ */ u("h3", null, "Response", -1), Oj = /* @__PURE__ */ u("i", { class: "fas fa-copy fa-fw me-1" }, null, -1), kj = /* @__PURE__ */ u("span", null, "Copy", -1), Tj = [
  Oj,
  kj
], Nj = /* @__PURE__ */ u("i", { class: "fas fa-file-arrow-down fa-fw me-1" }, null, -1), Dj = /* @__PURE__ */ u("span", null, "Download", -1), Aj = [
  Nj,
  Dj
], Rj = {
  __name: "ResponseViewer",
  setup(e) {
    const t = Hi(), n = Ss(), s = nu(), o = te(!0);
    function a() {
      const l = t == null ? void 0 : t.response;
      if (!l)
        return;
      const c = JSON.stringify(l, null, "	");
      su(c, { fileName: "download.json" });
    }
    async function r() {
      try {
        const l = JSON.stringify(t == null ? void 0 : t.response, null, 2);
        await s.copy(l), n.toast({ title: "Success", body: "Payload copied to clipboard" });
      } catch (l) {
        n.toast({
          title: "Error",
          body: `Payload NOT copied to clipboard - ${l}`
        });
      }
    }
    const i = k(() => t.response);
    return (l, c) => (b(), E("div", null, [
      i.value ? (b(), E("div", $j, [
        Cj,
        u("div", { class: "d-flex gap-2" }, [
          u("button", {
            class: "btn btn-sm btn-outline-primary",
            onClick: r
          }, Tj),
          u("button", {
            class: "btn btn-sm btn-outline-primary",
            onClick: a
          }, Aj)
        ]),
        o.value ? (b(), Ce(nc, {
          key: 0,
          json: i.value
        }, null, 8, ["json"])) : me("", !0)
      ])) : me("", !0)
    ]));
  }
}, Ij = { class: "d-flex flex-column gap-2 border rounded p-2 mb-2" }, Pj = { class: "d-flex gap-2 align-items-center" }, Mj = { class: "input-group" }, Lj = /* @__PURE__ */ u("span", { class: "input-group-text" }, "FHIR endpoint", -1), Vj = {
  __name: "RequestForm",
  setup(e) {
    const t = Hi();
    return (n, s) => (b(), E("div", null, [
      u("div", Ij, [
        u("div", Pj, [
          u("div", Mj, [
            Lj,
            L(u("input", {
              class: "form-control form-control-sm",
              type: "text",
              placeholder: "e.g.: Patient",
              "onUpdate:modelValue": s[0] || (s[0] = (o) => G(t).relativeURL = o),
              name: "request-relative-url"
            }, null, 512), [
              [Ke, G(t).relativeURL]
            ])
          ])
        ]),
        T(uj)
      ]),
      T(xj),
      T(Rj)
    ]));
  }
};
const Fj = {
  __name: "CustomRequestPage",
  setup(e) {
    return (t, n) => (b(), Ce(Vj));
  }
}, Uj = /* @__PURE__ */ Se(Fj, [["__scopeId", "data-v-ba687488"]]), jj = [
  {
    path: "/",
    component: i5,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: AU },
      {
        path: "custom-request",
        name: "custom-request",
        component: Uj
      }
    ]
  },
  { path: "/:pathMatch(.*)*", component: dh }
];
let ll;
const Hj = () => ll || (ll = qc({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: Qc(),
  routes: jj
}), ll), tK = (e) => {
  const t = Un(s5);
  t.use(Qs), t.use(Io());
  const n = Hj();
  return t.use(n), t.mount(e), { app: t };
}, Bj = {}, Yj = {
  class: "position-fixed top-0 start-50 translate-middle-x",
  style: { "z-index": "1030" }
}, Wj = { class: "mt-2" }, Gj = /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-2" }, null, -1), zj = /* @__PURE__ */ u("span", null, "Please wait...", -1);
function Kj(e, t) {
  const n = Te("b-toast");
  return b(), E("div", Yj, [
    u("div", Wj, [
      T(n, {
        autohide: !1,
        visible: "",
        title: "Loading"
      }, {
        default: K(() => [
          Gj,
          zj
        ]),
        _: 1
      })
    ])
  ]);
}
const Jj = /* @__PURE__ */ Se(Bj, [["render", Kj]]);
let Cl = {};
const Xj = (e) => Cl = e, Gd = (e) => {
  const t = Cl == null ? void 0 : Cl[e];
  return t ?? (console.log(`error: could not find a translation for ${e}`), !1);
}, Qj = {
  // called before bound element's attributes
  // or event listeners are applied
  created(e, t, n, s) {
  },
  // called right before the element is inserted into the DOM.
  beforeMount(e, t, n, s) {
  },
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(e, t, n, s) {
    const { arg: o } = t, a = Gd(o);
    a ? e.innerHTML = a : e.innerHTML = `-- translation not found for key ${o} --`;
  },
  // called before the parent component is updated
  beforeUpdate(e, t, n, s) {
  },
  // called after the parent component and
  // all of its children have updated
  updated(e, t, n, s) {
    const { arg: o } = t, a = Gd(o);
    a ? e.innerHTML = a : e.innerHTML = `-- translation not found for key ${o} --`;
  },
  // called before the parent component is unmounted
  beforeUnmount(e, t, n, s) {
  },
  // called when the parent component is unmounted
  unmounted(e, t, n, s) {
  }
};
let Zj = Ti();
const sa = Ni(Zj, [], { timeout: 0 }), qj = async () => {
  const e = {
    params: {
      route: "CdisController:getSettings"
    }
  };
  return sa.get("", e);
}, e6 = async (e) => {
  const t = {
    params: {
      route: "CdisController:saveSettings"
    }
  };
  return sa.post("", { settings: e }, t);
}, t6 = async (e) => {
  const t = {
    params: {
      route: "CdisController:saveCustomMapping"
    }
  };
  return sa.post("", { customMapping: e }, t);
}, n6 = async (e) => {
  const t = {
    params: {
      route: "CdisController:upsertFhirSettings"
    }
  };
  return sa.post("", { settings: e }, t);
}, s6 = async (e) => {
  const t = {
    params: {
      route: "CdisController:deleteFhirSystem",
      ehr_id: e
    }
  };
  return sa.delete("", t);
}, o6 = async (e) => {
  const t = {
    params: {
      route: "CdisController:updateFhirSystemsOrder"
    }
  };
  return sa.post("", { order: e }, t);
}, r6 = () => wt({
  _lang: {},
  breakTheGlassUserTypes: [],
  // user types for the rbeak-the-glass feature
  redcapConfig: {},
  // original data as it comes from the server
  newConfig: {},
  // data modified by the user that will be sent if saved
  loading: !1,
  redirectURL: "",
  get isDirty() {
    return !Hr(this.redcapConfig, this.newConfig);
  },
  get lang() {
    return this._lang;
  },
  set lang(e) {
    Xj(e), this._lang = e;
  },
  reset() {
    this.newConfig = { ...this.redcapConfig };
  },
  async save() {
    try {
      if (this.isDirty)
        return this.loading = !0, await e6(this.newConfig);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = !1;
    }
  }
}), a6 = () => {
  let e = -1;
  return wt({
    originalList: [],
    list: [],
    current: null,
    form: {},
    loading: !1,
    setCurrent(n) {
      this.current = n, this.form = Ba(n);
    },
    // this is called by the auth params manager when an element is added
    updateAuthParams(n) {
      this.form.fhir_custom_auth_params = n;
    },
    reset() {
      this.list = Ba(this.originalList), this.list.length === 0 ? this.setCurrent(null) : this.setCurrent(this.list[0]);
    },
    // check at selected system level, NOT list level
    get isDirty() {
      return !Hr(this.current, this.form);
    },
    get listChanged() {
      return !Hr(this.list, this.originalList);
    },
    get orderChanged() {
      var n, s, o, a, r, i;
      if (((n = this.list) == null ? void 0 : n.length) !== ((s = this.originalList) == null ? void 0 : s.length))
        return !0;
      for (const l in this.originalList) {
        const c = (a = (o = this.originalList) == null ? void 0 : o[l]) == null ? void 0 : a.ehr_id, f = (i = (r = this.list) == null ? void 0 : r[l]) == null ? void 0 : i.ehr_id;
        if (c !== f)
          return !0;
      }
      return !1;
    },
    get order() {
      return this.list.map((n) => n.ehr_id);
    },
    // remove elements locally (used for new elements, not stored in the db)
    remove(n) {
      var r;
      const s = [...this.list], o = s.findIndex(
        (i) => (i == null ? void 0 : i.ehr_id) === (n == null ? void 0 : n.ehr_id)
      );
      if (o < 0)
        return;
      const a = s[o];
      s.splice(o, 1), this.list = [...s], ((r = this.current) == null ? void 0 : r.ehr_id) === (a == null ? void 0 : a.ehr_id) && (s.length === 0 ? this.setCurrent(null) : this.setCurrent(s[0]));
    },
    /**
     * 
     * @returns {Object} default data for a new system
     */
    makeNewSystem() {
      var s;
      return {
        ehr_name: "new system",
        order: ((s = this.list) == null ? void 0 : s.length) + 1,
        ehr_id: "",
        client_id: "",
        client_secret: "",
        fhir_base_url: "",
        fhir_token_url: "",
        fhir_authorize_url: "",
        fhir_identity_provider: null,
        patient_identifier_string: "",
        fhir_custom_auth_params: []
      };
    },
    async add(n) {
      n.ehr_id = e--;
      const s = await this.upsert(n);
      if (!s)
        throw new Error("Could not add the new FHIR system");
      return console.log(`FHIR system added - ID: ${s}`), s;
    },
    // set the list of available FHIR systems and set the first one as current
    init(n) {
      this.originalList = Ba(n), this.list = [...n];
      const s = n == null ? void 0 : n[0];
      this.setCurrent(s);
    },
    // update or insert a FHIR system
    async upsert(n) {
      try {
        return this.loading = !0, await n6(n);
      } catch (s) {
        console.log(s);
      } finally {
        this.loading = !1;
      }
    },
    async delete(n) {
      return await s6(n);
    },
    async updateOrder() {
      if (this.orderChanged)
        try {
          return this.loading = !0, await o6(this.order);
        } catch (n) {
          console.log(n);
        } finally {
          this.loading = !1;
        }
    },
    // save the current form
    async save() {
      if (!this.isDirty && !this.listChanged)
        return;
      const n = await this.upsert(this.form);
      n && console.log(`FHIR system saved - ID: ${n}`), await this.updateOrder();
    }
  });
}, i6 = () => {
  let e = {};
  return {
    addError(t, n) {
      const s = (n == null ? void 0 : n.message) ?? n;
      t in e || (e[t] = []), e[t].push(s);
    },
    hasErrors() {
      return !!Object.keys(e).find(
        (n) => (n == null ? void 0 : n.length) > 0
      );
    },
    errors: () => e
  };
}, dy = (e) => (n) => {
  const s = i6();
  for (const [o, a] of Object.entries(e))
    for (const r of a) {
      if (typeof r != "function") {
        console.warn(
          `the provided rule ${r} is not a valid function`
        );
        continue;
      }
      try {
        const i = r(n == null ? void 0 : n[o]);
      } catch (i) {
        s.addError(o, i);
      }
    }
  return s;
}, Wa = (e) => {
  const t = (e == null ? void 0 : e.message) ?? "this value is required";
  return (n) => {
    if (typeof n == "string" && (n = n.trim(), n.length < 1))
      throw new Error(t);
    if (!n)
      throw new Error(t);
  };
}, l6 = (e = [], t) => {
  const n = (t == null ? void 0 : t.message) ?? `this value must be one of these: '${e.join(", ")}`;
  return (s) => {
    if (!e.includes(s))
      throw new Error(n);
  };
}, c6 = (e) => {
  const t = (e == null ? void 0 : e.message) ?? "this value must be 'true'";
  return (n) => {
    if (n !== !0)
      throw new Error(t);
  };
}, u6 = (e) => {
  const t = (e == null ? void 0 : e.message) ?? "this value must be 'false'";
  return (n) => {
    if (n !== !1)
      throw new Error(t);
  };
}, d6 = (e = []) => (t) => {
  for (const n of e)
    n(t);
}, f6 = [
  "field",
  "temporal",
  "label",
  "description",
  "category",
  "subcategory",
  "identifier",
  "disabled",
  "disabled_reason"
], h6 = () => [
  "field",
  "label",
  "description",
  "category",
  "subcategory",
  "temporal",
  "identifier",
  "disabled",
  "disabled_reason"
], p6 = (e = []) => (t) => {
  if (!(!t || typeof t != "object")) {
    for (const [n, s] of Object.entries(t))
      e.includes(n) || delete t[n];
    return { ...t };
  }
}, m6 = (e) => {
  const t = ["temporal", "identifier", "disabled"];
  for (const [n, s] of Object.entries(e))
    t.includes(n) && (e[n] = GD(s));
  return e;
}, rm = p6(f6), _6 = () => wt({
  validCategories: [],
  originalList: [],
  list: [],
  loading: !1,
  // provide default data for a new entry
  useDefaultEntry() {
    return {
      temporal: !0,
      identifier: !1,
      disabled: !1
    };
  },
  reset() {
    this.list = [];
    for (const t of this.originalList)
      this.list.push({ ...t });
  },
  get isDirty() {
    if (this.originalList.length !== this.list.length)
      return !0;
    for (const t in this.originalList) {
      const n = this.originalList[t], s = this.list[t];
      if (!Hr(n, s))
        return !0;
    }
    return !1;
  },
  remove(t) {
    const n = [...this.list], s = n.findIndex((o) => o === t);
    s < 0 || (n[s], n.splice(s, 1), this.list = n);
  },
  add(t) {
    this.list.push(t);
  },
  edit(t, n) {
    const s = this.list.findIndex((a) => a === t);
    if (s < 0)
      return;
    const o = this.list[s];
    for (const [a, r] of Object.entries(n))
      o[a] = r;
    this.list[s] = o;
  },
  // set the list of available FHIR systems and set the first one as current
  init(t) {
    const n = (t == null ? void 0 : t.validCategories) ?? [];
    this.validCategories = [...n];
    const s = (t == null ? void 0 : t.list) ?? [];
    this.originalList = [...s], this.reset();
  },
  async save() {
    try {
      return this.loading = !0, await t6(this.list);
    } catch (t) {
      console.log(t);
    } finally {
      this.loading = !1;
    }
  },
  validate(t) {
    const n = {
      field: [Wa()],
      category: [
        d6([Wa(), l6(this.validCategories)])
      ],
      label: [Wa()],
      temporal: [
        c6({
          message: "the 'temporal' field must be set to 'true'"
        })
      ],
      identifier: [
        u6({
          message: "the 'identifier' field must be set to 'false'"
        })
      ]
    };
    return dy(n)(t);
  }
}), mh = Bt("app", r6), fy = Bt("fhir-system", a6), hy = Bt(
  "custom-mappings",
  _6
), Bi = Bt("_", () => {
  const e = mh(), t = fy(), n = hy();
  return wt({
    ready: !1,
    // set to true after first time the settings are loaded
    loading: !1,
    error: null,
    async init() {
      try {
        this.loading = !0, await this.loadSettings(), this.ready = !0;
      } catch (s) {
        this.error = Gs(s);
      } finally {
        this.loading = !1;
      }
    },
    async loadSettings() {
      const s = await qj(), {
        lang: o,
        redcapConfig: a,
        redirectURL: r,
        breakTheGlassUserTypes: i,
        fhirSystems: l,
        customMappingsData: c
      } = s.data;
      e.lang = o, e.redirectURL = r, e.redcapConfig = a, e.breakTheGlassUserTypes = i, e.newConfig = { ...a }, t.init(l), n.init(c);
    },
    // check if any store has pending changes
    get savePending() {
      return e.isDirty || t.isDirty || t.orderChanged || t.listChanged || n.isDirty;
    },
    // reset changes in all stoers
    resetChanges() {
      e.reset(), t.reset(), n.reset();
    },
    async saveChanges() {
      try {
        this.loading = !0;
        let s = !1;
        e.isDirty && (await e.save(), s = !0), (t.isDirty || t.listChanged) && (await t.save(), s = !0), t.orderChanged && (await t.updateOrder(), s = !0), n.isDirty && (await n.save(), s = !0), s && await this.loadSettings();
      } catch (s) {
        console.log(s);
      } finally {
        this.loading = !1;
      }
    }
  });
}), v6 = {
  key: 0,
  class: "alert alert-danger"
}, g6 = {
  __name: "App",
  setup(e) {
    const t = Bi(), n = k(() => t.loading), s = k(() => t.ready), o = k(() => t.error);
    return dn(() => {
      t.init();
    }), (a, r) => {
      const i = Te("router-view");
      return b(), E(ne, null, [
        o.value ? (b(), E("div", v6, j(o.value), 1)) : me("", !0),
        s.value ? (b(), Ce(i, { key: 1 })) : me("", !0),
        n.value ? (b(), Ce(Jj, { key: 2 })) : me("", !0)
      ], 64);
    };
  }
}, y6 = ["href"], b6 = ["href", "onClick"], Vu = {
  __name: "NavTabLink",
  props: {
    ...mi.props,
    activeClass: { type: String, default: "active" },
    inactiveClass: { type: String, default: "" },
    disabled: { type: Boolean, default: !1 }
    // if this function returns false, then stop the navigation
  },
  setup(e) {
    const t = e, n = k(
      () => typeof t.to == "string" && t.to.startsWith("http")
    );
    function s(o) {
      t.disabled !== !0 && o();
    }
    return (o, a) => n.value ? (b(), E("a", Dn({ key: 0 }, o.$attrs, {
      href: o.to,
      target: "_blank",
      class: { disabled: e.disabled }
    }), [
      we(o.$slots, "default")
    ], 16, y6)) : (b(), Ce(G(mi), Dn({ key: 1 }, o.$props, { custom: "" }), {
      default: K(({ isExactActive: r, href: i, navigate: l }) => [
        u("a", Dn({ class: "nav-link" }, o.$attrs, {
          href: i,
          onClick: kt((c) => s(l), ["prevent"]),
          class: {
            [r ? e.activeClass : e.inactiveClass]: !0,
            disabled: e.disabled
          }
        }), [
          we(o.$slots, "default")
        ], 16, b6)
      ]),
      _: 3
    }, 16));
  }
};
const oa = (e) => (Ze("data-v-3e7295ed"), e = e(), qe(), e), w6 = {
  class: "position-fixed top-0 start-50 translate-middle-x",
  style: { "z-index": "1030" }
}, E6 = { class: "p-3 mb-2 d-flex justify-content-center" }, S6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("div", { class: "me-auto" }, [
  /* @__PURE__ */ u("i", { class: "fas fa-warning fa-fw me-2 text-warning" }),
  /* @__PURE__ */ u("span", null, "Unsaved changes")
], -1)), x6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("span", null, "Careful - you have unsaved changes!", -1)), $6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("i", { class: "fas fa-rotate-left fa-fw me-2" }, null, -1)), C6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("span", null, "Revert", -1)), O6 = [
  $6,
  C6
], k6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("i", { class: "fas fa-save fa-fw me-2" }, null, -1)), T6 = /* @__PURE__ */ oa(() => /* @__PURE__ */ u("span", null, "Save Changes", -1)), N6 = [
  k6,
  T6
], D6 = {
  __name: "PendingSaveAlert",
  setup(e) {
    const t = Bi();
    function n() {
      t.resetChanges();
    }
    async function s() {
      await t.saveChanges();
    }
    return (o, a) => {
      const r = Te("b-toast");
      return b(), E("div", w6, [
        u("div", E6, [
          T(r, {
            autohide: !1,
            visible: ""
          }, {
            title: K(() => [
              S6
            ]),
            default: K(() => [
              x6,
              u("div", { class: "pt-2 d-flex justify-content-start gap-2" }, [
                u("button", {
                  type: "button",
                  class: "btn btn-sm btn-secondary",
                  onClick: n
                }, O6),
                u("button", {
                  type: "button",
                  class: "btn btn-sm btn-primary",
                  onClick: s
                }, N6)
              ])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
}, A6 = /* @__PURE__ */ Se(D6, [["__scopeId", "data-v-3e7295ed"]]), R6 = { class: "nav nav-tabs" }, I6 = { class: "nav-item" }, P6 = { class: "nav-item" }, M6 = { class: "nav-item" }, L6 = {
  __name: "SettingsMenu",
  setup(e) {
    const t = Bi(), n = k(() => t.savePending), s = k(() => t.loading);
    return (o, a) => (b(), E("div", null, [
      u("ul", R6, [
        u("li", I6, [
          T(Vu, {
            to: { name: "home" },
            disabled: n.value
          }, {
            default: K(() => [
              ve("Settings")
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        u("li", P6, [
          T(Vu, {
            to: { name: "fhir-systems" },
            disabled: n.value
          }, {
            default: K(() => [
              ve("FHIR Systems")
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        u("li", M6, [
          T(Vu, {
            to: { name: "custom-mappings" },
            disabled: n.value
          }, {
            default: K(() => [
              ve("Custom Mappings")
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      !s.value && n.value ? (b(), Ce(A6, { key: 0 })) : me("", !0)
    ]));
  }
}, V6 = { class: "border rounded" }, F6 = {
  __name: "MainLayout",
  setup(e) {
    return (t, n) => {
      const s = Te("router-view");
      return b(), E("div", null, [
        T(L6),
        u("div", V6, [
          T(s)
        ])
      ]);
    };
  }
}, U6 = (e) => !!new RegExp(
  "^(https?:\\/\\/)?((([a-zA-Z\\d](([a-zA-Z\\d-]*[a-zA-Z\\d])?))\\.)+[a-zA-Z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*(\\?[;&a-zA-Z\\d%_.~+=-]*)?(\\#[-a-zA-Z\\d_]*)?$",
  "i"
).test(e);
const qs = (e) => (Ze("data-v-6ad73c77"), e = e(), qe(), e), j6 = { class: "settings-container p-2" }, H6 = { class: "section-title" }, B6 = { class: "row" }, Y6 = { class: "col" }, W6 = { class: "section-label" }, G6 = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("i", { class: "fas fa-database fa-fw me-1" }, null, -1)), z6 = { class: "col" }, K6 = { value: "0" }, J6 = { value: "1" }, X6 = { class: "row mt-4" }, Q6 = { class: "col" }, Z6 = { class: "section-label" }, q6 = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("i", { class: "fas fa-shopping-cart fa-fw me-1" }, null, -1)), eH = { class: "col" }, tH = { value: "0" }, nH = { value: "1" }, sH = { class: "text-danger" }, oH = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("hr", null, null, -1)), rH = { class: "section-title" }, aH = { class: "section-description" }, iH = { class: "row mt-4" }, lH = { class: "col" }, cH = { class: "section-label" }, uH = { class: "col" }, dH = { value: "0" }, fH = { value: "1" }, hH = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("hr", null, null, -1)), pH = { class: "section-title" }, mH = { class: "section-description" }, _H = { class: "row mt-4" }, vH = { class: "col" }, gH = { class: "section-label" }, yH = { class: "col" }, bH = { value: "" }, wH = { value: "enabled" }, EH = { class: "row mt-4" }, SH = { class: "col" }, xH = { class: "section-label" }, $H = { class: "col" }, CH = ["value"], OH = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("hr", null, null, -1)), kH = { class: "section-title" }, TH = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("div", { class: "section-description" }, null, -1)), NH = { class: "row mt-4" }, DH = { class: "col" }, AH = { class: "section-label" }, RH = { class: "col" }, IH = { class: "input-group mb-3" }, PH = { class: "text-danger" }, MH = { class: "row mt-4" }, LH = { class: "col" }, VH = { class: "section-label" }, FH = { class: "col" }, UH = { class: "text-danger" }, jH = { class: "row mt-4" }, HH = { class: "col" }, BH = { class: "section-label" }, YH = { class: "col" }, WH = { value: "0" }, GH = { value: "1" }, zH = { class: "row mt-4" }, KH = { class: "col" }, JH = { class: "section-label" }, XH = { class: "text-danger" }, QH = { class: "col" }, ZH = { value: "0" }, qH = { value: "1" }, eB = { class: "row mt-4" }, tB = { class: "col" }, nB = { class: "section-label" }, sB = { class: "col" }, oB = { class: "d-flex align-items-center gap-2" }, rB = { class: "fw-bold" }, aB = { class: "fw-bold" }, iB = { class: "row mt-4" }, lB = { class: "col" }, cB = { class: "section-label" }, uB = { class: "col" }, dB = { class: "d-flex align-items-center gap-2" }, fB = { class: "fw-bold" }, hB = { class: "row mt-4" }, pB = { class: "col" }, mB = { class: "section-label" }, _B = { class: "col" }, vB = { value: "0" }, gB = { value: "1" }, yB = { class: "row mt-4" }, bB = { class: "col" }, wB = { class: "section-label" }, EB = { class: "col" }, SB = { value: "0" }, xB = { value: "2" }, $B = { value: "1" }, CB = { class: "row mt-4" }, OB = { class: "col" }, kB = { class: "section-label" }, TB = { class: "col" }, NB = { value: "1" }, DB = { value: "0" }, AB = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("hr", null, null, -1)), RB = { class: "d-flex align-items-center justify-content-end" }, IB = ["disabled"], PB = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("i", { class: "fas fa-save fa-fw me-2" }, null, -1)), MB = /* @__PURE__ */ qs(() => /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-2" }, null, -1)), LB = {
  __name: "HomePage",
  setup(e) {
    const t = mh(), n = Bi(), s = fr(), o = k({
      get: () => t.newConfig,
      set: (f) => t.newConfig = f
    }), a = k(() => t.breakTheGlassUserTypes), r = k(() => t.isDirty), i = k(() => n.loading);
    function l() {
      const f = event.target.value;
      U6(f) ? s.alert({ title: "<span>Success</span>", body: `The URL ${f} is valid` }) : s.alert({ title: "Error", body: `The URL ${f} is NOT valid` });
    }
    function c() {
      n.saveChanges();
    }
    return (f, d) => {
      const h = Jr("tt");
      return b(), E("div", j6, [
        u("section", null, [
          u("div", H6, [
            L(u("span", null, null, 512), [
              [h, void 0, "ws_267"]
            ])
          ]),
          u("div", B6, [
            u("div", Y6, [
              u("div", W6, [
                G6,
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_265"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_288"]
              ])
            ]),
            u("div", z6, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[0] || (d[0] = (p) => o.value.fhir_ddp_enabled = p)
              }, [
                L(u("option", K6, null, 512), [
                  [h, void 0, "global_23"]
                ]),
                L(u("option", J6, null, 512), [
                  [h, void 0, "system_config_27"]
                ])
              ], 512), [
                [vn, o.value.fhir_ddp_enabled]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_216"]
              ])
            ])
          ]),
          u("div", X6, [
            u("div", Q6, [
              u("div", Z6, [
                q6,
                L(u("span", null, null, 512), [
                  [h, void 0, "global_155"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_295"]
              ])
            ]),
            u("div", eH, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[1] || (d[1] = (p) => o.value.fhir_data_mart_create_project = p)
              }, [
                L(u("option", tH, null, 512), [
                  [h, void 0, "global_23"]
                ]),
                L(u("option", nH, null, 512), [
                  [h, void 0, "system_config_27"]
                ])
              ], 512), [
                [vn, o.value.fhir_data_mart_create_project]
              ]),
              L(u("span", sH, null, 512), [
                [h, void 0, "ws_243"]
              ])
            ])
          ])
        ]),
        oH,
        u("section", null, [
          u("div", rH, [
            L(u("span", null, null, 512), [
              [h, void 0, "cc_cdp_auto_adjudication_title"]
            ])
          ]),
          u("div", aH, [
            L(u("span", null, null, 512), [
              [h, void 0, "cc_cdp_auto_adjudication_description"]
            ])
          ]),
          u("div", iH, [
            u("div", lH, [
              u("div", cH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "cc_cdp_auto_adjudication_label"]
                ])
              ])
            ]),
            u("div", uH, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[2] || (d[2] = (p) => o.value.fhir_cdp_allow_auto_adjudication = p)
              }, [
                L(u("option", dH, null, 512), [
                  [h, void 0, "global_23"]
                ]),
                L(u("option", fH, null, 512), [
                  [h, void 0, "system_config_27"]
                ])
              ], 512), [
                [vn, o.value.fhir_cdp_allow_auto_adjudication]
              ])
            ])
          ])
        ]),
        hH,
        u("section", null, [
          u("div", pH, [
            L(u("span", null, null, 512), [
              [h, void 0, "break_glass_003"]
            ])
          ]),
          u("div", mH, [
            L(u("span", null, null, 512), [
              [h, void 0, "break_glass_004"]
            ])
          ]),
          u("div", _H, [
            u("div", vH, [
              u("div", gH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "break_the_glass_settings_01"]
                ])
              ])
            ]),
            u("div", yH, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[3] || (d[3] = (p) => o.value.fhir_break_the_glass_enabled = p)
              }, [
                L(u("option", bH, null, 512), [
                  [h, void 0, "break_the_glass_disabled"]
                ]),
                L(u("option", wH, null, 512), [
                  [h, void 0, "break_the_glass_enabled"]
                ])
              ], 512), [
                [vn, o.value.fhir_break_the_glass_enabled]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "break_glass_description"]
              ])
            ])
          ]),
          u("div", EH, [
            u("div", SH, [
              u("div", xH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "break_glass_007"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "break_glass_ehr"]
              ])
            ]),
            u("div", $H, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[4] || (d[4] = (p) => o.value.fhir_break_the_glass_ehr_usertype = p)
              }, [
                (b(!0), E(ne, null, Ae(a.value, (p, m) => (b(), E("option", {
                  key: m,
                  value: p
                }, j(p), 9, CH))), 128))
              ], 512), [
                [vn, o.value.fhir_break_the_glass_ehr_usertype]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "break_glass_usertype_ehr"]
              ])
            ])
          ])
        ]),
        OH,
        u("section", null, [
          u("div", kH, [
            L(u("span", null, null, 512), [
              [h, void 0, "ws_233"]
            ])
          ]),
          TH,
          u("div", NH, [
            u("div", DH, [
              u("div", AH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_74"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_274"]
              ]),
              u("div", null, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_230"]
                ])
              ])
            ]),
            u("div", RH, [
              u("div", IH, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  placeholder: "URL...",
                  "onUpdate:modelValue": d[5] || (d[5] = (p) => o.value.fhir_url_user_access = p)
                }, null, 512), [
                  [Ke, o.value.fhir_url_user_access]
                ]),
                L(u("button", {
                  class: "btn btn-outline-secondary",
                  type: "button",
                  onClick: d[6] || (d[6] = (p) => l(o.value.fhir_url_user_access))
                }, null, 512), [
                  [h, void 0, "edit_project_138"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_94"]
              ]),
              u("div", PH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_97"]
                ])
              ])
            ])
          ]),
          u("div", MH, [
            u("div", LH, [
              u("div", VH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_69"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_269"]
              ])
            ]),
            u("div", FH, [
              L(u("textarea", {
                class: "form-control form-control-sm",
                "onUpdate:modelValue": d[7] || (d[7] = (p) => o.value.fhir_custom_text = p)
              }, null, 512), [
                [Ke, o.value.fhir_custom_text]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "system_config_195"]
              ]),
              u("div", null, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_71"]
                ])
              ]),
              u("div", UH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_268"]
                ])
              ])
            ])
          ]),
          u("div", jH, [
            u("div", HH, [
              u("div", BH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_270"]
                ])
              ])
            ]),
            u("div", YH, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[8] || (d[8] = (p) => o.value.fhir_display_info_project_setup = p)
              }, [
                L(u("option", WH, null, 512), [
                  [h, void 0, "ws_272"]
                ]),
                L(u("option", GH, null, 512), [
                  [h, void 0, "ws_271"]
                ])
              ], 512), [
                [vn, o.value.fhir_display_info_project_setup]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_273"]
              ])
            ])
          ]),
          u("div", zH, [
            u("div", KH, [
              u("div", JH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_275"]
                ])
              ]),
              u("div", XH, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_99"]
                ])
              ])
            ]),
            u("div", QH, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[9] || (d[9] = (p) => o.value.fhir_user_rights_super_users_only = p)
              }, [
                L(u("option", ZH, null, 512), [
                  [h, void 0, "ws_276"]
                ]),
                L(u("option", qH, null, 512), [
                  [h, void 0, "ws_277"]
                ])
              ], 512), [
                [vn, o.value.fhir_user_rights_super_users_only]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_278"]
              ])
            ])
          ]),
          u("div", eB, [
            u("div", tB, [
              u("div", nB, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_84"]
                ])
              ])
            ]),
            u("div", sB, [
              u("div", oB, [
                L(u("span", rB, null, 512), [
                  [h, void 0, "ws_91"]
                ]),
                L(u("input", {
                  class: "form-control form-control-sm",
                  type: "number",
                  min: "1",
                  max: "999",
                  step: "1",
                  style: { width: "4rem" },
                  onblur: "redcap_validate(this,'1','999','hard','int');",
                  "onUpdate:modelValue": d[10] || (d[10] = (p) => o.value.fhir_data_fetch_interval = p)
                }, null, 512), [
                  [Ke, o.value.fhir_data_fetch_interval]
                ]),
                L(u("span", aB, null, 512), [
                  [h, void 0, "control_center_406"]
                ]),
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_88"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_279"]
              ])
            ])
          ]),
          u("div", iB, [
            u("div", lB, [
              u("div", cB, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_85"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_87"]
              ])
            ]),
            u("div", uB, [
              u("div", dB, [
                L(u("input", {
                  class: "form-control form-control-sm",
                  type: "number",
                  min: "1",
                  max: "999",
                  step: "1",
                  style: { width: "4rem" },
                  onblur: "redcap_validate(this,'1','999','hard','int');",
                  "onUpdate:modelValue": d[11] || (d[11] = (p) => o.value.fhir_stop_fetch_inactivity_days = p)
                }, null, 512), [
                  [Ke, o.value.fhir_stop_fetch_inactivity_days]
                ]),
                L(u("span", fB, null, 512), [
                  [h, void 0, "scheduling_25"]
                ]),
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_89"]
                ])
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_280"]
              ])
            ])
          ]),
          u("div", hB, [
            u("div", pB, [
              u("div", mB, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_252"]
                ])
              ]),
              u("div", null, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_255"]
                ])
              ])
            ]),
            u("div", _B, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[12] || (d[12] = (p) => o.value.fhir_convert_timestamp_from_gmt = p)
              }, [
                L(u("option", vB, null, 512), [
                  [h, void 0, "ws_254"]
                ]),
                L(u("option", gB, null, 512), [
                  [h, void 0, "ws_253"]
                ])
              ], 512), [
                [vn, o.value.fhir_convert_timestamp_from_gmt]
              ]),
              L(u("span", null, null, 512), [
                [h, void 0, "ws_256"]
              ])
            ])
          ]),
          u("div", yB, [
            u("div", bB, [
              u("div", wB, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_299"]
                ])
              ]),
              u("div", null, [
                L(u("span", null, null, 512), [
                  [h, void 0, "ws_339"]
                ])
              ])
            ]),
            u("div", EB, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[13] || (d[13] = (p) => o.value.fhir_include_email_address = p)
              }, [
                L(u("option", SB, null, 512), [
                  [h, void 0, "ws_301"]
                ]),
                L(u("option", xB, null, 512), [
                  [h, void 0, "ws_300"]
                ]),
                L(u("option", $B, null, 512), [
                  [h, void 0, "ws_338"]
                ])
              ], 512), [
                [vn, o.value.fhir_include_email_address]
              ])
            ])
          ]),
          u("div", CB, [
            u("div", OB, [
              u("div", kB, [
                L(u("span", null, null, 512), [
                  [h, void 0, "override_system_bundle_ca_title"]
                ])
              ]),
              u("div", null, [
                L(u("span", null, null, 512), [
                  [h, void 0, "override_system_bundle_ca_description"]
                ])
              ])
            ]),
            u("div", TB, [
              L(u("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": d[14] || (d[14] = (p) => o.value.override_system_bundle_ca = p)
              }, [
                L(u("option", NB, null, 512), [
                  [h, void 0, "override_system_bundle_ca_use_redcap"]
                ]),
                L(u("option", DB, null, 512), [
                  [h, void 0, "override_system_bundle_ca_use_system"]
                ])
              ], 512), [
                [vn, o.value.override_system_bundle_ca]
              ])
            ])
          ])
        ]),
        AB,
        u("div", RB, [
          i.value ? (b(), E("button", {
            key: 1,
            class: "btn btn-primary btn-sm",
            onClick: c,
            disabled: ""
          }, [
            MB,
            L(u("span", null, null, 512), [
              [h, void 0, "control_center_4876"]
            ])
          ])) : (b(), E("button", {
            key: 0,
            class: "btn btn-primary btn-sm",
            onClick: c,
            disabled: !r.value
          }, [
            PB,
            L(u("span", null, null, 512), [
              [h, void 0, "control_center_4876"]
            ])
          ], 8, IB))
        ])
      ]);
    };
  }
}, VB = /* @__PURE__ */ Se(LB, [["__scopeId", "data-v-6ad73c77"]]);
var FB = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function UB(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function py(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function s() {
      return this instanceof s ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(s) {
    var o = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(n, s, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[s];
      }
    });
  }), n;
}
var my = { exports: {} };
const jB = /* @__PURE__ */ py(bw);
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function am(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    t && (s = s.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, s);
  }
  return n;
}
function ys(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? am(Object(n), !0).forEach(function(s) {
      HB(e, s, n[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : am(Object(n)).forEach(function(s) {
      Object.defineProperty(e, s, Object.getOwnPropertyDescriptor(n, s));
    });
  }
  return e;
}
function Ol(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ol = function(t) {
    return typeof t;
  } : Ol = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ol(e);
}
function HB(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function zn() {
  return zn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, zn.apply(this, arguments);
}
function BB(e, t) {
  if (e == null)
    return {};
  var n = {}, s = Object.keys(e), o, a;
  for (a = 0; a < s.length; a++)
    o = s[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function YB(e, t) {
  if (e == null)
    return {};
  var n = BB(e, t), s, o;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++)
      s = a[o], !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(e, s) && (n[s] = e[s]);
  }
  return n;
}
function WB(e) {
  return GB(e) || zB(e) || KB(e) || JB();
}
function GB(e) {
  if (Array.isArray(e))
    return zd(e);
}
function zB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function KB(e, t) {
  if (e) {
    if (typeof e == "string")
      return zd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return zd(e, t);
  }
}
function zd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, s = new Array(t); n < t; n++)
    s[n] = e[n];
  return s;
}
function JB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var XB = "1.14.0";
function Hs(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var eo = Hs(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Yi = Hs(/Edge/i), im = Hs(/firefox/i), Ga = Hs(/safari/i) && !Hs(/chrome/i) && !Hs(/android/i), _y = Hs(/iP(ad|od|hone)/i), QB = Hs(/chrome/i) && Hs(/android/i), vy = {
  capture: !1,
  passive: !1
};
function nt(e, t, n) {
  e.addEventListener(t, n, !eo && vy);
}
function Je(e, t, n) {
  e.removeEventListener(t, n, !eo && vy);
}
function sc(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function ZB(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function qn(e, t, n, s) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && sc(e, t) : sc(e, t)) || s && e === n)
        return e;
      if (e === n)
        break;
    } while (e = ZB(e));
  }
  return null;
}
var lm = /\s+/g;
function It(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var s = (" " + e.className + " ").replace(lm, " ").replace(" " + t + " ", " ");
      e.className = (s + (n ? " " + t : "")).replace(lm, " ");
    }
}
function $e(e, t, n) {
  var s = e && e.style;
  if (s) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in s) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), s[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function tr(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var s = $e(e, "transform");
      s && s !== "none" && (n = s + " " + n);
    } while (!t && (e = e.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(n);
}
function gy(e, t, n) {
  if (e) {
    var s = e.getElementsByTagName(t), o = 0, a = s.length;
    if (n)
      for (; o < a; o++)
        n(s[o], o);
    return s;
  }
  return [];
}
function _s() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function Rt(e, t, n, s, o) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var a, r, i, l, c, f, d;
    if (e !== window && e.parentNode && e !== _s() ? (a = e.getBoundingClientRect(), r = a.top, i = a.left, l = a.bottom, c = a.right, f = a.height, d = a.width) : (r = 0, i = 0, l = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (o = o || e.parentNode, !eo))
      do
        if (o && o.getBoundingClientRect && ($e(o, "transform") !== "none" || n && $e(o, "position") !== "static")) {
          var h = o.getBoundingClientRect();
          r -= h.top + parseInt($e(o, "border-top-width")), i -= h.left + parseInt($e(o, "border-left-width")), l = r + a.height, c = i + a.width;
          break;
        }
      while (o = o.parentNode);
    if (s && e !== window) {
      var p = tr(o || e), m = p && p.a, _ = p && p.d;
      p && (r /= _, i /= m, d /= m, f /= _, l = r + f, c = i + d);
    }
    return {
      top: r,
      left: i,
      bottom: l,
      right: c,
      width: d,
      height: f
    };
  }
}
function cm(e, t, n) {
  for (var s = yo(e, !0), o = Rt(e)[t]; s; ) {
    var a = Rt(s)[n], r = void 0;
    if (n === "top" || n === "left" ? r = o >= a : r = o <= a, !r)
      return s;
    if (s === _s())
      break;
    s = yo(s, !1);
  }
  return !1;
}
function Yr(e, t, n, s) {
  for (var o = 0, a = 0, r = e.children; a < r.length; ) {
    if (r[a].style.display !== "none" && r[a] !== Ve.ghost && (s || r[a] !== Ve.dragged) && qn(r[a], n.draggable, e, !1)) {
      if (o === t)
        return r[a];
      o++;
    }
    a++;
  }
  return null;
}
function _h(e, t) {
  for (var n = e.lastElementChild; n && (n === Ve.ghost || $e(n, "display") === "none" || t && !sc(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function Lt(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Ve.clone && (!t || sc(e, t)) && n++;
  return n;
}
function um(e) {
  var t = 0, n = 0, s = _s();
  if (e)
    do {
      var o = tr(e), a = o.a, r = o.d;
      t += e.scrollLeft * a, n += e.scrollTop * r;
    } while (e !== s && (e = e.parentNode));
  return [t, n];
}
function qB(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var s in t)
        if (t.hasOwnProperty(s) && t[s] === e[n][s])
          return Number(n);
    }
  return -1;
}
function yo(e, t) {
  if (!e || !e.getBoundingClientRect)
    return _s();
  var n = e, s = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var o = $e(n);
      if (n.clientWidth < n.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return _s();
        if (s || t)
          return n;
        s = !0;
      }
    }
  while (n = n.parentNode);
  return _s();
}
function e7(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Fu(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var za;
function yy(e, t) {
  return function() {
    if (!za) {
      var n = arguments, s = this;
      n.length === 1 ? e.call(s, n[0]) : e.apply(s, n), za = setTimeout(function() {
        za = void 0;
      }, t);
    }
  };
}
function t7() {
  clearTimeout(za), za = void 0;
}
function by(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function vh(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function dm(e, t) {
  $e(e, "position", "absolute"), $e(e, "top", t.top), $e(e, "left", t.left), $e(e, "width", t.width), $e(e, "height", t.height);
}
function Uu(e) {
  $e(e, "position", ""), $e(e, "top", ""), $e(e, "left", ""), $e(e, "width", ""), $e(e, "height", "");
}
var an = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function n7() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var s = [].slice.call(this.el.children);
        s.forEach(function(o) {
          if (!($e(o, "display") === "none" || o === Ve.ghost)) {
            e.push({
              target: o,
              rect: Rt(o)
            });
            var a = ys({}, e[e.length - 1].rect);
            if (o.thisAnimationDuration) {
              var r = tr(o, !0);
              r && (a.top -= r.f, a.left -= r.e);
            }
            o.fromRect = a;
          }
        });
      }
    },
    addAnimationState: function(s) {
      e.push(s);
    },
    removeAnimationState: function(s) {
      e.splice(qB(e, {
        target: s
      }), 1);
    },
    animateAll: function(s) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof s == "function" && s();
        return;
      }
      var a = !1, r = 0;
      e.forEach(function(i) {
        var l = 0, c = i.target, f = c.fromRect, d = Rt(c), h = c.prevFromRect, p = c.prevToRect, m = i.rect, _ = tr(c, !0);
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && Fu(h, d) && !Fu(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - d.top) / (m.left - d.left) === (f.top - d.top) / (f.left - d.left) && (l = o7(m, h, p, o.options)), Fu(d, f) || (c.prevFromRect = f, c.prevToRect = d, l || (l = o.options.animation), o.animate(c, m, d, l)), l && (a = !0, r = Math.max(r, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), a ? t = setTimeout(function() {
        typeof s == "function" && s();
      }, r) : typeof s == "function" && s(), e = [];
    },
    animate: function(s, o, a, r) {
      if (r) {
        $e(s, "transition", ""), $e(s, "transform", "");
        var i = tr(this.el), l = i && i.a, c = i && i.d, f = (o.left - a.left) / (l || 1), d = (o.top - a.top) / (c || 1);
        s.animatingX = !!f, s.animatingY = !!d, $e(s, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = s7(s), $e(s, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), $e(s, "transform", "translate3d(0,0,0)"), typeof s.animated == "number" && clearTimeout(s.animated), s.animated = setTimeout(function() {
          $e(s, "transition", ""), $e(s, "transform", ""), s.animated = !1, s.animatingX = !1, s.animatingY = !1;
        }, r);
      }
    }
  };
}
function s7(e) {
  return e.offsetWidth;
}
function o7(e, t, n, s) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * s.animation;
}
var yr = [], ju = {
  initializeByDefault: !0
}, Wi = {
  mount: function(t) {
    for (var n in ju)
      ju.hasOwnProperty(n) && !(n in t) && (t[n] = ju[n]);
    yr.forEach(function(s) {
      if (s.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), yr.push(t);
  },
  pluginEvent: function(t, n, s) {
    var o = this;
    this.eventCanceled = !1, s.cancel = function() {
      o.eventCanceled = !0;
    };
    var a = t + "Global";
    yr.forEach(function(r) {
      n[r.pluginName] && (n[r.pluginName][a] && n[r.pluginName][a](ys({
        sortable: n
      }, s)), n.options[r.pluginName] && n[r.pluginName][t] && n[r.pluginName][t](ys({
        sortable: n
      }, s)));
    });
  },
  initializePlugins: function(t, n, s, o) {
    yr.forEach(function(i) {
      var l = i.pluginName;
      if (!(!t.options[l] && !i.initializeByDefault)) {
        var c = new i(t, n, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, zn(s, c.defaults);
      }
    });
    for (var a in t.options)
      if (t.options.hasOwnProperty(a)) {
        var r = this.modifyOption(t, a, t.options[a]);
        typeof r < "u" && (t.options[a] = r);
      }
  },
  getEventProperties: function(t, n) {
    var s = {};
    return yr.forEach(function(o) {
      typeof o.eventProperties == "function" && zn(s, o.eventProperties.call(n[o.pluginName], t));
    }), s;
  },
  modifyOption: function(t, n, s) {
    var o;
    return yr.forEach(function(a) {
      t[a.pluginName] && a.optionListeners && typeof a.optionListeners[n] == "function" && (o = a.optionListeners[n].call(t[a.pluginName], s));
    }), o;
  }
};
function $a(e) {
  var t = e.sortable, n = e.rootEl, s = e.name, o = e.targetEl, a = e.cloneEl, r = e.toEl, i = e.fromEl, l = e.oldIndex, c = e.newIndex, f = e.oldDraggableIndex, d = e.newDraggableIndex, h = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
  if (t = t || n && n[an], !!t) {
    var _, y = t.options, g = "on" + s.charAt(0).toUpperCase() + s.substr(1);
    window.CustomEvent && !eo && !Yi ? _ = new CustomEvent(s, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(s, !0, !0)), _.to = r || n, _.from = i || n, _.item = o || n, _.clone = a, _.oldIndex = l, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = h, _.pullMode = p ? p.lastPutMode : void 0;
    var v = ys(ys({}, m), Wi.getEventProperties(s, t));
    for (var S in v)
      _[S] = v[S];
    n && n.dispatchEvent(_), y[g] && y[g].call(t, _);
  }
}
var r7 = ["evt"], En = function(t, n) {
  var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = s.evt, a = YB(s, r7);
  Wi.pluginEvent.bind(Ve)(t, n, ys({
    dragEl: fe,
    parentEl: Pt,
    ghostEl: Ge,
    rootEl: Dt,
    nextEl: Yo,
    lastDownEl: kl,
    cloneEl: Mt,
    cloneHidden: _o,
    dragStarted: Ca,
    putSortable: Qt,
    activeSortable: Ve.active,
    originalEvent: o,
    oldIndex: kr,
    oldDraggableIndex: Ka,
    newIndex: Pn,
    newDraggableIndex: ho,
    hideGhostForTarget: xy,
    unhideGhostForTarget: $y,
    cloneNowHidden: function() {
      _o = !0;
    },
    cloneNowShown: function() {
      _o = !1;
    },
    dispatchSortableEvent: function(i) {
      _n({
        sortable: n,
        name: i,
        originalEvent: o
      });
    }
  }, a));
};
function _n(e) {
  $a(ys({
    putSortable: Qt,
    cloneEl: Mt,
    targetEl: fe,
    rootEl: Dt,
    oldIndex: kr,
    oldDraggableIndex: Ka,
    newIndex: Pn,
    newDraggableIndex: ho
  }, e));
}
var fe, Pt, Ge, Dt, Yo, kl, Mt, _o, kr, Pn, Ka, ho, cl, Qt, xr = !1, oc = !1, rc = [], jo, Qn, Hu, Bu, fm, hm, Ca, br, Ja, Xa = !1, ul = !1, Tl, sn, Yu = [], Kd = !1, ac = [], ou = typeof document < "u", dl = _y, pm = Yi || eo ? "cssFloat" : "float", a7 = ou && !QB && !_y && "draggable" in document.createElement("div"), wy = function() {
  if (ou) {
    if (eo)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), Ey = function(t, n) {
  var s = $e(t), o = parseInt(s.width) - parseInt(s.paddingLeft) - parseInt(s.paddingRight) - parseInt(s.borderLeftWidth) - parseInt(s.borderRightWidth), a = Yr(t, 0, n), r = Yr(t, 1, n), i = a && $e(a), l = r && $e(r), c = i && parseInt(i.marginLeft) + parseInt(i.marginRight) + Rt(a).width, f = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Rt(r).width;
  if (s.display === "flex")
    return s.flexDirection === "column" || s.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (s.display === "grid")
    return s.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (a && i.float && i.float !== "none") {
    var d = i.float === "left" ? "left" : "right";
    return r && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return a && (i.display === "block" || i.display === "flex" || i.display === "table" || i.display === "grid" || c >= o && s[pm] === "none" || r && s[pm] === "none" && c + f > o) ? "vertical" : "horizontal";
}, i7 = function(t, n, s) {
  var o = s ? t.left : t.top, a = s ? t.right : t.bottom, r = s ? t.width : t.height, i = s ? n.left : n.top, l = s ? n.right : n.bottom, c = s ? n.width : n.height;
  return o === i || a === l || o + r / 2 === i + c / 2;
}, l7 = function(t, n) {
  var s;
  return rc.some(function(o) {
    var a = o[an].options.emptyInsertThreshold;
    if (!(!a || _h(o))) {
      var r = Rt(o), i = t >= r.left - a && t <= r.right + a, l = n >= r.top - a && n <= r.bottom + a;
      if (i && l)
        return s = o;
    }
  }), s;
}, Sy = function(t) {
  function n(a, r) {
    return function(i, l, c, f) {
      var d = i.options.group.name && l.options.group.name && i.options.group.name === l.options.group.name;
      if (a == null && (r || d))
        return !0;
      if (a == null || a === !1)
        return !1;
      if (r && a === "clone")
        return a;
      if (typeof a == "function")
        return n(a(i, l, c, f), r)(i, l, c, f);
      var h = (r ? i : l).options.group.name;
      return a === !0 || typeof a == "string" && a === h || a.join && a.indexOf(h) > -1;
    };
  }
  var s = {}, o = t.group;
  (!o || Ol(o) != "object") && (o = {
    name: o
  }), s.name = o.name, s.checkPull = n(o.pull, !0), s.checkPut = n(o.put), s.revertClone = o.revertClone, t.group = s;
}, xy = function() {
  !wy && Ge && $e(Ge, "display", "none");
}, $y = function() {
  !wy && Ge && $e(Ge, "display", "");
};
ou && document.addEventListener("click", function(e) {
  if (oc)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), oc = !1, !1;
}, !0);
var Ho = function(t) {
  if (fe) {
    t = t.touches ? t.touches[0] : t;
    var n = l7(t.clientX, t.clientY);
    if (n) {
      var s = {};
      for (var o in t)
        t.hasOwnProperty(o) && (s[o] = t[o]);
      s.target = s.rootEl = n, s.preventDefault = void 0, s.stopPropagation = void 0, n[an]._onDragOver(s);
    }
  }
}, c7 = function(t) {
  fe && fe.parentNode[an]._isOutsideThisEl(t.target);
};
function Ve(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = zn({}, t), e[an] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Ey(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(r, i) {
      r.setData("Text", i.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Ve.supportPointer !== !1 && "PointerEvent" in window && !Ga,
    emptyInsertThreshold: 5
  };
  Wi.initializePlugins(this, e, n);
  for (var s in n)
    !(s in t) && (t[s] = n[s]);
  Sy(t);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : a7, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? nt(e, "pointerdown", this._onTapStart) : (nt(e, "mousedown", this._onTapStart), nt(e, "touchstart", this._onTapStart)), this.nativeDraggable && (nt(e, "dragover", this), nt(e, "dragenter", this)), rc.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), zn(this, n7());
}
Ve.prototype = /** @lends Sortable.prototype */
{
  constructor: Ve,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (br = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, fe) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, s = this.el, o = this.options, a = o.preventOnFilter, r = t.type, i = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (i || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, f = o.filter;
      if (v7(s), !fe && !(/mousedown|pointerdown/.test(r) && t.button !== 0 || o.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Ga && l && l.tagName.toUpperCase() === "SELECT") && (l = qn(l, o.draggable, s, !1), !(l && l.animated) && kl !== l)) {
        if (kr = Lt(l), Ka = Lt(l, o.draggable), typeof f == "function") {
          if (f.call(this, t, l, this)) {
            _n({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: s,
              fromEl: s
            }), En("filter", n, {
              evt: t
            }), a && t.cancelable && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = qn(c, d.trim(), s, !1), d)
            return _n({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: s,
              toEl: s
            }), En("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          a && t.cancelable && t.preventDefault();
          return;
        }
        o.handle && !qn(c, o.handle, s, !1) || this._prepareDragStart(t, i, l);
      }
    }
  },
  _prepareDragStart: function(t, n, s) {
    var o = this, a = o.el, r = o.options, i = a.ownerDocument, l;
    if (s && !fe && s.parentNode === a) {
      var c = Rt(s);
      if (Dt = a, fe = s, Pt = fe.parentNode, Yo = fe.nextSibling, kl = s, cl = r.group, Ve.dragged = fe, jo = {
        target: fe,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, fm = jo.clientX - c.left, hm = jo.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, fe.style["will-change"] = "all", l = function() {
        if (En("delayEnded", o, {
          evt: t
        }), Ve.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !im && o.nativeDraggable && (fe.draggable = !0), o._triggerDragStart(t, n), _n({
          sortable: o,
          name: "choose",
          originalEvent: t
        }), It(fe, r.chosenClass, !0);
      }, r.ignore.split(",").forEach(function(f) {
        gy(fe, f.trim(), Wu);
      }), nt(i, "dragover", Ho), nt(i, "mousemove", Ho), nt(i, "touchmove", Ho), nt(i, "mouseup", o._onDrop), nt(i, "touchend", o._onDrop), nt(i, "touchcancel", o._onDrop), im && this.nativeDraggable && (this.options.touchStartThreshold = 4, fe.draggable = !0), En("delayStart", this, {
        evt: t
      }), r.delay && (!r.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Yi || eo))) {
        if (Ve.eventCanceled) {
          this._onDrop();
          return;
        }
        nt(i, "mouseup", o._disableDelayedDrag), nt(i, "touchend", o._disableDelayedDrag), nt(i, "touchcancel", o._disableDelayedDrag), nt(i, "mousemove", o._delayedDragTouchMoveHandler), nt(i, "touchmove", o._delayedDragTouchMoveHandler), r.supportPointer && nt(i, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(l, r.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    fe && Wu(fe), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    Je(t, "mouseup", this._disableDelayedDrag), Je(t, "touchend", this._disableDelayedDrag), Je(t, "touchcancel", this._disableDelayedDrag), Je(t, "mousemove", this._delayedDragTouchMoveHandler), Je(t, "touchmove", this._delayedDragTouchMoveHandler), Je(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? nt(document, "pointermove", this._onTouchMove) : n ? nt(document, "touchmove", this._onTouchMove) : nt(document, "mousemove", this._onTouchMove) : (nt(fe, "dragend", this), nt(Dt, "dragstart", this._onDragStart));
    try {
      document.selection ? Nl(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (xr = !1, Dt && fe) {
      En("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && nt(document, "dragover", c7);
      var s = this.options;
      !t && It(fe, s.dragClass, !1), It(fe, s.ghostClass, !0), Ve.active = this, t && this._appendGhost(), _n({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Qn) {
      this._lastX = Qn.clientX, this._lastY = Qn.clientY, xy();
      for (var t = document.elementFromPoint(Qn.clientX, Qn.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Qn.clientX, Qn.clientY), t !== n); )
        n = t;
      if (fe.parentNode[an]._isOutsideThisEl(t), n)
        do {
          if (n[an]) {
            var s = void 0;
            if (s = n[an]._onDragOver({
              clientX: Qn.clientX,
              clientY: Qn.clientY,
              target: t,
              rootEl: n
            }), s && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = n.parentNode);
      $y();
    }
  },
  _onTouchMove: function(t) {
    if (jo) {
      var n = this.options, s = n.fallbackTolerance, o = n.fallbackOffset, a = t.touches ? t.touches[0] : t, r = Ge && tr(Ge, !0), i = Ge && r && r.a, l = Ge && r && r.d, c = dl && sn && um(sn), f = (a.clientX - jo.clientX + o.x) / (i || 1) + (c ? c[0] - Yu[0] : 0) / (i || 1), d = (a.clientY - jo.clientY + o.y) / (l || 1) + (c ? c[1] - Yu[1] : 0) / (l || 1);
      if (!Ve.active && !xr) {
        if (s && Math.max(Math.abs(a.clientX - this._lastX), Math.abs(a.clientY - this._lastY)) < s)
          return;
        this._onDragStart(t, !0);
      }
      if (Ge) {
        r ? (r.e += f - (Hu || 0), r.f += d - (Bu || 0)) : r = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var h = "matrix(".concat(r.a, ",").concat(r.b, ",").concat(r.c, ",").concat(r.d, ",").concat(r.e, ",").concat(r.f, ")");
        $e(Ge, "webkitTransform", h), $e(Ge, "mozTransform", h), $e(Ge, "msTransform", h), $e(Ge, "transform", h), Hu = f, Bu = d, Qn = a;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!Ge) {
      var t = this.options.fallbackOnBody ? document.body : Dt, n = Rt(fe, !0, dl, !0, t), s = this.options;
      if (dl) {
        for (sn = t; $e(sn, "position") === "static" && $e(sn, "transform") === "none" && sn !== document; )
          sn = sn.parentNode;
        sn !== document.body && sn !== document.documentElement ? (sn === document && (sn = _s()), n.top += sn.scrollTop, n.left += sn.scrollLeft) : sn = _s(), Yu = um(sn);
      }
      Ge = fe.cloneNode(!0), It(Ge, s.ghostClass, !1), It(Ge, s.fallbackClass, !0), It(Ge, s.dragClass, !0), $e(Ge, "transition", ""), $e(Ge, "transform", ""), $e(Ge, "box-sizing", "border-box"), $e(Ge, "margin", 0), $e(Ge, "top", n.top), $e(Ge, "left", n.left), $e(Ge, "width", n.width), $e(Ge, "height", n.height), $e(Ge, "opacity", "0.8"), $e(Ge, "position", dl ? "absolute" : "fixed"), $e(Ge, "zIndex", "100000"), $e(Ge, "pointerEvents", "none"), Ve.ghost = Ge, t.appendChild(Ge), $e(Ge, "transform-origin", fm / parseInt(Ge.style.width) * 100 + "% " + hm / parseInt(Ge.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var s = this, o = t.dataTransfer, a = s.options;
    if (En("dragStart", this, {
      evt: t
    }), Ve.eventCanceled) {
      this._onDrop();
      return;
    }
    En("setupClone", this), Ve.eventCanceled || (Mt = vh(fe), Mt.draggable = !1, Mt.style["will-change"] = "", this._hideClone(), It(Mt, this.options.chosenClass, !1), Ve.clone = Mt), s.cloneId = Nl(function() {
      En("clone", s), !Ve.eventCanceled && (s.options.removeCloneOnHide || Dt.insertBefore(Mt, fe), s._hideClone(), _n({
        sortable: s,
        name: "clone"
      }));
    }), !n && It(fe, a.dragClass, !0), n ? (oc = !0, s._loopId = setInterval(s._emulateDragOver, 50)) : (Je(document, "mouseup", s._onDrop), Je(document, "touchend", s._onDrop), Je(document, "touchcancel", s._onDrop), o && (o.effectAllowed = "move", a.setData && a.setData.call(s, o, fe)), nt(document, "drop", s), $e(fe, "transform", "translateZ(0)")), xr = !0, s._dragStartId = Nl(s._dragStarted.bind(s, n, t)), nt(document, "selectstart", s), Ca = !0, Ga && $e(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, s = t.target, o, a, r, i = this.options, l = i.group, c = Ve.active, f = cl === l, d = i.sort, h = Qt || c, p, m = this, _ = !1;
    if (Kd)
      return;
    function y(re, Be) {
      En(re, m, ys({
        evt: t,
        isOwner: f,
        axis: p ? "vertical" : "horizontal",
        revert: r,
        dragRect: o,
        targetRect: a,
        canSort: d,
        fromSortable: h,
        target: s,
        completed: v,
        onMove: function(et, tt) {
          return fl(Dt, n, fe, o, et, Rt(et), t, tt);
        },
        changed: S
      }, Be));
    }
    function g() {
      y("dragOverAnimationCapture"), m.captureAnimationState(), m !== h && h.captureAnimationState();
    }
    function v(re) {
      return y("dragOverCompleted", {
        insertion: re
      }), re && (f ? c._hideClone() : c._showClone(m), m !== h && (It(fe, Qt ? Qt.options.ghostClass : c.options.ghostClass, !1), It(fe, i.ghostClass, !0)), Qt !== m && m !== Ve.active ? Qt = m : m === Ve.active && Qt && (Qt = null), h === m && (m._ignoreWhileAnimating = s), m.animateAll(function() {
        y("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (s === fe && !fe.animated || s === n && !s.animated) && (br = null), !i.dragoverBubble && !t.rootEl && s !== document && (fe.parentNode[an]._isOutsideThisEl(t.target), !re && Ho(t)), !i.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function S() {
      Pn = Lt(fe), ho = Lt(fe, i.draggable), _n({
        sortable: m,
        name: "change",
        toEl: n,
        newIndex: Pn,
        newDraggableIndex: ho,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), s = qn(s, i.draggable, n, !0), y("dragOver"), Ve.eventCanceled)
      return _;
    if (fe.contains(t.target) || s.animated && s.animatingX && s.animatingY || m._ignoreWhileAnimating === s)
      return v(!1);
    if (oc = !1, c && !i.disabled && (f ? d || (r = Pt !== Dt) : Qt === this || (this.lastPutMode = cl.checkPull(this, c, fe, t)) && l.checkPut(this, c, fe, t))) {
      if (p = this._getDirection(t, s) === "vertical", o = Rt(fe), y("dragOverValid"), Ve.eventCanceled)
        return _;
      if (r)
        return Pt = Dt, g(), this._hideClone(), y("revert"), Ve.eventCanceled || (Yo ? Dt.insertBefore(fe, Yo) : Dt.appendChild(fe)), v(!0);
      var w = _h(n, i.draggable);
      if (!w || h7(t, p, this) && !w.animated) {
        if (w === fe)
          return v(!1);
        if (w && n === t.target && (s = w), s && (a = Rt(s)), fl(Dt, n, fe, o, s, a, t, !!s) !== !1)
          return g(), n.appendChild(fe), Pt = n, S(), v(!0);
      } else if (w && f7(t, p, this)) {
        var $ = Yr(n, 0, i, !0);
        if ($ === fe)
          return v(!1);
        if (s = $, a = Rt(s), fl(Dt, n, fe, o, s, a, t, !1) !== !1)
          return g(), n.insertBefore(fe, $), Pt = n, S(), v(!0);
      } else if (s.parentNode === n) {
        a = Rt(s);
        var C = 0, N, A = fe.parentNode !== n, D = !i7(fe.animated && fe.toRect || o, s.animated && s.toRect || a, p), F = p ? "top" : "left", H = cm(s, "top", "top") || cm(fe, "top", "top"), P = H ? H.scrollTop : void 0;
        br !== s && (N = a[F], Xa = !1, ul = !D && i.invertSwap || A), C = p7(t, s, a, p, D ? 1 : i.swapThreshold, i.invertedSwapThreshold == null ? i.swapThreshold : i.invertedSwapThreshold, ul, br === s);
        var I;
        if (C !== 0) {
          var V = Lt(fe);
          do
            V -= C, I = Pt.children[V];
          while (I && ($e(I, "display") === "none" || I === Ge));
        }
        if (C === 0 || I === s)
          return v(!1);
        br = s, Ja = C;
        var q = s.nextElementSibling, Y = !1;
        Y = C === 1;
        var z = fl(Dt, n, fe, o, s, a, t, Y);
        if (z !== !1)
          return (z === 1 || z === -1) && (Y = z === 1), Kd = !0, setTimeout(d7, 30), g(), Y && !q ? n.appendChild(fe) : s.parentNode.insertBefore(fe, Y ? q : s), H && by(H, 0, P - H.scrollTop), Pt = fe.parentNode, N !== void 0 && !ul && (Tl = Math.abs(N - Rt(s)[F])), S(), v(!0);
      }
      if (n.contains(fe))
        return v(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    Je(document, "mousemove", this._onTouchMove), Je(document, "touchmove", this._onTouchMove), Je(document, "pointermove", this._onTouchMove), Je(document, "dragover", Ho), Je(document, "mousemove", Ho), Je(document, "touchmove", Ho);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    Je(t, "mouseup", this._onDrop), Je(t, "touchend", this._onDrop), Je(t, "pointerup", this._onDrop), Je(t, "touchcancel", this._onDrop), Je(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, s = this.options;
    if (Pn = Lt(fe), ho = Lt(fe, s.draggable), En("drop", this, {
      evt: t
    }), Pt = fe && fe.parentNode, Pn = Lt(fe), ho = Lt(fe, s.draggable), Ve.eventCanceled) {
      this._nulling();
      return;
    }
    xr = !1, ul = !1, Xa = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Jd(this.cloneId), Jd(this._dragStartId), this.nativeDraggable && (Je(document, "drop", this), Je(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ga && $e(document.body, "user-select", ""), $e(fe, "transform", ""), t && (Ca && (t.cancelable && t.preventDefault(), !s.dropBubble && t.stopPropagation()), Ge && Ge.parentNode && Ge.parentNode.removeChild(Ge), (Dt === Pt || Qt && Qt.lastPutMode !== "clone") && Mt && Mt.parentNode && Mt.parentNode.removeChild(Mt), fe && (this.nativeDraggable && Je(fe, "dragend", this), Wu(fe), fe.style["will-change"] = "", Ca && !xr && It(fe, Qt ? Qt.options.ghostClass : this.options.ghostClass, !1), It(fe, this.options.chosenClass, !1), _n({
      sortable: this,
      name: "unchoose",
      toEl: Pt,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Dt !== Pt ? (Pn >= 0 && (_n({
      rootEl: Pt,
      name: "add",
      toEl: Pt,
      fromEl: Dt,
      originalEvent: t
    }), _n({
      sortable: this,
      name: "remove",
      toEl: Pt,
      originalEvent: t
    }), _n({
      rootEl: Pt,
      name: "sort",
      toEl: Pt,
      fromEl: Dt,
      originalEvent: t
    }), _n({
      sortable: this,
      name: "sort",
      toEl: Pt,
      originalEvent: t
    })), Qt && Qt.save()) : Pn !== kr && Pn >= 0 && (_n({
      sortable: this,
      name: "update",
      toEl: Pt,
      originalEvent: t
    }), _n({
      sortable: this,
      name: "sort",
      toEl: Pt,
      originalEvent: t
    })), Ve.active && ((Pn == null || Pn === -1) && (Pn = kr, ho = Ka), _n({
      sortable: this,
      name: "end",
      toEl: Pt,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    En("nulling", this), Dt = fe = Pt = Ge = Yo = Mt = kl = _o = jo = Qn = Ca = Pn = ho = kr = Ka = br = Ja = Qt = cl = Ve.dragged = Ve.ghost = Ve.clone = Ve.active = null, ac.forEach(function(t) {
      t.checked = !0;
    }), ac.length = Hu = Bu = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        fe && (this._onDragOver(t), u7(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, s = this.el.children, o = 0, a = s.length, r = this.options; o < a; o++)
      n = s[o], qn(n, r.draggable, this.el, !1) && t.push(n.getAttribute(r.dataIdAttr) || _7(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var s = {}, o = this.el;
    this.toArray().forEach(function(a, r) {
      var i = o.children[r];
      qn(i, this.options.draggable, o, !1) && (s[a] = i);
    }, this), n && this.captureAnimationState(), t.forEach(function(a) {
      s[a] && (o.removeChild(s[a]), o.appendChild(s[a]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return qn(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var s = this.options;
    if (n === void 0)
      return s[t];
    var o = Wi.modifyOption(this, t, n);
    typeof o < "u" ? s[t] = o : s[t] = n, t === "group" && Sy(s);
  },
  /**
   * Destroy
   */
  destroy: function() {
    En("destroy", this);
    var t = this.el;
    t[an] = null, Je(t, "mousedown", this._onTapStart), Je(t, "touchstart", this._onTapStart), Je(t, "pointerdown", this._onTapStart), this.nativeDraggable && (Je(t, "dragover", this), Je(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), rc.splice(rc.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!_o) {
      if (En("hideClone", this), Ve.eventCanceled)
        return;
      $e(Mt, "display", "none"), this.options.removeCloneOnHide && Mt.parentNode && Mt.parentNode.removeChild(Mt), _o = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (_o) {
      if (En("showClone", this), Ve.eventCanceled)
        return;
      fe.parentNode == Dt && !this.options.group.revertClone ? Dt.insertBefore(Mt, fe) : Yo ? Dt.insertBefore(Mt, Yo) : Dt.appendChild(Mt), this.options.group.revertClone && this.animate(fe, Mt), $e(Mt, "display", ""), _o = !1;
    }
  }
};
function u7(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function fl(e, t, n, s, o, a, r, i) {
  var l, c = e[an], f = c.options.onMove, d;
  return window.CustomEvent && !eo && !Yi ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = e, l.dragged = n, l.draggedRect = s, l.related = o || t, l.relatedRect = a || Rt(t), l.willInsertAfter = i, l.originalEvent = r, e.dispatchEvent(l), f && (d = f.call(c, l, r)), d;
}
function Wu(e) {
  e.draggable = !1;
}
function d7() {
  Kd = !1;
}
function f7(e, t, n) {
  var s = Rt(Yr(n.el, 0, n.options, !0)), o = 10;
  return t ? e.clientX < s.left - o || e.clientY < s.top && e.clientX < s.right : e.clientY < s.top - o || e.clientY < s.bottom && e.clientX < s.left;
}
function h7(e, t, n) {
  var s = Rt(_h(n.el, n.options.draggable)), o = 10;
  return t ? e.clientX > s.right + o || e.clientX <= s.right && e.clientY > s.bottom && e.clientX >= s.left : e.clientX > s.right && e.clientY > s.top || e.clientX <= s.right && e.clientY > s.bottom + o;
}
function p7(e, t, n, s, o, a, r, i) {
  var l = s ? e.clientY : e.clientX, c = s ? n.height : n.width, f = s ? n.top : n.left, d = s ? n.bottom : n.right, h = !1;
  if (!r) {
    if (i && Tl < c * o) {
      if (!Xa && (Ja === 1 ? l > f + c * a / 2 : l < d - c * a / 2) && (Xa = !0), Xa)
        h = !0;
      else if (Ja === 1 ? l < f + Tl : l > d - Tl)
        return -Ja;
    } else if (l > f + c * (1 - o) / 2 && l < d - c * (1 - o) / 2)
      return m7(t);
  }
  return h = h || r, h && (l < f + c * a / 2 || l > d - c * a / 2) ? l > f + c / 2 ? 1 : -1 : 0;
}
function m7(e) {
  return Lt(fe) < Lt(e) ? 1 : -1;
}
function _7(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, s = 0; n--; )
    s += t.charCodeAt(n);
  return s.toString(36);
}
function v7(e) {
  ac.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var s = t[n];
    s.checked && ac.push(s);
  }
}
function Nl(e) {
  return setTimeout(e, 0);
}
function Jd(e) {
  return clearTimeout(e);
}
ou && nt(document, "touchmove", function(e) {
  (Ve.active || xr) && e.cancelable && e.preventDefault();
});
Ve.utils = {
  on: nt,
  off: Je,
  css: $e,
  find: gy,
  is: function(t, n) {
    return !!qn(t, n, t, !1);
  },
  extend: e7,
  throttle: yy,
  closest: qn,
  toggleClass: It,
  clone: vh,
  index: Lt,
  nextTick: Nl,
  cancelNextTick: Jd,
  detectDirection: Ey,
  getChild: Yr
};
Ve.get = function(e) {
  return e[an];
};
Ve.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(s) {
    if (!s.prototype || !s.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(s));
    s.utils && (Ve.utils = ys(ys({}, Ve.utils), s.utils)), Wi.mount(s);
  });
};
Ve.create = function(e, t) {
  return new Ve(e, t);
};
Ve.version = XB;
var Yt = [], Oa, Xd, Qd = !1, Gu, zu, ic, ka;
function g7() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return e.prototype = {
    dragStarted: function(n) {
      var s = n.originalEvent;
      this.sortable.nativeDraggable ? nt(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? nt(document, "pointermove", this._handleFallbackAutoScroll) : s.touches ? nt(document, "touchmove", this._handleFallbackAutoScroll) : nt(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var s = n.originalEvent;
      !this.options.dragOverBubble && !s.rootEl && this._handleAutoScroll(s);
    },
    drop: function() {
      this.sortable.nativeDraggable ? Je(document, "dragover", this._handleAutoScroll) : (Je(document, "pointermove", this._handleFallbackAutoScroll), Je(document, "touchmove", this._handleFallbackAutoScroll), Je(document, "mousemove", this._handleFallbackAutoScroll)), mm(), Dl(), t7();
    },
    nulling: function() {
      ic = Xd = Oa = Qd = ka = Gu = zu = null, Yt.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, s) {
      var o = this, a = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, i = document.elementFromPoint(a, r);
      if (ic = n, s || this.options.forceAutoScrollFallback || Yi || eo || Ga) {
        Ku(n, this.options, i, s);
        var l = yo(i, !0);
        Qd && (!ka || a !== Gu || r !== zu) && (ka && mm(), ka = setInterval(function() {
          var c = yo(document.elementFromPoint(a, r), !0);
          c !== l && (l = c, Dl()), Ku(n, o.options, c, s);
        }, 10), Gu = a, zu = r);
      } else {
        if (!this.options.bubbleScroll || yo(i, !0) === _s()) {
          Dl();
          return;
        }
        Ku(n, this.options, yo(i, !1), !1);
      }
    }
  }, zn(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Dl() {
  Yt.forEach(function(e) {
    clearInterval(e.pid);
  }), Yt = [];
}
function mm() {
  clearInterval(ka);
}
var Ku = yy(function(e, t, n, s) {
  if (t.scroll) {
    var o = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, r = t.scrollSensitivity, i = t.scrollSpeed, l = _s(), c = !1, f;
    Xd !== n && (Xd = n, Dl(), Oa = t.scroll, f = t.scrollFn, Oa === !0 && (Oa = yo(n, !0)));
    var d = 0, h = Oa;
    do {
      var p = h, m = Rt(p), _ = m.top, y = m.bottom, g = m.left, v = m.right, S = m.width, w = m.height, $ = void 0, C = void 0, N = p.scrollWidth, A = p.scrollHeight, D = $e(p), F = p.scrollLeft, H = p.scrollTop;
      p === l ? ($ = S < N && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), C = w < A && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : ($ = S < N && (D.overflowX === "auto" || D.overflowX === "scroll"), C = w < A && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var P = $ && (Math.abs(v - o) <= r && F + S < N) - (Math.abs(g - o) <= r && !!F), I = C && (Math.abs(y - a) <= r && H + w < A) - (Math.abs(_ - a) <= r && !!H);
      if (!Yt[d])
        for (var V = 0; V <= d; V++)
          Yt[V] || (Yt[V] = {});
      (Yt[d].vx != P || Yt[d].vy != I || Yt[d].el !== p) && (Yt[d].el = p, Yt[d].vx = P, Yt[d].vy = I, clearInterval(Yt[d].pid), (P != 0 || I != 0) && (c = !0, Yt[d].pid = setInterval((function() {
        s && this.layer === 0 && Ve.active._onTouchMove(ic);
        var q = Yt[this.layer].vy ? Yt[this.layer].vy * i : 0, Y = Yt[this.layer].vx ? Yt[this.layer].vx * i : 0;
        typeof f == "function" && f.call(Ve.dragged.parentNode[an], Y, q, e, ic, Yt[this.layer].el) !== "continue" || by(Yt[this.layer].el, Y, q);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && h !== l && (h = yo(h, !1)));
    Qd = c;
  }
}, 30), Cy = function(t) {
  var n = t.originalEvent, s = t.putSortable, o = t.dragEl, a = t.activeSortable, r = t.dispatchSortableEvent, i = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (n) {
    var c = s || a;
    i();
    var f = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(f.clientX, f.clientY);
    l(), c && !c.el.contains(d) && (r("spill"), this.onSpill({
      dragEl: o,
      putSortable: s
    }));
  }
};
function gh() {
}
gh.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, s = t.putSortable;
    this.sortable.captureAnimationState(), s && s.captureAnimationState();
    var o = Yr(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(n, o) : this.sortable.el.appendChild(n), this.sortable.animateAll(), s && s.animateAll();
  },
  drop: Cy
};
zn(gh, {
  pluginName: "revertOnSpill"
});
function yh() {
}
yh.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, s = t.putSortable, o = s || this.sortable;
    o.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), o.animateAll();
  },
  drop: Cy
};
zn(yh, {
  pluginName: "removeOnSpill"
});
var Bn;
function y7() {
  function e() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return e.prototype = {
    dragStart: function(n) {
      var s = n.dragEl;
      Bn = s;
    },
    dragOverValid: function(n) {
      var s = n.completed, o = n.target, a = n.onMove, r = n.activeSortable, i = n.changed, l = n.cancel;
      if (r.options.swap) {
        var c = this.sortable.el, f = this.options;
        if (o && o !== c) {
          var d = Bn;
          a(o) !== !1 ? (It(o, f.swapClass, !0), Bn = o) : Bn = null, d && d !== Bn && It(d, f.swapClass, !1);
        }
        i(), s(!0), l();
      }
    },
    drop: function(n) {
      var s = n.activeSortable, o = n.putSortable, a = n.dragEl, r = o || this.sortable, i = this.options;
      Bn && It(Bn, i.swapClass, !1), Bn && (i.swap || o && o.options.swap) && a !== Bn && (r.captureAnimationState(), r !== s && s.captureAnimationState(), b7(a, Bn), r.animateAll(), r !== s && s.animateAll());
    },
    nulling: function() {
      Bn = null;
    }
  }, zn(e, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: Bn
      };
    }
  });
}
function b7(e, t) {
  var n = e.parentNode, s = t.parentNode, o, a;
  !n || !s || n.isEqualNode(t) || s.isEqualNode(e) || (o = Lt(e), a = Lt(t), n.isEqualNode(s) && o < a && a++, n.insertBefore(t, n.children[o]), s.insertBefore(e, s.children[a]));
}
var He = [], In = [], va, Zn, ga = !1, Sn = !1, wr = !1, Ct, ya, hl;
function w7() {
  function e(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.supportPointer ? nt(document, "pointerup", this._deselectMultiDrag) : (nt(document, "mouseup", this._deselectMultiDrag), nt(document, "touchend", this._deselectMultiDrag)), nt(document, "keydown", this._checkKeyDown), nt(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function(o, a) {
        var r = "";
        He.length && Zn === t ? He.forEach(function(i, l) {
          r += (l ? ", " : "") + i.textContent;
        }) : r = a.textContent, o.setData("Text", r);
      }
    };
  }
  return e.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(n) {
      var s = n.dragEl;
      Ct = s;
    },
    delayEnded: function() {
      this.isMultiDrag = ~He.indexOf(Ct);
    },
    setupClone: function(n) {
      var s = n.sortable, o = n.cancel;
      if (this.isMultiDrag) {
        for (var a = 0; a < He.length; a++)
          In.push(vh(He[a])), In[a].sortableIndex = He[a].sortableIndex, In[a].draggable = !1, In[a].style["will-change"] = "", It(In[a], this.options.selectedClass, !1), He[a] === Ct && It(In[a], this.options.chosenClass, !1);
        s._hideClone(), o();
      }
    },
    clone: function(n) {
      var s = n.sortable, o = n.rootEl, a = n.dispatchSortableEvent, r = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || He.length && Zn === s && (_m(!0, o), a("clone"), r()));
    },
    showClone: function(n) {
      var s = n.cloneNowShown, o = n.rootEl, a = n.cancel;
      this.isMultiDrag && (_m(!1, o), In.forEach(function(r) {
        $e(r, "display", "");
      }), s(), hl = !1, a());
    },
    hideClone: function(n) {
      var s = this;
      n.sortable;
      var o = n.cloneNowHidden, a = n.cancel;
      this.isMultiDrag && (In.forEach(function(r) {
        $e(r, "display", "none"), s.options.removeCloneOnHide && r.parentNode && r.parentNode.removeChild(r);
      }), o(), hl = !0, a());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && Zn && Zn.multiDrag._deselectMultiDrag(), He.forEach(function(s) {
        s.sortableIndex = Lt(s);
      }), He = He.sort(function(s, o) {
        return s.sortableIndex - o.sortableIndex;
      }), wr = !0;
    },
    dragStarted: function(n) {
      var s = this, o = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (o.captureAnimationState(), this.options.animation)) {
          He.forEach(function(r) {
            r !== Ct && $e(r, "position", "absolute");
          });
          var a = Rt(Ct, !1, !0, !0);
          He.forEach(function(r) {
            r !== Ct && dm(r, a);
          }), Sn = !0, ga = !0;
        }
        o.animateAll(function() {
          Sn = !1, ga = !1, s.options.animation && He.forEach(function(r) {
            Uu(r);
          }), s.options.sort && pl();
        });
      }
    },
    dragOver: function(n) {
      var s = n.target, o = n.completed, a = n.cancel;
      Sn && ~He.indexOf(s) && (o(!1), a());
    },
    revert: function(n) {
      var s = n.fromSortable, o = n.rootEl, a = n.sortable, r = n.dragRect;
      He.length > 1 && (He.forEach(function(i) {
        a.addAnimationState({
          target: i,
          rect: Sn ? Rt(i) : r
        }), Uu(i), i.fromRect = r, s.removeAnimationState(i);
      }), Sn = !1, E7(!this.options.removeCloneOnHide, o));
    },
    dragOverCompleted: function(n) {
      var s = n.sortable, o = n.isOwner, a = n.insertion, r = n.activeSortable, i = n.parentEl, l = n.putSortable, c = this.options;
      if (a) {
        if (o && r._hideClone(), ga = !1, c.animation && He.length > 1 && (Sn || !o && !r.options.sort && !l)) {
          var f = Rt(Ct, !1, !0, !0);
          He.forEach(function(h) {
            h !== Ct && (dm(h, f), i.appendChild(h));
          }), Sn = !0;
        }
        if (!o)
          if (Sn || pl(), He.length > 1) {
            var d = hl;
            r._showClone(s), r.options.animation && !hl && d && In.forEach(function(h) {
              r.addAnimationState({
                target: h,
                rect: ya
              }), h.fromRect = ya, h.thisAnimationDuration = null;
            });
          } else
            r._showClone(s);
      }
    },
    dragOverAnimationCapture: function(n) {
      var s = n.dragRect, o = n.isOwner, a = n.activeSortable;
      if (He.forEach(function(i) {
        i.thisAnimationDuration = null;
      }), a.options.animation && !o && a.multiDrag.isMultiDrag) {
        ya = zn({}, s);
        var r = tr(Ct, !0);
        ya.top -= r.f, ya.left -= r.e;
      }
    },
    dragOverAnimationComplete: function() {
      Sn && (Sn = !1, pl());
    },
    drop: function(n) {
      var s = n.originalEvent, o = n.rootEl, a = n.parentEl, r = n.sortable, i = n.dispatchSortableEvent, l = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (s) {
        var d = this.options, h = a.children;
        if (!wr)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), It(Ct, d.selectedClass, !~He.indexOf(Ct)), ~He.indexOf(Ct))
            He.splice(He.indexOf(Ct), 1), va = null, $a({
              sortable: r,
              rootEl: o,
              name: "deselect",
              targetEl: Ct,
              originalEvt: s
            });
          else {
            if (He.push(Ct), $a({
              sortable: r,
              rootEl: o,
              name: "select",
              targetEl: Ct,
              originalEvt: s
            }), s.shiftKey && va && r.el.contains(va)) {
              var p = Lt(va), m = Lt(Ct);
              if (~p && ~m && p !== m) {
                var _, y;
                for (m > p ? (y = p, _ = m) : (y = m, _ = p + 1); y < _; y++)
                  ~He.indexOf(h[y]) || (It(h[y], d.selectedClass, !0), He.push(h[y]), $a({
                    sortable: r,
                    rootEl: o,
                    name: "select",
                    targetEl: h[y],
                    originalEvt: s
                  }));
              }
            } else
              va = Ct;
            Zn = f;
          }
        if (wr && this.isMultiDrag) {
          if (Sn = !1, (a[an].options.sort || a !== o) && He.length > 1) {
            var g = Rt(Ct), v = Lt(Ct, ":not(." + this.options.selectedClass + ")");
            if (!ga && d.animation && (Ct.thisAnimationDuration = null), f.captureAnimationState(), !ga && (d.animation && (Ct.fromRect = g, He.forEach(function(w) {
              if (w.thisAnimationDuration = null, w !== Ct) {
                var $ = Sn ? Rt(w) : g;
                w.fromRect = $, f.addAnimationState({
                  target: w,
                  rect: $
                });
              }
            })), pl(), He.forEach(function(w) {
              h[v] ? a.insertBefore(w, h[v]) : a.appendChild(w), v++;
            }), l === Lt(Ct))) {
              var S = !1;
              He.forEach(function(w) {
                if (w.sortableIndex !== Lt(w)) {
                  S = !0;
                  return;
                }
              }), S && i("update");
            }
            He.forEach(function(w) {
              Uu(w);
            }), f.animateAll();
          }
          Zn = f;
        }
        (o === a || c && c.lastPutMode !== "clone") && In.forEach(function(w) {
          w.parentNode && w.parentNode.removeChild(w);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = wr = !1, In.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), Je(document, "pointerup", this._deselectMultiDrag), Je(document, "mouseup", this._deselectMultiDrag), Je(document, "touchend", this._deselectMultiDrag), Je(document, "keydown", this._checkKeyDown), Je(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof wr < "u" && wr) && Zn === this.sortable && !(n && qn(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; He.length; ) {
          var s = He[0];
          It(s, this.options.selectedClass, !1), He.shift(), $a({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: s,
            originalEvt: n
          });
        }
    },
    _checkKeyDown: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, zn(e, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var s = n.parentNode[an];
        !s || !s.options.multiDrag || ~He.indexOf(n) || (Zn && Zn !== s && (Zn.multiDrag._deselectMultiDrag(), Zn = s), It(n, s.options.selectedClass, !0), He.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var s = n.parentNode[an], o = He.indexOf(n);
        !s || !s.options.multiDrag || !~o || (It(n, s.options.selectedClass, !1), He.splice(o, 1));
      }
    },
    eventProperties: function() {
      var n = this, s = [], o = [];
      return He.forEach(function(a) {
        s.push({
          multiDragElement: a,
          index: a.sortableIndex
        });
        var r;
        Sn && a !== Ct ? r = -1 : Sn ? r = Lt(a, ":not(." + n.options.selectedClass + ")") : r = Lt(a), o.push({
          multiDragElement: a,
          index: r
        });
      }), {
        items: WB(He),
        clones: [].concat(In),
        oldIndicies: s,
        newIndicies: o
      };
    },
    optionListeners: {
      multiDragKey: function(n) {
        return n = n.toLowerCase(), n === "ctrl" ? n = "Control" : n.length > 1 && (n = n.charAt(0).toUpperCase() + n.substr(1)), n;
      }
    }
  });
}
function E7(e, t) {
  He.forEach(function(n, s) {
    var o = t.children[n.sortableIndex + (e ? Number(s) : 0)];
    o ? t.insertBefore(n, o) : t.appendChild(n);
  });
}
function _m(e, t) {
  In.forEach(function(n, s) {
    var o = t.children[n.sortableIndex + (e ? Number(s) : 0)];
    o ? t.insertBefore(n, o) : t.appendChild(n);
  });
}
function pl() {
  He.forEach(function(e) {
    e !== Ct && e.parentNode && e.parentNode.removeChild(e);
  });
}
Ve.mount(new g7());
Ve.mount(yh, gh);
const S7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MultiDrag: w7,
  Sortable: Ve,
  Swap: y7,
  default: Ve
}, Symbol.toStringTag, { value: "Module" })), x7 = /* @__PURE__ */ py(S7);
(function(e, t) {
  (function(s, o) {
    e.exports = o(jB, x7);
  })(typeof self < "u" ? self : FB, function(n, s) {
    return (
      /******/
      function(o) {
        var a = {};
        function r(i) {
          if (a[i])
            return a[i].exports;
          var l = a[i] = {
            /******/
            i,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return o[i].call(l.exports, l, l.exports, r), l.l = !0, l.exports;
        }
        return r.m = o, r.c = a, r.d = function(i, l, c) {
          r.o(i, l) || Object.defineProperty(i, l, { enumerable: !0, get: c });
        }, r.r = function(i) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
        }, r.t = function(i, l) {
          if (l & 1 && (i = r(i)), l & 8 || l & 4 && typeof i == "object" && i && i.__esModule)
            return i;
          var c = /* @__PURE__ */ Object.create(null);
          if (r.r(c), Object.defineProperty(c, "default", { enumerable: !0, value: i }), l & 2 && typeof i != "string")
            for (var f in i)
              r.d(c, f, (function(d) {
                return i[d];
              }).bind(null, f));
          return c;
        }, r.n = function(i) {
          var l = i && i.__esModule ? (
            /******/
            function() {
              return i.default;
            }
          ) : (
            /******/
            function() {
              return i;
            }
          );
          return r.d(l, "a", l), l;
        }, r.o = function(i, l) {
          return Object.prototype.hasOwnProperty.call(i, l);
        }, r.p = "", r(r.s = "fb15");
      }({
        /***/
        "00ee": (
          /***/
          function(o, a, r) {
            var i = r("b622"), l = i("toStringTag"), c = {};
            c[l] = "z", o.exports = String(c) === "[object z]";
          }
        ),
        /***/
        "0366": (
          /***/
          function(o, a, r) {
            var i = r("1c0b");
            o.exports = function(l, c, f) {
              if (i(l), c === void 0)
                return l;
              switch (f) {
                case 0:
                  return function() {
                    return l.call(c);
                  };
                case 1:
                  return function(d) {
                    return l.call(c, d);
                  };
                case 2:
                  return function(d, h) {
                    return l.call(c, d, h);
                  };
                case 3:
                  return function(d, h, p) {
                    return l.call(c, d, h, p);
                  };
              }
              return function() {
                return l.apply(c, arguments);
              };
            };
          }
        ),
        /***/
        "057f": (
          /***/
          function(o, a, r) {
            var i = r("fc6a"), l = r("241c").f, c = {}.toString, f = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], d = function(h) {
              try {
                return l(h);
              } catch {
                return f.slice();
              }
            };
            o.exports.f = function(p) {
              return f && c.call(p) == "[object Window]" ? d(p) : l(i(p));
            };
          }
        ),
        /***/
        "06cf": (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("d1e7"), c = r("5c6c"), f = r("fc6a"), d = r("c04e"), h = r("5135"), p = r("0cfb"), m = Object.getOwnPropertyDescriptor;
            a.f = i ? m : function(y, g) {
              if (y = f(y), g = d(g, !0), p)
                try {
                  return m(y, g);
                } catch {
                }
              if (h(y, g))
                return c(!l.f.call(y, g), y[g]);
            };
          }
        ),
        /***/
        "0cfb": (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("d039"), c = r("cc12");
            o.exports = !i && !l(function() {
              return Object.defineProperty(c("div"), "a", {
                get: function() {
                  return 7;
                }
              }).a != 7;
            });
          }
        ),
        /***/
        "13d5": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("d58f").left, c = r("a640"), f = r("ae40"), d = c("reduce"), h = f("reduce", { 1: 0 });
            i({ target: "Array", proto: !0, forced: !d || !h }, {
              reduce: function(m) {
                return l(this, m, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          }
        ),
        /***/
        "14c3": (
          /***/
          function(o, a, r) {
            var i = r("c6b6"), l = r("9263");
            o.exports = function(c, f) {
              var d = c.exec;
              if (typeof d == "function") {
                var h = d.call(c, f);
                if (typeof h != "object")
                  throw TypeError("RegExp exec method returned something other than an Object or null");
                return h;
              }
              if (i(c) !== "RegExp")
                throw TypeError("RegExp#exec called on incompatible receiver");
              return l.call(c, f);
            };
          }
        ),
        /***/
        "159b": (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("fdbc"), c = r("17c2"), f = r("9112");
            for (var d in l) {
              var h = i[d], p = h && h.prototype;
              if (p && p.forEach !== c)
                try {
                  f(p, "forEach", c);
                } catch {
                  p.forEach = c;
                }
            }
          }
        ),
        /***/
        "17c2": (
          /***/
          function(o, a, r) {
            var i = r("b727").forEach, l = r("a640"), c = r("ae40"), f = l("forEach"), d = c("forEach");
            o.exports = !f || !d ? function(p) {
              return i(this, p, arguments.length > 1 ? arguments[1] : void 0);
            } : [].forEach;
          }
        ),
        /***/
        "1be4": (
          /***/
          function(o, a, r) {
            var i = r("d066");
            o.exports = i("document", "documentElement");
          }
        ),
        /***/
        "1c0b": (
          /***/
          function(o, a) {
            o.exports = function(r) {
              if (typeof r != "function")
                throw TypeError(String(r) + " is not a function");
              return r;
            };
          }
        ),
        /***/
        "1c7e": (
          /***/
          function(o, a, r) {
            var i = r("b622"), l = i("iterator"), c = !1;
            try {
              var f = 0, d = {
                next: function() {
                  return { done: !!f++ };
                },
                return: function() {
                  c = !0;
                }
              };
              d[l] = function() {
                return this;
              }, Array.from(d, function() {
                throw 2;
              });
            } catch {
            }
            o.exports = function(h, p) {
              if (!p && !c)
                return !1;
              var m = !1;
              try {
                var _ = {};
                _[l] = function() {
                  return {
                    next: function() {
                      return { done: m = !0 };
                    }
                  };
                }, h(_);
              } catch {
              }
              return m;
            };
          }
        ),
        /***/
        "1d80": (
          /***/
          function(o, a) {
            o.exports = function(r) {
              if (r == null)
                throw TypeError("Can't call method on " + r);
              return r;
            };
          }
        ),
        /***/
        "1dde": (
          /***/
          function(o, a, r) {
            var i = r("d039"), l = r("b622"), c = r("2d00"), f = l("species");
            o.exports = function(d) {
              return c >= 51 || !i(function() {
                var h = [], p = h.constructor = {};
                return p[f] = function() {
                  return { foo: 1 };
                }, h[d](Boolean).foo !== 1;
              });
            };
          }
        ),
        /***/
        "23cb": (
          /***/
          function(o, a, r) {
            var i = r("a691"), l = Math.max, c = Math.min;
            o.exports = function(f, d) {
              var h = i(f);
              return h < 0 ? l(h + d, 0) : c(h, d);
            };
          }
        ),
        /***/
        "23e7": (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("06cf").f, c = r("9112"), f = r("6eeb"), d = r("ce4e"), h = r("e893"), p = r("94ca");
            o.exports = function(m, _) {
              var y = m.target, g = m.global, v = m.stat, S, w, $, C, N, A;
              if (g ? w = i : v ? w = i[y] || d(y, {}) : w = (i[y] || {}).prototype, w)
                for ($ in _) {
                  if (N = _[$], m.noTargetGet ? (A = l(w, $), C = A && A.value) : C = w[$], S = p(g ? $ : y + (v ? "." : "#") + $, m.forced), !S && C !== void 0) {
                    if (typeof N == typeof C)
                      continue;
                    h(N, C);
                  }
                  (m.sham || C && C.sham) && c(N, "sham", !0), f(w, $, N, m);
                }
            };
          }
        ),
        /***/
        "241c": (
          /***/
          function(o, a, r) {
            var i = r("ca84"), l = r("7839"), c = l.concat("length", "prototype");
            a.f = Object.getOwnPropertyNames || function(d) {
              return i(d, c);
            };
          }
        ),
        /***/
        "25f0": (
          /***/
          function(o, a, r) {
            var i = r("6eeb"), l = r("825a"), c = r("d039"), f = r("ad6d"), d = "toString", h = RegExp.prototype, p = h[d], m = c(function() {
              return p.call({ source: "a", flags: "b" }) != "/a/b";
            }), _ = p.name != d;
            (m || _) && i(RegExp.prototype, d, function() {
              var g = l(this), v = String(g.source), S = g.flags, w = String(S === void 0 && g instanceof RegExp && !("flags" in h) ? f.call(g) : S);
              return "/" + v + "/" + w;
            }, { unsafe: !0 });
          }
        ),
        /***/
        "2ca0": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("06cf").f, c = r("50c4"), f = r("5a34"), d = r("1d80"), h = r("ab13"), p = r("c430"), m = "".startsWith, _ = Math.min, y = h("startsWith"), g = !p && !y && !!function() {
              var v = l(String.prototype, "startsWith");
              return v && !v.writable;
            }();
            i({ target: "String", proto: !0, forced: !g && !y }, {
              startsWith: function(S) {
                var w = String(d(this));
                f(S);
                var $ = c(_(arguments.length > 1 ? arguments[1] : void 0, w.length)), C = String(S);
                return m ? m.call(w, C, $) : w.slice($, $ + C.length) === C;
              }
            });
          }
        ),
        /***/
        "2d00": (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("342f"), c = i.process, f = c && c.versions, d = f && f.v8, h, p;
            d ? (h = d.split("."), p = h[0] + h[1]) : l && (h = l.match(/Edge\/(\d+)/), (!h || h[1] >= 74) && (h = l.match(/Chrome\/(\d+)/), h && (p = h[1]))), o.exports = p && +p;
          }
        ),
        /***/
        "342f": (
          /***/
          function(o, a, r) {
            var i = r("d066");
            o.exports = i("navigator", "userAgent") || "";
          }
        ),
        /***/
        "35a1": (
          /***/
          function(o, a, r) {
            var i = r("f5df"), l = r("3f8c"), c = r("b622"), f = c("iterator");
            o.exports = function(d) {
              if (d != null)
                return d[f] || d["@@iterator"] || l[i(d)];
            };
          }
        ),
        /***/
        "37e8": (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("9bf2"), c = r("825a"), f = r("df75");
            o.exports = i ? Object.defineProperties : function(h, p) {
              c(h);
              for (var m = f(p), _ = m.length, y = 0, g; _ > y; )
                l.f(h, g = m[y++], p[g]);
              return h;
            };
          }
        ),
        /***/
        "3bbe": (
          /***/
          function(o, a, r) {
            var i = r("861d");
            o.exports = function(l) {
              if (!i(l) && l !== null)
                throw TypeError("Can't set " + String(l) + " as a prototype");
              return l;
            };
          }
        ),
        /***/
        "3ca3": (
          /***/
          function(o, a, r) {
            var i = r("6547").charAt, l = r("69f3"), c = r("7dd0"), f = "String Iterator", d = l.set, h = l.getterFor(f);
            c(String, "String", function(p) {
              d(this, {
                type: f,
                string: String(p),
                index: 0
              });
            }, function() {
              var m = h(this), _ = m.string, y = m.index, g;
              return y >= _.length ? { value: void 0, done: !0 } : (g = i(_, y), m.index += g.length, { value: g, done: !1 });
            });
          }
        ),
        /***/
        "3f8c": (
          /***/
          function(o, a) {
            o.exports = {};
          }
        ),
        /***/
        4160: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("17c2");
            i({ target: "Array", proto: !0, forced: [].forEach != l }, {
              forEach: l
            });
          }
        ),
        /***/
        "428f": (
          /***/
          function(o, a, r) {
            var i = r("da84");
            o.exports = i;
          }
        ),
        /***/
        "44ad": (
          /***/
          function(o, a, r) {
            var i = r("d039"), l = r("c6b6"), c = "".split;
            o.exports = i(function() {
              return !Object("z").propertyIsEnumerable(0);
            }) ? function(f) {
              return l(f) == "String" ? c.call(f, "") : Object(f);
            } : Object;
          }
        ),
        /***/
        "44d2": (
          /***/
          function(o, a, r) {
            var i = r("b622"), l = r("7c73"), c = r("9bf2"), f = i("unscopables"), d = Array.prototype;
            d[f] == null && c.f(d, f, {
              configurable: !0,
              value: l(null)
            }), o.exports = function(h) {
              d[f][h] = !0;
            };
          }
        ),
        /***/
        "44e7": (
          /***/
          function(o, a, r) {
            var i = r("861d"), l = r("c6b6"), c = r("b622"), f = c("match");
            o.exports = function(d) {
              var h;
              return i(d) && ((h = d[f]) !== void 0 ? !!h : l(d) == "RegExp");
            };
          }
        ),
        /***/
        4930: (
          /***/
          function(o, a, r) {
            var i = r("d039");
            o.exports = !!Object.getOwnPropertySymbols && !i(function() {
              return !String(Symbol());
            });
          }
        ),
        /***/
        "4d64": (
          /***/
          function(o, a, r) {
            var i = r("fc6a"), l = r("50c4"), c = r("23cb"), f = function(d) {
              return function(h, p, m) {
                var _ = i(h), y = l(_.length), g = c(m, y), v;
                if (d && p != p) {
                  for (; y > g; )
                    if (v = _[g++], v != v)
                      return !0;
                } else
                  for (; y > g; g++)
                    if ((d || g in _) && _[g] === p)
                      return d || g || 0;
                return !d && -1;
              };
            };
            o.exports = {
              // `Array.prototype.includes` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.includes
              includes: f(!0),
              // `Array.prototype.indexOf` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
              indexOf: f(!1)
            };
          }
        ),
        /***/
        "4de4": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("b727").filter, c = r("1dde"), f = r("ae40"), d = c("filter"), h = f("filter");
            i({ target: "Array", proto: !0, forced: !d || !h }, {
              filter: function(m) {
                return l(this, m, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          }
        ),
        /***/
        "4df4": (
          /***/
          function(o, a, r) {
            var i = r("0366"), l = r("7b0b"), c = r("9bdd"), f = r("e95a"), d = r("50c4"), h = r("8418"), p = r("35a1");
            o.exports = function(_) {
              var y = l(_), g = typeof this == "function" ? this : Array, v = arguments.length, S = v > 1 ? arguments[1] : void 0, w = S !== void 0, $ = p(y), C = 0, N, A, D, F, H, P;
              if (w && (S = i(S, v > 2 ? arguments[2] : void 0, 2)), $ != null && !(g == Array && f($)))
                for (F = $.call(y), H = F.next, A = new g(); !(D = H.call(F)).done; C++)
                  P = w ? c(F, S, [D.value, C], !0) : D.value, h(A, C, P);
              else
                for (N = d(y.length), A = new g(N); N > C; C++)
                  P = w ? S(y[C], C) : y[C], h(A, C, P);
              return A.length = C, A;
            };
          }
        ),
        /***/
        "4fad": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("6f53").entries;
            i({ target: "Object", stat: !0 }, {
              entries: function(f) {
                return l(f);
              }
            });
          }
        ),
        /***/
        "50c4": (
          /***/
          function(o, a, r) {
            var i = r("a691"), l = Math.min;
            o.exports = function(c) {
              return c > 0 ? l(i(c), 9007199254740991) : 0;
            };
          }
        ),
        /***/
        5135: (
          /***/
          function(o, a) {
            var r = {}.hasOwnProperty;
            o.exports = function(i, l) {
              return r.call(i, l);
            };
          }
        ),
        /***/
        5319: (
          /***/
          function(o, a, r) {
            var i = r("d784"), l = r("825a"), c = r("7b0b"), f = r("50c4"), d = r("a691"), h = r("1d80"), p = r("8aa5"), m = r("14c3"), _ = Math.max, y = Math.min, g = Math.floor, v = /\$([$&'`]|\d\d?|<[^>]*>)/g, S = /\$([$&'`]|\d\d?)/g, w = function($) {
              return $ === void 0 ? $ : String($);
            };
            i("replace", 2, function($, C, N, A) {
              var D = A.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, F = A.REPLACE_KEEPS_$0, H = D ? "$" : "$0";
              return [
                // `String.prototype.replace` method
                // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                function(V, q) {
                  var Y = h(this), z = V == null ? void 0 : V[$];
                  return z !== void 0 ? z.call(V, Y, q) : C.call(String(Y), V, q);
                },
                // `RegExp.prototype[@@replace]` method
                // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                function(I, V) {
                  if (!D && F || typeof V == "string" && V.indexOf(H) === -1) {
                    var q = N(C, I, this, V);
                    if (q.done)
                      return q.value;
                  }
                  var Y = l(I), z = String(this), re = typeof V == "function";
                  re || (V = String(V));
                  var Be = Y.global;
                  if (Be) {
                    var pt = Y.unicode;
                    Y.lastIndex = 0;
                  }
                  for (var et = []; ; ) {
                    var tt = m(Y, z);
                    if (tt === null || (et.push(tt), !Be))
                      break;
                    var mt = String(tt[0]);
                    mt === "" && (Y.lastIndex = p(z, f(Y.lastIndex), pt));
                  }
                  for (var St = "", Ot = 0, lt = 0; lt < et.length; lt++) {
                    tt = et[lt];
                    for (var B = String(tt[0]), de = _(y(d(tt.index), z.length), 0), ue = [], _e = 1; _e < tt.length; _e++)
                      ue.push(w(tt[_e]));
                    var Ye = tt.groups;
                    if (re) {
                      var ct = [B].concat(ue, de, z);
                      Ye !== void 0 && ct.push(Ye);
                      var x = String(V.apply(void 0, ct));
                    } else
                      x = P(B, z, de, ue, Ye, V);
                    de >= Ot && (St += z.slice(Ot, de) + x, Ot = de + B.length);
                  }
                  return St + z.slice(Ot);
                }
              ];
              function P(I, V, q, Y, z, re) {
                var Be = q + I.length, pt = Y.length, et = S;
                return z !== void 0 && (z = c(z), et = v), C.call(re, et, function(tt, mt) {
                  var St;
                  switch (mt.charAt(0)) {
                    case "$":
                      return "$";
                    case "&":
                      return I;
                    case "`":
                      return V.slice(0, q);
                    case "'":
                      return V.slice(Be);
                    case "<":
                      St = z[mt.slice(1, -1)];
                      break;
                    default:
                      var Ot = +mt;
                      if (Ot === 0)
                        return tt;
                      if (Ot > pt) {
                        var lt = g(Ot / 10);
                        return lt === 0 ? tt : lt <= pt ? Y[lt - 1] === void 0 ? mt.charAt(1) : Y[lt - 1] + mt.charAt(1) : tt;
                      }
                      St = Y[Ot - 1];
                  }
                  return St === void 0 ? "" : St;
                });
              }
            });
          }
        ),
        /***/
        5692: (
          /***/
          function(o, a, r) {
            var i = r("c430"), l = r("c6cd");
            (o.exports = function(c, f) {
              return l[c] || (l[c] = f !== void 0 ? f : {});
            })("versions", []).push({
              version: "3.6.5",
              mode: i ? "pure" : "global",
              copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
            });
          }
        ),
        /***/
        "56ef": (
          /***/
          function(o, a, r) {
            var i = r("d066"), l = r("241c"), c = r("7418"), f = r("825a");
            o.exports = i("Reflect", "ownKeys") || function(h) {
              var p = l.f(f(h)), m = c.f;
              return m ? p.concat(m(h)) : p;
            };
          }
        ),
        /***/
        "5a34": (
          /***/
          function(o, a, r) {
            var i = r("44e7");
            o.exports = function(l) {
              if (i(l))
                throw TypeError("The method doesn't accept regular expressions");
              return l;
            };
          }
        ),
        /***/
        "5c6c": (
          /***/
          function(o, a) {
            o.exports = function(r, i) {
              return {
                enumerable: !(r & 1),
                configurable: !(r & 2),
                writable: !(r & 4),
                value: i
              };
            };
          }
        ),
        /***/
        "5db7": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("a2bf"), c = r("7b0b"), f = r("50c4"), d = r("1c0b"), h = r("65f0");
            i({ target: "Array", proto: !0 }, {
              flatMap: function(m) {
                var _ = c(this), y = f(_.length), g;
                return d(m), g = h(_, 0), g.length = l(g, _, _, y, 0, 1, m, arguments.length > 1 ? arguments[1] : void 0), g;
              }
            });
          }
        ),
        /***/
        6547: (
          /***/
          function(o, a, r) {
            var i = r("a691"), l = r("1d80"), c = function(f) {
              return function(d, h) {
                var p = String(l(d)), m = i(h), _ = p.length, y, g;
                return m < 0 || m >= _ ? f ? "" : void 0 : (y = p.charCodeAt(m), y < 55296 || y > 56319 || m + 1 === _ || (g = p.charCodeAt(m + 1)) < 56320 || g > 57343 ? f ? p.charAt(m) : y : f ? p.slice(m, m + 2) : (y - 55296 << 10) + (g - 56320) + 65536);
              };
            };
            o.exports = {
              // `String.prototype.codePointAt` method
              // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
              codeAt: c(!1),
              // `String.prototype.at` method
              // https://github.com/mathiasbynens/String.prototype.at
              charAt: c(!0)
            };
          }
        ),
        /***/
        "65f0": (
          /***/
          function(o, a, r) {
            var i = r("861d"), l = r("e8b5"), c = r("b622"), f = c("species");
            o.exports = function(d, h) {
              var p;
              return l(d) && (p = d.constructor, typeof p == "function" && (p === Array || l(p.prototype)) ? p = void 0 : i(p) && (p = p[f], p === null && (p = void 0))), new (p === void 0 ? Array : p)(h === 0 ? 0 : h);
            };
          }
        ),
        /***/
        "69f3": (
          /***/
          function(o, a, r) {
            var i = r("7f9a"), l = r("da84"), c = r("861d"), f = r("9112"), d = r("5135"), h = r("f772"), p = r("d012"), m = l.WeakMap, _, y, g, v = function(D) {
              return g(D) ? y(D) : _(D, {});
            }, S = function(D) {
              return function(F) {
                var H;
                if (!c(F) || (H = y(F)).type !== D)
                  throw TypeError("Incompatible receiver, " + D + " required");
                return H;
              };
            };
            if (i) {
              var w = new m(), $ = w.get, C = w.has, N = w.set;
              _ = function(D, F) {
                return N.call(w, D, F), F;
              }, y = function(D) {
                return $.call(w, D) || {};
              }, g = function(D) {
                return C.call(w, D);
              };
            } else {
              var A = h("state");
              p[A] = !0, _ = function(D, F) {
                return f(D, A, F), F;
              }, y = function(D) {
                return d(D, A) ? D[A] : {};
              }, g = function(D) {
                return d(D, A);
              };
            }
            o.exports = {
              set: _,
              get: y,
              has: g,
              enforce: v,
              getterFor: S
            };
          }
        ),
        /***/
        "6eeb": (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("9112"), c = r("5135"), f = r("ce4e"), d = r("8925"), h = r("69f3"), p = h.get, m = h.enforce, _ = String(String).split("String");
            (o.exports = function(y, g, v, S) {
              var w = S ? !!S.unsafe : !1, $ = S ? !!S.enumerable : !1, C = S ? !!S.noTargetGet : !1;
              if (typeof v == "function" && (typeof g == "string" && !c(v, "name") && l(v, "name", g), m(v).source = _.join(typeof g == "string" ? g : "")), y === i) {
                $ ? y[g] = v : f(g, v);
                return;
              } else
                w ? !C && y[g] && ($ = !0) : delete y[g];
              $ ? y[g] = v : l(y, g, v);
            })(Function.prototype, "toString", function() {
              return typeof this == "function" && p(this).source || d(this);
            });
          }
        ),
        /***/
        "6f53": (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("df75"), c = r("fc6a"), f = r("d1e7").f, d = function(h) {
              return function(p) {
                for (var m = c(p), _ = l(m), y = _.length, g = 0, v = [], S; y > g; )
                  S = _[g++], (!i || f.call(m, S)) && v.push(h ? [S, m[S]] : m[S]);
                return v;
              };
            };
            o.exports = {
              // `Object.entries` method
              // https://tc39.github.io/ecma262/#sec-object.entries
              entries: d(!0),
              // `Object.values` method
              // https://tc39.github.io/ecma262/#sec-object.values
              values: d(!1)
            };
          }
        ),
        /***/
        "73d9": (
          /***/
          function(o, a, r) {
            var i = r("44d2");
            i("flatMap");
          }
        ),
        /***/
        7418: (
          /***/
          function(o, a) {
            a.f = Object.getOwnPropertySymbols;
          }
        ),
        /***/
        "746f": (
          /***/
          function(o, a, r) {
            var i = r("428f"), l = r("5135"), c = r("e538"), f = r("9bf2").f;
            o.exports = function(d) {
              var h = i.Symbol || (i.Symbol = {});
              l(h, d) || f(h, d, {
                value: c.f(d)
              });
            };
          }
        ),
        /***/
        7839: (
          /***/
          function(o, a) {
            o.exports = [
              "constructor",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "toLocaleString",
              "toString",
              "valueOf"
            ];
          }
        ),
        /***/
        "7b0b": (
          /***/
          function(o, a, r) {
            var i = r("1d80");
            o.exports = function(l) {
              return Object(i(l));
            };
          }
        ),
        /***/
        "7c73": (
          /***/
          function(o, a, r) {
            var i = r("825a"), l = r("37e8"), c = r("7839"), f = r("d012"), d = r("1be4"), h = r("cc12"), p = r("f772"), m = ">", _ = "<", y = "prototype", g = "script", v = p("IE_PROTO"), S = function() {
            }, w = function(D) {
              return _ + g + m + D + _ + "/" + g + m;
            }, $ = function(D) {
              D.write(w("")), D.close();
              var F = D.parentWindow.Object;
              return D = null, F;
            }, C = function() {
              var D = h("iframe"), F = "java" + g + ":", H;
              return D.style.display = "none", d.appendChild(D), D.src = String(F), H = D.contentWindow.document, H.open(), H.write(w("document.F=Object")), H.close(), H.F;
            }, N, A = function() {
              try {
                N = document.domain && new ActiveXObject("htmlfile");
              } catch {
              }
              A = N ? $(N) : C();
              for (var D = c.length; D--; )
                delete A[y][c[D]];
              return A();
            };
            f[v] = !0, o.exports = Object.create || function(F, H) {
              var P;
              return F !== null ? (S[y] = i(F), P = new S(), S[y] = null, P[v] = F) : P = A(), H === void 0 ? P : l(P, H);
            };
          }
        ),
        /***/
        "7dd0": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("9ed3"), c = r("e163"), f = r("d2bb"), d = r("d44e"), h = r("9112"), p = r("6eeb"), m = r("b622"), _ = r("c430"), y = r("3f8c"), g = r("ae93"), v = g.IteratorPrototype, S = g.BUGGY_SAFARI_ITERATORS, w = m("iterator"), $ = "keys", C = "values", N = "entries", A = function() {
              return this;
            };
            o.exports = function(D, F, H, P, I, V, q) {
              l(H, F, P);
              var Y = function(lt) {
                if (lt === I && et)
                  return et;
                if (!S && lt in Be)
                  return Be[lt];
                switch (lt) {
                  case $:
                    return function() {
                      return new H(this, lt);
                    };
                  case C:
                    return function() {
                      return new H(this, lt);
                    };
                  case N:
                    return function() {
                      return new H(this, lt);
                    };
                }
                return function() {
                  return new H(this);
                };
              }, z = F + " Iterator", re = !1, Be = D.prototype, pt = Be[w] || Be["@@iterator"] || I && Be[I], et = !S && pt || Y(I), tt = F == "Array" && Be.entries || pt, mt, St, Ot;
              if (tt && (mt = c(tt.call(new D())), v !== Object.prototype && mt.next && (!_ && c(mt) !== v && (f ? f(mt, v) : typeof mt[w] != "function" && h(mt, w, A)), d(mt, z, !0, !0), _ && (y[z] = A))), I == C && pt && pt.name !== C && (re = !0, et = function() {
                return pt.call(this);
              }), (!_ || q) && Be[w] !== et && h(Be, w, et), y[F] = et, I)
                if (St = {
                  values: Y(C),
                  keys: V ? et : Y($),
                  entries: Y(N)
                }, q)
                  for (Ot in St)
                    (S || re || !(Ot in Be)) && p(Be, Ot, St[Ot]);
                else
                  i({ target: F, proto: !0, forced: S || re }, St);
              return St;
            };
          }
        ),
        /***/
        "7f9a": (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("8925"), c = i.WeakMap;
            o.exports = typeof c == "function" && /native code/.test(l(c));
          }
        ),
        /***/
        "825a": (
          /***/
          function(o, a, r) {
            var i = r("861d");
            o.exports = function(l) {
              if (!i(l))
                throw TypeError(String(l) + " is not an object");
              return l;
            };
          }
        ),
        /***/
        "83ab": (
          /***/
          function(o, a, r) {
            var i = r("d039");
            o.exports = !i(function() {
              return Object.defineProperty({}, 1, { get: function() {
                return 7;
              } })[1] != 7;
            });
          }
        ),
        /***/
        8418: (
          /***/
          function(o, a, r) {
            var i = r("c04e"), l = r("9bf2"), c = r("5c6c");
            o.exports = function(f, d, h) {
              var p = i(d);
              p in f ? l.f(f, p, c(0, h)) : f[p] = h;
            };
          }
        ),
        /***/
        "861d": (
          /***/
          function(o, a) {
            o.exports = function(r) {
              return typeof r == "object" ? r !== null : typeof r == "function";
            };
          }
        ),
        /***/
        8875: (
          /***/
          function(o, a, r) {
            var i, l, c;
            (function(f, d) {
              l = [], i = d, c = typeof i == "function" ? i.apply(a, l) : i, c !== void 0 && (o.exports = c);
            })(typeof self < "u" ? self : this, function() {
              function f() {
                var d = Object.getOwnPropertyDescriptor(document, "currentScript");
                if (!d && "currentScript" in document && document.currentScript || d && d.get !== f && document.currentScript)
                  return document.currentScript;
                try {
                  throw new Error();
                } catch (N) {
                  var h = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, p = /@([^@]*):(\d+):(\d+)\s*$/ig, m = h.exec(N.stack) || p.exec(N.stack), _ = m && m[1] || !1, y = m && m[2] || !1, g = document.location.href.replace(document.location.hash, ""), v, S, w, $ = document.getElementsByTagName("script");
                  _ === g && (v = document.documentElement.outerHTML, S = new RegExp("(?:[^\\n]+?\\n){0," + (y - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), w = v.replace(S, "$1").trim());
                  for (var C = 0; C < $.length; C++)
                    if ($[C].readyState === "interactive" || $[C].src === _ || _ === g && $[C].innerHTML && $[C].innerHTML.trim() === w)
                      return $[C];
                  return null;
                }
              }
              return f;
            });
          }
        ),
        /***/
        8925: (
          /***/
          function(o, a, r) {
            var i = r("c6cd"), l = Function.toString;
            typeof i.inspectSource != "function" && (i.inspectSource = function(c) {
              return l.call(c);
            }), o.exports = i.inspectSource;
          }
        ),
        /***/
        "8aa5": (
          /***/
          function(o, a, r) {
            var i = r("6547").charAt;
            o.exports = function(l, c, f) {
              return c + (f ? i(l, c).length : 1);
            };
          }
        ),
        /***/
        "8bbf": (
          /***/
          function(o, a) {
            o.exports = n;
          }
        ),
        /***/
        "90e3": (
          /***/
          function(o, a) {
            var r = 0, i = Math.random();
            o.exports = function(l) {
              return "Symbol(" + String(l === void 0 ? "" : l) + ")_" + (++r + i).toString(36);
            };
          }
        ),
        /***/
        9112: (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("9bf2"), c = r("5c6c");
            o.exports = i ? function(f, d, h) {
              return l.f(f, d, c(1, h));
            } : function(f, d, h) {
              return f[d] = h, f;
            };
          }
        ),
        /***/
        9263: (
          /***/
          function(o, a, r) {
            var i = r("ad6d"), l = r("9f7f"), c = RegExp.prototype.exec, f = String.prototype.replace, d = c, h = function() {
              var y = /a/, g = /b*/g;
              return c.call(y, "a"), c.call(g, "a"), y.lastIndex !== 0 || g.lastIndex !== 0;
            }(), p = l.UNSUPPORTED_Y || l.BROKEN_CARET, m = /()??/.exec("")[1] !== void 0, _ = h || m || p;
            _ && (d = function(g) {
              var v = this, S, w, $, C, N = p && v.sticky, A = i.call(v), D = v.source, F = 0, H = g;
              return N && (A = A.replace("y", ""), A.indexOf("g") === -1 && (A += "g"), H = String(g).slice(v.lastIndex), v.lastIndex > 0 && (!v.multiline || v.multiline && g[v.lastIndex - 1] !== `
`) && (D = "(?: " + D + ")", H = " " + H, F++), w = new RegExp("^(?:" + D + ")", A)), m && (w = new RegExp("^" + D + "$(?!\\s)", A)), h && (S = v.lastIndex), $ = c.call(N ? w : v, H), N ? $ ? ($.input = $.input.slice(F), $[0] = $[0].slice(F), $.index = v.lastIndex, v.lastIndex += $[0].length) : v.lastIndex = 0 : h && $ && (v.lastIndex = v.global ? $.index + $[0].length : S), m && $ && $.length > 1 && f.call($[0], w, function() {
                for (C = 1; C < arguments.length - 2; C++)
                  arguments[C] === void 0 && ($[C] = void 0);
              }), $;
            }), o.exports = d;
          }
        ),
        /***/
        "94ca": (
          /***/
          function(o, a, r) {
            var i = r("d039"), l = /#|\.prototype\./, c = function(m, _) {
              var y = d[f(m)];
              return y == p ? !0 : y == h ? !1 : typeof _ == "function" ? i(_) : !!_;
            }, f = c.normalize = function(m) {
              return String(m).replace(l, ".").toLowerCase();
            }, d = c.data = {}, h = c.NATIVE = "N", p = c.POLYFILL = "P";
            o.exports = c;
          }
        ),
        /***/
        "99af": (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("d039"), c = r("e8b5"), f = r("861d"), d = r("7b0b"), h = r("50c4"), p = r("8418"), m = r("65f0"), _ = r("1dde"), y = r("b622"), g = r("2d00"), v = y("isConcatSpreadable"), S = 9007199254740991, w = "Maximum allowed index exceeded", $ = g >= 51 || !l(function() {
              var D = [];
              return D[v] = !1, D.concat()[0] !== D;
            }), C = _("concat"), N = function(D) {
              if (!f(D))
                return !1;
              var F = D[v];
              return F !== void 0 ? !!F : c(D);
            }, A = !$ || !C;
            i({ target: "Array", proto: !0, forced: A }, {
              concat: function(F) {
                var H = d(this), P = m(H, 0), I = 0, V, q, Y, z, re;
                for (V = -1, Y = arguments.length; V < Y; V++)
                  if (re = V === -1 ? H : arguments[V], N(re)) {
                    if (z = h(re.length), I + z > S)
                      throw TypeError(w);
                    for (q = 0; q < z; q++, I++)
                      q in re && p(P, I, re[q]);
                  } else {
                    if (I >= S)
                      throw TypeError(w);
                    p(P, I++, re);
                  }
                return P.length = I, P;
              }
            });
          }
        ),
        /***/
        "9bdd": (
          /***/
          function(o, a, r) {
            var i = r("825a");
            o.exports = function(l, c, f, d) {
              try {
                return d ? c(i(f)[0], f[1]) : c(f);
              } catch (p) {
                var h = l.return;
                throw h !== void 0 && i(h.call(l)), p;
              }
            };
          }
        ),
        /***/
        "9bf2": (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("0cfb"), c = r("825a"), f = r("c04e"), d = Object.defineProperty;
            a.f = i ? d : function(p, m, _) {
              if (c(p), m = f(m, !0), c(_), l)
                try {
                  return d(p, m, _);
                } catch {
                }
              if ("get" in _ || "set" in _)
                throw TypeError("Accessors not supported");
              return "value" in _ && (p[m] = _.value), p;
            };
          }
        ),
        /***/
        "9ed3": (
          /***/
          function(o, a, r) {
            var i = r("ae93").IteratorPrototype, l = r("7c73"), c = r("5c6c"), f = r("d44e"), d = r("3f8c"), h = function() {
              return this;
            };
            o.exports = function(p, m, _) {
              var y = m + " Iterator";
              return p.prototype = l(i, { next: c(1, _) }), f(p, y, !1, !0), d[y] = h, p;
            };
          }
        ),
        /***/
        "9f7f": (
          /***/
          function(o, a, r) {
            var i = r("d039");
            function l(c, f) {
              return RegExp(c, f);
            }
            a.UNSUPPORTED_Y = i(function() {
              var c = l("a", "y");
              return c.lastIndex = 2, c.exec("abcd") != null;
            }), a.BROKEN_CARET = i(function() {
              var c = l("^r", "gy");
              return c.lastIndex = 2, c.exec("str") != null;
            });
          }
        ),
        /***/
        a2bf: (
          /***/
          function(o, a, r) {
            var i = r("e8b5"), l = r("50c4"), c = r("0366"), f = function(d, h, p, m, _, y, g, v) {
              for (var S = _, w = 0, $ = g ? c(g, v, 3) : !1, C; w < m; ) {
                if (w in p) {
                  if (C = $ ? $(p[w], w, h) : p[w], y > 0 && i(C))
                    S = f(d, h, C, l(C.length), S, y - 1) - 1;
                  else {
                    if (S >= 9007199254740991)
                      throw TypeError("Exceed the acceptable array length");
                    d[S] = C;
                  }
                  S++;
                }
                w++;
              }
              return S;
            };
            o.exports = f;
          }
        ),
        /***/
        a352: (
          /***/
          function(o, a) {
            o.exports = s;
          }
        ),
        /***/
        a434: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("23cb"), c = r("a691"), f = r("50c4"), d = r("7b0b"), h = r("65f0"), p = r("8418"), m = r("1dde"), _ = r("ae40"), y = m("splice"), g = _("splice", { ACCESSORS: !0, 0: 0, 1: 2 }), v = Math.max, S = Math.min, w = 9007199254740991, $ = "Maximum allowed length exceeded";
            i({ target: "Array", proto: !0, forced: !y || !g }, {
              splice: function(N, A) {
                var D = d(this), F = f(D.length), H = l(N, F), P = arguments.length, I, V, q, Y, z, re;
                if (P === 0 ? I = V = 0 : P === 1 ? (I = 0, V = F - H) : (I = P - 2, V = S(v(c(A), 0), F - H)), F + I - V > w)
                  throw TypeError($);
                for (q = h(D, V), Y = 0; Y < V; Y++)
                  z = H + Y, z in D && p(q, Y, D[z]);
                if (q.length = V, I < V) {
                  for (Y = H; Y < F - V; Y++)
                    z = Y + V, re = Y + I, z in D ? D[re] = D[z] : delete D[re];
                  for (Y = F; Y > F - V + I; Y--)
                    delete D[Y - 1];
                } else if (I > V)
                  for (Y = F - V; Y > H; Y--)
                    z = Y + V - 1, re = Y + I - 1, z in D ? D[re] = D[z] : delete D[re];
                for (Y = 0; Y < I; Y++)
                  D[Y + H] = arguments[Y + 2];
                return D.length = F - V + I, q;
              }
            });
          }
        ),
        /***/
        a4d3: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("da84"), c = r("d066"), f = r("c430"), d = r("83ab"), h = r("4930"), p = r("fdbf"), m = r("d039"), _ = r("5135"), y = r("e8b5"), g = r("861d"), v = r("825a"), S = r("7b0b"), w = r("fc6a"), $ = r("c04e"), C = r("5c6c"), N = r("7c73"), A = r("df75"), D = r("241c"), F = r("057f"), H = r("7418"), P = r("06cf"), I = r("9bf2"), V = r("d1e7"), q = r("9112"), Y = r("6eeb"), z = r("5692"), re = r("f772"), Be = r("d012"), pt = r("90e3"), et = r("b622"), tt = r("e538"), mt = r("746f"), St = r("d44e"), Ot = r("69f3"), lt = r("b727").forEach, B = re("hidden"), de = "Symbol", ue = "prototype", _e = et("toPrimitive"), Ye = Ot.set, ct = Ot.getterFor(de), x = Object[ue], O = l.Symbol, U = c("JSON", "stringify"), Q = P.f, J = I.f, ie = F.f, he = V.f, se = z("symbols"), le = z("op-symbols"), ee = z("string-to-symbol-registry"), xe = z("symbol-to-string-registry"), ye = z("wks"), Oe = l.QObject, Pe = !Oe || !Oe[ue] || !Oe[ue].findChild, We = d && m(function() {
              return N(J({}, "a", {
                get: function() {
                  return J(this, "a", { value: 7 }).a;
                }
              })).a != 7;
            }) ? function(Le, ke, Me) {
              var ot = Q(x, ke);
              ot && delete x[ke], J(Le, ke, Me), ot && Le !== x && J(x, ke, ot);
            } : J, ut = function(Le, ke) {
              var Me = se[Le] = N(O[ue]);
              return Ye(Me, {
                type: de,
                tag: Le,
                description: ke
              }), d || (Me.description = ke), Me;
            }, R = p ? function(Le) {
              return typeof Le == "symbol";
            } : function(Le) {
              return Object(Le) instanceof O;
            }, M = function(ke, Me, ot) {
              ke === x && M(le, Me, ot), v(ke);
              var dt = $(Me, !0);
              return v(ot), _(se, dt) ? (ot.enumerable ? (_(ke, B) && ke[B][dt] && (ke[B][dt] = !1), ot = N(ot, { enumerable: C(0, !1) })) : (_(ke, B) || J(ke, B, C(1, {})), ke[B][dt] = !0), We(ke, dt, ot)) : J(ke, dt, ot);
            }, W = function(ke, Me) {
              v(ke);
              var ot = w(Me), dt = A(ot).concat(Fe(ot));
              return lt(dt, function(bn) {
                (!d || Ee.call(ot, bn)) && M(ke, bn, ot[bn]);
              }), ke;
            }, oe = function(ke, Me) {
              return Me === void 0 ? N(ke) : W(N(ke), Me);
            }, Ee = function(ke) {
              var Me = $(ke, !0), ot = he.call(this, Me);
              return this === x && _(se, Me) && !_(le, Me) ? !1 : ot || !_(this, Me) || !_(se, Me) || _(this, B) && this[B][Me] ? ot : !0;
            }, Re = function(ke, Me) {
              var ot = w(ke), dt = $(Me, !0);
              if (!(ot === x && _(se, dt) && !_(le, dt))) {
                var bn = Q(ot, dt);
                return bn && _(se, dt) && !(_(ot, B) && ot[B][dt]) && (bn.enumerable = !0), bn;
              }
            }, je = function(ke) {
              var Me = ie(w(ke)), ot = [];
              return lt(Me, function(dt) {
                !_(se, dt) && !_(Be, dt) && ot.push(dt);
              }), ot;
            }, Fe = function(ke) {
              var Me = ke === x, ot = ie(Me ? le : w(ke)), dt = [];
              return lt(ot, function(bn) {
                _(se, bn) && (!Me || _(x, bn)) && dt.push(se[bn]);
              }), dt;
            };
            if (h || (O = function() {
              if (this instanceof O)
                throw TypeError("Symbol is not a constructor");
              var ke = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]), Me = pt(ke), ot = function(dt) {
                this === x && ot.call(le, dt), _(this, B) && _(this[B], Me) && (this[B][Me] = !1), We(this, Me, C(1, dt));
              };
              return d && Pe && We(x, Me, { configurable: !0, set: ot }), ut(Me, ke);
            }, Y(O[ue], "toString", function() {
              return ct(this).tag;
            }), Y(O, "withoutSetter", function(Le) {
              return ut(pt(Le), Le);
            }), V.f = Ee, I.f = M, P.f = Re, D.f = F.f = je, H.f = Fe, tt.f = function(Le) {
              return ut(et(Le), Le);
            }, d && (J(O[ue], "description", {
              configurable: !0,
              get: function() {
                return ct(this).description;
              }
            }), f || Y(x, "propertyIsEnumerable", Ee, { unsafe: !0 }))), i({ global: !0, wrap: !0, forced: !h, sham: !h }, {
              Symbol: O
            }), lt(A(ye), function(Le) {
              mt(Le);
            }), i({ target: de, stat: !0, forced: !h }, {
              // `Symbol.for` method
              // https://tc39.github.io/ecma262/#sec-symbol.for
              for: function(Le) {
                var ke = String(Le);
                if (_(ee, ke))
                  return ee[ke];
                var Me = O(ke);
                return ee[ke] = Me, xe[Me] = ke, Me;
              },
              // `Symbol.keyFor` method
              // https://tc39.github.io/ecma262/#sec-symbol.keyfor
              keyFor: function(ke) {
                if (!R(ke))
                  throw TypeError(ke + " is not a symbol");
                if (_(xe, ke))
                  return xe[ke];
              },
              useSetter: function() {
                Pe = !0;
              },
              useSimple: function() {
                Pe = !1;
              }
            }), i({ target: "Object", stat: !0, forced: !h, sham: !d }, {
              // `Object.create` method
              // https://tc39.github.io/ecma262/#sec-object.create
              create: oe,
              // `Object.defineProperty` method
              // https://tc39.github.io/ecma262/#sec-object.defineproperty
              defineProperty: M,
              // `Object.defineProperties` method
              // https://tc39.github.io/ecma262/#sec-object.defineproperties
              defineProperties: W,
              // `Object.getOwnPropertyDescriptor` method
              // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
              getOwnPropertyDescriptor: Re
            }), i({ target: "Object", stat: !0, forced: !h }, {
              // `Object.getOwnPropertyNames` method
              // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
              getOwnPropertyNames: je,
              // `Object.getOwnPropertySymbols` method
              // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
              getOwnPropertySymbols: Fe
            }), i({ target: "Object", stat: !0, forced: m(function() {
              H.f(1);
            }) }, {
              getOwnPropertySymbols: function(ke) {
                return H.f(S(ke));
              }
            }), U) {
              var _t = !h || m(function() {
                var Le = O();
                return U([Le]) != "[null]" || U({ a: Le }) != "{}" || U(Object(Le)) != "{}";
              });
              i({ target: "JSON", stat: !0, forced: _t }, {
                // eslint-disable-next-line no-unused-vars
                stringify: function(ke, Me, ot) {
                  for (var dt = [ke], bn = 1, ru; arguments.length > bn; )
                    dt.push(arguments[bn++]);
                  if (ru = Me, !(!g(Me) && ke === void 0 || R(ke)))
                    return y(Me) || (Me = function(Ty, Gi) {
                      if (typeof ru == "function" && (Gi = ru.call(this, Ty, Gi)), !R(Gi))
                        return Gi;
                    }), dt[1] = Me, U.apply(null, dt);
                }
              });
            }
            O[ue][_e] || q(O[ue], _e, O[ue].valueOf), St(O, de), Be[B] = !0;
          }
        ),
        /***/
        a630: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("4df4"), c = r("1c7e"), f = !c(function(d) {
              Array.from(d);
            });
            i({ target: "Array", stat: !0, forced: f }, {
              from: l
            });
          }
        ),
        /***/
        a640: (
          /***/
          function(o, a, r) {
            var i = r("d039");
            o.exports = function(l, c) {
              var f = [][l];
              return !!f && i(function() {
                f.call(null, c || function() {
                  throw 1;
                }, 1);
              });
            };
          }
        ),
        /***/
        a691: (
          /***/
          function(o, a) {
            var r = Math.ceil, i = Math.floor;
            o.exports = function(l) {
              return isNaN(l = +l) ? 0 : (l > 0 ? i : r)(l);
            };
          }
        ),
        /***/
        ab13: (
          /***/
          function(o, a, r) {
            var i = r("b622"), l = i("match");
            o.exports = function(c) {
              var f = /./;
              try {
                "/./"[c](f);
              } catch {
                try {
                  return f[l] = !1, "/./"[c](f);
                } catch {
                }
              }
              return !1;
            };
          }
        ),
        /***/
        ac1f: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("9263");
            i({ target: "RegExp", proto: !0, forced: /./.exec !== l }, {
              exec: l
            });
          }
        ),
        /***/
        ad6d: (
          /***/
          function(o, a, r) {
            var i = r("825a");
            o.exports = function() {
              var l = i(this), c = "";
              return l.global && (c += "g"), l.ignoreCase && (c += "i"), l.multiline && (c += "m"), l.dotAll && (c += "s"), l.unicode && (c += "u"), l.sticky && (c += "y"), c;
            };
          }
        ),
        /***/
        ae40: (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("d039"), c = r("5135"), f = Object.defineProperty, d = {}, h = function(p) {
              throw p;
            };
            o.exports = function(p, m) {
              if (c(d, p))
                return d[p];
              m || (m = {});
              var _ = [][p], y = c(m, "ACCESSORS") ? m.ACCESSORS : !1, g = c(m, 0) ? m[0] : h, v = c(m, 1) ? m[1] : void 0;
              return d[p] = !!_ && !l(function() {
                if (y && !i)
                  return !0;
                var S = { length: -1 };
                y ? f(S, 1, { enumerable: !0, get: h }) : S[1] = 1, _.call(S, g, v);
              });
            };
          }
        ),
        /***/
        ae93: (
          /***/
          function(o, a, r) {
            var i = r("e163"), l = r("9112"), c = r("5135"), f = r("b622"), d = r("c430"), h = f("iterator"), p = !1, m = function() {
              return this;
            }, _, y, g;
            [].keys && (g = [].keys(), "next" in g ? (y = i(i(g)), y !== Object.prototype && (_ = y)) : p = !0), _ == null && (_ = {}), !d && !c(_, h) && l(_, h, m), o.exports = {
              IteratorPrototype: _,
              BUGGY_SAFARI_ITERATORS: p
            };
          }
        ),
        /***/
        b041: (
          /***/
          function(o, a, r) {
            var i = r("00ee"), l = r("f5df");
            o.exports = i ? {}.toString : function() {
              return "[object " + l(this) + "]";
            };
          }
        ),
        /***/
        b0c0: (
          /***/
          function(o, a, r) {
            var i = r("83ab"), l = r("9bf2").f, c = Function.prototype, f = c.toString, d = /^\s*function ([^ (]*)/, h = "name";
            i && !(h in c) && l(c, h, {
              configurable: !0,
              get: function() {
                try {
                  return f.call(this).match(d)[1];
                } catch {
                  return "";
                }
              }
            });
          }
        ),
        /***/
        b622: (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("5692"), c = r("5135"), f = r("90e3"), d = r("4930"), h = r("fdbf"), p = l("wks"), m = i.Symbol, _ = h ? m : m && m.withoutSetter || f;
            o.exports = function(y) {
              return c(p, y) || (d && c(m, y) ? p[y] = m[y] : p[y] = _("Symbol." + y)), p[y];
            };
          }
        ),
        /***/
        b64b: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("7b0b"), c = r("df75"), f = r("d039"), d = f(function() {
              c(1);
            });
            i({ target: "Object", stat: !0, forced: d }, {
              keys: function(p) {
                return c(l(p));
              }
            });
          }
        ),
        /***/
        b727: (
          /***/
          function(o, a, r) {
            var i = r("0366"), l = r("44ad"), c = r("7b0b"), f = r("50c4"), d = r("65f0"), h = [].push, p = function(m) {
              var _ = m == 1, y = m == 2, g = m == 3, v = m == 4, S = m == 6, w = m == 5 || S;
              return function($, C, N, A) {
                for (var D = c($), F = l(D), H = i(C, N, 3), P = f(F.length), I = 0, V = A || d, q = _ ? V($, P) : y ? V($, 0) : void 0, Y, z; P > I; I++)
                  if ((w || I in F) && (Y = F[I], z = H(Y, I, D), m)) {
                    if (_)
                      q[I] = z;
                    else if (z)
                      switch (m) {
                        case 3:
                          return !0;
                        case 5:
                          return Y;
                        case 6:
                          return I;
                        case 2:
                          h.call(q, Y);
                      }
                    else if (v)
                      return !1;
                  }
                return S ? -1 : g || v ? v : q;
              };
            };
            o.exports = {
              // `Array.prototype.forEach` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
              forEach: p(0),
              // `Array.prototype.map` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.map
              map: p(1),
              // `Array.prototype.filter` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.filter
              filter: p(2),
              // `Array.prototype.some` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.some
              some: p(3),
              // `Array.prototype.every` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.every
              every: p(4),
              // `Array.prototype.find` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.find
              find: p(5),
              // `Array.prototype.findIndex` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
              findIndex: p(6)
            };
          }
        ),
        /***/
        c04e: (
          /***/
          function(o, a, r) {
            var i = r("861d");
            o.exports = function(l, c) {
              if (!i(l))
                return l;
              var f, d;
              if (c && typeof (f = l.toString) == "function" && !i(d = f.call(l)) || typeof (f = l.valueOf) == "function" && !i(d = f.call(l)) || !c && typeof (f = l.toString) == "function" && !i(d = f.call(l)))
                return d;
              throw TypeError("Can't convert object to primitive value");
            };
          }
        ),
        /***/
        c430: (
          /***/
          function(o, a) {
            o.exports = !1;
          }
        ),
        /***/
        c6b6: (
          /***/
          function(o, a) {
            var r = {}.toString;
            o.exports = function(i) {
              return r.call(i).slice(8, -1);
            };
          }
        ),
        /***/
        c6cd: (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("ce4e"), c = "__core-js_shared__", f = i[c] || l(c, {});
            o.exports = f;
          }
        ),
        /***/
        c740: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("b727").findIndex, c = r("44d2"), f = r("ae40"), d = "findIndex", h = !0, p = f(d);
            d in [] && Array(1)[d](function() {
              h = !1;
            }), i({ target: "Array", proto: !0, forced: h || !p }, {
              findIndex: function(_) {
                return l(this, _, arguments.length > 1 ? arguments[1] : void 0);
              }
            }), c(d);
          }
        ),
        /***/
        c8ba: (
          /***/
          function(o, a) {
            var r;
            r = function() {
              return this;
            }();
            try {
              r = r || new Function("return this")();
            } catch {
              typeof window == "object" && (r = window);
            }
            o.exports = r;
          }
        ),
        /***/
        c975: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("4d64").indexOf, c = r("a640"), f = r("ae40"), d = [].indexOf, h = !!d && 1 / [1].indexOf(1, -0) < 0, p = c("indexOf"), m = f("indexOf", { ACCESSORS: !0, 1: 0 });
            i({ target: "Array", proto: !0, forced: h || !p || !m }, {
              indexOf: function(y) {
                return h ? d.apply(this, arguments) || 0 : l(this, y, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          }
        ),
        /***/
        ca84: (
          /***/
          function(o, a, r) {
            var i = r("5135"), l = r("fc6a"), c = r("4d64").indexOf, f = r("d012");
            o.exports = function(d, h) {
              var p = l(d), m = 0, _ = [], y;
              for (y in p)
                !i(f, y) && i(p, y) && _.push(y);
              for (; h.length > m; )
                i(p, y = h[m++]) && (~c(_, y) || _.push(y));
              return _;
            };
          }
        ),
        /***/
        caad: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("4d64").includes, c = r("44d2"), f = r("ae40"), d = f("indexOf", { ACCESSORS: !0, 1: 0 });
            i({ target: "Array", proto: !0, forced: !d }, {
              includes: function(p) {
                return l(this, p, arguments.length > 1 ? arguments[1] : void 0);
              }
            }), c("includes");
          }
        ),
        /***/
        cc12: (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("861d"), c = i.document, f = l(c) && l(c.createElement);
            o.exports = function(d) {
              return f ? c.createElement(d) : {};
            };
          }
        ),
        /***/
        ce4e: (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("9112");
            o.exports = function(c, f) {
              try {
                l(i, c, f);
              } catch {
                i[c] = f;
              }
              return f;
            };
          }
        ),
        /***/
        d012: (
          /***/
          function(o, a) {
            o.exports = {};
          }
        ),
        /***/
        d039: (
          /***/
          function(o, a) {
            o.exports = function(r) {
              try {
                return !!r();
              } catch {
                return !0;
              }
            };
          }
        ),
        /***/
        d066: (
          /***/
          function(o, a, r) {
            var i = r("428f"), l = r("da84"), c = function(f) {
              return typeof f == "function" ? f : void 0;
            };
            o.exports = function(f, d) {
              return arguments.length < 2 ? c(i[f]) || c(l[f]) : i[f] && i[f][d] || l[f] && l[f][d];
            };
          }
        ),
        /***/
        d1e7: (
          /***/
          function(o, a, r) {
            var i = {}.propertyIsEnumerable, l = Object.getOwnPropertyDescriptor, c = l && !i.call({ 1: 2 }, 1);
            a.f = c ? function(d) {
              var h = l(this, d);
              return !!h && h.enumerable;
            } : i;
          }
        ),
        /***/
        d28b: (
          /***/
          function(o, a, r) {
            var i = r("746f");
            i("iterator");
          }
        ),
        /***/
        d2bb: (
          /***/
          function(o, a, r) {
            var i = r("825a"), l = r("3bbe");
            o.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
              var c = !1, f = {}, d;
              try {
                d = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, d.call(f, []), c = f instanceof Array;
              } catch {
              }
              return function(p, m) {
                return i(p), l(m), c ? d.call(p, m) : p.__proto__ = m, p;
              };
            }() : void 0);
          }
        ),
        /***/
        d3b7: (
          /***/
          function(o, a, r) {
            var i = r("00ee"), l = r("6eeb"), c = r("b041");
            i || l(Object.prototype, "toString", c, { unsafe: !0 });
          }
        ),
        /***/
        d44e: (
          /***/
          function(o, a, r) {
            var i = r("9bf2").f, l = r("5135"), c = r("b622"), f = c("toStringTag");
            o.exports = function(d, h, p) {
              d && !l(d = p ? d : d.prototype, f) && i(d, f, { configurable: !0, value: h });
            };
          }
        ),
        /***/
        d58f: (
          /***/
          function(o, a, r) {
            var i = r("1c0b"), l = r("7b0b"), c = r("44ad"), f = r("50c4"), d = function(h) {
              return function(p, m, _, y) {
                i(m);
                var g = l(p), v = c(g), S = f(g.length), w = h ? S - 1 : 0, $ = h ? -1 : 1;
                if (_ < 2)
                  for (; ; ) {
                    if (w in v) {
                      y = v[w], w += $;
                      break;
                    }
                    if (w += $, h ? w < 0 : S <= w)
                      throw TypeError("Reduce of empty array with no initial value");
                  }
                for (; h ? w >= 0 : S > w; w += $)
                  w in v && (y = m(y, v[w], w, g));
                return y;
              };
            };
            o.exports = {
              // `Array.prototype.reduce` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
              left: d(!1),
              // `Array.prototype.reduceRight` method
              // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
              right: d(!0)
            };
          }
        ),
        /***/
        d784: (
          /***/
          function(o, a, r) {
            r("ac1f");
            var i = r("6eeb"), l = r("d039"), c = r("b622"), f = r("9263"), d = r("9112"), h = c("species"), p = !l(function() {
              var v = /./;
              return v.exec = function() {
                var S = [];
                return S.groups = { a: "7" }, S;
              }, "".replace(v, "$<a>") !== "7";
            }), m = function() {
              return "a".replace(/./, "$0") === "$0";
            }(), _ = c("replace"), y = function() {
              return /./[_] ? /./[_]("a", "$0") === "" : !1;
            }(), g = !l(function() {
              var v = /(?:)/, S = v.exec;
              v.exec = function() {
                return S.apply(this, arguments);
              };
              var w = "ab".split(v);
              return w.length !== 2 || w[0] !== "a" || w[1] !== "b";
            });
            o.exports = function(v, S, w, $) {
              var C = c(v), N = !l(function() {
                var I = {};
                return I[C] = function() {
                  return 7;
                }, ""[v](I) != 7;
              }), A = N && !l(function() {
                var I = !1, V = /a/;
                return v === "split" && (V = {}, V.constructor = {}, V.constructor[h] = function() {
                  return V;
                }, V.flags = "", V[C] = /./[C]), V.exec = function() {
                  return I = !0, null;
                }, V[C](""), !I;
              });
              if (!N || !A || v === "replace" && !(p && m && !y) || v === "split" && !g) {
                var D = /./[C], F = w(C, ""[v], function(I, V, q, Y, z) {
                  return V.exec === f ? N && !z ? { done: !0, value: D.call(V, q, Y) } : { done: !0, value: I.call(q, V, Y) } : { done: !1 };
                }, {
                  REPLACE_KEEPS_$0: m,
                  REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: y
                }), H = F[0], P = F[1];
                i(String.prototype, v, H), i(
                  RegExp.prototype,
                  C,
                  S == 2 ? function(I, V) {
                    return P.call(I, this, V);
                  } : function(I) {
                    return P.call(I, this);
                  }
                );
              }
              $ && d(RegExp.prototype[C], "sham", !0);
            };
          }
        ),
        /***/
        d81d: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("b727").map, c = r("1dde"), f = r("ae40"), d = c("map"), h = f("map");
            i({ target: "Array", proto: !0, forced: !d || !h }, {
              map: function(m) {
                return l(this, m, arguments.length > 1 ? arguments[1] : void 0);
              }
            });
          }
        ),
        /***/
        da84: (
          /***/
          function(o, a, r) {
            (function(i) {
              var l = function(c) {
                return c && c.Math == Math && c;
              };
              o.exports = // eslint-disable-next-line no-undef
              l(typeof globalThis == "object" && globalThis) || l(typeof window == "object" && window) || l(typeof self == "object" && self) || l(typeof i == "object" && i) || // eslint-disable-next-line no-new-func
              Function("return this")();
            }).call(this, r("c8ba"));
          }
        ),
        /***/
        dbb4: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("83ab"), c = r("56ef"), f = r("fc6a"), d = r("06cf"), h = r("8418");
            i({ target: "Object", stat: !0, sham: !l }, {
              getOwnPropertyDescriptors: function(m) {
                for (var _ = f(m), y = d.f, g = c(_), v = {}, S = 0, w, $; g.length > S; )
                  $ = y(_, w = g[S++]), $ !== void 0 && h(v, w, $);
                return v;
              }
            });
          }
        ),
        /***/
        dbf1: (
          /***/
          function(o, a, r) {
            (function(i) {
              r.d(a, "a", function() {
                return c;
              });
              function l() {
                return typeof window < "u" ? window.console : i.console;
              }
              var c = l();
            }).call(this, r("c8ba"));
          }
        ),
        /***/
        ddb0: (
          /***/
          function(o, a, r) {
            var i = r("da84"), l = r("fdbc"), c = r("e260"), f = r("9112"), d = r("b622"), h = d("iterator"), p = d("toStringTag"), m = c.values;
            for (var _ in l) {
              var y = i[_], g = y && y.prototype;
              if (g) {
                if (g[h] !== m)
                  try {
                    f(g, h, m);
                  } catch {
                    g[h] = m;
                  }
                if (g[p] || f(g, p, _), l[_]) {
                  for (var v in c)
                    if (g[v] !== c[v])
                      try {
                        f(g, v, c[v]);
                      } catch {
                        g[v] = c[v];
                      }
                }
              }
            }
          }
        ),
        /***/
        df75: (
          /***/
          function(o, a, r) {
            var i = r("ca84"), l = r("7839");
            o.exports = Object.keys || function(f) {
              return i(f, l);
            };
          }
        ),
        /***/
        e01a: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("83ab"), c = r("da84"), f = r("5135"), d = r("861d"), h = r("9bf2").f, p = r("e893"), m = c.Symbol;
            if (l && typeof m == "function" && (!("description" in m.prototype) || // Safari 12 bug
            m().description !== void 0)) {
              var _ = {}, y = function() {
                var C = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]), N = this instanceof y ? new m(C) : C === void 0 ? m() : m(C);
                return C === "" && (_[N] = !0), N;
              };
              p(y, m);
              var g = y.prototype = m.prototype;
              g.constructor = y;
              var v = g.toString, S = String(m("test")) == "Symbol(test)", w = /^Symbol\((.*)\)[^)]+$/;
              h(g, "description", {
                configurable: !0,
                get: function() {
                  var C = d(this) ? this.valueOf() : this, N = v.call(C);
                  if (f(_, C))
                    return "";
                  var A = S ? N.slice(7, -1) : N.replace(w, "$1");
                  return A === "" ? void 0 : A;
                }
              }), i({ global: !0, forced: !0 }, {
                Symbol: y
              });
            }
          }
        ),
        /***/
        e163: (
          /***/
          function(o, a, r) {
            var i = r("5135"), l = r("7b0b"), c = r("f772"), f = r("e177"), d = c("IE_PROTO"), h = Object.prototype;
            o.exports = f ? Object.getPrototypeOf : function(p) {
              return p = l(p), i(p, d) ? p[d] : typeof p.constructor == "function" && p instanceof p.constructor ? p.constructor.prototype : p instanceof Object ? h : null;
            };
          }
        ),
        /***/
        e177: (
          /***/
          function(o, a, r) {
            var i = r("d039");
            o.exports = !i(function() {
              function l() {
              }
              return l.prototype.constructor = null, Object.getPrototypeOf(new l()) !== l.prototype;
            });
          }
        ),
        /***/
        e260: (
          /***/
          function(o, a, r) {
            var i = r("fc6a"), l = r("44d2"), c = r("3f8c"), f = r("69f3"), d = r("7dd0"), h = "Array Iterator", p = f.set, m = f.getterFor(h);
            o.exports = d(Array, "Array", function(_, y) {
              p(this, {
                type: h,
                target: i(_),
                // target
                index: 0,
                // next index
                kind: y
                // kind
              });
            }, function() {
              var _ = m(this), y = _.target, g = _.kind, v = _.index++;
              return !y || v >= y.length ? (_.target = void 0, { value: void 0, done: !0 }) : g == "keys" ? { value: v, done: !1 } : g == "values" ? { value: y[v], done: !1 } : { value: [v, y[v]], done: !1 };
            }, "values"), c.Arguments = c.Array, l("keys"), l("values"), l("entries");
          }
        ),
        /***/
        e439: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("d039"), c = r("fc6a"), f = r("06cf").f, d = r("83ab"), h = l(function() {
              f(1);
            }), p = !d || h;
            i({ target: "Object", stat: !0, forced: p, sham: !d }, {
              getOwnPropertyDescriptor: function(_, y) {
                return f(c(_), y);
              }
            });
          }
        ),
        /***/
        e538: (
          /***/
          function(o, a, r) {
            var i = r("b622");
            a.f = i;
          }
        ),
        /***/
        e893: (
          /***/
          function(o, a, r) {
            var i = r("5135"), l = r("56ef"), c = r("06cf"), f = r("9bf2");
            o.exports = function(d, h) {
              for (var p = l(h), m = f.f, _ = c.f, y = 0; y < p.length; y++) {
                var g = p[y];
                i(d, g) || m(d, g, _(h, g));
              }
            };
          }
        ),
        /***/
        e8b5: (
          /***/
          function(o, a, r) {
            var i = r("c6b6");
            o.exports = Array.isArray || function(c) {
              return i(c) == "Array";
            };
          }
        ),
        /***/
        e95a: (
          /***/
          function(o, a, r) {
            var i = r("b622"), l = r("3f8c"), c = i("iterator"), f = Array.prototype;
            o.exports = function(d) {
              return d !== void 0 && (l.Array === d || f[c] === d);
            };
          }
        ),
        /***/
        f5df: (
          /***/
          function(o, a, r) {
            var i = r("00ee"), l = r("c6b6"), c = r("b622"), f = c("toStringTag"), d = l(function() {
              return arguments;
            }()) == "Arguments", h = function(p, m) {
              try {
                return p[m];
              } catch {
              }
            };
            o.exports = i ? l : function(p) {
              var m, _, y;
              return p === void 0 ? "Undefined" : p === null ? "Null" : typeof (_ = h(m = Object(p), f)) == "string" ? _ : d ? l(m) : (y = l(m)) == "Object" && typeof m.callee == "function" ? "Arguments" : y;
            };
          }
        ),
        /***/
        f772: (
          /***/
          function(o, a, r) {
            var i = r("5692"), l = r("90e3"), c = i("keys");
            o.exports = function(f) {
              return c[f] || (c[f] = l(f));
            };
          }
        ),
        /***/
        fb15: (
          /***/
          function(o, a, r) {
            if (r.r(a), typeof window < "u") {
              var i = window.document.currentScript;
              {
                var l = r("8875");
                i = l(), "currentScript" in document || Object.defineProperty(document, "currentScript", { get: l });
              }
              var c = i && i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
              c && (r.p = c[1]);
            }
            r("99af"), r("4de4"), r("4160"), r("c975"), r("d81d"), r("a434"), r("159b"), r("a4d3"), r("e439"), r("dbb4"), r("b64b");
            function f(R, M, W) {
              return M in R ? Object.defineProperty(R, M, {
                value: W,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : R[M] = W, R;
            }
            function d(R, M) {
              var W = Object.keys(R);
              if (Object.getOwnPropertySymbols) {
                var oe = Object.getOwnPropertySymbols(R);
                M && (oe = oe.filter(function(Ee) {
                  return Object.getOwnPropertyDescriptor(R, Ee).enumerable;
                })), W.push.apply(W, oe);
              }
              return W;
            }
            function h(R) {
              for (var M = 1; M < arguments.length; M++) {
                var W = arguments[M] != null ? arguments[M] : {};
                M % 2 ? d(Object(W), !0).forEach(function(oe) {
                  f(R, oe, W[oe]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(R, Object.getOwnPropertyDescriptors(W)) : d(Object(W)).forEach(function(oe) {
                  Object.defineProperty(R, oe, Object.getOwnPropertyDescriptor(W, oe));
                });
              }
              return R;
            }
            function p(R) {
              if (Array.isArray(R))
                return R;
            }
            r("e01a"), r("d28b"), r("e260"), r("d3b7"), r("3ca3"), r("ddb0");
            function m(R, M) {
              if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(R)))) {
                var W = [], oe = !0, Ee = !1, Re = void 0;
                try {
                  for (var je = R[Symbol.iterator](), Fe; !(oe = (Fe = je.next()).done) && (W.push(Fe.value), !(M && W.length === M)); oe = !0)
                    ;
                } catch (_t) {
                  Ee = !0, Re = _t;
                } finally {
                  try {
                    !oe && je.return != null && je.return();
                  } finally {
                    if (Ee)
                      throw Re;
                  }
                }
                return W;
              }
            }
            r("a630"), r("fb6a"), r("b0c0"), r("25f0");
            function _(R, M) {
              (M == null || M > R.length) && (M = R.length);
              for (var W = 0, oe = new Array(M); W < M; W++)
                oe[W] = R[W];
              return oe;
            }
            function y(R, M) {
              if (R) {
                if (typeof R == "string")
                  return _(R, M);
                var W = Object.prototype.toString.call(R).slice(8, -1);
                if (W === "Object" && R.constructor && (W = R.constructor.name), W === "Map" || W === "Set")
                  return Array.from(R);
                if (W === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(W))
                  return _(R, M);
              }
            }
            function g() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            function v(R, M) {
              return p(R) || m(R, M) || y(R, M) || g();
            }
            function S(R) {
              if (Array.isArray(R))
                return _(R);
            }
            function w(R) {
              if (typeof Symbol < "u" && Symbol.iterator in Object(R))
                return Array.from(R);
            }
            function $() {
              throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }
            function C(R) {
              return S(R) || w(R) || y(R) || $();
            }
            var N = r("a352"), A = /* @__PURE__ */ r.n(N);
            function D(R) {
              R.parentElement !== null && R.parentElement.removeChild(R);
            }
            function F(R, M, W) {
              var oe = W === 0 ? R.children[0] : R.children[W - 1].nextSibling;
              R.insertBefore(M, oe);
            }
            var H = r("dbf1");
            r("13d5"), r("4fad"), r("ac1f"), r("5319");
            function P(R) {
              var M = /* @__PURE__ */ Object.create(null);
              return function(oe) {
                var Ee = M[oe];
                return Ee || (M[oe] = R(oe));
              };
            }
            var I = /-(\w)/g, V = P(function(R) {
              return R.replace(I, function(M, W) {
                return W.toUpperCase();
              });
            });
            r("5db7"), r("73d9");
            var q = ["Start", "Add", "Remove", "Update", "End"], Y = ["Choose", "Unchoose", "Sort", "Filter", "Clone"], z = ["Move"], re = [z, q, Y].flatMap(function(R) {
              return R;
            }).map(function(R) {
              return "on".concat(R);
            }), Be = {
              manage: z,
              manageAndEmit: q,
              emit: Y
            };
            function pt(R) {
              return re.indexOf(R) !== -1;
            }
            r("caad"), r("2ca0");
            var et = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
            function tt(R) {
              return et.includes(R);
            }
            function mt(R) {
              return ["transition-group", "TransitionGroup"].includes(R);
            }
            function St(R) {
              return ["id", "class", "role", "style"].includes(R) || R.startsWith("data-") || R.startsWith("aria-") || R.startsWith("on");
            }
            function Ot(R) {
              return R.reduce(function(M, W) {
                var oe = v(W, 2), Ee = oe[0], Re = oe[1];
                return M[Ee] = Re, M;
              }, {});
            }
            function lt(R) {
              var M = R.$attrs, W = R.componentData, oe = W === void 0 ? {} : W, Ee = Ot(Object.entries(M).filter(function(Re) {
                var je = v(Re, 2), Fe = je[0];
                return je[1], St(Fe);
              }));
              return h(h({}, Ee), oe);
            }
            function B(R) {
              var M = R.$attrs, W = R.callBackBuilder, oe = Ot(de(M));
              Object.entries(W).forEach(function(Re) {
                var je = v(Re, 2), Fe = je[0], _t = je[1];
                Be[Fe].forEach(function(Le) {
                  oe["on".concat(Le)] = _t(Le);
                });
              });
              var Ee = "[data-draggable]".concat(oe.draggable || "");
              return h(h({}, oe), {}, {
                draggable: Ee
              });
            }
            function de(R) {
              return Object.entries(R).filter(function(M) {
                var W = v(M, 2), oe = W[0];
                return W[1], !St(oe);
              }).map(function(M) {
                var W = v(M, 2), oe = W[0], Ee = W[1];
                return [V(oe), Ee];
              }).filter(function(M) {
                var W = v(M, 2), oe = W[0];
                return W[1], !pt(oe);
              });
            }
            r("c740");
            function ue(R, M) {
              if (!(R instanceof M))
                throw new TypeError("Cannot call a class as a function");
            }
            function _e(R, M) {
              for (var W = 0; W < M.length; W++) {
                var oe = M[W];
                oe.enumerable = oe.enumerable || !1, oe.configurable = !0, "value" in oe && (oe.writable = !0), Object.defineProperty(R, oe.key, oe);
              }
            }
            function Ye(R, M, W) {
              return M && _e(R.prototype, M), W && _e(R, W), R;
            }
            var ct = function(M) {
              var W = M.el;
              return W;
            }, x = function(M, W) {
              return M.__draggable_context = W;
            }, O = function(M) {
              return M.__draggable_context;
            }, U = /* @__PURE__ */ function() {
              function R(M) {
                var W = M.nodes, oe = W.header, Ee = W.default, Re = W.footer, je = M.root, Fe = M.realList;
                ue(this, R), this.defaultNodes = Ee, this.children = [].concat(C(oe), C(Ee), C(Re)), this.externalComponent = je.externalComponent, this.rootTransition = je.transition, this.tag = je.tag, this.realList = Fe;
              }
              return Ye(R, [{
                key: "render",
                value: function(W, oe) {
                  var Ee = this.tag, Re = this.children, je = this._isRootComponent, Fe = je ? {
                    default: function() {
                      return Re;
                    }
                  } : Re;
                  return W(Ee, oe, Fe);
                }
              }, {
                key: "updated",
                value: function() {
                  var W = this.defaultNodes, oe = this.realList;
                  W.forEach(function(Ee, Re) {
                    x(ct(Ee), {
                      element: oe[Re],
                      index: Re
                    });
                  });
                }
              }, {
                key: "getUnderlyingVm",
                value: function(W) {
                  return O(W);
                }
              }, {
                key: "getVmIndexFromDomIndex",
                value: function(W, oe) {
                  var Ee = this.defaultNodes, Re = Ee.length, je = oe.children, Fe = je.item(W);
                  if (Fe === null)
                    return Re;
                  var _t = O(Fe);
                  if (_t)
                    return _t.index;
                  if (Re === 0)
                    return 0;
                  var Le = ct(Ee[0]), ke = C(je).findIndex(function(Me) {
                    return Me === Le;
                  });
                  return W < ke ? 0 : Re;
                }
              }, {
                key: "_isRootComponent",
                get: function() {
                  return this.externalComponent || this.rootTransition;
                }
              }]), R;
            }(), Q = r("8bbf");
            function J(R, M) {
              var W = R[M];
              return W ? W() : [];
            }
            function ie(R) {
              var M = R.$slots, W = R.realList, oe = R.getKey, Ee = W || [], Re = ["header", "footer"].map(function(Me) {
                return J(M, Me);
              }), je = v(Re, 2), Fe = je[0], _t = je[1], Le = M.item;
              if (!Le)
                throw new Error("draggable element must have an item slot");
              var ke = Ee.flatMap(function(Me, ot) {
                return Le({
                  element: Me,
                  index: ot
                }).map(function(dt) {
                  return dt.key = oe(Me), dt.props = h(h({}, dt.props || {}), {}, {
                    "data-draggable": !0
                  }), dt;
                });
              });
              if (ke.length !== Ee.length)
                throw new Error("Item slot must have only one child");
              return {
                header: Fe,
                footer: _t,
                default: ke
              };
            }
            function he(R) {
              var M = mt(R), W = !tt(R) && !M;
              return {
                transition: M,
                externalComponent: W,
                tag: W ? Object(Q.resolveComponent)(R) : M ? Q.TransitionGroup : R
              };
            }
            function se(R) {
              var M = R.$slots, W = R.tag, oe = R.realList, Ee = R.getKey, Re = ie({
                $slots: M,
                realList: oe,
                getKey: Ee
              }), je = he(W);
              return new U({
                nodes: Re,
                root: je,
                realList: oe
              });
            }
            function le(R, M) {
              var W = this;
              Object(Q.nextTick)(function() {
                return W.$emit(R.toLowerCase(), M);
              });
            }
            function ee(R) {
              var M = this;
              return function(W, oe) {
                if (M.realList !== null)
                  return M["onDrag".concat(R)](W, oe);
              };
            }
            function xe(R) {
              var M = this, W = ee.call(this, R);
              return function(oe, Ee) {
                W.call(M, oe, Ee), le.call(M, R, oe);
              };
            }
            var ye = null, Oe = {
              list: {
                type: Array,
                required: !1,
                default: null
              },
              modelValue: {
                type: Array,
                required: !1,
                default: null
              },
              itemKey: {
                type: [String, Function],
                required: !0
              },
              clone: {
                type: Function,
                default: function(M) {
                  return M;
                }
              },
              tag: {
                type: String,
                default: "div"
              },
              move: {
                type: Function,
                default: null
              },
              componentData: {
                type: Object,
                required: !1,
                default: null
              }
            }, Pe = ["update:modelValue", "change"].concat(C([].concat(C(Be.manageAndEmit), C(Be.emit)).map(function(R) {
              return R.toLowerCase();
            }))), We = Object(Q.defineComponent)({
              name: "draggable",
              inheritAttrs: !1,
              props: Oe,
              emits: Pe,
              data: function() {
                return {
                  error: !1
                };
              },
              render: function() {
                try {
                  this.error = !1;
                  var M = this.$slots, W = this.$attrs, oe = this.tag, Ee = this.componentData, Re = this.realList, je = this.getKey, Fe = se({
                    $slots: M,
                    tag: oe,
                    realList: Re,
                    getKey: je
                  });
                  this.componentStructure = Fe;
                  var _t = lt({
                    $attrs: W,
                    componentData: Ee
                  });
                  return Fe.render(Q.h, _t);
                } catch (Le) {
                  return this.error = !0, Object(Q.h)("pre", {
                    style: {
                      color: "red"
                    }
                  }, Le.stack);
                }
              },
              created: function() {
                this.list !== null && this.modelValue !== null && H.a.error("modelValue and list props are mutually exclusive! Please set one or another.");
              },
              mounted: function() {
                var M = this;
                if (!this.error) {
                  var W = this.$attrs, oe = this.$el, Ee = this.componentStructure;
                  Ee.updated();
                  var Re = B({
                    $attrs: W,
                    callBackBuilder: {
                      manageAndEmit: function(_t) {
                        return xe.call(M, _t);
                      },
                      emit: function(_t) {
                        return le.bind(M, _t);
                      },
                      manage: function(_t) {
                        return ee.call(M, _t);
                      }
                    }
                  }), je = oe.nodeType === 1 ? oe : oe.parentElement;
                  this._sortable = new A.a(je, Re), this.targetDomElement = je, je.__draggable_component__ = this;
                }
              },
              updated: function() {
                this.componentStructure.updated();
              },
              beforeUnmount: function() {
                this._sortable !== void 0 && this._sortable.destroy();
              },
              computed: {
                realList: function() {
                  var M = this.list;
                  return M || this.modelValue;
                },
                getKey: function() {
                  var M = this.itemKey;
                  return typeof M == "function" ? M : function(W) {
                    return W[M];
                  };
                }
              },
              watch: {
                $attrs: {
                  handler: function(M) {
                    var W = this._sortable;
                    W && de(M).forEach(function(oe) {
                      var Ee = v(oe, 2), Re = Ee[0], je = Ee[1];
                      W.option(Re, je);
                    });
                  },
                  deep: !0
                }
              },
              methods: {
                getUnderlyingVm: function(M) {
                  return this.componentStructure.getUnderlyingVm(M) || null;
                },
                getUnderlyingPotencialDraggableComponent: function(M) {
                  return M.__draggable_component__;
                },
                emitChanges: function(M) {
                  var W = this;
                  Object(Q.nextTick)(function() {
                    return W.$emit("change", M);
                  });
                },
                alterList: function(M) {
                  if (this.list) {
                    M(this.list);
                    return;
                  }
                  var W = C(this.modelValue);
                  M(W), this.$emit("update:modelValue", W);
                },
                spliceList: function() {
                  var M = arguments, W = function(Ee) {
                    return Ee.splice.apply(Ee, C(M));
                  };
                  this.alterList(W);
                },
                updatePosition: function(M, W) {
                  var oe = function(Re) {
                    return Re.splice(W, 0, Re.splice(M, 1)[0]);
                  };
                  this.alterList(oe);
                },
                getRelatedContextFromMoveEvent: function(M) {
                  var W = M.to, oe = M.related, Ee = this.getUnderlyingPotencialDraggableComponent(W);
                  if (!Ee)
                    return {
                      component: Ee
                    };
                  var Re = Ee.realList, je = {
                    list: Re,
                    component: Ee
                  };
                  if (W !== oe && Re) {
                    var Fe = Ee.getUnderlyingVm(oe) || {};
                    return h(h({}, Fe), je);
                  }
                  return je;
                },
                getVmIndexFromDomIndex: function(M) {
                  return this.componentStructure.getVmIndexFromDomIndex(M, this.targetDomElement);
                },
                onDragStart: function(M) {
                  this.context = this.getUnderlyingVm(M.item), M.item._underlying_vm_ = this.clone(this.context.element), ye = M.item;
                },
                onDragAdd: function(M) {
                  var W = M.item._underlying_vm_;
                  if (W !== void 0) {
                    D(M.item);
                    var oe = this.getVmIndexFromDomIndex(M.newIndex);
                    this.spliceList(oe, 0, W);
                    var Ee = {
                      element: W,
                      newIndex: oe
                    };
                    this.emitChanges({
                      added: Ee
                    });
                  }
                },
                onDragRemove: function(M) {
                  if (F(this.$el, M.item, M.oldIndex), M.pullMode === "clone") {
                    D(M.clone);
                    return;
                  }
                  var W = this.context, oe = W.index, Ee = W.element;
                  this.spliceList(oe, 1);
                  var Re = {
                    element: Ee,
                    oldIndex: oe
                  };
                  this.emitChanges({
                    removed: Re
                  });
                },
                onDragUpdate: function(M) {
                  D(M.item), F(M.from, M.item, M.oldIndex);
                  var W = this.context.index, oe = this.getVmIndexFromDomIndex(M.newIndex);
                  this.updatePosition(W, oe);
                  var Ee = {
                    element: this.context.element,
                    oldIndex: W,
                    newIndex: oe
                  };
                  this.emitChanges({
                    moved: Ee
                  });
                },
                computeFutureIndex: function(M, W) {
                  if (!M.element)
                    return 0;
                  var oe = C(W.to.children).filter(function(Fe) {
                    return Fe.style.display !== "none";
                  }), Ee = oe.indexOf(W.related), Re = M.component.getVmIndexFromDomIndex(Ee), je = oe.indexOf(ye) !== -1;
                  return je || !W.willInsertAfter ? Re : Re + 1;
                },
                onDragMove: function(M, W) {
                  var oe = this.move, Ee = this.realList;
                  if (!oe || !Ee)
                    return !0;
                  var Re = this.getRelatedContextFromMoveEvent(M), je = this.computeFutureIndex(Re, M), Fe = h(h({}, this.context), {}, {
                    futureIndex: je
                  }), _t = h(h({}, M), {}, {
                    relatedContext: Re,
                    draggedContext: Fe
                  });
                  return oe(_t, W);
                },
                onDragEnd: function() {
                  ye = null;
                }
              }
            }), ut = We;
            a.default = ut;
          }
        ),
        /***/
        fb6a: (
          /***/
          function(o, a, r) {
            var i = r("23e7"), l = r("861d"), c = r("e8b5"), f = r("23cb"), d = r("50c4"), h = r("fc6a"), p = r("8418"), m = r("b622"), _ = r("1dde"), y = r("ae40"), g = _("slice"), v = y("slice", { ACCESSORS: !0, 0: 0, 1: 2 }), S = m("species"), w = [].slice, $ = Math.max;
            i({ target: "Array", proto: !0, forced: !g || !v }, {
              slice: function(N, A) {
                var D = h(this), F = d(D.length), H = f(N, F), P = f(A === void 0 ? F : A, F), I, V, q;
                if (c(D) && (I = D.constructor, typeof I == "function" && (I === Array || c(I.prototype)) ? I = void 0 : l(I) && (I = I[S], I === null && (I = void 0)), I === Array || I === void 0))
                  return w.call(D, H, P);
                for (V = new (I === void 0 ? Array : I)($(P - H, 0)), q = 0; H < P; H++, q++)
                  H in D && p(V, q, D[H]);
                return V.length = q, V;
              }
            });
          }
        ),
        /***/
        fc6a: (
          /***/
          function(o, a, r) {
            var i = r("44ad"), l = r("1d80");
            o.exports = function(c) {
              return i(l(c));
            };
          }
        ),
        /***/
        fdbc: (
          /***/
          function(o, a) {
            o.exports = {
              CSSRuleList: 0,
              CSSStyleDeclaration: 0,
              CSSValueList: 0,
              ClientRectList: 0,
              DOMRectList: 0,
              DOMStringList: 0,
              DOMTokenList: 1,
              DataTransferItemList: 0,
              FileList: 0,
              HTMLAllCollection: 0,
              HTMLCollection: 0,
              HTMLFormElement: 0,
              HTMLSelectElement: 0,
              MediaList: 0,
              MimeTypeArray: 0,
              NamedNodeMap: 0,
              NodeList: 1,
              PaintRequestList: 0,
              Plugin: 0,
              PluginArray: 0,
              SVGLengthList: 0,
              SVGNumberList: 0,
              SVGPathSegList: 0,
              SVGPointList: 0,
              SVGStringList: 0,
              SVGTransformList: 0,
              SourceBufferList: 0,
              StyleSheetList: 0,
              TextTrackCueList: 0,
              TextTrackList: 0,
              TouchList: 0
            };
          }
        ),
        /***/
        fdbf: (
          /***/
          function(o, a, r) {
            var i = r("4930");
            o.exports = i && !Symbol.sham && typeof Symbol.iterator == "symbol";
          }
        )
        /******/
      }).default
    );
  });
})(my);
var $7 = my.exports;
const C7 = /* @__PURE__ */ UB($7);
const O7 = (e) => (Ze("data-v-30f0e461"), e = e(), qe(), e), k7 = { class: "nav-item" }, T7 = ["onClick"], N7 = { class: "ellipsis" }, D7 = /* @__PURE__ */ O7(() => /* @__PURE__ */ u("button", {
  type: "button",
  class: "handle btn btn-sm visible-hover",
  style: { cursor: "move" }
}, [
  /* @__PURE__ */ u("i", { class: "fa fa-align-justify" })
], -1)), A7 = {
  __name: "FhirSystemsTabs",
  props: {
    elements: { type: Array, default: () => [] },
    active: { type: Object, default: () => {
    } },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:elements", "system-selected"],
  setup(e, { emit: t }) {
    const n = e, s = k({
      get: () => n.elements,
      set: (a) => t("update:elements", a)
    });
    async function o(a, r) {
      t("system-selected", a, r);
    }
    return (a, r) => (b(), Ce(G(C7), {
      class: "nav nav-tabs",
      tag: "ul",
      modelValue: s.value,
      "onUpdate:modelValue": r[0] || (r[0] = (i) => s.value = i),
      handle: ".handle",
      "item-key": "ehr_id"
    }, {
      item: K(({ element: i, index: l }) => {
        var c;
        return [
          u("li", k7, [
            u("span", {
              class: Ne(["nav-link", {
                active: (i == null ? void 0 : i.ehr_id) === ((c = e.active) == null ? void 0 : c.ehr_id)
              }]),
              "aria-current": "page"
            }, [
              u("button", {
                type: "button",
                class: "btn btn-sm",
                onClick: kt((f) => o(i, l), ["prevent"])
              }, [
                u("span", N7, j(i.ehr_name), 1)
              ], 8, T7),
              D7
            ], 2)
          ])
        ];
      }),
      _: 1
    }, 8, ["modelValue"]));
  }
}, R7 = /* @__PURE__ */ Se(A7, [["__scopeId", "data-v-30f0e461"]]), I7 = ["innerHTML"], ls = {
  __name: "ErrorList",
  props: {
    errors: { type: Array, default: () => [] }
  },
  setup(e) {
    return (t, n) => (b(), E("div", null, [
      (b(!0), E(ne, null, Ae(e.errors, (s, o) => (b(), E("small", {
        key: o,
        class: "d-block text-danger",
        innerHTML: s
      }, null, 8, I7))), 128))
    ]));
  }
}, P7 = { class: "d-flex gap-2" }, M7 = /* @__PURE__ */ u("option", { value: "" }, "Always", -1), L7 = /* @__PURE__ */ u("option", { value: "ehr" }, "ehr launch", -1), V7 = /* @__PURE__ */ u("option", { value: "standalone" }, "standalone launch", -1), F7 = [
  M7,
  L7,
  V7
], vm = {
  __name: "AuthenticationParameterEntry",
  props: {
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    context: { type: String, default: "" }
  },
  emits: ["update:name", "update:value", "update:context"],
  setup(e, { expose: t, emit: n }) {
    const s = e, o = dy({
      name: [Wa()],
      value: [Wa()]
    }), a = k(
      () => o({ name: i.value, value: l.value, context: c.value })
    ), r = k(() => a.value.errors()), i = k({
      get: () => s.name,
      set: (f) => n("update:name", f)
    }), l = k({
      get: () => s.value,
      set: (f) => n("update:value", f)
    }), c = k({
      get: () => s.context,
      set: (f) => n("update:context", f)
    });
    return t({ validation: a }), (f, d) => (b(), E("div", P7, [
      u("div", null, [
        L(u("input", {
          class: "form-control form-control-sm",
          type: "text",
          placeholder: "key...",
          "onUpdate:modelValue": d[0] || (d[0] = (h) => i.value = h)
        }, null, 512), [
          [Ke, i.value]
        ]),
        T(ls, {
          errors: r.value.name
        }, null, 8, ["errors"])
      ]),
      u("div", null, [
        L(u("input", {
          class: "form-control form-control-sm",
          type: "text",
          placeholder: "value...",
          "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h)
        }, null, 512), [
          [Ke, l.value]
        ]),
        T(ls, {
          errors: r.value.value
        }, null, 8, ["errors"])
      ]),
      u("div", null, [
        L(u("select", {
          class: "form-select form-select-sm",
          "onUpdate:modelValue": d[2] || (d[2] = (h) => c.value = h)
        }, F7, 512), [
          [vn, c.value]
        ])
      ]),
      we(f.$slots, "default")
    ]));
  }
}, U7 = { class: "my-2" }, j7 = /* @__PURE__ */ u("i", { class: "fas fa-plus fa-fw me-1" }, null, -1), H7 = /* @__PURE__ */ u("span", null, "...", -1), B7 = {
  key: 0,
  class: "fst-italic text-muted d-block"
}, Y7 = { class: "d-flex flex-column gap-2" }, W7 = ["onClick"], G7 = /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1), z7 = [
  G7
], K7 = { class: "d-flex gap-2 justify-content-end" }, J7 = ["onClick"], X7 = /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1), Q7 = /* @__PURE__ */ u("span", null, "Cancel", -1), Z7 = [
  X7,
  Q7
], q7 = ["onClick", "disabled"], e9 = /* @__PURE__ */ u("i", { class: "fas fa-check fa-fw me-1" }, null, -1), t9 = /* @__PURE__ */ u("span", null, "OK", -1), n9 = [
  e9,
  t9
], s9 = {
  __name: "AuthenticationParameterManager",
  props: { modelValue: { type: Array, default: () => [] } },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = () => ({ name: "", value: "", context: "" }), o = te(), a = te({}), r = te(), i = k(
      () => {
        var h, p;
        return !((p = (h = r.value) == null ? void 0 : h.validation) != null && p.hasErrors());
      }
    ), l = k({
      get: () => n.modelValue,
      set: (h) => t("update:modelValue", h)
    });
    function c(h) {
      const p = l.value;
      p.push(h), l.value = [...p];
    }
    async function f() {
      a.value = s(), await o.value.show() && c(a.value);
    }
    function d(h) {
      const p = l.value, m = p.find((_) => _ === h);
      m < 0 || (p.splice(m, 1), l.value = [...p]);
    }
    return (h, p) => {
      var y;
      const m = Te("b-modal"), _ = Jr("tt");
      return b(), E(ne, null, [
        u("div", U7, [
          u("button", {
            type: "button",
            class: "btn btn-primary btn-sm",
            onClick: f
          }, [
            j7,
            L(u("span", null, null, 512), [
              [_, void 0, "cdis_custom_auth_params_05"]
            ]),
            H7
          ])
        ]),
        ((y = l.value) == null ? void 0 : y.length) === 0 ? (b(), E("span", B7, "no params...")) : me("", !0),
        u("div", Y7, [
          (b(!0), E(ne, null, Ae(l.value, (g, v) => (b(), Ce(vm, {
            key: `${v}`,
            name: g.name,
            "onUpdate:name": (S) => g.name = S,
            value: g.value,
            "onUpdate:value": (S) => g.value = S,
            context: g.context,
            "onUpdate:context": (S) => g.context = S
          }, {
            default: K(() => [
              u("div", null, [
                u("button", {
                  type: "button",
                  class: "btn btn-sm btn-danger",
                  onClick: (S) => d(g)
                }, z7, 8, W7)
              ])
            ]),
            _: 2
          }, 1032, ["name", "onUpdate:name", "value", "onUpdate:value", "context", "onUpdate:context"]))), 128))
        ]),
        (b(), Ce(Ei, { to: "body" }, [
          T(m, {
            ref_key: "newParamModal",
            ref: o
          }, {
            header: K(() => [
              ve("New Authentication Parameter")
            ]),
            footer: K(({ hide: g }) => [
              u("div", K7, [
                u("button", {
                  class: "btn btn-sm btn-secondary",
                  type: "button",
                  onClick: (v) => g(!1)
                }, Z7, 8, J7),
                u("button", {
                  class: "btn btn-sm btn-primary",
                  type: "button",
                  onClick: (v) => g(!0),
                  disabled: !i.value
                }, n9, 8, q7)
              ])
            ]),
            default: K(() => [
              T(vm, {
                ref_key: "newAuthParamRef",
                ref: r,
                name: a.value.name,
                "onUpdate:name": p[0] || (p[0] = (g) => a.value.name = g),
                value: a.value.value,
                "onUpdate:value": p[1] || (p[1] = (g) => a.value.value = g),
                context: a.value.context,
                "onUpdate:context": p[2] || (p[2] = (g) => a.value.context = g)
              }, null, 8, ["name", "value", "context"])
            ]),
            _: 1
          }, 512)
        ]))
      ], 64);
    };
  }
}, o9 = { class: "input-group" }, r9 = ["type"], a9 = {
  __name: "SecretInput",
  props: {
    modelValue: { type: String, default: "" },
    showText: { type: String, default: "show" },
    hideText: { type: String, default: "hide" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = k({
      get: () => n.modelValue,
      set: (i) => t("update:modelValue", i)
    }), o = k(() => a.value === "password" ? n.showText : n.hideText), a = te("password");
    function r() {
      a.value === "password" ? a.value = "text" : a.value = "password";
    }
    return (i, l) => (b(), E("div", o9, [
      L(u("input", Dn({
        type: a.value,
        class: "form-control form-control-sm",
        autocomplete: "one-time-code",
        "onUpdate:modelValue": l[0] || (l[0] = (c) => s.value = c)
      }, { ...i.$attrs }), null, 16, r9), [
        [Df, s.value]
      ]),
      u("button", {
        type: "button",
        class: "btn btn-sm btn-outline-secondary",
        onClick: r
      }, j(o.value), 1)
    ]));
  }
}, i9 = /* @__PURE__ */ u("i", { class: "fas fa-circle-check fa-fw me-1 text-success" }, null, -1), l9 = /* @__PURE__ */ u("span", null, "Success", -1), c9 = { class: "d-flex gap-2" }, u9 = ["onClick"], d9 = /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1), f9 = /* @__PURE__ */ u("span", null, "Close", -1), h9 = [
  d9,
  f9
], p9 = /* @__PURE__ */ u("i", { class: "fas fa-copy fa-fw me-1" }, null, -1), m9 = /* @__PURE__ */ u("span", null, "Copy", -1), _9 = [
  p9,
  m9
], v9 = /* @__PURE__ */ u("p", null, " You may copy these URLs into their corresponding text boxes on this page. ", -1), g9 = { class: "d-block" }, y9 = /* @__PURE__ */ u("span", { class: "fw-bold me-2 text-nowrap" }, "Authorize URL:", -1), b9 = { class: "fst-italic text-break" }, w9 = { class: "d-block" }, E9 = /* @__PURE__ */ u("span", { class: "fw-bold me-2 text-nowrap" }, "Token URL:", -1), S9 = { class: "fst-italic text-break" }, x9 = {
  __name: "CapabilityStatementParser",
  emits: ["copy"],
  setup(e, { emit: t }) {
    const n = fr(), s = te(!1), o = te(), a = te(), r = te(), i = te();
    async function l(d) {
      var p, m, _, y, g, v, S;
      if (typeof d != "string")
        return;
      const h = (w) => w.replace(/\/+$/, "") + "";
      a.value = `${h(d)}/metadata`;
      try {
        s.value = !0;
        const w = await sh.get(a.value, {
          headers: { accept: "Application/JSON" }
        }), $ = (v = (g = (y = (_ = (m = (p = w == null ? void 0 : w.data) == null ? void 0 : p.rest) == null ? void 0 : m[0]) == null ? void 0 : _.security) == null ? void 0 : y.extension) == null ? void 0 : g[0]) == null ? void 0 : v.extension;
        r.value = null, i.value = null;
        for (const N of $)
          (N == null ? void 0 : N.url) === "authorize" ? r.value = N == null ? void 0 : N.valueUri : (N == null ? void 0 : N.url) === "token" && (i.value = N == null ? void 0 : N.valueUri);
        const C = [];
        return r.value || C.push("Could not find the autorize URL"), i.value || C.push("Could not find the token URL"), (C == null ? void 0 : C.length) === 0 ? (S = o.value) == null ? void 0 : S.show() : c(C.join(`
`));
      } catch (w) {
        c(w);
      } finally {
        s.value = !1;
      }
    }
    function c(d) {
      n.alert({
        title: "Error",
        body: `<pre>There was an error fetching the capability statement:
${d}</pre>`
      });
    }
    function f() {
      var d;
      t("copy", { authorizeURL: r.value, tokenURL: i.value }), (d = o.value) == null || d.hide();
    }
    return (d, h) => {
      const p = Te("b-modal");
      return b(), E("div", null, [
        we(d.$slots, "default", {
          parse: l,
          loading: s.value
        }),
        (b(), Ce(Ei, { to: "body" }, [
          T(p, {
            ref_key: "capabilityStatementModal",
            ref: o,
            size: "lg"
          }, {
            header: K(() => [
              i9,
              l9
            ]),
            footer: K(({ hide: m }) => [
              u("div", c9, [
                u("button", {
                  class: "btn btn-sm btn-secondary",
                  type: "button",
                  onClick: m
                }, h9, 8, u9),
                u("button", {
                  class: "btn btn-sm btn-primary",
                  type: "button",
                  onClick: f
                }, _9)
              ])
            ]),
            default: K(() => [
              u("div", null, [
                u("p", null, [
                  ve(" The FHIR URLs below for your Authorize endpoint and Token endpoint were found from the FHIR Capability Statement ("),
                  u("i", null, j(a.value), 1),
                  ve("). ")
                ]),
                v9,
                u("div", g9, [
                  y9,
                  u("span", b9, j(r.value), 1)
                ]),
                u("div", w9, [
                  E9,
                  u("span", S9, j(i.value), 1)
                ])
              ])
            ]),
            _: 1
          }, 512)
        ]))
      ]);
    };
  }
}, $9 = {
  __name: "CopyWrapper",
  setup(e) {
    const t = nu(), n = Ss();
    function s(o, a = !0, r = {}) {
      t.copy(o), a && n.toast({
        title: "Success",
        body: "Text was copied to the clipboard",
        ...r
      });
    }
    return (o, a) => we(o.$slots, "default", { copy: s });
  }
};
const C9 = (e) => (Ze("data-v-15926c14"), e = e(), qe(), e), O9 = { class: "container-fluid" }, k9 = { action: "" }, T9 = { class: "row d-none" }, N9 = { class: "col" }, D9 = ["for"], A9 = { class: "col" }, R9 = ["id"], I9 = { class: "row" }, P9 = { class: "col" }, M9 = ["for"], L9 = { class: "col" }, V9 = ["id"], F9 = { class: "text-muted" }, U9 = { class: "row" }, j9 = { class: "col" }, H9 = ["for"], B9 = { class: "col" }, Y9 = { class: "input-group" }, W9 = ["id", "value"], G9 = ["onClick"], z9 = /* @__PURE__ */ C9(() => /* @__PURE__ */ u("i", { class: "fas fa-copy fa-fw" }, null, -1)), K9 = [
  z9
], J9 = { class: "text-muted" }, X9 = { class: "row" }, Q9 = { class: "col" }, Z9 = { class: "subsection-title" }, q9 = { class: "d-block" }, eY = { class: "d-block" }, tY = { class: "col" }, nY = { class: "col" }, sY = ["for"], oY = { class: "col" }, rY = ["id"], aY = { class: "col" }, iY = ["for"], lY = { class: "col" }, cY = { class: "row" }, uY = { class: "col" }, dY = { class: "subsection-title" }, fY = { class: "d-block" }, hY = { class: "d-block" }, pY = { class: "d-block text-muted" }, mY = { class: "row ms-5 grid-auto-1fr" }, _Y = ["for"], vY = ["id"], gY = { class: "text-muted" }, yY = ["onClick", "disabled"], bY = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-1"
}, wY = {
  key: 1,
  class: "fas fa-magnifying-glass fa-fw me-1"
}, EY = ["for"], SY = ["id"], xY = ["for"], $Y = ["id"], CY = { class: "row" }, OY = { class: "col" }, kY = ["for"], TY = { class: "d-block" }, NY = { class: "col" }, DY = ["id"], AY = { class: "text-muted" }, RY = { class: "d-block" }, IY = { class: "d-block" }, PY = { class: "row" }, MY = { class: "col" }, LY = ["for"], VY = { class: "d-block" }, FY = { class: "col" }, UY = ["id"], jY = { class: "text-muted" }, HY = { class: "d-block" }, BY = { class: "text-primary" }, YY = { class: "d-block" }, WY = { class: "row" }, GY = { class: "subsection-title" }, zY = { class: "subsection-description" }, KY = {
  __name: "FhirSettingsForm",
  props: {
    data: { type: Object, default: () => ({}) },
    redirectUrl: { type: String, default: () => "" }
  },
  emits: ["update:data"],
  setup(e, { emit: t }) {
    const n = e, s = te(WD()), o = k({
      get: () => n.data,
      set: (r) => t("update:data", r)
    });
    function a({ authorizeURL: r, tokenURL: i }) {
      o.value.fhir_authorize_url = r, o.value.fhir_token_url = i;
    }
    return (r, i) => {
      const l = Jr("tt");
      return b(), E("div", null, [
        u("section", O9, [
          u("form", k9, [
            u("div", T9, [
              u("div", N9, [
                u("label", {
                  for: `${s.value}-order`
                }, "order", 8, D9)
              ]),
              u("div", A9, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-order`,
                  "onUpdate:modelValue": i[0] || (i[0] = (c) => o.value.order = c)
                }, null, 8, R9), [
                  [Ke, o.value.order]
                ])
              ])
            ]),
            u("div", I9, [
              u("div", P9, [
                L((b(), E("label", {
                  for: `${s.value}-input-ehr_name`
                }, [
                  ve("ehr_name")
                ], 8, M9)), [
                  [l, void 0, "ws_214"]
                ]),
                L(u("p", null, null, 512), [
                  [l, void 0, "ws_235"]
                ])
              ]),
              u("div", L9, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-ehr_name`,
                  "onUpdate:modelValue": i[1] || (i[1] = (c) => o.value.ehr_name = c)
                }, null, 8, V9), [
                  [Ke, o.value.ehr_name]
                ]),
                u("small", F9, [
                  L(u("span", null, null, 512), [
                    [l, void 0, "control_center_4881"]
                  ])
                ])
              ])
            ]),
            u("div", U9, [
              u("div", j9, [
                L((b(), E("label", {
                  for: `${s.value}-input-redirect-url`
                }, [
                  ve("redirect URL")
                ], 8, H9)), [
                  [l, void 0, "ws_237"]
                ]),
                L(u("p", null, null, 512), [
                  [l, void 0, "ws_238"]
                ])
              ]),
              u("div", B9, [
                u("div", Y9, [
                  u("input", {
                    type: "text",
                    class: "form-control form-control-sm",
                    id: `${s.value}-input-redirect-url`,
                    value: e.redirectUrl,
                    disabled: ""
                  }, null, 8, W9),
                  T($9, null, {
                    default: K(({ copy: c }) => [
                      u("button", {
                        type: "button",
                        class: "btn btn-sm btn-outline-secondary",
                        onClick: kt((f) => c(e.redirectUrl), ["prevent"])
                      }, K9, 8, G9)
                    ]),
                    _: 1
                  })
                ]),
                u("small", J9, [
                  L(u("span", null, null, 512), [
                    [l, void 0, "ws_239"]
                  ])
                ])
              ])
            ]),
            u("div", X9, [
              u("div", Q9, [
                u("div", Z9, [
                  L(u("span", q9, null, 512), [
                    [l, void 0, "ws_219"]
                  ])
                ]),
                L(u("span", eY, null, 512), [
                  [l, void 0, "ws_220"]
                ])
              ]),
              u("div", tY, [
                u("div", nY, [
                  L((b(), E("label", {
                    for: `${s.value}-input-client_id`
                  }, [
                    ve("client_id")
                  ], 8, sY)), [
                    [l, void 0, "ws_221"]
                  ])
                ]),
                u("div", oY, [
                  L(u("input", {
                    type: "text",
                    class: "form-control form-control-sm",
                    id: `${s.value}-input-client_id`,
                    autocomplete: "one-time-code",
                    "onUpdate:modelValue": i[2] || (i[2] = (c) => o.value.client_id = c)
                  }, null, 8, rY), [
                    [Ke, o.value.client_id]
                  ])
                ]),
                u("div", aY, [
                  L((b(), E("label", {
                    for: `${s.value}-client_secret`
                  }, [
                    ve("client_secret")
                  ], 8, iY)), [
                    [l, void 0, "ws_222"]
                  ])
                ]),
                u("div", lY, [
                  T(a9, {
                    id: `${s.value}-client_secret`,
                    modelValue: o.value.client_secret,
                    "onUpdate:modelValue": i[3] || (i[3] = (c) => o.value.client_secret = c),
                    "show-text": G(Gd)("ws_223")
                  }, null, 8, ["id", "modelValue", "show-text"])
                ])
              ])
            ]),
            u("div", cY, [
              u("div", uY, [
                u("div", dY, [
                  L(u("span", fY, null, 512), [
                    [l, void 0, "ws_224"]
                  ])
                ]),
                L(u("span", hY, null, 512), [
                  [l, void 0, "ws_225"]
                ]),
                u("small", pY, [
                  L(u("span", null, null, 512), [
                    [l, void 0, "ws_260"]
                  ])
                ])
              ])
            ]),
            u("div", mY, [
              u("div", null, [
                L((b(), E("label", {
                  for: `${s.value}-input-fhir_base_url`
                }, [
                  ve("fhir_base_url")
                ], 8, _Y)), [
                  [l, void 0, "ws_228"]
                ])
              ]),
              u("div", null, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-fhir_base_url`,
                  "onUpdate:modelValue": i[4] || (i[4] = (c) => o.value.fhir_base_url = c)
                }, null, 8, vY), [
                  [Ke, o.value.fhir_base_url]
                ]),
                u("small", gY, [
                  L(u("span", null, null, 512), [
                    [l, void 0, "ws_229"]
                  ])
                ]),
                T(x9, { onCopy: a }, {
                  default: K(({ parse: c, loading: f }) => [
                    u("button", {
                      type: "button",
                      class: "btn btn-sm btn-primary mt-2",
                      onClick: (d) => c(o.value.fhir_base_url),
                      disabled: f || !o.value.fhir_base_url
                    }, [
                      f ? (b(), E("i", bY)) : (b(), E("i", wY)),
                      L(u("span", null, null, 512), [
                        [l, void 0, "ws_231"]
                      ])
                    ], 8, yY)
                  ]),
                  _: 1
                })
              ]),
              u("div", null, [
                L((b(), E("label", {
                  for: `${s.value}-input-fhir_token_url`
                }, [
                  ve("fhir_token_url")
                ], 8, EY)), [
                  [l, void 0, "ws_226"]
                ])
              ]),
              u("div", null, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-fhir_token_url`,
                  "onUpdate:modelValue": i[5] || (i[5] = (c) => o.value.fhir_token_url = c)
                }, null, 8, SY), [
                  [Ke, o.value.fhir_token_url]
                ])
              ]),
              u("div", null, [
                L((b(), E("label", {
                  for: `${s.value}-input-fhir_authorize_url`
                }, [
                  ve("fhir_authorize_url")
                ], 8, xY)), [
                  [l, void 0, "ws_227"]
                ])
              ]),
              u("div", null, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-fhir_authorize_url`,
                  "onUpdate:modelValue": i[6] || (i[6] = (c) => o.value.fhir_authorize_url = c)
                }, null, 8, $Y), [
                  [Ke, o.value.fhir_authorize_url]
                ])
              ])
            ]),
            u("div", CY, [
              u("div", OY, [
                L((b(), E("label", {
                  for: `${s.value}-input-fhir_identity_provider`
                }, [
                  ve("fhir_identity_provider")
                ], 8, kY)), [
                  [l, void 0, "fhir_identity_provider_title"]
                ]),
                L(u("span", TY, null, 512), [
                  [l, void 0, "fhir_identity_provider_subtitle"]
                ])
              ]),
              u("div", NY, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-fhir_identity_provider`,
                  "onUpdate:modelValue": i[7] || (i[7] = (c) => o.value.fhir_identity_provider = c)
                }, null, 8, DY), [
                  [Ke, o.value.fhir_identity_provider]
                ]),
                u("small", AY, [
                  L(u("span", RY, null, 512), [
                    [l, void 0, "fhir_identity_provider_description"]
                  ]),
                  L(u("span", IY, null, 512), [
                    [l, void 0, "fhir_identity_provider_description2"]
                  ])
                ])
              ])
            ]),
            u("div", PY, [
              u("div", MY, [
                L((b(), E("label", {
                  for: `${s.value}-input-patient_identifier_string`
                }, [
                  ve("patient_identifier_string")
                ], 8, LY)), [
                  [l, void 0, "ws_217"]
                ]),
                L(u("span", VY, null, 512), [
                  [l, void 0, "ws_218"]
                ])
              ]),
              u("div", FY, [
                L(u("input", {
                  type: "text",
                  class: "form-control form-control-sm",
                  id: `${s.value}-input-patient_identifier_string`,
                  "onUpdate:modelValue": i[8] || (i[8] = (c) => o.value.patient_identifier_string = c)
                }, null, 8, UY), [
                  [Ke, o.value.patient_identifier_string]
                ]),
                u("small", jY, [
                  L(u("span", HY, null, 512), [
                    [l, void 0, "control_center_4882"]
                  ])
                ]),
                u("small", BY, [
                  L(u("span", YY, null, 512), [
                    [l, void 0, "control_center_4883"]
                  ])
                ])
              ])
            ]),
            u("div", WY, [
              u("div", GY, [
                L(u("span", null, null, 512), [
                  [l, void 0, "cdis_custom_auth_params_01"]
                ])
              ]),
              u("div", zY, [
                L(u("span", null, null, 512), [
                  [l, void 0, "cdis_custom_auth_params_02"]
                ]),
                L(u("span", null, null, 512), [
                  [l, void 0, "cdis_custom_auth_params_04"]
                ])
              ]),
              T(s9, {
                modelValue: o.value.fhir_custom_auth_params,
                "onUpdate:modelValue": i[9] || (i[9] = (c) => o.value.fhir_custom_auth_params = c)
              }, null, 8, ["modelValue"])
            ])
          ])
        ])
      ]);
    };
  }
}, gm = /* @__PURE__ */ Se(KY, [["__scopeId", "data-v-15926c14"]]);
class JY {
  constructor() {
    this.events = {};
  }
  on(t, n) {
    this.events[t] || (this.events[t] = []), this.events[t].push(n);
  }
  off(t, n) {
    this.events[t] && (this.events[t] = this.events[t].filter((s) => s !== n));
  }
  emit(t, ...n) {
    this.events[t] && this.events[t].forEach((s) => s(...n));
  }
}
const Oy = ({ multiple: e = !1 } = {}) => {
  const t = new JY();
  function n(r) {
    return new Promise((l, c) => {
      r || c();
      var f = new FileReader();
      f.onload = (d) => {
        var h = d.target.result;
        l(h);
      }, f.readAsText(r);
    });
  }
  async function s(r) {
    const i = r.target, l = (i == null ? void 0 : i.files) ?? [];
    if (l.length === 0)
      return;
    const c = [];
    for (const f of l) {
      const d = await n(f);
      c.push(d);
    }
    t.emit("files-read", c);
  }
  const o = () => {
    const r = document.createElement("input");
    return r.setAttribute("type", "file"), e && r.setAttribute("multiple", !0), r.style.display = "none", r.addEventListener("change", s), document.body.appendChild(r), r;
  };
  let a = null;
  return {
    async select() {
      return new Promise((i, l) => {
        const c = (f) => {
          i(f), t.off("files-read", c), document.body.removeChild(a), a = null;
        };
        a || (a = o()), a.click(), t.on("files-read", c);
      });
    }
  };
};
const nn = (e) => (Ze("data-v-aeda55bc"), e = e(), qe(), e), XY = { class: "p-2" }, QY = /* @__PURE__ */ Cf("<p data-v-aeda55bc> This interface enables the connection of REDCap with multiple FHIR (Fast Healthcare Interoperability Resources) systems. FHIR is a standard for electronic healthcare information exchange, while SMART on FHIR provides specifications for integrating apps with Electronic Health Records using FHIR standards and OAuth2 security. </p><h6 data-v-aeda55bc>Using This Page:</h6><ol data-v-aeda55bc><li data-v-aeda55bc><strong data-v-aeda55bc>Navigation Tabs:</strong> Each tab corresponds to a different FHIR system. Select a tab to view or edit its settings. </li><li data-v-aeda55bc><strong data-v-aeda55bc>FHIR System Settings:</strong> In each tab, fill in the necessary information for connecting to a FHIR system. </li><li data-v-aeda55bc><strong data-v-aeda55bc>Adding a New FHIR System:</strong> Click the button next to the navigation tabs to add a new system. A new tab will appear for entering the new system&#39;s settings. </li><li data-v-aeda55bc><strong data-v-aeda55bc>Reorder the FHIR Systems:</strong> Drag and drop a tab to change the order of the FHIR systems. After changing the order, click the save icon to persist the change. The first one will be used as the default for projects where a specific FHIR system is not selected. </li></ol>", 3), ZY = { class: "d-flex gap-2" }, qY = { class: "dropdown" }, eW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("button", {
  class: "btn btn-secondary dropdown-toggle",
  type: "button",
  id: "dropdownMenuButton1",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, [
  /* @__PURE__ */ u("i", { class: "fas fa-cog fa-fw" })
], -1)), tW = { class: "dropdown-menu" }, nW = ["onClick"], sW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-file-import fa-fw me-1" }, null, -1)), oW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Import", -1)), rW = [
  sW,
  oW
], aW = ["onClick"], iW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-file-export fa-fw me-1" }, null, -1)), lW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Export", -1)), cW = [
  iW,
  lW
], uW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw me-1" }, null, -1)), dW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Delete", -1)), fW = [
  uW,
  dW
], hW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-plus fa-fw me-1" }, null, -1)), pW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Add", -1)), mW = [
  hW,
  pW
], _W = { class: "p-2 border-top" }, vW = { class: "d-flex justify-content-end mt-2" }, gW = {
  key: 0,
  class: "btn btn-sm btn-primary",
  disabled: ""
}, yW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-spinner fa-spin fa-fw me-1" }, null, -1)), bW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Loading...", -1)), wW = [
  yW,
  bW
], EW = ["disabled"], SW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-save fa-fw me-1" }, null, -1)), xW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Save", -1)), $W = [
  SW,
  xW
], CW = { class: "d-flex justify-content-end gap-2" }, OW = ["onClick"], kW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1)), TW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Cancel", -1)), NW = [
  kW,
  TW
], DW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("i", { class: "fas fa-save fa-fw me-1" }, null, -1)), AW = /* @__PURE__ */ nn(() => /* @__PURE__ */ u("span", null, "Save", -1)), RW = [
  DW,
  AW
], IW = {
  __name: "FhirSystemsPage",
  setup(e) {
    const t = fy(), n = Bi(), s = mh(), o = fr(), a = Ss(), r = Oy(), i = k(() => t.loading), l = k(() => s.redirectURL), c = k(() => t.form), f = k(() => n.savePending), d = k(() => t.current), h = k({
      get: () => t.list,
      set: (N) => t.list = N
    }), p = te(), m = te({});
    async function _(N, A) {
      t.setCurrent(N);
    }
    async function y() {
      try {
        const N = await t.save();
        await n.loadSettings(), a.toast({ title: "Success", body: "Settings saved" });
      } catch (N) {
        const A = Gs(N);
        a.toast({ title: "Error", body: A });
      }
    }
    function g() {
      var N;
      m.value = t.makeNewSystem(), (N = p.value) == null || N.show();
    }
    async function v() {
      var N;
      try {
        const A = await t.add(m.value);
        a.toast({ title: "Success", body: "New FHIR system created" }), await n.loadSettings();
      } catch (A) {
        const D = Gs(A);
        a.toast({ title: "Error", body: D });
      } finally {
        (N = p.value) == null || N.hide();
      }
    }
    async function S() {
      if (!await o.confirm({
        title: "Confirm delete",
        body: "Are you sure you want to delete this element?"
      }))
        return;
      const A = d.value, D = A == null ? void 0 : A.ehr_id;
      D < 0 ? t.remove(A) : (await t.delete(D), await n.loadSettings()), a.toast({
        title: "Success",
        body: "The settings were removed successfully."
      });
    }
    async function w() {
      const N = await r.select();
      $(N);
    }
    function $(N) {
      var D;
      if ((N == null ? void 0 : N.length) < 1) {
        console.error("no files selected");
        return;
      }
      const A = N == null ? void 0 : N[0];
      try {
        const F = JSON.parse(A);
        m.value = F, (D = p.value) == null || D.show(), a.toast({
          title: "Import Successful",
          body: "The file was imported. Please review the data before saving."
        });
      } catch (F) {
        a.toast({
          title: "Import Error",
          body: "There was an error importing the file. Please make sure to select a valid JSON file."
        }), console.error(F);
      }
    }
    function C() {
      const N = t.current;
      if (!N)
        return;
      const A = JSON.stringify(N), D = `${N.ehr_name}.json`;
      su(A, {
        fileName: D
      }), a.toast({
        title: "Export Successful",
        body: `The setttings have been exported as '${D}'.`
      });
    }
    return wi(() => {
    }), (N, A) => {
      const D = Te("b-modal");
      return b(), E(ne, null, [
        u("div", XY, [
          QY,
          u("div", ZY, [
            u("div", qY, [
              eW,
              u("ul", tW, [
                u("li", null, [
                  u("a", {
                    class: "dropdown-item",
                    href: "#",
                    onClick: kt(w, ["prevent"])
                  }, rW, 8, nW)
                ]),
                u("li", null, [
                  u("a", {
                    class: "dropdown-item",
                    href: "#",
                    onClick: kt(C, ["prevent"])
                  }, cW, 8, aW)
                ])
              ])
            ]),
            u("div", { class: "ms-auto d-flex gap-2" }, [
              u("button", {
                type: "button",
                class: "btn btn-sm btn-danger",
                onClick: S
              }, fW)
            ]),
            u("button", {
              type: "button",
              class: "btn btn-sm btn-success",
              onClick: g
            }, mW)
          ])
        ]),
        u("div", null, [
          T(R7, {
            elements: h.value,
            "onUpdate:elements": A[0] || (A[0] = (F) => h.value = F),
            active: d.value,
            "save-pending": f.value,
            loading: i.value,
            onSystemSelected: _
          }, null, 8, ["elements", "active", "save-pending", "loading"]),
          u("div", _W, [
            T(gm, {
              data: c.value,
              "onUpdate:data": A[1] || (A[1] = (F) => c.value = F),
              "redirect-url": l.value
            }, null, 8, ["data", "redirect-url"]),
            u("div", vW, [
              i.value ? (b(), E("button", gW, wW)) : (b(), E("button", {
                key: 1,
                class: "btn btn-sm btn-primary",
                onClick: y,
                disabled: !f.value
              }, $W, 8, EW))
            ])
          ])
        ]),
        T(D, {
          ref_key: "newSystemModal",
          ref: p,
          size: "xl"
        }, {
          header: K(() => [
            ve("New FHIR System")
          ]),
          footer: K(({ hide: F }) => [
            u("div", CW, [
              u("button", {
                class: "btn btn-sm btn-secondary",
                type: "button",
                onClick: F
              }, NW, 8, OW),
              u("button", {
                class: "btn btn-sm btn-primary",
                type: "button",
                onClick: v
              }, RW)
            ])
          ]),
          default: K(() => [
            T(gm, {
              data: m.value,
              "onUpdate:data": A[2] || (A[2] = (F) => m.value = F),
              "redirect-url": l.value
            }, null, 8, ["data", "redirect-url"])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
}, PW = /* @__PURE__ */ Se(IW, [["__scopeId", "data-v-aeda55bc"]]);
const to = (e) => (Ze("data-v-b525c7f8"), e = e(), qe(), e), MW = { class: "table table-bordered table-hover table-striped" }, LW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "field", -1)), VW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "label", -1)), FW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "description", -1)), UW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "category", -1)), jW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "subcategory", -1)), HW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "temporal", -1)), BW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "identifier", -1)), YW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "disabled", -1)), WW = /* @__PURE__ */ to(() => /* @__PURE__ */ u("th", null, "disabled_reason", -1)), GW = ["onMouseenter", "onMouseleave", "onMouseover"], zW = { class: "text-center" }, KW = { class: "text-center" }, JW = { class: "text-center" }, XW = { class: "ellipsis" }, QW = {
  __name: "CustomMappingTable",
  props: {
    items: { type: Array, default: () => [] }
  },
  emits: ["mouseenter-row", "mouseleave-row", "mouseover-row"],
  setup(e, { emit: t }) {
    const n = {
      props: {
        value: { type: Boolean, default: !1 }
      },
      setup(r, { slots: i }) {
        return () => Ms("i", {
          class: `fa-regular fa-fw ${(r == null ? void 0 : r.value) === !0 ? "fa-square-check" : "fa-square"}`,
          innerHTML: ""
        });
      }
    };
    function s(r, i, l) {
      t("mouseover-row", { event: r, item: i, index: l });
    }
    function o(r, i, l) {
      t("mouseenter-row", { event: r, item: i, index: l });
    }
    function a(r, i, l) {
      t("mouseleave-row", { event: r, item: i, index: l });
    }
    return (r, i) => (b(), E("div", null, [
      we(r.$slots, "before-table", {}, void 0, !0),
      u("table", MW, [
        u("thead", null, [
          u("tr", null, [
            LW,
            VW,
            FW,
            UW,
            jW,
            HW,
            BW,
            YW,
            WW,
            we(r.$slots, "after-header-cell", { items: e.items }, void 0, !0)
          ])
        ]),
        u("tbody", null, [
          (b(!0), E(ne, null, Ae(e.items, (l, c) => (b(), E("tr", {
            key: l == null ? void 0 : l.field,
            class: "position-relative",
            onMouseenter: (f) => o(f, l, c),
            onMouseleave: (f) => a(f, l, c),
            onMouseover: (f) => s(f, l, c)
          }, [
            u("td", null, j(l == null ? void 0 : l.field), 1),
            u("td", null, j(l == null ? void 0 : l.label), 1),
            u("td", null, j(l == null ? void 0 : l.description), 1),
            u("td", null, j(l == null ? void 0 : l.category), 1),
            u("td", null, j(l == null ? void 0 : l.subcategory), 1),
            u("td", zW, [
              T(n, {
                value: l == null ? void 0 : l.temporal
              }, null, 8, ["value"])
            ]),
            u("td", KW, [
              T(n, {
                value: l == null ? void 0 : l.identifier
              }, null, 8, ["value"])
            ]),
            u("td", JW, [
              T(n, {
                value: l == null ? void 0 : l.disabled
              }, null, 8, ["value"])
            ]),
            u("td", null, [
              u("div", XW, j(l == null ? void 0 : l.disabled_reason), 1)
            ])
          ], 40, GW))), 128))
        ])
      ]),
      we(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}, ZW = /* @__PURE__ */ Se(QW, [["__scopeId", "data-v-b525c7f8"]]);
const Cs = (e) => (Ze("data-v-16d81fb4"), e = e(), qe(), e), qW = { action: "" }, eG = { class: "mb-3" }, tG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "input-field"
}, "field", -1)), nG = { class: "mb-3" }, sG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "input-label"
}, "label", -1)), oG = { class: "mb-3" }, rG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "input-description"
}, "description", -1)), aG = { class: "mb-3" }, iG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "select-category"
}, "category", -1)), lG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("option", {
  value: "",
  disabled: ""
}, "Select a CDIS category...", -1)), cG = ["value"], uG = { class: "mb-3" }, dG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "input-subcategory"
}, "subcategory", -1)), fG = { class: "mb-3" }, hG = { class: "d-flex gap-2" }, pG = { class: "form-check" }, mG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "input-temporal"
}, "temporal", -1)), _G = { class: "form-check" }, vG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "input-identifier"
}, "identifier", -1)), gG = { class: "form-check" }, yG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-check-label",
  for: "input-disabled"
}, "disabled", -1)), bG = { class: "mb-3" }, wG = /* @__PURE__ */ Cs(() => /* @__PURE__ */ u("label", {
  class: "form-label",
  for: "input-disabled_reason"
}, "disabled reason", -1)), EG = ["disabled", "placeholder"], SG = {
  __name: "CustomMappingForm",
  props: {
    data: { type: Object, default: () => ({}) },
    errors: { type: Object, default: () => ({}) },
    validCategories: { type: Array, default: () => [] }
  },
  emits: ["update:data"],
  setup(e, { emit: t }) {
    const n = e, s = k({
      get: () => n.data,
      set: (o) => t("update:data", o)
    });
    return (o, a) => {
      var r, i, l, c, f, d, h, p;
      return b(), E("form", qW, [
        u("div", eG, [
          tG,
          L(u("input", {
            class: "form-control form-control-sm",
            type: "text",
            "onUpdate:modelValue": a[0] || (a[0] = (m) => s.value.field = m),
            id: "input-field",
            required: "",
            placeholder: "Unique identifier..."
          }, null, 512), [
            [Ke, s.value.field]
          ]),
          T(ls, {
            errors: (r = e.errors) == null ? void 0 : r.field
          }, null, 8, ["errors"])
        ]),
        u("div", nG, [
          sG,
          L(u("input", {
            class: "form-control form-control-sm",
            type: "text",
            "onUpdate:modelValue": a[1] || (a[1] = (m) => s.value.label = m),
            id: "input-label",
            placeholder: "Short name..."
          }, null, 512), [
            [Ke, s.value.label]
          ]),
          T(ls, {
            errors: (i = e.errors) == null ? void 0 : i.label
          }, null, 8, ["errors"])
        ]),
        u("div", oG, [
          rG,
          L(u("input", {
            class: "form-control form-control-sm",
            type: "text",
            "onUpdate:modelValue": a[2] || (a[2] = (m) => s.value.description = m),
            id: "input-description",
            placeholder: "Fully-specified name..."
          }, null, 512), [
            [Ke, s.value.description]
          ]),
          T(ls, {
            errors: (l = e.errors) == null ? void 0 : l.description
          }, null, 8, ["errors"])
        ]),
        u("div", aG, [
          iG,
          L(u("select", {
            id: "select-category",
            class: "form-select form-select-sm",
            "onUpdate:modelValue": a[3] || (a[3] = (m) => s.value.category = m)
          }, [
            lG,
            (b(!0), E(ne, null, Ae(e.validCategories, (m, _) => (b(), E("option", {
              key: _,
              value: m
            }, j(m), 9, cG))), 128))
          ], 512), [
            [vn, s.value.category]
          ]),
          T(ls, {
            errors: (c = e.errors) == null ? void 0 : c.category
          }, null, 8, ["errors"])
        ]),
        u("div", uG, [
          dG,
          L(u("input", {
            class: "form-control form-control-sm",
            type: "text",
            "onUpdate:modelValue": a[4] || (a[4] = (m) => s.value.subcategory = m),
            id: "input-subcategory",
            placeholder: "CDIS sub-category..."
          }, null, 512), [
            [Ke, s.value.subcategory]
          ]),
          T(ls, {
            errors: (f = e.errors) == null ? void 0 : f.subcategory
          }, null, 8, ["errors"])
        ]),
        u("div", fG, [
          u("div", hG, [
            u("div", pG, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                "onUpdate:modelValue": a[5] || (a[5] = (m) => s.value.temporal = m),
                id: "input-temporal"
              }, null, 512), [
                [Wt, s.value.temporal]
              ]),
              mG
            ]),
            u("div", _G, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                "onUpdate:modelValue": a[6] || (a[6] = (m) => s.value.identifier = m),
                id: "input-identifier"
              }, null, 512), [
                [Wt, s.value.identifier]
              ]),
              vG
            ]),
            u("div", gG, [
              L(u("input", {
                class: "form-check-input",
                type: "checkbox",
                "onUpdate:modelValue": a[7] || (a[7] = (m) => s.value.disabled = m),
                id: "input-disabled"
              }, null, 512), [
                [Wt, s.value.disabled]
              ]),
              yG
            ])
          ]),
          T(ls, {
            errors: (d = e.errors) == null ? void 0 : d.temporal
          }, null, 8, ["errors"]),
          T(ls, {
            errors: (h = e.errors) == null ? void 0 : h.identifier
          }, null, 8, ["errors"]),
          T(ls, {
            errors: (p = e.errors) == null ? void 0 : p.disabled
          }, null, 8, ["errors"])
        ]),
        u("div", bG, [
          wG,
          L(u("textarea", {
            class: "form-control form-control-sm",
            rows: "3",
            "onUpdate:modelValue": a[8] || (a[8] = (m) => s.value.disabled_reason = m),
            id: "input-disabled_reason",
            disabled: !s.value.disabled,
            placeholder: `${s.value.disabled ? "Explain why this field is disabled..." : ""}`
          }, null, 8, EG), [
            [Ke, s.value.disabled_reason]
          ])
        ])
      ]);
    };
  }
}, xG = /* @__PURE__ */ Se(SG, [["__scopeId", "data-v-16d81fb4"]]);
const ky = (e) => (Ze("data-v-1148ff93"), e = e(), qe(), e), $G = {
  "data-menu": "",
  class: ""
}, CG = /* @__PURE__ */ ky(() => /* @__PURE__ */ u("i", { class: "fas fa-pencil fa-fw" }, null, -1)), OG = [
  CG
], kG = /* @__PURE__ */ ky(() => /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1)), TG = [
  kG
], NG = {
  __name: "ItemMenu",
  props: {
    visible: { type: Boolean, default: !1 }
  },
  emits: ["edit", "remove"],
  setup(e, { emit: t }) {
    function n() {
      t("remove");
    }
    function s(o) {
      t("edit");
    }
    return (o, a) => (b(), E("div", $G, [
      u("div", { class: "d-flex gap-2" }, [
        u("button", {
          class: "btn btn-sm btn-light",
          onClick: s
        }, OG),
        u("button", {
          class: "btn btn-sm btn-light",
          onClick: n
        }, TG)
      ])
    ]));
  }
}, DG = /* @__PURE__ */ Se(NG, [["__scopeId", "data-v-1148ff93"]]);
const pn = (e) => (Ze("data-v-dde9dd78"), e = e(), qe(), e), AG = { class: "p-2" }, RG = { class: "d-flex gap-2 my-2" }, IG = { class: "dropdown" }, PG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("button", {
  class: "btn btn-sm btn-secondary dropdown-toggle",
  type: "button",
  id: "dropdownMenuButton1",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
}, [
  /* @__PURE__ */ u("i", { class: "fas fa-cog fa-fw" })
], -1)), MG = { class: "dropdown-menu" }, LG = ["onClick"], VG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-file-import fa-fw me-1" }, null, -1)), FG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Import", -1)), UG = [
  VG,
  FG
], jG = ["onClick"], HG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-file-export fa-fw me-1" }, null, -1)), BG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Export", -1)), YG = [
  HG,
  BG
], WG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-download fa-fw me-1" }, null, -1)), GG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "CSV Template", -1)), zG = [
  WG,
  GG
], KG = { class: "ms-auto" }, JG = ["disabled"], XG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-plus fa-fw" }, null, -1)), QG = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Add", -1)), ZG = [
  XG,
  QG
], qG = {
  "data-menu": "",
  class: "position-absolute top-50 translate-middle-y end-0 me-2"
}, ez = { class: "d-flex gap-2" }, tz = ["onClick"], nz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-pencil fa-fw" }, null, -1)), sz = [
  nz
], oz = ["onClick"], rz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-trash fa-fw" }, null, -1)), az = [
  rz
], iz = { class: "d-flex gap-2 justify-content-end" }, lz = ["disabled"], cz = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw me-2"
}, uz = {
  key: 1,
  class: "fas fa-save fa-fw me-2"
}, dz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Save", -1)), fz = { class: "d-flex gap-2 p-2" }, hz = ["onClick"], pz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-times fa-fw me-1" }, null, -1)), mz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Cancel", -1)), _z = [
  pz,
  mz
], vz = ["disabled"], gz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("i", { class: "fas fa-check fa-fw me-1" }, null, -1)), yz = /* @__PURE__ */ pn(() => /* @__PURE__ */ u("span", null, "Accept", -1)), bz = [
  gz,
  yz
], wz = {
  __name: "CustomMappingsPage",
  setup(e) {
    const t = hy(), n = fr(), s = Ss(), o = Oy(), a = h6(), r = Object.freeze({
      CREATE: "create",
      EDIT: "edit"
    }), i = te(""), l = te(), c = te(), f = te({}), d = te(), h = te(), p = k(() => {
      let I = "untitled";
      switch (i.value) {
        case r.CREATE:
          I = "New Item";
          break;
        case r.EDIT:
          I = "Edit Item";
          break;
        default:
          I = "untitled";
          break;
      }
      return I;
    }), m = k({
      get: () => t.list,
      set: (I) => t.list = I
    }), _ = k(() => t.loading), y = k(() => t.isDirty), g = k(() => t.validCategories), v = te();
    function S({ event: I, item: V, index: q }) {
      v.value = V, I.target.querySelector("td:last-child").appendChild(h.value), h.value.style.position = "absolute", h.value.style.pointerEvents = "all", h.value.style.opacity = 1, h.value.style.right = 0, h.value.style.top = "50%", h.value.style.transform = "translateY(-50%)";
    }
    function w({ event: I, item: V, index: q }) {
      v.value = null;
    }
    function $() {
      c.value = null, i.value = r.CREATE, f.value = t.useDefaultEntry(), l.value.show();
    }
    function C() {
      const I = (z, re) => Array.from({ length: re - z + 1 }, (Be, pt) => pt + z), V = (z = 1) => {
        var pt, et;
        const re = ((pt = g.value) == null ? void 0 : pt.length) ?? 1;
        return {
          field: `example-${z}`,
          label: `Label ${z}`,
          description: `Description ${z}`,
          category: ((et = g.value) == null ? void 0 : et[z % re]) ?? "",
          subcategory: "",
          temporal: !0,
          identifier: !1,
          disabled: !1
        };
      }, q = "custom mappings template.csv", Y = I(0, 2).map((z) => V(z));
      Yd(Y, q, a);
    }
    function N() {
      c.value = v.value, i.value = r.EDIT, f.value = { ...v.value }, l.value.show();
    }
    async function A() {
      const I = v.value;
      await n.confirm({
        title: "Confirm delete",
        body: "Are you sure you want to delete this element?"
      }) && t.remove(I);
    }
    function D() {
      const I = rm(f.value);
      switch (i.value) {
        case r.CREATE:
          t.add(I);
          break;
        case r.EDIT:
          t.edit(c.value, I);
          break;
      }
      l.value.hide(), c.value = null, f.value = {};
    }
    async function F() {
      await t.save();
    }
    async function H() {
      try {
        const I = await o.select();
        if ((I == null ? void 0 : I.length) < 1)
          return;
        let V = VL(I == null ? void 0 : I[0]);
        if (!Array.isArray(V)) {
          const z = "invalid format";
          throw new Error(z);
        }
        V = V.map((z) => m6(rm(z)));
        const q = [];
        t.list = [];
        for (const z of V) {
          const re = t.validate(z);
          re.hasErrors() ? q.push(re.errors()) : t.add(z);
        }
        const Y = q == null ? void 0 : q.length;
        if (Y > 0) {
          const z = `${Y} validation error${Y === 1 ? " was" : "s were"} found. Please review your data.`;
          throw new Error(z);
        }
        s.toast({
          title: "Import Successful",
          body: "The file was imported. Please review the data before saving."
        });
      } catch (I) {
        console.log(I), s.toast({
          title: "Import Error",
          body: "There was an error importing the file. Please make sure to select a valid CSV file."
        });
      }
    }
    function P() {
      const I = m.value, V = "custom mappings.csv";
      Yd(I, V, a), s.toast({
        title: "Export Successful",
        body: `The setttings have been exported as '${V}'.`
      });
    }
    return tn(() => {
      d.value = t.validate(f.value);
    }), (I, V) => {
      const q = Te("b-modal"), Y = Jr("tt");
      return b(), E("div", AG, [
        u("div", null, [
          L(u("p", null, null, 512), [
            [Y, void 0, "cdis_custom_mapping_description"]
          ]),
          u("div", RG, [
            u("div", IG, [
              PG,
              u("ul", MG, [
                u("li", null, [
                  u("a", {
                    class: "dropdown-item",
                    href: "#",
                    onClick: kt(H, ["prevent"])
                  }, UG, 8, LG)
                ]),
                u("li", null, [
                  u("a", {
                    class: "dropdown-item",
                    href: "#",
                    onClick: kt(P, ["prevent"])
                  }, YG, 8, jG)
                ])
              ])
            ]),
            u("div", null, [
              u("button", {
                type: "button",
                class: "btn btn-sm btn-primary",
                onClick: C
              }, zG)
            ]),
            u("div", KG, [
              u("button", {
                class: "btn btn-sm btn-success",
                onClick: $,
                disabled: _.value
              }, ZG, 8, JG)
            ])
          ])
        ]),
        T(ZW, {
          onMouseenterRow: S,
          onMouseleaveRow: w,
          id: "custom-mappings-table",
          items: m.value,
          "onUpdate:items": V[0] || (V[0] = (z) => m.value = z)
        }, {
          "after-cell": K(({ data: { item: z } }) => [
            u("div", qG, [
              u("div", ez, [
                u("button", {
                  class: "btn btn-sm btn-light",
                  onClick: (re) => N(z)
                }, sz, 8, tz),
                u("button", {
                  class: "btn btn-sm btn-light",
                  onClick: (re) => A(z)
                }, az, 8, oz)
              ])
            ])
          ]),
          _: 1
        }, 8, ["items"]),
        u("div", {
          ref_key: "itemMenu",
          ref: h,
          class: "me-2"
        }, [
          v.value ? (b(), Ce(DG, {
            key: 0,
            onEdit: N,
            onRemove: A
          })) : me("", !0)
        ], 512),
        u("div", iz, [
          u("button", {
            type: "button",
            class: "btn btn-sm btn-primary",
            disabled: _.value || !y.value,
            onClick: F
          }, [
            _.value ? (b(), E("i", cz)) : (b(), E("i", uz)),
            dz
          ], 8, lz)
        ]),
        T(q, {
          ref_key: "upsertModal",
          ref: l
        }, {
          header: K(() => [
            ve(j(p.value), 1)
          ]),
          footer: K(({ hide: z }) => {
            var re;
            return [
              u("div", fz, [
                u("button", {
                  class: "btn btn-sm btn-secondary",
                  onClick: z
                }, _z, 8, hz),
                u("button", {
                  class: "btn btn-sm btn-primary",
                  onClick: D,
                  disabled: (re = d.value) == null ? void 0 : re.hasErrors()
                }, bz, 8, vz)
              ])
            ];
          }),
          default: K(() => {
            var z;
            return [
              u("div", null, [
                T(xG, {
                  data: f.value,
                  "onUpdate:data": V[1] || (V[1] = (re) => f.value = re),
                  errors: (z = d.value) == null ? void 0 : z.errors(),
                  validCategories: g.value
                }, null, 8, ["data", "errors", "validCategories"])
              ])
            ];
          }),
          _: 1
        }, 512)
      ]);
    };
  }
}, Ez = /* @__PURE__ */ Se(wz, [["__scopeId", "data-v-dde9dd78"]]), Sz = /* @__PURE__ */ u("div", { class: "p-5" }, "Test", -1), xz = {
  class: "p-5 bg-danger",
  ref: "subscriber"
}, $z = {
  class: "p-5 bg-success",
  ref: "moveTarget"
}, Cz = {
  __name: "TestPage",
  setup(e) {
    function t(a, r) {
      if (Array.isArray(a) && Array.isArray(r)) {
        if (a.length !== r.length)
          return !1;
        for (let c = 0; c < a.length; c++)
          if (!t(a[c], r[c]))
            return !1;
        return !0;
      }
      if (typeof a != "object" || typeof r != "object" || a == null || r == null)
        return a === r;
      const i = Object.keys(a), l = Object.keys(r);
      if (i.length !== l.length)
        return !1;
      for (const c of i)
        if (!l.includes(c) || !t(a[c], r[c]))
          return !1;
      return !0;
    }
    const o = t([{ ehr_id: "5", order: "0", ehr_name: "Epic App Orchard", client_id: "8503bafc-8fe8-4631-a657-0b4a00019bf5", client_secret: "N2vo/GfFcsXoeCdxMXjHffyYNEu8K8DjAeY2gsdtePWr5XDa/GA2tW40NgD56iDXyYaKvCZXhiz0qDQ2t5Twyg==", fhir_base_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/api/FHIR/R4/", fhir_token_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/oauth2/token", fhir_authorize_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/oauth2/authorize", fhir_identity_provider: null, patient_identifier_string: "urn:oid:1.2.840.114350.1.13.0.1.7.5.737384.14", fhir_custom_auth_params: [{ name: "sdf", value: "sdf" }, { value: "sdasdf", context: "standalone", name: "ss" }] }, { ehr_id: "3", order: "1", ehr_name: "Smart Health It", client_id: "something", client_secret: "this is secret", fhir_base_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/fhir", fhir_token_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/auth/token", fhir_authorize_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/auth/authorize", fhir_identity_provider: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/fhir", patient_identifier_string: "http://hospital.smarthealthit.org", fhir_custom_auth_params: [] }, { ehr_id: "2", order: "2", ehr_name: "Open Cerner", client_id: "96719634-18f7-47db-a015-739c8aff289b", client_secret: "", fhir_base_url: "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d", fhir_token_url: "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token", fhir_authorize_url: "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize", fhir_identity_provider: "", patient_identifier_string: "", fhir_custom_auth_params: [] }], [{ ehr_id: "5", order: "0", ehr_name: "Epic App Orchard", client_id: "8503bafc-8fe8-4631-a657-0b4a00019bf5", client_secret: "N2vo/GfFcsXoeCdxMXjHffyYNEu8K8DjAeY2gsdtePWr5XDa/GA2tW40NgD56iDXyYaKvCZXhiz0qDQ2t5Twyg==", fhir_base_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/api/FHIR/R4/", fhir_token_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/oauth2/token", fhir_authorize_url: "https://vendorservices.epic.com/interconnect-amcurprd-oauth/oauth2/authorize", fhir_identity_provider: null, patient_identifier_string: "urn:oid:1.2.840.114350.1.13.0.1.7.5.737384.14", fhir_custom_auth_params: [{ name: "sdf", value: "sdf" }, { value: "sdasdf", context: "standalone", name: "ss" }] }, { ehr_id: "3", order: "1", ehr_name: "Smart Health It", client_id: "something", client_secret: "this is secret", fhir_base_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/fhir", fhir_token_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/auth/token", fhir_authorize_url: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/auth/authorize", fhir_identity_provider: "https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsIiIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMF0/fhir", patient_identifier_string: "http://hospital.smarthealthit.org", fhir_custom_auth_params: [] }, { ehr_id: "2", order: "2", ehr_name: "Open Cerner", client_id: "96719634-18f7-47db-a015-739c8aff289b", client_secret: "", fhir_base_url: "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d", fhir_token_url: "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token", fhir_authorize_url: "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize", fhir_identity_provider: "", patient_identifier_string: "", fhir_custom_auth_params: [] }, { ehr_name: "new systems", order: 4, ehr_id: -4 }]);
    return (a, r) => (b(), E(ne, null, [
      Sz,
      u("div", xz, "Subscriber", 512),
      u("div", $z, "Move Here", 512),
      ve(j(G(o)), 1)
    ], 64));
  }
}, Oz = [
  {
    path: "/",
    component: F6,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: VB },
      { path: "fhir-systems", name: "fhir-systems", component: PW },
      { path: "custom-mappings", name: "custom-mappings", component: Ez },
      { path: "test", name: "test", component: Cz },
      { path: "/:pathMatch(.*)*", component: dh }
    ]
  }
];
let ml;
const kz = () => ml || (ml = qc({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: Qc(),
  routes: Oz
}), ml), nK = (e) => {
  const t = Un(g6), n = kz();
  return t.directive("tt", Qj), t.use(n), t.use(Io()), t.use(Qs), t.mount(e), { app: t };
};
export {
  nK as CdisSettings,
  Zz as Datamart,
  qz as DatamartDesignChecker,
  Xz as EmailUsers,
  tK as MappingHelper,
  Gz as Parcel,
  zz as ParcelBadge,
  Jz as QueueMonitor,
  eK as StoreTest
};
