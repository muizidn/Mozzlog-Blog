import BannerProject from '@/components/banner_project';
import PostsGrid from '@/components/posts/posts-grid';
import SubscribeNewsletter from '@/components/subscribe-newsletter';
import { getAllPosts } from '@/services/posts';

export const metadata = {
  title: 'Welcome | MozzLog',
};

export default async function HomePage() {
  const allPosts = await getAllPosts();

  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        Hello, What Mozz 🤖 Can Help You Today?
      </h1>
      <h2 className="mt-12 text-center text-3xl">
        We find problems. We get some help.
      </h2>
      <h3 className="mt-12 text-center text-3xl">
        We solve it. We share our learning.
      </h3>
      <h3 className="mt-12 text-center text-3xl">OK?</h3>
      <div className="flex w-full justify-center p-4">
        <BannerProject />
      </div>
      <div className="space-y-4">
        <h2 className="mt-12 text-center text-3xl font-bold">
          Weekly update is a must. Sometimes more.
        </h2>
        <div className="grid justify-items-center">
          <SubscribeNewsletter />
        </div>
      </div>
      <h2 className="mt-12 text-3xl font-bold">Post for Today</h2>
      <PostsGrid paginate={false} allPosts={allPosts.slice(0, 12)} />
      <h2 className="mt-12 text-3xl font-bold">Other Posts</h2>
      <PostsGrid paginate={false} allPosts={allPosts.reverse().slice(0, 12)} />
    </>
  );
}
