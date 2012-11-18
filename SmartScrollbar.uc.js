// ==UserScript==
// @name           SmartScrollbar.uc.js
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @version        0.0.4
// @note            encodeURIComponent を使うように修正
// ==/UserScript==
// thx! http://www.geocities.jp/adsldenet/past/sample.html

(function(){
  const HIDE_START   = true;
  const HIDE_ALL       = true; //false:ならコンテンツの一番外側のスクロールバーのみ有効
  //false:Scroll bar only valid if the outermost of the content只对最外层页面有效
  const HIDE_SCROLLBAR = false;//true:隐藏所有滚动条

  // 色、太さは適宜調整
  // 颜色,厚度调整
  var css = <![CDATA[
    html|html > scrollbar[orient="vertical"] > slider > thumb
    {
      //max-width: 20px !important;
      min-width: 3px !important;//其它设定不变,可实际设定滚动条宽度
    height: 36px !important;
	  min-height: 36x !important;//NG必须的,否则滚动条会变圆球
	  max-height: 36x !important;
	}

    html|html > scrollbar[orient="horizontal"] > slider > thumb
    {
      /*max-height: 3px !important;/**/
      min-height: 3px !important;
    }/**/

    html|html > scrollbar > slider > thumb
    {
      -moz-appearance: none !important;
      border: none !important;
	  border-radius: 0.5em !important;
	  opacity: 1.0 !important;
	  background: transparent !important;
	  background-color: rgb(40,192,246) !important;//滑块rgb(48,192,246)
      //max-width: 3px !important;
      //min-width: 3px !important;
    }
	
	html|html > scrollbar > slider
	{
      //-moz-appearance: none !important;
      border: none !important;
      border-radius: 0.5em !important;
      //opacity: 0.799!important;
      //background: transparent !important;	  
      //background-color: rgb(142,145,148) !important;//滑块背景
      //min-width: 4px !important;//4px
      //max-width: 4px !important; 
      padding-left: 0.5px !important;//滑块居中调整
      margin-left: 0.5px !important;
      padding-right: 0.5px !important;
      margin-right: 0.5px !important;
    }

	html|html > scrollbar
    {
      moz-appearance: none !important;
      border: none !important;
	  border-radius: 0.5em !important;
	  //opacity: 0.899!important;
	  //background: transparent !important;	  
      //background-color: rgb(112,232,246) !important;
	  //min-width: 6px !important;
      //max-width: 6px !important; 
	  padding-left: -0.5px !important;//滚动条居中调整
	  margin-left: -0.5px !important;  
	  padding-right: -0.5px !important;//必须的
	  margin-right: -0.5px !important;
    }

	
    html|html > scrollbar > scrollbarbutton,
    html|html > resizer
    {
      display: none !important;
    }
  
  ]]>.toString();

  if (HIDE_SCROLLBAR)
    css = 'html|html > scrollbar { visibility: collapse !important; }';
  var NS = '@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");';
      NS += '@namespace html url("http://www.w3.org/1999/xhtml");';
  css = NS + css;

  if (HIDE_ALL)
    css = css.replace(/html\|html > /g, 'html|*:not(html|select) > ');
  
  var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));

  var p = document.getElementById('menu_preferences');
  var m = document.createElement('menuitem');
  m.setAttribute('id', 'SmartScrollbar_enabled');
  m.setAttribute('label', "\u542F\u7528SmartScrollBar(\u91CD\u7F6E\u540E\u9700\u5237\u65B0)");
  m.setAttribute('type', 'checkbox');
  m.setAttribute('autocheck', 'false');
  m.setAttribute('checked', HIDE_START);
  p.parentNode.insertBefore(m, p);

  m.addEventListener('command', command, false);

  if (HIDE_START) {
    sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
  }

  function command(){
    if (sss.sheetRegistered(uri, sss.AGENT_SHEET)){
      sss.unregisterSheet(uri, sss.AGENT_SHEET);
      m.setAttribute('checked', false);
    } else {
      sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
      m.setAttribute('checked', true);
    }
  }
  
})();
