import Link from 'components/Link';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© ${new Date().getFullYear()} Crafted By Yours Truly`}
    </span>
    {/* <Link secondary className="footer__link" href="/humans.txt" target="_self">
      Crafted by yours truly
    </Link> */}
    <span className="footer__date">
      {`Madhura Kanfade, Jsh Agrawal, Maaz Malik, Jiten Genwani`}
    </span>
  </footer>
);

export default Footer;
