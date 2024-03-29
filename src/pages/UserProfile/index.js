import React from "react";
import ShowProfile from "../../component/ShowProfile";
import { useSelector } from "react-redux";
import GetPlaylist from "../../component/GetPlaylist";
import "./userprofile.css";

function UserProfile() {
    
    const user = useSelector((state) => state.userdetails.value)

    return(
        <>
        <div className="container-user p-4 sm:ml-64">
            <ShowProfile />
            <GetPlaylist userid={user.id}/>
        </div>
        </>
    )
}

export default UserProfile;