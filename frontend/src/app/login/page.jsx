"use client"
import { useContext, useState, useRef } from 'react';
import UserContext from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from "next/link"

export default function LoginPage() {
    const { updateUser } = useContext(UserContext)
    const router = useRouter()
    const datForm = useRef()
    const [message, setMessage] = useState(null);

    const consultarForm = (e) => {
        e.preventDefault();
        const datosFormulario = new FormData(datForm.current);
        const cliente = Object.fromEntries(datosFormulario);

        fetch('http://localhost:8080/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    updateUser(data.user);
                    router.push('/products')
                } else {
                    data.message ? setMessage(data.message) : setMessage("Ocurrio un problema con el servidor")
                }
            })
            .catch(error => {
                setMessage("No se pudo conectar con el servidor, intente mas tarde")
                console.error(error)
            })
        e.target.reset();
    };

    return (
        <div className="container mainContainer">
            {message && <div className="alert alert-danger">{message}</div>}
            <div style={{ maxWidth: '500px', margin: '2rem auto' }}>

                <form className="mb-3" onSubmit={consultarForm} ref={datForm}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" required />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 mb-3">Login</button>
                    <p className="title">Ingresa tu email y contraseña o crea una cuenta primero.</p>
                </form>

                <div className="d-flex justify-content-center mb-3">
                    <Link href="/register" className="btn btn-outline-warning">Registrarse</Link>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <Link href="/forgotpassword" className="btn btn-outline-warning">Recuperar contraseña</Link>
                </div>
            </div>
        </div>
    )
}