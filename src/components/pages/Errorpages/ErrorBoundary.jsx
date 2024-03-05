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
//   state = { hasError: false };
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }
//   componentDidCatch(error, info) {
//     console.error('ErrorBoundary caught an error', error, info);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <h2>
//           There was an error with this listing. <Link to='/'>Click here</Link>{' '}
//           to back to the home page.
//         </h2>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
