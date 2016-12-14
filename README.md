# C2Addon Utility [![NPM version][npm-image]][npm-url]
> A toolkit for .c2addon from Construct 2

## Installation

```sh
$ npm i -g c2addon-utility
$ npm i -S c2addon-utility
```

## Usage

The plugin can used from both node script or cli

```javascript
var c2addon = require('c2addon-utility');
c2addon.pack("source folder", "destination folder");
```

```sh
c2addon pack {source folder} [{destination folder}]

c2addon pack browser
```
*Create browser.c2addon at current directory*

```sh
c2addon pack browser somepath/Desktop
```
*Create somepath/Desktop/browser.c2addon*


### Available functions 
* [x] pack
* [ ] extract
* [ ] install

### Available types 
* [x] plugin
* [ ] behaviour
* [ ] effect

## License

MIT © [Armaldio](http://www.armaldio.xyz)


[npm-image]: https://badge.fury.io/js/c2addon-utility.svg
[npm-url]: https://npmjs.org/package/c2addon-utility