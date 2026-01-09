'use client'
import { useState } from 'react';
import { Search, Plus, Mail, Edit2, Copy, Trash2, Eye, Send, Code, X } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'invitation' | 'reminder' | 'confirmation' | 'notification' | 'feedback';
  bodyPreview: string;
  variables: string[];
  lastModified: string;
  usageCount: number;
  createdBy: string;
}

export default function EmailTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  const templates: EmailTemplate[] = [
    {
      id: 'TPL-EMAIL-001',
      name: 'Tour Invitation',
      subject: 'Your school is invited to Maltina School Tour {{year}}!',
      category: 'invitation',
      bodyPreview: 'Dear {{principal_name}}, We are delighted to invite {{school_name}} to participate in the Maltina School Tour...',
      variables: ['school_name', 'principal_name', 'year', 'lga', 'state'],
      lastModified: '2025-01-20',
      usageCount: 45,
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'TPL-EMAIL-002',
      name: 'RECEE Inspection Reminder',
      subject: 'Upcoming RECEE Inspection - {{inspection_date}}',
      category: 'reminder',
      bodyPreview: 'Dear {{principal_name}}, This is a reminder that your RECEE inspection is scheduled for {{inspection_date}}...',
      variables: ['school_name', 'principal_name', 'inspection_date', 'inspector_name'],
      lastModified: '2025-01-21',
      usageCount: 12,
      createdBy: 'Emeka Nwankwo'
    },
    {
      id: 'TPL-EMAIL-003',
      name: 'Tour Date Confirmation',
      subject: 'Maltina School Tour confirmed for {{tour_date}}',
      category: 'confirmation',
      bodyPreview: 'Dear {{principal_name}}, We confirm that {{school_name}} will host the Maltina School Tour on {{tour_date}}...',
      variables: ['school_name', 'principal_name', 'tour_date', 'tour_time', 'facilitator_name'],
      lastModified: '2025-01-18',
      usageCount: 23,
      createdBy: 'Adebayo Johnson'
    },
    {
      id: 'TPL-EMAIL-004',
      name: 'Facilitator Assignment',
      subject: 'You have been assigned to {{school_name}}',
      category: 'notification',
      bodyPreview: 'Dear {{facilitator_name}}, You have been assigned as a facilitator for {{school_name}} on {{tour_date}}...',
      variables: ['facilitator_name', 'school_name', 'tour_date', 'school_address'],
      lastModified: '2025-01-19',
      usageCount: 18,
      createdBy: 'Chioma Okonkwo'
    },
    {
      id: 'TPL-EMAIL-005',
      name: 'Post-Tour Feedback Request',
      subject: 'Share your feedback on the Maltina School Tour',
      category: 'feedback',
      bodyPreview: 'Dear {{principal_name}}, Thank you for hosting the Maltina School Tour. We would love to hear your feedback...',
      variables: ['principal_name', 'school_name', 'tour_date', 'feedback_link'],
      lastModified: '2025-01-17',
      usageCount: 8,
      createdBy: 'Blessing Okafor'
    },
    {
      id: 'TPL-EMAIL-006',
      name: 'Interest Registration Deadline',
      subject: 'Last chance to register for Maltina School Tour!',
      category: 'reminder',
      bodyPreview: 'Dear {{principal_name}}, The registration deadline for Maltina School Tour is approaching on {{deadline_date}}...',
      variables: ['principal_name', 'school_name', 'deadline_date', 'registration_link'],
      lastModified: '2025-01-22',
      usageCount: 31,
      createdBy: 'Fatima Abubakar'
    },
    {
      id: 'TPL-EMAIL-007',
      name: 'Nomination Approved',
      subject: 'Congratulations! {{school_name}} has been approved',
      category: 'notification',
      bodyPreview: 'Dear {{principal_name}}, We are pleased to inform you that {{school_name}} has been approved to participate...',
      variables: ['school_name', 'principal_name', 'approval_date'],
      lastModified: '2025-01-16',
      usageCount: 56,
      createdBy: 'Oluwaseun Adeleke'
    }
  ];

  const categories = [
    { value: 'invitation', label: 'Invitation' },
    { value: 'reminder', label: 'Reminder' },
    { value: 'confirmation', label: 'Confirmation' },
    { value: 'notification', label: 'Notification' },
    { value: 'feedback', label: 'Feedback' }
  ];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: EmailTemplate['category']) => {
    const colors: Record<string, string> = {
      invitation: 'bg-[#F5A623] text-white',
      reminder: 'bg-[#D4A017] text-white',
      confirmation: 'bg-[#2F6B3C] text-white',
      notification: 'bg-[#F5A623] text-white',
      feedback: 'bg-[#9E9E9E] text-white'
    };

    return (
      <span className={`px-2 py-1 rounded text-[11px] ${colors[category]}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleTestSend = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowTestModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Email Templates"
        subtitle="Create and manage email templates with dynamic variables"
        screenCode="ADM-COM01"
      />

      <div className="w-[1440px] mx-auto px-8 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Templates</span>
              <Mail className="w-4 h-4 text-[#2B2B2B]" />
            </div>
            <div className="text-[24px] text-[#2B2B2B]">{templates.length}</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Most Used</span>
              <Send className="w-4 h-4 text-[#F5A623]" />
            </div>
            <div className="text-[14px] text-[#2B2B2B]">Nomination Approved</div>
            <div className="text-[12px] text-[#9E9E9E]">56 uses</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9E9E9E]">Total Usage</span>
              <Send className="w-4 h-4 text-[#2F6B3C]" />
            </div>
            <div className="text-[24px] text-[#2F6B3C]">193</div>
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
                  placeholder="Search by name or subject..."
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
                <Mail className="w-5 h-5 text-[#F5A623]" />
              </div>

              {/* Subject Line */}
              <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                <div className="text-[11px] text-[#9E9E9E] mb-1">Subject Line:</div>
                <div className="text-[13px] text-[#2B2B2B]">{template.subject}</div>
              </div>

              {/* Body Preview */}
              <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                <div className="text-[11px] text-[#9E9E9E] mb-1">Body Preview:</div>
                <div className="text-[12px] text-[#2B2B2B] line-clamp-2">{template.bodyPreview}</div>
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
          <Mail className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div className="text-[12px] text-[#9E9E9E]">
            <strong className="text-[#2B2B2B]">Email Templates:</strong> Create reusable email templates with dynamic variables like {`{{school_name}}`}, {`{{principal_name}}`}, and {`{{tour_date}}`}. When you send an email using a template, the system automatically replaces variables with actual data. Use "Send" to compose a message to specific audiences, which will create records in "Emails Sent" screen.
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
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
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <div className="text-[12px] text-[#9E9E9E] mb-1">Subject:</div>
                  <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B]">
                    {selectedTemplate.subject}
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-[#9E9E9E] mb-1">Body:</div>
                  <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] whitespace-pre-line min-h-[200px]">
                    {selectedTemplate.bodyPreview}
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
                <h2 className="text-[18px] text-[#2B2B2B]">Send Email</h2>
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
                  <option>All Nominated Schools</option>
                  <option>Approved Schools - Lagos</option>
                  <option>Pending RECEE Schools</option>
                  <option>Assigned Facilitators</option>
                  <option>Custom List...</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Recipient Count</label>
                <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B]">
                  45 recipients
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#9E9E9E] mb-1.5">Send Test To (Optional)</label>
                <input 
                  type="email"
                  placeholder="your.email@example.com"
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
