using System.Net;
using System.Text;
using System.Text.Json;

namespace ImageWorker.Server
{
    public class HttpFV
    {
        internal static string Url { get; set; } = string.Empty;
        internal static string? Base64Data { get; set; }
        public HttpFV(string url, string base64Data)
        {
            Url = url;
            Base64Data = base64Data;
            //HttpClient HttpClient = new HttpClient()
            //{
            //    BaseAddress = new Uri(url)
            //};
        }
        //private static HttpClient httpClient = new()
        //{
        //    BaseAddress = new Uri(Url),
        //};
        public async Task<List<string>> PostAsync(HttpClient httpClient)
        {
            List<string> data = new List<string>();
            using HttpResponseMessage response = await httpClient.PostAsync(new Uri(Url),
                new StringContent(Base64Data, Encoding.UTF8, "text/plain"));

            //response.EnsureSuccessStatusCode().
            //    .WriteRequestToConsole();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");
            data.Add(jsonResponse);
            data.Add(response.StatusCode.ToString());
            return data;

            // Expected output:
            //   POST https://jsonplaceholder.typicode.com/todos HTTP/1.1
            //   {
            //     "userId": 77,
            //     "id": 201,
            //     "title": "write code sample",
            //     "completed": false
            //   }
        }
    }
    public class ImageWorker
    {
        //// Надо посылать с клиента 
        //private static string ImageToBase64String(string imageFilePath)
        //{
        //    return Convert.ToBase64String(File.ReadAllBytes(imageFilePath));
        //}
    }
    public class StringConverter
    {
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
public class Httpbin
{
    
    //static async Task GetAsync(HttpClient httpClient)
    //{
    //    using HttpResponseMessage response = await httpClient.GetAsync("todos/3");

    //    response.EnsureSuccessStatusCode()
    //        .WriteRequestToConsole();

    //    var jsonResponse = await response.Content.ReadAsStringAsync();
    //    Console.WriteLine($"{jsonResponse}\n");

    //    // Expected output:
    //    //   GET https://jsonplaceholder.typicode.com/todos/3 HTTP/1.1
    //    //   {
    //    //     "userId": 1,
    //    //     "id": 3,
    //    //     "title": "fugiat veniam minus",
    //    //     "completed": false
    //    //   }
    //}

    //static async Task PostAsync(HttpClient httpClient)
    //{
    //    using StringContent jsonContent = new(
    //        JsonSerializer.Serialize(new
    //        {
    //            userId = 77,
    //            id = 1,
    //            title = "write code sample",
    //            completed = false
    //        }),
    //        Encoding.UTF8,
    //        "application/json");

    //    using HttpResponseMessage response = await httpClient.PostAsync(
    //        "todos",
    //        jsonContent);

    //    //response.EnsureSuccessStatusCode().
    //    //    .WriteRequestToConsole();

    //    var jsonResponse = await response.Content.ReadAsStringAsync();
    //    Console.WriteLine($"{jsonResponse}\n");

    //    // Expected output:
    //    //   POST https://jsonplaceholder.typicode.com/todos HTTP/1.1
    //    //   {
    //    //     "userId": 77,
    //    //     "id": 201,
    //    //     "title": "write code sample",
    //    //     "completed": false
    //    //   }
    //}

    //static async Task PostAsJsonAsync(HttpClient httpClient)
    //{
    //    using HttpResponseMessage response = await httpClient.PostAsJsonAsync(
    //        "todos",
    //        new Todo(UserId: 9, Id: 99, Title: "Show extensions", Completed: false));

    //    response.EnsureSuccessStatusCode()
    //        .WriteRequestToConsole();

    //    var todo = await response.Content.ReadFromJsonAsync<Todo>();
    //    Console.WriteLine($"{todo}\n");

    //    // Expected output:
    //    //   POST https://jsonplaceholder.typicode.com/todos HTTP/1.1
    //    //   Todo { UserId = 9, Id = 201, Title = Show extensions, Completed = False }
    //}

    //static async Task HeadAsync(HttpClient httpClient)
    //{
    //    using HttpRequestMessage request = new(
    //        HttpMethod.Head,
    //        "https://www.example.com");

    //    using HttpResponseMessage response = await httpClient.SendAsync(request);

    //    response.EnsureSuccessStatusCode()
    //        .WriteRequestToConsole();

    //    foreach (var header in response.Headers)
    //    {
    //        Console.WriteLine($"{header.Key}: {string.Join(", ", header.Value)}");
    //    }
    //    Console.WriteLine();

    //    // Expected output:
    //    //   HEAD https://www.example.com/ HTTP/1.1
    //    //   Accept-Ranges: bytes
    //    //   Age: 550374
    //    //   Cache-Control: max-age=604800
    //    //   Date: Wed, 10 Aug 2022 17:24:55 GMT
    //    //   ETag: "3147526947"
    //    //   Server: ECS, (cha / 80E2)
    //    //   X-Cache: HIT
    //}

    //static async Task OptionsAsync(HttpClient httpClient)
    //{
    //    using HttpRequestMessage request = new(
    //        HttpMethod.Options,
    //        "https://www.example.com");

    //    using HttpResponseMessage response = await httpClient.SendAsync(request);

    //    response.EnsureSuccessStatusCode()
    //        .WriteRequestToConsole();

    //    foreach (var header in response.Content.Headers)
    //    {
    //        Console.WriteLine($"{header.Key}: {string.Join(", ", header.Value)}");
    //    }
    //    Console.WriteLine();

    //    // Expected output
    //    //   OPTIONS https://www.example.com/ HTTP/1.1
    //    //   Allow: OPTIONS, GET, HEAD, POST
    //    //   Content-Type: text/html; charset=utf-8
    //    //   Expires: Wed, 17 Aug 2022 17:28:42 GMT
    //    //   Content-Length: 0
    //}

    //static class HttpResponseMessageExtensions
    //{
    //    internal static void WriteRequestToConsole(this HttpResponseMessage response)
    //    {
    //        if (response is null)
    //        {
    //            return;
    //        }

    //        var request = response.RequestMessage;
    //        Console.Write($"{request?.Method} ");
    //        Console.Write($"{request?.RequestUri} ");
    //        Console.WriteLine($"HTTP/{request?.Version}");
    //    }
    //}
}
