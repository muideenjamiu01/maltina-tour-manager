'use client'
import { useState } from 'react';
import { Search, Filter, Download, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { AdminHeader } from "@/components/admin/admin-header"

interface TeacherFeedback {
  id: string;
  school: string;
  teacherName: string;
  rating: number;
  recommendation: 'yes' | 'no';
  submissionDate: string;
  contentQuality: number;
  facilitatorDelivery: number;
  engagement: number;
  relevance: number;
  comment: string;
}

export default function TeacherSurvey() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const teacherFeedback: TeacherFeedback[] = [
    {
      id: 'TF-001',
      school: "King's College Lagos",
      teacherName: 'Mrs. Adebisi Ogunlade',
      rating: 4.8,
      recommendation: 'yes',
      submissionDate: '2025-02-15',
      contentQuality: 4.7,
      facilitatorDelivery: 4.9,
      engagement: 4.8,
      relevance: 4.8,
      comment: 'Excellent presentation! The students were highly engaged and learned a lot about Maltina. The facilitators were professional and well-prepared.'
    },
    {
      id: 'TF-002',
      school: "King's College Lagos",
      teacherName: 'Mr. Chukwudi Nwafor',
      rating: 4.5,
      recommendation: 'yes',
      submissionDate: '2025-02-15',
      contentQuality: 4.5,
      facilitatorDelivery: 4.6,
      engagement: 4.4,
      relevance: 4.5,
      comment: 'Very informative session. The children enjoyed the interactive activities and samples provided. Would recommend for other schools.'
    },
    {
      id: 'TF-003',
      school: 'Green Valley Secondary School',
      teacherName: 'Mrs. Fatima Ibrahim',
      rating: 4.7,
      recommendation: 'yes',
      submissionDate: '2025-02-18',
      contentQuality: 4.8,
      facilitatorDelivery: 4.6,
      engagement: 4.7,
      relevance: 4.7,
      comment: 'Outstanding tour experience! The facilitators handled the large group very well and kept everyone interested throughout.'
    },
    {
      id: 'TF-004',
      school: 'Unity Primary School',
      teacherName: 'Miss Blessing Okoro',
      rating: 4.2,
      recommendation: 'yes',
      submissionDate: '2025-02-20',
      contentQuality: 4.3,
      facilitatorDelivery: 4.2,
      engagement: 4.1,
      relevance: 4.2,
      comment: 'Good session overall. The younger children needed more simplified explanations but the facilitators adapted well.'
    },
    {
      id: 'TF-005',
      school: 'Unity Primary School',
      teacherName: 'Mr. Emmanuel Ade',
      rating: 4.4,
      recommendation: 'yes',
      submissionDate: '2025-02-20',
      contentQuality: 4.4,
      facilitatorDelivery: 4.5,
      engagement: 4.3,
      relevance: 4.4,
      comment: 'The children really enjoyed the tour. Great way to introduce brand awareness to young learners.'
    },
    {
      id: 'TF-006',
      school: 'Bright Future Academy',
      teacherName: 'Mrs. Aisha Mohammed',
      rating: 4.9,
      recommendation: 'yes',
      submissionDate: '2025-02-22',
      contentQuality: 4.9,
      facilitatorDelivery: 5.0,
      engagement: 4.8,
      relevance: 4.9,
      comment: 'Exceptional presentation! Best educational tour we have had. The students are still talking about it days later.'
    },
    {
      id: 'TF-007',
      school: 'Excellence International School',
      teacherName: 'Mr. David Okafor',
      rating: 4.6,
      recommendation: 'yes',
      submissionDate: '2025-02-25',
      contentQuality: 4.5,
      facilitatorDelivery: 4.7,
      engagement: 4.6,
      relevance: 4.6,
      comment: 'Very well organized and executed. The facilitators were knowledgeable and engaging with the students.'
    },
    {
      id: 'TF-008',
      school: 'Excellence International School',
      teacherName: 'Mrs. Jennifer Eze',
      rating: 3.8,
      recommendation: 'yes',
      submissionDate: '2025-02-25',
      contentQuality: 3.9,
      facilitatorDelivery: 3.8,
      engagement: 3.7,
      relevance: 3.8,
      comment: 'Good content but the session ran a bit long. Some students lost focus towards the end. Overall positive experience though.'
    },
    {
      id: 'TF-009',
      school: 'Capital Heights School',
      teacherName: 'Mr. Samuel Adewale',
      rating: 4.5,
      recommendation: 'yes',
      submissionDate: '2025-03-02',
      contentQuality: 4.6,
      facilitatorDelivery: 4.5,
      engagement: 4.4,
      relevance: 4.5,
      comment: 'Great educational value. The children learned about nutrition and brand values in an engaging way.'
    },
    {
      id: 'TF-010',
      school: 'Capital Heights School',
      teacherName: 'Mrs. Grace Nnamdi',
      rating: 3.5,
      recommendation: 'no',
      submissionDate: '2025-03-02',
      contentQuality: 3.6,
      facilitatorDelivery: 3.4,
      engagement: 3.5,
      relevance: 3.5,
      comment: 'The session was okay but felt a bit rushed. More time for questions would have been beneficial.'
    }
  ];

  // Filter feedback
  const filteredFeedback = teacherFeedback.filter(feedback => {
    const matchesSearch = feedback.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = filterSchool === 'all' || feedback.school === filterSchool;
    const matchesRating = filterRating === 'all' ||
      (filterRating === '4-5' && feedback.rating >= 4) ||
      (filterRating === '3-4' && feedback.rating >= 3 && feedback.rating < 4) ||
      (filterRating === 'below-3' && feedback.rating < 3);
    const matchesDate = filterDate === 'all' || 
      (filterDate === 'february' && feedback.submissionDate.includes('2025-02')) ||
      (filterDate === 'march' && feedback.submissionDate.includes('2025-03'));
    return matchesSearch && matchesSchool && matchesRating && matchesDate;
  });

  // Calculate metrics
  const avgOverallRating = filteredFeedback.length > 0
    ? filteredFeedback.reduce((sum, f) => sum + f.rating, 0) / filteredFeedback.length
    : 0;
  const avgContentQuality = filteredFeedback.length > 0
    ? filteredFeedback.reduce((sum, f) => sum + f.contentQuality, 0) / filteredFeedback.length
    : 0;
  const avgFacilitatorDelivery = filteredFeedback.length > 0
    ? filteredFeedback.reduce((sum, f) => sum + f.facilitatorDelivery, 0) / filteredFeedback.length
    : 0;
  const avgEngagement = filteredFeedback.length > 0
    ? filteredFeedback.reduce((sum, f) => sum + f.engagement, 0) / filteredFeedback.length
    : 0;
  const avgRelevance = filteredFeedback.length > 0
    ? filteredFeedback.reduce((sum, f) => sum + f.relevance, 0) / filteredFeedback.length
    : 0;
  const recommendCount = filteredFeedback.filter(f => f.recommendation === 'yes').length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating)
                ? 'fill-[#FFBC3A] text-[#FFBC3A]'
                : star - 0.5 <= rating
                ? 'fill-[#FFBC3A]/50 text-[#FFBC3A]'
                : 'fill-none text-[#E5E7EB]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader 
        title="Teacher Survey"
        subtitle="Feedback from teachers on tour quality and effectiveness"
        screenCode="TOUR-04"
        actions={
          <button className="px-4 py-2 bg-[#FF8500] text-white rounded-lg hover:bg-[#E07600] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Feedback
          </button>
        }
      />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Overall Satisfaction Score */}
        <div className="mb-6 bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] text-[#FF8500] font-bold mb-2">OVERALL SATISFACTION SCORE</div>
              <div className="flex items-center gap-3">
                <div className="text-[42px] text-[#FF8500]">{avgOverallRating.toFixed(1)}</div>
                <div>
                  {renderStars(avgOverallRating)}
                  <div className="text-[12px] text-[#9E9E9E] mt-1">Based on {filteredFeedback.length} responses</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ThumbsUp className="w-5 h-5 text-[#FF8500]" />
                  <span className="text-[24px] text-[#FF8500]">{recommendCount}</span>
                </div>
                <div className="text-[11px] text-[#9E9E9E]">Would Recommend</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ThumbsDown className="w-5 h-5 text-[#9E9E9E]" />
                  <span className="text-[24px] text-[#9E9E9E]">{filteredFeedback.length - recommendCount}</span>
                </div>
                <div className="text-[11px] text-[#9E9E9E]">Would Not Recommend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] text-[#9E9E9E] mb-2">Content Quality</div>
            <div className="flex items-center justify-between">
              <div className="text-[20px] text-[#2B2B2B]">{avgContentQuality.toFixed(1)}</div>
              {renderStars(avgContentQuality)}
            </div>
            <div className="h-1.5 bg-[#F2F1EE] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#FF8500]" 
                style={{ width: `${(avgContentQuality / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] text-[#9E9E9E] mb-2">Facilitator Delivery</div>
            <div className="flex items-center justify-between">
              <div className="text-[20px] text-[#2B2B2B]">{avgFacilitatorDelivery.toFixed(1)}</div>
              {renderStars(avgFacilitatorDelivery)}
            </div>
            <div className="h-1.5 bg-[#F2F1EE] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#FF8500]" 
                style={{ width: `${(avgFacilitatorDelivery / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] text-[#9E9E9E] mb-2">Student Engagement</div>
            <div className="flex items-center justify-between">
              <div className="text-[20px] text-[#2B2B2B]">{avgEngagement.toFixed(1)}</div>
              {renderStars(avgEngagement)}
            </div>
            <div className="h-1.5 bg-[#F2F1EE] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#FF8500]" 
                style={{ width: `${(avgEngagement / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="text-[12px] text-[#9E9E9E] mb-2">Content Relevance</div>
            <div className="flex items-center justify-between">
              <div className="text-[20px] text-[#2B2B2B]">{avgRelevance.toFixed(1)}</div>
              {renderStars(avgRelevance)}
            </div>
            <div className="h-1.5 bg-[#F2F1EE] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#FF8500]" 
                style={{ width: `${(avgRelevance / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Teacher Comments */}
        <div className="mb-6">
          <div className="text-[13px] text-[#FF8500] font-bold mb-3">RECENT TEACHER COMMENTS</div>
          <div className="grid grid-cols-2 gap-4">
            {filteredFeedback.slice(0, 4).map((feedback) => (
              <div key={feedback.id} className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[13px] text-[#2B2B2B]">{feedback.teacherName}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{feedback.school}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(feedback.rating)}
                    <span className="ml-1 text-[12px] text-[#2B2B2B]">{feedback.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#2B2B2B] leading-relaxed">{feedback.comment}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                  <div className="text-[11px] text-[#9E9E9E]">{feedback.submissionDate}</div>
                  {feedback.recommendation === 'yes' ? (
                    <div className="flex items-center gap-1 text-[#FF8500]">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Recommends</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[#9E9E9E]">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Does not recommend</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teachers or schools..."
              className="w-full pl-10 pr-4 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
            />
          </div>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="4-5">4-5 Stars</option>
            <option value="3-4">3-4 Stars</option>
            <option value="below-3">Below 3 Stars</option>
          </select>

          <select
            value={filterSchool}
            onChange={(e) => setFilterSchool(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Schools</option>
            {Array.from(new Set(teacherFeedback.map(f => f.school))).map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>

          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-[#FF8500] rounded-lg text-[14px] text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="february">February 2025</option>
            <option value="march">March 2025</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-[13px] text-[#9E9E9E]">
          Showing {filteredFeedback.length} feedback responses
        </div>

        {/* Feedback Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">School</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Teacher Name</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Recommendation</th>
                <th className="px-4 py-3 text-left text-[11px] text-[#FF8500] font-bold uppercase">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.map((feedback, index) => (
                <tr key={feedback.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF8]'}>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{feedback.school}</td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#2B2B2B]">{feedback.teacherName}</div>
                    <div className="text-[11px] text-[#9E9E9E]">{feedback.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {renderStars(feedback.rating)}
                      <span className="text-[13px] text-[#2B2B2B]">{feedback.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {feedback.recommendation === 'yes' ? (
                      <span className="px-2 py-1 bg-[#FEF3E2] text-[#FF8500] rounded text-[11px] flex items-center gap-1 w-fit">
                        <ThumbsUp className="w-3 h-3" />
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-[#F2F1EE] text-[#9E9E9E] rounded text-[11px] flex items-center gap-1 w-fit">
                        <ThumbsDown className="w-3 h-3" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#2B2B2B]">{feedback.submissionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFeedback.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
            <p className="text-[14px] text-[#9E9E9E]">No feedback found</p>
          </div>
        )}
      </div>
    </div>
  );
}
