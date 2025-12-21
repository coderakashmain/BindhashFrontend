import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "./UserAuthCheck";

const ChatUsersContext = createContext(null);

export const ChatUsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {usertoken} = useContext(UserAuthCheckContext)

  useEffect(() => {
    if (!usertoken?.user?.id) return;

    setLoading(true);

    axios
      .get(`/api/messages/users?userId=${usertoken.user.id}`)
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) =>
            new Date(b.last_message_time) - new Date(a.last_message_time)
        );
        setUsers(sorted);
      })
      .catch((err) => {
        console.error("Fetch chat users error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [usertoken?.user?.id]);

  return (
    <ChatUsersContext.Provider
      value={{
        users,
        setUsers,
        loading,
        setLoading
      }}
    >
      {children}
    </ChatUsersContext.Provider>
  );
};

export const useChatUsers = () => {
  const context = useContext(ChatUsersContext);
  if (!context) {
    throw new Error("useChatUsers must be used inside ChatUsersProvider");
  }
  return context;
};
