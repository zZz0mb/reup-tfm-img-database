function popup(id, cat){
  if(cat==""){
    cat = document.location.href.split("#")[1]
  }
  $("#popupTitle").html("Loading...")
  $("#popupBody").html("Loading...")
  $('#modal').modal('toggle')
  $.ajax({
        url: "getInfo.php",
        type:'GET',
        data:
          {
          cat: cat,
          id: id
          },
        success: function(data){
          list = $.parseJSON(data);
          url = list["url"]
          urlXml = list["urlXml"]
          shareUrl = list["shareUrl"]
          view = list["view"]
          $("#popupTitle").html(url)
          t = '<center><div class="row"><div class="thumbPerso"><a href="'+url+'" target="_blank" class="thumbnail"><img class="thumbImg" src="'+ url +'"></a></div></div><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>  '+view+'</center>'
          t += '<br>'
          t += '<label>URL :</label><input onClick="this.setSelectionRange(0, this.value.length)" type="text" class="form-control" value="'+url+'" readonly="readonly">'
          t += '<br>'
          t += '<label>FOR XML :</label><input onClick="this.setSelectionRange(0, this.value.length)" type="text" class="form-control" value="'+urlXml+'" readonly="readonly">'
          t += '<br>'
          t += '<label>SHARE :</label><input onClick="this.setSelectionRange(0, this.value.length)" type="text" class="form-control" value="'+shareUrl+'" readonly="readonly">'
          $("#popupBody").html(t)
        }
  });
  setTimeout(function() {updateUrl(cat);}, 10);
}

function updateUrl(cat){
  url = document.location.href.split("#")[0]
  location.href = url + "#" + cat
}

function load(cat){
  updateUrl(cat)
  catParsed = cat.replace(/\//g,"_")
  $(".selected").attr("class", "item")
  $("." + cat.replace(/\//g,"_")).attr("class","selected")
  $.ajax({
        url: "getFiles.php",
        type:'GET',
        data:
          {
          n: cat
          },
        success: function(data){
          list = $.parseJSON(data)
          tL = '<ol class="breadcrumb" style="margin-bottom:0px !important;">'
          urlpart = ""
          $.each(cat.split("/"), function (key, data) {
            urlpart += data + "/"
            if((cat.split("/").length - 2) == key){
              tL += '<li class="active">'+data+'</li>'
            }else if(key < (cat.split("/").length-2)){
              tL += '<li><a href="#" onclick="load(\''+urlpart+'\')">'+data+'</a></li>'
            }
          })
          tL += "</ol>"
          $("#list").html(tL)
          t = ""
          $.each(list, function (key, data) {
             t += '<div onclick="javascript:popup(\''+ key +'\', \''+ cat +'\')" class="thumbPerso"> <a href="#" class="thumbnail"> <img class="thumbImg" src="http://transformice.com/'+data+'"></a></div>'
          })
          $("#listitem").html(t)
        }
  });
}

function updateSize(){
    var height = $(window).height()
    var height2 = (height - 55) * 100 / height
    var height3 = (height - 55 - 40) * 100 / height

    $('.sidebar').css("height",height2 + "%")
    $('#listitem').css("height",height3 + "%")
};

$(document).ready(updateSize)
$(window).resize(updateSize)

$( document ).ready(function() {
    url = document.location.href.split("#")
    if(url[1]){
      load(url[1]);
    }
});