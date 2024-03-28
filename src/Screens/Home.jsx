import { ScrollView } from "react-native"
import AuthScreen from '../Components/AuthScreen'
import AuthenticatedScreen from '../Components/AuthenticatedScreen';

const Home = ({user, handleAuthentication, email, setEmail, password, setPassword, isLogin, setIsLogin}) => {

    return(
        <ScrollView>
   {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} 
        />
      ) : (
        
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
      </ScrollView>
    )
}

export default Home