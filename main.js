var displayList = null;
var scaleImg = null;
const TTPV = 5;
var orderBoss = 0;

var textEditing = false;
var delButtonMO = false;

var sheetID = "6sXlvOryoYGA7Azg";

var ajaxRequest = new XMLHttpRequest();

const classColours = {
  "Death Knight":"#831528",
  "Demon Hunter":"#6d2087",
  "Druid":"#ab5407",
  "Hunter":"#738e4d",
  "Mage":"#2b859e	",
  "Monk":"#00ab65",
  "Paladin":"#a45e7d",
  "Priest":"#ababab",
  "Rogue":"#aba446",
  "Shaman":"#004a95",
  "Warlock":"#5b5b9f",
  "Warrior":"#85694a",
}


data = [];


function abilityNameClick(n, b){
  var abiName = document.getElementById(b+"_ability_"+n).firstChild;
  var abiText = abiName.getElementsByTagName('p')[0];
  var abiGroup = abiName.getElementsByTagName('div')[0];
  var abiInput = abiName.getElementsByTagName('input')[0];
  var abiAdd = abiName.getElementsByTagName('button')[1];

  if(!textEditing){
    abiAdd.setAttribute("style","display:none");
    abiText.setAttribute("style","display:none");
    abiInput.value = abiText.innerHTML;
    abiGroup.setAttribute("style","display:inherit");
    textEditing = true;
    
  }
  
}
function nameSave(n, b){

  var abiName = document.getElementById(b+"_ability_"+n).firstChild;
  var abiText = abiName.getElementsByTagName('p')[0];
  var abiGroup = abiName.getElementsByTagName('div')[0];
  var abiInput = abiName.getElementsByTagName('input')[0];
  var abiAdd = abiName.getElementsByTagName('button')[1];

  if(textEditing){
    abiAdd.setAttribute("style","display:inherit");
    abiText.setAttribute("style","display:inherit");
    abiText.innerHTML = abiInput.value;

    var boss = b-1;
    var abi = n-1;
    data[boss].abilities[abi].text = abiInput.value;

    abiGroup.setAttribute("style","display:none");
    
    textEditing = false;
    deleteGen();
    refresh();
  }
}

function bossNameClick(b){
  var bossName = document.getElementById(b).firstChild;
  var bossText = bossName.getElementsByTagName('p')[0];
  var bossGroup = bossName.getElementsByTagName('div')[0];
  var bossInput = bossName.getElementsByTagName('input')[0];
  var bossButton = bossName.getElementsByTagName('button')[1];

  if(!textEditing){
    bossText.setAttribute("style","display:none");
    bossInput.value = bossText.innerHTML;
    bossGroup.setAttribute("style","display:inherit");
    bossButton.setAttribute("style","display:none");
    textEditing = true;
    
  }
}
function bossSave(b){
  var bossName = document.getElementById(b).firstChild;
  var bossText = bossName.getElementsByTagName('p')[0];
  var bossGroup = bossName.getElementsByTagName('div')[0];
  var bossInput = bossName.getElementsByTagName('input')[0];
  var bossButton = bossName.getElementsByTagName('button')[1];

  if(textEditing){
    bossText.setAttribute("style","display:inherit");
    bossButton.setAttribute("style","display:inherit");
    bossText.innerHTML = bossInput.value;

    var boss = b-1;
    data[boss].name = bossInput.value;

    bossGroup.setAttribute("style","display:none");
    
    textEditing = false;
    console.log(data);
    deleteGen();
    refresh();
  }
}

