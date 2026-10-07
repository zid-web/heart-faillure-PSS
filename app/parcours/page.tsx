"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  FileText,
  ArrowRight,
  HeartPulse,
  Syringe,
  Activity,
  Calculator,
  Calendar,
  Stethoscope,
  BookOpen,
  BedDouble,
  CalendarClock
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// --- IMPORTS ---
import {
  SicaCalculator,
  EssicCalculator,
  DfgCalculator,
  TitrationHelper,
  MaggicCalculator,
  ShfmCalculator
} from '@/components/clinical/PrognosticTools'
import { EducationModule } from '@/components/clinical/EducationModule'
import { DiureticTool } from '@/components/clinical/DiureticTool'
import { TitrationModule } from '@/components/clinical/TitrationModule'

// --- Types & Data ---

type PhaseStatus = 'pending' | 'active' | 'completed'

interface PhaseItemProps {
  step: number
  title: string
  icon: any
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function PhaseItem({ step, title, icon: Icon, active, onClick, children }: PhaseItemProps) {
  return (
    <div className={`relative pl-8 pb-8 border-l-2 ${active ? 'border-primary' : 'border-slate-200'} last:border-l-0`}>
      <div
        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${active ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`}
      />
      <div className="mb-2 flex items-center gap-2 cursor-pointer" onClick={onClick}>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
          Phase {step}
        </span>
        <h3 className={`font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{title}</h3>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${active ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  )
}

function ContactChip({ role, name, phone }: { role: string; name: string; phone: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
      <div>
        <p className="text-xs font-bold text-slate-700">{role}</p>
        <p className="text-xs text-slate-500">{name}</p>
      </div>
      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" asChild>
        <a href={`tel:${phone}`}><Phone className="h-4 w-4" /></a>
      </Button>
    </div>
  )
}

function CalculatorTrigger({ title, icon: Icon, children, wide }: { title: string; icon: any; children: React.ReactNode; wide?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto py-3 px-4 flex flex-col items-center gap-1 min-w-[100px] hover:border-primary hover:bg-primary/5">
          <Icon className="h-6 w-6 text-primary" />
          <span className="text-xs font-bold text-center leading-tight">{title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className={`${wide ? "max-w-3xl" : "max-w-md"} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Main Page ---

export default function ParcoursPage() {
  const [activePhase, setActivePhase] = useState(1)

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Parcours Patient
          </h1>
          <Badge variant="secondary" className="text-xs font-normal">
            Sarthe 72
          </Badge>
        </div>
      </div>

      <main className="container max-w-md mx-auto p-4 pt-6">

        <div className="space-y-0">

          {/* Phase 1: Détection & Triage */}
          <PhaseItem
            step={1}
            title="Détection & Triage"
            icon={Activity}
            active={activePhase === 1}
            onClick={() => setActivePhase(1)}
          >
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Signes d'Alerte (EPOF)
                  </h4>
                  <ul className="text-xs text-red-700 space-y-1 list-disc pl-4">
                    <li><strong>E</strong>ssoufflement (Dyspnée d'effort/Décubitus)</li>
                    <li><strong>P</strong>rise de poids ({'>'} 2kg / 3j)</li>
                    <li><strong>O</strong>edèmes (OMI, Prise de poids)</li>
                    <li><strong>F</strong>atigue anormale</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-auto py-2 flex flex-col gap-1" asChild>
                    <Link href="/algorithms">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="text-xs">Guide ESC 2026</span>
                    </Link>
                  </Button>
                  <CalculatorTrigger title="Score SICA" icon={Calculator}>
                    <SicaCalculator />
                  </CalculatorTrigger>
                </div>
              </CardContent>
            </Card>
          </PhaseItem>

          {/* Phase 2: Adressage */}
          <PhaseItem
            step={2}
            title="Adressage & Orientation"
            icon={MapPin}
            active={activePhase === 2}
            onClick={() => setActivePhase(2)}
          >
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-slate-600 mb-2">
                  Adresser au cardiologue ou aux urgences selon gravité.
                </p>
                <div className="space-y-2">
                  <ContactChip role="Urgences Cardio (Le Mans)" name="Dr de garde" phone="0243434343" />
                  <ContactChip role="CPTS Sarthe Nord" name="Coordinateur" phone="0200000000" />
                </div>
                <Button className="w-full text-xs" size="sm">
                  <MapPin className="mr-2 h-3 w-3" /> Trouver Cardiologue Proche
                </Button>
              </CardContent>
            </Card>
          </PhaseItem>

          {/* Phase 3: Hospitalisation (Aigu) */}
          <PhaseItem
            step={3}
            title="Hospitalisation (Aigu)"
            icon={BedDouble}
            active={activePhase === 3}
            onClick={() => setActivePhase(3)}
          >
            <Card className="shadow-sm border-l-4 border-l-red-500">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">Gestion Décompensation</h4>
                    <p className="text-xs text-muted-foreground">Objectif : Devenir "Sec & Chaud"</p>
                  </div>
                  <Badge variant="destructive">Urgence</Badge>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <h5 className="text-xs font-bold text-red-800 mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Critères d'Hospitalisation (ESC)
                  </h5>
                  <ul className="text-[10px] text-red-700 list-disc pl-3 leading-tight space-y-1">
                    <li>Instabilité hémodynamique (PAS &lt; 90mmHg).</li>
                    <li>Détresse respiratoire (SpO2 &lt; 90%).</li>
                    <li>Arythmie ventriculaire ou FA sévère.</li>
                    <li>Échec du traitement diurétique oral.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <CalculatorTrigger title="Score Urgence" icon={Activity}>
                    <EssicCalculator />
                  </CalculatorTrigger>
                  <CalculatorTrigger title="Protocole Diurétiques" icon={Syringe}>
                    <DiureticTool />
                  </CalculatorTrigger>
                </div>

                <div className="space-y-3 mt-4">
                  {/* SURVEILLANCE & OBJECTIFS */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h5 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
                      <Activity className="h-3 w-3" /> Surveillance & Objectifs (ESC 2026)
                    </h5>
                    <div className="grid grid-cols-1 gap-2 text-[11px] text-blue-800">
                      <div className="flex gap-2 items-start">
                        <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 px-1 py-0 shrink-0">Clinique</Badge>
                        <p>Poids (Objectif "Sec"), Bilan E/S, OMI, Crépitants, PVJ.</p>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 px-1 py-0 shrink-0">Bio</Badge>
                        <p>Iono (Na/K) + Créat/Urée (quotidien).</p>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 px-1 py-0 shrink-0">Écho</Badge>
                        <p><strong>VCI &lt; 2.1cm</strong> + Collaps &gt; 50% = Euvolémie.</p>
                      </div>
                    </div>
                  </div>

                  {/* TRANSITION & SORTIE */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <h5 className="text-xs font-bold text-green-900 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Transition & Sortie
                    </h5>
                    <ul className="text-[11px] text-green-800 space-y-1.5 list-disc pl-3">
                      <li>
                        <strong>4 Piliers :</strong> Initier dès stabilité (PAS &gt; 100, pas d'IRA).
                      </li>
                      <li>
                        <strong>Relais Per Os :</strong> Convertir quand stable. <br />
                        <span className="opacity-80 italic">Règle : 40mg IV = 80mg PO (Bioéquivalence ~50%).</span>
                      </li>
                      <li>
                        <strong>ETP Sortie :</strong> Régime hyposodé (&lt;5g), Plan d'action remis.
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PhaseItem>

          {/* Phase 4: Titration */}
          <PhaseItem
            step={4}
            title="Optimisation (Titration)"
            icon={Syringe}
            active={activePhase === 4}
            onClick={() => setActivePhase(4)}
          >
            <Card className="shadow-sm border-purple-100 overflow-hidden">
              {/* Embed the FULL Interactive Titration Module */}
              <div className="w-full">
                <TitrationModule />
              </div>
            </Card>
          </PhaseItem>

          {/* Phase 5: Education */}
          <PhaseItem
            step={5}
            title="Éducation Thérapeutique"
            icon={BookOpen}
            active={activePhase === 5}
            onClick={() => setActivePhase(5)}
          >
            <Card className="shadow-sm border-blue-100 overflow-hidden">
              <div className="h-[600px] w-full">
                <EducationModule />
              </div>
            </Card>
          </PhaseItem>

          {/* Phase 6: Suivi */}
          <PhaseItem
            step={6}
            title="Suivi Intensif"
            icon={CalendarClock}
            active={activePhase === 6}
            onClick={() => setActivePhase(6)}
          >
            <Card className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Outils Pronostiques Avancés</p>
                </div>
                <div className="flex gap-2">
                  <CalculatorTrigger title="MAGGIC Score" icon={Calculator}>
                    <MaggicCalculator />
                  </CalculatorTrigger>
                  <CalculatorTrigger title="Seattle HF Model" icon={Activity}>
                    <ShfmCalculator />
                  </CalculatorTrigger>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-100 mt-2">
                  <h4 className="text-xs font-bold text-green-800 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Rythme de Suivi
                  </h4>
                  <ul className="text-[10px] text-green-700 list-disc pl-3">
                    <li><strong>Post-Hospit :</strong> J7-J14 (Bio + Clinique).</li>
                    <li><strong>Titration :</strong> Toutes les 2 semaines.</li>
                    <li><strong>Stable :</strong> Tous les 3-6 mois.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </PhaseItem>

        </div>
      </main>
    </div>
  )
}
