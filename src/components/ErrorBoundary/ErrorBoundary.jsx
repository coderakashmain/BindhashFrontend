import React from "react";

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
            zIndex: "1111111111111111",
            background: "white",
            left: "0",
            top: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: "2rem",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            🚨 Something went wrong!
          </h1>
          <p style={{ color: "red", fontWeight: "bold" }}>
            {this.state.error?.toString()}
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "1rem",
              backgroundColor: "#f0f0f0",
              width: "80%",
              textAlign: "left",
            }}
          >
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.8rem 1.5rem",
              marginTop: "1rem",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
