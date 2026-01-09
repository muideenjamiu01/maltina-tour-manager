'use client'
import { CheckCircle, XCircle, AlertTriangle, Users, TrendingDown, MoreVertical } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"
import { DataTable } from '../../../../components/DataTable';

export default function Nominations() {
  const columns = [
    { key: 'id', label: 'ID', width: '100px' },
    { 
      key: 'schoolName', 
      label: 'School Name', 
      width: '250px' 
    },
    { 
      key: 'state', 
      label: 'State', 
      width: '120px',
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Lagos', value: 'Lagos' },
        { label: 'Kano', value: 'Kano' },
        { label: 'Rivers', value: 'Rivers' },
        { label: 'Kaduna', value: 'Kaduna' },
        { label: 'Oyo', value: 'Oyo' }
      ]
    },
    { key: 'lga', label: 'LGA', width: '150px' },
    { key: 'nominatorName', label: 'Nominator', width: '150px' },
    { key: 'submittedDate', label: 'Submitted', width: '120px' },
    { key: 'statusBadge', label: 'Status', width: '150px', sortable: false },
  ];

  const nominations = [
    {
      id: 'NOM-0089',
      schoolName: 'Ikeja Primary School',
      state: 'Lagos',
      lga: 'Ikeja',
      nominatorName: 'Adebayo Johnson',
      submittedDate: '2025-12-18',
      status: 'pending',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#D4A017]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Pending Review
        </span>
      )
    },
    {
      id: 'NOM-0088',
      schoolName: 'Surulere Community School',
      state: 'Lagos',
      lga: 'Surulere',
      nominatorName: 'Chinwe Okafor',
      submittedDate: '2025-12-18',
      status: 'pending',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#D4A017]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Pending Review
        </span>
      )
    },
    {
      id: 'NOM-0087',
      schoolName: 'Lekki Heights School',
      state: 'Lagos',
      lga: 'Eti-Osa',
      nominatorName: 'Tunde Ibrahim',
      submittedDate: '2025-12-17',
      status: 'duplicate',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#C7C7C7]">
          <Users className="w-3.5 h-3.5" />
          Duplicate
        </span>
      )
    },
    {
      id: 'NOM-0086',
      schoolName: 'Yaba Secondary School',
      state: 'Lagos',
      lga: 'Yaba',
      nominatorName: 'Amina Bello',
      submittedDate: '2025-12-17',
      status: 'approved',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#2F6B3C]">
          <CheckCircle className="w-3.5 h-3.5" />
          Approved
        </span>
      )
    },
    {
      id: 'NOM-0085',
      schoolName: 'Victoria Island Academy',
      state: 'Lagos',
      lga: 'Eti-Osa',
      nominatorName: 'Emeka Nwosu',
      submittedDate: '2025-12-16',
      status: 'rejected',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#8C1D18]">
          <XCircle className="w-3.5 h-3.5" />
          Rejected
        </span>
      )
    },
    {
      id: 'NOM-0084',
      schoolName: 'Mainland Central School',
      state: 'Lagos',
      lga: 'Lagos Mainland',
      nominatorName: 'Fatima Ahmed',
      submittedDate: '2025-12-16',
      status: 'pending',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#D4A017]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Pending Review
        </span>
      )
    },
    {
      id: 'NOM-0083',
      schoolName: 'Apapa Community School',
      state: 'Lagos',
      lga: 'Apapa',
      nominatorName: 'Samuel Obi',
      submittedDate: '2025-12-15',
      status: 'approved',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#2F6B3C]">
          <CheckCircle className="w-3.5 h-3.5" />
          Approved
        </span>
      )
    },
    {
      id: 'NOM-0082',
      schoolName: 'Mushin Primary',
      state: 'Lagos',
      lga: 'Mushin',
      nominatorName: 'Grace Adeleke',
      submittedDate: '2025-12-15',
      status: 'pending',
      statusBadge: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-[#D4A017]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Pending Review
        </span>
      )
    },
  ];

  const stats = {
    total: nominations.length,
    pending: nominations.filter(n => n.status === 'pending').length,
    approved: nominations.filter(n => n.status === 'approved').length,
    rejected: nominations.filter(n => n.status === 'rejected').length,
    duplicate: nominations.filter(n => n.status === 'duplicate').length,
    duplicateRate: Math.round((nominations.filter(n => n.status === 'duplicate').length / nominations.length) * 100),
    approvalRate: Math.round((nominations.filter(n => n.status === 'approved').length / nominations.filter(n => n.status !== 'pending').length) * 100)
  };

  const renderActions = (row: any) => {
    if (row.status === 'pending') {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#F5A623] text-white text-xs rounded-lg hover:bg-[#E09615] transition-colors">
            Approve
          </button>
          <button className="px-3 py-1.5 border border-[#E5E7EB] text-[#2B2B2B] text-xs rounded-lg hover:bg-[#F2F1EE] transition-colors">
            Reject
          </button>
          <button className="p-1.5 hover:bg-[#F2F1EE] rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
          </button>
        </div>
      );
    }
    
    if (row.status === 'duplicate') {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#F5A623] text-white text-xs rounded-lg hover:bg-[#E09615] transition-colors">
            Merge
          </button>
          <button className="p-1.5 hover:bg-[#F2F1EE] rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
          </button>
        </div>
      );
    }

    return (
      <button className="p-1.5 hover:bg-[#F2F1EE] rounded-lg transition-colors">
        <MoreVertical className="w-4 h-4 text-[#9E9E9E]" />
      </button>
    );
  };

  const bulkActions = (
    <>
      <button className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09615] transition-colors text-sm">
        Bulk Approve
      </button>
      <button className="px-4 py-2 border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F2F1EE] transition-colors text-sm">
        Bulk Reject
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <AdminHeader 
        title="Nominations" 
        subtitle="Review and approve school nominations"
      />

      {/* Content */}
      <div className="p-8 max-w-[1200px]">
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-5">
            <div className="text-sm text-[#9E9E9E] mb-1">Total Volume</div>
            <div className="text-3xl text-[#2B2B2B] mb-1">{stats.total}</div>
            <div className="text-xs text-[#9E9E9E]">This month</div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-5">
            <div className="text-sm text-[#9E9E9E] mb-1">Pending Review</div>
            <div className="text-3xl text-[#D4A017] mb-1">{stats.pending}</div>
            <div className="text-xs text-[#9E9E9E]">Needs action</div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-5">
            <div className="text-sm text-[#9E9E9E] mb-1">Duplicate Rate</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl text-[#8C1D18]">{stats.duplicateRate}%</div>
              <TrendingDown className="w-5 h-5 text-[#2F6B3C]" />
            </div>
            <div className="text-xs text-[#2F6B3C]">-5% vs last month</div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-5">
            <div className="text-sm text-[#9E9E9E] mb-1">Approval Rate</div>
            <div className="text-3xl text-[#2F6B3C] mb-1">{stats.approvalRate}%</div>
            <div className="text-xs text-[#9E9E9E]">Of reviewed</div>
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-5">
            <div className="text-sm text-[#9E9E9E] mb-1">Avg Review Time</div>
            <div className="text-3xl text-[#2B2B2B] mb-1">2.3</div>
            <div className="text-xs text-[#9E9E9E]">Days</div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={nominations}
          actions={renderActions}
          onRowSelect={(selected) => console.log('Selected:', selected)}
          bulkActions={bulkActions}
          title="Nomination Queue"
          subtitle="Review and process school nominations"
        />
      </div>
    </div>
  );
}