import { useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { categoriesState } from '@/states/categories';
import { pageState } from '@/states/page';
import { queryState } from '@/states/query';
import { Post } from '@/types/post';
import { search } from '@/utils/search';
import { toUniqueArray } from '@/utils/to-unique-array';
import Fuse from 'fuse.js';

const POST_PER_PAGE = 12;

export default function usePosts(allPosts: Post[]) {
  const page = useRecoilValue(pageState);
  const query = useRecoilValue(queryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const fuse = new Fuse(allPosts, {
    keys: ['title'],
    includeScore: true,
  })

  const allPostsFiltered = useMemo(
    () => {
      if (query.length > 0) {
        let fuzzySearch = fuse.search(query).sort((a, b) => a.score! > b.score! ? 1 : -1)
        return fuzzySearch.map((f) => f.item)
      } else {
        return allPosts
      }
    },
    [allPosts, categories.selected, query]
  );

  const totalPages = Math.ceil(allPostsFiltered.length / POST_PER_PAGE);
  const offset = (page ? +page - 1 : 0) * POST_PER_PAGE;
  const postsForCurrentPage = allPostsFiltered.slice(
    offset,
    offset + POST_PER_PAGE
  );

  useEffect(() => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      active: toUniqueArray(
        allPostsFiltered.map((post) => post.categories).flat()
      ),
    }));
  }, [allPostsFiltered, setCategories]);

  return {
    posts: postsForCurrentPage,
    totalPages,
  };
}
