import { useState, useEffect } from "react";

type SnackbarProps = {
  message: string;
  isVisible: boolean;
  style?: string;
};

const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible, style }) => {
  const [showSnackbar, setShowSnackbar] = useState(isVisible);

  useEffect(() => {
    setShowSnackbar(isVisible);
    const timer = setTimeout(() => setShowSnackbar(false), 3000); // close after 3 seconds
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!showSnackbar) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 ${style} text-white p-4 rounded m-4`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
