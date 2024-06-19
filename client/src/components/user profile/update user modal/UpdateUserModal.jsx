import "./updateUserModal.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/apiCalls/profileApiCall";
import Modal from 'react-bootstrap/Modal';
import { LiaUploadSolid } from "react-icons/lia";
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UpdateUserModal = ({ show, setShowModal, setHideModal, profile }) => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [bio, setBio] = useState("");

  const [file, setFile] = useState(null);

  // /*
  // here we check if the user dont uplaod any personal image when register for firt time,
  // the image will be by default with name "user-avatar.png",as we did in db

  // but if the user alreeeeeeeeeeeedy upload an image it will be like 
  // userImage : "imgae-1705168448269.imageUpload.jpg" in db,therfore splited it as an arr,
  // in ordrer to show the old image value as string beside [uplad imge btn]
  // */
  // const oldImagName =
  //   profile?.userImage === "user-avatar.png"
  //     ? profile?.userImage
  //     : profile?.userImage.split(".").slice(1, 3).join(".");

  /*===========================================*/

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  /*===========================================*/

  useEffect(() => {
    setUsername(profile?.username);
    setEmail(profile?.email);
    setBio(profile?.bio);
  }, [profile]);

  /*===========================================*/

  const formSubmitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("username", username);
    password && formData.append("password", password);
    formData.append("email", email);
    bio && formData.append("bio", bio);
    formData.append("userImage", file);
    dispatch(updateProfile(profile?._id, formData));
  }

  /*===========================================*/

  return (
    <div className="my-modal">
      <Modal
        show={show}
        onHide={() => { dispatch(setShowModal()) }}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
      >
        <Modal.Header closeButton onClick={() => { dispatch(setHideModal()) }}>
          <Modal.Title>Update Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-form" onSubmit={formSubmitHandler} noValidate>
            <div className="form-group">
              <label htmlFor="username">Update Username</label>
              <input
                type="text"
                className="form-control my-input"
                id="username"
                placeholder="Update Your Name"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Update Email</label>
              <input
                type="email"
                className="form-control my-input"
                id="email"
                placeholder="Update Your Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userBio">Bio</label>
              <input
                type="text"
                className="form-control my-input"
                id="userBio"
                placeholder="Update Your Bio"
                autoComplete="off"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Update Password</label>
              <input
                type="text"
                className="form-control my-input"
                id="password"
                placeholder="Update Your Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="customFile-box">
              <h3>Update Image</h3>
              <label htmlFor="myFile"><LiaUploadSolid /></label>
              <input
                type="file"
                className="form-control my-input"
                id="myFile"
                name='file'
                onChange={setimgfile}
                accept="image/*"
              />
              {/* 
              - here check if user update the image or not  
              a - in case change the image, show the name of image that update it
              b - in case NOT change the image,show the old image name that already in db
              */}
              {/* {file?.name ? <span>{file?.name}</span> : <span>{oldImagName}</span>} */}
            </div>
            <div className="text-center">
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer autoClose={6000} />
    </div>
  )
}

export default UpdateUserModal;