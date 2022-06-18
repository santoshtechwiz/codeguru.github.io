In this blog post I will show you how to show deterministics progress bar in Blazor Web Assembly. In order to achive the goal we dont need any third party library. C# already has one interface `IProgress` that expose one method `Report` that sends the data to the caller.

Let's see the following method. In this method I am making api calls to jsonplaceholder in a loop. I


```csharp
  private async Task GetPosts(IEnumerable<int> ids, IProgress<int> progress = null)
    {
        using var client = new HttpClient();
        var tasks = new List<Task<HttpResponseMessage>>();

        tasks = ids.Select(async x =>
        {

            var todoTask = await client.GetAsync("https://jsonplaceholder.typicode.com/todos/" + x);
            await Task.Delay(1000);
            if (progress == null) return todoTask;
            eventCount++;
            var percentage = (double)eventCount / tasks.Count();
            var p = percentage * 100;
            var pint = (int)Math.Round(p, 0);
            progress.Report(pint);

            return todoTask;
        }
        ).ToList();
        var allResult = await Task.WhenAll(tasks);
        foreach (var element in allResult)
        {
            var content = await element.Content.ReadAsStringAsync();
        }

    }
}

```

```csharp
@page "/progress"
@using System.Net.Http

<div class="progress">
    <div class="progress-bar bg-success"
         role="progressbar" style="width: @(progressValue)%" aria-valuenow="@progressValue" aria-valuemin="0" aria-valuemax="100"></div>
</div>

@code {

    int eventCount = 0;
    int progressValue = 0;

    protected override async Task OnInitializedAsync()
    {
        var progress = new Progress<int>(x =>
        {
            progressValue = x;

            StateHasChanged();

        });
        await GetPosts(new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 }, progress);

    }

    private async Task GetPosts(IEnumerable<int> ids, IProgress<int> progress = null)
    {
        using var client = new HttpClient();
        var tasks = new List<Task<HttpResponseMessage>>();

        tasks = ids.Select(async x =>
        {

            var todoTask = await client.GetAsync("https://jsonplaceholder.typicode.com/todos/" + x);
            await Task.Delay(1000);
            if (progress == null) return todoTask;
            eventCount++;
            var percentage = (double)eventCount / tasks.Count();
            var p = percentage * 100;
            var pint = (int)Math.Round(p, 0);
            progress.Report(pint);

            return todoTask;
        }
        ).ToList();
        var allResult = await Task.WhenAll(tasks);
        foreach (var element in allResult)
        {
            var content = await element.Content.ReadAsStringAsync();
        }

    }
}

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDUxOTk1NjI0LC01OTg4NzUwMzJdfQ==
-->