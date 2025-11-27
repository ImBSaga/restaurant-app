import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  RegisterResponse,
  LoginResponse,
  Register,
  Login,
} from "@/types/auth.type";

import { setCredentials } from "@/features/auth/auth-slice";
import { store } from "@/features/store";

const prefix = "/auth";

// Register
export function useRegisterMutation() {
  return useMutation<RegisterResponse, Error, Register>({
    mutationFn: async (params) => {
      const { data } = await api.post<RegisterResponse>(
        `${prefix}/register`,
        params
      );
      return data;
    },
    onSuccess: (data) => {
      const payload = data.data || data;
      store.dispatch(
        setCredentials({
          user: payload.user,
          token: payload.token,
        })
      );
    },
  });
}

// Login
export function useLoginMutation() {
  return useMutation<LoginResponse, Error, Login>({
    mutationFn: async (params) => {
      const { data } = await api.post<LoginResponse>(`${prefix}/login`, params);
      return data;
    },
    onSuccess: (data) => {
      const payload = data.data || data;
      store.dispatch(
        setCredentials({
          user: payload.user,
          token: payload.token,
        })
      );
    },
  });
}
