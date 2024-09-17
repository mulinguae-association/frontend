import React, { useState } from 'react';
import "./ellipsisMenu.scss";
import { useClickOutside } from '../../../utils/ClickOutside';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
function EllipsisMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  const { t } = useTranslation("pages/blogs");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuRef = useClickOutside(() => {
    setMenuOpen(false);
  })

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleEdit = () => {
    closeMenu();
    props.handleEdit(true);
  };

  const handleDelete = () => {
    props.handleDelete();
    closeMenu();
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <div className="menu-trigger" onClick={toggleMenu}>
        <div className="menu-icon">...</div>
      </div>
      {menuOpen && (
        <ul className={`menu-options ${isAr_Ur ? "ar" : "en"}`}>
          <li onClick={handleEdit}>{t("editBtn")}</li>
          <li onClick={handleDelete}>{t("deleteBtn")}</li>
        </ul>
      )}
    </div>
  );
}

export default React.memo(EllipsisMenu);
