# IP-Range-Scanner
This tools helps you to scan different IP Ranges for websites.
Based on given IP ranges, app will take screenshot of every single IP in the given IP range.
## Example
You can see an example run based on IP range `185.147.178.xxx` in `/examples/` folder.
## Setting Up
Setting up this project is fairly simple.
### Requirements
- Internet connection
- Git
- Node.js
- Basic knowledge of JSON
- Some data to work with (Optional)
### Installing
First of all, clone this repo:
`git clone https://github.com/mohsenemx/IP-Range-Scanner.git`

Change your directory to target folder:
`cd IP-Range-Scanner`

Install all of node's dependencies:
`npm install`

Edit the ranges.json (Only edit this if you have data)

Run the app:
`node .`

Now just wait until app finishes capturing. this may take a long time. but you can run it in background.
### ranges.json
This file manages what IP ranges should be checked.
You can check out known IP ranges [Here](https://github.com/mohsenemx/IP-Range-Scanner/blob/master/extra-info.md)
Here is the default ranges.json:

```json
[
    {
        "type" : "one",
        "range": "185.147.178",
        "skip" : false,
        "skipto1" : 0
    }, 
    {
        "type" : "two",
        "range": "2.147",
        "skip" : false,
        "skipto1" : 0,
        "skipto2" : 0
    }
]

```
This app's JSON structure is made out of 1 array that contains `n` amount of objects.

Each object indicates 1 IP range.

Each object must have at least 3 keys that are `type`, `range` and `skip`

While `type` and `range` should be strings, `skip` only accepts a bool value.

`type` can only be 2 strings, `"one` indicating that your IP range has 1 variable, and `"two"` indicating that your IP range has 2 variables.

`range` must be an incomplete IP. It should be `xxx.xxx.xxx` for `type` value of `"one"` and `xxx.xxx` for a `type` value of `"two"`.

> **Warning**:
>
> Using a type `"two"` IP range will take a lot of time to complete as it has a runtime complexity of O(n^).

If you want to skip some values, you can use `skip` value.
If `skip` value is false, app will start from beggening of given IP range. If `skip` value is true, app will skip `n` IPs.

`skipto1` indicates the IP skip number for `d` part of an IP. (IP structure: aaa.bbb.ccc.ddd)

and `skipto2` indicates the IP skip number for `c` part od an IP. (IP structure: aaa.bbb.ccc.ddd)

## Why?
This idea suddenly came to my mind so I made it.
