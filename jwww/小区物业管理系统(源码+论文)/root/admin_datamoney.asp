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
      <td width="33%" class="items"><div align="center"><a href="admin_datamoney.asp">���ס���ɷ�</a></div></td>
      <td width="33%" class="items"><div align="center"><a href="admin_datamoney.asp?action=admin">����ס���ɷ�</a></div></td>
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
	sf=request("sf")
	df=request("df")
	qf=request("qf")
	wx=request("wx")
	tc=request("tc")
	gt=request("gt")
	'stRoomtype=replace(request.Form("roomtype"),"'","''")
	
	if Stname = "" then
		ErrMsg="<li> ���Ʋ���Ϊ�գ�����дס���ɷ�����"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		response.End()
	end if	
	Dim SaveSet,cmd
	cmd = "Insert into datamoney(���ݱ��,ס������,�ɷ�����,�շ���Ա,�ɷѷ�ʽ,�ɷ��ܶ�,ˮ��,���,����,ά��,ͣ��,��̯����,��ע) Values('"&Stname&"','"&StDepartment&"','"&StChairman&"','"&Stmanager&"','"&StPassword&"','"& StContect&"','"&stAbout&"','"&sf&"','"&df&"','"&qf&"','"&wx&"','"&tc&"','"&gt&"')"
	set SaveSet = Data.Execute (cmd)
	info="<li> ס���ɷ���ӳɹ�"	
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
		ErrMsg="<li> ���Ʋ���Ϊ�գ�����дס���ɷ�����"
		response.Redirect("showerr.asp?action=AdminErr&ErrMsg="&ErrMsg&"")
		
	end if
	Dim SaveEdit,cmd
	cmd = "Update datamoney set ���ݱ��='"&stname&"',ס������='"&StDepartment&"',�ɷ�����='"&StChairman&"',�շ���Ա='"&Stmanager&"',�ɷѷ�ʽ='"&StPassword&"',�ɷ��ܶ�='"&StContect&"',��ע='"&StAbout&"' Where id = "&id&""
	response.write cmd
	 
	set SaveEdit = Data.Execute (cmd)
	info="<li> ס���ɷ��޸ĳɹ�"
	response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")	
	SaveEdit.close
end Sub


Sub del()
	dim id
	id = request.QueryString("id")
	dim del	
	Data.Execute("delete from datamoney where id = "&id&"")

	info="<li> ס���ɷ�ɾ���ɹ�"
	response.Redirect("showerr.asp?action=AdminSuc&info="&info&"")	
	del.close
end sub
sub add()
Data.chkAdmin(0)
%>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
  <!--DWLayoutTable-->
<form action="admin_datamoney.asp?action=save" method="post" onsubmit="javascript:submits();">
  <tr>
    <td height="19" colspan="4" class="title"><div align="center" class="title"> �½�ס���ɷ���Ϣ</div></td>
  </tr>
  <tr>
    <td height="19" colspan="4" class="title2">&nbsp;�������ס���ɷѣ�������ʾ����ҳ�ϡ�</td>
  </tr>
  <tr>
    <td width="116" class="table"> ���ݱ��</td>
    <td width="281" class="table"><input name="StName" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
    <td class="table">ˮ��</td>
    <td class="table"><input name="sf" type="text" class="lostfocus" id="sf" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>
  <tr>
    <td width="116" class="table"> ס������</td>
    <td class="table"><input name="StDepartment" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
    <td class="table">���</td>
    <td class="table"><input name="df" type="text"  class="lostfocus" id="df" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>
  <tr valign="top">
    <td class="table">�ɷ�����</td>
    <td class="table"><input name="StChairman" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
    <td class="table">����</td>
    <td class="table"><input name="qf" type="text" class="lostfocus" id="qf" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>
  <tr valign="top">
    <td class="table">�շ���Ա</td>
    <td valign="top" class="table"><input name="Stmanager" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40" gf="0">    </td>
  <td width="74" valign="top" class="table">ά�޷���</td>
  <td width="206" valign="top" class="table"><input name="wx" type="text" class="lostfocus" id="wx" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>
    <tr>
      <td width="116" class="table">�ɷѷ�ʽ</td>
      <td class="table"><input name="StPassword" type="text" size="40" class="lostfocus" gf="0" onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' onblur='this.className="lostfocus";this.gf="0"' onfocus='this.className="getfocus";this.gf="1"'></td>
      <td class="table">ͣ��</td>
      <td class="table"><input name="tc" type="text" class="lostfocus" id="tc" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>

  <tr>
    <td width="116" class="table">�ɷ��ܶ� </td>
      <td class="table"><input name="Stcontect" type="text" class="lostfocus" id="Stcontect" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40" gf="0"></td>
      <td class="table">��̯����</td>
      <td class="table"><input name="gt" type="text" class="lostfocus" id="gt" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' gf="0"></td>
  </tr>
  
  
  <tr valign="top">
    <td height="370" class="table"><p align="left">��ע</p></td>
    <td colspan="3" class="table">
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
If Session("Level")<>0 or Session("Level")="" then Response.Redirect("admin_datamoney.asp?action=edit&id="&Session("Belong")&"")
%>

