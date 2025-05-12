import './SkeletonComponent.css';

export default function SkeletonComponent() {
  return (
    <div className="skel-wrapper">
      <header className="skel-navbar"></header>

      <section className="skel-banner">
        <div className="skel-card"></div>
        <div className="skel-card"></div>
        <div className="skel-card"></div>
      </section>

      <nav className="skel-tabs">
        <div className="skel-tab"></div>
        <div className="skel-tab"></div>
        <div className="skel-tab"></div>
        <div className="skel-tab"></div>
      </nav>

      <main className="skel-main">
        <section className="skel-feed">
          <div className="skel-post"></div>
          <div className="skel-post"></div>
          <div className="skel-post"></div>
        </section>

        <aside className="skel-sidebar">
          <div className="skel-profile"></div>
        </aside>
      </main>
    </div>
  );
}
