import { Effect, Reducer } from 'umi';
import { googleLogin, googleCallback, logout } from '@/services/Auth';
import { message } from 'antd';

export interface AuthModelState {
  currentUser?: any;
  token?: string;
  isAuthenticated: boolean;
}

export interface AuthModelType {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    googleLogin: Effect;
    googleCallback: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<AuthModelState>;
    clearCurrentUser: Reducer<AuthModelState>;
  };
}

const AuthModel: AuthModelType = {
  namespace: 'auth',
  state: {
    currentUser: undefined,
    token: undefined,
    isAuthenticated: false,
  },
  effects: {
    *googleLogin(_, { call }) {
      try {
        const response = yield call(googleLogin);
        if (response.success) {
          window.location.href = response.data?.redirectUrl;
        } else {
          message.error(response.errorMessage || 'Login failed');
        }
      } catch (error) {
        message.error('Login failed');
      }
    },
    *googleCallback({ payload }, { call, put }) {
      try {
        const response = yield call(googleCallback, payload.code);
        if (response.success) {
          yield put({
            type: 'saveCurrentUser',
            payload: {
              currentUser: response.data?.user,
              token: response.data?.token,
              isAuthenticated: true,
            },
          });
          message.success('Login successful');
        } else {
          message.error(response.errorMessage || 'Login failed');
        }
      } catch (error) {
        message.error('Login failed');
      }
    },
    *logout(_, { call, put }) {
      try {
        yield call(logout);
        yield put({
          type: 'clearCurrentUser',
        });
        message.success('Logout successful');
      } catch (error) {
        message.error('Logout failed');
      }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clearCurrentUser(state) {
      return {
        ...state,
        currentUser: undefined,
        token: undefined,
        isAuthenticated: false,
      };
    },
  },
};

export default AuthModel; 