<br>
<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
  <tr>
    <td colspan="12" class="title"><div align="center" class="title"> �޸�ס���ɷ��б�</div></td>
  </tr>
  <tr>
    <td colspan="12" class="title2">&nbsp;ѡ������Ҫ���ĵ�ס���ɷѡ�</td>
  </tr>
  <tr>
    <td width="6%" class="items">    <div align="center">���</div></td>
    <td width="10%" class="items"><span class="Forumrow">&nbsp;<span class="table">ס������</span></span></td>
    <td width="10%" class="items"><div align="center"><span class="table">�շ���Ա</span></div></td>
    <td width="9%" class="items"><div align="center"><span class="table">�ɷ��ܶ� </span></div></td>

    <td width="6%" class="items">ˮ��</td>
    <td width="7%" class="items">���</td>
    <td width="9%" class="items">����</td>
    <td width="10%" class="items">ͣ����</td>
    <td width="12%" class="items">��̯����</td>
    <td width="10%" class="items">ά�޷�</td>
    <td width="11%" class="items"><div align="center">����</div></td>
  </tr>
<%
'************��ҳ����*******************
'on error resume next
if request.querystring("page")="" then page=1:else:page=cint(request.querystring("page"))   '�ĵ���ַ�е�ҳ�� page=?

set rs=Data.Execute("Select * from datamoney order by ID desc")

rs.pagesize=15 'ÿҳ��ʾ������
if not rs.eof then
rs.AbsolutePage=page
end if
if page>rs.pagecount then
	response.Write("<tr>")
	response.Write("<td colspan='6'>")
	response.write "<center>��ǰ��û��ס���ɷ�<center>"
	response.Write("</td>")
	response.Write("</tr>")
end if


for i=0 to rs.pagesize-1    '��ʾ���������������,i+(page*13-13)+1 ��������ҳ����ʾ����ı��
if rs.eof then exit for%>

<tr onmouseover=this.style.backgroundColor="#F2F2F2" onmouseout=this.style.backgroundColor=""  bgcolor="#FFFFFF">  
    <td><div align="center"><%=rs(0)%></div></td>
    <td>&nbsp;<a href="admin_datamoney.asp?action=edit&id=<%=rs(0)%>"><%=rs("ס������")%></a></td>
    <td><div align="center">
    <%=rs("�շ���Ա")%>    </div></td> 
    <td>
