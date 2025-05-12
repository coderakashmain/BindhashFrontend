import './SkeletonRooms.css';

export default function SkeletonRooms() {
  return (
    <div className="skroom-wrapper">
      <div className="skroom-sidebar"></div>

      <div className="skroom-main">
        <div className="skroom-search"></div>

        <div className="skroom-section">
          <div className="skroom-title"></div>
          <div className="skroom-cards">
            {[...Array(4)].map((_, i) => (
              <div className="skroom-card" key={i}></div>
            ))}
          </div>
        </div>

        <div className="skroom-section">
          <div className="skroom-title"></div>
          <div className="skroom-cards">
            {[...Array(4)].map((_, i) => (
              <div className="skroom-card" key={i}></div>
            ))}
          </div>
        </div>

        <div className="skroom-section">
          <div className="skroom-title"></div>
          <div className="skroom-circles">
            {[...Array(4)].map((_, i) => (
              <div className="skroom-circle" key={i}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
