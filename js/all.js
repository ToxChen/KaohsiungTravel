var alldata;
var dataURL = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
var xhr = new XMLHttpRequest();
xhr.open('get', dataURL);
xhr.send(null);

xhr.onload = function () {
  alldata = JSON.parse(xhr.responseText).result.records;
  update(); //渲染option
  //initial(); //一開始渲染全部地區
}

// 渲染Option
function update(){
  var datalist = [];
  for (var i = 0; i < alldata.length; i++) {
    datalist.push(alldata[i].Zone);
  }
  var Zone = [];
  datalist.forEach(function (value) {
    if (Zone.indexOf(value) == -1) {
      Zone.push(value);
    }
  })
  for (var i = 0; i < Zone.length; i++) {
    var option = document.createElement('option');
    option.setAttribute('class', Zone[i]);
    option.textContent = Zone[i];
    select.appendChild(option);
  }
}

// DOM
var select = document.querySelector('.selection');
var view = document.querySelector('.list');
var title = document.querySelector('.title');
var linya = document.querySelector('.hot1');
var sanmin = document.querySelector('.hot2');
var sinsing = document.querySelector('.hot3');
var yancheng = document.querySelector('.hot4');


// 監聽
select.addEventListener('change', listchange);
linya.addEventListener('click', buttonchange);
sanmin.addEventListener('click', buttonchange);
sinsing.addEventListener('click', buttonchange);
yancheng.addEventListener('click', buttonchange);

// 初始渲染全部地區
function initial() {
  //let currentdata = calloutlocation('三民區');
  postData(alldata);
}

// 從 alldata 裡面去找尋地區跟 string 相同的資料並回傳
function calloutlocation(string) {
  let currentdata = [];
  for (let i = 0; i < alldata.length; i++) {
    if (string == alldata[i].Zone) {
      currentdata.push(alldata[i]);
    }
  }
  return currentdata;
}

// 按鈕點選觸發
function buttonchange() {
  let string = this.textContent;
  let currentdata = calloutlocation(string);
  postData(currentdata);
  title.textContent = string;
}

// 選單點選觸發
function listchange(e) {
  let string = e.target.value;
  let currentdata = calloutlocation(string);
  if (string == "高雄旅遊景點"){
    postData(alldata);
  }else{
    postData(currentdata);
  }
  title.textContent = string;
}

// 將符合選擇地區的資訊 post 出來
function postData(location) {
  //console.log(location);
  let string = "";
  for (let i = 0; i < location.length; i++) {
    string +=
      '<li><div class="listbox"><div class="imgbox" style="background-image:url(' + location[i].Picture1 + ')"><h3 class="name">' + location[i].Name + '</h3><span class="zone">' + location[i].Zone + '</span></div><div class="infobox"><p><img src="img/icons_clock.png" class="icon-time">' + location[i].Opentime + '</p><p><img src="img/icons_pin.png" class="icon-add">' + location[i].Add + '</p><p><img src="img/icons_phone.png" class="icon-tel">' + location[i].Tel + '</p><span><img src="img/icons_tag.png" class="icon-tag">' + location[i].Ticketinfo + '</span></div></div></li>';
  }
  view.innerHTML = string;
}