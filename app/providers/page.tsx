"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Provider {
  id: string
  name: string
  type: "cardiologist" | "secretary" | "ipa" | "center" | "emergency"
  speciality: string
  phone: string
  email: string
  address: string
  city: string
  postal_code: string
  hours?: string
  distance?: number
  available: boolean
}

// Sample data for MVP
const providersData: Provider[] = [
  {
    id: "1",
    name: "Dr. Sophie Martin",
    type: "cardiologist",
    speciality: "Cardiologie - Insuffisance Cardiaque",
    phone: "02 43 50 50 50",
    email: "s.martin@cardio-sarthe.fr",
    address: "123 rue de la Paix",
    city: "Le Mans",
    postal_code: "72000",
    hours: "Lun-Ven: 9h-18h",
    distance: 2.3,
    available: true,
  },
  {
    id: "2",
    name: "Dr. Pierre Leblanc",
    type: "cardiologist",
    speciality: "Cardiologie",
    phone: "02 43 51 51 51",
    email: "p.leblanc@cardio-sarthe.fr",
    address: "456 avenue du Commerce",
    city: "Alençon",
    postal_code: "61000",
    hours: "Lun-Ven: 8h-17h",
    distance: 45.2,
    available: true,
  },
  {
    id: "3",
    name: "Secrétariat PSS",
    type: "secretary",
    speciality: "Coordination des soins",
    phone: "02 43 52 52 52",
    email: "contact@pss-sarthe.fr",
    address: "789 rue du Centre",
    city: "Le Mans",
    postal_code: "72000",
    hours: "Lun-Ven: 9h-17h30",
    distance: 1.5,
    available: true,
  },
  {
    id: "4",
    name: "IPA Carole Dupont",
    type: "ipa",
    speciality: "Infirmière Spécialisée en IC",
    phone: "02 43 53 53 53",
    email: "c.dupont@ipa-sarthe.fr",
    address: "321 boulevard Saint-Michel",
    city: "Le Mans",
    postal_code: "72000",
    hours: "Lun-Sam: 8h-20h",
    distance: 3.1,
    available: true,
  },
  {
    id: "5",
    name: "Centre SOSAN",
    type: "center",
    speciality: "Rééducation cardiaque",
    phone: "02 43 54 54 54",
    email: "info@sosan-sarthe.fr",
    address: "654 chemin du Stade",
    city: "Le Mans",
    postal_code: "72000",
    hours: "Lun-Ven: 7h-19h",
    distance: 5.8,
    available: true,
  },
  {
    id: "6",
    name: "Urgences CHU",
    type: "emergency",
    speciality: "Urgences 24/7",
    phone: "02 43 43 43 43",
    email: "urgences@chu-sarthe.fr",
    address: "Hôpital du Centre",
    city: "Le Mans",
    postal_code: "72000",
    hours: "24/7",
    distance: 2.0,
    available: true,
  },
]

const getProviderTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    cardiologist: "Cardiologues",
    secretary: "Secrétariat",
    ipa: "Infirmières",
    center: "Centre",
    emergency: "Urgences",
  }
  return labels[type] || type
}

const getProviderTypeColor = (type: string): { badge: string; button: string } => {
  const colors: Record<string, { badge: string; button: string }> = {
    cardiologist: { badge: "bg-primary/10 text-primary", button: "border-primary/30" },
    secretary: { badge: "bg-secondary/10 text-secondary", button: "border-secondary/30" },
    ipa: { badge: "bg-accent/10 text-accent", button: "border-accent/30" },
    center: { badge: "bg-blue-500/10 text-blue-600", button: "border-blue-500/30" },
    emergency: { badge: "bg-destructive/10 text-destructive", button: "border-destructive/30" },
  }
  return colors[type] || { badge: "bg-muted text-muted-foreground", button: "border-muted" }
}

export default function ProvidersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProviders = useMemo(() => {
    let filtered = providersData

    if (activeTab !== "all") {
      filtered = filtered.filter((p) => p.type === activeTab)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }, [activeTab, searchQuery])

  const renderProviderCard = (provider: Provider) => {
    const colors = getProviderTypeColor(provider.type)

    return (
      <Card key={provider.id} className={`border-2 ${colors.button} transition-all hover:shadow-md`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{provider.name}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                  {getProviderTypeLabel(provider.type)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{provider.speciality}</p>
            </div>
            {provider.available && <div className="flex h-3 w-3 rounded-full bg-accent" title="Disponible" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${provider.phone}`} className="hover:text-foreground cursor-pointer font-medium">
                {provider.phone}
              </a>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${provider.email}`} className="hover:text-foreground">
                {provider.email}
              </a>
            </div>

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <div>{provider.address}</div>
                <div>
                  {provider.postal_code} {provider.city}
                </div>
                {provider.distance && <div className="text-xs">{provider.distance} km</div>}
              </div>
            </div>

            {provider.hours && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {provider.hours}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => (window.location.href = `tel:${provider.phone}`)}
            >
              Appeler
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => window.open(`mailto:${provider.email}`)}
            >
              Email
            </Button>
          </div>
        </CardContent>
      </Card>
    )
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
          <h1 className="text-2xl font-bold">Annuaire des Ressources</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Rechercher</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="Rechercher par nom ou ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </CardContent>
          </Card>

          {/* Filters */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="cardiologist">Cardiologues</TabsTrigger>
              <TabsTrigger value="secretary">Secrétariat</TabsTrigger>
              <TabsTrigger value="ipa">Infirmières</TabsTrigger>
              <TabsTrigger value="center">Centres</TabsTrigger>
              <TabsTrigger value="emergency">Urgences</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="space-y-4">
                {filteredProviders.length > 0 ? (
                  <div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {filteredProviders.length} résultat{filteredProviders.length !== 1 ? "s" : ""} trouvé
                      {filteredProviders.length !== 1 ? "s" : ""}
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredProviders.map(renderProviderCard)}
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">Aucun résultat trouvé</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">À propos de cet annuaire</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Cet annuaire regroupe les professionnels de santé et les ressources disponibles pour la prise en charge
                de l'insuffisance cardiaque en région Sarthe. Les coordonnées sont mises à jour régulièrement.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
