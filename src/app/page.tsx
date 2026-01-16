"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Scale } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Card className="p-6 h-full flex flex-col justify-between">
          <div className="flex flex-col items-center text-center">
            <FileText className="w-16 h-16 mb-4 text-[#1B293F]" />
            <h2 className="text-2xl font-bold mb-2">Generador de Presupuestos</h2>
            <p className="mb-4">Crea y descarga presupuestos de trámites de manera sencilla.</p>
          </div>
          <Button asChild className="w-full bg-[#1B293F] hover:bg-[#2C3E50] text-white">
            <Link href="/presupuestador">Ir al Presupuestador</Link>
          </Button>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <Card className="p-6 h-full flex flex-col justify-between">
          <div className="flex flex-col items-center text-center">
            <Scale className="w-16 h-16 mb-4 text-[#1B293F]" />
            <h2 className="text-2xl font-bold mb-2">Cuadro Comparativo de Ofertas</h2>
            <p className="mb-4">Compara y evalúa ofertas de manera rápida y precisa.</p>
          </div>
          <Button asChild className="w-full bg-[#1B293F] hover:bg-[#2C3E50] text-white">
            <Link href="/comparativo">Ver Comparativo</Link>
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}

