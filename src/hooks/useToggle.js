import {useState, useCallback} from 'react';

export const useToggle = (initialValue = false)=> {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((val) => {
    setValue(v => typeof val == 'boolean' ? val : !v);
  }, []);
  return [value, toggle];
}