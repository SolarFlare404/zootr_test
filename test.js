window.addEventListener("load", main)


function main()
{
  let elem = document.getElementById("mrb");
  
  //elem.addEventListener("click", onClick);
  
  elem.addEventListener("mousedown", onMouseDown)
  elem.addEventListener("mouseup"  , onMouseUp)
  
  console.log('H377o World!');
  console.log(elem);
}

function onMouseDown(event)
{
  event.currentTarget.classList.add('Task');
}

function onMouseUp(event)
{
  event.currentTarget.classList.remove('Task');
}

function onClick(event)
{
  //current target is what the listener is tied to
  event.currentTarget.classList.add('Task');
}