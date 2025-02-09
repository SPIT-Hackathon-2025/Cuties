import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© ${new Date().getFullYear()} Crafted By Yours Truly`}
    </span>

    <span className="footer__date">
      <a href="https://www.linkedin.com/in/madhura-kanfade-28816a249/" target="_blank" rel="noopener noreferrer">
        Madhura Kanfade
      </a>,{' '}
      <a href="https://www.linkedin.com/in/jsh-agarwal/" target="_blank" rel="noopener noreferrer">
        Jsh Agrawal
      </a>,{' '}
      <a href="https://www.linkedin.com/in/maaz-malik-632756255/" target="_blank" rel="noopener noreferrer">
        Maaz Malik
      </a>,{' '}
      <a href="https://www.linkedin.com/in/jiten-ganwani/" target="_blank" rel="noopener noreferrer">
        Jiten Genwani
      </a>
    </span>
  </footer>
);

export default Footer;