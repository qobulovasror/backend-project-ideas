const generateNum = document.getElementById("generateNum");
      const result = document.getElementById("result");
      const minNum = document.getElementById("minNum").value;
      const maxNum = document.getElementById("maxNum").value;
      const msg = document.getElementById('msg');

      generateNum.addEventListener("click", function () {
        let rand = Math.random() * (Number(maxNum) - Number(minNum));
        result.innerHTML =
          "<h3 class='text-center'>" + Math.round(rand) + "</h3>";
      });
      result.addEventListener("click", function () {
        if(!result.innerText) return;
        navigator.clipboard.writeText(result.innerText).then(
          function () {
            msg.innerHTML = '<div class="alert alert-success" role="alert">' + "Copying to clipboard was successful!"+ "</div>";
          },
          function (err) {
            msg.innerHTML = '<div class="alert alert-success" role="alert">' + "Could not copy text"+ "</div>";
          }
        );
        setTimeout(()=>{
          msg.innerHTML = '';
        }, 5000)
      });
      
      const generateNumInElem = document.getElementById('generateNumInElem');
      const numElem = document.getElementById('minNumElem');
      const resultInElem = document.getElementById('resultInElem');
      generateNumInElem.addEventListener('click', function (){
        let numList = numElem.value.toString().split(',');
        if(numList.length < 2) return;
        let rand = Math.random() * (numList.length - 1);
        resultInElem.innerHTML = "<h3 class='text-center'>" + numList[Math.floor(rand)] + "</h3>";
      });
      resultInElem.addEventListener("click", function () {
        if(!resultInElem.innerText) return;
        navigator.clipboard.writeText(resultInElem.innerText).then(
          function () {
            msg.innerHTML = '<div class="alert alert-success" role="alert">' + "Copying to clipboard was successful!"+ "</div>";
          },
          function (err) {
            msg.innerHTML = '<div class="alert alert-success" role="alert">' + "Could not copy text"+ "</div>";
          }
        );
        setTimeout(()=>{
          msg.innerHTML = '';
        }, 5000)
      });