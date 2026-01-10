"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import {
  HeartPulse,
  Stethoscope,
  Pill,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  Droplets,
  Thermometer
} from "lucide-react"

// --- TYPES ---
type ProfileType = "warm_wet" | "cold_wet" | "warm_dry" | "cold_dry" | null

export default function AlgorithmsPage() {
  const [step, setStep] = useState(1)

  // STEP 1: PROFILAGE (Triage)
  const [congestion, setCongestion] = useState<"wet" | "dry" | null>(null)
  const [perfusion, setPerfusion] = useState<"warm" | "cold" | null>(null)

  // STEP 3 (Comorbidities)
  const [comorbidities, setComorbidities] = useState<string[]>([])

  const getProfile = (): ProfileType => {
    if (congestion === "wet" && perfusion === "warm") return "warm_wet" // Classique (90%)
    if (congestion === "wet" && perfusion === "cold") return "cold_wet" // Choc
    if (congestion === "dry" && perfusion === "warm") return "warm_dry" // Compensé
    if (congestion === "dry" && perfusion === "cold") return "cold_dry" // Hypovolémie/Bas débit
    return null
  }

  const profile = getProfile()

  const toggleComorbidity = (id: string) => {
    setComorbidities(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // --- RENDER HELPERS ---

  const renderRichCartridge = (title: string, subtitle: string, content: React.ReactNode, type: "rec" | "warn" | "info" = "info") => {
    const colors = {
      rec: "border-l-4 border-l-green-500 bg-green-50/50",
      warn: "border-l-4 border-l-orange-500 bg-orange-50/50",
      info: "border-l-4 border-l-blue-500 bg-blue-50/50"
    }

    return (
      <Card className={`mb-3 overflow-hidden shadow-sm ${colors[type]}`}>
        <CardContent className="p-0">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="text-left">
                  <h4 className="font-bold text-sm text-foreground">{title}</h4>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">{subtitle}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0 text-sm text-foreground/90">
                {content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <h1 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Guide Interactif ESC 2023
          </h1>
          <Badge variant="outline" className="text-xs">
            Step {step}/3
          </Badge>
        </div>
        {/* PROGRESS BAR */}
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <main className="container max-w-md mx-auto p-4 space-y-6">

        {/* --- STEP 1: DIAGNOSTIC & TRIAGE --- */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h2 className="font-bold text-blue-900 mb-2">1. Profilage Clinique (Champagne)</h2>
              <p className="text-sm text-blue-800 mb-4">Définir le phénotype pour orienter la prise en charge (Hospit vs Ambu).</p>

              <div className="grid grid-cols-2 gap-4">
                {/* CONGESTION */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
                    <Droplets className="h-3 w-3" /> Congestion ?
                  </label>
                  <button
                    onClick={() => setCongestion("wet")}
                    className={`w-full p-3 rounded-lg border text-sm font-bold transition-all ${congestion === "wet" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    HUMIDE (Wet)
                    <span className="block text-[10px] font-normal opacity-80">Râles, OMI, TJ</span>
                  </button>
                  <button
                    onClick={() => setCongestion("dry")}
                    className={`w-full p-3 rounded-lg border text-sm font-bold transition-all ${congestion === "dry" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    SEC (Dry)
                    <span className="block text-[10px] font-normal opacity-80">Eupneique, pas d'OMI</span>
                  </button>
                </div>

                {/* PERFUSION */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1">
                    <Thermometer className="h-3 w-3" /> Perfusion ?
                  </label>
                  <button
                    onClick={() => setPerfusion("warm")}
                    className={`w-full p-3 rounded-lg border text-sm font-bold transition-all ${perfusion === "warm" ? "bg-orange-500 text-white border-orange-500 shadow-md" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    CHAUD (Warm)
                    <span className="block text-[10px] font-normal opacity-80">TA Normale, Extrémités chaudes</span>
                  </button>
                  <button
                    onClick={() => setPerfusion("cold")}
                    className={`w-full p-3 rounded-lg border text-sm font-bold transition-all ${perfusion === "cold" ? "bg-cyan-600 text-white border-cyan-600 shadow-md" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    FROID (Cold)
                    <span className="block text-[10px] font-normal opacity-80">HypoTA, Marbrures</span>
                  </button>
                </div>
              </div>
            </div>

            {/* DYNAMIC DECISION BOX */}
            {profile && (
              <div className="animate-in zoom-in-50 duration-300">
                <Card className={`border-l-4 shadow-md ${profile === "warm_wet" || profile === "warm_dry" ? "border-l-green-500" : "border-l-red-500"}`}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      {profile === "warm_wet" && "Profil : Chaud & Humide"}
                      {profile === "cold_wet" && "Profil : Froid & Humide (Choc ?)"}
                      {profile === "warm_dry" && "Profil : Chaud & Sec (Compensé)"}
                      {profile === "cold_dry" && "Profil : Froid & Sec"}
                    </h3>

                    <div className="text-sm mt-2 text-slate-600 space-y-2">
                      {profile === "warm_wet" && (
                        <>
                          <p><strong>Orientation :</strong> <span className="text-orange-600 font-bold">Urgence / Hôpital de Jour</span> si détresse, sinon Ambulatoire renforcé.</p>
                          <p><strong>Action :</strong> Diurétiques de l'anse IV/PO + Optimisation Vasodilatateurs.</p>
                        </>
                      )}
                      {profile === "cold_wet" && (
                        <>
                          <p><strong>Orientation :</strong> <span className="text-red-600 font-bold">URGENCE ABSOLUE (USIC/Réa)</span>.</p>
                          <p><strong>Action :</strong> Inotropes, Support circulatoire. <span className="underline">Ne pas retarder le 15.</span></p>
                        </>
                      )}
                      {profile === "warm_dry" && (
                        <>
                          <p><strong>Orientation :</strong> <span className="text-green-600 font-bold">Ambulatoire (Suivi)</span>.</p>
                          <p><strong>Action :</strong> Optimisation des "4 Piliers" et titration.</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!profile}
              onClick={() => setStep(2)}
            >
              Étape Suivante : Traitement <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* --- STEP 2: STRATEGIE THERAPEUTIQUE (4 Pillars) --- */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">2. Les 4 Piliers (HFrEF)</h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Modifier</Button>
            </div>

            <p className="text-sm text-slate-500 mb-2">Cliquer sur les cartouches pour voir les détails de titration.</p>

            {/* 1. ARNI/IEC */}
            {renderRichCartridge(
              "1. Sacubitril/Valsartan (ARNI) ou IEC",
              "Classe I-A | Réduit mortalité & hospitalisations",
              <div className="space-y-2 pt-2">
                <div className="bg-slate-100 p-2 rounded text-xs">
                  <strong>Première intention :</strong> ARNI recommandé en remplacement des IEC si symptomatique malgré TTT optimal (ou d'emblée selon profil).
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>Entresto :</strong> Départ 24/26mg x2/j → Cible 97/103mg x2/j.</li>
                  <li><strong>Ramipril :</strong> Départ 1.25-2.5mg → Cible 10mg.</li>
                  <li><span className="text-red-500">Stop 36h</span> IEC avant introduction ARNI.</li>
                </ul>
              </div>,
              "rec"
            )}

            {/* 2. Beta-Bloquants */}
            {renderRichCartridge(
              "2. Bêta-Bloquants",
              "Classe I-A | Bisoprolol, Carvedilol, Metoprolol, Nebivolol",
              <div className="space-y-2 pt-2">
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>Introduire chez patient stabilisé (euvolémique).</li>
                  <li><strong>Bisoprolol :</strong> Départ 1.25mg → Cible 10mg (paliers 2 sem).</li>
                  <li>Surveillance : FC (&gt;50), TA, Asthénie initiale.</li>
                </ul>
              </div>,
              "rec"
            )}

            {/* 3. ARM (MRA) */}
            {renderRichCartridge(
              "3. ARM (Spironolactone/Eplerenone)",
              "Classe I-A | Indispensable si FEVG ≤ 35%",
              <div className="space-y-2 pt-2">
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>Dose :</strong> Départ 25mg → Cible 50mg.</li>
                  <li><span className="font-bold text-orange-600">Attention Hyperkaliémie :</span> Contrôle K+ et Créat à J7 et M1.</li>
                  <li>Contre-indication si K+ &gt; 5.0 ou DFG &lt; 30.</li>
                </ul>
              </div>,
              "rec"
            )}

            {/* 4. SGLT2i */}
            {renderRichCartridge(
              "4. SGLT2-inhibiteurs (Dapa/Empa)",
              "Classe I-A | Indépendant du diabète",
              <div className="space-y-2 pt-2">
                <p className="text-xs bg-green-100 p-2 rounded text-green-800 font-bold mb-2">
                  À introduire RAPIDEMENT (avant sortie hospit ou J1 ambu).
                </p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>Dapagliflozine / Empagliflozine :</strong> 10mg x1/j.</li>
                  <li>Pas de titration nécessaire !</li>
                  <li>Efficace FEVG réduite ET préservée.</li>
                  <li>Hygiène périnéale recommandée.</li>
                </ul>
              </div>,
              "rec"
            )}

            <Button
              className="w-full mt-4"
              size="lg"
              onClick={() => setStep(3)}
            >
              Étape Suivante : Comorbidités <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* --- STEP 3: COMORBIDITES & SUIVI --- */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">3. Comorbidités & Check-list</h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>Retour</Button>
            </div>

            <div className="space-y-3">
              {/* FERRITINE */}
              <div className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox id="iron" checked={comorbidities.includes("iron")} onCheckedChange={() => toggleComorbidity("iron")} />
                  <div className="space-y-1">
                    <label htmlFor="iron" className="text-sm font-bold block cursor-pointer">Carence Martiale (Fer)</label>
                    <p className="text-xs text-slate-500">Ferritine &lt; 100 µg/L (ou 100-299 avec TSAT &lt; 20%)</p>
                  </div>
                </div>
                {comorbidities.includes("iron") && (
                  <div className="mt-3 bg-blue-50 p-2 rounded text-xs text-blue-800 animate-in slide-in-from-top-1">
                    <strong>Reco ESC Class I :</strong> Ferric Carboxymaltose IV recommandé pour améliorer symptômes et qualité de vie.
                  </div>
                )}
              </div>

              {/* FA */}
              <div className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox id="af" checked={comorbidities.includes("af")} onCheckedChange={() => toggleComorbidity("af")} />
                  <div className="space-y-1">
                    <label htmlFor="af" className="text-sm font-bold block cursor-pointer">Fibrillation Atriale (FA)</label>
                    <p className="text-xs text-slate-500">Anticoagulation obligatoire (CHA2DS2-VASc)</p>
                  </div>
                </div>
                {comorbidities.includes("af") && (
                  <div className="mt-3 bg-blue-50 p-2 rounded text-xs text-blue-800 animate-in slide-in-from-top-1">
                    <p><strong>Stratégie :</strong> AOD préférés aux AVK.</p>
                    <p>Si IC décompensée : Discuter Cardioversion / Ablation (Castle-AF).</p>
                  </div>
                )}
              </div>

              {/* DIABETE / CKD */}
              <div className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
                <div className="flex items-start gap-3">
                  <Checkbox id="ckd" checked={comorbidities.includes("ckd")} onCheckedChange={() => toggleComorbidity("ckd")} />
                  <div className="space-y-1">
                    <label htmlFor="ckd" className="text-sm font-bold block cursor-pointer">Insuffisance Rénale (CKD)</label>
                    <p className="text-xs text-slate-500">DFG &lt; 60 mL/min/1.73m²</p>
                  </div>
                </div>
                {comorbidities.includes("ckd") && (
                  <div className="mt-3 bg-blue-50 p-2 rounded text-xs text-blue-800 animate-in slide-in-from-top-1">
                    <p>SGLT2i restent indiqués jusqu'à DFG 20 !</p>
                    <p>MRA : prudence si DFG &lt; 30 ou K+ &gt; 5.0.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 pb-8 space-y-4">
              <div className="bg-slate-100 rounded-lg p-4 text-center">
                <h4 className="font-bold text-slate-800 mb-1">Résumé ESC 2023</h4>
                <p className="text-xs text-slate-600">
                  HFrEF = 4 Piliers d'emblée + Diurétiques si congestion.<br />
                  Traitement intensif et rapide (Fast initiation).
                </p>
              </div>

              <Button className="w-full" variant="outline" onClick={() => { setStep(1); setCongestion(null); setPerfusion(null); setComorbidities([]) }}>
                Recommencer le parcours
              </Button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
