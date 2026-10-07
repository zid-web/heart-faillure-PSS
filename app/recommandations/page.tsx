"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SHFM_OFFICIAL_URL } from "@/components/clinical/PrognosticTools"

function Fact({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-slate-700">{children}</li>
}

function Block({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {title}
          {badge && <Badge variant="outline" className="text-[10px]">{badge}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  )
}

export default function RecommandationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-24">
      <header className="border-b bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" aria-label="Retour"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Recommandations & Savoirs</h1>
            <p className="text-xs text-slate-600">ESC 2026 · ACC/AHA · Cours ACCSAP 2026</p>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6">
        <Tabs defaultValue="esc">
          <TabsList className="grid grid-cols-4 w-full h-auto">
            <TabsTrigger value="esc" className="text-xs">ESC 2026</TabsTrigger>
            <TabsTrigger value="acc" className="text-xs">ACC / AHA</TabsTrigger>
            <TabsTrigger value="epi" className="text-xs">Épidémiologie</TabsTrigger>
            <TabsTrigger value="prono" className="text-xs">Pronostic</TabsTrigger>
          </TabsList>

          {/* ---------------- ESC 2026 ---------------- */}
          <TabsContent value="esc" className="space-y-4 mt-4">
            <Block title="Classification" badge="ESC 2026">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>ICFEr</strong> : FEVG &lt; 50 % avec symptômes et/ou signes d'IC.</Fact>
                <Fact><strong>ICFEp</strong> : FEVG ≥ 50 %.</Fact>
                <Fact>La catégorie <strong>ICFEmr (41-49 %) est supprimée</strong> : retour à deux phénotypes.</Fact>
                <Fact>Nouveau <strong>staging A–D</strong>, de la prévention (stade A) à l'IC avancée (stade D).</Fact>
                <Fact>L'« IC aiguë » devient <strong>IC décompensée</strong> (cadre : phase initiale, stabilisation, pré/post-sortie).</Fact>
                <Fact>« GDMT » remplacé par <strong>traitement médical fondamental</strong> et <strong>traitement médical additionnel</strong> ; « traitement interventionnel » regroupe CRT, TEER mitral, etc.</Fact>
              </ul>
            </Block>
            <Block title="Principales recommandations" badge="ESC 2026">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>ARM : classe I</strong> dans l'IC chronique, <strong>quelle que soit la FEVG</strong>.</Fact>
                <Fact><strong>Bêtabloquant</strong> recommandé au <strong>stade B</strong> avec FEVG &lt; 50 % (réduction des hospitalisations / décès).</Fact>
                <Fact><strong>Éplérénone</strong> après infarctus avec FEVG ≤ 40 % et signes d'IC ou diabète.</Fact>
                <Fact><strong>Sémaglutide / tirzépatide : classe IIa</strong> en cas d'ICFEp avec obésité (première recommandation pour les incrétines).</Fact>
                <Fact>Prévention : <strong>PAS cible &lt; 130 mmHg</strong> (HTA ou stade B).</Fact>
                <Fact>Décompensation : <strong>iSGLT2 débuté à l'hôpital</strong> après stabilisation ; <strong>diurèse guidée par la natriurèse</strong> précoce.</Fact>
                <Fact><strong>Exercice personnalisé</strong> au long cours chez tout patient stable, hors contre-indication.</Fact>
              </ul>
            </Block>
            <p className="text-xs text-muted-foreground">
              Synthèse d'après le résumé de la guideline ESC 2026 (Eur Heart J, doi:10.1093/eurheartj/ehag100). Se référer au texte complet pour les classes/niveaux de preuve détaillés et les doses.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="https://doi.org/10.1093/eurheartj/ehag100" target="_blank" rel="noopener noreferrer">
                Texte complet ESC 2026 <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </TabsContent>

          {/* ---------------- ACC / AHA ---------------- */}
          <TabsContent value="acc" className="space-y-4 mt-4">
            <Block title="Stades ACC/AHA/HFSA (2022)">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>A</strong> – à risque d'IC (HTA, coronaropathie, diabète, cardiotoxiques, ATCD familiaux de cardiomyopathie).</Fact>
                <Fact><strong>B</strong> – pré-IC : cardiopathie structurelle sans symptôme (ex. IDM ancien, dysfonction VG asymptomatique, valvulopathie).</Fact>
                <Fact><strong>C</strong> – IC symptomatique (actuelle ou passée).</Fact>
                <Fact><strong>D</strong> – IC avancée, réfractaire au traitement maximal, nécessitant des interventions spécialisées.</Fact>
              </ul>
            </Block>
            <Block title="Définition universelle 2026" badge="AHA/ACC/ESC/WHF">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>Trois catégories : <strong>IC à FEVG réduite</strong>, <strong>IC à FEVG préservée</strong>, <strong>IC à FEVG améliorée</strong> (fin des seuils numériques arbitraires).</Fact>
                <Fact><strong>ICFEam</strong> (cours ACCSAP) : FEVG antérieure ≤ 40 %, gain ≥ 10 points, puis FEVG &gt; 40 % ; pronostic meilleur, <strong>poursuite du traitement</strong> recommandée.</Fact>
              </ul>
            </Block>
            <Block title="ECDP ACC 2026 – ICFEp" badge="ACC 2026">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>Intègre les essais favorables des <strong>iSGLT2</strong>, des <strong>ARM non stéroïdiens</strong> et des <strong>thérapies à base d'incrétines</strong> dans la prise en charge de l'ICFEp.</Fact>
              </ul>
            </Block>
            <Button asChild variant="outline" className="w-full">
              <a href="https://www.jacc.org/doi/10.1016/j.jacc.2026.06.018" target="_blank" rel="noopener noreferrer">
                ECDP ACC 2026 ICFEp <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </TabsContent>

          {/* ---------------- EPIDEMIOLOGIE (ACCSAP) ---------------- */}
          <TabsContent value="epi" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground bg-blue-50 border border-blue-100 rounded p-2">
              Source : ACCSAP 2026 – « Epidemiology, Risk Factors, and Comorbidities » (M. Fudim, ACC). Données surtout américaines. Les seuils de FEVG du cours (ICFEr ≤ 40 %, ICFEmr 41-49 %) sont ceux de la classification ACC/AHA, différente de l'ESC 2026.
            </p>
            <Block title="Prévalence & incidence">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>≈ 6 M d'adultes ≥ 20 ans aux États-Unis (2,4 %) ; projection +46 % de 2012 à 2030 (&gt; 8 M, ≈ 3 %) ; &gt; 60 M dans le monde.</Fact>
                <Fact>Dysfonction VG asymptomatique : 3-6 % (jusqu'à 21 % selon les études) ; repérer une FEVG ≤ 40 % permet d'instaurer un traitement qui ralentit la progression.</Fact>
                <Fact>Risque vie entière à 45 ans : 20-45 % selon sexe et origine.</Fact>
                <Fact>Incidence ≈ 20/1 000 après 65 ans ; ≈ 1 M de nouveaux cas/an chez les ≥ 55 ans. Les femmes représentent ≈ la moitié de la charge (espérance de vie).</Fact>
              </ul>
            </Block>
            <Block title="Répartition des types d'IC">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>ICFEp</strong> : 50-55 % des IC, plus âgés, plus de femmes ; morbi-mortalité comparable à l'ICFEr ; le sexe masculin reste un prédicteur indépendant de décès.</Fact>
                <Fact><strong>ICFEmr</strong> (41-49 %) : ≈ 15 %, phénotype proche de l'ICFEp sauf charge coronarienne élevée ; réponse aux traitements possiblement proche de l'ICFEr.</Fact>
                <Fact><strong>ICFEam</strong> (améliorée) : meilleur pronostic ; poursuivre le traitement.</Fact>
              </ul>
            </Block>
            <Block title="Mortalité & hospitalisations">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>≈ 50 % de décès à 5 ans ; létalité à 5 ans après hospitalisation ≈ 42 % (ARIC). L'IC figure sur ≈ 1 certificat de décès sur 8.</Fact>
                <Fact>≈ 800 000 hospitalisations/an (États-Unis) ; réadmission à 30 jours ≈ 30 % (≥ 65 ans) ; à 90 jours jusqu'à 47 %.</Fact>
                <Fact>Plus de la moitié des admissions seraient potentiellement évitables ; ≈ 20 % des patients n'ont aucune perte de poids pendant l'hospitalisation ; l'observance baisse 2-4 mois après la sortie.</Fact>
                <Fact>
                  Critères de sortie : traiter les facteurs aggravants, volémie quasi optimale, optimiser traitements et dispositifs, gérer les comorbidités, éduquer patient et proches, <strong>consultation de suivi dans les 7 jours</strong>.
                </Fact>
                <Fact>IC avancée (NYHA IIIb-IV) : ≈ 150-250 000 patients &lt; 75 ans sur 3-3,5 M d'ICFEr — greffe, assistance, DAI/CRT, inotropes, centres spécialisés.</Fact>
              </ul>
            </Block>
            <Block title="Impact économique">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>2012 : &gt; 30 Md$ (68 % coûts médicaux directs) ; projection 2030 : 69,7 Md$ (+127 %). Coût d'une admission : 6 000-12 000 $.</Fact>
                <Fact>Indicateurs de qualité : consignes de sortie, sevrage tabagique, FEVG documentée, IEC/ARA2/ARNI, bêtabloquant, ARM, hydralazine/nitrés, DAI/CRT, anticoagulation si FA, vaccinations, RDV ≤ 7 jours.</Fact>
              </ul>
            </Block>
            <Block title="Facteurs de risque">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Coronaropathie</strong> : 60-75 % des IC symptomatiques (devance l'HTA dans les pays développés) ; ATCD d'IDM : risque d'IC ×5 à 5 ans ; sous-diagnostiquée dans l'ICFEp (la coronarographie peut être préférable aux tests d'effort).</Fact>
                <Fact><strong>HTA / HVG</strong> : risque relatif +40 % ; le risque vie entière double si PA &gt; 160/90 vs &lt; 140/90 ; HVG à l'ECG dans ≈ 20 % des IC (60-70 % à l'écho).</Fact>
                <Fact><strong>Âge</strong> : incidence maximale &gt; 75 ans, souvent ≥ 3 comorbidités.</Fact>
                <Fact><strong>Sexe / origine</strong> : risque vie entière d'ICFEr ≈ 2× plus élevé chez l'homme ; ICFEp similaire H/F (≈ 10 %), ≈ 1,5× plus élevé chez les non-Noirs.</Fact>
                <Fact><strong>Diabète</strong> : +20 %/décennie ; intolérance au glucose : ×4 (H) et ×8 (F) ; facteur indépendant de décès (SOLVD, RESOLVD).</Fact>
                <Fact><strong>Insuffisance rénale</strong> : DFG &lt; 44 mL/min ≈ ×3 de mortalité, indépendamment de la FEVG et de la NYHA.</Fact>
                <Fact><strong>Obésité</strong> : HR ≈ 1,9 (H) et 2,12 (F) ; relation graduée avec l'IMC.</Fact>
                <Fact><strong>Anémie</strong> (4-50 % des IC) : RR de décès 1,131 par g/dL d'Hb en moins ; RED-HF : darbépoétine sans bénéfice.</Fact>
                <Fact><strong>Troubles du rythme</strong> : FA chez 10 % des NYHA I-II et jusqu'à 40 % des NYHA III-IV ; tachycardiomyopathie réversible.</Fact>
                <Fact><strong>Statut socio-économique</strong> bas : plus de réhospitalisations et de décès (HR ≈ 1,4) ; soins ambulatoires essentiels.</Fact>
                <Fact>Autres : valvulopathies (7-8 %), dysthyroïdie, carence en thiamine, cardiopathie rhumatismale (Asie, Afrique).</Fact>
              </ul>
            </Block>
            <Block title="Comorbidités : mise à jour thérapeutique">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Fer IV</strong> si carence martiale (avec ou sans anémie) : classe 2b (ACC/AHA 2022) ; données AFFIRM-AHF, HEART-FID ; soutenu par l'ESC.</Fact>
                <Fact><strong>Apnée centrale + ICFEr</strong> : ventilation auto-asservie = <strong>classe 3 (nuisible)</strong> (SERVE-HF).</Fact>
                <Fact><strong>iSGLT2</strong> : bénéfice dans l'ICFEr avec ou sans diabète (DAPA-HF, EMPEROR-Reduced) et dans l'ICFEp (EMPEROR-Preserved).</Fact>
                <Fact><strong>aGLP-1</strong> (liraglutide, sémaglutide) : moins d'hospitalisations pour IC, bénéfices au-delà du contrôle glycémique.</Fact>
              </ul>
            </Block>
          </TabsContent>

          {/* ---------------- PRONOSTIC ---------------- */}
          <TabsContent value="prono" className="space-y-4 mt-4">
            <Block title="Seattle Heart Failure Model (SHFM)">
              <p className="text-sm text-slate-700">
                Algorithme pronostique le plus utilisé (cours ACCSAP), développé rétrospectivement puis validé prospectivement. Facteurs pronostiques :
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <Fact>NYHA avancée, étiologie ischémique, dose élevée de diurétiques, FEVG altérée</Fact>
                <Fact>PAS basse, hyponatrémie, anémie, % de lymphocytes, acide urique élevé, cholestérol total bas (« épidémiologie inverse »)</Fact>
                <Fact>Autres : FA, chocs appropriés du DAI, hospitalisations pour IC, urée, paramètres hémodynamiques, VO₂ pic et VE/VCO₂</Fact>
              </ul>
              <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded p-2">
                Modèle de 2006, antérieur aux iSGLT2, ARNI et finérénone : peut sous-estimer la survie sous traitement moderne.
              </p>
              <Button asChild className="w-full">
                <a href={SHFM_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
                  Ouvrir le calculateur SHFM officiel <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/parcours">Calculateur intégré (Parcours → Suivi intensif)</Link>
              </Button>
            </Block>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
