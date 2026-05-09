import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="footer__copy">Copyright © 2025 Lucas da Silva. Todos os direitos reservados.</span>
    </footer>
  );
}