<div align="left"><%=rs("�ɷ��ܶ�")%></div></td>
    <td><%=rs("ˮ��")%></td>
    <td><%=rs("���")%></td>
    <td><%=rs("����")%></td>
    <td><%=rs("ͣ��")%></td>
    <td><%=rs("��̯����")%></td>
    <td><%=rs("ά��")%></td>
    <td><div align="center"><a href="admin_datamoney.asp?action=del&id=<%=rs(0)%>" onclick="{if(confirm('��ȷ��Ҫɾ����ס���ɷ���?')){return true;}return false;}">ɾ��</a></div></td>
  </tr>
  <%
  rs.movenext
	next%>
<tr>
  <td colspan="12" class="table"><div align="right">
 <% 
response.Write("��ҳ�� ")
if page>1 then response.write "[<A href='admin_datamoney.asp?action=admin&page=1&item="&items&"'>��ҳ</a>][<a href='admin_datamoney.asp?action=admin&page=" & page-1 & "&item="&items&"'>��ҳ</a>] ":else:response.write "[��ҳ][��ҳ] "
for i=1 to rs.pagecount
if i=page then response.write "<b><font color='#FF0000'>"& i & "</font></b> ":else:response.write "<A href='admin_datamoney.asp?action=admin&page=" & i & "&item="&items&"'>" & i & "</a> "
next
if page<rs.pagecount then response.write "[<a href='admin_datamoney.asp?action=admin&page=" & page+1 & "&item="&items&"'>��ҳ</a>][<a href='admin_datamoney.asp?action=admin&page=" & rs.pagecount & "&item="&items&"'>βҳ</a>]":else:response.write "[��ҳ][βҳ] "
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
set RS = Data.Execute("select * from datamoney where id = "& id&"")
Edit_News = rs("��ע")
%>


<table width="97%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableBorder">
<form action="admin_datamoney.asp?action=SaveEdit" method="post" id="form_edit" name="form_edit" onsubmit="javascript:submits();">
  <tr>
    <td colspan="2" class="title"><div align="center" class="title"> �޸�ס���ɷ���Ϣ</div></td>
  </tr>
  <tr>
    <td colspan="2" class="title2">&nbsp;�����޸�ס���ɷ���Ϣ����������ԭ��ס���ɷѡ�</td>
  </tr>
  <tr>
    <td width="18%" class="table">      ���ݱ��</td>
    <td colspan="2" class="table"><input name="StName" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("���ݱ��")%>"></td>
  </tr>
  <tr>
    <td width="18%" class="table"> ס������</td>
    <td colspan="2" class="table"><input name="StDepartment" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40" gf="0" value="<%=rs("ס������")%>"></td>
  </tr>
  <tr valign="top">
    <td class="table">�ɷ�����</td>
    <td colspan="2" class="table"><input name="StChairman" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("�ɷ�����")%>">
      <input name="id" type="hidden" class="lostfocus" id="id" onFocus='this.className="getfocus";this.gf="1"' onBlur='this.className="lostfocus";this.gf="0"' onMouseOver='this.className="getfocus"' onMouseOut='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=id%>"></td>
  </tr>
  <tr valign="top">
    <td class="table">�շ���Ա</td>
    <td colspan="2" valign="top" class="table"><input name="Stmanager" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"' size="40"gf="0" value="<%=rs("�շ���Ա")%>">  
	  </td>
  </tr>
    <tr>
      <td width="18%" class="table">�ɷѷ�ʽ</td>
    <td colspan="2" class="table"><input name="StPassword" type="text" class="lostfocus" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("�ɷѷ�ʽ")%>">
	</td>
  </tr>
        <tr>
      <td width="18%" class="table">�ɷ��ܶ� </td>
      <td colspan="2" class="table"><input name="Stcontect" type="text" class="lostfocus" id="Stcontect" onfocus='this.className="getfocus";this.gf="1"' onblur='this.className="lostfocus";this.gf="0"' onmouseover='this.className="getfocus"' onmouseout='if (this.gf=="0") this.className="lostfocus"'  size="40" gf="0" value="<%=rs("�ɷ��ܶ�")%>">
	  
	  </td>
  </tr>
  <tr valign="top">
    <td class="table"><p align="left">��ע</p></td>
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

