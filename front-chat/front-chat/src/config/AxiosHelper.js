fetch("http://localhost:8080/api/some-endpoint")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
