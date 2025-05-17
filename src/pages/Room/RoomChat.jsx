import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './RoomChat.css'
import TruncatedText from '../../components/TextReducer/TruncatedText';
import '../../App.css'
import Tooltip from '@mui/material/Tooltip';
import { Avatar, AvatarGroup, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ActiveAvatar from '../../components/Avatar/AvatacActive';
import ChatIcon from '@mui/icons-material/Chat';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PublicIcon from '@mui/icons-material/Public';
import RoomChatbox from './RoomChatbox';
import { useSocket } from '../../Context/SocketContext';
import { UserAuthCheckContext } from '../../Context/UserAuthCheck';
import { useContext } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { MobileViewContext } from '../../Context/MobileResizeProvider';


const RoomChat = () => {
    const { category, slug, subroomId, chatroomname } = useParams();
    const location = useLocation();
    const subroom = location.state?.subroom || null;
    const [expand, setExpand] = React.useState(false);
    const navigate = useNavigate();
    const [navigatePath, setNavigatePath] = React.useState(null);
    const [subsubroomname, setSubsubroomname] = React.useState(null);
    const randomnavigateRef = useRef(false);

    const socket = useSocket();
    const { usertoken } = useContext(UserAuthCheckContext);
    const [activeUsers, setActiveuser] = useState([]);
    const [finalSubroomId, setFinalSubroomId] = useState(null);
    const [userlist, setUserList] = useState(false);
    const [userSetting, setUserSetting] = useState(false);
    const { isMobile } = useContext(MobileViewContext);
    const userSettingRef = useRef(null);




    const chatroomName = category.split('-').slice(0, -1).join(' ');
    const roomid = category.split('-').pop();
    const subroomname = slug.split('-').slice(0, -1).join(' ');
    const subroomid = slug.split('-').pop();



    // Live User Section

    useEffect(() => {
        if (!socket) return;

        if (usertoken?.user?.id && subroomid) {

            socket.emit('new-subroom-user', { userId: usertoken?.user?.id, subroomId: subroomid })
        };

        socket.emit("get-subroom-users", subroomid);

        socket.on("subroom-active-user", ({ subroomId, users }) => {
            // console.log("👥 Active users in subroom:", subroomId, users);
            setFinalSubroomId(subroomId);



            const sortedUsers = [...users].sort((a, b) => {
                if (a.id === usertoken.user.id) return -1;
                if (b.id === usertoken.user.id) return 1;
                return 0;
            });

            setActiveuser(sortedUsers);

            // users.forEach((user) => {
            //     console.log("User:", user.username, user.profile_pic);
            // });
        });

    }, [socket, subroomid, usertoken?.user?.id]);



    useEffect(() => {
        const handlePopState = () => {
            if (socket && usertoken?.user?.id && subroomid && !slug) {
                socket.emit("leave-subroom",

                    { userId: usertoken.user.id, subroomId: subroomid });

            }

            socket.emit("get-subroom-users", subroomid);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [socket, usertoken?.user?.id, subroomid]);





    const generetSlog = (subroom) => {
        const name = subroom.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');
        const newslog = `${name}-${subroom.id}`.toLowerCase();
        return newslog;
    }


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


    // const activeUsers = [
    //     { id: 1, name: "John Smith", image: "https://picsum.photos/800/300" },
    //     { id: 2, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 3, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 4, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 5, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 6, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 7, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 8, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 9, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 10, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 11, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 12, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 13, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 14, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 15, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 16, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 17, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 18, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 19, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 20, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 21, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 22, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 23, name: "Jane Smith", image: "https://picsum.photos/800/300" },


    //     { id: 24, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 25, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 26, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 27, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 28, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 29, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 30, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    //     { id: 31, name: "Jane Smith", image: "https://picsum.photos/800/300" },
    // ]

    useEffect(() => {
        setNavigatePath(chatroomname);

    }, [navigate, location.pathname]);




    const outsideclick = (event) => {
        if (userSettingRef.current && !userSettingRef.current.contains(event.target)) {
            setUserSetting(false);
        }
    }


    useEffect(() => {
        window.addEventListener('mousedown', outsideclick);

        return () => window.removeEventListener('mousedown', outsideclick);
    }, [])




    const handlerandomnavigate = () => {
        if (randomnavigateRef.current) return;

        randomnavigateRef.current = true;
        navigate(`randomchat/${subroomid}`, { state: { subroomid } })

        setTimeout(() => {
            randomnavigateRef.current = false;
        }, 2000)
    }

    return (
        <section id='roomchat-container'>
            <header className="roomchat-header">
                <div className="roomchat-header-name">
                    <Tooltip title="Exit">
                        <ArrowBackIcon onClick={() => {
                            socket.emit("leave-subroom", { userId: usertoken.user.id, subroomId: subroomid });
                            socket.emit("get-subroom-users", subroomid);
                            navigate("/room");

                        }
                        } sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <h3> {subroom?.subroom_name || subroomname}</h3>
                    {/* <p className='roomchat-h-d'><TruncatedText text={subroom.description} limit={50} /></p> */}
                </div>
                <div className="roomchat-header-user-list">

                    {activeUsers.map((user) => (
                        <div key={user.id} className="roomchat-header-user">
                            <ActiveAvatar username={user.username} profile_pic={user.profile_pic} size={40} />
                        </div>
                    ))}

                </div>
                <div className="float-see-live-users">
                    <Tooltip title='Active Users'>
                        <Badge badgeContent={activeUsers.length} color="primary" onClick={() => setUserList(!userlist)} >
                            <PeopleAltIcon sx={{ height: 25, width: 25 }} />
                        </Badge>

                    </Tooltip>
                    <Tooltip title='Setting' onClick={() => setUserSetting(!userSetting)}>
                        <ManageAccountsIcon sx={{ height: 26, width: 26 }} />
                    </Tooltip>

                    <AnimatePresence>

                        {userSetting && (<motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 3 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            ref={userSettingRef}
                            className="room-user-setting">

                            Chat as

                            <select name="subroomusersetting" id="subroomusersetting">
                                <option value="ownself">Ownself</option>
                                <option value="anonymous">Anonymous</option>

                            </select>

                        </motion.div>)}
                    </AnimatePresence>

                </div>


            </header>
            <div className="roomchat-box ">
                <aside style={isMobile ? chatroomname || subroomId ? { display: 'none' } : { display: 'flex', flexGrow: 1 } : {}} className='roomchat-allrooms-list scrollbar'>
                    {!subroomId ? (<div className="roomchat-random-chat roomchat-card active click" onClick={handlerandomnavigate}>
                        <ChatIcon /> Chat with Random
                    </div>) :
                        (
                            <div className="roomchat-random-chat roomchat-card" style={{ background: subroomId ? 'var(  --lightbackcolor2 )' : '', color: subroomId ? '' : 'white' }} onClick={() => navigate(`/room/${category}/${slug}`)}>
                                Leave Random Chat
                            </div>
                        )
                    }
                    <strong style={{ marginTop: '0.7rem' }}>Active Users  <span>{activeUsers.length}</span></strong>
                    <div className="roomchat-card">
                        <PublicIcon />   Global Chat
                    </div>


                    <strong style={{ marginTop: "0.5rem" }}>Your Rooms  <span> <Avatar sx={{ backgroundColor: 'var(--icon-back-color)', color: 'var(--icon-color)', height: 20, width: 20, cursor: 'pointer' }}><AddIcon sx={{ height: 15, width: 15 }} /></Avatar > {demolist.length}</span></strong>

                    {demolist.slice(0, !expand ? 3 : demolist.length).map((room) => (
                        <div key={room.id} className="roomchat-card" style={{
                            backgroundColor:
                                location.pathname === `/room/${category}/${slug}/${room.name.toLowerCase().replace(/\s+/g, '-')}-${room.id}`
                                    ? 'var(--lightbackcolor2)'
                                    : ''
                        }}>

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
                                <AvatarGroup max={5}  >
                                    {room.users && room.users.length > 0 && room.users.map((user) => (
                                        <Avatar key={user.id} alt={user.name} src={user.image} sx={{ border: '2px solid #2890E1' }} />
                                    ))}
                                </AvatarGroup>
                                <div className="room-card-user-list-right">
                                    <span># IT</span>
                                    <button onClick={() => {
                                        const rename = generetSlog(room);

                                        setNavigatePath(rename);
                                        navigate(`/room/${category}/${slug}/${rename}`, { state: { room } });

                                    }} className="room-card-user-list-right-join">
                                        Join
                                    </button>
                                </div>
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
                <motion.div
                    transition={{ duration: 0.4 }}
                    style={isMobile ? chatroomname || subroomId ? { display: 'block', flexGrow: 1 } : { display: 'none' } : {}}
                 
                    className="roomchat-chating-box">
                    <Outlet subroomname={navigatePath} />

                </motion.div>
                <AnimatePresence>
                    {userlist && (<motion.div
                        initial={{ x: "100%", opacity: 0.8 }}
                        animate={{ x: '0%', opacity: 1 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3, bounce: 2 }}
                        className="roomchat-active-user-full-d-list">
                        <header><strong>Active Users </strong>
                            <div className=" roomchat-live-box"> <div className='live-dot'></div><span>{activeUsers.length}</span></div>
                        </header>

                        <div className="roochat-active-user-full-d-list-i-o-b">

                            {activeUsers.map((user) => (
                                <div key={user.id} className="roochat-active-user-full-d-list-item">
                                    <ActiveAvatar username={user.username} profile_pic={user.profile_pic} size={40} /> {user.username}
                                </div>
                            ))}
                        </div>

                    </motion.div>)}
                </AnimatePresence>
                {/* <RoomChatbox subroomname={navigatePath} /> */}
            </div>

        </section>
    )
}

export default RoomChat
