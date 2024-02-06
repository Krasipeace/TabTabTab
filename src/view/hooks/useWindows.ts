import { useCallback, useEffect, useState } from "react";

import { Window } from "../../model/Window";
import { getWindows } from "../../repository/WindowsRepository";

export const useWindows = () => {
  const [windows, setState] = useState([]);

  const sortByFocused = (windows: Window[]): Window[] => {
    return [...windows].sort(
      (a, b) => (b.focused ? 1 : 0) - (a.focused ? 1 : 0),
    );
  };

  useEffect(() => {
    const initState = async () => {
      const windows = await getWindows();
      setState(sortByFocused(windows));
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initState();
  }, []);

  const setWindows = useCallback((windows: Window[]) => {
    const sortedWindows = sortByFocused(windows);
    setState(sortedWindows);
  }, []);

  return {
    windows,
    setWindows,
  };
};