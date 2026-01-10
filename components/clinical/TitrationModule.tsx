"use client"

import { useState } from "react"
import {
    Syringe,
    ArrowRight,
    Activity,
    CheckCircle2,
    AlertTriangle,
    Calendar,
    Pill,
    HeartPulse,
    Stethoscope,
    TrendingUp,
    AlertOctagon
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TitrationModule() {

    // --- STEP 4: SIDE EFFECTS STATE ---
    const [problem, setProblem] = useState<string | null>(null)

    return (
        <div className="space-y-4">
            <div className="p-3 bg-purple-600 text-white rounded-lg flex items-center justify-between shadow-sm">
                <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" /> Optimisation Thérapeutique
                    </h3>
                    <p className="text-[10px] text-purple-100">Protocole de Titration ESC 2023</p>
                </div>
            </div>

            <Tabs defaultValue="step1" className="w-full">
                <TabsList className="grid w-full grid-cols-5 h-auto">
                    <TabsTrigger value="step1" className="text-[10px] py-2 flex flex-col gap-1">1. Init<br />Rapide</TabsTrigger>
                    <TabsTrigger value="step2" className="text-[10px] py-2 flex flex-col gap-1">2. Séquence<br />Add</TabsTrigger>
                    <TabsTrigger value="step3" className="text-[10px] py-2 flex flex-col gap-1">3. Doses<br />Cibles</TabsTrigger>
                    <TabsTrigger value="step4" className="text-[10px] py-2 flex flex-col gap-1">4. Effets<br />2nd</TabsTrigger>
                    <TabsTrigger value="step5" className="text-[10px] py-2 flex flex-col gap-1">5. Agenda<br />Suivi</TabsTrigger>
                </TabsList>

                {/* --- TAB 1: INITIALISATION RAPIDE --- */}
                <TabsContent value="step1" className="space-y-4 p-1 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-3">
                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                            <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Quadruple Thérapie D'emblée
                            </h4>
                            <p className="text-xs text-purple-800 mb-3">
                                Pour ICFEr (FEVG ≤ 40%). Débuter <strong>EN PARALLÈLE</strong> si possible (J0-J14).
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <Card className="bg-white border-purple-200">
                                    <CardContent className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Pill className="h-4 w-4 text-blue-600" />
                                            <span className="font-bold text-xs">ARNI</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500">Sacubitril/Valsartan</p>
                                        <p className="text-[10px] font-semibold mt-1">24/26 ou 49/51 mg x2/j</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-purple-200">
                                    <CardContent className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Pill className="h-4 w-4 text-cyan-500" />
                                            <span className="font-bold text-xs">iSGLT2</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500">Dapa/Empagliflozine</p>
                                        <p className="text-[10px] font-semibold mt-1">10 mg x1/j (Dose fixe)</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="p-3 border rounded-lg bg-slate-50 text-xs">
                            <strong>Check-list de Sécurité (J7-J14) :</strong>
                            <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600">
                                <li>Pression Artérielle systolique ≥ 95 mmHg.</li>
                                <li>Fonction Rénale (Créat stable, hausse ≤ 30% ok).</li>
                                <li>Kaliémie &lt; 5.5 mmol/L.</li>
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                {/* --- TAB 2: SEQUENCE D'AJOUT --- */}
                <TabsContent value="step2" className="space-y-4 p-1 animate-in fade-in slide-in-from-top-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Ajout Séquentiel (Semaines 3-6)</CardTitle>
                            <CardDescription className="text-xs">Une fois ARNI + iSGLT2 tolérés.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-xs">
                            <div className="flex items-start gap-3 relative pb-6 border-l-2 border-slate-200 ml-2 pl-4">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 border-2 border-white"></div>
                                <div>
                                    <strong className="text-blue-700">1. Ajouter Bêta-Bloquant</strong>
                                    <p className="text-slate-500 mt-1">Bisoprolol, Carvedilol, Metoprolol, Nebivolol.</p>
                                    <p className="text-[10px] text-slate-400">Si Eurovolemie & FC {'>'} 60bpm.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 relative border-l-2 border-transparent ml-2 pl-4">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                                <div>
                                    <strong className="text-green-700">2. Ajouter ARM</strong>
                                    <p className="text-slate-500 mt-1">Spironolactone ou Eplerenone.</p>
                                    <p className="text-[10px] text-slate-400">Si K+ &lt; 5.0 mmol/L.</p>
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-2 rounded text-yellow-800 border border-yellow-200 text-[11px] mt-2">
                                <strong className="block mb-1">Rythme d'introduction :</strong>
                                Nouvelle classe toutes les 2-4 semaines avec contrôle Bio/Clinique à chaque étape.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB 3: DOSES CIBLES --- */}
                <TabsContent value="step3" className="space-y-4 p-1 animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-slate-500 mb-2">Objectif : Titrer vers la dose maximale tolérée (Preuve de survie).</p>
                    <div className="border rounded-lg overflow-hidden text-xs">
                        <Table>
                            <TableHeader className="bg-slate-100">
                                <TableRow>
                                    <TableHead className="h-8">Molécule</TableHead>
                                    <TableHead className="h-8">Départ</TableHead>
                                    <TableHead className="h-8 font-bold text-purple-700">Cible</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Sacubitril/Valsartan</TableCell>
                                    <TableCell>49/51 mg x2</TableCell>
                                    <TableCell className="font-bold text-green-600">97/103 mg x2</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Bisoprolol</TableCell>
                                    <TableCell>1.25 mg x1</TableCell>
                                    <TableCell className="font-bold text-green-600">10 mg x1</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Carvedilol</TableCell>
                                    <TableCell>3.125 mg x2</TableCell>
                                    <TableCell className="font-bold text-green-600">25 mg x2</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Spironolactone</TableCell>
                                    <TableCell>25 mg x1</TableCell>
                                    <TableCell className="font-bold text-green-600">50 mg x1</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Dapagliflozine</TableCell>
                                    <TableCell>10 mg x1</TableCell>
                                    <TableCell className="font-bold text-green-600">10 mg x1</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                {/* --- TAB 4: SIDE EFFECTS --- */}
                <TabsContent value="step4" className="space-y-4 p-1 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <Button
                            variant={problem === 'hypo' ? "default" : "outline"}
                            className="text-xs h-auto py-2"
                            onClick={() => setProblem('hypo')}
                        >
                            Hypotension
                        </Button>
                        <Button
                            variant={problem === 'brady' ? "default" : "outline"}
                            className="text-xs h-auto py-2"
                            onClick={() => setProblem('brady')}
                        >
                            Bradycardie
                        </Button>
                        <Button
                            variant={problem === 'hyperk' ? "default" : "outline"}
                            className="text-xs h-auto py-2"
                            onClick={() => setProblem('hyperk')}
                        >
                            Hyperkaliémie
                        </Button>
                        <Button
                            variant={problem === 'renal' ? "default" : "outline"}
                            className="text-xs h-auto py-2"
                            onClick={() => setProblem('renal')}
                        >
                            Insuff. Rénale
                        </Button>
                    </div>

                    {problem && (
                        <Card className="animate-in zoom-in-95 bg-slate-50 border-2 border-slate-200">
                            <CardHeader className="p-3 pb-0">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <AlertOctagon className="h-4 w-4 text-red-500" /> Action Recommandée
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-2 text-xs space-y-2">
                                {problem === 'hypo' && (
                                    <>
                                        <p><strong>Si TAS &lt; 95 mmHg asymptomatique :</strong> Ne rien changer.</p>
                                        <p><strong>Si symptomatique :</strong></p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Arrêter les hypotenseurs non "Piliers" (Nitrés, IC, Alpha-bloquants).</li>
                                            <li>Réduire les diurétiques si pas de congestion.</li>
                                            <li>Fractionner les doses des Piliers.</li>
                                            <li><strong>Dernier recours :</strong> Réduire dose Piliers (ne pas arrêter).</li>
                                        </ul>
                                    </>
                                )}
                                {problem === 'brady' && (
                                    <>
                                        <p><strong>Si FC &lt; 50 bpm ou pauses :</strong></p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Éliminer causes (Digoxine, interactions).</li>
                                            <li>Réduire dose Bêta-Bloquant (Jamais d'arrêt brutal).</li>
                                            <li>Réévaluer ECG (BAV ?).</li>
                                        </ul>
                                    </>
                                )}
                                {problem === 'hyperk' && (
                                    <>
                                        <p><strong>K+ &gt; 5.5 mmol/L :</strong></p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Réduire de 50% la dose d'ARM.</li>
                                            <li>Vérifier régime / apports K+.</li>
                                        </ul>
                                        <p className="mt-2"><strong>K+ &gt; 6.0 mmol/L :</strong> Arrêter ARM temporairement.</p>
                                    </>
                                )}
                                {problem === 'renal' && (
                                    <>
                                        <p><strong>Hausse Créatinine :</strong></p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li><strong>&le; 50% de base :</strong> Tolérer, continuer.</li>
                                            <li><strong>&gt; 50% ou Créat &gt; 265 :</strong> Réduire dose IEC/ARA/ARNI/ARM.</li>
                                            <li>Vérifier déshydratation (baisser diurétiques).</li>
                                        </ul>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}
                    {!problem && <p className="text-center text-xs text-slate-400 italic py-4">Sélectionnez un problème pour voir la conduite à tenir.</p>}
                </TabsContent>

                {/* --- TAB 5: CALENDRIER --- */}
                <TabsContent value="step5" className="space-y-4 p-1 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2 relative border-l-2 border-slate-200 ml-3 pl-5 py-2">
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-slate-400 ring-4 ring-white"></span>
                            <h5 className="text-sm font-bold text-slate-800">J0 - Diagnostic</h5>
                            <p className="text-[10px] text-slate-500">Bilan initial, début ARNI+iSGLT2.</p>
                        </div>
                        <div className="relative pt-4">
                            <span className="absolute -left-[29px] top-5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white"></span>
                            <h5 className="text-sm font-bold text-slate-800">Semaine 2-4</h5>
                            <p className="text-[10px] text-slate-500">Ajout Bêta-Bloquant. Contrôle Bio.</p>
                        </div>
                        <div className="relative pt-4">
                            <span className="absolute -left-[29px] top-5 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white"></span>
                            <h5 className="text-sm font-bold text-slate-800">Semaine 4-6</h5>
                            <p className="text-[10px] text-slate-500">Ajout ARM (si K+ ok). Titration ARNI.</p>
                        </div>
                        <div className="relative pt-4">
                            <span className="absolute -left-[29px] top-5 h-3 w-3 rounded-full bg-purple-500 ring-4 ring-white"></span>
                            <h5 className="text-sm font-bold text-slate-800">Mois 3-6</h5>
                            <p className="text-[10px] text-slate-500">Doses Cibles atteintes. Réévaluation FEVG.</p>
                        </div>
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg text-xs space-y-2">
                        <strong>Traitements Additionnels :</strong>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            <li><strong>Fer IV :</strong> Si Ferritine &lt; 100 (ou &lt;300 + TSAT &lt;20%).</li>
                            <li><strong>Ivabradine :</strong> Si rythme sinusal, FC &ge; 70 bpm sous BB max.</li>
                        </ul>
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    )
}
