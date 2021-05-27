export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  NewPost: undefined;
  ShowPost: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Notifications: undefined;
  Messages: undefined;
  User: undefined;
  Drawer: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignUpInfo: undefined;
  Login: undefined;
  Welcome: undefined;
}

//For Main

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
  Home: undefined;
  AddPostScreen: undefined;
  AddPost: undefined;
  PostDisplay: undefined;

}
export type MessageNavigatorParamList = {
  MessageScreen: undefined;
  Message: undefined;
}
export type NotificationNavigatorParamList = {
  NotificationScreen: undefined;
  Notifications: undefined;
}
export type ProfileNavigatorParamList = {
  ProfileScreen: undefined;
  Profile: undefined;
  Drawer: undefined;

  Friends: undefined;
}

export type FriendNavigatorParamList = {
  FriendScreen: undefined;
  NewFriends: undefined;
  ExistingFriends: undefined;
  FriendRequests: undefined;
  FriendProfile: undefined;
}

export type AddPostNavigatorParamList = {
  AddPostScreen: undefined;
  AddPost: undefined;
}
export type PostDisplayNavigatorParamList = {
  PostDisplayScreen: undefined;
  PostDisplay: undefined;
  FeedDisplayScreen: undefined;
  FeedDisplay: undefined;
}


// Auth Stack

export type OnboardingNavigatorParamList = {
  OnboardingScreen: undefined
  Onboarding: undefined
}
export type SignUpNavigatorParamList = {
  SignUpScreen: undefined
  SignUp: undefined
  SignUpInfoScreen: undefined
  SignUpInfo: undefined
}
export type LoginNavigatorParamList = {
  LoginScreen: undefined
  Login: undefined
}
export type WelcomeNavigatorParamList = {
  WelcomeScreen: undefined
  Welcome: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined;


};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  MessageScreen: undefined;
};

export type UserType = {

  id: string,
  name: string,
  username: string,
  image?: string

}


// export type PostType = {
//   id: string,
//   user: UserType,
//   createdAt: string,
//   content: string,
//   image?: string,
//   numberOfLikes: number,
//   numberOfComments: number




// }
export type PostType = {
  id: string,
  userId: string,
  userImage: string,
  userName: string,
  createdAt: string,
  content: string,
  image?: string,
  numberOfLikes: number,
  numberOfComments: number




}

export type NewFriendType = {
  id: string,
  //userId: string,
  image: string,
  name: string,
}
export type FriendExistingType = {
  id: string,
  //userId: string,
  userImage: string,
  firstName: string,
  lastName: string,
  timestamp: string,
}

export type CommentType = {
  id: string,
  userName: string,
  userImage: string,
  likes: string,
  liked: boolean,
  timestamp: string,
  comment: string
}

export type PostDetailsType = {
  image: string,
  content: string,
  numberOfComments: number,
  numberOfLikes: number,
}