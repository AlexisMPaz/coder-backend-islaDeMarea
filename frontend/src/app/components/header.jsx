import Link from "next/link"

const links = [{
  label: "Home",
  route: "/"
}, {
  label: "JAJAJA",
  route: "/products"
},{
  label: "Cart",
  route: "/cart"
}]

export function Header () {
    return (
        <header>
          <nav>
            <ul>
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
    )
}