import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/axios-instance';
import { CAMPAIGN_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  Campaign,
  CampaignYear,
  CampaignProgress,
  CampaignTarget,
} from '@/types/campaign.types';

// Query Keys
export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) =>
    [...campaignKeys.lists(), { filters }] as const,
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,
  years: () => [...campaignKeys.all, 'years'] as const,
  progress: (id: string) => [...campaignKeys.all, 'progress', id] as const,
  targets: (id: string) => [...campaignKeys.all, 'targets', id] as const,
};

// Campaigns List
export function useCampaigns(params?: {
  page?: number;
  limit?: number;
  status?: string;
  academicYear?: string;
}) {
  return useQuery({
    queryKey: campaignKeys.list(params || {}),
    queryFn: async () => {
      const response = await apiClient.get<{
        campaigns: Campaign[];
        total: number;
        page: number;
        limit: number;
      }>(CAMPAIGN_ENDPOINTS.LIST, { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Single Campaign
export function useCampaign(id: string) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<Campaign>(
        CAMPAIGN_ENDPOINTS.GET(id)
      );
      return response.data;
    },
    enabled: !!id,
  });
}

// Campaign Years
export function useCampaignYears() {
  return useQuery({
    queryKey: campaignKeys.years(),
    queryFn: async () => {
      const response = await apiClient.get<CampaignYear[]>(
        CAMPAIGN_ENDPOINTS.YEARS
      );
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Campaign Progress
export function useCampaignProgress(campaignId: string) {
  return useQuery({
    queryKey: campaignKeys.progress(campaignId),
    queryFn: async () => {
      const response = await apiClient.get<CampaignProgress>(
        `${CAMPAIGN_ENDPOINTS.PROGRESS}/${campaignId}`
      );
      return response.data;
    },
    enabled: !!campaignId,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

// Campaign Targets
export function useCampaignTargets(campaignId: string) {
  return useQuery({
    queryKey: campaignKeys.targets(campaignId),
    queryFn: async () => {
      const response = await apiClient.get<CampaignTarget[]>(
        `${CAMPAIGN_ENDPOINTS.TARGETS}/${campaignId}`
      );
      return response.data;
    },
    enabled: !!campaignId,
  });
}

// Mutations
export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
      const response = await apiClient.post<Campaign>(
        CAMPAIGN_ENDPOINTS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignKeys.years() });
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      updates: Partial<Campaign>;
    }) => {
      const response = await apiClient.put<Campaign>(
        CAMPAIGN_ENDPOINTS.UPDATE(data.id),
        data.updates
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignKeys.detail(data.id) });
      queryClient.invalidateQueries({
        queryKey: campaignKeys.progress(data.id),
      });
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(CAMPAIGN_ENDPOINTS.DELETE(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignKeys.years() });
    },
  });
}

export function useLockCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { campaignId: string; isLocked: boolean }) => {
      const response = await apiClient.post(
        `${CAMPAIGN_ENDPOINTS.LOCK}/${data.campaignId}`,
        { isLocked: data.isLocked }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: campaignKeys.detail(variables.campaignId),
      });
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
    },
  });
}