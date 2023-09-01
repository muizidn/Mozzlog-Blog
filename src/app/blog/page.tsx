import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getAllPosts, getAllPostCategories } from '@/services/posts';

export const metadata = {
  title: 'Blog',
  description: 'Find you interesting posts that can help you finish your tasks faster.',
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const allCategories = await getAllPostCategories();

  return (
    <>
      <section className="mb-8 mt-0 space-y-2 md:mt-8">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allPosts} />
    </>
  );
}
