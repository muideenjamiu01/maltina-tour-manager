"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step4Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

interface FileUpload {
  file: File | null;
  preview: string | null;
}

export default function Step4UploadDesign({ onNext, onBack, defaultValues }: Step4Props) {
  const [uploads, setUploads] = useState<{
    rightSide: FileUpload;
    leftSide: FileUpload;
    inside: FileUpload;
    top: FileUpload;
    bottom: FileUpload;
    video: FileUpload;
  }>({
    rightSide: { file: null, preview: null },
    leftSide: { file: null, preview: null },
    inside: { file: null, preview: null },
    top: { file: null, preview: null },
    bottom: { file: null, preview: null },
    video: { file: null, preview: null },
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (key: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploads((prev) => ({
          ...prev,
          [key]: { file, preview: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];
    
    // Check if all 5 images are uploaded
    if (!uploads.rightSide.file) newErrors.push('Right Side image is required');
    if (!uploads.leftSide.file) newErrors.push('Left Side image is required');
    if (!uploads.inside.file) newErrors.push('Inside image is required');
    if (!uploads.top.file) newErrors.push('Top image is required');
    if (!uploads.bottom.file) newErrors.push('Bottom image is required');
    
    // Check if video is uploaded
    if (!uploads.video.file) newErrors.push('Video is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(uploads);
  };

  const UploadBox = ({
    label,
    uploadKey,
    accept,
    isVideo = false,
  }: {
    label: string;
    uploadKey: string;
    accept: string;
    isVideo?: boolean;
  }) => {
    const upload = uploads[uploadKey as keyof typeof uploads];

    return (
      <div className="space-y-2">
        <Label className="text-gray-900 font-semibold">{label}</Label>
        <div
          className={cn(
            'relative bg-white rounded-lg p-8 border-2 border-dashed border-gray-300',
            'hover:border-[#F5A623] transition-colors cursor-pointer',
            'flex flex-col items-center justify-center min-h-[200px]'
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(uploadKey, e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {upload.preview ? (
            <div className="text-center">
              {isVideo ? (
                <Video className="w-12 h-12 mx-auto text-green-600 mb-2" />
              ) : (
                <img src={upload.preview} alt={label} className="max-h-32 mx-auto mb-2" />
              )}
              <p className="text-sm text-gray-600">{upload.file?.name}</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#F5A623]/10 flex items-center justify-center mb-4">
                {isVideo ? (
                  <Video className="w-6 h-6 text-[#F5A623]" />
                ) : (
                  <Upload className="w-6 h-6 text-[#F5A623]" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">Drag and drop or click to browse</p>
              <p className="text-xs text-gray-500">Or</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={(e) => e.preventDefault()}
              >
                Browse Files
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/step-four.png)' }}
    >
      <div className="flex-1 px-4 py-12 mt-12 md:mt-24">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="font-lilita text-4xl md:text-5xl font-black text-white leading-tight">
              Submit a Lunch Bag Design
            </h1>
            <p className="text-sm text-gray-800">
              Step 4 of 6 - Upload Design
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Requirement</h2>
            <p className="text-gray-800 mb-2">
              Please upload 5 images showing different views of the lunch bag AND 1 video demonstration:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm">
              <li>Right side view</li>
              <li>Left side view</li>
              <li>Inside view</li>
              <li>Top view</li>
              <li>Bottom view</li>
              <li>Video demonstration (showing the bag in use)</li>
            </ul>
          </div>

          {/* Upload Form */}
          <div className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900">Upload Images (5 Required)</h3>
            
            <div className="space-y-6">
              <UploadBox label="Right Side *" uploadKey="rightSide" accept="image/jpeg,image/png" />
              <UploadBox label="Left Side *" uploadKey="leftSide" accept="image/jpeg,image/png" />
              <UploadBox label="Inside *" uploadKey="inside" accept="image/jpeg,image/png" />
              <UploadBox label="Top *" uploadKey="top" accept="image/jpeg,image/png" />
              <UploadBox label="Bottom *" uploadKey="bottom" accept="image/jpeg,image/png" />
            </div>

            <p className="text-sm text-gray-800">
              Accepted formats: JPG, PNG<br />
              Maximum file size per image: 10MB
            </p>

            <h3 className="text-2xl font-bold text-gray-900 pt-6">Upload Video (1 Required)</h3>
            
            <UploadBox 
              label="Video Demonstration *" 
              uploadKey="video" 
              accept="video/mp4,video/quicktime" 
              isVideo 
            />

            <p className="text-sm text-gray-800">
              Accepted formats: MP4, MOV<br />
              Maximum file size: 50MB<br />
              Maximum duration: 2 minutes
            </p>

            {errors.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-bold mb-2">Please upload all 6 images and 1 video to continue</p>
                <ul className="list-disc list-inside text-sm">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="min-w-[160px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="min-w-[220px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
            >
              Continue to Review & Consent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
