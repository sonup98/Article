import { Search } from "lucide-react";
import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import { title } from "process";
import { ARTICLE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import ArticleCard, { ArticleTypeCard } from "@/components/ArticleCard";


export default async function Home({searchParams}:{
  searchParams: Promise<{query?: string}>
}) {
    const query = (await searchParams).query;

    const params = { search: query || null}

    const session = await auth();
    console.log(session?.id);
  
   const { data: posts} = await sanityFetch({query:ARTICLE_QUERY, params});

  return (
    <>
        <section className="pink_container">
            <h1 className="heading">Your Hub for Information & Ideas ,<br/>The Free Encyclopedia for Everyone</h1>

            <p className="sub-heading !max-w-3xl">
              Join a Community of Knowledge Seekers
            </p>
            <SearchForm query={query} />

        </section>
        <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Articles"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ArticleTypeCard) => (
              <ArticleCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Article found</p>
          )}
        </ul>
      </section>
          <SanityLive />
    </>
  );
}
