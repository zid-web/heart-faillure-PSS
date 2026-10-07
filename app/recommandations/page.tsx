"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SHFM_OFFICIAL_URL } from "@/components/clinical/PrognosticTools"
import { H2fpefCalculator, HfpefAbaCalculator } from "@/components/clinical/HfpefTools"

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
          <TabsList className="grid grid-cols-5 w-full h-auto">
            <TabsTrigger value="esc" className="text-[11px] px-1">ESC 2026</TabsTrigger>
            <TabsTrigger value="acc" className="text-[11px] px-1">ACC/AHA</TabsTrigger>
            <TabsTrigger value="hfpef" className="text-[11px] px-1">ICFEp 2026</TabsTrigger>
            <TabsTrigger value="epi" className="text-[11px] px-1">Épidémio</TabsTrigger>
            <TabsTrigger value="prono" className="text-[11px] px-1">Pronostic</TabsTrigger>
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
              <p className="text-sm text-slate-700">
                Mise à jour de l'ECDP 2023, alignée sur la guideline AHA/ACC/HFSA 2022. Détail dans l'onglet <strong>ICFEp 2026</strong> (diagnostic, scores, traitement, doses).
              </p>
            </Block>
            <Button asChild variant="outline" className="w-full">
              <a href="https://www.jacc.org/doi/10.1016/j.jacc.2026.06.018" target="_blank" rel="noopener noreferrer">
                ECDP ACC 2026 ICFEp <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </TabsContent>

          {/* ---------------- ICFEp ACC 2026 ---------------- */}
          <TabsContent value="hfpef" className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground bg-blue-50 border border-blue-100 rounded p-2">
              Source : Kittleson MM et al. <em>Management of HFpEF: 2026 ACC Expert Consensus Decision Pathway</em>, JACC 2026 (doi:10.1016/j.jacc.2026.06.018). Document ambulatoire ; ICFEp = FEVG ≥ 50 %. Ne remplace pas le jugement clinique.
            </p>

            <Block title="Diagnostic" badge="ACC 2026">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>Définition universelle : symptômes/signes d'IC d'origine cardiaque structurelle ou fonctionnelle <strong>et</strong> ≥ 1 de : peptides natriurétiques élevés, ou preuve objective de congestion cardiogénique.</Fact>
                <Fact>Aucun test unique n'est définitif ; <strong>les peptides natriurétiques peuvent être normaux</strong> (obésité, sexe masculin, origine, résistance à l'insuline) : une valeur normale n'exclut pas l'ICFEp.</Fact>
                <Fact><strong>Stratégie</strong> : H₂FPEF en dépistage, puis HFA-PEFF pour confirmer ; si discordance, examens avancés. En pratique, un <strong>essai thérapeutique</strong> du traitement optimal est raisonnable si test d'effort diastolique/hémodynamique non disponibles.</Fact>
                <Fact>HFpEF-ABA : dépistage en soins primaires (âge, IMC, FA), sans échocardiographie.</Fact>
                <Fact>Un score bas avec forte probabilité clinique impose un bilan complémentaire ; beaucoup de patients tombent en zone « intermédiaire ».</Fact>
              </ul>
            </Block>

            <Card className="shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">Score H₂FPEF</CardTitle>
                <CardDescription>Obésité 2 · HTA 1 · FA 3 · HTP 1 · Âge 1 · Pressions de remplissage 1</CardDescription></CardHeader>
              <CardContent><H2fpefCalculator /></CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">Score HFpEF-ABA</CardTitle>
                <CardDescription>Âge · IMC · Fibrillation atriale</CardDescription></CardHeader>
              <CardContent><HfpefAbaCalculator /></CardContent>
            </Card>

            <Block title="Diagnostics différentiels (mimics)">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Non cardiaques</strong> : pathologie pulmonaire (EFR, imagerie, cathétérisme droit), maladie rénale, états à haut débit (anémie, hépatopathie, hyperthyroïdie, fistule AV), obésité (IC masquée jusqu'à 40 % en population, jusqu'à 70 % en population adressée), fragilité / déconditionnement.</Fact>
                <Fact><strong>Cardiaques</strong> : valvulopathies (sténose aortique, IM, RM), constriction péricardique, cardiomyopathies infiltrantes/restrictives (<strong>amylose</strong> – dépistage protéine monoclonale + scintigraphie, sarcoïdose, hémochromatose, Fabry), cardiomyopathie hypertrophique et phénocopies, cardiopathie ischémique / dysfonction microvasculaire.</Fact>
                <Fact>L'ICFEp est un diagnostic d'exclusion ; ne pas manquer les mimics qui ont un traitement spécifique (amylose TTR, etc.).</Fact>
              </ul>
            </Block>

            <Block title="Spécificités chez la femme">
              <ul className="list-disc pl-4 space-y-1">
                <Fact>ICFEp plus fréquente que l'ICFEr ; plus âgées, dyspnée et qualité de vie plus altérées ; risque attribuable plus élevé de l'HTA, du diabète de type 2 et de l'obésité.</Fact>
                <Fact>Facteurs propres : troubles hypertensifs de la grossesse, diabète gestationnel, infertilité, ménopause précoce.</Fact>
                <Fact>Peptides natriurétiques physiologiquement plus élevés, mais plus bas que chez l'homme en cas d'ICFEp (surtout adiposité centrale) ; remodelage concentrique, FEVG plus élevée.</Fact>
              </ul>
            </Block>

            <Block title="Traitement médical optimal" badge="Fig. 6 – ACC 2026">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Base</strong> : <strong>iSGLT2</strong> (pierre angulaire) + <strong>ARM non stéroïdien</strong> (finérénone), sauf contre-indication → ↓ décès CV et hospitalisations pour IC, amélioration de l'état de santé.</Fact>
                <Fact><strong>iSGLT2</strong> : dapagliflozine ou empagliflozine 10 mg/j (DELIVER, EMPEROR-Preserved) ; possible dès la phase hospitalière ; sotagliflozine : bénéfice seulement chez le diabétique de type 2 récemment hospitalisé.</Fact>
                <Fact><strong>ARM</strong> : la <strong>finérénone est le choix privilégié</strong> (FINEARTS-HF, FDA juillet 2025 pour FEVG ≥ 40 %) ; spironolactone = alternative raisonnable si coût/tolérance (TOPCAT : bénéfice en Amérique du Nord) ; éplérénone non étudiée dans l'ICFEp (alternative si gynécomastie). SPIRIT-HF (résumé) : pas de bénéfice net, davantage d'hypotension et d'hyperkaliémie.</Fact>
                <Fact><strong>Incrétines</strong> si IMC ≥ 30 : sémaglutide (FEVG ≥ 45 %) ou tirzépatide (FEVG ≥ 50 %) → amélioration des symptômes, de la capacité à l'effort et possible réduction des événements d'IC ; perte de poids ≈ 11-13 % à 1 an. À associer à exercice et soutien nutritionnel (risque d'obésité sarcopénique).</Fact>
                <Fact><strong>ARNI</strong> (sacubitril/valsartan) : raisonnable chez la femme ou si FEVG &lt; 57 % (bénéfice sur les hospitalisations dans PARAGON-HF), surtout si contrôle tensionnel supplémentaire utile ; sinon <strong>ARA2</strong> (candésartan, CHARM-Preserved) en alternative, notamment chez l'hypertendu. <strong>Pas d'IEC</strong> (PEP-CHF).</Fact>
                <Fact><strong>Diurétiques de l'anse</strong> à la dose minimale efficace. <strong>Bêtabloquants</strong> : aucun bénéfice démontré, parfois mal tolérés (incompétence chronotrope) → limiter aux indications (angor, contrôle de fréquence de FA), à la dose minimale.</Fact>
                <Fact>Initier et titrer précocement ; l'initiation précoce réduit hospitalisations et décès (STRONG-HF).</Fact>
              </ul>
            </Block>

            <Block title="Doses de départ et cibles" badge="Tableau 4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-left border-b"><th className="py-1 pr-2">Molécule</th><th className="pr-2">Départ</th><th>Cible</th></tr></thead>
                  <tbody className="[&_td]:py-1 [&_td]:pr-2 [&_tr]:border-b">
                    <tr><td>Dapagliflozine</td><td>10 mg/j</td><td>10 mg/j</td></tr>
                    <tr><td>Empagliflozine</td><td>10 mg/j</td><td>10 mg/j</td></tr>
                    <tr><td>Sotagliflozine*</td><td>200 mg/j</td><td>400 mg/j</td></tr>
                    <tr><td>Spironolactone</td><td>25 mg/j</td><td>50 mg/j</td></tr>
                    <tr><td>Finérénone (DFG 25-&lt;60)</td><td>10 mg/j</td><td>20 mg/j</td></tr>
                    <tr><td>Finérénone (DFG ≥ 60)</td><td>20 mg/j</td><td>40 mg/j</td></tr>
                    <tr><td>Sémaglutide (SC)</td><td>0,25 mg/sem</td><td>2,4 mg/sem</td></tr>
                    <tr><td>Tirzépatide (SC)</td><td>2,5 mg/sem</td><td>15 mg/sem</td></tr>
                    <tr><td>Sacubitril/valsartan</td><td>24/26 mg ×2/j</td><td>97/103 mg ×2/j</td></tr>
                    <tr><td>Candésartan</td><td>4-8 mg/j</td><td>32 mg/j</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-muted-foreground">
                *Sotagliflozine : bénéfice démontré seulement chez le diabétique de type 2 récemment hospitalisé. Titration incrétines (toutes les 4 sem. si toléré) : sémaglutide 0,25 → 0,5 → 1,0 → 1,7 → 2,4 mg ; tirzépatide 2,5 → 5 → 7,5 → 10 → 12,5 → 15 mg.
              </p>
            </Block>

            <Block title="Contre-indications et précautions" badge="Tableau 5">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>iSGLT2</strong> : CI diabète de type 1, grossesse, allaitement ; prudence DFG &lt; 25 (dapagliflozine) / &lt; 20 (empagliflozine), mycoses et infections urinaires, hypovolémie/hypotension, acidocétose, IRA, gangrène de Fournier (rare).</Fact>
                <Fact><strong>Spironolactone</strong> : CI K⁺ ≥ 5,0 mmol/L, DFG &lt; 30 ou créatinine ≥ 2,5 mg/dL, Addison, grossesse ; prudence si autres médicaments hyperkaliémiants (suppléments de K⁺, IEC/ARA2/ARNI, AINS, triméthoprime).</Fact>
                <Fact><strong>Finérénone</strong> : CI DFG &lt; 25, K⁺ ≥ 5,0, inhibiteurs/inducteurs forts ou modérés du CYP3A4, Addison, grossesse.</Fact>
                <Fact><strong>Incrétines</strong> : CI ATCD personnel/familial de cancer médullaire de la thyroïde ou NEM2, grossesse, allaitement ; prudence : effets digestifs sévères, gastroparésie, maladie biliaire aiguë, pancréatite aiguë, hypoglycémie sous insuline/sulfamide, aspiration à l'anesthésie.</Fact>
                <Fact><strong>ARNI</strong> : CI association à un IEC (délai 36 h), ATCD d'angioedème, grossesse, insuffisance hépatique sévère (Child-Pugh C) ; dose de départ réduite de moitié si pas d'IEC/ARA2 ou faible dose, DFG &lt; 30, Child-Pugh B, sténose de l'artère rénale, hypotension.</Fact>
              </ul>
            </Block>

            <Block title="Prise en charge non médicamenteuse">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Exercice</strong> : améliore capacité à l'effort et qualité de vie (3-4 mois : HIIT, entraînement continu modéré, aérobie + résistance, ou +2 000 pas/jour) ; pas de preuve sur hospitalisations/décès ; soutenir l'adhésion.</Fact>
                <Fact><strong>Obésité</strong> : restriction calorique ± exercice (effets additifs sur la capacité à l'effort), incrétines, chirurgie bariatrique à considérer ; distinguer de la perte de poids involontaire (fragilité, cachexie), de mauvais pronostic.</Fact>
                <Fact><strong>Moniteur de pression artérielle pulmonaire implantable</strong> (CardioMEMS, Cordella) : réduit les hospitalisations dans certains essais (CHAMPION, MONITOR-HF) ; à envisager si ≥ 1 hospitalisation et NYHA III persistante sous traitement optimal, volémie labile, syndrome cardio-rénal, ou comorbidités rendant le diagnostic difficile ; en centre capable de suivre les données.</Fact>
                <Fact><strong>Autres dispositifs</strong> (shunts interatriaux, ablation du nerf splanchnique, stimulation) : bénéfice non établi ; shunt : plus d'événements CV dans RELIEVE-HF.</Fact>
              </ul>
            </Block>

            <Block title="Comorbidités (approche cardio-rénale-métabolique)">
              <ul className="list-disc pl-4 space-y-1">
                <Fact><strong>Coronaropathie</strong> (&gt; 50 % des ICFEp) : prévention secondaire (statine haute intensité, antiplaquettaire, PA) ; iSGLT2 ou aGLP-1 si diabète de type 2.</Fact>
                <Fact><strong>FA</strong> (jusqu'à 41 %) : contrôle du rythme / ablation possible si symptômes liés à la FA ; contrôle de fréquence prudent (incompétence chronotrope) ; iSGLT2 et aGLP-1 réduisent l'incidence/la charge de FA.</Fact>
                <Fact><strong>HTA</strong> (jusqu'à 90 %) : <strong>PAS cible 120-129 mmHg</strong> (PAS ≥ 140 et &lt; 120 associées à plus d'événements) ; ARNI ou ARA2 = options pragmatiques.</Fact>
                <Fact><strong>IRC</strong> (jusqu'à 60 %) : IRS (IEC/ARA2), iSGLT2, ARM non stéroïdien, aGLP-1 ralentissent la progression rénale.</Fact>
                <Fact><strong>Diabète de type 2</strong> (jusqu'à 50 %) : remplacer les agents sans bénéfice cardiaque (sulfamides) par iSGLT2/aGLP-1 ; <strong>éviter saxagliptine, alogliptine et thiazolidinediones</strong> (↑ événements d'IC).</Fact>
                <Fact><strong>Obésité</strong> (jusqu'à 80 %) : approche multidisciplinaire (nutrition, exercice, incrétines, chirurgie bariatrique).</Fact>
                <Fact>Le cumul de comorbidités cardio-métaboliques augmente le risque d'hospitalisation (+23 % pour une seule sévère, +57 % pour 2-3).</Fact>
              </ul>
            </Block>

            <Block title="Essais pivots (ICFEp)" badge="Tableau 3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-left border-b"><th className="py-1 pr-2">Essai</th><th className="pr-2">Agent</th><th>Critère principal (HR)</th></tr></thead>
                  <tbody className="[&_td]:py-1 [&_td]:pr-2 [&_tr]:border-b">
                    <tr><td>DELIVER</td><td>Dapagliflozine</td><td>0,82 (0,73-0,92)</td></tr>
                    <tr><td>EMPEROR-Preserved</td><td>Empagliflozine</td><td>0,79 (0,69-0,90)</td></tr>
                    <tr><td>FINEARTS-HF</td><td>Finérénone</td><td>0,82 (0,71-0,94)</td></tr>
                    <tr><td>TOPCAT</td><td>Spironolactone</td><td>0,89 (0,77-1,04)</td></tr>
                    <tr><td>PARAGON-HF</td><td>Sacubitril/valsartan</td><td>0,87 (0,75-1,01)</td></tr>
                    <tr><td>CHARM-Preserved</td><td>Candésartan</td><td>0,86 (0,74-1,00)</td></tr>
                    <tr><td>SUMMIT</td><td>Tirzépatide</td><td>0,62 (0,41-0,95)</td></tr>
                    <tr><td>STEP-HFpEF</td><td>Sémaglutide</td><td>KCCQ-CSS +7,8 pts ; poids −10,7 %</td></tr>
                  </tbody>
                </table>
              </div>
            </Block>

            <Button asChild variant="outline" className="w-full">
              <a href="https://www.jacc.org/doi/10.1016/j.jacc.2026.06.018" target="_blank" rel="noopener noreferrer">
                ECDP ACC 2026 ICFEp (texte complet) <ExternalLink className="ml-2 h-4 w-4" />
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
