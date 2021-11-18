import React, { ReactNode } from "react";

// React.Component的两个泛型，前者为类组件的props，后者为state
// 设定props有两个，分别是children和fallbackRender，后者是如果捕获到错误，将会渲染的页面
type FallbackRender = (props: {error: Error | null }) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallBackRender: FallbackRender}>, {error: Error | null}> {
  state = {error: null}

  static getDerivedStateFromError (error: Error) {
    return {error}
  }
  render() {
    const {error} = this.state
    console.log(this);
    const {fallBackRender, children} = this.props
    if (error) {
      return fallBackRender({ error })
    }
    return children
  }
}
