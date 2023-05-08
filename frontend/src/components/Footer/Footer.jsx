import Link from "next/link"
export function Footer() {
    return (
        <footer className="container footerContainer">
            <div className={`row cols-2 d-flex align-items-center 'footerContainer'`}>
                <div className="col-5 m-3">
                    <div>
                        <span>Isla de Marea&copy; 2023 Todos los derechos reservados.</span>
                    </div>
                    <div>
                        <span>Trabajo Final Backend para </span>
                        <a className="link" href="https://www.coderhouse.com">CoderHouse</a>
                    </div>
                </div>

                <div className="col-1 m-3">
                    <Link className="navbar-brand" href="/">
                        <img className="footerLogo" src="/footer-logo.png" alt="Logo Isla de marea, guías para Path of Exile" width="100" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
