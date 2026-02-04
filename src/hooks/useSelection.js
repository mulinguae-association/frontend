import { useState, useEffect, useCallback, useMemo } from "react";

export function useSelection(items, idKey = "_id") {
  const [selected, setSelected] = useState([]);
  // Stable signature of items
  const itemIds = useMemo(
    () => items.map((item) => item[idKey]).join(","),
    [items, idKey],
  );

  useEffect(() => {
    setSelected([]);
  }, [itemIds]);

  const allSelected = items.length > 0 && selected.length === items.length;
  const isIndeterminate = selected.length > 0 && selected.length < items.length;

  const handleSelectAll = useCallback(
    (checked) => {
      if (checked) setSelected(items.map((n) => n[idKey]));
      else setSelected([]);
    },
    [items, idKey],
  );

  const handleSelectOne = useCallback((id, checked) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  }, []);

  const clearSelection = useCallback(() => setSelected([]), []);

  return {
    selected,
    setSelected,
    allSelected,
    isIndeterminate,
    handleSelectAll,
    handleSelectOne,
    clearSelection,
  };
}
