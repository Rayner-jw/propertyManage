<!--#include file="CONN.asp"-->
<!--#include file="inc/Md5.asp"-->
<!--#include file="inc/Char.asp"-->
<%
Head()
Data.Admin()
If Data.IsAdmin=false then
	ErrMsg="<li> ��û�е�½���ǹ���Ա����<a href='admin_login.asp' target='_top'>��½</a>��"
	response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
	response.End()
end if

%>
  <%If Session("Level")=0 and Session("Level")<>"" Then%>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
  <!--DWLayoutTable-->
    <tr>
      <td colspan="3" class="title"><div align="center" class="title"> 
        <div align="center">����</div>
      </div></td>
  </tr>

    <tr>
      <td width="33%" class="items"><div align="center"><a href="admin_toushu.asp">���ס��Ͷ��</a></div></td>
      <td width="33%" class="items"><div align="center"><a href="admin_toushu.asp?action=admin">����ס��Ͷ��</a></div></td>
      <td width="33%">&nbsp;</td>
    </tr>

</table>
	<%
	End IF
	%>
<br>
<%
Select case request.QueryString("action")
	case "save" 		'�����½�
		call SaveSet()
	case "add"			'�½�
		call add()
	case "admin"		'����
		call admin()
	case "edit"			'�޸�
		call edit()
	case "SaveEdit"		'�����޸�
		call SaveEdit()	
	case "del"			'ɾ��
		call del()
	case else
		call add()
End Select
Footer()

sub SaveSet()
Data.chkAdmin(0)
	dim NewsTitle,article,txtSource,txtWriter
	Stname = replace(request.Form("Stname"),"'","''")
	StChairman = request.Form("StChairman")
	Stmanager = request.Form("Stmanager")
	StPassword = Request.Form("StPassword")
	StContect = Request.Form("Stcontect")
	StDepartment = Request.Form("StDepartment")
	StAbout=replace(request.Form("content"),"'","''")
	stIndate=replace(request.Form("indate"),"'","''")
	'stRoomtype=replace(request.Form("roomtype"),"'","''")
	
	if Stname = "" then
		ErrMsg="<li> ���Ʋ���Ϊ�գ�����дס��Ͷ������"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		response.End()
	end if	
	Dim SaveSet,cmd
	cmd = "Insert into toushu(Ͷ�߱��,Ͷ��ס��,�Ӵ���Ա,Ͷ������,Ͷ������,������Ա,�������) Values('"&Stname&"','"&StDepartment&"','"&StChairman&"','"&stindate&"','"&Stmanager&"','"&StPassword&"','"&stAbout&"')"
	set SaveSet = Data.Execute (cmd)
	info="<li> ס��Ͷ����ӳɹ�"	
	response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")
	TempRs.Close	
	SaveSet.close
end Sub

sub SaveEdit()
	dim StName,StManager,id,StDepartment,StChairman,StContect
	id = replace(request.Form("id"),"'","''")
	Stname = replace(request.Form("Stname"),"'","''")
	StChairman = request.Form("StChairman")
	Stmanager = request.Form("Stmanager")
	StPassword = Request.Form("StPassword")
	StContect = Request.Form("Stcontect")
	StDepartment = Request.Form("StDepartment")
	StAbout=replace(request.Form("content"),"'","''")
	stIndate=replace(request.Form("indate"),"'","''")
	'stRoomtype=replace(request.Form("roomtype"),"'","''")
	
	
	if Stname = "" then
		ErrMsg="<li> ���Ʋ���Ϊ�գ�����дס��Ͷ������"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		
	end if
	Dim SaveEdit,cmd
	cmd = "Update toushu set Ͷ�߱��='"&stname&"',Ͷ��ס��='"&StDepartment&"',�Ӵ���Ա='"&StChairman&"',Ͷ������='"&Stmanager&"',������Ա='"&StPassword&"',Ͷ������='"&stindate&"',�������='"&StAbout&"' Where id = "&id&""
	'response.write cmd
	
	set SaveEdit = Data.Execute (cmd)
	info="<li> ס��Ͷ���޸ĳɹ�"
	response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")	
	SaveEdit.close
end Sub

Sub del()
	dim id
	id = request.QueryString("id")
	dim del	
	Data.Execute("delete from toushu where id = "&id&"")

	info="<li> ס��Ͷ��ɾ���ɹ�"
	response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")	
	del.close
end sub
sub add()
Data.chkAdmin(0)
%>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
  <!--DWLayoutTable-->
