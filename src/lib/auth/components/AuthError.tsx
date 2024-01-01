const authErrors: Record<string, string> = {
  AlreadySignedIn: "Password reset email not sent, you are already logged in.",
  General: "Something went wrong. Please try again.",
  CredentialsSignin: "Please check the details you provided are correct.",
  NoName:
    "There's no name associated with your social account. Please try a different method.",
  NoEmail:
    "We couldn't obtain an email address associated with your social account. Please try a different method.",
  FailedNewUser:
    "We couldn't create your account. Please try a different account.",
  InvalidEmail: "Please enter a valid email address.",
  InvalidPassword: "Your password should be at least 5 characters long.",
};

interface AuthErrorProps {
  errorId: string | string[];
}

export const AuthError = ({ errorId }: AuthErrorProps) => {
  let errors = [];

  if (typeof errorId === "object") {
    errors = [...errorId];
  } else {
    errors.push(errorId);
  }

  return (
    <p className="text-red-600 mb-2">
      {errors.map((error) => authErrors[error]).join(" ")}
    </p>
  );
};
