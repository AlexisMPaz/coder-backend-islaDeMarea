import Link from "next/link"
export default function HomePage() {
    return (

        <div className="container mainContainer">
            <h1 className="title text-center">Bienvenido Exiliado!</h1>
            <p className="greetingText">Isla de Marea es una tienda ubicada en Rogue Harbour, lejos de molestos ojos Templarios. Nos especializamos en la adquisición y venta de replicas de artefactos históricos de gran poder.</p>
            <p className="greetingText">Nuestro inventario cambia constantemente asi que no dudes en pasarte seguido si no encuentras lo que buscas, si necesitas algo un miembro del gremio puede prestarte sus servicios, por un módico precio.</p>
            <p className="greetingText">Podes Loguearte o Registrarte con el siguiente enlace →<Link className="link" href="/login">Login</Link> </p>
        </div>
    )
}