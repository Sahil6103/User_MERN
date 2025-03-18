import toast from "react-hot-toast";

export const showToast = (e, ref, message) => {
  e.preventDefault();
  ref?.current?.focus();
  toast.error(message);
};
