type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

function Modal({ title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-indigo-700 mb-3">
          {title}
        </h2>

        <p className="text-gray-700 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-800 text-white">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
