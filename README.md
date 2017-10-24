# Pusher & React Real-Time Chat App

This is an example chat application using React for a componentised UI and Pusher for real-time chat messages.

The UI components can be found in `static/javascripts/ui_components`.

The back-end is a Python app, found in `app.py`.

## Project Test Criteria

For this test project, you will modify this sample chat to be written in Apollo instead of plain React. The project will need to be written in Apollo, not plain React and Pusher.com will be the websocket.

For more information using Apollo subscriptions please read:
http://dev.apollodata.com/react/subscriptions.html

**Time limit:**
4 hours

**Finished project:**
Clone this repo and provide a link to the final solution


## Example Tutorial

There is a full tutorial on [building a real-time chat application with React and Pusher](https://blog.pusher.com/making-reactjs-realtime-with-websockets/) available.

You can see a demo here: http://pusher-chat-demo.herokuapp.com/

## Running the App

You'll need a Pusher account, so [signup for a free account](https://pusher.com/signup).

You'll then need to install the application Python package dependencies. We'd recommend you do this in a [Virtual Environment](http://docs.python-guide.org/en/latest/dev/virtualenvs/):

```bash
$ virtualenv venv
$ source venv/bin/activate
```

Then install the dependencies:

```
pip install -r requirements.txt
```

Prior to running the Python app you'll need some environmental variables to be set.

* `PUSHER_CHAT_APP_ID` - your Pusher application ID
* `PUSHER_CHAT_APP_KEY` - your Pusher application key
* `PUSHER_CHAT_APP_SECRET` - your Pusher application secret

You can do this from the command line as part of running the application:

```bash
PUSHER_CHAT_APP_ID=YOUR_APP_ID PUSHER_CHAT_APP_KEY=YOUR_APP_KEY PUSHER_CHAT_APP_SECRET=YOUR_APP_SECRET python app.py
```

Or, probably much more easily, with the help of [foreman](https://github.com/ddollar/foreman) and by setting these values in a `.env` file:

```
PUSHER_CHAT_APP_ID=YOUR_APP_ID
PUSHER_CHAT_APP_KEY=YOUR_APP_KEY
PUSHER_CHAT_APP_SECRET=YOUR_APP_SECRET
```

Then running:

```bash
$ foreman start
```
