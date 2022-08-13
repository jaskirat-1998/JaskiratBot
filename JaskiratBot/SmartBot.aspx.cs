using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Services;
using Newtonsoft.Json;
using System.Configuration;
using Microsoft.Azure.Cosmos;

namespace JaskiratBot
{
    public partial class SmartBot : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
               
        }

        [WebMethod]
        public static string Get_resp(string question)
        {
            
            //System.Diagnostics.Trace.TraceWarning(question);
            var obj = new squad_class()
            {
                question = question
                //context = context
            };
            var cities = gen_fun_2(obj, ConfigurationManager.AppSettings["ApiUrl"]);
          
            var city_record = JsonConvert.SerializeObject(cities);
            File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory+@"text\Queries.txt", "\n"+DateTime.Now.ToShortDateString()+"\nquery:" + question +"\nanswer:"+ JsonConvert.DeserializeObject(city_record)["answer"]);
            return city_record;

        }


        public static dynamic gen_fun_2(squad_class obj, string url)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //var myContent = JsonConvert.SerializeObject(obj);
                //var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
                //var byteContent = new ByteArrayContent(buffer);
                //byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                string queryjson = JsonConvert.SerializeObject(obj);

                StringContent _stringContent = new StringContent(queryjson, System.Text.Encoding.UTF8, "application/json");
                // New code:
                HttpResponseMessage response = client.PostAsync("", _stringContent).Result;

                if (response.IsSuccessStatusCode)
                {
                    response.EnsureSuccessStatusCode();
                    string responseUri = response.RequestMessage.RequestUri.ToString();
                    var objresponce = response.Content.ReadAsStringAsync().Result;
                    dynamic json = JsonConvert.DeserializeObject(objresponce);

                    return json;
                }
                else
                {
                    Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                }
                return null;

            }
       
        }


        protected void Submit(string str)
        {
            //string file = Server.MapPath("text\\Queries.txt");
            //string text = chatbox.Value.ToString()+"/n";
            //File.AppendAllText(file, text);
         
        }


        public class squad_class
        {
            public string question { get; set; }
            public string message { get; set; }
            public string context { get; set; }
        }


    }
}