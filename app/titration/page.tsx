"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Clock, AlertTriangle, Target, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MedicationStep {
  name: string
  dose: string
  frequency: string
  monitoringDays: number
  maxDose: string
  considerations: string[]
}

interface TitrationProtocol {
  name: string
  class: string
  indication: string
  steps: MedicationStep[]
  monitoring: string[]
  contraindications: string[]
}

const titrationProtocols: TitrationProtocol[] = [
  {
    name: "ACE Inhibiteur / ARA2",
    class: "IEC/ARA2",
    indication: "IC réduite - Classe I",
    steps: [
      {
        name: "Initiation",
        dose: "Dose de départ faible",
        frequency: "1x/jour",
        monitoringDays: 3,
        maxDose: "Dose cible",
        considerations: ["Vérifier la PA", "Vérifier créatinine", "Surveiller K+"],
      },
      {
        name: "Titration semaine 1-2",
        dose: "50% de la dose cible",
        frequency: "1x/jour",
        monitoringDays: 7,
        maxDose: "Augmenter tous les 3 jours si toléré",
        considerations: ["ECG recommandé", "K+ normal", "PA ≥ 90 mmHg"],
      },
      {
        name: "Titration semaine 3-4",
        dose: "75% de la dose cible",
        frequency: "1x/jour",
        monitoringDays: 14,
        maxDose: "Dose cible recommandée",
        considerations: ["Bilan rénal normal", "Pas de toux", "Bien toléré"],
      },
      {
        name: "Maintenance",
        dose: "Dose cible",
        frequency: "1x/jour",
        monitoringDays: 30,
        maxDose: "Stable",
        considerations: ["Suivi tous les 3 mois", "Bilan rénal 1x/an", "Dosage K+"],
      },
    ],
    monitoring: ["Fréquence cardiaque", "PA systolique", "Créatinine", "Potassium", "Fonction rénale"],
    contraindications: ["K+ > 5.5 mEq/L", "PA systolique < 90 mmHg", "Créatinine > 3 mg/dL"],
  },
  {
    name: "Bêta-bloquant",
    class: "BB",
    indication: "IC réduite - Classe I",
    steps: [
      {
        name: "Initiation",
        dose: "Dose très faible",
        frequency: "1x/jour",
        monitoringDays: 3,
        maxDose: "Dose cible",
        considerations: ["FC > 50 bpm", "PA ≥ 90/60", "Pas de décompensation"],
      },
      {
        name: "Titration semaine 1",
        dose: "Doubler la dose",
        frequency: "1x/jour",
        monitoringDays: 7,
        maxDose: "Si bien toléré",
        considerations: ["FC stable", "Pas de bradycardie", "PA stable"],
      },
      {
        name: "Titration semaine 2-3",
        dose: "Doubler la dose à nouveau",
        frequency: "1x/jour",
        monitoringDays: 14,
        maxDose: "Dose cible",
        considerations: ["FC 50-60 bpm", "Symptômes stables", "ECG normal"],
      },
      {
        name: "Maintenance",
        dose: "Dose cible",
        frequency: "1x/jour",
        monitoringDays: 30,
        maxDose: "Stable",
        considerations: ["Suivi régulier", "FC cible : 50-60 bpm", "Adaptation si nécessaire"],
      },
    ],
    monitoring: ["Fréquence cardiaque", "PA", "Fatigue/Dyspnée", "Signes de décompensation", "ECG"],
    contraindications: ["FC < 50 bpm", "PA < 90/60 mmHg", "Signes de choc cardiogénique"],
  },
  {
    name: "Antagoniste RA (MRA)",
    class: "MRA",
    indication: "IC réduite - Classe II",
    steps: [
      {
        name: "Bilan pré-traitement",
        dose: "Vérifier K+ et créatinine",
        frequency: "Tests",
        monitoringDays: 1,
        maxDose: "K+ < 5 mEq/L",
        considerations: ["Fonction rénale normale", "Pas d'IEC/ARA2 seul"],
      },
      {
        name: "Initiation",
        dose: "Dose standard",
        frequency: "1x/jour",
        monitoringDays: 3,
        maxDose: "Selon recommandations",
        considerations: ["Prendre le matin", "Surveillance étroite", "Bilan à J3"],
      },
      {
        name: "Suivi semaine 1-2",
        dose: "Dose stable",
        frequency: "1x/jour",
        monitoringDays: 7,
        maxDose: "Pas d'ajustement initial",
        considerations: ["K+ contrôlé", "Créatinine stable", "Pas d'hyperkalémie"],
      },
      {
        name: "Maintenance",
        dose: "Dose cible",
        frequency: "1x/jour",
        monitoringDays: 30,
        maxDose: "Stable",
        considerations: ["K+ < 5.5 mEq/L", "Suivi tous les mois", "Bilan rénal tous les 6 mois"],
      },
    ],
    monitoring: ["Potassium", "Créatinine", "Fonction rénale", "PA", "Gynécomastie"],
    contraindications: ["K+ > 5 mEq/L", "Créatinine > 3 mg/dL", "Allergie"],
  },
  {
    name: "Inhibiteur SGLT2",
    class: "SGLT2i",
    indication: "IC réduite & conservée - Classe I/II",
    steps: [
      {
        name: "Initiation",
        dose: "Dose standard",
        frequency: "1x/jour le matin",
        monitoringDays: 1,
        maxDose: "Selon recommandations",
        considerations: ["Vérifier fonction rénale", "Pas de contre-indication", "Éduquer patient"],
      },
      {
        name: "Suivi court terme",
        dose: "Dose stable",
        frequency: "1x/jour",
        monitoringDays: 7,
        maxDose: "Pas d'ajustement",
        considerations: ["Absence d'effets secondaires", "Tolérance glycémique", "PA stable"],
      },
      {
        name: "Suivi moyen terme",
        dose: "Dose stable",
        frequency: "1x/jour",
        monitoringDays: 30,
        maxDose: "Optimal",
        considerations: ["Symptômes améliorés", "Fonction rénale stable", "Pas de DKA"],
      },
      {
        name: "Maintenance",
        dose: "Dose cible",
        frequency: "1x/jour",
        monitoringDays: 90,
        maxDose: "Stable",
        considerations: ["Suivi régulier", "Prévention infections urinaires", "Éducation diabète"],
      },
    ],
    monitoring: ["Glucose", "Fonction rénale", "Infections urinaires/génitales", "Cétose", "Hydratation"],
    contraindications: ["eGFR < 20", "Acidocétose diabétique", "Allergie"],
  },
]

