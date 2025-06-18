import React from 'react'
import './ProfileSkeleton.css'


const ProfileSkeleton = () => {
  return (
    <div className="skale-p-page-container">
      <div className="skale-p-page-main">
        <div className="skale-p-page-cover shimmer"></div>

        <div className="skale-p-page-info">
          <div className="skale-p-page-image shimmer"></div>

          <div className="skale-p-page-buttons">
            <div className="skale-p-page-btn shimmer"></div>
            <div className="skale-p-page-btn shimmer"></div>
            <div className="skale-p-page-btn shimmer"></div>
          </div>

          <div className="skale-p-page-texts">
            <div className="skale-p-page-username shimmer"></div>
            <div className="skale-p-page-handle shimmer"></div>
            <div className="skale-p-page-bio shimmer"></div>
          </div>

          <div className="skale-p-page-tags">
            {[...Array(12)].map((_, i) => (
              <div className="skale-p-page-tag shimmer" key={i}></div>
            ))}
          </div>

          <div className="skale-p-page-stats">
            <div className="skale-p-page-stat shimmer"></div>
            <div className="skale-p-page-stat shimmer"></div>
            <div className="skale-p-page-stat shimmer"></div>
          </div>
        </div>
      </div>

      <div className="skale-p-page-sidebar">
        <div className="skale-p-page-suggested-header shimmer"></div>
        {[...Array(5)].map((_, i) => (
          <div className="skale-p-page-suggested shimmer" key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
