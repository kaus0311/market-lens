import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          onFileUpload(json);
        } catch (error) {
          alert('Invalid JSON file. Please upload a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl p-12 text-center cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-lg mb-1 text-slate-800 dark:text-slate-200">Upload JSON File</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click to browse or drag and drop your portfolio data
          </p>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all">
          Choose File
        </button>
      </div>
    </div>
  );
}