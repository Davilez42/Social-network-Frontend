import React, { useState } from 'react';
import './viewfriendlist.css';

const ViewFriendList = ({ friends }) => {
  const Friends = [
    { id: 1, name: 'Sebastian Cardona' },
    { id: 2, name: 'Luisa reyes' },
    { id: 3, name: 'Melissa Cortes' }
  ];

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const goBackToList = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="container_friend_list_profile">
      <h2>Amigos</h2>
      <p>Lista de Amigos</p>
      <div className="friend-list-container">
            <div className="friend-list">
             {Friends.map((friend, index) => (
            <div key={index} onClick={() => handleFriendClick(friend)}>
            <div className="box"></div>
              {friend.name}
            </div>
          ))}
            </div>
          </div>
            {selectedFriend && (
           <div className="details-overlay">
           <div className="friend-details">
            <h2>Detalles de {selectedFriend.name}</h2>
            <p>ID: {selectedFriend.id}</p>
            {/* mas detalles del amigo */}
            <button className="button-back" onClick={goBackToList}>Volver a la lista de amigos</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default ViewFriendList;
