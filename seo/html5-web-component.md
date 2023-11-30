
In this blog post, I will show you what HTML web 5 components with real-world examples is. By the end of the blog post, you will learn the following things.

- What are HTML5 Web Components?
- What are the different events of the HTML5 web components
- And in the last, how to create reusable HTML5 web components

## What are HTML5 Web Components?

Web components are introduced HTML5 DOM specifications by W3C. Web components are a set of APIs that facilitate the creation of new custom, reusable HTML tags/elements that can be used in web pages and web apps with their functionality isolated from the rest of your application code.

When the HTML5 web component renders, it calls several callback events. You can define several different callbacks inside a custom element’s class definition, which fire at various points in the element’s lifecycle:

## `connectedCallback`:

When the custom element is appended to a document-connected element, this method is called. This will happen every time the node moves, and it may occur before the element’s contents have been fully parsed.

## `disconnectedCallback`:

Invoked each time the custom element is disconnected from the document’s DOM.

## `attributeChangedCallback`:

Invoked each time one of the custom element’s attributes is added, removed, or changed. Which attributes to notice the change for is specified in a static get  `observedAttributes`  method

In this article, I will show you how to create a reusable HTML5 countdown timer control.  **$ads={1}**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Static Template</title>

</head>

<body>

  <cool-timer>
    My title
  </cool-timer>
  <script>
    const template = document.createElement("template");
    template.innerHTML = `

    <style>
    .timer-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction:column;
    }
    .timer-box div>span{
      padding:20px;
      font-size:22px;
      font-weight:bold
    }

    </style>
    
    <div class="timer-box">
      <div>
        <slot/>
      </div>
      <div>
        <span id="timer-hours">0</span> :
        <span id="timer-minutes">0</span> :
        <span id="timer-seconds">0</span> 
      </div>
    </div>
 
`;
    class Timer extends HTMLElement {
      constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }

      connectedCallback() {
        this.timer = setInterval(() => {
          this.updateCountdownTimer();
        }, 1000);
      }
      updateCountdownTimer() {

        let now = new Date().getTime();
        let timeleft = countDownDate - now;
        const timerDisplaySeconds = this.shadowRoot.getElementById("timer-seconds");
        const timerDisplayMinutes = this.shadowRoot.getElementById("timer-minutes");
        const timerDisplayHour = this.shadowRoot.getElementById("timer-hours");

        let hours = Math.floor(
          (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        console.log(minutes);
        timerDisplaySeconds.innerHTML = seconds;
        timerDisplayMinutes.innerHTML = minutes;
        timerDisplayHour.innerHTML = hours;
        if (timeleft < 0) {
          clearInterval(this.timer);
          console.log("Countdown ENd");
        }
      }

    }

    let targetDate = new Date();
    let countDownDate = targetDate.setDate(targetDate.getDate() + 1);
    customElements.define("cool-timer", Timer);

  </script>
</body>

</html>
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ2MzU4Nzk5Miw3MzE4OTcyNjZdfQ==
-->