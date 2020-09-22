import { useEffect } from 'react';
import { jumpToTop } from '../utils/uiBehavior';

function useJumpToTop(deps = []) {
  useEffect(() => {
    jumpToTop();
  }, deps);
}

export default useJumpToTop;