import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1B293F] text-white p-4 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/blanco2.png"
            alt="Inted Logo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-xl font-medium">Tools</span>
        </Link>
        <div className="flex space-x-4 text-sm md:text-base">
          <Link href="/comparativo" className="hover:text-gray-300 transition-colors">
            Comparativo
          </Link>
          <Link href="/presupuestador" className="hover:text-gray-300 transition-colors">
            Presupuestador
          </Link>
        </div>
      </div>
    </nav>
  )
}

