"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react"

// --- 1. SICA Score Calculator (Phase 1) ---
// Simplified SICA (Score Insuffisance Cardiaque Aiguë) for rapid triage
export function SicaCalculator() {
    const [riskItems, setRiskItems] = useState<string[]>([])

    const toggleItem = (item: string) => {
        setRiskItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        )
    }

    // Items map to 1 point each by default for this simplified tool
    const items = [
        { id: "dyspnea", label: "Dyspnée majorée / Orthopnée" },
        { id: "weight", label: "Prise de poids > 2kg / 3j" },
        { id: "edema", label: "Oedèmes (Chevilles/Jambes)" },
        { id: "fatigue", label: "Fatigue inhabituelle / Asthénie" },
        { id: "night", label: "Toux nocturne / Réveil oppression" },
        { id: "palpitations", label: "Palpitations ressenties" }
    ]

    const score = riskItems.length

    let status = {
        title: "STABLE",
        color: "bg-green-100 text-green-900 border-green-200",
        icon: CheckCircle2,
        compliance: "Objectif du traitement optimal et ETP.",
        actions: [
            "Poursuite traitement de fond (4 Piliers).",
            "Éducation renforcée (Observance, Sport, Sel).",
            "Maintenir rythme consultations."
        ]
    }

    if (score === 2) {
        status = {
            title: "VIGILANCE RENFORCÉE",
            color: "bg-orange-100 text-orange-900 border-orange-200",
            icon: AlertTriangle,
            compliance: "Identification précoce des signes (Pré-décompensation).",
            actions: [
                "Intensifier autosurveillance (Pesée/Symptômes).",
                "Revue mesures hygiéno-diététiques (Sel/Eau).",
                "CONTACTER Équipe soignante sous 24h.",
                "Discuter ajustement diurétique (Plan d'action)."
            ]
        }
    } else if (score >= 3) {
        status = {
            title: "DÉCOMPENSATION ÉVOLUTIVE",
            color: "bg-red-100 text-red-900 border-red-200",
            icon: AlertTriangle,
            compliance: "Intervention médicale rapide requise (ESC Class I).",
            actions: [
                "URGENCE : Contacter sans délai (Médecin/15).",
                "Évaluation médicale immédiate (Bio/ECG).",
                "Majoration Diurétiques (IV si besoin).",
                "Hospitalisation probable si signes de gravité."
            ]
        }
    }

    const StatusIcon = status.icon

    return (
        <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg text-sm mb-2 border">
                Cochez les signes cliniques présents (1 point par signe).
            </div>
            <div className="grid grid-cols-1 gap-2">
                {items.map(item => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 rounded-md border cursor-pointer transition-all flex items-center justify-between
              ${riskItems.includes(item.id) ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}
            `}
                    >
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        {riskItems.includes(item.id) && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </div>
                ))}
            </div>

            <div className={`mt-4 p-4 rounded-xl border-2 ${status.color}`}>
                <div className="flex items-center gap-2 mb-3">
                    <StatusIcon className="h-6 w-6" />
                    <div>
                        <p className="text-xs uppercase font-bold opacity-80">Score SICA: {score}</p>
                        <h4 className="text-lg font-bold leading-none">{status.title}</h4>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-white/60 p-2 rounded text-xs">
                        <strong>Conformité ESC 2023 :</strong> {status.compliance}
                    </div>
                    <div>
                        <strong className="text-xs uppercase">Actions Recommandées :</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs font-medium">
                            {status.actions.map((action, i) => (
                                <li key={i}>{action}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- 2. ESSIC / Emergency Score (Phase 2) ---
// Simplified estimation for Hospital/Emergency context
export function EssicCalculator() {
    const [sbp, setSbp] = useState("")
    const [bun, setBun] = useState("")
    const [na, setNa] = useState("")

    const calculateRisk = () => {
        const s = parseInt(sbp) || 120
        const b = parseInt(bun) || 20
        const n = parseInt(na) || 135
        // Dummy logic inspired by OPTIMIZE-HF/GWTG (Low SBP + High BUN + Low Na = High Risk)
        let score = 0
        if (s < 100) score += 2
        if (b > 30) score += 1
        if (n < 135) score += 1

        return score >= 2 ? "Risque Élevé (Mortalité Intra-Hospit ↑)" : "Risque Standard"
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">TAS (mmHg)</Label>
                    <Input type="number" placeholder="120" value={sbp} onChange={e => setSbp(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Urée (mg/dL)</Label>
                    <Input type="number" placeholder="30" value={bun} onChange={e => setBun(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Sodium (mmol/L)</Label>
                    <Input type="number" placeholder="138" value={na} onChange={e => setNa(e.target.value)} />
                </div>
            </div>
            <div className="bg-slate-100 p-3 rounded text-center text-sm font-bold text-slate-800">
                {calculateRisk()}
            </div>
        </div>
    )
}

// --- 3. DFG Calculator + Converter (Phase 3) ---
export function DfgCalculator() {
    const [creat, setCreat] = useState("")
    const [unit, setUnit] = useState<"mg" | "umol">("umol") // mg/dL or umol/L
    const [age, setAge] = useState("")
    const [gender, setGender] = useState<"male" | "female">("male")

    // CKD-EPI Formula
    const calculateDFG = () => {
        const c = parseFloat(creat)
        const a = parseFloat(age)
        if (!c || !a) return null

        // Convert to mg/dL for formula if needed
        // 1 mg/dL = 88.4 umol/L 
        const creatMg = unit === "umol" ? c / 88.4 : c

        // CKD-EPI 2009 constants
        let k = 0.9, alpha = -0.411
        if (gender === "female") {
            k = 0.7; alpha = -0.329
        }

        const min = Math.min(creatMg / k, 1)
        const max = Math.max(creatMg / k, 1)

        // DFG = 141 * min^alpha * max^-1.209 * 0.993^Age * (1.018 if female)
        let dfg = 141 * Math.pow(min, alpha) * Math.pow(max, -1.209) * Math.pow(0.993, a)
        if (gender === "female") dfg *= 1.018

        return Math.round(dfg)
    }

    const dfg = calculateDFG()

    return (
        <div className="space-y-4">
            <div className="flex bg-muted rounded-lg p-1">
                <button
                    className={`flex-1 py-1 text-xs font-medium rounded ${unit === "umol" ? "bg-white shadow" : "text-muted-foreground"}`}
                    onClick={() => setUnit("umol")}
                >
                    µmol/L
                </button>
                <button
                    className={`flex-1 py-1 text-xs font-medium rounded ${unit === "mg" ? "bg-white shadow" : "text-muted-foreground"}`}
                    onClick={() => setUnit("mg")}
                >
                    mg/dL
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">Créatinine</Label>
                    <Input
                        type="number"
                        value={creat}
                        onChange={e => setCreat(e.target.value)}
                        placeholder={unit === "umol" ? "ex: 90" : "ex: 1.0"}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Âge (ans)</Label>
                    <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="ex: 65" />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Sexe</Label>
                <RadioGroup defaultValue="male" onValueChange={(v) => setGender(v as any)} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="font-normal">Homme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="font-normal">Femme</Label>
                    </div>
                </RadioGroup>
            </div>

            {dfg !== null && (
                <div className={`p-4 rounded-lg text-center ${dfg < 60 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    <p className="text-xs uppercase font-bold tracking-wide">DFG Estimé (CKD-EPI)</p>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold">{dfg}</span>
                        <span className="text-sm">mL/min/1.73m²</span>
                    </div>
                </div>
            )}
        </div>
    )
}

