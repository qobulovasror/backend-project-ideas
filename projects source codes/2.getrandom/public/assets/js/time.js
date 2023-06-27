const today = document.getElementById('today').innerText = new Date().toLocaleDateString();
      let hour = document.querySelector("#hour");
      let minute = document.querySelector("#minute");
      let secund = document.querySelector("#secund");

      let hourDisp = document.querySelector("#hourDisp");
      let minuteDisp = document.querySelector("#minuteDisp");
      let secundDisp = document.querySelector("#secundDisp");

      setInterval(function () {
        let secuntNumber = new Date().getUTCSeconds();
        let minuteNumber = new Date().getUTCMinutes();
        let hourNumber = new Date().getHours();
        secund.style.transform = `translate(-50%,-100%) rotate(${secuntNumber*6}deg)`;
        minute.style.transform = `translate(-50%,-100%) rotate(${minuteNumber*6}deg)`;
        hour.style.transform = `translate(-50%,-100%) rotate(${hourNumber*30}deg)`;

        if(secuntNumber < 10 )
            secundDisp.innerText =  "0"+ secuntNumber;
        else
            secundDisp.innerText =  secuntNumber;
        if(minuteNumber < 10)
            minuteDisp.innerText = "0" + minuteNumber;
        else
            minuteDisp.innerText = minuteNumber;
        hourDisp.innerText = hourNumber;

        secuntNumber = null;
        minuteNumber = null;
        hourNumber = null;
      }, 1000);
      
      
      
      let settingBtn = document.getElementById("setting-Btn");
      settingBtn.addEventListener("click", function(){
          let moon = document.querySelector(".moon");
          let sunbtn = document.querySelector(".sunbtn");
          let munSun = document.querySelector("#mun-sun");
          if (munSun.className == "light") {
            munSun.className = "dark";
            sunbtn.style.transform = "translateX(18px)";
          } else {
            munSun.className = "light";
            sunbtn.style.transform = "translateX(0px)";
          }
      });
