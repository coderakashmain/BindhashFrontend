import React from "react";
import Emptyuser from '../../Photo/BindhashLogo.png'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            zIndex: 99999,
            background: "var(--webbackcolor)",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            textAlign: "center",
            padding: "2rem",
            fontFamily: "sans-serif",
          }}
        >
          <img
            src={Emptyuser}
            alt="Something went wrong"
            style={{
              height: "160px",
              width: "160px",
              userSelect: "none",
              marginBottom: "1rem",
              opacity: 0.8,
            }}
          />
          <h2 style={{ color: "var(--textcolor)", marginBottom: "0.5rem" }}>
            Oops! Something went wrong.
          </h2>
          <p style={{ color: "#5e6c84", maxWidth: "400px" }}>
            An unexpected error has occurred. Please try refreshing the page or come back later.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1.5rem",
              background: "var(--logolinearcolor)",
              color: "white",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 500,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
