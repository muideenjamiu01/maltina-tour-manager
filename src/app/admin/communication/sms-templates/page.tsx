'use client'
import { useState } from 'react';
import { Search, Plus, MessageSquare, Edit2, Copy, Eye, Send, Code, X } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

interface SMSTemplate {
  id: string;
  name: string;
  category: 'invitation' | 'reminder' | 'confirmation' | 'notification' | 'alert';
  messageBody: string;
  variables: string[];
  characterCount: number;
  lastModified: string;
  usageCount: number;
  createdBy: string;
}

export default function SMSTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<SMSTemplate | null>(null);

  const templates: SMSTemplate[] = [
    {
      id: 'TPL-SMS-001',
      name: 'Tour Confirmation',
      category: 'confirmation',
      messageBody: 'Hello {{principal_name}}, your Maltina School Tour is confirmed for {{tour_date}} at {{school_name}}. Contact: 0800-MALTINA',
      variables: ['principal_name', 'tour_date', 'school_name'],
      characterCount: 127,
      lastModified: '2025-01-20',
      usageCount: 34,
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'TPL-SMS-002',
      name: 'RECEE Reminder 24hrs',
      category: 'reminder',
      messageBody: 'Reminder: RECEE inspection for {{school_name}} tomorrow {{inspection_date}} at {{inspection_time}}. Inspector: {{inspector_name}}',
      variables: ['school_name', 'inspection_date', 'inspection_time', 'inspector_name'],
      characterCount: 115,
      lastModified: '2025-01-21',
      usageCount: 18,
      createdBy: 'Emeka Nwankwo'
    },
    {
      id: 'TPL-SMS-003',
      name: 'Booking Link',
      category: 'invitation',
      messageBody: 'Dear {{principal_name}}, book your Maltina School Tour slot now: {{booking_link}}. Expires in 48hrs.',
      variables: ['principal_name', 'booking_link'],
      characterCount: 95,
      lastModified: '2025-01-19',
      usageCount: 42,
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'TPL-SMS-004',
      name: 'Facilitator Assignment Alert',
      category: 'notification',
      messageBody: 'Hi {{facilitator_name}}, you are assigned to {{school_name}} on {{tour_date}}. Check your dashboard for details.',
      variables: ['facilitator_name', 'school_name', 'tour_date'],
      characterCount: 102,
      lastModified: '2025-01-18',
      usageCount: 27,
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'TPL-SMS-005',
      name: 'Urgent Tour Cancellation',
      category: 'alert',
      messageBody: 'URGENT: Maltina School Tour at {{school_name}} on {{tour_date}} has been cancelled. New date will be communicated soon.',
      variables: ['school_name', 'tour_date'],
      characterCount: 119,
      lastModified: '2025-01-17',
      usageCount: 3,
      createdBy: 'Blessing Okafor'
    },
    {
      id: 'TPL-SMS-006',
      name: 'Registration Approved',
      category: 'notification',
      messageBody: 'Congratulations! {{school_name}} has been approved for Maltina School Tour 2025. Next steps will be sent via email.',
      variables: ['school_name'],
      characterCount: 108,
      lastModified: '2025-01-22',
      usageCount: 51,
      createdBy: 'Fatima Abubakar'
    }
  ];

  const categories = [
    { value: 'invitation', label: 'Invitation' },
    { value: 'reminder', label: 'Reminder' },
    { value: 'confirmation', label: 'Confirmation' },
    { value: 'notification', label: 'Notification' },
    { value: 'alert', label: 'Alert' }
  ];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.messageBody.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: SMSTemplate['category']) => {
    const colors: Record<string, string> = {
      invitation: 'bg-[#F5A623] text-white',
      reminder: 'bg-[#D4A017] text-white',
      confirmation: 'bg-[#2F6B3C] text-white',
      notification: 'bg-[#F5A623] text-white',
      alert: 'bg-[#8C1D18] text-white'
    };

    return (
      <span className={`px-2 py-1 rounded text-[11px] ${colors[category]}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  const getCharacterCountColor = (count: number) => {
    if (count <= 160) return 'text-[#2F6B3C]';
    if (count <= 306) return 'text-[#D4A017]';
    return 'text-[#8C1D18]';
  };

  const handlePreview = (template: SMSTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleTestSend = (template: SMSTemplate) => {
    setSelectedTemplate(template);
    setShowTestModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="SMS Templates"
        subtitle="Create and manage SMS templates with dynamic variables"
        
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Templates</span>
              <MessageSquare className="w-4 h-4 text-[#2B2B2B]" />
            </div>
            <div className="text-[24px] text-[#2B2B2B]">{templates.length}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Most Used</span>
              <Send className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[14px] text-[#2B2B2B]">Registration Approved</div>
            <div className="text-[12px] text-[#9E9E9E]">51 uses</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Usage</span>
              <Send className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[24px] text-[#2F6B3C]">175</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Categories</span>
              <Code className="w-4 h-4 text-[#D4A017]" />
            </div>
            <div className="text-[24px] text-[#D4A017]">{categories.length}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Search */}
            <div className="col-span-8">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Search Templates</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                <input
                  type="text"
                  placeholder="Search by name or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-span-4">
              <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count and Create Button */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[14px] text-[#9E9E9E]">
            Showing {filteredTemplates.length} of {templates.length} templates
          </div>
          <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#F5A623] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] text-[#2B2B2B]">{template.name}</h3>
                    {getCategoryBadge(template.category)}
                  </div>
                  <div className="text-[12px] text-[#9E9E9E]">{template.id}</div>
                </div>
                <MessageSquare className="w-5 h-5 text-[#F5A623]" />
              </div>

              {/* Message Body */}
              <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                <div className="text-[11px] text-[#9E9E9E] mb-1">Message:</div>
                <div className="text-[13px] text-[#2B2B2B] line-clamp-3">{template.messageBody}</div>
              </div>

              {/* Character Count */}
              <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#9E9E9E]">Character Count:</span>
                  <span className={`text-[13px] ${getCharacterCountColor(template.characterCount)}`}>
                    {template.characterCount}/160
                  </span>
                </div>
                <div className="mt-1.5 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${template.characterCount <= 160 ? 'bg-[#2F6B3C]' : 'bg-[#8C1D18]'}`}
                    style={{ width: `${Math.min((template.characterCount / 160) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Variables */}
              <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                <div className="text-[11px] text-[#9E9E9E] mb-2">Variables ({template.variables.length}):</div>
                <div className="flex flex-wrap gap-1.5">
                  {template.variables.map((variable) => (
                    <span 
                      key={variable}
                      className="px-2 py-0.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[11px] text-[#2B2B2B] font-mono"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-[11px] text-[#9E9E9E] mb-4">
                <span>Updated {template.lastModified}</span>
                <span>Used {template.usageCount} times</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={() => handlePreview(template)}
                  className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-1.5">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button 
                  onClick={() => handleTestSend(template)}
                  className="px-3 py-2 bg-[#F5A623] text-white rounded-lg text-[13px] hover:bg-[#E09612] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send
                </button>
                <button className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div className="text-[12px] text-[#9E9E9E]">
            <strong className="text-[#2B2B2B]">SMS Templates:</strong> Create reusable SMS templates with dynamic variables. SMS messages are limited to 160 characters per message (longer messages are split into multiple SMS). When you send an SMS using a template, the system replaces variables with actual data. Use "Send" to compose a message to specific audiences, which will create records in "SMS Sent" screen.
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">Template Preview</h2>
                <p className="text-[13px] text-[#9E9E9E]">{selectedTemplate.name}</p>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <div className="text-[12px] text-[#9E9E9E] mb-1">Message Body:</div>
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] min-h-[120px]">
                  {selectedTemplate.messageBody}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-[#9E9E9E]">Character Count:</span>
                  <span className={`text-[14px] ${getCharacterCountColor(selectedTemplate.characterCount)}`}>
                    {selectedTemplate.characterCount}/160 characters
                  </span>
                </div>
                <div className="text-[11px] text-[#9E9E9E]">
                  {selectedTemplate.characterCount <= 160 ? '1 SMS message' : `${Math.ceil(selectedTemplate.characterCount / 153)} SMS messages`}
                </div>
              </div>

              <div>
                <div className="text-[12px] text-[#9E9E9E] mb-2">Available Variables:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable) => (
                    <span 
                      key={variable}
                      className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-[12px] text-[#2B2B2B] font-mono"
                    >
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Send Modal */}
      {showTestModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-lg">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h2 className="text-[18px] text-[#2B2B2B]">Send SMS</h2>
                <p className="text-[13px] text-[#9E9E9E]">Using template: {selectedTemplate.name}</p>
              </div>
              <button 
                onClick={() => setShowTestModal(false)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9E9E9E]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Select Audience</label>
                <select className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <option>All Approved Schools</option>
                  <option>Schools with Tour Tomorrow</option>
                  <option>Facilitators - Lagos Zone</option>
                  <option>Pending RECEE Schools</option>
                  <option>Custom List...</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Recipient Count</label>
                <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B]">
                  78 recipients
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Estimated Cost</label>
                <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="text-[14px] text-[#2B2B2B]">78 SMS messages</div>
                  <div className="text-[12px] text-[#9E9E9E]">₦{(78 * 2.5).toFixed(2)}</div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Send Test To (Optional)</label>
                <input 
                  type="tel"
                  placeholder="+234 XXX XXX XXXX"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowTestModal(false)}
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#D4A017] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Test
              </button>
              <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send to Audience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
