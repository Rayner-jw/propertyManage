var Dvbbs_edit;	//selectRang
var Dvbbs_RangeType;
var Dvbbs_selection;
var Dvbbs_filterScript = true;
var Dvbbs_charset="UTF-8";
var Dvbbs_bLoad=false
var Dvbbs_pureText=true
var Dvbbs_bTextMode=1			//默认为Design模式

//预览
function Dvbbs_InitDocument(hiddenid, charset)
{	
	if (charset!=null)
	Dvbbs_charset=charset;
	if (Dvbbs_bIsIE5){
		var Dvbbs_bodyTag="<style type=text/css>.quote{margin:5px 20px;border:1px solid #CCCCCC;padding:5px; background:#F3F3F3 }\nbody{boder:0px}.HtmlCode{margin:5px 20px;border:1px solid #CCCCCC;padding:5px;background:#FDFDDF;font-size:14px;font-family:Tahoma;font-style : oblique;line-height : normal ;font-weight:bold;}\nbody{boder:0px}</style></head><BODY bgcolor=\"#FFFFFF\" onkeydown=\"ctlent();\">";
	}else
	{
		var Dvbbs_bodyTag="<style type=text/css>.quote{margin:5px 20px;border:1px solid #CCCCCC;padding:5px; background:#F3F3F3 }\nbody{boder:0px}.HtmlCode{margin:5px 20px;border:1px solid #CCCCCC;padding:5px;background:#FDFDDF;font-size:14px;font-family:Tahoma;font-style : oblique;line-height : normal ;font-weight:bold;}\nbody{boder:0px}</style></head><BODY bgcolor=\"#FFFFFF\">";
	}
	
	if (navigator.appVersion.indexOf("MSIE 6.0",0)==-1){
	IframeID.document.designMode="On"
	}
	IframeID.document.open();
	IframeID.document.write ('<html><head>');
	if (Dvbbs_bIsIE5){
	IframeID.document.write ('<script language="javascript">');
	IframeID.document.write ('var ispost=0;');
	IframeID.document.write ('	function ctlent(eventobject)');
	IframeID.document.write ('	{');
	IframeID.document.write ('		if(event.ctrlKey && window.event.keyCode==13&&ispost==0)');
	IframeID.document.write ('		{');
	IframeID.document.write ('			ispost=1;');
	IframeID.document.write ('			parent.Dvbbs_CopyData("'+hiddenid+'"); ');
	IframeID.document.write ('			parent.document.Dvform.Submit.disabled=true;');
	IframeID.document.write ('			parent.document.Dvform.Submit2.disabled=true;');
	IframeID.document.write ('			parent.document.Dvform.submit();');
	IframeID.document.write ('		}');
	IframeID.document.write ('	}');
	IframeID.document.write ('<\/script>');
	}
	IframeID.document.write(Dvbbs_bodyTag);
	IframeID.document.write("</body>");
	IframeID.document.write("</html>");
	IframeID.document.close();
	IframeID.document.body.contentEditable = "True";
	IframeID.document.charset=Dvbbs_charset;
	Dvbbs_bLoad=true;
	Dvbbs_setStyle();
	IframeID.focus();
}

function Dvbbs_setMode(n)
{
	Dvbbs_setStyle();
	var cont;
	var Dvbbs_Toolbar0=document.getElementById("ExtToolbar0");
	var Dvbbs_Toolbar1=document.getElementById("ExtToolbar1");
	var Dvbbs_Toolbar2=document.getElementById("ExtToolbar2");
	var Dvbbs_Toolbar3=document.getElementById("old_Toolbars");
	switch (n){
		case 1:
				Dvbbs_Toolbar0.style.display="";
				Dvbbs_Toolbar1.style.display="";
				Dvbbs_Toolbar2.style.display="";
				Dvbbs_Toolbar3.style.display="none";		//ubb工具栏关闭
				if (document.getElementById("Dvbbs_TabHtml").className=="Dvbbs_TabOn"){
					if (Dvbbs_bIsIE5){
						cont=IframeID.document.body.innerText;
						cont=Dvbbs_correctUrl(cont);
						if (Dvbbs_filterScript)
						cont=Dvbbs_FilterScript(cont);
						IframeID.document.body.innerHTML=cont;
					}else{
						var html = IframeID.document.body.ownerDocument.createRange();
						html.selectNodeContents(IframeID.document.body);
						IframeID.document.body.innerHTML = html.toString();
					}
				}
				break;
		case 2:
				if (canusehtml=="1" || canusehtml=="3")
				{
					Dvbbs_Toolbar0.style.display="none";	//关闭工具栏
					Dvbbs_Toolbar1.style.display="none";
					Dvbbs_Toolbar2.style.display="none";
					Dvbbs_Toolbar3.style.display="none";	//关闭UBB
					Dvbbs_cleanHtml();
					cont=IframeID.document.body.innerHTML;
					cont=Dvbbs_correctUrl(cont);
					if (Dvbbs_filterScript){cont=Dvbbs_FilterScript(cont);}
					if (Dvbbs_bIsIE5){					//IE
						IframeID.document.body.innerText=cont;
					}else{								//Nc
						var html=document.createTextNode(cont);
						IframeID.document.body.innerHTML = "";
						IframeID.document.body.appendChild(html);
					}
				}else{
				alert("您不能使用这个功能!")
				}
				break;

		case 3:
				Dvbbs_Toolbar0.style.display="";
				Dvbbs_Toolbar1.style.display="none";
				Dvbbs_Toolbar2.style.display="none";
				Dvbbs_Toolbar3.style.display="";
				var mhtml=document.getElementById("Dvbbs_TabHtml");
				var mdesign=document.getElementById("Dvbbs_TabDesign");
				if (mhtml.className=="Dvbbs_TabOn")
				{
					if (Dvbbs_bIsIE5){
						cont=IframeID.document.body.innerText;
						cont=Dvbbs_correctUrl(cont);
						if (Dvbbs_filterScript)
						cont=Dvbbs_FilterScript(cont);
						IframeID.document.body.innerHTML=cont;
					}else{
						var html = IframeID.document.body.ownerDocument.createRange();
						html.selectNodeContents(IframeID.document.body);
						IframeID.document.body.innerHTML = html.toString();
					}
				}
				break;
	}
	Dvbbs_setTab(n);
	Dvbbs_bTextMode=n
}

function Dvbbs_setTab(n)
{
	//html和design按钮的样式更改
	var mhtml=document.getElementById("Dvbbs_TabHtml");
	var mdesign=document.getElementById("Dvbbs_TabDesign");
	var mOldTool=document.getElementById("Dvbbs_TabOldTools");
	if (n==1)
	{
		mhtml.className="Dvbbs_TabOff";
		mdesign.className="Dvbbs_TabOn";
		mOldTool.className="Dvbbs_TabOff";
	}
	else if (n==2)
	{
		mhtml.className="Dvbbs_TabOn";
		mdesign.className="Dvbbs_TabOff";
		mOldTool.className="Dvbbs_TabOff";

	}
	else if (n==3)
	{
		mhtml.className="Dvbbs_TabOff";
		mdesign.className="Dvbbs_TabOff";
		mOldTool.className="Dvbbs_TabOn";
	}
}

function Dvbbs_setStyle()
{
	//var bs = IframeID.document.body.runtimeStyle;
	var bs = IframeID.document.body.style;
	//根据mode设置iframe样式表	
	if (Dvbbs_bTextMode==2) {
		bs.fontFamily="Arial";
		bs.fontSize="10pt";
	}else{
		bs.fontFamily="Arial";
		bs.fontSize="10.5pt";
	}
	bs.scrollbar3dLightColor= '#D4D0C8';
	bs.scrollbarArrowColor= '#000000';
	bs.scrollbarBaseColor= '#D4D0C8';
	bs.scrollbarDarkShadowColor= '#D4D0C8';
	bs.scrollbarFaceColor= '#D4D0C8';
	bs.scrollbarHighlightColor= '#808080';
	bs.scrollbarShadowColor= '#808080';
	bs.scrollbarTrackColor= '#D4D0C8';
	bs.border='0';
}

function Dvbbs_validateMode()
{
	if (Dvbbs_bTextMode!=2) return true;
	alert("请取消“查看HTML源代码”选项再使用系统编辑功能或者提交!");
	IframeID.focus();
	return false;
}

function Dvbbs_CleanCode()
{
	var editor=IframeID;
	editor.focus();
	if (Dvbbs_bIsIE5){
	// 0bject based cleaning
		var body = editor.document.body;
		for (var index = 0; index < body.all.length; index++) {
			tag = body.all[index];
		//*if (tag.Attribute["className"].indexOf("mso") > -1)
			tag.removeAttribute("className","",0);
			tag.removeAttribute("style","",0);
		}
	// Regex based cleaning
		var html = editor.document.body.innerHTML;
		html = html.replace(/\<p>/gi,"[$p]");
		html = html.replace(/\<\/p>/gi,"[$\/p]");
		html = html.replace(/\<br>/gi,"[$br]");
		html = html.replace(/\<[^>]*>/g,"");        ///过滤其它所有"<...>"标签
		html = html.replace(/\[\$p\]/gi,"<p>");
		html = html.replace(/\[\$\/p\]/gi,"<\/p>");
		html = html.replace(/\[\$br\]/gi,"<br>");
		editor.document.body.innerHTML = html;
	}else
	{
		var html = IframeID.document.body.ownerDocument.createRange();
		html.selectNodeContents(IframeID.document.body);
		IframeID.document.body.innerHTML = html.toString();
	}
}

function Dvbbs_ChekEmptyCode(html)
{
	html = html.replace(/\<[^>]*>/g,"");        ///过滤其它所有"<...>"标签
	html = html.replace(/&nbsp;/gi, "");
	html = html.replace(/o:/gi, "");
	html = html.replace(/\s/gi, "");
	return html;
}

var colour
function FormatText(command, option)
{
var codewrite
if (Dvbbs_bIsIE5){
		if (option=="removeFormat"){
		command=option;
		option=null;}
		IframeID.focus();
	  	IframeID.document.execCommand(command, false, option);
		Dvbbs_pureText = false;
		IframeID.focus();
		
}else{
		if ((command == 'forecolor') || (command == 'backcolor')) {
			parent.command = command;
			buttonElement = document.getElementById(command);
			IframeID.focus();
			document.getElementById("colourPalette").style.left = getOffsetLeft(buttonElement) + "px";
			document.getElementById("colourPalette").style.top = (getOffsetTop(buttonElement) + buttonElement.offsetHeight) + "px";
		
			if (document.getElementById("colourPalette").style.visibility=="hidden")
				{document.getElementById("colourPalette").style.visibility="visible";
			}else {
				document.getElementById("colourPalette").style.visibility="hidden";
			}
		
			//get current selected range
			var sel = IframeID.document.selection; 
			if (sel != null) {
				colour = sel.createRange();
			}
		}
		else{
		IframeID.focus();
	  	IframeID.document.execCommand(command, false, option);
		Dvbbs_pureText = false;
		IframeID.focus();
		}
	}

}

function setColor(color)
{
	IframeID.focus();
	IframeID.document.execCommand(parent.command, false, color);
	IframeID.focus();
	document.getElementById("colourPalette").style.visibility="hidden";
}

//----------------
function Dvbbs_FilterScript(content)
{
	content = Dvbbs_rCode(content, 'javascript:', '<b>javascript</b> :');
	var RegExp = /<script[^>]*>(.*)<\/script>/gi;
	content = content.replace(RegExp, "<div class=HtmlCode>&lt;!-- Script 代码开始 --&gt;<br>$1<br>&lt;!-- Script 代码结束 --&gt;</div>");
	RegExp = /<P>&nbsp;<\/P>/gi;
	content = content.replace(RegExp, "");
	return content;
}

function Dvbbs_rCode(s,a,b,i){
	//s原字串，a要换掉pattern，b换成字串，i是否区分大小写
	a = a.replace("?","\\?");
	if (i==null)
	{
		var r = new RegExp(a,"gi");
	}else if (i) {
		var r = new RegExp(a,"g");
	}
	else{
		var r = new RegExp(a,"gi");
	}
	return s.replace(r,b); 
}
//Dvbbs_InitDocument("Body","GB2312");