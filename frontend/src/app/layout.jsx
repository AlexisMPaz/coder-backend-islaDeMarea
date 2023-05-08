import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/footer"
import { UserProvider } from "@/context/UserContext"
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
        <title>Isla de Marea - Tienda de artefactos</title>
      </head>

      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
        <Footer />
      </body>
    </html>
  )
}
