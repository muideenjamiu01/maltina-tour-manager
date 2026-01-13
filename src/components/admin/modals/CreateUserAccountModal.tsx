import React, { useState } from 'react';
import { X, UserPlus, Upload, Mail, AlertCircle, CheckCircle, Download } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  color: string;
}

interface CreateUserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRoles: Role[];
  onCreateUser?: (userData: any) => void;
  onBulkUpload?: (file: File) => void;
}

export function CreateUserAccountModal({ 
  isOpen, 
  onClose, 
  availableRoles,
  onCreateUser,
  onBulkUpload 
}: CreateUserAccountModalProps) {
  const [mode, setMode] = useState<'manual' | 'bulk'>('manual');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roles: [] as string[],
    sendInvite: true,
    customMessage: ''
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCreateUser?.(formData);
      handleClose();
    }
  };

  const handleBulkUpload = () => {
    if (uploadedFile) {
      onBulkUpload?.(uploadedFile);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      roles: [],
      sendInvite: true,
      customMessage: ''
    });
    setUploadedFile(null);
    setErrors({});
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
        setUploadedFile(file);
        setErrors({});
      } else {
        setErrors({ file: 'Please upload a CSV or Excel file' });
      }
    }
  };

  const toggleRole = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId]
    }));
    setErrors(prev => ({ ...prev, roles: '' }));
  };

  const downloadTemplate = () => {
    // Create CSV template
    const template = `First Name,Last Name,Email,Phone Number,Role IDs (comma-separated)
John,Doe,john.doe@example.com,+234 800 000 0001,"ROLE-002,ROLE-003"
Jane,Smith,jane.smith@example.com,+234 800 000 0002,ROLE-004
Michael,Brown,michael.brown@example.com,+234 800 000 0003,ROLE-003`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_accounts_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] text-[#2B2B2B]">Create User Account</h2>
            <p className="text-[13px] text-[#9E9E9E]">Add new users and assign roles</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex gap-3">
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                mode === 'manual'
                  ? 'border-[#F5A623] bg-[#FFF4E6]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#F5A623]'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <UserPlus className={`w-5 h-5 ${mode === 'manual' ? 'text-[#F5A623]' : 'text-[#9E9E9E]'}`} />
                <span className={`text-[14px] ${mode === 'manual' ? 'text-[#F5A623]' : 'text-[#2B2B2B]'}`}>
                  Manual Entry
                </span>
              </div>
              <p className="text-[12px] text-[#9E9E9E] text-center">
                Create a single user account
              </p>
            </button>

            <button
              onClick={() => setMode('bulk')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                mode === 'bulk'
                  ? 'border-[#F5A623] bg-[#FFF4E6]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#F5A623]'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Upload className={`w-5 h-5 ${mode === 'bulk' ? 'text-[#F5A623]' : 'text-[#9E9E9E]'}`} />
                <span className={`text-[14px] ${mode === 'bulk' ? 'text-[#F5A623]' : 'text-[#2B2B2B]'}`}>
                  Bulk Upload
                </span>
              </div>
              <p className="text-[12px] text-[#9E9E9E] text-center">
                Upload CSV/Excel file
              </p>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {mode === 'manual' ? (
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="pb-4 border-b border-[#E5E7EB]">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      First Name <span className="text-[#8C1D18]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        setErrors({ ...errors, firstName: '' });
                      }}
                      placeholder="John"
                      className={`w-full px-3 py-2 border rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent ${
                        errors.firstName ? 'border-[#8C1D18]' : 'border-[#E5E7EB]'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-[11px] text-[#8C1D18] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Last Name <span className="text-[#8C1D18]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        setErrors({ ...errors, lastName: '' });
                      }}
                      placeholder="Doe"
                      className={`w-full px-3 py-2 border rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent ${
                        errors.lastName ? 'border-[#8C1D18]' : 'border-[#E5E7EB]'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-[11px] text-[#8C1D18] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Email Address <span className="text-[#8C1D18]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors({ ...errors, email: '' });
                      }}
                      placeholder="john.doe@example.com"
                      className={`w-full px-3 py-2 border rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent ${
                        errors.email ? 'border-[#8C1D18]' : 'border-[#E5E7EB]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#8C1D18] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Role Assignment */}
              <div className="pb-4 border-b border-[#E5E7EB]">
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">
                  Assign Roles <span className="text-[#8C1D18]">*</span>
                </h3>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.roles.includes(role.id)
                          ? 'border-[#F5A623] bg-[#FFF4E6]'
                          : 'border-[#E5E7EB] hover:border-[#F5A623]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role.id)}
                        onChange={() => toggleRole(role.id)}
                        className="w-4 h-4 text-[#F5A623] border-[#E5E7EB] rounded focus:ring-[#F5A623]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: role.color }}
                          ></span>
                          <span className="text-[13px] text-[#2B2B2B]">{role.name}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.roles && (
                  <p className="text-[11px] text-[#8C1D18] mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.roles}
                  </p>
                )}
              </div>

              {/* Invitation Settings */}
              <div>
                <h3 className="text-[14px] text-[#2B2B2B] mb-3">Invitation Settings</h3>
                <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sendInvite}
                    onChange={(e) => setFormData({ ...formData, sendInvite: e.target.checked })}
                    className="w-4 h-4 mt-0.5 text-[#F5A623] border-[#E5E7EB] rounded focus:ring-[#F5A623]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-[#F5A623]" />
                      <span className="text-[13px] text-[#2B2B2B]">Send account invitation email</span>
                    </div>
                    <p className="text-[11px] text-[#9E9E9E]">
                      User will receive an email with account setup instructions
                    </p>
                  </div>
                </label>

                {formData.sendInvite && (
                  <div className="mt-3">
                    <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                      Custom Message (Optional)
                    </label>
                    <textarea
                      value={formData.customMessage}
                      onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                      placeholder="Add a personalized message to the invitation email..."
                      rows={3}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Template Download */}
              <div className="p-4 bg-[#F0F9F4] border border-[#2F6B3C] rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2F6B3C] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-[13px] text-[#2B2B2B] mb-1">Download CSV Template First</h4>
                    <p className="text-[12px] text-[#9E9E9E] mb-3">
                      Use our template to ensure your data is formatted correctly
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="px-4 py-2 bg-[#2F6B3C] text-white rounded-lg hover:bg-[#265A30] transition-colors flex items-center gap-2 text-[13px]"
                    >
                      <Download className="w-4 h-4" />
                      Download Template
                    </button>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">
                  Upload User Accounts File <span className="text-[#8C1D18]">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  uploadedFile 
                    ? 'border-[#2F6B3C] bg-[#F0F9F4]'
                    : errors.file
                    ? 'border-[#8C1D18] bg-[#FFF0F0]'
                    : 'border-[#E5E7EB] hover:border-[#F5A623]'
                }`}>
                  <input
                    type="file"
                    id="bulk-upload"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="bulk-upload" className="cursor-pointer">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="w-12 h-12 text-[#2F6B3C]" />
                        <p className="text-[14px] text-[#2B2B2B]">{uploadedFile.name}</p>
                        <p className="text-[12px] text-[#9E9E9E]">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadedFile(null);
                          }}
                          className="text-[12px] text-[#8C1D18] hover:underline"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className={`w-12 h-12 ${errors.file ? 'text-[#8C1D18]' : 'text-[#9E9E9E]'}`} />
                        <p className="text-[14px] text-[#2B2B2B]">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-[12px] text-[#9E9E9E]">
                          CSV or Excel file (max 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.file && (
                  <p className="text-[11px] text-[#8C1D18] mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Instructions */}
              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <h4 className="text-[13px] text-[#2B2B2B] mb-2">File Format Requirements:</h4>
                <ul className="space-y-1 text-[12px] text-[#9E9E9E]">
                  <li>• Include headers: First Name, Last Name, Email, Phone Number, Role IDs</li>
                  <li>• For multiple roles, separate role IDs with commas</li>
                  <li>• Email addresses must be unique</li>
                  <li>• Maximum 1000 users per upload</li>
                  <li>• All users will receive invitation emails automatically</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="text-[12px] text-[#9E9E9E]">
            {mode === 'manual' ? (
              <span>Account invitation will be valid for 7 days</span>
            ) : (
              uploadedFile && <span>Ready to create {uploadedFile ? '?' : '0'} accounts</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={mode === 'manual' ? handleSubmit : handleBulkUpload}
              disabled={mode === 'bulk' && !uploadedFile}
              className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors disabled:bg-[#E5E7EB] disabled:text-[#9E9E9E] disabled:cursor-not-allowed flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {mode === 'manual' ? 'Create Account & Send Invite' : 'Upload & Create Accounts'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
