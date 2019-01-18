var er_msg_t = "Ошибка! Задайте время в формате ЧЧ:ММ:СС.\nError! Set the time in the format HH:MM:SS.";
var er_msg_p = "Ошибка! Значения параметра \"p\" могут быть только \"left\", \"center\" или \"right\".\nError! The value of the parameter \"p\" can be only \"left\", \"center\" or \"right\".";

window.onload = function() {
  var Start = "";
  var p = /^(..):(..):(..)$/;
  var divCont = document.getElementById("content");
  switch (getGet("p")) {
    case "left":
      divCont.classList.add("left");
      break;
    case "right":
      divCont.classList.add("right");
      break;
    case "center":
    case "":
      divCont.classList.add("center");
      break;
    default:
      alert(er_msg_p);
      return;
  }
  if (getGet("t").match(p)) {
    Start = getGet("t");
  } else {
    alert(er_msg_t);
    Start = "00:00:00";
    return;
  }
  var r = p.exec(Start);
  var h = r[1];
  var m = r[2];
  var s = r[3];
  var zz = document.getElementById("zz");
  var hh = document.getElementById("hh");
  var mm = document.getElementById("mm");
  var ss = document.getElementById("ss");
  hh.innerHTML = h;
  mm.innerHTML = m;
  ss.innerHTML = s;
  var timerId = setInterval(function() {
    if (ss.innerHTML == "00" && mm.innerHTML == "00" && hh.innerHTML == "00") {
        zz.innerHTML = "T+";
    }
    if (zz.innerHTML == "T-") {
      if (ss.innerHTML > 0) {
        ss.innerHTML = nd(Number.parseInt(ss.innerHTML) - 1);
      } else {
        ss.innerHTML = "59";
        if (mm.innerHTML > 0) {
          mm.innerHTML = nd(Number.parseInt(mm.innerHTML) - 1);
        } else {
          mm.innerHTML = "59";
          hh.innerHTML = nd(Number.parseInt(hh.innerHTML) - 1);
        }
      }
    } else if (zz.innerHTML == "T+") {
      if (ss.innerHTML < 59) {
        ss.innerHTML = nd(Number.parseInt(ss.innerHTML) + 1);
      } else {
        ss.innerHTML = "00";
        if (mm.innerHTML < 59) {
          mm.innerHTML = nd(Number.parseInt(mm.innerHTML) + 1);
        } else {
          mm.innerHTML = "00";
          hh.innerHTML = nd(Number.parseInt(hh.innerHTML) + 1);
        }
      }
    }
  }, 1000);
}

function nd(n) {
  var m = n;
  var i = 0;
  while (n > 0) {
    n = Math.floor(n/10);
    i++;
  }
  if (i == 1 || m == 0) {
    m = "0" + m;
  }
  return m;
}

function getGet(key) {
  var url = window.location.search;
  var p = "=([^&=]+)";
  url = url.match(new RegExp(key + p));
  return url ? url[1] : "";
}
