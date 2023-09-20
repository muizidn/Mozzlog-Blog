import BannerProject from './[slug]/banner_project';
import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getAllPosts, getAllPostCategories } from '@/services/posts';

export const metadata = {
  title: 'Blog',
  description:
    'Find you interesting posts that can help you finish your tasks faster.',
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const allCategories = await getAllPostCategories();

  return (
    <>
      <section className="mb-8 mt-0 space-y-2 md:mt-8">
        <SearchBar />
        <BannerProject url="https://www.tomioai.com/">
          <div className="flex flex-col items-end">
            <div>
              Try Free Preview Access to TomioAI, enjoy prompt library for more
              productive LLM experience. ↩️
            </div>
            <div>Go to https://tomioai.com</div>
          </div>
        </BannerProject>
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allPosts} />
    </>
  );
}
