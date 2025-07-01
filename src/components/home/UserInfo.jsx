import React from 'react';

function UserInfo({ userData }) {
  if (!userData) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Дополнительная информация:</h3>
      <img src={userData.picture} alt="User" style={{ borderRadius: '50%' }} />
      <p>Email: {userData.email}</p>
      <p>Телефон: {userData.phone}</p>
    </div>
  );
}

export default UserInfo;
