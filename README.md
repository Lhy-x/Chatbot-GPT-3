


![App Screenshot](https://cdn.discordapp.com/attachments/1180454307510890557/1226114335181373510/image.png?ex=662396f5&is=661121f5&hm=ac3325dbb81c3ccbcb7abd2b1253949694bd0d4896cea86267c9cf0ec1ecd4d7&)


# CHATBOT GPT-3 turbo

Welcome, here is a chatbot using chatgpt 3 turbo follow the instructions below to get started

## Installation

Clone the github

```bash
  git clone https://github.com/Lhy-x/Chatbot.git
  
```
   Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

## How to launch / use it
1 / Go to the `script.js` file and modify :
- Your OpenAI Secret API key (to obtain it, [click here](https://platform.openai.com/api-keys))
```javascript
            xhr.setRequestHeader(
                "Authorization",
                "Bearer Your PrivateAPIKey here"
            );
```

- Personalise the chatbot by giving it instructions and information :
```javascript
let conversation = [
    {
        role: "system",
        content:
            "Your instructions and settings here",
    },
];
}
```


## Tech Stack

**Client:** Html, CSS

**Server:** Javascript, OpenAI API

