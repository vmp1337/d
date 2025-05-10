import React, { useState } from 'react';
import profileData from './data/Profile.json';
import About from './components/AboutTab';
import Tools from './components/ToolsTab';
import Social from './components/SocialTab';
import useNotifications from './hooks/useNotifications';
import './scss/Profile.scss';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('about');
    const { notifications, handleShowNotification } = useNotifications();

    return (
        <div className="user-profile">
            <div className="header">
            </div>
            <div className="top-section">
                <div className="avatar-wrapper">
                    <img src={profileData.avatar} alt="User Avatar" className="avatar"/>
                </div>
                <a className="sendMessage" target='_blank' href={profileData.links[0].url}>Написать сообщение</a>
            </div>
            <div className="user-info">
                <div className="username-container">
                    <h2 className="username">{profileData.username}</h2>
                    <div className="achievements">
                        {profileData.achievements.map((achievement, index) => (
                            <img key={index} src={achievement.url} className={achievement.class}
                                 onClick={() => handleShowNotification(achievement.description, achievement.url)}
                                 alt={achievement.title}
                                 title={achievement.title}
                            />
                        ))}
                        {notifications.map((notification) => (
                            <div key={notification.id} className="notification">
                                <div className="content">
                                    <img src={notification.achImg}/>
                                    <p>{notification.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="surnames">{profileData.surnames}</p>
                <div className="about-container">
                    <div className="tabs">
                        <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>Обо мне</button>
                        <button onClick={() => setActiveTab('social')} className={activeTab === 'social' ? 'active' : ''}>Мои ссылки</button>
                        <button onClick={() => setActiveTab('tools')} className={activeTab === 'tools' ? 'active' : ''}>Мои инструменты</button>
                    </div>
                    {activeTab === 'about' && About}
                    {activeTab === 'social' && Social}
                    {activeTab === 'tools' && Tools}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;