"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Package, Navigation } from "lucide-react"
import Image from "next/image"
import { doc, getDoc } from "firebase/firestore"
import { db, type StopDeskData } from "@/lib/firebase"
import { useParams } from "next/navigation"

export default function StopDeskPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [stopDeskData, setStopDeskData] = useState<StopDeskData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const uid = params.uid as string

  useEffect(() => {
    setIsVisible(true)
    fetchStopDeskData()
  }, [uid])

  const fetchStopDeskData = async () => {
    try {
      setLoading(true)
      const docRef = doc(db, "StopDesk", uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as StopDeskData
        setStopDeskData({ ...data, uid })
        console.log("[v0] StopDesk googleMapsLink:", data.googleMapsLink)
      } else {
        setError("StopDesk not found")
      }
    } catch (err) {
      console.error("Error fetching StopDesk data:", err)
      setError("Failed to load StopDesk data")
    } finally {
      setLoading(false)
    }
  }

  const openGoogleMaps = () => {
    if (stopDeskData?.googleMapsLink) {
      window.open(stopDeskData.googleMapsLink, "_blank")
    }
  }

  const callStopdesk = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error || !stopDeskData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md">
            <h1 className="text-xl font-bold text-red-800 mb-2">Erreur</h1>
            <p className="text-red-700">{error || "StopDesk introuvable"}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center justify-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
          >
            <Image
              src="/images/mm-express-logo.png"
              alt="M&M Express Logo"
              width={200}
              height={60}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-md">
          <div
            className={`text-center mb-6 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h1 className="text-xl font-bold text-green-800 mb-1">Votre Colis est Prêt!</h1>
              <p className="text-green-700 text-sm">Récupérez-le à notre stopdesk</p>
            </div>
          </div>

          <Card
            className={`mb-6 shadow-xl transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="bg-red-600 p-3 rounded-full inline-block mb-3">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-blue-900 mb-2">Point de Retrait</h2>
                <p className="text-gray-600 text-sm mb-4">M&M Express Stopdesk</p>

                <div className="text-center mb-4">
                  <p className="font-semibold text-blue-900 text-lg">{stopDeskData.address}</p>
                  {stopDeskData.city && stopDeskData.postalCode && (
                    <p className="text-gray-600">
                      {stopDeskData.postalCode} {stopDeskData.city}
                      {stopDeskData.country && `, ${stopDeskData.country}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid gap-3 mb-4">
                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                  <div className="bg-blue-900 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 text-sm mb-1">Contactez le Stopdesk</h3>
                    <div className="space-y-1">
                      {stopDeskData.phoneNumbers.map((phone, index) => (
                        <button
                          key={index}
                          onClick={() => callStopdesk(phone)}
                          className="block text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
                        >
                          {phone}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Updated hours display section */}
                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                  <div className="bg-blue-900 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm mb-1">Horaires d'Ouverture</h3>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Lun-Ven: 9h00 - 18h00</p>
                      <p>Sam: 9h00 - 17h00</p>
                      <p>Dim: Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`mb-6 shadow-xl transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full h-64 rounded-t-lg overflow-hidden">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(stopDeskData.address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="StopDesk Location"
                  />
                </div>
                <div className="p-4">
                  <Button
                    onClick={openGoogleMaps}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                    size="lg"
                  >
                    <Navigation className="mr-2 h-5 w-5" />
                    Ouvrir dans Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-blue-50 border-blue-200 transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Instructions de Retrait</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Présentez une pièce d'identité</li>
                <li>• Montrez ce SMS ou votre numéro de suivi</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-2">
            <Image
              src="/images/mm-express-logo.png"
              alt="M&M Express Logo"
              width={120}
              height={36}
              className="h-6 w-auto filter brightness-0 invert"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
