<!--#include file="CONN.asp"-->
<!--#include file="inc/Char.asp"-->
<!--#include file="inc/md5.asp" -->
<%
Head()

Data.Admin()
If Data.IsAdmin=false then
	ErrMsg="<li> ��û�е�½���ǹ���Ա����<a href='admin_login.asp' target='_top'>��½</a>��"
	response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
	response.End()
end if

if request.QueryString("action")="update_info" then
	call update_info()	
else
	call main()
end if

Footer()
Sub Update_info()
	dim Username,Password_org,Password,Password2,code
	Username = trim(request.Form("Username"))
	Password_org = trim(request.Form("Password_org"))
	Password = trim(request.Form("Password_new"))
	Password2 = trim(request.Form("Password_new2"))
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
	if password_org="" or password="" or password2="" then
		ErrMsg="<li> ��������������Ϣ��"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	end if
	if Password<>Password2 then
		ErrMsg="<li> ��������������벻һ�£����������롣"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		Exit Sub
	End if
	
	dim rs	
	password_org = md5 (password_org)
	set rs = Data.Execute("select * from admin where Username='"&username&"'")
	if rs.eof and rs.bof then 
		ErrMsg="<li> �û�������ȷ��"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		exit sub
	else		
		if password_org = rs(2) then
			Dim SaveSet,cmd,Md5_code
			Md5_code=md5(Password)
			cmd = "Update Admin set pwd = '"&Md5_code&"' where username = '"&username&"'"
			Data.Execute(cmd)
			info="<li> ����Ա������³ɹ���"
			response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")
		else
			ErrMsg="<li> ����������벻��ȷ��"
			response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
			exit sub
		end if
	end if
	rs.close	
end Sub
Sub Main()
	dim username,Admin_type
	username = Session("Admin_name")
%>
  <br>
  <table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
	<form action="admin_admin.asp?action=update_info" method="post">
    <tr>
      <td colspan="3" class="title"><div align="center" class="title"> ����Ա�����޸�</div></td>
    </tr>
    <tr>
      <td colspan="3" class="title2">&nbsp;���������վ�Ĺ���Ա������Ա�����޸���վ�����á�</td>
    </tr>
    <tr>
      <td width="16%" class="table">&nbsp;����Ա�û���</td>
      <td width="84%" colspan="2" class="table"><input name="Username" type="text" id="UserName3">
      &nbsp;<font class="alert">�����޸�</font></td>
    </tr>
    <tr>
      <td class="table">&nbsp;���������</td>
      <td colspan="2" class="table"><input name="Password_org" type="password" id="Password_org"></td>
    </tr>
    <tr>
      <td class="table">&nbsp;����������</td>
      <td colspan="2" class="table"><input name="Password_new" type="password" id="Password_new"></td>
    </tr>
    <tr valign="top">
      <td class="table"><p align="left">&nbsp;��������������</p></td>
      <td colspan="2" class="table"><input name="Password_new2" type="password" id="Password_new2"></td>
    </tr>
    <tr valign="top">
      <td class="table"><p align="left"> &nbsp;��֤��</p></td>
      <td colspan="2" class="table"><input name="code" type="text" id="code3" maxlength="4">
&nbsp; �����룺<img src="Code.asp"></td>
    </tr>
    <tr>
      <td colspan="3" class="table"><div align="center">
          <input type="submit" name="Submit3" value="�ύ">
&nbsp;
          <input type="reset" name="Submit22" value="����">
      </div></td>
    </tr>
</form>
</table>
  <%End Sub%>

