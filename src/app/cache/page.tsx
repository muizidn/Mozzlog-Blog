import { getAllPosts } from '@/services/posts';

export default async function CachePage() {
  const allPosts = await getAllPosts();

  return <div id="posts" data-posts={JSON.stringify(allPosts)} />;
}
