URL - https://buga-chat.vercel.app/

REPO - https://github.com/kekda-py/buga-chat

BACKEND - https://github.com/kekda-py/buga-backend  

---
 
So I was learning `go` the other day. And was amazed by its channels. So decided to make something in it. Actually I thought making this app before I was learning go and wrote it half in `python` but decided to make it `go` cuz umm go is cool af.
also I made this thing before ===> [`dotenv`](https://github.com/kekda-py/dotenv) check it out

So umm my friend [nexxel](https://nexxel.dev/) told me about this library [`fiber`](https://gofiber.io/) its like `quart` (async flask) for go. While browsing through their docs I found that you can make websockets with them. After that I literally scrapped the python code and started writing it in `go`.

## Websocket Hub
Since I was amazed by go channels. I used them to make a websocket hub. If u dont know how channels works. Here's a simple explanation.

### Go Channels

Channels are a typed conduit through which you can send and receive values with the channel operator, `<-`.
```go:main.go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v.
```
Like maps and slices, channels must be created before use: `c := make(chan T)`

#### Channels with Select
The `select` statement lets a goroutine wait on multiple communication operations.

A `select` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

```go:main.go
tick := time.Tick(100 * time.Millisecond)
boom := time.After(500 * time.Millisecond)
for {
  select {
    case <-tick:
      fmt.Println("tick.")
    case <-boom:
      fmt.Println("BOOM!")
      return
    default:
      fmt.Println("    .")
      time.Sleep(50 * time.Millisecond)
  }
}
```
Output:
```text:output
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
    .
    .
tick.
BOOM!
```
> I definitely didn't copied all this from [Go Tour](https://go.dev/tour). What are you talking about?

Using this I made the websocket hub
At First I declared three `channels` for communication between hub and the websocket and a `map` for storing connections

```go:main.go
var connections = make(map[*websocket.Conn]client)
var register = make(chan *websocket.Conn)
var broadcast = make(chan message)
var unregister = make(chan *websocket.Conn)
```
and a `message` struct for broadcasting
```go:main.go
type struct message {
  content string
  by      *websocket.Conn
}
```



then in the Hub I made a select statement with the channels as the cases :-
```go:main.go
for {
  select {
  case c := <- register {}
  case m := <- broadcast {}
  case c := <- unregister {}
  }
}
```
`<- register` just adds the connection to `connections`
```go:main.go
case c := <-register:
  connections[c] = client{}
  log.Println("client registered")
```

`<- broadcast` takes a `type message` which has a `by` attribute of type `*websocket.Conn`. It loops through the `connections` and checks if the `user` is the one who sent the message. If it is then it just `continue`s (skip to the next iteration). If its not then it sends the message.
The reason I made it like this. cuz if u send the message it was taking few seconds to appear. so in the frontend it adds the message instantly.
```go:main.go
case m := <-broadcast:
  for c := range connections {
    if c == m.by {
      continue
    }
    if err := c.WriteMessage(websocket.TextMessage, []byte(m.content)); err != nil {
      log.Println("Error while sending message: ", err)
				 
      c.WriteMessage(websocket.CloseMessage, []byte{})
      c.Close()
      delete(connections, c)
    }
  }
```

`<- unregister` just removes the `connection` from `connections`
```go:main.go
case c := <-unregister:
  delete(connections, c)
  log.Println("client unregistered")
```

now the websocket hub is done we just have to run it
```go:main.go
go WebsocketHub()
```

now in the websocket we just have to `register` and also `defer unregister`
```go:main.go
register <- c

defer func() {
  unregister <- c
  c.Close()
}
```
and check for message
```go:main.go
for {
  mt, m, err: = c.ReadMessage()
  if err != nil {
    if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
      log.Println("read error:", err)
    }

    return // Calls the deferred function, i.e. closes the connection on error
  }

  if mt == websocket.TextMessage {
    // MakeMessage(string(m), c)
    broadcast < -message {
      content: string(m),
      by: c,
    }
  } else {
    log.Println("websocket message received of type", mt)
  }
}
```
now the `backend` is done lets move to `frontend`


---
## Frontend
I used `Next.js` with `chakra-ui` for this project.
for the websocket connection I used [`react-use-websocket`](https://www.npmjs.com/package/react-use-websocket). 

So first I added two states :-
```tsx:pages/index.tsx:pages/index.tsx
const [messages, setMessages] = useState<Messages>({});
// ^^^ for the active messages
const [msg, setMsg] = useState<string>('');
// ^^^ value of text in the message input
```
the `Messages` interface is just
```ts:types
interface Messages {
  [key: string]: msg;
}
```
and `msg` :-
```ts:types
interface msg {
  byU : boolean;
  content : string;
}
```

now time to run your backend
then add an environment variable `NEXT_PUBLIC_BACKEND_URL` with your backend url to `.env.local` . you can use 
```bash:terminal
dotenv change NEXT_PUBLIC_BACKEND_URL the url --file .env.local
```
if u have [`dotenv`](https://github.com/kekda-py/dotenv) installed. then get that url by `process.env.NEXT_PUBLIC_BACKEND_URL` and connect with it using 

```tsx:pages/index.tsx
const { sendMessage, lastMessage, readyState} = useWebSocket(`wss://${BACKEND}/ws`, { shouldReconnect : (closeEvent) => true } );
```

make sure to import `useWebsocket` along with `ReadyState`
```tsx:pages/index.tsx
import useWebSocket, { ReadyState } from 'react-use-websocket';
```

now `connectionStatus` :-
```tsx:pages/index.tsx:pages/index.tsx
const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
}[readyState];
```

For messages, I looped through the keys using `Object.keys` and used `.map()` to render all of them.
```tsx:pages/index.tsx:pages/index.tsx
{Object.keys(messages).map((key: string) => {
    if (messages[key] === undefined || messages[key] === null) return null;
    if (messages[key].content === undefined || messages[key].content === null)
      return null;

    return (
      <Box
        key={key}
        borderRadius="lg"
        bg="teal"
        color="white"
        width="fit-content"
        px="5"
        py="2"
        ml={messages[key].byU ? "auto" : "0"}
      >
        {messages[key].content}
      </Box>
    )
  }
)}
```
if the message is sent by you. the `marginLeft` is set to `auto` which pushes it all the way to right side.

now time for checking for messages. we just use a `useEffect` hook with `lastMessage` as dependency.
```tsx:pages/index.tsx:pages/index.tsx
useEffect(() => {
  if (lastMessage !== undefined || lastMessage !== null) {
    (function (m: string) {
      setMessages((prev: Messages) => {
        let id = getUID();
        while (prev[id] !== undefined || prev[id] !== undefined) {
          id = getUID();
        }
        setTimeout(() => {
          deleteMessage(id);
        }, 1000 * 60);
        return {
          ...prev,
          [id]: {
            byU: false,
            content: m,
          },
        };
      });
      if (mute) return;
      new Audio("ping.mp3").play();
    })(lastMessage?.data);
  }
}, [lastMessage]);
```

I am using `Date.now()` for the ids.  and also setting a `timeout` for 1 min which runs the `deleteMessage` function :-
```tsx:pages/index.tsx
function deleteMessage(id: string) {
  setMessages((prev) => {
    const newMessages = { ...prev };
    delete newMessages[id];
    return newMessages;
  });
}
```
now for sending messages we create another function which just sends the message using `sendMessage` which we got from `useWebsocket` hook :-
```tsx:pages/index.tsx
function Send() {
  if (
    msg.length < 1 ||
    connectionStatus !== "Open" ||
    msg === undefined ||
    msg === null
  )
    return;

  sendMessage(msg);
  newMessage(msg, true);
  setMsg("");
}
```

and on `Enter` we run it
`onKeyUp={(e : any) => { if (e.key === "Enter") { Send() } }}`
> this is a prop on the input element.

and now there you go u made a completely Anonymous chat app.

run 
```bash:terminal
yarn dev
```
to run the app in development mode

---
<h1>
<a style="text-align:center;" href="https://buga-chat.vercel.app/">Buga-Chat</a>
</h1>