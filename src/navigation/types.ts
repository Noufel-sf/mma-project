import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Feed: undefined;
  Challenges: undefined;
  Calendar: undefined;
  Documents: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  AccountType: undefined;
  Login: undefined;
  Register: undefined;
  CompleteProfile: undefined;
  ProfessionalBackground: undefined;
  ForgotPassword: undefined;
  OtpVerification: { email: string };
  ResetPassword: { email?: string };
  Main: NavigatorScreenParams<MainTabParamList>;
  ChallengeDetail: { challengeId: string };
};
