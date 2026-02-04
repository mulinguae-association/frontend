import React from "react";
import { useSelection } from "../hooks/useSelection";

/**
 * SelectableList - reusable component for selecting one or more items for bulk actions.
 * @param {Array} items - Array of items (must have unique idKey)
 * @param {string} [idKey='_id'] - Key for unique ID
 * @param {function} renderRow - Render function for each row (item, selected, onSelect)
 * @param {function} renderActions - Render function for bulk actions (selected, allSelected, clearSelection)
 * @param {object} [style] - Container style
 * @param {Array} [selected] - Controlled selected IDs
 * @param {function} [onSelectionChange] - Callback for selection changes
 */
const SelectableList = ({
  items = [],
  idKey = "_id",
  renderRow,
  renderActions,
  style = {},
  selected: controlledSelected,
  onSelectionChange,
}) => {
  // If controlledSelected is provided, operate in controlled mode
  const uncontrolled = controlledSelected === undefined;
  const internal = uncontrolled ? useSelection(items, idKey) : null;

  const selected = uncontrolled ? internal.selected : controlledSelected;
  const allSelected = uncontrolled
    ? internal.allSelected
    : items.length > 0 && selected.length === items.length;
  const isIndeterminate = uncontrolled
    ? internal.isIndeterminate
    : selected.length > 0 && selected.length < items.length;

  const handleSelectAll = (checked) => {
    if (uncontrolled) return internal.handleSelectAll(checked);
    if (onSelectionChange) {
      if (checked) onSelectionChange(items.map((n) => n[idKey]));
      else onSelectionChange([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (uncontrolled) return internal.handleSelectOne(id, checked);
    if (!onSelectionChange) return;
    if (checked) onSelectionChange([...(selected || []), id]);
    else onSelectionChange((selected || []).filter((x) => x !== id));
  };

  const clearSelection = () => {
    if (uncontrolled) return internal.clearSelection();
    if (onSelectionChange) onSelectionChange([]);
  };

  return (
    <div className="selectable-list" style={style}>
      {renderActions &&
        renderActions({
          selected,
          allSelected,
          isIndeterminate,
          handleSelectAll,
          clearSelection,
          setSelected:
            onSelectionChange ||
            (uncontrolled ? internal.setSelected : undefined),
        })}
      <ul className="selectable-list-items">
        {items.map((item, idx) => (
          <li key={item[idKey] || idx}>
            {renderRow({
              item,
              selected: (selected || []).includes(item[idKey]),
              onSelect: (checked) => handleSelectOne(item[idKey], checked),
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectableList;
