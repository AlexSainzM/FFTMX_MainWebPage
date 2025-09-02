// Optional: small enhancement to make entire tiles keyboard-accessible via Enter key
document.querySelectorAll('.menu-card').forEach(card=>{
  card.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      card.click();
    }
  });
});
