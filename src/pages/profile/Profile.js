import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import profileImage from '../../assets/avatarr.png'
import './Profile.scss'
import PageMenu from '../pageMenu/PageMenu'
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../redux/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import Notification from '../../components/notification/Notification'

const cloud_name=process.env.REACT_APP_CLOUD_NAME;
const upload_preset=process.env.REACT_APP_UPLOAD_PRESET;
const upload_url=process.env.REACT_APP_CLOUDINARYIMAGE_UPLOAD;

const Profile = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch=useDispatch()
    const {isLoggedIn,isSuccess,isLoading,message,user}=useSelector((state)=>state.auth)

    const initialState={
        name:'' || user?.name ,
        email:'' || user?.email,
        phone:'' || user?.phone,
        photo:'' || user?.photo,
        role:'' || user?.role,
        bio:'' || user?.bio,
        isVerified:user?.isVerified || false
    }
    const [profile, setProfile] = useState(initialState)
    const [imagePreview, setImagePreview] = useState(null)
    const [profileImage, setProfileImage] = useState(null)

    const {name,email,phone,photo,role,bio,isVerified}=profile;

    useEffect(()=>{
        if(!user){
            dispatch(getUser());
        }
    },[dispatch])

    useEffect(()=>{
        if(user){
            setProfile({
            ...profile,
            name:'' || user?.name ,
            email:'' || user?.email,
            phone:'' || user?.phone,
            photo:'' || user?.photo,
            role:'' || user?.role,
            bio:'' || user?.bio,
            isVerified:user?.isVerified || false
            })
        }
    },[user])

    const updateProfile=async(e)=>{
        e.preventDefault();
        let imageURL;
        try {
            
            if(profileImage &&(profileImage.type==="image/jpeg" || profileImage.type==="image/jpg" || profileImage.type==="image/png"))
                {
                    const image=new FormData();
                    image.append("file",profileImage)
                    image.append("cloud-name",cloud_name)
                    image.append("upload_preset",upload_preset)


                    //Save Image to Cloudinary

                    const response=await fetch(upload_url,{
                        method:'post',
                        body:image
                    })
                    const imgData=await response.json();
                    imageURL=imgData?.secure_url.toString();

                    //Save the Image URL to database
                    const formData={
                        name:'' || profile?.name ,
                        email:'' || profile?.email,
                        phone:'' || profile?.phone,
                        photo:'' || profile?.photo,
                        role:'' || profile?.role,
                        bio:'' || profile?.bio,
                        photo:profileImage?imageURL:profile.photo
                    }
                    await dispatch(updateUser(formData));
                    await dispatch(getUser)
                    setImagePreview(null)
                    setProfileImage(imageURL);
                }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const handlePhotoChange=(e)=>{
        let binaryData = [];
        binaryData.push(e.target.files[0]);
        setProfileImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(binaryData))
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setProfile({...initialState,[name]:value})
    }

  return (
    <>
        <section>
            <div className='container'>
                {isLoading && <Loader/>}
                {!isVerified && <Notification/>}
                <PageMenu/>
                <h2>Profile</h2>
                <div className='--flex-start profile'>
                    <Card cardClass={'card'}>
                        <>
                            <div className='profile-photo'>
                                <div>
                                <img src={imagePreview===null?user?.photo:imagePreview} alt='profile'/>
                                <h3>Role:{role}</h3>
                                </div>
                            </div>
                            <form onSubmit={updateProfile}>
                                <p>
                                <label>Change Photo</label>
                                <input type='file' accept='image/*' name='image' onClick={handlePhotoChange}/>
                                </p>

                                <p>
                                <label>Name:</label>
                                <input type='text' name='name' value={name} placeholder='Name' required onClick={handleInputChange}/>
                                </p>

                                <p>
                                <label>Email:</label>
                                <input type='email' name='email' value={email} placeholder='Email' disabled onClick={handleInputChange}/>
                                </p>

                                <p>
                                <label>Phone:</label>
                                <input type='number' name='phone' value={phone} placeholder='Phone no' required onClick={handleInputChange}/>
                                </p>

                                <p>
                                <label>Role</label>
                                <input type='text' name='role' value={role} placeholder='Role' required onClick={handleInputChange}/>
                                </p>

                                <p>
                                <label>Bio</label>
                                <textarea cols={'30'} rows={'10'} name='bio' value={bio} placeholder='Bio' required onClick={handleInputChange}/>
                                </p>

                                <button className='--btn --btn-primary --btn-block'>Update Profile</button>
                            </form>
                        </>
                    </Card>
                </div>
            </div>
        </section>
    </>
  )
}

export default Profile