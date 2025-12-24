'use client';

import { AlertTriangle, CheckCircle, Clock, Users, AlertCircle, Calendar, Plus, ArrowRight } from 'lucide-react';
import { AdminHeader } from '@/components/admin/admin-header';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KPICardProps {
  label: string;
  value: string | number;
  subValue?: string;
  status: 'healthy' | 'attention' | 'blocked' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

function KPICard({ label, value, subValue, status, icon: Icon }: KPICardProps) {
  const getStatusStyles = (status: KPICardProps['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-[#2F6B3C]/10 border-[#2F6B3C]/20';
      case 'attention':
        return 'bg-[#D4A017]/10 border-[#D4A017]/20';
      case 'blocked':
        return 'bg-[#8C1D18]/10 border-[#8C1D18]/20';
      default:
        return 'bg-white border-[#E5E7EB]';
    }
  };

  const getIconColor = (status: KPICardProps['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-[#2F6B3C]';
      case 'attention':
        return 'text-[#D4A017]';
      case 'blocked':
        return 'text-[#8C1D18]';
      default:
        return 'text-[#9E9E9E]';
    }
  };

  const getValueColor = (status: KPICardProps['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-[#2F6B3C]';
      case 'attention':
        return 'text-[#D4A017]';
      case 'blocked':
        return 'text-[#8C1D18]';
      default:
        return 'text-[#2B2B2B]';
    }
  };

  return (
    <Card className={`border ${getStatusStyles(status)} hover:shadow-md transition-shadow`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${status === 'neutral' ? 'bg-[#9E9E9E]/10' : getStatusStyles(status)} rounded-lg flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${getIconColor(status)}`} />
            </div>
            <span className="text-xs text-[#9E9E9E] uppercase tracking-wide">{label}</span>
          </div>
          <Icon className={`w-4 h-4 ${getIconColor(status)}`} />
        </div>
        <div className={`text-3xl mb-1 font-bold ${getValueColor(status)}`}>{value}</div>
        {subValue && <div className={`text-xs ${getValueColor(status)}`}>{subValue}</div>}
      </CardContent>
    </Card>
  );
}

interface BottleneckStageProps {
  stage: string;
  count: number;
  total: number;
  status: 'healthy' | 'attention' | 'blocked';
}

function BottleneckStage({ stage, count, total, status }: BottleneckStageProps) {
  const percentage = Math.round((count / total) * 100);
  
  const getStatusColor = (status: BottleneckStageProps['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-[#2F6B3C]';
      case 'attention':
        return 'text-[#D4A017]';
      case 'blocked':
        return 'text-[#8C1D18]';
      default:
        return 'text-[#9E9E9E]';
    }
  };

  const getStatusBg = (status: BottleneckStageProps['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-[#2F6B3C]';
      case 'attention':
        return 'bg-[#D4A017]';
      case 'blocked':
        return 'bg-[#8C1D18]';
      default:
        return 'bg-[#9E9E9E]';
    }
  };

  return (
    <div className="flex-1">
      <div className="text-xs text-[#9E9E9E] mb-1.5 uppercase tracking-wide">{stage}</div>
      <div className={`text-2xl mb-1 font-bold ${getStatusColor(status)}`}>{count}</div>
      <div className="text-xs text-[#9E9E9E] mb-2">{percentage}% of {total}</div>
      <div className="w-full bg-[#F2F1EE] rounded-full h-1.5">
        <div className={`${getStatusBg(status)} h-1.5 rounded-full transition-all duration-300`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface ActionQueueRowProps {
  issue: string;
  school: string;
  age: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  cta: string;
}

function ActionQueueRow({ issue, school, age, owner, priority, cta }: ActionQueueRowProps) {
  const getPriorityColor = (priority: ActionQueueRowProps['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-[#8C1D18]';
      case 'medium':
        return 'bg-[#D4A017]';
      case 'low':
        return 'bg-[#C7C7C7]';
      default:
        return 'bg-[#9E9E9E]';
    }
  };

  return (
    <tr className="border-b border-[#E5E7EB] hover:bg-[#FFFDF8] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(priority)}`} />
          <span className="text-sm text-[#2B2B2B]">{issue}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-[#2B2B2B]">{school}</td>
      <td className="px-4 py-3 text-sm text-[#9E9E9E]">{age}</td>
      <td className="px-4 py-3 text-sm text-[#2B2B2B]">{owner}</td>
      <td className="px-4 py-3">
        <Button 
          size="sm" 
          className="bg-[#F5A623] hover:bg-[#E09615] text-white"
        >
          {cta}
        </Button>
      </td>
    </tr>
  );
}

export default function AdminHomePage() {
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    year: '',
    targetSchools: '',
    targetChildren: ''
  });

  const actionQueue: ActionQueueRowProps[] = [
    { issue: 'Missing RECEE submission', school: 'Ikeja Primary School', age: '5 days', owner: 'O. Adebayo', priority: 'high', cta: 'Reassign' },
    { issue: 'Slot booking expired', school: 'Surulere Community School', age: '3 days', owner: 'A. Okonkwo', priority: 'high', cta: 'Extend' },
    { issue: 'Facilitator unconfirmed', school: 'Yaba Secondary', age: '2 days', owner: 'C. Nwankwo', priority: 'medium', cta: 'Assign' },
    { issue: 'Low survey completion', school: 'Victoria Island Academy', age: '1 day', owner: 'T. Ibrahim', priority: 'medium', cta: 'Follow Up' },
    { issue: 'Duplicate nomination', school: 'Lekki Heights School', age: '4 hours', owner: 'S. Bello', priority: 'low', cta: 'Merge' },
  ];

  const handleCreateCampaign = () => {
    // Handle campaign creation logic here
    console.log('Creating campaign:', campaignForm);
    setShowCreateCampaignModal(false);
    setCampaignForm({ name: '', year: '', targetSchools: '', targetChildren: '' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader 
        title="Campaign Overview" 
        subtitle="Real-time campaign health and decision dashboard"
        showFilters={true}
        actions={
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-[#E5E7EB] text-[#2B2B2B] hover:bg-[#F9FAFB]"
            >
              View All Campaigns
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => setShowCreateCampaignModal(true)}
              className="bg-[#F5A623] hover:bg-[#E09612] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        }
      />

      {/* Content */}
      <div className="p-8 max-w-[1200px] mx-auto">
        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Tours Today"
            value={18}
            subValue="12 scheduled, 6 activated"
            status="healthy"
            icon={Calendar}
          />
          <KPICard
            label="Missing Submissions"
            value={4}
            subValue="2 overdue +3 days"
            status="attention"
            icon={AlertTriangle}
          />
          <KPICard
            label="Staffing Gaps"
            value={7}
            subValue="Next 7 days"
            status="blocked"
            icon={Users}
          />
          <KPICard
            label="Schools at Risk"
            value={3}
            subValue="Low facilitation rating"
            status="attention"
            icon={AlertCircle}
          />
        </div>

        {/* Bottleneck Pipeline */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-[#2B2B2B]">Pipeline Flow</CardTitle>
                <p className="text-sm text-[#9E9E9E] mt-1">Where is the pipeline breaking?</p>
              </div>
              <Button variant="link" className="text-[#F5A623] hover:underline p-0">
                View Details →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <BottleneckStage stage="Nomination" count={245} total={245} status="healthy" />
              <div className="w-px bg-[#E5E7EB] my-4" />
              <BottleneckStage stage="Interest" count={198} total={245} status="healthy" />
              <div className="w-px bg-[#E5E7EB] my-4" />
              <BottleneckStage stage="RECEE" count={142} total={245} status="attention" />
              <div className="w-px bg-[#E5E7EB] my-4" />
              <BottleneckStage stage="Booked" count={89} total={245} status="attention" />
              <div className="w-px bg-[#E5E7EB] my-4" />
              <BottleneckStage stage="Activated" count={67} total={245} status="blocked" />
              <div className="w-px bg-[#E5E7EB] my-4" />
              <BottleneckStage stage="Published" count={52} total={245} status="healthy" />
            </div>
          </CardContent>
        </Card>

        {/* Action Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-[#2B2B2B]">Action Queue</CardTitle>
                <p className="text-sm text-[#9E9E9E] mt-1">Prioritized by risk and age</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-[#8C1D18] text-[#8C1D18]">
                  <span className="w-2 h-2 rounded-full bg-[#8C1D18] mr-1.5" />
                  High
                </Badge>
                <Badge variant="outline" className="border-[#D4A017] text-[#D4A017]">
                  <span className="w-2 h-2 rounded-full bg-[#D4A017] mr-1.5" />
                  Medium
                </Badge>
                <Badge variant="outline" className="border-[#C7C7C7] text-[#C7C7C7]">
                  <span className="w-2 h-2 rounded-full bg-[#C7C7C7] mr-1.5" />
                  Low
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F2F1EE]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider font-medium">Issue</th>
                    <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider font-medium">School</th>
                    <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider font-medium">Age</th>
                    <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider font-medium">Owner</th>
                    <th className="px-4 py-3 text-left text-xs text-[#9E9E9E] uppercase tracking-wider font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {actionQueue.map((item, idx) => (
                    <ActionQueueRow key={idx} {...item} />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Modal */}
      <Dialog open={showCreateCampaignModal} onOpenChange={setShowCreateCampaignModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg text-[#2B2B2B]">Create New Campaign</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName" className="text-xs text-[#9E9E9E] uppercase tracking-wide">
                Campaign Name
              </Label>
              <Input
                id="campaignName"
                type="text"
                placeholder="e.g., Maltina Nourishment Programme 2026"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1.5 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
              />
            </div>

            <div>
              <Label htmlFor="campaignYear" className="text-xs text-[#9E9E9E] uppercase tracking-wide">
                Year
              </Label>
              <Select 
                value={campaignForm.year} 
                onValueChange={(value) => setCampaignForm(prev => ({ ...prev, year: value }))}
              >
                <SelectTrigger className="mt-1.5 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetSchools" className="text-xs text-[#9E9E9E] uppercase tracking-wide">
                  Target Schools
                </Label>
                <Input
                  id="targetSchools"
                  type="number"
                  placeholder="800"
                  value={campaignForm.targetSchools}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, targetSchools: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
              <div>
                <Label htmlFor="targetChildren" className="text-xs text-[#9E9E9E] uppercase tracking-wide">
                  Target Children
                </Label>
                <Input
                  id="targetChildren"
                  type="number"
                  placeholder="120000"
                  value={campaignForm.targetChildren}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, targetChildren: e.target.value }))}
                  className="mt-1.5 w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
              <p className="text-xs text-[#9E9E9E]">
                After creating the campaign, you can add cycles (Q1, Q2, etc.) and configure targets for each cycle.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCreateCampaignModal(false)}
              className="border-[#E5E7EB] text-[#2B2B2B] hover:bg-[#F9FAFB]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateCampaign}
              className="bg-[#F5A623] hover:bg-[#E09612] text-white"
            >
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}