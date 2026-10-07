import { shfm, type ShfmInput } from "../shfm"
import assert from "node:assert/strict"

const base: ShfmInput = {
  age: 60, male: true, nyha: 3, lvef: 25, ischemic: true, sbp: 120,
  diureticMgDay: 80, weightKg: 80, allopurinol: false, statin: true,
  hemoglobin: 13, lymphocytePct: 20, uricAcid: 7, sodium: 138, cholesterol: 180,
  acei: false, arb: false, betaBlocker: false, aldosteroneAntagonist: false, device: "none",
}
const r = shfm(base)
console.log(r)
assert.ok(r.survival1y > 0.5 && r.survival1y < 1)
assert.ok(r.survival5y < r.survival2y && r.survival2y < r.survival1y)
// traitements => meilleure survie
const t = shfm({ ...base, acei: true, betaBlocker: true, aldosteroneAntagonist: true, device: "icd" })
assert.ok(t.survival1y > r.survival1y)
// aggravation => moins bonne survie
assert.ok(shfm({ ...base, nyha: 4 }).survival1y < r.survival1y)
assert.ok(shfm({ ...base, sodium: 128 }).survival1y < r.survival1y)
assert.ok(shfm({ ...base, sbp: 90 }).survival1y > r.survival1y === false)
console.log("shfm ok")
