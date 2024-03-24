export default function Toast(toast, content, type) {
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "error":
      toast.error(content, options);
      break;
    case "info":
      toast.info(content, options);
      break;
    case "warn":
      toast.warn(content, options);
      break;
    case "success":
      toast.success(content, options);
      break;
  }
}
