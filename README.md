Letlog
=================
Tutorial/Walkthrough -> [https://youtu.be/t4JoeftH2Vk](https://youtu.be/t4JoeftH2Vk)

Letlog is a flexible logging module that lets you simply log the variable itself while the module attaches a label of the variable name passed in to the console allowing for fast logging and identifying of variables in console output.
<br><br>
Letlog is also configurable, allowing you to change label size, color and formatting, making it easier to identify variables in messy console output.
<br><br>
Basic example:
```js
const letlog = require('letlog').log;
const promote = "Check out my gaming channel https://www.youtube.com/channel/UCINwvRizJqUV34O8RFz6b8g"
letlog(promote); //No need to write that tedious label in console.log to identify some output

/*
Console output:

promote: Check out my gaming channel https://www.youtube.com/channel/UCINwvRizJqUV34O8RFz6b8g

*/
```



Installation
------------

npm i letlog --save



Usage
-----

Letlog is a module that helps cut down on tedious console.log labeling when printing out simply variables. With this module you will be able to simply log the variable itself while the module attaches a label of the variable name for you.

Configuration
-------------
This module is configurable with different options to make it customizable to your needs or preferences. See below for details on each option.

Below are the default configuration options:
```js
const default_options = {
    separator: ":",
    case: "none",
    function: "letlog",
    color: "white",
    bgColor: "bgBlack",
    style: "reset"
}
```


"separator" -> This is used to separate the label from the variable output. For example, using default options, the output of console.log(myVar) would be 'myVar: some data that was stored in myVar'.

"case" -> This option is defaulted to none but also accepts the values of 'upper' and 'lower'. This changes the letter case of the variable label that is outputted. For example, if this option was set to 'upper' then console.log(myVar) would output 'MYVAR: some data'.

"function" -> This option should be configured to be the name of the function you are using to log variables. For example, const letlog = require('letlog').log; letlog(myVar). But if you were to change from the default to something like 'const log = require('letlog').log; log(myVar)' then function should be configured to 'log';

"color" -> This will change the text color of the label. The color options are as follows:
- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- grey
- rainbow
- zebra
- america
- trap
- random

"bgColor" -> This will change the background color of the label. The background color options are as follows:
- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite

"style" -> This will change the style of the label text. The style options are as follows:
- reset
- bold
- dim
- italic
- underline
- inverse
- hidden
- strikethrough


Example #1 Custom Configuration Usage:
```js
const custom_options = {
    separator: "->",
    case: "upper",
    style: "italic"
} // options that are not set will be set to the defaults

const letlog = require('letlog').log;
require('letlog').options(custom_options);

const price = 9.34;

letlog(price)
```

Example #2 Custom Configuration Usage:
```js
const custom_options = {
    bgColor: "bgBlue",
    function: "logger.log"
} // options that are not set will be set to the defaults

const logger = require('letlog')
logger.options(custom_options);

const price = 9.34;

logger.log(price)
```


 Functions
 -------

These are the currently available functions listed below and examples on how to use them.


 - <h3> log(data) </h3>

 	-> logs variable data with a label attached of the variable name passed into the function

  Example:
  ```js
  const letlog = require('letlog').log;
  const myVar = "I'm really hungry as I am writing this readme"
  letlog(myVar);

  /*
  Output:

  myVar: I'm really hungry as I am writing this readme

  */
  ```

<br><br>


  - <h3> options(custom_options) </h3>

   -> Globally sets options for the module

   Example:
   ```js
   const custom_options = {
     case: :"upper",
     separator: "---"
   }

   const letlog = require('letlog').log;
   require('letlog').options(custom_options);

   const price = 3.2342
   letlog(price)

   /*
   Output:

   PRICE --- 3.2342

   */
   ```

   Bugs
  ------

  Please let me know if you run into any bugs and I will try to fix them as soon as possible. This module is still new and was made in a hacky way so bugs may exist.


 How does this work?
 ------

 I rather not say. This was made in a very hacky way but the best way I could find at the time. If you are really interested about the inter-workings of this module, feel free to take a look at the [Github](https://github.com/ndangles/letlog) for a good laugh.

 My research on accessing the name of the variable being passed to a function left me with limited results based on javascript's limitations. Accessing that information from a single file is quite simple. Throw the same functionality into a module trying to account for many different use cases and scenarios and it gets very tricky and that information can't be accessed as easily.

 If you feel there is a better way to write this or you have any suggestions please let me know.


 Future
 ------

Plan is to add features as I need them or see a use case for but also if there are people using this module besides me I will add features or changes upon requests.

Support
------

If for some reason you are looking to support this project, I'd appreciate any follows/subscriptions to any of the follow social media:

- [Gaming Youtube](https://www.youtube.com/channel/UCINwvRizJqUV34O8RFz6b8g)
- [Tech Youtube](https://www.youtube.com/channel/UCWiek_kV6cTlbU2Frq-KzPA)
- [Twitch](https://twitch.tv/ThaDangler)
- [Twitter](https://twitter.com/Tha_Dangler)
