window.addEventListener("load", main);

const _entryPath = 'entries/';
let jsonFiles = null;
let isValid = true;


function main()
{
    // Read all the filenames
  let entries = getEntry(_entryPath, "");
  setDataReadCallback(entries, 'value', readEntries);
  
  //CreateElementWithClass(["myBox", "myRedBox"]);
  
  createEntryElement();
  
  readTextFile("jsons/1.json", doneReadTextFile);
}

function checkReadComplete(callbackFunc)
{
  if(jsonFiles === null)
  {
    setTimeout(function(){checkReadComplete(callbackFunc);}, 1000);
  }
  else
  {
    callbackFunc();
  }
}

////////////////////////////////////////////////////////////////////////////////
// JSON
{
  // Gift from Shareef Raheem
function readTextFile(file, callback=doneReadTextFile)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function ()
  {
    if (rawFile.readyState === 4)
    {
      if (rawFile.status === 200 || rawFile.status == 0)
      {
        var allText = rawFile.responseText;
        callback(allText);
      }
    }
  }
  rawFile.send(null);
}

function doneReadTextFile(text)
{
  let json = JSON.parse(text);
  //console.log(json);
  
  createEntryElementFromJSON(json);
}
}

////////////////////////////////////////////////////////////////////////////////
// HTML
{
function CreateElementWithClass(className)
{
  let elem = document.createElement("div");
  
  for(var i = 0; i < className.length; ++i)
  {
    elem.classList.add(className[i]);
  }
  
  elem.id = "mrb";
  
  createChild("p", [], "Class " + className[className.length - 1], elem);
  createChild("div", ["EntryText"], "This class is dynamically made", elem);
  
  document.body.appendChild(elem);
  
  //elem.addEventListener("mouseup"  , onMouseUp);
  //elem.addEventListener("mousedown", onMouseDown);
}

function createChild(elemType, elemClasses, text, parent)
{
  let child = document.createElement(elemType);
  
  for(var i = 0; i < elemClasses.length; ++i)
  {
    child.classList.add(elemClasses[i]);
  }
  
  let str = text;
  
  if(typeof(text) === "object")
  {
    str = "";
    text.forEach(function (value)
    {
      str += value.toString() + ", ";
    });
    
    str = str.substr(0, str.length - 2);
  }
  
  child.innerHTML = str;
  parent.appendChild(child);
  
  return child;
}

function createEntryElement()
{
    // Create the default entry
  readTextFile("jsons/0.json");
}

function createEntryElementFromJSON(jsonObj)
{
    // Create the entry element
  let entry = document.createElement("div");
  entry.classList.add("Entry", "EntryImage");
  
    // Store any children we want to edit after creating
  let child;
  
    // Create the title
  createChild("div", ["EntryTitle"], jsonObj["name"], entry);
  
    // Create the item list
  child = createChild("div", ["EntryText"], jsonObj["items"], entry);
  child.innerHTML = "Items: " + child.innerHTML;
  
    // Create the location description
  createChild("div", ["EntryText"], jsonObj["loc"], entry);
  
    // Create the description
  createChild("div", ["EntryText"], jsonObj["desc"], entry);
  
    // Add the entry to the document
  document.body.appendChild(entry);
}
}

////////////////////////////////////////////////////////////////////////////////
// Database
{
function getEntry(entryPath, entryName)
{
  return firebase.database().ref(entryPath + entryName);
}

function readEntries(snapshot)
{
  if(snapshot.exists())
  {
    jsonFiles = snapshot.exportVal();
    
    //console.log(jsonFiles);
    
    snapshot.val().forEach(function(value)
    {
      //console.log(value);
    });
  }
  else
  {
    console.log("Snapshot does not exist");
  }
}

function readEntry(snapshot)
{
  if(snapshot.exists())
  {
    if(snapshot.hasChild('filename'))
    {
      console.log("Value: " + snapshot.child('filename').val());
    }
    else
    {
      console.log("Snapshot does not have child filename");
    }
  }
  else
  {
    console.log("Snapshot does not exist");
    
    isValid = false;
  }
}

function setDataReadCallback(ref, event, func)
{
  ref.once(event).then(func);
}
}