import React from 'react'
import { useLocation } from 'react-router-dom'
import './RoomPlay.css'
import './Room.css'

const RoomPlay = () => {
    const {room}  = useLocation().state;
    const {subroom} = room;

    console.log(room);
  return (
    <section id='roomplay'>
        <h3>{room.name} <p>Live Chat</p></h3>
       <div className="subrooms-list subrooms-list-play">
                      {room.subrooms.map((subroom) => (
                       
                        <div key={subroom.id} className="subrooms-card subrooms-card-play">
                          {/* <img src={subroom.image} alt={subroom.name} /> */}
      
                          <h5>{subroom.name}</h5>
                          <div className="subroom-list-join">
                          Join
                          </div>
                          <p> {subroom.description}</p>
                          
                        </div>
                      
                      ))}
                    </div>
    </section>
  )
}

export default RoomPlay
