import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
// Create a normal network interface:
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
});
// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
// Finally, create your ApolloClient instance with the modified network interface
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

var MainView = React.createClass({

  getInitialState: function() {

    var messages = ['Hi there! 😘', 'Welcome to your chat app', 'See the tutorial at http://blog.pusher.com/react-chat'];
    messages = messages.map(function(msg){
      return {
        name: 'pusher',
        time: new Date(),
        text: msg
      }
    });

    return {
      messages: messages
    };
  },

  static propTypes = {
        repoFullName: PropTypes.string.isRequired,
        subscribeToNewComments: PropTypes.func.isRequired,
  }

  componentWillMount: function() {

    this.props.subscribeToNewComments({
        repoFullName: this.props.repoFullName,
    });

    this.pusher = new Pusher('870b3fc24a21fcd04306');
    this.chatRoom = this.pusher.subscribe('messages');

  },

  componentDidMount: function() {

    this.chatRoom.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})

      $("#message-list").scrollTop($("#message-list")[0].scrollHeight);

    }, this);

    $(document).ready(function(){
      $('#msg-input').emojiPicker({
        height: '150px',
        width: '200px',
        button: false
      }); 

    });



  },

  sendMessage: function(text){
    var message = {
      name: this.props.name,
      text: text,
      time: new Date()
    }

    $.post('/messages', message).success(function(){
      var input = document.getElementById('msg-input');
      input.value = ""
    });
  },

  _onClick: function(e){
    var input = document.getElementById('msg-input');
    var text = input.value;
    if (text === "") return;
    this.sendMessage(text);
  },

  _onEnter: function(e){
    if (e.nativeEvent.keyCode != 13) return;
    e.preventDefault();
    var input = e.target;
    var text = input.value;

    if (text === "") return;
    this.sendMessage(text);
  },

  toggleEmoji: function(evt){
      $('#msg-input').emojiPicker('toggle');
  },

  render: function() {

    if (!this.props.name) var style = {display:'none'}


    var body = (
      <div className="light-grey-blue-background chat-app">
        <Messages messages={this.state.messages}  />

        <div className="action-bar">
          <div className="option col-xs-1 white-background">
            <span id="emoji" onClick={this.toggleEmoji} className="fa fa-smile-o light-grey"></span>
          </div>
          <textarea id="msg-input" className="input-message col-xs-10" placeholder="Your message" onKeyPress={this._onEnter}></textarea>
          <div className="option col-xs-1 green-background send-message" onClick={this._onClick}>
            <span className="white light fa fa-paper-plane-o"></span>
          </div>
        </div>
      </div>
    );

    return (
      <ApolloProvider client={client}>
        <div style={style} className="text-center">
          <div className="marvel-device iphone6 silver">
              <div className="top-bar"></div>
              <div className="sleep"></div>
              <div className="volume"></div>
              <div className="camera"></div>
              <div className="sensor"></div>
              <div className="speaker"></div>
              <div className="screen">
                  {body}
              </div>
              <div className="home"></div>
              <div className="bottom-bar"></div>
          </div>
        </div>
      </ApolloProvider>
    );
  }

});

const COMMENTS_SUBSCRIPTION = gql`
    subscription onCommentAdded($repoFullName: String!){
      commentAdded(repoFullName: $repoFullName){
        id
        content
      }
    }
`;
const withData = graphql(COMMENT_QUERY, {
    name: 'comments',
    options: ({ params }) => ({
        variables: {
            repoName: `${params.org}/${params.repoName}`
        },
    }),
    props: props => {
        return {
            subscribeToNewComments: params => {
                return props.comments.subscribeToMore({
                    document: COMMENTS_SUBSCRIPTION,
                    variables: {
                        repoName: params.repoFullName,
                    },
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) {
                            return prev;
                        }
                        const newFeedItem = subscriptionData.data.commentAdded;
                        return Object.assign({}, prev, {
                            entry: {
                                comments: [newFeedItem, ...prev.entry.comments]
                            }
                        });
                    }
                });
            }
        };
    },
});
