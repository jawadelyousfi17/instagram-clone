import { Skeleton } from "@/components/ui/skeleton";

const PostLoading = () => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="flex gap-3 px-1 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-22 h-2 rounded-2xl"></Skeleton>
      </div>
      <Skeleton className=" aspect-square w-full rounded-none"></Skeleton>
      <div className="flex flex-col px-4 gap-2 py-3 pr-12">
        <Skeleton className="full h-2 rounded-2xl"></Skeleton>
        <Skeleton className="w-full h-2 rounded-2xl"></Skeleton>
      </div>
    </div>
  );
};

export default PostLoading;
