"use client"
import { useState, useEffect, useContext } from 'react';
import UserContext from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const [message, setMessage] = useState('No se ha podido extablecer conexion con el servidor');
  const { logoutUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/session/logout', {
          method: 'GET',
          headers: {
            Origin: 'http://localhost:3000',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setMessage(data.message);
        logoutUser()
        setTimeout(() => {
          router.push('/');
        }, 1500);

      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, []);

  return (
    <div className="container mainContainer">
      {message && <h1>{message}</h1>}
    </div>
  );
}