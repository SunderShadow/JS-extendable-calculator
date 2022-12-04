var h = Object.defineProperty;
var p = (s, r, i) => r in s ? h(s, r, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[r] = i;
var a = (s, r, i) => (p(s, typeof r != "symbol" ? r + "" : r, i), i);
class u {
  constructor() {
    a(this, "_operations", []);
  }
  addOperation(r, i, e = 3) {
    this._operations.push({
      keyWord: r,
      cb: i,
      priority: e
    });
  }
  calc(r) {
    if (r = this.extractParentheses(r), this.statementHasOnlyNumbers(r))
      return parseFloat(r);
    let i, e = -1, o = -1;
    for (let t = 0; t < r.length; ++t) {
      let l = this.getOperation(r, t);
      if ((l && !i || l && i.priority < l.priority) && (i = l, e = t, o = t += i.keyWord.length, i.priority === 3))
        break;
    }
    if (!i || e === -1 || o === -1)
      throw new Error("No registered operators found");
    return i.cb(
      this.calc(r.substring(0, e).trim()),
      this.calc(r.substring(o).trim())
    );
  }
  getOperation(r, i) {
    let e = 0, o;
    for (const t of this._operations)
      t.keyWord.length > e && r.startsWith(t.keyWord, i) && (e = t.keyWord.length, o = t);
    return o;
  }
  statementHasOnlyNumbers(r) {
    return r = r.trim(), parseFloat(r).toString() === r;
  }
  extractParentheses(r) {
    let i = 0, e = -1;
    for (let o = 0; o < r.length; ++o)
      r[o] === "(" && i++ === 0 && (e = o), r[o] === ")" && --i === 0 && (r = r.substring(0, e) + this.calc(r.substring(e + 1, o)).toString() + r.substring(o + 1), o = e);
    if (i !== 0)
      throw Error("Parentheses must have pair");
    return r;
  }
}
export {
  u as default
};
