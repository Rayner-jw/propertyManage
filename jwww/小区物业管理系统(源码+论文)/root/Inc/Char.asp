<%
Sub Head()	
	Response.Write "<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.01 Transitional//EN"">"&Chr(10)	
	Response.Write "<html>"&Chr(10)
	Response.Write "<head>"&Chr(10)
	Response.Write "<meta name http-equiv=""Content-Type"" content=""charset=gb2312"">"
	Response.Write "<meta name=keywords content="",TlyStudio"">"&Chr(10)
	Response.Write "<meta name=""description"" content=""Design By TlyStudio"">"&Chr(10)
	Response.Write "<link href=""admin_style.css"" rel=""stylesheet"" type=""text/css"">"&Chr(10)
	Response.Write "<title> - 控制面版</title>"&Chr(10)
	Response.Write "</head>"&Chr(10)
	Response.Write "<body leftmargin=""0"" topmargin=""0"" marginheight=""0"" marginwidth=""0"">"&Chr(10)
%>




<table cellpadding="3" cellspacing="0" border="0" align=center style="width:100%">
<tr><td class="toptable">
<table height="100%" width="100%" border=0 cellpadding=0 cellspacing=0>
<tr valign=middle>
	<td width=36 id=a1><img src="images/manage/toleft.gif" onmouseover="this.src='images/manage/toleft2.gif'" onmouseout="this.src='images/manage/toleft.gif'" onclick="changeSize()" style="cursor:hand" alt="隐藏列表">
	</td>
	<td width=280>小区物业管理系统 控制面板</td>
	<td width=10>
	</td>
	<td width=126>
		<div align="center"><a href="" target=_blank></a>
	      </div></td>
	<td width=16>
	</td>
	<td width=92><div align="center"><a href="/bbs" target=_blank></a></div></td>
	<td width="203" align=right>
		<a href="index.asp" target=_top>返回首页</a>
	</td>
</tr>
</table>
</td></tr>
<tr><td height=10></td></tr>
</table>
<%
End Sub

Sub footer()
	Response.Write"<table align=center >"
	Response.Write"<tr align=center><td width=""100%"" class=""copyright"">"
	Response.Write"Copyright &copy; 2006-2007 <a href="""" target=""_blank""></a>. All Rights Reserved."
	Response.Write"</td>"
	Response.Write"</tr>"
	Response.Write"</table>"
	Response.Write"</body>"
	Response.Write"</html>"
End Sub
%>
<Script>
function submits(){
	document.all("content").value=IframeID.document.body.innerHTML;
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

<!--
var pic=new Array("images/manage/toleft.gif","images/manage/toleft2.gif","images/manage/toright.gif","images/manage/toright2.gif")
var leftorright='leftFrame';
function changeSize(){
top.M_Frame.cols=(top.M_Frame.cols=="185,*")?"0,*":"185,*";
if (leftorright=='leftFrame'){
document.all.a1.innerHTML="<img src=\"images/manage/toright.gif\" onmouseover=\"this.src=pic[3]\" onmouseout=\"this.src=pic[2]\" onclick=\"changeSize()\"style=\"cursor:hand\" alt=\"显示列表\">";
leftorright='mainFrame';
}
else
{
document.all.a1.innerHTML="<img src=\"images/manage/toleft.gif\" onmouseover=\"this.src=pic[1]\" onmouseout=\"this.src=pic[0]\" onclick=\"changeSize()\"style=\"cursor:hand\" alt=\"隐藏列表\">";
leftorright='leftFrame';
}
}
-->
</script>