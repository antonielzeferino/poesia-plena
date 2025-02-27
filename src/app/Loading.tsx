// components/LoadingModal.tsx
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center space-x-2 p-6 bg-contrast rounded-lg shadow-lg">
        <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
        <span>Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
