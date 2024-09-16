import React, { useState } from 'react';
import './styling/Profile.css';

function Profile() {
    const storedUserDetails = JSON.parse(localStorage.getItem('user'));
    const [userDetails, setUserDetails] = useState(storedUserDetails || {});
    const [isEditing, setIsEditing] = useState({
        name: false,
        username: false,
        email: false,
        displayName: false,
    });

    const handleEditClick = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`https://ricardo-sso.onrender.com/users/${userDetails.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user details');
            }
    
            const updatedUser = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUserDetails(updatedUser);
    
            setIsEditing({
                name: false,
                username: false,
                email: false,
                displayName: false,
            });
            
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('Failed to save changes');
        }
    };
    

    if (!storedUserDetails) {
        return <p>No user information found. Please log in to view profile details.</p>;
    }

    return (
        <div className="profile-container">
            <h1 className='profile-name-header'>
                {isEditing.name ? (
                    <input 
                        type="text" 
                        name="name" 
                        value={userDetails.name} 
                        onChange={handleChange}
                    />
                ) : (
                    <span onClick={() => handleEditClick('name')}>{userDetails.name}</span>
                )}
            </h1>
            <div className="profile-details">
                <img src={userDetails.imageURL} alt="Profile" className="profile-picture" />
                <ul>
                    <li>
                        <strong>Username:</strong> 
                        {isEditing.username ? (
                            <input 
                                type="text" 
                                name="username" 
                                value={userDetails.username} 
                                onChange={handleChange}
                            />
                        ) : (
                            <span onClick={() => handleEditClick('username')}>{userDetails.username}</span>
                        )}
                    </li>
                    <li>
                        <strong>Email:</strong> 
                        {isEditing.email ? (
                            <input 
                                type="email" 
                                name="email" 
                                value={userDetails.email} 
                                onChange={handleChange}
                            />
                        ) : (
                            <span onClick={() => handleEditClick('email')}>{userDetails.email}</span>
                        )}
                    </li>
                    <li>
                        <strong>Display Name:</strong> 
                        {isEditing.displayName ? (
                            <input 
                                type="text" 
                                name="displayName" 
                                value={userDetails.displayName} 
                                onChange={handleChange}
                            />
                        ) : (
                            <span onClick={() => handleEditClick('displayName')}>{userDetails.displayName}</span>
                        )}
                    </li>
                </ul>

                {Object.values(isEditing).some(editing => editing) && (
                    <>
                        <button onClick={handleSaveChanges} className="save-changes-btn">Save Changes</button>
                        <button onClick={() => setIsEditing({
                            name: false,
                            username: false,
                            email: false,
                            displayName: false,
                        })} className="cancel-changes-btn">Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
