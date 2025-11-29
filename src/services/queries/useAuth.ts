import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  RegisterResponse,
  LoginResponse,
  Register,
  Login,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
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

// Get Profile
export function useGetProfileQuery() {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get<ProfileResponse>(`${prefix}/profile`);
      return data;
    },
  });
}

// Update Profile
export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: async (params) => {
      const { data } = await api.put<UpdateProfileResponse>(
        `${prefix}/profile`,
        params
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      // Optionally update the store user if needed, but invalidating query should refresh the UI
    },
  });
}
