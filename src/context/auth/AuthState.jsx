/* eslint-disable react/prop-types */
import { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { initialState, reducer } from './AuthReducer';
import { supabase } from '../../supabase';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        if (session) {
          dispatch({ type: 'USER_LOGIN', payload: session.user.user_metadata });
          dispatch({ type: 'USER_ID', payload: session.user.id });
        } else {
          dispatch({ type: 'USER_LOGOUT' });
        }
      }
    );

    return () => {
      authListener?.data.subscription.unsubscribe();
    };
  }, []);

  const googleLogin = async () => {
    dispatch({ type: 'LOADING' });

    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'ERROR' });
    }

    dispatch({ type: 'LOADING_DONE' });
  };

  const githubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      dispatch({ type: 'ERROR' });
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      dispatch({ type: 'ERROR' });
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, googleLogin, githubLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
