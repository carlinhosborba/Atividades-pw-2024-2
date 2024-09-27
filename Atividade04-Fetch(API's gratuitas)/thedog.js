document.getElementById('fetchDogImageButton').addEventListener('click', () => {
    const apiURL = 'https://dog.ceo/api/breeds/image/random';
  
    fetchDogImage(apiURL);
  });
  
  async function fetchDogImage(apiURL) {
      try {
        const response = await fetch(apiURL);
  
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data);
  
        const dogImageElement = document.getElementById('dogImage');
  
        dogImageElement.src = data.message;
        dogImageElement.style.display = 'block';
    } catch (error) {
      console.error('Erro ao buscar a imagem do cachorro:', error);
      document.getElementById('output').textContent = `Erro ao buscar imagem: ${error.message}`;
    }
  }