<form action="admin_toushu.asp?action=save" method="post" onsubmit="javascript:submits();">
  <tr>
    <td height="19" colspan="2" class="title"><div align="center" class="title"> �½�ס��Ͷ����Ϣ</div></td>
  </tr>
  <tr>
    <td height="19" colspan="2" class="title2">&nbsp;�������ס��Ͷ�ߣ�������ʾ����ҳ�ϡ�</td>
  </tr>
  <tr>
    <td width="18%" class="table">Ͷ�߱��</td>
    <td class="table"><input name="StName" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
  </tr>
  <tr>
    <td width="18%" class="table"> Ͷ��ס��</td>
    <td class="table"><input name="StDepartment" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
  </tr>
  <tr valign="top">
    <td class="table">�Ӵ���Ա</td>
    <td class="table"><input name="StChairman" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
  </tr>
  <tr valign="top">
    <td class="table">Ͷ������ </td>
    <td valign="top" class="table"><input name="Stmanager" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="81" gf="0">    </td>
  </tr>
    <tr>
      <td width="18%" class="table">������Ա</td>
    <td class="table"><input name="StPassword" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
  </tr>

  <tr>
      <td width="18%" class="table">Ͷ������</td>
      <td class="table"><input name="indate" type="text" class="lostfocus" id="indate" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40" gf="0"></td>
  </tr>
  
  
  <tr valign="top">
    <td height="370" class="table"><p align="left">�������</p></td>
    <td class="table">
	<!-- #include file = "edit.asp"--></td>
  </tr>
  <tr>
    <td height="27" colspan="4" class="table"><div align="center">
      <input type="submit" name="Submit" value="�ύ">
    </div></td>
  </tr>
</form>
</table>
<%End Sub

Sub admin()
If Session("Level")<>0 or Session("Level")="" then Response.Redirect("admin_toushu.asp?action=edit&id="&Session("Belong")&"")
%>

<br>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
  <tr>
    <td colspan="9" class="title"><div align="center" class="title"> �޸�ס��Ͷ���б�</div></td>
  </tr>
  <tr>
    <td colspan="9" class="title2">&nbsp;ѡ������Ҫ���ĵ�ס��Ͷ�ߡ�</td>
  </tr>
  <tr>
    <td width="6%" class="items">    <div align="center">���</div></td>
    <td width="12%" class="items"><div align="center"><span class="Forumrow">&nbsp;<span class="table">Ͷ��ס��</span></span></div></td>
    <td width="15%" class="items"><div align="center"><span class="table">�Ӵ���Ա</span></div></td>
    <td width="15%" class="items"><div align="center"><span class="table">������Ա</span></div></td>

    <td width="19%" class="items"><div align="center">Ͷ������</div></td>
    <td width="14%" class="items"><div align="center">�������</div></td>
    <td width="13%" class="items"><div align="center">Ͷ������</div></td>
    <td width="6%" class="items"><div align="center">����</div></td>
  </tr>
<%
'************��ҳ����*******************
'on error resume next
if request.querystring("page")="" then page=1:else:page=cint(request.querystring("page"))   '�ĵ���ַ�е�ҳ�� page=?

set rs=Data.Execute("Select * from toushu order by ID desc")

rs.pagesize=15 'ÿҳ��ʾ������
if not rs.eof then
rs.AbsolutePage=page
end if

if page>rs.pagecount then
	response.Write("<tr>")
	response.Write("<td colspan='6'>")
	response.write "<center>��ǰ��û��ס��Ͷ��<center>"
	response.Write("</td>")
	response.Write("</tr>")
end if


for i=0 to rs.pagesize-1    '��ʾ���������������,i+(page*13-13)+1 ��������ҳ����ʾ����ı��
if rs.eof then exit for%>


<tr onmouseover=this.style.backgroundColor="#F2F2F2" onmouseout=this.style.backgroundColor=""  bgcolor="#FFFFFF">  
    <td><div align="center"><%=rs(0)%></div></td>
    <td>&nbsp;<a href="admin_toushu.asp?action=edit&id=<%=rs(0)%>"><%=rs("Ͷ��ס��")%></a></td>
    <td><div align="center">
    <%=rs("�Ӵ���Ա")%>    </div></td>
    <td>
