import { Building2, TrendingUp, Users, DollarSign, Car, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Style Guide" 
        onHelp={() => {}}
      />
      
      <main className="pt-16 px-6 lg:px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Carbonleo Design System
            </h1>
            <p className="text-lg text-muted-foreground">
              Style guide et composants pour le dashboard Royalmount
            </p>
          </div>

          {/* Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Palette de couleurs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-primary rounded-xl border"></div>
                <div className="text-sm">
                  <div className="font-medium">Primaire (Sarcelle)</div>
                  <div className="text-muted-foreground">#004642</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-accent rounded-xl border"></div>
                <div className="text-sm">
                  <div className="font-medium">Accent (Vert)</div>
                  <div className="text-muted-foreground">#00AC3C</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-success rounded-xl border"></div>
                <div className="text-sm">
                  <div className="font-medium">Succès</div>
                  <div className="text-muted-foreground">Performances positives</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-destructive rounded-xl border"></div>
                <div className="text-sm">
                  <div className="font-medium">Alerte</div>
                  <div className="text-muted-foreground">Attention requise</div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Typographie</h2>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Titre principal (H1)</h1>
                <p className="text-sm text-muted-foreground">Inter, 36px, font-bold</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Titre de section (H2)</h2>
                <p className="text-sm text-muted-foreground">Inter, 24px, font-semibold</p>
              </div>
              <div>
                <p className="text-base">Texte normal (Body)</p>
                <p className="text-sm text-muted-foreground">Inter, 16px, font-normal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Texte secondaire (Caption)</p>
                <p className="text-xs text-muted-foreground">Inter, 14px, text-muted-foreground</p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Boutons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Primaire</Button>
              <Button variant="secondary">Secondaire</Button>
              <Button variant="outline">Contour</Button>
              <Button variant="ghost">Fantôme</Button>
              <Button variant="destructive">Destructif</Button>
            </div>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Par défaut</Badge>
              <Badge variant="secondary">Secondaire</Badge>
              <Badge variant="outline">Contour</Badge>
              <Badge variant="destructive">Destructif</Badge>
            </div>
          </section>

          {/* KPI Cards */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Cartes KPI</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="Revenus nets (NOI)"
                value={2.4}
                format="currency"
                icon={DollarSign}
                trend={5.2}
                target={2.2}
                description="vs période précédente"
              />
              <KPICard
                title="Taux d'occupation"
                value={0.94}
                format="percentage"
                icon={Building2}
                trend={-1.2}
                target={0.95}
                variant="warning"
              />
              <KPICard
                title="NPS Score"
                value={65}
                format="number"
                icon={Star}
                trend={3.1}
                target={60}
                variant="success"
              />
            </div>
          </section>

          {/* Sample Chart */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Graphiques</h2>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Évolution des ventes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Graphique avec palette: Primaire #004642, Accent #00AC3C
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Usage Guidelines */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Guidelines d'usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Couleur Sarcelle (#004642)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Navigation et structure</p>
                  <p className="text-sm">• Headers et sections principales</p>
                  <p className="text-sm">• Éléments de branding</p>
                  <p className="text-sm">• Boutons principaux</p>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Couleur Verte (#00AC3C)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Indicateurs de succès</p>
                  <p className="text-sm">• Tendances positives</p>
                  <p className="text-sm">• Call-to-actions secondaires</p>
                  <p className="text-sm">• Accents et highlights</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Formats */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Formats de données</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Nombres</h3>
                  <div className="space-y-1 text-sm">
                    <div>1,234 → 1.2k</div>
                    <div>1,234,567 → 1.23M</div>
                    <div>0.876 → 87.6%</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Devises</h3>
                  <div className="space-y-1 text-sm">
                    <div>$1,234,567 → $1.23M</div>
                    <div>$1,200/pi²</div>
                    <div>Format CAD</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Pourcentages</h3>
                  <div className="space-y-1 text-sm">
                    <div>0.94 → 94.0%</div>
                    <div>Toujours 1 décimale</div>
                    <div>Signe + pour positif</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}