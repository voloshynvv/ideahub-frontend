import { useEffect } from "react";
import { useInViewport } from "@mantine/hooks";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import {
  postQueries,
  type GetPostsParams,
} from "@/features/posts/shared/queries";

export const usePosts = ({ queryTerm }: GetPostsParams) => {
  const { data: posts, fetchNextPage } = useSuspenseInfiniteQuery({
    ...postQueries.list({ queryTerm }),
    select: (data) => data.pages.flatMap((page) => page),
  });

  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) {
      fetchNextPage();
    }
  }, [inViewport, fetchNextPage]);

  return { posts, ref };
};
