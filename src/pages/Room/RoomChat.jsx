import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './RoomChat.css'
import TruncatedText from '../../components/TextReducer/TruncatedText';
import '../../App.css'
import { Avatar, AvatarGroup,Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ActiveAvatar from '../../components/Avatar/AvatacActive';

const RoomChat = () => {
    const { catogory, slug } = useParams();
    const location = useLocation();
    const subroom = location.state?.subroom || null;
    const [expand, setExpand] = React.useState(false);
    const navigate = useNavigate();

    const demolist = [
        {
            id: 1, name: "It Students and therie atomic power ", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300",
            users: [
                { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
                { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
            ]


        },
        {
            id: 2, name: "Civil Students", description: "  This is room for it student who want to find . Join Room at find a stranger.. This is room for it student who want to find . Join Room at find a stranger. This is room for it student who want to find . Join Room at find a stranger. This is room for it student who want to find . Join Room at find a stranger. This is room for it student who want to find . Join Room at find a stranger.This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300",
            users: [
                { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
                { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
            ]
        },
        {
            id: 3, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300",
            users: [
                { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
                { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
            ]
        },
        {
            id: 4, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300",
            users: [
                { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
                { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
            ]
        },
        {
            id: 5, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300",
            users: [
                { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
                { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
                { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
            ]
        },
        { id: 6, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 7, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 8, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 9, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 10, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 11, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 12, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 13, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 14, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 15, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 16, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
        { id: 17, name: "Civil Students", description: " This is room for it student who want to find . Join Room at find a stranger.", image: "https://picsum.photos/800/300" },
    ]


    const activeUsers = [
        { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
        { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 16, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 17, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 18, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 19, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 20, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 21, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 22, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 23, name: "Jane Smith", image: "https://picsum.photos/800/300" },


        { id: 24, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 25, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 26, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 27, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 28, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 29, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 30, name: "Jane Smith", image: "https://picsum.photos/800/300" },
        { id: 31, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    ]

    return (
        <section id='roomchat-container'>
            <header className="roomchat-header">
                <div className="roomchat-header-name">
                    <ArrowBackIcon onClick={()=> navigate(-1)} sx={{cursor : 'pointer'}}/>
                    <h3> {subroom.name}</h3>
                    {/* <p className='roomchat-h-d'><TruncatedText text={subroom.description} limit={50} /></p> */}
                </div>
                <div className="roomchat-header-user-list">

                    {activeUsers.map((user) => (
                        <div key={user.id} className="roomchat-header-user">
                            <ActiveAvatar username={user.name} profile_pic={user.image} size={40} />
                        </div>
                    ))}

                </div>
                <div className="float-see-live-users">
                    <Badge badgeContent= {activeUsers.length} color="primary">
                        <PeopleAltIcon  />
                    </Badge>
                   
                </div>


            </header>
            <div className="roomchat-box ">
                <aside className='roomchat-allrooms-list scrollbar'>
                    <strong style={{marginTop : '0.7rem'}}>Active Users  <span>345</span></strong>
                    <div className="roomchat-card">
                        Global Chat
                    </div>


                    <strong style={{ marginTop: "0.5rem" }}>Private Rooms  <span> <Avatar sx={{ backgroundColor: 'var(--icon-back-color)', color: 'var(--icon-color)', height: 20, width: 20, cursor: 'pointer' }}><AddIcon sx={{ height: 15, width: 15 }} /></Avatar > {demolist.length}</span></strong>

                    {demolist.slice(0, !expand ? 3 : demolist.length).map((room) => (
                        <div key={room.id} className="roomchat-card">
                            <div className="roomchat-card-title">
                                <aside className='roomchat-card-title-l'>
                                    <h4>{room.name}</h4>


                                </aside>
                                <aside className='roomchat-card-title-r'>
                                    <span>50+</span>
                                    <span className="rm-c-t-pv">
                                        public
                                    </span>
                                    <PeopleAltIcon sx={{ height: 20, width: 20 }} />

                                </aside>
                            </div>


                            <div className='roomchat-card-title-description' ><TruncatedText text={room.description} limit={200} /> </div>

                            <div className="roomchat-card-user-list">
                                <AvatarGroup max={8}  >
                                    {room.users && room.users.length > 0 && room.users.map((user) => (
                                        <Avatar key={user.id} alt={user.name} src={user.image} sx={{ border: '2px solid #2890E1' }} />
                                    ))}
                                </AvatarGroup>
                            </div>
                        </div>
                    ))}
                    {demolist.length > 3 && (
                        <p onClick={() => setExpand(!expand)} className="roomchat-allroom-exand">{!expand ? (<KeyboardArrowRightIcon sx={{ height: 20, width: 20 }} />) : (<KeyboardArrowDownIcon sx={{ height: 20, width: 20 }} />)} {expand ? "" : "Expand"} </p>
                    )}

                    <strong>Public Rooms  <span>345</span></strong>

                    {demolist.map((room) => (
                        <div key={room.id} className="roomchat-card">
                            {room.name}
                        </div>

                    ))}

                </aside>
                <aside className='roomchat-chating-box'>

                </aside>
            </div>

        </section>
    )
}

export default RoomChat
