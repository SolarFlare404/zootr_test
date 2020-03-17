window.addEventListener("load", main);

window.addEventListener("load", tab_opened);
window.addEventListener("unload", tab_closed);

function tab_opened()
{
  writeUserData('Sam2', 'Sam', 'sam.yahoo', 'google.com');
}

function tab_closed()
{
  removeUser('Sam2');
}

function CreateElementWithClass(className)
{
  let elem = document.createElement("div");
  
  for(var i = 0; i < className.length; ++i)
  {
    elem.classList.add(className[i]);
  }
  
  elem.id = "mrb";
  
  let childElem = document.createElement("p");
  childElem.innerHTML = "Dynamically made box";
  
  elem.appendChild(childElem);
  
  document.body.appendChild(elem);
  
  elem.addEventListener("mousedown", onMouseDown);
  elem.addEventListener("mouseup"  , onMouseUp);
}

function main()
{
  let database = firebase.database();
  
  CreateElementWithClass(["myBox", "myRedBox"]);
  
  //writeUserData('1', 'shareef', 'sam.yahoo', 'google.com');
  //writeUserData('2', 'shareef', 'sam.yahoo', 'google.com');
  //writeUserData('10', 'shareef', 'sam.yahoo', 'google.com');
  //writeUserData('15', 'shareef', 'sam.yahoo', 'google.com');
  //writeUserData('3', 'shareef', 'sam.yahoo', 'google.com');
  //writeUserData('111', 'shareef', 'sam.yahoo', 'google.com');
  
  
  
  //elem.addEventListener("click", onClick);
  
  let elem = document.getElementById("mrb");
  elem.addEventListener("mousedown", onMouseDown);
  elem.addEventListener("mouseup"  , onMouseUp);
  
  let auth = firebase.auth();
  
  auth.onAuthStateChanged(userAuthenticationStateChanged);
  auth.signInAnonymously().uid;
  
  //let userId = firebase.auth().currentUser.uid;
  
  //console.log('User ID: ' + userId);
}

function userAuthenticationStateChanged(user)
{
  if(user)
  {
      // User is signed in
    console.log('User ' + user.uid + ' changed state');
  }
  else
  {
      // User is signed out
    console.log('User is logged out');
  }
}

function removeUser(userId)
{
  firebase.database().ref('users/' + userId).remove();
}

function isUserValid(userId)
{
  firebase.database().ref('users/' + userId)
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
  
  writeUserData('Sam', 'sam', 'yahoo', 'google');
}

function onMouseUp(event)
{
  event.currentTarget.classList.remove('Task');
  
  removeUser('Sam');
}

function onClick(event)
{
  //current target is what the listener is tied to
  event.currentTarget.classList.add('Task');
}