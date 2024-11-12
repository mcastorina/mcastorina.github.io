var inErrState = false;

function setErr() {
  if (inErrState) {
    return;
  }
  inErrState = true;
  var box = document.querySelector("#prompt");
  const originalStyle = box.style.border;
  box.style.border = "3px solid red";
  setTimeout(() => {
    box.style.transition = "border 2s";
    box.style.border = originalStyle;
    setTimeout(() => {
      box.style.transition = "";
      inErrState = false;
    }, 100);
  }, 3000);
}

function runCmd(line) {
  const args = line.split(" ");
  if (args.length == 0 || args.length >= 3 || args[0] != "cd") {
    setErr();
    return;
  }
  var loc = "/";
  if (args.length == 2) {
    loc = args[1];
  }
  window.location.href = loc;
}

window.addEventListener("load", function (event) {
  var cmd = document.querySelector("#cmd");
  cmd.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
      const value = cmd.value;
      cmd.value = "";
      runCmd(value);
    }
  });
});
