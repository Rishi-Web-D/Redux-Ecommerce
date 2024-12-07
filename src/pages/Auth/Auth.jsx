import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setUserStart, setUserSuccess, setUserFailure } from '../../redux/slices/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    dispatch(setUserStart());
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUserSuccess(result.user));
      console.log('User signed in with Google:', result.user);
      navigate('/cart');
    } catch (error) {
      console.error('Error during Google login:', error.message);
      dispatch(setUserFailure(error.message));
    }
  };

  // Function to handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(setUserStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserSuccess(userCredential.user));
      console.log('User signed in:', userCredential.user);
      navigate('/cart');
    } catch (error) {
      console.error('Login Error:', error.message);
      dispatch(setUserFailure(error.message));
    }
  };

  // Function to handle registration with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(setUserStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUserSuccess(userCredential.user));
      console.log('User registered:', userCredential.user);
      navigate('/cart');
    } catch (error) {
      console.error('Registration Error:', error.message);
      dispatch(setUserFailure(error.message));
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </li>
          </ul>
          <div className="tab-content">
            {activeTab === 'login' && (
              <div className="tab-pane active">
                <h3 className="text-center mt-3">Login</h3>
                {isLoading && <div className="alert alert-info">Loading...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginEmail" name="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginPassword" name="password" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <i className="bi bi-google"></i> Login with Google
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'register' && (
              <div className="tab-pane active">
                <h3 className="text-center mt-3">Register</h3>
                {isLoading && <div className="alert alert-info">Loading...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registerEmail" name="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registerPassword" name="password" required />
                  </div>
                  <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <i className="bi bi-google"></i> Register with Google
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
