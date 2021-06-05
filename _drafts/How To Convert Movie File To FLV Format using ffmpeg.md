
**FFMpeg** is a very popular open-source project consisting of vast libraries for handling audio and video related things.
In this article, I will show you how to convert video to flv format using C#. The code is self-explanatory; Here I am using C# `Process` API for invoking the `FFmpeg` executable and passing the required arguments.




```csharp
public class FLVConvertor
{
	public void ConvertToFlv()
	{
		Process ffmpeg; // creating process
		string video;
		string mpg;
		video = Page.MapPath("FreeHugs.wmv"); // setting video input name with path
		mpg = Page.MapPath("") + "\\video.flv"; // thumb name with path !
		ffmpeg = new Process();
		ffmpeg.StartInfo.Arguments = " -i " + video + " -s 480*360 -deinterlace -ab 32 -r 15 -ar 22050 -ac 1 " + mpg; // arguments !
		ffmpeg.StartInfo.FileName = Page.MapPath("ffmpeg.exe");

		ffmpeg.Start(); // start !
		ffmpeg.WaitForExit();
		ffmpeg.Close();

	}
	public void ExtractImage()
	{
		Process ffmpeg; // creating process
		string video;
		string thumb;
		video = Page.MapPath("video.flv"); // setting video input name with path
		thumb = Page.MapPath("") + "\\frame.jpg"; // thumb name with path !
		ffmpeg = new Process();
		ffmpeg.StartInfo.Arguments = " -i \"" + video + "\" -s 108*180 -vframes 1 -f image2 -vcodec mjpeg \"" + thumb + "\""; // arguments !
		ffmpeg.StartInfo.FileName = Page.MapPath("ffmpeg.exe");
		ffmpeg.Start(); // start !

	}
}
```

## Furthre Reading
- [WikiPedia](https://en.wikipedia.org/wiki/FFmpeg)
- [Official Website]((https://www.ffmpeg.org/))
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEzMDg0NjkyMF19
-->