function renderBoss(e, n){
  var div = document.createElement("div");

  var cDiv = document.createElement("div");
  var para = document.createElement("p");
  var node = document.createTextNode(e.name);

  var inputGroup = document.createElement("div");
  var inputAppend = document.createElement("div");
  var inputButton = document.createElement("button");
  var input = document.createElement("input");

  inputGroup.setAttribute("class","input-group input-group-sm");
  inputAppend.setAttribute("class", "input-group-append");
  inputButton.setAttribute("class","btn btn-outline-secondary");
  inputButton.setAttribute("type","button");
  inputButton.setAttribute("onClick","bossSave("+n+')');
  var inputCheck = document.createElement("i");
  inputCheck.setAttribute("class","fas fa-check text-success");
  inputButton.appendChild(inputCheck);

  inputGroup.setAttribute("style","display:none");
  input.setAttribute("class","nameInput form-control");
  input.setAttribute("type","text");

  inputAppend.appendChild(inputButton);
  inputGroup.appendChild(input);
  inputGroup.appendChild(inputAppend);

  var nInd = n - 1;
  if(data[nInd].colour == null){
    if(n%2 == 1){
      cDiv.setAttribute("style","background-color:#383b3d")
    }
    else{
      cDiv.setAttribute("style","background-color:#303437")
    }
  }
  else{
    cDiv.setAttribute("style","background-color:"+data[nInd].colour);
  }

  var abiButton = document.createElement("button");
  abiButton.setAttribute("class","btn btn-sm btn-success bossAdd m-0");
  var abiPlus = document.createElement("i");
  abiPlus.setAttribute("class","fas fa-plus bossPlus m-0");
  abiButton.setAttribute("onclick","addAbility("+n+")");
  abiButton.appendChild(abiPlus);

  para.appendChild(node);
  para.setAttribute("class","p-0 m-0");
  para.setAttribute("onClick","bossNameClick("+n+")");
  cDiv.appendChild(para);
  cDiv.appendChild(inputGroup);
  cDiv.appendChild(abiButton);
  cDiv.setAttribute("class","name bossName row align-items-center justify-content-between text-light");
  div.setAttribute("id",n);
  div.setAttribute("class","row align-items-center piprows gen");
  div.appendChild(cDiv);
  displayList.appendChild(div);

}

function rmAbility(boss, abi){
  console.log(boss, abi);
  data[boss].abilities.splice(abi, 1);
  deleteGen();
  refresh();

}


function renderAbilities(e, boss, n){

  var bInd = boss - 1;
  var nInd = n - 1;

  var div = document.createElement("div");
  var cDiv = document.createElement("div");

  var para = document.createElement("p");
  var node = document.createTextNode(e.text);

  var inputGroup = document.createElement("div");
  var inputAppend = document.createElement("div");
  var inputButton = document.createElement("button");
  var input = document.createElement("input");

  var divsvg = document.createElement("div");


  inputGroup.setAttribute("class","input-group input-group-sm");
  inputAppend.setAttribute("class", "input-group-append");
  inputButton.setAttribute("class","btn btn-outline-secondary");
  inputButton.setAttribute("type","button");
  inputButton.setAttribute("onClick","nameSave("+n+','+boss+")");
  var inputCheck = document.createElement("i");
  inputCheck.setAttribute("class","fas fa-check text-success");
  inputButton.appendChild(inputCheck);

  inputGroup.setAttribute("style","display:none");
  input.setAttribute("class","nameInput form-control");
  input.setAttribute("type","text");

  inputAppend.appendChild(inputButton);
  inputGroup.appendChild(input);
  inputGroup.appendChild(inputAppend);

  var addButton = document.createElement("button");
  var btnPlus = document.createElement("i");
  btnPlus.setAttribute("class","fas fa-plus text-white");
  addButton.setAttribute("class","btn btn-sm btn-outline-secondary");
  addButton.setAttribute("onclick","abiAddPip("+bInd+","+nInd+")")

  addButton.appendChild(btnPlus);

  var rmButton = document.createElement("button");
  var btnCross = document.createElement("i");
  btnCross.setAttribute("class","fas fa-times text-white");
  rmButton.setAttribute("class","btn btn-sm btn-outline-danger mr-auto");
  rmButton.setAttribute("onclick","rmAbility("+bInd+","+nInd+")");
  rmButton.appendChild(btnCross);
  cDiv.appendChild(rmButton);


  para.appendChild(node);
  para.setAttribute("class","p-0 m-0 pr-2");
  para.setAttribute("onClick","abilityNameClick("+n+','+boss+")");

  cDiv.setAttribute("class","name abilityName row justify-content-end align-items-center text-light");

  div.setAttribute("id",boss+"_ability_"+n);
  div.setAttribute("class","row align-items-center piprows gen");
  if(data[bInd].abilities[nInd].colour == null){
    if(n%2 == 1){
      cDiv.setAttribute("style","background-color:#303437")
    }
    else{
      cDiv.setAttribute("style","background-color:#383b3d")
    }
  }
  else{
    cDiv.setAttribute("style","background-color:"+data[bInd].abilities[nInd].colour);
  }
  

  cDiv.appendChild(para);
  cDiv.appendChild(inputGroup);
  cDiv.appendChild(addButton);

  div.appendChild(cDiv);

  divsvg.setAttribute("class","row m-0 p-0 align-items-start ");

  var svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
  svg.setAttributeNS(null, 'width', 3620);
  svg.setAttributeNS(null, 'height', 28);
  svg.setAttributeNS(null, "class", "my-auto pip")

  var pipCount = 0;
  e.pips.forEach(function(pip){
    pipCount += 1;
    
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var iRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    iRect.setAttributeNS(null, 'height', 28)
    iRect.setAttributeNS(null, 'style', "opacity: 0;")
    iRect.setAttributeNS(null, 'y', 0);
    iRect.setAttributeNS(null, 'x', 0);
    g.setAttributeNS(null, 'y', 0);
    g.setAttributeNS(null, 'x', pip.timeStart*TTPV);
    g.setAttributeNS(null, "width", "100%");
    g.setAttributeNS(null, 'height',"100%");
    g.addEventListener('mousedown', svgStartDrag);
    g.addEventListener('mousemove', svgDrag);
    g.addEventListener('mouseup', svgEndDrag);
    g.addEventListener('mouseleave', svgMouseLeave);
    g.addEventListener('mouseenter', svgMouseEnter);
    g.appendChild(iRect);
  
    if(pip.showCD && pip.cooldown > 0){
      g.setAttributeNS(null, 'width', (pip.length+pip.cooldown)*TTPV);
      var cdRect = document.createElementNS('http://www.w3.org/2000/svg',"rect");
      cdRect.setAttributeNS(null, 'height', 2)
      cdRect.setAttributeNS(null, 'width', pip.cooldown*TTPV)
      cdRect.setAttributeNS(null, 'style', "fill:#AAAAAA")
      cdRect.setAttributeNS(null, 'x', pip.length*TTPV);
      cdRect.setAttributeNS(null, 'y', (28/2)-1);

      var cdSpark = document.createElementNS('http://www.w3.org/2000/svg',"rect");
      cdSpark.setAttributeNS(null, 'height', 20)
      cdSpark.setAttributeNS(null, 'width', 2)
      cdSpark.setAttributeNS(null, 'style', "fill:#AAAAAA")
      cdSpark.setAttributeNS(null, 'x', ((pip.length+pip.cooldown)*TTPV)-2);
      cdSpark.setAttributeNS(null, 'y', 4)
      g.appendChild(cdRect);
      g.appendChild(cdSpark);
      iRect.setAttributeNS(null, 'width', (pip.length+pip.cooldown)*TTPV)

    }
    else{
      g.setAttributeNS(null, 'width', pip.length*TTPV);
      iRect.setAttributeNS(null, 'width', pip.length*TTPV)

    }
    
    
    g.setAttributeNS(null, 'transform', "translate("+pip.timeStart*TTPV+", 0)");
    
    g.setAttributeNS(null, "class", "drag")
    g.setAttributeNS(null, 'id', (boss-1)+'_'+(n-1)+'_'+(pipCount-1));
    g.setAttributeNS(null, 'height', 28);
    var rect = document.createElementNS('http://www.w3.org/2000/svg',"rect");
    rect.setAttributeNS(null, 'height', 28)
    rect.setAttributeNS(null, 'width', pip.length*TTPV)
    rect.setAttributeNS(null, 'style', "fill:"+pip.colour)
    rect.setAttributeNS(null, 'rx', 5);
    g.appendChild(rect);
    svg.appendChild(g);
    
  });
  divsvg.appendChild(svg);
  div.appendChild(divsvg);
  displayList.appendChild(div);

}

var abiAddPipBoss = null;
var abiAddPipNum = null;
function abiAddPip(b,n){
  abiAddPipBoss = b;
  abiAddPipNum = n;
  $('#pipModal').modal();
}
function pipModalAdd(){
  var pipDuraM = document.getElementById("pipDuraM");
  var pipDuraS = document.getElementById("pipDuraS");
  var pipCDM = document.getElementById("pipCDM");
  var pipCDS = document.getElementById("pipCDS");
  var pipSTM = document.getElementById("pipSTM");
  var pipSTS = document.getElementById("pipSTS");


  var dM = 0;
  var dS = 0;
  var cM = 0;
  var cS = 0;
  var sM = 0;
  var sS = 0;
  try{
    dM = parseInt(pipDuraM.value) || 0;
  }catch (err){
    console.log("ERR");
  }
  try{
    dS = parseInt(pipDuraS.value) || 0;
  }catch (err){
    console.log("ERR");
  }
  try{
    cM = parseInt(pipCDM.value) || 0;
  }catch (err){}
  try{
    cS = parseInt(pipCDS.value) || 0;
  }catch (err){}
  try{
    sM = parseInt(pipSTM.value) || 0;
  }catch (err){}
  try{
    sS = parseInt(pipSTS.value) || 0;
  }catch (err){}


  var dura = (dM*60)+dS;
  var cd = (cM*60)+cS;
  var st = (sM*60)+sS;
  console.log(dM, dS);
  console.log(dura, cd, st);

  var showCooldown = true;
  var newData = null;
  if(data[abiAddPipBoss].abilities[abiAddPipNum].colour != null){
    newData = {
      colour:data[abiAddPipBoss].abilities[abiAddPipNum].colour,
      length:dura,
      timeStart:st,
      cooldown:cd,
      showCD: showCooldown,
    };
  }
  else{
    newData = {
      colour:"#151515",
      length:dura,
      timeStart:st,
      cooldown:cd,
      showCD: showCooldown,
    };
  }
  if(dura != 0){
    data[abiAddPipBoss].abilities[abiAddPipNum].pips.push(newData);
  }
  deleteGen();
  refresh();
  
}

var bossAdding = null;
function addAbility(n){
  bossAdding = n-1;
  $('#bossModal').modal();
}

function bossModalAdd(){
  var mAbiName = document.getElementById("bModName").getElementsByTagName("input")[0].value;
  newData = {
    text:mAbiName,
    icon:"test.ico",
    colour:data[bossAdding].colour,
    pinned: false,
    order: data[bossAdding].abilities.length,
    pips: [],
  };
  data[bossAdding].abilities.push(newData);
  deleteGen();
  refresh();
}

function bossModalCancel(){
  document.getElementById("bModName").getElementsByTagName("input")[0].value = "";

}

function delMO(evt){
  delButtonMO = true;
}
function delLV(evt){
  delButtonMO = true;
}
function deletePip(boss, abi, pip){
  console.log(boss, abi, pip);
  data[boss].abilities[abi].pips.splice(pip, 1);
  delButton.style.display = "none";
  deleteGen();
  refresh();

}

