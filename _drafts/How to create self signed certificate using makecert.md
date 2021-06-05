
In this post, I will show you how to create a self signed certificate for the WCF application. For this, I will use the utility makecert.MakeCert.exe allows you to (for test/dev purposes) generate both a trusted root certificate and a certificate signed by that trusted root certificate for encryption purposes (also for signature purposes.

### Open visual studio command prompt (Admin mode) and type following command

```bash
    C:\cert>makecert -pe -n "CN=RootCA" -ss My -sr LocalMachine -a sha1 -sky signatu re -r "RootCA.cer"

```

-   **-pe**  Marks the generated private key as exportable. This allows the private key to be included in the certificate.
-   -**n**  Specifies the subject’s certificate name. This name must conform to the X.500 standard. The simplest method is to specify the name in double quotes, preceded by
-   **CN=**  for example, “CN=_myName_”.
-   **-ss**  Specifies the subject’s certificate store name that stores the output certificate.
-   sr localmachine.
-   **-a**  Specifies the signature algorithm. Must be either
-   **-sky**  Specifies the subject’s key type, which must be  
    **signature**,  **exchange**, or an integer that represents a provider type. By default, you can pass 1 for an exchange key and 2 for a signature key.
-   **-r**  Creates a self-signed certificate.

> Above command will create a certificate named RootCA.cer in the cert directory ,and also placed this certificate into Person folder

### After executing the above command do the following steps

-   Start/Run/MMC
-   File/Add-Remove Snap-In
-   Click Add
-   Select Certificates and click Add
-   Select Computer Account and hit Next
-   Select Local Computer
-   Click Close
-   Click OK

> Go back to the certificates snap-in, right-click the “RootCA” certificate and copy it to the “Trusted Root Certification Authorities” node. Once done, if you expand this node, and then select certificates your newly created root cert should be present.**

### Now, It’s time to create the server certificate.Type the following command and press enter.

```bash
    C:\cert>makecert -pe -n "CN=santosh-pc" -ss My -sr LocalMachine -sky exchange -a sha1 -in "RootCA" -is My -ir LocalMachine -sy 12 santosh-pc.cer
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIxMTk1MTc2MSw2NDMyOTM5NDBdfQ==
-->