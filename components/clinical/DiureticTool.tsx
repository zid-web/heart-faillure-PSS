"use client"

import { useState } from "react"
import {
    Syringe,
    ArrowRight,
    Activity,
    CheckCircle2,
    AlertTriangle,
    Scale,
    Droplets,
    Timer
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DiureticTool() {
    const [doseHome, setDoseHome] = useState("")
    const [molecule, setMolecule] = useState("furosemide")
    const [isNaive, setIsNaive] = useState("no")

    // Evaluation state
    const [nau, setNau] = useState("")
    const [diuresis, setDiuresis] = useState("")

    const calculateInitialDose = () => {
        if (isNaive === "yes") {
            return {
                dose: molecule === "furosemide" ? "20 - 40 mg IV" : "0.5 - 1 mg IV",
                note: "Dose de charge initiale (Patient Naïf)."
            }
        }

        const d = parseFloat(doseHome)
        if (!d) return null

        let minFactor = 1
        let maxFactor = 2 // ESC recommends 1-2x home dose IV (bioavailability ~50% PO -> 100% IV means 1x IV = 2x PO effect roughly, but guidelines say 'at least equal to home dose IV')
        // Actually ESC 2021 says: "IV dose should be at least equal to the oral dose" (Class I). 
        // Experts often say 1-2.5x.

        // Simulating the recommendation:
        return {
            dose: `${d * 1} - ${d * 2} mg IV`,
            note: `Bolus initial (1x à 2x la dose domicile en IV).`
        }
    }

    const evaluateResponse = () => {
        // ESC Criteria: Spot Urine Na > 50-70 OR Urine > 100-150ml/h
        const n = parseFloat(nau)
        const diu = parseFloat(diuresis)

        if (!nau && !diuresis) return null

        const goodNa = n >= 50
        const goodDiu = diu >= 150 // Using 150ml/h conservative target

        if (goodNa || goodDiu) {
            return {
                status: "Réponse Adéquate",
                color: "bg-green-100 text-green-800 border-green-200",
                action: "Répéter la dose toutes les 12h.",
                icon: CheckCircle2
            }
        }

        return {
            status: "Réponse Insuffisante",
            color: "bg-red-100 text-red-800 border-red-200",
            action: "DOUBLER la dose IV (max 200mg bolus).",
            icon: AlertTriangle
        }
    }

    const initResult = calculateInitialDose()
    const evalResult = evaluateResponse()

    return (
        <div className="space-y-4">
            <div className="p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-between shadow-sm">
                <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <Syringe className="h-4 w-4" /> Protocole Diurétiques
                    </h3>
                    <p className="text-[10px] text-indigo-100">Algorithme ESC 2026</p>
                </div>
            </div>

            <Tabs defaultValue="init" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="init">Départ</TabsTrigger>
                    <TabsTrigger value="eval">Suivi</TabsTrigger>
                    <TabsTrigger value="resistance" className="text-red-700 font-bold">Résistance</TabsTrigger>
                    <TabsTrigger value="convert">Outils</TabsTrigger>
                </TabsList>

                {/* --- TAB 1: INITIATION TABLETTE --- */}
                <TabsContent value="init" className="space-y-4 p-1">
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Label className="text-xs font-semibold">Le patient prend-il déjà des diurétiques ?</Label>
                            <RadioGroup value={isNaive} onValueChange={setIsNaive} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="naive-yes" />
                                    <Label htmlFor="naive-yes" className="font-normal text-sm">Non (Naïf)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="naive-no" />
                                    <Label htmlFor="naive-no" className="font-normal text-sm">Oui (Chronique)</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {isNaive === "no" && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Molécule</Label>
                                        <Select value={molecule} onValueChange={setMolecule}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="furosemide">Furosémide (Lasilix)</SelectItem>
                                                <SelectItem value="bumetanide">Bumétanide (Burinex)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Dose PO habituelle (mg)</Label>
                                        <Input
                                            type="number"
                                            value={doseHome}
                                            onChange={e => setDoseHome(e.target.value)}
                                            placeholder="ex: 40"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {initResult && (
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border-2 border-indigo-100 text-center">
                                <p className="text-xs uppercase font-bold tracking-wide text-indigo-800 mb-1">Dose IV Recommandée</p>
                                <p className="text-2xl font-bold text-indigo-600">{initResult.dose}</p>
                                <p className="text-xs text-slate-500 mt-1">{initResult.note}</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* --- TAB 2: EVALUATION H+2 / H+6 --- */}
                <TabsContent value="eval" className="space-y-4 p-1">
                    <Card className="border-none shadow-none bg-slate-50/50">
                        <CardContent className="p-3 space-y-4">
                            <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded border border-yellow-100 text-xs text-yellow-800">
                                <Timer className="h-4 w-4 shrink-0 mt-0.5" />
                                <p>Évaluer à <strong>H+2</strong> (Sodium urinaire) ou <strong>H+6</strong> (Diurèse horaire).</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-xs">Na+ Urinaire (Spot)</Label>
                                    <div className="relative">
                                        <Input type="number" placeholder="ex: 45" value={nau} onChange={e => setNau(e.target.value)} />
                                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">mmol/L</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Diurèse Horaire</Label>
                                    <div className="relative">
                                        <Input type="number" placeholder="ex: 100" value={diuresis} onChange={e => setDiuresis(e.target.value)} />
                                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">ml/h</span>
                                    </div>
                                </div>
                            </div>

                            {evalResult && (
                                <div className={`p-4 rounded-xl border-2 ${evalResult.color} animate-in zoom-in-95`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <evalResult.icon className="h-5 w-5" />
                                        <h4 className="font-bold">{evalResult.status}</h4>
                                    </div>
                                    <p className="text-sm font-medium">{evalResult.action}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB 3: RESISTANCE (NEW) --- */}
                <TabsContent value="resistance" className="space-y-4 p-1">
                    <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-900">
                            <strong>Indication :</strong> Congestion persistante malgré dose max de Furosémide ({'>'}80-120mg IV).
                        </div>

                        <Card>
                            <CardContent className="p-3 space-y-3">
                                <h4 className="text-sm font-bold flex items-center gap-2">
                                    <Badge variant="outline" className="text-red-600 border-red-200">Option B</Badge>
                                    Double/Triple Thérapie
                                </h4>
                                <ul className="text-xs space-y-2">
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong>Thiazidique (Blocage Distal)</strong>
                                            <p className="text-slate-600">Métolazone (2.5-10mg) ou HCTZ (25-50mg) PO.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong>ARM (Dose Diurétique)</strong>
                                            <p className="text-slate-600">Spironolactone (100-200mg/j).</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="bg-yellow-50 p-2 rounded text-[10px] text-yellow-800 border border-yellow-200">
                                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                                    <strong>Surveillance Majeure :</strong> Poids 2x/j, Iono 1-2x/j (Risque HypoK/HypoNa sévère).
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-3 space-y-3">
                                <h4 className="text-sm font-bold flex items-center gap-2">
                                    <Badge variant="outline" className="text-purple-600 border-purple-200">Étape 3</Badge>
                                    Voie Alternative
                                </h4>
                                <ul className="text-xs space-y-2">
                                    <li>
                                        <strong>Tolvaptan (15mg/j)</strong>: Si Hyponatrémie ({'<'}125) + Congestion.
                                    </li>
                                    <li>
                                        <strong>Acetazolamide (500mg IV)</strong>: Pour alcalose métabolique (ADVOR).
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- TAB 4: CONVERSION --- */}
                <TabsContent value="convert" className="space-y-4 p-1">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="p-3 bg-white border rounded-lg flex justify-between items-center shadow-sm">
                            <div className="text-sm font-medium">Furosémide IV <br /><span className="text-xs text-muted-foreground">Lasilix</span></div>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <div className="text-sm font-bold">20 mg</div>
                        </div>
                        <div className="p-3 bg-white border rounded-lg flex justify-between items-center shadow-sm">
                            <div className="text-sm font-medium">Furosémide PO</div>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <div className="text-sm font-bold">40 mg</div>
                        </div>
                        <div className="p-3 bg-white border rounded-lg flex justify-between items-center shadow-sm">
                            <div className="text-sm font-medium">Bumétanide IV <br /><span className="text-xs text-muted-foreground">Burinex</span></div>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <div className="text-sm font-bold">1 mg</div>
                        </div>
                        <div className="bg-slate-100 p-2 rounded text-[10px] text-center text-slate-500">
                            Approx: 40mg Furosemide ≈ 1mg Bumetanide ≈ 20mg Torasemide
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
