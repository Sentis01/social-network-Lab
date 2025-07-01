import React, { useState } from 'react';
import { setCookie } from './cookies';

function RegistrationForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🏷️ RegistrationForm: handleSubmit, values =', { username, age });
    setCookie('username', username, { 'max-age': 3600 });
    setCookie('age', age, { 'max-age': 3600 });
    onRegister(); // уведомляем родителя
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Возраст:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegistrationForm;