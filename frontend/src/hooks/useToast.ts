import { useToast } from "../components/ui/use-toast";

export const useToastWarning = () => {
  const { toast } = useToast();

  return toast;
};
