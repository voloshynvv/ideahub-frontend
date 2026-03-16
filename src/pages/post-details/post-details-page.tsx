import { postQueries } from "@/api/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

const routeApi = getRouteApi("/posts/$id");

export const PostDetailsPage = () => {
  const { id } = routeApi.useParams();
  const { data: post } = useSuspenseQuery(postQueries.details(id));

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2">
        <ArrowLeftIcon />
        <span>Back</span>
      </Link>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};
