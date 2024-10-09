import React from 'react';
import classes from './ViewCounterPagination.module.css';
import { useStore } from '../../../stores/storeContext';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

const ViewCounterPagination: React.FC = observer(() => {
  const store = useStore();
  const [pageTotalCount, setPageTotalCount] = useState(0);
  const [currentPage, setCurPage] = useState(1);

  const handleChangePage = (pageValue: number) => {
    if (pageValue !== currentPage) {
      setCurPage(pageValue);
      store.changePage(pageValue);
    }
  };

  useEffect(() => {
    store.loadPagination().then(() => {
      setPageTotalCount(store.paginationCount);
    });
  }, [store]);

  const maxVisiblePages = 6;

  const renderPageNumbers = () => {
    const pages = [];

    if (pageTotalCount <= maxVisiblePages) {
      for (let i = 1; i <= pageTotalCount; i++) {
        pages.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Если страниц больше, чем 6
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(pageTotalCount, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= pageTotalCount - 3) {
        pages.push(
          <button key="ellipsis" disabled>
            …
          </button>
        );
        startPage = pageTotalCount - 5;
        endPage = pageTotalCount;
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={i === currentPage ? classes.active : ''}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </button>
        );
      }

      // Добавляем кнопку "..."
      if (currentPage < pageTotalCount - 3) {
        pages.push(
          <button key="ellipsis" disabled>
            …
          </button>
        );
        pages.push(
          <button
            key={pageTotalCount}
            onClick={() => handleChangePage(pageTotalCount)}
          >
            {pageTotalCount}
          </button>
        );
      }
    }

    return pages;
  };

  return <div className={classes.pagination}>{renderPageNumbers()}</div>;
});

export default ViewCounterPagination;
