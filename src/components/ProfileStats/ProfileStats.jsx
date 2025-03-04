import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";

const ProfileStats = () => {
  const { usertoken } = useContext(UserAuthCheckContext);
  const [stats, setStats] = useState({ followers_count: 0, following_count: 0 });

  useEffect(() => {
    if (usertoken) {
      axios
        .get(`/api/users/followers-count?userId=${usertoken.user.id}`)
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => console.error("Error fetching follow stats:", error));
    }
  }, [usertoken]);

  return (
    <div className="profile-follow-data" style={{display : 'flex', flexDirection : 'row',gap : '2vw'}}>
      <div>
        <strong>{stats.followers_count}</strong> <span>Followers</span>
      </div>
      <div>
        <strong>{stats.following_count}</strong> <span>Following</span>
      </div>
    </div>
  );
};

export default ProfileStats;
