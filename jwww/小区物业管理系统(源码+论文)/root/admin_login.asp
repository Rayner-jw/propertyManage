<!--#include file="CONN.ASP" -->
<!--#include file="inc/md5.asp" -->


<link href="admin_style.css" rel="stylesheet" type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>ϵͳ��½</title>
<style>
	.menuover { border: 1px #08246B solid; background-image:url(images/manage/tbover.gif); cursor:default;}
	.menuUp {  border: 1px #333333 Dashed; background-color: #ffffff; font-size: 12px; font-family: Arial; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);cursor:default;}
	.menudown { border: 1px #08246B solid; background-image:url(images/manage/tbdown.gif);cursor:default;}
</style>
<%
Data.Admin()
	if request.QueryString("action")="chk" then
		call chk()   
	end if
	if request.QueryString("action")="" then
		if Data.IsAdmin then
			response.Redirect("index.asp")
			response.end()
		else
			call login()
		end if
	end if
Sub login()
	On Error Resume Next
	Dim Ados,GetCode
	Set Ados=Server.CreateObject("Adodb.Stream")
	If Err Then
		GetCode=9999
	End If
%>
<br>
<br>
<table width="465" border="3" align="center" cellpadding="1" cellspacing="0">
  <tr>
    <td height="26" bordercolor="#FFFFFF" background="images/manage/admin_bg_1.gif"><div align="center"><font color="#FFFFFF"><strong><span class="title3"><%=Data.SiteSetting(0)%></span> - �� �� �� ¼</strong></font></div></td>
  </tr>
  <tr valign="top">
    <td width="455" height="254" bordercolor="#FFFFFF" background="images/manage/login2.jpg"><div align="center">
      <table width="337" border="0" align="right" cellpadding="0" cellspacing="0">
	  <form action="admin_login.asp?action=chk" method="post" name="login">
        <tr>
          <td width="229" rowspan="2">&nbsp;</td>
          <td width="108" height="93">&nbsp;</td>
        </tr>
        <tr>
          <td height="18"><div align="right">&nbsp;&nbsp;</div></td>
        </tr>
        <tr>
          <td height="18"><input name="username" type="text" size="20" height="18"  class="login_lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="login_lostfocus"' onblur='this.className="login_lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
          <td width="108" rowspan="5">&nbsp;</td>
        </tr>
        <tr>
          <td height="8"></td>
          </tr>
        <tr>
          <td height="21"><input name="password" type="password" size="20" height="18" class="login_lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="login_lostfocus"' onblur='this.className="login_lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
          </tr>
        <tr>
          <td height="8"></td>
          </tr>
        <tr>
          <td height="21"><input name="code" type="text" size="4" maxlength="4"  height="18" class="login_lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="login_lostfocus"' onblur='this.className="login_lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'>            ��
            ��<img src="Code.asp" width="40" height="10">&nbsp;&nbsp;
            <input name="��¼" type="submit" class="menuUp" onMouseDown='this.className="menudown"' onMouseOver='this.className="menuover"' onMouseOut='this.className="menuUp"' value="��¼" width="35"></td>
          </tr></form>
      </table>
    </div></td>
  </tr>
  <tr>
    <td bordercolor="#FFFFFF" bgcolor="#F0F0F0">    <div align="right"> </div></td>
  </tr>
</table>
<%end sub

sub chk()
	dim username,password,code
	username=trim(request.form("username"))
	password=trim(request.form("password"))
	code=trim(request.Form("code"))
	if code="" then
		ErrMsg="<li> �뷵������ȷ���롣"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	elseif session("getcode")="" then
		ErrMsg="<li> �벻Ҫ�ظ��ύ���������µ�¼�뷵�ص�¼ҳ�档"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	elseif cstr(session("getcode"))<>cstr(trim(code)) then
		ErrMsg="<li> �������ȷ�����ϵͳ�����Ĳ�һ�£����������롣"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	end if
		session("getcode")=""
	if username="" or password="" then
		ErrMsg="<li> �����������û��������롣"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	end if
		
	dim rs	
	password = md5(password)
	set rs = Data.Execute("select * from admin where Username='"&username&"'")
	if rs.eof and rs.bof then 
		ErrMsg="<li> ��������û�������ȷ����������ϵͳ����Ա����<a href=admin_login.asp>��������</a>�����û�����"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		exit sub
	else
	Response.Write(Password&"&nbsp;"&rs(1))
		if password=rs(2) then
			Session("IsAdmin")=1
			Session("Admin_name")=username
			Session("Belong")=rs(4)
			Set TempRs=Data.Execute("Select Name,StId from Shetuan Where StId = "&Session("Belong")&";")
			Session("Shetuan")=TempRs("Name")
			TempRs.close
			Session("Level")=rs(3)
			Select Case rs(3)
				Case 0
					Session("Admin_type")="��������Ա"
				Case 1
					Session("Admin_type")="Э�����Ա"
				Case "���Ź���Ա"
					Session("Admin_type")="���Ź���Ա"
				Case "���ع���Ա"
					Session("Admin_type")="���ع���Ա"
				Case "ͼƬ����Ա"
					Session("Admin_type")="ͼƬ����Ա"
				Case "���ֹ���Ա"
					Session("Admin_type")="���ֹ���Ա"
				End Select
			response.Redirect("index.asp")
		else
			ErrMsg="<li> ����������벻��ȷ����������ϵͳ����Ա����<a href=admin_login.asp>��������</a>�������롣"
			response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
			exit sub
		end if
	end if
	rs.close
end sub
%>
