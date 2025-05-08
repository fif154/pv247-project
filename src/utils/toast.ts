import { toast } from "react-toastify";

export const showErrorToast = (message: string) => {
    toast.error(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "bottom-right",
    });
};

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "bottom-right",
    });
};
