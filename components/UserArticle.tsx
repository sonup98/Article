import React from "react";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import ArticleCard, { ArticleTypeCard } from "./ArticleCard";

const UserArticle = async ({ id }: { id: string }) => {
  const startups = await client.fetch(ARTICLE_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: ArticleTypeCard) => (
          <ArticleCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserArticle;