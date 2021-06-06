
Your application needs to know if a drive (HDD, CD drive, DVD drive, etc.) is available and ready to be written to and/or read from. Additionally, it would be nice to know if you have enough available free space on the drive to write information to.

Use the various properties in the  DriveInfo  class as shown here:

```csharp
 public static void DisplayAllDriveInfo()
{
   foreach (DriveInfo drive in DriveInfo.GetDrives())
   {
       if (drive.IsReady)
       {
           Console.WriteLine("Drive " + drive.Name + " is ready.");
           Console.WriteLine("AvailableFreeSpace: " + drive.AvailableFreeSpace);
           Console.WriteLine("DriveFormat: " + drive.DriveFormat);
           Console.WriteLine("DriveType: " + drive.DriveType);
           Console.WriteLine("Name: " + drive.Name);
           Console.WriteLine("RootDirectory.FullName: " +
               drive.RootDirectory.FullName);
           Console.WriteLine("TotalFreeSpace: " + drive.TotalFreeSpace);
           Console.WriteLine("TotalSize: " + drive.TotalSize);
           Console.WriteLine("VolumeLabel: " + drive.VolumeLabel);
   }
   else
   {
           Console.WriteLine("Drive " + drive.Name + " is not ready.");
   }
}
}
```

Of particular interest are the IsReady and AvailableFreeSpace properties. The IsReady property determines if the drive is ready to be queried, written to, or read from. The AvailableFreeSpace property returns the free space on that drive in bytes.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA4Mzc4ODc2OCwtMTU2NTcxMzk4MywtMj
A2NjY1NTQ3NSwtOTM4NTE2MjM4LC0zMzI0NTUzNjNdfQ==
-->