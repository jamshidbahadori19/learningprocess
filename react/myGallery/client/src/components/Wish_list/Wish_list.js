import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BsShare} from "react-icons/bs"
import {AiOutlineDelete} from 'react-icons/ai';
import { NotificationContainer,NotificationManager } from "react-notifications";
import "../SearchField/SearchFieldStyle.css"
const Wish_list = () => {
  const [likePhotos,setLikePhotos] = useState([])
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  async function fetchLikePhotos(){
    let response = await axios.get(`http://localhost:8080/saved-photos`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    setLikePhotos(response.data)
  }

  async function deletePhoto(id){
    let response = await axios.delete(`http://localhost:8080/delete-photos/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })

    if (response.status === 200) {
      NotificationManager.success(response.data,'',2000);
      fetchLikePhotos();
    } else {
      alert("Error deleting photo");
    }
  }

  useEffect(()=>{fetchLikePhotos()},[])


  return (  
    <div className="feather-section">
      <NotificationContainer/>
      {likePhotos.map((photo)=>{
        return(
          <div className="card-content">
            <div className="image">
              <img src={photo.urls.regular} alt="1" />
            </div>
            <div className="card-details">
              <p className="name">name:{photo.user.name}</p>
              <img src={photo.user.profile_image.small} alt={photo.alt_description}/>
              <p className="name">Instagram:{photo.user.instagram_username}</p>
             {/*  <div className="button-container">
                <button className="delete-btn" onClick={()=>{deletePhoto(photo.id)}}><AiOutlineDelete/></button>
                <button className="share-btn"><BsShare/></button>
              </div> */}
            </div>
            <div className="button-container">
                <button className="delete-btn" onClick={()=>{deletePhoto(photo.id)}}><AiOutlineDelete/></button>
                <button className="share-btn"/*  style={{right:"100px"}} */><BsShare/></button>
            </div>
            
          </div>
        )
      })}
    </div>
    
  )
}

export default Wish_list