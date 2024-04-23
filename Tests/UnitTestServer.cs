namespace ImageWorker.Server
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestHttpFV()
        {
            HttpClient httpClient = new HttpClient();
            HttpFV httpFV = new HttpFV("https://httpbin.org/post", StringConverter.Base64Encode(""));
            Task<List<string>> t = httpFV.PostAsync(httpClient);
            Assert.Pass(t.Result[0] + "\r\nStatus code: " + t.Result[1]);
        }
    }
    
}