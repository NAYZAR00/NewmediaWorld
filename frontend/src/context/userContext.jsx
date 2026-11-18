
import { useEffect, useReducer } from "react";
import { userContext } from "./userContextValue";
import api from "../api/axios";

const AuthincationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "AUTH_READY":
      return { user: action.payload, loading: false };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthincationReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    api.get("/users/me", { signal: controller.signal })
      .then((response) => {
        dispatch({ type: "AUTH_READY", payload: response.data.user });
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        if (error.response?.status !== 401) {
          console.error("Failed to restore user session:", error);
        }
        dispatch({ type: "AUTH_READY", payload: null });
      });

    return () => controller.abort();
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};