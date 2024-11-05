async function verificarToken() {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      window.location.href = "/login"; 
      return;
    }
  
    try {
            const response = await fetch('https://parseapi.back4app.com/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Parse-Application-Id': 'sua-app-id', 
          'X-Parse-REST-API-Key': 'sua-api-key', 
        }
      });
  
      if (response.ok) {
        
        console.log('Token válido');
        document.getElementById('logout-btn').style.display = 'block'; 
        return;
      } else {
       
        console.log('Token inválido ou expirado');
        localStorage.removeItem("token"); 
        window.location.href = "/login"; 
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      window.location.href = "/login"; 
    }
  }
  
  
  function logout() {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  }
  
  document.addEventListener("DOMContentLoaded", verificarToken);
  