// --- 4. Titration Assistant (Phase 3) ---
export function TitrationHelper() {
    const [drug, setDrug] = useState("bisoprolol")
    const [currentDose, setCurrentDose] = useState("")

    const getRecommendations = () => {
        // Logic: Simple next step suggestion
        if (!currentDose || currentDose === "0") return "Débuter à la dose minimale."

        const numDose = parseFloat(currentDose)

        if (drug === "bisoprolol") {
            if (numDose >= 10) return "Dose cible atteinte ! Surveillance FC/TA."
            if (numDose === 1.25) return "Prochaine étape : 2.5 mg (+ tolérance)"
            if (numDose === 2.5) return "Prochaine étape : 3.75 mg ou 5 mg"
            if (numDose === 5) return "Prochaine étape : 7.5 mg"
            if (numDose === 7.5) return "Prochaine étape : 10 mg (Cible)"
            return "Augmenter progressivement vers 10 mg."
        }
        if (drug === "entresto") {
            // sacubitril/valsartan
            if (numDose === 24) return "Prochaine étape : 49/51 mg (x2/j)"
            if (numDose === 49) return "Prochaine étape : 97/103 mg (x2/j - Cible)"
            if (numDose >= 97) return "Dose cible atteinte !"
            return "Titration toutes les 2-4 semaines."
        }
        return "Consulter le protocole."
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-xs">Molécule</Label>
                <Select onValueChange={setDrug} defaultValue="bisoprolol">
                    <SelectTrigger>
                        <SelectValue placeholder="Choisir..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bisoprolol">Bisoprolol (Bêta-Bloquant)</SelectItem>
                        <SelectItem value="entresto">Sacubitril/Valsartan (ARNI)</SelectItem>
                        <SelectItem value="ramipril">Ramipril (IEC)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className="text-xs">Dose Actuelle (mg)</Label>
                <Select onValueChange={setCurrentDose}>
                    <SelectTrigger>
                        <SelectValue placeholder="Dose..." />
                    </SelectTrigger>
                    <SelectContent>
                        {drug === "bisoprolol" && (
                            <>
                                <SelectItem value="0">Jamais reçu</SelectItem>
                                <SelectItem value="1.25">1.25 mg</SelectItem>
                                <SelectItem value="2.5">2.5 mg</SelectItem>
                                <SelectItem value="3.75">3.75 mg</SelectItem>
                                <SelectItem value="5">5 mg</SelectItem>
                                <SelectItem value="7.5">7.5 mg</SelectItem>
                                <SelectItem value="10">10 mg</SelectItem>
                            </>
                        )}
                        {drug === "entresto" && (
                            <>
                                <SelectItem value="0">Jamais reçu</SelectItem>
                                <SelectItem value="24">24/26 mg</SelectItem>
                                <SelectItem value="49">49/51 mg</SelectItem>
                                <SelectItem value="97">97/103 mg</SelectItem>
                            </>
                        )}
                        {drug === "ramipril" && (
                            <SelectItem value="0">À implémenter...</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {currentDose && (
                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex gap-3 items-start">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-bold text-indigo-900 text-sm">Conseil Titration</p>
                        <p className="text-indigo-700 text-sm">{getRecommendations()}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// --- 5. MAGGIC Risk Calculator (Advanced) ---
export function MaggicCalculator() {
    const [ef, setEf] = useState("")
    const [age, setAge] = useState("")
    const [systolic, setSystolic] = useState("")
    const [creat, setCreat] = useState("")
    const [nyha, setNyha] = useState("1")

    const calculateRisk = () => {
        // Simplified proxy logic for demo purposes (real MAGGIC is complex regression)
        // Points: Age/10 + (40-EF)/10 + NYHA
        let points = 0
        if (age) points += parseInt(age) / 10
        if (ef) points += (40 - Math.min(parseInt(ef), 40)) / 5
        if (creat && parseInt(creat) > 130) points += 2
        points += parseInt(nyha)

        if (points < 8) return { risk: "Faible", prob: "< 10%" }
        if (points < 12) return { risk: "Intermédiaire", prob: "10 - 30%" }
        return { risk: "Élevé", prob: "> 30%" }
    }

    const result = calculateRisk()

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">FEVG (%)</Label>
                    <Input type="number" placeholder="35" value={ef} onChange={e => setEf(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Age (ans)</Label>
                    <Input type="number" placeholder="65" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">TAS (mmHg)</Label>
                    <Input type="number" placeholder="120" value={systolic} onChange={e => setSystolic(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Créat (µmol/L)</Label>
                    <Input type="number" placeholder="100" value={creat} onChange={e => setCreat(e.target.value)} />
                </div>
            </div>
            <div className="space-y-1">
                <Label className="text-xs">Classe NYHA</Label>
                <Select value={nyha} onValueChange={setNyha}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">I - Asymptomatique</SelectItem>
                        <SelectItem value="2">II - Symptômes légers</SelectItem>
                        <SelectItem value="3">III - Confortable au repos</SelectItem>
                        <SelectItem value="4">IV - Symptômes au repos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="p-4 rounded-lg bg-slate-100 text-center">
                <p className="text-xs font-bold text-slate-500 uppercase">Mortalité estimée à 1 an</p>
                <p className="text-xl font-bold text-slate-800">{result.prob}</p>
                <p className="text-xs text-slate-600">Risque: {result.risk}</p>
            </div>
        </div>
    )
}

// --- 6. SHFM (Seattle Heart Failure Model) Simplified ---
export function ShfmCalculator() {
    const [diuretic, setDiuretic] = useState("0") // dose equivalent
    const [nyha, setNyha] = useState("1")
    const [device, setDevice] = useState("none")

    return (
        <div className="space-y-4">
            <p className="text-xs text-muted-foreground p-2 bg-yellow-50 rounded border border-yellow-100">
                Estimateur simplifié de survie.
            </p>
            <div className="space-y-2">
                <Label className="text-xs">Dose Diurétique (Furosemide eq.)</Label>
                <Select value={diuretic} onValueChange={setDiuretic}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Aucun / Faible (&lt;40mg)</SelectItem>
                        <SelectItem value="1">Moyenne (40-80mg)</SelectItem>
                        <SelectItem value="2">Élevée (&gt;80mg)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label className="text-xs">Devices</Label>
                <Select value={device} onValueChange={setDevice}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Aucun</SelectItem>
                        <SelectItem value="icd">DAI (Défibrillateur)</SelectItem>
                        <SelectItem value="crt">CRT (Resynchronisation)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 text-center text-blue-900">
                <p className="text-xs font-bold uppercase">Espérance de vie estimée</p>
                <p className="text-lg font-bold">
                    {device === "none" && diuretic === "2" ? "Critique (< 2 ans)" :
                        device !== "none" ? "Améliorée (+2-5 ans)" : "Standard (adapté âge)"}
                </p>
            </div>
        </div>
    )
}
