import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a new context
const SocketContext = createContext();

// Create provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3000");  // Change to your server URL
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();  // Cleanup when component unmounts
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
