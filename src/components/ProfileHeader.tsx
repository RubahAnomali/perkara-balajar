import { memo } from 'react';

function ProfileHeader() {
  return (
    <div className="profile-header">
      {/* Cover Image */}
      <div className="profile-cover">
        <div className="cover-gradient"></div>
      </div>

      {/* Profile Info */}
      <div className="profile-info-container">
        <div className="profile-picture-wrapper">
          <div className="profile-picture">F</div>
        </div>

        <div className="profile-details">
          <div className="profile-header-top">
            <div className="profile-names">
              <h1 className="profile-name">Foxxy</h1>
              <p className="profile-handle">@prlpyl</p>
            </div>
            <button className="follow-button">Follow</button>
          </div>

          <p className="profile-bio">
            Full-Stack Developer specializing in modern web applications with React and TypeScript
          </p>

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">1</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-value">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>

          <div className="profile-links">
            <a href="https://github.com/girene646-laso" target="_blank" rel="noopener noreferrer" className="profile-link">
              <span>GitHub</span>
            </a>
            <a href="https://instagram.com/prlpyl" target="_blank" rel="noopener noreferrer" className="profile-link">
              <span>Instagram</span>
            </a>
            <a href="mailto:farrellfyelo@gmail.com" className="profile-link">
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <a href="#projects" className="profile-tab active">Projects</a>
        <a href="#skills" className="profile-tab">Skills</a>
        <a href="#about" className="profile-tab">About</a>
        <a href="#contact" className="profile-tab">Contact</a>
      </div>
    </div>
  );
}

export default memo(ProfileHeader);
