import React from 'react'
import './Room.css'
import { AlignEndHorizontal, Ellipsis, MoveRight } from 'lucide-react'
import { MobileViewContext } from '../../Context/MobileResizeProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import CircularLoader from '../../components/Fallback/CircularLoader'



const Room = () => {
  const { isMobile } = useContext(MobileViewContext)

  const navigate = useNavigate();
  const [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [navigateLoading, setNavigateLoading] = React.useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/room');

        setRooms(response.data);

      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchRoom();
  }, []);

  useEffect(() => {
    if (loading) {
      <CircularLoader />
    }

  }, [loading])


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
    if (navigateLoading) return;

    setNavigateLoading(true);

    const slog = generetSlog(subroom);
    const category = roomName(room);
    navigate(`${category}/${slog}`, { state: { subroom } });



  }



  return (
    <section id='room'>

      <div className="room-box">
        {/* <div className="room-header">
          <h2>Rooms</h2>
          <button className='create-room'>Create Room</button>
        </div> */}
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room.room_id} className="room-card">

              <h3>{room.room_name}
              </h3>
              <small style={{ fontSize: '0.8rem', fontWeight: '400', color: 'var(--lighttextcolor)' }}>{room.room_description}</small>


              <div className="subrooms-list">
                {room.subrooms.slice(0, isMobile ? 2 : 3).map((subroom) => (

                  <div key={subroom.subroom_id} className="subrooms-card">
                    {/* <img src={subroom.image} alt={subroom.name} /> */}

                    <h5>{subroom.subroom_name}</h5>

                    <p> {subroom.subroom_description}</p>
                    <hr style={{ color: 'var(--icon-color)', opacity: '0.2' }} />

                    <div className="subrooms-b-join">

                      <div className="subrooms-b-join-l">
                         <div className='live-dot'></div>
                      <span >+235 active now</span>
                      </div>
                     
                      <div className="subroom-list-join active click" onClick={() => {
                        if (!navigateLoading) {

                          joinRoom(subroom, room)
                        }
                      }}>
                        Get In
                      </div>
                    </div>



                  </div>



                ))}
                {room.subrooms.length > 3 && !isMobile && (
                  <div className='more-rooms click'>
                    <div className="more-r-a" onClick={() => {
                      if (!navigateLoading) {

                        navigate(room.room_name, { state: { room } });
                      }

                    }}>
                      <MoveRight />
                    </div>
                  </div>
                )}
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
