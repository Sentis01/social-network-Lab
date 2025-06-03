import React, { useEffect, useState } from 'react';
import RegistrationForm from '../RegistrationForm';
import { getCookie, deleteCookie } from '../cookies';


function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = getCookie('username');
    const age = getCookie('age');
    if (username && age) {
      setUser({ name: username, age });
    }
  }, []);

  const handleRegister = () => {
    const username = getCookie('username');
    const age = getCookie('age');
    setUser({ name: username, age });
  };

  const handleLogout = () => {
    deleteCookie('username');
    deleteCookie('age');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Привет, {user.name}!</h1>
          <p>Тебе {user.age} лет</p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <RegistrationForm onRegister={handleRegister} />
      )}
    </div>
  );
}

export default HomePage;
