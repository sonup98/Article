import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { ARTICLE_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import {  after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const totalViews  = await client
    .withConfig({ useCdn: false })
    .fetch(ARTICLE_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};
export default View;