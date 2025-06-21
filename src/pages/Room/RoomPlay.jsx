import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './RoomPlay.css'
import './Room.css'

const RoomPlay = () => {
  const location = useLocation();
  const { room } = location.state;
  const navigate = useNavigate();


  const generetSlog = (subroom) => {
    let slog = subroom.subroom_name.toLowerCase().replace(/\s+/g, '-');

    const newslog = `${slog}-${subroom.subroom_id}`.toLowerCase();


    return newslog;

  };

  const roomName = (room) => {
    const roomName = room.room_name.toLowerCase().replace(/\s+/g, '-');
    const newroomName = `${roomName}-${room.room_id}`.toLowerCase();
    return newroomName;
  }

  const joinRoom = (subroom, room) => {


    const slog = generetSlog(subroom);
    const category = roomName(room);

    navigate(`/room/${category}/${slog}`, { state: { subroom } });

  }


  return (
    <section id='roomplay'>
      <h3>{room.room_name} <p>Live Chat</p></h3>
      <div className="subrooms-list subrooms-list-play">
        {room.subrooms.map((subroom) => (

          <div key={subroom.subroom_id} className="subrooms-card subrooms-card-play">
            {/* <img src={subroom.image} alt={subroom.name} /> */}

            <h5>{subroom.subroom_name}</h5>
            <p> {subroom.subroom_description}</p>

            <hr style={{ color: 'var(--icon-color)', opacity: 0.2 }} />

            <div className="subrooms-b-join">

              <div className="subrooms-b-join-l">
                <div className='live-dot'></div>
                <span >Live</span>
              </div>

              <div className="subroom-list-join active click" onClick={() => {
        

                  joinRoom(subroom, room)
       
              }}>
                Get In
              </div>
            </div>

          </div>

        ))}
      </div>
    </section>
  )
}

export default RoomPlay
