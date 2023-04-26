import { Header } from "./components/header"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Isla de Marea - Tienda de artefactos</title>
      </head>

      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}
