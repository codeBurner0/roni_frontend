import React, { useEffect, useState } from 'react'
import '../assets/css/Profile.css'
import PofilePicture from '../assets/images/profilePicture.png'
import PofileImage from '../assets/images/profileImage.png'
import { PiPencilLineBold } from 'react-icons/pi';
import { GiSkullCrossedBones } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom'
function Profile() {
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (!auth) {
            navigate('/')
        }
    }, [])
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    const [bool, setBool] = useState(false);
    const [userId, setUserId] = useState({ auth });
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [userHistory, setUserHistory] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        let auth = localStorage.getItem('user')
        if(auth){
        auth = JSON.parse(auth)
        }else{
            auth={"firstName":"Ankit","lastName":"Anand","email":"ankit@gmail.com","phone":"7078259655"};
        }
        setFirstName(auth.firstName)
        setLastName(auth.lastName)
        setPhone(auth.phone)
        setUserId(auth._id)
        async function callApi() {
            try {
                let result = await fetch(`https://roni-backend-serve.onrender.com/v1/user/${auth._id}`)
                result = await result.json();
                setUserDetails(result);
                console.log("details", result)
                let result2 = await fetch(`https://roni-backend-serve.onrender.com/v1/userHistory/${auth._id}`)
                result2 = await result2.json();
                setUserHistory(result2);
                console.log("history", result2)
            } catch (e) {
                console.log("error", e.message)
            }
        }
        callApi();
    }, [])


    async function updateProfile(id, firstName, lastName, phone) {
        let result = await fetch(`https://roni-backend-serve.onrender.com/v1/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ firstName, lastName, password, phone }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        setBool(false)
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div>
            <div className="main-div-profile">
                <div className='outer-div-profile'>
                    <div className="inner-div-profile">
                        <div className='internal-div'></div>
                        <div className="profile-container">
                            <img src={PofilePicture} className='image-profile' alt="" />
                            <img src={PofileImage} alt="" className='profile-image-p' />
                            {(bool) ? < GiSkullCrossedBones className="update-icon" onClick={() => setBool(!bool)} /> :
                                <PiPencilLineBold className="update-icon" onClick={() => setBool(!bool)} />}
                            <div className="profile-details">
                                <h3>NAME: <span className='span-profile'>{userDetails.firstName + " " + userDetails.lastName}</span></h3>
                                <h3>EMAIL:<span className='span-profile'>{userDetails.email}</span></h3>
                                <h3>Phone Number:<span className='span-profile'>+91 {userDetails.phone}</span></h3>
                            </div>
                        </div>
                        <div className="user-history">
                            {
                                (bool) ?
                                    <div className='body-profile'>
                                        <div className='update-profile'>
                                            <h1 className='h1-update'>Update profile</h1>
                                            <input type="text" className='profile-input profile-input1' value={firstName}
                                                placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                                            <input type="text" className='profile-input profile-input2' value={lastName}
                                                placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                                            <input type="text" className='profile-input profile-input3' value={password}
                                                placeholder='New  Password' onChange={(e) => setPassword(e.target.value)} />
                                            <input type="text" className='profile-input profile-input4' value={phone}
                                                placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
                                            <button className='profile-update-button' onClick={() => updateProfile(userId, firstName, lastName, phone)}>Update Profile</button>
                                        </div>
                                    </div>
                                    :
                                    <div className='body-profile'>
                                        <section className='section-profile'>
                                            <h1 className='h1-profile'>Check your history</h1>
                                            <div className="tbl-header-profile">
                                                <table cellPadding="0" cellSpacing="0" border="0" className='table-profile'>
                                                    <thead>
                                                        <tr>
                                                            <th>#{bool}</th>
                                                            <th>Coin</th>
                                                            <th>Time</th>
                                                            <th>Formula</th>
                                                            <th>Result</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div className="tbl-content-profile">
                                                <table cellPadding="0" cellSpacing="0" border="0" className='table-profile'>
                                                    <tbody>
                                                        {
                                                            userHistory.map((item, index) => {
                                                                return (<tr key={index} className='pro-tr'>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.radio} </td>
                                                                    <td>{item.timeperiod}</td>
                                                                    <td>{item.formula.substring(9,)}</td>
                                                                    <td>{item.result}</td>
                                                                </tr>)
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
