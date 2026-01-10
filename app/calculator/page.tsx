"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertCircle, CheckCircle, Phone, ExternalLink, X, ArrowRightLeft } from "lucide-react"
import Link from "next/link"

interface BNPInterpretation {
  level: string
  meaning: string
  recommendation: string
  color: string
}

interface LinkPopup {
  title: string
  url: string
  description: string
}

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<"bnp" | "nyha" | "acc" | "converters">("bnp")

  // BNP Calculator State
  const [bnpValue, setBnpValue] = useState<string>("")
  const [bnpResult, setBnpResult] = useState<BNPInterpretation | null>(null)

  // NYHA Classification State
  const [nyhaClass, setNyhaClass] = useState<number>(1)

  // ACC/AHA Diagnostic Score State
  const [accSymptoms, setAccSymptoms] = useState<number>(0)
  const [accBiomarkers, setAccBiomarkers] = useState<number>(0)
  const [accStructural, setAccStructural] = useState<number>(0)

  // Converter State
  const [creatMg, setCreatMg] = useState<string>("")
  const [creatUmol, setCreatUmol] = useState<string>("")

  // Emergency popup
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  // Link popup
  const [linkPopup, setLinkPopup] = useState<LinkPopup | null>(null)

  const clinicalLinks = [
    {
      title: "Directives ESC 2023",
      url: "https://academic.oup.com/eurheartj/article/44/39/3916/7282519",
      description: "Dernières recommandations ESC pour l'insuffisance cardiaque",
    },
    {
      title: "Critères ACC/AHA",
      url: "https://www.acc.org/",
      description: "Classification diagnostique ACC pour l'insuffisance cardiaque",
    },
    {
      title: "Échelle NYHA",
      url: "https://www.heart.org/",
      description: "American Heart Association - Classification fonctionnelle",
    },
  ]

  const interpretBNP = (value: number): BNPInterpretation => {
    if (value < 35) {
      return {
        level: "Normal",
        meaning: "BNP normal, IC peu probable",
        recommendation: "Rechercher d'autres causes des symptômes",
        color: "text-accent",
      }
    } else if (value < 100) {
      return {
        level: "Limite",
        meaning: "Résultat limite, pourrait être normal",
        recommendation: "Considérer une échocardiographie",
        color: "text-yellow-600",
      }
    } else if (value < 500) {
      return {
        level: "Élevé",
        meaning: "BNP élevé, IC possible",
        recommendation: "Effectuer une échocardiographie confirmée",
        color: "text-orange-600",
      }
    } else {
      return {
        level: "Très Élevé",
        meaning: "BNP très élevé, IC probable",
        recommendation: "Référer pour échocardiographie urgente",
        color: "text-destructive",
      }
    }
  }

  const handleBNPCalculate = () => {
    const value = Number.parseFloat(bnpValue)
    if (!isNaN(value) && value >= 0) {
      setBnpResult(interpretBNP(value))
    }
  }

  const getNyhaDescription = (classNum: number) => {
    const descriptions: Record<number, { title: string; description: string; color: string }> = {
      1: {
        title: "NYHA Classe I",
        description: "Pas de symptômes ou limitation lors d'activités ordinaires",
        color: "bg-green-100 border-green-300",
      },
      2: {
        title: "NYHA Classe II",
        description: "Symptômes légers et limitation légère lors d'activités ordinaires",
        color: "bg-yellow-100 border-yellow-300",
      },
      3: {
        title: "NYHA Classe III",
        description: "Symptômes marqués et limitation importante lors d'activités légères",
        color: "bg-orange-100 border-orange-300",
      },
      4: {
        title: "NYHA Classe IV",
        description: "Symptômes importants au repos, limitation sévère de toute activité",
        color: "bg-red-100 border-red-300",
      },
    }
    return descriptions[classNum]
  }

  const getACCDiagnosticScore = () => {
    const total = accSymptoms + accBiomarkers + accStructural
    let stage = ""
    let recommendation = ""
    let color = ""

    if (total === 0) {
      stage = "Stade A"
      recommendation = "À risque d'IC, pas de preuves d'IC structurelle"
      color = "bg-blue-100 border-blue-300"
    } else if (total === 1) {
      stage = "Stade B"
      recommendation = "IC structurelle sans symptômes actuels"
      color = "bg-yellow-100 border-yellow-300"
    } else if (total === 2) {
      stage = "Stade C"
      recommendation = "IC structurelle avec symptômes actuels ou passés"
      color = "bg-orange-100 border-orange-300"
    } else {
      stage = "Stade D"
      recommendation = "IC réfractaire, nécessitant intervention spécialisée"
      color = "bg-red-100 border-red-300"
    }

    return { stage, recommendation, color }
  }

  const handleCreatMgChange = (val: string) => {
    setCreatMg(val)
    const mg = parseFloat(val)
    if (!isNaN(mg)) {
      setCreatUmol((mg * 88.4).toFixed(1))
    } else {
      setCreatUmol("")
    }
  }

  const handleCreatUmolChange = (val: string) => {
    setCreatUmol(val)
    const umol = parseFloat(val)
    if (!isNaN(umol)) {
      setCreatMg((umol / 88.4).toFixed(2))
    } else {
      setCreatMg("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Button - Red emergency call button positioned sticky */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setEmergencyOpen(true)}
          className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-3 rounded-full shadow-lg font-semibold animate-pulse"
        >
          <Phone className="h-5 w-5" />
          <span>APPEL D'URGENCE</span>
        </button>
      </div>

      {/* Emergency Popup */}
      {emergencyOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-4 border-destructive">
            <CardHeader className="bg-destructive text-destructive-foreground">
              <div className="flex items-center justify-between">
                <CardTitle>Services d'Urgence</CardTitle>
                <button onClick={() => setEmergencyOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-bold text-lg">Appelez le 15 (SAMU)</p>
                  <p className="text-sm text-muted-foreground">Service d'Aide Médicale Urgente</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-bold text-lg">Appelez le 112</p>
                  <p className="text-sm text-muted-foreground">Numéro d'urgence Europe</p>
                </div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 text-sm">
                <p className="font-semibold text-yellow-900">Symptômes graves :</p>
                <ul className="mt-2 space-y-1 text-yellow-800 text-xs">
                  <li>• Dyspnée sévère au repos</li>
                  <li>• Douleur thoracique</li>
                  <li>• Syncope</li>
                  <li>• Trouble du rythme cardiaque</li>
                </ul>
              </div>
              <Button onClick={() => setEmergencyOpen(false)} className="w-full">
                Fermer
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Link Popup */}
      {linkPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{linkPopup.title}</CardTitle>
                <button onClick={() => setLinkPopup(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{linkPopup.description}</p>
              <a
                href={linkPopup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                Accéder <ExternalLink className="h-4 w-4" />
              </a>
              <Button onClick={() => setLinkPopup(null)} variant="outline" className="w-full">
                Fermer
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <h1 className="text-2xl font-bold">Outils & Calculs IC</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto lg:h-10 gap-2 lg:gap-0">
            <TabsTrigger value="bnp">BNP/proBNP</TabsTrigger>
            <TabsTrigger value="nyha">NYHA</TabsTrigger>
            <TabsTrigger value="acc">ACC/AHA</TabsTrigger>
            <TabsTrigger value="converters">Convertisseurs</TabsTrigger>
          </TabsList>

          {/* BNP Calculator */}
          <TabsContent value="bnp" className="space-y-4">
            <Card className="border-2 border-blue-300 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Calculateur BNP / proBNP</CardTitle>
                <CardDescription>Interprétation du peptide natriurétique B selon ESC 2023</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bnp-value" className="text-sm font-medium">
                    Valeur BNP (pg/mL)
                  </label>
                  <input
                    id="bnp-value"
                    type="number"
                    value={bnpValue}
                    onChange={(e) => setBnpValue(e.target.value)}
                    placeholder="Entrer la valeur BNP"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                  />
                </div>

                <Button onClick={handleBNPCalculate} className="w-full bg-primary">
                  Interpréter
                </Button>

                {bnpResult && (
                  <div className={`rounded-lg border-2 border-current ${bnpResult.color} space-y-2 p-4`}>
                    <div className="flex items-center gap-2">
                      {bnpResult.level === "Normal" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <h3 className="font-semibold">{bnpResult.level}</h3>
                    </div>
                    <p className="text-sm">{bnpResult.meaning}</p>
                    <p className="text-sm font-medium">{bnpResult.recommendation}</p>
                  </div>
                )}

                <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                  <p className="font-semibold">Valeurs de référence ESC 2023 :</p>
                  <ul className="mt-2 space-y-1">
                    <li>• &lt; 35 pg/mL : Normal</li>
                    <li>• 35-100 pg/mL : Limite</li>
                    <li>• &gt; 100 pg/mL : Suggère une IC</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NYHA Classification */}
          <TabsContent value="nyha" className="space-y-4">
            <Card className="border-2 border-green-300 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Classification NYHA</CardTitle>
                <CardDescription>Évaluation fonctionnelle de la limitation symptomatique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {[1, 2, 3, 4].map((cls) => (
                    <Button
                      key={cls}
                      onClick={() => setNyhaClass(cls)}
                      variant={nyhaClass === cls ? "default" : "outline"}
                      className={`justify-start text-left h-auto p-4 ${nyhaClass === cls ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}`}
                    >
                      <div className="flex-1">
                        <p className="font-bold">Classe {cls}</p>
                        <p className="text-xs opacity-90">
                          {cls === 1 && "Pas de limitation"}
                          {cls === 2 && "Limitation légère"}
                          {cls === 3 && "Limitation importante"}
                          {cls === 4 && "Symptômes au repos"}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>

                {nyhaClass && (
                  <div className={`rounded-lg border-2 p-4 ${getNyhaDescription(nyhaClass).color}`}>
                    <h3 className="font-bold text-lg">{getNyhaDescription(nyhaClass).title}</h3>
                    <p className="mt-2 text-sm">{getNyhaDescription(nyhaClass).description}</p>
                    <div className="mt-3 p-2 bg-white rounded text-xs text-muted-foreground">
                      <p className="font-semibold">Recommandation :</p>
                      <p>Adapter le traitement et le suivi selon la classe fonctionnelle</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACC/AHA Diagnostic Score */}
          <TabsContent value="acc" className="space-y-4">
            <Card className="border-2 border-purple-300 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900">Classification ACC/AHA</CardTitle>
                <CardDescription>Stades diagnostiques et pronostiques de l'insuffisance cardiaque</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold">Symptômes cliniques</label>
                    <div className="mt-2 flex gap-2">
                      {[0, 1].map((val) => (
                        <Button
                          key={val}
                          variant={accSymptoms === val ? "default" : "outline"}
                          onClick={() => setAccSymptoms(val)}
                          className={accSymptoms === val ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
                        >
                          {val === 0 ? "Absent" : "Présents"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold">Biomarqueurs (BNP/NT-proBNP)</label>
                    <div className="mt-2 flex gap-2">
                      {[0, 1].map((val) => (
                        <Button
                          key={val}
                          variant={accBiomarkers === val ? "default" : "outline"}
                          onClick={() => setAccBiomarkers(val)}
                          className={accBiomarkers === val ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
                        >
                          {val === 0 ? "Normal" : "Élevés"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold">Anomalies structurelles cardiaques</label>
                    <div className="mt-2 flex gap-2">
                      {[0, 1].map((val) => (
                        <Button
                          key={val}
                          variant={accStructural === val ? "default" : "outline"}
                          onClick={() => setAccStructural(val)}
                          className={accStructural === val ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
                        >
                          {val === 0 ? "Absent" : "Présentes"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {accSymptoms + accBiomarkers + accStructural > 0 && (
                  <div className={`rounded-lg border-2 p-4 ${getACCDiagnosticScore().color}`}>
                    <h3 className="font-bold text-lg">{getACCDiagnosticScore().stage}</h3>
                    <p className="mt-2 text-sm">{getACCDiagnosticScore().recommendation}</p>
                    <div className="mt-3 p-2 bg-white rounded text-xs text-muted-foreground">
                      <p className="font-semibold">Plan d'action :</p>
                      <p>
                        {getACCDiagnosticScore().stage === "Stade A" &&
                          "Prévention : contrôle HTA, activité physique, alimentation saine"}
                        {getACCDiagnosticScore().stage === "Stade B" &&
                          "Traitement de l'IC structurelle, surveillance régulière"}
                        {getACCDiagnosticScore().stage === "Stade C" &&
                          "Traitement optimal, hospitalisation si nécessaire"}
                        {getACCDiagnosticScore().stage === "Stade D" &&
                          "Avis cardiologique spécialisé, exploration des options avancées"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold">Stades ACC/AHA :</p>
                  <p>• Stade A: Risque, pas d'IC structurelle</p>
                  <p>• Stade B: IC structurelle asymptomatique</p>
                  <p>• Stade C: IC avec symptômes actuels/passés</p>
                  <p>• Stade D: IC réfractaire</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Converters Tab */}
          <TabsContent value="converters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Convertisseurs d'Unités</CardTitle>
                <CardDescription>Outils pratiques pour la pratique clinique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">

                  {/* Creatinine Converter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                      Créatinine
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">mg/dL</label>
                        <input
                          type="number"
                          value={creatMg}
                          onChange={(e) => handleCreatMgChange(e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">µmol/L</label>
                        <input
                          type="number"
                          value={creatUmol}
                          onChange={(e) => handleCreatUmolChange(e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
                    <p>Facteur de conversion : 1 mg/dL = 88.4 µmol/L</p>
                  </div>

                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        <Card className="mt-6 border-2 border-secondary">
          <CardHeader>
            <CardTitle className="text-secondary">Ressources Cliniques Interactives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {clinicalLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => setLinkPopup(link)}
                  className="p-4 rounded-lg border-2 border-secondary/30 hover:border-secondary bg-secondary/5 hover:bg-secondary/10 text-left transition-all"
                >
                  <p className="font-semibold text-secondary flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {link.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
