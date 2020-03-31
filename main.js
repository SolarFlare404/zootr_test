window.addEventListener("load", main);
window.addEventListener("resize", onWindowResize);

const _entryPath = 'entries/';
const _jsonPath = 'jsons/';
let jsonFiles = null;
let isValid = true;


function main()
{
    // Read all the filenames
  let entries = getEntry(_entryPath, "");
  setDataReadCallback(entries, 'value', readEntries);
  
  //CreateElementWithClass(["myBox", "myRedBox"]);
  
  //createEntryElement();
  let category = createCategoryElement();
  readTextFile("jsons/0.json", doneReadTextFile, category);
  
  //category.classList.add("Invisible");
  
  checkReadComplete(onReadComplete);
}

function onReadComplete()
{
  for(key in jsonFiles)
  {
    //console.log(key);
    
    let category = createCategoryElement(key);
    
    for(key2 in jsonFiles[key])
    {
      //console.log("   " + key2 + ": " + jsonFiles[key][key2]);
      
      readTextFile(_jsonPath + jsonFiles[key][key2], doneReadTextFile, category);
      
      //createEntryElementFromJSON();
    }
  }
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
// Callbacks
{
function onWindowResize(event)
{
  console.log("Hello");
  
  //let entries = document.getElementsByClassName("Entry");
  
  //console.log(entries.length);
}

function onCategoryClick(event)
{
  //event.currentTarget.children.classList.toggle('Invisible');
  
  //event.target.classList.toggle('Invisible');
  
  console.log("Minimize");
  
  let entry = this.nextElementSibling;
  
  console.log(entry);
  
  if(entry.style.display === "block")
    entry.style.display = "none";
  else
    entry.style.display = "block";
}
}

////////////////////////////////////////////////////////////////////////////////
// JSON
{
  // Gift from Shareef Raheem
function readTextFile(file, callback=doneReadTextFile, data=null)
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
        
        if(data === null)
          callback(allText);
        else
          callback(allText, data);
      }
    }
  }
  rawFile.send(null);
}

function doneReadTextFile(text, parent)
{
  let json = JSON.parse(text);
  //console.log(json);
  
  createEntryElementFromJSON(json, parent);
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

function createCategoryElement(categoryName="Category Name", parent=document.body)
{
  let category = document.createElement("div");
  //category.classList.add("EntryCategory");
  
    // Create the category element
  let child = createChild("p", ["EntryCategory"], categoryName, category);
  
    // Add the category to the parent (default is document body)
  parent.appendChild(category);
  
    // Add event listeners
  //child.addEventListener("click", onCategoryClick);
  
    // Return the category for chaining
  return category;
}

function createEntryElementFromJSON(jsonObj, parent=document.body)
{
    // Create the entry element
  let entry = document.createElement("div");
  entry.classList.add("Entry", "EntryImage");
  
    // Add the entry to the parent (default is document body)
  parent.appendChild(entry);
  
    // Create the class of objects that will get cutoff
  let cutoff = createChild("div", ["EntryCutoff"], "", entry);
  
    // Store any children we want to edit after creating
  let child;
  
    // Create the title
  createChild("div", ["EntryTitle"], jsonObj["name"], cutoff);
  
    // Create the separation bar
  createChild("hr", [], "", cutoff);
  
    // Create the item list
  child = createChild("div", ["EntryItems"], jsonObj["items"], cutoff);
  //child.innerHTML = "Items: " + child.innerHTML;
  
    // Create the location description
  createChild("div", ["EntryLocation"], jsonObj["loc"], cutoff);
  
    // Create the description
  createChild("div", ["EntryDescription"], jsonObj["desc"], cutoff);
  
  // Text has overflowed
  if(doesOverflow(cutoff, jsonObj["name"]))
  {
    createChild("fade", [], "", cutoff);
    
    child = createChild("img", ["EntryMinimize"], "", entry);
    //console.log(child.style.getPropertyValue("--my-var"));
    child.src = "images/expand_icon.png";
  }
  
    // Return for chaining
  return entry;
}

function doesOverflow(elem)
{
  let children = elem.children;
  let height = 0;
  
  for(let i = 0; i < children.length; ++i)
  {
    if(getComputedStyle(children[i]).getPropertyValue("position") !== "absolute")
      height += children[i].clientHeight;
  }
  
  return elem.clientHeight < height;
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
      //console.log("Value: " + snapshot.child('filename').val());
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