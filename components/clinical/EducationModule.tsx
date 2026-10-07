"use client"

import { useState } from "react"
import {
    BookOpen,
    Pill,
    Activity,
    AlertTriangle,
    Apple,
    FileText,
    Stethoscope,
    Scale,
    Heart,
    Droplets,
    CheckCircle2,
    AlertOctagon,
    Phone,
    Calendar,
    ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function EducationModule() {
    const [activeTab, setActiveTab] = useState("comprendre")

    // --- STATE FOR MODULE 3 (SURVEILLANCE) ---
    const [weightYesterday, setWeightYesterday] = useState<string>("")
    const [weightToday, setWeightToday] = useState<string>("")
    const [swelling, setSwelling] = useState(false)
    const [breathless, setBreathless] = useState(false)

    const getAlertLevel = () => {
        if (!weightToday || !weightYesterday) return "none"
        const diff = parseFloat(weightToday) - parseFloat(weightYesterday)
        if (diff >= 2 || swelling || breathless) return "red" // Urgence / Alerte Rapide logic simplified
        if (diff >= 1) return "orange"
        return "green"
    }

    const alertLevel = getAlertLevel()

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <div className="p-4 bg-blue-600 text-white shadow-md">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Mon Coach IC
                </h2>
                <p className="text-blue-100 text-sm">Programme d'Éducation Thérapeutique (ETP)</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                <div className="overflow-x-auto bg-white border-b shadow-sm z-10 w-full">
                    <TabsList className="w-full justify-start h-14 p-1 space-x-2 bg-transparent">
                        <TabsTrigger value="comprendre" className="flex-col gap-1 h-full px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                            <Heart className="h-4 w-4" />
                            <span className="text-[10px]">Comprendre</span>
                        </TabsTrigger>
                        <TabsTrigger value="traitements" className="flex-col gap-1 h-full px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                            <Pill className="h-4 w-4" />
                            <span className="text-[10px]">Traitements</span>
                        </TabsTrigger>
                        <TabsTrigger value="surveillance" className="flex-col gap-1 h-full px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                            <Activity className="h-4 w-4" />
                            <span className="text-[10px]">Surveillance</span>
                        </TabsTrigger>
                        <TabsTrigger value="alerte" className="flex-col gap-1 h-full px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-[10px]">Alerte</span>
                        </TabsTrigger>
                        <TabsTrigger value="hygiene" className="flex-col gap-1 h-full px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                            <Apple className="h-4 w-4" />
                            <span className="text-[10px]">Hygiène</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto p-4 max-h-[70vh]">

                    {/* MODULE 1: COMPRENDRE */}
                    <TabsContent value="comprendre" className="space-y-4 m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">C'est quoi l'Insuffisance Cardiaque ?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                                    <Heart className="h-10 w-10 text-blue-600" />
                                    <p className="text-sm text-blue-900 font-medium">
                                        "C'est la pompe cardiaque qui fatigue."<br />
                                        Elle n'arrive plus à envoyer assez de sang dans le corps.
                                    </p>
                                </div>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="types">
                                        <AccordionTrigger>Les 2 Types (FEVG) — ESC 2026</AccordionTrigger>
                                        <AccordionContent className="text-sm text-slate-600 space-y-2">
                                            <p><strong>ICFEr (Réduite &lt;50%) :</strong> La pompe est affaiblie (la catégorie « modérément réduite » 41-49% a été supprimée en 2026).</p>
                                            <p><strong>ICFEp (Préservée ≥50%) :</strong> La pompe est raide (remplissage difficile).</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="nyha">
                                        <AccordionTrigger>Classification NYHA (Essoufflement)</AccordionTrigger>
                                        <AccordionContent className="text-sm text-slate-600">
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li><strong>Classe I :</strong> Pas de gêne (effort normal).</li>
                                                <li><strong>Classe II :</strong> Gêne pour efforts importants (monter 2 étages).</li>
                                                <li><strong>Classe III :</strong> Gêne pour efforts légers (marcher à plat, s'habiller).</li>
                                                <li><strong>Classe IV :</strong> Gêne au repos.</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MODULE 2: TRAITEMENTS */}
                    <TabsContent value="traitements" className="space-y-4 m-0">
                        <h3 className="font-bold text-lg mb-2">Les 4 Piliers (HFrEF)</h3>
                        <div className="grid gap-3">
                            <Card className="border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-blue-700">1. ARNI / IEC / Sartans</h4>
                                        <Pill className="h-5 w-5 text-blue-300" />
                                    </div>
                                    <p className="text-xs text-slate-600">"Dilatent les vaisseaux pour faciliter le travail du cœur."</p>
                                    <div className="mt-2 bg-slate-100 p-2 rounded text-[10px]">
                                        <strong>Effets :</strong> Toux sèche (IEC), vertiges (Tension baisse).
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-green-500">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-green-700">2. Bêta-Bloquants</h4>
                                        <Activity className="h-5 w-5 text-green-300" />
                                    </div>
                                    <p className="text-xs text-slate-600">"Ralentissent le cœur pour l'économiser."</p>
                                    <div className="mt-2 bg-red-50 p-2 rounded text-[10px] text-red-700 font-bold border border-red-100">
                                        ⚠ NE JAMAIS ARRÊTER BRUTALEMENT ! Risque de rebond grave.
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-orange-700">3. ARM (Spironolactone)</h4>
                                        <Droplets className="h-5 w-5 text-orange-300" />
                                    </div>
                                    <p className="text-xs text-slate-600">"Empêche la fibrose (durcissement) du cœur et élimine un peu d'eau."</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-violet-500">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-violet-700">4. SGLT2-inhibiteurs</h4>
                                        <CheckCircle2 className="h-5 w-5 text-violet-300" />
                                    </div>
                                    <p className="text-xs text-slate-600">"Éliminent le sucre et le sel, protègent cœur et reins."</p>
                                    <div className="mt-2 bg-slate-100 p-2 rounded text-[10px]">
                                        <strong>Hygiène :</strong> Toilette intime importante (risque mycose).
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* MODULE 3: SURVEILLANCE & ALERTE INTELLIGENTE */}
                    <TabsContent value="surveillance" className="space-y-4 m-0">
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-slate-50 pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Scale className="h-5 w-5" /> Journal de Bord
                                </CardTitle>
                                <CardDescription>Entrez vos données ce matin (à jeun)</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="w-yesterday">Poids Hier (kg)</Label>
                                        <Input
                                            id="w-yesterday"
                                            type="number"
                                            placeholder="ex: 70.0"
                                            value={weightYesterday}
                                            onChange={(e) => setWeightYesterday(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="w-today">Poids Aujourd'hui (kg)</Label>
                                        <Input
                                            id="w-today"
                                            type="number"
                                            placeholder="ex: 71.5"
                                            value={weightToday}
                                            onChange={(e) => setWeightToday(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <Label className="text-base">Symptômes Nouveaux ?</Label>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant={swelling ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => setSwelling(!swelling)}
                                            className="flex-1"
                                        >
                                            {swelling ? "Oui, Œdèmes" : "Non, pas d'œdèmes"}
                                        </Button>
                                        <Button
                                            variant={breathless ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => setBreathless(!breathless)}
                                            className="flex-1"
                                        >
                                            {breathless ? "Oui, Essoufflé" : "Non, R.A.S"}
                                        </Button>
                                    </div>
                                </div>

                                {/* INTELLIGENT FEEDBACK */}
                                {(weightToday && weightYesterday) && (
                                    <div className={`mt-4 p-4 rounded-xl border-2 animate-in zoom-in-95 ${alertLevel === "red" ? "bg-red-50 border-red-200" :
                                            alertLevel === "orange" ? "bg-orange-50 border-orange-200" :
                                                "bg-green-50 border-green-200"
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            {alertLevel === "red" && <AlertOctagon className="h-8 w-8 text-red-600" />}
                                            {alertLevel === "orange" && <AlertTriangle className="h-8 w-8 text-orange-600" />}
                                            {alertLevel === "green" && <CheckCircle2 className="h-8 w-8 text-green-600" />}

                                            <div>
                                                <h4 className={`font-bold text-lg ${alertLevel === "red" ? "text-red-700" :
                                                        alertLevel === "orange" ? "text-orange-700" : "text-green-700"
                                                    }`}>
                                                    {alertLevel === "red" && "ALERTE : Contactez le Médecin !"}
                                                    {alertLevel === "orange" && "Attention : Surveillance Renforcée"}
                                                    {alertLevel === "green" && "Tout va bien"}
                                                </h4>
                                                <p className="text-xs text-slate-600">
                                                    Différence : {parseFloat(weightToday) - parseFloat(weightYesterday) > 0 ? "+" : ""}
                                                    {(parseFloat(weightToday) - parseFloat(weightYesterday)).toFixed(1)} kg
                                                </p>
                                            </div>
                                        </div>

                                        {alertLevel === "red" && (
                                            <Button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-bold" onClick={() => setActiveTab("alerte")}>
                                                Voir le Plan d'Urgence
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MODULE 4: ALERTE (PLAN D'ACTION) */}
                    <TabsContent value="alerte" className="space-y-4 m-0">
                        <h3 className="font-bold text-lg mb-2 text-center">Quand déclencher l'alerte ?</h3>

                        {/* RED ZONE */}
                        <Card className="bg-red-50 border-red-200 shadow-sm">
                            <CardContent className="p-4 flex gap-4">
                                <div className="bg-red-100 p-3 rounded-full h-fit">
                                    <Phone className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-700 text-lg uppercase">Urgence Absolue</h4>
                                    <p className="text-xs text-red-600 font-bold mb-2">Appeler le 15 immédiatement</p>
                                    <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                                        <li>Douleur thoracique (poitrine).</li>
                                        <li>Malaise, perte de connaissance.</li>
                                        <li>Détresse respiratoire (n'arrive plus à parler).</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ORANGE ZONE */}
                        <Card className="bg-orange-50 border-orange-200 shadow-sm">
                            <CardContent className="p-4 flex gap-4">
                                <div className="bg-orange-100 p-3 rounded-full h-fit">
                                    <Stethoscope className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-orange-700 text-lg uppercase">Alerte Rapide</h4>
                                    <p className="text-xs text-orange-600 font-bold mb-2">Contacter l'équipe / médecin (24h)</p>
                                    <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                                        <li>Prise de poids rapide (&gt; 2kg court terme).</li>
                                        <li>Essoufflement aggravé (orthopnée).</li>
                                        <li>Œdèmes nouveaux (chevilles gonflées).</li>
                                        <li>Réveil la nuit pour respirer.</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* GREEN ZONE */}
                        <Card className="bg-green-50 border-green-200 shadow-sm">
                            <CardContent className="p-4 flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit">
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-700 text-lg uppercase">Vigilance</h4>
                                    <p className="text-xs text-green-600 font-bold mb-2">À signaler prochaine consultation</p>
                                    <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                                        <li>Fatigue inhabituelle.</li>
                                        <li>Palpitations passagères.</li>
                                        <li>Toux sèche persistante (si IEC).</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MODULE 5: HYGIENE */}
                    <TabsContent value="hygiene" className="space-y-4 m-0">
                        <h3 className="font-bold text-lg mb-2">Mon Hygiène de Vie</h3>

                        <div className="grid gap-3">
                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <span className="text-xl">🧂</span> Sel & Alimentation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-sm text-slate-600 mb-2">
                                        Objectif : <strong>&lt; 5-6 g/jour</strong> de sel.
                                    </p>
                                    <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                                        <li>Ne pas resaler à table.</li>
                                        <li>Éviter plats industriels, charcuterie, fromage (max 30g/j).</li>
                                        <li>Utiliser épices, herbes, citron pour le goût.</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <span className="text-xl">💧</span> Liquides
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-sm text-slate-600 mb-2">
                                        Objectif : <strong>1.5 à 2 L/jour</strong> (tout compris).
                                    </p>
                                    <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                                        <li>Eau, café, thé, soupe, yaourt inclus !</li>
                                        <li>En cas de décompensation : Restreindre à 1 L - 1.2 L sur avis médical.</li>
                                        <li>En cas de canicule : Boire un peu plus (surveillance poids).</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <span className="text-xl">🏃</span> Activité Physique
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-sm text-slate-600 mb-2">
                                        Combattre la sédentarité !
                                    </p>
                                    <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                                        <li>Marche quotidienne (30 min).</li>
                                        <li>S'arrêter si essoufflement important.</li>
                                        <li>Réadaptation cardiaque recommandée.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}
