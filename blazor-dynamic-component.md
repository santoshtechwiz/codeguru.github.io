---


---

<p>In this blog post, I will show you how to load the blazor component dynamically.<br>
Assume you have two components, <code>ComOne</code> and <code>ComTwo</code> in the component folders</p>
<p><img src="https://blogger.googleusercontent.com/img/a/AVvXsEjw_ZRoKUFt974keXx79VTid71cicO1RYw-crUpeg-CKjs7HLqRWxVF7ZOXseUpuiUcteNW4RoJ0yp-8HHj4WOIWZEb4YHAIPrjxpNgqofzOlOXX59NRT-Wkx6S_SuPc3x2GJalT1Rg4CNWg9fKPfPMT-cvNp0BYCAiRMmx7XxzdfzCAV7QRhKHFz1uag=w640-h314" alt=""></p>
<blockquote>
<p>Components/ComOne.razor</p>
</blockquote>
<pre class=" language-csharp"><code class="prism  language-csharp"><span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>Com1<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>@count<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button @onclick<span class="token operator">=</span><span class="token string">"Increment"</span><span class="token operator">&gt;</span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
@code<span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">Increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token function">StateHasChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<blockquote>
<p>Components/ComTwo.razor</p>
</blockquote>
<pre class=" language-csharp"><code class="prism  language-csharp"><span class="token operator">&lt;</span>h1 style<span class="token operator">=</span><span class="token string">"color:red;"</span><span class="token operator">&gt;</span>ComTwo<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
</code></pre>
<blockquote>
<p>DynamicComponent.razor</p>
</blockquote>
<pre class=" language-csharp"><code class="prism  language-csharp">@page <span class="token string">"/dynamic"</span>
@<span class="token keyword">using</span> DotNetGuru<span class="token punctuation">.</span>Pages<span class="token punctuation">.</span>Components
@<span class="token keyword">using</span> System<span class="token punctuation">.</span>Reflection

<span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>DotNet Guru<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token keyword">select</span> @onchange<span class="token operator">=</span><span class="token string">"LoadComponent"</span><span class="token operator">&gt;</span>
    

    @<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token keyword">var</span> c <span class="token keyword">in</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">"Select Component"</span><span class="token punctuation">,</span> <span class="token string">"ComOne"</span><span class="token punctuation">,</span> <span class="token string">"ComTwo"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token operator">&lt;</span>option<span class="token operator">&gt;</span>@c<span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">&gt;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span><span class="token keyword">select</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h6<span class="token operator">&gt;</span>Component Will Be Loaded Here<span class="token operator">&lt;</span><span class="token operator">/</span>h6<span class="token operator">&gt;</span>
@RenderFragment

@code <span class="token punctuation">{</span>
    <span class="token keyword">private</span> RenderFragment RenderFragment<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">readonly</span> List<span class="token operator">&lt;</span>ComponentBase<span class="token operator">&gt;</span> componentList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">List</span><span class="token operator">&lt;</span>ComponentBase<span class="token operator">&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">ComOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ComTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>


    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">void</span> <span class="token function">OnInitialized</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">LoadComponent</span><span class="token punctuation">(</span>ChangeEventArgs e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
       
        RenderFragment <span class="token operator">=</span> builder <span class="token operator">=</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">var</span> currentComponent <span class="token operator">=</span> <span class="token function">FilterByType</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>ComponentBase<span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentComponent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                builder<span class="token punctuation">.</span><span class="token function">OpenComponent</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> currentComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
                builder<span class="token punctuation">.</span><span class="token function">CloseComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token function">StateHasChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> Type <span class="token function">FilterByType</span><span class="token punctuation">(</span>Type BaseType<span class="token punctuation">,</span><span class="token keyword">string</span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

        <span class="token keyword">return</span> Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">FirstOrDefault</span><span class="token punctuation">(</span>t <span class="token operator">=</span><span class="token operator">&gt;</span> BaseType<span class="token punctuation">.</span><span class="token function">IsAssignableFrom</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> t<span class="token punctuation">.</span>Name <span class="token operator">==</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre>
<p>Let’s understand the above code; most of the code is boilerplate. The only method related to the dynamic loading of components is <code>LoadComponent</code>. Blazor provides a powerful API <code>RenderFragment</code> delegate that reacts to DOM events and builds the dom tree. In the following code, I am finding the component from the assembly, and then I am adding the component in RenderTree dynamically based on the type selected from the DropDown list</p>
<pre class=" language-csharp"><code class="prism  language-csharp"> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">LoadComponent</span><span class="token punctuation">(</span>ChangeEventArgs e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
       
        RenderFragment <span class="token operator">=</span> builder <span class="token operator">=</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">var</span> currentComponent <span class="token operator">=</span> <span class="token function">FilterByType</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>ComponentBase<span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentComponent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                builder<span class="token punctuation">.</span><span class="token function">OpenComponent</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> currentComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
                builder<span class="token punctuation">.</span><span class="token function">CloseComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token function">StateHasChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre>

