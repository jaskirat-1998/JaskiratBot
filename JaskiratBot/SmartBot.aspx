<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SmartBot.aspx.cs" Inherits="JaskiratBot.SmartBot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-3.6.0.min.js"></script>
    <link href="css/dashboard.css" rel="stylesheet" />
    <link href="css/ChatBot.css" rel="stylesheet" />
</head>
<body style="background-color:darkslategrey">
    <form id="form1" runat="server">
        <div>
            <div style="text-align:center; color:gray">
                <h1 style="color:white"><label style="color:gray">I am</label> JaskiratBot</h1>
                <h2>I can answer questions about Jaskirat's career and education</h2>
                <h3>I am still learning, so I am not always correct, but atleast I respond fast 😄</h3>
                <label style="display:none"></label>
            </div>
            <div class='bodybox' style="margin-top:6rem">
              <div class='chatborder'>
                <p id="chatlog7" class="chatlog">&nbsp;</p>
                <p id="chatlog6" class="chatlog">&nbsp;</p>
                <p id="chatlog5" class="chatlog">&nbsp;</p>
                <p id="chatlog4" class="chatlog">&nbsp;</p>
                <p id="chatlog3" class="chatlog">&nbsp;</p>
                <p id="chatlog2" class="chatlog">&nbsp;</p>
                <p id="chatlog1" class="chatlog">&nbsp;</p>
                <div style="display:flex">
                    <input type="text" runat="server" name="chat" id="chatbox" placeholder="Hi there! Type your question here." onfocus="placeHolder()"/>
                    <input onclick="workflow();" value="Submit" style="margin-left:5px; background-color:darkslategrey; color:white" type="button"/>
                </div>
              </div>
            </div>
        </div>
    </form>
    <script src="js/Bot.js"></script>
</body>
</html>
