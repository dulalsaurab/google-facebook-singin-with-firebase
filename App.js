import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import clientId, {fireBaseConfig} from './config.js'
import Auth from './Auth.js'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

import { GoogleSignin, statusCodes } from 'react-native-google-signin';

const anotherApp = firebase.initializeApp(fireBaseConfig);

import { FBLoginManager} from 'react-native-facebook-login';

// const FBLoginManager = require('NativeModules').FBLoginManager;

GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    iosClientId: clientId.iosClientId, // only for iOS
    webClientId: '272769656721-5smf35mb7r9atefkvi81lmc06vpip786.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
    accountName: '', // [Android] specifies an account name on the device that should be used
  });
  
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
        signedIn: false,
        user_data: undefined,
        isValid: undefined,
        email: '',
        password: '',
        fbLoginPermissions: ['email', 'user_friends']
    })
  }

loginWithGoogle = () => {
    
    GoogleSignin.signIn()
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // Login with the credential
        console.log(credential)
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
      })
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(error)
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

// this snapshot is completly working fine, I will be shocked if it crashed at some point in time
  handleFbLogin = () => {
        Auth.Facebook.login(['email', 'user_friends'])
        .then((token) => {
            // console.log(token)
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            // console.log(credential)
            firebase.auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then((jsonResponse) => {          
                })
        }
        )
        .catch((err) => {
            console.log(err)
            // this.onError && this.onError(err)
        })
    };
    
  signUpUsers = (email, password) => {
    try {
        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
          }
          firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)

    } catch (error) {
        console.log(error.toString())
    }
  }

loginUser = (email, password) => {
    try {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email,password).then(
            jsonResponse => {
                this.setState({
                    user_data: jsonResponse
                })
            }
        )
      } catch (error) {
          console.log(error.toString())
      }
  }

  async componentWillMount() {
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this.setState({ user : data})
      }
    });
    // the below lines of code solved the problem 
    // Click on button crashes the app
    // solution refrence: https://github.com/magus/react-native-facebook-login/issues/250
    const fbView = Platform.OS === 'ios'
      ? FBLoginManager.LoginBehaviors.Web
      : FBLoginManager.LoginBehaviors.WebView;

    await FBLoginManager.setLoginBehavior(fbView);
}

componentDidMount(){
    firebase.auth().onAuthStateChanged( user => {
        if(user != null){
            var temp_data = {
                email: user.displayName,
                name: user.displayName,
                photoURL: user.photoURL
            }
            this.setState({
                user_data: temp_data,
                isValid: true
            })
        }
    });
    getCurrentUser = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.setState({ userInfo });
        } catch (error) {
          console.error(error);
        }
      };


}

signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            user_data: undefined;
            isValid: undefined;rr
            navigate('Auth');
        } catch (e) {
            console.log(e);
        }
    this.setState({user_data: undefined, isValid: false});
    }


render() {
    const { user_data } = this.state;
    const { isValid } = this.state;
    return (
        <Container style={styles.container}>
        <Text style={styles.header}>
                Welcome to Nepal Sahitya {"\n"}
        </Text>
        { user_data? (
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user_data.name} {"\n"}
              </Text>
                  <View>
                    {user_data.photoURL ? (
                        <Image source={{ uri: user_data.photoURL }} style={styles.avatarImage} />
                    ) : (
                        <Text>{user_data.name}</Text>
                    )}
                    </View>
            <Button style={styles.button}
                full
                rounded
                Primary
                onPress={()=> this.signOutUser()}
            >
            <Text style={{color: 'white'}}>Logout, Go home kid!!  </Text>
            </Button>
            </View>
        )
        :
            (
            <Form>
                <Item floatingLabel>
                    <Label>Email </Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(email)=>this.setState({email})}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password </Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(password)=>this.setState({password})}
                    />
                </Item>

                <View style={styles.inline}>
                    <Button style={styles.loginButton}
                        full
                        rounded
                        success
                        onPress ={()=> this.loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={{color: 'white'}}>Login </Text>
                    </Button>
                    <Button style={styles.loginButton}
                        full
                        rounded
                        Primary
                        onPress={()=> this.signUpUsers(this.state.email, this.state.password)}
                    >
                        <Text style={{color: 'white'}}>SignUp</Text>
                    </Button>
                </View>
                <View
                    style={{
                        marginTop: 100,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        margin: 20
                    }}
                />
                <Button style={styles.button}
                    full
                    rounded
                    Primary
                    onPress={()=> this.handleFbLogin()}
                >
                    <Text style={{color: 'white'}}>Login With Facebook  </Text>
                </Button>

                <Button style={styles.button_google}
                    full
                    rounded
                    Primary
                    onPress={()=> this.loginWithGoogle()}
                >
                    <Text style={{color: 'white'}}>Login With Google  </Text>
                </Button>
            </Form>
            )}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textRegister: {
    color: "grey",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 5,
    justifyContent: 'center',

},
inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
 loginButton: {
    marginTop: 30,
    margin: 20,
    width: 150
 },
 button: {
    marginTop: 10,
    margin: 20,
 },
 button_google: {
    marginTop: 10,
    margin: 20,
    backgroundColor: '#F44A4B'
 },
 content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,

  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 90
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
});