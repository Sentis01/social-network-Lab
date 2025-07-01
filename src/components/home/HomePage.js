import React, { useEffect, useState } from 'react';
import RegistrationForm from '../RegistrationForm';
import { getCookie, deleteCookie } from '../cookies';
import UserInfo from './UserInfo';

function HomePage() {
  const [user, setUser] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [error, setError] = useState(null);

  // Вспомогательная функция для запроса к API
  const fetchExtra = () => {
    fetch('https://randomuser.me/api/')
      .then(res => {
        if (!res.ok) throw new Error('Сетевая ошибка');
        return res.json();
      })
      .then(data => {
        const r = data.results[0];
        setExtraData({
          email: r.email,
          phone: r.phone,
          picture: r.picture.medium,
        });
      })
      .catch(() => {
        setError('Не удалось загрузить доп. информацию. Проверьте интернет.');
      });
  };

  // При первой загрузке проверяем куки
  useEffect(() => {
    const username = getCookie('username');
    const age = getCookie('age');
    if (username && age) {
      setUser({ name: username, age });
      fetchExtra();
    }
  }, []);

  // Вызывается сразу после submit формы
  const handleRegister = () => {
    const username = getCookie('username');
    const age = getCookie('age');
    setUser({ name: username, age });
    fetchExtra();
  };

  const handleLogout = () => {
    deleteCookie('username');
    deleteCookie('age');
    setUser(null);
    setExtraData(null);
    setError(null);
  };

  // Пока нет user — показываем форму
  if (!user) {
    return <RegistrationForm onRegister={handleRegister} />;
  }

  // Как только user появился — сразу показываем приветствие + доп. инфу
  return (
    <div style={{ padding: 20 }}>
      <h1>Привет, {user.name}! Тебе {user.age} лет.</h1>
      <button onClick={handleLogout}>Выйти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserInfo userData={extraData} />
    </div>
  );
}

export default HomePage;