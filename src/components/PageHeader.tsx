import { Plus, User } from 'lucide-react';

export function PageHeader() {
  return (
    <div className="pb-6 mb-6 border-b border-[#E5E7EB]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#1F2937] mb-1.5">School Clusters</h1>
          <p className="text-[#4B5563]">Manage school clusters and activation assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#FF8500] text-white rounded-lg hover:bg-[#E67700] transition-colors">
            <Plus className="w-5 h-5" />
            Create Cluster
          </button>
          <button className="w-10 h-10 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center hover:bg-[#F9FAFB] transition-colors">
            <User className="w-5 h-5 text-[#4B5563]" />
          </button>
        </div>
      </div>
    </div>
  );
}
