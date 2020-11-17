


document.getElementById("clickme").addEventListener("click", function() {
    fetch('./api/testmail',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Beispielprojekt',
        url: 'http://www.example.com',
      })
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
});