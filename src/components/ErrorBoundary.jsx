import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const { compact = false } = this.props;

      if (compact) {
        return (
          <div
            className="rounded-2xl border border-ecaa-gold-200 bg-white p-6 text-center shadow-sm"
            role="alert"
          >
            <p className="font-semibold text-ecaa-green-900">Something went wrong</p>
            <p className="mt-2 text-sm text-ecaa-green-700">
              This section could not load. Please refresh the page or return home.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link to="/" className="btn btn-primary btn-sm">
                Return Home
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-sm">
                Contact ECAA
              </Link>
            </div>
          </div>
        );
      }

      return (
        <section className="surface-muted">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ecaa-gold-700">
              Error
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold text-ecaa-green-950 sm:text-4xl">
              Something went wrong
            </h1>
            <p className="mt-4 text-lg text-ecaa-green-800">
              This section could not load. Please refresh the page or return home.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/" className="btn btn-primary btn-lg">
                Return Home
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Contact ECAA
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
