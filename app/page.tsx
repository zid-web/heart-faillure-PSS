"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { QuickAction } from "@/components/dashboard/QuickAction"
import {
  Activity,
  BookOpen,
  Calculator,
  Phone,
  Stethoscope,
  Users,
  FileText,
  TrendingUp,
  Heart,
  ClipboardList
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-20">
      {/* Hero Header */}
      <header className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
                CardioParcours <span className="text-red-600">Sarthe</span>
              </h1>
              <p className="text-sm text-slate-600 font-medium">
                Plateforme de prise en charge de l'insuffisance cardiaque
              </p>
            </div>
            <Badge variant="outline" className="text-xs font-semibold">
              ESC 2023
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Statistics Overview */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Vue d'ensemble</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Parcours disponibles"
              value={3}
              icon={Activity}
              variant="primary"
              trend="neutral"
            />
            <StatsCard
              title="Outils cliniques"
              value={8}
              icon={Stethoscope}
              variant="success"
              trend="up"
              trendValue="+2"
            />
            <StatsCard
              title="Calculateurs"
              value={5}
              icon={Calculator}
              variant="default"
              trend="neutral"
            />
            <StatsCard
              title="Protocoles ESC"
              value={12}
              icon={FileText}
              variant="danger"
              trend="up"
              trendValue="+3"
            />
          </div>
        </section>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="text-sm font-semibold">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-sm font-semibold">
              Outils cliniques
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm font-semibold">
              Ressources
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuickAction
                  title="Parcours Patient"
                  description="Gérer les 3 phases de prise en charge : diagnostic, stabilisation, suivi chronique"
                  icon={Activity}
                  href="/parcours"
                  gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
                  badge="ESC 2023"
                />
                <QuickAction
                  title="Recommandations ESC"
                  description="Protocoles thérapeutiques basés sur les dernières guidelines européennes"
                  icon={BookOpen}
                  href="/algorithms"
                  gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                  badge="Mis à jour"
                />
                <QuickAction
                  title="Calculateurs"
                  description="Scores pronostiques, conversions de doses et outils d'aide à la décision"
                  icon={Calculator}
                  href="/calculator"
                  gradient="bg-gradient-to-br from-violet-500 to-purple-700"
                />
                <QuickAction
                  title="Annuaire CPTS"
                  description="Contacts des professionnels de santé du réseau Sarthe"
                  icon={Phone}
                  href="/parcours"
                  gradient="bg-gradient-to-br from-orange-500 to-red-600"
                />
              </div>
            </section>

            {/* Expert Consultation CTA */}
            <section>
              <DashboardCard
                title="Avis Expert - OmniDoc"
                description="Télé-expertise cardiologique rapide. Obtenez un avis spécialisé en moins de 24h pour vos patients complexes."
                icon={Stethoscope}
                variant="default"
                interactive={true}
                onClick={() => window.open('https://omnidoc.fr', '_blank')}
              >
                <div className="mt-4">
                  <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                    Accéder à OmniDoc →
                  </button>
                </div>
              </DashboardCard>
            </section>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Outils de prise en charge</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard
                  title="Titration"
                  description="Protocole d'optimisation des 4 piliers thérapeutiques"
                  icon={TrendingUp}
                  href="/parcours"
                  variant="primary"
                  badge="Nouveau"
                />
                <DashboardCard
                  title="Diurétiques"
                  description="Gestion de la résistance aux diurétiques et protocoles IV"
                  icon={Activity}
                  href="/parcours"
                  variant="success"
                />
                <DashboardCard
                  title="Éducation Patient"
                  description="Supports et protocoles d'éducation thérapeutique"
                  icon={Users}
                  href="/parcours"
                  variant="default"
                />
                <DashboardCard
                  title="Pronostic"
                  description="Scores MAGGIC, BCN Bio-HF, Seattle Heart Failure Model"
                  icon={Heart}
                  href="/calculator"
                  variant="danger"
                />
                <DashboardCard
                  title="Surveillance"
                  description="Critères de décompensation et protocoles de monitoring"
                  icon={ClipboardList}
                  href="/parcours"
                  variant="default"
                />
                <DashboardCard
                  title="Conversions"
                  description="Équivalences de doses entre molécules et voies d'administration"
                  icon={Calculator}
                  href="/calculator"
                  variant="default"
                />
              </div>
            </section>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Ressources documentaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DashboardCard
                  title="Guidelines ESC 2023"
                  description="Recommandations complètes sur l'insuffisance cardiaque HFrEF/HFmrEF/HFpEF"
                  icon={BookOpen}
                  href="/algorithms"
                  variant="primary"
                  badge="2023"
                />
                <DashboardCard
                  title="Algorithmes décisionnels"
                  description="Arbres de décision pour le diagnostic et la thérapeutique"
                  icon={FileText}
                  href="/algorithms"
                  variant="success"
                />
                <DashboardCard
                  title="Protocoles CPTS"
                  description="Parcours de soins coordonnés et circuits de prise en charge locaux"
                  icon={Users}
                  href="/parcours"
                  variant="default"
                />
                <DashboardCard
                  title="Contacts d'urgence"
                  description="Annuaire des services cardio/urgences du département"
                  icon={Phone}
                  href="/parcours"
                  variant="danger"
                />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
