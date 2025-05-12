import React from 'react'
import './Room.css'
import { AlignEndHorizontal, Ellipsis, MoveRight } from 'lucide-react'
import { MobileViewContext } from '../../Context/MobileResizeProvider'
import { useNavigate } from 'react-router-dom'

const Room = () => {

  const { isMobile } = React.useContext(MobileViewContext)
  const navigate = useNavigate()  
  const roomsection = [{
    id: 1,
    name: "Students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    subrooms: [
      { id: 1,
         name: "It Students",
         description : " This is room for it student who want to find . Join Room at find a stranger.",
         image: "https://picsum.photos/800/300" },
      { id: 2, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 3, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 4, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 5, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 6, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 7, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 8, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
      { id: 9, name: "Civil Students",
        description : " This is room for it student who want to find . Join Room at find a stranger.",
        image: "https://picsum.photos/800/300" },
     
    ],
  },
  {
    id: 2,
    name: "Humer Nature",
    description: "This is room 2",
    subrooms: [
      { id: 1, name: "John Smith",
        description : " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
      { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
      { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
      { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    ],
  },
  {
    id: 3,
    name: "Emotions",
    description: "This is room 2",
    subrooms: [
      { id: 5, name: "John Smith", image: "https://picsum.photos/800/300" },
      { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    ],
  },
  {
    id: 4,
    name: "Hobies",
    description: "This is room 2",
    subrooms: [
      { id: 7, name: "John Smith", image: "https://picsum.photos/800/300" },
      { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    ],
  }
];


const generetSlog = (room) => {
  let slog = room.name.toLowerCase().replace(/\s+/g,'-');
  
  const newslog = `${slog}-${room.id}`.toLowerCase();


return newslog;

};

const joinRoom = (subroom,room) => {


  const slog = generetSlog(subroom);
  const roomName = room.name.toLowerCase();

  navigate(`${roomName}/${slog}`, { state: { subroom } });

}



  return (
    <section id='room'>

      <div className="room-box">
        {/* <div className="room-header">
          <h2>Rooms</h2>
          <button className='create-room'>Create Room</button>
        </div> */}
        <div className="room-list">
          {roomsection.map((room) => (
            <div key={room.id} className="room-card">
              
              <h3>{room.name} </h3>
               <small style={{fontSize : '0.8rem', fontWeight : '400',color : 'var(--lighttextcolor)'}}>{room.description}</small>
             
              
              <div className="subrooms-list">
                {room.subrooms.slice(0, isMobile ? 2 :3).map((subroom) => (
                  <>
                  <div key={subroom.id} className="subrooms-card">
                    {/* <img src={subroom.image} alt={subroom.name} /> */}

                    <h5>{subroom.name}</h5>
                    <div className="subroom-list-join" onClick={()=>joinRoom(subroom,room)}>
                    Join
                    </div>
                    <p> {subroom.description}</p>
                    
                  </div>
                  {subroom?.id  ===3 && (
                    <div className='more-rooms'>
                      <div className="more-r-a" onClick={()=>{
                          navigate(subroom.name,{state : {room}});

                      }}>
                      <MoveRight  />
                      </div>
                    </div>
                  )}

                  </>
                ))}
              </div>
             
              
            </div>
          ))}
        </div>
      </div>

          <div className="room-custum">
            <ul>
              <li>P/R</li>
              <li>A/R</li>
              <li>F/R</li>
              <li>S/R</li>
            </ul>
          </div>
    </section>
  )
}

export default Room
