import { Component, ErrorInfo, ReactNode } from "react";
import Button from "./Button";
import { reloadWindow } from "@/modules/utils";

type ErrorBoundaryProps = {
  children: ReactNode;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error has been thrown", error, info);
  }

  private handleClick() {
    reloadWindow();
  }

  render() {
    return this.state.hasError ? (
      <div role="error-boundary" className="bg-slate-700 min-h-screen w-full text-white flex flex-col justify-center content-center text-center items-center">
        <h1 className="text-9xl">Error</h1>
        <h2 className="text-3xl mb-8">Please, refresh the page!</h2>
        <Button text="refresh" small={true} onClick={this.handleClick}></Button>
      </div>
    ) : (
      this.props.children
    );
  }
}