function svgMouseEnter(evt){
  delButton.style.display = "initial";
  var id = evt.target.getAttribute("id");
  id = id.split("_");
  delButton.setAttribute("onclick","deletePip("+id[0]+","+id[1]+","+id[2]+","+")");
  var dt = data[id[0]].abilities[id[1]].pips[id[2]];
  var dis = mouseX - (parseInt(dt["timeStart"])*TTPV) - 200
  var move = (mouseX-200) - dis;
  delButton.style.left = move+4+200;

  var len = parseInt(id[0]) + 1;
  var bKeys = [...Array(len).keys()];
  var rowCount = 0;
  bKeys.forEach(function(e){
    rowCount += 1;
    if(id[0] == e){
      rowCount += data[e].abilities[id[1]].order + 1;
    }
    else{
      var lenA = data[e].abilities.length;
      var aKeys = [...Array(lenA).keys()];
      aKeys.forEach(function(a){
        rowCount += 1;
      });
    }
  })
  delButton.style.top = 60 + (rowCount * 40) - 32;
}

var delButton = null;
var selectedElement = null;
var selectedElementData = null;
var selectedElementDist = 0;
var selectedElementDrag = 0;
function svgStartDrag(evt){
  stopTimer();
  if(evt.target.tagName == "rect"){
    console.log("Start Drag");
    selectedElement = evt.target;
    var id = evt.target.parentNode.getAttribute("id");
    id = id.split("_");
    selectedElementData = data[id[0]].abilities[id[1]].pips[id[2]];
    selectedElementDist = mouseX - (parseInt(selectedElementData["timeStart"])*TTPV) - 200
    console.log(selectedElementDist);
  }
}
function svgDrag(evt){
  if(selectedElement != null){
    evt.preventDefault();
    var currStart = selectedElementData["timeStart"];
    var transX = parseInt(currStart * TTPV);
    var move = (mouseX-200) - selectedElementDist;
    selectedElement.parentNode.setAttributeNS(null, "transform", "translate("+(move)+", 0)");
    selectedElementData["timeStart"] = 10;
    selectedElementDrag = move / TTPV;
    delButton.style.left = move+4+200;
  }
}
function svgEndDrag(evt){
  console.log("End Drag");
  if(selectedElement != null){
    selectedElementData["timeStart"] = selectedElementDrag;
    sendUpdate();
    deleteGen();
    refresh();
    startTimer();
  }
  if(delButtonMO == false){
    delButton.style.display = "none";
    console.log("Hide");
  }
  selectedElement = null;
  selectedElementData = null;
  selectedElementDist = 0;
  
  
}
function svgMouseLeave(evt){
  if(delButtonMO == true){
    delButton.style.display = "initial";
  }
  else{
    delButton.style.display = "none";
    console.log("Hide");
  }
  svgEndDrag(evt);
}

function deleteGen(){
  var gen = document.getElementsByClassName("gen");
  while(gen[0]){
    gen[0].parentNode.removeChild(gen[0]);
  }
}

function refresh(){
  var counter = 0;
  console.log(data);
  if(data != null){
    data.forEach(function(element){
      counter += 1;
      if(element.order == null){
        element.order = orderBoss;
        orderBoss += 1;
      }
      renderBoss(element, counter);
      var counter2 = 0;
      element.abilities.forEach(function(ability){
        if(ability.order == null){
          ability.order = counter2;
        }
        counter2 += 1;
        renderAbilities(ability, counter, counter2)
      });
    });
  }
  
  sendUpdate();
}



function addModal(){
  $('#myModal').modal();
}

var playerSelected = null;

