<%
'=============================================================
' FileName: Main.asp
' Version: 5.0.0 SP1
' Date: 2004-12-11
' Script Writen by SailingStudio
'=============================================================
' Copyright (C) 2003-2004 SailingStudio, All Rights Reserved.
' Web: http://www.sailingsoft.net
' Email: webmaster@sailingsoft.net
'=============================================================
dim ErrMsg,info
Class Cls_Site
	Public Program_Version,software,Script_version,Http_version,ServerName,ServerIP,Path,URL,Database,DataTimes
	Public IsAdmin,Admin_name,Admin_type,P_Admin
	Public LocalIP,OnlineTime,Online,Skin
	Public Browser,version,platform,IsSearch
	Public SiteSetting(37),Up_Max,re
	'以下为检查组件部分
	Function IsObjInstalled(strClassString)
		On Error Resume Next
		IsObjInstalled = False
		Err = 0
		Dim xTestObj
		Set xTestObj = Server.CreateObject(strClassString)
		If Err = 0 Then IsObjInstalled = True
		If Err = -2147352567 Then IsObjInstalled = True
		Set xTestObj = Nothing
		Err = 0
	End Function
	'FSO检测部分
	Public Sub Objects()
		dim installedObjects
		InstalledObjects = "Scripting.FileSystemObject"
		If IsObjInstalled(InstalledObjects) Then Response.Write "<font color=red><b>√</b>服务器支持!</font>" Else Response.Write "<b>×</b>服务器不支持!" 
	End Sub
	'管理员验证
	Public Sub Admin()
		if request.Cookies(Site)("IsAdmin")=empty then response.Cookies(Site)("IsAdmin")=0
		if request.Cookies(Site)("IsAdmin")=1 then
			dim sql,rs
			sql = "select * from admin where username='"&request.Cookies(Site)("Admin_name")&"'"
			set rs = Execute(sql)
			if rs.eof and rs.bof then
				IsAdmin = False
				Admin_name=Empty
				Admin_type=Empty
			else
				IsAdmin=true
				Admin_name=request.Cookies(Site)("Admin_name")
				Admin_type=request.Cookies(Site)("Admin_type")
				response.Cookies(Site).Expires=DateAdd("s",3600,Now())
			end if
		else
			IsAdmin=false
			Admin_name=Empty
			Admin_type=Empty
		end if
	End Sub
	Public Sub chkAdmin(flag)
		if flag = "news" then flag = "新闻管理员"
		if flag = "downloads" then flag = "下载管理员"
		if flag = "article" then flag = "文章管理员"
		if flag = "super" then flag = "超级管理员"		
		if flag = "picture" then flag = "图片管理员"		
		if flag = "music" then flag = "音乐管理员"
		if Admin_type <> flag and Admin_type <> "超级管理员" then
			ErrMsg="<li> 您没有相关管理权限。"
			response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
			response.End()
		end if
	End Sub
	Public Function GetMenu()
		dim pop		
		pop = "<DIV class=menuskin id=popmenu onmouseover=clearhidemenu();highlightmenu(event,'on') onmouseout=highlightmenu(event,'off');dynamichide(event) style='Z-index:100'></DIV>"
		pop = pop &"<script Language=Javascript src='inc/pop.js'></script>"&vbnewline
		pop = pop &"<script language=javascript>"&vbnewline
		'===========
		'文章菜单
		pop = pop &"linkset[0]=new Array()"&vbnewline
		Set rs_item = execute("Select * from item where type =1 order by id")
		dim i
		i = -1
		do while not rs_item.eof
			i=i+1
			pop = pop &"linkset[0]["&i&"]='<div class=menuitems><a href=article_list.asp?show="&rs_item(0)&">"&rs_item(1)&"</a></div>'"&vbnewline
		rs_item.movenext
		loop
		rs_item.close
		'===========
		'下载菜单
		pop = pop &"linkset[1]=new Array()"&vbnewline
		Set rs_item = execute("Select * from item where type =2 order by id")
		i = -1
		do while not rs_item.eof
			i=i+1
			pop = pop &"linkset[1]["&i&"]='<div class=menuitems><a href=downloads_list.asp?show="&rs_item(0)&">"&rs_item(1)&"</a></div>'"&vbnewline
		rs_item.movenext
		loop
		rs_item.close
		'===========
		'风格菜单
		dim x,y
		y = LCase(request.ServerVariables("QUERY_STRING"))		
		if y = "" then
			x = ""
		else
			if InStr(y,"skin") > 0 then
				x = replace(y,right(y,5+len(Skin)),"")
			else
				x = y & "&"
			end if
		end if
		pop = pop &"linkset[2]=new Array()"&vbnewline
		pop = pop &"linkset[2][0]='<div class=menuitems><a href=?"&x&"skin=0>恢复默认设置</a></div>'"&vbnewline
		Set rs_item = execute("Select * from style")
		i = 0
		do while not rs_item.eof
			i=i+1
			if Cint(Skin) = rs_item(0) then
				pop = pop &"linkset[2]["&i&"]='<div class=menuitems><a href=?"&x&"skin="&rs_item(0)&">├&nbsp;<font color=red>"&rs_item(1)&"</font></a></div>'"&vbnewline
			else
				pop = pop &"linkset[2]["&i&"]='<div class=menuitems><a href=?"&x&"skin="&rs_item(0)&">├&nbsp;"&rs_item(1)&"</a></div>'"&vbnewline
			end if
		rs_item.movenext
		loop
		rs_item.close		
		'===========
		'图片菜单
		pop = pop &"linkset[3]=new Array()"&vbnewline
		Set rs_item = execute("Select * from item where type =4 order by id")
		i = -1
		do while not rs_item.eof
			i=i+1
			pop = pop &"linkset[3]["&i&"]='<div class=menuitems><a href=pic_list.asp?show="&rs_item(0)&">"&rs_item(1)&"</a></div>'"&vbnewline
		rs_item.movenext
		loop
		rs_item.close
		'===========
		'音乐菜单
		pop = pop &"linkset[4]=new Array()"&vbnewline
		Set rs_item = execute("Select * from item where type =5 order by id")
		i = -1
		do while not rs_item.eof
			i=i+1
			pop = pop &"linkset[4]["&i&"]='<div class=menuitems><a href=music_list.asp?show="&rs_item(0)&">"&rs_item(1)&"</a></div>'"&vbnewline
		rs_item.movenext
		loop
		rs_item.close
		
		Dim sql,rs
		sql = "select * from menu where items=0 and shown=true order by order_num"
		set rs = Execute(sql)
		dim script,tmp,sql2,rs2
		j=4
		do while not rs.eof
			sql2 = "select * from menu where items="&rs(0)
			set rs2 = Execute(sql2)
			if rs2.bof and rs2.eof then
				if rs(0) = 5 then
				 	tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"' onmouseover=showmenu(event,0,1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
				elseif rs(0) =6 then
					tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"' onmouseover=showmenu(event,1,1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
				elseif rs(0) =10 then
					tmp = "<a title='"&rs(4)&"' onmouseover=showmenu(event,2,1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
				elseif rs(0) =7 then
					tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"' onmouseover=showmenu(event,3,1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
				elseif rs(0) =8 then
					tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"' onmouseover=showmenu(event,4,1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
				else
					tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"'>"& rs(1) &"</a> | "
				end if
				j=j
			else
				j=j+1
				id=j
				pop = pop &"linkset["&j&"]=new Array()"&vbnewline
				Set rs_item = Execute("Select * from menu where items="&rs(0))
				i = -1
				do while not rs_item.eof
					i=i+1
					pop = pop &"linkset["&j&"]["&i&"]='<div class=menuitems><a href="&rs_item(2)&" target="&rs_item(3)&" title="&rs_item(4)&">"&rs_item(1)&"</a></div>'"&vbnewline
				rs_item.movenext
				loop
				rs_item.close
				tmp = "<a href='"&rs(2)&"' target='"&rs(3)&"' title='"&rs(4)&"' onmouseover=showmenu(event,"&id&",1,false) onmouseout=delayhidemenu()>"& rs(1) &"</a> | "
			end if
			rs2.close
			script = script & tmp
		rs.movenext
		loop
		rs.close
		response.Write pop &"</script>"
		Getmenu = Left(script,len(script)-3)
	End function	
	Sub System_chk()
		Dim Agent,Tmpstr
		IsSearch = False
		Browser="unknown"
		version="unknown"
		platform="unknown"
		Agent=Request.ServerVariables("HTTP_USER_AGENT")
		'Agent="Opera/7.23 (X11; Linux i686; U)  [en]"	
		If Left(Agent,7) ="Mozilla" Then '有此标识为浏览器
			Agent=Split(Agent,";")
			If InStr(Agent(1),"MSIE")>0 Then
				Browser="MS IE "
				version=Trim(Left(Replace(Agent(1),"MSIE",""),6))
			ElseIf InStr(Agent(4),"Netscape")>0 Then 
				Browser="Netscape "
				tmpstr=Split(Agent(4),"/")
				version=tmpstr(UBound(tmpstr))
			ElseIf InStr(Agent(4),"rv:")>0 Then
				Browser="Mozilla "
				tmpstr=Split(Agent(4),":")
				version=tmpstr(UBound(tmpstr))
				If InStr(version,")") > 0 Then 
					tmpstr=Split(version,")")
					version=tmpstr(0)
				End If
			End If
		If InStr(Agent(2),"NT 5.2")>0 Then
					platform="Windows 2003"
			ElseIf InStr(Agent(2),"Windows CE")>0 Then
				platform="Windows CE"
			ElseIf InStr(Agent(2),"NT 5.1")>0 Then
				platform="Windows XP"
			ElseIf InStr(Agent(2),"NT 4.0")>0 Then
				platform="Windows NT"
			ElseIf InStr(Agent(2),"NT 5.0")>0 Then
				platform="Windows 2000"
			ElseIf InStr(Agent(2),"NT")>0 Then
				platform="Windows NT"
			ElseIf InStr(Agent(2),"9x")>0 Then
				platform="Windows ME"
			ElseIf InStr(Agent(2),"98")>0 Then
				platform="Windows 98"
			ElseIf InStr(Agent(2),"95")>0 Then
				platform="Windows 95"
			ElseIf InStr(Agent(2),"Win32")>0 Then
				platform="Win32"
			ElseIf InStr(Agent(2),"Linux")>0 Then
				platform="Linux"
			ElseIf InStr(Agent(2),"SunOS")>0 Then
				platform="SunOS"
			ElseIf InStr(Agent(2),"Mac")>0 Then
				platform="Mac"
			ElseIf UBound(Agent)>2 Then
				If InStr(Agent(3),"NT 5.1")>0 Then
					platform="Windows XP"
				End If 
				If InStr(Agent(3),"Linux")>0 Then
					platform="Linux"
				End If
			End If
			If InStr(Agent(2),"Windows")>0 And platform="unknown" Then
				platform="Windows"
			End If
		ElseIf Left(Agent,5) ="Opera" Then '有此标识为浏览器
			Agent=Split(Agent,"/")
			Browser="Mozilla "
			tmpstr=Split(Agent(1)," ")
			version=tmpstr(0)
			If InStr(Agent(1),"NT 5.2")>0 Then
				platform="Windows 2003"
			ElseIf InStr(Agent(1),"Windows CE")>0 Then
				platform="Windows CE"
			ElseIf InStr(Agent(1),"NT 5.1")>0 Then
				platform="Windows XP"
			ElseIf InStr(Agent(1),"NT 4.0")>0 Then
				platform="Windows NT"
			ElseIf InStr(Agent(1),"NT 5.0")>0 Then
				platform="Windows 2000"
			ElseIf InStr(Agent(1),"NT")>0 Then
				platform="Windows NT"
			ElseIf InStr(Agent(1),"9x")>0 Then
				platform="Windows ME"
			ElseIf InStr(Agent(1),"98")>0 Then
				platform="Windows 98"
			ElseIf InStr(Agent(1),"95")>0 Then
				platform="Windows 95"
			ElseIf InStr(Agent(1),"Win32")>0 Then
				platform="Win32"
			ElseIf InStr(Agent(1),"Linux")>0 Then
				platform="Linux"
			ElseIf InStr(Agent(1),"SunOS")>0 Then
				platform="SunOS"
			ElseIf InStr(Agent(1),"Mac")>0 Then
				platform="Mac"
			ElseIf UBound(Agent)>2 Then
				If InStr(Agent(3),"NT 5.1")>0 Then
					platform="Windows XP"
				End If 
				If InStr(Agent(3),"Linux")>0 Then
					platform="Linux"
				End If
			End If
		Else
			'识别搜索引擎
			Dim botlist,i
			Botlist="Google,Isaac,Webdup,SurveyBot,Baiduspider,ia_archiver,P.Arthur,FAST-WebCrawler,Java,Microsoft-ATL-Native,TurnitinBot,WebGather,Sleipnir"
			Botlist=split(Botlist,",")
			For i=0 to UBound(Botlist)
				If InStr(Agent,Botlist(i))>0  Then 
					platform=Botlist(i)&"搜索器"
					IsSearch=True
					Exit For
				End If
			Next 
		End If
	End sub	
	Property Get Get_Url()
		If request.servervariables("SERVER_PORT")="80" Then
			Get_Url="http://" & request.servervariables("server_name")&URL
		Else
			Get_Url="http://" & request.servervariables("server_name")&":"&request.servervariables("SERVER_PORT")&URL
		End If
	End Property
	Public Function ChangeEmot(content)
		dim i,j
		For i = 1 to 49
			j = i
			if len(i) = 1 then j = 0&i
			content = replace(content,"[em"&j&"]","<img src=images/post/emot/em"&j&".gif>")
		Next
		ChangeEmot = content
	End Function
	Public Function Lenth(content)
		dim lent
		lent = 18
		if len(content) > lent then
			content = left(content,lent-1) &"..."
		End if
		Lenth = content
	End Function
	Public Function UBB(s)
		s=UbbCode(s,"\[MP=(.[^\[]*)\]","\[\/MP\]","MP","<object align=middle classid=CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95 class=OBJECT id=MediaPlayer width=$1 height=$2 ><PARAM NAME=AUTOSTART VALUE=$3 ><param name=ShowStatusBar value=-1><param name=Filename value=$4><embed type=application/x-oleobject codebase=http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701 flename=mp src=""$4"" width=$1 height=$2></embed></object>","<a href=""$4"" target=_blank>$4</a>","=*([0-9]*),*([0-9]*),*([0|1|true|false]*)")
		s=UbbCode(s,"\[RM=(.[^\[]*)\]","\[\/RM\]","RM","<OBJECT classid=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA class=OBJECT id=RAOCX width=$1 height=$2><PARAM NAME=SRC VALUE=""$4""><PARAM NAME=CONSOLE VALUE=""$4""><PARAM NAME=CONTROLS VALUE=imagewindow><PARAM NAME=AUTOSTART VALUE=$3 ></OBJECT><br><OBJECT classid=CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA height=32 id=""video"" width=$1><PARAM NAME=SRC VALUE=""$4""><PARAM NAME=AUTOSTART VALUE=$3><PARAM NAME=CONTROLS VALUE=controlpanel><PARAM NAME=CONSOLE VALUE=""$4""></OBJECT>","<a href=$4 target=_blank>$4</a>","=*([0-9]*),*([0-9]*),*([0|1|true|false]*)")
		s=UbbCode(s,"\[FLASH=(.[^\[]*)\]","\[\/FLASH\]","FLASH","<OBJECT codeBase=http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0 classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width=$1 height=$2><PARAM NAME=movie VALUE=""$3""><PARAM NAME=quality VALUE=high><embed src=""$3"" quality=high pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash' width=$1 height=$2>$3</embed></OBJECT><br><a href=""$3"" TARGET=_blank><IMG SRC=images/post/swf.gif border=0 alt=点击开新窗口欣赏该动画! height=16 width=16>[全屏欣赏]</a>","<a href=$3 target=_blank>$3</a>（注意：Flash内容可能含有恶意代码）","=*([0-9]*),*([0-9]*)")
		s=bbimg(s,600)
		UBB = s
	End Function
	Public Function UbbCode(strText,uCodeL,uCodeR,uCodeC,tCode1,tCode2,iCode)
		Dim s
		s=strText
		re.Pattern=uCodeL
		s=re.replace(s, chr(1) & uCodeC & "=$1" & chr(2))
		re.Pattern=uCodeR
		s=re.replace(s, chr(1) & "/" & uCodeC & chr(2))
		re.Pattern="\x01"&uCodeC&iCode&"\x02(.[^\x01]*)\x01\/"&uCodeC&"\x02"
		s=re.Replace(s,tCode1)
		re.Pattern="\x02"
		s=re.replace(s, "]")
		re.Pattern="\x01"
		s=re.replace(s, "[")
		UbbCode=s
	End Function
	Public Function bbimg(strText,ssize)
		Dim s
		s=strText
		re.Pattern="<img(.[^>]*)>"
		If ssize=500 Then
			s=re.replace(s,"<img$1 onmousewheel=""return bbimg(this)"" onload=""javascript:if(this.width>screen.width-"&ssize&")this.style.width=screen.width-"&ssize&";"">")
		Else
			s=re.replace(s,"<img$1 onmousewheel=""return bbimg(this)"" onload=""javascript:if(this.width>screen.width-"&ssize&")this.style.width=screen.width-"&ssize&";if(this.height>250)this.style.width=(this.width*250)/this.height;"">")
		End If
		bbimg=s
	End Function
End Class
%>