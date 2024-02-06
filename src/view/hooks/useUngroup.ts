import { useCallback, useContext } from "react";

import { TabGroup } from "../../model/TabContainer";
import { ungroup } from "../../repository/TabGroupRepository";
import { getWindows } from "../../repository/WindowsRepository";
import { WindowsContext } from "../contexts/Windows";

export const useUngroup = (): ((tabGroup: TabGroup) => Promise<void>) => {
  const { setWindows } = useContext(WindowsContext);

  const callback = useCallback(
    async (tabGroup: TabGroup) => {
      await ungroup(tabGroup);
      const newWindows = await getWindows();
      setWindows(newWindows);
    },
    [setWindows],
  );

  return callback;
};