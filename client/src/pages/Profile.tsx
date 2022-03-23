import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Profile</div>;
};

export default Profile;
