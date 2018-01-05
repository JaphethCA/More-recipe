import React from 'react';
import './footer.scss';

/**
 * @description displays app footer
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const Footer = () => (
  <div>
    <footer className="page-footer">
      <p className="footer-copyright">
            © 2017 More Recipe
            Designed By Chidex
      </p>
    </footer>
  </div>
);


export default Footer;
