import React, { useState } from 'react'
import "./SearchFieldStyle.css"
import axios from "axios"
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {BsFileEarmarkPersonFill, BsShare} from "react-icons/bs"
import { NotificationContainer,NotificationManager } from "react-notifications";

const SearchField = () => { 
  const [query,setQuery] = useState("")
  const [searchResults , setSearchResults] = useState([])
  const [like,setLike] = useState(false)
  const [savePhotosId, setSavePhotosId] = useState([]);

  let token = localStorage.getItem("token");
  const handleSearch = async(e)=>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:8080/search/photos?title=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // fetch saved photos from database
    let {photoData} = axios.get(`http://localhost:8080/saved-photos`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
  /*   const photoId = photoData.map((photo)=>photo.id)
    setSavePhotosId(photoId) */

    if(response.status===200){
      setSearchResults(response.data.results)
    }else{
      setSearchResults([])
    }
  }

  // like button
  async function savePhoto(photo) {
    try {
      let response = await axios.put(`http://localhost:8080/likePhoto`,photo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.data.msg==="Your Photo is saved successfully!"){
        setLike(!like)
        NotificationManager.success(response.data.msg,'',3000)
        //on save btn click , update the savePhotosId array with the clicked photo
        setSavePhotosId((previousSavedPhotosId) => {
        const updatedIdArray = [...previousSavedPhotosId, photo.id];
        return updatedIdArray;
      });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='searchfield_container'>
      <NotificationContainer/>
        <div className="searchField_wrapper">
            <input type="search" placeholder='Search for a photo...'
            value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button onClick={handleSearch} disabled= {!query}>Search</button>
        </div>
        <div className="feather-section">
          {searchResults.map((result)=>{
            return(
              <div className="card-container"  id={result.id}>
                  <div className="card-content" id={result.user.id}>
                      <div className="image">
                          <img src={result.urls.small} alt={result.alt_description}/>
                      </div>
                      <div className="result-name">
                          <p className="name">owners_name:{result.user.name}</p>
                          <img src={result.user.profile_image.small} alt={result.alt_description}/>
                          <p className="name">owner_Instagram:{result.user.instagram_username}</p>
                      </div>
                      <div className="button-container">
                      {savePhotosId.includes(result.id) ? (
                        <button className="like-btn" disabled={true}>
                          <AiFillHeart/>
                        </button>
                      ) : ( 
                        <button
                          className="like-btn"
                          onClick={()=>{savePhoto(result)}}
                        >
                         <AiOutlineHeart />
                        </button>
                      )}
                          {/* <button className="like-btn" onClick={()=>{savePhoto(result)}} value={like} >
                            {like?(<><AiFillHeart/></>):(<><AiOutlineHeart /></>)}
                            </button> */}
                          <button className='share-button'><BsShare/></button>
                      </div>
                  </div>
                </div>
            )
          })}
        </div>
    </div>
  )
}

export default SearchField