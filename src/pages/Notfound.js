import React from 'react';

const Notfound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <a href="/home" className="btn btn-primary mt-3">Go Back Home</a>
      </div>
    </div>
  );
};

export default Notfound;
