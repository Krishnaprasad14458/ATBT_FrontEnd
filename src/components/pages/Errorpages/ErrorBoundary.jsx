import React, { Component } from 'react';
import { Link, useRouteError } from 'react-router-dom';
const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || 'not found'}</i>
      </p>
    </div>
  );
};

export default ErrorBoundary;
// class ErrorBoundary extends Component {
//   state = { hasError: false, error: null, info: null };

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, info) {
//     // You can also log the error to an error reporting service
//     console.error('ErrorBoundary caught an error', error, info);
//     this.setState({ info });
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return (
//         <div>
//           <h2>Something went wrong.</h2>
//           <p>{this?.state?.error?.toString()}</p>
//           <p>{this?.state?.error?.response?.data?.message ?? 'none'}</p>
//           <p>{this?.state?.info?.componentStack ?? 'none'}</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
