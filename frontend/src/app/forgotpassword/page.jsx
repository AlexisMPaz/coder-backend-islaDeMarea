"use client"
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/session/password/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setAlertMessage(data.message);
                } else {
                    setAlertMessage("Hubo un problema en el servidor");
                }
            })
            .catch(error => {
                setAlertMessage("No se pudo conectar con el servidor, intente mas tarde");
                console.error(error);
            })
        e.target.reset();
    };

    return (
        <div className="container mainContainer">

            {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}

            <form style={{ maxWidth: '500px', margin: '2rem auto' }} onSubmit={handleSubmit}>

                <h1 className="title text-center">Recuperacion de contraseña</h1>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary mt-3 mb-3" type="submit">Enviar</button>
            </form>
        </div>
    );
}