<div align="left"><%=rs("������Ա")%></div></td>
    <td><div align="center">
    <%=rs("Ͷ������")%>    </div></td>
    <td><div align="left"><%=rs("�������")%></div></td>
    <td><div align="left"><%=rs("Ͷ������")%></div></td>
    <td><div align="center"><a href="admin_toushu.asp?action=del&id=<%=rs(0)%>" onclick="{if(confirm('��ȷ��Ҫɾ����ס��Ͷ����?')){return true;}return false;}">ɾ��</a></div></td>
  </tr>
  <%
  rs.movenext
	next%>
<tr>
  <td colspan="9" class="table"><div align="right">
 <% 
response.Write("��ҳ�� ")
if page>1 then response.write "[<A href='admin_toushu.asp?action=admin&page=1&item="&items&"'>��ҳ</a>][<a href='admin_toushu.asp?action=admin&page=" & page-1 & "&item="&items&"'>��ҳ</a>] ":else:response.write "[��ҳ][��ҳ] "
for i=1 to rs.pagecount
if i=page then response.write "<b><font color='#FF0000'>"& i & "</font></b> ":else:response.write "<A href='admin_toushu.asp?action=admin&page=" & i & "&item="&items&"'>" & i & "</a> "
next
if page<rs.pagecount then response.write "[<a href='admin_toushu.asp?action=admin&page=" & page+1 & "&item="&items&"'>��ҳ</a>][<a href='admin_toushu.asp?action=admin&page=" & rs.pagecount & "&item="&items&"'>βҳ</a>]":else:response.write "[��ҳ][βҳ] "
response.Write(" ["&page&"/"&rs.pagecount&"ҳ]["&rs.pagesize&"��/ҳ]")

rs.close         '�ͷ���Դ
set rs=nothing
set link1=nothing
%>
  </div></td>
  </tr>
</table>
<%
End Sub

Sub edit
dim id,Edit_News
If Session("Level")=0 and Session("Level")<>"" Then
id = request.QueryString("id")
Else
Id=Session("Belong")
End If
set RS = Data.Execute("select * from toushu where id = "& id&"")
Edit_News = rs("�������")
%>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
<form action="admin_toushu.asp?action=SaveEdit" method="post" id="form_edit" name="form_edit" onsubmit="javascript:submits();">
  <tr>
    <td colspan="2" class="title"><div align="center" class="title"> �޸�ס��Ͷ����Ϣ</div></td>
  </tr>
  <tr>
    <td colspan="2" class="title2">&nbsp;�����޸�ס��Ͷ����Ϣ����������ԭ��ס��Ͷ�ߡ�</td>
  </tr>
  <tr>
    <td width="18%" class="table">Ͷ�߱��</td>
    <td colspan="2" class="table"><input name="StName" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("Ͷ�߱��")%>"></td>
  </tr>
  <tr>
    <td width="18%" class="table"> Ͷ��ס��</td>
    <td colspan="2" class="table"><input name="StDepartment" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("Ͷ��ס��")%>"></td>
  </tr>
  <tr valign="top">
    <td class="table">�Ӵ���Ա</td>
    <td colspan="2" class="table"><input name="StChairman" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40" gf="0" value="<%=rs("�Ӵ���Ա")%>">
      <input name="id" type="hidden" class="lostfocus" id="id" onFocus='this.className="getfocus";this.gf="1"' onBlur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onMouseOut='if (this.gf=="0") this.className="lostfocus"' value="<%=id%>" size="40" gf="0"></td>
  </tr>
  <tr valign="top">
    <td class="table">Ͷ������ </td>
    <td colspan="2" valign="top" class="table"><input name="Stmanager" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="81"  gf="0" value="<%=rs("Ͷ������")%>">    </td>
  </tr>
    <tr>
      <td width="18%" class="table">������Ա</td>
    <td colspan="2" class="table"><input name="StPassword" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("������Ա")%>"></td>
  </tr>
        <tr>
      <td width="18%" class="table">Ͷ������</td>
      <td colspan="2" class="table"><input name="indate" type="text" class="lostfocus" id="indate" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("Ͷ������")%>"></td>
  </tr>
  <tr valign="top">
    <td class="table"><p align="left">�������</p></td>
    <td width="279" class="table"><input name="edit" id="edit" type="hidden" value="<%=Server.HTMLEncode(Edit_News)%>"></input>
	<!-- #include file = "edit.asp"-->
	  <script>
		IframeID.document.body.innerHTML=form_edit.edit.value;
	  </script></td>
  </tr>
  <tr>
    <td colspan="3" class="table"><div align="center">
        <input type="submit" name="Submit" value="�ύ">
    </div></td>
  </tr>
</form>
</table>
<%
rs.close
End Sub%>
