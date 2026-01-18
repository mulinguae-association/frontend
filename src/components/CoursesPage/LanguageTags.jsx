import React from 'react';
import { Link } from 'react-router-dom';

const LanguageTags = ({ languages }) => {
  return (
    <div className="language-tags">
      {languages.map((language) => (
        <Link
          key={language.value}
          to={`/${language.value}/pages/100-basic-phrases/`}
          className="language-tag"
        >
          {language.label}
        </Link>
      ))}
    </div>
  );
};

export default LanguageTags;
