'use client';

import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';

interface AuthState {
  address: string | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: string;
}

const initialState: AuthState = {
  address: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, address: action.payload || null };
    case 'LOGOUT':
      return { ...state, address: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const address = localStorage.getItem('userAddress');
    if (address) {
      dispatch({ type: 'LOGIN', payload: address });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
