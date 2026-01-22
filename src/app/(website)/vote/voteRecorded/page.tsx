import Image from "next/image";
import VoteRecordedSection from "@/components/website/vote/VoteRecorded";
import voteDesigns from "@/data/vote-mock-data";
import { Design } from "@/types/vote.types";

type SearchParams = {
  voteId?: string;
  designId?: string;
};

export default function VoteRecorded({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const voteId = searchParams.voteId;
  const designId = searchParams.designId
    ? Number(searchParams.designId)
    : undefined;

  // 🔑 Find the design using designId
  const design: Design | undefined = designId
    ? voteDesigns.find((d) => d.id === designId)
    : undefined;

  return (
    <div className="relative min-h-screen pt-20">
      <Image
        src="/images/websites/vote/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10">
        <VoteRecordedSection design={design} voteId={voteId} />
      </div>
    </div>
  );
}
