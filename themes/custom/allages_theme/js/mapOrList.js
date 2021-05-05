jQuery(document).ready(function() {
  selection();
  codeLanguagesList();
  cargaMapa();
  jQuery(window).resize(function() {
    codeLanguagesList();
  });
});

function selection() {
  jQuery(".MapSC").addClass("selected"); //first time
  jQuery("#listText").hide(); //first time
  jQuery(".ListSC .arrow").removeClass(); //first time

  jQuery(".MapSC").click(function() {
    if(!jQuery(this).hasClass("selected")) {
      jQuery(".MapSC").addClass("selected");
      jQuery(".ListSC").removeClass("selected");
      jQuery("#listText").hide();
      jQuery(".ListSC .arrow").hide();
      jQuery("#mapImg").fadeIn();
      jQuery(".MapSC .arrow").show();
    }
    if(jQuery("#containerPopLanguages").length>0) {
      jQuery("#containerPopLanguages").remove();
      jQuery("#arrowPop").remove();
    }
  });

  jQuery(".ListSC").click(function() {
    if(!jQuery(this).hasClass("selected")) {
      jQuery(".ListSC").addClass("selected");
      jQuery(".MapSC").removeClass("selected");
      jQuery("#mapImg").hide();
      jQuery(".MapSC .arrow").hide();
      jQuery("#listText").fadeIn();
      jQuery(".ListSC div").addClass("arrow");
    }
    if(jQuery("#containerPopLanguages").length>0) {
      jQuery("#containerPopLanguages").remove();
      jQuery("#arrowPop").remove();
    }
  });
}

function codeLanguagesList() {

  if(jQuery(window).width()>1006) {
    jQuery("#listText ul li ul").each(function() {
      jQuery(this).hide();
    });
    jQuery("#listText ul li").each(function() {
      jQuery(this).css("cursor","pointer");
      jQuery(this).click(function() {
        jQuery("#listText ul li ul").each(function() {
          jQuery(this).hide();
        });

        topParent=jQuery(this).position().top+10;
        leftParent=jQuery(this).position().left;



        var width=jQuery(this).width();

        if(jQuery("ul",this).is(':visible')) {
          jQuery("ul",this).slideUp("fast");
        } else {
          //jQuery("ul",this).css("left",leftParent+"px").css("top",topParent+"px").css("min-width",width+"px").slideDown("fast");
          jQuery("ul",this).css("left",leftParent+"px").css("top",topParent+"px").slideDown("fast");
        }
      });
    });

    //manipulo los estilo para el separador de idiomas
    jQuery("#listText ul li ul li a").each(function(){
      jQuery(this).mouseover(function() {
        if(jQuery(this).parent().prev().find("a").hasClass("moreItems")) {
          jQuery(this).parent().prev().find("a").removeClass("moreItems").addClass("deleteTmp");
        }
      });
      jQuery(this).mouseout(function() {
        if(jQuery(this).parent().prev().find("a").hasClass("deleteTmp")) {
          jQuery(this).parent().prev().find("a").removeClass("deleteTmp").addClass("moreItems");
        }
      });
    });
  } else {
    jQuery("#listText ul li ul").each(function() {
      jQuery(this).removeAttr("style");
      jQuery("li",this).each(function() {
        jQuery(this).addClass("lineR");
      });
      jQuery("li:last",this).removeClass("lineR");
    });
  }
}

function cargaMapa() {

  jQuery('#vmap').vectorMap({
    map: 'europe_en',
    backgroundColor: '#ececec',
    borderColor: '#ffffff',
    borderOpacity: 1,
    borderWidth: 1,
    color: '#bdbfbe',
    enableZoom: true,
    hoverColor: '#99cc00',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegion: null,
    showTooltip: false,
    onRegionClick: function(element,e,code,region) { //hardcodeado by gonzacid -> jquery.vmaps.js
      barrablanca = (jQuery(window).width() - jQuery("#vmap").width())/2 ;//ñapa by rramos para pantallas grandes

      if(code!="tr" && code!="ua" && code!="by" && code!="ba" && code!="rs" && code!="al" && code!="mk" && code!="md") {
        if(jQuery("#containerPopLanguages").length>0) {
          jQuery("#containerPopLanguages").remove();
          jQuery("#arrowPop").remove();
        }

        var x=e.pageX;
        var y=e.pageY;

        var htmlParent=jQuery("ul."+code).parent().html();

        if (code=="bg" || code=="at" || code=="hr" ||code=="cy"|| code=="cz"||
          code=="dk"|| code=="ee"|| code=="fr"||code=="de"||code=="gr"|| code=="hu"|| code=="ie"|| code=="it"|| code=="lv"|| code=="lt" || code=="nl"||code=="pl"||code=="pt"||code=="ro"||code=="sk"||code=="si"||code=="es"||code=="se"||code=="gb"||code=="is"||code=="no" ){

          var htmlParent=jQuery("ul."+code).html();
          var cachos=htmlParent.split('href="');
          var trozo=jQuery.trim(cachos[1]);
          var cachos2=trozo.split('">');
          var hrefpais=jQuery.trim(cachos2[0]);
          hrefpais=hrefpais.replace("&amp;","&");
          window.location.href = hrefpais;
          barrablanca = 50000;

        }



        var cachos=htmlParent.split("<");
        var country=jQuery.trim(cachos[0]);

        var html="<div id='containerPopLanguages'><div id='countryPop'>"+country+"</div><ul id='languageCountriesMap'>"+jQuery("ul."+code).html()+"</ul></div><div id='arrowPop'></div>";
        jQuery("#vmap").after(html);
        if(jQuery("#admin-menu").length>0) {
          jQuery("#arrowPop").css("position","absolute").css("top",y-400+"px").css("left",x-10 - barrablanca+"px");
        } else {
          jQuery("#arrowPop").css("position","absolute").css("top",y-90+"px").css("left",x-10 - barrablanca +"px");
        }

        var topCon=jQuery("#arrowPop").position().top-jQuery("#containerPopLanguages").height()-23;
        var leftCon=jQuery("#arrowPop").position().left-(jQuery("#containerPopLanguages").width()/2);
        jQuery("#containerPopLanguages").css("top",topCon+"px").css("left",leftCon+"px");

        var body = jQuery("html, body");
        body.stop().animate({scrollTop:topCon}, '800', 'swing', function() {
        });
      }
      fills();
      //no encuentro manera mejor.. por el momento esto valdrá.
      setTimeout("fills()",10);
      setTimeout("fills()",100);
      setTimeout("fills()",200);
      setTimeout("fills()",300);
      setTimeout("fills()",400);
      setTimeout("fills()",500);
      setTimeout("fills()",600);
      setTimeout("fills()",700);
      setTimeout("fills()",800);
      setTimeout("fills()",900);

    }
  });
  fills();

}

function fills() {
  jQuery(".jvectormap-region").each(function() {
    var id=jQuery(this).attr("id");
    if (id=="jqvmap1_tr") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_ua") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_by") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_ba") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_rs") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_al") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_mk") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }
    if (id=="jqvmap1_md") {
      jQuery(this).attr("fill","#eaebeb").attr("stroke","#989a9b");
    }

  });

}
