import { toast } from "react-toastify";

export const fileLimit = (file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return false;
    }
    return true;
  };