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
    const {
      keyword: _keyword,
      category: _category,
      group: _group,
      order: _order,
      uploader: _uploader,
      uploaderName: _uploaderName,
      page: _page,
    } = modifier;
    setKeyWord((prev) => _keyword || prev);
    setCategory((prev) => _category || prev);
    setGroup((prev) => _group || prev);
    setOrder((prev) => _order || prev);
    setUploader((prev) => _uploader || prev);
    setUploaderName((prev) => _uploaderName || prev);
    setPage(() => _page || 1); // reset page when new criteria
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
