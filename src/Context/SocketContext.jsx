import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a new context
const SocketContext = createContext();

// Create provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.MODE === "production"
            ? import.meta.env.VITE_SOCKET_URL
            : "http://localhost:3000",
            { 
                transports: ["websocket"],  
                withCredentials: true });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();  
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket
export const useSocket = () => {
    return useContext(SocketContext);
};
