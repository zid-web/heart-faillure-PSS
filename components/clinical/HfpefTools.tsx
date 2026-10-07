"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

// Scores diagnostiques de l'ICFEp — ECDP ACC 2026 (Kittleson et al., JACC 2026), Figure 3.

// H2FPEF : Heavy (IMC > 30) 2 · Hypertension (≥ 2 antihypertenseurs) 1 · Fibrillation atriale 3 ·
// Pulmonary hypertension (PAPS > 35 mmHg à l'écho) 1 · Elder (> 60 ans) 1 · Filling pressure (E/e' > 9) 1
export const H2FPEF_ITEMS = [
    { id: "obese", label: "Obésité (IMC > 30 kg/m²)", points: 2 },
    { id: "htn", label: "≥ 2 antihypertenseurs", points: 1 },
    { id: "af", label: "Fibrillation atriale", points: 3 },
    { id: "ph", label: "HTP (PAPS > 35 mmHg à l'écho)", points: 1 },
    { id: "elder", label: "Âge > 60 ans", points: 1 },
    { id: "filling", label: "Pressions de remplissage (E/e' > 9)", points: 1 },
] as const

export function h2fpefTotal(selected: string[]): number {
    return H2FPEF_ITEMS.reduce((s, i) => s + (selected.includes(i.id) ? i.points : 0), 0)
}

// HFpEF-ABA : probabilité = Z / (1 + Z) × 100 ; Z = e^y ;
// y = −7,79 + 0,063 × âge + 0,14 × IMC + 2,04 × FA (1 = oui, 0 = non)
export function hfpefAbaProbability(age: number, bmi: number, af: boolean): number {
    const y = -7.79 + 0.063 * age + 0.14 * bmi + 2.04 * (af ? 1 : 0)
    const z = Math.exp(y)
    return (z / (1 + z)) * 100
}

export function hfpefAbaBand(prob: number): "low" | "intermediate" | "high" {
    // Seuils non validés (ECDP 2026) : < 25 % faible, 25-80 % intermédiaire, > 80 % élevée
    if (prob < 25) return "low"
    if (prob <= 80) return "intermediate"
    return "high"
}

export function H2fpefCalculator() {
    const [sel, setSel] = useState<string[]>([])
    const total = h2fpefTotal(sel)
    const toggle = (id: string) => setSel(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]))
    const high = total >= 6
    return (
        <div className="space-y-3">
            <div className="grid gap-2">
                {H2FPEF_ITEMS.map(i => (
                    <div key={i.id} onClick={() => toggle(i.id)}
                        className={`p-3 rounded-md border cursor-pointer flex items-center justify-between text-sm
                        ${sel.includes(i.id) ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                        <span>{i.label} <span className="text-xs text-muted-foreground">(+{i.points})</span></span>
                        {sel.includes(i.id) && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </div>
                ))}
            </div>
            <div className={`p-4 rounded-lg text-center border-2 ${high ? "bg-red-50 border-red-200 text-red-900" : "bg-slate-50 border-slate-200 text-slate-800"}`}>
                <p className="text-xs uppercase font-bold">Score H₂FPEF</p>
                <p className="text-3xl font-bold">{total} / 9</p>
                <p className="text-xs mt-1">
                    {high
                        ? "≥ 6 points : fortement évocateur d'ICFEp."
                        : "< 6 points : non diagnostique seul. Si la probabilité clinique reste forte, rechercher les diagnostics différentiels (mimics) et poursuivre l'évaluation (HFA-PEFF, test d'effort, hémodynamique)."}
                </p>
            </div>
            <p className="text-[11px] text-muted-foreground">
                Plus sensible que le HFA-PEFF, qui est plus spécifique. Stratégie proposée : H₂FPEF en dépistage, puis HFA-PEFF pour confirmer ; en cas de discordance, examens avancés.
            </p>
        </div>
    )
}

export function HfpefAbaCalculator() {
    const [age, setAge] = useState("")
    const [bmi, setBmi] = useState("")
    const [af, setAf] = useState(false)
    const a = parseFloat(age.replace(",", "."))
    const b = parseFloat(bmi.replace(",", "."))
    const ok = a > 0 && b > 0
    const prob = ok ? hfpefAbaProbability(a, b, af) : null
    const band = prob === null ? null : hfpefAbaBand(prob)
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">Âge (ans)</Label>
                    <Input type="number" inputMode="decimal" placeholder="70" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">IMC (kg/m²)</Label>
                    <Input type="number" inputMode="decimal" placeholder="30" value={bmi} onChange={e => setBmi(e.target.value)} />
                </div>
            </div>
            <div onClick={() => setAf(v => !v)}
                className={`p-3 rounded-md border cursor-pointer flex items-center justify-between text-sm
                ${af ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                Fibrillation atriale
                {af && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
            </div>
            {prob !== null && (
                <div className={`p-4 rounded-lg text-center border-2 ${band === "high" ? "bg-red-50 border-red-200 text-red-900" : band === "intermediate" ? "bg-orange-50 border-orange-200 text-orange-900" : "bg-green-50 border-green-200 text-green-900"}`}>
                    <p className="text-xs uppercase font-bold">Probabilité d'ICFEp (HFpEF-ABA)</p>
                    <p className="text-3xl font-bold">{prob < 1 ? "< 1" : Math.round(prob)} %</p>
                    <p className="text-xs mt-1">
                        {band === "low"
                            ? "Probabilité faible (< 25 %) : envisager d'autres diagnostics."
                            : "Probabilité intermédiaire/élevée : échocardiographie, peptides natriurétiques, avis cardiologique."}
                    </p>
                </div>
            )}
            <p className="text-[11px] text-muted-foreground">
                Outil de dépistage (soins primaires, dossier électronique) à partir de 3 variables, sans échocardiographie. Aucun seuil de probabilité n'est validé ; les repères &lt; 25 % / 25-80 % / &gt; 80 % sont ceux cités dans l'ECDP 2026. Équation à 2 décimales : version complète dans Reddy et al., Nat Med 2024.
            </p>
        </div>
    )
}