function modalPlayerClick(){
  playerSelected = true;
  bossBtn = document.getElementById("modBtnBoss");
  playerBtn = document.getElementById("modBtnPlayer");
  
  bossBtn.setAttribute("class","btn btn-default px-2 m-1 mr-3 modButton");
  playerBtn.setAttribute("class","btn btn-success px-2 m-1 ml-3 modButton");

  classPicker = document.getElementById("modClass");
  classPicker.setAttribute("class","input-group mb-3 px-4 d-flex");

}
function modalBossClick(){
  playerSelected = false;
  bossBtn = document.getElementById("modBtnBoss");
  playerBtn = document.getElementById("modBtnPlayer");

  bossBtn.setAttribute("class","btn btn-success px-2 m-1 mr-3 modButton");
  playerBtn.setAttribute("class","btn btn-default px-2 m-1 ml-3 modButton");

  classPicker = document.getElementById("modClass");
  classPicker.setAttribute("class","input-group mb-3 px-4 d-none");

}

function modalCancel(){
  playerSelected = null;
  classPicker = document.getElementById("modClass");
  classPicker.setAttribute("class","input-group mb-3 px-4 d-none");
  bossBtn = document.getElementById("modBtnBoss");
  playerBtn = document.getElementById("modBtnPlayer");

  bossBtn.setAttribute("class","btn btn-default px-2 m-1 mr-3 modButton");
  playerBtn.setAttribute("class","btn btn-default px-2 m-1 ml-3 modButton");
}
function modalAdd(){
  bossBtn = document.getElementById("modBtnBoss");
  playerBtn = document.getElementById("modBtnPlayer");
  modName = document.getElementById("modName").getElementsByTagName("input")[0].value;
  classPicker = document.getElementById("inputGroupSelect01");
  var modColour = null;
  var modIco = "test.png";

  if(playerSelected){
    var classStr = classPicker.options[classPicker.selectedIndex].text;
    modColour = classColours[classStr];
    modIco = classStr+".png";
  }

  newData = {
    name:modName,
    colour: modColour,
    pinned: false,
    order: orderBoss,
    icon: modIco,
    abilities: [],
  }
  data.push(newData);
  orderBoss += 1;
  deleteGen();
  refresh();

}
var mouseX = null;

$(document).ready(function () {
  var $mvl = $("#mvl");
  $(document).mousemove(function (e) {
    mouseX = e.pageX;
    $mvl.offset({ left: e.pageX });
  });
});
var socket = io.connect('http://127.0.0.1:5000');


function sendUpdate(){
  ajaxRequest.open("POST", "http://127.0.0.1:5000/api/1/update/"+sheetID);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send(JSON.stringify(data));
}

function getUpdate(){
  console.log("UPDATE");
  ajaxRequest.onreadystatechange = function(){
    console.log("Ready state changed!");
    if(ajaxRequest.readyState == 4){
      if(ajaxRequest.status == 200){
        if(ajaxRequest.response.length > 1){
          console.log("JSON Recieved");
          var jsonObj = JSON.parse(ajaxRequest.response);
          console.log(jsonObj);
          data = jsonObj;
          deleteGen();
          refresh();
        }
        
      }
      else{
        console.log("Status error: " + ajaxRequest.status);
      }
    }
  }
  ajaxRequest.open("GET", "http://127.0.0.1:5000/api/1/get/"+sheetID, true);
  ajaxRequest.send();
}



function socketConnect(){
  socket.on( 'connect', function() {
    socket.join(sheetID);
    socket.emit( 'myEvent', {
      data: 'User Connected'
    })
  })
}

function startTimer(){
  timer = window.setInterval(getUpdate, 1000);
}
function stopTimer(){
  clearInterval(timer);
}

var timer = null;

document.addEventListener("DOMContentLoaded", function(event) { 
  displayList = document.getElementById("list");
  scaleImg = document.getElementById("scale");
  delButton = document.getElementById("pipDelete");
  delButton.addEventListener("mouseenter",delMO);
  delButton.addEventListener("mouseleave", delLV)
  $mvl = $("#mvl");
  getUpdate();
  timer = window.setInterval(getUpdate, 1000);

});

window.addEventListener("scroll", function(event) {
  var distance = this.scrollX;
  scaleImg.style.marginLeft = distance * -1;

}, false);