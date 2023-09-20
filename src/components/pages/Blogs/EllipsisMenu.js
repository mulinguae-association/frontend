import React, { useState } from 'react';
import "./ellipsisMenu.scss"
import { useClickOutside } from '../../../utils/ClickOutside';
function EllipsisMenu(props) {
  console.log(props)
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isEditComment, setIsEditComment] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuRef = useClickOutside(() => {
    setMenuOpen(false)
  })

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleEdit = () => {
    closeMenu();
    // setIsEditComment(true)
    props.handleEdit(true)
  };
  const handleDelete = () => {
    props.handleDelete();
    closeMenu();
  };


  return (
    <div className="menu-container" ref={menuRef}>
      <div className="menu-trigger" onClick={toggleMenu}>
        <div className="menu-icon">...</div>
        {/* &#x2026; */}
      </div>
      {menuOpen && (
        <ul className="menu-options">
          <li onClick={handleEdit}>Edit</li>
          <li onClick={handleDelete}>Delete</li>
        </ul>
      )}
    </div>
  );
}

export default React.memo(EllipsisMenu);
