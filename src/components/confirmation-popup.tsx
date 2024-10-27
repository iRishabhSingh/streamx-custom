import { Button } from "@/components/ui/button";

interface ConfirmationPopupProps {
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClassName?: string; // Allows custom styling for the confirm button
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title = "Confirmation",
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm", // Default confirm button text
  cancelText = "Cancel", // Default cancel button text
  confirmButtonClassName = "rounded-full text-red-600 hover:bg-red-400/20 dark:text-red-400 dark:hover:bg-red-600/20",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-6 text-start shadow-lg dark:bg-neutral-900">
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel} className="rounded-full">
            {cancelText}
          </Button>
          <Button
            variant="ghost"
            onClick={onConfirm}
            className={`rounded-full text-red-600 hover:bg-red-400/20 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-600/20 dark:hover:text-red-400 ${confirmButtonClassName}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
