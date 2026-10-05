import { X } from 'lucide-react';

interface NoticeProps {
  message: string;
  onClose: () => void;
}

export default function Notice({ message, onClose }: NoticeProps) {
  if (!message) return null;

  return (
    <div className="notice" role="status">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
