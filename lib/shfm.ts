/**
 * Seattle Heart Failure Model (SHFM) — Levy WC et al., Circulation 2006;113:1424-33.
 *
 * Modèle de Cox : score = Σ ln(HR_i) × x_i ; survie S(t) = exp(-λ · t · exp(score)),
 * λ = 0.0405 / an (risque de base, cohorte PRAISE-1).
 *
 * ⚠ Les hazard ratios sont regroupés dans SHFM_COEFFICIENTS pour être relus et
 * corrigés en un seul endroit. À valider contre l'article original / le
 * calculateur officiel (depts.washington.edu/shfm) avant tout usage clinique.
 * Le modèle date de 2006 : il ne contient ni iSGLT2, ni ARNI, ni finérénone.
 */

export const SHFM_BASELINE_LAMBDA = 0.0405

export const SHFM_COEFFICIENTS = {
  agePer10y: 1.09,
  male: 1.089,
  nyhaPerClass: 1.6,
  /** appliqué à (100 / FEVG) */
  efInverse100: 1.03,
  ischemic: 1.354,
  sbpPer10mmHg: 0.877,
  /** par mg/kg/j d'équivalent furosémide */
  diureticPerMgKg: 1.178,
  allopurinol: 1.571,
  statin: 0.63,
  /** par g/dL en dessous de 16 */
  hemoglobinPerGdlBelow16: 1.124,
  /** par tranche de 5 % (plafonné à 47 %) */
  lymphocytePer5Pct: 0.897,
  /** par mg/dL au-dessus de 9.5 */
  uricAcidPerMgdlAbove9_5: 1.064,
  /** par mmol/L en dessous de 138 */
  sodiumPerMmolBelow138: 1.05,
  /** appliqué à (100 / cholestérol total mg/dL) */
  cholesterolInverse100: 2.206,
} as const

/** HR des traitements (littérature, appliqués multiplicativement). */
export const SHFM_TREATMENT_HR = {
  acei: 0.77,
  arb: 0.87,
  betaBlocker: 0.66,
  aldosteroneAntagonist: 0.74,
  icd: 0.74,
  crt: 0.79,
  crtD: 0.76,
} as const

export type ShfmDevice = "none" | "icd" | "crt" | "crtD"

export interface ShfmInput {
  age: number
  male: boolean
  nyha: 1 | 2 | 3 | 4
  lvef: number
  ischemic: boolean
  sbp: number
  /** équivalent furosémide, mg/j */
  diureticMgDay: number
  weightKg: number
  allopurinol: boolean
  statin: boolean
  hemoglobin: number // g/dL
  lymphocytePct: number
  uricAcid: number // mg/dL
  sodium: number // mmol/L
  cholesterol: number // mg/dL
  acei: boolean
  arb: boolean
  betaBlocker: boolean
  aldosteroneAntagonist: boolean
  device: ShfmDevice
}

export interface ShfmResult {
  score: number
  hazardRatio: number
  survival1y: number
  survival2y: number
  survival5y: number
  meanLifeExpectancyYears: number
}

const hr = Math.log
const C = SHFM_COEFFICIENTS

export function shfmScore(i: ShfmInput): number {
  const diureticPerKg = i.weightKg > 0 ? i.diureticMgDay / i.weightKg : 0
  let s = 0
  s += hr(C.agePer10y) * (i.age / 10)
  s += i.male ? hr(C.male) : 0
  s += hr(C.nyhaPerClass) * i.nyha
  s += hr(C.efInverse100) * (100 / Math.max(i.lvef, 5))
  s += i.ischemic ? hr(C.ischemic) : 0
  s += hr(C.sbpPer10mmHg) * (i.sbp / 10)
  s += hr(C.diureticPerMgKg) * diureticPerKg
  s += i.allopurinol ? hr(C.allopurinol) : 0
  s += i.statin ? hr(C.statin) : 0
  s += hr(C.hemoglobinPerGdlBelow16) * Math.max(0, 16 - i.hemoglobin)
  s += hr(C.lymphocytePer5Pct) * (Math.min(i.lymphocytePct, 47) / 5)
  s += hr(C.uricAcidPerMgdlAbove9_5) * Math.max(0, i.uricAcid - 9.5)
  s += hr(C.sodiumPerMmolBelow138) * Math.max(0, 138 - i.sodium)
  s += hr(C.cholesterolInverse100) * (100 / Math.max(i.cholesterol, 50))

  const T = SHFM_TREATMENT_HR
  if (i.acei) s += hr(T.acei)
  else if (i.arb) s += hr(T.arb)
  if (i.betaBlocker) s += hr(T.betaBlocker)
  if (i.aldosteroneAntagonist) s += hr(T.aldosteroneAntagonist)
  if (i.device === "icd") s += hr(T.icd)
  if (i.device === "crt") s += hr(T.crt)
  if (i.device === "crtD") s += hr(T.crtD)
  return s
}

export function shfm(i: ShfmInput): ShfmResult {
  const score = shfmScore(i)
  const hazardRatio = Math.exp(score)
  const rate = SHFM_BASELINE_LAMBDA * hazardRatio
  return {
    score,
    hazardRatio,
    survival1y: Math.exp(-rate),
    survival2y: Math.exp(-rate * 2),
    survival5y: Math.exp(-rate * 5),
    meanLifeExpectancyYears: 1 / rate,
  }
}

/** Seuils de lecture (SHFM : survie à 1 an) — repères indicatifs, pas des recommandations. */
export function shfmRiskBand(survival1y: number): "low" | "intermediate" | "high" {
  if (survival1y >= 0.9) return "low"
  if (survival1y >= 0.8) return "intermediate"
  return "high"
}
