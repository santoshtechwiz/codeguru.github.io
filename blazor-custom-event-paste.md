---


---

<p>The following steps are generally required to enable custom events with custom event arguments.</p>
<ol>
<li>Define a function in JavaScript that will be responsible for constructing the custom event argument object from the source event and  Register the custom event with the preceding handler in  <code>wwwroot/index.html</code>  (Blazor WebAssembly) or  <code>Pages/_Layout.cshtml</code>  (Blazor Server) immediately after the Blazor  <code>&lt;script&gt;</code></li>
</ol>
<pre class=" language-js"><code class="prism  language-js">Blazor<span class="token punctuation">.</span><span class="token function">registerCustomEventType</span><span class="token punctuation">(</span><span class="token string">'dotnetguruevent'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  browserEventName<span class="token punctuation">:</span> <span class="token string">'paste'</span><span class="token punctuation">,</span>
  createEventArgs<span class="token punctuation">:</span> event <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> isMedia <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> data <span class="token operator">=</span> event<span class="token punctuation">.</span>clipboardData<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">'Text'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> items <span class="token operator">=</span> event<span class="token punctuation">.</span>clipboardData<span class="token punctuation">.</span>items<span class="token punctuation">;</span>
    <span class="token keyword">const</span> acceptedMim <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'iamge/png'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> file <span class="token operator">=</span> items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getAsFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>acceptedMim<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>

      <span class="token punctuation">}</span>
      isMedia <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> url <span class="token operator">=</span> window<span class="token punctuation">.</span>URL<span class="token punctuation">;</span>
      data <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        isMedia<span class="token punctuation">,</span>
        data
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<blockquote>
<p>The call to registerCustomEventType`  is performed in a script only once per event.</p>
</blockquote>
<ol start="2">
<li>Define a class for the event arguments:</li>
</ol>
<pre class=" language-csharp"><code class="prism  language-csharp">	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DotNetGuruEventArgs</span> <span class="token punctuation">:</span> EventArgs
		<span class="token punctuation">{</span>
		    <span class="token keyword">public</span> <span class="token keyword">bool</span> IsMedia <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
		    <span class="token keyword">public</span> <span class="token keyword">string</span> Data <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
</code></pre>
<ol start="3">
<li>Wire up the custom event with the event arguments by adding an EventHandlerAttribute attribute annotation for the custom event. The class doesn’t require members:</li>
</ol>
<pre class=" language-csharp"><code class="prism  language-csharp"><span class="token punctuation">[</span><span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token string">"ondotnetguruevent"</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>DotNetGuruEventArgs<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">true</span><span class="token punctuation">,</span> <span class="token keyword">true</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
		<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">EventHandlers</span>
		<span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
</code></pre>
<ol start="5">
<li>Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:</li>
</ol>
<pre class=" language-csharp"><code class="prism  language-csharp"><span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>
    Try pasting <span class="token keyword">into</span> the following text box<span class="token punctuation">:</span>
    <span class="token operator">&lt;</span>textarea @oncustompaste<span class="token operator">=</span><span class="token string">"HandleCustomPaste"</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
    @<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token keyword">var</span> image <span class="token keyword">in</span> images<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token string">"@image"</span><span class="token operator">&gt;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>

@code <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">string</span><span class="token operator">?</span> message<span class="token punctuation">;</span>
    <span class="token keyword">private</span> List<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">&gt;</span> images<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">List</span><span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">HandleCustomPaste</span><span class="token punctuation">(</span>CustomPasteEventArgs eventArgs<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>eventArgs<span class="token punctuation">.</span>IsMedia<span class="token punctuation">)</span><span class="token punctuation">{</span>
          images<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>eventArgs<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Whenever the custom event is fired on the DOM, the event handler is called with the data passed from the JavaScript.</p>
<h2 id="live-demo">Live Demo</h2>
<iframe width="100%" height="500px" src="https://blazorrepl.telerik.com/repl/embed/GmEUlsOi09g7ff4h31?editor=true&amp;result=true&amp;errorList=false"></iframe>