export default function TitrationPage() {
  const [selectedProtocol, setSelectedProtocol] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const protocol = titrationProtocols[selectedProtocol]
  const step = protocol.steps[activeStep]

  const handleNextStep = () => {
    if (activeStep < protocol.steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <h1 className="text-2xl font-bold">Parcours de Titration</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid gap-4 lg:grid-cols-4">
          {/* Sidebar: Protocol Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-2">
              <p className="text-sm font-semibold">Sélectionner un médicament</p>
              {titrationProtocols.map((proto, idx) => (
                <Button
                  key={idx}
                  variant={selectedProtocol === idx ? "default" : "outline"}
                  className={`w-full justify-start text-left ${
                    selectedProtocol === idx ? "bg-primary" : "bg-transparent"
                  }`}
                  onClick={() => {
                    setSelectedProtocol(idx)
                    setActiveStep(0)
                  }}
                >
                  <div className="text-sm">
                    <p className="font-medium">{proto.class}</p>
                    <p className="text-xs opacity-75">{proto.name}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Protocol Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{protocol.name}</CardTitle>
                    <CardDescription>{protocol.indication}</CardDescription>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {protocol.class}
                  </span>
                </div>
              </CardHeader>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Progression du Protocole</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {protocol.steps.map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          idx <= activeStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span className="text-xs font-semibold">{idx + 1}</span>
                      </div>
                      {idx < protocol.steps.length - 1 && (
                        <div className={`h-1 w-8 ${idx < activeStep ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Step */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      {step.name}
                    </CardTitle>
                    <CardDescription>
                      Étape {activeStep + 1} sur {protocol.steps.length}
                    </CardDescription>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dosage Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Dose</p>
                    <p className="text-lg font-semibold">{step.dose}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Fréquence</p>
                    <p className="text-lg font-semibold">{step.frequency}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Suivi (jours)</p>
                    <p className="text-lg font-semibold">{step.monitoringDays}j</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Dose maximale</p>
                    <p className="text-lg font-semibold">{step.maxDose}</p>
                  </div>
                </div>

                {/* Considerations */}
                <div>
                  <p className="mb-2 text-sm font-semibold">Points importants</p>
                  <ul className="space-y-1">
                    {step.considerations.map((consideration, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Étape précédente
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={activeStep === protocol.steps.length - 1}
                    className="flex-1 bg-primary"
                  >
                    Étape suivante
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monitoring & Contraindications */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    Paramètres de Suivi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {protocol.monitoring.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contraindications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    Contre-indications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {protocol.contraindications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Protocol Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">À propos de ce protocole</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Ce protocole de titration suit les recommandations ESC 2026 pour le traitement de l'insuffisance
                  cardiaque. Les doses doivent être adaptées selon la tolérance individuelle et les paramètres cliniques
                  du patient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
