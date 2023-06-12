"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = searchParams.get('token')

        fetch('http://localhost:8080/api/session/password/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, newPassword: password }),
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

                <h1 className="title text-center">Ingresa una nueva contraseña</h1>

                <input
                    type="text"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary mt-3 mb-3" type="submit">Enviar</button>
            </form>
        </div>
    );


    
}