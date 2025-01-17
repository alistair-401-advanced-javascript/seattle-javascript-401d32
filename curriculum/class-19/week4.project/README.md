# Week 4 Capstone

## Event based API
> This is an UNGRADED pair programming assignment. Please take the next hour to accomplish the following:
### Requirements
- Create a file called `app.js` that instantiates an `express` application with the following features.
    - Stores an in memory data structure called `messages`. Which stores a list of messages with the following properties:
        - `id: { String } Unique`
        - `contents: { String }`
        - `created_at: { Date }`
    - Opens a Socket.io server host for web clients.
    - listens for the following HTTP endpoints:
        - GET /messages
            - Sends the `messages` data structure in the response object.
            - Emits an event title `MESSAGE_FETCH` and sends a payload to all connected sockets, containing `messages`.
        - POST /messages
            - receives a message object on the request object.
            - Adds a new message object to `messages`.
            - Sends `messages` in the response body.
            - Emits an event titled `MESSAGE_WRITE` and sends a payload to all connected sockets, containing the new message object.
        - PUT /messages/:id
            - Recieves a message object on the request object.
            - Replaces a message object in `messages` by searching for the `id` on on a message object matching the request parameter `:id`.
            - Emits an event title `MESSAGE_UPDATE` and sends a payload to all connected sockets, containing the updated message object.
            
- Create a file called `logger.js` that connects to the open Socket server.
    - The logger listens for three events and console logs the event, and their payload:
        - `MESSAGE_FETCH`
        - `MESSAGE_WRITE`
        - `MESSAGE_UPDATE` 
