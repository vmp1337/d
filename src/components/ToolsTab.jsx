import profileData from '../data/Profile.json';

const Tools = 
    <div className="tab-content">
        <div className="tab-in">
            <span>В качестве инструментов я использую следующее: </span>
            <ul>
                {profileData.tools.map(({title, url, image, description}, index) => (
                    <li key={index}>
                        <img src={image} alt={title} title={title}/>
                        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                        <span>- {description}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>

export default Tools;