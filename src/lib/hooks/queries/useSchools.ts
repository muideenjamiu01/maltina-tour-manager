import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/axios-instance';
import { SCHOOL_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  School,
  Nomination,
  SchoolInvitation,
} from '@/types/school.types';

// Query Keys
export const schoolKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) =>
    [...schoolKeys.lists(), { filters }] as const,
  details: () => [...schoolKeys.all, 'detail'] as const,
  detail: (id: string) => [...schoolKeys.details(), id] as const,
  nominations: () => [...schoolKeys.all, 'nominations'] as const,
  invitations: () => [...schoolKeys.all, 'invitations'] as const,
  directory: () => [...schoolKeys.all, 'directory'] as const,
};

// Schools List
export function useSchools(params?: {
  page?: number;
  limit?: number;
  type?: string;
  level?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: schoolKeys.list(params || {}),
    queryFn: async () => {
      const response = await apiClient.get<{
        schools: School[];
        total: number;
        page: number;
        limit: number;
      }>(SCHOOL_ENDPOINTS.LIST, { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Single School
export function useSchool(id: string) {
  return useQuery({
    queryKey: schoolKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<School>(SCHOOL_ENDPOINTS.GET(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// School Directory
export function useSchoolDirectory(params?: {
  search?: string;
  type?: string;
  level?: string;
}) {
  return useQuery({
    queryKey: schoolKeys.directory(),
    queryFn: async () => {
      const response = await apiClient.get<School[]>(
        SCHOOL_ENDPOINTS.DIRECTORY,
        { params }
      );
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// School Nominations
export function useSchoolNominations(params?: {
  page?: number;
  limit?: number;
  status?: string;
  campaignId?: string;
}) {
  return useQuery({
    queryKey: [...schoolKeys.nominations(), params || {}],
    queryFn: async () => {
      const response = await apiClient.get<{
        nominations: Nomination[];
        total: number;
        page: number;
        limit: number;
      }>(SCHOOL_ENDPOINTS.NOMINATIONS, { params });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// School Invitations
export function useSchoolInvitations(params?: {
  page?: number;
  limit?: number;
  status?: string;
  campaignId?: string;
}) {
  return useQuery({
    queryKey: [...schoolKeys.invitations(), params || {}],
    queryFn: async () => {
      const response = await apiClient.get<{
        invitations: SchoolInvitation[];
        total: number;
        page: number;
        limit: number;
      }>(SCHOOL_ENDPOINTS.INVITATIONS, { params });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Mutations
export function useCreateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Omit<School, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
      const response = await apiClient.post<School>(
        SCHOOL_ENDPOINTS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.directory() });
    },
  });
}

export function useUpdateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      updates: Partial<School>;
    }) => {
      const response = await apiClient.put<School>(
        SCHOOL_ENDPOINTS.UPDATE(data.id),
        data.updates
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: schoolKeys.directory() });
    },
  });
}

export function useDeleteSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(SCHOOL_ENDPOINTS.DELETE(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.directory() });
    },
  });
}

export function useNominateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      schoolId: string;
      campaignId: string;
      reason: string;
    }) => {
      const response = await apiClient.post<Nomination>(
        SCHOOL_ENDPOINTS.NOMINATIONS,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.nominations() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
    },
  });
}

export function useInviteSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      schoolId: string;
      campaignId: string;
      message?: string;
    }) => {
      const response = await apiClient.post<SchoolInvitation>(
        SCHOOL_ENDPOINTS.INVITATIONS,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.invitations() });
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
    },
  });
}