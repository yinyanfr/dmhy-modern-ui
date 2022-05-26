import type { DMHYListParams } from '@/services';
import { useState } from 'react';

interface SearchModifier {
  keyword?: string;
  category?: string;
  group?: string;
  order?: string;
  uploader?: string;
  uploaderName?: string;
  page?: number;
}

export default () => {
  const [keyword, setKeyWord] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [group, setGroup] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [uploader, setUploader] = useState<string>();
  const [uploaderName, setUploaderName] = useState<string>();
  const [page, setPage] = useState(1);

  const init = () => {
    setKeyWord(undefined);
    setCategory(undefined);
    setGroup(undefined);
    setOrder(undefined);
    setUploader(undefined);
    setUploaderName(undefined);
    setPage(1);
  };

  const setSearch = (modifier: SearchModifier) => {
    const { keyword, category, group, order, uploader, uploaderName, page } =
      modifier;
    setKeyWord((prev) => keyword || prev);
    setCategory((prev) => category || prev);
    setGroup((prev) => group || prev);
    setOrder((prev) => order || prev);
    setUploader((prev) => uploader || prev);
    setUploaderName((prev) => uploaderName || prev);
    setPage(() => page || 1); // reset page when new criteria
  };

  const runSearch = (
    run?: (params?: DMHYListParams) => Promise<EelItem[]>,
    modifier?: SearchModifier,
  ) => {
    const {
      keyword: _keyword = keyword,
      category: _category = category,
      group: _group = group,
      order: _order = order,
      uploader: _uploader = uploader,
      uploaderName: _uploaderName = uploaderName,
      page: _page = 1, // reset page when new criteria
    } = modifier || {};
    setSearch(modifier || {});
    return run?.({
      keyword: _keyword ? encodeURI(_keyword) : undefined,
      categoryId: _category,
      groupId: _group,
      order: _order,
      uploaderId: _uploader,
      page: _page,
    });
  };

  return {
    keyword,
    setKeyWord,
    category,
    setCategory,
    group,
    setGroup,
    order,
    setOrder,
    uploader,
    setUploader,
    uploaderName,
    setUploaderName,
    page,
    setPage,
    init,
    setSearch,
    runSearch,
  };
};
