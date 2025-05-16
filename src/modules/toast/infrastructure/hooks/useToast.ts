import { useToast as useProviderToast } from "../providers/ToastProvider";

/**
 * Hook to access toast functionality in components
 * This is a re-export of the useToast hook from the provider
 * to provide a consistent import path from the infrastructure layer
 */
export const useToast = useProviderToast;
