window.addEventListener("load", main);

function CreateElementWithClass(className)
{
  let elemMyBox = document.createElement("div");
  
  for(var i = 0; i < className.length; ++i)
  {
    elemMyBox.classList.add(className[i]);
  }
  
  //elemMyBox.classList.add("myBox","myRedBox");
  elemMyBox.id = "mrb";
  
  let childElemMyBox = document.createElement("p");
  childElemMyBox.innerHTML = "Dynamically made box";
  
  elemMyBox.appendChild(childElemMyBox);
  
  
  
  return elemMyBox;
}

function main()
{
  let database = firebase.database();
  
  document.body.appendChild(CreateElementWithClass(["myBox"]));
  
  writeUserData('1', 'shareef', 'sam.yahoo', 'google.com');
  writeUserData('2', 'shareef', 'sam.yahoo', 'google.com');
  writeUserData('10', 'shareef', 'sam.yahoo', 'google.com');
  writeUserData('15', 'shareef', 'sam.yahoo', 'google.com');
  writeUserData('3', 'shareef', 'sam.yahoo', 'google.com');
  writeUserData('111', 'shareef', 'sam.yahoo', 'google.com');
  
  //elem.addEventListener("click", onClick);
  
  let elem = document.getElementById("mrb");
  elem.addEventListener("mousedown", onMouseDown);
  elem.addEventListener("mouseup"  , onMouseUp);
  
  console.log('H377o World!');
  console.log(elem);
}

function writeUserData(userId, name, email, imageUrl)
{
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
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