"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import {
  Upload,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  FileImage,
  Download,
  User,
  Building2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"

export default function Comparativo() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [downloadLinks, setDownloadLinks] = useState<{ [key: string]: string } | null>(null)
  const [clientName, setClientName] = useState("")
  const [availableClients, setAvailableClients] = useState<string[]>([])
  const [showClientsModal, setShowClientsModal] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  })

  // Función para extraer la lista de clientes del mensaje de error
  const extractClientsFromError = (message: string): string[] => {
    const match = message.match(/Clientes disponibles: \[(.*?)\]/)
    if (match && match[1]) {
      return match[1]
        .split(/,\s*/)
        .map((client) => client.replace(/['"]/g, "").trim())
        .filter(Boolean)
    }
    return []
  }

  const handleSelectClient = (client: string) => {
    setClientName(client)
    setShowClientsModal(false)
    setUploadStatus("idle")
  }

  // Helper function to generate safe keys
  const generateSafeKey = (prefix: string, value: string, index: number): string => {
    const sanitized = value.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '')
    const safeName = sanitized || `item-${index}`
    return `${prefix}-${safeName}-${index}-${Date.now()}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file || !clientName) {
      alert("Por favor, selecciona un archivo y escribe un nombre de cliente.")
      return
    }
  
    setIsUploading(true)
    setUploadStatus("idle")
    setDownloadLinks(null)
    setShowClientsModal(false)
  
    const formData = new FormData()
    formData.append("file", file)
    formData.append("clientName", clientName)
  
    try {
      // Usar nuestra API de Next.js en lugar del backend Python
      const response = await fetch(`/api/process`, {
        method: "POST",
        body: formData,
      })
  
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Si la respuesta no es JSON, leer como texto para obtener el mensaje de error
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}. La respuesta no es JSON válido.`);
      }
      
      console.log("Response data:", data)

      if (!response.ok) {
        // Handle client list error
        if (data.message && data.message.includes("Clientes disponibles")) {
          const clients = extractClientsFromError(data.message)
          if (clients.length > 0) {
            setAvailableClients(clients)
            setShowClientsModal(true)
            setUploadStatus("error")
            return
          }
        }
        throw new Error(data.message || `Error del servidor: ${response.status} ${response.statusText}`)
      }

      if (data.status === "success" && data.files) {
        setDownloadLinks(data.files)
        setUploadStatus("success")
      } else {
        throw new Error("Formato de respuesta inválido del servidor")
      }
    } catch (error: unknown) {
      console.error("Error details:", error)
      setUploadStatus("error")
      
      let errorMessage = "Ocurrió un error al procesar el archivo"
      
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      // Mostrar mensaje de error más amigable
      if (errorMessage.includes('not valid JSON')) {
        errorMessage = "Error de comunicación con el servidor. Por favor, intenta nuevamente."
      } else if (errorMessage.includes('Failed to fetch')) {
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión a internet."
      }
      
      alert(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileName = (fileName: string): string => {
    return fileName.replace(/excel/i, "Excel")
  }

  const getFileIcon = (fileName: string) => {
    if (
      fileName.toLowerCase().includes("excel") ||
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls")
    ) {
      return <FileSpreadsheet className="h-6 w-6 text-green-600" />
    }
    if (
      fileName.toLowerCase().includes("image") ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg")
    ) {
      return <FileImage className="h-6 w-6 text-blue-600" />
    }
    return <FileSpreadsheet className="h-6 w-6 text-gray-600" />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#1B293F]"
      >
        Cuadro Comparativo de Ofertas
      </motion.h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nombre del Cliente</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Ingrese el nombre del cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Archivo Excel</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 cursor-pointer
                  ${isDragActive ? "border-[#1B293F] bg-[#1B293F]/5" : "border-gray-300 hover:border-[#1B293F]"}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload
                    className={`h-8 w-8 ${isDragActive ? "text-[#1B293F]" : "text-gray-400"}`}
                  />
                  {file ? (
                    <div className="text-sm text-gray-600">
                      Archivo seleccionado: <span className="font-medium">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-base text-gray-600">
                        {isDragActive
                          ? "Suelta el archivo aquí..."
                          : "Arrastra y suelta tu archivo Excel aquí, o"}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Seleccionar archivo
                      </Button>
                    </>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Solo archivos Excel (.xlsx, .xls)</p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!file || isUploading}
              className="w-full bg-[#1B293F] hover:bg-[#2C3E50] transition-colors duration-200"
            >
              {isUploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                  </motion.div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Procesar archivo</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {uploadStatus === "success" && (
          <motion.div 
            key="success-alert"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert className="mb-6 border-green-500 text-green-700 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>El archivo se ha procesado correctamente.</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {uploadStatus === "error" && showClientsModal && availableClients.length > 0 && (
          <motion.div
            key="client-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-700">Cliente no encontrado</h3>
                    <p className="text-sm text-red-600 mb-4">
                      El cliente {clientName} no se encuentra en la lista. Por favor, seleccione uno de los
                      siguientes:
                    </p>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {availableClients.map((client, index) => {
                    const uniqueClientKey = generateSafeKey('client', client, index);
                    return (
                      <Button
                        key={uniqueClientKey}
                        variant="outline"
                        className="justify-start text-left h-auto py-2 px-3 hover:bg-red-100 hover:text-red-700 border-red-200"
                        onClick={() => handleSelectClient(client)}
                      >
                        <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{client}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {downloadLinks && (
          <motion.div 
            key="download-links" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-[#1B293F] mb-4">Archivos Generados</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(downloadLinks).map(([key, url], index) => {
                const uniqueKey = generateSafeKey('download', key, index);
                return (
                  <Card
                    key={uniqueKey}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(key)}
                          <span className="font-medium text-gray-700">{formatFileName(key)}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="hover:bg-[#1B293F] hover:text-white transition-colors"
                        >
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <Download className="h-4 w-4" />
                            <span>Descargar</span>
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
