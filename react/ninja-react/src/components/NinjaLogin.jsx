import React from "react";
import GoogleLogin from "react-google-login";
import API from "../config/ServerUrls";
import { PageSection } from "@patternfly/react-core";

const LoginSection = props => {
  return (
    <PageSection>
      <NinjaLogin {...props} />
    </PageSection>
  );
};

export default LoginSection;

export const NinjaLogin = props => {
  const register = googleResponse => {
    // match this object to ninja user registration API
    const userRegistrationRequest = {
      firstName: googleResponse.profileObj.givenName,
      lastName: googleResponse.profileObj.familyName,
      email: googleResponse.profileObj.email,
      //does the backend need the token or the tokenId?
      tokenId: googleResponse.tokenId,
      imageUrl: googleResponse.profileObj.imageUrl,
      providerId: "Google"
    };

    console.log(props);

    // /user API needs to be modified
    API.post(`/user`, userRegistrationRequest)
      .then(res => {
        //intended state: by logging in some information (name, email, profile picture) will already be set on the profile. should be taken to "edit" page, instead of "registration" page
        props.setLoggedIn(true);
        props.history.push("/registration-form");
      })
      //TODO: fill in error handling
      .catch(error => {
        if (error.response) {
        }
        //undefined error response == network error
        else {
          //temporary way to test log in works, but this is when the network or server is down
          props.setLoggedIn(true);
          props.history.push("/registration-form");
        }
      });
  };

  const responseGoogle = response => {
    console.log(response);
    register(response);
  };

  //TODO: client id should be stored in OCP configmap
  return (
    <GoogleLogin
      clientId="1029231296777-6hg51pd9kiesovjs89shafotuc9s82go.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
