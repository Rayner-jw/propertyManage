<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
Set UlI=Server.CreateObject("SoftArtisans.FileUp")
FSPath=GetFilePath(Server.mappath("upfile.asp"),"\")'ȡ�õ�ǰ�ļ��ڷ�����·��
FSPath=FSPath&UpFlo
path = FSPath
UlI.SaveAs path&GetNewFileName()&"."&File(Item)

Public Function GetNewFileName()
	dim ranNum
	dim dtNow
	dtNow=Now()
	ranNum=int(90000*rnd)+10000
	'���������webboy�ṩ
	GetNewFileName=year(dtNow) & right("0" & month(dtNow),2) & right("0" & day(dtNow),2) & right("0" & hour(dtNow),2) & right("0" & minute(dtNow),2) & right("0" & second(dtNow),2) & ranNum
End Function

%>
