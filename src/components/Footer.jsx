function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: 'center',
        position: 'fixed',        
        bottom: 0,                
        left: 0,
        width: '100%',          
        padding: '1rem',
        borderTop: '1px solid #ccc',
        backgroundColor: '#f1f1f1',
        zIndex: 100              
      }}
    >
      <p>© {anoAtual} Carlos Eduardo Vernizzi Silva. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
