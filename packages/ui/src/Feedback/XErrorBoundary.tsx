/**
 * Kind: external
 * Purpose: keep one failed widget from blanking the page.
 * Used by: documents, embeds, and charts inside a dialog.
 */

import { Component, type ErrorInfo, type ReactNode } from "react";

import { XEmpty } from "./XEmpty";

export type XErrorBoundaryProps = {
  children: ReactNode;
  fallback?: string;
};

type State = { failed: boolean };

export class XErrorBoundary extends Component<XErrorBoundaryProps, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.setState({ failed: true });
  }

  render() {
    if (this.state.failed) {
      return <XEmpty message={this.props.fallback ?? "This section could not be shown."} />;
    }
    return this.props.children;
  }
}
