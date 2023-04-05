---
title: Cards mouse hover effect with CSS + JS
image: /posts/cards.webp
date: 22-02-23
---

In this blog post we will recreate windows 10 start menu's button hover effects,

you can try the final result on [codepen](https://codepen.io/yxshv/pen/JjaRZmb)

# 1. Create a card with basic stylings.

First of all you need a basic card with some stylings - 

```html:index.html
<div class="card">
  <h1>Hi dev.to!</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut</p>
</div>
```

```css:styles.css
.card {
  border-radius: 10px;
  padding: 20px;
  width: 210px;
  height: 150px;
  background: rgb(26,26,26);
}
```

and I am also gonna add some styling to `<body>` to position the card in the center, add a better font and change background & text color - 

```css:styles.css
body {
  margin: 0;
  background: black;
  font-family: Verdana, sans-serif;
  color: white;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 100vh;
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
}
```

Now the page should like this - 

![basic card style](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_ImYQSsqVk6.png)

# 2. Creating a border

Now we need to create a border which will glow when the mouse comes near it.

But we cant just use css `border` property for this. Imagine if that property didn't existed? How would you make a border then.

> You would add the element inside a `<div>` with a `background`.

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_QoKPGGYMJK.png)

so we will rename the `.card` class to `.inner` and create a new class `.card` - 

```css:styles.css
.card {
  background: red; /* border color */
  padding : 3px; /* border width */
  border-radius: 12px;
}
```

and wrap it around the card - 
```html:index.html
<div class="card">
  <div class="inner">
    <h1>Hi dev.to!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut</p>
  </div>
</div>
```

And now you have a border - 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4hzodu0zj2fj3h558yvt.png)


we are going to keep the border color `red` for now.

# 3. Adding Light & Glow Effect

Now we we will create a new element and give it a class `.blob` - 

```html:index.html
<div class="card">
  <div class="inner">
    <h1>Hi dev.to!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut</p>
  </div>
  <div class="blob"></div>
</div>
```

and the element will be positioned `absolute` - 

```css:styles.css
.blob {
  filter: blur(40px);
  position: absolute;
  z-index: -1; /* to keep it at below everything else */
  top: 0; /* to align it at top */
  left: 0; /* to align it at left */
  width: 250px;
  height: 250px;
  border-radius: 50%; /* to make it circular */
  background: rgb(255, 255, 255, 0.5);
}
```

Now the blob should appear on top-left of the window -

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_G5bQpC2kij.png)

but we wanted it to be on the top-left of the card.

The reason it went on the top-left of the window is because the absolute positioned element needs a non-static position element to position themselves along.

Since it didn't find any non-static elements it position itself along the `<body>`.

so to fix it add a `position: relative;` to the `.card` class - 
```css:styles.css
.card {
  background: red;
  padding : 3px;
  border-radius: 12px;
  position: relative;
}
```

Now it should position itself along the `.card`.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ba3dgay4d3c8akj5gzv9.png)

But now the the glow is escaping out of the card, which we don't want.

You might think, we also want other cards near it to glow. But we only want the border of surroundings to glow, and now the card is just spreading the light everywhere. Instead every card will have their own light which will go towards the mouse and glow their borders.

So, we will add `overflow: hidden;` to `.card` class to stop it from spreading out, and we will also change the border color to
`background: rgb(128 128 128 / 0.2);`, so that we can actually see the glow

```css:styles.css
.card {
  background: rgb(128 128 128 / 0.2);
  padding : 3px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
```

Now you should be able to see the glow - 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i3b07b810u789gzoddrq.png)

# 4. Making the blob follow the mouse.

Now we will start writing some javascript!

first of all you need another element with a class `.fakeblob` - 

```html:index.html
<div class="card">
  <div class="inner">
    <h1>Hi dev.to!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut</p>
  </div>
  <div class="blob"></div>
  <div class="fakeblob"></div>
</div>
```
```css:styles.css
.fakeblob {
  display: hidden;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
```

we just need this because we need the original position of the blob, and thats why its `display: hidden;`

But why can't we save the original in a JS variable, and use it later on? We can't because the blob's original position might change like on scroll and zoom in/out, so we used a fakeblob.

## Now the Javascript part!

First of all we will fetch all our card elements and save it in a variable -

```js:inde.
const allCards = document.querySelectorAll(".card");
```

Then we will add add an eventListener, which will listen to mouse movement, inside it we will loop through all of the cards and fetch its `.blob` and `.fakeblob` childrens - 

```js:inde.
window.addEventListener("mousemove", (ev) => {
  
  allCards.forEach((e) => {
    const blob = e.querySelector(".blob");
    const fblob = e.querySelector(".fakeblob");
  });
});
```

then we will [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the `fakeblob` which will return an object providing information about the size of an element and its position relative to the viewport - 

```js:inde.
allCards.forEach((e) => {
  const blob = e.querySelector(".blob");
  const fblob = e.querySelector(".fakeblob");
  
  const rec = fblob.getBoundingClientRect();
});
```

now we will animate the `blob` using the [web animation api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) - 

```js:inde.
blob.animate(
  [{
      transform: `translate(${ev.clientX - rec.left - (rec.width / 2)}px,${ev.clientY - rec.top - (rec.height / 2)}px)`,
  }],
  {
    duration: 300,
    fill: "forwards",
  }
);
```



here we are animating it for the duration - `300ms` and fill - `forwards` means that the element will keep the styles of the last keyframe.

and in the animation we are translating it by the difference between mouse position and fake blob position.

And we also subtracting it by half of its height in y axis and half of width in x axis. The reason for this is to make the blob move to the center of the mouse.

without it the blob would move like this - 

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_5Rt6059vCs.gif)

and with it it would move like this -

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_PxLLcvAYLm.gif)

Now try moving your mouse near the card -

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_BUsyUKgTnl.gif)

add few more cards and see the magic!

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_glAVrlRmm1.gif)

# 5. Additional effects

Now when you hover the cards it does nothing & its kinda boring so lets add a glow effect following the mouse -

first we will add a `transition` property to smoothly transition into the `:hover` state

```css:styles.css
.inner {
  /* ... */
  transition: background 300ms ease-in-out;
}
```

and on `.card:hover` we will change the background opacity and add a backdrop blur - 

```css:styles.css
.card:hover > .inner {
  background: rgb(26, 26, 26, 0.6);
  backdrop-filter: blur(80px);
}
```

and now - 

![](https://us-east-1.tixte.net/uploads/kekda.wants.solutions/chrome_Qoq1qLvRqt.gif)


And there you have it!

Thanks for reading the blog! I hope it helped you :)